"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { assests } from "../../assests/assests";
import "./login.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
    if (successMessage) setSuccessMessage(null);
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`https://ose.onesolutionsekam.in/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.error) {
          switch (responseData.error) {
            case "Invalid username":
              setError("Username is not correct");
              break;
            case "Invalid password":
              setError("Password is not correct");
              break;
            default:
              setError(responseData.error);
          }
        } else {
          setError("Login failed. Please try again.");
        }
        return;
      }

      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="admin-login-container">
      <div className="login-background">
        <div className="background-overlay"></div>
        {assests.login_bg && (
          <img
            src={assests.login_bg || "/placeholder.svg"}
            alt=""
            className="background-image"
          />
        )}
      </div>

      <div className="login-content">
        <div className="login-main">
          <div className="login-card">
            <div className="card-header">
              {assests.one_solutions && (
                <img
                  src={assests.one_solutions || "/placeholder.svg"}
                  alt="One Solutions"
                  className="company-logo"
                />
              )}
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-input"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-container">
                  <FaLock className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <a href="/reset-password" className="forgot-password">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="btn-loader"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="message-area">
                {error && (
                  <div className="alert alert-error">
                    <span className="alert-text">{error}</span>
                  </div>
                )}
                {successMessage && (
                  <div className="alert alert-success">
                    <span className="alert-text">{successMessage}</span>
                  </div>
                )}
              </div>
            </form>
          </div>

          {assests.login_image && (
            <div className="login-illustration">
              <img
                src={assests.login_image || "/placeholder.svg"}
                alt="Admin Dashboard"
                className="illustration-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
