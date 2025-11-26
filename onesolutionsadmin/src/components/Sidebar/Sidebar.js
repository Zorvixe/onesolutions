"use client";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import {
  FaFile,
  FaLandmark,
  FaShieldAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { OnlineStatusContext } from "../Context/OnlineStatusContext";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { isOnline } = useContext(OnlineStatusContext);
  const [activeItem, setActiveItem] = useState("home");

  const menuItems = [
    {
      id: "home",
      icon: <IoHomeSharp />,
      path: "/home",
      label: "Home",
    },
    {
      id: "jobs",
      icon: <MdWork />,
      path: "/admin",
      label: "Jobs",
    },
    {
      id: "chat",
      icon: <HiOutlineChatAlt2 />,
      path: "/chatts",
      label: "Chat",
    },
    {
      id: "resumes",
      icon: <FaFile />,
      path: "/resumes",
      label: "Resumes",
    },
    {
      id: "profile",
      icon: <FaUser />,
      path: "/edit-profile",
      label: "Profile",
    },
    {
      id: "Live Classes",
      icon: <FaLandmark />,
      path: "/live_classes",
      label: "Live Classes",
    },
    {
      id: "Achievements",
      icon: <FaShieldAlt />,
      path: "/achievements",
      label: "Achievements",
    },
    {
      id: "StudnetRegister",
      icon: <FaUserPlus />,
      path: "/student_register",
      label: "Student Register",
    },
  ];

  const handleNavigate = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleNavigate(item)}
            title={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-tooltip">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button
          className="sidebar-item logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          <span className="sidebar-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-box-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRulee="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
              />
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
              />
            </svg>
          </span>
          <span className="sidebar-tooltip">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
