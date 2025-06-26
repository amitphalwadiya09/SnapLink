import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import "../Styles/Comment.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment-container">
      <Avatar className="comment-avatar">
        <AvatarImage src={comment?.author?.profilePicture} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="comment-text">
        <span className="comment-username">{comment?.author.username}</span>
        <span className="comment-body">{comment?.text}</span>
      </div>
    </div>
  );
};

export default Comment;
