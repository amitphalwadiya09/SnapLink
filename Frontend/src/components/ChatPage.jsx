import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";
import "../Styles/ChatPage.css";

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `https://snaplink-lxa1.onrender.com/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="chat-wrapper">
      <section
        className={`user-list-section ${
          selectedUser ? "hidden sm:flex sm:flex-col" : ""
        }`}
      >
        <h1 className="user-list-header">{user?.username}</h1>
        <hr className="border-gray-700" />
        <div className="user-list-scroll">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                key={suggestedUser._id}
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="user-list-item"
              >
                <Avatar className="w-12 h-12 userItem">
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser?.username}</span>
                  <span
                    className={`text-xs font-bold ${
                      isOnline ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedUser ? (
        <section className="chat-section active">
          <Messages
            selectedUser={selectedUser}
            onBack={() => dispatch(setSelectedUser(null))}
          />

          <div className="chat-input-wrapper">
            <input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex message-input "
              placeholder="Messages..."
            />
            <button
              onClick={() => sendMessageHandler(selectedUser?._id)}
              className="messageSendButton"
            >
              Send
            </button>
          </div>
        </section>
      ) : (
        <div className="chat-placeholder">
          <MessageCircleCode className="w-24 h-24 mb-4" />
          <h1 className="font-medium text-lg">Your messages</h1>
          <span>Send a message to start a chat.</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
