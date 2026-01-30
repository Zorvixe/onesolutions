import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { user, logout } = useAuth();

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const helpEarnButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Function to get student type badge with colors
  const getStudentTypeBadge = (studentType) => {
    const typeConfig = {
      zorvixe_core: {
        color: "#4a6bff",
        bg: "#e8edff",
        label: "Zorvixe Core",
        shortLabel: "CORE",
      },
      zorvixe_pro: {
        color: "#10b981",
        bg: "#ecfdf5",
        label: "Zorvixe Pro",
        shortLabel: "PRO",
      },
      zorvixe_elite: {
        color: "#f59e0b",
        bg: "#fffbeb",
        label: "Zorvixe Elite",
        shortLabel: "ELITE",
      },
    };

    return typeConfig[studentType] || typeConfig.zorvixe_core;
  };

  // Function to get student type description
  const getStudentTypeDescription = (studentType) => {
    const descriptions = {
      zorvixe_core: "Basic access with essential features",
      zorvixe_pro: "Advanced features with priority support",
      zorvixe_elite: "Full access with premium features",
    };
    return descriptions[studentType] || "";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        helpEarnButtonRef.current &&
        !helpEarnButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }

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

  if (!user) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  const handleLogout = () => logout();
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleProfile = () => setShowProfile(!showProfile);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const handleCopy = () => {
    const referralLink = "https://myreferral.link/abcd123";
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Get student type info
  const studentTypeInfo = getStudentTypeBadge(
    user.studentType || "zorvixe_core"
  );
  const studentTypeDescription = getStudentTypeDescription(
    user.studentType || "zorvixe_core"
  );

  const getDefaultProfileImage = () => {
    // Use gender from user data if available
    if (user.gender) {
      const gender = user.gender.toLowerCase();
      if (gender === "female" || gender === "f") {
        return "/assets/img/girl_profile_icon.jpg";
      } else if (gender === "male" || gender === "m") {
        return "/assets/img/man_profile_icon.jpg";
      }
    }

    // Fallback to name-based heuristic if gender is not provided
    const firstName = user.firstName || "";
    const name = firstName.toLowerCase();

    // Simple heuristic for Indian names (extend anytime)
    const femaleEndings = ["a", "i", "ya", "na", "sha", "thi"];
    const maleEndings = ["n", "k", "sh", "r", "th"];

    if (femaleEndings.some((ending) => name.endsWith(ending))) {
      return "/assets/img/girl_profile_icon.jpg";
    }

    return "/assets/img/man_profile_icon.jpg";
  };

  return (
    <div className="container">
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

            {/* Student Type Badge in Mobile Menu */}
            {user.studentType && (
              <li className="mobile-student-type-badge">
                <div className="student-type-mobile">
                  <span
                    className="student-type-badge"
                    style={{
                      backgroundColor: studentTypeInfo.bg,
                      color: studentTypeInfo.color,
                      border: `1px solid ${studentTypeInfo.color}20`,
                    }}
                  >
                    {studentTypeInfo.shortLabel}
                  </span>
                  <span className="student-type-label">
                    {studentTypeInfo.label}
                  </span>
                </div>
              </li>
            )}

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

          {/* Profile Image with Student Type Badge */}
          <div className="profile-header-wrapper">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.firstName} ${user.lastName}`}
                className="placementimg"
                onClick={toggleProfile}
                ref={profileRef}
              />
            ) : (
              <img
                src={getDefaultProfileImage()}
                alt={`${user.firstName} ${user.lastName}`}
                className="placementimg"
                onClick={toggleProfile}
                ref={profileRef}
              />
            )}

            {/* Student Type Badge near profile image */}
            <div className="profile-student-type-badge" onClick={toggleProfile}>
              <span
                className="student-type-badge-small"
                style={{
                  backgroundColor: studentTypeInfo.bg,
                  color: studentTypeInfo.color,
                  border: `1px solid ${studentTypeInfo.color}20`,
                }}
                title={studentTypeInfo.label}
              >
                {studentTypeInfo.shortLabel}
              </span>
            </div>
          </div>

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
                  <img
                    src={getDefaultProfileImage()}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="profile-default-img"
                  />
                )}
                <div>
                  <h4>
                    {user.firstName} {user.lastName}
                  </h4>
                  <p className="status">
                    {user.batchMonth} {user.batchYear}
                  </p>
                  {/* Student Type in Profile Dropdown */}
                  <div className="profile-student-type">
                    <span
                      className="student-type-badge-profile"
                      style={{
                        backgroundColor: studentTypeInfo.bg,
                        color: studentTypeInfo.color,
                        border: `1px solid ${studentTypeInfo.color}20`,
                      }}
                    >
                      <i className="bi bi-award-fill"></i>
                      {studentTypeInfo.label}
                    </span>
                  </div>
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
