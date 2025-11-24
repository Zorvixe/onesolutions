"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = password
  const [otpTimer, setOtpTimer] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    forgotPasswordRequestOtp,
    forgotPasswordVerifyOtpReset,
    error,
    clearError,
  } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    clearError();
    setSuccessMessage("");

    try {
      const response = await forgotPasswordRequestOtp(email.trim());
      if (response?.success) {
        setSuccessMessage("OTP sent to your email");
        setStep(2);
        setOtpTimer(30);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!otp.trim()) {
      errors.otp = "OTP is required";
    } else if (otp.length !== 6) {
      errors.otp = "OTP must be 6 digits";
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStep(3);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!newPassword) {
      errors.newPassword = "Password is required";
    } else if (!validatePassword(newPassword)) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    clearError();
    setSuccessMessage("");

    try {
      const response = await forgotPasswordVerifyOtpReset(
        email.trim(),
        otp.trim(),
        newPassword
      );
      if (response?.success) {
        setSuccessMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0) return;

    setIsSubmitting(true);
    clearError();

    try {
      const response = await forgotPasswordRequestOtp(email.trim());
      if (response?.success) {
        setSuccessMessage("OTP resent to your email");
        setOtpTimer(30);
        setOtp("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container-login">
      <div className="image-section-login">
        <img
          src="/assets/img/login_img.png"
          alt="Forgot Password Illustration"
          loading="lazy"
        />
      </div>

      <div className="form-section-login">
        <div className="card-login">
          <h2 className="title-login">Reset Your Password</h2>
          <p className="para-login">
            Enter your email to receive an OTP and reset your password
          </p>

          {error && (
            <div className="alert-login alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          {successMessage && (
            <div className="alert-login alert-success">
              <span>✓</span> {successMessage}
            </div>
          )}

          {/* STEP 1 — Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="form-login">
              <div className="form-group-login">
                <label className="label-login" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationErrors.email) setValidationErrors({});
                  }}
                  className={`input-login ${
                    validationErrors.email ? "error-login" : ""
                  }`}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  autoComplete="email"
                  required
                />
                {validationErrors.email && (
                  <span className="error-text-login">
                    {validationErrors.email}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="button-login"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending OTP..." : "Send OTP"}
              </button>

              <div className="link-login">
                Remember your password? <Link to="/">Login here</Link>
              </div>
            </form>
          )}

          {/* STEP 2 — OTP */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="form-login">
              <p className="otp-info-login">
                Enter the 6-digit OTP sent to <b>{email}</b>
              </p>

              <div className="form-group-login">
                <label className="label-login" htmlFor="otp">
                  One-Time Password
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    setOtp(numericValue);
                  }}
                  className={`input-login otp-input-login ${
                    validationErrors.otp ? "error-login" : ""
                  }`}
                  placeholder="000000"
                  disabled={isSubmitting}
                  inputMode="numeric"
                  required
                />
                {validationErrors.otp && (
                  <span className="error-text-login">
                    {validationErrors.otp}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="button-login"
                disabled={isSubmitting || !otp.trim() || otp.length !== 6}
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>

              <p className="resend-otp-text">
                Didn't receive OTP?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isSubmitting || otpTimer > 0}
                  className="resend-btn-login"
                >
                  {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
                </button>
              </p>
            </form>
          )}

          {/* STEP 3 — New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="form-login">
              <p className="otp-info-login">Enter your new password</p>

              <div className="form-group-login">
                <label className="label-login" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (validationErrors.newPassword) setValidationErrors({});
                  }}
                  className={`input-login ${
                    validationErrors.newPassword ? "error-login" : ""
                  }`}
                  placeholder="Enter new password"
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  required
                />
                {validationErrors.newPassword && (
                  <span className="error-text-login">
                    {validationErrors.newPassword}
                  </span>
                )}
              </div>

              <div className="form-group-login">
                <label className="label-login" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (validationErrors.confirmPassword)
                      setValidationErrors({});
                  }}
                  className={`input-login ${
                    validationErrors.confirmPassword ? "error-login" : ""
                  }`}
                  placeholder="Confirm your password"
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  required
                />
                {validationErrors.confirmPassword && (
                  <span className="error-text-login">
                    {validationErrors.confirmPassword}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="button-login"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>

              <div className="link-login">
                <button
                  type="button"
                  onClick={() => {
                    setStep(2);
                    setNewPassword("");
                    setConfirmPassword("");
                    setValidationErrors({});
                  }}
                  className="back-btn-login"
                  disabled={isSubmitting}
                >
                  ← Back to OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
