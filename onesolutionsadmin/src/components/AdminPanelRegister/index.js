"use client";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  FaUser,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaCheck,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { assests } from "../../assests/assests";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    adminname: "",
    username: "",
    password: "",
    phone: "",
    admin_image_link: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "adminname":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "username":
        return value.length < 3 ? "Username must be at least 3 characters" : "";
      case "password":
        return value.length < 6 ? "Password must be at least 6 characters" : "";
      case "phone":
        return !/^\d{10,}$/.test(value)
          ? "Phone must be at least 10 digits"
          : "";
      default:
        return "";
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setImageLoading(true);
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        setFormData((prevData) => ({
          ...prevData,
          admin_image_link: imageUrl,
        }));
      }
      setImageLoading(false);
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

  const handleNextStep = () => {
    const errors = {};

    if (formStep === 1) {
      errors.adminname = validateField("adminname", formData.adminname);
      errors.phone = validateField("phone", formData.phone);
    } else if (formStep === 2) {
      errors.username = validateField("username", formData.username);
      errors.password = validateField("password", formData.password);
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      setValidationErrors(errors);
      return;
    }

    setFormStep(formStep + 1);
  };

  const handlePrevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.admin_image_link;
      if (imageFile && !imageUrl) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const response = await axios.post(`https://ose.onesolutionsekam.in/api/admin/register`, {
        ...formData,
        admin_image_link: imageUrl,
      });

      if (response.data.status === "approved") {
        setPopupMessage("Welcome! Registration approved successfully.");
      } else {
        setPopupMessage(
          "Registration submitted for approval. You'll be notified once approved."
        );
      }
      setShowPopup(true);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container-reg">
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
        theme="dark"
        toastClassName="anp-toast"
        bodyClassName="anp-toast-body"
      />

      {/* Animated Background */}
      <div className="background-elements-reg">
        <div className="floating-shape-reg shape-1-reg"></div>
        <div className="floating-shape-reg shape-2-reg"></div>
        <div className="floating-shape-reg shape-3-reg"></div>
        <div className="floating-shape-reg shape-4-reg"></div>
        <div className="floating-shape-reg shape-5-reg"></div>
        <div className="floating-shape-reg shape-6-reg"></div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup-overlay-reg">
          <div className="popup-content-reg">
            <button className="popup-close-reg" onClick={handleClosePopup}>
              <FaTimes />
            </button>
            <div className="popup-icon-reg">
              <FaCheck />
            </div>
            <div className="stars-animation-reg">
              <FaStar className="star-reg star-1-reg" />
              <FaStar className="star-reg star-2-reg" />
              <FaStar className="star-reg star-3-reg" />
            </div>
            <h3>Welcome, {formData.adminname}!</h3>
            <p className="popup-message-reg">{popupMessage}</p>
            <button className="popup-button-reg" onClick={handleClosePopup}>
              Continue to Login
            </button>
          </div>
        </div>
      )}

      <div className="register-content-reg">
        {/* Left Side - Branding */}
        <div className="branding-section-reg">
          <div className="brand-content-reg">
            <div className="brand-logo-reg">
              <img
                src={assests.one_solutions || "/placeholder.svg"}
                alt="One Solutions"
                className="logo-image-reg"
              />
            </div>

            {assests.signup_image && (
              <div className="illustration-container-reg">
                <img
                  src={assests.signup_image || "/placeholder.svg"}
                  alt="Registration"
                  className="illustration-image-reg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="form-section-reg">
          <div className="form-container-reg">
            {/* Progress Indicator */}
            <div className="progress-indicator-reg">
              <div
                className={`progress-step-reg ${
                  formStep >= 1 ? "active-reg" : ""
                }`}
              >
                <div className="step-number-reg">1</div>
                <span>Personal</span>
              </div>
              <div className="progress-line-reg"></div>
              <div
                className={`progress-step-reg ${
                  formStep >= 2 ? "active-reg" : ""
                }`}
              >
                <div className="step-number-reg">2</div>
                <span>Account</span>
              </div>
              <div className="progress-line-reg"></div>
              <div
                className={`progress-step-reg ${
                  formStep >= 3 ? "active-reg" : ""
                }`}
              >
                <div className="step-number-reg">3</div>
                <span>Photo</span>
              </div>
            </div>

            <div className="form-header-reg">
              <p className="form-subtitle-reg">Step {formStep} of 3</p>
            </div>

            <form onSubmit={handleSubmit} className="registration-form-reg">
              {/* Step 1: Personal Information */}
              {formStep === 1 && (
                <div className="form-step-reg step-1-reg">
                  <div className="input-group-reg">
                    <label htmlFor="adminname" className="input-label-reg">
                      Full Name
                    </label>
                    <div className="input-wrapper-reg">
                      <FaUser className="input-icon-reg" />
                      <input
                        id="adminname"
                        type="text"
                        name="adminname"
                        placeholder="Enter your full name"
                        value={formData.adminname}
                        onChange={handleChange}
                        className={`form-input-reg ${
                          validationErrors.adminname ? "error-reg" : ""
                        }`}
                        required
                      />
                    </div>
                    {validationErrors.adminname && (
                      <span className="error-message-reg">
                        {validationErrors.adminname}
                      </span>
                    )}
                  </div>

                  <div className="input-group-reg">
                    <label htmlFor="phone" className="input-label-reg">
                      Phone Number
                    </label>
                    <div className="input-wrapper-reg">
                      <FaPhone className="input-icon-reg" />
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-input-reg ${
                          validationErrors.phone ? "error-reg" : ""
                        }`}
                        required
                      />
                    </div>
                    {validationErrors.phone && (
                      <span className="error-message-reg">
                        {validationErrors.phone}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="next-button-reg"
                    onClick={handleNextStep}
                  >
                    <span>Next Step</span>
                    <div className="button-glow-reg"></div>
                  </button>
                </div>
              )}

              {/* Step 2: Account Details */}
              {formStep === 2 && (
                <div className="form-step-reg step-2-reg">
                  <div className="input-group-reg">
                    <label htmlFor="username" className="input-label-reg">
                      Username
                    </label>
                    <div className="input-wrapper-reg">
                      <FaUser className="input-icon-reg" />
                      <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`form-input-reg ${
                          validationErrors.username ? "error-reg" : ""
                        }`}
                        required
                      />
                    </div>
                    {validationErrors.username && (
                      <span className="error-message-reg">
                        {validationErrors.username}
                      </span>
                    )}
                  </div>

                  <div className="input-group-reg">
                    <label htmlFor="password" className="input-label-reg">
                      Password
                    </label>
                    <div className="input-wrapper-reg">
                      <FaLock className="input-icon-reg" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input-reg ${
                          validationErrors.password ? "error-reg" : ""
                        }`}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle-reg"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {validationErrors.password && (
                      <span className="error-message-reg">
                        {validationErrors.password}
                      </span>
                    )}
                  </div>

                  <div className="step-buttons-reg">
                    <button
                      type="button"
                      className="prev-button-reg"
                      onClick={handlePrevStep}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="next-button-reg"
                      onClick={handleNextStep}
                    >
                      <span>Next Step</span>
                      <div className="button-glow-reg"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Profile Photo */}
              {formStep === 3 && (
                <div className="form-step-reg step-3-reg">
                  <div className="photo-upload-section-reg">
                    <h3 className="upload-title-reg">Profile Photo</h3>
                    <p className="upload-subtitle-reg">
                      Upload your profile picture
                    </p>

                    <div className="photo-upload-container-reg">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="photo-upload"
                        className="photo-input-reg"
                        hidden
                      />

                      <label
                        htmlFor="photo-upload"
                        className="photo-upload-area-reg"
                      >
                        {imageLoading ? (
                          <div className="upload-loading-reg">
                            <div className="loading-spinner-reg"></div>
                            <span>Uploading...</span>
                          </div>
                        ) : formData.admin_image_link ? (
                          <div className="uploaded-photo-reg">
                            <img
                              src={
                                formData.admin_image_link || "/placeholder.svg"
                              }
                              alt="Profile"
                              className="profile-preview-reg"
                            />
                            <div className="photo-overlay-reg">
                              <FaUpload />
                              <span>Change Photo</span>
                            </div>
                          </div>
                        ) : (
                          <div className="upload-placeholder-reg">
                            <FaUpload className="upload-icon-reg" />
                            <span className="upload-text-reg">
                              Click to upload photo
                            </span>
                            <span className="upload-hint-reg">
                              PNG, JPG up to 10MB
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="step-buttons-reg">
                    <button
                      type="button"
                      className="prev-button-reg"
                      onClick={handlePrevStep}
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="submit-button-reg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="button-spinner-reg"></div>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <div className="button-glow-reg"></div>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
