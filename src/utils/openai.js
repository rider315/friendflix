// src/utils/openai.js
import { OPENAI_KEY } from "./constants";

class OpenAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.openai.com/v1";
    console.log("Using API Key:", this.apiKey); // Confirm key
  }

  async fetchWithTimeout(url, options, timeout = 10000) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Request timed out after " + timeout + "ms");
      }
      throw error;
    }
  }

  async retryRequest(requestFn, retries = 3, baseDelay = 30000) { // 30s base delay
    for (let i = 0; i < retries; i++) {
      try {
        const response = await requestFn();
        console.log("Rate Limit Remaining:", response.headers.get("x-ratelimit-remaining"));
        console.log("Rate Limit Reset:", response.headers.get("x-ratelimit-reset"));
        return response;
      } catch (err) {
        if (err.status === 429 && i < retries - 1) {
          const delay = baseDelay * Math.pow(2, i); // 30s, 60s, 120s
          console.log(`Rate limited. Retrying in ${delay / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          err.status = err.status || (err.message.includes("fetch") ? 500 : null);
          throw err;
        }
      }
    }
  }

  async request(method, endpoint, data) {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    };
    if (data) options.body = JSON.stringify(data);

    return this.retryRequest(async () => {
      const response = await this.fetchWithTimeout(url, options);
      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        throw error;
      }
      return response.json();
    });
  }

  chat = {
    completions: {
      create: (data) => this.request("POST", "/chat/completions", data),
    },
  };
}

export default new OpenAI(OPENAI_KEY);