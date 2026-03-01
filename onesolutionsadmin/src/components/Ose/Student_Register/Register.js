import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerBanner from "../../../assests/register_banner.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    studentType: "zorvixe_core",
    course_selection: "web_development",
    batchMonth: "",
    batchYear: new Date().getFullYear(),
    isCurrentBatch: false,
  });

  // Course options
  // In Register.js - Line around 20-25
// In Register.js - around line 20-25
const courseOptions = [
  { value: "web_development", label: "Web Development" },
  { value: "digital_marketing", label: "Digital Marketing" },
  { value: "java_programming", label: "Java Programming" }, // Make sure this is exactly "java_programming"
];

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Student type options
  const studentTypes = [
    { value: "zorvixe_core", label: "Zorvixe Core" },
    { value: "zorvixe_pro", label: "Zorvixe Pro" },
    { value: "zorvixe_elite", label: "Zorvixe Elite" },
  ];

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

    // Clear validation error for this field when user starts typing
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

    // Student ID validation
    if (!formData.studentId) {
      errors.studentId = "Student ID is required";
    } else if (formData.studentId.length < 3) {
      errors.studentId = "Student ID must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.studentId)) {
      errors.studentId =
        "Student ID can only contain letters, numbers, underscores and hyphens";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // First name validation
    if (!formData.firstName) {
      errors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      errors.firstName = "First name can only contain letters and spaces";
    }

    // Last name validation
    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      errors.lastName = "Last name can only contain letters and spaces";
    }

    // Phone validation (optional but if provided, must be valid)
    if (formData.phone && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    // Batch month validation
    if (!formData.batchMonth) {
      errors.batchMonth = "Batch month is required";
    }

    // Student type validation
    const validTypes = ["zorvixe_core", "zorvixe_pro", "zorvixe_elite"];
    if (!formData.studentType) {
      errors.studentType = "Student type is required";
    } else if (!validTypes.includes(formData.studentType)) {
      errors.studentType = "Please select a valid student type";
    }

    // Course selection validation
    const validCourses = ["web_development", "digital_marketing", "java_programming"]; // 🔥 UPDATE THIS
    if (!formData.course_selection) {
      errors.course_selection = "Course selection is required";
    } else if (!validCourses.includes(formData.course_selection)) {
      errors.course_selection = "Please select a valid course";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(validationErrors)[0];
      if (firstError) {
        const errorElement = document.querySelector(`[name="${firstError}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          errorElement.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        // Ensure all fields are properly appended
        const value = formData[key];
        if (value !== null && value !== undefined) {
          submitData.append(key, value.toString());
        }
      });

      // Append profile image if exists
      if (profileImage) {
        submitData.append("profileImage", profileImage);
      }

      // Log the data being sent (for debugging)
      console.log("📝 Registration Data:", {
        studentId: formData.studentId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        studentType: formData.studentType,
        course_selection: formData.course_selection,
        batchMonth: formData.batchMonth,
        batchYear: formData.batchYear,
        isCurrentBatch: formData.isCurrentBatch,
        hasProfileImage: !!profileImage,
      });

      // Direct API call to register endpoint
      const response = await fetch(
        "https://api.onesolutionsekam.in/api/auth/register",
        {
          method: "POST",
          body: submitData,
          // Don't set Content-Type header - browser will set it with boundary for FormData
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || responseData.error || "Registration failed"
        );
      }

      if (responseData.success) {
        const { student, token } = responseData.data;

        // Store token in localStorage
        localStorage.setItem("token", token);

        // Store user data in localStorage for AuthContext
        const userData = {
          id: student.id,
          studentId: student.studentId || student.student_id,
          email: student.email,
          firstName: student.firstName || student.first_name,
          lastName: student.lastName || student.last_name,
          phone: student.phone || "",
          profileImage: student.profileImage || student.profile_image,
          studentType:
            student.studentType || student.student_type || formData.studentType,
          course_selection:
            student.course_selection ||
            student.course_selection ||
            formData.course_selection,
          batchMonth:
            student.batchMonth || student.batch_month || formData.batchMonth,
          batchYear:
            student.batchYear || student.batch_year || formData.batchYear,
          isCurrentBatch:
            student.isCurrentBatch ||
            student.is_current_batch ||
            formData.isCurrentBatch,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        // Show success toast
        toast.success("🎉 Registration successful! Redirecting to login...", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        console.log("✅ Registration successful:", {
          email: userData.email,
          studentType: userData.studentType,
          course_selection: userData.course_selection,
        });

        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error(
          responseData.message || responseData.error || "Registration failed"
        );
      }
    } catch (err) {
      console.error("❌ Registration error:", err);

      // Show specific error message
      let errorMessage =
        err.message || "Registration failed. Please try again.";

      // Handle specific error cases
      if (
        errorMessage.includes("duplicate key") ||
        errorMessage.includes("already exists")
      ) {
        if (errorMessage.includes("email")) {
          errorMessage =
            "Email already registered. Please use a different email or login.";
        } else if (errorMessage.includes("student_id")) {
          errorMessage =
            "Student ID already exists. Please use a different ID.";
        } else {
          errorMessage = "This account already exists. Please try logging in.";
        }
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setProfileImagePreview("");
  };

  const handleBack = () => {
    navigate("/home");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getStudentTypeDescription = (type) => {
    switch (type) {
      case "zorvixe_core":
        return "Basic access with essential features";
      case "zorvixe_pro":
        return "Advanced features with priority support";
      case "zorvixe_elite":
        return "Full access with premium features";
      default:
        return "";
    }
  };

  const getStudentTypeColor = (type) => {
    switch (type) {
      case "zorvixe_core":
        return "#4a6bff";
      case "zorvixe_pro":
        return "#10b981";
      case "zorvixe_elite":
        return "#f59e0b";
      default:
        return "#4a6bff";
    }
  };

  const getCourseDescription = (course) => {
    switch (course) {
      case "web_development":
        return "Full stack web development with React, Node.js, and databases";
      case "digital_marketing":
        return "SEO, Social Media Marketing, Content Strategy, and Analytics";
      case "java_programming":
        return "Core Java, Spring Boot, Hibernate, and backend development";
      default:
        return "";
    }
  };

  const getCourseColor = (course) => {
    switch (course) {
      case "web_development":
        return "#0d9488";
      case "digital_marketing":
        return "#b45309";
      case "java_programming":
        return "#ea580c"; // Orange color for Java
      default:
        return "#0d9488";
    }
  };

  return (
    <div className="register-page">
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
        theme="light"
      />

      <div className="image-section-register">
        <button className="back-button" onClick={handleBack} type="button">
          ← Back
        </button>
        <img src={registerBanner} alt="Register Banner" />
      </div>

      <div className="form-section-register">
        <div className="card-register">
          <h2>Student Registration</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Profile Image Upload */}
            <div className="form-group">
              <div className="image-upload-container">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                  disabled={isSubmitting}
                />
                <label htmlFor="profileImage" className="file-input-label">
                  {profileImagePreview ? (
                    <div className="preview-with-remove">
                      <img src={profileImagePreview} alt="Profile preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={removeImage}
                        disabled={isSubmitting}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <svg
                        className="profile-icon with-badge"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="56"
                        height="56"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <circle cx="12" cy="8" r="3.2" fill="currentColor" />
                        <path
                          d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
                          fill="currentColor"
                        />
                        <circle cx="19" cy="5" r="3" fill="currentColor" />
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
              {validationErrors.profileImage && (
                <span className="error-text">
                  {validationErrors.profileImage}
                </span>
              )}
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

            <div className="form-group password-field">
              <label>Password *</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={validationErrors.password ? "error" : ""}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <span className="error-text">{validationErrors.password}</span>
              )}
              <span className="hint-text">
                Password must be at least 6 characters with uppercase, lowercase
                and number
              </span>
            </div>

            <div className="form-group">
              <label>Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={validationErrors.phone ? "error" : ""}
                placeholder="Enter your phone number"
                disabled={isSubmitting}
              />
              {validationErrors.phone && (
                <span className="error-text">{validationErrors.phone}</span>
              )}
            </div>

            {/* Course Selection */}
            <div className="form-group">
              <label>Select Course *</label>
              <div className="course-selector">
                {courseOptions.map((course) => (
                  <div
                    key={course.value}
                    className={`course-option ${
                      formData.course_selection === course.value
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => {
                      if (!isSubmitting) {
                        setFormData((prev) => ({
                          ...prev,
                          course_selection: course.value,
                        }));
                        if (validationErrors.course_selection) {
                          setValidationErrors((prev) => ({
                            ...prev,
                            course_selection: "",
                          }));
                        }
                      }
                    }}
                    style={{
                      borderColor:
                        formData.course_selection === course.value
                          ? getCourseColor(course.value)
                          : "#e0e0e0",
                    }}
                  >
                    <div className="course-radio">
                      <input
                        type="radio"
                        name="course_selection"
                        value={course.value}
                        checked={formData.course_selection === course.value}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        id={`course-${course.value}`}
                      />
                      <span
                        className="radio-custom"
                        style={{
                          borderColor:
                            formData.course_selection === course.value
                              ? getCourseColor(course.value)
                              : "#ccc",
                        }}
                      ></span>
                    </div>
                    <label
                      htmlFor={`course-${course.value}`}
                      className="course-label"
                    >
                      <span className="course-name">{course.label}</span>
                      <span className="course-description">
                        {getCourseDescription(course.value)}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
              {validationErrors.course_selection && (
                <span className="error-text">
                  {validationErrors.course_selection}
                </span>
              )}
            </div>

            {/* Student Type Selection */}
            <div className="form-group">
              <label>Student Type *</label>
              <div className="student-type-selector">
                {studentTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`student-type-option ${
                      formData.studentType === type.value ? "selected" : ""
                    }`}
                    onClick={() => {
                      if (!isSubmitting) {
                        setFormData((prev) => ({
                          ...prev,
                          studentType: type.value,
                        }));
                        if (validationErrors.studentType) {
                          setValidationErrors((prev) => ({
                            ...prev,
                            studentType: "",
                          }));
                        }
                      }
                    }}
                    style={{
                      borderColor:
                        formData.studentType === type.value
                          ? getStudentTypeColor(type.value)
                          : "#e0e0e0",
                    }}
                  >
                    <div className="type-radio">
                      <input
                        type="radio"
                        name="studentType"
                        value={type.value}
                        checked={formData.studentType === type.value}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        id={`type-${type.value}`}
                      />
                      <span
                        className="radio-custom"
                        style={{
                          borderColor:
                            formData.studentType === type.value
                              ? getStudentTypeColor(type.value)
                              : "#ccc",
                        }}
                      ></span>
                    </div>
                    <label
                      htmlFor={`type-${type.value}`}
                      className="type-label"
                    >
                      <span className="type-name">{type.label}</span>
                      <span className="type-description">
                        {getStudentTypeDescription(type.value)}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
              {validationErrors.studentType && (
                <span className="error-text">
                  {validationErrors.studentType}
                </span>
              )}
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
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;