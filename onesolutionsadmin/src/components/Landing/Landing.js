import React, { useContext, useState, useEffect } from "react";
import { OnlineStatusContext } from "../Context/OnlineStatusContext";
import { zorvixeassests } from "../zorvixe/zorvixeassests/zorvixeassests";
import { ojbassests } from "../OJB/ojbassests/ojbassests";
import './Landing.css';

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
        monthlyGrowth: 0
    });
    
    const [recentActivities, setRecentActivities] = useState([]);
    const [topJobs, setTopJobs] = useState([]);
    const [sessionStats, setSessionStats] = useState({
        isOnline: false,
        todayTotal: 0,
        currentSessionStart: null
    });

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
                const response = await fetch('https://backend-lt9m.onrender.com/api/admin/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

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
                // Fetch multiple endpoints for dashboard data
                const [
                    jobsResponse,
                    adminsResponse,
                    resumesResponse,
                    sessionResponse,
                    adminStatusResponse
                ] = await Promise.all([
                    fetch('https://backend-lt9m.onrender.com/api/jobs/adminpanel', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('https://backend-lt9m.onrender.com/api/admins/approved', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('https://backend-lt9m.onrender.com/api/public/resumes', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('https://backend-lt9m.onrender.com/api/session/status', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('https://backend-lt9m.onrender.com/api/admins/status/individual', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                const jobs = await jobsResponse.json();
                const admins = await adminsResponse.json();
                const resumes = await resumesResponse.json();
                const session = await sessionResponse.json();
                const adminStatuses = await adminStatusResponse.json();

                // Calculate stats
                const onlineCount = adminStatuses.filter(admin => admin.is_online).length;
                const pendingJobs = jobs.filter(job => job.status === 'pending').length;
                const todayJobs = jobs.filter(job => {
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
                    monthlyGrowth: Math.floor(Math.random() * 25) + 5 // Mock data
                });

                setSessionStats(session);
                setTopJobs(jobs.slice(0, 5));
                
                // Mock recent activities
                setRecentActivities([
                    { id: 1, action: "New job posted", time: "2 mins ago", type: "job" },
                    { id: 2, action: "Resume uploaded", time: "5 mins ago", type: "resume" },
                    { id: 3, action: "Admin approved", time: "10 mins ago", type: "admin" },
                    { id: 4, action: "Job application", time: "15 mins ago", type: "application" }
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
    const { isOnline, handleOnline, handleOffline } = useContext(OnlineStatusContext);

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
        <div className='landing-land'>
            {/* Header Section */}
            <div className="dashboard-header-land">
                <div className="header-content-land">
                    <div className="welcome-section-land">
                        <h1 className="welcome-title-land">
                            G'd, <span className="admin-name-land">{adminDetails?.adminname}</span>
                        </h1>
                        <p className="welcome-subtitle-land">Here's what's happening with your dashboard today</p>
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
                                <div className={`status-indicator-land ${isOnline ? 'online' : 'offline'}`}>
                                    <span className="status-dot-land"></span>
                                    {isOnline ? 'Online' : 'Offline'}
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
                        <h3>{dashboardStats.totalJobs}</h3>
                        <p>Total Jobs</p>
                        <span className="stat-change-land positive-land">+{dashboardStats.monthlyGrowth}% this month</span>
                    </div>
                </div>

                <div className="stat-card-land admins-card-land">
                    <div className="stat-icon-land">👥</div>
                    <div className="stat-content-land">
                        <h3>{dashboardStats.totalAdmins}</h3>
                        <p>Total Admins</p>
                        <span className="stat-change-land">{dashboardStats.onlineAdmins} online now</span>
                    </div>
                </div>

                <div className="stat-card-land resumes-card-land">
                    <div className="stat-icon-land">📄</div>
                    <div className="stat-content-land">
                        <h3>{dashboardStats.totalResumes}</h3>
                        <p>Resumes Received</p>
                        <span className="stat-change-land positive-land">+12% this week</span>
                    </div>
                </div>

                <div className="stat-card-land pending-card-land">
                    <div className="stat-icon-land">⏳</div>
                    <div className="stat-content-land">
                        <h3>{dashboardStats.pendingApprovals}</h3>
                        <p>Pending Approvals</p>
                        <span className="stat-change-land warning-land">Needs attention</span>
                    </div>
                </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="dashboard-content-land">
                {/* Left Column */}
                <div className="dashboard-left-land">
                    {/* Session Tracker */}
                    <div className="dashboard-card-land session-card-land">
                        <h3>Session Tracker</h3>
                        <div className="session-stats-land">
                            <div className="session-time-land">
                                <span className="time-label-land">Today's Total:</span>
                                <span className="time-value-land">{formatTime(sessionStats.todayTotal)}</span>
                            </div>
                            <div className="session-controls-land">
                                <button
                                    onClick={handleOnline}
                                    className={`session-btn-land online-btn-land ${isOnline ? 'active' : ''}`}
                                    disabled={isOnline}
                                >
                                    🟢 Go Online
                                </button>
                                <button
                                    onClick={handleOffline}
                                    className={`session-btn-land offline-btn-land ${!isOnline ? 'active' : ''}`}
                                    disabled={!isOnline}
                                >
                                    🔴 Go Offline
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="dashboard-card-land quick-actions-land">
                        <h3>Quick Actions</h3>
                        <div className="action-buttons-land">
                            <a href="/ojb/admin/dashboard" className="action-btn-land primary-land">
                                <img src={ojbassests.ojb_logo || "/placeholder.svg"} alt="OJB" className="action-icon-land" />
                                <span>OJB Dashboard</span>
                            </a>
                            <a href="/zorvixe" className="action-btn-land secondary-land">
                                <img src={zorvixeassests.Zorvixe_logo || "/placeholder.svg"} alt="Zorvixe" className="action-icon-land" />
                                <span>Zorvixe Portal</span>
                            </a>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="dashboard-card-land activities-card-land">
                        <h3>Recent Activities</h3>
                        <div className="activities-list-land">
                            {recentActivities.map(activity => (
                                <div key={activity.id} className="activity-item-land">
                                    <div className={`activity-icon-land ${activity.type}`}>
                                        {activity.type === 'job' && '💼'}
                                        {activity.type === 'resume' && '📄'}
                                        {activity.type === 'admin' && '👤'}
                                        {activity.type === 'application' && '📝'}
                                    </div>
                                    <div className="activity-content-land">
                                        <p>{activity.action}</p>
                                        <span className="activity-time-land">{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-right-land">
                    {/* Performance Chart */}
                    <div className="dashboard-card-land chart-card-land">
                        <h3>Performance Overview</h3>
                        <div className="chart-container-land">
                            <div className="chart-bars-land">
                                <div className="chart-bar-land" style={{height: '60%'}}>
                                    <span className="bar-label-land">Jobs</span>
                                </div>
                                <div className="chart-bar-land" style={{height: '80%'}}>
                                    <span className="bar-label-land">Resumes</span>
                                </div>
                                <div className="chart-bar-land" style={{height: '45%'}}>
                                    <span className="bar-label-land">Admins</span>
                                </div>
                                <div className="chart-bar-land" style={{height: '70%'}}>
                                    <span className="bar-label-land">Views</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Jobs */}
                    <div className="dashboard-card-land top-jobs-land">
                        <h3>Recent Jobs</h3>
                        <div className="jobs-list-land">
                            {topJobs.map(job => (
                                <div key={job.id} className="job-item-land">
                                    <img src={job.image_link || "/placeholder.svg"} alt={job.companyname} className="company-logo-land" />
                                    <div className="job-info-land">
                                        <h4>{job.title}</h4>
                                        <p>{job.companyname}</p>
                                        <span className={`job-status-land ${job.status}`}>{job.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="dashboard-card-land system-status-land">
                        <h3>System Status</h3>
                        <div className="status-items-land">
                            <div className="status-item-land">
                                <span className="status-label-land">Database</span>
                                <span className="status-value-land online-land">Online</span>
                            </div>
                            <div className="status-item-land">
                                <span className="status-label-land">API Server</span>
                                <span className="status-value-land online-land">Healthy</span>
                            </div>
                            <div className="status-item-land">
                                <span className="status-label-land">File Storage</span>
                                <span className="status-value-land online-land">Active</span>
                            </div>
                            <div className="status-item-land">
                                <span className="status-label-land">WebSocket</span>
                                <span className="status-value-land online-land">Connected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="floating-actions-land">
                <button className="fab-land main-fab-land">
                    <span>+</span>
                </button>
                <div className="fab-menu-land">
                   <a href="/admin"> <button className="fab-land sub-fab-land" title="Add Job">💼</button></a> 
                    <a href="/chatts"> <button className="fab-land sub-fab-land" title="Add Admin">👤</button></a> 
                     <a href="/admin"><button className="fab-land sub-fab-land" title="View Reports">📊</button></a> 
                </div>
            </div>
        </div>
    );
}

export default Landing;