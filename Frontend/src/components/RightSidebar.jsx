import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";
import "../Styles/rightSidebar.css";
import { GiFallingBlob } from "react-icons/gi";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const [showSuggestions, setShowSuggestions] = useState(false);
  return (
    <>
      <div className="right-sidebar">
        <div className="user-section">
          <Link to={`/profile/${user?._id}`}>
            <Avatar className="w-2">
              <AvatarImage src={user?.profilePicture} alt="profile" />
              <AvatarFallback>
                Am
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="user-info">
            <h1>
              <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
            </h1>
            <span>{user?.bio || "Bio here..."}</span>
          </div>
        </div>
        <SuggestedUsers />
      </div>

      <div className="topbar">
        <h1 className="logo">
          <GiFallingBlob />
        </h1>
        <button
          className="suggestion-toggle-btn"
          onClick={() => setShowSuggestions((prev) => !prev)}
        >
          {showSuggestions ? "Hide Suggestions" : "Show Suggestions"}
        </button>
        {showSuggestions && <SuggestedUsers />}
      </div>
    </>
  );
};

export default RightSidebar;
