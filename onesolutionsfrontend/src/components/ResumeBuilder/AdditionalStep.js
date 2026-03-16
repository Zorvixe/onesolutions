// src/components/ResumeBuilder/AdditionalStep.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

const AdditionalStep = ({ data, setData, onPrev, onSave, isLastStep }) => {
  const [showTips, setShowTips] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  
  // State for managing which accordion is open (null = none, or use multiple)
  const [openSections, setOpenSections] = useState({
    projects: true,
    certifications: true,
    websites: true,
    languages: true
  });

  // State for inline editing indices per section
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingCertIndex, setEditingCertIndex] = useState(null);
  const [editingWebsiteIndex, setEditingWebsiteIndex] = useState(null);
  const [editingLanguageIndex, setEditingLanguageIndex] = useState(null);

  // Get data from parent (with fallbacks)
  const additional = data.additional || {
    projects: [],
    certifications: [],
    websites: [],
    languages: []
  };
  const navigate = useNavigate();

  const handlePreview = () => {
    navigate('/resume-builder/preview', { state: { resumeData: data } });
  };

  // Fetch profile on mount if additional sections are empty
  useEffect(() => {
    const fetchProfile = async () => {
      // If any of the sections already have data, skip fetching
      if (
        additional.projects.length > 0 ||
        additional.certifications.length > 0 ||
        additional.websites.length > 0 ||
        additional.languages.length > 0
      ) {
        return;
      }

      setLoading(true);
      setFetchError("");

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE_URL}/api/student/complete-profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          const profile = res.data.data.student;

          // Map projects
          const projectsFromProfile = (profile.projects || []).map(p => ({
            title: p.projectTitle || "",
            description: p.projectDescription || "",
            link: p.projectLink || "",
            skills: p.skills || []
          }));

          // Map achievements -> certifications
          const certificationsFromProfile = (profile.achievements || []).map(a => ({
            title: a.achievementTitle || "",
            description: a.achievementDescription || "",
            link: a.achievementLink || "",
            date: a.achievementDate || ""
          }));

          // Websites: collect relevant links if they exist
          const websitesFromProfile = [];
          if (profile.linkedinProfileUrl) {
            websitesFromProfile.push({ label: "LinkedIn", url: profile.linkedinProfileUrl });
          }
          if (profile.githubProfileUrl) {
            websitesFromProfile.push({ label: "GitHub", url: profile.githubProfileUrl });
          }
          if (profile.portfolioUrl) { // not in profile yet, but possible
            websitesFromProfile.push({ label: "Portfolio", url: profile.portfolioUrl });
          }
          if (profile.codePlaygroundUsername) {
            websitesFromProfile.push({
              label: "Code Playground",
              url: `https://code.onesolutions.com/${profile.codePlaygroundUsername}`
            });
          }

          // Languages: from preferredLanguages, without proficiency
          const languagesFromProfile = (profile.preferredLanguages || []).map(lang => ({
            language: lang,
            proficiency: "Fluent" // default
          }));

          setData(prev => ({
            ...prev,
            additional: {
              projects: projectsFromProfile,
              certifications: certificationsFromProfile,
              websites: websitesFromProfile,
              languages: languagesFromProfile
            }
          }));
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
        setFetchError("Could not load profile data. Please add your details manually.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [additional, setData]);

  // Toggle accordion sections
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Generic update functions for each section
  const updateProjects = (newProjects) => {
    setData(prev => ({
      ...prev,
      additional: { ...prev.additional, projects: newProjects }
    }));
  };

  const updateCertifications = (newCerts) => {
    setData(prev => ({
      ...prev,
      additional: { ...prev.additional, certifications: newCerts }
    }));
  };

  const updateWebsites = (newWebsites) => {
    setData(prev => ({
      ...prev,
      additional: { ...prev.additional, websites: newWebsites }
    }));
  };

  const updateLanguages = (newLanguages) => {
    setData(prev => ({
      ...prev,
      additional: { ...prev.additional, languages: newLanguages }
    }));
  };

  // --- Project CRUD ---
  const addProject = () => {
    const newProject = { title: "", description: "", link: "", skills: [] };
    updateProjects([...additional.projects, newProject]);
    setEditingProjectIndex(additional.projects.length); // index of new item
  };

  const updateProjectField = (index, field, value) => {
    const updated = additional.projects.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    updateProjects(updated);
  };

  const removeProject = (index) => {
    updateProjects(additional.projects.filter((_, i) => i !== index));
    if (editingProjectIndex === index) setEditingProjectIndex(null);
  };

  const saveProject = (index) => {
    setEditingProjectIndex(null);
  };

  const cancelProjectEdit = (index) => {
    // If the project is empty (all fields blank), remove it
    const project = additional.projects[index];
    if (project && !project.title && !project.description && !project.link && project.skills.length === 0) {
      removeProject(index);
    } else {
      setEditingProjectIndex(null);
    }
  };

  // --- Certification CRUD ---
  const addCertification = () => {
    const newCert = { title: "", description: "", link: "", date: "" };
    updateCertifications([...additional.certifications, newCert]);
    setEditingCertIndex(additional.certifications.length);
  };

  const updateCertField = (index, field, value) => {
    const updated = additional.certifications.map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    );
    updateCertifications(updated);
  };

  const removeCertification = (index) => {
    updateCertifications(additional.certifications.filter((_, i) => i !== index));
    if (editingCertIndex === index) setEditingCertIndex(null);
  };

  const saveCertification = (index) => {
    setEditingCertIndex(null);
  };

  const cancelCertEdit = (index) => {
    const cert = additional.certifications[index];
    if (cert && !cert.title && !cert.description && !cert.link && !cert.date) {
      removeCertification(index);
    } else {
      setEditingCertIndex(null);
    }
  };

  // --- Website CRUD ---
  const addWebsite = () => {
    const newWebsite = { label: "", url: "" };
    updateWebsites([...additional.websites, newWebsite]);
    setEditingWebsiteIndex(additional.websites.length);
  };

  const updateWebsiteField = (index, field, value) => {
    const updated = additional.websites.map((w, i) =>
      i === index ? { ...w, [field]: value } : w
    );
    updateWebsites(updated);
  };

  const removeWebsite = (index) => {
    updateWebsites(additional.websites.filter((_, i) => i !== index));
    if (editingWebsiteIndex === index) setEditingWebsiteIndex(null);
  };

  const saveWebsite = (index) => {
    setEditingWebsiteIndex(null);
  };

  const cancelWebsiteEdit = (index) => {
    const website = additional.websites[index];
    if (website && !website.label && !website.url) {
      removeWebsite(index);
    } else {
      setEditingWebsiteIndex(null);
    }
  };

  // --- Language CRUD ---
  const addLanguage = () => {
    const newLang = { language: "", proficiency: "Fluent" };
    updateLanguages([...additional.languages, newLang]);
    setEditingLanguageIndex(additional.languages.length);
  };

  const updateLanguageField = (index, field, value) => {
    const updated = additional.languages.map((l, i) =>
      i === index ? { ...l, [field]: value } : l
    );
    updateLanguages(updated);
  };

  const removeLanguage = (index) => {
    updateLanguages(additional.languages.filter((_, i) => i !== index));
    if (editingLanguageIndex === index) setEditingLanguageIndex(null);
  };

  const saveLanguage = (index) => {
    setEditingLanguageIndex(null);
  };

  const cancelLanguageEdit = (index) => {
    const lang = additional.languages[index];
    if (lang && !lang.language) {
      removeLanguage(index);
    } else {
      setEditingLanguageIndex(null);
    }
  };

  // Proficiency options
  const proficiencyOptions = ["Basic", "Conversational", "Fluent", "Native"];

  // Rendering helpers
  const renderProjectForm = (project, index) => (
    <div key={index} className="res-build-edit-form" style={{ padding: "1rem", background: "#f9f9f9", borderRadius: "8px", marginBottom: "1rem" }}>
      <div className="res-build-form-grid-custom">
        <div className="res-build-input-group">
          <label>Project Title</label>
          <input
            type="text"
            className="res-build-input-field"
            value={project.title}
            onChange={(e) => updateProjectField(index, "title", e.target.value)}
            placeholder="E.g., E-commerce Website"
          />
        </div>
        <div className="res-build-input-group">
          <label>Project Link</label>
          <input
            type="url"
            className="res-build-input-field"
            value={project.link}
            onChange={(e) => updateProjectField(index, "link", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="res-build-input-group full-width">
          <label>Description</label>
          <textarea
            className="res-build-input-field"
            rows="3"
            value={project.description}
            onChange={(e) => updateProjectField(index, "description", e.target.value)}
            placeholder="Describe your project..."
          />
        </div>
        <div className="res-build-input-group full-width">
          <label>Skills (comma separated)</label>
          <input
            type="text"
            className="res-build-input-field"
            value={project.skills.join(", ")}
            onChange={(e) => updateProjectField(index, "skills", e.target.value.split(",").map(s => s.trim()))}
            placeholder="React, Node.js, MongoDB"
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button className="res-build-btn-text-action" onClick={() => cancelProjectEdit(index)}>Cancel</button>
        <button className="res-build-btn-next" onClick={() => saveProject(index)}>Save</button>
      </div>
    </div>
  );

  const renderProjectCard = (project, index) => (
    <div key={index} className="res-build-project-card" style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h4 style={{ margin: "0 0 0.5rem 0" }}>{project.title}</h4>
        <div>
          <button className="res-build-btn-text-action blue" onClick={() => setEditingProjectIndex(index)}>Edit</button>
          <button className="res-build-btn-text-action red" onClick={() => removeProject(index)}>Remove</button>
        </div>
      </div>
      <p style={{ color: "#4b5563" }}>{project.description}</p>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", display: "inline-block", marginBottom: "0.5rem" }}>
          🔗 Project Link
        </a>
      )}
      {project.skills && project.skills.length > 0 && (
        <div>
          <strong>Skills:</strong> {project.skills.join(", ")}
        </div>
      )}
    </div>
  );

  const renderCertificationForm = (cert, index) => (
    <div key={index} className="res-build-edit-form" style={{ padding: "1rem", background: "#f9f9f9", borderRadius: "8px", marginBottom: "1rem" }}>
      <div className="res-build-form-grid-custom">
        <div className="res-build-input-group">
          <label>Certification Title</label>
          <input
            type="text"
            className="res-build-input-field"
            value={cert.title}
            onChange={(e) => updateCertField(index, "title", e.target.value)}
            placeholder="E.g., AWS Certified Developer"
          />
        </div>
        <div className="res-build-input-group">
          <label>Link</label>
          <input
            type="url"
            className="res-build-input-field"
            value={cert.link}
            onChange={(e) => updateCertField(index, "link", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="res-build-input-group">
          <label>Date</label>
          <input
            type="text"
            className="res-build-input-field"
            value={cert.date}
            onChange={(e) => updateCertField(index, "date", e.target.value)}
            placeholder="YYYY-MM or YYYY"
          />
        </div>
        <div className="res-build-input-group full-width">
          <label>Description</label>
          <textarea
            className="res-build-input-field"
            rows="2"
            value={cert.description}
            onChange={(e) => updateCertField(index, "description", e.target.value)}
            placeholder="Optional description"
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button className="res-build-btn-text-action" onClick={() => cancelCertEdit(index)}>Cancel</button>
        <button className="res-build-btn-next" onClick={() => saveCertification(index)}>Save</button>
      </div>
    </div>
  );

  const renderCertificationCard = (cert, index) => (
    <div key={index} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h4 style={{ margin: "0 0 0.25rem 0" }}>{cert.title}</h4>
          {cert.date && <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{cert.date}</span>}
        </div>
        <div>
          <button className="res-build-btn-text-action blue" onClick={() => setEditingCertIndex(index)}>Edit</button>
          <button className="res-build-btn-text-action red" onClick={() => removeCertification(index)}>Remove</button>
        </div>
      </div>
      {cert.description && <p style={{ color: "#4b5563", marginTop: "0.5rem" }}>{cert.description}</p>}
      {cert.link && (
        <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>🔗 View Certificate</a>
      )}
    </div>
  );

  const renderWebsiteForm = (website, index) => (
    <div key={index} className="res-build-edit-form" style={{ padding: "1rem", background: "#f9f9f9", borderRadius: "8px", marginBottom: "1rem" }}>
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>Label</label>
          <input
            type="text"
            className="res-build-input-field"
            value={website.label}
            onChange={(e) => updateWebsiteField(index, "label", e.target.value)}
            placeholder="GitHub"
          />
        </div>
        <div className="res-build-input-group">
          <label>URL</label>
          <input
            type="url"
            className="res-build-input-field"
            value={website.url}
            onChange={(e) => updateWebsiteField(index, "url", e.target.value)}
            placeholder="https://github.com/username"
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button className="res-build-btn-text-action" onClick={() => cancelWebsiteEdit(index)}>Cancel</button>
        <button className="res-build-btn-next" onClick={() => saveWebsite(index)}>Save</button>
      </div>
    </div>
  );

  const renderWebsiteCard = (website, index) => (
    <div key={index} style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <strong>{website.label}:</strong> <a href={website.url} target="_blank" rel="noopener noreferrer">{website.url}</a>
      </div>
      <div>
        <button className="res-build-btn-text-action blue" onClick={() => setEditingWebsiteIndex(index)}>Edit</button>
        <button className="res-build-btn-text-action red" onClick={() => removeWebsite(index)}>Remove</button>
      </div>
    </div>
  );

  const renderLanguageForm = (lang, index) => (
    <div key={index} className="res-build-edit-form" style={{ padding: "1rem", background: "#f9f9f9", borderRadius: "8px", marginBottom: "1rem" }}>
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>Language</label>
          <input
            type="text"
            className="res-build-input-field"
            value={lang.language}
            onChange={(e) => updateLanguageField(index, "language", e.target.value)}
            placeholder="English"
          />
        </div>
        <div className="res-build-input-group">
          <label>Proficiency</label>
          <select
            className="res-build-input-field"
            value={lang.proficiency}
            onChange={(e) => updateLanguageField(index, "proficiency", e.target.value)}
          >
            {proficiencyOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button className="res-build-btn-text-action" onClick={() => cancelLanguageEdit(index)}>Cancel</button>
        <button className="res-build-btn-next" onClick={() => saveLanguage(index)}>Save</button>
      </div>
    </div>
  );

  const renderLanguageCard = (lang, index) => (
    <div key={index} style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <strong>{lang.language}</strong> – {lang.proficiency}
      </div>
      <div>
        <button className="res-build-btn-text-action blue" onClick={() => setEditingLanguageIndex(index)}>Edit</button>
        <button className="res-build-btn-text-action red" onClick={() => removeLanguage(index)}>Remove</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="res-build-step-header-row">
        <div className="res-build-step-title-area">
          <div className="res-build-step-icon-box">📋</div>
          <div>
            <h2>Choose your section</h2>
            <p>Based on company expectation we recommend including the section below</p>
          </div>
        </div>
        <button className="res-build-btn-tips" onClick={() => setShowTips(!showTips)}>💡 Tips</button>
      </div>

      {showTips && (
        <div className="res-build-expert-insight-card">
          <h3>💡 Expert Insight</h3>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Use Clear Project Title</h4>
              <p>Include relevant keywords such as "E-commerce Web Application or Social Media Dashboard" to increase ATS keyword match.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Describe Your Role and Impact</h4>
              <p>Begin each project with a brief description of your role and specific contributions. For example: "Led the development of a full-stack E-commerce website using React, Node.js, and MongoDB."</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>List Skills Gained By Certification</h4>
              <p>Instead of listing certificates without context, briefly mention what skills each certificate represents.</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="res-build-loading" style={{ padding: "1rem", textAlign: "center" }}>
          Loading your profile...
        </div>
      )}

      {fetchError && (
        <div className="res-build-error" style={{ color: "#d32f2f", padding: "0.5rem 0" }}>
          {fetchError}
        </div>
      )}

      {/* Projects Accordion */}
      <div className="res-build-accordion-item" >
        <div className="res-build-accordion-header" onClick={() => toggleSection('projects')}>
          <div className="res-build-accordion-title">
            <span style={{ marginRight: '8px' }}>🌐</span> Projects
          </div>
          <div>{openSections.projects ? '⌃' : '⌄'}</div>
        </div>
        {openSections.projects && (
          <div style={{ padding: '1rem 1.5rem 1rem' }}>
            {additional.projects.map((project, idx) =>
              editingProjectIndex === idx
                ? renderProjectForm(project, idx)
                : renderProjectCard(project, idx)
            )}
            {editingProjectIndex === null && (
              <button className="res-build-btn-add-ghost" onClick={addProject}>+ Add Project</button>
            )}
          </div>
        )}
      </div>

      {/* Certifications Accordion */}
      <div className="res-build-accordion-item">
        <div className="res-build-accordion-header" onClick={() => toggleSection('certifications')}>
          <div className="res-build-accordion-title">
            <span style={{ marginRight: '8px' }}>📜</span> Certifications <span className="res-build-badge-recommended" style={{ marginLeft: '10px' }}>Recommended</span>
          </div>
          <div>{openSections.certifications ? '⌃' : '⌄'}</div>
        </div>
        {openSections.certifications && (
          <div style={{ padding: '1rem 1.5rem 1rem' }}>
            {additional.certifications.map((cert, idx) =>
              editingCertIndex === idx
                ? renderCertificationForm(cert, idx)
                : renderCertificationCard(cert, idx)
            )}
            {editingCertIndex === null && (
              <button className="res-build-btn-add-ghost" onClick={addCertification}>+ Add Certification</button>
            )}
          </div>
        )}
      </div>

      {/* Websites Accordion */}
      <div className="res-build-accordion-item">
        <div className="res-build-accordion-header" onClick={() => toggleSection('websites')}>
          <div className="res-build-accordion-title">
            <span style={{ marginRight: '8px' }}>🔗</span> Websites <span className="res-build-badge-recommended" style={{ marginLeft: '10px' }}>Recommended</span>
          </div>
          <div>{openSections.websites ? '⌃' : '⌄'}</div>
        </div>
        {openSections.websites && (
          <div style={{ padding: '1rem 1.5rem 1rem' }}>
            {additional.websites.map((website, idx) =>
              editingWebsiteIndex === idx
                ? renderWebsiteForm(website, idx)
                : renderWebsiteCard(website, idx)
            )}
            {editingWebsiteIndex === null && (
              <button className="res-build-btn-add-ghost" onClick={addWebsite}>+ Add Website</button>
            )}
          </div>
        )}
      </div>

      {/* Languages Accordion */}
      <div className="res-build-accordion-item">
        <div className="res-build-accordion-header" onClick={() => toggleSection('languages')}>
          <div className="res-build-accordion-title">
            <span style={{ marginRight: '8px' }}>🔤</span> Languages
          </div>
          <div>{openSections.languages ? '⌃' : '⌄'}</div>
        </div>
        {openSections.languages && (
          <div style={{ padding: '1rem 1.5rem 1rem' }}>
            {additional.languages.map((lang, idx) =>
              editingLanguageIndex === idx
                ? renderLanguageForm(lang, idx)
                : renderLanguageCard(lang, idx)
            )}
            {editingLanguageIndex === null && (
              <button className="res-build-btn-add-ghost" onClick={addLanguage}>+ Add Language</button>
            )}
          </div>
        )}
      </div>

      <div className="res-build-step-footer-actions">
        <button className="res-build-btn-back" onClick={onPrev}>← Back</button>
        <button
          className="res-build-btn-next"
          onClick={() => {
            onSave();
            handlePreview();
          }}
        >
          Next: Preview
        </button>

      </div>
    </>
  );
};

export default AdditionalStep;