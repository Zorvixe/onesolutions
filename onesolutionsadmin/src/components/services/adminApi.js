// src/services/adminApi.js
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_APP_URL || "http://localhost:5002";

// Create axios instance with admin credentials
const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add admin authentication token to requests
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    const apiKey = localStorage.getItem("adminApiKey");

    if (token) {
      config.headers["x-admin-token"] = token;
    }
    if (apiKey) {
      config.headers["x-admin-api-key"] = apiKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Admin unauthorized, redirect to login
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminApiKey");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export const adminStudentApi = {
  // Get all students with filters
  getStudents: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (
        filters[key] !== "" &&
        filters[key] !== null &&
        filters[key] !== undefined
      ) {
        params.append(key, filters[key]);
      }
    });

    return adminApi.get(`/api/admin/students?${params.toString()}`);
  },

  // Get student by ID
  getStudent: (studentId) => {
    return adminApi.get(`/api/admin/students/${studentId}`);
  },

  // Update student
  updateStudent: (studentId, studentData) => {
    return adminApi.put(`/api/admin/students/${studentId}`, studentData);
  },

  // Delete student
  deleteStudent: (studentId) => {
    return adminApi.delete(`/api/admin/students/${studentId}`);
  },

  // Get student statistics
  getStudentStats: () => {
    return adminApi.get("/api/admin/students/stats");
  },
};

export default adminStudentApi;
