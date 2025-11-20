"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1 = credentials, 2 = otp
  const [otpTimer, setOtpTimer] = useState(0); // Timer for resend OTP
  const [successMessage, setSuccessMessage] = useState(""); // Success feedback

  const {
    loginOtpRequest,
    loginOtpVerify,
    error,
    clearError,
    isAuthenticated,
    otpSent,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (step === 1) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (validationErrors[name]) {
        setValidationErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    } else if (step === 2 && name === "otp") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setOtp(numericValue);
    }

    if (error) clearError();
    if (successMessage) setSuccessMessage("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCredentialSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    clearError();
    setSuccessMessage("");

    try {
      console.log("[LOGIN] Submitting credentials for:", formData.email);
      const response = await loginOtpRequest(
        formData.email.trim(),
        formData.password
      );

      if (response?.success) {
        setSuccessMessage("OTP sent to your email. Please check your inbox.");
        setStep(2);
        setOtpTimer(30); // Start 30-second timer
        setOtp(""); // Clear OTP field
      }
    } catch (err) {
      console.error("[LOGIN] Credential submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setValidationErrors({ otp: "OTP is required" });
      return;
    }

    if (otp.length !== 6) {
      setValidationErrors({ otp: "OTP must be 6 digits" });
      return;
    }

    setIsSubmitting(true);
    clearError();
    setSuccessMessage("");

    try {
      console.log("[LOGIN] Verifying OTP for:", formData.email);
      const response = await loginOtpVerify(formData.email.trim(), otp.trim());

      if (response?.success) {
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (err) {
      console.error("[LOGIN] OTP verification error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0) {
      return; // Prevent resend if timer is active
    }

    setIsSubmitting(true);
    clearError();
    setSuccessMessage("");

    try {
      console.log("[LOGIN] Resending OTP for:", formData.email);
      const response = await loginOtpRequest(
        formData.email.trim(),
        formData.password
      );

      if (response?.success) {
        setSuccessMessage("OTP resent to your email");
        setOtpTimer(30); // Reset timer
        setOtp(""); // Clear OTP field
      }
    } catch (err) {
      console.error("[LOGIN] Resend OTP error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    setStep(1);
    setOtp("");
    setOtpTimer(0);
    setValidationErrors({});
    clearError();
    setSuccessMessage("");
  };

  return (
    <div className="login-container-login">
      <div className="image-section-login">
        <img
          src="/assets/img/login_img.png"
          alt="Login Illustration"
          loading="lazy"
        />
      </div>

      <div className="form-section-login">
        <div className="card-login">
          <div className="login_log_con">
            <img
              src="/assets/img/login_logo.png"
              alt="OneSolutions Logo"
              className="login_logo"
              loading="lazy"
            />
          </div>

          <h2 className="title-login">Welcome Back, OneSolutions!</h2>
          <p className="para-login">
            Let's hustle and make your dreams come true!
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

          {/* STEP 1 — Credentials */}
          {step === 1 && (
            <form onSubmit={handleCredentialSubmit} className="form-login">
              <div className="form-group-login">
                <label className="label-login" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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

              <div className="form-group-login">
                <label className="label-login" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-login ${
                    validationErrors.password ? "error-login" : ""
                  }`}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                  autoComplete="current-password"
                  required
                />
                {validationErrors.password && (
                  <span className="error-text-login">
                    {validationErrors.password}
                  </span>
                )}

                <div className="link-login">
                  <Link to="/forgotPassword" className="link-text">
                    Forgot Password
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="button-login"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-login"></span> Sending OTP...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          )}

          {/* STEP 2 — OTP */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="form-login">
              <p className="otp-info-login">
                Enter the 6-digit OTP sent to <b>{formData.email}</b>
              </p>

              <div className="form-group-login">
                <label className="label-login" htmlFor="otp">
                  One-Time Password (OTP)
                </label>
                <input
                  id="otp"
                  type="text"
                  name="otp"
                  value={otp}
                  maxLength={6}
                  onChange={handleChange}
                  className={`input-login otp-input-login ${
                    validationErrors.otp ? "error-login" : ""
                  }`}
                  placeholder="000000"
                  disabled={isSubmitting}
                  autoComplete="off"
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
                {isSubmitting ? (
                  <>
                    <span className="spinner-login"></span> Verifying...
                  </>
                ) : (
                  "Verify & Login"
                )}
              </button>

              <p className="resend-otp-text">
                Didn't receive OTP?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isSubmitting || otpTimer > 0}
                  className="resend-btn-login"
                >
                  {otpTimer > 0
                    ? `Resend in ${otpTimer}s`
                    : isSubmitting
                    ? "Resending..."
                    : "Resend OTP"}
                </button>
              </p>

              <div className="link-login">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="back-btn-login"
                  disabled={isSubmitting}
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
