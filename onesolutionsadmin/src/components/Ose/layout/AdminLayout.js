// components/layout/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { MessageSquare, Star, LogOut, Menu, X, FileText } from "lucide-react";
import "./AdminLayout.css"; // <-- External CSS

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: <MessageSquare size={20} />,
      label: "Discussions",
      path: "discussions",
    },
    { icon: <Star size={20} />, label: "Feedback", path: "feedback" },
    { icon: <FileText size={20} />, label: "Reports", path: "reports" },
  ];

  return (
    <div className="admin-container min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="admin-logo">
          <p>OneSolutions Academy</p>
        </div>

        {/* Navigation */}
        <nav className="admin-nav">
          <ul>
            {menuItems.map((item) => {
              const active = location.pathname.startsWith(item.path);
              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`admin-link ${active ? "active" : ""}`}
                    onClick={() =>
                      window.innerWidth < 1024 && setSidebarOpen(false)
                    }
                  >
                    <span className={`icon ${active ? "icon-active" : ""}`}>
                      {item.icon}
                    </span>
                    <span className="label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main lg:ml-64">
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
