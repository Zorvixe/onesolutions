// Chatted.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import ChatRoomsList from "./ChatRoomsList";
import ChatRoom from "./ChatRoom";
import DirectChat from "./DirectChat";
import { assests } from "../../assests/assests";
import "./ChatMain.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Chatted = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const socketRef = useRef(null);

  // Fetch current admin data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://ose.onesolutionsekam.in/api/admin/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserPhone(response.data.phone);
        setAdminUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Connect socket after userPhone is available
  useEffect(() => {
    if (userPhone) {
      const newSocket = io(`https://ose.onesolutionsekam.in/`, {
        query: { phone: userPhone },
        reconnection: true,
        transports: ["websocket"],
      });
      newSocket.on("connect", () => {
        console.log("Socket connected with phone:", userPhone);
        newSocket.emit("register_phone", userPhone);
      });
      socketRef.current = newSocket;
      return () => newSocket.disconnect();
    }
  }, [userPhone]);

  const handleSelectChat = (chatData) => {
    // chatData should include type ("group" or "direct")
    // For groups: { type: "group", id, roomName }
    // For direct: { type: "direct", admin: { … } }
    setSelectedChat(chatData);
  };

  if (!adminUser) {
    return (
      <div className="chats-loading-container">
        <img
          src={assests.one_solutions}
          className="one-solutions-image-chats"
        />
        <div className="loader-chats"></div>
      </div>
    );
  }

  // Build a user object from adminUser data
  const currentUser = {
    id: adminUser.id,
    phone: adminUser.phone,
    adminname: adminUser.adminname,
    adminImage: adminUser.admin_image_link,
    is_online: adminUser.is_online,
  };

  const handleBack = () => setSelectedChat(null);

  return (
    <div className="chat-app">
      <div className="sidebar-app">
        <ChatRoomsList user={currentUser} onSelectChat={handleSelectChat} />
      </div>
      <div className="main">
        {selectedChat ? (
          selectedChat.type === "group" ? (
            <ChatRoom
              roomId={selectedChat.id}
              roomName={selectedChat.roomName}
              user={currentUser}
              socket={socketRef.current}
              onBack={handleBack}
            />
          ) : (
            <DirectChat
              recipient={selectedChat.admin}
              user={currentUser}
              socket={socketRef.current}
              onBack={handleBack}
            />
          )
        ) : (
          <div className="chat-select-des">
            <p>Select a chat or group to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatted;
