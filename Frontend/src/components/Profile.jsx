import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import "../Styles/profile.css";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const isFollowing = false;


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <section className="profile-avatar">
          <Avatar className="avatar-lg">
            <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
            <AvatarFallback>
              AM
            </AvatarFallback>
          </Avatar>
        </section>

        <section className="profile-info">
          <div className="profile-username-actions">
            <span className="username">{userProfile?.username}</span>
            {
                  isLoggedInUserProfile ? (
                    <>
                      <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button></Link>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
                      <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
                    </>
                  ) : (
                    isFollowing ? (
                      <>
                        <Button variant='secondary' className='h-8'>Unfollow</Button>
                        <Button variant='secondary' className='h-8'>Message</Button>
                      </>
                    ) : (
                      <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
                    )
                  )
                }
          </div>

          <div className="profile-stats">
            <p>
              <span>{userProfile?.posts.length}</span> posts
            </p>
            <p>
              <span>{userProfile?.followers.length} </span> followers
            </p>
            <p>
              <span>{userProfile?.following.length}</span> following
            </p>
          </div>

          <div className="profile-bio">
            <span>{userProfile?.bio || "bio here..."}</span>
            <Badge variant="secondary" className="profile-badge">
              <AtSign /> {userProfile?.username}
            </Badge>
          </div>
        </section>
      </div>

      <div className="profile-tabs">
        <span
          onClick={() => handleTabChange("posts")}
          className={activeTab === "posts" ? "active-tab" : ""}
        >
          POSTS
        </span>
        <span
          onClick={() => handleTabChange("saved")}
          className={activeTab === "saved" ? "active-tab" : ""}
        >
          SAVED
        </span>
        <span>REELS</span>
        <span>TAGS</span>
      </div>

      <div className="profile-posts-grid">
        {displayedPost?.map((post) => (
          <div key={post._id} className="profile-post-card">
            <img src={post.image} alt="postimage" />
            <div className="post-hover-overlay">
              <button>
                <Heart />
                <span>{post.likes.length}</span>
              </button>
              <button>
                <MessageCircle />
                <span>{post.comments.length}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
