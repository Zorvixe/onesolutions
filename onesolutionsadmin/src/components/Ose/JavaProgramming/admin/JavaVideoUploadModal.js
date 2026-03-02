import React, { useState, useEffect } from "react";
import { X, Upload, Clock, Video, Link, Users } from "lucide-react";

const studentTypeOptions = [
  { value: "zorvixe_core", label: "Zorvixe Core" },
  { value: "zorvixe_pro", label: "Zorvixe Pro" },
  { value: "zorvixe_elite", label: "Zorvixe Elite" },
];

const JavaVideoUploadModal = ({
  subtopicId,
  onClose,
  onSuccess,
  editData = null,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [slidesId, setSlidesId] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [allowedStudentTypes, setAllowedStudentTypes] = useState([
    "zorvixe_core",
    "zorvixe_pro",
    "zorvixe_elite",
  ]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const isEditing = !!editData;

  useEffect(() => {
    if (editData) {
      setTitle(editData.video_title || "");
      setDescription(editData.video_description || "");
      setDuration(editData.video_duration || "");
      setSlidesId(editData.slides_id || "");
      setAllowedStudentTypes(editData.allowed_student_types || [
        "zorvixe_core",
        "zorvixe_pro",
        "zorvixe_elite",
      ]);
    }
  }, [editData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 1024) {
        setError("File size must be less than 1GB");
        return;
      }
      if (!file.type.startsWith("video/")) {
        setError("Please select a valid video file");
        return;
      }
      setError("");
      setVideoFile(file);
    }
  };

  const handleTypeToggle = (type) => {
    setAllowedStudentTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please provide a title");
      return;
    }
    if (allowedStudentTypes.length === 0) {
      setError("Please select at least one student type");
      return;
    }
    if (!isEditing && !videoFile) {
      setError("Please select a video file");
      return;
    }

    setUploading(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 70) return prev + 5;
        return prev;
      });
    }, 500);

    try {
      if (isEditing) {
        // UPDATE MODE
        const response = await fetch(
          `https://api.onesolutionsekam.in/admin/java/content/${editData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content_type: "video",
              video_title: title,
              video_description: description,
              video_duration: duration,
              slides_id: slidesId,
              allowed_student_types: allowedStudentTypes,
            }),
          }
        );

        const responseText = await response.text();
        if (!response.ok) {
          let errorData;
          try {
            errorData = JSON.parse(responseText);
          } catch {
            errorData = { message: responseText };
          }
          throw new Error(errorData.message || errorData.error || "Update failed");
        }
      } else {
        // CREATE MODE
        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("duration", duration || "0");
        formData.append("slides_id", slidesId || "");
        formData.append("allowed_student_types", JSON.stringify(allowedStudentTypes));

        const response = await fetch(
          `https://api.onesolutionsekam.in/admin/java/subtopics/${subtopicId}/video`,
          {
            method: "POST",
            body: formData,
          }
        );

        const responseText = await response.text();
        if (!response.ok) {
          let errorData;
          try {
            errorData = JSON.parse(responseText);
          } catch {
            errorData = { message: responseText };
          }
          throw new Error(
            errorData.message || errorData.error || `Upload failed with status ${response.status}`
          );
        }
      }

      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (error) {
      clearInterval(interval);
      console.error("Action error:", error);
      setError(error.message || (isEditing ? "Failed to update video details" : "Failed to upload video"));
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="video-upload-overlay">
      <div className="video-upload-modal">
        <div className="video-upload-header">
          <h3 className="video-upload-title">
            {isEditing ? "Edit Video Details" : "Upload Video Lesson"}
          </h3>
          <button onClick={onClose} className="video-upload-close-btn">
            <X className="video-upload-close-icon" />
          </button>
        </div>

        {error && <div className="video-upload-error">{error}</div>}

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
                  placeholder="e.g., Introduction to Java"
                  required
                />
              </div>

              <div className="video-upload-field">
                <label className="video-upload-label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="video-upload-textarea"
                  placeholder="Describe what this video covers..."
                  rows="3"
                />
              </div>

              {!isEditing && (
                <div className="video-upload-field">
                  <label className="video-upload-label">
                    Duration (minutes)
                  </label>
                  <div className="video-upload-duration-wrapper">
                    <Clock className="video-upload-duration-icon" />
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="video-upload-duration-input"
                      placeholder="e.g., 15"
                      min="0"
                    />
                  </div>
                </div>
              )}

              <div className="video-upload-field">
                <label className="video-upload-label">Google Slides ID</label>
                <div className="video-upload-duration-wrapper">
                  <Link className="video-upload-duration-icon" />
                  <input
                    type="text"
                    value={slidesId}
                    onChange={(e) => setSlidesId(e.target.value)}
                    className="video-upload-duration-input"
                    placeholder="e.g., 1ABCdefGHIjklMNOpqrsTUVwxyz"
                  />
                </div>
                <p className="video-upload-hint">
                  Optional: Enter the Google Slides ID from the presentation URL
                </p>
              </div>

              <div className="video-upload-field">
                <label className="video-upload-label">Access for Student Types *</label>
                <div className="student-type-checkboxes">
                  {studentTypeOptions.map((option) => (
                    <label key={option.value} className="student-type-checkbox">
                      <input
                        type="checkbox"
                        checked={allowedStudentTypes.includes(option.value)}
                        onChange={() => handleTypeToggle(option.value)}
                      />
                      <Users size={14} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <p className="video-upload-hint">
                  Select which student types can access this video
                </p>
              </div>
            </div>

            {/* Right Column - Video Uploader */}
            <div className="video-upload-right">
              {isEditing ? (
                <div
                  className="video-upload-placeholder"
                  style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac" }}
                >
                  <Video
                    className="video-upload-placeholder-icon"
                    style={{ color: "#16a34a" }}
                  />
                  <p className="video-upload-placeholder-text">
                    Video file is already uploaded.
                  </p>
                  <p className="video-upload-placeholder-hint">
                    You can edit metadata on the left.
                  </p>
                </div>
              ) : (
                <div className="video-upload-dropzone">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="video-upload-file-input"
                    id="video-file-input"
                  />
                  <label
                    htmlFor="video-file-input"
                    className="video-upload-dropzone-label"
                  >
                    {videoFile ? (
                      <div className="video-upload-file-preview">
                        <div className="video-upload-file-icon-wrapper">
                          <Video className="video-upload-file-icon" />
                        </div>
                        <p className="video-upload-file-name">
                          {videoFile.name}
                        </p>
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
                          MP4, MOV, AVI up to 1GB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              )}
            </div>
          </div>

          {uploading && (
            <div className="video-upload-progress">
              <div className="video-upload-progress-header">
                <span className="video-upload-progress-label">
                  {isEditing ? "Updating..." : "Uploading..."}
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
              disabled={uploading || !title || (!isEditing && !videoFile) || allowedStudentTypes.length === 0}
              className="video-upload-submit-btn"
            >
              {uploading
                ? "Processing..."
                : isEditing
                ? "Update Details"
                : "Upload Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JavaVideoUploadModal;