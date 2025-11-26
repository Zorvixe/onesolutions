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
  withCredentials: false, // Important for CORS
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

    // Add CORS headers
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] =
      "GET,PUT,POST,DELETE,PATCH,OPTIONS";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Enhanced response interceptor for better error handling
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
      console.error("Network error - server might be down or CORS issue");
      error.message =
        "Unable to connect to server. Please check your connection.";
    }

    if (error.response?.status === 401) {
      // Admin unauthorized, redirect to login
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminApiKey");
      window.location.href = "/admin/login";
    }

    if (error.response?.status === 403) {
      error.message = "Access forbidden. Please check your permissions.";
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

export default adminApi;
