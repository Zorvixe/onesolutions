import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "../Context/SearchContext";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SimpleDialogDemo from "../Profile";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { NavHashLink as NavLink } from "react-router-hash-link";
import { MdWork } from "react-icons/md";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import MdExitToApp from "@mui/icons-material/ExitToApp";
import ChatMainDrawer from "../Chats/ChatDrawer/ChatMainDrawer";
import { OnlineStatusContext } from "../Context/OnlineStatusContext";
import { assests } from "../../assests/assests";
import "./navbar.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Styled components for search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const { isOnline, todayTime } = useContext(OnlineStatusContext);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  // State for admin details and error
  const [adminDetails, setAdminDetails] = useState(null);
  const [error, setError] = useState(null);

  // State for Profile Dialog
  const [profileOpen, setProfileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const toggleRightDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setRightDrawerOpen(open);
  };

  // Fetch admin details on component mount
  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        console.log({ error });
        return;
      }

      try {
        const response = await fetch(`https://ose.onesolutionsekam.in/api/admin/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch admin details");
          return;
        }

        const data = await response.json();
        setAdminDetails(data);
        document.title = `ONE - ${data.adminname?.toUpperCase()}`;
      } catch (err) {
        setError("An error occurred while fetching admin details.");
      }
    };

    fetchAdminDetails();
  }, []);

  const handleProfileOpen = () => {
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  const formatTime = (seconds) => {
    const totalSeconds = Math.floor(seconds);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  width: "320px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  overflow: "hidden",
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                },
              }}
            >
              <div className="modern-drawer-nav">
                {/* Header Section */}
                <div className="drawer-header-nav">
                  <div className="header-content-nav">
                    <div className="brand-info-nav">
                      <div className="brand-icon-nav">
                        <div className="icon-circle-nav">
                          <span>
                            <img
                              className="logo-image-drawer"
                              src={assests.Logo}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="brand-text-nav">
                        <h3>One Solutions</h3>
                        <p>
                          {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      className="close-btn-nav"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  {/* Admin Profile Section */}
                  {adminDetails && (
                    <div className="admin-profile-nav">
                      <div className="profile-avatar-nav">
                        <img
                          src={
                            adminDetails.admin_image_link || "/placeholder.svg"
                          }
                          alt="Admin"
                        />
                        <div
                          className={`status-dot-nav ${
                            isOnline ? "online" : "offline"
                          }`}
                        ></div>
                      </div>
                      <div className="profile-details-nav">
                        <h4>{adminDetails.adminname}</h4>
                        <span
                          className={`status-text-nav ${
                            isOnline ? "online" : "offline"
                          }`}
                        >
                          {isOnline ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Menu */}
                <div className="nav-menu-nav">
                  <div className="menu-section-nav">
                    <span className="section-title-nav">Navigation</span>

                    <NavLink to="/home" onClick={handleDrawerClose}>
                      <div className="nav-item-nav">
                        <div className="nav-icon-nav">
                          <IoHomeSharp />
                        </div>
                        <span className="nav-text-nav">Home</span>
                        <div className="nav-arrow-nav">→</div>
                      </div>
                    </NavLink>

                    <NavLink to="/admin" onClick={handleDrawerClose}>
                      <div className="nav-item-nav">
                        <div className="nav-icon-nav">
                          <MdWork />
                        </div>
                        <span className="nav-text-nav">Jobs</span>
                        <div className="nav-arrow-nav">→</div>
                      </div>
                    </NavLink>

                    <NavLink to="/popup" onClick={handleDrawerClose}>
                      <div className="nav-item-nav">
                        <div className="nav-icon-nav">
                          <HiOutlineChatAlt2 />
                        </div>
                        <span className="nav-text-nav">PopUp</span>
                        <div className="nav-arrow-nav">→</div>
                      </div>
                    </NavLink>

                    <NavLink to="/resumes" onClick={handleDrawerClose}>
                      <div className="nav-item-nav">
                        <div className="nav-icon-nav">
                          <HiOutlineChatAlt2 />
                        </div>
                        <span className="nav-text-nav">Resumes</span>
                        <div className="nav-arrow-nav">→</div>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/zorvixe/candidate/onboarding"
                      onClick={handleDrawerClose}
                    >
                      <div className="nav-item-nav">
                        <div className="nav-icon-nav">
                          <HiOutlineChatAlt2 />
                        </div>
                        <span className="nav-text-nav">Onboarding</span>
                        <div className="nav-arrow-nav">→</div>
                      </div>
                    </NavLink>
                  </div>

                  <div className="menu-section-nav">
                    <span className="section-title-nav">Account</span>

                    <button
                      className="nav-item-nav"
                      onClick={handleProfileOpen}
                    >
                      <div className="nav-icon-nav">
                        <FaUser />
                      </div>
                      <span className="nav-text-nav">Profile</span>
                      <div className="nav-arrow-nav">→</div>
                    </button>

                    <button
                      className="nav-item-nav logout-item-nav"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                    >
                      <div className="nav-icon-nav">
                        <MdExitToApp />
                      </div>
                      <span className="nav-text-nav">Logout</span>
                      <div className="nav-arrow-nav">→</div>
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="drawer-footer-nav">
                  <div className="footer-stats-nav">
                    <div className="stat-item-nav">
                      <span className="stat-label-nav">Session Time</span>
                      <span className="stat-value-nav">
                        {formatTime(todayTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              {adminDetails && (
                <h1 className="admin-name-nav">{adminDetails.adminname}</h1>
              )}
            </Typography>

            {/* Online status display */}
            <div className="status-container">
              <div className="status-indicator">
                <div
                  className={`status-dot ${isOnline ? "online" : "offline"}`}
                ></div>
                <span
                  className={`status-text ${isOnline ? "Online" : "Offline"}`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
                <div className="status-timer">{formatTime(todayTime)}</div>
              </div>
            </div>

            <Search className="search-container">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
              />
            </Search>

            {/* Only display the profile image once admin details are fetched */}
            {adminDetails && (
              <img
                src={adminDetails.admin_image_link || "/placeholder.svg"}
                className="profile-image"
                alt="Profile"
                onClick={handleProfileOpen}
              />
            )}

            <div
              className="chat-icon-container"
              onClick={toggleRightDrawer(true)}
            >
              <NavLink>
                <div>
                  <HiOutlineChatAlt2 className="chat-icon-navbar" />
                </div>
              </NavLink>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          className="right-drawer-class"
          open={rightDrawerOpen}
          onClose={toggleRightDrawer(false)}
          PaperProps={{
            sx: {
              maxWidth: "30em",
              fontFamily: " var(--primaryFont)",
              fontStyle: " normal",
              fontWeight: " normal",
              backgroundColor: "#1976d2",
              overflow: "hidden",
            },
          }}
        >
          <div className="right-drawer-content">
            <CloseIcon
              onClick={() => setRightDrawerOpen(false)}
              className="drawer-close-button right-close"
              role="button"
              tabIndex="0"
              aria-label="Close"
            />
            <ChatMainDrawer />
          </div>
        </Drawer>

        {profileOpen && (
          <SimpleDialogDemo open={profileOpen} onClose={handleProfileClose} />
        )}
      </Box>
    </div>
  );
}
