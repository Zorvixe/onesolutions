import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProfilePage from "./components/Profile/ProfilePage";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Courses from "./components/Courses/Courses";
import Practice from "./components/Practice/Practice";
import Community from "./components/Community/Community";
import Placements from "./components/Placements/Placements";
import SubtopicPage from "./SubtopicsPage/SubtopicPage";
import CodePlayground from "./CodePlayground";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

import "./App.css"; // ✅ Keep your CSS here

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated ? (
        /* ---------- Authenticated Layout ---------- */
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/community" element={<Community />} />
              <Route path="/placements" element={<Placements />} />
              <Route
                path="/topic/:topicId/subtopic/:subtopicId"
                element={<SubtopicPage />}
              />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        /* ---------- Public (Unauthenticated) Layout ---------- */
        <div className="auth-wrapper">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
