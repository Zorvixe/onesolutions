"use client";

import { useState, useEffect } from "react";
import "./LiveClasses.css";
import { assests } from "../../../assests/assests";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL;

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
  });
  const [editingClass, setEditingClass] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `https://ose.onesolutionsekam.in/api/admin/live-classes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched classes:", data);
        setClasses(data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingClass
        ? `https://ose.onesolutionsekam.in/api/live-classes/${editingClass.id}`
        : `https://ose.onesolutionsekam.in/api/live-classes`;

      const method = editingClass ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
        });
        setEditingClass(null);
        fetchClasses();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save class");
      }
    } catch (error) {
      console.error("Error saving class:", error);
      alert("Failed to save class");
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
    });
    setIsModalOpen(true);
  };

  const handleEdit = (classItem) => {
    console.log("Editing class:", classItem);
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
        `https://ose.onesolutionsekam.in/api/live-classes/${classId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchClasses();
      } else {
        alert("Failed to delete class");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("Failed to delete class");
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not set";

    const date = new Date(dateTime);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      upcoming: { color: "#FF6B35", bg: "#FFF0EB", label: "UPCOMING" },
      live: { color: "#10B981", bg: "#ECFDF5", label: "LIVE" },
      completed: { color: "#6B7280", bg: "#F9FAFB", label: "COMPLETED" },
    };

    const config = statusConfig[status] || statusConfig.upcoming;

    return (
      <span
        className="status-badge"
        style={{
          backgroundColor: config.bg,
          color: config.color,
          border: `1px solid ${config.color}20`,
        }}
      >
        {config.label}
      </span>
    );
  };

  const getBatchInfo = (batch_month, batch_year) => {
    if (!batch_month && !batch_year) {
      return "All Batches";
    }
    if (batch_month && batch_year) {
      return `${batch_month} ${batch_year}`;
    }
    if (batch_month) {
      return batch_month;
    }
    if (batch_year) {
      return batch_year;
    }
    return "All Batches";
  };

  const handleStatusChange = async (classId, newStatus) => {
    try {
      const response = await fetch(
        `https://ose.onesolutionsekam.in/api/live-classes/${classId}`,
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
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleProgressChange = async (classId, newProgress) => {
    try {
      const response = await fetch(
        `https://ose.onesolutionsekam.in/api/live-classes/${classId}`,
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
        alert("Failed to update progress");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      alert("Failed to update progress");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return "bi bi-stopwatch";
      case "live":
        return "bi bi-broadcast";
      case "completed":
        return "bi bi-check-circle";
      default:
        return "bi bi-stopwatch";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "#ffa500";
      case "live":
        return "#28a745";
      case "completed":
        return "#6c757d";
      default:
        return "#ffa500";
    }
  };

  const newClassVideo = () => {
    navigate("/Video_Management");
  };

  if (loading) {
    return (
      <div className="pa-loading-container">
        <img src={assests.one_solutions} className="pa-one-solutions-image" />
        <div className="pa-loader"></div>
      </div>
    );
  }

  return (
    <div className="live-classes-admin">
      {/* Header Section */}
      <div className="admin-header">
        <div className="header-content">
          <h1>Live Classes Management</h1>
          <p>Manage and schedule your live classes efficiently</p>
        </div>
        <div>
          <button className="btn-create mb-2" onClick={showCreateModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Create New Class
          </button>
          <button className="btn-create" onClick={newClassVideo}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Create New Video
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon upcoming">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{classes.filter((c) => c.status === "upcoming").length}</h3>
            <p>Upcoming Classes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon live">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zm-2-.79V18H4V6h12v3.69z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{classes.filter((c) => c.status === "live").length}</h3>
            <p>Live Now</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{classes.filter((c) => c.status === "completed").length}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{classes.length}</h3>
            <p>Total Classes</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="content-header">
          <h2>Scheduled Classes</h2>
          <span className="class-count">({classes.length} classes)</span>
        </div>

        {/* Classes Grid */}
        {classes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
            </div>
            <h3>No classes scheduled yet</h3>
            <p>Get started by creating your first live class</p>
          </div>
        ) : (
          <div className="livcss-live container-fluid">
            <div className="row g-4 live-classes-row-con">
              {" "}
              {/* Changed to g-4 for larger gap */}
              {classes.length > 0 ? (
                classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="livcss-liveclasses-container col-12 col-sm-6 col-lg-4 mb-4" // Added mb-4 back as backup
                  >
                    {/* Rest of your card content remains exactly the same */}
                    <div
                      className="livcss-indicator-bar"
                      style={{
                        backgroundColor:
                          classItem.status === "live"
                            ? "#28a745"
                            : classItem.status === "completed"
                            ? "#6c757d"
                            : "#ffa500",
                      }}
                    ></div>
                    <div className="livcss-card-actions">
                      <button
                        className="livcss-btn-action livcss-btn-edit"
                        onClick={() => handleEdit(classItem)}
                        title="Edit class"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                      <button
                        className="livcss-btn-action livcss-btn-delete"
                        onClick={() => handleDelete(classItem.id)}
                        title="Delete class"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      </button>
                    </div>
                    <div className="livcss-information">
                      <div className="livcss-class-info">
                        <button className="livcss-letter-tag">
                          {classItem.class_name.toUpperCase().slice(0, 1)}
                        </button>
                        {classItem.class_name.toUpperCase().slice(0, 1)}

                        <div className="livcss-class-text">
                          <h3>{classItem.class_name}</h3>
                          <p>Mentor: {classItem.mentor_name}</p>
                          {classItem.batch_month && classItem.batch_year && (
                            <p className="livcss-batch-info">
                              Batch: {classItem.batch_month}{" "}
                              {classItem.batch_year}
                            </p>
                          )}
                        </div>

                        <div className="d-flex flex-column">
                          <button
                            className="livcss-status"
                            style={{
                              backgroundColor: getStatusColor(classItem.status),
                              color: "white",
                              border: "none",
                              padding: "5px",
                              borderRadius: "8px",
                              marginBottom: "10px",
                            }}
                          >
                            <i
                              className={getStatusIcon(classItem.status)}
                              style={{ marginRight: "8px" }}
                            ></i>
                            {classItem.status.charAt(0).toUpperCase() +
                              classItem.status.slice(1)}
                          </button>
                          {classItem.zoom_link && (
                            <a
                              href={classItem.zoom_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#28a745",
                                fontWeight: "bold",
                                textDecoration: "none",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <i
                                className="bi bi-box-arrow-right"
                                style={{ marginRight: "8px" }}
                              ></i>
                              Join Class
                            </a>
                          )}
                          {classItem.status === "live" &&
                            !classItem.zoom_link && (
                              <p
                                style={{ color: "#ff6b6b", fontWeight: "bold" }}
                              >
                                <i
                                  className="bi bi-exclamation-triangle"
                                  style={{ marginRight: "8px" }}
                                ></i>
                                No Zoom Link
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="livcss-progress-time">
                        <div className="livcss-row">
                          <p>Progress</p>
                          <p className="livcss-highlight">
                            {classItem.progress}%
                          </p>
                        </div>
                        <div className="livcss-progress-bar-container">
                          <div
                            className="livcss-progress-bar-fill"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, classItem.progress || 0)
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <div className="livcss-row livcss-highlights">
                          <p>Class Time</p>
                          <p>
                            {" "}
                            {formatDateTime(classItem.start_time)}
                            {" - "}
                            {formatDateTime(classItem.end_time)}
                          </p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="livcss-controls-section">
                        <div className="livcss-status-controls">
                          <h4>Update Status</h4>
                          <div className="livcss-status-buttons">
                            <button
                              className={`livcss-status-btn ${
                                classItem.status === "upcoming"
                                  ? "livcss-active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleStatusChange(classItem.id, "upcoming")
                              }
                            >
                              Upcoming
                            </button>
                            <button
                              className={`livcss-status-btn ${
                                classItem.status === "live"
                                  ? "livcss-active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleStatusChange(classItem.id, "live")
                              }
                            >
                              Live
                            </button>
                            <button
                              className={`livcss-status-btn ${
                                classItem.status === "completed"
                                  ? "livcss-active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleStatusChange(classItem.id, "completed")
                              }
                            >
                              Completed
                            </button>
                          </div>
                        </div>

                        <div className="livcss-progress-controls">
                          <label>Adjust Progress</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={classItem.progress || 0}
                            onChange={(e) =>
                              handleProgressChange(
                                classItem.id,
                                Number.parseFloat(e.target.value)
                              )
                            }
                            className="livcss-progress-slider"
                          />
                        </div>
                      </div>
                      {classItem.description && (
                        <div className="livcss-description-section">
                          <p>{classItem.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="livcss-no-classes col-12">
                  <p>No live classes.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingClass ? "Edit Class" : "Create New Class"}</h2>
              <button className="modal-close" onClick={closeModal}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="class-name" className="form-label">
                    Class Name *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="class-name"
                    value={formData.class_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        class_name: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter class name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="class-status" className="form-label">
                    Status *
                  </label>
                  <select
                    className="form-input"
                    id="class-status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    required
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="batch-month" className="form-label">
                    Batch Month
                  </label>
                  <select
                    className="form-input"
                    id="batch-month"
                    value={formData.batch_month}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        batch_month: e.target.value,
                      })
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

                <div className="form-group">
                  <label htmlFor="batch-year" className="form-label">
                    Batch Year
                  </label>
                  <select
                    className="form-input"
                    id="batch-year"
                    value={formData.batch_year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        batch_year: e.target.value,
                      })
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

                <div className="form-group">
                  <label htmlFor="start-time" className="form-label">
                    Start Time *
                  </label>
                  <input
                    type="datetime-local"
                    className="form-input"
                    id="start-time"
                    value={formData.start_time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        start_time: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="end-time" className="form-label">
                    End Time *
                  </label>
                  <input
                    type="datetime-local"
                    className="form-input"
                    id="end-time"
                    value={formData.end_time}
                    onChange={(e) =>
                      setFormData({ ...formData, end_time: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="class-progress" className="form-label">
                    Progress (%) *
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    id="class-progress"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        progress: Number.parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zoom-link" className="form-label">
                    Zoom Link
                  </label>
                  <input
                    type="url"
                    className="form-input"
                    id="zoom-link"
                    placeholder="https://zoom.us/j/..."
                    value={formData.zoom_link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        zoom_link: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="class-description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-textarea"
                  id="class-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  placeholder="Enter class description..."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingClass ? "Update Class" : "Create Class"}
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
