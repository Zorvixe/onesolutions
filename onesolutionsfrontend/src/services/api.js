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

  // Register new user
  register: (studentData) => api.post("/api/auth/register", studentData),

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
  markContentComplete: (
    contentId,
    goalName,
    courseName,
    goalId,
    moduleId,
    subtopicId,
    quizScore
  ) =>
    api.post("/api/progress/content/complete", {
      contentId,
      goalName: goalName || "Goal 1",
      courseName: courseName || "Static Website: HTML CSS & Bootstrap",
      goalId,
      moduleId,
      subtopicId,
      quizScore,
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

// ✅ NEW: Digital Marketing API methods
export const digitalMarketingAPI = {
  // Student endpoints
  getStudentCourses: () => api.get("/api/student/courses"),
  enrollInCourse: (goalId) => api.post(`/api/student/courses/enroll/${goalId}`),
  getGoalStructure: (goalId) => api.get(`/api/student/courses/goal/${goalId}`),
  getAllCoursesStructure: () => api.get("/api/student/courses/all-structure"),

  // ✅ UPDATED: Get content by UUID - this is what shows in the URL
  getContentByUuid: (contentUuid) => api.get(`/api/content/${contentUuid}`),

  getContentProgress: (contentId) =>
    api.get(`/api/student/courses/content/${contentId}/progress`),
  getCompletedContent: () => api.get("/api/student/courses/completed-content"),
  getDashboardStats: () => api.get("/api/student/dashboard/stats"),
  getGoalProgress: (goalId) =>
    api.get(`/api/student/courses/progress/goal/${goalId}`),
};

export const threadsAPI = {
  createThread: (threadData) => api.post("/api/threads", threadData),
  getThreads: (subtopicId) => api.get(`/api/threads/${subtopicId}`),
  getThreadDetail: (threadId) => api.get(`/api/threads/detail/${threadId}`),
  createReply: (replyData) => api.post("/api/threads/reply", replyData),
};


// ✅ NEW: Java Programming API methods
export const javaAPI = {
  // Student endpoints
  getStudentCourses: () => api.get("/student/java/courses"),
  enrollInCourse: (goalId) => api.post(`/student/java/courses/enroll/${goalId}`),
  getAllCoursesStructure: () => api.get("/student/java/courses/all-structure"),

  // Content endpoints
  getContentByUuid: (contentUuid) => api.get(`/student/java/content/${contentUuid}`),
  getCodingPractice: (practiceId) => api.get(`/student/java/coding-practice/${practiceId}`),
  markContentComplete: (contentId, goalId, quizScore) =>
    api.post("/student/java/content/complete", { contentId, goalId, quizScore }),
  getCompletedContent: () => api.get("/student/java/completed-content"),
  getGoalProgress: (goalId) => api.get(`/student/java/progress/goal/${goalId}`), // if needed

  // Coding endpoints
  runCode: (contentId, code) => api.post("/student/java/coding/run", { contentId, code }),
  submitCode: (contentId, code) => api.post("/student/java/coding/submit", { contentId, code }),
  completePractice: (practiceId) => api.post(`/student/java/coding-practice/${practiceId}/complete`),
};

// ✅ Health Check API
export const healthCheck = () => api.get("/api/health");

export default api;
