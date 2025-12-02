// services/codingPracticeService.js

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

class CodingPracticeService {
  // Save question progress
  static async saveProgress(
    practiceId,
    questionId,
    language,
    code,
    status,
    score,
    attempt
  ) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/coding-practice/save-progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            practiceId,
            questionId,
            language,
            code,
            status,
            score,
            attempt,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to save progress");
      return await response.json();
    } catch (error) {
      console.error("Save progress error:", error);
      throw error;
    }
  }

  // Get question progress
  static async getQuestionProgress(questionId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/coding-practice/question/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch question progress");
      return await response.json();
    } catch (error) {
      console.error("Fetch question progress error:", error);
      throw error;
    }
  }

  // Get all practice progress
  static async getAllProgress() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/coding-practice/progress`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch practice progress");
      return await response.json();
    } catch (error) {
      console.error("Fetch all progress error:", error);
      throw error;
    }
  }

  // Mark practice as complete
  static async completePractice(practiceId, goalName, courseName) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/coding-practice/complete-practice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            practiceId,
            goalName,
            courseName,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to complete practice");
      return await response.json();
    } catch (error) {
      console.error("Complete practice error:", error);
      throw error;
    }
  }

  // Get practice completion status
  static async getCompletionStatus(practiceId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/coding-practice/completion/${practiceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch completion status");
      return await response.json();
    } catch (error) {
      console.error("Fetch completion status error:", error);
      throw error;
    }
  }

  // Get practice summary
  static async getPracticeSummary(practiceId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/coding-practice/summary/${practiceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch practice summary");
      return await response.json();
    } catch (error) {
      console.error("Fetch practice summary error:", error);
      throw error;
    }
  }
}

export default CodingPracticeService;
