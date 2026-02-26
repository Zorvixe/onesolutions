"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "react-toastify/dist/ReactToastify.css";
import "./popup.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const PopUp = () => {
  const [popups, setPopups] = useState([]);
  const [popup, setPopup] = useState({
    id: null,
    popup_heading: "",
    popup_text: "",
    popup_link: "",
    popup_routing_link: "",
    popup_belowtext: "",
  });
  const [selectedPopup, setSelectedPopup] = useState(null);
  const [file, setFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isBottomMenuVisible, setIsBottomMenuVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [filterStatus, setFilterStatus] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectedPopup && !isMobile) {
        const desktopMenu = document.querySelector(".popup-desktop-menu-up");
        if (desktopMenu && !desktopMenu.contains(e.target)) {
          setSelectedPopup(null);
        }
      }
      if (isMobile && isBottomMenuVisible) {
        const bottomMenu = document.querySelector(".popup-bottom-menu-up");
        if (bottomMenu && !bottomMenu.contains(e.target)) {
          setIsBottomMenuVisible(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [selectedPopup, isBottomMenuVisible, isMobile]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchPopups(token);
    else navigate("/login");
  }, [navigate]);

  const fetchPopups = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        toast.error("Your Session is Expired!");
      }
      const data = await response.json();
      setPopups(data);
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching popups:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sfdqoeq5");
    formData.append("cloud_name", "dsjcty43b");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsjcty43b/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopup((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setImageLoading(true);
        const imageUrl = await uploadImageToCloudinary(droppedFile);
        if (imageUrl) {
          setPopup((prevData) => ({ ...prevData, popup_link: imageUrl }));
        }
        setImageLoading(false);
      } else {
        toast.error("Please upload an image file only.");
      }
    }
  };

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setImageLoading(true);
      const imageUrl = await uploadImageToCloudinary(selectedFile);
      if (imageUrl) {
        setPopup((prevData) => ({ ...prevData, popup_link: imageUrl }));
      }
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = popup.id ? "PUT" : "POST";
    const url = popup.id ? `https://apiose.onesolutionsekam.in/${popup.id}` : API_BASE_URL;

    if (
      !popup.popup_heading ||
      !popup.popup_text ||
      !popup.popup_link ||
      !popup.popup_routing_link ||
      !popup.popup_belowtext
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(popup),
      });
      if (!response.ok) throw new Error(await response.text());
      toast.success(
        popup.id ? "Popup updated successfully!" : "Popup created successfully!"
      );
      fetchPopups(token);
      resetForm();
      setIsFormVisible(false);
    } catch (error) {
      toast.error(error.message);
      console.error("Error saving popup:", error.message);
    }
  };

  const handleEdit = (popup) => {
    setPopup(popup);
    setFile(null);
    setIsFormVisible(true);
    setIsBottomMenuVisible(false);
    setSelectedPopup(null);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://apiose.onesolutionsekam.in/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      toast.success("Popup deleted successfully!");
      fetchPopups(token);
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting popup:", error.message);
    }
    setIsBottomMenuVisible(false);
    setSelectedPopup(null);
  };

  const resetForm = () => {
    setPopup({
      id: null,
      popup_heading: "",
      popup_text: "",
      popup_link: "",
      popup_routing_link: "",
      popup_belowtext: "",
    });
    setFile(null);
  };

  const handleThreeDotsClick = (popup, e) => {
    e.stopPropagation();
    setSelectedPopup(popup);
    if (isMobile) {
      setIsBottomMenuVisible(true);
    }
  };

  const filteredPopups = popups.filter(
    (popup) =>
      popup.popup_heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      popup.popup_text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="popup-admin-container-up">
      {/* Animated Background */}
      <div className="animated-background-up">
        <div className="floating-shapes-up">
          <div className="shape-up shape-1-up"></div>
          <div className="shape-up shape-2-up"></div>
          <div className="shape-up shape-3-up"></div>
          <div className="shape-up shape-4-up"></div>
          <div className="shape-up shape-5-up"></div>
          <div className="shape-up shape-6-up"></div>
        </div>
        <div className="gradient-orbs-up">
          <div className="orb-up orb-1-up"></div>
          <div className="orb-up orb-2-up"></div>
          <div className="orb-up orb-3-up"></div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="anp-toast"
        bodyClassName="anp-toast-body"
      />

      {/* Compact Header */}
      <div className="compact-header-up">
        <div className="header-content-up">
          <div className="header-text-up">
            <h1 className="header-title-up">
              <span className="title-gradient-up">Popup</span>
              <span className="title-highlight-up">Manager</span>
            </h1>
            <p className="header-subtitle-up">
              Manage your popup campaigns efficiently
            </p>
          </div>
          <div className="header-stats-up">
            <div className="mini-stat-up">
              <VisibilityIcon />
              <span>{popups.length}</span>
            </div>
            <div className="mini-stat-up">
              <TrendingUpIcon />
              <span>98%</span>
            </div>
          </div>
        </div>
        <button
          className="compact-add-btn-up"
          onClick={() => {
            resetForm();
            setIsFormVisible(true);
          }}
        >
          <AddIcon />
          <span>Add</span>
        </button>
      </div>

      {/* Compact Control Panel */}
      {!isFormVisible && (
        <div className="compact-control-panel-up">
          <div className="compact-search-up">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="compact-search-input-up"
            />
          </div>
          <div className="compact-filters-up">
            <button
              className={`filter-btn-up ${
                filterStatus === "all" ? "active-up" : ""
              }`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className={`filter-btn-up ${
                filterStatus === "active" ? "active-up" : ""
              }`}
              onClick={() => setFilterStatus("active")}
            >
              Active
            </button>
            <button
              className={`filter-btn-up ${
                filterStatus === "draft" ? "active-up" : ""
              }`}
              onClick={() => setFilterStatus("draft")}
            >
              Draft
            </button>
          </div>
        </div>
      )}

      {/* Compact Modal */}
      {isFormVisible && (
        <div className="compact-modal-overlay-up">
          <div className="compact-modal-up">
            <div className="compact-modal-header-up">
              <h3>{popup.id ? "Edit Popup" : "Create Popup"}</h3>
              <button
                className="compact-close-btn-up"
                onClick={() => setIsFormVisible(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="compact-modal-body-up">
              <form onSubmit={handleSubmit} className="compact-form-up">
                <div className="compact-form-grid-up">
                  <div className="compact-input-group-up">
                    <label>Heading</label>
                    <input
                      type="text"
                      name="popup_heading"
                      placeholder="Enter heading..."
                      value={popup.popup_heading}
                      onChange={handleChange}
                      className="compact-input-up"
                      required
                    />
                  </div>

                  <div className="compact-input-group-up">
                    <label>PopUp Title</label>
                    <input
                      name="popup_text"
                      placeholder="Enter Title..."
                      value={popup.popup_text}
                      onChange={handleChange}
                      className="compact-input-up"
                      rows="2"
                      required
                    />
                  </div>

                  <div className="compact-input-group-up compact-image-group-up">
                    <label>Image</label>
                    <div
                      className={`compact-image-upload-up ${
                        dragActive ? "drag-active-up" : ""
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="image"
                        hidden
                      />
                      <label htmlFor="image" className="compact-upload-area-up">
                        {imageLoading ? (
                          <div className="compact-loading-up">
                            <div className="mini-spinner-up"></div>
                            <span>Uploading...</span>
                          </div>
                        ) : popup.popup_link ? (
                          <div className="compact-image-preview-up">
                            <img
                              src={popup.popup_link || "/placeholder.svg"}
                              alt="Preview"
                            />
                            <div className="compact-overlay-up">
                              <CloudUploadIcon />
                            </div>
                          </div>
                        ) : (
                          <div className="compact-upload-placeholder-up">
                            <CloudUploadIcon />
                            <span>Upload Image</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="compact-input-group-up">
                    <label>URL</label>
                    <input
                      type="url"
                      name="popup_routing_link"
                      placeholder="https://example.com"
                      value={popup.popup_routing_link}
                      onChange={handleChange}
                      className="compact-input-up"
                      required
                    />
                  </div>

                  <div className="compact-input-group-up">
                    <label>Footer Text</label>
                    <input
                      type="text"
                      name="popup_belowtext"
                      placeholder="Footer text..."
                      value={popup.popup_belowtext}
                      onChange={handleChange}
                      className="compact-input-up"
                      required
                    />
                  </div>
                </div>

                <div className="compact-form-actions-up">
                  <button
                    type="button"
                    className="compact-btn-cancel-up"
                    onClick={() => setIsFormVisible(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="compact-btn-submit-up">
                    {popup.id ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Compact Content */}
      {!isFormVisible && (
        <div className="compact-content-up">
          {loading ? (
            <div className="compact-loading-grid-up">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="compact-skeleton-card-up">
                  <div className="compact-skeleton-image-up"></div>
                  <div className="compact-skeleton-content-up">
                    <div className="compact-skeleton-line-up"></div>
                    <div className="compact-skeleton-line-up short-up"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPopups.length === 0 ? (
            <div className="compact-empty-state-up">
              <div className="compact-empty-icon-up">📝</div>
              <h4>No popups found</h4>
              <p>Create your first popup</p>
              <button
                className="compact-empty-btn-up"
                onClick={() => {
                  resetForm();
                  setIsFormVisible(true);
                }}
              >
                <AddIcon />
                Create Popup
              </button>
            </div>
          ) : (
            <div className="compact-grid-up">
              {filteredPopups.map((popup, index) => (
                <div
                  key={popup.id}
                  className="compact-card-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="compact-card-header-up">
                    <div className="compact-card-image-up">
                      <img
                        src={popup.popup_link || "/placeholder.svg"}
                        alt={popup.popup_heading}
                      />
                    </div>
                    <button
                      className="compact-menu-btn-up"
                      onClick={(e) => handleThreeDotsClick(popup, e)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                    <div className="compact-status-up">Active</div>
                  </div>

                  <div className="compact-card-content-up">
                    <h4 className="compact-card-title-up">
                      {popup.popup_heading}
                    </h4>
                    <p className="compact-card-text-up">{popup.popup_text}</p>

                    <div className="compact-metrics-up">
                      <div className="compact-metric-up">
                        <span>2.4K</span>
                        <small>Views</small>
                      </div>
                      <div className="compact-metric-up">
                        <span>18%</span>
                        <small>CTR</small>
                      </div>
                      <div className="compact-metric-up">
                        <span>156</span>
                        <small>Conv</small>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Menu */}
                  {selectedPopup &&
                    selectedPopup.id === popup.id &&
                    !isMobile && (
                      <div className="compact-floating-menu-up">
                        <button
                          className="compact-menu-item-up"
                          onClick={() => handleEdit(popup)}
                        >
                          <EditIcon />
                          Edit
                        </button>
                        <button
                          className="compact-menu-item-up delete-up"
                          onClick={() => handleDelete(popup.id)}
                        >
                          <DeleteIcon />
                          Delete
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && isBottomMenuVisible && selectedPopup && (
        <div className="compact-mobile-menu-up">
          <div className="compact-menu-backdrop-up"></div>
          <div className="compact-menu-panel-up">
            <div className="compact-menu-handle-up"></div>
            <div className="compact-menu-content-up">
              <button
                className="compact-mobile-item-up"
                onClick={() => handleEdit(selectedPopup)}
              >
                <EditIcon />
                <span>Edit</span>
              </button>
              <button
                className="compact-mobile-item-up delete-up"
                onClick={() => handleDelete(selectedPopup.id)}
              >
                <DeleteIcon />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
