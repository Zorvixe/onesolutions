// src/components/ResumeBuilder/templates/Template3.js
import React from 'react';
import './Template3.css';

const Template3 = ({ data }) => {
  const { header, summary, skills, experience, education, additional } = data;

  const formatDate = (date) => date || '';
  const fullName = header?.fullName || 'Your Name';
  const phone = header?.phone || '';
  const email = header?.email || '';
  const city = header?.currentCity || '';

  const linkedin = additional?.websites?.find(site => site.label === 'LinkedIn')?.url || '#';
  const github = additional?.websites?.find(site => site.label === 'GitHub')?.url || '#';

  return (
    <div className="temp-3-resume-container">
      <header className="temp-3-header">
        <h1>{fullName}</h1>
        <p className="temp-3-contact-info">
          {[city, phone, email].filter(Boolean).join(' • ')}
        </p>
        <div className="temp-3-social-links">
          {linkedin !== '#' && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {github !== '#' && <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>}
        </div>
      </header>

      <div className="temp-3-content-grid">
        {/* Summary Section */}
        {summary?.text && (
          <section>
            <h3 className="temp-3-section-title">Summary</h3>
            <p className="temp-3-summary-text">{summary.text}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <section>
            <h3 className="temp-3-section-title">Experience</h3>
            {experience.map((exp, idx) => (
              <div key={idx} className="temp-3-experience-item">
                <h4>{exp.title || ''}</h4>
                <p className="temp-3-company-name">
                  {exp.company && exp.location
                    ? `${exp.company}, ${exp.location}`
                    : exp.company || exp.location || ''}
                </p>
                <p className="temp-3-experience-meta">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </p>
                <p>{exp.description || ''}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects Section (from additional.projects) */}
        {additional?.projects?.length > 0 && (
          <section>
            <h3 className="temp-3-section-title">Projects</h3>
            {additional.projects.map((proj, idx) => (
              <div key={idx} className="temp-3-project-item">
                <h4>{proj.title || ''}</h4>
                {proj.link && (
                  <p className="temp-3-institution-name">
                    <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>
                  </p>
                )}
                <p className="temp-3-project-meta">{proj.description || ''}</p>
                {proj.skills?.length > 0 && (
                  <p><strong>Skills:</strong> {proj.skills.join(', ')}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {(education?.tenth || education?.twelfth || education?.ug) && (
          <section>
            <h3 className="temp-3-section-title">Education</h3>

            {education?.tenth && (
              <div className="temp-3-education-item">
                <h4>10th Grade</h4>
                <p>
                  {education.tenth.school || ''}
                  {education.tenth.marks && `, ${education.tenth.marks}%`}
                </p>
                {education.tenth.year && (
                  <p className="temp-3-education-meta">Year of Passout: {education.tenth.year}</p>
                )}
              </div>
            )}

            {education?.twelfth && (
              <div className="temp-3-education-item">
                <h4>12th Grade</h4>
                <p>
                  {education.twelfth.institution || ''}
                  {education.twelfth.marks && `, ${education.twelfth.marks}%`}
                </p>
                {education.twelfth.year && (
                  <p className="temp-3-education-meta">Year of Passout: {education.twelfth.year}</p>
                )}
              </div>
            )}

            {education?.ug && (
              <div className="temp-3-education-item">
                <h4>Undergraduate</h4>
                <p>
                  {education.ug.institute || ''}
                  {education.ug.degree && `, ${education.ug.degree}`}
                  {education.ug.branch && ` in ${education.ug.branch}`}
                </p>
                <p className="temp-3-education-meta">
                  {education.ug.endYear && `Year of Passout: ${education.ug.endYear}`}
                  {education.ug.cgpa && `, CGPA: ${education.ug.cgpa}`}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <section>
            <h3 className="temp-3-section-title">Skills</h3>
            <div className="temp-3-skills-container">
              {skills.map((skill, idx) => (
                <span key={idx} className="temp-3-skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Languages Section */}
        {additional?.languages?.length > 0 && (
          <div className="temp-3-section">
            <h3 className="temp-3-section-title">Languages</h3>
            <div className="temp-3-section-content">
              <ul className="temp-3-custom-list">
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
    </div>
  );
};

export default Template3;