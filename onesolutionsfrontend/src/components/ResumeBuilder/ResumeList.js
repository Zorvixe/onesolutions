// src/components/ResumeBuilder/ResumeList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

// Import template components for preview fallback
import Template1 from './Template1/Template1';
import Template2 from './Template2/Template2';
import Template3 from './Template3/Template3';
import Template4 from './Template4/Template4';
import Template5 from './Template5/Template5';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002';

// Template thumbnails and components – same as in TemplateSelector
const templates = [
  { id: 1, name: 'Classic', component: Template2, thumbnail: '/assets/resume/resume_1.png' },
  { id: 2, name: 'Modern', component: Template3, thumbnail: '/assets/resume/resume_2.png' },
  { id: 3, name: 'Minimal', component: Template4, thumbnail: '/assets/resume/resume_3.png' },
  { id: 4, name: 'Creative', component: Template1, thumbnail: '/assets/resume/resume_4.png' },
  { id: 5, name: 'Professional', component: Template5, thumbnail: '/assets/resume/resume_5.png' },
];

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [resumeDetailsMap, setResumeDetailsMap] = useState({});

  useEffect(() => {
    fetchResumes();
  }, [token]);

  const fetchResumes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/resumes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const resumesList = res.data.data.resumes;
        setResumes(resumesList);

        // 🔥 FETCH FULL DATA FOR EACH RESUME
        const detailsPromises = resumesList.map(r =>
          axios.get(`${API_BASE_URL}/api/resumes/${r.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const detailsResponses = await Promise.all(detailsPromises);

        const detailsMap = {};
        detailsResponses.forEach((res, index) => {
          const id = resumesList[index].id;
          detailsMap[id] = res.data.data.resume;
        });

        setResumeDetailsMap(detailsMap);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/resumes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(resumes.filter(r => r.id !== id));
      setActiveMenu(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete resume');
    }
  };

  const handleCreateNew = () => {
    navigate('/resume-builder/new');
  };

  const handleDownload = async (resumeId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/resumes/${resumeId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume-${resumeId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      setActiveMenu(null);
    } catch (err) {
      console.error(err);
      alert('Download failed');
    }
  };

  const handlePreview = (resumeId) => {
    navigate(`/resume/preview/${resumeId}`);
    setActiveMenu(null);
  };

  const handleEdit = (resumeId) => {
    navigate(`/resume-builder/${resumeId}`);
    setActiveMenu(null);
  };

  const toggleMenu = (e, resumeId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === resumeId ? null : resumeId);
  };

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Helper to get the preview content for a card
  const getCardPreview = (resume) => {
    if (resume.thumbnail_url || resume.image_url) {
      return (
        <img 
          src={resume.thumbnail_url || resume.image_url} 
          alt="Resume Preview" 
          className="res-img" 
        />
      );
    }

    try {
      const fullResume = resumeDetailsMap[resume.id];

      if (!fullResume) {
        return <div className="res-loading">Loading...</div>;
      }

      // ✅ EXACT SAME AS PREVIEW
      const resumeData = fullResume.resume_data || {};

      const templateId =
        resumeData.templateId ||
        fullResume.template_id ||
        1;

      const template =
        templates.find(t => t.id === templateId) || templates[0];

      const TemplateComponent = template.component;

      return (
        <div className="res-template-preview-wrapper">
          <div className="res-template-preview-scale">
            <TemplateComponent data={resumeData} />
          </div>
        </div>
      );

    } catch (e) {
      console.error("Preview error:", e);
    }

    const DefaultTemplate = templates[0].component;

    return (
      <div className="res-template-preview-wrapper">
        <div className="res-template-preview-scale">
          <DefaultTemplate data={{}} />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="res-list-container">
      
      {/* --- NEW: MASTER RESUME INFO BOX --- */}
      <div className="master-resume-info-box" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
      }}>
        <div className="info-text-content" style={{ flex: 1, paddingRight: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
            <span role="img" aria-label="point" style={{ fontSize: '20px' }}>👉🏻</span> How Master resume will work?
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ minWidth: '6px', height: '6px', backgroundColor: '#3b82f6', borderRadius: '50%', marginTop: '8px' }}></div>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#374151', lineHeight: '1.6' }}>
                <strong>A Master Resume</strong> is your all-in-one resume that stores your complete <strong>career details , skills, education, projects, and experience</strong>. It's the base version from which AI creates tailored resumes for different job roles.
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ minWidth: '6px', height: '6px', backgroundColor: '#3b82f6', borderRadius: '50%', marginTop: '8px' }}></div>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#374151', lineHeight: '1.6' }}>
                <strong>For Example :</strong> Suppose you are applying for frontend position<br/>
                From your Master Resume, AI will highlight skills like JavaScript, React, HTML, CSS, Tailwind, and Responsive UI Design.The final tailored resume focuses on your frontend expertise.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right side illustration image */}
        <div className="info-image-content" style={{ flexShrink: 0, width: '320px', display: 'flex', justifyContent: 'center' }}>
           {/* NOTE: Update this src path to match where you save the right-side illustration image from your design */}
          <img src="/assets/resume/master-resume.png" alt="Resume Branches Illustration" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
      {/* --- END: MASTER RESUME INFO BOX --- */}


      {resumes.length === 0 ? (
        <div className="res-list-empty" onClick={handleCreateNew} style={{ cursor: 'pointer' }}>
          <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
          </svg>
          <h2>Create Your First Resume</h2>
          <p>Get started by creating a professional resume that stands out</p>
         
        </div>
      ) : (
        <div className="res-list-grid">
          {/* Add New Resume Card */}
          <div className="res-card new-card" onClick={handleCreateNew}>
            <div className="new-card-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              <h4>Create New Resume</h4>
              <p>Start from scratch</p>
            </div>
          </div>

          {/* Existing Resumes */}
          {resumes.map(resume => (
            <div 
              key={resume.id} 
              className="res-card"
              onMouseEnter={() => setHoveredCard(resume.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="res-card-preview" onClick={() => handlePreview(resume.id)}>
                {getCardPreview(resume)}
                
                <div className="res-card-info-overlay">
                  <h4>{resume.title || 'Untitled Resume'}</h4>
                  {resume.target_role && <p>{resume.target_role}</p>}
                </div>
              </div>
              
              <div className="res-card-footer">
                <div className="res-date">
                  Updated {new Date(resume.updated_at).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </div>
                
                <div className="res-menu-container">
                  {(hoveredCard === resume.id || activeMenu === resume.id) && (
                    <button className="res-menu-btn" onClick={(e) => toggleMenu(e, resume.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                      </svg>
                    </button>
                  )}
                  
                  {activeMenu === resume.id && (
                    <div className="res-dropdown">
                      <button onClick={() => handlePreview(resume.id)} className="dropdown-item">
                        Preview
                      </button>
                      <button onClick={() => handleEdit(resume.id)} className="dropdown-item">
                        Edit
                      </button>
                      <button onClick={() => handleDownload(resume.id)} className="dropdown-item">
                        Download PDF
                      </button>
                      <div className="dropdown-divider"></div>
                      <button onClick={() => handleDelete(resume.id)} className="dropdown-item text-danger">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeList;