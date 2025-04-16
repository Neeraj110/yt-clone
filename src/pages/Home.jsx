import React from "react";
import Feed from "../components/Feed";
import TopBar from "../components/TopBar";

function Home() {
  return (
    <>
      <TopBar />
      <div className="mt-[4.5rem]">
        <Feed />
      </div>
    </>
  );
}

export default Home;
