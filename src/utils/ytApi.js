// contants.js

import axios from "axios";

export const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
export const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
if (!API_KEY) {
  throw new Error("VITE_YOUTUBE_API_KEY is not defined in .env file");
}

const youtubeApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export const fetchMostPopularVideos = async () => {
  try {
    const response = await youtubeApi.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        key: API_KEY,
        maxResults: 30,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching popular videos:", error);
    throw error;
  }
};

export const fetchRecommendVideos = async () => {
  try {
    const response = await youtubeApi.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        key: API_KEY,
        maxResults: 20,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching popular videos:", error);
    throw error;
  }
};

export const fetchVideoByCategory = async (categoryId) => {
  try {
    const response = await youtubeApi.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        videoCategoryId: categoryId,
        key: API_KEY,
        maxResults: 30,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error("Error fetching videos by category:", error);
    throw error;
  }
};

export const fetchVideoDetail = async (videoId) => {
  try {
    const response = await youtubeApi.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: videoId,
        key: API_KEY,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0];
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};

export const fetchVideoByQuery = async (query) => {
  try {
    const response = await youtubeApi.get("/search", {
      params: {
        part: "snippet",
        maxResults: 25,
        q: query,
        key: API_KEY,
        type: "video",
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      // For search results, we need to fetch additional details since search endpoint
      // doesn't provide statistics or contentDetails
      const videoIds = response.data.items
        .map((item) => item.id.videoId)
        .join(",");

      if (videoIds) {
        const videoDetailsResponse = await youtubeApi.get("/videos", {
          params: {
            part: "snippet,contentDetails,statistics",
            id: videoIds,
            key: API_KEY,
          },
        });

        return videoDetailsResponse.data.items;
      }

      return response.data.items;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error searching videos:", error);
    throw error;
  }
};

export const fetchComments = async (videoId, maxResults = 20) => {
  try {
    const response = await youtubeApi.get("/commentThreads", {
      params: {
        part: "snippet,replies",
        videoId: videoId,
        key: API_KEY,
        maxResults: maxResults,
        order: "relevance",
      },
    });

    return response.data.items;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log("Comments are disabled for this video");
      return [];
    }
    console.error("Error fetching comments:", error);
    throw error;
  }
};
