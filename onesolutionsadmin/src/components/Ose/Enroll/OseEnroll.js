import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const OseEnroll = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
    course: "",
    search: "",
    sortBy: "submitted_at",
    sortOrder: "DESC",
  });
  const [pagination, setPagination] = useState({});
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    status: "",
    notes: "",
  });

  // Get token with fallback
  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // Clear tokens and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(
        "https://ose.onesolutionsekam.in/api/auth/refresh",
        { refreshToken }
      );

      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        return response.data.accessToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      handleLogout();
    }
    return null;
  };

  // Axios interceptor for handling token refresh
  useEffect(() => {
    // Request interceptor to add token
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle 403 errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 403 and we haven't tried to refresh yet
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refreshToken();
            if (newToken) {
              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            handleLogout();
          }
        }

        // For other errors
        if (error.response?.status === 401 || error.response?.status === 403) {
          handleLogout();
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    fetchEnrollments();
    fetchStats();
  }, [filters]);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);

      // Check if token exists
      const token = getToken();
      if (!token) {
        toast.error("Please login to access enrollments");
        handleLogout();
        return;
      }

      // Remove empty filter values
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const params = new URLSearchParams(cleanFilters).toString();
      const response = await axios.get(
        `https://ose.onesolutionsekam.in/api/admin/enrollments?${params}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      if (response.data.success) {
        setEnrollments(response.data.enrollments);
        setPagination(response.data.pagination);
      } else {
        toast.error("Failed to load enrollments");
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);

      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast.error("Session expired. Please login again.");
          handleLogout();
        } else if (error.response.status === 404) {
          toast.error("Enrollments endpoint not found.");
        } else {
          toast.error(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("Failed to load enrollments.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      // Check if token exists
      const token = getToken();
      if (!token) {
        console.warn("No token found, skipping stats fetch");
        setStatsLoading(false);
        return;
      }

      const response = await axios.get(
        "https://ose.onesolutionsekam.in/api/admin/enrollments/stats",
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000,
        }
      );

      if (response.data) {
        setStats(response.data);
      } else {
        console.warn("Stats response empty");
        setStats({
          overall: {
            total: 0,
            pending: 0,
            contacted: 0,
            enrolled: 0,
            today: 0,
            this_week: 0,
          },
          byCourse: [],
          monthly: [],
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);

      // Don't show error toast for stats - it's not critical
      if (error.response?.status === 403) {
        console.warn("Access denied to stats endpoint");
      } else if (error.response?.status === 404) {
        console.warn("Stats endpoint not found");
      } else if (error.response?.status === 500) {
        console.warn("Server error fetching stats");
      }

      // Set default stats
      setStats({
        overall: {
          total: 0,
          pending: 0,
          contacted: 0,
          enrolled: 0,
          today: 0,
          this_week: 0,
        },
        byCourse: [],
        monthly: [],
      });
    } finally {
      setStatsLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleStatusUpdate = async (id) => {
    try {
      await axios.put(
        `https://ose.onesolutionsekam.in/api/admin/enrollments/${id}/status`,
        updateStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Status updated successfully");
      fetchEnrollments();
      fetchStats();
      setShowDetails(false);
      setSelectedEnrollment(null);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(
        "https://ose.onesolutionsekam.in/api/admin/enrollments/export",
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
          timeout: 30000,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `enrollments_export_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Export started successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-warning",
      contacted: "bg-info",
      enrolled: "bg-success",
      rejected: "bg-danger",
      followup: "bg-primary",
    };
    return badges[status] || "bg-secondary";
  };

  const getCourseColor = (course) => {
    const colors = {
      "web-development": "primary",
      "digital-marketing": "success",
      "data-analyst": "info",
    };
    return colors[course] || "secondary";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) {
      return;
    }

    try {
      await axios.delete(
        `https://ose.onesolutionsekam.in/api/admin/enrollments/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Enrollment deleted successfully");
      fetchEnrollments();
      fetchStats();
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      toast.error("Failed to delete enrollment");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Enrollment Management</h5>
                <div>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={handleExport}
                    disabled={loading}
                  >
                    <i className="bi bi-download me-1"></i> Export CSV
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      fetchEnrollments();
                      fetchStats();
                    }}
                    disabled={loading}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i> Refresh
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="card-body pt-0">
              {statsLoading ? (
                <div className="row g-3 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="col-6 col-md-2">
                      <div className="card border-0 bg-gradient-secondary shadow">
                        <div className="card-body p-3">
                          <div className="text-white text-center">
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <small className="d-block mt-2">Loading...</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : stats ? (
                <div className="row g-3 mb-4">
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-primary shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">{stats.overall?.total || 0}</h5>
                          <small>Total</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-warning shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">
                            {stats.overall?.pending || 0}
                          </h5>
                          <small>Pending</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-info shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">
                            {stats.overall?.contacted || 0}
                          </h5>
                          <small>Contacted</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-success shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">
                            {stats.overall?.enrolled || 0}
                          </h5>
                          <small>Enrolled</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-danger shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">{stats.overall?.today || 0}</h5>
                          <small>Today</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-secondary shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">
                            {stats.overall?.this_week || 0}
                          </h5>
                          <small>This Week</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning mb-4">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Unable to load statistics.
                  <button
                    className="btn btn-sm btn-outline-warning ms-2"
                    onClick={fetchStats}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, phone..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="rejected">Rejected</option>
                    <option value="followup">Follow-up</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    value={filters.course}
                    onChange={(e) =>
                      handleFilterChange("course", e.target.value)
                    }
                  >
                    <option value="">All Courses</option>
                    <option value="web-development">Web Development</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="data-analyst">Data Analyst</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                  >
                    <option value="submitted_at">Submission Date</option>
                    <option value="first_name">First Name</option>
                    <option value="email">Email</option>
                    <option value="course">Course</option>
                    <option value="status">Status</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    value={filters.sortOrder}
                    onChange={(e) =>
                      handleFilterChange("sortOrder", e.target.value)
                    }
                  >
                    <option value="DESC">Newest First</option>
                    <option value="ASC">Oldest First</option>
                  </select>
                </div>
                <div className="col-md-1">
                  <select
                    className="form-select"
                    value={filters.limit}
                    onChange={(e) =>
                      handleFilterChange("limit", e.target.value)
                    }
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollments Table */}
          <div className="card">
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : enrollments.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox display-4 text-muted"></i>
                  <p className="mt-3">No enrollments found</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Enrollment
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Course
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Contact
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Status
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Submitted
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div>
                                <i className="bi bi-person-circle me-2"></i>
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">
                                  {enrollment.full_name}
                                </h6>
                                <p className="text-xs text-secondary mb-0">
                                  {enrollment.education_level ||
                                    "Not specified"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`badge bg-${getCourseColor(
                                enrollment.course
                              )}`}
                            >
                              {enrollment.course
                                .replace("-", " ")
                                .toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold mb-0">
                              {enrollment.email}
                            </p>
                            <p className="text-xs text-secondary mb-0">
                              {enrollment.phone || "No phone"}
                            </p>
                          </td>
                          <td className="align-middle">
                            <span
                              className={`badge ${getStatusBadge(
                                enrollment.status
                              )}`}
                            >
                              {enrollment.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span className="text-secondary text-xs font-weight-bold">
                              {enrollment.formatted_date
                                ? enrollment.formatted_date
                                : format(
                                    new Date(enrollment.submitted_at),
                                    "dd MMM yyyy HH:mm"
                                  )}
                            </span>
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-sm btn-outline-info me-1"
                              onClick={() => {
                                setSelectedEnrollment(enrollment);
                                setUpdateStatus({
                                  status: enrollment.status,
                                  notes: enrollment.admin_notes || "",
                                });
                                setShowDetails(true);
                              }}
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-success me-1"
                              onClick={() => {
                                setSelectedEnrollment(enrollment);
                                setUpdateStatus({
                                  status: "contacted",
                                  notes: "",
                                });
                                handleStatusUpdate(enrollment.id);
                              }}
                              title="Mark as Contacted"
                            >
                              <i className="bi bi-telephone"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(enrollment.id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${
                    filters.page === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handleFilterChange("page", filters.page - 1)}
                    disabled={filters.page === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      filters.page === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handleFilterChange("page", i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    filters.page === pagination.totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handleFilterChange("page", filters.page + 1)}
                    disabled={filters.page === pagination.totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedEnrollment && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enrollment Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedEnrollment(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Personal Information</h6>
                    <p>
                      <strong>Name:</strong> {selectedEnrollment.full_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedEnrollment.email}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {selectedEnrollment.phone || "Not provided"}
                    </p>
                    <p>
                      <strong>Education:</strong>{" "}
                      {selectedEnrollment.education_level || "Not specified"}
                    </p>
                    <p>
                      <strong>Experience:</strong>{" "}
                      {selectedEnrollment.experience_level || "Not specified"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Course Information</h6>
                    <p>
                      <strong>Course:</strong> {selectedEnrollment.course}
                    </p>
                    <p>
                      <strong>Schedule:</strong>{" "}
                      {selectedEnrollment.schedule_preference || "Flexible"}
                    </p>
                    <p>
                      <strong>Submitted:</strong>{" "}
                      {selectedEnrollment.formatted_date ||
                        format(
                          new Date(selectedEnrollment.submitted_at),
                          "PPP p"
                        )}
                    </p>
                    <p>
                      <strong>Agreed to Terms:</strong>{" "}
                      {selectedEnrollment.agreed_to_terms ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Newsletter:</strong>{" "}
                      {selectedEnrollment.subscribe_to_newsletter
                        ? "Subscribed"
                        : "Not subscribed"}
                    </p>
                  </div>
                </div>

                {selectedEnrollment.motivation && (
                  <div className="mt-3">
                    <h6>Motivation</h6>
                    <p className="border p-3 rounded bg-light">
                      {selectedEnrollment.motivation}
                    </p>
                  </div>
                )}

                <div className="mt-4">
                  <h6>Update Status</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <select
                        className="form-select mb-3"
                        value={updateStatus.status}
                        onChange={(e) =>
                          setUpdateStatus((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="rejected">Rejected</option>
                        <option value="followup">Follow-up</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Add notes..."
                        value={updateStatus.notes}
                        onChange={(e) =>
                          setUpdateStatus((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedEnrollment(null);
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleStatusUpdate(selectedEnrollment.id)}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OseEnroll;
