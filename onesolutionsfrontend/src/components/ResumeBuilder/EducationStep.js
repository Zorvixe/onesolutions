// src/components/ResumeBuilder/EducationStep.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5002";

const EducationStep = ({ data, setData, onNext, onPrev }) => {
  const [showTips, setShowTips] = useState(false);
  const [openSection, setOpenSection] = useState("10th");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Fetch complete profile if education data is empty
  useEffect(() => {
    const fetchEducation = async () => {
      // If education data already exists, don't overwrite
      if (data.education && Object.keys(data.education).length > 0) return;

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

          // Map profile fields to education structure
          const educationData = {
            tenth: {
              school: profile.tenthSchool || "", // Not in the profile? Use tenthInstitute?
              location: `${profile.tenthInstituteCity || ""}, ${profile.tenthInstituteState || ""}`.trim().replace(/^,/, ""),
              year: profile.tenthYear || "",
              marks: profile.tenthMarks || "",
              marksType: profile.tenthMarksType || "",
            },
            twelfth: {
              institution: profile.twelfthInstitute || "",
              location: `${profile.twelfthInstituteCity || ""}, ${profile.twelfthInstituteState || ""}`.trim().replace(/^,/, ""),
              year: profile.twelfthYear || "",
              marks: profile.twelfthMarks || "",
              marksType: profile.twelfthMarksType || "",
              educationType: profile.twelfthEducationType || "",
            },
            ug: {
              degree: profile.bachelorDegree || "",
              branch: profile.bachelorBranch || "",
              institute: profile.bachelorInstitute || "",
              location: `${profile.bachelorInstituteCity || ""}, ${profile.bachelorInstituteState || ""}`.trim().replace(/^,/, ""),
              startYear: profile.bachelorStartYear || "",
              endYear: profile.bachelorEndYear || "",
              cgpa: profile.bachelorCgpa || "",
              status: profile.bachelorStatus || "",
            },
          };

          // Only set if at least one field has data
          if (
            educationData.tenth.school ||
            educationData.twelfth.institution ||
            educationData.ug.degree
          ) {
            setData((prev) => ({
              ...prev,
              education: educationData,
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load education data:", err);
        setFetchError("Could not auto‑fill education details. Please enter manually.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [data.education, setData]);

  const handleChange = (level, field, value) => {
    setData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...(prev.education?.[level] || {}),
          [field]: value,
        },
      },
    }));
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const renderTenth = () => (
    <div className="res-build-accordion-body">
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>School Name</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.tenth?.school || ""}
            onChange={(e) => handleChange("tenth", "school", e.target.value)}
            placeholder="e.g., Keshavareddy Concept EMHS"
          />
        </div>
        <div className="res-build-input-group">
          <label>Location</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.tenth?.location || ""}
            onChange={(e) => handleChange("tenth", "location", e.target.value)}
            placeholder="City, State"
          />
        </div>
      </div>
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>Year of Passing</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.tenth?.year || ""}
            onChange={(e) => handleChange("tenth", "year", e.target.value)}
            placeholder="2017"
          />
        </div>
        <div className="res-build-input-group">
          <label>Marks / Percentage</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.tenth?.marks || ""}
            onChange={(e) => handleChange("tenth", "marks", e.target.value)}
            placeholder="90% or 9.5 CGPA"
          />
        </div>
      </div>
      <div className="res-build-input-group">
        <label>Marks Type</label>
        <select
          className="res-build-input-field"
          value={data.education?.tenth?.marksType || ""}
          onChange={(e) => handleChange("tenth", "marksType", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Percentage">Percentage</option>
          <option value="CGPA">CGPA</option>
        </select>
      </div>
    </div>
  );

  const renderTwelfth = () => (
    <div className="res-build-accordion-body">
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>Institution / College</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.twelfth?.institution || ""}
            onChange={(e) => handleChange("twelfth", "institution", e.target.value)}
            placeholder="e.g., Narayana Junior College"
          />
        </div>
        <div className="res-build-input-group">
          <label>Education Type</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.twelfth?.educationType || ""}
            onChange={(e) => handleChange("twelfth", "educationType", e.target.value)}
            placeholder="Intermediate / PUC / Diploma"
          />
        </div>
      </div>
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>Location</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.twelfth?.location || ""}
            onChange={(e) => handleChange("twelfth", "location", e.target.value)}
            placeholder="City, State"
          />
        </div>
        <div className="res-build-input-group">
          <label>Year of Passing</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.twelfth?.year || ""}
            onChange={(e) => handleChange("twelfth", "year", e.target.value)}
            placeholder="2019"
          />
        </div>
      </div>
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>Marks / Percentage</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.twelfth?.marks || ""}
            onChange={(e) => handleChange("twelfth", "marks", e.target.value)}
            placeholder="85% or 8.5 CGPA"
          />
        </div>
        <div className="res-build-input-group">
          <label>Marks Type</label>
          <select
            className="res-build-input-field"
            value={data.education?.twelfth?.marksType || ""}
            onChange={(e) => handleChange("twelfth", "marksType", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Percentage">Percentage</option>
            <option value="CGPA">CGPA</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderUg = () => (
    <div className="res-build-accordion-body">
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>Degree</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.ug?.degree || ""}
            onChange={(e) => handleChange("ug", "degree", e.target.value)}
            placeholder="B.E. / B.Tech / B.Sc"
          />
        </div>
        <div className="res-build-input-group">
          <label>Branch / Major</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.ug?.branch || ""}
            onChange={(e) => handleChange("ug", "branch", e.target.value)}
            placeholder="Computer Science"
          />
        </div>
      </div>
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>Institution</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.ug?.institute || ""}
            onChange={(e) => handleChange("ug", "institute", e.target.value)}
            placeholder="University / College name"
          />
        </div>
        <div className="res-build-input-group">
          <label>Location</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.ug?.location || ""}
            onChange={(e) => handleChange("ug", "location", e.target.value)}
            placeholder="City, State"
          />
        </div>
      </div>
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>Start Year</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.ug?.startYear || ""}
            onChange={(e) => handleChange("ug", "startYear", e.target.value)}
            placeholder="2019"
          />
        </div>
        <div className="res-build-input-group">
          <label>End Year (or Expected)</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.ug?.endYear || ""}
            onChange={(e) => handleChange("ug", "endYear", e.target.value)}
            placeholder="2023"
          />
        </div>
      </div>
      <div className="res-build-form-row-2">
        <div className="res-build-input-group">
          <label>CGPA / Percentage</label>
          <input
            type="text"
            className="res-build-input-field"
            value={data.education?.ug?.cgpa || ""}
            onChange={(e) => handleChange("ug", "cgpa", e.target.value)}
            placeholder="8.5 CGPA or 80%"
          />
        </div>
        <div className="res-build-input-group">
          <label>Status</label>
          <select
            className="res-build-input-field"
            value={data.education?.ug?.status || ""}
            onChange={(e) => handleChange("ug", "status", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Completed">Completed</option>
            <option value="Pursuing">Pursuing</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="res-build-step-header-row">
        <div className="res-build-step-title-area">
          <div className="res-build-step-icon-box">🎓</div>
          <div>
            <h2>Let's talk about your Education</h2>
            <p>Tell us about any colleges, vocational programs, or training courses you took.</p>
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
              <h4>Degree & Major</h4>
              <p>Clearly state your degree (e.g., Bachelor of Engineering in Computer Science).</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Institution and Location</h4>
              <p>Include the name of the school or university, along with the city and state.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Graduation Year</h4>
              <p>Provide the year of graduation. If you are still pursuing, you can write "Expected (year)".</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="res-build-loading" style={{ padding: "1rem", textAlign: "center" }}>
          Loading your education details...
        </div>
      )}

      {fetchError && (
        <div className="res-build-error" style={{ color: "#d32f2f", padding: "0.5rem 0" }}>
          {fetchError}
        </div>
      )}

      {/* 10th Grade Accordion */}
      <div className="res-build-accordion-item">
        <div className="res-build-accordion-header" onClick={() => toggleSection("10th")}>
          <div className="res-build-accordion-title">
            <div style={{ width: "3px", height: "20px", background: "#10b981", marginRight: "8px" }}></div>
            10th Grade
          </div>
          <div>{openSection === "10th" ? "⌃" : "⌄"}</div>
        </div>
        {openSection === "10th" && renderTenth()}
      </div>

      {/* 12th Grade Accordion */}
      <div className="res-build-accordion-item">
        <div className="res-build-accordion-header" onClick={() => toggleSection("12th")}>
          <div className="res-build-accordion-title">
            <div style={{ width: "3px", height: "20px", background: "#10b981", marginRight: "8px" }}></div>
            12th / PUC / Intermediate / Diploma
          </div>
          <div>{openSection === "12th" ? "⌃" : "⌄"}</div>
        </div>
        {openSection === "12th" && renderTwelfth()}
      </div>

      {/* UG Details Accordion */}
      <div className="res-build-accordion-item">
        <div className="res-build-accordion-header" onClick={() => toggleSection("ug")}>
          <div className="res-build-accordion-title">
            <div style={{ width: "3px", height: "20px", background: "#10b981", marginRight: "8px" }}></div>
            UG Details
          </div>
          <div>{openSection === "ug" ? "⌃" : "⌄"}</div>
        </div>
        {openSection === "ug" && renderUg()}
      </div>

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

export default EducationStep;