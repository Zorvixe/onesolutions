"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { authAPI, progressAPI } from "../services/api";

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

  // ✅ Enhanced Progress states
  const [completedContent, setCompletedContent] = useState([]);
  const [goalProgress, setGoalProgress] = useState({});
  const [courseProgress, setCourseProgress] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);
  const [progressLoading, setProgressLoading] = useState(false);
  const [codingPracticeProgress, setCodingPracticeProgress] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && token !== "null" && token !== "undefined") {
        const response = await authAPI.getProfile();
        setUser(response.data.data.student);
        await loadCompleteProfile();
        await loadUserProgress();
        await loadProgressSummary();
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

  // ✅ Enhanced Progress Functions
  const loadUserProgress = async () => {
    try {
      setProgressLoading(true);
      const res = await progressAPI.getCompletedContent();
      if (res.data.success) {
        const completed = res.data.data.completedContent || [];
        setCompletedContent(completed.map((item) => item.content_id));
        console.log(
          "[PROGRESS] Loaded completed content:",
          completed.map((item) => item.content_id)
        );
      }
    } catch (err) {
      console.error("[PROGRESS] Load progress failed:", err);
    } finally {
      setProgressLoading(false);
    }
  };

  const loadProgressSummary = useCallback(async () => {
    if (!token) return;

    try {
      const responses = await Promise.all([
        fetch(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5002"
          }/progress/completed`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        fetch(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5002"
          }/progress/summary`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        fetch(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5002"
          }/coding-practice/progress`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);

      const [completedRes, summaryRes, practicRes] = responses;

      if (completedRes.ok) {
        const completedData = await completedRes.json();
        if (completedData.success) {
          setCompletedContent(
            completedData.data.completedContent.map((item) => item.content_id)
          );
        }
      }

      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        if (summaryData.success) {
          const goals = {};
          const courses = {};
          summaryData.data.progressSummary.forEach((item) => {
            if (item.goalName) {
              goals[item.goalName] = item.progressPercentage;
            }
            if (item.courseName) {
              courses[item.courseName] = item.progressPercentage;
            }
          });
          setGoalProgress(goals);
          setCourseProgress(courses);
        }
      }

      if (practicRes.ok) {
        const practicData = await practicRes.json();
        if (practicData.success) {
          const practiceMap = {};
          practicData.data.progress.forEach((prog) => {
            practiceMap[prog.question_id] = {
              status: prog.status,
              score: prog.score,
            };
          });
          setCodingPracticeProgress(practiceMap);
        }
      }
    } catch (error) {
      console.error("Error loading progress summary:", error);
    }
  }, [token]);

  const markCodingPracticeComplete = useCallback(
    async (practiceId, goalName, courseName) => {
      if (!token) return false;

      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5002"
          }/api/coding-practice/complete-practice`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              practiceId,
              goalName,
              courseName,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          return data.success;
        }
        return false;
      } catch (error) {
        console.error("Error marking practice complete:", error);
        return false;
      }
    },
    [token]
  );

  const markSubtopicComplete = async (contentId, goalName, courseName) => {
    try {
      console.log(`[PROGRESS] Marking subtopic complete:`, {
        contentId,
        goalName,
        courseName,
      });

      if (!contentId) {
        console.error("[PROGRESS] contentId is required");
        return { success: false, message: "Content ID is required" };
      }

      const res = await progressAPI.markContentComplete(
        contentId,
        goalName,
        courseName
      );

      if (res.data.success) {
        console.log(`[PROGRESS] Successfully marked ${contentId} as complete`);

        // Update local state immediately for better UX
        setCompletedContent((prev) => [...new Set([...prev, contentId])]);

        // Reload all progress data
        await Promise.all([loadProgressSummary(), loadOverallProgress()]);

        return { success: true, data: res.data.data };
      } else {
        console.error("[PROGRESS] Mark complete failed:", res.data.message);
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("[PROGRESS] Mark complete failed:", err);

      if (err.response) {
        console.error("[PROGRESS] Server response:", err.response.data);
        return {
          success: false,
          message: err.response.data.message || "Server error",
        };
      }

      return {
        success: false,
        message: err.message || "Network error",
      };
    }
  };

  const loadOverallProgress = async () => {
    try {
      const res = await progressAPI.getOverallProgress();
      if (res.data.success) {
        setOverallProgress(res.data.data.overallProgress || 0);
      }
    } catch (err) {
      console.error("[PROGRESS] Overall progress load failed:", err);
    }
  };

  const markSubtopicIncomplete = async (contentId) => {
    try {
      const res = await progressAPI.markContentIncomplete(contentId);
      if (res.data.success) {
        setCompletedContent((prev) => prev.filter((id) => id !== contentId));
        await loadProgressSummary();
        await loadOverallProgress();
      }
    } catch (err) {
      console.error("[PROGRESS] Mark incomplete failed:", err);
    }
  };

  // ✅ Enhanced progress calculation utilities
  const calculateModuleProgress = (module) => {
    if (!module.topic || !Array.isArray(module.topic)) return 0;

    const subtopics = module.topic;
    const completedCount = subtopics.filter((sub) =>
      completedContent.includes(sub.id)
    ).length;

    return subtopics.length > 0 ? (completedCount / subtopics.length) * 100 : 0;
  };

  const calculateCourseProgress = (course) => {
    if (!course.modules || !Array.isArray(course.modules)) return 0;

    let totalSubtopicCount = 0;
    let completedSubtopicCount = 0;

    course.modules.forEach((module) => {
      if (module.topic && Array.isArray(module.topic)) {
        totalSubtopicCount += module.topic.length;
        completedSubtopicCount += module.topic.filter((sub) =>
          completedContent.includes(sub.id)
        ).length;
      }
    });

    return totalSubtopicCount > 0
      ? (completedSubtopicCount / totalSubtopicCount) * 100
      : 0;
  };

  const calculateGoalProgress = (goal) => {
    if (!goal.courses || !Array.isArray(goal.courses)) return 0;

    let totalCourseProgress = 0;
    let courseCount = 0;

    goal.courses.forEach((course) => {
      const courseProgress = calculateCourseProgress(course);
      totalCourseProgress += courseProgress;
      courseCount++;
    });

    return courseCount > 0 ? totalCourseProgress / courseCount : 0;
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
    localStorage.removeItem("token");
    setUser(null);
    setCompleteProfile(null);
    setError("");
    setOtpSent(false);
    setCompletedContent([]);
    setGoalProgress({});
    setCourseProgress({});
    setOverallProgress(0);
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
      const errorMsg =
        error.response?.data?.message || "Failed to add achievement";
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
    setUser,
    token,
    setToken,
    completeProfile,
    loading,
    error,
    otpSent,
    loginOtpRequest,
    loginOtpVerify,
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
        const errorMsg =
          error.response?.data?.message || "Profile update failed";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    },
    completedContent,
    goalProgress,
    courseProgress,
    overallProgress,
    progressLoading,
    markSubtopicComplete,
    markSubtopicIncomplete,
    loadUserProgress,
    codingPracticeProgress,
    loadProgressSummary,
    markCodingPracticeComplete,
    loadOverallProgress,
    calculateModuleProgress,
    calculateCourseProgress,
    calculateGoalProgress,
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