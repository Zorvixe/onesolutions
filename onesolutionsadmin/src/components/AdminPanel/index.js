// AdminPanel.jsx – Clean Notion‑style version (fixed auto‑submit)
"use client";

import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SearchContext } from "../Context/SearchContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { HiArrowRight } from "react-icons/hi";
import { MdAccountCircle, MdCloudUpload, MdSave } from "react-icons/md";
import {
  FaSpinner,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import { BiTime, BiMoney, BiMapPin, BiUser } from "react-icons/bi";
import debounce from "lodash.debounce";
import RichTextEditor from "./TextEditor/Texteditor";
import "react-toastify/dist/ReactToastify.css";
import "./admin.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AdminPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [viewAllJobs, setViewAllJobs] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [formData, setFormData] = useState({
    companyname: "",
    title: "",
    description: "",
    apply_link: "",
    image_link: "",
    url: "",
    salary: "",
    location: "",
    job_type: "",
    experience: "",
    batch: "",
    advanced_data: "",
  });
  const [editJobId, setEditJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageLoading, setImageLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { searchQuery } = useContext(SearchContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeEditor, setActiveEditor] = useState("description");
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const jobsPerPage = 6;

  // --- Authentication & Data Fetching ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchJobs(token);
    }
  }, [navigate]);

  const fetchJobs = useCallback(
    async (token) => {
      setLoading(true);
      try {
        const url = `https://ose.onesolutionsekam.in/api/jobs/adminpanel${
          viewAllJobs ? "?view=all" : ""
        }`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
        setTotalPages(Math.ceil(data.length / jobsPerPage));
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch jobs!");
        setLoading(false);
      }
    },
    [viewAllJobs]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchJobs(token);
  }, [fetchJobs]);

  // Token expiry check
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split(".")[1]));
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        } catch {
          // ignore
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [navigate]);

  // --- Job Filtering ---
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      const filtered = jobs.filter(
        (job) =>
          job.companyname
            .toLowerCase()
            .includes(formData.companyname.toLowerCase()) ||
          job.title.toLowerCase().includes(formData.title.toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes(formData.description.toLowerCase())
      );
      setFilteredJobs(filtered);
      setTotalPages(Math.ceil(filtered.length / jobsPerPage));
      setCurrentPage(1);
    }, 300);
    debouncedFilter();
    return () => debouncedFilter.cancel();
  }, [formData, jobs]);

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.companyname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.salary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.experience?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.job_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.batch?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
    setTotalPages(Math.ceil(filtered.length / jobsPerPage));
    setCurrentPage(1);
  }, [searchQuery, jobs]);

  // --- CRUD Operations ---
  const handleDelete = (id) => {
    setJobToDelete(id);
    setShowDeleteConfirm(true);
  };

  const performDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://ose.onesolutionsekam.in/api/jobs/${jobToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        await fetchJobs(token);
        toast.success("Job deleted successfully.");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to delete job");
      }
    } catch (err) {
      toast.error("Network error - failed to delete job");
    }
    setShowDeleteConfirm(false);
  };

  const handleEdit = (job) => {
    setEditJobId(job.id);
    setIsFormVisible(true);
    setFormStep(1);
    setFormData({
      companyname: job.companyname,
      title: job.title,
      description: job.description,
      apply_link: job.apply_link,
      image_link: job.image_link,
      url: job.url,
      salary: job.salary,
      location: job.location,
      job_type: job.job_type,
      experience: job.experience,
      batch: job.batch,
      advanced_data: job.advanced_data,
    });
  };

  // Manual submission – no form onSubmit, we call this from the final button
  const handleManualSubmit = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    const url = editJobId
      ? `https://ose.onesolutionsekam.in/api/jobs/${editJobId}`
      : `https://ose.onesolutionsekam.in/api/jobs`;

    try {
      const response = await fetch(url, {
        method: editJobId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await fetchJobs(token);
        resetForm();
        toast.success(
          editJobId ? "Job updated successfully." : "Job created successfully."
        );
      } else {
        const err = await response.json();
        toast.error(err.error || "Operation failed");
      }
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Form Helpers ---
  const resetForm = () => {
    setEditJobId(null);
    setFormData({
      companyname: "",
      title: "",
      description: "",
      apply_link: "",
      image_link: "",
      url: "",
      salary: "",
      location: "",
      job_type: "",
      experience: "",
      batch: "",
      advanced_data: "",
    });
    setIsFormVisible(false);
    setFormStep(1);
  };

  const validateToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired! Please login again");
      return false;
    }
    return true;
  };

  const handleFocus = (e) => {
    if (!validateToken()) e.target.blur();
  };

  // --- Image Upload ---
  const uploadImageToCloudinary = async (file) => {
    const formDataObj = new FormData();
    formDataObj.append("file", file);
    formDataObj.append("upload_preset", "sfdqoeq5");
    formDataObj.append("cloud_name", "dsjcty43b");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsjcty43b/image/upload",
        {
          method: "POST",
          body: formDataObj,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Image upload failed. Please try again.");
    }
  };

  const handleImageChange = async (e) => {
    if (!validateToken()) return;
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true);
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        setFormData({ ...formData, image_link: imageUrl });
        toast.success("Image uploaded successfully.");
      }
      setImageLoading(false);
    }
  };

  // --- Rich Text Editor ---
  const handleRichTextChange = (content) => {
    setFormData({ ...formData, [activeEditor]: content });
  };

  const switchEditor = (field) => {
    setActiveEditor(field);
  };

  // --- Step Navigation ---
  const nextStep = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const prevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  // --- Pagination & Read More ---
  const [expandedJobs, setExpandedJobs] = useState({});
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const paginatedJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleToggleReadMore = (id) => {
    setExpandedJobs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  // --- Responsive ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="anp-container">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        theme="light"
      />

      {/* Delete Confirmation Modal (kept) */}
      {showDeleteConfirm && (
        <div className="anp-modal-overlay">
          <div className="anp-delete-modal">
            <h3>Delete Job?</h3>
            <p>
              This action cannot be undone. The job posting will be permanently
              removed.
            </p>
            <div className="anp-delete-actions">
              <button
                type="button"
                className="anp-btn anp-btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="anp-btn anp-btn-danger"
                onClick={performDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="anp-main">
        {loading && (
          <div className="anp-loading-screen">
            <div className="anp-spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {/* Form View */}
        {isFormVisible ? (
          <div className="anp-page-view">
            <div className="anp-breadcrumb">
              <button
                type="button"
                onClick={resetForm}
                className="anp-breadcrumb-link"
              >
                Jobs
              </button>
              <span className="anp-breadcrumb-separator">/</span>
              <span className="anp-breadcrumb-current">
                {editJobId ? "Edit Job" : "New Job"}
              </span>
            </div>

            {/* No form element – we handle submission manually */}
            <div className="anp-form">
              <div className="anp-form-header">
                <h2>{editJobId ? "Edit Job" : "Create New Job"}</h2>
                <span className="anp-step-indicator">Step {formStep} of 3</span>
              </div>

              <div className="anp-form-content">
                {/* Step 1: Basic Info */}
                {formStep === 1 && (
                  <div className="anp-form-step">
                    <h3>Basic Information</h3>
                    <div className="anp-form-grid">
                      <div className="anp-input-group">
                        <label>Company Name</label>
                        <input
                          type="text"
                          placeholder="Enter company name"
                          value={formData.companyname}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyname: e.target.value,
                            })
                          }
                          onFocus={handleFocus}
                          required
                        />
                      </div>

                      <div className="anp-input-group">
                        <label>Job Title</label>
                        <input
                          type="text"
                          placeholder="Enter job title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          onFocus={handleFocus}
                          required
                        />
                      </div>

                      <div className="anp-input-group">
                        <label>Location</label>
                        <input
                          type="text"
                          placeholder="Job location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          onFocus={handleFocus}
                          required
                        />
                      </div>

                      <div className="anp-input-group">
                        <label>Salary</label>
                        <input
                          type="text"
                          list="salary-options"
                          placeholder="Salary range"
                          value={formData.salary}
                          onChange={(e) =>
                            setFormData({ ...formData, salary: e.target.value })
                          }
                        />
                        <datalist id="salary-options">
                          <option value="Company Standards" />
                          <option value="Not Disclosed" />
                          <option value="₹3-5 LPA" />
                          <option value="₹5-8 LPA" />
                          <option value="₹8-12 LPA" />
                          <option value="₹12+ LPA" />
                        </datalist>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Job Details */}
                {formStep === 2 && (
                  <div className="anp-form-step">
                    <h3>Job Details</h3>
                    <div className="anp-form-grid">
                      <div className="anp-input-group">
                        <label>Job Type</label>
                        <select
                          value={formData.job_type}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              job_type: e.target.value,
                            })
                          }
                        >
                          <option value="">Select job type</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Internship">Internship</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>

                      <div className="anp-input-group">
                        <label>Experience</label>
                        <select
                          value={formData.experience}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              experience: e.target.value,
                            })
                          }
                        >
                          <option value="">Select experience</option>
                          <option value="Fresher">Fresher</option>
                          <option value="0-1 years">0-1 years</option>
                          <option value="1-2 years">1-2 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5+ years">5+ years</option>
                        </select>
                      </div>

                      <div className="anp-input-group">
                        <label>Batch</label>
                        <input
                          type="text"
                          placeholder="Target batch"
                          value={formData.batch}
                          onChange={(e) =>
                            setFormData({ ...formData, batch: e.target.value })
                          }
                          onFocus={handleFocus}
                        />
                      </div>

                      <div className="anp-input-group anp-full-width">
                        <label>Apply Link</label>
                        <input
                          type="url"
                          placeholder="Application link"
                          value={formData.apply_link}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              apply_link: e.target.value,
                            })
                          }
                          onFocus={handleFocus}
                        />
                      </div>

                      <div className="anp-input-group anp-full-width">
                        <label>Company URL</label>
                        <input
                          type="url"
                          placeholder="Company website"
                          value={formData.url}
                          onChange={(e) =>
                            setFormData({ ...formData, url: e.target.value })
                          }
                          onFocus={handleFocus}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Content & Image */}
                {formStep === 3 && (
                  <div className="anp-form-step">
                    <h3>Content & Media</h3>
                    <div className="anp-content-section">
                      <div className="anp-editor-tabs">
                        <button
                          type="button"
                          className={`anp-tab ${
                            activeEditor === "description" ? "active" : ""
                          }`}
                          onClick={() => switchEditor("description")}
                        >
                          Description
                        </button>
                        <button
                          type="button"
                          className={`anp-tab ${
                            activeEditor === "advanced_data" ? "active" : ""
                          }`}
                          onClick={() => switchEditor("advanced_data")}
                        >
                          Advanced Data
                        </button>
                      </div>

                      <div className="anp-editor-container">
                        <RichTextEditor
                          key="rich-editor" // stable key prevents remount
                          value={formData[activeEditor]}
                          onChange={handleRichTextChange}
                        />
                      </div>

                      <div className="anp-image-upload">
                        <label className="anp-upload-label">Company Logo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          onFocus={handleFocus}
                          id="image-upload"
                          hidden
                        />
                        <label
                          htmlFor="image-upload"
                          className="anp-upload-area"
                        >
                          {imageLoading ? (
                            <div className="anp-upload-loading">
                              <FaSpinner className="anp-spinner-icon" />
                              <span>Uploading...</span>
                            </div>
                          ) : formData.image_link ? (
                            <div className="anp-image-preview">
                              <img
                                src={formData.image_link || "/placeholder.svg"}
                                alt="Company logo"
                              />
                              <div className="anp-image-overlay">
                                <MdCloudUpload />
                                <span>Change Image</span>
                              </div>
                            </div>
                          ) : (
                            <div className="anp-upload-placeholder">
                              <MdCloudUpload />
                              <span>Click to upload logo</span>
                              <small>PNG, JPG up to 10MB</small>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions – all buttons type="button" except final submit */}
              <div className="anp-form-actions">
                {formStep > 1 ? (
                  <button
                    type="button"
                    className="anp-btn anp-btn-secondary"
                    onClick={prevStep}
                  >
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}

                {formStep < 3 ? (
                  <button
                    type="button"
                    className="anp-btn anp-btn-primary"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button" // still type="button" – we call manually
                    className="anp-btn anp-btn-primary"
                    onClick={handleManualSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="anp-spinner-icon" />
                        {editJobId ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>{editJobId ? "Update Job" : "Create Job"}</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="anp-page-view">
            {!viewAllJobs && jobs.length === 0 && !loading ? (
              <div className="anp-welcome">
                <h2>Welcome to One Solutions workspace</h2>
                <p>
                  You don't have any jobs listed yet. Start by adding a new job.
                </p>
                <button
                  type="button"
                  className="anp-btn anp-btn-primary"
                  onClick={() => setIsFormVisible(true)}
                >
                  New Job
                </button>
              </div>
            ) : (
              !loading &&
              filteredJobs.length >= 0 && (
                <div className="anp-jobs-section">
                  <div className="anp-section-header">
                    <h2>
                      {viewAllJobs ? "All Jobs" : "My Jobs"}{" "}
                      <span className="anp-count">{filteredJobs.length}</span>
                    </h2>
                    <div className="anp-header-actions">
                      <button
                        type="button"
                        className="anp-btn anp-btn-secondary"
                        onClick={() => setViewAllJobs(!viewAllJobs)}
                      >
                        {viewAllJobs ? "Show My Jobs" : "Show All Jobs"}
                      </button>
                      <button
                        type="button"
                        className="anp-btn anp-btn-primary"
                        onClick={() => setIsFormVisible(true)}
                      >
                        New Job
                      </button>
                    </div>
                  </div>

                  <div className="anp-jobs-grid">
                    {paginatedJobs.map((job) => {
                      const descriptionContent = job.description || "";
                      return (
                        <div key={job.id} className="anp-job-card">
                          <div className="anp-card-header">
                            <div className="anp-company-info">
                              {job.image_link && (
                                <div className="anp-company-logo">
                                  <img
                                    src={job.image_link}
                                    alt={job.companyname}
                                  />
                                </div>
                              )}
                              <div className="anp-company-details">
                                <h3>{job.title}</h3>
                                <h4>{job.companyname}</h4>
                              </div>
                            </div>

                            {/* Inline actions – no three-dot menu */}
                            <div className="anp-card-actions-inline">
                              <button
                                type="button"
                                className="anp-icon-btn"
                                onClick={() => handleEdit(job)}
                                title="Edit Job"
                              >
                                <EditIcon fontSize="small" />
                              </button>
                              <button
                                type="button"
                                className="anp-icon-btn anp-danger-text"
                                onClick={() => handleDelete(job.id)}
                                title="Delete Job"
                              >
                                <DeleteIcon fontSize="small" />
                              </button>
                            </div>
                          </div>

                          <div className="anp-card-body">
                            <div className="anp-job-meta">
                              <div className="anp-meta-item">
                                <FaMapMarkerAlt />
                                <span>{job.location}</span>
                              </div>
                              <div className="anp-meta-item">
                                <FaMoneyBillWave />
                                <span>{job.salary}</span>
                              </div>
                              <div className="anp-meta-item">
                                <FaClock />
                                <span>{job.job_type}</span>
                              </div>
                              <div className="anp-meta-item">
                                <FaUsers />
                                <span>{job.experience}</span>
                              </div>
                            </div>

                            <div className="anp-job-description">
                              {expandedJobs[job.id] ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: descriptionContent,
                                  }}
                                />
                              ) : (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      descriptionContent.length > 120
                                        ? descriptionContent.substring(0, 120) +
                                          "..."
                                        : descriptionContent,
                                  }}
                                />
                              )}

                              {descriptionContent.length > 120 && (
                                <button
                                  type="button"
                                  className="anp-read-more"
                                  onClick={() => handleToggleReadMore(job.id)}
                                >
                                  {expandedJobs[job.id]
                                    ? "Show less"
                                    : "Read more"}
                                </button>
                              )}
                            </div>

                            <div className="anp-card-footer">
                              <div className="anp-job-tags">
                                {job.batch && (
                                  <span className="anp-tag">{job.batch}</span>
                                )}
                                {job.experience && (
                                  <span className="anp-tag">
                                    {job.experience}
                                  </span>
                                )}
                              </div>
                              <div className="anp-creator-info">
                                {job.creator_admin_image ? (
                                  <img
                                    src={job.creator_admin_image}
                                    alt={job.creator_name}
                                    className="anp-creator-avatar"
                                  />
                                ) : (
                                  <MdAccountCircle className="anp-creator-icon" />
                                )}
                                <span>{job.creator_name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="anp-pagination">
                      {[...Array(totalPages).keys()].map((pageNum) => (
                        <button
                          type="button"
                          key={pageNum}
                          className={`anp-page-btn ${
                            currentPage === pageNum + 1 ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(pageNum + 1)}
                        >
                          {pageNum + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;