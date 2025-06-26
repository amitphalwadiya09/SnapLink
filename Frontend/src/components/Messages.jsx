import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";
import "../Styles/Messages.css";
import { Link } from "react-router-dom";

const Messages = ({ selectedUser, onBack }) => {
  useGetRTM();
  useGetAllMessage();

  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  // Filter only messages between logged-in user and selected user
  // const filteredMessages = messages?.filter(
  //   (msg) =>
  //     (msg.senderId === user._id && msg.receiverId === selectedUser._id) ||
  //     (msg.senderId === selectedUser._id && msg.receiverId === user._id)
  // );

  return (
    <div className="messages-container">
      <div className="messages-header">
        <button onClick={onBack} className="back-btn md:hidden" variant="ghost">
          ←
        </button>
        <div className="user-info">
          <Avatar>
            <AvatarImage src={selectedUser?.profilePicture} />
            <AvatarFallback>
              {selectedUser?.username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
        </div>
        {/* <Button variant="secondary">View Profile</Button> */}
        <div className="viewProfileButton">
          <Link to={`/profile/${selectedUser?._id}`}>
            <button className="viewProfileButton" variant="secondary">
              View profile
            </button>
          </Link>
        </div>
      </div>

      <div className="messages-body">
        {/* {messages &&
          messages.map((msg) => {
            return (
              <div
                key={msg._id}
                className={`message-bubble ${
                  msg.senderId === user.id ? "sent" : "received"
                }`}
              >
                <div
                  className={` flex ${
                    msg.senderId === user?._id ? "sender" : "received"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })} */}
        {messages &&
          messages.map((msg) => {
            return (
              <div
                key={msg._id}
                className={`message-bubble ${
                  msg.senderId === user._id ? "sent" : "received"
                }`}
              >
                <div className="message-text">{msg.message}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Messages;
