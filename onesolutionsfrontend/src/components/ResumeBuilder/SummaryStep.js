// src/components/ResumeBuilder/SummaryStep.js
import React, { useState } from 'react';

const suggestedSummaries = [
  "Highly-motivated employee with desire to take on new challenges. Strong work ethic, adaptability, and exceptional interpersonal skills. Adept at working effectively unsupervised and quickly mastering new skills.",
  "Hardworking employee with customer service, multitasking, and time management abilities. Devoted to giving every customer a positive and memorable experience.",
  "Committed job seeker with a history of meeting company needs with consistent and organized practices. Skilled in working under pressure and adapting to new situations and challenges to best enhance the organizational brand."
];

const SummaryStep = ({ data, setData, onNext, onPrev }) => {
  const [showTips, setShowTips] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(data.summary?.text || suggestedSummaries[0]);

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setData(prev => ({ ...prev, summary: { text: suggestion } }));
  };

  return (
    <>
      <div className="res-build-step-header-row">
        <div className="res-build-step-title-area">
          <div className="res-build-step-icon-box">💬</div>
          <div>
            <h2>Let's Craft your Professional Summary</h2>
            <p>Choose from optimized professional summary to craft your own</p>
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
              <h4>Keep it concise</h4>
              <p>2-3 sentences is recommended. Recruiters take under 10 seconds to scan a resume.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Include Keywords</h4>
              <p>Use familiar industry terms or keywords from the job description.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Make it Impactful</h4>
              <p>This is the first section of your resume, make it stand out in your own unique way.</p>
            </div>
          </div>
        </div>
      )}

      <div className="res-build-custom-summary-area">
        <h3>Craft your own Summary <button className="res-build-btn-tailor-ai">✨ Tailor with AI</button></h3>
        <textarea
          className="res-build-input-field"
          style={{minHeight: '120px', resize: 'vertical'}}
          value={data.summary?.text || ''}
          onChange={(e) => setData(prev => ({ ...prev, summary: { text: e.target.value } }))}
        />
      </div>

      <div style={{marginTop: '2rem'}}>
        <h3 style={{fontSize: '1rem', marginBottom: '1rem'}}>Suggested for you</h3>
        {suggestedSummaries.map((s, idx) => (
          <div key={idx} className="res-build-summary-radio-card" onClick={() => handleSuggestionClick(s)}>
            <input
              type="radio"
              name="summary_suggestion"
              checked={selectedSuggestion === s}
              onChange={() => {}}
            />
            <p>{s}</p>
          </div>
        ))}
      </div>

      <div className="res-build-step-footer-actions">
        <button className="res-build-btn-back" onClick={onPrev}>← Back</button>
        <button className="res-build-btn-next" onClick={onNext}>Next →</button>
      </div>
    </>
  );
};

export default SummaryStep;