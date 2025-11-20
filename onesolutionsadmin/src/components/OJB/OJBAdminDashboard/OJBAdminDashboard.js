import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminStats } from '../OjbService';
import { ojbassests } from "../ojbassests/ojbassests";

import './OJBAdminDashboard.css';

const OJBAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load statistics. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [navigate]);

  useEffect(() => {
      const fetchAdminDetails = async () => {
        const token = localStorage.getItem("token");
  
        if (!token) {
          setError("No token found. Please log in.");
          console.log({ error });
          return;
        }
  
        try {
          const response = await fetch('https://backend-lt9m.onrender.com/api/admin/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error || "Failed to fetch admin details");
            return;
          }
  
          const data = await response.json();
          document.title = `OJB - ${data.adminname?.toUpperCase()}`;
        } catch (err) {
          setError("An error occurred while fetching admin details.");
        }
      };
  
      fetchAdminDetails();
    }, []);

// In your React component
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
}


  return (
    <div className="ojb-admin-dashboard">
       <Helmet>
              <link
                rel="icon"
                href={ojbassests.ojb_logo}
                type="image/png"
              />
            </Helmet>
      <div className="ojb-admin-header">
        <h5>OJB Dashboard</h5>
        <div className="ojb-admin-actions">
          <Link to="/ojb/admin/jobs" className="ojb-admin-button">Manage Jobs</Link>
        </div>
      </div>

      {error && <div className="ojb-admin-error">{error}</div>}

      {stats && (
        <div className="ojb-admin-stats-grid">
          <div className="ojb-admin-stat-card">
            <h3>Total Jobs</h3>
            <p className="ojb-stat-number">{stats.totalJobs}</p>
          </div>

          <div className="ojb-admin-stat-card">
            <h3>New Jobs (Last 7 Days)</h3>
            <p className="ojb-stat-number">{stats.recentJobs}</p>
          </div>

          <div className="ojb-admin-stat-card ojb-wide">
            <h3>Top Clicked Jobs</h3>
            {stats.topJobs?.length
              ? (
                <ul className="ojb-top-jobs-list">
                  {stats.topJobs.map(job => (
                    <li key={job.id}>
                      <span className="ojb-job-title">{job.title}</span>
                      <span className="ojb-job-company">{job.companyname}</span>
                      <span className="ojb-click-count">{job.click_count} clicks</span>
                    </li>
                  ))}
                </ul>
              )
              : <p>No job clicks recorded yet.</p>
            }
          </div>

          <div className="ojb-admin-stat-card ojb-wide">
            <h3>Job Sources</h3>
            {stats.sources?.length
              ? (
                <ul className="ojb-sources-list">
                  {stats.sources.map((src, ix) => (
                    <li key={ix}>
                      <span className="ojb-source-name">{src.job_uploader}</span>
                      <span className="ojb-source-count">{src.count} jobs</span>
                    </li>
                  ))}
                </ul>
              )
              : <p>No source data available.</p>
            }
          </div>
        </div>
      )}

      <div className="ojb-admin-quick-actions">
        <Link to="/ojb/admin/jobs" className="ojb-admin-button">View All Jobs</Link>
      </div>
    </div>
  );
};

export default OJBAdminDashboard;
