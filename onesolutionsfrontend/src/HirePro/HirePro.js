// src/HirePro/HirePro.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { goalsData } from "../data/goalsData";
import './HirePro.css';

const HirePro = () => {
  const navigate = useNavigate();
  const { completedContent } = useAuth();

  const [showPopup, setShowPopup] = useState(false);
  const [module, setModule] = useState(''); // 'frontend' or 'backend'
  const [expandedTopic, setExpandedTopic] = useState(null); // stores module id

  // Find the courses we need
  const frontendCourse = goalsData
    .flatMap(goal => goal.courses)
    .find(course => course.title === "Frontend Interview Kit");

  const backendCourse = goalsData
    .flatMap(goal => goal.courses)
    .find(course => course.title === "Backend Interview Kit");

  // Get modules (topics) from the selected course
  const currentModules =
    module === 'frontend' ? frontendCourse?.modules || [] :
    module === 'backend' ? backendCourse?.modules || [] :
    [];

  // Helper to check if a subtopic is completed
  const isSubtopicCompleted = (subtopicId) => {
    return completedContent.includes(subtopicId);
  };

  const handleTopicClick = (moduleId) => {
    setExpandedTopic(expandedTopic === moduleId ? null : moduleId);
  };

  const handleSetClick = (moduleId, topicId) => {
    navigate(`/topic/${moduleId}/subtopic/${topicId}`);
  };

  return (
    <div className="hirepro-page">
      <div className="hirepro-container">

        <header className="hirepro-header">
          <h2>HirePro</h2>
          <p className="subtitle">
            Prepare smarter. Land faster.<br />
            Company-specific questions, interview experiences & placement readiness
          </p>
        </header>

        <main className="hirepro-content">
          <section className="placeholder-section">

            <div className="hire-card">
              <div className="hire-icon interview">🎯</div>
              <h3>Interview Questions</h3>
              <p>
                Practice real company interview questions from product and service companies.
                Prepare smart and improve your placement chances.
              </p>
              <button
                className="hire-btn"
                onClick={() => setShowPopup(true)}
              >
                Explore Questions
              </button>
            </div>

            <div className="hire-card">
              <div className="hire-icon resume">📄</div>
              <h3>Resume & ATS Tools</h3>
              <p>
                Create ATS-friendly resumes, optimize keywords and increase your chances
                of getting shortlisted by top companies.
              </p>
              <button
                className="hire-btn alt"
                onClick={() => navigate('/resumes')}
              >
                Build Resume
              </button>
            </div>

          </section>

          <section className="info-section">
            <h2>How HirePro helps you</h2>
            <div className="features-grid">
              <div className="feature-item">
                <strong>Targeted Preparation</strong>
                <span>Focus only on questions companies actually ask</span>
              </div>
              <div className="feature-item">
                <strong>Real Experiences</strong>
                <span>Latest interview rounds & difficulty shared by students</span>
              </div>
              <div className="feature-item">
                <strong>Progress Tracking</strong>
                <span>Know exactly where you stand</span>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">

            <button
              className="close-btn"
              onClick={() => {
                setShowPopup(false);
                setModule('');
                setExpandedTopic(null);
              }}
            >
              ×
            </button>

            {/* Step 1 – Choose Frontend / Backend */}
            {!module && (
              <>
                <h2>Select Module</h2>
                <div className="module-buttons">
                  <button
                    className="module-btn"
                    onClick={() => {
                      setModule('frontend');
                      setExpandedTopic(null);
                    }}
                  >
                    Frontend
                  </button>

                  <button
                    className="module-btn"
                    onClick={() => {
                      setModule('backend');
                      setExpandedTopic(null);
                    }}
                  >
                    Backend
                  </button>
                </div>
              </>
            )}

            {/* Step 2 – Accordion of modules (topics) */}
            {module && (
              <>
                <h2>
                  {module === 'frontend'
                    ? 'Frontend Topics'
                    : 'Backend Topics'}
                </h2>

                <div className="topics-accordion">
                  {currentModules.map((mod) => (
                    <div key={mod.id} className="topic-card">

                      <div
                        className="topic-header"
                        onClick={() => handleTopicClick(mod.id)}
                      >
                        <span>{mod.name}</span>
                        <span className="plus">
                          {expandedTopic === mod.id ? "−" : "+"}
                        </span>
                      </div>

                      {expandedTopic === mod.id && (
                        <div className="sets-column">
                          {mod.topic.map((topicItem) => {
                            const completed = isSubtopicCompleted(topicItem.id);
                            return (
                              <div
                                key={topicItem.id}
                                className={`set-row ${completed ? 'completed' : ''}`}
                                onClick={() =>
                                  handleSetClick(mod.id, topicItem.id)
                                }
                              >
                                <div className={`status-indicator ${completed ? 'completed' : ''}`}>
                                  {completed ? '✓' : ''}
                                </div>
                                <span>{topicItem.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default HirePro;