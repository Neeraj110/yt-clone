import React from "react";
import { useState } from "react";
import { exploreCategories } from "../utils/constant";
import { useVideoContext } from "../context/VideoContext";
import { fetchVideoByCategory } from "../utils/ytApi";
function TopBar() {
  const [active, setActive] = useState(0);
  const { setVideos, setLoading, setError } = useVideoContext();

  const handleCategoryClick = async (categoryId, index) => {
    setActive(index);
    setLoading(true);
    try {
      const videos = await fetchVideoByCategory(categoryId);
      setVideos(videos);
    } catch (err) {
      setError("Failed to load videos for this category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-[4.2rem] w-full px-4 py-2  shadow-md z-10 overflow-x-auto whitespace-nowrap bg-[#0F0F0F]">
        {Array.isArray(exploreCategories) &&
          exploreCategories.map((category, index) => (
            <button
              key={category.id}
              className={`inline-block px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors ${
                active === index
                  ? "bg-blue-600 text-white"
                  : "bg-[#333333]text-gray-700 hover:bg-gray-700 bg-gray-700"
              }`}
              onClick={() => handleCategoryClick(category.id, index)}
              aria-pressed={active === index}
            >
              {category.name}
            </button>
          ))}
      </div>
    </>
  );
}

export default TopBar;
