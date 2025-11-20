import React, { useState, useEffect } from "react";
import "./LiveClasses.css";
import { assests } from "../../../assests/assests";

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

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`https://ose.onesolutionsekam.in/api/admin/live-classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched classes:", data); // Debug log
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
    const modalElement = document.getElementById("classModal");
    if (modalElement) {
      modalElement.classList.add("show");
      modalElement.style.display = "block";
      modalElement.setAttribute("aria-hidden", "false");

      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);

      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    }
  };

  const handleEdit = (classItem) => {
    console.log("Editing class:", classItem); // Debug log
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
    const modalElement = document.getElementById("classModal");
    if (modalElement) {
      modalElement.classList.add("show");
      modalElement.style.display = "block";
      modalElement.setAttribute("aria-hidden", "false");

      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);

      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById("classModal");
    const backdrop = document.querySelector(".modal-backdrop");

    if (modalElement) {
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      modalElement.setAttribute("aria-hidden", "true");
    }

    if (backdrop) {
      backdrop.remove();
    }

    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
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
    return new Date(dateTime).toLocaleString();
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      upcoming: "#ffa500",
      live: "#28a745",
      completed: "#6c757d",
    };

    return (
      <span
        className="status-badge"
        style={{ backgroundColor: statusColors[status] }}
      >
        {status ? status.toUpperCase() : "UNKNOWN"}
      </span>
    );
  };

  // FIXED: Updated getBatchInfo to handle cases where only one field is present
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

  if (loading) {
    return (
      <div className="chats-loading-container">
        <img
          src={assests.one_solutions}
          className="one-solutions-image-chats"
        />
        <div className="loader-chats"></div>
      </div>
    );
  }

  return (
    <div className="live-classes-admin">
      <div className="admin-header">
        <h2>Live Classes Management</h2>
        <button className="btn btn-primary" onClick={showCreateModal}>
          + Create New Class
        </button>
      </div>

      <div className="admin-content">
        <div
          className="modal fade"
          id="classModal"
          tabIndex="-1"
          aria-labelledby="classModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="classModalLabel">
                  {editingClass ? "Edit Class" : "Create New Class"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="class-name" className="form-label">
                        Class Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="class-name"
                        value={formData.class_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            class_name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="class-status" className="form-label">
                        Status *
                      </label>
                      <select
                        className="form-control"
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
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="batch-month" className="form-label">
                        Batch Month (Optional)
                      </label>
                      <select
                        className="form-control"
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

                    <div className="mb-3 col-md-6">
                      <label htmlFor="batch-year" className="form-label">
                        Batch Year (Optional)
                      </label>
                      <select
                        className="form-control"
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
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="start-time" className="form-label">
                        Start Time *
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
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

                    <div className="mb-3 col-md-6">
                      <label htmlFor="end-time" className="form-label">
                        End Time *
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="end-time"
                        value={formData.end_time}
                        onChange={(e) =>
                          setFormData({ ...formData, end_time: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="class-progress" className="form-label">
                        Progress (%) *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="class-progress"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            progress: parseFloat(e.target.value),
                          })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="zoom-link" className="form-label">
                        Zoom Link
                      </label>
                      <input
                        type="url"
                        className="form-control"
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
                      <div className="form-text">
                        Enter the Zoom meeting URL for this class
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="class-description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="class-description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows="3"
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingClass ? "Update Class" : "Create Class"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="classes-list">
          <h3>Scheduled Classes ({classes.length})</h3>
          {classes.length === 0 ? (
            <p>No classes scheduled yet.</p>
          ) : (
            <div className="classes-grid">
              {classes.map((classItem) => (
                <div key={classItem.id} className="class-card">
                  <div className="class-header">
                    <h4>{classItem.class_name || "Unnamed Class"}</h4>
                    <div className="header-actions">
                      {getStatusBadge(classItem.status)}

                      <div className="card-actions">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(classItem)}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(classItem.id)}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="class-details">
                    <div className="detail-row">
                      <span>Mentor:</span>
                      <span>
                        {classItem.mentor_display_name ||
                          classItem.mentor_name ||
                          "Not assigned"}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span>Start:</span>
                      <span>{formatDateTime(classItem.start_time)}</span>
                    </div>
                    <div className="detail-row">
                      <span>End:</span>
                      <span>{formatDateTime(classItem.end_time)}</span>
                    </div>
                    <div className="detail-row">
                      <span>Bacth:</span>
                      <span className="batch-badge">
                        {getBatchInfo(
                          classItem.batch_month,
                          classItem.batch_year
                        )}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span>Progress:</span>
                      <span className="progress-text">
                        {Math.round(classItem.progress || 0)}%
                      </span>
                    </div>
                    {classItem.zoom_link && (
                      <div className="detail-row">
                        <span>Zoom Link:</span>
                        <a
                          href={classItem.zoom_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="zoom-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Join Meeting
                        </a>
                      </div>
                    )}
                    {classItem.description && (
                      <div className="description">
                        <strong>Description:</strong>
                        <p>{classItem.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, classItem.progress || 0)
                        )}%`,
                      }}
                    ></div>
                  </div>

                  <div className="status-controls">
                    <div className="status-buttons">
                      <button
                        className={`status-btn ${
                          classItem.status === "upcoming" ? "active" : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(classItem.id, "upcoming")
                        }
                      >
                        Upcoming
                      </button>
                      <button
                        className={`status-btn ${
                          classItem.status === "live" ? "active" : ""
                        }`}
                        onClick={() => handleStatusChange(classItem.id, "live")}
                      >
                        Live
                      </button>
                      <button
                        className={`status-btn ${
                          classItem.status === "completed" ? "active" : ""
                        }`}
                        onClick={() =>
                          handleStatusChange(classItem.id, "completed")
                        }
                      >
                        Completed
                      </button>
                    </div>

                    <div className="progress-controls">
                      <label>
                        Progress: {Math.round(classItem.progress || 0)}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={classItem.progress || 0}
                        onChange={(e) =>
                          handleProgressChange(
                            classItem.id,
                            parseFloat(e.target.value)
                          )
                        }
                        className="progress-slider"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;
