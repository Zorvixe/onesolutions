import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminPanel from './components/AdminPanel';
import Login from "./components/Login";
import PopUp from "./components/PopUp";
import { SearchProvider } from "./components/Context/SearchContext";
import AdminRegister from './components/AdminPanelRegister';
import UpdateAdmin from './components/AdminDetails/updateadmin';
import ResetPassword from './components/ResetPassword';
import Landing from './components/Landing/Landing';
import Chatted from "./components/Chats/ChatMain";
import NavBar from "./components/NavBar/SearchAppBar";
import { OnlineStatusProvider } from './components/Context/OnlineStatusContext';
import Resumes from './components/Resumes/Resumes';

// Zorvixe routes//
import Contacters from './components/zorvixe/Contacters';
import ZorvixePayments from "./components/zorvixe/Payments/ZorvixePayments";
import AdminOnboarding from "./components/zorvixe/Onboarding/AdminOnboarding";

//OJB ROUTES//
import OJBAdminDashboard from './components/OJB/OJBAdminDashboard/OJBAdminDashboard';
import OJBAdminJobsList from './components/OJB/OJBAdminJobsList/OJBAdminJobsList';
import OJBAdminJobDetail from './components/OJB/OJBAdminJobDetail/OJBAdminJobDetail';




import './App.css';


// Protected layout with navbar
const ProtectedLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

// Authentication check wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <ProtectedLayout>{children}</ProtectedLayout> : <Navigate to="/login" />;
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

            {/* Protected routes with navbar */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Landing />} />
              <Route path="/popup" element={<PopUp />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/chatts" element={<Chatted />} />
              <Route path='/resumes' element={<Resumes />} />
              <Route path="/edit-profile" element={<UpdateAdmin />} />

              {/* zorvixe routes */}
              <Route path="/zorvixe" element={<Contacters />} />
              <Route path="/zorvixe/payments" element={<ZorvixePayments />} />
              <Route path="/zorvixe/candidate/onboarding" element={<AdminOnboarding />} />

              {/* OJB routes */}
              <Route path="/ojb/admin/dashboard" element={<OJBAdminDashboard />} />
              <Route path="/ojb/admin/jobs" element={<OJBAdminJobsList />} />
              <Route path="/ojb/admin/jobs/details/:id" element={<OJBAdminJobDetail />} />


              {/* Nested routes */}

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