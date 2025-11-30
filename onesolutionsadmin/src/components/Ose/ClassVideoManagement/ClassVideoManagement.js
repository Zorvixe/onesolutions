"use client"

import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./ClassVideoManagement.css"
import GoalsPDFView from "../GoalsPDFView/GoalsPDFView"

const API_BASE_URL = "https://api.onesolutionsekam.in"

const ClassVideoManagement = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState(null)

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
  }

  const [formData, setFormData] = useState(initialFormData)
  const [videoFile, setVideoFile] = useState(null)

  const [filters, setFilters] = useState({
    search: "",
    moduleName: "",
    topicName: "",
    isActive: "",
  })

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  })

  const [viewMode, setViewMode] = useState("grid")

  useEffect(() => {
    fetchVideos()
    const interval = setInterval(fetchVideos, 30000)
    return () => clearInterval(interval)
  }, [filters, pagination.page])

  const fetchVideos = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.append("search", filters.search)
      if (filters.moduleName) params.append("moduleName", filters.moduleName)
      if (filters.topicName) params.append("topicName", filters.topicName)
      if (filters.isActive !== "") params.append("isActive", filters.isActive)
      params.append("page", pagination.page)
      params.append("limit", pagination.limit)

      const response = await fetch(`${API_BASE_URL}/api/admin/class-videos?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success) {
        setVideos(result.data.videos || [])
        setPagination(
          result.data.pagination || {
            page: 1,
            limit: 12,
            total: 0,
            pages: 0,
          },
        )
      } else {
        throw new Error(result.message || "Failed to fetch videos")
      }
    } catch (error) {
      console.error("Error fetching videos:", error)
      toast.error(error.message || "Failed to fetch videos")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.subtopicId.trim()) {
      toast.error("Subtopic ID is required")
      return
    }

    if (!formData.videoTitle.trim()) {
      toast.error("Video title is required")
      return
    }

    if (formData.videoType !== "uploaded" && !formData.videoUrl.trim()) {
      toast.error("Video URL is required for non-uploaded videos")
      return
    }

    if (formData.videoType === "uploaded" && !videoFile && !editingVideo) {
      toast.error("Please select a video file to upload")
      return
    }

    try {
      const formDataToSend = new FormData()

      formDataToSend.append("subtopicId", formData.subtopicId.trim())
      formDataToSend.append("videoTitle", formData.videoTitle.trim())
      formDataToSend.append("videoDescription", formData.videoDescription.trim())
      formDataToSend.append("videoUrl", formData.videoUrl.trim())
      formDataToSend.append("videoType", formData.videoType)
      formDataToSend.append("moduleName", formData.moduleName.trim())
      formDataToSend.append("topicName", formData.topicName.trim())
      formDataToSend.append("duration", formData.duration.trim() || "")
      formDataToSend.append("isActive", formData.isActive === true || formData.isActive === "true")

      if (videoFile) {
        console.log("📤 Appending video file:", videoFile.name, videoFile.size)
        formDataToSend.append("video", videoFile)
      }

      console.log("📦 Form data prepared for submission")

      const url = editingVideo
        ? `${API_BASE_URL}/api/admin/class-videos/${formData.subtopicId}`
        : `${API_BASE_URL}/api/admin/class-videos`

      const method = editingVideo ? "PUT" : "POST"

      console.log(`🚀 Sending ${method} request to: ${url}`)

      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast.success(editingVideo ? "Video updated successfully" : "Video created successfully")
        closeModal()
        fetchVideos()
      } else {
        throw new Error(result.message || result.error || `Failed to save video: HTTP ${response.status}`)
      }
    } catch (error) {
      console.error("❌ Error saving video:", error)
      toast.error(error.message || "Failed to save video")
    }
  }

  const handleEdit = (video) => {
    setEditingVideo(video)
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
    })
    setVideoFile(null)
    setShowModal(true)
  }

  const handleDelete = async (subtopicId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/class-videos/${subtopicId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast.success("Video deleted successfully")
        fetchVideos()
      } else {
        throw new Error(result.message || "Failed to delete video")
      }
    } catch (error) {
      console.error("Error deleting video:", error)
      toast.error(error.message || "Failed to delete video")
    }
  }

  const toggleActive = async (video) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/class-videos/${video.subtopic_id}/toggle-active`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast.success(result.message)
        fetchVideos()
      } else {
        throw new Error(result.message || "Failed to update video status")
      }
    } catch (error) {
      console.error("Error toggling video status:", error)
      toast.error(error.message || "Failed to update video status")
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingVideo(null)
    setFormData(initialFormData)
    setVideoFile(null)
  }

  const showCreateModal = () => {
    setEditingVideo(null)
    setFormData(initialFormData)
    setVideoFile(null)
    setShowModal(true)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      moduleName: "",
      topicName: "",
      isActive: "",
    })
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }

  const formatDuration = (seconds) => {
    if (!seconds) return "N/A"
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getVideoTypeBadge = (type) => {
    const types = {
      youtube: { label: "YouTube", color: "#FF0000", bg: "#FFE5E5" },
      vimeo: { label: "Vimeo", color: "#1AB7EA", bg: "#E5F7FF" },
      uploaded: { label: "Uploaded", color: "#10B981", bg: "#ECFDF5" },
    }
    const config = types[type] || types.youtube
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
    )
  }

  const getStatusBadge = (isActive) => {
    return (
      <span className={`status-badgevidd ${isActive ? "activevidd" : "inactivevidd"}`}>
        {isActive ? "Active" : "Inactive"}
      </span>
    )
  }

  const handleSubtopicSelect = (topic) => {
    setFormData((prev) => ({
      ...prev,
      subtopicId: topic.id || "",
      topicName: topic.name || "",
    }))
    toast.success(`Selected subtopic: ${topic.name}`)
  }

  return (
    <div className="class-video-managementvidd">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="admin-headervidd">
        <div className="header-contentvidd">
          <h1>Class Videos Management</h1>
          <p>Upload and manage class videos for different topics</p>
        </div>
        <div className="header-actionsvidd">
          <button className="btn-createvidd" onClick={showCreateModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Add New Video
          </button>
        </div>
      </div>

      {/* Filters section - existing code */}
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
            <select value={filters.isActive} onChange={(e) => handleFilterChange("isActive", e.target.value)}>
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content section - existing code remains the same */}
      <div className="content-sectionvidd">
        {loading ? (
          <div className="loading-containervidd">
            <div className="loadervidd"></div>
            <p>Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="empty-statevidd">
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
                {/* ... existing video card content ... */}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - update form only */}
      {showModal && (
        <div className="modal-overlayvidd" onClick={closeModal}>
          <div className="modal-contentvidd split-view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-headervidd">
              <h2>{editingVideo ? "Edit Video" : "Add New Video"}</h2>
              <button className="modal-closevidd" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="split-view-container">
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
                          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                          required={formData.videoType === "uploaded" && !editingVideo}
                        />
                        <small>Max file size: 100MB. Supported: MP4, WebM, MOV</small>
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

                  <div className="form-actionsvidd">
                    <button type="button" className="btn-cancelvidd" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-submitvidd">
                      {editingVideo ? "Update Video" : "Create Video"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="goals-preview-section">
                <GoalsPDFView onSelectSubtopic={handleSubtopicSelect} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassVideoManagement
