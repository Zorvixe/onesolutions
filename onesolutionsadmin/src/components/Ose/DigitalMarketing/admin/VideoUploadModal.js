import React, { useState } from "react";
import { X, Upload, Clock, Video } from "lucide-react";
import "./VideoUploadModal.css";

const VideoUploadModal = ({ subtopicId, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        alert("File size must be less than 500MB");
        return;
      }
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !videoFile) {
      alert("Please provide title and select a video file");
      return;
    }

    setUploading(true);
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 500);

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("duration", duration);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}/video`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (error) {
      clearInterval(interval);
      console.error("Upload error:", error);
      alert("Failed to upload video");
      setUploading(false);
    }
  };

  return (
    <div className="video-upload-overlay">
      <div className="video-upload-modal">
        <div className="video-upload-header">
          <h3 className="video-upload-title">Upload Video Lesson</h3>
          <button onClick={onClose} className="video-upload-close-btn">
            <X className="video-upload-close-icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="video-upload-form">
          <div className="video-upload-two-column">
            {/* Left Column - Form Fields */}
            <div className="video-upload-left">
              <div className="video-upload-field">
                <label className="video-upload-label">Video Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="video-upload-input"
                  placeholder="e.g., Introduction to SEO"
                  required
                />
              </div>

              <div className="video-upload-field">
                <label className="video-upload-label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="video-upload-textarea"
                  placeholder="Brief summary of this lesson..."
                  rows="3"
                />
              </div>

              <div className="video-upload-field">
                <label className="video-upload-label">Duration (minutes)</label>
                <div className="video-upload-duration-wrapper">
                  <Clock className="video-upload-duration-icon" />
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="video-upload-duration-input"
                    placeholder="e.g., 15"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Video Uploader */}
            <div className="video-upload-right">
              <div className="video-upload-dropzone">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="video-upload-file-input"
                />
                {videoFile ? (
                  <div className="video-upload-file-preview">
                    <div className="video-upload-file-icon-wrapper">
                      <Video className="video-upload-file-icon" />
                    </div>
                    <p className="video-upload-file-name">{videoFile.name}</p>
                    <p className="video-upload-file-size">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="video-upload-placeholder">
                    <Upload className="video-upload-placeholder-icon" />
                    <p className="video-upload-placeholder-text">
                      Drop video file here or click to browse
                    </p>
                    <p className="video-upload-placeholder-hint">
                      MP4, MOV, AVI up to 500MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {uploading && (
            <div className="video-upload-progress">
              <div className="video-upload-progress-header">
                <span className="video-upload-progress-label">
                  Uploading...
                </span>
                <span className="video-upload-progress-percentage">
                  {progress}%
                </span>
              </div>
              <div className="video-upload-progress-bar">
                <div
                  className="video-upload-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="video-upload-actions">
            <button
              type="button"
              onClick={onClose}
              className="video-upload-cancel-btn"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !title || !videoFile}
              className="video-upload-submit-btn"
            >
              {uploading ? "Processing..." : "Upload Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadModal;
