// src/components/Feed.jsx
import React, { useEffect } from "react";
import VideoGrid from "./VideoGrid";
import { useVideoContext } from "../context/VideoContext";
import { fetchMostPopularVideos } from "../utils/ytApi";

function Feed() {
  const { videos, loading, error, setVideos, setLoading, setError } =
    useVideoContext();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const data = await fetchMostPopularVideos();
        setVideos(data);
      } catch (err) {
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [setVideos, setLoading, setError]);
  return (
    <div className="min-h-screen p-4 w-full">
      {loading && (
        <p className="text-center text-gray-600">Loading videos...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && videos.length === 0 && (
        <p className="text-center text-gray-600">No videos available.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto h-screen">
        {videos.length > 0 &&
          videos.map((video, index) => (
            <VideoGrid video={video} key={video.id} />
          ))}
      </div>
    </div>
  );
}

export default Feed;
