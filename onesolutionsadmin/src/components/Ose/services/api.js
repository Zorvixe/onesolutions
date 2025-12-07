// services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_APP_URL || 'http://localhost:5002';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const discussionAPI = {
  // Threads
  getThreads: (params) => api.get('/api/admin/discussions/threads', { params }),
  getThreadById: (threadId) => api.get(`/api/admin/discussions/threads/${threadId}`),
  updateThreadStatus: (threadId, data) => 
    api.put(`/api/admin/discussions/threads/${threadId}/status`, data),
  
  // Replies
  postReply: (data) => api.post('/api/admin/discussions/replies', data),
  deleteReply: (replyId) => api.delete(`/api/admin/discussions/replies/${replyId}`),
};

export const feedbackAPI = {
  getFeedbacks: (params) => api.get('/api/admin/feedback', { params }),
  getFeedbackStats: () => api.get('/api/admin/feedback/stats'),
  getFeedbackById: (feedbackId) => api.get(`/api/admin/feedback/${feedbackId}`),
};



export default api;