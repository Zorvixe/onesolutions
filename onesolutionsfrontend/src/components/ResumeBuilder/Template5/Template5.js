// src/components/ResumeBuilder/templates/Template5.js
import React from 'react';
import './Template5.css';

const Template5 = ({ data }) => {
  const { header, skills, experience, education, additional } = data;

  const formatDate = (date) => date || '';
  const fullName = header?.fullName || 'Your Name';
  const phone = header?.phone || '';
  const email = header?.email || '';

  return (
    <div className="temp-5-mainContainer">
      {/* Header */}
      <div className="temp-5-templateHeader">
        <h2>{fullName}</h2>
        <p>
          <strong>Email ID: </strong>
          <a href={`mailto:${email}`}>{email}</a> | 
          <span><strong>Ph No:</strong> {phone}</span>
        </p>
      </div>

      {/* Skills Section */}
      {skills?.length > 0 && (
        <div className="temp-5-tableWrapper">
          <div className="temp-5-tableHeading">Skills</div>
          {skills.map((skill, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: '#f0f0f0',
                borderRadius: '5px',
                padding: '5px 10px',
                margin: '5px',
                display: 'inline-block'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Work Experience Section */}
      {experience?.length > 0 && (
        <div className="temp-5-tableWrapper">
          <div className="temp-5-tableHeading">Work Experience</div>
          {experience.map((exp, idx) => (
            <div key={idx}>
              <table className="temp-5-table">
                <tbody>
                  <tr>
                    <th>
                      {exp.company}{exp.location && `, ${exp.location}`}
                    </th>
                  </tr>
                </tbody>
              </table>
              <div className="temp-5-contentHeading">
                <span>{exp.title || ''}</span>
                <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
              </div>
              <ul className="temp-5-contentDescription">
                <div>{exp.description || ''}</div>
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {additional?.projects?.length > 0 && (
        <div className="temp-5-tableWrapper">
          <div className="temp-5-tableHeading">Projects</div>
          {additional.projects.map((proj, idx) => (
            <div key={idx}>
              <table className="temp-5-table">
                <tbody>
                  <tr>
                    <th>{proj.title || ''}</th>
                  </tr>
                </tbody>
              </table>
              <div className="temp-5-contentHeading">
                <span>{proj.link || ''}</span>
                <span></span>
              </div>
              <ul className="temp-5-contentDescription">
                <div>{proj.description || ''}</div>
                {proj.skills?.length > 0 && (
                  <div><strong>Skills:</strong> {proj.skills.join(', ')}</div>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {(education?.tenth || education?.twelfth || education?.ug) && (
        <>
          <div className="temp-5-box">
            <h3>Education Details</h3>
          </div>
          <div className="temp-5-tableWrapper">
            <table className="temp-5-table">
              <tbody>
                <tr>
                  <th>Degree</th>
                  <th>Institute</th>
                  <th>Year</th>
                </tr>
                {/* Undergraduate */}
                {education?.ug && (
                  <tr>
                    <td>
                      {education.ug.degree || ''}
                      {education.ug.branch && ` in ${education.ug.branch}`}
                    </td>
                    <td>{education.ug.institute || ''}</td>
                    <td>{education.ug.endYear || ''}</td>
                  </tr>
                )}
                <tr>
                  <th>Class</th>
                  <th>School</th>
                  <th>Year</th>
                </tr>
                {/* 12th */}
                {education?.twelfth && (
                  <tr>
                    <td>Class XII</td>
                    <td>{education.twelfth.institution || ''}</td>
                    <td>{education.twelfth.year || ''}</td>
                  </tr>
                )}
                {/* 10th */}
                {education?.tenth && (
                  <tr>
                    <td>Class X</td>
                    <td>{education.tenth.school || ''}</td>
                    <td>{education.tenth.year || ''}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Languages Section */}
      {additional?.languages?.length > 0 && (
        <>
          <div className="temp-5-box">
            <h3>Languages</h3>
          </div>
          <div className="temp-5-tableWrapper">
            <ul className="temp-5-custom-list">
              {additional.languages.map((lang, idx) => (
                <li key={idx}>
                  {lang.language} {lang.proficiency && `(${lang.proficiency})`}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Template5;