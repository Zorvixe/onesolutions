import axios from "axios";

// ✅ PRODUCTION-READY API CONFIGURATION
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

console.log("[API] Using API Base URL:", API_BASE_URL);

// ✅ Create Axios instance with production-ready configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
  withCredentials: false,
});

// ✅ Request interceptor - Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[API] Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("[API] Response error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url,
    });

    if (error.response?.status === 401) {
      console.log("[API] Unauthorized (401) - Clearing token");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (!error.response) {
      console.error("[API] Network error - No response from server");
      error.message = "Network error. Please check your connection.";
    }

    return Promise.reject(error);
  }
);

// ✅ Auth API methods
export const authAPI = {
  // OTP Login Flow
  loginOtpRequest: (credentials) =>
    api.post("/api/auth/login/request-otp", credentials),
  loginOtpVerify: (data) => api.post("/api/auth/login/verify-otp", data),

  // Forgot Password Flow
  forgotPasswordRequestOtp: (email) =>
    api.post("/api/auth/forgot-password/request-otp", { email }),
  forgotPasswordVerifyOtpReset: (data) =>
    api.post("/api/auth/forgot-password/verify-otp-reset", data),

  // Get current user profile
  getProfile: () => api.get("/api/auth/profile"),

  // Update user profile (FormData)
  updateProfile: (profileData) =>
    api.put("/api/auth/profile", profileData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // ✅ Complete Profile Management
  getCompleteProfile: () => api.get("/api/student/complete-profile"),

  updateCompleteProfile: (profileData) => {
    console.log(
      "[API] Updating complete profile with data:",
      Object.keys(profileData)
    );
    return api.put("/api/student/complete-profile", profileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // ✅ Projects management
  getProjects: () => api.get("/api/student/projects"),
  addProject: (projectData) => api.post("/api/student/projects", projectData),

  // ✅ Achievements management
  getAchievements: () => api.get("/api/student/achievements"),
  addAchievement: (achievementData) =>
    api.post("/api/student/achievements", achievementData),
};

export const progressAPI = {
  markContentComplete: (contentId, goalName, courseName) =>
    api.post("/api/progress/content/complete", {
      contentId,
      goalName: goalName || "Goal 1",
      courseName: courseName || "Static Website: HTML CSS & Bootstrap",
    }),

  markContentIncomplete: (contentId) =>
    api.post("/api/progress/content/incomplete", { contentId }),

  getCompletedContent: () => api.get("/api/progress/completed"),

  getProgressSummary: () => api.get("/api/progress/summary"),

  getOverallProgress: () => api.get("/api/progress/overall"),

  getCourseProgress: (courseName) =>
    api.get(`/api/progress/course/${courseName}`),

  getGoalProgress: (goalName) => api.get(`/api/progress/goal/${goalName}`),
};

// ✅ Health Check API
export const healthCheck = () => api.get("/api/health");

export default api;