import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoDetail, fetchRecommendVideos } from "../utils/ytApi";
import VideoCard from "../components/VideoCard";
import RecommendVideo from "../components/RecommendVideo";
import { Loader } from "lucide-react";

function Video() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideoDetails = async (videoId) => {
    try {
      setLoading(true);
      const videoData = await fetchVideoDetail(videoId);
      setVideo(videoData);
      const relatedData = await fetchRecommendVideos(videoId);
      setRelatedVideos(relatedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVideoDetails(videoId);
  }, [videoId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ml-[15rem]">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto text-red-600" />
          <p className="mt-2 text-white">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg inline-block">
          <p className="text-red-400">
            <span className="font-bold">Error:</span> {error}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => fetchVideoDetails(videoId)}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 w-full bg-[#0F0F0F] text-white">
      {/* <div className="p-2 sm:p-3 md:p-5 max-w-screen-2xl w-full mx-auto"> */}
      <div className="flex flex-col lg:flex-row gap-4 w-[100%">
        <div className="w-full lg:w-[65%] md:p-[1rem] p-[.5rem]">
          <VideoCard video={video} />
        </div>

        <div className="w-full lg:w-[35%] p-">
          <RecommendVideo videos={relatedVideos} />
        </div>
      </div>
    </div>
  );
}

export default Video;
