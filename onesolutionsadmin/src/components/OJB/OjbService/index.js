import axios from 'axios';

const API_URL = 'https://ojbbackend.onrender.com/api';



// Admin endpoints


export const getAdminJobs = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/admin/jobs`);
    return data;
  } catch (error) {
    console.error('Error fetching admin jobs:', error);
    throw error;
  }
};

export const getAdminJobById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/admin/jobs/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching job for edit:', error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const { data } = await axios.post(`${API_URL}/admin/jobs`, jobData);
    return data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const { data } = await axios.put(`${API_URL}/admin/jobs/${id}`, jobData);
    return data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/admin/jobs/${id}`);
    return data;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

export const getAdminStats = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/admin/stats`);
    return data;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
};