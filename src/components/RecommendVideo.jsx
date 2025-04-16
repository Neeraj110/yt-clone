/* eslint-disable react/prop-types */
import React from "react";
import {
  formatDuration,
  formatPublishTime,
  formatViews,
} from "../utils/formatters";
import { MoreVertical, Clock, Verified } from "lucide-react";
import { Link } from "react-router-dom";

function RecommendVideo({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
        <p className="text-gray-400">No recommendations available</p>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-4  bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg">
      <h3 className="text-lg font-bold text-white mb-3 md:mb-4">Recommended</h3>
      <div className="space-y-3  overflow-y-auto pr-1">
        {videos.map((video) => (
          <Link
            to={`/video/${video.id}`}
            key={video.id}
            className="flex gap-2 md:gap-3 group cursor-pointer hover:bg-gray-700 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
          >
            <div className="relative flex-shrink-0 w-32 h-20 sm:w-36 sm:h-20 md:w-40 md:h-24">
              <img
                src={
                  video?.snippet?.thumbnails?.medium?.url ||
                  "/api/placeholder/320/180"
                }
                alt={video.snippet.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-[10px]"
              />
              {video?.contentDetails?.duration && (
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                  {formatDuration(video?.contentDetails?.duration)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-medium text-white line-clamp-2 group-hover:text-blue-400">
                {video.snippet.title}
              </h3>

              <div className="flex items-center mt-1 text-xs text-gray-400">
                <span className="flex items-center truncate">
                  {video.snippet.channelTitle}
                  {video.verified && (
                    <Verified className="w-3 h-3 ml-1 text-gray-400" />
                  )}
                </span>
              </div>

              <div className="flex items-center mt-1 text-xs text-gray-400">
                <span className="truncate">
                  {video?.statistics?.viewCount
                    ? `${formatViews(video.statistics.viewCount)} views`
                    : ""}
                  {video?.statistics?.viewCount && video?.snippet?.publishedAt
                    ? " • "
                    : ""}
                  {video?.snippet?.publishedAt
                    ? formatPublishTime(video.snippet.publishedAt)
                    : ""}
                </span>
              </div>
            </div>

            {/* Action Menu - Hidden on mobile */}
            <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 hover:bg-gray-700 rounded-full">
                <MoreVertical className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecommendVideo;
