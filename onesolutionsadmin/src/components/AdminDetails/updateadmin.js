import React, { useState, useEffect } from "react";
import { assests } from "../../assests/assests";
import { ToastContainer, toast } from "react-toastify";

import "./updateadmin.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const UpdateAdmin = () => {
  const [adminDetails, setAdminDetails] = useState({
    adminname: "",
    username: "",
    phone: "",
    admin_image_link: "",
    password: "",
  });
  const [file, setFile] = useState(null); // State to hold the selected file

  const fetchAdminDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming JWT token is stored in localStorage
      const response = await fetch(`https://ose.onesolutionsekam.in/api/admin/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAdminDetails(data);
      } else {
        toast.error(data.error || "Failed to fetch admin details.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching admin details.");
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Replace with your authentication method
      const response = await fetch(`https://ose.onesolutionsekam.in/api/admin/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adminDetails),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Admin details updated successfully.");
      } else {
        toast.error(data.error || "Failed to update admin details.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating admin details.");
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sfdqoeq5");
    formData.append("cloud_name", "dsjcty43b");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsjcty43b/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Update the file state
    if (selectedFile) {
      const imageUrl = await uploadImageToCloudinary(selectedFile);
      if (imageUrl) {
        setAdminDetails((prevData) => ({
          ...prevData,
          admin_image_link: imageUrl,
        }));
      }
    }
  };

  return (
    <div className="profile-body">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <img src={assests.profile_side_image} className="profile-side-image" />

      <div
        style={{ padding: "20px", maxWidth: "100%" }}
        className="profile-container"
      >
        <p className="profile-heading">Profile</p>
        <form onSubmit={handleSubmit}>
          <div className="profile-image-container">
            <label>Photo</label>
            <div className="profile-image-border-container">
              <img
                src={adminDetails.admin_image_link}
                className="image-profile"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ width: "100%", padding: "8px" }}
                id="image"
                hidden
              />
              <label htmlFor="image" className="upload_icon-profile-contianer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-cloud-arrow-up arrow-uploader"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                  />
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg>
                <p>Upload Photo</p>
              </label>
            </div>
          </div>
          <div className="input-lable-container">
            <label htmlFor="adminname">Full Name</label>
            <input
              id="adminname"
              type="text"
              name="adminname"
              value={adminDetails.adminname}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div className="input-lable-container">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={adminDetails.username}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div className="input-lable-container">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={adminDetails.phone}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div className="input-lable-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="***********"
              value={adminDetails.password}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div className="save-button-container">
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdmin;
