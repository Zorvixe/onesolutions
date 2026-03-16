// src/components/ResumeBuilder/HeaderStep.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

const HeaderStep = ({ data, setData, onNext }) => {
  const [showTips, setShowTips] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Fetch complete profile if header data is empty
  useEffect(() => {
    const fetchProfile = async () => {
      // If data.header already has some values, skip fetching (prevents overwriting user edits)
      if (data.header && Object.keys(data.header).length > 0) return;

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

          // Map profile fields to header structure
          const headerData = {
            title: `Resume of ${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
            fullName: `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
            nativeState: profile.state || "",          // using current address state
            currentCity: profile.city || "",            // using current address city
            phone: profile.phone || "",
            email: profile.email || "",
          };

          // Update the parent state only if we have meaningful data
          if (headerData.fullName || headerData.email) {
            setData((prev) => ({
              ...prev,
              header: headerData,
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load profile for resume header:", err);
        setFetchError("Could not auto-fill profile data. Please enter manually.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [data.header, setData]); // Only runs when header is empty

  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      header: { ...prev.header, [field]: value },
    }));
  };

  return (
    <>
      <div className="res-build-step-header-row">
        <div className="res-build-step-title-area">
          <div className="res-build-step-icon-box">👤</div>
          <div>
            <h2>Let's Start with your header</h2>
            <p>As per your profile completion the data has been fetched and autofilled here</p>
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
              <h4>Professional Email Address</h4>
              <p>Avoid using unprofessional or outdated email addresses. Create an email with your name or initials.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Relevant job title</h4>
              <p>If you're applying for a specific position, include a relevant job title under your name.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Add LinkedIn profile</h4>
              <p>Recruiters often use LinkedIn to find candidates. Adding your profile link makes it easy for them.</p>
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

      <div className="res-build-form-grid-custom">
        <div className="res-build-input-group">
          <label>Resume Title</label>
          <input
            type="text"
            className="res-build-input-field res-build-input-field-search"
            value={data.header?.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Software Development Engineer ( SDE-1 )"
          />
        </div>

        <div className="res-build-input-group">
          <label>Full Name</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.header?.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Your Name"
          />
        </div>

        <div className="res-build-form-row-2">
          <div className="res-build-input-group">
            <label>Native State</label>
            <input
              type="text"
              className="res-build-input-field"
              value={data.header?.nativeState || ""}
              onChange={(e) => handleChange("nativeState", e.target.value)}
              placeholder="Karnataka"
            />
          </div>
          <div className="res-build-input-group">
            <label>Current City</label>
            <input
              type="text"
              className="res-build-input-field"
              value={data.header?.currentCity || ""}
              onChange={(e) => handleChange("currentCity", e.target.value)}
              placeholder="Bengaluru (Bangalore) Urban"
            />
          </div>
        </div>

        <div className="res-build-form-row-2">
          <div className="res-build-input-group">
            <label>Contact Number</label>
            <div style={{ padding: "0.75rem 0", fontWeight: "500" }}>
              {data.header?.phone || "+91 8740584007"}
            </div>
          </div>
          <div className="res-build-input-group">
            <label>Email ID</label>
            <div style={{ padding: "0.75rem 0", fontWeight: "500" }}>
              {data.header?.email || "user@example.com"}
            </div>
          </div>
        </div>
      </div>

      <div className="res-build-step-footer-actions">
        <div></div>
        <button className="res-build-btn-next" onClick={onNext}>
          Next →
        </button>
      </div>
    </>
  );
};

export default HeaderStep;