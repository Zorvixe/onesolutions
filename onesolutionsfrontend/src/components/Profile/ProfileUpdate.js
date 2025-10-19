import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileUpdate.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

const ProfileUpdate = () => {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch current profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          const s = res.data.data.student;
          setStudent(s);
          setFormData({
            firstName: s.firstName || "",
            lastName: s.lastName || "",
            email: s.email || "",
            phone: s.phone || "",
            password: "",
          });
          setPreview(s.profileImage);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setMessage("Failed to load profile.");
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (profileImage) data.append("profileImage", profileImage);

    try {
      const res = await axios.put(`${API_BASE_URL}/api/auth/profile/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setStudent(res.data.data.student);
        setMessage("✅ Profile updated successfully!");
        setFormData((prev) => ({ ...prev, password: "" }));
      } else {
        setMessage("⚠️ Failed to update profile.");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setMessage(
        err.response?.data?.message || "❌ Server error during profile update."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!student) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-update-container">
      <h2 className="profile-update-title">Update Profile</h2>

      {message && (
        <p className={`profile-update-message ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="profile-update-form">
        <div className="profile-update-image-section">
          <img
            src={preview || "/default-profile.png"}
            alt="Profile"
            className="profile-update-image"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="profile-update-file"
          />
        </div>

        <div className="profile-update-inputs">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="profile-update-input"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="profile-update-input"
          />
        </div>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="profile-update-input"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="profile-update-input"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="profile-update-input"
        />

        <button
          type="submit"
          disabled={loading}
          className="profile-update-button"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
