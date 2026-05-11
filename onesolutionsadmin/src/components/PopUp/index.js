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
        const desktopMenu = document.querySelector(".shopify-popover");
        if (desktopMenu && !desktopMenu.contains(e.target)) {
          setSelectedPopup(null);
        }
      }
      if (isMobile && isBottomMenuVisible) {
        const bottomMenu = document.querySelector(".shopify-mobile-sheet-content");
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
        popup.id ? "Popup updated successfully" : "Popup created successfully"
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
      toast.success("Popup deleted successfully");
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
    <div className="shopify-page-container">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="shopify-toast"
      />

      <div className="shopify-page-content">
        {/* Shopify Page Header */}
        <div className="shopify-page-header">
          <div className="shopify-header-title-block">
            <h1 className="shopify-page-title">Popups</h1>
          </div>
          <div className="shopify-header-actions">
            <button
              className="shopify-btn shopify-btn-primary"
              onClick={() => {
                resetForm();
                setIsFormVisible(true);
              }}
            >
              Create popup
            </button>
          </div>
        </div>

        {/* Top metrics card (Optional utility) */}
        {!isFormVisible && (
          <div className="shopify-card shopify-metrics-card">
            <div className="shopify-metric-item">
              <span className="shopify-metric-label">Total popups</span>
              <span className="shopify-metric-value">{popups.length}</span>
            </div>
           
          </div>
        )}

        {/* Filters and Search Bar */}
        {!isFormVisible && (
          <div className="shopify-card shopify-list-card">
            <div className="shopify-filters-bar">
              <div className="shopify-tabs">
                <button
                  className={`shopify-tab ${filterStatus === "all" ? "shopify-tab-active" : ""}`}
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </button>
                <button
                  className={`shopify-tab ${filterStatus === "active" ? "shopify-tab-active" : ""}`}
                  onClick={() => setFilterStatus("active")}
                >
                  Active
                </button>
                <button
                  className={`shopify-tab ${filterStatus === "draft" ? "shopify-tab-active" : ""}`}
                  onClick={() => setFilterStatus("draft")}
                >
                  Draft
                </button>
              </div>
              <div className="shopify-search-container">
                <svg className="shopify-search-icon" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z" fill="currentColor"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Filter popups"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="shopify-search-input"
                />
              </div>
            </div>

            {/* Grid Content */}
            <div className="shopify-list-content">
              {loading ? (
                <div className="shopify-skeleton-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="shopify-skeleton-item">
                      <div className="shopify-skeleton-image"></div>
                      <div className="shopify-skeleton-text-block">
                        <div className="shopify-skeleton-line"></div>
                        <div className="shopify-skeleton-line shopify-skeleton-short"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPopups.length === 0 ? (
                <div className="shopify-empty-state">
                  <div className="shopify-empty-illustration">
                    <svg viewBox="0 0 20 20" className="shopify-empty-icon" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.5 3H5.5C4.67157 3 4 3.67157 4 4.5V15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V4.5C16 3.67157 15.3284 3 14.5 3ZM5.5 1.5C3.84315 1.5 2.5 2.84315 2.5 4.5V15.5C2.5 17.1569 3.84315 18.5 5.5 18.5H14.5C16.1569 18.5 17.5 17.1569 17.5 15.5V4.5C17.5 2.84315 16.1569 1.5 14.5 1.5H5.5ZM6 6.5C6 6.22386 6.22386 6 6.5 6H13.5C13.7761 6 14 6.22386 14 6.5C14 6.77614 13.7761 7 13.5 7H6.5C6.22386 7 6 6.77614 6 6.5ZM6.5 9C6.22386 9 6 9.22386 6 9.5C6 9.77614 6.22386 10 6.5 10H10.5C10.7761 10 11 9.77614 11 9.5C11 9.22386 10.7761 9 10.5 9H6.5Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h2 className="shopify-empty-heading">No popups found</h2>
                  <p className="shopify-empty-subtext">Try changing the filters or search term, or create a new popup.</p>
                  <button
                    className="shopify-btn shopify-btn-primary"
                    onClick={() => {
                      resetForm();
                      setIsFormVisible(true);
                    }}
                  >
                    Create popup
                  </button>
                </div>
              ) : (
                <div className="shopify-grid">
                  {filteredPopups.map((popup) => (
                    <div key={popup.id} className="shopify-grid-item">
                      <div className="shopify-item-image-wrapper">
                        <img
                          src={popup.popup_link || "/placeholder.svg"}
                          alt={popup.popup_heading}
                          className="shopify-item-image"
                        />
                        <div className="shopify-item-badge">Active</div>
                        <button
                          className="shopify-action-btn"
                          onClick={(e) => handleThreeDotsClick(popup, e)}
                        >
                          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M6 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm5.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm7 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="currentColor"></path></svg>
                        </button>

                        {/* Desktop Popover */}
                        {selectedPopup && selectedPopup.id === popup.id && !isMobile && (
                          <div className="shopify-popover">
                            <div className="shopify-popover-content">
                              <button className="shopify-popover-item" onClick={() => handleEdit(popup)}>
                                Edit popup
                              </button>
                              <button className="shopify-popover-item shopify-text-destructive" onClick={() => handleDelete(popup.id)}>
                                Delete popup
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="shopify-item-details">
                        <h3 className="shopify-item-title">{popup.popup_heading}</h3>
                        <p className="shopify-item-desc">{popup.popup_text}</p>
                        <div className="shopify-item-meta">
                          <span className="shopify-meta-text">{popup.popup_routing_link}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Shopify Modal */}
      {isFormVisible && (
        <div className="shopify-modal-overlay">
          <div className="shopify-modal">
            <div className="shopify-modal-header">
              <h2 className="shopify-modal-title">{popup.id ? "Edit popup" : "Create popup"}</h2>
              <button className="shopify-modal-close" onClick={() => setIsFormVisible(false)}>
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z" fill="currentColor"></path></svg>
              </button>
            </div>

            <div className="shopify-modal-body">
              <form onSubmit={handleSubmit} id="popup-form">
                <div className="shopify-form-layout">
                  <div className="shopify-form-group">
                    <label className="shopify-label" htmlFor="popup_heading">Heading</label>
                    <input
                      type="text"
                      id="popup_heading"
                      name="popup_heading"
                      value={popup.popup_heading}
                      onChange={handleChange}
                      className="shopify-input"
                      required
                    />
                  </div>

                  <div className="shopify-form-group">
                    <label className="shopify-label" htmlFor="popup_text">Title / Description</label>
                    <input
                      type="text"
                      id="popup_text"
                      name="popup_text"
                      value={popup.popup_text}
                      onChange={handleChange}
                      className="shopify-input"
                      required
                    />
                  </div>

                  <div className="shopify-form-group">
                    <label className="shopify-label">Image media</label>
                    <div
                      className={`shopify-dropzone ${dragActive ? "shopify-dropzone-active" : ""}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="image-upload"
                        hidden
                      />
                      <label htmlFor="image-upload" className="shopify-dropzone-label">
                        {imageLoading ? (
                          <div className="shopify-spinner-container">
                            <div className="shopify-spinner"></div>
                            <span className="shopify-spinner-text">Uploading...</span>
                          </div>
                        ) : popup.popup_link ? (
                          <div className="shopify-dropzone-preview">
                            <img src={popup.popup_link || "/placeholder.svg"} alt="Preview" />
                            <div className="shopify-dropzone-overlay">
                              <span>Change image</span>
                            </div>
                          </div>
                        ) : (
                          <div className="shopify-dropzone-empty">
                            <div className="shopify-dropzone-icon">
                              <svg viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M10 2.5a.75.75 0 0 1 .75.75v5.59l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-5.59a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" fill="currentColor"></path><path fillRule="evenodd" d="M3.5 12a.75.75 0 0 1 .75.75v3c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 1 1.5 0v3a2.25 2.25 0 0 1-2.25 2.25h-10a2.25 2.25 0 0 1-2.25-2.25v-3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" fill="currentColor"></path></svg>
                            </div>
                            <span className="shopify-dropzone-text"><strong>Add image</strong> or drop file to upload</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="shopify-form-layout-group">
                    <div className="shopify-form-group">
                      <label className="shopify-label" htmlFor="popup_routing_link">Button URL link</label>
                      <input
                        type="url"
                        id="popup_routing_link"
                        name="popup_routing_link"
                        value={popup.popup_routing_link}
                        onChange={handleChange}
                        className="shopify-input"
                        placeholder="https://"
                        required
                      />
                    </div>

                    <div className="shopify-form-group">
                      <label className="shopify-label" htmlFor="popup_belowtext">Footer text</label>
                      <input
                        type="text"
                        id="popup_belowtext"
                        name="popup_belowtext"
                        value={popup.popup_belowtext}
                        onChange={handleChange}
                        className="shopify-input"
                        required
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="shopify-modal-footer">
              <div className="shopify-modal-actions">
                <button
                  type="button"
                  className="shopify-btn shopify-btn-basic"
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="popup-form"
                  className="shopify-btn shopify-btn-primary"
                >
                  {popup.id ? "Save" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Action Sheet */}
      {isMobile && isBottomMenuVisible && selectedPopup && (
        <div className="shopify-mobile-sheet">
          <div className="shopify-mobile-sheet-backdrop" onClick={() => setIsBottomMenuVisible(false)}></div>
          <div className="shopify-mobile-sheet-content">
            <div className="shopify-mobile-sheet-handle"></div>
            <div className="shopify-mobile-sheet-header">
              <h3 className="shopify-mobile-sheet-title">{selectedPopup.popup_heading}</h3>
            </div>
            <div className="shopify-mobile-sheet-actions">
              <button
                className="shopify-mobile-action-item"
                onClick={() => handleEdit(selectedPopup)}
              >
                <span className="shopify-mobile-action-text">Edit popup</span>
              </button>
              <button
                className="shopify-mobile-action-item shopify-text-destructive"
                onClick={() => handleDelete(selectedPopup.id)}
              >
                <span className="shopify-mobile-action-text">Delete popup</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;