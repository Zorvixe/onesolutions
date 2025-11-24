import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerBanner from "../../assests/register_banner.png";

import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    batchMonth: "",
    batchYear: new Date().getFullYear(),
    isCurrentBatch: false,
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  // Batch month options
  const batchMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Batch year options (last 5 years and next 2 years)
  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: 8 }, (_, i) => currentYear - 5 + i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setValidationErrors((prev) => ({
          ...prev,
          profileImage: "Please select an image file",
        }));
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors((prev) => ({
          ...prev,
          profileImage: "Image size should be less than 5MB",
        }));
        return;
      }

      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));

      if (validationErrors.profileImage) {
        setValidationErrors((prev) => ({ ...prev, profileImage: "" }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.studentId) errors.studentId = "Student ID is required";
    else if (formData.studentId.length < 3)
      errors.studentId = "Student ID must be at least 3 characters";

    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";

    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (!formData.firstName) errors.firstName = "First name is required";
    else if (formData.firstName.length < 2)
      errors.firstName = "First name must be at least 2 characters";

    if (!formData.lastName) errors.lastName = "Last name is required";
    else if (formData.lastName.length < 2)
      errors.lastName = "Last name must be at least 2 characters";

    if (!formData.batchMonth) errors.batchMonth = "Batch month is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      if (profileImage) {
        submitData.append("profileImage", profileImage);
      }

      // Direct API call to register endpoint
      const response = await fetch(
        "https://api.onesolutionsekam.in/api/auth/register",
        {
          method: "POST",
          body: submitData,
          // Note: Don't set Content-Type header for FormData, let browser set it with boundary
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      }

      if (responseData.success) {
        const { student, token } = responseData.data;

        // Store token in localStorage
        localStorage.setItem("token", token);

        // Redirect to home page
        navigate("/home");
      } else {
        throw new Error(responseData.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setApiError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setProfileImagePreview("");
  };

  return (
    <div className="register-page">
      <div className="image-section-register">
        <img src={registerBanner} alt="Register Banner" />
      </div>

      <div className="form-section-register">
        <div className="card-register">
          <h2>Student Registration</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Profile Image Upload */}
            <div className="form-group">
              {/* <label>Profile Image</label> */}
              <div className="image-upload-container">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="profileImage" className="file-input-label">
                  {profileImagePreview ? (
                    <div className="preview-with-remove">
                      <img src={profileImagePreview} alt="Profile preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={removeImage}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      {/* Profile icon with small plus/upload badge */}
                      <svg
                        className="profile-icon with-badge"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="56"
                        height="56"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <circle cx="12" cy="8" r="3.2" />
                        <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
                        <circle cx="19" cy="5" r="3" />
                        <path
                          d="M19 4v2M18 5h2"
                          stroke="#fff"
                          strokeWidth="0.9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Student ID *</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className={validationErrors.studentId ? "error" : ""}
                placeholder="Enter your student ID"
                disabled={isSubmitting}
              />
              {validationErrors.studentId && (
                <span className="error-text">{validationErrors.studentId}</span>
              )}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={validationErrors.firstName ? "error" : ""}
                  placeholder="Enter your first name"
                  disabled={isSubmitting}
                />
                {validationErrors.firstName && (
                  <span className="error-text">
                    {validationErrors.firstName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={validationErrors.lastName ? "error" : ""}
                  placeholder="Enter your last name"
                  disabled={isSubmitting}
                />
                {validationErrors.lastName && (
                  <span className="error-text">
                    {validationErrors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={validationErrors.email ? "error" : ""}
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
              {validationErrors.email && (
                <span className="error-text">{validationErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={validationErrors.password ? "error" : ""}
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
              {validationErrors.password && (
                <span className="error-text">{validationErrors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                disabled={isSubmitting}
              />
            </div>

            {/* Batch Information */}
            <div className="form-row">
              <div className="form-group">
                <label>Batch Month *</label>
                <select
                  name="batchMonth"
                  value={formData.batchMonth}
                  onChange={handleChange}
                  className={validationErrors.batchMonth ? "error" : ""}
                  disabled={isSubmitting}
                >
                  <option value="">Select Month</option>
                  {batchMonths.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                {validationErrors.batchMonth && (
                  <span className="error-text">
                    {validationErrors.batchMonth}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Batch Year</label>
                <select
                  name="batchYear"
                  value={formData.batchYear}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  {batchYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isCurrentBatch"
                  checked={formData.isCurrentBatch}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className="checkmark"></span>
                This is my current batch
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
