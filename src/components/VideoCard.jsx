/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { formatViews, formatPublishTime } from "../utils/formatters";
import {
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  Save,
  MoreHorizontal,
  Verified,
  ArrowLeft,
} from "lucide-react";
import CommentSection from "./CommentSection";

function VideoCard({ video }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!video) return null;

  const { snippet, statistics } = video;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description = showFullDescription
    ? snippet.description
    : snippet.description.slice(0, 100) +
      (snippet.description.length > 100 ? "..." : "");

  return (
    <div className=" rounded-[2rem]overflow-hidden">
      {/* <button
        className=" p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200 mb-[1rem]"
        onClick={() => window.history.back()}
      >
        <ArrowLeft />
      </button> */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-[1.5rem]"
          src={`https://www.youtube.com/embed/${video.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={snippet.title}
        ></iframe>
      </div>

      <div className="p-3 md:p-4  bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          {snippet.title}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 md:mt-3">
          <div className="flex items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3 text-white font-bold">
              {snippet.channelTitle[0].toUpperCase()}
            </div>

            {/* Channel Info */}
            <div>
              <div className="flex items-center">
                <p className="text-sm md:text-base text-white font-medium">
                  {snippet.channelTitle}
                </p>
                <Verified className="w-4 h-4 ml-1 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400">
                {statistics.subscriberCount
                  ? `${formatViews(statistics.subscriberCount)} subscribers`
                  : ""}
              </p>
            </div>

            <button
              className="ml-4 px-4 py-1.5 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700"
              onClick={() => alert("functionality not implemented")}
            >
              Subscribe
            </button>
          </div>

          <div className="flex items-center mt-3 sm:mt-0 text-xs md:text-sm text-gray-400">
            <p>
              {formatViews(statistics.viewCount)} views •{" "}
              {formatPublishTime(snippet.publishedAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-4">
          <div className="flex rounded-full overflow-hidden bg-gray-700 bg-opacity-40">
            <button className="flex items-center px-2 md:px-3 py-1.5 text-gray-300 hover:bg-gray-600">
              <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="text-xs md:text-sm">
                {formatViews(statistics.likeCount)}
              </span>
            </button>
            <div className="w-px bg-gray-600"></div>
            <button className="flex items-center px-2 md:px-3 py-1.5 text-gray-300 hover:bg-gray-600">
              <ThumbsDown className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            </button>
          </div>

          <button className="flex items-center px-3 py-1.5 bg-gray-700 bg-opacity-40 rounded-full text-gray-300 hover:bg-gray-600 text-xs md:text-sm">
            <Share className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            <span>Share</span>
          </button>

          <button className="flex items-center px-3 py-1.5 bg-gray-700 bg-opacity-40 rounded-full text-gray-300 hover:bg-gray-600 text-xs md:text-sm">
            <Download className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            <span>Download</span>
          </button>

          <button className="flex items-center px-3 py-1.5 bg-gray-700 bg-opacity-40 rounded-full text-gray-300 hover:bg-gray-600 text-xs md:text-sm">
            <Save className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            <span>Save</span>
          </button>

          <button
            className="flex items-center p-1.5 bg-gray-700 bg-opacity-40 rounded-full text-gray-300 hover:bg-gray-600 md:ml-2"
            onClick={() => alert("functionality not implemented")}
          >
            <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <div className="mt-4 p-3 bg-gray-700 bg-opacity-30 rounded-[0.8rem]">
          <p className="text-sm text-gray-300 whitespace-pre-line">
            {description}
          </p>
          {snippet.description.length > 100 && (
            <button
              className="text-blue-400 text-sm mt-2 hover:underline"
              onClick={toggleDescription}
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Comments Section */}
        <CommentSection videoId={video.id} />
      </div>
    </div>
  );
}

export default VideoCard;
