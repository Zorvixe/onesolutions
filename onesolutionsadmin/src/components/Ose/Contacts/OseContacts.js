import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const OseContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const token = localStorage.getItem("token");

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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContacts(response.data.contacts);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "https://ose.onesolutionsekam.in/api/admin/contacts/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Status updated");
      fetchContacts();
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Response sent");
      setResponseText("");
      setShowDetails(false);
      fetchContacts();
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
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "contacts_export.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      unread: "bg-danger",
      read: "bg-warning",
      responded: "bg-success",
    };
    return badges[status] || "bg-secondary";
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Contact Form Management</h5>
                <div>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={handleExport}
                  >
                    <i className="bi bi-download me-1"></i> Export CSV
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={fetchContacts}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i> Refresh
                  </button>
                </div>
              </div>
            </div>

            {stats && (
              <div className="card-body pt-0">
                <div className="row g-3 mb-4">
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-primary shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">{stats.overall.total}</h5>
                          <small>Total</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-danger shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">{stats.overall.unread}</h5>
                          <small>Unread</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-warning shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">{stats.overall.read}</h5>
                          <small>Read</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-success shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">{stats.overall.responded}</h5>
                          <small>Responded</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-info shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">{stats.overall.today}</h5>
                          <small>Today</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-2">
                    <div className="card border-0 bg-gradient-secondary shadow">
                      <div className="card-body p-3">
                        <div className="text-white text-center">
                          <h5 className="mb-0">{stats.overall.this_week}</h5>
                          <small>This Week</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, subject..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="">All Status</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="responded">Responded</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                  >
                    <option value="submitted_at">Submission Date</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
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
              </div>
            </div>
          </div>

          {/* Contacts Table */}
          <div className="card">
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Contact
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Subject
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Message Preview
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
                      {contacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div>
                                <i className="bi bi-person-circle me-2"></i>
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{contact.name}</h6>
                                <p className="text-xs text-secondary mb-0">
                                  {contact.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold mb-0">
                              {contact.subject}
                            </p>
                          </td>
                          <td>
                            <p
                              className="text-xs mb-0 text-truncate"
                              style={{ maxWidth: "200px" }}
                            >
                              {contact.message}
                            </p>
                          </td>
                          <td className="align-middle">
                            <span
                              className={`badge ${getStatusBadge(
                                contact.status
                              )}`}
                            >
                              {contact.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span className="text-secondary text-xs font-weight-bold">
                              {format(
                                new Date(contact.submitted_at),
                                "dd MMM yyyy"
                              )}
                            </span>
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-sm btn-outline-info me-1"
                              onClick={() => {
                                setSelectedContact(contact);
                                setShowDetails(true);
                              }}
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            {contact.status !== "responded" && (
                              <button
                                className="btn btn-sm btn-outline-success me-1"
                                onClick={() =>
                                  handleStatusUpdate(contact.id, "read")
                                }
                                title="Mark as Read"
                              >
                                <i className="bi bi-check-circle"></i>
                              </button>
                            )}
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={async () => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this contact?"
                                  )
                                ) {
                                  try {
                                    await axios.delete(
                                      `https://ose.onesolutionsekam.in/api/admin/contacts/${contact.id}`,
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    );
                                    toast.success("Contact deleted");
                                    fetchContacts();
                                  } catch (error) {
                                    toast.error("Failed to delete contact");
                                  }
                                }
                              }}
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
      {showDetails && selectedContact && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedContact(null);
                    setResponseText("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Contact Information</h6>
                    <p>
                      <strong>Name:</strong> {selectedContact.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedContact.email}
                    </p>
                    <p>
                      <strong>Subject:</strong> {selectedContact.subject}
                    </p>
                    <p>
                      <strong>Submitted:</strong>{" "}
                      {format(new Date(selectedContact.submitted_at), "PPP p")}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <span
                        className={`badge ${getStatusBadge(
                          selectedContact.status
                        )} ms-2`}
                      >
                        {selectedContact.status.toUpperCase()}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Response Information</h6>
                    <p>
                      <strong>Responded:</strong>{" "}
                      {selectedContact.responded_at
                        ? format(
                            new Date(selectedContact.responded_at),
                            "PPP p"
                          )
                        : "Not responded yet"}
                    </p>
                    {selectedContact.admin_notes && (
                      <p>
                        <strong>Admin Notes:</strong>{" "}
                        {selectedContact.admin_notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h6>Message</h6>
                  <div className="border p-3 rounded bg-light">
                    {selectedContact.message}
                  </div>
                </div>

                {selectedContact.response && (
                  <div className="mb-4">
                    <h6>Previous Response</h6>
                    <div className="border p-3 rounded bg-success bg-opacity-10">
                      {selectedContact.response}
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <h6>Send Response</h6>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Type your response here..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedContact(null);
                    setResponseText("");
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleStatusUpdate(selectedContact.id, "read")}
                  disabled={selectedContact.status === "read"}
                >
                  Mark as Read
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSendResponse(selectedContact.id)}
                  disabled={!responseText.trim()}
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OseContacts;
