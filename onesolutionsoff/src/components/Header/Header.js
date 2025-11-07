import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const location = useLocation();

  // Add/remove mobile-nav-active class to body
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.classList.add("mobile-nav-active");
    } else {
      document.body.classList.remove("mobile-nav-active");
    }
  }, [mobileNavOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (mobileNavOpen && !e.target.closest("#navmenu")) {
        setMobileNavOpen(false);
        setDropdownOpen({});
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [mobileNavOpen]);



  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        {/* Logo */}
        <Link to="/" className="logo d-flex align-items-center me-auto" onClick={() => setMobileNavOpen(false)}>
          <img
            src="/assets/img/ONE_SOLUTIONS_NEW_LOGO.png"
            alt="logo"
            style={{ borderRadius: "6px", objectFit: "contain" }}
          />
        </Link>

        {/* Navigation */}
        <nav id="navmenu" className={`navmenu ${mobileNavOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link
                to="/"
                className={isActive("/") ? "active" : ""}
                onClick={() => setMobileNavOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={isActive("/about") ? "active" : ""}
                onClick={() => setMobileNavOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={isActive("/courses") ? "active" : ""}
                onClick={() => setMobileNavOpen(false)}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className={isActive("/pricing") ? "active" : ""}
                onClick={() => setMobileNavOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={isActive("/blog") ? "active" : ""}
                onClick={() => setMobileNavOpen(false)}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={isActive("/contact") ? "active" : ""}
                onClick={() => setMobileNavOpen(false)}
              >
                Contact
              </Link>
            </li>
            {/* Enroll button */}
            <Link className="btn-getstarted" to="/enroll" onClick={() => setMobileNavOpen(false)}>
              Enroll Now
            </Link>
          </ul>

          {/* Mobile Hamburger Toggle */}
          <i
            className="mobile-nav-toggle d-xl-none bi bi-list"
            onClick={(e) => {
              e.stopPropagation();
              setMobileNavOpen(!mobileNavOpen);
            }}
          ></i>


        </nav>


        {/* Enroll button */}
        {/* Vertical Line */}
        <div
          style={{
            width: "1px",
            height: "24px",
            backgroundColor: "#ccc",
          }}
        ></div>

        <a
          className="btn-student_login"
          href="https://app.onesolutions.com/"
          onClick={() => setMobileNavOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            style={{ cursor: "pointer", marginRight: "5px" }}
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
          Student Login
        </a>

      </div>
    </header>
  );
};

export default Header;
