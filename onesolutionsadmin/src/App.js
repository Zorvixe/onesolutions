// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import PopUp from "./components/PopUp";
import { SearchProvider } from "./components/Context/SearchContext";
import AdminRegister from "./components/AdminPanelRegister";
import UpdateAdmin from "./components/AdminDetails/updateadmin";
import ResetPassword from "./components/ResetPassword";
import Landing from "./components/Landing/Landing";
import Chatted from "./components/Chats/ChatMain";
import Sidebar from "./components/Sidebar/Sidebar";
import { OnlineStatusProvider } from "./components/Context/OnlineStatusContext";
import Resumes from "./components/Resumes/Resumes";
import LiveClasses from "./components/Ose/LiveClasses/LiveClasses";
import Achievements from "./components/Ose/PlacementAchievements/PlacementAchievements";

// OJB ROUTES //
import OJBAdminDashboard from "./components/OJB/OJBAdminDashboard/OJBAdminDashboard";
import OJBAdminJobsList from "./components/OJB/OJBAdminJobsList/OJBAdminJobsList";
import OJBAdminJobDetail from "./components/OJB/OJBAdminJobDetail/OJBAdminJobDetail";

// OSE ROUTES //
import StudentRegister from "./components/Ose/Student_Register/Register";
import StudentList from "./components/Ose/Student/StudentList";
import VideoManagement from "./components/Ose/ClassVideoManagement/ClassVideoManagement";
import DiscussionManagement from "./components/Ose/pages/DiscussionManagement/DiscussionManagement";
import DiscussionThreadDetail from "./components/Ose/pages/ThreadDetail/DiscussionThreadDetail";
import FeedbackManagement from "./components/Ose/pages/FeedbackManagement/FeedbackManagement";
import Enroll from "./components/Ose/Enroll/OseEnroll";
import Contacts from "./components/Ose/Contacts/OseContacts";
import AdminStudentQuestions from "./components/Ose/Ai/AdminStudentQuestions";
import AdminAIContent from "./components/Ose/Ai/AdminAIContent";

// Course Management Components //
import DigitalCourseManagement from "./components/Ose/DigitalMarketing/pages/CourseManagement";
import JavaCourseManagement from "./components/Ose/JavaProgramming/pages/JavaCourseManagement";

import "./App.css";

const ProtectedLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="main-content-wrapper">
        <Outlet />
      </div>
    </>
  );
};

// Authentication check wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <ProtectedLayout>{children}</ProtectedLayout>
  ) : (
    <Navigate to="/login" />
  );
};

// Digital Marketing Layout
const DigitalMarketingLayout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

function App() {
  return (
    <SearchProvider>
      <OnlineStatusProvider>
        <Router>
          <Routes>
            {/* Public routes without navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<AdminRegister />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes with navbar and sidebar */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Landing />} />
              <Route path="/popup" element={<PopUp />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/chatts" element={<Chatted />} />
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/edit-profile" element={<UpdateAdmin />} />
              <Route path="/live_classes" element={<LiveClasses />} />
              <Route path="/achievements" element={<Achievements />} />

              {/* OSE Routes */}
              <Route path="/student_register" element={<StudentRegister />} />
              <Route path="/student_list" element={<StudentList />} />
              <Route path="/Video_Management" element={<VideoManagement />} />
              <Route path="/discussions" element={<DiscussionManagement />} />
              <Route
                path="/discussions/thread/:threadSlug"
                element={<DiscussionThreadDetail />}
              />
              <Route path="/feedbacks" element={<FeedbackManagement />} />
              <Route path="/enrollments" element={<Enroll />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route
                path="/AdminStudentQuestions"
                element={<AdminStudentQuestions />}
              />
              <Route path="/AdminAIContent" element={<AdminAIContent />} />

              {/* OJB routes */}
              <Route
                path="/ojb/admin/dashboard"
                element={<OJBAdminDashboard />}
              />
              <Route path="/ojb/admin/jobs" element={<OJBAdminJobsList />} />
              <Route
                path="/ojb/admin/jobs/details/:id"
                element={<OJBAdminJobDetail />}
              />

              {/* Digital Marketing Routes - Updated with proper paths */}

              <Route
                path="/digital-marketing/courses"
                element={<DigitalCourseManagement />}
              />
              <Route
                path="/java-programming/courses"
                element={<JavaCourseManagement />}
              />
            </Route>

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </OnlineStatusProvider>
    </SearchProvider>
  );
}

export default App;
