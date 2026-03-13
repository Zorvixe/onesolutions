// src/HirePro/HirePro.js

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';     // ← required import
import './HirePro.css';



const HirePro = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
const [module, setModule] = useState("");

  return (
    <div className="hirepro-page">
      <div className="hirepro-container">
        
        {/* Header / Hero section */}
        <header className="hirepro-header">
          <h1>HirePro</h1>
          <p className="subtitle">
            Prepare smarter. Land faster.<br/>
            Company-specific questions, interview experiences & placement readiness
          </p>
        </header>

        {/* Main content area */}
        <main className="hirepro-content">
          {/* Cards section */}
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
              <button className="hire-btn alt">
                Build Resume
              </button>
            </div>
          </section>

          {/* How HirePro helps section */}
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
       {/* ✅ POPUP MUST BE HERE (outside container but inside main page) */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">

            <button
              className="close-btn"
              onClick={() => {
                setShowPopup(false)
                setModule("")
              }}
            >
              ✖
            </button>

            {!module && (
              <>
                <h2>Select Module</h2>

                <button
                  className="module-btn"
                  onClick={() => setModule("frontend")}
                >
                  Frontend
                </button>

                <button
                  className="module-btn"
                  onClick={() => setModule("backend")}
                >
                  Backend
                </button>
              </>
            )}

            {module === "frontend" && (
              <>
                <h2>Frontend Topics</h2>

                <div className="topics">
                  <button>HTML</button>
                  <button>CSS</button>
                  <button>SQL</button>
                  <button>Python</button>
                  <button>Bootstrap</button>
                </div>
              </>
            )}

            {module === "backend" && (
              <>
                <h2>Backend Topics</h2>

                <div className="topics">
                  <button>NodeJS</button>
                  <button>ReactJS</button>
                  <button>JavaScript</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  )
    
}

export default HirePro;