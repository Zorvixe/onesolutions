"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LiveClasses.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://apiose.onesolutionsekam.in";

const LiveClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    class_name: "",
    start_time: "",
    end_time: "",
    description: "",
    zoom_link: "",
    batch_month: "",
    batch_year: "",
    status: "upcoming",
    progress: 0,
    student_type: "all",
    course_selection: "all", // 🔥 FIXED: Default to "all"
  });
  const [editingClass, setEditingClass] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 FIXED: Filters with course_selection
  const [filters, setFilters] = useState({
    student_type: "all",
    course_selection: "all",
    batch_month: "",
    batch_year: "",
    status: "",
  });

  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Listen for token changes
  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        navigate("/login");
      } else {
        setToken(currentToken);
      }
    };
    window.addEventListener("storage", checkToken);
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [navigate]);

  // Fetch classes when token or filters change
  useEffect(() => {
    if (token) {
      fetchClasses();
    }
  }, [token, filters]);

  // 🔥 FIXED: Updated fetchClasses with proper error handling
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      // Add filters - handle 'all' values correctly
      if (filters.student_type && filters.student_type !== "all") {
        params.append("student_type", filters.student_type);
      }
      if (filters.course_selection && filters.course_selection !== "all") {
        params.append("course_selection", filters.course_selection);
      }
      if (filters.batch_month && filters.batch_month !== "") {
        params.append("batch_month", filters.batch_month);
      }
      if (filters.batch_year && filters.batch_year !== "") {
        params.append("batch_year", filters.batch_year);
      }
      if (filters.status && filters.status !== "") {
        params.append("status", filters.status);
      }

      const url = `${API_BASE_URL}/api/admin/live-classes${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      console.log("📡 Fetching admin live classes:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Fetched ${data.length} classes:`, data);
        setClasses(data);
      } else {
        console.error("❌ Failed to fetch classes, status:", response.status);
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        toast.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("❌ Error fetching classes:", error);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED: Handle form submit with proper data formatting
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.class_name || !formData.start_time || !formData.end_time) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const url = editingClass
        ? `${API_BASE_URL}/api/live-classes/${editingClass.id}`
        : `${API_BASE_URL}/api/live-classes`;

      const method = editingClass ? "PUT" : "POST";

      // 🔥 CRITICAL FIX: Ensure course_selection and student_type are included
      const submitData = {
        class_name: formData.class_name,
        start_time: formData.start_time,
        end_time: formData.end_time,
        description: formData.description || null,
        zoom_link: formData.zoom_link || null,
        batch_month: formData.batch_month || null,
        batch_year: formData.batch_year || null,
        status: formData.status || "upcoming",
        progress: Number(formData.progress) || 0,
        student_type: formData.student_type || "all",
        course_selection: formData.course_selection || "all",
      };

      console.log(`📤 ${method} live class:`, submitData);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("✅ Server response:", responseData);

        closeModal();
        setFormData({
          class_name: "",
          start_time: "",
          end_time: "",
          description: "",
          zoom_link: "",
          batch_month: "",
          batch_year: "",
          status: "upcoming",
          progress: 0,
          student_type: "all",
          course_selection: "all",
        });
        setEditingClass(null);
        fetchClasses();
        toast.success(
          `Class ${editingClass ? "updated" : "created"} successfully`
        );
      } else {
        const error = await response.json();
        console.error("❌ Failed to save class:", error);
        toast.error(error.error || error.message || "Failed to save class");
      }
    } catch (error) {
      console.error("❌ Error saving class:", error);
      toast.error("Failed to save class: " + error.message);
    }
  };

  const showCreateModal = () => {
    setEditingClass(null);
    setFormData({
      class_name: "",
      start_time: "",
      end_time: "",
      description: "",
      zoom_link: "",
      batch_month: "",
      batch_year: "",
      status: "upcoming",
      progress: 0,
      student_type: "all",
      course_selection: "all",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (classItem) => {
    console.log("✏️ Editing class:", classItem);
    setEditingClass(classItem);
    setFormData({
      class_name: classItem.class_name,
      start_time: classItem.start_time ? classItem.start_time.slice(0, 16) : "",
      end_time: classItem.end_time ? classItem.end_time.slice(0, 16) : "",
      description: classItem.description || "",
      zoom_link: classItem.zoom_link || "",
      batch_month: classItem.batch_month || "",
      batch_year: classItem.batch_year || "",
      status: classItem.status,
      progress: classItem.progress || 0,
      student_type: classItem.student_type || "all",
      course_selection: classItem.course_selection || "all",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (classId) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/live-classes/${classId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchClasses();
        toast.success("Class deleted successfully");
      } else {
        toast.error("Failed to delete class");
      }
    } catch (error) {
      console.error("❌ Error deleting class:", error);
      toast.error("Failed to delete class");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      student_type: "all",
      course_selection: "all",
      batch_month: "",
      batch_year: "",
      status: "",
    });
    toast.info("Filters reset");
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not set";
    try {
      const date = new Date(dateTime);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });
    } catch (e) {
      return "Invalid time";
    }
  };

  const formatDateOnly = (dateTime) => {
    if (!dateTime) return "";
    try {
      const date = new Date(dateTime);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "";
    }
  };

  const handleStatusChange = async (classId, newStatus) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/live-classes/${classId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        fetchClasses();
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleProgressChange = async (classId, newProgress) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/live-classes/${classId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ progress: newProgress }),
        }
      );

      if (response.ok) {
        fetchClasses();
      } else {
        toast.error("Failed to update progress");
      }
    } catch (error) {
      console.error("❌ Error updating progress:", error);
      toast.error("Failed to update progress");
    }
  };

  const newClassVideo = () => {
    navigate("/Video_Management");
  };

  // 🔥 NEW: Get student type badge for display
  const getStudentTypeBadge = (type) => {
    const config = {
      zorvixe_core: { color: "#4f46e5", bg: "#eef2ff", label: "CORE" },
      zorvixe_pro: { color: "#0d9488", bg: "#f0fdfa", label: "PRO" },
      zorvixe_elite: { color: "#b45309", bg: "#fff7ed", label: "ELITE" },
      all: { color: "#6b7280", bg: "#f3f4f6", label: "ALL" },
    };
    return config[type] || config.all;
  };

  // 🔥 NEW: Get course badge for display
  const getCourseBadge = (course) => {
    const config = {
      web_development: { color: "#0d9488", bg: "#f0fdfa", label: "Web Dev" },
      digital_marketing: { color: "#b45309", bg: "#fff7ed", label: "Digi Mkt" },
      java_programming: { color: "#b91c1c", bg: "#fee2e2", label: "Java" },  // 🔥 ADD THIS
      all: { color: "#6b7280", bg: "#f3f4f6", label: "All Courses" },
    };
    return config[course] || config.all;
  };

  // 🔥 NEW: Get status badge
  const getStatusBadge = (status) => {
    const config = {
      upcoming: { color: "#c2410c", bg: "#fff7ed", label: "Upcoming" },
      live: { color: "#15803d", bg: "#f0fdf4", label: "Live Now" },
      completed: { color: "#4b5563", bg: "#f3f4f6", label: "Completed" },
    };
    return config[status] || config.upcoming;
  };

  if (loading) {
    return (
      <div className="lc-loading-screen">
        <div className="lc-loader"></div>
        <p>Loading your classes...</p>
      </div>
    );
  }

  return (
    <div className="lc-dashboard-container">
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Top Header Area */}
      <header className="lc-header">
        <div className="lc-header-left">
          <h1>Live Classes</h1>
          <p>Manage schedule, batches, and live sessions</p>
        </div>
        <div className="lc-header-actions">
          <button className="lc-btn lc-btn-secondary" onClick={newClassVideo}>
            <i className="bi bi-camera-video"></i> Manage Videos
          </button>
          <button className="lc-btn lc-btn-primary" onClick={showCreateModal}>
            <i className="bi bi-plus-lg"></i> Create Class
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="lc-stats-grid">
        <div className="lc-stat-card lc-stat-upcoming">
          <div className="lc-stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>
          <div className="lc-stat-info">
            <h3>{classes.filter((c) => c.status === "upcoming").length}</h3>
            <span>Upcoming</span>
          </div>
        </div>
        <div className="lc-stat-card lc-stat-live">
          <div className="lc-stat-icon">
            <i className="bi bi-broadcast"></i>
          </div>
          <div className="lc-stat-info">
            <h3>{classes.filter((c) => c.status === "live").length}</h3>
            <span>Live Now</span>
          </div>
        </div>
        <div className="lc-stat-card lc-stat-completed">
          <div className="lc-stat-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <div className="lc-stat-info">
            <h3>{classes.filter((c) => c.status === "completed").length}</h3>
            <span>Completed</span>
          </div>
        </div>
        <div className="lc-stat-card lc-stat-total">
          <div className="lc-stat-icon">
            <i className="bi bi-collection"></i>
          </div>
          <div className="lc-stat-info">
            <h3>{classes.length}</h3>
            <span>Total Classes</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="lc-filter-bar">
        <div className="lc-filter-group">
          <select
            name="student_type"
            value={filters.student_type}
            onChange={handleFilterChange}
            className="lc-select"
          >
            <option value="all">All Student Types</option>
            <option value="zorvixe_core">Zorvixe Core</option>
            <option value="zorvixe_pro">Zorvixe Pro</option>
            <option value="zorvixe_elite">Zorvixe Elite</option>
          </select>
          <select
            name="course_selection"
            value={filters.course_selection}
            onChange={handleFilterChange}
            className="lc-select"
          >
            <option value="all">All Courses</option>
            <option value="web_development">Web Development</option>
            <option value="digital_marketing">Digital Marketing</option>
            <option value="java_programming">Java Programming</option>  {/* 🔥 ADD THIS */}
          </select>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="lc-select"
          >
            <option value="">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="live">Live</option>
            <option value="completed">Completed</option>
          </select>
          <select
            name="batch_month"
            value={filters.batch_month}
            onChange={handleFilterChange}
            className="lc-select"
          >
            <option value="">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <select
            name="batch_year"
            value={filters.batch_year}
            onChange={handleFilterChange}
            className="lc-select"
          >
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
        <button onClick={resetFilters} className="lc-btn-text">
          <i className="bi bi-arrow-counterclockwise"></i> Reset
        </button>
      </div>

      {/* Classes Grid */}
      <div className="lc-content-area">
        {classes.length === 0 ? (
          <div className="lc-empty-state">
            <div className="lc-empty-icon">
              <i className="bi bi-calendar-x"></i>
            </div>
            <h3>No Classes Found</h3>
            <p>Try adjusting your filters or create a new class.</p>
            <button className="lc-btn lc-btn-primary" onClick={showCreateModal}>
              <i className="bi bi-plus-lg"></i> Create Your First Class
            </button>
          </div>
        ) : (
          <div className="lc-card-grid">
            {classes.map((classItem) => {
              const studentTypeBadge = getStudentTypeBadge(
                classItem.student_type
              );
              const courseBadge = getCourseBadge(classItem.course_selection);
              const statusBadge = getStatusBadge(classItem.status);

              return (
                <div
                  key={classItem.id}
                  className={`lc-card lc-card-${classItem.status}`}
                >
                  {/* Card Header: Badges & Actions */}
                  <div className="lc-card-header">
                    <div className="lc-badges">
                      <span
                        className="lc-badge lc-badge-type"
                        style={{
                          backgroundColor: studentTypeBadge.bg,
                          color: studentTypeBadge.color,
                          border: `1px solid ${studentTypeBadge.color}20`,
                        }}
                      >
                        {studentTypeBadge.label}
                      </span>
                      <span
                        className="lc-badge lc-badge-course"
                        style={{
                          backgroundColor: courseBadge.bg,
                          color: courseBadge.color,
                          border: `1px solid ${courseBadge.color}20`,
                        }}
                      >
                        {courseBadge.label}
                      </span>
                      <span
                        className="lc-badge lc-badge-status"
                        style={{
                          backgroundColor: statusBadge.bg,
                          color: statusBadge.color,
                          border: `1px solid ${statusBadge.color}20`,
                        }}
                      >
                        {statusBadge.label}
                      </span>
                    </div>
                    <div className="lc-card-actions-top">
                      <button
                        onClick={() => handleEdit(classItem)}
                        title="Edit"
                        className="lc-icon-btn edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(classItem.id)}
                        title="Delete"
                        className="lc-icon-btn delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>

                  {/* Card Body: Info */}
                  <div className="lc-card-body">
                    <div className="lc-class-title-row">
                      <div className="lc-avatar">
                        {classItem.class_name?.charAt(0)?.toUpperCase() || "C"}
                      </div>
                      <h3 title={classItem.class_name}>
                        {classItem.class_name}
                      </h3>
                    </div>

                    <div className="lc-details-grid">
                      <div className="lc-detail-item">
                        <i className="bi bi-person"></i>
                        <span>{classItem.mentor_name || "Mentor"}</span>
                      </div>
                      <div className="lc-detail-item">
                        <i className="bi bi-calendar"></i>
                        <span>
                          {formatDateOnly(classItem.start_time)} |{" "}
                          {formatDateTime(classItem.start_time)}
                        </span>
                      </div>
                      {(classItem.batch_month || classItem.batch_year) && (
                        <div className="lc-detail-item full-width">
                          <i className="bi bi-people"></i>
                          <span>
                            Batch: {classItem.batch_month || ""}{" "}
                            {classItem.batch_year || ""}
                          </span>
                        </div>
                      )}
                    </div>

                    {classItem.description && (
                      <p className="lc-description-text">
                        {classItem.description}
                      </p>
                    )}

                    {/* Zoom Link Section */}
                    <div className="lc-link-section">
                      {classItem.status === "live" && classItem.zoom_link ? (
                        <a
                          href={classItem.zoom_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lc-join-btn pulse-animation"
                        >
                          <i className="bi bi-camera-video-fill"></i> Join Now
                        </a>
                      ) : classItem.zoom_link ? (
                        <a
                          href={classItem.zoom_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lc-link-text"
                        >
                          <i className="bi bi-link-45deg"></i> Zoom Link
                        </a>
                      ) : (
                        <span className="lc-no-link">
                          <i className="bi bi-slash-circle"></i> No Link
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Progress & Controls */}
                  <div className="lc-card-footer">
                    <div className="lc-progress-wrapper">
                      <div className="lc-progress-header">
                        <span>Progress</span>
                        <span
                          style={{ fontWeight: 600, color: courseBadge.color }}
                        >
                          {classItem.progress || 0}%
                        </span>
                      </div>
                      <div className="lc-slider-container">
                        <div
                          className="lc-progress-track"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, classItem.progress || 0)
                            )}%`,
                            backgroundColor: courseBadge.color,
                          }}
                        ></div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="lc-progress-input"
                          value={classItem.progress || 0}
                          onChange={(e) =>
                            handleProgressChange(
                              classItem.id,
                              Number(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="lc-status-toggle">
                      <button
                        className={`lc-toggle-btn ${
                          classItem.status === "upcoming" ? "active" : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(classItem.id, "upcoming")
                        }
                        title="Set as Upcoming"
                      >
                        Upcoming
                      </button>
                      <button
                        className={`lc-toggle-btn ${
                          classItem.status === "live" ? "active" : ""
                        }`}
                        onClick={() => handleStatusChange(classItem.id, "live")}
                        title="Set as Live"
                      >
                        Live
                      </button>
                      <button
                        className={`lc-toggle-btn ${
                          classItem.status === "completed" ? "active" : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(classItem.id, "completed")
                        }
                        title="Set as Completed"
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="lc-modal-overlay" onClick={closeModal}>
          <div
            className="lc-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lc-modal-header">
              <h2>{editingClass ? "Edit Class" : "Schedule New Class"}</h2>
              <button className="lc-close-modal" onClick={closeModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="lc-modal-form">
              <div className="lc-form-row">
                <div className="lc-form-group span-2">
                  <label>Class Name *</label>
                  <input
                    type="text"
                    value={formData.class_name}
                    onChange={(e) =>
                      setFormData({ ...formData, class_name: e.target.value })
                    }
                    placeholder="e.g. React Hooks Deep Dive"
                    required
                  />
                </div>
              </div>

              <div className="lc-form-row">
                <div className="lc-form-group">
                  <label>Student Type *</label>
                  <select
                    value={formData.student_type}
                    onChange={(e) =>
                      setFormData({ ...formData, student_type: e.target.value })
                    }
                    required
                  >
                    <option value="all">All Students</option>
                    <option value="zorvixe_core">Zorvixe Core</option>
                    <option value="zorvixe_pro">Zorvixe Pro</option>
                    <option value="zorvixe_elite">Zorvixe Elite</option>
                  </select>
                </div>
                <div className="lc-form-group">
                  <label>Course *</label>
                  <select
                    value={formData.course_selection}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        course_selection: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="all">All Courses</option>
                    <option value="web_development">Web Development</option>
                    <option value="digital_marketing">Digital Marketing</option>
                    <option value="java_programming">Java Programming</option>  {/* 🔥 ADD THIS */}
                  </select>
                </div>
              </div>

              <div className="lc-form-row">
                <div className="lc-form-group">
                  <label>Batch Month</label>
                  <select
                    value={formData.batch_month}
                    onChange={(e) =>
                      setFormData({ ...formData, batch_month: e.target.value })
                    }
                  >
                    <option value="">All Batches</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="lc-form-group">
                  <label>Batch Year</label>
                  <select
                    value={formData.batch_year}
                    onChange={(e) =>
                      setFormData({ ...formData, batch_year: e.target.value })
                    }
                  >
                    <option value="">All Years</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>

              <div className="lc-form-row">
                <div className="lc-form-group">
                  <label>Start Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.start_time}
                    onChange={(e) =>
                      setFormData({ ...formData, start_time: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="lc-form-group">
                  <label>End Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={(e) =>
                      setFormData({ ...formData, end_time: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="lc-form-row">
                <div className="lc-form-group">
                  <label>Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="lc-form-group">
                  <label>Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        progress: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="lc-form-row">
                <div className="lc-form-group span-2">
                  <label>Zoom/Meeting Link</label>
                  <input
                    type="url"
                    value={formData.zoom_link}
                    onChange={(e) =>
                      setFormData({ ...formData, zoom_link: e.target.value })
                    }
                    placeholder="https://zoom.us/..."
                  />
                </div>
              </div>

              <div className="lc-form-row">
                <div className="lc-form-group span-2">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="3"
                    placeholder="What will be covered in this class?"
                  ></textarea>
                </div>
              </div>

              <div className="lc-modal-actions">
                <button
                  type="button"
                  className="lc-btn lc-btn-text"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="lc-btn lc-btn-primary">
                  {editingClass ? "Save Changes" : "Create Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
