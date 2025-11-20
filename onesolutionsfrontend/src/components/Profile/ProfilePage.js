// 📄 src/components/Profile/ProfilePage.js
import React from "react";
import CompleteProfileUpdate from "./CompleteProfileUpdate";

const ProfilePage = () => {
  return (
    <div className="profile-page-container">
      {/* Right: Update Form */}
      <div className="profile-right">
        <CompleteProfileUpdate />
      </div>
    </div>
  );
};

export default ProfilePage;
