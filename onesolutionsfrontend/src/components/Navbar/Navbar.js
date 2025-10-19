import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, logout } = useAuth();


  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const helpEarnButtonRef = useRef(null);

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

  const handleCopy = () => {
    const referralLink = "https://myreferral.link/abcd123";
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };




  return (
    <div className="container">
      <Link to="/" className="logo">
        <img src="/assets/logo.png" alt="logo" />
      </Link>
      <ul className="nav-links">
        <li><Link to="/" className="active">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/practice" className="practice">Practice</Link></li>
        <li>
          <Link
            to="/placements"
            style={{
              background: "linear-gradient(to right, #800080, #000080, #483d8b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            Placements
          </Link>
        </li>
        <li><Link to="/community">Community</Link></li>
      </ul>

      <div className="nav_right">
        <button className="nav_c_btn"> <a href="/code_playground"> Code Playground</a></button>
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
                    background: "linear-gradient(to right, #800080, #000080, #483d8b)",
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
                  <p>Earn <span><i className="bi bi-currency-rupee"></i>2000</span> for every successful referral</p>
                  <p>Your friend gets <span><i className="bi bi-currency-rupee"></i>2000</span>  discount on course fees</p>
                  <p style={{ fontStyle: "oblique", color: "#000080", fontWeight: "bold" }}>No limit on referrals - earn unlimited rewards!</p>
                </div>

                <div className="importent-instructions">
                  <h3>Important Instructions</h3>
                  <p>Ask your friend to mention your name and One Solutions ID.</p>
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

                  <button className="referring-button">Start Referring Now</button>
                </div>
              </div>
            )}
          </div>

          <div className="mentor-connect">
            <i className="bi bi-question-circle"></i>
            <a
              href="https://zoom.us/j/1234567890"
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
            <span onClick={toggleProfile}>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</span>
          )}



          <div className="footer-menu">
            <Link to="/" className="active"><i className="bi bi-house"></i><span>Home</span></Link>
            <Link to="/courses"><i className="bi bi-journal-bookmark"></i><span>Courses</span></Link>
            <Link to="/practice"><i className="bi bi-pencil-square"></i><span>Practice</span></Link>
            <Link to="/placements"><i className="bi bi-award"></i><span>Placements</span></Link>
            <Link to="/community"><i className="bi bi-people"></i><span>Community</span></Link>
            <button onClick={toggleDropdown}><i className="bi bi-gift"></i><span>Help & Earn</span></button>
          </div>
          {showProfile && (
            <div className="profile-dropdown" ref={profileRef}>
              <div className="profile-header">
                <img src={user.profileImage}
                  alt={`${user.firstName} ${user.lastName}`} />
                <div>
                  <h4>{user.firstName} {user.lastName}</h4>
                  <p className="status"> {user.batchMonth} {user.batchYear} </p>
                </div>
              </div>

              <ul className="profile_list">
                <li className="profile_list_li"><Link to="/profile"><i className="bi bi-person"></i>My Account</Link></li>
                <li className="profile_list_li"><Link to="/compiler"><i className="bi bi-code-slash"></i>Compiler</Link></li>
                <li className="profile_list_li"><Link to="/leave"><i className="bi bi-chat-left"></i>Apply for Leave</Link></li>
                <li className="profile_list_li"><Link to="/whatsnew"><i className="bi bi-bell"></i>What's New</Link></li>
                <li className="profile_list_li"><Link to="/help"><i className="bi bi-headphones"></i>Help Center</Link></li>
                <li className="profile_list_li"><button className="logout-btn" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i>Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;