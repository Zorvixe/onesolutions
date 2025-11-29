import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ClassVideoManagement.css";
import AdminAuthModal from "../AdminAuthModal/AdminAuthModal";
import { useAdminAuth } from "../AdminAuthModal/useAdminAuth";

import GoalsPDFView from "../GoalsPDFView/GoalsPDFView"

const API_BASE_URL = "https://api.onesolutionsekam.in";



const ClassVideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    subtopicId: "",
    videoTitle: "",
    videoDescription: "",
    videoUrl: "",
    videoType: "youtube",
    moduleName: "",
    topicName: "",
    duration: "",
    isActive: true,
  });
  const [videoFile, setVideoFile] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    moduleName: "",
    topicName: "",
    isActive: "",
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  // View mode state
  const [viewMode, setViewMode] = useState("grid");


   // Admin Auth
   const {
    isAuthenticated,
    showAuthModal,
    loading: authLoading,
    setShowAuthModal,
    handleAuthSuccess,
    getAuthHeaders,
  } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchVideos();
      // Set up interval to refresh online status every 30 seconds
      const interval = setInterval(fetchVideos, 30000);
      return () => clearInterval(interval);
    }
  }, [filters, pagination.page, isAuthenticated]);

  const fetchVideos = async () => {
    if (!isAuthenticated) return;

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
        throw new Error("Failed to fetch videos");
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
      toast.error("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (videoFile) {
        formDataToSend.append("video", videoFile);
      }

      const url = editingVideo
        ? `${API_BASE_URL}/api/admin/class-videos`
        : `${API_BASE_URL}/api/admin/class-videos`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(
          editingVideo
            ? "Video updated successfully"
            : "Video created successfully"
        );
        closeModal();
        fetchVideos();
      } else {
        throw new Error(result.message || "Failed to save video");
      }
    } catch (error) {
      console.error("Error saving video:", error);
      toast.error(error.message || "Failed to save video");
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      subtopicId: video.subtopic_id,
      videoTitle: video.video_title,
      videoDescription: video.video_description || "",
      videoUrl: video.video_url,
      videoType: video.video_type,
      moduleName: video.module_name || "",
      topicName: video.topic_name || "",
      duration: video.duration || "",
      isActive: video.is_active,
    });
    setVideoFile(null);
    setShowModal(true);
  };

  const handleDelete = async (subtopicId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      const token = localStorage.getItem("token");
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
      toast.error("Failed to delete video");
    }
  };

  const toggleActive = async (video) => {
    try {
      const token = localStorage.getItem("token");
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
      toast.error("Failed to update video status");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVideo(null);
    setFormData({
      subtopicId: "",
      videoTitle: "",
      videoDescription: "",
      videoUrl: "",
      videoType: "youtube",
      moduleName: "",
      topicName: "",
      duration: "",
      isActive: true,
    });
    setVideoFile(null);
  };

  const showCreateModal = () => {
    setEditingVideo(null);
    setFormData({
      subtopicId: "",
      videoTitle: "",
      videoDescription: "",
      videoUrl: "",
      videoType: "youtube",
      moduleName: "",
      topicName: "",
      duration: "",
      isActive: true,
    });
    setVideoFile(null);
    setShowModal(true);
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
        className="video-type-badgevidd"
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
        className={`status-badgevidd ${
          isActive ? "activevidd" : "inactivevidd"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const handleSubtopicSelect = (topic) => {
    setFormData(prev => ({
      ...prev,
      subtopicId: topic.id,
      topicName: topic.name
    }));
    toast.success(`Selected subtopic: ${topic.name}`);
  };

  return (
    <div className="class-video-managementvidd">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="admin-headervidd">
        <div className="header-contentvidd">
          <h1>Class Videos Management</h1>
          <p>Upload and manage class videos for different topics</p>
        </div>
        <div className="header-actionsvidd">
          <div className="view-togglevidd">
            <button
              className={`view-btnvidd ${
                viewMode === "grid" ? "activevidd" : ""
              }`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
              </svg>
            </button>
            <button
              className={`view-btnvidd ${
                viewMode === "list" ? "activevidd" : ""
              }`}
              onClick={() => setViewMode("list")}
              title="List View"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0 4h2v-2H3v2zm18-8h2v-2h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2zM5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2zM7 7h14v14H7V7z" />
              </svg>
            </button>
          </div>
          <button className="btn-createvidd" onClick={showCreateModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Add New Video
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-sectionvidd">
        <div className="filters-headervidd">
          <h3>Filters</h3>
          <button className="btn-cleanvidd" onClick={clearFilters}>
            Clear All
          </button>
        </div>
        <div className="filters-gridvidd">
          <div className="filter-groupvidd">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by title, description, or subtopic ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <div className="filter-groupvidd">
            <label>Module Name</label>
            <input
              type="text"
              placeholder="Filter by module name..."
              value={filters.moduleName}
              onChange={(e) => handleFilterChange("moduleName", e.target.value)}
            />
          </div>
          <div className="filter-groupvidd">
            <label>Topic Name</label>
            <input
              type="text"
              placeholder="Filter by topic name..."
              value={filters.topicName}
              onChange={(e) => handleFilterChange("topicName", e.target.value)}
            />
          </div>
          <div className="filter-groupvidd">
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

      {/* Videos Grid/List */}
      <div className="content-sectionvidd">
        {loading ? (
          <div className="loading-containervidd">
            <div className="loadervidd"></div>
            <p>Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="empty-statevidd">
            <div className="empty-iconvidd">
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
              </svg>
            </div>
            <h3>No videos found</h3>
            <p>Try adjusting your filters or add new videos</p>
            <button className="btn-createvidd" onClick={showCreateModal}>
              Add New Video
            </button>
          </div>
        ) : (
          <div className={`videos-containervidd ${viewMode}-viewvidd`}>
            {videos.map((video) => (
              <div key={video.id} className="video-cardvidd">
                {/* Thumbnail Section */}
                <div className="thumbnail-containervidd">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt={video.video_title}
                      className="thumbnail-imgvidd"
                    />
                  ) : (
                    <div className="thumbnail-placeholdervidd">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M10 9v6l5-3-5-3zm8-7h-8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16h-8V4h8v14z" />
                      </svg>
                    </div>
                  )}
                  <div className="thumbnail-overlayvidd">
                    <div className="duration-badgevidd">
                      {formatDuration(video.duration)}
                    </div>
                    <div className="video-type-overlayvidd">
                      {getVideoTypeBadge(video.video_type)}
                    </div>
                  </div>
                </div>

                {/* Video Info Section */}
                <div className="video-info-sectionvidd">
                  <div className="video-metavidd">
                    <div className="module-topic-infovidd">
                      <span className="module-namevidd">
                        {video.module_name || "General"}
                      </span>
                      <span className="topic-separatorvidd">•</span>
                      <span className="topic-namevidd">
                        {video.topic_name || "No Topic"}
                      </span>
                    </div>

                    <h3 className="video-titlevidd" title={video.video_title}>
                      {video.video_title}
                    </h3>

                    <p className="video-descriptionvidd">
                      {video.video_description?.substring(0, 120)}
                      {video.video_description?.length > 120 && "..."}
                    </p>
                  </div>

                  <div className="video-footervidd">
                    <div className="video-detailsvidd">
                      <code
                        className="subtopic-idvidd"
                        title={video.subtopic_id}
                      >
                        ID: {video.subtopic_id}
                      </code>
                      <div className="status-containervidd">
                        {getStatusBadge(video.is_active)}
                      </div>
                    </div>

                    <div className="video-actionsvidd">
                      <button
                        className="btn-actionvidd editvidd"
                        onClick={() => handleEdit(video)}
                        title="Edit video"
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
                        className="btn-actionvidd toggle-activevidd"
                        onClick={() => toggleActive(video)}
                        title={video.is_active ? "Deactivate" : "Activate"}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          {video.is_active ? (
                            <path d="M19 13H5v-2h14v2z" />
                          ) : (
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                          )}
                        </svg>
                      </button>
                      <button
                        className="btn-actionvidd deletevidd"
                        onClick={() => handleDelete(video.subtopic_id)}
                        title="Delete video"
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
          <div className="pagination-sectionvidd">
            <div className="pagination-infovidd">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} videos
            </div>
            <div className="pagination-controlsvidd">
              <button
                className="pagination-btnvidd"
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </button>
              <span className="pagination-pagevidd">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                className="pagination-btnvidd"
                disabled={pagination.page === pagination.pages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal with Split View */}
      {showModal && (
        <div className="modal-overlayvidd" onClick={closeModal}>
          <div
            className="modal-contentvidd split-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-headervidd">
              <h2>{editingVideo ? "Edit Video" : "Add New Video"}</h2>
              <button className="modal-closevidd" onClick={closeModal}>
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

            <div className="split-view-container">
              {/* Left Side - Form */}
              <div className="form-section">
                <form onSubmit={handleSubmit} className="modal-formvidd">
                  <div className="form-gridvidd">
                    <div className="form-groupvidd">
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
                      <small>Click on any subtopic from the right panel to auto-fill</small>
                    </div>

                    <div className="form-groupvidd">
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

                    <div className="form-groupvidd full-widthvidd">
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

                    <div className="form-groupvidd">
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
                      <div className="form-groupvidd full-widthvidd">
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
                      <div className="form-groupvidd full-widthvidd">
                        <label>Upload Video *</label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setVideoFile(e.target.files[0])}
                          required={
                            formData.videoType === "uploaded" && !editingVideo
                          }
                        />
                        <small>
                          Max file size: 100MB. Supported formats: MP4, WebM, MOV
                        </small>
                      </div>
                    )}

                    <div className="form-groupvidd">
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

                    <div className="form-groupvidd">
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

                    <div className="form-groupvidd">
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

                    <div className="form-groupvidd">
                      <label>Status</label>
                      <select
                        value={formData.isActive}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isActive: e.target.value === "true",
                          }))
                        }
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actionsvidd">
                    <button
                      type="button"
                      className="btn-cancelvidd"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-submitvidd">
                      {editingVideo ? "Update Video" : "Create Video"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Side - Goals PDF View */}
              <div className="goals-preview-section">
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