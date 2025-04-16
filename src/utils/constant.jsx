import {
  Home as HomeIcon,
  TrendingUp,
  Gamepad2,
  Music,
  Film,
  Trophy,
  Newspaper,
  Clock,
  ThumbsUp,
  History,
  PlaySquare,
  Flame,
  ShoppingBag,
  Settings,
  HelpCircle,
  Flag,
  Car,
  Cat,
  Backpack,
} from "lucide-react";

const mainCategories = [
  { id: "home", name: "Home", icon: <HomeIcon size={20} /> },
  { id: "shorts", name: "Shorts", icon: <Flame size={20} /> },
  {
    id: "subscriptions",
    name: "Subscriptions",
    icon: <PlaySquare size={20} />,
  },
];

const mobileMainCategories = [
  { id: "home", name: "Home", icon: <HomeIcon size={20} /> },
  { id: "shorts", name: "Shorts", icon: <Flame size={20} /> },
  {
    id: "subscriptions",
    name: "Subscriptions",
    icon: <PlaySquare size={20} />,
  },
  { id: "library", name: "Library", icon: <PlaySquare size={20} /> },
];

const libraryCategories = [
  { id: "history", name: "History", icon: <History size={20} /> },
  { id: "your-videos", name: "Your videos", icon: <PlaySquare size={20} /> },
  { id: "watch-later", name: "Watch later", icon: <Clock size={20} /> },
  { id: "liked", name: "Liked videos", icon: <ThumbsUp size={20} /> },
];

const exploreCategories = [
  { id: "22", name: "Trending", icon: <TrendingUp size={20} /> },
  { id: "10", name: "Music", icon: <Music size={20} /> },
  { id: "20", name: "Gaming", icon: <Gamepad2 size={20} /> },
  { id: "17", name: "Sports", icon: <Trophy size={20} /> },
  { id: "25", name: "News", icon: <Newspaper size={20} /> },
  { id: "24", name: "Movies", icon: <Film size={20} /> },
  { id: "2", name: "Automobiles", icon: <Car size={20} /> },
  { id: "15", name: "Animals", icon: <Cat size={20} /> },
];

const settingsCategories = [
  { id: "settings", name: "Settings", icon: <Settings size={20} /> },
  { id: "report", name: "Report", icon: <Flag size={20} /> },
  { id: "help", name: "Help", icon: <HelpCircle size={20} /> },
];

export {
  mainCategories,
  mobileMainCategories,
  libraryCategories,
  exploreCategories,
  settingsCategories,
};
