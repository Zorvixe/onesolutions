"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  DollarSign,
  Clock,
} from "lucide-react"
import ClientManagement from "../Payments/ClientManagement"
import "./ZorvixePayment.css"

const ZorvixePayments = () => {
  const [showClientManagement, setShowClientManagement] = useState(false)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
    total: 0,
  })
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  })
  const [selectedPayment, setSelectedPayment] = useState(null)

  useEffect(() => {
    fetchPayments()
  }, [pagination.currentPage, filters.status])

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://zorvixelocalbackend.onrender.com/api/admin/payments?page=${pagination.currentPage}&limit=${pagination.limit}&status=${filters.status}`,
      )
      const data = await response.json()
      if (response.ok) {
        setPayments(data.payments)
        setPagination({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          limit: data.pagination.limit,
          total: data.pagination.total,
        })
      } else {
        throw new Error(data.message || "Failed to fetch payments")
      }
    } catch (error) {
      console.error("Error:", error)
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!filters.search.trim()) {
      fetchPayments()
      return
    }
    try {
      const response = await fetch(
        `https://zorvixelocalbackend.onrender.com/api/admin/payments/search?query=${filters.search}`,
      )
      const data = await response.json()
      if (response.ok) {
        setPayments(data.payments)
        setPagination({
          currentPage: 1,
          totalPages: 1,
          limit: 20,
          total: data.payments.length,
        })
      } else {
        throw new Error(data.message || "Search failed")
      }
    } catch (error) {
      console.error("Search error:", error)
      alert(`Error: ${error.message}`)
    }
  }

  const updatePaymentStatus = async (id, status) => {
    try {
      const response = await fetch(`https://zorvixelocalbackend.onrender.com/api/admin/payments/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })
      const data = await response.json()
      if (response.ok) {
        setPayments(payments.map((payment) => (payment.id === id ? { ...payment, status } : payment)))
        if (selectedPayment && selectedPayment.id === id) {
          setSelectedPayment({ ...selectedPayment, status })
        }
        alert(`Payment ${status} successfully!`)
      } else {
        throw new Error(data.message || "Status update failed")
      }
    } catch (error) {
      console.error("Update error:", error)
      alert(`Error: ${error.message}`)
    }
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination({ ...pagination, currentPage: page })
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
    if (name === "status") {
      setPagination({ ...pagination, currentPage: 1 })
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const statusColor = (status) => {
    switch (status) {
      case "verified":
        return "status-verified-zpay"
      case "rejected":
        return "status-rejected-zpay"
      case "pending":
        return "status-pending-zpay"
      default:
        return "status-default-zpay"
    }
  }

  return (
    <div className="payments-admin-container-zpay">
      {/* Header Section */}
      <div className="admin-header-zpay">
        <div className="header-content-zpay">
          <div className="header-text-zpay">
            <h1>{showClientManagement ? "Client Management" : "Payment Management"}</h1>
            <p>
              {showClientManagement
                ? "Create and manage client information with project details"
                : "Manage client payment submissions and verify receipts"}
            </p>
          </div>
          <div className="header-actions-zpay">
            <button className="toggle-view-btn-zpay" onClick={() => setShowClientManagement(!showClientManagement)}>
              {showClientManagement ? "Back to Payments" : "Manage Clients"}
            </button>
          </div>
        </div>
      </div>

      {showClientManagement ? (
        <ClientManagement />
      ) : (
        <>
          {/* Filters and Search Section */}
          <div className="controls-section-zpay">
            <div className="filters-container-zpay">
              <div className="filter-group-zpay">
                <Filter size={18} />
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="filter-select-zpay"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <form onSubmit={handleSearch} className="search-container-zpay">
                <div className="search-input-group-zpay">
                  <Search size={18} />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search clients, projects, IDs..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="search-input-zpay"
                  />
                  <button type="submit" className="search-btn-zpay">
                    Search
                  </button>
                </div>
              </form>
              <button onClick={fetchPayments} className="refresh-btn-zpay">
                <RefreshCw size={18} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="stats-dashboard-zpay">
            <div className="stat-card-zpay total-zpay">
              <div className="stat-icon-zpay">
                <DollarSign size={24} />
              </div>
              <div className="stat-info-zpay">
                <div className="stat-number-zpay">{pagination.total}</div>
                <div className="stat-label-zpay">Total Payments</div>
              </div>
            </div>
            <div className="stat-card-zpay pending-zpay">
              <div className="stat-icon-zpay">
                <Clock size={24} />
              </div>
              <div className="stat-info-zpay">
                <div className="stat-number-zpay">{payments.filter((p) => p.status === "pending").length}</div>
                <div className="stat-label-zpay">Pending</div>
              </div>
            </div>
            <div className="stat-card-zpay verified-zpay">
              <div className="stat-icon-zpay">
                <CheckCircle size={24} />
              </div>
              <div className="stat-info-zpay">
                <div className="stat-number-zpay">{payments.filter((p) => p.status === "verified").length}</div>
                <div className="stat-label-zpay">Verified</div>
              </div>
            </div>
            <div className="stat-card-zpay rejected-zpay">
              <div className="stat-icon-zpay">
                <XCircle size={24} />
              </div>
              <div className="stat-info-zpay">
                <div className="stat-number-zpay">{payments.filter((p) => p.status === "rejected").length}</div>
                <div className="stat-label-zpay">Rejected</div>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="payments-section-zpay">
            {loading ? (
              <div className="loading-state-zpay">
                <div className="loading-spinner-zpay"></div>
                <p>Loading payments...</p>
              </div>
            ) : payments.length === 0 ? (
              <div className="empty-state-zpay">
                <FileText size={64} />
                <h3>No Payments Found</h3>
                <p>Try changing your filters or search query</p>
              </div>
            ) : (
              <>
                <div className="table-container-zpay">
                  <table className="payments-table-zpay">
                    <thead>
                      <tr>
                        <th>Reference ID</th>
                        <th>Client Details</th>
                        <th>Project Info</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td>
                            <div className="reference-id-zpay">{payment.reference_id}</div>
                          </td>
                          <td>
                            <div className="client-details-zpay">
                              <div className="client-name-zpay">{payment.client_name}</div>
                              <div className="client-contact-zpay">{payment.client_email}</div>
                              <div className="client-contact-zpay">{payment.client_phone}</div>
                            </div>
                          </td>
                          <td>
                            <div className="project-details-zpay">
                              <div className="project-name-zpay">{payment.project_name}</div>
                              <div className="project-ids-zpay">
                                <span className="project-id-zpay">ID: {payment.project_id}</span>
                                <span className="zorvixe-id-zpay">Zorvixe: {payment.zorvixe_id}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="amount-zpay">Rs. {payment.amount?.toLocaleString()}</div>
                          </td>
                          <td>
                            <div className="date-info-zpay">
                              <Calendar size={14} />
                              {formatDate(payment.created_at)}
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge-zpay ${statusColor(payment.status)}`}>{payment.status}</span>
                          </td>
                          <td>
                            <div className="actions-column-zpay">
                              <button onClick={() => setSelectedPayment(payment)} className="view-details-btn-zpay">
                                View Details
                              </button>
                              {payment.status === "pending" && (
                                <div className="action-buttons-zpay">
                                  <button
                                    onClick={() => updatePaymentStatus(payment.id, "verified")}
                                    className="verify-btn-zpay"
                                  >
                                    <CheckCircle size={14} />
                                    Verify
                                  </button>
                                  <button
                                    onClick={() => updatePaymentStatus(payment.id, "rejected")}
                                    className="reject-btn-zpay"
                                  >
                                    <XCircle size={14} />
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="pagination-section-zpay">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="pagination-btn-zpay"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>
                  <div className="page-info-zpay">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </div>
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="pagination-btn-zpay"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Payment Detail Modal */}
          {selectedPayment && (
            <div className="modal-overlay-zpay">
              <div className="payment-modal-zpay">
                <div className="modal-header-zpay">
                  <h3>Payment Details</h3>
                  <button onClick={() => setSelectedPayment(null)} className="close-modal-btn-zpay">
                    ×
                  </button>
                </div>
                <div className="modal-body-zpay">
                  <div className="payment-info-grid-zpay">
                    <div className="info-item-zpay">
                      <label>Reference ID</label>
                      <div className="info-value-zpay reference-zpay">{selectedPayment.reference_id}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Client Name</label>
                      <div className="info-value-zpay">{selectedPayment.client_name}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Client Email</label>
                      <div className="info-value-zpay">{selectedPayment.client_email}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Client Phone</label>
                      <div className="info-value-zpay">{selectedPayment.client_phone}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Project Name</label>
                      <div className="info-value-zpay">{selectedPayment.project_name}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Project ID</label>
                      <div className="info-value-zpay project-id-zpay">{selectedPayment.project_id}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Zorvixe ID</label>
                      <div className="info-value-zpay zorvixe-id-zpay">{selectedPayment.zorvixe_id}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Amount</label>
                      <div className="info-value-zpay amount-zpay">Rs. {selectedPayment.amount?.toLocaleString()}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Due Date</label>
                      <div className="info-value-zpay">{formatDate(selectedPayment.due_date)}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Submission Date</label>
                      <div className="info-value-zpay">{formatDate(selectedPayment.created_at)}</div>
                    </div>
                    <div className="info-item-zpay">
                      <label>Status</label>
                      <div className="info-value-zpay">
                        <span className={`status-badge-zpay ${statusColor(selectedPayment.status)}`}>
                          {selectedPayment.status}
                        </span>
                      </div>
                    </div>
                    {selectedPayment.project_description && (
                      <div className="info-item-zpay full-width-zpay">
                        <label>Project Description</label>
                        <div className="info-value-zpay description-zpay">{selectedPayment.project_description}</div>
                      </div>
                    )}
                  </div>
                  <div className="receipt-section-zpay">
                    <h4>Payment Receipt</h4>
                    <div className="receipt-container-zpay">
                      {selectedPayment.receipt_url?.endsWith(".pdf") ? (
                        <div className="pdf-preview-zpay">
                          <FileText size={48} />
                          <p>PDF Receipt</p>
                          <a
                            href={selectedPayment.receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-pdf-btn-zpay"
                          >
                            View PDF
                          </a>
                        </div>
                      ) : (
                        <img
                          src={selectedPayment.receipt_url || "/placeholder.svg"}
                          alt="Payment Receipt"
                          className="receipt-image-zpay"
                        />
                      )}
                      <a
                        href={selectedPayment.receipt_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-receipt-btn-zpay"
                      >
                        <Download size={16} />
                        Download Receipt
                      </a>
                    </div>
                  </div>
                </div>
                <div className="modal-footer-zpay">
                  {selectedPayment.status === "pending" && (
                    <div className="status-actions-zpay">
                      <button
                        onClick={() => updatePaymentStatus(selectedPayment.id, "verified")}
                        className="verify-payment-btn-zpay"
                      >
                        <CheckCircle size={18} />
                        Verify Payment
                      </button>
                      <button
                        onClick={() => updatePaymentStatus(selectedPayment.id, "rejected")}
                        className="reject-payment-btn-zpay"
                      >
                        <XCircle size={18} />
                        Reject Payment
                      </button>
                    </div>
                  )}
                  <button onClick={() => setSelectedPayment(null)} className="close-modal-btn-footer-zpay">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ZorvixePayments
