"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assests } from "../../assests/assests";
import { ToastContainer, toast } from "react-toastify";
import "./resetpassword.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`https://ose.onesolutionsekam.in/api/admin/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, newPassword }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      toast.success("Password reset successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-page-res">
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
        className="toast-container-res"
      />

      {/* Animated Background */}
      <div className="background-animation-res">
        <div className="wave-res wave1-res"></div>
        <div className="wave-res wave2-res"></div>
        <div className="wave-res wave3-res"></div>
      </div>

      {/* Main Content */}
      <div className="main-content-res">
        {/* Left Panel */}
        <div className="left-panel-res">
          <div className="brand-section-res">
            <img
              src={assests.one_solutions || "/placeholder.svg"}
              className="brand-logo-res"
              alt="One Solutions"
            />
            <p className="brand-subtitle-res">Secure Password Management</p>
          </div>

          <div className="illustration-section-res">
            <div className="image-frame-res">
              <img
                src={assests.reset_image || "/placeholder.svg"}
                className="main-image-res"
                alt="Reset Password"
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="right-panel-res">
          <div className="form-wrapper-res">
            <div className="form-header-res">
              <h2 className="form-title-res">Reset Your Password</h2>
              <p className="form-description-res">
                Enter your username and create a new secure password for your
                account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="reset-form-res">
              {/* Username Field */}
              <div className="field-group-res">
                <label className="field-label-res">Username</label>
                <div className="input-container-res">
                  <div className="input-icon-res">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form-input-res"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="field-group-res">
                <label className="field-label-res">New Password</label>
                <div className="input-container-res">
                  <div className="input-icon-res">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="12" cy="16" r="1"></circle>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="form-input-res"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className="password-toggle-res"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="password-strength-res">
                  <div className="strength-bar-res">
                    <div
                      className={`strength-fill-res ${
                        newPassword.length > 8
                          ? "strong-res"
                          : newPassword.length > 5
                          ? "medium-res"
                          : "weak-res"
                      }`}
                    ></div>
                  </div>
                  <span className="strength-text-res">
                    {newPassword.length > 8
                      ? "Strong"
                      : newPassword.length > 5
                      ? "Medium"
                      : "Weak"}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-btn-res ${isLoading ? "loading-res" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner-res"></div>
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12,5 19,12 12,19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="form-footer-res">
              <button
                type="button"
                className="back-link-res"
                onClick={() => navigate("/login")}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12,19 5,12 12,5"></polyline>
                </svg>
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
