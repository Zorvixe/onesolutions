import React, { useContext, useState, useEffect } from "react";
import { OnlineStatusContext } from "../Context/OnlineStatusContext";
import { useNavigate } from "react-router-dom";

import { assests } from "../../assests/assests";
import { ojbassests } from "../OJB/ojbassests/ojbassests";
import "./Landing.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function Landing() {
  // State for admin details and error
  const [adminDetails, setAdminDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Dashboard Analytics States
  const [dashboardStats, setDashboardStats] = useState({
    totalJobs: 0,
    totalAdmins: 0,
    onlineAdmins: 0,
    totalResumes: 0,
    pendingApprovals: 0,
    todayViews: 0,
    monthlyGrowth: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [topJobs, setTopJobs] = useState([]);
  const [sessionStats, setSessionStats] = useState({
    isOnline: false,
    todayTotal: 0,
    currentSessionStart: null,
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Fetch admin details on component mount
  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://apiose.onesolutionsekam.in/api/admin/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch admin details");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setAdminDetails(data);
        document.title = `ONE - ${data.adminname?.toUpperCase()}`;
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching admin details.");
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  // Fetch Dashboard Analytics
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const [
          jobsResponse,
          adminsResponse,
          resumesResponse,
          sessionResponse,
          adminStatusResponse,
        ] = await Promise.all([
          fetch(`https://apiose.onesolutionsekam.in/api/jobs/adminpanel`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`https://apiose.onesolutionsekam.in/api/admins/approved`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`https://apiose.onesolutionsekam.in/api/public/resumes`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`https://apiose.onesolutionsekam.in/api/session/status`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `https://apiose.onesolutionsekam.in/api/admins/status/individual`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        const jobs = await jobsResponse.json();
        const admins = await adminsResponse.json();
        const resumes = await resumesResponse.json();
        const session = await sessionResponse.json();
        const adminStatuses = await adminStatusResponse.json();

        // Calculate stats
        const onlineCount = adminStatuses.filter(
          (admin) => admin.is_online
        ).length;
        const pendingJobs = jobs.filter(
          (job) => job.status === "pending"
        ).length;
        const todayJobs = jobs.filter((job) => {
          const jobDate = new Date(job.createdat);
          const today = new Date();
          return jobDate.toDateString() === today.toDateString();
        }).length;

        setDashboardStats({
          totalJobs: jobs.length,
          totalAdmins: admins.length,
          onlineAdmins: onlineCount,
          totalResumes: resumes.length,
          pendingApprovals: pendingJobs,
          todayViews: todayJobs,
          monthlyGrowth: Math.floor(Math.random() * 25) + 5,
        });

        setSessionStats(session);
        setTopJobs(jobs.slice(0, 5));

        // Mock recent activities
        setRecentActivities([
          { id: 1, action: "New job posted", time: "2 mins ago", type: "job" },
          {
            id: 2,
            action: "Resume uploaded",
            time: "5 mins ago",
            type: "resume",
          },
          {
            id: 3,
            action: "Admin approved",
            time: "10 mins ago",
            type: "admin",
          },
          {
            id: 4,
            action: "Job application",
            time: "15 mins ago",
            type: "application",
          },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (adminDetails) {
      fetchDashboardData();
    }
  }, [adminDetails]);

  // Consume online status context
  const { isOnline, handleOnline, handleOffline } =
    useContext(OnlineStatusContext);

  // Format time helper
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="loading-container-land">
        <div className="loading-spinner-land"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="landing-land">
      {/* Header Section */}
      <div className="dashboard-header-land">
        <div className="header-content-land">
          <div className="welcome-section-land">
            <h1 className="welcome-title-land">
              G'd,{" "}
              <span className="admin-name-land">{adminDetails?.adminname}</span>
            </h1>
            <p className="welcome-subtitle-land">
              Here's what's happening with your dashboard today
            </p>
          </div>

          {adminDetails && (
            <div className="admin-profile-land">
              <img
                src={adminDetails.admin_image_link || "/placeholder.svg"}
                alt="Admin Profile"
                className="profile-image-land"
              />
              <div className="profile-info-land">
                <h3>{adminDetails.adminname}</h3>
                <p>+91 {adminDetails.phone}</p>
                <div
                  className={`status-indicator-land ${
                    isOnline ? "online" : "offline"
                  }`}
                >
                  <span className="status-dot-land"></span>
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-land">
        <div className="stat-card-land jobs-card-land">
          <div className="stat-icon-land">📊</div>
          <div className="stat-content-land">
            <h3>{dashboardStats.totalJobs.toLocaleString()}</h3>
            <p>Total Jobs</p>
            <span className="stat-change-land positive-land">
              +{dashboardStats.monthlyGrowth}% this month
            </span>
          </div>
        </div>

        <div className="stat-card-land admins-card-land">
          <div className="stat-icon-land">👥</div>
          <div className="stat-content-land">
            <h3>{dashboardStats.totalAdmins.toLocaleString()}</h3>
            <p>Total Admins</p>
            <span className="stat-change-land">
              {dashboardStats.onlineAdmins} online now
            </span>
          </div>
        </div>

        <div className="stat-card-land resumes-card-land">
          <div className="stat-icon-land">📄</div>
          <div className="stat-content-land">
            <h3>{dashboardStats.totalResumes.toLocaleString()}</h3>
            <p>Resumes Received</p>
            <span className="stat-change-land positive-land">
              +12% this week
            </span>
          </div>
        </div>

        <div className="stat-card-land pending-card-land">
          <div className="stat-icon-land">⏳</div>
          <div className="stat-content-land">
            <h3>{dashboardStats.pendingApprovals.toLocaleString()}</h3>
            <p>Pending Approvals</p>
            <span className="stat-change-land warning-land">
              Needs attention
            </span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-content-land">
        {/* Left Column */}
        <div className="dashboard-left-land">
          {/* Right Column */}
          <div className="dashboard-right-land">
            {/* Performance Chart */}
            <div className="dashboard-card-land quick-actions-land">
              <div className="card-header-land">
                <h3>Quick Actions</h3>
              </div>
              <div className="action-buttons-land">
                <a
                  href="/ojb/admin/dashboard"
                  className="action-btn-land primary-land"
                >
                  <img
                    src={ojbassests.ojb_logo || "/placeholder.svg"}
                    alt="OJB"
                    className="action-icon-land"
                  />
                  <span>OJB Dashboard</span>
                  <span className="action-arrow-land">→</span>
                </a>

                <button
                  className="action-btn-land secondary-land"
                  onClick={() => setShowModal(true)}
                >
                  <img
                    src={assests.Logo || "/placeholder.svg"}
                    alt="Zorvixe"
                    className="action-icon-land"
                  />
                  <span>OSE Management</span>
                  <span className="action-arrow-land">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Jobs */}
        <div className="dashboard-card-land top-jobs-land">
          <div className="card-header-land">
            <h3>Recent Jobs</h3>
            <a href="#" className="view-all-link-land">
              View All
            </a>
          </div>
          <div className="jobs-list-land">
            {topJobs.map((job) => (
              <div key={job.id} className="job-item-land">
                <img
                  src={job.image_link || "/placeholder.svg"}
                  alt={job.companyname}
                  className="company-logo-land"
                />
                <div className="job-info-land">
                  <h4>{job.title}</h4>
                  <p>{job.companyname}</p>
                  <span className={`job-status-land ${job.status}`}>
                    {job.status}
                  </span>
                </div>
                <div className="job-meta-land">
                  <span className="job-time-land">2h ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="modal-overlay-land" onClick={() => setShowModal(false)}>
          <div
            className="modal-content-land"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-land">
              <h3>OSE Management</h3>
              <button
                className="modal-close-land"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body-land">
              <a href="/discussions" className="modal-item-land">
                <span className="modal-icon-land">💬</span>
                <span>Discussions</span>
              </a>
              <a href="/feedbacks" className="modal-item-land">
                <span className="modal-icon-land">⭐</span>
                <span>Feedbacks</span>
              </a>
              <a href="/student_list" className="modal-item-land">
                <span className="modal-icon-land">👥</span>
                <span>Student List</span>
              </a>
              <a href="/enrollments" className="modal-item-land">
                <span className="modal-icon-land">📝</span>
                <span>Enrollments</span>
              </a>
              <a href="/contacts" className="modal-item-land">
                <span className="modal-icon-land">📞</span>
                <span>Contacts</span>
              </a>
              <a href="/AdminStudentQuestions" className="modal-item-land">
                <span className="modal-icon-land">❓</span>
                <span>Admin Student Questions</span>
              </a>
              <a href="/AdminAIContent" className="modal-item-land">
                <span className="modal-icon-land">🤖</span>
                <span>Admin AI Content</span>
              </a>
              <a href="/digital-marketing/courses" className="modal-item-land">
                <span className="modal-icon-land"><img className="digital_marketing_icon" src={assests.digital_marketing || "/placeholder.svg"}/></span>
                <span>Digital Marketing Courses</span>
              </a>
              <a href="/java-programming/courses" className="modal-item-land">
                <span className="modal-icon-land"><i class="fa-brands fa-java"></i></span>
                <span>Java Programming Courses</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="floating-actions-land">
        <button className="fab-land main-fab-land">
          <span>+</span>
        </button>
        <div className="fab-menu-land">
          <a href="/admin">
            {" "}
            <button className="fab-land sub-fab-land" title="Add Job">
              💼
            </button>
          </a>
          <a href="/chatts">
            {" "}
            <button className="fab-land sub-fab-land" title="Add Admin">
              👤
            </button>
          </a>
          <a href="/admin">
            <button className="fab-land sub-fab-land" title="View Reports">
              📊
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
