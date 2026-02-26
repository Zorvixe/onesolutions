import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assests } from "../../assests/assests";

import "./Resumes.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Resumes = () => {
  const [publicResumes, setPublicResumes] = useState([]);
  const [atsResumes, setAtsResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [pubResp, atsResp] = await Promise.all([
          fetch(`https://apiose.onesolutionsekam.in/api/public/resumes`),
          fetch(`https://apiose.onesolutionsekam.in/api/analyzed-resumes`),
        ]);
        if (!pubResp.ok) throw new Error("Failed to fetch uploaded resumes");
        if (!atsResp.ok) throw new Error("Failed to fetch ATS resumes");

        const [pubData, atsData] = await Promise.all([
          pubResp.json(),
          atsResp.json(),
        ]);
        setPublicResumes(pubData);
        setAtsResumes(atsData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading)
    return (
      <div className="chats-loading-container">
        <img
          src={assests.one_solutions}
          className="one-solutions-image-chats"
          alt="one_solutions_logo"
        />
        <div className="loader-chats"></div>
      </div>
    );
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="resumes-container">
      <div className="resumes-admin">
        {/* Section: Uploaded Resumes */}
        <section className="resumes-section">
          <h5>Company Jobs Uploaded Resumes</h5>
          {publicResumes.length === 0 ? (
            <p className="no-resumes">No uploaded resumes found.</p>
          ) : (
            <table className="resumes-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Match%</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {publicResumes.map((resume) => (
                  <tr key={resume.id}>
                    <td>{resume.name}</td>
                    <td>{resume.email}</td>
                    <td>{resume.phone || "N/A"}</td>
                    <td>
                      <Link
                        to={`https://onesolutions.onrender.com/company/${encodeURIComponent(
                          resume.job_companyname
                        )}/${encodeURIComponent(resume.job_url)}`}
                        target="_blank"
                      >
                        {resume.job_companyname}
                      </Link>
                    </td>
                    <td>{Math.round(resume.match_percentage)}%</td>
                    <td>
                      <a
                        href={`https://apiose.onesolutionsekam.in/api/public/resumes/${resume.id}/download`}
                        className="download-link"
                      >
                        📄 Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Section: ATS Analyzed Resumes */}
        <section className="resumes-section">
          <h5>ATS Analyzed Resumes</h5>
          {atsResumes.length === 0 ? (
            <p className="no-resumes">No ATS-analyzed resumes found.</p>
          ) : (
            <table className="resumes-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Match %</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {atsResumes.map(
                  ({ id, name, email, phone, match_percentage }) => (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phone || "N/A"}</td>
                      <td>{Math.round(match_percentage)}%</td>
                      <td>
                        <a
                          href={`https://apiose.onesolutionsekam.in/api/analyzed-resumes/${id}/download`}
                          className="download-link"
                        >
                          📄 Download
                        </a>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default Resumes;
