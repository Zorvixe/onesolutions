import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdCheckCircle, MdCancel } from 'react-icons/md';

import "./PendingAdmins.css"

const API_BASE_URL = process.env.REACT_APP_API_URL;

const PendingAdmins = () => {
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchPendingAdmins();
  }, []);

  // Fetch pending admins
  const fetchPendingAdmins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://apiose.onesolutionsekam.in/api/admin/pending`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPendingAdmins(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending admins:", error);
      toast.error("Failed to fetch pending admins");
      setLoading(false);
    }
  };

  // Approve an admin
  const approveAdmin = async (id) => {
    try {
      const response = await axios.put(
        `https://apiose.onesolutionsekam.in/api/admin/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      setPendingAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.id !== id)
      );
    } catch (error) {
      console.error("Error approving admin:", error);
      toast.error(error.response?.data?.error || "Approval failed");
    }
  };

  // Reject an admin
  const rejectAdmin = async (id) => {
    try {
      const response = await axios.put(
        `https://apiose.onesolutionsekam.in/api/admin/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      setPendingAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.id !== id)
      );
    } catch (error) {
      console.error("Error rejecting admin:", error);
      toast.error(error.response?.data?.error || "Rejection failed");
    }
  };

  return (
    <div className="pending-admins-container">
      <ToastContainer position="top-right" autoClose={3000} />
      {loading ? (
        <div className="empty-message-or-empty-loader">
          <div class="loader-approval"></div>
        </div>
      ) : (
        <>
          {pendingAdmins.length === 0 ? (
            <div className="empty-message-or-empty-loader">
              <p>No Pending admins Approvals</p>
            </div>
          ) : (
            <ul>
              {pendingAdmins.map((admin) => (
                <li key={admin.id} className="admin-item">
                  <div className="admin-details">
                    <img
                      src={admin.admin_image_link}
                      alt={`${admin.adminname}'s profile`}
                      className="admin-avatar"
                    />
                    <div>
                      <p className="admin-approval-data"><strong>Name:</strong> {admin.adminname}</p>
                      <p className="admin-approval-data"><strong>Username:</strong> {admin.username}</p>
                      <p className="admin-approval-data"><strong>Phone:</strong> {admin.phone}</p>
                      <p className="admin-approval-data"><strong>Created At:</strong>
                        {new Date(admin.createdat).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <div className="approve-button"
                    >
                      <button className="approval-buttons"
                        onClick={() => approveAdmin(admin.id)}
                      >
                        Approve
                      </button>
                      <MdCheckCircle size={20} className="tick-icon" />
                    </div>
                    <div className="reject-button"
                    >
                      <button className="approval-buttons"
                        onClick={() => rejectAdmin(admin.id)}
                      >
                        Reject
                      </button>
                      <MdCancel size={20} className="cancel-icon" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default PendingAdmins;
