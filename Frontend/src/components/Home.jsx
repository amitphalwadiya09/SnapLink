import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import LeftSidebar from "./LeftSidebar";
import "../Styles/home.css";
const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <div className="home-container">
      <div className="home-layout">
        <LeftSidebar />
        <main className="home-feed">
          <Feed />
          <Outlet />
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
