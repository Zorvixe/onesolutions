import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Template1 from './Template1/Template1';
import Template2 from './Template2/Template2';
import Template3 from './Template3/Template3';
import Template4 from './Template4/Template4';
import Template5 from './Template5/Template5';
import './TemplateSelector.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002';

const templates = [
  { id: 1, name: 'Classic', component: Template1, thumbnail: '/assets/resume/resume_4.png' },
  { id: 2, name: 'Modern', component: Template2, thumbnail: '/assets/resume/resume_1.png' },
  { id: 3, name: 'Minimal', component: Template3, thumbnail: '/assets/resume/resume_2.png' },
  { id: 4, name: 'Creative', component: Template4, thumbnail: '/assets/resume/resume_3.png' },
  { id: 5, name: 'Professional', component: Template5, thumbnail: '/assets/resume/resume_5.png' },
];

const TemplateSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resumeId } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState(0); // index 0
  const [saving, setSaving] = useState(false);

  // Resume data passed from the builder (via location.state)
  const resumeData = location.state?.resumeData || {};

  const handleTemplateSelect = (index) => setSelectedTemplate(index);

  const handleBack = () => {
    navigate(-1); // go back to builder
  };

  const handleDownloadPDF = () => {
    window.print(); // uses print styles – ensure @page size A4 in CSS
  };

  const handleSaveResume = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      // Add template selection to resume data
      const dataToSave = {
        ...resumeData,
        templateId: templates[selectedTemplate].id,
      };

      let response;
      if (resumeId) {
        // Update existing resume
        response = await axios.put(
          `${API_BASE_URL}/api/resumes/${resumeId}`,
          { resume_data: dataToSave },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new resume
        response = await axios.post(
          `${API_BASE_URL}/api/resumes`,
          { 
            title: resumeData.header?.title || 'Untitled Resume',
            target_role: resumeData.header?.title,
            company: '',
            prefill: false,
            resume_data: dataToSave 
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.success) {
        navigate('/resumes'); // go to resume list
      }
    } catch (error) {
      console.error('Save failed', error);
    } finally {
      setSaving(false);
    }
  };

  const SelectedTemplateComponent = templates[selectedTemplate].component;

  return (
    <div className="theme-select">
      <div className="theme-select-preview-area">
        <div className="theme-select-preview-header">
          <button onClick={handleBack} className="theme-select-btn-back">← Back</button>
          <button onClick={handleDownloadPDF} className="theme-select-btn-download">PDF</button>
        </div>
        <div className="theme-select-preview-content">
          <SelectedTemplateComponent data={resumeData} />
        </div>
      </div>

      <div className="theme-select-thumbnails-area">
        <div className="theme-select-thumbnails-list">
          {templates.map((template, idx) => (
            <div
              key={template.id}
              className={`theme-select-thumbnail-card ${selectedTemplate === idx ? 'active' : ''}`}
              onClick={() => handleTemplateSelect(idx)}
            >
              <img src={template.thumbnail} alt={template.name} />
              <p>{template.name}</p>
            </div>
          ))}
        </div>
        <div className="theme-select-action-buttons">
          <button onClick={handleSaveResume} className="theme-select-btn-save" disabled={saving}>
            {saving ? 'Saving...' : 'Save Resume'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;