"use client";
import { useState, useEffect } from "react";
import "./StudentList.css";
import AdminAuthModal from "../AdminAuthModal/AdminAuthModal";
import { useAdminAuth } from "../AdminAuthModal/useAdminAuth";

const API_BASE_URL = "https://api.onesolutionsekam.in";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    student_id: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    batch_month: "",
    batch_year: "",
    status: "active",
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    batchMonth: "",
    batchYear: "",
    status: "",
  });

  // Admin Auth - FIXED: Use the hook properly
  const { 
    isAuthenticated, 
    showAuthModal, 
    loading: authLoading, 
    setShowAuthModal, 
    handleAuthSuccess 
  } = useAdminAuth();

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('adminToken') || localStorage.getItem('token');
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStudents();
    }
  }, [filters, isAuthenticated]);

  const fetchStudents = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.batchMonth) params.append('batchMonth', filters.batchMonth);
      if (filters.batchYear) params.append('batchYear', filters.batchYear);
      if (filters.status) params.append('status', filters.status);

      const token = getToken();
      console.log('Fetching students with token:', token ? 'Present' : 'Missing');

      const response = await fetch(
        `${API_BASE_URL}/api/admin/students?${params}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please login again.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        setStudents(result.data.students || []);
      } else {
        throw new Error(result.message || "Failed to fetch students");
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.message || "Failed to fetch students. Please try again.");
      
      // If authentication failed, show auth modal again
      if (err.message.includes('Authentication failed') || err.message.includes('401')) {
        localStorage.removeItem('adminAuth');
        setShowAuthModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = getToken();
      const url = editingStudent
        ? `${API_BASE_URL}/api/admin/students/${editingStudent.id}`
        : `${API_BASE_URL}/api/admin/students`;

      const method = editingStudent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(
          editingStudent
            ? "Student updated successfully"
            : "Student created successfully"
        );
        closeModal();
        setFormData({
          student_id: "",
          email: "",
          first_name: "",
          last_name: "",
          phone: "",
          batch_month: "",
          batch_year: "",
          status: "active",
        });
        setEditingStudent(null);
        fetchStudents(); // Refresh the list
      } else {
        throw new Error(result.message || result.error || "Failed to save student");
      }
    } catch (error) {
      console.error("Error saving student:", error);
      setError(error.message || "Failed to save student");
    }
  };

  // Add this function to handle student creation
  const showCreateModal = () => {
    setEditingStudent(null);
    setFormData({
      student_id: "",
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      batch_month: "",
      batch_year: "",
      status: "active",
    });
    setIsModalOpen(true);
    setError("");
    setSuccess("");
  };

  // Update the handleEdit function
  const handleEdit = (student) => {
    console.log("Editing student:", student);
    setEditingStudent(student);
    setFormData({
      student_id: student.student_id,
      email: student.email,
      first_name: student.first_name,
      last_name: student.last_name,
      phone: student.phone || "",
      batch_month: student.batch_month || "",
      batch_year: student.batch_year || "",
      status: student.status || "active",
    });
    setIsModalOpen(true);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
    setEditingStudent(null);
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const token = getToken();
      const response = await fetch(
        `${API_BASE_URL}/api/admin/students/${studentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess("Student deleted successfully");
        fetchStudents(); // Refresh the list
      } else {
        throw new Error(result.message || result.error || "Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      setError(error.message || "Failed to delete student");
    }
  };

  // Rest of your component remains the same...
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      batchMonth: "",
      batchYear: "",
      status: "",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "#10B981", bg: "#ECFDF5", label: "ACTIVE" },
      inactive: { color: "#EF4444", bg: "#FEF2F2", label: "INACTIVE" },
      pending: { color: "#F59E0B", bg: "#FFFBEB", label: "PENDING" },
    };

    const config = statusConfig[status] || statusConfig.active;

    return (
      <span
        className="status-badge"
        style={{
          backgroundColor: config.bg,
          color: config.color,
          border: `1px solid ${config.color}20`,
        }}
      >
        {config.label}
      </span>
    );
  };

  const getBatchInfo = (batch_month, batch_year) => {
    if (!batch_month && !batch_year) {
      return "All Batches";
    }
    if (batch_month && batch_year) {
      return `${batch_month} ${batch_year}`;
    }
    if (batch_month) {
      return batch_month;
    }
    if (batch_year) {
      return batch_year;
    }
    return "All Batches";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getDisplayName = (student) => {
    return (
      student.fullName ||
      `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
      "Unknown Student"
    );
  };

  if (authLoading) {
    return (
      <div className="pa-loading-container">
        <div className="pa-loader"></div>
        <p>Checking authorization...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminAuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  // Rest of your JSX remains the same...
  return (
    <div className="student-management-admin">
      {/* Header with logout button */}
      <div className="admin-header">
        <div className="header-content">
          <h1>Student Management</h1>
          <p>Manage and monitor all student accounts</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem('adminAuth');
              window.location.reload();
            }}
          >
            Logout Admin
          </button>
          <button className="btn-create" onClick={showCreateModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Add New Student
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading students...</p>
        </div>
      )}

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon total">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0018.06 7h-1.12c-.94 0-1.81.56-2.19 1.42L13.5 13.5 16 18v4h4zm-7.5-10.5c.56 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM9.5 6c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm3.5 6c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm-7.5 6c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm0-2c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{students.filter((s) => s.status === "active").length}</h3>
            <p>Active Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon current">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{students.filter((s) => s.is_current_batch).length}</h3>
            <p>Current Batch</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon batches">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{new Set(students.map((s) => s.batch_year)).size}</h3>
            <p>Active Batches</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-header">
          <h3>Filters</h3>
          <button className="btn-clear" onClick={clearFilters}>
            Clear All
          </button>
        </div>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by name, email, or student ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Batch Month</label>
            <select
              value={filters.batchMonth}
              onChange={(e) => handleFilterChange("batchMonth", e.target.value)}
            >
              <option value="">All Months</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Batch Year</label>
            <select
              value={filters.batchYear}
              onChange={(e) => handleFilterChange("batchYear", e.target.value)}
            >
              <option value="">All Years</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="content-header">
          <h2>Student Directory</h2>
          <span className="student-count">({students.length} students)</span>
        </div>

        {/* Alerts */}
        {error && (
          <div className="alert error">
            <span>{error}</span>
            <button onClick={() => setError("")}>×</button>
          </div>
        )}
        {success && (
          <div className="alert success">
            <span>{success}</span>
            <button onClick={() => setSuccess("")}>×</button>
          </div>
        )}

        {/* Students Grid */}
        {!loading && students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3>No students found</h3>
            <p>Try adjusting your filters or add new students</p>
            <button className="btn-create" onClick={showCreateModal}>
              Add New Student
            </button>
          </div>
        ) : (
          <div className="students-grid">
            {students.map((student) => (
              <div key={student.id} className="student-card">
                <div className="student-header">
                  <div className="student-avatar">
                    {student.profile_image ? (
                      <img
                        src={student.profile_image}
                        alt={getDisplayName(student)}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <span style={{display: student.profile_image ? 'none' : 'flex'}}>
                      {getDisplayName(student).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="student-basic-info">
                    <h3>{getDisplayName(student)}</h3>
                    <p className="student-id">{student.student_id}</p>
                    {getStatusBadge(student.status)}
                  </div>
                  <div className="student-actions">
                    <button
                      className="btn-action edit"
                      onClick={() => handleEdit(student)}
                      title="Edit student"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </button>
                    <button
                      className="btn-action delete"
                      onClick={() => handleDelete(student.id)}
                      title="Delete student"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="student-details">
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{student.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">
                      {student.phone || "Not provided"}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Batch:</span>
                    <span className="detail-value">
                      {getBatchInfo(student.batch_month, student.batch_year)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Join Date:</span>
                    <span className="detail-value">
                      {formatDate(student.join_date || student.created_at)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Current Batch:</span>
                    <span className="detail-value">
                      {student.is_current_batch ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {student.current_coding_level && (
                  <div className="student-skills">
                    <span className="skills-label">Coding Level:</span>
                    <span className="skills-value">
                      {student.current_coding_level}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>
              <button className="modal-close" onClick={closeModal}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="alert error">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="student-id" className="form-label">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="student-id"
                    value={formData.student_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        student_id: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter student ID"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    id="student-email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="first-name" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="first-name"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        first_name: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="last-name" className="form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="last-name"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        last_name: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter last name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    id="student-phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-status" className="form-label">
                    Status *
                  </label>
                  <select
                    className="form-input"
                    id="student-status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="batch-month" className="form-label">
                    Batch Month
                  </label>
                  <select
                    className="form-input"
                    id="batch-month"
                    value={formData.batch_month}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        batch_month: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="batch-year" className="form-label">
                    Batch Year
                  </label>
                  <select
                    className="form-input"
                    id="batch-year"
                    value={formData.batch_year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        batch_year: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Year</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingStudent ? "Update Student" : "Create Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;