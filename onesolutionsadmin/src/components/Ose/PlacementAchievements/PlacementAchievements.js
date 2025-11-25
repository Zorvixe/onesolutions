"use client";

import { useState, useEffect } from "react";
import "./PlacementAchievements.css";

import { assests } from "../../../assests/assests";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const PlacementAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [formData, setFormData] = useState({
    student_name: "",
    role: "",
    batch: "",
    college: "",
    company: "",
    package: "",
    feedback: "",
    image_url: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch(
        `https://ose.onesolutionsekam.in/api/admin/placement-achievements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
      } else if (response.status === 403) {
        alert("You don't have permission to access placement achievements");
      } else {
        console.error("Failed to fetch placement achievements");
      }
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to render student image or initial
  const renderStudentImage = (achievement) => {
    if (achievement.image_url) {
      return (
        <img
          src={achievement.image_url}
          alt={achievement.student_name}
          className="pa-student-image"
          onError={(e) => {
            // If image fails to load, show initial
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      );
    }

    return (
      <>
        <img
          src="/assets/placements.jpg"
          alt={achievement.student_name}
          className="pa-student-image"
          style={{ display: "none" }}
        />
        <div className="pa-student-initial">
          {achievement.student_name.charAt(0).toUpperCase()}
        </div>
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingAchievement
        ? `https://ose.onesolutionsekam.in/api/placement-achievements/${editingAchievement.id}`
        : `https://ose.onesolutionsekam.in/api/placement-achievements`;

      const method = editingAchievement ? "PUT" : "POST";

      // Prepare data for submission - set image_url to empty string if not provided
      const submitData = {
        ...formData,
        image_url: formData.image_url || "", // Send empty string if no image URL
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        fetchAchievements();
        resetForm();
        // Close the modal manually using native DOM
        const modal = document.getElementById("pa-create-modal");
        const modalBackdrop = document.querySelector(".pa-modal-backdrop");
        if (modal) {
          modal.classList.remove("pa-show");
          modal.style.display = "none";
        }
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
        document.body.classList.remove("pa-modal-open");
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0";

        alert(
          editingAchievement
            ? "Achievement updated successfully!"
            : "Achievement added successfully!"
        );
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save achievement");
      }
    } catch (error) {
      console.error("Error saving achievement:", error);
      alert("Failed to save achievement");
    }
  };

  const resetForm = () => {
    setFormData({
      student_name: "",
      role: "",
      batch: "",
      college: "",
      company: "",
      package: "",
      feedback: "",
      image_url: "",
    });
    setEditingAchievement(null);
    setShowForm(false);
  };

  const handleEdit = (achievement) => {
    setFormData({
      student_name: achievement.student_name,
      role: achievement.role,
      batch: achievement.batch,
      college: achievement.college,
      company: achievement.company,
      package: achievement.package,
      feedback: achievement.feedback,
      image_url: achievement.image_url || "",
    });
    setEditingAchievement(achievement);
    // Show the modal using native Bootstrap data attributes
    const modalElement = document.getElementById("pa-create-modal");
    if (modalElement) {
      modalElement.classList.add("pa-show");
      modalElement.style.display = "block";
      modalElement.setAttribute("aria-hidden", "false");

      // Add backdrop
      const backdrop = document.createElement("div");
      backdrop.className = "pa-modal-backdrop pa-fade pa-show";
      document.body.appendChild(backdrop);

      // Add body classes
      document.body.classList.add("pa-modal-open");
      document.body.style.overflow = "hidden";
    }
  };

  const showCreateModal = () => {
    resetForm();
    const modalElement = document.getElementById("pa-create-modal");
    if (modalElement) {
      modalElement.classList.add("pa-show");
      modalElement.style.display = "block";
      modalElement.setAttribute("aria-hidden", "false");

      // Add backdrop
      const backdrop = document.createElement("div");
      backdrop.className = "pa-modal-backdrop pa-fade pa-show";
      document.body.appendChild(backdrop);

      // Add body classes
      document.body.classList.add("pa-modal-open");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById("pa-create-modal");
    const backdrop = document.querySelector(".pa-modal-backdrop");

    if (modalElement) {
      modalElement.classList.remove("pa-show");
      modalElement.style.display = "none";
      modalElement.setAttribute("aria-hidden", "true");
    }

    if (backdrop) {
      backdrop.remove();
    }

    document.body.classList.remove("pa-modal-open");
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        const response = await fetch(
          `https://ose.onesolutionsekam.in/api/placement-achievements/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          fetchAchievements();
          alert("Achievement deleted successfully!");
        } else {
          const error = await response.json();
          alert(error.error || "Failed to delete achievement");
        }
      } catch (error) {
        console.error("Error deleting achievement:", error);
        alert("Failed to delete achievement");
      }
    }
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
    <div className="pa-admin">
      <div className="pa-admin-header">
        <h2 className="pa-admin-title">Placement Achievements Management</h2>
        <button className="pa-btn pa-btn-primary" onClick={showCreateModal}>
          + Add New Achievement
        </button>
      </div>

      <div className="pa-admin-content">
        {/* Custom Modal */}
        <div
          className="pa-modal pa-fade"
          id="pa-create-modal"
          tabIndex="-1"
          aria-labelledby="pa-create-modal-label"
          aria-hidden="true"
        >
          <div className="pa-modal-dialog pa-modal-lg pa-modal-dialog-centered pa-modal-dialog-scrollable">
            <div className="pa-modal-content">
              <div className="pa-modal-header">
                <h5 className="pa-modal-title" id="pa-create-modal-label">
                  {editingAchievement
                    ? "Edit Achievement"
                    : "Add New Achievement"}
                </h5>
                <button
                  type="button"
                  className="pa-btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="pa-modal-body">
                <form onSubmit={handleSubmit} className="pa-form">
                  <div className="pa-form-row">
                    <div className="pa-form-group pa-col-md-6">
                      <label
                        htmlFor="pa-student-name"
                        className="pa-form-label"
                      >
                        Student Name *
                      </label>
                      <input
                        type="text"
                        className="pa-form-control"
                        id="pa-student-name"
                        value={formData.student_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            student_name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="pa-form-group pa-col-md-6">
                      <label htmlFor="pa-role-text" className="pa-form-label">
                        Role *
                      </label>
                      <input
                        type="text"
                        className="pa-form-control"
                        id="pa-role-text"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="pa-form-row">
                    <div className="pa-form-group pa-col-md-6">
                      <label htmlFor="pa-batch-text" className="pa-form-label">
                        Batch *
                      </label>
                      <input
                        type="text"
                        className="pa-form-control"
                        id="pa-batch-text"
                        value={formData.batch}
                        onChange={(e) =>
                          setFormData({ ...formData, batch: e.target.value })
                        }
                        placeholder="e.g., One Solutions . June 2022"
                        required
                      />
                    </div>
                    <div className="pa-form-group pa-col-md-6">
                      <label
                        htmlFor="pa-college-text"
                        className="pa-form-label"
                      >
                        College *
                      </label>
                      <input
                        type="text"
                        className="pa-form-control"
                        id="pa-college-text"
                        value={formData.college}
                        onChange={(e) =>
                          setFormData({ ...formData, college: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="pa-form-row">
                    <div className="pa-form-group pa-col-md-6">
                      <label
                        htmlFor="pa-company-text"
                        className="pa-form-label"
                      >
                        Company *
                      </label>
                      <input
                        type="text"
                        className="pa-form-control"
                        id="pa-company-text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="pa-form-group pa-col-md-6">
                      <label
                        htmlFor="pa-package-text"
                        className="pa-form-label"
                      >
                        Package *
                      </label>
                      <input
                        type="text"
                        className="pa-form-control"
                        id="pa-package-text"
                        value={formData.package}
                        onChange={(e) =>
                          setFormData({ ...formData, package: e.target.value })
                        }
                        placeholder="e.g., 3.5 LPA"
                        required
                      />
                    </div>
                  </div>

                  <div className="pa-form-group">
                    <label htmlFor="pa-image-text" className="pa-form-label">
                      Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      className="pa-form-control"
                      id="pa-image-text"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                    <div className="pa-form-text">
                      Leave empty to use student's initial instead of image
                    </div>
                  </div>

                  <div className="pa-form-group">
                    <label htmlFor="pa-feedback-text" className="pa-form-label">
                      Feedback *
                    </label>
                    <textarea
                      className="pa-form-control"
                      id="pa-feedback-text"
                      value={formData.feedback}
                      onChange={(e) =>
                        setFormData({ ...formData, feedback: e.target.value })
                      }
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div className="pa-modal-footer">
                    <button
                      type="button"
                      className="pa-btn pa-btn-secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="pa-btn pa-btn-primary">
                      {editingAchievement
                        ? "Update Achievement"
                        : "Create Achievement"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements List */}
        <div className="pa-achievements-list">
          {achievements.length === 0 ? (
            <p className="pa-no-data">
              No placement achievements recorded yet.
            </p>
          ) : (
            <div className="pa-achievements-grid">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="pa-achievement-card">
                  <div className="pa-card-header">
                    <div className="pa-student-info">
                      <div className="pa-image-container">
                        {renderStudentImage(achievement)}
                      </div>
                      <div className="pa-student-details">
                        <h4 className="pa-student-name">
                          {achievement.student_name}
                        </h4>
                        <p className="pa-student-role">{achievement.role}</p>
                        <p className="pa-student-batch">{achievement.batch}</p>
                      </div>
                    </div>
                    <div className="pa-card-actions">
                      <button
                        className="pa-btn pa-btn-edit"
                        onClick={() => handleEdit(achievement)}
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
                        className="pa-btn pa-btn-delete"
                        onClick={() => handleDelete(achievement.id)}
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

                  <div className="pa-card-details">
                    <div className="pa-detail-row">
                      <span className="pa-detail-label">College:</span>
                      <span className="pa-detail-value">
                        {achievement.college}
                      </span>
                    </div>
                    <div className="pa-detail-row">
                      <span className="pa-detail-label">Company:</span>
                      <span className="pa-detail-value">
                        {achievement.company}
                      </span>
                    </div>
                    <div className="pa-detail-row">
                      <span className="pa-detail-label">Package:</span>
                      <span className="pa-package-value">
                        {achievement.package}
                      </span>
                    </div>
                  </div>

                  <div className="pa-feedback">
                    <p className="pa-feedback-text">{achievement.feedback}</p>
                  </div>

                  <div className="pa-card-footer">
                    <small className="pa-footer-text">
                      Created by: {achievement.created_by_name} | Status:{" "}
                      <span
                        className={`pa-status pa-status-${achievement.status}`}
                      >
                        {achievement.status}
                      </span>
                    </small>
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

export default PlacementAchievements;
