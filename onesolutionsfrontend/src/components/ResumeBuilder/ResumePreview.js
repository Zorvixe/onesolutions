import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

// Import all template components
import Template1 from './Template1/Template1';
import Template2 from './Template2/Template2';
import Template3 from './Template3/Template3';
import Template4 from './Template4/Template4';
import Template5 from './Template5/Template5';
import './TemplateSelector.css'; // Reuse styles if needed

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002';

// Same template list as in TemplateSelector (ids must match)
const templates = [
  { id: 1, name: 'Classic', component: Template2 },
  { id: 2, name: 'Modern', component: Template3 },
  { id: 3, name: 'Minimal', component: Template4 },
  { id: 4, name: 'Creative', component: Template1 },
  { id: 5, name: 'Professional', component: Template5 },
];

const ResumePreview = () => {
  const { resumeId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResume();
  }, [resumeId, token]);

  const fetchResume = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/resumes/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setResume(res.data.data.resume);
      } else {
        setError('Resume not found');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load resume');
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    if (!resume) return null;

    // The resume data is stored in resume.resume_data (as per your backend)
    const resumeData = resume.resume_data || {};

    // Get the template ID from the saved data (adjust key if different)
    const templateId = resumeData.templateId || resume.template_id || 1; // fallback to 1

    // Find the template component
    const template = templates.find(t => t.id === templateId) || templates[0];
    const TemplateComponent = template.component;

    // Render the template with the resume data
    return <TemplateComponent data={resumeData} />;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => navigate('/resumes')} className="btn-primary">
          Back to Resumes
        </button>
      </div>
    );
  }

  return (
    <div className="resume-preview-container">
      {/* No header/back button – only the resume */}
      <div className="resume-preview-content">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;