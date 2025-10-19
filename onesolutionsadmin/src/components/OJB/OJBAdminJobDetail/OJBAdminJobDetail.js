import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ojbassests } from "../ojbassests/ojbassests";

import './OJBAdminJobDetail.css';

const OJBAdminJobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`https://ojbbackend.onrender.com/api/admin/jobs/${id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error('Job not found');
          else throw new Error('Failed to fetch job');
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="ojb-admin-loading">
        <div className="spinner-wrapper">
          <img
            src={ojbassests.ojb_logo}
            className="ojb--logo-loading"
            alt="Loading logo"
          />
        </div>
      </div>
    );
  }  if (error) return <p className="ojb-error">{error}</p>;
  if (!job) return null;

  const descriptionPoints = job.description ? job.description.split("\n").map((point) => point.trim()) : []

  return (
   <div className='ojb-admin-job-detail-container'>
     <div className="ojb-admin-job-detail">
      <h3 className="ojb-title">{job.title} @ {job.companyname}</h3>
      
      <div className="ojb-details-grid">
        <div className="ojb-detail-item">
          <span className="ojb-detail-label">Location:</span>
          <span className="ojb-detail-value">{job.location}</span>
        </div>
        <div className="ojb-detail-item">
          <span className="ojb-detail-label">Type:</span>
          <span className="ojb-detail-value">{job.job_type}</span>
        </div>
        <div className="ojb-detail-item">
          <span className="ojb-detail-label">Salary:</span>
          <span className="ojb-detail-value">{job.salary}</span>
        </div>
        <div className="ojb-detail-item">
          <span className="ojb-detail-label">Experience:</span>
          <span className="ojb-detail-value">{job.experience}</span>
        </div>
        <div className="ojb-detail-item">
          <span className="ojb-detail-label">Batch:</span>
          <span className="ojb-detail-value">{job.batch}</span>
        </div>
        <div className="ojb-detail-item">
          <span className="ojb-detail-label">Posted:</span>
          <span className="ojb-detail-value">
            {new Date(job.date_posted).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="ojb-description">
        <h3 className="ojb-description-title">Description</h3>
        <ul className="ojb-description-content">              {descriptionPoints.map((point, index) => point && <li key={index}>{point}</li>)}
        </ul>
      </div>

      <div className="ojb-actions">
        <Link to={`/ojb/admin/jobs/edit/${job.id}`} className="ojb-btn ojb-btn-primary">
          Edit Job
        </Link>
        <Link to="/ojb/admin/jobs" className="ojb-btn ojb-btn-secondary">
          Back to List
        </Link>
      </div>
    </div>
   </div>
  );
};

export default OJBAdminJobDetail;