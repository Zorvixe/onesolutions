import React, { useState, useEffect, useMemo } from "react";
import PendingAdmins from "../AdminPanelRegister/AdminApproval/PendingAdmins";
import {
  MdChat,
  MdGroups,
  MdTaskAlt,
  MdMoreHoriz,
  MdSettings,
  MdAccountCircle,
  MdVpnKey,
  MdLogout,
  MdFullscreen,
  MdFullscreenExit,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { Edit, Trash } from "lucide-react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./ChatMain.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ChatRoomsList = ({ user, onSelectChat }) => {
  const [rooms, setRooms] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [activeTab, setActiveTab] = useState("chats");
  const [loading, setLoading] = useState(false);
  // State to track which room's dropdown is open (null if none)
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [adminDetails, setAdminDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
    fetchAdmins();
  }, []);

  const toggleScreen = () => {
    if (location.pathname === "/chatts") {
      navigate(-1); // back to previous or drawer page
    } else {
      navigate("/chatts");
    }
  };

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        console.log({ error });
        return;
      }
      try {
        const response = await fetch(`https://apiose.onesolutionsekam.in/api/admin/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch admin details");
          return;
        }
        const data = await response.json();
        setAdminDetails(data);
        document.title = `ONE - ${data.adminname?.toUpperCase()}`;
      } catch (err) {
        setError("An error occurred while fetching admin details.");
      }
    };
    fetchAdminDetails();
  }, []);

  // Define currentAdminPhone from fetched adminDetails
  const currentAdminPhone = adminDetails?.phone;

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://apiose.onesolutionsekam.in/api/chat/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(response.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      toast.error("Failed to fetch rooms");
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const [adminsResponse, statusResponse] = await Promise.all([
        axios.get(`https://apiose.onesolutionsekam.in/api/admins/approved`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`https://apiose.onesolutionsekam.in/api/admins/status/individual`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const adminsWithStatus = adminsResponse.data.map((admin) => {
        const status = statusResponse.data.find(
          (s) => String(s.id) === String(admin.id)
        );
        return {
          ...admin,
          is_online: status ? status.is_online : false,
        };
      });
      setAdminList(adminsWithStatus);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to fetch admins");
      setLoading(false);
    }
  };

  const createRoom = async () => {
    if (newRoomName.trim()) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        await axios.post(
          `https://apiose.onesolutionsekam.in/api/chat/rooms`,
          { room_name: newRoomName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewRoomName("");
        fetchRooms();
        setLoading(false);
      } catch (error) {
        console.error("Error creating chat room:", error);
        toast.error("Failed to Create Group");
        setLoading(false);
      }
    }
  };

  // Functions for editing and deleting groups
  const handleEdit = (room) => {
    const newName = prompt("Enter new group name:", room.room_name);
    if (newName && newName.trim() && newName !== room.room_name) {
      updateRoom(room.id, newName);
    }
  };

  const updateRoom = async (roomId, newName) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `https://apiose.onesolutionsekam.in/api/chat/rooms/${roomId}`,
        { room_name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Group updated successfully");
      fetchRooms();
      setLoading(false);
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("Failed to update group");
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        await axios.delete(`https://apiose.onesolutionsekam.in/api/chat/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Group deleted successfully");
        fetchRooms();
        setLoading(false);
      } catch (error) {
        console.error("Error deleting group:", error);
        toast.error("Failed to delete group");
        setLoading(false);
      }
    }
  };

  const socket = io(`https://apiose.onesolutionsekam.in/`); // Replace with your server URL
  // In ChatRoomsList component
  useEffect(() => {
    if (socket) {
      // Listen for admin online/offline events
      socket.on("admin_online", (adminId) => {
        setAdminList((prev) =>
          prev.map((admin) =>
            admin.id === adminId ? { ...admin, is_online: true } : admin
          )
        );
      });

      socket.on("admin_offline", (adminId) => {
        setAdminList((prev) =>
          prev.map((admin) =>
            admin.id === adminId ? { ...admin, is_online: false } : admin
          )
        );
      });
    }

    return () => {
      if (socket) {
        socket.off("admin_online");
        socket.off("admin_offline");
      }
    };
  }, [socket]);

  const updateAdmin = () => {
    navigate(`/edit-profile`);
  };

  const resetPassward = () => {
    navigate(`/reset-password`);
  };

  // Memoized sorted admin list using phone number.
  // If the current admin is not present in adminList, add adminDetails manually.
  const sortedAdmins = useMemo(() => {
    if (!currentAdminPhone) return adminList;
    const current = adminList.filter(
      (admin) => String(admin.phone) === String(currentAdminPhone)
    );
    const others = adminList.filter(
      (admin) => String(admin.phone) !== String(currentAdminPhone)
    );
    if (current.length === 0 && adminDetails) {
      return [adminDetails, ...adminList];
    }
    return [...current, ...others];
  }, [adminList, currentAdminPhone, adminDetails]);

  const getAvatarColor = (newRoomName) => {
    // Array of allowed colors (excluding white and pink variants)
    const colors = [
      "#FFB74D", // orange
      "#4DB6AC", // teal
      "#7986CB", // indigo
      "#81C784", // green
      "#64B5F6", // blue
      "#BA68C8", // purple
    ];

    // Create simple hash from username
    const hash = newRoomName
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + (acc << 5) - acc, 0);

    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="chat-room-list-main-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="chat-selection-bar">
        {/* Top section with Chats, Groups, Approval and small-device Settings */}
        <div className="top-icons">
          <div className="small-device-conditions">
            <div>
              <h3 className="chats-name">Chats</h3>
            </div>
            <div className="select-icons-column">
              <div
                className={`chats-icon-container ${
                  activeTab === "chats" ? "active" : ""
                }`}
                data-tooltip="Chats"
                onClick={() => setActiveTab("chats")}
              >
                <MdChat
                  size={24}
                  color={activeTab === "chats" ? "blue" : "gray"}
                />
              </div>
              <div
                className={`chats-icon-container ${
                  activeTab === "groups" ? "active" : ""
                }`}
                data-tooltip="Groups"
                onClick={() => setActiveTab("groups")}
              >
                <MdGroups
                  size={24}
                  color={activeTab === "groups" ? "green" : "gray"}
                />
              </div>
              <div
                className={`chats-icon-container ${
                  activeTab === "approval" ? "active" : ""
                }`}
                data-tooltip="Approval"
                onClick={() => setActiveTab("approval")}
              >
                <MdTaskAlt
                  size={24}
                  color={activeTab === "approval" ? "orange" : "gray"}
                />
              </div>
              {/* Settings icon for small devices */}
              <div className="settings-icon-wrapper" id="small-device-settings">
                <div
                  className={`chats-icon-container ${
                    activeTab === "settings" ? "active" : ""
                  }`}
                  data-tooltip="Settings"
                  onClick={() => setActiveTab("settings")}
                >
                  <MdSettings
                    size={24}
                    color={activeTab === "settings" ? "black" : "gray"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Separate Settings icon for larger devices */}
        <div className="settings-icon-wrapper" id="large-device-settings">
          <div
            className={`chats-icon-container ${
              activeTab === "settings" ? "active" : ""
            }`}
            data-tooltip="Settings"
            onClick={() => setActiveTab("settings")}
          >
            <MdSettings
              size={24}
              color={activeTab === "settings" ? "black" : "gray"}
            />
          </div>
        </div>
      </div>

      <div className="chat-rooms">
        <div className="create-room">
          <input
            type="text"
            placeholder="New Group Name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button onClick={createRoom}>Save</button>
        </div>
        {activeTab === "groups" && (
          <div className="chats-list-containers">
            <h4 className="admin-group-headings">Chat Groups</h4>
            <ul>
              <div className="scroll-container">
                {loading ? (
                  <div className="empty-message-or-empty-loader">
                    <div className="loader-approval"></div>
                  </div>
                ) : rooms.length === 0 ? (
                  <div className="empty-message-or-empty-loader">
                    <p>No Groups Created Yet!</p>
                  </div>
                ) : (
                  <ul>
                    {rooms.map((room) => (
                      <div className="group-list-section" key={room.id}>
                        <div
                          className="group-logo"
                          style={{
                            backgroundColor: getAvatarColor(room.room_name),
                            color: "white",
                          }}
                        >
                          {room.room_name
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <li
                          className="group-lists list-sections-orders"
                          onClick={() =>
                            onSelectChat({
                              type: "group",
                              id: room.id,
                              roomName: room.room_name,
                            })
                          }
                        >
                          <span className="group-name">{room.room_name}</span>
                          <div className="group-options relative">
                            <MdMoreHoriz
                              className="more-icon cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdown(
                                  activeDropdown === room.id ? null : room.id
                                );
                              }}
                            />
                            {activeDropdown === room.id && (
                              <div className="dropdown-menu absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200">
                                <span
                                  className="flex items-center gap-2 p-2 w-full text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveDropdown(null);
                                    handleEdit(room);
                                  }}
                                >
                                  <Edit size={16} /> Edit
                                </span>
                                <span
                                  className="flex items-center gap-2 p-2 w-full text-red-600 hover:bg-red-100 rounded-md cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveDropdown(null);
                                    handleDelete(room.id);
                                  }}
                                >
                                  <Trash size={16} /> Delete
                                </span>
                              </div>
                            )}
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            </ul>
          </div>
        )}
        {activeTab === "chats" && (
          <div className="chats-list-containers">
            <div className="name-max-min-screen-con">
              <h4 className="admin-group-headings">Admins</h4>
              <div onClick={toggleScreen} className="min-max-button">
                {isFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
              </div>
            </div>
            <div className="scroll-container">
              {loading ? (
                <div className="empty-message-or-empty-loader">
                  <div className="loader-approval"></div>
                </div>
              ) : (
                <>
                  {sortedAdmins.map((admin) => (
                    <li
                      className="list-sections-orders"
                      key={admin.id}
                      onClick={() =>
                        onSelectChat({
                          type: "direct",
                          admin: {
                            id: admin.id,
                            adminname: admin.adminname,
                            admin_image_link: admin.admin_image_link,
                            is_online: admin.is_online,
                            phone: admin.phone, // ensure the phone number is passed
                          },
                        })
                      }
                    >
                      <div className="admin-lists">
                        <img
                          src={admin.admin_image_link}
                          alt={admin.adminname}
                          className="adminimage"
                        />
                        <div>
                          <p className="admin-list-chatroom">
                            <strong>
                              {String(admin.phone) === String(currentAdminPhone)
                                ? "Me"
                                : admin.adminname}
                            </strong>
                          </p>
                          <p className="admin-list-chatroom phone-num">
                            {admin.phone}
                          </p>
                          <p className="admin-list-chatroom employee-id">
                            ID: ONE000{admin.id}0{admin.phone.slice(0, 4)}
                          </p>
                        </div>
                        <div className="status-container">
                          <div className="status-indicator">
                            <div
                              className={`status-dot ${
                                admin.is_online ? "online" : "offline"
                              }`}
                            ></div>
                            <span
                              className={`status-text ${
                                admin.is_online ? "Online" : "Offline"
                              }`}
                            >
                              {admin.is_online ? "Online" : "Offline"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
        {activeTab === "approval" && (
          <div className="chats-list-containers">
            <h4 className="admin-group-headings">Pending Approval Admins</h4>
            <div className="scroll-container">
              <PendingAdmins />
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="chats-list-containers">
            <h4 className="admin-group-headings">Settings</h4>
            <div className="settngs-control-eml-details">
              {adminDetails && (
                <img
                  src={adminDetails.admin_image_link}
                  alt=""
                  className="settings-empl-image"
                  style={{ borderColor: "#212121" }}
                />
              )}
              <h1 className="empl-name-phn">{adminDetails.adminname}</h1>
              <h1 className="empl-name-phn">+91 {adminDetails.phone}</h1>
            </div>
            <div className="settings-scroller-container">
              <div className="settings-controls-list-container">
                <div
                  type="button"
                  className="settings-controls-button"
                  onClick={updateAdmin}
                >
                  <MdAccountCircle size={24} style={{ marginRight: "8px" }} />
                  My Profile
                </div>
                <div
                  type="button"
                  className="settings-controls-button"
                  onClick={resetPassward}
                >
                  <MdVpnKey size={20} style={{ marginRight: "8px" }} />
                  Reset Password
                </div>
              </div>
              <div
                type="button"
                className="settings-controls-button-logout"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                <MdLogout size={20} style={{ marginRight: "8px" }} />
                Log Out
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoomsList;
