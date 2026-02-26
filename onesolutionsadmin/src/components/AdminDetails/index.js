import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admindetails.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AdminDetails = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
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
      } catch (err) {
        setError("An error occurred while fetching admin details.");
      }
    };

    fetchAdminDetails();
  }, []);

  if (error) {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const updateAdmin = () => {
    navigate(`/edit-profile`);
  };

  return (
    <div className="admin-details-container">
      {!adminDetails ? (
        <div></div>
      ) : (
        <div className="admin-details">
          <div>
            <img
              src={adminDetails.admin_image_link}
              alt="Admin"
              className="admin-image"
            />
          </div>
          <div className="admin-name-container">
            <p>{adminDetails.adminname}</p>
            <p>+91 {adminDetails.phone}</p>
            <button
              type="button"
              className="edit-button-admin-details"
              onClick={updateAdmin}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDetails;
