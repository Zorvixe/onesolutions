import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // New state for mobile menu

  const { user, logout } = useAuth();

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const helpEarnButtonRef = useRef(null);
  const mobileMenuRef = useRef(null); // New ref for mobile menu

  // ✅ Always define hooks before any conditional return
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Help & Earn dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        helpEarnButtonRef.current &&
        !helpEarnButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }

      // Close Profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }

      // Close Mobile Menu if clicked outside
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".hamburger-menu")
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Conditional render AFTER all hooks
  if (!user) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  const handleLogout = () => logout();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleProfile = () => setShowProfile(!showProfile);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu); // Toggle mobile menu

  const handleCopy = () => {
    const referralLink = "https://myreferral.link/abcd123";
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container nav-con">
      {/* Hamburger Menu for Mobile */}
      <button
        className="hamburger-menu"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <i className="bi bi-list"></i>
      </button>

      <Link to="/" className="logo">
        <img src="/assets/onesolutions.png" alt="logo" />
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="nav-links">
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Courses
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/practice"
            className={({ isActive }) =>
              isActive ? "nav-link active practice" : "nav-link practice"
            }
          >
            Practice
          </NavLink>
        </li>
      </ul>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="mobile-nav-menu" ref={mobileMenuRef}>
          <div className="mobile-nav-header">
            <Link to="/" className="logo">
              <img src="/assets/onesolutions.png" alt="logo" />
            </Link>
            <button
              className="close-mobile-menu"
              onClick={() => setShowMobileMenu(false)}
              aria-label="Close navigation menu"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <ul className="mobile-nav-links">
            <li>
              <NavLink
                to="/home"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setShowMobileMenu(false)}
              >
                <i className="bi bi-house"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setShowMobileMenu(false)}
              >
                <i className="bi bi-journal-bookmark"></i> Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/practice"
                className={({ isActive }) =>
                  isActive ? "active practice" : "practice"
                }
                onClick={() => setShowMobileMenu(false)}
              >
                <i className="bi bi-pencil-square"></i> Practice
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/codeGround"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setShowMobileMenu(false)}
              >
                <i className="bi bi-code-slash"></i> Code Playground
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowDropdown(true);
                }}
              >
                <i className="bi bi-gift"></i> Help & Earn
              </button>
            </li>
            <li>
              <Link to="/profile" onClick={() => setShowMobileMenu(false)}>
                <i className="bi bi-person"></i> My Profile
              </Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className="nav_right">
        <li className="nav_c_btn">
          <Link to="/codeGround">Code Playground</Link>
        </li>
        <div className="help-earn">
          <div className="help-earn-wrapper">
            <button
              ref={helpEarnButtonRef}
              onMouseEnter={() => setShowDropdown(true)}
              onClick={toggleDropdown}
            >
              Help and Earn
            </button>

            {showDropdown && (
              <div
                className="dropdown-content"
                ref={dropdownRef}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <h4
                  style={{
                    background:
                      "linear-gradient(to right, #800080, #000080, #483d8b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "600",
                    fontSize: "30px",
                    textAlign: "center",
                  }}
                >
                  One Solutions Help & Earn Program
                </h4>

                <div className="referallnbonuse">
                  <h3>Referral Bonus</h3>
                  <p>
                    Earn{" "}
                    {/* <span>
                      <i className="bi bi-currency-rupee"></i>2000
                    </span>{" "} */}
                    for every successful referral
                  </p>
                  <p>
                    Your friend gets{" "}
                    {/* <span>
                      <i className="bi bi-currency-rupee"></i>2000
                    </span>{" "} */}
                    discount on course fees
                  </p>
                  <p
                    style={{
                      fontStyle: "oblique",
                      color: "#000080",
                      fontWeight: "bold",
                    }}
                  >
                    No limit on referrals - earn unlimited rewards!
                  </p>
                </div>

                <div className="importent-instructions">
                  <h3>Important Instructions</h3>
                  <p>
                    Ask your friend to mention your name and One Solutions ID.
                  </p>
                  <p>when filling out the registration form</p>

                  <div>
                    <input
                      type="text"
                      id="referralLink"
                      value="https://myreferral.link/abcd123"
                      readOnly
                    />
                    <button className="copy-btn" onClick={handleCopy}>
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <button className="referring-button">
                    Start Referring Now
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mentor-connect">
            <i className="bi bi-question-circle"></i>
            <a
              href="https://meet.google.com/yki-uajw-seu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mentor Connect
            </a>
          </div>

          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={`${user.firstName} ${user.lastName}`}
              className="placementimg"
              onClick={toggleProfile}
              ref={profileRef}
            />
          ) : (
            <div className="profile-anchor">
              <span onClick={toggleProfile} className="profile_name">
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </span>
            </div>
          )}

          <div className="footer-menu">
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              <i className="bi bi-house"></i>
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/courses"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bi bi-journal-bookmark"></i>
              <span>Courses</span>
            </NavLink>

            <NavLink
              to="/practice"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bi bi-pencil-square"></i>
              <span>Practice</span>
            </NavLink>
          </div>

          {showProfile && (
            <div className="profile-dropdown" ref={profileRef}>
              <div className="profile-header">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                ) : (
                  <span className="profile_name">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </span>
                )}
                <div>
                  <h4>
                    {user.firstName} {user.lastName}
                  </h4>
                  <p className="status">
                    {" "}
                    {user.batchMonth} {user.batchYear}{" "}
                  </p>
                </div>
              </div>

              <ul className="profile_list">
                <li className="profile_list_li">
                  <Link to="/profile">
                    <i className="bi bi-person"></i>My Account
                  </Link>
                </li>
                <li className="profile_list_li">
                  <Link to="/saved-snippets">
                    <i className="bi bi-code-slash"></i>My Snippets
                  </Link>
                </li>
                <li className="profile_list_li">
                  <Link to="/leave">
                    <i className="bi bi-chat-left"></i>Apply for Leave
                  </Link>
                </li>
                <li className="profile_list_li">
                  <Link to="/whatsnew">
                    <i className="bi bi-bell"></i>What's New
                  </Link>
                </li>
                <li className="profile_list_li">
                  <Link to="/help">
                    <i className="bi bi-headphones"></i>Help Center
                  </Link>
                </li>
                <li className="profile_list_li">
                  <button className="logout-btn" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i>Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
