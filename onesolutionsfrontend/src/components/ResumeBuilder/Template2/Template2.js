// src/components/ResumeBuilder/templates/Template2.js
import React from 'react';
import './Template2.css';

const Template2 = ({ data }) => {
  const { header, summary, skills, experience, education, additional } = data;

  const formatDate = (date) => date || '';
  const fullName = header?.fullName || 'Your Name';
  const phone = header?.phone || '';
  const email = header?.email || '';
  const city = header?.currentCity || '';

  const contactParts = [city, email, phone].filter(Boolean);
  const contactString = contactParts.join(' • ');

  return (
    <div className="temp-2-resume-container">
      {/* Header Section */}
      <div className="temp-2-header">
        <div className="temp-2-name">{fullName}</div>
        <div className="temp-2-designation"></div>
        <div className="temp-2-contact-info">{contactString}</div>
      </div>

      {/* Summary Section */}
      {summary?.text && (
        <div className="temp-2-section">
          <div className="temp-2-section-title">Summary</div>
          <div className="temp-2-section-content">{summary.text}</div>
        </div>
      )}

      {/* Professional Experience Section */}
      {experience?.length > 0 && (
        <div className="temp-2-section">
          <div className="temp-2-section-title">Professional Experience</div>
          <div className="temp-2-section-content">
            {experience.map((exp, idx) => (
              <div key={idx} className="temp-2-experience-item">
                <div className="temp-2-experience-header">
                  <span className="temp-2-company-location">{exp.company || ''}</span>
                  <span className="temp-2-company-location">{exp.location || ''}</span>
                </div>
                <div className="temp-2-position-dates">
                  <span className="temp-2-position">{exp.title || ''}</span>
                  <span className="temp-2-dates">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="temp-2-description">{exp.description || ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Experience Section (from additional.projects) */}
      {additional?.projects?.length > 0 && (
        <div className="temp-2-section">
          <div className="temp-2-section-title">Project Experience</div>
          <div className="temp-2-section-content">
            {additional.projects.map((proj, idx) => (
              <div key={idx} className="temp-2-project-item">
                <div className="temp-2-project-header">
                  <span className="temp-2-project-name">{proj.title || ''}</span>
                  {proj.link && <span className="temp-2-project-dates">{proj.link}</span>}
                </div>
                {proj.description && (
                  <div className="temp-2-description">{proj.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {(education?.tenth || education?.twelfth || education?.ug) && (
        <div className="temp-2-section">
          <div className="temp-2-section-title">Education</div>
          <div className="temp-2-section-content">
            {education?.tenth && (
              <div className="temp-2-education-item">
                <h4>10th Grade</h4>
                <div className="temp-2-education-details">
                  {education.tenth.school || ''}
                  {education.tenth.marks && `, ${education.tenth.marks}%`}
                </div>
                {education.tenth.year && (
                  <div className="temp-2-education-meta">
                    Year of Passout: {education.tenth.year}
                  </div>
                )}
              </div>
            )}
            {education?.twelfth && (
              <div className="temp-2-education-item">
                <h4>12th Grade</h4>
                <div className="temp-2-education-details">
                  {education.twelfth.institution || ''}
                  {education.twelfth.marks && `, ${education.twelfth.marks}%`}
                </div>
                {education.twelfth.year && (
                  <div className="temp-2-education-meta">
                    Year of Passout: {education.twelfth.year}
                  </div>
                )}
              </div>
            )}
            {education?.ug && (
              <div className="temp-2-education-item">
                <h4>Undergraduate</h4>
                <div className="temp-2-education-details">
                  {education.ug.institute || ''}
                  {education.ug.degree && `, ${education.ug.degree}`}
                  {education.ug.branch && ` in ${education.ug.branch}`}
                </div>
                <div className="temp-2-education-meta">
                  {education.ug.endYear && `Year of Passout: ${education.ug.endYear}`}
                  {education.ug.cgpa && `, CGPA: ${education.ug.cgpa}`}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills?.length > 0 && (
        <div className="temp-2-section">
          <div className="temp-2-section-title">Skills</div>
          <div className="temp-2-section-content">
            <div className="temp-2-skills-container">
              {skills.map((skill, idx) => (
                <span key={idx} className="temp-2-skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Languages Section */}
      {additional?.languages?.length > 0 && (
        <div className="temp-2-section">
          <div className="temp-2-section-title">Languages</div>
          <div className="temp-2-section-content">
            <ul className="temp-2-custom-list">
              {additional.languages.map((lang, idx) => (
                <li key={idx}>
                  {lang.language} {lang.proficiency && `(${lang.proficiency})`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template2;