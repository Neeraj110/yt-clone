/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import {
  mainCategories,
  libraryCategories,
  exploreCategories,
  settingsCategories,
} from "../utils/constant";
import { useVideoContext } from "../context/VideoContext";
import { useNavigate } from "react-router-dom";
import { fetchVideoByCategory } from "../utils/ytApi";

function SideBar() {
  const navigate = useNavigate();
  const { showSidebar, setVideos, setLoading, setError } = useVideoContext();

  const handleCategoryClick = async (categoryId) => {
    if (!categoryId || typeof categoryId !== "string") {
      console.error("Invalid category ID");
      return;
    }

    if (categoryId === "home") {
      navigate("/");
      return;
    }

    const exploreCategoryIds = exploreCategories.map((cat) => cat.id);
    if (!exploreCategoryIds.includes(categoryId)) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetchVideoByCategory(categoryId);
      if (response) {
        setVideos(response);
        setError(null);
      } else {
        throw new Error("No videos found for this category.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const SideBarSection = React.memo(({ categories, title }) => {
    if (!Array.isArray(categories) || !categories.length) return null;

    return (
      <div className="mb-4 border-b border-gray-700 pb-4">
        {title && (
          <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        )}
        {categories.map((category) => (
          <button
            key={category.id}
            className="flex items-center w-full p-2 text-white hover:bg-gray-500 rounded-md cursor-pointer hover:rounded-full transition-colors duration-200"
            onClick={() => handleCategoryClick(category.id)}
            aria-label={`Navigate to ${category.name}`}
          >
            {category.icon}
            <span className="ml-3 text-sm">{category.name}</span>
          </button>
        ))}
      </div>
    );
  });

  return (
    <aside
      className={`min-h-screen h-full transition-all duration-300 ease-in-out ${
        showSidebar ? "block" : "hidden"
      } md:block w-full`}
    >
      <div className="p-4 overflow-y-auto h-screen scroll-smooth">
        <SideBarSection categories={mainCategories} />
        <SideBarSection categories={exploreCategories} title="Explore" />
        <SideBarSection categories={libraryCategories} title="Library" />
        <SideBarSection categories={settingsCategories} title="Settings" />
        <div className="h-5" />
      </div>
    </aside>
  );
}

export default SideBar;
