import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Login from "./components/Login/Login";
import ProfilePage from "./components/Profile/ProfilePage";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Courses from "./components/Courses/Courses";
import Practice from "./components/Practice/Practice";
import SQLPractice from "./components/SQLPractice/SQLPractice";
import Placements from "./components/Placements/Placements";
import SubtopicPage from "./SubtopicsPage/SubtopicPage";
import CodeGround from "./CodePlayground/CodePlayground";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ThreadDetail from "./NewThreadModal/ThreadDetail";
import SavedSnippets from "./SavedSnippets/SavedSnippets";

import WebPractice from "./components/WebPractice/WebPractice";
import WebPracticeExam from "./components/WebPractice/WebPracticeExam";
import WebPracticeExamQuestion from "./components/WebPractice/WebPracticeExamQuestion";

import AiApp from "./components/AiApp/AiApp";

import DigitalCourses from "./DigitalMarketing/DigitalCourses/digitalCourses";
import DigitalSubtopicPage from "./DigitalMarketing/DigitalSubtopicPage/digitalSubtopicPage";
import DigitalClasses from "./DigitalMarketing/Pages/digitalClasses";
import DigitalCheatsheet from "./DigitalMarketing/Pages/digitalCheatSheet";
import DigitalMcqs from "./DigitalMarketing/Pages/digitalMcqs";

import "./App.css";

/* -------------------------
   MAIN WRAPPER
--------------------------*/

function AppWrapper() {
  const { isAuthenticated, loading, user } = useAuth();

  const courseSelection = user?.courseSelection;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // 🎯 Auto routing logic
  const getCoursesLanding = () => {
    if (courseSelection === "web_development") return "/web-courses";
    if (courseSelection === "digital_marketing") return "/digital-courses";
    return "/courses-toggle"; // for "all"
  };

  return isAuthenticated ? (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Default */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/saved-snippets" element={<SavedSnippets />} />

          {/* 🎯 Courses entry */}
          <Route
            path="/courses"
            element={<Navigate to={getCoursesLanding()} replace />}
          />

          {/* Direct course routes */}
          <Route path="/web-courses" element={<Courses />} />
          <Route path="/digital-courses" element={<DigitalCourses />} />

          {/* Toggle ONLY for "all" users */}
          <Route path="/courses-toggle" element={<CoursesToggle />} />

          {/* UUID Content Routes - Both Web and Digital */}
          <Route path="/content/:contentUuid" element={<SubtopicPage />} />
          <Route
            path="/digital/content/:contentUuid"
            element={<DigitalSubtopicPage />}
          />

          {/* Legacy Routes - Both Web and Digital */}
          <Route
            path="/topic/:topicId/subtopic/:subtopicId"
            element={<SubtopicPage />}
          />
          <Route
            path="/digital/topic/:topicId/subtopic/:subtopicId"
            element={<DigitalSubtopicPage />}
          />

          {/* Digital Content Type Routes */}
          <Route
            path="/digital/class/:contentUuid"
            element={<DigitalClasses />}
          />
          <Route
            path="/digital/cheatsheet/:contentUuid"
            element={<DigitalCheatsheet />}
          />
          <Route path="/digital/mcq/:contentUuid" element={<DigitalMcqs />} />

          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:practiceId" element={<Practice />} />
          <Route
            path="/practice/:practiceId/:questionId"
            element={<Practice />}
          />
          <Route path="/sql-practice" element={<SQLPractice />} />
          <Route path="/sql-practice/:practiceId" element={<SQLPractice />} />
          <Route
            path="/sql-practice/:practiceId/:questionId"
            element={<SQLPractice />}
          />

          <Route
            path="/web-practice/:practiceId/:questionId"
            element={<WebPractice />}
          />

          <Route
            path="/web-practice-exam/:practiceId"
            element={<WebPracticeExam />}
          />
          <Route
            path="/web-practice-exam/:practiceId/:questionId"
            element={<WebPracticeExamQuestion />}
          />

          {/* Misc */}
          <Route path="/placements" element={<Placements />} />
          <Route path="/codeGround" element={<CodeGround />} />
          <Route path="/thread/:threadId" element={<ThreadDetail />} />
          <Route path="/BroOne" element={<AiApp />} />

          <Route
            path="/web-practice-exam/:practiceId"
            element={<WebPracticeExam />}
          />
          <Route
            path="/web-practice-exam/:practiceId/:questionId"
            element={<WebPracticeExamQuestion />}
          />

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
  );
}

/* -------------------------
   Toggle UI (ONLY for ALL users)
--------------------------*/

const CoursesToggle = () => {
  const [activeTab, setActiveTab] = useState("web");
  const navigate = useNavigate();

  return (
    <div className="courses-toggle-container">
      <div className="courses-tabs">
        <button
          className={`tab-button ${activeTab === "web" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("web");
            navigate("/web-courses");
          }}
        >
          🌐 Web Development
        </button>

        <button
          className={`tab-button ${activeTab === "digital" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("digital");
            navigate("/digital-courses");
          }}
        >
          📱 Digital Marketing
        </button>
      </div>
    </div>
  );
};

/* -------------------------
   ROOT APP
--------------------------*/

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
