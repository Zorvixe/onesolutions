"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaShieldAlt } from "react-icons/fa";
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
      const response = await fetch(
        `https://apiose.onesolutionsekam.in/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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
    <div className="login-container-adlog">
      <div className="login-wrapper-adlog">
        <div className="login-left-adlog">
          <div className="login-left-content-adlog">
            <div className="brand-container-adlog">
              {assests.one_solutions && (
                <img
                  src={assests.one_solutions || "/placeholder.svg"}
                  alt="One Solutions"
                  className="brand-logo-adlog"
                />
              )}
            </div>

            {assests.login_image && (
              <div className="illustration-wrapper-adlog">
                <img
                  src={assests.login_image || "/placeholder.svg"}
                  alt="Admin Dashboard"
                  className="illustration-image-adlog"
                />
              </div>
            )}
          </div>
        </div>

        <div className="login-right-adlog">
          <div className="login-card-adlog">
            <div className="login-card-header-adlog">
              <h2>Sign In</h2>
              <p>Please enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="login-form-adlog">
              <div className="form-group-adlog">
                <label htmlFor="username" className="form-label-adlog">
                  Username
                </label>
                <div className="input-group-adlog">
                  <FaUser className="input-icon-adlog" />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-input-adlog"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="form-group-adlog">
                <div className="password-label-row-adlog">
                  <label htmlFor="password" className="form-label-adlog">
                    Password
                  </label>
                  <a href="/reset-password" className="forgot-password-adlog">
                    Forgot Password?
                  </a>
                </div>
                <div className="input-group-adlog">
                  <FaLock className="input-icon-adlog" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input-adlog"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-adlog"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="login-button-adlog"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="button-loader-adlog"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {(error || successMessage) && (
                <div className="message-container-adlog">
                  {error && (
                    <div className="message-adlog error-message-adlog">
                      <span>{error}</span>
                    </div>
                  )}
                  {successMessage && (
                    <div className="message-adlog success-message-adlog">
                      <span>{successMessage}</span>
                    </div>
                  )}
                </div>
              )}
            </form>

            <div className="login-footer-adlog">
              <p className="copyright-text-adlog">
                © {new Date().getFullYear()} One Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
