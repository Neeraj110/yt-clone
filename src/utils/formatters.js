const formatViews = (views) => {
  const num = Number(views);
  if (num >= 1_00_00_000) return `${(num / 1_00_00_000).toFixed(1)}M`;
  if (num >= 1_00_000) return `${(num / 1_00_000).toFixed(1)}L`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

const formatPublishTime = (publishedAt) => {
  const date = new Date(publishedAt);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

function formatDuration(isoDuration) {
  if (!isoDuration) return "";

  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) {
    console.error(`Invalid duration format: ${isoDuration}`);
    return "";
  }

  let hours = 0,
    minutes = 0,
    seconds = 0;
  if (match[1]) hours = parseInt(match[1].replace("H", ""));
  if (match[2]) minutes = parseInt(match[2].replace("M", ""));
  if (match[3]) seconds = parseInt(match[3].replace("S", ""));

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

export { formatViews, formatPublishTime, formatDuration };
