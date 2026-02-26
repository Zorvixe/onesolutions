import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { assests } from "../../assests/assests";
import MessageMenu from "./MessageMenu";
import { MdSend } from "react-icons/md";
import "./ChatMain.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;


const ChatRoom = ({ roomId, roomName, user, socket, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentScrollDate, setCurrentScrollDate] = useState("");
  // Add these state variables at the top of the component
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const scrollTimeoutId = useRef(null);

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages and setup socket listener
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://apiose.onesolutionsekam.in/api/chat/messages/${roomId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    if (socket) {
      socket.on("group_message", (newMsg) => {
        if (newMsg.room_id === parseInt(roomId)) {
          setMessages((prev) => [...prev, newMsg]);
        }
      });
    }

    return () => {
      if (socket) socket.off("group_message");
    };
  }, [roomId, socket]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const message = {
      room_id: roomId,
      sender_id: user.id,
      message: newMessage,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://apiose.onesolutionsekam.in/api/chat/messages`,
        message,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Helper function to format dates
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };
  // Add these functions
  const handleEditMessage = async (messageId, newText) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://apiose.onesolutionsekam.in/api/chat/messages/${messageId}`,
        { message: newText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages(messages.map(msg =>
        msg.id === messageId ? { ...msg, message: newText } : msg
      ));
      setEditingMessage(null);
      setEditText("");
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://apiose.onesolutionsekam.in/api/chat/messages/${messageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Scroll handler to update the constant date overlay
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Clear any previous timeout to hide the overlay
      if (scrollTimeoutId.current) {
        clearTimeout(scrollTimeoutId.current);
      }

      // Find the message element closest to the top of the container
      const containerRect = container.getBoundingClientRect();
      const messageElements = container.querySelectorAll(".message");
      let closest = null;
      let closestDistance = Infinity;
      messageElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerRect.top);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = el;
        }
      });
      if (closest) {
        const date = closest.getAttribute("data-date");
        setCurrentScrollDate(date);
      }

      // Hide the overlay after 1 second of no scrolling
      scrollTimeoutId.current = setTimeout(() => {
        setCurrentScrollDate("");
      }, 1000);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutId.current) {
        clearTimeout(scrollTimeoutId.current);
      }
    };
  }, [messages]);

  // Update the message rendering part
  const renderMessages = () => {
    return messages.map((msg) => (
      <div
        key={msg.id}
        className={`message ${msg.adminname === user.adminname ? "sent" : "received"}`}
        data-date={formatDate(msg.created_at)}
      >
        <img src={msg.admin_image_link} alt={msg.adminname} />
        {msg.adminname === user.adminname && (
            <MessageMenu
              onEdit={() => {
                setEditingMessage(msg.id);
                setEditText(msg.message);
              }}
              onDelete={() => handleDeleteMessage(msg.id)}
              position={msg.adminname === user.adminname ? "right" : "left"}
            />
          )}
        <div className="name-msg-container">
          {msg.sender_id !== user.id && (
            <h6 style={{ color: stringToColor(msg.adminname) }} className="msg-admin-name">
              {msg.adminname}
            </h6>
          )}
            <p className="msg-admin-message">
              {msg.message && (msg.message.charAt(0).toUpperCase() + msg.message.slice(1))}
            </p>
          <div className="time-container">
            <small className="msg-time">
              {new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </small>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="chat-room">
      <div className="chatroom-admin-container">
        <div className="name-status-image-container">
          {onBack && (
            <button className="back-button" onClick={onBack}>
              &larr;
            </button>
          )}
          <img src={user.adminImage} alt={user.adminname} className="adminimage" />
          <div className="name-status-container">
            <h6>{user.adminname}</h6>
          </div>
        </div>
        {/* Display the selected group name */}
        <div className="group-name-container-header">
          {roomName && <h4 className="group-name-header big-room-name">{roomName}</h4>}
        </div>
      </div>
      {roomName && <h4 className="group-name-header small-room-name">{roomName}</h4>}
      <div
        ref={messagesContainerRef}
        className="messages scroll-container-chats"
        style={{
          backgroundImage: `url(${assests.whatsapp_chat_bg})`,
          backgroundSize: "cover",
          position: "relative"
        }}
      >
        {renderMessages()}
        <div ref={messagesEndRef} />
        {currentScrollDate && (
          <div className="date-overlay">
            {currentScrollDate}
          </div>
        )}
      </div>
       <div className="message-input">
              <input
                type="text"
                value={editingMessage ? editText : newMessage}
                onChange={(e) =>
                  editingMessage
                    ? setEditText(e.target.value)
                    : setNewMessage(e.target.value)
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (editingMessage) {
                      handleEditMessage(editingMessage, editText);
                    } else {
                      sendMessage();
                    }
                  }
                }}
                placeholder="Type a message"
              />
              <button
                onClick={() =>
                  editingMessage ? handleEditMessage(editingMessage, editText) : sendMessage()
                }
              >
                <MdSend size={20} color="#fff" />
              </button>
            </div>
    </div>
  );
};

export default ChatRoom;