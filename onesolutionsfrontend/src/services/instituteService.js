
// Base URL for your provided backend
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5002";

export class InstituteService {
  static getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  static async getProfile() {
    const res = await fetch(`${API_BASE}/student/complete-profile`, {
      headers: this.getHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    const json = await res.json();
    return json.data.student;
  }

  static async getProgress() {
    const res = await fetch(`${API_BASE}/progress/overall`, {
      headers: this.getHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch progress");
    const json = await res.json();
    return json.data;
  }

  // AI Chat Session Methods
  static async getChatSessions() {
    try {
      const res = await fetch(`${API_BASE}/ai/sessions`, {
        headers: this.getHeaders()
      });
      if (!res.ok) throw new Error("Failed to load chat history");
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error("Backend Error:", error);
      throw error;
    }
  }

  static async saveChatSession(session) {
    const res = await fetch(`${API_BASE}/ai/sessions`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(session)
    });
    if (!res.ok) throw new Error("Failed to save chat");
    const json = await res.json();
    return json.data; // Return the session object containing the real DB ID
  }

  static async deleteChatSession(sessionId) {
    const res = await fetch(`${API_BASE}/ai/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    if (!res.ok) throw new Error("Failed to delete chat");
    return true;
  }
}
