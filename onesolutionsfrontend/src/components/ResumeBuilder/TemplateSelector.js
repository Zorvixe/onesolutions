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
  { id: 1, name: 'Classic', component: Template2, thumbnail: '/assets/resume/resume_1.png' },
  { id: 2, name: 'Modern', component: Template3, thumbnail: '/assets/resume/resume_2.png' },
  { id: 3, name: 'Minimal', component: Template4, thumbnail: '/assets/resume/resume_3.png' },
  { id: 4, name: 'Creative', component: Template1, thumbnail: '/assets/resume/resume_4.png' },
  { id: 5, name: 'Professional', component: Template5, thumbnail: '/assets/resume/resume_5.png' },
];

const TemplateSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resumeId } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const resumeData = location.state?.resumeData || {};

  const handleTemplateSelect = (index) => setSelectedTemplate(index);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You must be logged in to download PDF');
        setDownloading(false);
        return;
      }

      console.log('📥 Downloading PDF with template:', templates[selectedTemplate].id);

      // Create a blob URL directly from the response
      const response = await fetch(`${API_BASE_URL}/api/resumes/generate-pdf`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          resumeData: {
            ...resumeData,
            templateId: templates[selectedTemplate].id
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      // Get the response as blob
      const blob = await response.blob();

      // Check if it's actually a PDF
      if (blob.type !== 'application/pdf' && !blob.type.includes('pdf')) {
        // If it's not a PDF, try to read as text to see error
        const text = await blob.text();
        console.error('Received non-PDF response:', text);
        throw new Error('Server returned non-PDF response');
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.header?.fullName || 'resume'}-${templates[selectedTemplate].name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('✅ PDF downloaded successfully');

    } catch (error) {
      console.error('PDF download failed:', error);

      let errorMessage = 'Failed to download PDF. ';

      if (error.message.includes('401')) {
        errorMessage += 'Your session has expired. Please login again.';
      } else if (error.message.includes('500')) {
        errorMessage += 'Server error. Please try again later.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }

      setError(errorMessage);
    } finally {
      setDownloading(false);
    }
  };

  const handleSaveResume = async () => {
    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You must be logged in to save resume');
        setSaving(false);
        return;
      }

      const dataToSave = {
        ...resumeData,
        templateId: templates[selectedTemplate].id,
      };

      let response;
      if (resumeId) {
        response = await axios.put(
          `${API_BASE_URL}/api/resumes/${resumeId}`,
          { resume_data: dataToSave },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.post(
          `${API_BASE_URL}/api/resumes`,
          {
            title: resumeData.header?.fullName || 'Untitled Resume',
            target_role: resumeData.header?.designation || '',
            company: '',
            prefill: false,
            resume_data: dataToSave
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.success) {
        navigate('/resumes');
      }
    } catch (error) {
      console.error('Save failed', error);

      let errorMessage = 'Failed to save resume. ';
      if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      }

      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const SelectedTemplateComponent = templates[selectedTemplate].component;

  return (
    <div className="theme-select">
      {error && (
        <div className="theme-select-error" style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#ff4444',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          maxWidth: '400px',
          wordBreak: 'break-word'
        }}>
          {error}
          <button onClick={() => setError('')} style={{
            marginLeft: '10px',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>×</button>
        </div>
      )}

      <div className="theme-select-preview-area">
        <div className="theme-select-preview-header">
          <button onClick={handleBack} className="theme-select-btn-back">← Back</button>
          <button
            onClick={async () => {
              await handleSaveResume();
              handleDownloadPDF();
            }}
            className="theme-select-btn-download flex items-center justify-center gap-2"
            disabled={downloading}
          >
            {downloading ? (
              <div className="loading-container">
                <div className="spinner"></div>
              </div>
            ) : (
              "Download PDF"
            )}
          </button>
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
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TemplateSelector;