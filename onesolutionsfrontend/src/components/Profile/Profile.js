import React from "react";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Get base URL for images
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002'}${imagePath}`;
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Student Profile</h2>

        {/* Profile Image */}
        <div className="profile-image-section">
          {user?.profileImage ? (
            <div className="profile-image-container">
              <img
                src={getImageUrl(user.profileImage)}
                alt={`${user.firstName} ${user.lastName}`}
                className="profile-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="profile-image-placeholder" style={{display: 'none'}}>
                <span>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</span>
              </div>
            </div>
          ) : (
            <div className="profile-image-placeholder">
              <span>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="profile-info">
          <div className="info-item">
            <label>Student ID:</label>
            <span>{user?.studentId}</span>
          </div>

          <div className="info-item">
            <label>Full Name:</label>
            <span>{user?.firstName} {user?.lastName}</span>
          </div>

          <div className="info-item">
            <label>Email:</label>
            <span>{user?.email}</span>
          </div>

          {user?.phone && (
            <div className="info-item">
              <label>Phone:</label>
              <span>{user.phone}</span>
            </div>
          )}

          {user?.batchMonth && (
            <div className="info-item">
              <label>Batch:</label>
              <span>{user.batchMonth} {user.batchYear}</span>
            </div>
          )}

          {user?.isCurrentBatch && (
            <div className="info-item">
              <label>Current Batch:</label>
              <span className="status-badge active">Yes</span>
            </div>
          )}

          <div className="info-item">
            <label>Member Since:</label>
            <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleLogout} className="btn btn-logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;