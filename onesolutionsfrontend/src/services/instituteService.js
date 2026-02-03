// In instituteService.js (frontend)
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

export class InstituteService {
  static getHeaders() {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  static async handleResponse(response) {
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorText = await response.text();
        if (errorText) {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.error || errorText;
        }
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || data.error || "Request failed");
    }

    return data;
  }

  static async getProfile() {
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        headers: this.getHeaders(),
      });
      
      const data = await this.handleResponse(res);
      return data.data.student;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  }

  static async getProgress() {
    try {
      const res = await fetch(`${API_BASE}/api/progress/overall`, {
        headers: this.getHeaders(),
      });
      
      const data = await this.handleResponse(res);
      return data.data;
    } catch (error) {
      console.error("Failed to fetch progress:", error);
      throw error;
    }
  }

  // AI Chat Session Methods
  static async getChatSessions() {
    try {
      const res = await fetch(`${API_BASE}/api/ai/sessions`, {
        headers: this.getHeaders(),
      });

      const data = await this.handleResponse(res);
      return data.data || [];
    } catch (error) {
      console.error("Failed to load chat history:", error);
      // Return empty array instead of throwing for better UX
      return [];
    }
  }

  static async saveChatSession(session) {
    try {
      const res = await fetch(`${API_BASE}/api/ai/sessions`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(session),
      });

      const data = await this.handleResponse(res);
      return data.data;
    } catch (error) {
      console.error("Failed to save chat:", error);
      throw error;
    }
  }

  static async deleteChatSession(sessionId) {
    try {
      const res = await fetch(`${API_BASE}/api/ai/sessions/${sessionId}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      await this.handleResponse(res);
      return true;
    } catch (error) {
      console.error("Failed to delete chat:", error);
      throw error;
    }
  }

  // New methods for enhanced AI
  static async sendEnhancedChat(data) {
    try {
      const response = await fetch(`${API_BASE}/api/ai/enhanced-chat`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      const result = await this.handleResponse(response);
      return result.data;
    } catch (error) {
      console.error("Enhanced chat error:", error);
      throw error;
    }
  }

  static async getLearningContent(category = "all", search = "") {
    try {
      const response = await fetch(
        `${API_BASE}/api/ai/learning-content?category=${category}&search=${encodeURIComponent(search)}`,
        {
          headers: this.getHeaders(),
        }
      );

      const result = await this.handleResponse(response);
      return result.data.content || [];
    } catch (error) {
      console.error("Learning content error:", error);
      return [];
    }
  }

  static async getAICategories() {
    try {
      const response = await fetch(`${API_BASE}/api/ai/categories`, {
        headers: this.getHeaders(),
      });

      const result = await this.handleResponse(response);
      return result.data.categories || [];
    } catch (error) {
      console.error("Categories error:", error);
      return [];
    }
  }

  static async getStudentQuestions(status = "all") {
    try {
      const response = await fetch(
        `${API_BASE}/api/admin/ai-content/student-questions?status=${status}`,
        {
          headers: this.getHeaders(),
        }
      );

      const result = await this.handleResponse(response);
      return result.data.questions || [];
    } catch (error) {
      console.error("Student questions error:", error);
      return [];
    }
  }

  // Helper method to check authentication
  static isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  // Method to logout
  static logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
}