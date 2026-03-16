// src/components/ResumeBuilder/templates/Template1.js
import React from 'react';
import './Template1.css';

const Template1 = ({ data }) => {
  const { header, summary, skills, experience, education, additional } = data;

  const formatDate = (date) => date || '';
  const getFullName = () => header?.fullName || 'Your Name';
  const getDegree = () => education?.ug?.degree || '';
  const getInstitute = () => education?.ug?.institute || '';
  const getCity = () => header?.currentCity || '';
  const getPhone = () => header?.phone || '';
  const getEmail = () => header?.email || '';

  const linkedin = additional?.websites?.find(site => site.label === 'LinkedIn')?.url || '';
  const github = additional?.websites?.find(site => site.label === 'GitHub')?.url || '';

  return (
    <div className="temp-1-container">
      <section className="temp-1-header">
        <div className="temp-1-header-left">
          <div className="temp-1-name">{getFullName()}</div>
          {getDegree() && <div>{getDegree()}</div>}
          {getInstitute() && <div>{getInstitute()}</div>}
        </div>
        <div className="temp-1-contact-info">
          {getCity() && <div>{getCity()}</div>}
          {getPhone() && <div>{getPhone()}</div>}
          {getEmail() && <div>{getEmail()}</div>}
          {linkedin && <div>{linkedin}</div>}
          {github && <div>{github}</div>}
        </div>
      </section>

      {summary?.text && (
        <section className="temp-1-section">
          <h3 className="temp-1-title">Summary</h3>
          <p>{summary.text}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="temp-1-section">
          <div className="temp-1-title">PROFESSIONAL EXPERIENCE</div>
          <div className="temp-1-section-contents">
            {experience.map((exp, idx) => (
              <div key={idx} className="temp-1-section-content">
                <div className="temp-1-section-content-title">
                  <div>{exp.title}</div>
                  <div>{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</div>
                </div>
                <div className="temp-1-section-content-description">
                  {exp.company && exp.location && (
                    <div>{exp.company}, {exp.location}</div>
                  )}
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {additional?.projects?.length > 0 && (
        <section className="temp-1-section">
          <div className="temp-1-title">PROJECTS</div>
          <div className="temp-1-section-contents">
            {additional.projects.map((proj, idx) => (
              <div key={idx} className="temp-1-section-content">
                <div className="temp-1-section-content-title">
                  <div>{proj.title}</div>
                  <div>{proj.link || ''}</div>
                </div>
                <div className="temp-1-section-content-description">
                  <p>{proj.description}</p>
                  {proj.skills?.length > 0 && (
                    <p><strong>Skills:</strong> {proj.skills.join(', ')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(education?.tenth || education?.twelfth || education?.ug) && (
        <section className="temp-1-section">
          <div className="temp-1-title">EDUCATION</div>
          <div className="temp-1-section-contents">
            {education?.tenth && (
              <div className="temp-1-section-content">
                <div className="temp-1-section-content-title">10th Grade</div>
                <div className="temp-1-section-content-description">
                  <div>{education.tenth.school} – {education.tenth.marks} ({education.tenth.marksType})</div>
                  <div>Year of Passout: {education.tenth.year}</div>
                </div>
              </div>
            )}
            {education?.twelfth && (
              <div className="temp-1-section-content">
                <div className="temp-1-section-content-title">12th Grade</div>
                <div className="temp-1-section-content-description">
                  <div>{education.twelfth.institution}, {education.twelfth.marks}%</div>
                  <div>Year of Passout: {education.twelfth.year}</div>
                </div>
              </div>
            )}
            {education?.ug && (
              <div className="temp-1-section-content">
                <div className="temp-1-section-content-title">Undergraduate</div>
                <div className="temp-1-section-content-description">
                  <div>{education.ug.institute}, {education.ug.degree} in {education.ug.branch}</div>
                  <div>Year of Passout: {education.ug.endYear}, CGPA: {education.ug.cgpa}</div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {skills?.length > 0 && (
        <section className="temp-1-section">
          <h3 className="temp-1-title">Skills</h3>
          <div className="temp-1-skills-container">
            {skills.map((skill, idx) => (
              <span key={idx} className="temp-1-skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {additional?.languages?.length > 0 && (
        <div className="temp-1-section">
          <div className="temp-1-title">Languages</div>
          <div className="temp-1-section-content">
            <ul className="temp-1-custom-list">
              {additional.languages.map((lang, idx) => (
                <li key={idx}>{lang.language} – {lang.proficiency}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template1;