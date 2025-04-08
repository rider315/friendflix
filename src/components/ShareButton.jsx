// src/components/ShareButton.jsx
import { useState } from "react";

const ShareButton = ({ movieTitle, movieId }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/movie/${movieId}`;

  const handleShare = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnTwitter = () => {
    const text = `Check out "${movieTitle}" on this FriendFlix clone! ${shareUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleShare}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
      <button
        onClick={shareOnTwitter}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Share on Twitter
      </button>
    </div>
  );
};

export default ShareButton;