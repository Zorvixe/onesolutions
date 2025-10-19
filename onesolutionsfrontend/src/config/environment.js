// ========== PRODUCTION ENVIRONMENT CONFIGURATION ==========
// This file centralizes all environment variable handling for production

export const getApiBaseUrl = () => {
  // Priority order for API URL
  const apiUrl =
    process.env.REACT_APP_API_BASE_URL ||
    process.env.REACT_APP_API_URL ||
    process.env.REACT_APP_BACKEND_URL ||
    "http://localhost:5002"

  console.log("[ENV] API Base URL:", apiUrl)
  return apiUrl
}

export const getEnvironment = () => {
  const env = process.env.NODE_ENV || "development"
  console.log("[ENV] Environment:", env)
  return env
}

export const isDevelopment = () => getEnvironment() === "development"
export const isProduction = () => getEnvironment() === "production"

export const config = {
  apiBaseUrl: getApiBaseUrl(),
  environment: getEnvironment(),
  isDevelopment: isDevelopment(),
  isProduction: isProduction(),
  requestTimeout: 60000, // 60 seconds for email operations
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
}

export default config
