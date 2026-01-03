import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import "./contact.css";

const OseContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
    search: "",
    sortBy: "submitted_at",
    sortOrder: "DESC",
  });
  const [pagination, setPagination] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // table or card

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
    fetchContacts();
    fetchStats();
  }, [filters]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `https://ose.onesolutionsekam.in/api/admin/contacts?${params}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          timeout: 10000,
        }
      );
      setContacts(response.data.contacts);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Session expired. Please login again.");
        handleLogout();
      } else {
        toast.error("Failed to load contacts");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await axios.get(
        "https://ose.onesolutionsekam.in/api/admin/contacts/stats",
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          timeout: 5000,
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats({
        overall: {
          total: 0,
          unread: 0,
          read: 0,
          responded: 0,
          today: 0,
          this_week: 0,
        },
      });
    } finally {
      setStatsLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `https://ose.onesolutionsekam.in/api/admin/contacts/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success("Status updated successfully");
      fetchContacts();
      fetchStats();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleSendResponse = async (id) => {
    try {
      await axios.put(
        `https://ose.onesolutionsekam.in/api/admin/contacts/${id}`,
        {
          response: responseText,
          status: "responded",
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success("Response sent successfully");
      setResponseText("");
      setShowDetails(false);
      fetchContacts();
      fetchStats();
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Failed to send response");
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(
        "https://ose.onesolutionsekam.in/api/admin/contacts/export",
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          responseType: "blob",
          timeout: 30000,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `contacts_export_${new Date().toISOString().split("T")[0]}.csv`
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      await axios.delete(
        `https://ose.onesolutionsekam.in/api/admin/contacts/${id}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success("Contact deleted successfully");
      fetchContacts();
      fetchStats();
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      unread: "badge-unreadcontact",
      read: "badge-readcontact",
      responded: "badge-respondedcontact",
    };
    return badges[status] || "badge-defaultcontact";
  };

  const resetFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      status: "",
      search: "",
      sortBy: "submitted_at",
      sortOrder: "DESC",
    });
  };

  return (
    <div className="dashboard-contact">
      {/* Sidebar */}
      <div className={`sidebar-contact ${sidebarOpen ? "activecontact" : ""}`}>
        <div className="sidebar-headercontact">
          <h3>Filters</h3>
          <button
            className="close-sidebarcontact"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="sidebar-contentcontact">
          <div className="filter-groupcontact">
            <label className="filter-labelcontact">Search</label>
            <div className="input-groupcontact">
              <span className="input-iconcontact">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-controlcontact"
                placeholder="Name, email, subject..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>

          <div className="filter-groupcontact">
            <label className="filter-labelcontact">Status</label>
            <select
              className="form-selectcontact"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
            </select>
          </div>

          <div className="filter-groupcontact">
            <label className="filter-labelcontact">Sort By</label>
            <select
              className="form-selectcontact"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="submitted_at">Submission Date</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div className="filter-groupcontact">
            <label className="filter-labelcontact">Sort Order</label>
            <select
              className="form-selectcontact"
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
            >
              <option value="DESC">Newest First</option>
              <option value="ASC">Oldest First</option>
            </select>
          </div>

          <div className="filter-groupcontact">
            <label className="filter-labelcontact">Items per page</label>
            <select
              className="form-selectcontact"
              value={filters.limit}
              onChange={(e) => handleFilterChange("limit", e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div className="filter-button-groupcontact">
            <button className="btn-resetcontact" onClick={resetFilters}>
              <i className="bi bi-arrow-clockwise"></i> Reset Filters
            </button>
            <button
              className="btn-applycontact"
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
          className="sidebar-overlaycontact"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="main-contentcontact">
        {/* Header */}
        <header className="header-contact">
          <div className="header-leftcontact">
            <button
              className="sidebar-togglecontact"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="bi bi-list"></i>
            </button>
            <h1 className="page-titlecontact">Contact Management</h1>
          </div>

          <div className="header-actioncontact">
            <div className="user-infocontact">
              <div className="user-avatarcontact">
                <i className="bi bi-person-circle"></i>
              </div>
              <span className="user-namecontact">Admin</span>
            </div>

            <div className="action-button-groupcontact">
              <div className="view-togglecontact">
                <button
                  className={`view-btncontact ${
                    viewMode === "table" ? "activecontact" : ""
                  }`}
                  onClick={() => setViewMode("table")}
                  title="Table View"
                >
                  <i className="bi bi-table"></i>
                </button>
                <button
                  className={`view-btncontact ${
                    viewMode === "card" ? "activecontact" : ""
                  }`}
                  onClick={() => setViewMode("card")}
                  title="Card View"
                >
                  <i className="bi bi-grid-3x3-gap"></i>
                </button>
              </div>

              <button
                className="btn-actioncontact btn-exportcontact"
                onClick={handleExport}
                disabled={loading}
                title="Export CSV"
              >
                <i className="bi bi-download"></i>
              </button>
              <button
                className="btn-actioncontact btn-refreshcontact"
                onClick={() => {
                  fetchContacts();
                  fetchStats();
                }}
                disabled={loading}
                title="Refresh"
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
              <button
                className="btn-actioncontact btn-logoutcontact"
                onClick={handleLogout}
                title="Logout"
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-sectioncontact">
          {statsLoading ? (
            <div className="stats-loadingcontact">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="stat-card-skeletoncontact">
                  <div className="skeleton-statvalcontact"></div>
                  <div className="skeleton-statlabelcontact"></div>
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="stats-gridcontact">
              <div className="stat-cardcontact stat-totalcontact">
                <div className="stat-iconcontact">
                  <i className="bi bi-chat-square-text-fill"></i>
                </div>
                <div className="stat-contentcontact">
                  <h3 className="stat-valuecontact">
                    {stats.overall?.total || 0}
                  </h3>
                  <p className="stat-labelcontact">Total Contacts</p>
                </div>
              </div>

              <div className="stat-cardcontact stat-unreadcontact">
                <div className="stat-iconcontact">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div className="stat-contentcontact">
                  <h3 className="stat-valuecontact">
                    {stats.overall?.unread || 0}
                  </h3>
                  <p className="stat-labelcontact">Unread</p>
                </div>
              </div>

              <div className="stat-cardcontact stat-readcontact">
                <div className="stat-iconcontact">
                  <i className="bi bi-envelope-open-fill"></i>
                </div>
                <div className="stat-contentcontact">
                  <h3 className="stat-valuecontact">
                    {stats.overall?.read || 0}
                  </h3>
                  <p className="stat-labelcontact">Read</p>
                </div>
              </div>

              <div className="stat-cardcontact stat-respondedcontact">
                <div className="stat-iconcontact">
                  <i className="bi bi-check-circle-fill"></i>
                </div>
                <div className="stat-contentcontact">
                  <h3 className="stat-valuecontact">
                    {stats.overall?.responded || 0}
                  </h3>
                  <p className="stat-labelcontact">Responded</p>
                </div>
              </div>

              <div className="stat-cardcontact stat-todaycontact">
                <div className="stat-iconcontact">
                  <i className="bi bi-calendar-day-fill"></i>
                </div>
                <div className="stat-contentcontact">
                  <h3 className="stat-valuecontact">
                    {stats.overall?.today || 0}
                  </h3>
                  <p className="stat-labelcontact">Today</p>
                </div>
              </div>

              <div className="stat-cardcontact stat-weekcontact">
                <div className="stat-iconcontact">
                  <i className="bi bi-calendar-week-fill"></i>
                </div>
                <div className="stat-contentcontact">
                  <h3 className="stat-valuecontact">
                    {stats.overall?.this_week || 0}
                  </h3>
                  <p className="stat-labelcontact">This Week</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="stats-error-contact">
              <i className="bi bi-exclamation-triangle"></i>
              <p>Unable to load statistics</p>
              <button className="btn-retrycontact" onClick={fetchStats}>
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Quick Filters Bar */}
        <div className="quick-filterscontact">
          <div className="quick-filter-groupcontact">
            <span
              className="filter-tagcontact activecontact"
              onClick={() => handleFilterChange("status", "")}
            >
              All
            </span>
            <span
              className="filter-tagcontact filter-unreadcontact"
              onClick={() => handleFilterChange("status", "unread")}
            >
              Unread
            </span>
            <span
              className="filter-tagcontact filter-readcontact"
              onClick={() => handleFilterChange("status", "read")}
            >
              Read
            </span>
            <span
              className="filter-tagcontact filter-respondedcontact"
              onClick={() => handleFilterChange("status", "responded")}
            >
              Responded
            </span>
          </div>

          <div className="results-infocontact">
            <span className="results-countcontact">
              Showing {contacts.length} of {pagination.total || 0} contacts
            </span>
          </div>
        </div>

        {/* Contacts Content */}
        <div className="contacts-containercontact">
          <div className="contacts-headercontact">
            <h2 className="contacts-titlecontact">Contact Messages</h2>
            <div className="contacts-actioncontact">
              <button
                className="btn-mobile-filtercontact"
                onClick={() => setSidebarOpen(true)}
              >
                <i className="bi bi-funnel-fill"></i> Filters
              </button>
            </div>
          </div>

          {loading ? (
            <div className="contacts-loadingcontact">
              {viewMode === "table" ? (
                // Table Skeleton
                [...Array(5)].map((_, i) => (
                  <div key={i} className="row-skeletoncontact">
                    <div className="skeleton-cellcontact"></div>
                    <div className="skeleton-cellcontact"></div>
                    <div className="skeleton-cellcontact"></div>
                    <div className="skeleton-cellcontact"></div>
                    <div className="skeleton-cellcontact"></div>
                    <div className="skeleton-cellcontact"></div>
                  </div>
                ))
              ) : (
                // Card Skeleton
                <div className="cards-loadingcontact">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="card-skeletoncontact">
                      <div className="skeleton-headercontact"></div>
                      <div className="skeleton-bodycontact"></div>
                      <div className="skeleton-footercontact"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : contacts.length === 0 ? (
            <div className="empty-statecontact">
              <div className="empty-iconcontact">
                <i className="bi bi-chat-square-text"></i>
              </div>
              <h3 className="empty-titlecontact">No contacts found</h3>
              <p className="empty-messagecontact">
                {filters.search || filters.status
                  ? "Try adjusting your filters"
                  : "No contact messages have been submitted yet"}
              </p>
              {(filters.search || filters.status) && (
                <button
                  className="btn-clear-filtercontact"
                  onClick={resetFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : viewMode === "table" ? (
            <>
              {/* Table View */}
              <div className="table-responsivecontact">
                <table className="table-contact">
                  <thead>
                    <tr>
                      <th className="th-contactcontact">Contact</th>
                      <th className="th-subjectcontact">Subject</th>
                      <th className="th-messagecontact">Message Preview</th>
                      <th className="th-statuscontact">Status</th>
                      <th className="th-datecontact">Submitted</th>
                      <th className="th-actioncontact">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="table-rowcontact">
                        <td className="td-contactcontact">
                          <div className="contact-infocontact">
                            <div className="contact-avatarcontact">
                              <i className="bi bi-person-fill"></i>
                            </div>
                            <div>
                              <h4 className="contact-namecontact">
                                {contact.name}
                              </h4>
                              <a
                                href={`mailto:${contact.email}`}
                                className="contact-emailcontact"
                              >
                                {contact.email}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="td-subjectcontact">
                          <div className="subject-textcontact">
                            {contact.subject}
                          </div>
                        </td>
                        <td className="td-messagecontact">
                          <div className="message-previewcontact">
                            {contact.message.length > 100
                              ? `${contact.message.substring(0, 100)}...`
                              : contact.message}
                          </div>
                        </td>
                        <td className="td-statuscontact">
                          <span
                            className={`status-badgecontact ${getStatusBadge(
                              contact.status
                            )}`}
                          >
                            {contact.status.charAt(0).toUpperCase() +
                              contact.status.slice(1)}
                          </span>
                        </td>
                        <td className="td-datecontact">
                          <div className="date-infocontact">
                            <div className="date-dayscontact">
                              {format(new Date(contact.submitted_at), "dd MMM")}
                            </div>
                            <div className="date-timecontact">
                              {format(new Date(contact.submitted_at), "HH:mm")}
                            </div>
                          </div>
                        </td>
                        <td className="td-actioncontact">
                          <div className="action-button-groupcontact">
                            <button
                              className="btn-actioncontact btn-viewcontact"
                              onClick={() => {
                                setSelectedContact(contact);
                                setShowDetails(true);
                              }}
                              title="View Details"
                            >
                              <i className="bi bi-eye-fill"></i>
                            </button>
                            {contact.status !== "responded" && (
                              <button
                                className="btn-actioncontact btn-markcontact"
                                onClick={() =>
                                  handleStatusUpdate(contact.id, "read")
                                }
                                title="Mark as Read"
                              >
                                <i className="bi bi-check-circle-fill"></i>
                              </button>
                            )}
                            <button
                              className="btn-actioncontact btn-deletecontact"
                              onClick={() => handleDelete(contact.id)}
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
            </>
          ) : (
            // Card View
            <div className="cards-gridcontact">
              {contacts.map((contact) => (
                <div key={contact.id} className="contact-cardcontact">
                  <div className="card-headercontact">
                    <div className="contact-card-infocontact">
                      <div className="contact-card-avatarcontact">
                        <i className="bi bi-person-fill"></i>
                      </div>
                      <div>
                        <h4 className="contact-card-namecontact">
                          {contact.name}
                        </h4>
                        <a
                          href={`mailto:${contact.email}`}
                          className="contact-card-emailcontact"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                    <span
                      className={`contact-card-statuscontact ${getStatusBadge(
                        contact.status
                      )}`}
                    >
                      {contact.status}
                    </span>
                  </div>

                  <div className="card-bodycontact">
                    <div className="contact-card-subjectcontact">
                      <strong>Subject:</strong> {contact.subject}
                    </div>
                    <div className="contact-card-messagecontact">
                      {contact.message.length > 150
                        ? `${contact.message.substring(0, 150)}...`
                        : contact.message}
                    </div>
                    <div className="contact-card-datecontact">
                      <i className="bi bi-clock"></i>
                      {format(
                        new Date(contact.submitted_at),
                        "dd MMM yyyy HH:mm"
                      )}
                    </div>
                  </div>

                  <div className="card-footercontact">
                    <div className="contact-card-actionscontact">
                      <button
                        className="btn-card-actioncontact btn-card-viewcontact"
                        onClick={() => {
                          setSelectedContact(contact);
                          setShowDetails(true);
                        }}
                        title="View Details"
                      >
                        <i className="bi bi-eye-fill"></i> View
                      </button>
                      {contact.status !== "responded" && (
                        <button
                          className="btn-card-actioncontact btn-card-markcontact"
                          onClick={() => handleStatusUpdate(contact.id, "read")}
                          title="Mark as Read"
                        >
                          <i className="bi bi-check-circle-fill"></i> Read
                        </button>
                      )}
                      <button
                        className="btn-card-actioncontact btn-card-deletecontact"
                        onClick={() => handleDelete(contact.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="pagination-contact">
              <div className="pagination-infocontact">
                Page {filters.page} of {pagination.totalPages}
              </div>
              <div className="pagination-controlscontact">
                <button
                  className="pagination-btncontact"
                  onClick={() => handleFilterChange("page", filters.page - 1)}
                  disabled={filters.page === 1}
                >
                  <i className="bi bi-chevron-left"></i> Previous
                </button>

                <div className="pagination-numbercontact">
                  {[...Array(Math.min(5, pagination.totalPages))].map(
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (filters.page <= 3) {
                        pageNum = i + 1;
                      } else if (filters.page >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = filters.page - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          className={`pagination-number-btncontact ${
                            filters.page === pageNum ? "activecontact" : ""
                          }`}
                          onClick={() => handleFilterChange("page", pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                  {pagination.totalPages > 5 &&
                    filters.page < pagination.totalPages - 2 && (
                      <>
                        <span className="pagination-dotscontact">...</span>
                        <button
                          className="pagination-number-btncontact"
                          onClick={() =>
                            handleFilterChange("page", pagination.totalPages)
                          }
                        >
                          {pagination.totalPages}
                        </button>
                      </>
                    )}
                </div>

                <button
                  className="pagination-btncontact"
                  onClick={() => handleFilterChange("page", filters.page + 1)}
                  disabled={filters.page === pagination.totalPages}
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedContact && (
        <div
          className="modal-overlaycontact"
          onClick={() => {
            setShowDetails(false);
            setSelectedContact(null);
            setResponseText("");
          }}
        >
          <div
            className="modal-contentcontact"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-headercontact">
              <h2 className="modal-titlecontact">Contact Details</h2>
              <button
                className="modal-closecontact"
                onClick={() => {
                  setShowDetails(false);
                  setSelectedContact(null);
                  setResponseText("");
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-bodycontact">
              <div className="detail-sectioncontact">
                <h3 className="detail-section-titlecontact">
                  <i className="bi bi-person-badge-fill"></i> Contact
                  Information
                </h3>
                <div className="detail-gridcontact">
                  <div className="detail-itemcontact">
                    <span className="detail-labelcontact">Full Name</span>
                    <span className="detail-valuecontact">
                      {selectedContact.name}
                    </span>
                  </div>
                  <div className="detail-itemcontact">
                    <span className="detail-labelcontact">Email</span>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="detail-valuecontact"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="detail-itemcontact">
                    <span className="detail-labelcontact">Subject</span>
                    <span className="detail-valuecontact">
                      {selectedContact.subject}
                    </span>
                  </div>
                  <div className="detail-itemcontact">
                    <span className="detail-labelcontact">Submitted Date</span>
                    <span className="detail-valuecontact">
                      {format(new Date(selectedContact.submitted_at), "PPpp")}
                    </span>
                  </div>
                  <div className="detail-itemcontact">
                    <span className="detail-labelcontact">Status</span>
                    <span
                      className={`detail-valuecontact status-badgecontact ${getStatusBadge(
                        selectedContact.status
                      )}`}
                    >
                      {selectedContact.status.charAt(0).toUpperCase() +
                        selectedContact.status.slice(1)}
                    </span>
                  </div>
                  {selectedContact.responded_at && (
                    <div className="detail-itemcontact">
                      <span className="detail-labelcontact">
                        Responded Date
                      </span>
                      <span className="detail-valuecontact">
                        {format(new Date(selectedContact.responded_at), "PPpp")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="detail-sectioncontact">
                <h3 className="detail-section-titlecontact">
                  <i className="bi bi-chat-left-text-fill"></i> Message Content
                </h3>
                <div className="message-boxcontact">
                  {selectedContact.message}
                </div>
              </div>

              {selectedContact.response && (
                <div className="detail-sectioncontact">
                  <h3 className="detail-section-titlecontact">
                    <i className="bi bi-reply-fill"></i> Previous Response
                  </h3>
                  <div className="response-boxcontact">
                    {selectedContact.response}
                  </div>
                </div>
              )}

              <div className="detail-sectioncontact">
                <h3 className="detail-section-titlecontact">
                  <i className="bi bi-send-fill"></i> Send Response
                </h3>
                <div className="response-formcontact">
                  <div className="response-textareacontact">
                    <label className="response-labelcontact">
                      Your Response
                    </label>
                    <textarea
                      className="response-inputcontact"
                      rows="5"
                      placeholder="Type your response here..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                    />
                    <div className="response-charcountcontact">
                      {responseText.length}/2000 characters
                    </div>
                  </div>

                  <div className="response-quick-buttonscontact">
                    <span className="quick-button-labelcontact">
                      Quick Responses:
                    </span>
                    <div className="quick-buttonscontact">
                      <button
                        className="quick-btncontact"
                        onClick={() =>
                          setResponseText(
                            "Thank you for contacting us. We have received your message and will get back to you soon."
                          )
                        }
                      >
                        Thank you
                      </button>
                      <button
                        className="quick-btncontact"
                        onClick={() =>
                          setResponseText(
                            "We appreciate your feedback and will review it carefully."
                          )
                        }
                      >
                        Feedback received
                      </button>
                      <button
                        className="quick-btncontact"
                        onClick={() =>
                          setResponseText(
                            "We need more information. Could you please provide additional details?"
                          )
                        }
                      >
                        Need more info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footercontact">
              <button
                className="btn-modal btn-closecontact"
                onClick={() => {
                  setShowDetails(false);
                  setSelectedContact(null);
                  setResponseText("");
                }}
              >
                Close
              </button>
              {selectedContact.status !== "responded" && (
                <button
                  className="btn-modal btn-markreadcontact"
                  onClick={() => handleStatusUpdate(selectedContact.id, "read")}
                >
                  <i className="bi bi-envelope-open"></i> Mark as Read
                </button>
              )}
              <button
                className="btn-modal btn-sendcontact"
                onClick={() => handleSendResponse(selectedContact.id)}
                disabled={!responseText.trim()}
              >
                <i className="bi bi-send-fill"></i> Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OseContacts;
