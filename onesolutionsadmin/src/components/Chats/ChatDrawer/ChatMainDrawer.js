//chatMainDrawer.js
import React, { useState, useEffect, useRef } from "react";
import ChatRoomsList from "../ChatRoomsList";
import ChatRoom from "../ChatRoom";
import DirectChat from "../DirectChat";
import { io } from "socket.io-client";
import "./ChatMainDrawer.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;


const ChatMainDrawer = () => {
  const [selectedChat, setSelectedChat] = useState(null); // Holds either a group chat or direct chat object
  const [adminuser, setAdminUser] = useState(null); // Logged-in admin user data
  const [loading, setLoading] = useState(true); // Loading state for fetching user data
  const [error, setError] = useState(null); // Error state
  const socket = useRef(null);

  const handleBack = () => setSelectedChat(null);


  // Initialize Socket.io connection once
  useEffect(() => {
    socket.current = io(`${api_url}`, {
      transports: ["websocket"],
      withCredentials: true,
    });

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, []);
  
  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(`https://ose.onesolutionsekam.in/api/admin/me`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data. Please try again later.");
        }

        const data = await response.json();
        if (isMounted) {
          setAdminUser(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectChat = (chatData) => {
    // chatData should include type ("group" or "direct")
    // For groups: { type: "group", id, roomName }
    // For direct: { type: "direct", admin: { … } }
    setSelectedChat(chatData);
  };

  if (loading) {
    return (
      <div className="chats-loading-container-drawer">
        <span className="chats-loader"></span>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Build the logged-in user object from fetched adminuser data
  const user = {
    id: adminuser.id,
    adminname: adminuser.adminname,
    adminImage: adminuser.admin_image_link,
    phone: adminuser.phone,
    is_online: adminuser.is_online,
  };

  return (
    <div className="chat-app-drawer">
      <div className="chatrooms-drawer">
      <ChatRoomsList user={user} onSelectChat={handleSelectChat} />

      </div>
      <div className="main-drawer">
        {selectedChat ? (
          selectedChat.type === "group" ? (
            <ChatRoom
              roomId={selectedChat.id}
              roomName={selectedChat.roomName}
              user={user}
              socket={socket.current}
              onBack={handleBack} // Always provide the onBack function
            />) : (
            <DirectChat
              recipient={selectedChat.admin}
              user={user}
              socket={socket.current}
              onBack={handleBack} // Always provide the onBack function
            />
          )
        ) : (
          <div className="chat-select-des">
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMainDrawer;