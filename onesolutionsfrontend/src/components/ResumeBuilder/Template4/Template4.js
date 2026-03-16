// src/components/ResumeBuilder/templates/Template4.js
import React from 'react';
import './Template4.css';

const Template4 = ({ data }) => {
  const { header, summary, skills, experience, education, additional } = data;

  const formatDate = (date) => date || '';
  const fullName = header?.fullName || 'Your Name';
  const phone = header?.phone || '';
  const email = header?.email || '';
  const city = header?.currentCity || '';

  const linkedin = additional?.websites?.find(site => site.label === 'LinkedIn')?.url || '#';
  const github = additional?.websites?.find(site => site.label === 'GitHub')?.url || '#';

  return (
    <div className="temp-4-resume-container">
      <header className="temp-4-header">
        <h1>{fullName}</h1>
        <h2></h2>
      </header>

      <div className="temp-4-content-wrapper">
        {/* Summary Section */}
        {summary?.text && (
          <section className="temp-4-section">
            <h3 className="temp-4-section-title">Summary</h3>
            <p>{summary.text}</p>
          </section>
        )}

        {/* Contact Information Section */}
        <section className="temp-4-section">
          <h3 className="temp-4-section-title">Contact Information</h3>
          <div className="temp-4-contact-grid">
            {city && <div className="temp-4-contact-item">📍 {city}</div>}
            {phone && <div className="temp-4-contact-item">📞 {phone}</div>}
            {email && <div className="temp-4-contact-item">📧 {email}</div>}
            {linkedin !== '#' && (
              <div className="temp-4-contact-item">
                <a href={linkedin} target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
              </div>
            )}
            {github !== '#' && (
              <div className="temp-4-contact-item">
                <a href={github} target="_blank" rel="noopener noreferrer">💻 GitHub</a>
              </div>
            )}
          </div>
        </section>

        {/* Professional Experience Section */}
        {experience?.length > 0 && (
          <section className="temp-4-section">
            <h3 className="temp-4-section-title">Professional Experience</h3>
            {experience.map((exp, idx) => (
              <div key={idx} className="temp-4-experience-item">
                <div className="temp-4-experience-header">
                  <div>
                    <div className="temp-4-experience-title">{exp.title || ''}</div>
                    <div className="temp-4-experience-company">
                      {exp.company && exp.location
                        ? `${exp.company}, ${exp.location}`
                        : exp.company || exp.location || ''}
                    </div>
                  </div>
                  <div className="temp-4-experience-date">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </div>
                </div>
                <p>{exp.description || ''}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects Section (from additional.projects) */}
        {additional?.projects?.length > 0 && (
          <section className="temp-4-section">
            <h3 className="temp-4-section-title">Projects</h3>
            {additional.projects.map((proj, idx) => (
              <div key={idx} className="temp-4-project-item">
                <h4>{proj.title || ''}</h4>
                {proj.link && (
                  <p>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>
                  </p>
                )}
                <p className="temp-4-project-meta">{proj.description || ''}</p>
                {proj.skills?.length > 0 && (
                  <p><strong>Skills:</strong> {proj.skills.join(', ')}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {(education?.tenth || education?.twelfth || education?.ug) && (
          <section className="temp-4-section">
            <h3 className="temp-4-section-title">Education</h3>

            {education?.tenth && (
              <div className="temp-4-education-item">
                <h4>10th Grade</h4>
                <p>
                  {education.tenth.school || ''}
                  {education.tenth.marks && `, ${education.tenth.marks}%`}
                </p>
                {education.tenth.year && (
                  <p className="temp-4-education-meta">Year of Passout: {education.tenth.year}</p>
                )}
              </div>
            )}

            {education?.twelfth && (
              <div className="temp-4-education-item">
                <h4>12th Grade</h4>
                <p>
                  {education.twelfth.institution || ''}
                  {education.twelfth.marks && `, ${education.twelfth.marks}%`}
                </p>
                {education.twelfth.year && (
                  <p className="temp-4-education-meta">Year of Passout: {education.twelfth.year}</p>
                )}
              </div>
            )}

            {education?.ug && (
              <div className="temp-4-education-item">
                <h4>Undergraduate</h4>
                <p>
                  {education.ug.institute || ''}
                  {education.ug.degree && `, ${education.ug.degree}`}
                  {education.ug.branch && ` in ${education.ug.branch}`}
                </p>
                <p className="temp-4-education-meta">
                  {education.ug.endYear && `Year of Passout: ${education.ug.endYear}`}
                  {education.ug.cgpa && `, CGPA: ${education.ug.cgpa}`}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <section className="temp-4-section">
            <h3 className="temp-4-section-title">Skills</h3>
            <div className="temp-4-skills">
              {skills.map((skill, idx) => (
                <div key={idx} className="temp-4-skill-item">{skill}</div>
              ))}
            </div>
          </section>
        )}

        {/* Languages Section */}
        {additional?.languages?.length > 0 && (
          <div className="temp-4-section">
            <h3 className="temp-4-section-title">Languages</h3>
            <div className="temp-4-section-content">
              <ul className="temp-4-custom-list">
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

export default Template4;