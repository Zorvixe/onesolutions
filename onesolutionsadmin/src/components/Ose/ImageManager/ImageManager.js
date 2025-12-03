import React, { useEffect, useState, useRef } from "react";
import "./ImageManager.css";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://api.onesolutionsekam.in/api";
const API_LIST = `${API_BASE}/admin/images`;
const API_UPLOAD = `${API_BASE}/admin/upload-image`;
const API_DELETE = `${API_BASE}/admin/delete-image`;
const API_RENAME = `${API_BASE}/admin/rename-image`;

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
    return () => {
      // Cleanup preview URLs on unmount
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
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

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      showToast("File size should be less than 10MB", "error");
      return;
    }

    // Cleanup previous preview
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }

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
    dropAreaRef.current?.classList.remove("dragover");
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
        if (filePreview) {
          URL.revokeObjectURL(filePreview);
          setFilePreview("");
        }
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

  const deleteImage = async (imageObj) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(API_DELETE, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: imageObj.displayName }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("Image deleted successfully!");
        fetchImages();
      } else {
        showToast(data.message || "Delete failed", "error");
      }
    } catch (error) {
      showToast("Failed to delete image", "error");
    }
  };

  const renameImage = async (imageObj) => {
    const newName = renameInputs[imageObj.url]?.trim();

    if (!newName) {
      showToast("Please enter a new filename", "error");
      return;
    }

    // Validate filename
    if (!/^[a-zA-Z0-9_\-\.]+$/.test(newName)) {
      showToast(
        "Filename can only contain letters, numbers, underscores, hyphens, and dots",
        "error"
      );
      return;
    }

    try {
      const res = await fetch(API_RENAME, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldName: imageObj.displayName,
          newName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("Image renamed successfully!");
        fetchImages();
        setRenameInputs((prev) => ({ ...prev, [imageObj.url]: "" }));
      } else {
        showToast(data.message || "Rename failed", "error");
      }
    } catch (error) {
      showToast("Failed to rename image", "error");
    }
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast("Image URL copied to clipboard!");
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        showToast("Image URL copied to clipboard!");
      } catch (err) {
        showToast("Failed to copy URL", "error");
      }
      document.body.removeChild(textArea);
    }
  };

  const formatFilename = (filename) => {
    if (!filename || typeof filename !== "string") {
      return "";
    }

    const parts = filename.split("-");
    if (parts.length > 1) {
      const ext = path.extname(filename);
      const randomPart = parts.slice(1).join("-");
      const nameWithoutExt = randomPart.replace(ext, "");

      if (nameWithoutExt.length > 12) {
        return nameWithoutExt.substring(0, 8) + "..." + ext;
      }
      return randomPart;
    }

    if (filename.length > 20) {
      return (
        filename.substring(0, 10) +
        "..." +
        filename.substring(filename.length - 8)
      );
    }

    return filename;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const closeModal = () => {
    setShowModal(false);
    setFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview("");
    }
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
          <div className="number">
            {images.length > 0 ? (images.length * 0.5).toFixed(1) : "0"}MB
          </div>
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
            {images.map((imageObj, index) => {
              return (
                <div key={index} className="table-row">
                  <div>
                    <img
                      src={imageObj.url}
                      alt={`Image ${index + 1}`}
                      className="image-thumbnail"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80x80?text=Image+Error";
                      }}
                    />
                  </div>
                  <div className="filename-cell">
                    <div className="filename-text">
                      {formatFilename(imageObj.displayName)}
                    </div>
                    <div className="file-url">
                      <small title={imageObj.url}>
                        /media/{formatFilename(imageObj.displayName)}
                      </small>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn btn-copy"
                      onClick={() => copyToClipboard(imageObj.url)}
                      title="Copy image URL"
                    >
                      <i className="fas fa-copy"></i>
                      Copy URL
                    </button>
                  </div>
                  <div className="rename-input-container">
                    <input
                      type="text"
                      placeholder="new-name.jpg"
                      className="rename-input"
                      value={renameInputs[imageObj.url] || ""}
                      onChange={(e) =>
                        setRenameInputs((prev) => ({
                          ...prev,
                          [imageObj.url]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && renameImage(imageObj)
                      }
                    />
                    <button
                      className="btn btn-rename"
                      onClick={() => renameImage(imageObj)}
                      disabled={!renameInputs[imageObj.url]?.trim()}
                    >
                      <i className="fas fa-edit"></i>
                      Rename
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteImage(imageObj)}
                      title="Delete image"
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
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Upload New Image</h2>
              <button
                className="close-btn"
                onClick={closeModal}
                disabled={uploading}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div
                className={`file-drop-area ${filePreview ? "has-file" : ""} ${
                  uploading ? "uploading" : ""
                }`}
                ref={dropAreaRef}
                onClick={() => !uploading && fileInputRef.current?.click()}
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
                    <div className="file-details">
                      <div className="file-name" title={file?.name}>
                        {file?.name}
                      </div>
                      <div className="file-size">
                        {formatFileSize(file?.size || 0)}
                      </div>
                    </div>
                    {!uploading && (
                      <button
                        className="remove-file-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          if (filePreview) {
                            URL.revokeObjectURL(filePreview);
                            setFilePreview("");
                          }
                        }}
                      >
                        <span className="preview-close">X</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Drag & drop your image here</p>
                    <p>
                      or <span className="browse-link">browse files</span>
                    </p>
                    <p className="file-types">
                      Supports JPG, PNG, WEBP up to 10MB
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  disabled={uploading}
                />
              </div>
              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={closeModal}
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
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      {/* Add Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </div>
  );
}

// Helper function for path operations (since we removed the import)
const path = {
  extname: (filename) => {
    const match = filename.match(/\.[^/.]+$/);
    return match ? match[0] : "";
  },
};
