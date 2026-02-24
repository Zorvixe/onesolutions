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
    courseSelection: "web_development",
    batchMonth: "",
    batchYear: new Date().getFullYear(),
    isCurrentBatch: false,
  });

  // Course options with enhanced details
  const courseOptions = [
    {
      value: "web_development",
      label: "Web Development",
      icon: "💻",
      description:
        "Full-stack development with React, Node.js, and modern frameworks",
      color: "#2563eb",
    },
    {
      value: "digital_marketing",
      label: "Digital Marketing",
      icon: "📱",
      description: "SEO, social media, content strategy, and analytics",
      color: "#7c3aed",
    },
    {
      value: "data_science",
      label: "Data Science",
      icon: "📊",
      description:
        "Machine learning, Python, data visualization, and analytics",
      color: "#059669",
    },
  ];

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  // Student type options with enhanced details
  const studentTypes = [
    {
      value: "zorvixe_core",
      label: "Zorvixe Core",
      icon: "🌱",
      description: "Essential features for beginners",
      price: "Free",
      features: [
        "Basic courses",
        "Community access",
        "Certificate of completion",
      ],
      color: "#2563eb",
    },
    {
      value: "zorvixe_pro",
      label: "Zorvixe Pro",
      icon: "⚡",
      description: "Advanced features for professionals",
      price: "$49/month",
      features: [
        "All Core features",
        "Priority support",
        "Project reviews",
        "Career guidance",
      ],
      color: "#7c3aed",
    },
    {
      value: "zorvixe_elite",
      label: "Zorvixe Elite",
      icon: "👑",
      description: "Premium access with mentorship",
      price: "$99/month",
      features: [
        "All Pro features",
        "1-on-1 mentorship",
        "Job placement assistance",
        "Exclusive workshops",
      ],
      color: "#b45309",
    },
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

  // Batch year options
  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: 8 }, (_, i) => currentYear - 5 + i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Password strength calculation
    if (name === "password") {
      calculatePasswordStrength(value);
    }

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;
    if (password.match(/[$@#&!]+/)) strength += 25;
    setPasswordStrength(Math.min(strength, 100));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "#ef4444";
    if (passwordStrength < 50) return "#f59e0b";
    if (passwordStrength < 75) return "#3b82f6";
    return "#10b981";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Very Weak";
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Medium";
    if (passwordStrength < 100) return "Strong";
    return "Very Strong";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setValidationErrors((prev) => ({
          ...prev,
          profileImage: "Please select an image file",
        }));
        return;
      }

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

    if (!formData.studentId) {
      errors.studentId = "Student ID is required";
    } else if (formData.studentId.length < 3) {
      errors.studentId = "Student ID must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.studentId)) {
      errors.studentId =
        "Student ID can only contain letters, numbers, underscores and hyphens";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (passwordStrength < 50) {
      errors.password = "Password is too weak. Please make it stronger.";
    }

    if (!formData.firstName) {
      errors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    if (formData.phone && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.batchMonth) {
      errors.batchMonth = "Batch month is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
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
      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (value !== null && value !== undefined) {
          submitData.append(key, value.toString());
        }
      });

      if (profileImage) {
        submitData.append("profileImage", profileImage);
      }

      const response = await fetch(
        "https://api.onesolutionsekam.in/api/auth/register",
        {
          method: "POST",
          body: submitData,
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

        localStorage.setItem("token", token);

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
          courseSelection:
            student.courseSelection ||
            student.course_selection ||
            formData.courseSelection,
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

        toast.success("🎉 Registration successful! Redirecting to login...", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "reg-toast-success",
        });

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

      let errorMessage =
        err.message || "Registration failed. Please try again.";

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
        className: "reg-toast-error",
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

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast.warning("Please fill in all required fields", {
          className: "reg-toast-warning",
        });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="reg-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Left Side - Banner */}
      <div className="reg-banner">
        <button className="reg-back-btn" onClick={handleBack} type="button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="reg-banner-content">
          <div className="reg-banner-image-wrapper">
            <img
              src={registerBanner}
              alt="Registration Banner"
              className="reg-banner-image"
            />
            <div className="reg-banner-overlay"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="reg-form-section">
        <div className="reg-form-card">
          <div className="reg-form-header">
            <h2>Create Account</h2>
            <p>Fill in your details to get started</p>
          </div>

          {/* Progress Steps */}
          <div className="reg-progress-steps">
            <div
              className={`reg-step ${
                currentStep >= 1 ? "reg-step-active" : ""
              }`}
            >
              <div className="reg-step-number">1</div>
              <span className="reg-step-label">Personal</span>
            </div>
            <div
              className={`reg-step-line ${
                currentStep >= 2 ? "reg-step-line-active" : ""
              }`}
            ></div>
            <div
              className={`reg-step ${
                currentStep >= 2 ? "reg-step-active" : ""
              }`}
            >
              <div className="reg-step-number">2</div>
              <span className="reg-step-label">Education</span>
            </div>
            <div
              className={`reg-step-line ${
                currentStep >= 3 ? "reg-step-line-active" : ""
              }`}
            ></div>
            <div
              className={`reg-step ${
                currentStep >= 3 ? "reg-step-active" : ""
              }`}
            >
              <div className="reg-step-number">3</div>
              <span className="reg-step-label">Plan</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="reg-form"
          >
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="reg-step-content">
                {/* Profile Image Upload */}
                <div className="reg-form-group reg-profile-upload">
                  <div className="reg-image-upload-container">
                    <input
                      type="file"
                      id="reg-profileImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="reg-file-input"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="reg-profileImage"
                      className="reg-file-input-label"
                    >
                      {profileImagePreview ? (
                        <div className="reg-preview-wrapper">
                          <img
                            src={profileImagePreview}
                            alt="Profile preview"
                            className="reg-preview-image"
                          />
                          <button
                            type="button"
                            className="reg-remove-image"
                            onClick={removeImage}
                            disabled={isSubmitting}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="reg-upload-placeholder">
                          <svg
                            className="reg-upload-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                      )}
                    </label>
                  </div>
                  {validationErrors.profileImage && (
                    <span className="reg-error-text">
                      {validationErrors.profileImage}
                    </span>
                  )}
                </div>

                <div className="reg-form-row">
                  <div className="reg-form-group">
                    <label className="reg-label">
                      First Name <span className="reg-required">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`reg-input ${
                        validationErrors.firstName ? "reg-input-error" : ""
                      }`}
                      placeholder="Enter first name"
                      disabled={isSubmitting}
                    />
                    {validationErrors.firstName && (
                      <span className="reg-error-text">
                        {validationErrors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="reg-form-group">
                    <label className="reg-label">
                      Last Name <span className="reg-required">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`reg-input ${
                        validationErrors.lastName ? "reg-input-error" : ""
                      }`}
                      placeholder="Enter last name"
                      disabled={isSubmitting}
                    />
                    {validationErrors.lastName && (
                      <span className="reg-error-text">
                        {validationErrors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="reg-form-group">
                  <label className="reg-label">
                    Email Address <span className="reg-required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`reg-input ${
                      validationErrors.email ? "reg-input-error" : ""
                    }`}
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                  />
                  {validationErrors.email && (
                    <span className="reg-error-text">
                      {validationErrors.email}
                    </span>
                  )}
                </div>

                <div className="reg-form-group">
                  <label className="reg-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`reg-input ${
                      validationErrors.phone ? "reg-input-error" : ""
                    }`}
                    placeholder="+1 (555) 000-0000"
                    disabled={isSubmitting}
                  />
                  {validationErrors.phone && (
                    <span className="reg-error-text">
                      {validationErrors.phone}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Education Information */}
            {currentStep === 2 && (
              <div className="reg-step-content">
                <div className="reg-form-group">
                  <label className="reg-label">
                    Student ID <span className="reg-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className={`reg-input ${
                      validationErrors.studentId ? "reg-input-error" : ""
                    }`}
                    placeholder="Enter your student ID"
                    disabled={isSubmitting}
                  />
                  {validationErrors.studentId && (
                    <span className="reg-error-text">
                      {validationErrors.studentId}
                    </span>
                  )}
                </div>

                <div className="reg-form-group">
                  <label className="reg-label">
                    Password <span className="reg-required">*</span>
                  </label>
                  <div className="reg-password-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`reg-input ${
                        validationErrors.password ? "reg-input-error" : ""
                      }`}
                      placeholder="Create a strong password"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="reg-password-toggle"
                      onClick={togglePasswordVisibility}
                      disabled={isSubmitting}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="reg-password-strength">
                      <div className="reg-strength-bar">
                        <div
                          className="reg-strength-bar-fill"
                          style={{
                            width: `${passwordStrength}%`,
                            backgroundColor: getPasswordStrengthColor(),
                          }}
                        ></div>
                      </div>
                      <span
                        className="reg-strength-text"
                        style={{ color: getPasswordStrengthColor() }}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  )}

                  {validationErrors.password && (
                    <span className="reg-error-text">
                      {validationErrors.password}
                    </span>
                  )}
                  <span className="reg-hint-text">
                    Use at least 8 characters with uppercase, lowercase, and
                    numbers
                  </span>
                </div>

                <div className="reg-form-row">
                  <div className="reg-form-group">
                    <label className="reg-label">
                      Batch Month <span className="reg-required">*</span>
                    </label>
                    <select
                      name="batchMonth"
                      value={formData.batchMonth}
                      onChange={handleChange}
                      className={`reg-select ${
                        validationErrors.batchMonth ? "reg-input-error" : ""
                      }`}
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
                      <span className="reg-error-text">
                        {validationErrors.batchMonth}
                      </span>
                    )}
                  </div>

                  <div className="reg-form-group">
                    <label className="reg-label">Batch Year</label>
                    <select
                      name="batchYear"
                      value={formData.batchYear}
                      onChange={handleChange}
                      className="reg-select"
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

                <div className="reg-checkbox-group">
                  <label className="reg-checkbox-label">
                    <input
                      type="checkbox"
                      name="isCurrentBatch"
                      checked={formData.isCurrentBatch}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span className="reg-checkbox-custom"></span>
                    <span className="reg-checkbox-text">
                      This is my current batch
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Course & Plan Selection */}
            {currentStep === 3 && (
              <div className="reg-step-content">
                {/* Course Selection */}
                <div className="reg-form-group">
                  <label className="reg-label">
                    Select Course <span className="reg-required">*</span>
                  </label>
                  <div className="reg-course-grid">
                    {courseOptions.map((course) => (
                      <div
                        key={course.value}
                        className={`reg-course-card ${
                          formData.courseSelection === course.value
                            ? "reg-course-selected"
                            : ""
                        }`}
                        onClick={() => {
                          if (!isSubmitting) {
                            setFormData((prev) => ({
                              ...prev,
                              courseSelection: course.value,
                            }));
                          }
                        }}
                      >
                        <div
                          className="reg-course-icon"
                          style={{ backgroundColor: `${course.color}15` }}
                        >
                          <span style={{ color: course.color }}>
                            {course.icon}
                          </span>
                        </div>
                        <h4 className="reg-course-title">{course.label}</h4>
                        <p className="reg-course-description">
                          {course.description}
                        </p>
                        <div className="reg-course-radio">
                          <input
                            type="radio"
                            name="courseSelection"
                            value={course.value}
                            checked={formData.courseSelection === course.value}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          <span
                            className="reg-radio-custom"
                            style={{ borderColor: course.color }}
                          ></span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {validationErrors.courseSelection && (
                    <span className="reg-error-text">
                      {validationErrors.courseSelection}
                    </span>
                  )}
                </div>

                {/* Student Type Selection */}
                <div className="reg-form-group">
                  <label className="reg-label">
                    Choose Your Plan <span className="reg-required">*</span>
                  </label>
                  <div className="reg-plan-grid">
                    {studentTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`reg-plan-card ${
                          formData.studentType === type.value
                            ? "reg-plan-selected"
                            : ""
                        }`}
                        onClick={() => {
                          if (!isSubmitting) {
                            setFormData((prev) => ({
                              ...prev,
                              studentType: type.value,
                            }));
                          }
                        }}
                        style={{
                          borderColor:
                            formData.studentType === type.value
                              ? type.color
                              : "#e5e7eb",
                        }}
                      >
                        <div
                          className="reg-plan-header"
                          style={{ backgroundColor: `${type.color}10` }}
                        >
                          <span
                            className="reg-plan-icon"
                            style={{ color: type.color }}
                          >
                            {type.icon}
                          </span>
                          <h4
                            className="reg-plan-name"
                            style={{ color: type.color }}
                          >
                            {type.label}
                          </h4>
                          <span className="reg-plan-price">{type.price}</span>
                        </div>
                        <div className="reg-plan-body">
                          <p className="reg-plan-description">
                            {type.description}
                          </p>
                          <ul className="reg-plan-features">
                            {type.features.map((feature, index) => (
                              <li key={index} className="reg-plan-feature">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke={type.color}
                                  strokeWidth="2"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="reg-plan-radio">
                          <input
                            type="radio"
                            name="studentType"
                            value={type.value}
                            checked={formData.studentType === type.value}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          <span
                            className="reg-radio-custom"
                            style={{ borderColor: type.color }}
                          ></span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {validationErrors.studentType && (
                    <span className="reg-error-text">
                      {validationErrors.studentType}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Form Navigation Buttons */}
            <div className="reg-form-actions">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="reg-btn reg-btn-secondary"
                  disabled={isSubmitting}
                >
                  ← Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="reg-btn reg-btn-primary"
                  disabled={isSubmitting}
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  className="reg-btn reg-btn-primary reg-btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="reg-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
