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

//OJB ROUTES//
import OJBAdminDashboard from "./components/OJB/OJBAdminDashboard/OJBAdminDashboard";
import OJBAdminJobsList from "./components/OJB/OJBAdminJobsList/OJBAdminJobsList";
import OJBAdminJobDetail from "./components/OJB/OJBAdminJobDetail/OJBAdminJobDetail";

import StudentRegister from "./components/Student_Register/Register";

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
            </Route>

            <Route path="/student_register" element={<StudentRegister />} />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </OnlineStatusProvider>
    </SearchProvider>
  );
}

export default App;
