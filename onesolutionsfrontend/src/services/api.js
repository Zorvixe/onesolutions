import axios from "axios"

// ✅ PRODUCTION-READY API CONFIGURATION
// Works on localhost, Render, Vercel, Netlify, and all hosting platforms

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || process.env.REACT_APP_API_URL || "http://localhost:5002"

console.log("[API] Using API Base URL:", API_BASE_URL)

// ✅ Create Axios instance with production-ready configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // Increased timeout to 60s for email sending on slow connections
  withCredentials: false, // Disable credentials for CORS compatibility
})

// ✅ Request interceptor - Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`
      console.log("[API] Token added to request")
    }
    return config
  },
  (error) => {
    console.error("[API] Request interceptor error:", error)
    return Promise.reject(error)
  },
)

// ✅ Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log("[API] Response successful:", response.status)
    return response
  },
  (error) => {
    console.error("[API] Response error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url,
    })

    if (error.response?.status === 401) {
      console.log("[API] Unauthorized (401) - Clearing token")
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    if (!error.response) {
      console.error("[API] Network error - No response from server")
      error.message = "Network error. Please check your connection."
    }

    return Promise.reject(error)
  },
)

// ✅ Auth API methods - Production-ready
export const authAPI = {
  // OTP Login Flow
  loginOtpRequest: (credentials) => {
    console.log("[AUTH] Requesting OTP for email:", credentials.email)
    return api.post("/api/auth/login/request-otp", credentials)
  },

  loginOtpVerify: (data) => {
    console.log("[AUTH] Verifying OTP for email:", data.email)
    return api.post("/api/auth/login/verify-otp", data)
  },

  // Forgot Password Flow
  forgotPasswordRequestOtp: (email) => {
    console.log("[AUTH] Requesting password reset OTP for:", email)
    return api.post("/api/auth/forgot-password/request-otp", { email })
  },

  forgotPasswordVerifyOtpReset: (data) => {
    console.log("[AUTH] Resetting password for:", data.email)
    return api.post("/api/auth/forgot-password/verify-otp-reset", data)
  },

  // Register new user
  register: (studentData) => {
    console.log("[AUTH] Registering new user")
    return api.post("/api/auth/register", studentData)
  },

  // Get current user profile
  getProfile: () => {
    console.log("[AUTH] Fetching user profile")
    return api.get("/api/auth/profile")
  },

  // Update user profile (FormData)
  updateProfile: (profileData) => {
    console.log("[AUTH] Updating user profile")
    return api.put("/api/auth/profile", profileData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
}

// ✅ Health Check API
export const healthCheck = () => {
  console.log("[API] Performing health check")
  return api.get("/api/health")
}

export default api
