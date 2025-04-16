import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Video = lazy(() => import("./pages/Video"));

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0F0F0F] text-white min-h-screen">
        <NavBar />
        <div className="mt-[3.7rem] flex w-full">
          <div className="w-3/10 border-r border-gray-200">
            <SideBar />
          </div>
          <Suspense
            fallback={<div className="flex items-center">Loading...</div>}
          >
            <div className="w-7/10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:videoId" element={<Video />} />
              </Routes>
            </div>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
