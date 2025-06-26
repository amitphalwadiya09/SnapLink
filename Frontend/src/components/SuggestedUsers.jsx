import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  return (
    <div className="suggested-users">
      <div className="suggested-header">
        <h1>Suggested for you</h1>
        <span className="see-all">See All</span>
      </div>
      {suggestedUsers.map((user) => (
        <div key={user._id} className="suggested-user">
          <div className="suggested-user-info">
            <Link to={`/profile/${user?._id}`}>
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.profilePicture} alt="profile" />
                <AvatarFallback>
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="username-info">
              <h1>
                <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
              </h1>
              <span>{user?.bio || "Bio here..."}</span>
            </div>
          </div>
          <span className="follow-btn">Follow</span>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUsers;
