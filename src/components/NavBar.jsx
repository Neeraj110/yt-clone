import {
  Bell,
  Menu,
  Mic,
  Search,
  UserRoundX,
  Video,
  X,
  Youtube,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useVideoContext } from "../context/VideoContext";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { fetchVideoByQuery } from "../utils/ytApi";
import useDebouce from "../utils/useDebouce";
import { Link } from "react-router-dom";
function NavBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { toggleSidebar, setVideos, setLoading, setError } = useVideoContext();

  const debouncedSearchTerm = useDebouce(searchTerm, 500);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  useEffect(() => {
    if (transcript) {
      setSearchTerm(transcript);
    }
  }, [transcript]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (debouncedSearchTerm) {
      console.log("Searching for:", debouncedSearchTerm);
      try {
        setLoading(true);
        const videos = await fetchVideoByQuery(debouncedSearchTerm);
        setVideos(videos);
        setSearchTerm("");
        setShowSearch(false);
        resetTranscript();
      } catch (error) {
        console.error("Error searching videos:", error);
        setError("Failed to search videos. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
  };

  const handleVoiceSearch = () => {
    if (!browserSupportsSpeechRecognition) {
      alert(
        "Your browser doesn't support speech recognition. Try using Chrome."
      );
      return;
    }

    if (!isMicrophoneAvailable) {
      alert(
        "Microphone access is required for voice search. Please enable it in your browser settings."
      );
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      if (transcript) {
        setTimeout(() => {
          const form = document.querySelector("form");
          if (form)
            form.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true })
            );
        }, 1000);
      }
    } else {
      resetTranscript();
      if (!showSearch && window.innerWidth < 640) {
        setShowSearch(true);
      }
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#ff0000] w-full text-white flex items-center justify-between px-3 py-3 md:px-3 md:py-4 shadow-md z-50">
      <div className="flex items-center gap-2">
        <button
          className="md:hidden p-2"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-white" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <Youtube size={24} />
          <h1 className="text-xl font-bold">YouTube</h1>
        </Link>{" "}
      </div>

      {/* Desktop Search */}
      <div className="hidden sm:flex md:flex flex-1 max-w-xl mx-4">
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="relative flex flex-1">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(e);
              }}
              className="w-full pl-4 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              aria-label="Search videos"
            />
            <button
              type="submit"
              className="bg-gray-100 border border-l-0 border-gray-300 px-5 rounded-r-full hover:bg-gray-200"
              aria-label="Submit search"
            >
              <Search size={20} className="text-gray-600" />
            </button>
          </div>
          <button
            type="button"
            className={`ml-2 p-2 rounded-full hover:bg-gray-200 ${
              isListening
                ? "bg-red-200 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
            aria-label="Search with voice"
            onClick={handleVoiceSearch}
          >
            <Mic size={20} className={isListening ? "animate-pulse" : ""} />
          </button>
        </form>
      </div>

      {/* Mobile Search Input */}
      {showSearch && (
        <div className="absolute top-0 left-0 w-full bg-[#ff0000] px-2 py-4 z-10 md:hidden">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Mobile search videos"
            />
            <button
              type="submit"
              className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label="Submit mobile search"
            >
              <Search size={20} className="text-gray-600" />
            </button>

            <button
              type="button"
              className={`p-1 rounded-full hover:bg-gray-200 ${
                isListening
                  ? "bg-red-200 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
              aria-label="Search with voice"
              onClick={handleVoiceSearch}
            >
              <Mic size={20} className={isListening ? "animate-pulse" : ""} />
            </button>

            <button
              type="button"
              className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
              onClick={handleSearchToggle}
              aria-label="Close mobile search"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </form>
        </div>
      )}

      {/* Right Icons */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 "
          onClick={handleSearchToggle}
          aria-label="Toggle search"
        >
          <Search size={20} />
        </button>

        <button aria-label="Create video">
          <Video size={20} />
        </button>
        <button aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button aria-label="User profile">
          <UserRoundX size={20} />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
