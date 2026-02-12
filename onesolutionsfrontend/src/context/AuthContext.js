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

  // 🔥 FIXED: Auth check with complete user data including studentType and courseSelection
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && token !== "null" && token !== "undefined") {
        const response = await authAPI.getProfile();
        
        // 🔥 Ensure we have complete user data with all required fields
        const userData = response.data.data.student;
        
        // Set default values if missing
        const enrichedUserData = {
          ...userData,
          studentType: userData.studentType || userData.student_type || "zorvixe_core",
          courseSelection: userData.courseSelection || userData.course_selection || "web_development",
          batchMonth: userData.batchMonth || userData.batch_month || "",
          batchYear: userData.batchYear || userData.batch_year || "",
        };
        
        setUser(enrichedUserData);
        
        // Also update localStorage to ensure consistency
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            const updatedStoredUser = {
              ...parsedUser,
              ...enrichedUserData
            };
            localStorage.setItem("user", JSON.stringify(updatedStoredUser));
          } catch (e) {
            localStorage.setItem("user", JSON.stringify(enrichedUserData));
          }
        } else {
          localStorage.setItem("user", JSON.stringify(enrichedUserData));
        }
        
        console.log("[AUTH] Auth check successful:", enrichedUserData.email);
        console.log("[AUTH] Student Type:", enrichedUserData.studentType);
        console.log("[AUTH] Course Selection:", enrichedUserData.courseSelection);
      } else {
        setUser(null);
        setCompleteProfile(null);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("[AUTH] Auth check failed:", error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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

  // 🔥 FIXED: Load complete profile with all fields
  const loadCompleteProfile = async () => {
    try {
      const response = await authAPI.getCompleteProfile();
      if (response.data.success) {
        const profileData = response.data.data.student;
        
        // 🔥 Ensure studentType and courseSelection are set
        const enrichedProfile = {
          ...profileData,
          studentType: profileData.studentType || profileData.student_type || "zorvixe_core",
          courseSelection: profileData.courseSelection || profileData.course_selection || "web_development",
        };
        
        setCompleteProfile(enrichedProfile);
        
        // Also update user state with these values
        if (user) {
          setUser(prev => ({
            ...prev,
            studentType: enrichedProfile.studentType,
            courseSelection: enrichedProfile.courseSelection,
          }));
          
          // Update localStorage
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              parsedUser.studentType = enrichedProfile.studentType;
              parsedUser.courseSelection = enrichedProfile.courseSelection;
              localStorage.setItem("user", JSON.stringify(parsedUser));
            } catch (e) {
              // Ignore
            }
          }
        }
        
        console.log("[AUTH] Complete profile loaded:", enrichedProfile.email);
        console.log("[AUTH] Student Type:", enrichedProfile.studentType);
        console.log("[AUTH] Course Selection:", enrichedProfile.courseSelection);
      }
    } catch (error) {
      console.error("[AUTH] Complete profile load failed:", error.message);
    }
  };

  // 🔥 AUTO LOAD ALL USER DATA WHEN TOKEN IS SET
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const loadAllUserData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          loadCompleteProfile(),
          loadUserProgress(),
          loadProgressSummary(),
          loadOverallProgress(),
        ]);
      } catch (err) {
        console.error("[AUTH] Failed to load user data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAllUserData();
  }, [token]);

  // ✅ Forgot Password Flow
  const forgotPasswordRequestOtp = async (email) => {
    try {
      setError("");
      const response = await authAPI.forgotPasswordRequestOtp(email.trim());

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || "OTP sent to your email",
        };
      } else {
        const errorMsg = response.data.message || "Failed to send OTP";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error("[AUTH] Forgot password OTP request error:", error);

      let errorMsg = "Failed to send OTP. Please try again.";

      if (error.response?.status === 400) {
        errorMsg = error.response.data?.message || "Email not found";
      } else if (error.response?.status === 429) {
        errorMsg = "Too many attempts. Please try again later.";
      } else if (!error.response) {
        errorMsg = "Network error. Please check your connection and try again.";
      }

      setError(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const forgotPasswordVerifyOtpReset = async (email, otp, newPassword) => {
    try {
      setError("");
      const response = await authAPI.forgotPasswordVerifyOtpReset({
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || "Password reset successful",
        };
      } else {
        const errorMsg = response.data.message || "Password reset failed";
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error(
        "[AUTH] Forgot password verify OTP and reset error:",
        error
      );

      let errorMsg = "Password reset failed. Please try again.";

      if (error.response?.status === 400) {
        errorMsg =
          error.response.data?.message ||
          "Invalid OTP or password requirements not met";
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

  // 🔥 FIXED: Enhanced logout - clear all user data
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCompleteProfile(null);
    setToken(null);
    setError("");
    setOtpSent(false);
    setCompletedContent([]);
    setGoalProgress({});
    setCourseProgress({});
    setOverallProgress(0);
    setCodingPracticeProgress({});
    console.log("[AUTH] Logout successful - all user data cleared");
  };

  const clearError = () => setError("");

  // ✅ Enhanced update profile to handle complete profile
  const updateCompleteProfile = async (formData) => {
    try {
      setError("");
      console.log("[AUTH] Updating complete user profile");
      const response = await authAPI.updateCompleteProfile(formData);

      if (response.data.success) {
        const updatedStudent = response.data.data.student;
        
        // 🔥 Ensure studentType and courseSelection are preserved
        const enrichedStudent = {
          ...updatedStudent,
          studentType: updatedStudent.studentType || updatedStudent.student_type || user?.studentType || "zorvixe_core",
          courseSelection: updatedStudent.courseSelection || updatedStudent.course_selection || user?.courseSelection || "web_development",
        };
        
        setUser(enrichedStudent);
        setCompleteProfile(enrichedStudent);
        
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(enrichedStudent));
        
        console.log("[AUTH] Profile updated successfully");
        console.log("[AUTH] Student Type:", enrichedStudent.studentType);
        console.log("[AUTH] Course Selection:", enrichedStudent.courseSelection);
        
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

  // ✅ OTP Verification - 🔥 FIXED: Store complete user data with studentType and courseSelection
  const loginOtpVerify = async (email, otp) => {
    try {
      setError("");

      const response = await authAPI.loginOtpVerify({
        email: email.trim(),
        otp: otp.trim(),
      });

      if (response.data.success) {
        const { student, token } = response.data.data;

        // 🔥 Ensure we have complete user data with all required fields
        const userData = {
          id: student.id,
          studentId: student.studentId || student.student_id,
          email: student.email,
          firstName: student.firstName || student.first_name,
          lastName: student.lastName || student.last_name,
          phone: student.phone || "",
          profileImage: student.profileImage || student.profile_image,
          studentType: student.studentType || student.student_type || "zorvixe_core",
          courseSelection: student.courseSelection || student.course_selection || "web_development",
          batchMonth: student.batchMonth || student.batch_month || "",
          batchYear: student.batchYear || student.batch_year || "",
          isCurrentBatch: student.isCurrentBatch || student.is_current_batch,
          createdAt: student.createdAt || student.created_at,
        };

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        
        setToken(token);
        setUser(userData);
        setOtpSent(false);

        console.log("[AUTH] OTP login successful:", userData.email);
        console.log("[AUTH] Student Type:", userData.studentType);
        console.log("[AUTH] Course Selection:", userData.courseSelection);

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

  // 🔥 FIXED: Enhanced register - store complete user data with studentType and courseSelection
  const register = async (formData) => {
    try {
      setError("");
      const response = await authAPI.register(formData);
      
      if (response.data.success) {
        const { student, token } = response.data.data;
        
        // 🔥 Ensure we have complete user data with all required fields
        const userData = {
          id: student.id,
          studentId: student.studentId || student.student_id,
          email: student.email,
          firstName: student.firstName || student.first_name,
          lastName: student.lastName || student.last_name,
          phone: student.phone || "",
          profileImage: student.profileImage || student.profile_image,
          studentType: student.studentType || student.student_type || formData.get('studentType') || formData.get('student_type') || "zorvixe_core",
          courseSelection: student.courseSelection || student.course_selection || formData.get('courseSelection') || formData.get('course_selection') || "web_development",
          batchMonth: student.batchMonth || student.batch_month || formData.get('batchMonth') || "",
          batchYear: student.batchYear || student.batch_year || formData.get('batchYear') || "",
          isCurrentBatch: student.isCurrentBatch || student.is_current_batch,
          createdAt: student.createdAt || student.created_at,
        };

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        
        setToken(token);
        setUser(userData);
        
        console.log("[AUTH] Registration successful:", userData.email);
        console.log("[AUTH] Student Type:", userData.studentType);
        console.log("[AUTH] Course Selection:", userData.courseSelection);
        
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
  };

  // 🔥 FIXED: Enhanced update profile - preserve studentType and courseSelection
  const updateProfile = async (formData) => {
    try {
      setError("");
      const response = await authAPI.updateProfile(formData);
      
      if (response.data.success) {
        const updatedStudent = response.data.data.student;
        
        // 🔥 Preserve existing studentType and courseSelection if not returned
        const enrichedStudent = {
          ...updatedStudent,
          studentType: updatedStudent.studentType || updatedStudent.student_type || user?.studentType || "zorvixe_core",
          courseSelection: updatedStudent.courseSelection || updatedStudent.course_selection || user?.courseSelection || "web_development",
        };
        
        setUser(enrichedStudent);
        
        // Update localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            const updatedUser = {
              ...parsedUser,
              ...enrichedStudent,
              studentType: enrichedStudent.studentType,
              courseSelection: enrichedStudent.courseSelection,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
          } catch (e) {
            localStorage.setItem("user", JSON.stringify(enrichedStudent));
          }
        } else {
          localStorage.setItem("user", JSON.stringify(enrichedStudent));
        }
        
        console.log("[AUTH] Profile updated successfully");
        console.log("[AUTH] Student Type:", enrichedStudent.studentType);
        console.log("[AUTH] Course Selection:", enrichedStudent.courseSelection);
        
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
    register,
    updateProfile,
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
    forgotPasswordRequestOtp,
    forgotPasswordVerifyOtpReset,
    isAuthenticated: !!user,
    refreshCompleteProfile: loadCompleteProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};