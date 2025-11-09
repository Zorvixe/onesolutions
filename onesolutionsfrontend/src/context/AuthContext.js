"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [completeProfile, setCompleteProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("[AUTH] Checking auth status, token exists:", !!token);

      if (token && token !== "null" && token !== "undefined") {
        const response = await authAPI.getProfile();
        setUser(response.data.data.student);
        await loadCompleteProfile();
      } else {
        setUser(null);
        setCompleteProfile(null);
      }
    } catch (error) {
      console.error("[AUTH] Auth check failed:", error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
      setUser(null);
      setCompleteProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const loadCompleteProfile = async () => {
    try {
      const response = await authAPI.getCompleteProfile();
      if (response.data.success) {
        setCompleteProfile(response.data.data.student);
      }
    } catch (error) {
      console.error("[AUTH] Complete profile load failed:", error.message);
    }
  };

  const logout = () => {
    console.log("[AUTH] Logging out...");
    localStorage.removeItem("token");
    setUser(null);
    setCompleteProfile(null);
    setError("");
    setOtpSent(false);
  };

  const clearError = () => setError("");

  // ✅ Enhanced update profile to handle complete profile
  const updateCompleteProfile = async (formData) => {
    try {
      setError("");
      console.log("[AUTH] Updating complete user profile");
      const response = await authAPI.updateCompleteProfile(formData);

      if (response.data.success) {
        setUser(response.data.data.student);
        setCompleteProfile(response.data.data.student);
        return { success: true, message: "Profile updated successfully" };
      } else {
        const errorMsg = response.data.message || "Profile update failed";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error("[AUTH] Complete profile update error:", error);

      let errorMsg = "Profile update failed. Please try again.";

      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (!error.response) {
        errorMsg = "Network error. Please check your connection and try again.";
      }

      setError(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  // ✅ Add project
  const addProject = async (projectData) => {
    try {
      setError("");
      const response = await authAPI.addProject(projectData);
      
      if (response.data.success) {
        await loadCompleteProfile();
        return { success: true, message: "Project added successfully" };
      } else {
        const errorMsg = response.data.message || "Failed to add project";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error("[AUTH] Add project error:", error);
      const errorMsg = error.response?.data?.message || "Failed to add project";
      setError(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  // ✅ Add achievement
  const addAchievement = async (achievementData) => {
    try {
      setError("");
      const response = await authAPI.addAchievement(achievementData);
      
      if (response.data.success) {
        await loadCompleteProfile();
        return { success: true, message: "Achievement added successfully" };
      } else {
        const errorMsg = response.data.message || "Failed to add achievement";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error("[AUTH] Add achievement error:", error);
      const errorMsg = error.response?.data?.message || "Failed to add achievement";
      setError(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  // ✅ OTP Login Request
  const loginOtpRequest = async (email, password) => {
    try {
      setError("");
      setOtpSent(false);

      const response = await authAPI.loginOtpRequest({
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        setOtpSent(true);
        return { success: true, message: "OTP sent to your email" };
      } else {
        const errorMsg = response.data.message || "OTP request failed";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error("[AUTH] OTP request error:", error);

      let errorMsg = "OTP request failed. Please try again.";

      if (error.response?.status === 400) {
        errorMsg = error.response.data?.message || "Invalid email or password";
      } else if (error.response?.status === 429) {
        errorMsg = "Too many attempts. Please try again later.";
      } else if (error.response?.status === 500) {
        errorMsg = "Server error. Please try again later.";
      } else if (!error.response) {
        errorMsg = "Network error. Please check your connection and try again.";
      }

      setError(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  // ✅ OTP Verification
  const loginOtpVerify = async (email, otp) => {
    try {
      setError("");

      const response = await authAPI.loginOtpVerify({
        email: email.trim(),
        otp: otp.trim(),
      });

      if (response.data.success) {
        const { student, token } = response.data.data;
        localStorage.setItem("token", token);
        setUser(student);
        setOtpSent(false);
        return { success: true, message: "Login successful" };
      } else {
        const errorMsg = response.data.message || "OTP verification failed";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error("[AUTH] OTP verify error:", error);

      let errorMsg = "OTP verification failed. Please try again.";

      if (error.response?.status === 400) {
        errorMsg = error.response.data?.message || "Invalid OTP";
      } else if (error.response?.status === 401) {
        errorMsg = "OTP expired. Please request a new one.";
      } else if (error.response?.status === 429) {
        errorMsg = "Too many attempts. Please try again later.";
      } else if (!error.response) {
        errorMsg = "Network error. Please check your connection and try again.";
      }

      setError(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const value = {
    user,
    completeProfile,
    loading,
    error,
    otpSent,
    loginOtpRequest,
    loginOtpVerify,
    register: async (formData) => {
      try {
        setError("");
        const response = await authAPI.register(formData);
        if (response.data.success) {
          const { student, token } = response.data.data;
          localStorage.setItem("token", token);
          setUser(student);
          return { success: true, message: "Registration successful" };
        } else {
          const errorMsg = response.data.message || "Registration failed";
          setError(errorMsg);
          return { success: false, message: errorMsg };
        }
      } catch (error) {
        console.error("[AUTH] Registration error:", error);
        const errorMsg = error.response?.data?.message || "Registration failed";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    },
    updateProfile: async (formData) => {
      try {
        setError("");
        const response = await authAPI.updateProfile(formData);
        if (response.data.success) {
          setUser(response.data.data.student);
          return { success: true, message: "Profile updated successfully" };
        } else {
          const errorMsg = response.data.message || "Profile update failed";
          setError(errorMsg);
          return { success: false, message: errorMsg };
        }
      } catch (error) {
        console.error("[AUTH] Profile update error:", error);
        const errorMsg = error.response?.data?.message || "Profile update failed";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    },
    updateCompleteProfile,
    addProject,
    addAchievement,
    logout,
    clearError,
    isAuthenticated: !!user,
    refreshCompleteProfile: loadCompleteProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};