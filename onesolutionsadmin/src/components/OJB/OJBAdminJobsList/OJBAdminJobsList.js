import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminJobs, deleteJob, updateJob, createJob } from '../OjbService';
import { ToastContainer, toast } from 'react-toastify';
import { ojbassests } from "../ojbassests/ojbassests";
import 'react-toastify/dist/ReactToastify.css';
import './OJBAdminJobsList.css';

const OJBAdminJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAdminJobs();
        setJobs(data);
      } catch (err) {
        setError('Failed to load jobs. Please try again.');
        toast.error('Failed to load jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [navigate]);

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteJob(selectedJob.id);
      setJobs(jobs.filter(j => j.id !== selectedJob.id));
      setIsDeleteModalOpen(false);
      toast.success('Job deleted successfully!');
    } catch (err) {
      setError('Failed to delete job. Please try again.');
      toast.error(err.response?.status === 401 
        ? 'Session expired. Please log in again.' 
        : 'Failed to delete job.');
      if (err.response?.status === 401) navigate('/admin/login');
    }
  };

  const handleSaveJob = async (formData) => {
    try {
      if (selectedJob) {
        // Update existing job
        await updateJob(selectedJob.id, formData);
        setJobs(jobs.map(j => j.id === selectedJob.id ? formData : j));
        toast.success('Job updated successfully!');
      } else {
        // Create new job
        const newJob = await createJob(formData);
        setJobs([...jobs, newJob]);
        toast.success('Job created successfully!');
      }
      setIsEditModalOpen(false);
      setIsAddModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      toast.error('Failed to save job. Please try again.');
    }
  };

  const filteredJobs = jobs.filter(job =>
    [job.title, job.companyname, job.location]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="ojb-admin-loading">
        <div className="spinner-wrapper">
          <img src={ojbassests.ojb_logo} className="ojb--logo-loading" alt="Loading logo" />
        </div>
      </div>
    );
  }

  return (
    <div className="ojb-admin-jobs-list">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="ojb-admin-header">
        <h5>Manage Jobs</h5>
        <div className="ojb-admin-actions">
          <Link to="/ojb/admin/dashboard" className="ojb-admin-button">Dashboard</Link>
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="ojb-admin-button"
          >
            Add New Job
          </button>
        </div>
      </div>

      {error && <div className="ojb-admin-error">{error}</div>}

      <div className="ojb-admin-search">
        <input
          type="text"
          placeholder="Search jobs by title, company, or location..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <div className="ojb-no-jobs-message">
          {searchTerm ? 'No jobs match your search.' : 'No jobs available.'}
        </div>
      ) : (
        <div className="ojb-admin-jobs-table-container">
          <table className="ojb-admin-jobs-table">
            <thead>
              <tr>
                <th>ID</th><th>Title</th><th>Company</th><th>Location</th>
                <th>Posted</th><th>Clicks</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.title}</td>
                  <td>{job.companyname}</td>
                  <td>{job.location}</td>
                  <td>{new Date(job.date_posted).toLocaleDateString()}</td>
                  <td>{job.click_count || 0}</td>
                  <td className="ojb-action-buttons">
                    <button onClick={() => handleEditClick(job)} className="ojb-edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(job)} className="ojb-delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="ojb-modal-overlay">
          <div className="ojb-modal">
            <h3>Edit Job: {selectedJob.title}</h3>
            <JobForm 
              job={selectedJob} 
              onSave={handleSaveJob} 
              onCancel={() => {
                setIsEditModalOpen(false);
                setSelectedJob(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="ojb-modal-overlay">
          <div className="ojb-modal">
            <h3>Add New Job</h3>
            <JobForm 
              job={null} 
              onSave={handleSaveJob} 
              onCancel={() => setIsAddModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="ojb-modal-overlay">
          <div className="ojb-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{selectedJob?.title}"?</p>
            <div className="ojb-modal-actions">
              <button onClick={handleConfirmDelete} className="ojb-confirm-button">
                Yes, Delete
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)} 
                className="ojb-cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const JobForm = ({ job, onSave, onCancel }) => {
  const [formData, setFormData] = useState(job || {
    companyname: '',
    title: '',
    description: '',
    apply_link: '',
    image_link: '',
    salary: '',
    location: '',
    job_type: 'Full-time',
    experience: '',
    batch: '',
    date_posted: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="ojb-job-form">
      <div className="ojb-form-group">
        <label>Company Name*</label>
        <input
          name="companyname"
          value={formData.companyname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="ojb-form-group">
        <label>Job Title*</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="ojb-form-group">
        <label>Description*</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          required
        />
      </div>

      <div className="ojb-form-group">
        <label>Apply Link*</label>
        <input
          type="url"
          name="apply_link"
          value={formData.apply_link}
          onChange={handleChange}
          required
        />
      </div>

      <div className="ojb-form-group">
        <label>Company Logo URL</label>
        <input
          type="url"
          name="image_link"
          value={formData.image_link}
          onChange={handleChange}
          placeholder="Optional"
        />
      </div>

      <div className="ojb-form-row">
        <div className="ojb-form-group">
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g., ₹5L - ₹7L PA"
          />
        </div>
        
        <div className="ojb-form-group">
          <label>Location*</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="ojb-form-row">
        <div className="ojb-form-group">
          <label>Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
            <option>Freelance</option>
          </select>
        </div>

        <div className="ojb-form-group">
          <label>Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., 0-2 years"
          />
        </div>
      </div>

      <div className="ojb-form-row">
        <div className="ojb-form-group">
          <label>Batch Eligibility</label>
          <input
            type="text"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            placeholder="e.g., 2023/2024"
          />
        </div>

        <div className="ojb-form-group">
          <label>Posting Date</label>
          <input
            type="date"
            name="date_posted"
            value={formData.date_posted}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="ojb-form-actions">
        <button type="button" onClick={onCancel} className="ojb-cancel-button">
          Cancel
        </button>
        <button type="submit" className="ojb-save-button">
          {job ? 'Save Changes' : 'Create Job'}
        </button>
      </div>
    </form>
  );
};

export default OJBAdminJobsList;