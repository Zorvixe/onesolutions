import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Login from "./components/Login/Login";
import ProfilePage from "./components/Profile/ProfilePage";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Courses from "./components/Courses/Courses";
import Practice from "./components/Practice/Practice";
import Placements from "./components/Placements/Placements";
import SubtopicPage from "./SubtopicsPage/SubtopicPage";
import CodeGround from "./CodePlayground/CodePlayground";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ThreadDetail from "./NewThreadModal/ThreadDetail";
import SavedSnippets from "./SavedSnippets/SavedSnippets";

// In App.js - add the new route
import WebPractice from "./components/WebPractice/WebPractice";

import { authAPI, progressAPI } from "./services/api";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth();

  const [isAppLoading, setIsAppLoading] = useState(true);

  // -----------------------------
  // 🔥 FORCE LOAD ALL DATA ONCE
  // -----------------------------
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        if (isAuthenticated) {
          await Promise.all([
            authAPI.getProfile(),
            authAPI.getCompleteProfile(),
            progressAPI.getCompletedContent(),
            progressAPI.getProgressSummary(),
            progressAPI.getOverallProgress(),
          ]);
        }
      } catch (error) {
        console.error("[APP INIT] Error loading initial data:", error);
      } finally {
        setIsAppLoading(false); // stop loader
      }
    };

    loadInitialData();
  }, [isAuthenticated]);

  // -----------------------------
  // 🔄 Full Screen Loader Before App Loads
  // -----------------------------
  if (isAuthenticated && isAppLoading) {
    return (
      <div className="global-loader">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated ? (
        <div className="app-container">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/saved-snippets" element={<SavedSnippets />} />

              <Route path="/practice" element={<Practice />} />
              <Route path="/practice/:practiceId" element={<Practice />} />
              <Route
                path="/practice/:practiceId/:questionId"
                element={<Practice />}
              />

              <Route
                path="/web-practice/:practiceId/:questionId"
                element={<WebPractice />}
              />

              <Route path="/placements" element={<Placements />} />

              <Route
                path="/topic/:topicId/subtopic/:subtopicId"
                element={<SubtopicPage />}
              />
              <Route path="/codeGround" element={<CodeGround />} />
              <Route path="/thread/:threadSlug" element={<ThreadDetail />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        <div className="auth-wrapper">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
