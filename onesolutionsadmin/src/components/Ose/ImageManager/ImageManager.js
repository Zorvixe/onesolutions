import React, { useEffect, useState, useRef } from "react";
import "./ImageManager.css";

const API_LIST = "https://api.onesolutionsekam.in/api/admin/images";
const API_UPLOAD = "https://api.onesolutionsekam.in/api/admin/upload-image";
const API_DELETE = "https://api.onesolutionsekam.in/api/admin/delete-image";
const API_RENAME = "https://api.onesolutionsekam.in/api/admin/rename-image";

export default function AdminImageManager() {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [renameInputs, setRenameInputs] = useState({});
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_LIST);
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      }
    } catch (error) {
      showToast("Failed to load images", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000
    );
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    const preview = URL.createObjectURL(selectedFile);
    setFilePreview(preview);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropAreaRef.current?.classList.add("dragover");
  };

  const handleDragLeave = () => {
    dropAreaRef.current?.classList.remove("dragover");
  };

  const uploadImage = async () => {
    if (!file) {
      showToast("Please select an image first", "error");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(API_UPLOAD, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        showToast("Image uploaded successfully!");
        setShowModal(false);
        setFile(null);
        setFilePreview("");
        fetchImages();
      } else {
        showToast(data.message || "Upload failed", "error");
      }
    } catch (error) {
      showToast("Upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (url) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    const filename = url.split("/").pop();

    try {
      const res = await fetch(API_DELETE, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("Image deleted successfully!");
        fetchImages();
      }
    } catch (error) {
      showToast("Failed to delete image", "error");
    }
  };

  const renameImage = async (url) => {
    const oldName = url.split("/").pop();
    const newName = renameInputs[url]?.trim();

    if (!newName) {
      showToast("Please enter a new filename", "error");
      return;
    }

    try {
      const res = await fetch(API_RENAME, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldName, newName }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("Image renamed successfully!");
        fetchImages();
        setRenameInputs((prev) => ({ ...prev, [url]: "" }));
      }
    } catch (error) {
      showToast("Failed to rename image", "error");
    }
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast("URL copied to clipboard!");
    } catch (error) {
      showToast("Failed to copy URL", "error");
    }
  };

  const formatFilename = (filename) => {
    if (filename.length > 25) {
      return (
        filename.substring(0, 12) +
        "..." +
        filename.substring(filename.length - 10)
      );
    }
    return filename;
  };

  return (
    <div className="image-manager-container">
      {/* Header */}
      <div className="manager-header">
        <div className="header-content">
          <h1>📸 Image Manager</h1>
          <p>Manage all your website images in one place</p>
        </div>
        <button onClick={() => setShowModal(true)} className="upload-btn">
          <i className="fas fa-cloud-upload-alt"></i>
          Upload New Image
        </button>
      </div>

      {/* Stats */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="icon">
            <i className="fas fa-images"></i>
          </div>
          <div className="number">{images.length}</div>
          <div className="label">Total Images</div>
        </div>
        <div className="stat-card">
          <div className="icon">
            <i className="fas fa-database"></i>
          </div>
          <div className="number">{images.length * 0.5}MB</div>
          <div className="label">Storage Used</div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="table-row loading-shimmer">
              <div style={{ height: "50px", borderRadius: "10px" }}></div>
              <div
                style={{ height: "18px", borderRadius: "5px", width: "70%" }}
              ></div>
              <div
                style={{ height: "35px", borderRadius: "8px", width: "90px" }}
              ></div>
              <div
                style={{ height: "35px", borderRadius: "8px", width: "160px" }}
              ></div>
              <div
                style={{ height: "35px", borderRadius: "8px", width: "90px" }}
              ></div>
            </div>
          ))
        ) : images.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-image"></i>
            <h3>No images yet</h3>
            <p>Upload your first image to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className="upload-btn"
              style={{ marginTop: "16px" }}
            >
              <i className="fas fa-cloud-upload-alt"></i>
              Upload Image
            </button>
          </div>
        ) : (
          <>
            <div className="table-header">
              <div>Preview</div>
              <div>Filename</div>
              <div>Actions</div>
              <div>Rename</div>
              <div>Delete</div>
            </div>
            {images.map((url, index) => {
              const filename = url.split("/").pop();
              return (
                <div key={index} className="table-row">
                  <div>
                    <img
                      src={url}
                      alt={filename}
                      className="image-thumbnail"
                      loading="lazy"
                    />
                  </div>
                  <div className="filename-cell">
                    {formatFilename(filename)}
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn btn-copy"
                      onClick={() => copyToClipboard(url)}
                    >
                      <i className="fas fa-copy"></i>
                      Copy URL
                    </button>
                  </div>
                  <div className="rename-input-container">
                    <input
                      type="text"
                      placeholder="new-filename.jpg"
                      className="rename-input"
                      value={renameInputs[url] || ""}
                      onChange={(e) =>
                        setRenameInputs((prev) => ({
                          ...prev,
                          [url]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => e.key === "Enter" && renameImage(url)}
                    />
                    <button
                      className="btn btn-rename"
                      onClick={() => renameImage(url)}
                    >
                      <i className="fas fa-edit"></i>
                      Rename
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteImage(url)}
                    >
                      <i className="fas fa-trash-alt"></i>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Upload New Image</h2>
            </div>
            <div className="modal-body">
              <div
                className={`file-drop-area ${filePreview ? "dragover" : ""}`}
                ref={dropAreaRef}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {filePreview ? (
                  <div className="file-info show">
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="file-preview"
                    />
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          color: "#333",
                          fontSize: "14px",
                        }}
                      >
                        {file.name}
                      </p>
                      <p style={{ fontSize: "12px", color: "#666" }}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Drag & drop your image here</p>
                    <p>
                      or <span>browse files</span>
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        marginTop: "6px",
                      }}
                    >
                      Supports JPG, PNG, WEBP up to 10MB
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />
              </div>
              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setFile(null);
                    setFilePreview("");
                  }}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={uploadImage}
                  disabled={!file || uploading}
                >
                  {uploading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-upload"></i>
                      Upload Image
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          <i
            className={`fas fa-${
              toast.type === "success" ? "check-circle" : "exclamation-circle"
            }`}
          ></i>
          <span style={{ fontSize: "14px" }}>{toast.message}</span>
        </div>
      )}

      {/* Add Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
