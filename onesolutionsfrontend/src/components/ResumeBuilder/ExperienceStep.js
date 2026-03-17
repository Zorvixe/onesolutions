// src/components/ResumeBuilder/ExperienceStep.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

const ExperienceStep = ({ data, setData, onNext, onPrev }) => {
  const [showTips, setShowTips] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // index of experience being edited, null if none
  const importedRef = useRef(false); // prevent duplicate imports

  const experiences = data.experience || [];

  // Fetch profile on mount and prefill if no experiences exist
  useEffect(() => {
    const importFromProfile = async () => {
      if (importedRef.current || experiences.length > 0) return;

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
          const workExps = profile.workExperiences || [];

          if (workExps.length > 0) {
            // Map profile work experiences to resume format
            const mapped = workExps.map((exp) => ({
              title: exp.job_role || "",
              company: exp.company_name || "",
              location: exp.work_location || "",
              startDate: exp.start_date || "",
              endDate: exp.end_date || "",
              description: exp.role_description || "",
              // Keep original data for potential future use
              _original: exp,
            }));

            setData((prev) => ({
              ...prev,
              experience: mapped,
            }));
          } else {
            // No work experiences, ensure array exists
            if (!data.experience) {
              setData((prev) => ({
                ...prev,
                experience: [],
              }));
            }
          }
          importedRef.current = true;
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
        setFetchError("Could not load profile data. Please add your experiences manually.");
      } finally {
        setLoading(false);
      }
    };

    importFromProfile();
  }, [data.experience, setData, experiences.length]);

  const addExperience = () => {
    const newExp = {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setData((prev) => ({
      ...prev,
      experience: [...(prev.experience || []), newExp],
    }));
    const newIndex = experiences.length; // because we haven't updated experiences yet in this render cycle
    setEditingIndex(newIndex);
  };

  const updateExperience = (index, field, value) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (index) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const saveEdit = (index) => {
    setEditingIndex(null);
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr;
  };

  const renderExperienceForm = (exp, index) => (
    <div key={index} className="res-build-exp-edit-card" style={{ marginBottom: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1.5rem", background: "#fff" }}>
      <div className="res-build-form-grid-custom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div className="res-build-input-group">
          <label>Job Title</label>
          <input
            type="text"
            className="res-build-input-field"
            value={exp.title}
            onChange={(e) => updateExperience(index, "title", e.target.value)}
            placeholder="e.g., Frontend Developer"
          />
        </div>
        <div className="res-build-input-group">
          <label>Company</label>
          <input
            type="text"
            className="res-build-input-field"
            value={exp.company}
            onChange={(e) => updateExperience(index, "company", e.target.value)}
            placeholder="Company name"
          />
        </div>
        <div className="res-build-input-group">
          <label>Location</label>
          <input
            type="text"
            className="res-build-input-field"
            value={exp.location}
            onChange={(e) => updateExperience(index, "location", e.target.value)}
            placeholder="City, State"
          />
        </div>
        <div className="res-build-form-row-2" style={{ display: "flex", gap: "0.5rem" }}>
          <div className="res-build-input-group" style={{ flex: 1 }}>
            <label>Start Date</label>
            <input
              type="text"
              className="res-build-input-field"
              value={exp.startDate}
              onChange={(e) => updateExperience(index, "startDate", e.target.value)}
              placeholder="MMM YYYY"
            />
          </div>
          <div className="res-build-input-group" style={{ flex: 1 }}>
            <label>End Date</label>
            <input
              type="text"
              className="res-build-input-field"
              value={exp.endDate}
              onChange={(e) => updateExperience(index, "endDate", e.target.value)}
              placeholder="Present or MMM YYYY"
            />
          </div>
        </div>
        <div className="res-build-input-group" style={{ gridColumn: "span 2" }}>
          <label>Description</label>
          <textarea
            className="res-build-input-field"
            rows="4"
            value={exp.description}
            onChange={(e) => updateExperience(index, "description", e.target.value)}
            placeholder="Describe your responsibilities and achievements..."
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
        <button className="res-build-btn-text-action" onClick={() => cancelEdit()}>
          Cancel
        </button>
        <button className="res-build-btn-next" onClick={() => saveEdit(index)}>
          Save
        </button>
      </div>
    </div>
  );

  const renderExperienceCard = (exp, index) => (
    <div key={index} className="res-build-exp-preview-card">
      <div className="res-build-exp-header">
        <div>
          <h3 className="res-build-exp-title">{exp.title || "Untitled Position"}</h3>
          <p className="res-build-exp-company">{exp.company || "Company name"}</p>
        </div>
        <div className="res-build-exp-dates-loc">
          {formatDisplayDate(exp.startDate)} - {formatDisplayDate(exp.endDate)}<br />
          {exp.location || "Location"}
        </div>
      </div>
      <p className="res-build-exp-desc">{exp.description || "No description provided."}</p>

      <div className="res-build-exp-actions">
        <button className="res-build-btn-text-action purple">✨ AI Tailor</button>
        <button
          className="res-build-btn-text-action blue"
          onClick={() => startEdit(index)}
        >
          📝 Edit
        </button>
        <button
          className="res-build-btn-text-action red"
          onClick={() => removeExperience(index)}
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="res-build-step-header-row">
        <div className="res-build-step-title-area">
          <div className="res-build-step-icon-box">💻</div>
          <div>
            <h2>Let's work on your experience</h2>
            <p>Start with your most recent job first</p>
          </div>
        </div>
        <button className="res-build-btn-tips" onClick={() => setShowTips(!showTips)}>
          💡 Tips
        </button>
      </div>

      {showTips && (
        <div className="res-build-expert-insight-card">
          <h3>💡 Expert Insight</h3>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Keep it relevant</h4>
              <p>Focus on experiences that are most relevant to the job you're applying for.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Use action verbs</h4>
              <p>Start bullet points with strong action verbs like 'Led', 'Developed', 'Implemented'.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Quantify achievements</h4>
              <p>Include numbers and metrics to demonstrate your impact.</p>
            </div>
          </div>
        </div>
      )}

      {fetchError && (
        <div className="res-build-error" style={{ color: "#d32f2f", padding: "0.5rem 0" }}>
          {fetchError}
        </div>
      )}

      {experiences.length === 0 && !loading && (
        <div className="res-build-empty-state" style={{ textAlign: "center", padding: "2rem", background: "#f9f9f9", borderRadius: "8px", margin: "1rem 0" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💼</div>
          <h3>No work experience added yet</h3>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
            Add your internships, jobs, or volunteer work to make your resume stand out.
          </p>
          <button className="res-build-btn-add-ghost" onClick={addExperience}>
            + Add Experience
          </button>
        </div>
      )}

      {experiences.map((exp, idx) =>
        editingIndex === idx ? renderExperienceForm(exp, idx) : renderExperienceCard(exp, idx)
      )}

      {experiences.length > 0 && editingIndex === null && (
        <button className="res-build-btn-add-ghost" onClick={addExperience}>
          + Add Experience
        </button>
      )}

      <div className="res-build-step-footer-actions">
        <button className="res-build-btn-back" onClick={onPrev}>
          ← Back
        </button>
        <button className="res-build-btn-next" onClick={onNext}>
          Next →
        </button>
      </div>
    </>
  );
};

export default ExperienceStep;