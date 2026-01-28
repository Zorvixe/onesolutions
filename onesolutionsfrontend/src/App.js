import React, { useState } from "react";
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
import JSPractice from "./components/JSPractice/JSPractice";
import Placements from "./components/Placements/Placements";
import SubtopicPage from "./SubtopicsPage/SubtopicPage";
import CodeGround from "./CodePlayground/CodePlayground";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ThreadDetail from "./NewThreadModal/ThreadDetail";
import SavedSnippets from "./SavedSnippets/SavedSnippets";

// In App.js - add the new route
import WebPractice from "./components/WebPractice/WebPractice";

import WebPracticeExam from "./components/WebPractice/WebPracticeExam";
import WebPracticeExamQuestion from "./components/WebPractice/WebPracticeExamQuestion";

import AiApp from "./components/AiApp/AiApp";

import "./App.css";

// Create a wrapper component to handle the loading state properly
function AppWrapper() {
  const { isAuthenticated, loading } = useAuth();
  const [isAiAppOpen, setIsAiAppOpen] = useState(false);

  // Show loading spinner only during initial auth check
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const toggleAiApp = () => {
    setIsAiAppOpen(!isAiAppOpen);
  };

  const closeAiApp = () => {
    setIsAiAppOpen(false);
  };

  // Once loading is complete, render the appropriate content based on auth state
  return isAuthenticated ? (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home toggleAiApp={toggleAiApp} />} />
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

          <Route
            path="/web-practice-exam/:practiceId"
            element={<WebPracticeExam />}
          />
          <Route
            path="/web-practice-exam/:practiceId/:questionId"
            element={<WebPracticeExamQuestion />}
          />

          <Route path="/codeGround" element={<CodeGround />} />
          <Route path="/thread/:threadId" element={<ThreadDetail />} />

          <Route path="/BroOne" element={<AiApp />} />

          {/* Don't redirect to home for unmatched routes when authenticated */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      {/* AI Bot Floating Button */}
      <div className={`ai-bot-container ${isAiAppOpen ? "open" : ""}`}>
        {isAiAppOpen && (
          <div className="ai-app-overlay" onClick={closeAiApp}></div>
        )}

        <button
          className="ai-bot-floating-btn"
          onClick={toggleAiApp}
          aria-label="Open BroOne AI Assistant"
        >
          <img
            src="/assets/BroOneImg.png"
            alt="BroOne AI Assistant"
            className="ai-bot-icon"
          />
          <span className="ai-bot-pulse"></span>
        </button>

        {isAiAppOpen && (
          <div className="ai-app-slide-up">
            <div className="ai-app-header">
              <div className="ai-app-header-content">
                <img
                  src="/assets/BroOneImg.png"
                  alt="BroOne"
                  className="ai-app-header-icon"
                />
                <div>
                  <h3>BroOne AI Assistant</h3>
                  <p>Your 24/7 Learning Ally</p>
                </div>
              </div>
              <button
                className="ai-app-close-btn"
                onClick={closeAiApp}
                aria-label="Close AI Assistant"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="ai-app-content">
              <AiApp />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="auth-wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {/* Only redirect to login for unmatched routes when not authenticated */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
