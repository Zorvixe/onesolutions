// src/components/ResumeBuilder/SkillsStep.js
import React, { useState } from 'react';

const suggestedSkills = [
  'User Acceptance Testing', 'Data Security', 'Requirement Gathering',
  'Deadline Adherence', 'React', 'Node.js', 'Version Control System',
  'Critical Thinking', 'Decision Making', 'User Testing', 'System Design',
  'Team Collaboration'
];

const SkillsStep = ({ data, setData, onNext, onPrev }) => {
  const [showTips, setShowTips] = useState(false);
  const [showAddPopover, setShowAddPopover] = useState(false);
  const [customSkill, setCustomSkill] = useState('');

  const [selectedSkills, setSelectedSkills] = useState(data.skills?.length ? data.skills : ['Problem Solving', 'Bug Resolution', 'Troubleshooting']);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      const updated = selectedSkills.filter(s => s !== skill);
      setSelectedSkills(updated);
      setData(prev => ({ ...prev, skills: updated }));
    } else {
      const updated = [...selectedSkills, skill];
      setSelectedSkills(updated);
      setData(prev => ({ ...prev, skills: updated }));
    }
  };

  const addCustomSkill = () => {
    if(customSkill.trim()) {
      toggleSkill(customSkill.trim());
      setCustomSkill('');
      setShowAddPopover(false);
    }
  }

  return (
    <>
      <div className="res-build-step-header-row">
        <div className="res-build-step-title-area">
          <div className="res-build-step-icon-box">☰</div>
          <div>
            <h2>We recommend including 6-8 skills</h2>
            <p>Tell us about any colleges, vocational programs, or training courses you took.</p>
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
              <h4>Keyword Optimization</h4>
              <p>Use keywords from the job description, or use our expertly pre-written suggestions to beat ATS scans.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Honesty and Authenticity</h4>
              <p>Only include skills that you possess so you can speak about them confidently in a job interview.</p>
            </div>
          </div>
          <div className="res-build-insight-item">
            <div className="res-build-check-icon">✓</div>
            <div className="res-build-insight-content">
              <h4>Accuracy and Clarity</h4>
              <p>Avoid using generic terms. Be specific about your skills and use result-oriented examples if needed.</p>
            </div>
          </div>
        </div>
      )}

      <div className="res-build-skills-container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <h3 style={{fontSize: '1rem', margin: 0}}>Choose your Relevant Skills</h3>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <p style={{margin: 0, fontWeight: 500}}>Suggestion for you</p>
          <div className="res-build-add-skill-popover">
            <button className="res-build-btn-add-ghost" style={{marginTop: 0}} onClick={() => setShowAddPopover(!showAddPopover)}>+ Add Skill</button>
            {showAddPopover && (
              <div className="res-build-skill-input-container">
                <input
                  type="text"
                  placeholder="Enter skill here..."
                  value={customSkill}
                  onChange={(e)=>setCustomSkill(e.target.value)}
                  autoFocus
                />
                <button onClick={addCustomSkill}>Add Skill</button>
              </div>
            )}
          </div>
        </div>

        <div className="res-build-skills-row">
          {suggestedSkills.map(skill => {
            const isSelected = selectedSkills.includes(skill);
            if(isSelected) return null;
            return (
              <div key={skill} className="res-build-skill-pill" onClick={() => toggleSkill(skill)}>
                <span style={{color: '#facc15'}}>+</span> {skill}
              </div>
            )
          })}
        </div>

        <div className="res-build-skills-row" style={{marginTop: '2rem'}}>
          {selectedSkills.map(skill => (
            <div key={skill} className="res-build-skill-pill selected" onClick={() => toggleSkill(skill)}>
              {skill} <span className="res-build-remove-icon">×</span>
            </div>
          ))}
        </div>
      </div>

      <div className="res-build-step-footer-actions">
        <button className="res-build-btn-back" onClick={onPrev}>← Back</button>
        <button className="res-build-btn-next" onClick={onNext}>Next →</button>
      </div>
    </>
  );
};

export default SkillsStep;