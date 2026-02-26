import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";

import "./profile.css";
const emails = ["username@gmail.com", "user02@gmail.com"];

const API_BASE_URL = process.env.REACT_APP_API_URL;

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  // State for admin details and error
  const [adminDetails, setAdminDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch admin details on component mount
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
      } catch (err) {
        setError("An error occurred while fetching admin details.");
      }
    };

    fetchAdminDetails();
  }, []);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const updateAdmin = () => {
    navigate(`/edit-profile`);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="dialog-container">
        {adminDetails && (
          <img
            src={adminDetails.admin_image_link}
            className="profile-image-dialog"
            alt="Profile"
          />
        )}
        {adminDetails && (
          <h1 className="admin-name-nav">{adminDetails.adminname}</h1>
        )}{" "}
        {adminDetails && (
          <p className="admin-name-nav phone-number">
            +91 {adminDetails.phone}
          </p>
        )}
        <button className="profile-button" type="button" onClick={updateAdmin}>
          Edit Profile
        </button>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ open, onClose }) {
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClose = (value) => {
    setSelectedValue(value);
    onClose(value); // Notify parent component
  };

  return (
    <SimpleDialog
      selectedValue={selectedValue}
      open={open}
      onClose={handleClose}
    />
  );
}
