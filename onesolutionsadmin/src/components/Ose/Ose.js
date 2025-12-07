import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../components/Ose/layout/AdminLayout";
import DiscussionManagement from "../../components/Ose/pages/DiscussionManagement/DiscussionManagement";
import DiscussionThreadDetail from "../../components/Ose/pages/ThreadDetail/DiscussionThreadDetail";
import FeedbackManagement from "../../components/Ose/pages/FeedbackManagement/FeedbackManagement";

function Ose() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="discussions" element={<DiscussionManagement />} />
        <Route
          path="discussions/thread/:threadId"
          element={<DiscussionThreadDetail />}
        />
        <Route path="feedback" element={<FeedbackManagement />} />
      </Route>
    </Routes>
  );
}

export default Ose;
