"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./ClassVideoManagement.css";
import GoalsPDFView from "../GoalsPDFView/GoalsPDFView";

const API_BASE_URL = "https://api.onesolutionsekam.in";

const ClassVideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const initialFormData = {
    subtopicId: "",
    videoTitle: "",
    videoDescription: "",
    videoUrl: "",
    videoType: "youtube",
    moduleName: "",
    topicName: "",
    duration: "",
    isActive: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [videoFile, setVideoFile] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    moduleName: "",
    topicName: "",
    isActive: "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  const [viewMode, setViewMode] = useState("grid");

  const navigate = useNavigate();

  // Fixed: Use useEffect for navigation
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Also add a second effect to handle token changes during component lifecycle
  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        navigate("/login");
      }
    }; // Check token periodically or on specific events
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [navigate]);

  useEffect(() => {
    if (token) {
      fetchVideos();
      const interval = setInterval(fetchVideos, 30000);
      return () => clearInterval(interval);
    }
  }, [filters, pagination.page, token]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.moduleName) params.append("moduleName", filters.moduleName);
      if (filters.topicName) params.append("topicName", filters.topicName);
      if (filters.isActive !== "") params.append("isActive", filters.isActive);
      params.append("page", pagination.page);
      params.append("limit", pagination.limit);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/class-videos?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setVideos(result.data.videos || []);
        setPagination(
          result.data.pagination || {
            page: 1,
            limit: 12,
            total: 0,
            pages: 0,
          }
        );
      } else {
        throw new Error(result.message || "Failed to fetch videos");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error(error.message || "Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subtopicId.trim()) {
      toast.error("Subtopic ID is required");
      return;
    }

    if (!formData.videoTitle.trim()) {
      toast.error("Video title is required");
      return;
    }

    if (formData.videoType !== "uploaded" && !formData.videoUrl.trim()) {
      toast.error("Video URL is required for non-uploaded videos");
      return;
    }

    if (formData.videoType === "uploaded" && !videoFile && !editingVideo) {
      toast.error("Please select a video file to upload");
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("subtopicId", formData.subtopicId.trim());
      formDataToSend.append("videoTitle", formData.videoTitle.trim());
      formDataToSend.append(
        "videoDescription",
        formData.videoDescription.trim()
      );
      formDataToSend.append("videoUrl", formData.videoUrl.trim());
      formDataToSend.append("videoType", formData.videoType);
      formDataToSend.append("moduleName", formData.moduleName.trim());
      formDataToSend.append("topicName", formData.topicName.trim());
      formDataToSend.append("duration", formData.duration.trim() || "");
      formDataToSend.append(
        "isActive",
        formData.isActive === true || formData.isActive === "true"
      );

      if (videoFile) {
        console.log("📤 Appending video file:", videoFile.name, videoFile.size);
        formDataToSend.append("video", videoFile);
      }

      console.log("📦 Form data prepared for submission");

      const url = editingVideo
        ? `${API_BASE_URL}/api/admin/class-videos/${formData.subtopicId}`
        : `${API_BASE_URL}/api/admin/class-videos`;

      const method = editingVideo ? "PUT" : "POST";

      console.log(`🚀 Sending ${method} request to: ${url}`);

      // Reset upload progress and set uploading state
      setUploadProgress(0);
      setIsUploading(true);

      // Use XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(percentComplete));
          console.log(`Upload Progress: ${Math.round(percentComplete)}%`);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            if (result.success) {
              toast.success(
                editingVideo
                  ? "Video updated successfully"
                  : "Video created successfully"
              );
              closeModal();
              fetchVideos();
            } else {
              throw new Error(
                result.message ||
                  result.error ||
                  `Failed to save video: HTTP ${xhr.status}`
              );
            }
          } catch (error) {
            console.error("❌ Error parsing response:", error);
            toast.error(error.message || "Failed to save video");
          }
        } else {
          throw new Error(`HTTP error! status: ${xhr.status}`);
        }
      });

      xhr.addEventListener("error", () => {
        console.error("❌ Network error during upload");
        toast.error("Network error during upload. Please try again.");
      });

      xhr.addEventListener("loadend", () => {
        setIsUploading(false);
        setUploadProgress(0);
      });

      xhr.open(method, url);
      xhr.send(formDataToSend);
    } catch (error) {
      console.error("❌ Error saving video:", error);
      toast.error(error.message || "Failed to save video");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      subtopicId: video.subtopic_id || "",
      videoTitle: video.video_title || "",
      videoDescription: video.video_description || "",
      videoUrl: video.video_url || "",
      videoType: video.video_type || "youtube",
      moduleName: video.module_name || "",
      topicName: video.topic_name || "",
      duration: video.duration?.toString() || "",
      isActive: video.is_active === true,
    });
    setVideoFile(null);
    setShowModal(true);
  };

  const handleDelete = async (subtopicId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/class-videos/${subtopicId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Video deleted successfully");
        fetchVideos();
      } else {
        throw new Error(result.message || "Failed to delete video");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error(error.message || "Failed to delete video");
    }
  };

  const toggleActive = async (video) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/class-videos/${video.subtopic_id}/toggle-active`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message);
        fetchVideos();
      } else {
        throw new Error(result.message || "Failed to update video status");
      }
    } catch (error) {
      console.error("Error toggling video status:", error);
      toast.error(error.message || "Failed to update video status");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVideo(null);
    setFormData(initialFormData);
    setVideoFile(null);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const showCreateModal = () => {
    setEditingVideo(null);
    setFormData(initialFormData);
    setVideoFile(null);
    setShowModal(true);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      moduleName: "",
      topicName: "",
      isActive: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getVideoTypeBadge = (type) => {
    const types = {
      youtube: { label: "YouTube", color: "#FF0000", bg: "#FFE5E5" },
      vimeo: { label: "Vimeo", color: "#1AB7EA", bg: "#E5F7FF" },
      uploaded: { label: "Uploaded", color: "#10B981", bg: "#ECFDF5" },
    };
    const config = types[type] || types.youtube;
    return (
      <span
        className="clvm-video-type-badge"
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

  const getStatusBadge = (isActive) => {
    return (
      <span
        className={`clvm-status-badge ${
          isActive ? "clvm-active" : "clvm-inactive"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const handleSubtopicSelect = (selectedData) => {
    const { topic, goalTitle, courseTitle, moduleName } = selectedData;

    setFormData((prev) => ({
      ...prev,
      subtopicId: topic.id || "",
      videoTitle: topic.name || "",
      topicName: topic.name || "",
      moduleName: moduleName || "",
      videoDescription:
        `Video for ${topic.name} - ${moduleName} - ${courseTitle}` || "",
    }));

    toast.success(`Selected subtopic: ${topic.name}`);
  };

  return (
    <div className="clvm-class-video-management">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="clvm-admin-header">
        <div className="clvm-header-content">
          <h1>Class Videos Management</h1>
          <p>Upload and manage class videos for different topics</p>
        </div>
        <div className="clvm-header-actions">
          <button className="clvm-btn-create" onClick={showCreateModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Add New Video
          </button>
        </div>
      </div>

      {/* Filters section */}
      <div className="clvm-filters-section">
        <div className="clvm-filters-header">
          <h3>Filters</h3>
          <button className="clvm-btn-clean" onClick={clearFilters}>
            Clear All
          </button>
        </div>
        <div className="clvm-filters-grid">
          <div className="clvm-filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by title, description, or subtopic ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <div className="clvm-filter-group">
            <label>Module Name</label>
            <input
              type="text"
              placeholder="Filter by module name..."
              value={filters.moduleName}
              onChange={(e) => handleFilterChange("moduleName", e.target.value)}
            />
          </div>
          <div className="clvm-filter-group">
            <label>Topic Name</label>
            <input
              type="text"
              placeholder="Filter by topic name..."
              value={filters.topicName}
              onChange={(e) => handleFilterChange("topicName", e.target.value)}
            />
          </div>
          <div className="clvm-filter-group">
            <label>Status</label>
            <select
              value={filters.isActive}
              onChange={(e) => handleFilterChange("isActive", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="clvm-content-section">
        {loading ? (
          <div className="clvm-loading-container">
            <div className="clvm-loader"></div>
            <p>Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="clvm-empty-state">
            <h3>No videos found</h3>
            <p>Try adjusting your filters or add new videos</p>
            <button className="clvm-btn-create" onClick={showCreateModal}>
              Add New Video
            </button>
          </div>
        ) : (
          <div className={`clvm-videos-container ${viewMode}-view`}>
            {videos.map((video) => (
              <div key={video.id} className="clvm-video-card">
                <div className="clvm-thumbnail-container">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt={video.video_title}
                      className="clvm-thumbnail-img"
                    />
                  ) : (
                    <div className="clvm-thumbnail-placeholder">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M10 9v6l5-3-5-3zm8-7H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6V4h12v12z" />
                      </svg>
                    </div>
                  )}
                  <div className="clvm-thumbnail-overlay">
                    <span className="clvm-duration-badge">
                      {formatDuration(video.duration)}
                    </span>
                  </div>
                </div>

                <div className="clvm-video-info-section">
                  <div className="clvm-video-meta">
                    <div className="clvm-module-topic-info">
                      <span className="clvm-module-name">
                        {video.module_name}
                      </span>
                      <span className="clvm-topic-separator">›</span>
                      <span className="clvm-topic-name">
                        {video.topic_name}
                      </span>
                    </div>
                    <h3 className="clvm-video-title">{video.video_title}</h3>
                    <p className="clvm-video-description">
                      {video.video_description || "No description available"}
                    </p>
                  </div>

                  <div className="clvm-video-footer">
                    <div className="clvm-video-details">
                      <span className="clvm-subtopic-id">
                        {video.subtopic_id}
                      </span>
                      <div className="clvm-status-container">
                        {getStatusBadge(video.is_active)}
                      </div>
                      {getVideoTypeBadge(video.video_type)}
                    </div>
                    <div className="clvm-video-actions">
                      <button
                        className="clvm-btn-action clvm-edit"
                        onClick={() => handleEdit(video)}
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
                        className="clvm-btn-action clvm-toggle-active"
                        onClick={() => toggleActive(video)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </button>
                      <button
                        className="clvm-btn-action clvm-delete"
                        onClick={() => handleDelete(video.subtopic_id)}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {videos.length > 0 && (
          <div className="clvm-pagination-section">
            <div className="clvm-pagination-info">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} videos
            </div>
            <div className="clvm-pagination-controls">
              <button
                className="clvm-pagination-btn"
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </button>
              <span className="clvm-pagination-page">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                className="clvm-pagination-btn"
                disabled={pagination.page >= pagination.pages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="clvm-modal-overlay" onClick={closeModal}>
          <div
            className="clvm-modal-content clvm-split-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="clvm-modal-header">
              <h2>{editingVideo ? "Edit Video" : "Add New Video"}</h2>
              <button className="clvm-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="clvm-split-view-container">
              <div className="clvm-form-section">
                <form onSubmit={handleSubmit} className="clvm-modal-form">
                  <div className="clvm-form-grid">
                    <div className="clvm-form-group">
                      <label>Subtopic ID *</label>
                      <input
                        type="text"
                        value={formData.subtopicId}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subtopicId: e.target.value,
                          }))
                        }
                        required
                        placeholder="e.g., introduction-to-html"
                      />
                    </div>

                    <div className="clvm-form-group">
                      <label>Video Title *</label>
                      <input
                        type="text"
                        value={formData.videoTitle}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            videoTitle: e.target.value,
                          }))
                        }
                        required
                        placeholder="Enter video title"
                      />
                    </div>

                    <div className="clvm-form-group clvm-full-width">
                      <label>Video Description</label>
                      <textarea
                        value={formData.videoDescription}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            videoDescription: e.target.value,
                          }))
                        }
                        placeholder="Enter video description"
                        rows="3"
                      />
                    </div>

                    <div className="clvm-form-group">
                      <label>Video Type</label>
                      <select
                        value={formData.videoType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            videoType: e.target.value,
                          }))
                        }
                      >
                        <option value="youtube">YouTube</option>
                        <option value="vimeo">Vimeo</option>
                        <option value="uploaded">Upload Video</option>
                      </select>
                    </div>

                    {formData.videoType !== "uploaded" ? (
                      <div className="clvm-form-group clvm-full-width">
                        <label>Video URL *</label>
                        <input
                          type="url"
                          value={formData.videoUrl}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              videoUrl: e.target.value,
                            }))
                          }
                          required={formData.videoType !== "uploaded"}
                          placeholder="Enter video URL"
                        />
                      </div>
                    ) : (
                      <div className="clvm-form-group clvm-full-width">
                        <label>Upload Video *</label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            setVideoFile(e.target.files?.[0] || null)
                          }
                          required={
                            formData.videoType === "uploaded" && !editingVideo
                          }
                        />
                        <small>
                          Max file size: 2GB. Supported: MP4, WebM, MOV
                        </small>
                      </div>
                    )}

                    <div className="clvm-form-group">
                      <label>Module Name</label>
                      <input
                        type="text"
                        value={formData.moduleName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            moduleName: e.target.value,
                          }))
                        }
                        placeholder="e.g., Introduction to HTML & CSS"
                      />
                    </div>

                    <div className="clvm-form-group">
                      <label>Topic Name</label>
                      <input
                        type="text"
                        value={formData.topicName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            topicName: e.target.value,
                          }))
                        }
                        placeholder="e.g., Introduction to HTML"
                      />
                    </div>

                    <div className="clvm-form-group">
                      <label>Duration (seconds)</label>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                        placeholder="e.g., 3600"
                      />
                    </div>

                    <div className="clvm-form-group">
                      <label>Status</label>
                      <select
                        value={formData.isActive ? "true" : "false"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isActive: e.target.value === "true",
                          }))
                        }
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Upload Progress Indicator - Moved outside form-grid for better visibility */}
                  {isUploading && (
                    <div className="clvm-upload-progress">
                      <div className="clvm-progress-header">
                        <span>Uploading Video...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="clvm-progress-bar">
                        <div
                          className="clvm-progress-fill"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <div className="clvm-progress-info">
                        <span>Please don't close this window</span>
                      </div>
                    </div>
                  )}

                  <div className="clvm-form-actions">
                    <button
                      type="button"
                      className="clvm-btn-cancel"
                      onClick={closeModal}
                      disabled={isUploading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="clvm-btn-submit"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <div className="clvm-loading-spinner"></div>
                          Uploading...
                        </>
                      ) : editingVideo ? (
                        "Update Video"
                      ) : (
                        "Create Video"
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div className="clvm-goals-preview-section">
                <GoalsPDFView onSelectSubtopic={handleSubtopicSelect} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassVideoManagement;
