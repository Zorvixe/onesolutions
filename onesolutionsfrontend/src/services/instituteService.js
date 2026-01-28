// In instituteService.js (frontend)
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

export class InstituteService {
  static getHeaders() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  static async getProfile() {
    const res = await fetch(`${API_BASE}/api/auth/profile`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    const json = await res.json();
    return json.data.student;
  }

  static async getProgress() {
    const res = await fetch(`${API_BASE}/api/progress/overall`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch progress");
    const json = await res.json();
    return json.data;
  }

  // AI Chat Session Methods
  static async getChatSessions() {
    try {
      const res = await fetch(`${API_BASE}/api/ai/sessions`, {
        headers: this.getHeaders(),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response:", errorText);
        throw new Error(
          `Failed to load chat history: ${res.status} ${res.statusText}`
        );
      }

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || "Failed to load chat history");
      }

      return json.data || [];
    } catch (error) {
      console.error("Backend Error:", error);
      throw error;
    }
  }

  static async saveChatSession(session) {
    const res = await fetch(`${API_BASE}/api/ai/sessions`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(session),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to save chat: ${errorText}`);
    }

    const json = await res.json();

    if (!json.success) {
      throw new Error(json.error || "Failed to save chat");
    }

    return json.data;
  }

  static async deleteChatSession(sessionId) {
    const res = await fetch(`${API_BASE}/api/ai/sessions/${sessionId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to delete chat: ${errorText}`);
    }

    const json = await res.json();

    if (!json.success) {
      throw new Error(json.error || "Failed to delete chat");
    }

    return true;
  }
}
