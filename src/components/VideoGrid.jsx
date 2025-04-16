/* eslint-disable react/prop-types */
import React from "react";
import {
  formatViews,
  formatPublishTime,
  formatDuration,
} from "../utils/formatters";
import { Link } from "react-router-dom";

function VideoGrid({ video }) {
  return (
    <Link
      to={`/video/${video.id}`}
      className="group cursor-pointer flex flex-col max-w-2xl"
    >
      <div className="relative mb-2 w-full">
        <img
          src={video?.snippet?.thumbnails?.medium?.url}
          alt={video?.snippet?.description}
          loading="lazy"
          className="w-full md:h-auto aspect-video object-cover rounded shadow-md transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute bottom-1 right-2 bg-black text-white text-xs px-2 py-1 rounded-md">
          {video?.contentDetails?.duration
            ? formatDuration(video?.contentDetails?.duration)
            : `null`}
        </div>
      </div>

      <div className="flex p-2 ">
        <div className="w-8 h-8 md:w-9 md:h-9 mr-2 md:mr-3 flex-shrink-0 rounded-full overflow-hidden ">
          <div className="w-full h-full flex items-center justify-center text-black bg-slate-300 text-[1rem]">
            {video.snippet.channelTitle.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-600">
            {video.snippet.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">
            {video.snippet.channelTitle}
          </p>
          <p className="text-xs text-gray-500">
            {video?.statistics?.viewCount &&
              formatViews(video?.statistics?.viewCount)}{" "}
            views •{" "}
            {video?.snippet?.publishedAt &&
              formatPublishTime(video?.snippet?.publishedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoGrid;
