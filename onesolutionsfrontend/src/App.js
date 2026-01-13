import React from "react";
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

import "./App.css";

// Create a wrapper component to handle the loading state properly
function AppWrapper() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner only during initial auth check
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Once loading is complete, render the appropriate content based on auth state
  return isAuthenticated ? (
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
          <Route path="/js-practice" element={<JSPractice />} />
          <Route path="/js-practice/:practiceId" element={<JSPractice />} />
          <Route
            path="/js-practice/:practiceId/:questionId"
            element={<JSPractice />}
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
          {/* Don't redirect to home for unmatched routes when authenticated */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
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
