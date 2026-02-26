import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { assests } from "../../assests/assests";
import MessageMenu from "./MessageMenu";
import { MdSend } from "react-icons/md";
import "./ChatMain.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;


const DirectChat = ({ recipient, user, socket, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentScrollDate, setCurrentScrollDate] = useState("");
  // For editing messages via the bottom input
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const scrollTimeoutId = useRef(null);

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages and listen for socket events
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!user.phone || !recipient.phone) {
          console.error("Missing phone number for user or recipient");
          return;
        }
        const response = await axios.get(
          `https://apiose.onesolutionsekam.in/api/chat/direct-messages/${user.phone}/${recipient.phone}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching direct messages:", error);
      }
    };

    fetchMessages();

    if (socket) {
      socket.on("direct_message", (newMsg) => {
        if (
          (newMsg.sender_phone === recipient.phone &&
            newMsg.recipient_phone === user.phone) ||
          (newMsg.sender_phone === user.phone &&
            newMsg.recipient_phone === recipient.phone)
        ) {
          setMessages((prev) => [...prev, newMsg]);
        }
      });
    }

    return () => {
      if (socket) socket.off("direct_message");
    };
  }, [recipient.phone, user.phone, socket]);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!recipient.phone) {
      console.error("Recipient phone is missing");
      return;
    }
    const messagePayload = {
      recipient_phone: recipient.phone,
      message: newMessage,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://apiose.onesolutionsekam.in/api/chat/direct-messages`,
        messagePayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage("");
    } catch (error) {
      console.error("Error sending direct message:", error);
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

  // Scroll handler to update the date overlay
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrollTimeoutId.current) {
        clearTimeout(scrollTimeoutId.current);
      }
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

  // Edit and delete functions
  const handleEditMessage = async (messageId, newText) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://apiose.onesolutionsekam.in/api/chat/direct-messages/${messageId}`,
        { message: newText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages(messages.map(msg =>
        msg.id === messageId ? { ...msg, message: newText } : msg
      ));
      setEditingMessage(null);
      setEditText("");
    } catch (error) {
      console.error("Error editing direct message:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://apiose.onesolutionsekam.in/api/chat/direct-messages/${messageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error("Error deleting direct message:", error);
    }
  };

  return (
    <div className="chat-room">
      <div className="chatroom-admin-container">
        <div className="direct-chat-admin-name-image">
          {onBack && (
            <button className="back-button" onClick={onBack}>
              &larr;
            </button>
          )}
          <div className="name-status-image-container">
            <img
              src={recipient.admin_image_link}
              alt={recipient.adminname}
              className="adminimage"
            />
            <div className="name-status-container">
              <h6>{recipient.adminname}</h6>
              <span className="chat-room-status-text">
                {recipient.is_online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="messages scroll-container-chats"
        style={{
          backgroundImage: `url(${assests.whatsapp_chat_bg})`,
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender_phone === user.phone ? "sent" : "received"}`}
            data-date={formatDate(msg.created_at)}
          >
            <img
              src={
                msg.sender_phone === user.phone
                  ? user.adminImage
                  : recipient.admin_image_link
              }
              alt={
                msg.sender_phone === user.phone
                  ? user.adminname
                  : recipient.adminname
              }
            />
            {/* Render MessageMenu only for messages sent by the user */}
            {msg.sender_phone === user.phone && (
              <div className="msg-sent-arrow-container">
                <MessageMenu
                  onEdit={() => {
                    setEditingMessage(msg.id);
                    setEditText(msg.message);
                  }}
                  onDelete={() => handleDeleteMessage(msg.id)}
                  position="right"
                />
              </div>
            )}
            <div className="name-msg-container-direct">
              <p className="msg-admin-message-direct">
                {msg.message &&
                  (msg.message.charAt(0).toUpperCase() + msg.message.slice(1))}
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
        ))}
        <div ref={messagesEndRef} />
        {currentScrollDate && (
          <div className="date-overlay">{currentScrollDate}</div>
        )}
      </div>

      {/* Bottom input re-used for both sending and editing */}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DirectChat;