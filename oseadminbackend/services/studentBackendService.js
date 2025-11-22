const axios = require('axios');

const STUDENT_BACKEND_URL = process.env.STUDENT_BACKEND_URL || 'https://api.onesolutionsekam.in';
const ADMIN_ACCESS_TOKEN = process.env.ADMIN_ACCESS_TOKEN;

class StudentBackendService {
  constructor() {
    this.client = axios.create({
      baseURL: STUDENT_BACKEND_URL,
      timeout: 30000,
      headers: {
        'x-admin-token': ADMIN_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    });
  }

  async getThreads(filters = {}) {
    try {
      const response = await this.client.get('/api/admin/discussions/threads', {
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching threads from student backend:', error.message);
      throw new Error('Failed to fetch threads from student backend');
    }
  }

  async getThreadDetail(threadId) {
    try {
      const response = await this.client.get(`/api/admin/discussions/threads/${threadId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching thread detail from student backend:', error.message);
      throw new Error('Failed to fetch thread detail from student backend');
    }
  }

  async postAdminReply(threadId, content, adminData) {
    try {
      const response = await this.client.post('/api/admin/discussions/replies', {
        threadId,
        content,
        adminId: adminData.id,
        adminName: adminData.adminname,
        adminImage: adminData.admin_image_link
      });
      return response.data;
    } catch (error) {
      console.error('Error posting admin reply via student backend:', error.message);
      throw new Error('Failed to post admin reply');
    }
  }

  async updateThreadStatus(threadId, statusData) {
    try {
      const response = await this.client.put(`/api/admin/discussions/threads/${threadId}/status`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating thread status via student backend:', error.message);
      throw new Error('Failed to update thread status');
    }
  }
}

module.exports = new StudentBackendService();