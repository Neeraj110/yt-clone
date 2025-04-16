/* eslint-disable react/prop-types */
// CommentSection.jsx
import React, { useState, useEffect } from "react";
import { fetchComments } from "../utils/ytApi";
import { formatPublishTime } from "../utils/formatters";
import {
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      if (!videoId) return;

      try {
        setLoading(true);
        const data = await fetchComments(videoId);
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [videoId]);

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const renderMobileCommentsToggle = () => {
    if (!isMobile || comments.length === 0) return null;

    return (
      <div
        onClick={toggleComments}
        className="bg-gray-800 rounded-t-xl fixed bottom-0 left-0 right-0 p-4 shadow-lg cursor-pointer z-10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-gray-300" />
            <span className="text-white font-medium">
              {comments.length} Comments
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-300 transition-transform ${
              showComments ? "rotate-180" : ""
            }`}
          />
        </div>

        {!showComments && comments.length > 0 && (
          <div className="mt-3 border-t border-gray-700 pt-3">
            <div className="flex space-x-3">
              <img
                src={
                  comments[0].snippet.topLevelComment.snippet
                    .authorProfileImageUrl || "/api/placeholder/32/32"
                }
                alt={
                  comments[0].snippet.topLevelComment.snippet.authorDisplayName
                }
                className="w-6 h-6 rounded-full object-cover"
              />
              <p className="text-sm text-gray-300 line-clamp-1">
                {comments[0].snippet.topLevelComment.snippet.textDisplay}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMobileComments = () => {
    if (!isMobile || !showComments) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 z-20 overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">
              {comments.length} Comments
            </h3>
            <button
              onClick={toggleComments}
              className="p-2 rounded-full hover:bg-gray-800"
            >
              <ChevronDown className="w-5 h-5 text-gray-300 transform rotate-180" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Comments list for mobile */}
          <div className="space-y-6">
            {comments.map((item) => {
              const comment = item.snippet.topLevelComment.snippet;
              const hasReplies = item.snippet.totalReplyCount > 0;
              const replies = item.replies?.comments || [];

              return (
                <div key={item.id} className="space-y-4">
                  {/* Comment */}
                  <div className="flex space-x-3">
                    <img
                      src={
                        comment.authorProfileImageUrl ||
                        "/api/placeholder/40/40"
                      }
                      alt={comment.authorDisplayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm text-white">
                          {comment.authorDisplayName}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatPublishTime(comment.publishedAt)}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-gray-300">
                        {comment.textDisplay}
                      </p>

                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center space-x-1">
                          <button className="text-gray-400 hover:text-gray-200">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          {comment.likeCount > 0 && (
                            <span className="text-xs text-gray-400">
                              {comment.likeCount}
                            </span>
                          )}
                        </div>
                        <button className="text-gray-400 hover:text-gray-200">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                        <button className="text-xs text-gray-300 hover:text-white font-medium">
                          Reply
                        </button>
                      </div>
                    </div>

                    <button className="p-1 text-gray-400 hover:text-gray-200 rounded-full h-fit">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Toggle for replies */}
                  {hasReplies && (
                    <div className="ml-12">
                      <button
                        className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
                        onClick={() => toggleReplies(item.id)}
                      >
                        <div className="w-5 h-5 mr-2 flex items-center justify-center">
                          <ChevronDown
                            className={`w-4 h-4 transform transition-transform ${
                              showReplies[item.id] ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        {showReplies[item.id]
                          ? "Hide replies"
                          : `${item.snippet.totalReplyCount} ${
                              item.snippet.totalReplyCount === 1
                                ? "reply"
                                : "replies"
                            }`}
                      </button>
                    </div>
                  )}

                  {/* Replies */}
                  {showReplies[item.id] && hasReplies && (
                    <div className="ml-12 space-y-4">
                      {replies.map((reply) => {
                        const replySnippet = reply.snippet;

                        return (
                          <div key={reply.id} className="flex space-x-3">
                            <img
                              src={
                                replySnippet.authorProfileImageUrl ||
                                "/api/placeholder/32/32"
                              }
                              alt={replySnippet.authorDisplayName}
                              className="w-8 h-8 rounded-full object-cover"
                            />

                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm text-white">
                                  {replySnippet.authorDisplayName}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {formatPublishTime(replySnippet.publishedAt)}
                                </span>
                              </div>

                              <p className="mt-1 text-sm text-gray-300">
                                {replySnippet.textDisplay}
                              </p>

                              <div className="flex items-center mt-2 space-x-4">
                                <div className="flex items-center space-x-1">
                                  <button className="text-gray-400 hover:text-gray-200">
                                    <ThumbsUp className="w-4 h-4" />
                                  </button>
                                  {replySnippet.likeCount > 0 && (
                                    <span className="text-xs text-gray-400">
                                      {replySnippet.likeCount}
                                    </span>
                                  )}
                                </div>
                                <button className="text-gray-400 hover:text-gray-200">
                                  <ThumbsDown className="w-4 h-4" />
                                </button>
                                <button className="text-xs text-gray-300 hover:text-white font-medium">
                                  Reply
                                </button>
                              </div>
                            </div>

                            <button className="p-1 text-gray-400 hover:text-gray-200 rounded-full h-fit">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {comments.length > 0 && (
            <button className="mt-6 py-2 px-4 bg-gray-800 bg-opacity-60 hover:bg-opacity-80 transition-all rounded-full text-blue-400 text-sm font-medium mx-auto block">
              Show more comments
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading && !isMobile) {
    return (
      <div className="mt-6 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="ml-3 w-3/4 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !isMobile) {
    return (
      <div className="mt-6 p-4 bg-red-900 bg-opacity-20 rounded-lg">
        <p className="text-red-400">Failed to load comments: {error}</p>
      </div>
    );
  }

  return (
    <>
      {(!isMobile || !showComments) && !loading && !error && (
        <div className={`mt-6 p-4 ${isMobile ? "mb-20" : ""}`}>
          {!isMobile && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">
                  {comments.length} Comments
                </h3>
                <button className="flex items-center text-gray-300 text-sm hover:text-white">
                  <span>Sort by</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Add comment input */}
              <div className="flex items-start space-x-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                  Y
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-transparent border-b border-gray-700 pb-2 text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                  />
                  <div className="md:flex justify-end mt-2 space-x-2 hidden">
                    <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-300">
                      Cancel
                    </button>
                    <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500 bg-gray-700 opacity-50">
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Comments list for desktop */}
          {!isMobile && (
            <div className="space-y-6">
              {comments.map((item) => {
                const comment = item.snippet.topLevelComment.snippet;
                const hasReplies = item.snippet.totalReplyCount > 0;
                const replies = item.replies?.comments || [];

                return (
                  <div key={item.id} className="space-y-4">
                    <div className="flex space-x-3">
                      <img
                        src={
                          comment.authorProfileImageUrl ||
                          "/api/placeholder/40/40"
                        }
                        alt={comment.authorDisplayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm text-white">
                            {comment.authorDisplayName}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatPublishTime(comment.publishedAt)}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-gray-300">
                          {comment.textDisplay}
                        </p>

                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center space-x-1">
                            <button className="text-gray-400 hover:text-gray-200">
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            {comment.likeCount > 0 && (
                              <span className="text-xs text-gray-400">
                                {comment.likeCount}
                              </span>
                            )}
                          </div>
                          <button className="text-gray-400 hover:text-gray-200">
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                          <button className="text-xs text-gray-300 hover:text-white font-medium">
                            Reply
                          </button>
                        </div>
                      </div>

                      <button className="p-1 text-gray-400 hover:text-gray-200 rounded-full h-fit">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Toggle for replies */}
                    {hasReplies && (
                      <div className="ml-12">
                        <button
                          className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
                          onClick={() => toggleReplies(item.id)}
                        >
                          <div className="w-5 h-5 mr-2 flex items-center justify-center">
                            <ChevronDown
                              className={`w-4 h-4 transform transition-transform ${
                                showReplies[item.id] ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                          {showReplies[item.id]
                            ? "Hide replies"
                            : `${item.snippet.totalReplyCount} ${
                                item.snippet.totalReplyCount === 1
                                  ? "reply"
                                  : "replies"
                              }`}
                        </button>
                      </div>
                    )}

                    {showReplies[item.id] && hasReplies && (
                      <div className="ml-12 space-y-4">
                        {replies.map((reply) => {
                          const replySnippet = reply.snippet;

                          return (
                            <div key={reply.id} className="flex space-x-3">
                              <img
                                src={
                                  replySnippet.authorProfileImageUrl ||
                                  "/api/placeholder/32/32"
                                }
                                alt={replySnippet.authorDisplayName}
                                className="w-8 h-8 rounded-full object-cover"
                              />

                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm text-white">
                                    {replySnippet.authorDisplayName}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {formatPublishTime(
                                      replySnippet.publishedAt
                                    )}
                                  </span>
                                </div>

                                <p className="mt-1 text-sm text-gray-300">
                                  {replySnippet.textDisplay}
                                </p>

                                <div className="flex items-center mt-2 space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <button className="text-gray-400 hover:text-gray-200">
                                      <ThumbsUp className="w-4 h-4" />
                                    </button>
                                    {replySnippet.likeCount > 0 && (
                                      <span className="text-xs text-gray-400">
                                        {replySnippet.likeCount}
                                      </span>
                                    )}
                                  </div>
                                  <button className="text-gray-400 hover:text-gray-200">
                                    <ThumbsDown className="w-4 h-4" />
                                  </button>
                                  <button className="text-xs text-gray-300 hover:text-white font-medium">
                                    Reply
                                  </button>
                                </div>
                              </div>

                              <button className="p-1 text-gray-400 hover:text-gray-200 rounded-full h-fit">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {!isMobile && comments.length > 0 && (
            <button className="mt-6 py-2 px-4 bg-gray-800 bg-opacity-60 hover:bg-opacity-80 transition-all rounded-full text-blue-400 text-sm font-medium mx-auto block">
              Show more comments
            </button>
          )}
        </div>
      )}

      {renderMobileCommentsToggle()}

      {renderMobileComments()}
    </>
  );
}

export default CommentSection;
