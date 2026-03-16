// src/components/ResumeBuilder/ResumeList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchResumes();
  }, [token]);

  const fetchResumes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/resumes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setResumes(res.data.data.resumes);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/resumes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(resumes.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNew = () => {
    window.location.href = '/resume-builder/new';
  }

  if (loading) return <div className="res-build-loading-spinner">Loading...</div>;

  return (
    <div className="res-build-list-container">
      {resumes.length === 0 ? (
        <div className="res-build-empty-state" onClick={handleCreateNew}>
          <button className="res-build-new-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
          <h1>Create New</h1>
          <p>You haven't created any resumes yet.</p>
        </div>
      ) : (
        <div className="res-build-resume-grid">
          {resumes.map(resume => (
            <div key={resume.id} className="res-build-resume-card">
              <h3>{resume.title}</h3>
              {resume.target_role && <p>{resume.target_role}</p>}
              {resume.company && <p>{resume.company}</p>}
              <p>Last updated: {new Date(resume.updated_at).toLocaleDateString()}</p>
              <div className="res-build-card-actions">
                <Link to={`/resume-builder/${resume.id}`} className="res-build-btn-edit">Edit</Link>
                <button onClick={() => handleDelete(resume.id)} className="res-build-btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeList;