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
          className="student-image"
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
          className="student-image"
          style={{ display: "none" }}
        />
        <div className="student-initial">
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
        const modal = document.getElementById("createModal");
        const modalBackdrop = document.querySelector(".modal-backdrop");
        if (modal) {
          modal.classList.remove("show");
          modal.style.display = "none";
        }
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
        document.body.classList.remove("modal-open");
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
    const modalElement = document.getElementById("createModal");
    if (modalElement) {
      modalElement.classList.add("show");
      modalElement.style.display = "block";
      modalElement.setAttribute("aria-hidden", "false");

      // Add backdrop
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);

      // Add body classes
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    }
  };

  const showCreateModal = () => {
    resetForm();
    const modalElement = document.getElementById("createModal");
    if (modalElement) {
      modalElement.classList.add("show");
      modalElement.style.display = "block";
      modalElement.setAttribute("aria-hidden", "false");

      // Add backdrop
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);

      // Add body classes
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById("createModal");
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
    <div className="placement-achievements-admin">
      <div className="admin-header">
        <h2>Placement Achievements Management</h2>
        <button className="btn btn-primary" onClick={showCreateModal}>
          + Add New Achievement
        </button>
      </div>

      <div className="admin-content">
        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="createModal"
          tabIndex="-1"
          aria-labelledby="createModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createModalLabel">
                  {editingAchievement
                    ? "Edit Achievement"
                    : "Add New Achievement"}
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
                      <label htmlFor="student-name" className="form-label">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="student-name"
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
                    <div className="mb-3 col-md-6">
                      <label htmlFor="role-text" className="form-label">
                        Role *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="role-text"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="batch-text" className="form-label">
                        Batch *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="batch-text"
                        value={formData.batch}
                        onChange={(e) =>
                          setFormData({ ...formData, batch: e.target.value })
                        }
                        placeholder="e.g., One Solutions . June 2022"
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="College-text" className="form-label">
                        College *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="College-text"
                        value={formData.college}
                        onChange={(e) =>
                          setFormData({ ...formData, college: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="Company-text" className="form-label">
                        Company *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Company-text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="Package-text" className="form-label">
                        Package *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Package-text"
                        value={formData.package}
                        onChange={(e) =>
                          setFormData({ ...formData, package: e.target.value })
                        }
                        placeholder="e.g., 3.5 LPA"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="Image-text" className="form-label">
                      Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Image-text"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                    <div className="form-text">
                      Leave empty to use student's initial instead of image
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="Feedback-text" className="form-label">
                      Feedback *
                    </label>
                    <textarea
                      className="form-control"
                      id="Feedback-text"
                      value={formData.feedback}
                      onChange={(e) =>
                        setFormData({ ...formData, feedback: e.target.value })
                      }
                      rows="4"
                      required
                    ></textarea>
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
        <div className="achievements-list">
          {achievements.length === 0 ? (
            <p>No placement achievements recorded yet.</p>
          ) : (
            <div className="achievements-grid">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="card-header">
                    <div className="student-info">
                      <div className="image-container">
                        {renderStudentImage(achievement)}
                      </div>
                      <div>
                        <h4>{achievement.student_name}</h4>
                        <p>{achievement.role}</p>
                        <p className="batch">{achievement.batch}</p>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        className="btn btn-edit"
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
                        className="btn btn-delete"
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

                  <div className="card-details">
                    <div className="detail-row">
                      <span>College:</span>
                      <span>{achievement.college}</span>
                    </div>
                    <div className="detail-row">
                      <span>Company:</span>
                      <span>{achievement.company}</span>
                    </div>
                    <div className="detail-row">
                      <span>Package:</span>
                      <span className="package">{achievement.package}</span>
                    </div>
                  </div>

                  <div className="feedback">
                    <p>{achievement.feedback}</p>
                  </div>

                  <div className="card-footer">
                    <small>
                      Created by: {achievement.created_by_name} | Status:{" "}
                      <span className={`status ${achievement.status}`}>
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
