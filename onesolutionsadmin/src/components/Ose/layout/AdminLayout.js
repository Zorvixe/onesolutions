// components/layout/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  MessageSquare,
  Star,
  LogOut,
  Menu,
  X,
  FileText,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: <MessageSquare size={20} />,
      label: "Discussions",
      path: "/admin/discussions",
    },
    {
      icon: <Star size={20} />,
      label: "Feedback",
      path: "/admin/feedback",
    },
    {
      icon: <FileText size={20} />,
      label: "Reports",
      path: "/admin/reports",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="admin-container min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative fixed lg:static top-0 left-0 z-40 transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="admin-logo">
            <p className="text-xl font-bold text-gray-800">
              OneSolutions Academy
            </p>
            <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-nav p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`admin-link ${isActive ? "active" : ""}`}
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <span className={`icon ${isActive ? "icon-active" : ""}`}>
                      {item.icon}
                    </span>
                    <span className="label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="admin-link text-red-600 hover:bg-red-50"
          >
            <span className="icon">
              <LogOut size={20} />
            </span>
            <span className="label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main flex-1 lg:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {location.pathname.includes("discussions") &&
                  "Discussion Management"}
                {location.pathname.includes("feedback") &&
                  "Feedback Management"}
                {location.pathname.includes("reports") && "Reports"}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {location.pathname.includes("discussions") &&
                  "Manage student discussions and replies"}
                {location.pathname.includes("feedback") &&
                  "View and analyze student feedback"}
                {location.pathname.includes("reports") &&
                  "Generate and view reports"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-lg font-semibold text-indigo-600">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
