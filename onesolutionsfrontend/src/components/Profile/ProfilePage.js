// 📄 src/components/Profile/ProfilePage.js
import React from "react";
import Profile from "./Profile";
import ProfileUpdate from "./ProfileUpdate";
import CompleteProfileUpdate from "./CompleteProfileUpdate";
import "./ProfilePage.css"; // Optional for custom styling

const ProfilePage = () => {
  return (
    <div className="profile-page-container">
      {/* Left: Profile Info */}
      <div className="profile-left">
        <ProfileUpdate />
      </div>

      {/* Right: Update Form */}
      <div className="profile-right">
        <CompleteProfileUpdate />
      </div>
    </div>
  );
};

export default ProfilePage;
