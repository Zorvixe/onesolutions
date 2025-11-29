"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentList.css";
import AdminAuthModal from "../AdminAuthModal/AdminAuthModal";
import { useAdminAuth } from "../AdminAuthModal/useAdminAuth";

const API_BASE_URL = "https://api.onesolutionsekam.in";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_id: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    batch_month: "",
    batch_year: "",
    password: "",
    status: "active",
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    batchMonth: "",
    batchYear: "",
    status: "",
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  // Online stats
  const [onlineStats, setOnlineStats] = useState({
    totalOnline: 0,
    totalStudents: 0,
  });

  // Admin Auth
  const {
    isAuthenticated,
    showAuthModal,
    loading: authLoading,
    setShowAuthModal,
    handleAuthSuccess,
    getAuthHeaders,
  } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchStudents();
      // Set up interval to refresh online status every 30 seconds
      const interval = setInterval(fetchStudents, 30000);
      return () => clearInterval(interval);
    }
  }, [filters, pagination.page, isAuthenticated]);

  const fetchStudents = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.batchMonth) params.append("batchMonth", filters.batchMonth);
      if (filters.batchYear) params.append("batchYear", filters.batchYear);
      if (filters.status) params.append("status", filters.status);
      params.append("page", pagination.page);
      params.append("limit", pagination.limit);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/students?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setStudents(result.data.students || []);
        setOnlineStats(
          result.data.onlineStats || { totalOnline: 0, totalStudents: 0 }
        );
        setPagination(
          result.data.pagination || {
            page: 1,
            limit: 10,
            total: 0,
            pages: 0,
          }
        );
      } else {
        throw new Error(result.message || "Failed to fetch students");
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      toast.error(err.message || "Failed to fetch students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Online status indicator component
  const OnlineStatus = ({ isOnline }) => (
    <div
      className={`online-status-stud ${
        isOnline ? "online-stud" : "offline-stud"
      }`}
    >
      <div className="status-dot-stud"></div>
      <span>{isOnline ? "Online" : "Offline"}</span>
    </div>
  );

  // Password display component
  const PasswordDisplay = ({ password }) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="password-display-stud">
        <span>{visible ? password : "••••••••"}</span>
        <button
          type="button"
          className="btn-password-toggle-stud"
          onClick={() => setVisible(!visible)}
          title={visible ? "Hide password" : "Show password"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            {visible ? (
              <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
            ) : (
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            )}
          </svg>
        </button>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingStudent
        ? `${API_BASE_URL}/api/admin/students/${editingStudent.id}`
        : `${API_BASE_URL}/api/admin/students`;

      const method = editingStudent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(
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
          password: "",
          status: "active",
        });
        setEditingStudent(null);
        fetchStudents(); // Refresh the list
      } else {
        throw new Error(
          result.message || result.error || "Failed to save student"
        );
      }
    } catch (error) {
      console.error("Error saving student:", error);
      toast.error(error.message || "Failed to save student");
    }
  };

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
      password: "",
      status: "active",
    });
    setIsModalOpen(true);
  };

  const createstudent = () => {
    navigate("/student_register");
  };

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
      password: "", // Don't pre-fill password for security
      status: student.status || "active",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setShowPassword(false);
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/students/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Student deleted successfully");
        fetchStudents(); // Refresh the list
      } else {
        throw new Error(
          result.message || result.error || "Failed to delete student"
        );
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(error.message || "Failed to delete student");
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Reset to first page when filters change
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      batchMonth: "",
      batchYear: "",
      status: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
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
        className="status-badge-stud"
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

  // Pagination component
  const Pagination = () => {
    const { page, pages } = pagination;

    if (pages <= 1) return null;

    return (
      <div className="pagination-stud">
        <button
          className="pagination-btn-stud"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>

        <div className="pagination-pages-stud">
          {Array.from({ length: pages }, (_, i) => i + 1)
            .filter(
              (p) => p === 1 || p === pages || (p >= page - 1 && p <= page + 1)
            )
            .map((p, index, array) => {
              // Add ellipsis for gaps
              const showEllipsis = index > 0 && p - array[index - 1] > 1;
              return (
                <div key={p} style={{ display: "flex", alignItems: "center" }}>
                  {showEllipsis && (
                    <span className="pagination-ellipsis-stud">...</span>
                  )}
                  <button
                    className={`pagination-page-stud ${
                      p === page ? "active-stud" : ""
                    }`}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                </div>
              );
            })}
        </div>

        <button
          className="pagination-btn-stud"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= pages}
        >
          Next
        </button>
      </div>
    );
  };

  if (authLoading) {
    return (
      <div className="pa-loading-container-stud">
        <div className="pa-loader-stud"></div>
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

  return (
    <div className="student-management-admin-stud">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Header */}
      <div className="admin-header-stud">
        <div className="header-content-stud">
          <h1>Student Management</h1>
          <p>Manage and monitor all student accounts</p>
          {/* Online Stats */}
          <div className="online-stats-stud">
            <div className="stat-item-stud">
              <span className="stat-number-stud">
                {onlineStats.totalOnline}
              </span>
              <span className="stat-label-stud">Online Now</span>
            </div>
            <div className="stat-item-stud">
              <span className="stat-number-stud">
                {onlineStats.totalStudents}
              </span>
              <span className="stat-label-stud">Total Students</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn-logout-stud"
            onClick={() => {
              localStorage.removeItem("adminAuth");
              localStorage.removeItem("adminToken");
              window.location.reload();
            }}
          >
            Logout Admin
          </button>
          <button className="btn-create-stud" onClick={createstudent}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Add New Student
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="pa-loading-container-stud">
          <div className="pa-loader-stud"></div>
          <p>Loading students...</p>
        </div>
      )}

      {/* Stats Overview */}
      <div className="stats-overview-stud">
        <div className="stat-card-stud">
          <div className="stat-icon-stud total-stud">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0018.06 7h-1.12c-.94 0-1.81.56-2.19 1.42L13.5 13.5 16 18v4h4zm-7.5-10.5c.56 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM9.5 6c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm3.5 6c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm-7.5 6c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm0-2c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2z" />
            </svg>
          </div>
          <div className="stat-info-stud">
            <h3>{pagination.total}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card-stud">
          <div className="stat-icon-stud active-stud">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="stat-info-stud">
            <h3>{students.filter((s) => s.status === "active").length}</h3>
            <p>Active Students</p>
          </div>
        </div>
        <div className="stat-card-stud online-stud">
          <div className="stat-icon-stud">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
          <div className="stat-info-stud">
            <h3>{onlineStats.totalOnline}</h3>
            <p>Online Now</p>
          </div>
        </div>
        <div className="stat-card-stud">
          <div className="stat-icon-stud batches-stud">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
            </svg>
          </div>
          <div className="stat-info-stud">
            <h3>{new Set(students.map((s) => s.batch_year)).size}</h3>
            <p>Active Batches</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section-stud">
        <div className="filters-header-stud">
          <h3>Filters</h3>
          <button className="btn-clear-stud" onClick={clearFilters}>
            Clear All
          </button>
        </div>
        <div className="filters-grid-stud">
          <div className="filter-group-stud">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by name, email, or student ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <div className="filter-group-stud">
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
          <div className="filter-group-stud">
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
          <div className="filter-group-stud">
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
      <div className="admin-content-stud">
        <div className="content-header-stud">
          <h2>Student Directory</h2>
          <span className="student-count-stud">
            Showing {students.length} of {pagination.total} students
            {pagination.pages > 1 &&
              ` (Page ${pagination.page} of ${pagination.pages})`}
          </span>
        </div>

        {/* Students Table */}
        {!loading && students.length === 0 ? (
          <div className="empty-state-stud">
            <div className="empty-icon-stud">
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
            <button className="btn-create-stud" onClick={showCreateModal}>
              Add New Student
            </button>
          </div>
        ) : (
          <div className="students-table-container-stud">
            <table className="students-table-stud">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Contact</th>
                  <th>Batch</th>
                  <th>Password</th>
                  <th>Status</th>
                  <th>Online</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="avatar-container-stud">
                        <div className="student-avatar-stud">
                          {student.profile_image ? (
                            <img
                              src={student.profile_image}
                              alt={getDisplayName(student)}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <span
                            style={{
                              display: student.profile_image ? "none" : "flex",
                            }}
                          >
                            {getDisplayName(student).charAt(0).toUpperCase()}
                          </span>
                          <div
                            className={`online-badge-stud ${
                              student.is_online ? "online-stud" : "offline-stud"
                            }`}
                          ></div>
                        </div>
                        <div>
                          <div className="student-name-stud">
                            {getDisplayName(student)}
                          </div>
                          <div className="student-id-stud">
                            {student.student_id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div style={{ color: "#6b7280", fontSize: "12px" }}>
                          {student.email}
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "12px" }}>
                          {student.phone || "Not provided"}
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "#6b7280", fontSize: "12px" }}>
                      {getBatchInfo(student.batch_month, student.batch_year)}
                    </td>
                    <td style={{ color: "#6b7280", fontSize: "12px" }}>
                      <PasswordDisplay password={student.password} />
                    </td>
                    <td>{getStatusBadge(student.status)}</td>
                    <td>
                      <OnlineStatus isOnline={student.is_online} />
                    </td>
                    <td style={{ color: "#6b7280", fontSize: "12px" }}>
                      {formatDate(student.join_date || student.created_at)}
                    </td>
                    <td>
                      <div className="student-actions-stud">
                        <button
                          className="btn-action-stud edit-stud"
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
                          className="btn-action-stud delete-stud"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bottom */}
        {pagination.pages > 1 && <Pagination />}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay-stud" onClick={closeModal}>
          <div
            className="modal-content-stud"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-stud">
              <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>
              <button className="modal-close-stud" onClick={closeModal}>
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

            <form onSubmit={handleSubmit} className="modal-form-stud">
              <div className="form-grid-stud">
                <div className="form-group-stud">
                  <label htmlFor="student-id" className="form-label-stud">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    className="form-input-stud"
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

                <div className="form-group-stud">
                  <label htmlFor="student-email" className="form-label-stud">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-input-stud"
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

                <div className="form-group-stud">
                  <label htmlFor="first-name" className="form-label-stud">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="form-input-stud"
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

                <div className="form-group-stud">
                  <label htmlFor="last-name" className="form-label-stud">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="form-input-stud"
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

                <div className="form-group-stud">
                  <label htmlFor="student-phone" className="form-label-stud">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-input-stud"
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

                <div className="form-group-stud password-field-stud">
                  <label htmlFor="password" className="form-label-stud">
                    Password {editingStudent && "(Leave blank to keep current)"}
                  </label>
                  <div className="password-input-container-stud">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-input-stud"
                      id="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      placeholder={
                        editingStudent ? "Enter new password" : "Enter password"
                      }
                    />
                    <button
                      type="button"
                      className="password-toggle-stud"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        {showPassword ? (
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                        ) : (
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="form-group-stud">
                  <label htmlFor="student-status" className="form-label-stud">
                    Status *
                  </label>
                  <select
                    className="form-input-stud"
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

                <div className="form-group-stud">
                  <label htmlFor="batch-month" className="form-label-stud">
                    Batch Month
                  </label>
                  <select
                    className="form-input-stud"
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

                <div className="form-group-stud">
                  <label htmlFor="batch-year" className="form-label-stud">
                    Batch Year
                  </label>
                  <select
                    className="form-input-stud"
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

              <div className="form-actions-stud">
                <button
                  type="button"
                  className="btn-cancel-stud"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit-stud">
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
