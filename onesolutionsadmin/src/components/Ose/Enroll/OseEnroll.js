import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import "./enroll.css";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(
        "https://apiose.onesolutionsekam.in/api/auth/refresh",
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

  useEffect(() => {
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

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refreshToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            handleLogout();
          }
        }

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

      const token = getToken();
      if (!token) {
        toast.error("Please login to access enrollments");
        handleLogout();
        return;
      }

      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const params = new URLSearchParams(cleanFilters).toString();
      const response = await axios.get(
        `https://apiose.onesolutionsekam.in/api/admin/enrollments?${params}`,
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

      const token = getToken();
      if (!token) {
        console.warn("No token found, skipping stats fetch");
        setStatsLoading(false);
        return;
      }

      const response = await axios.get(
        "https://apiose.onesolutionsekam.in/api/admin/enrollments/stats",
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

      if (error.response?.status === 403) {
        console.warn("Access denied to stats endpoint");
      } else if (error.response?.status === 404) {
        console.warn("Stats endpoint not found");
      } else if (error.response?.status === 500) {
        console.warn("Server error fetching stats");
      }

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
        `https://apiose.onesolutionsekam.in/api/admin/enrollments/${id}/status`,
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
        "https://apiose.onesolutionsekam.in/api/admin/enrollments/export",
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
      pending: "badge-pendingenroll",
      contacted: "badge-contactedenroll",
      enrolled: "badge-enrolledenroll",
      rejected: "badge-rejectedenroll",
      followup: "badge-followupenroll",
    };
    return badges[status] || "badge-defaultenroll";
  };

  const getCourseColor = (course) => {
    const colors = {
      "web-development": "course-webenroll",
      "digital-marketing": "course-marketingenroll",
      "data-analyst": "course-dataenroll",
    };
    return colors[course] || "course-defaultenroll";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) {
      return;
    }

    try {
      await axios.delete(
        `https://apiose.onesolutionsekam.in/api/admin/enrollments/${id}`,
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

  const resetFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      status: "",
      course: "",
      search: "",
      sortBy: "submitted_at",
      sortOrder: "DESC",
    });
  };

  return (
    <div className="dashboard-enroll">
      {/* Sidebar */}
      <div className={`sidebar-enroll ${sidebarOpen ? "activeenroll" : ""}`}>
        <div className="sidebar-headerenroll">
          <h3>Filters</h3>
          <button
            className="close-sidebarenroll"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="sidebar-contentenroll">
          <div className="filter-groupenroll">
            <label className="filter-labelenroll">Search</label>
            <div className="input-groupenroll">
              <span className="input-iconenroll">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
              <input
                type="text"
                className="form-controlenroll"
                placeholder="Name, email, phone..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>

          <div className="filter-groupenroll">
            <label className="filter-labelenroll">Status</label>
            <select
              className="form-selectenroll"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
              <option value="rejected">Rejected</option>
              <option value="followup">Follow-up</option>
            </select>
          </div>

          <div className="filter-groupenroll">
            <label className="filter-labelenroll">Course</label>
            <select
              className="form-selectenroll"
              value={filters.course}
              onChange={(e) => handleFilterChange("course", e.target.value)}
            >
              <option value="">All Courses</option>
              <option value="web-development">Web Development</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="data-analyst">Data Analyst</option>
            </select>
          </div>

          <div className="filter-groupenroll">
            <label className="filter-labelenroll">Sort By</label>
            <select
              className="form-selectenroll"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="submitted_at">Submission Date</option>
              <option value="first_name">First Name</option>
              <option value="email">Email</option>
              <option value="course">Course</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div className="filter-groupenroll">
            <label className="filter-labelenroll">Sort Order</label>
            <select
              className="form-selectenroll"
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
            >
              <option value="DESC">Newest First</option>
              <option value="ASC">Oldest First</option>
            </select>
          </div>

          <div className="filter-groupenroll">
            <label className="filter-labelenroll">Items per page</label>
            <select
              className="form-selectenroll"
              value={filters.limit}
              onChange={(e) => handleFilterChange("limit", e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div className="filter-button-groupenroll">
            <button className="btn-resetenroll" onClick={resetFilters}>
              <i className="bi bi-arrow-clockwise"></i> Reset Filters
            </button>
            <button
              className="btn-applyenroll"
              onClick={() => setSidebarOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlayenroll"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="main-contentenroll">
        {/* Header */}
        <header className="header-enroll">
          <div className="header-leftenroll">
            <button
              className="sidebar-toggleenroll"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="bi bi-list"></i>
            </button>
            <h1 className="page-titleenroll">Enrollment Management</h1>
          </div>

          <div className="header-actionenroll">
            <div className="user-infoenroll">
              <div className="user-avatarenroll">
                <i className="bi bi-person-circle"></i>
              </div>
              <span className="user-nameenroll">Admin</span>
            </div>

            <div className="action-button-groupenroll">
              <button
                className="btn-actionenroll btn-exportenroll"
                onClick={handleExport}
                disabled={loading}
                title="Export CSV"
              >
                <i className="bi bi-download"></i>
              </button>
              <button
                className="btn-actionenroll btn-refreshenroll"
                onClick={() => {
                  fetchEnrollments();
                  fetchStats();
                }}
                disabled={loading}
                title="Refresh"
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
              <button
                className="btn-actionenroll btn-logoutenroll"
                onClick={handleLogout}
                title="Logout"
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-sectionenroll">
          <h2 className="section-titleenroll">Overview</h2>

          {statsLoading ? (
            <div className="stats-loadingenroll">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="stat-card-skeletonenroll">
                  <div className="skeleton-statvalenroll"></div>
                  <div className="skeleton-statlabelenroll"></div>
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="stats-gridenroll">
              <div className="stat-cardenroll stat-totalenroll">
                <div className="stat-iconenroll">
                  <i className="bi bi-people-fill"></i>
                </div>
                <div className="stat-contentenroll">
                  <h3 className="stat-valueenroll">
                    {stats.overall?.total || 0}
                  </h3>
                  <p className="stat-labelenroll">Total Enrollments</p>
                </div>
              </div>

              <div className="stat-cardenroll stat-pendingenroll">
                <div className="stat-iconenroll">
                  <i className="bi bi-clock-history"></i>
                </div>
                <div className="stat-contentenroll">
                  <h3 className="stat-valueenroll">
                    {stats.overall?.pending || 0}
                  </h3>
                  <p className="stat-labelenroll">Pending</p>
                </div>
              </div>

              <div className="stat-cardenroll stat-contactedenroll">
                <div className="stat-iconenroll">
                  <i className="bi bi-telephone-outbound-fill"></i>
                </div>
                <div className="stat-contentenroll">
                  <h3 className="stat-valueenroll">
                    {stats.overall?.contacted || 0}
                  </h3>
                  <p className="stat-labelenroll">Contacted</p>
                </div>
              </div>

              <div className="stat-cardenroll stat-enrolledenroll">
                <div className="stat-iconenroll">
                  <i className="bi bi-check-circle-fill"></i>
                </div>
                <div className="stat-contentenroll">
                  <h3 className="stat-valueenroll">
                    {stats.overall?.enrolled || 0}
                  </h3>
                  <p className="stat-labelenroll">Enrolled</p>
                </div>
              </div>

              <div className="stat-cardenroll stat-todayenroll">
                <div className="stat-iconenroll">
                  <i className="bi bi-calendar-day-fill"></i>
                </div>
                <div className="stat-contentenroll">
                  <h3 className="stat-valueenroll">
                    {stats.overall?.today || 0}
                  </h3>
                  <p className="stat-labelenroll">Today</p>
                </div>
              </div>

              <div className="stat-cardenroll stat-weekenroll">
                <div className="stat-iconenroll">
                  <i className="bi bi-calendar-week-fill"></i>
                </div>
                <div className="stat-contentenroll">
                  <h3 className="stat-valueenroll">
                    {stats.overall?.this_week || 0}
                  </h3>
                  <p className="stat-labelenroll">This Week</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="stats-error-enroll">
              <i className="bi bi-exclamation-triangle"></i>
              <p>Unable to load statistics</p>
              <button className="btn-retryenroll" onClick={fetchStats}>
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Quick Filters Bar */}
        <div className="quick-filtersenroll">
          <div className="quick-filter-groupenroll">
            <span
              className="filter-tagenroll activeenroll"
              onClick={() => handleFilterChange("status", "")}
            >
              All
            </span>
            <span
              className="filter-tagenroll filter-pendingenroll"
              onClick={() => handleFilterChange("status", "pending")}
            >
              Pending
            </span>
            <span
              className="filter-tagenroll filter-contactedenroll"
              onClick={() => handleFilterChange("status", "contacted")}
            >
              Contacted
            </span>
            <span
              className="filter-tagenroll filter-enrolledenroll"
              onClick={() => handleFilterChange("status", "enrolled")}
            >
              Enrolled
            </span>
            <span
              className="filter-tagenroll filter-followupenroll"
              onClick={() => handleFilterChange("status", "followup")}
            >
              Follow-up
            </span>
          </div>

          <div className="results-infoenroll">
            <span className="results-countenroll">
              Showing {enrollments.length} of {pagination.total || 0}{" "}
              enrollments
            </span>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="table-containerenroll">
          <div className="table-headerenroll">
            <h2 className="table-titleenroll">Enrollments</h2>
            <div className="table-actionenroll">
              <button
                className="btn-mobile-filterenroll"
                onClick={() => setSidebarOpen(true)}
              >
                <i className="bi bi-funnel-fill"></i> Filters
              </button>
            </div>
          </div>

          {loading ? (
            <div className="table-loadingenroll">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="row-skeletonenroll">
                  <div className="skeleton-cellenroll"></div>
                  <div className="skeleton-cellenroll"></div>
                  <div className="skeleton-cellenroll"></div>
                  <div className="skeleton-cellenroll"></div>
                  <div className="skeleton-cellenroll"></div>
                </div>
              ))}
            </div>
          ) : enrollments.length === 0 ? (
            <div className="empty-stateenroll">
              <div className="empty-iconenroll">
                <i className="bi bi-inboxes-fill"></i>
              </div>
              <h3 className="empty-titleenroll">No enrollments found</h3>
              <p className="empty-messageenroll">
                {filters.search || filters.status || filters.course
                  ? "Try adjusting your filters"
                  : "No enrollments have been submitted yet"}
              </p>
              {(filters.search || filters.status || filters.course) && (
                <button
                  className="btn-clear-filterenroll"
                  onClick={resetFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="table-responsiveenroll">
                <table className="table-enroll">
                  <thead>
                    <tr>
                      <th className="th-nameenroll">Student</th>
                      <th className="th-courseenroll">Course</th>
                      <th className="th-contactenroll">Contact</th>
                      <th className="th-statusenroll">Status</th>
                      <th className="th-dateenroll">Submitted</th>
                      <th className="th-actionenroll">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="table-rowenroll">
                        <td className="td-studentenroll">
                          <div className="student-infoenroll">
                            <div className="student-avatarenroll">
                              <i className="bi bi-person-fill"></i>
                            </div>
                            <div>
                              <h4 className="student-nameenroll">
                                {enrollment.full_name}
                              </h4>
                              <p className="student-educationenroll">
                                {enrollment.education_level ||
                                  "Education not specified"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="td-courseenroll">
                          <span
                            className={`course-badgenroll ${getCourseColor(
                              enrollment.course
                            )}`}
                          >
                            {enrollment.course.replace("-", " ").toUpperCase()}
                          </span>
                        </td>
                        <td className="td-contactenroll">
                          <div className="contact-infoenroll">
                            <a
                              href={`mailto:${enrollment.email}`}
                              className="contact-emailenroll"
                            >
                              <i className="bi bi-envelope-fill"></i>{" "}
                              {enrollment.email}
                            </a>
                            {enrollment.phone && (
                              <div className="contact-phonenroll">
                                <i className="bi bi-telephone-fill"></i>{" "}
                                {enrollment.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="td-statusenroll">
                          <span
                            className={`status-badgenroll ${getStatusBadge(
                              enrollment.status
                            )}`}
                          >
                            {enrollment.status.charAt(0).toUpperCase() +
                              enrollment.status.slice(1)}
                          </span>
                        </td>
                        <td className="td-dateenroll">
                          <div className="date-infoenroll">
                            <div className="date-daysenroll">
                              {format(
                                new Date(enrollment.submitted_at),
                                "dd MMM"
                              )}
                            </div>
                            <div className="date-timeenroll">
                              {format(
                                new Date(enrollment.submitted_at),
                                "HH:mm"
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="td-actionenroll">
                          <div className="action-button-groupenroll">
                            <button
                              className="btn-actionenroll btn-viewenroll"
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
                              <i className="bi bi-eye-fill"></i>
                            </button>
                            <button
                              className="btn-actionenroll btn-contactenroll"
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
                              <i className="bi bi-telephone-fill"></i>
                            </button>
                            <button
                              className="btn-actionenroll btn-deleteenroll"
                              onClick={() => handleDelete(enrollment.id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination-enroll">
                  <div className="pagination-infoenroll">
                    Page {filters.page} of {pagination.totalPages}
                  </div>
                  <div className="pagination-controlsenroll">
                    <button
                      className="pagination-btnenroll"
                      onClick={() =>
                        handleFilterChange("page", filters.page - 1)
                      }
                      disabled={filters.page === 1}
                    >
                      <i className="bi bi-chevron-left"></i> Previous
                    </button>

                    <div className="pagination-numberenroll">
                      {[...Array(Math.min(5, pagination.totalPages))].map(
                        (_, i) => {
                          let pageNum;
                          if (pagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (filters.page <= 3) {
                            pageNum = i + 1;
                          } else if (
                            filters.page >=
                            pagination.totalPages - 2
                          ) {
                            pageNum = pagination.totalPages - 4 + i;
                          } else {
                            pageNum = filters.page - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              className={`pagination-number-btnenroll ${
                                filters.page === pageNum ? "activeenroll" : ""
                              }`}
                              onClick={() =>
                                handleFilterChange("page", pageNum)
                              }
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      {pagination.totalPages > 5 &&
                        filters.page < pagination.totalPages - 2 && (
                          <>
                            <span className="pagination-dotsenroll">...</span>
                            <button
                              className="pagination-number-btnenroll"
                              onClick={() =>
                                handleFilterChange(
                                  "page",
                                  pagination.totalPages
                                )
                              }
                            >
                              {pagination.totalPages}
                            </button>
                          </>
                        )}
                    </div>

                    <button
                      className="pagination-btnenroll"
                      onClick={() =>
                        handleFilterChange("page", filters.page + 1)
                      }
                      disabled={filters.page === pagination.totalPages}
                    >
                      Next <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedEnrollment && (
        <div
          className="modal-overlayenroll"
          onClick={() => {
            setShowDetails(false);
            setSelectedEnrollment(null);
          }}
        >
          <div
            className="modal-contentenroll"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-headerenroll">
              <h2 className="modal-titleenroll">Enrollment Details</h2>
              <button
                className="modal-closeenroll"
                onClick={() => {
                  setShowDetails(false);
                  setSelectedEnrollment(null);
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-bodyenroll">
              <div className="detail-sectionenroll">
                <h3 className="detail-section-titleenroll">
                  <i className="bi bi-person-badge-fill"></i> Personal
                  Information
                </h3>
                <div className="detail-gridenroll">
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">Full Name</span>
                    <span className="detail-valueenroll">
                      {selectedEnrollment.full_name}
                    </span>
                  </div>
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">Email</span>
                    <a
                      href={`mailto:${selectedEnrollment.email}`}
                      className="detail-valueenroll"
                    >
                      {selectedEnrollment.email}
                    </a>
                  </div>
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">Phone</span>
                    <span className="detail-valueenroll">
                      {selectedEnrollment.phone || "Not provided"}
                    </span>
                  </div>
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">Education Level</span>
                    <span className="detail-valueenroll">
                      {selectedEnrollment.education_level || "Not specified"}
                    </span>
                  </div>
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">Experience</span>
                    <span className="detail-valueenroll">
                      {selectedEnrollment.experience_level || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-sectionenroll">
                <h3 className="detail-section-titleenroll">
                  <i className="bi bi-book-fill"></i> Course Information
                </h3>
                <div className="detail-gridenroll">
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">Course</span>
                    <span className="detail-valueenroll">
                      {selectedEnrollment.course
                        .replace("-", " ")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">
                      Schedule Preference
                    </span>
                    <span className="detail-valueenroll">
                      {selectedEnrollment.schedule_preference || "Flexible"}
                    </span>
                  </div>
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">Submitted Date</span>
                    <span className="detail-valueenroll">
                      {format(
                        new Date(selectedEnrollment.submitted_at),
                        "PPpp"
                      )}
                    </span>
                  </div>
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">Agreed to Terms</span>
                    <span className="detail-valueenroll">
                      {selectedEnrollment.agreed_to_terms ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="detail-itemenroll">
                    <span className="detail-labelenroll">Newsletter</span>
                    <span className="detail-valueenroll">
                      {selectedEnrollment.subscribe_to_newsletter
                        ? "Subscribed"
                        : "Not subscribed"}
                    </span>
                  </div>
                </div>
              </div>

              {selectedEnrollment.motivation && (
                <div className="detail-sectionenroll">
                  <h3 className="detail-section-titleenroll">
                    <i className="bi bi-chat-left-text-fill"></i> Motivation
                    Statement
                  </h3>
                  <div className="motivation-boxenroll">
                    {selectedEnrollment.motivation}
                  </div>
                </div>
              )}

              <div className="detail-sectionenroll">
                <h3 className="detail-section-titleenroll">
                  <i className="bi bi-pencil-square"></i> Update Status
                </h3>
                <div className="update-statusenroll">
                  <div className="status-select-groupenroll">
                    <label className="status-labelenroll">Status</label>
                    <select
                      className="status-selectenroll"
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

                  <div className="notes-groupenroll">
                    <label className="notes-labelenroll">Admin Notes</label>
                    <textarea
                      className="notes-textareaenroll"
                      rows="4"
                      placeholder="Add notes about this enrollment..."
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

            <div className="modal-footerenroll">
              <button
                className="btn-modal btn-cancelenroll"
                onClick={() => {
                  setShowDetails(false);
                  setSelectedEnrollment(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-modal btn-updateenroll"
                onClick={() => handleStatusUpdate(selectedEnrollment.id)}
              >
                <i className="bi bi-check-circle-fill"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OseEnroll;
