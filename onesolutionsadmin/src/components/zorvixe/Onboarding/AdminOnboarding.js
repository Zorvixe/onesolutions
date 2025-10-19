"use client"

import { useState, useEffect } from "react"
import {
  Download,
  ExternalLink,
  Plus,
  RefreshCw,
  User,
  Users,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import "./AdminOnboarding.css"

const API_BASE_URL = "https://zorvixelocalbackend.onrender.com"

export default function AdminOnboarding() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [generatingLink, setGeneratingLink] = useState(null)
  const [togglingLink, setTogglingLink] = useState(null)
  const [activeTab, setActiveTab] = useState("candidates")

  // Form state for creating new candidate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/candidates`)
      const data = await response.json()

      if (data.success) {
        setCandidates(data.candidates)
      } else {
        setError("Failed to fetch candidates")
      }
    } catch (err) {
      setError("Error fetching candidates: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name || formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters"
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Valid email is required"
    }

    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) {
      errors.phone = "Valid 10-digit phone number starting with 6-9 is required"
    }

    if (!formData.position || formData.position.trim().length < 2) {
      errors.position = "Position must be at least 2 characters"
    }

    return errors
  }

  const handleCreateCandidate = async (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Candidate created successfully!")
        setFormData({ name: "", email: "", phone: "", position: "" })
        setFormErrors({})
        setIsCreateDialogOpen(false)
        fetchCandidates()
      } else {
        if (data.errors) {
          setFormErrors(data.errors)
        } else {
          setError(data.message || "Failed to create candidate")
        }
      }
    } catch (err) {
      setError("Error creating candidate: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const generateOnboardingLink = async (candidateId) => {
    setGeneratingLink(candidateId)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/candidate-links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ candidateId }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Onboarding link generated successfully!")
        fetchCandidates()
      } else {
        setError(data.message || "Failed to generate link")
      }
    } catch (err) {
      setError("Error generating link: " + err.message)
    } finally {
      setGeneratingLink(null)
    }
  }

  const toggleCandidateLink = async (candidateId, currentActive) => {
    setTogglingLink(candidateId)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/candidate-links/${candidateId}/toggle`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: !currentActive }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(`Link ${!currentActive ? "activated" : "deactivated"} successfully!`)
        fetchCandidates()
      } else {
        setError(data.message || "Failed to toggle link")
      }
    } catch (err) {
      setError("Error toggling link: " + err.message)
    } finally {
      setTogglingLink(null)
    }
  }

  const isLinkExpired = (expiryDate) => {
    if (!expiryDate) return true
    return new Date(expiryDate) <= new Date()
  }

  const getTimeRemaining = (expiryDate) => {
    if (!expiryDate) return "Expired"

    const now = new Date()
    const expiry = new Date(expiryDate)
    const diffMs = expiry - now

    if (diffMs <= 0) return "Expired"

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m remaining`
    } else {
      return `${diffMinutes}m remaining`
    }
  }

  const updateCandidateStatus = async (candidateId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/candidates/${candidateId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Candidate status updated successfully!")
        fetchCandidates()
      } else {
        setError(data.message || "Failed to update status")
      }
    } catch (err) {
      setError("Error updating status: " + err.message)
    }
  }

  const downloadCandidateFile = async (candidateId, candidateName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/candidate-download/${candidateId}`)

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `${candidateName}-certificates.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Failed to download file")
      }
    } catch (err) {
      setError("Error downloading file: " + err.message)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { className: "status-pending-onb", label: "Pending", icon: Clock },
      documents_uploaded: { className: "status-uploaded-onb", label: "Documents Uploaded", icon: FileText },
      approved: { className: "status-approved-onb", label: "Approved", icon: CheckCircle },
      rejected: { className: "status-rejected-onb", label: "Rejected", icon: XCircle },
    }

    const config = statusConfig[status] || statusConfig.pending
    const IconComponent = config.icon

    return (
      <span className={`status-badge-onb ${config.className}`}>
        <IconComponent size={12} />
        {config.label}
      </span>
    )
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setSuccess("Link copied to clipboard!")
  }

  return (
    <div className="admin-onboarding-container-onb">
      {/* Header Section */}
      <div className="page-header-onb">
        <div className="header-content-onb">
          <div className="header-text-onb">
            <h1>Candidate Onboarding Management</h1>
            <p>Manage candidate onboarding and document uploads efficiently</p>
          </div>
          <button className="primary-btn-onb" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={18} />
            Add New Candidate
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="alert-onb alert-error-onb">
          <AlertCircle size={16} />
          <span>{error}</span>
          <button className="alert-close-onb" onClick={() => setError("")}>
            ×
          </button>
        </div>
      )}

      {success && (
        <div className="alert-onb alert-success-onb">
          <CheckCircle size={16} />
          <span>{success}</span>
          <button className="alert-close-onb" onClick={() => setSuccess("")}>
            ×
          </button>
        </div>
      )}

      {/* Stats Section */}
      <div className="stats-section-onb">
        <div className="stat-card-onb">
          <div className="stat-icon-onb total-onb">
            <Users size={24} />
          </div>
          <div className="stat-info-onb">
            <div className="stat-number-onb">{candidates.length}</div>
            <div className="stat-label-onb">Total Candidates</div>
          </div>
        </div>
        <div className="stat-card-onb">
          <div className="stat-icon-onb pending-onb">
            <Clock size={24} />
          </div>
          <div className="stat-info-onb">
            <div className="stat-number-onb">{candidates.filter((c) => c.status === "pending").length}</div>
            <div className="stat-label-onb">Pending</div>
          </div>
        </div>
        <div className="stat-card-onb">
          <div className="stat-icon-onb uploaded-onb">
            <FileText size={24} />
          </div>
          <div className="stat-info-onb">
            <div className="stat-number-onb">{candidates.filter((c) => c.status === "documents_uploaded").length}</div>
            <div className="stat-label-onb">Documents Uploaded</div>
          </div>
        </div>
        <div className="stat-card-onb">
          <div className="stat-icon-onb approved-onb">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info-onb">
            <div className="stat-number-onb">{candidates.filter((c) => c.status === "approved").length}</div>
            <div className="stat-label-onb">Approved</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content-onb">
        <div className="content-header-onb">
          <h2>All Candidates ({candidates.length})</h2>
          <button className="refresh-btn-onb" onClick={fetchCandidates} disabled={loading}>
            <RefreshCw size={16} className={loading ? "spinning-onb" : ""} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state-onb">
            <RefreshCw size={32} className="spinning-onb" />
            <p>Loading candidates...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="empty-state-onb">
            <User size={64} />
            <h3>No candidates found</h3>
            <p>Click "Add New Candidate" to get started</p>
          </div>
        ) : (
          <div className="table-container-onb">
            <table className="candidates-table-onb">
              <thead>
                <tr>
                  <th>Candidate Details</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Upload Status</th>
                  <th>Link Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>
                      <div className="candidate-info-onb">
                        <div className="candidate-avatar-onb">
                          <User size={20} />
                        </div>
                        <div className="candidate-details-onb">
                          <div className="candidate-name-onb">{candidate.name}</div>
                          <div className="candidate-contact-onb">
                            <Mail size={12} />
                            {candidate.email}
                          </div>
                          <div className="candidate-contact-onb">
                            <Phone size={12} />
                            {candidate.phone}
                          </div>
                          <div className="candidate-id-onb">ID: {candidate.candidate_id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="position-info-onb">
                        <Briefcase size={14} />
                        {candidate.position}
                      </div>
                    </td>
                    <td>
                      <div className="status-column-onb">
                        {getStatusBadge(candidate.status)}
                        <select
                          value={candidate.status}
                          onChange={(e) => updateCandidateStatus(candidate.id, e.target.value)}
                          className="status-select-onb"
                        >
                          <option value="pending">Pending</option>
                          <option value="documents_uploaded">Documents Uploaded</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      {candidate.file_name ? (
                        <div className="upload-info-onb">
                          <div className="upload-status-onb uploaded-onb">
                            <FileText size={12} />
                            Uploaded
                          </div>
                          <div className="file-details-onb">
                            <div className="file-name-onb">{candidate.file_name}</div>
                            <div className="file-meta-onb">
                              {formatFileSize(candidate.file_size)} •{" "}
                              {new Date(candidate.upload_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="upload-status-onb not-uploaded-onb">
                          <AlertCircle size={12} />
                          Not Uploaded
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="link-status-column-onb">
                        {!candidate.active_token ? (
                          <div className="link-status-onb no-link-onb">
                            <XCircle size={12} />
                            No Link Generated
                          </div>
                        ) : (
                          <div className="link-info-onb">
                            <div
                              className={`link-status-onb ${
                                candidate.token_active && !isLinkExpired(candidate.token_expiry)
                                  ? "active-onb"
                                  : "inactive-onb"
                              }`}
                            >
                              {candidate.token_active && !isLinkExpired(candidate.token_expiry) ? (
                                <>
                                  <CheckCircle size={12} />
                                  Active
                                </>
                              ) : (
                                <>
                                  <XCircle size={12} />
                                  Inactive
                                </>
                              )}
                            </div>
                            <div className="time-remaining-onb">{getTimeRemaining(candidate.token_expiry)}</div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="actions-column-onb">
                        {!candidate.active_token ? (
                          <button
                            className="action-btn-onb generate-onb"
                            onClick={() => generateOnboardingLink(candidate.id)}
                            disabled={generatingLink === candidate.id}
                          >
                            {generatingLink === candidate.id ? (
                              <RefreshCw size={14} className="spinning-onb" />
                            ) : (
                              <ExternalLink size={14} />
                            )}
                            Generate Link
                          </button>
                        ) : (
                          <div className="action-group-onb">
                            <div className="link-actions-onb">
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    `https://zorvixetechnologies.onrender.com/onboarding/${candidate.active_token}`,
                                  )
                                }
                                className="action-btn-onb copy-onb"
                                title="Copy Link"
                              >
                                <Copy size={14} />
                                Copy
                              </button>
                              <a
                                href={`https://zorvixetechnologies.onrender.com/onboarding/${candidate.active_token}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-btn-onb open-onb"
                                title="Open Link"
                              >
                                <ExternalLink size={14} />
                                Open
                              </a>
                              {!isLinkExpired(candidate.token_expiry) && (
                                <button
                                  className={`action-btn-onb toggle-onb ${candidate.token_active ? "active-onb" : "inactive-onb"}`}
                                  onClick={() => toggleCandidateLink(candidate.id, candidate.token_active)}
                                  disabled={togglingLink === candidate.id}
                                  title={candidate.token_active ? "Deactivate" : "Activate"}
                                >
                                  {togglingLink === candidate.id ? (
                                    <RefreshCw size={14} className="spinning-onb" />
                                  ) : candidate.token_active ? (
                                    <>
                                      <ToggleRight size={14} />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <ToggleLeft size={14} />
                                      Activate
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                            {isLinkExpired(candidate.token_expiry) && (
                              <button
                                className="action-btn-onb regenerate-onb"
                                onClick={() => generateOnboardingLink(candidate.id)}
                                disabled={generatingLink === candidate.id}
                              >
                                {generatingLink === candidate.id ? (
                                  <RefreshCw size={14} className="spinning-onb" />
                                ) : (
                                  <ExternalLink size={14} />
                                )}
                                Generate New
                              </button>
                            )}
                          </div>
                        )}

                        {candidate.file_name && (
                          <button
                            className="action-btn-onb download-onb"
                            onClick={() => downloadCandidateFile(candidate.id, candidate.name)}
                          >
                            <Download size={14} />
                            Download
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Candidate Modal */}
      {isCreateDialogOpen && (
        <div className="modal-overlay-onb">
          <div className="modal-container-onb">
            <div className="modal-header-onb">
              <h3>Create New Candidate</h3>
              <button className="modal-close-onb" onClick={() => setIsCreateDialogOpen(false)}>
                ×
              </button>
            </div>
            <div className="modal-content-onb">
              <p className="modal-description-onb">Add a new candidate to the onboarding system.</p>
              <form onSubmit={handleCreateCandidate} className="candidate-form-onb">
                <div className="form-group-onb">
                  <label htmlFor="name">
                    <User size={16} />
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter candidate's full name"
                    className={formErrors.name ? "error-onb" : ""}
                  />
                  {formErrors.name && <span className="error-message-onb">{formErrors.name}</span>}
                </div>

                <div className="form-group-onb">
                  <label htmlFor="email">
                    <Mail size={16} />
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter candidate's email"
                    className={formErrors.email ? "error-onb" : ""}
                  />
                  {formErrors.email && <span className="error-message-onb">{formErrors.email}</span>}
                </div>

                <div className="form-group-onb">
                  <label htmlFor="phone">
                    <Phone size={16} />
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit phone number"
                    className={formErrors.phone ? "error-onb" : ""}
                  />
                  {formErrors.phone && <span className="error-message-onb">{formErrors.phone}</span>}
                </div>

                <div className="form-group-onb">
                  <label htmlFor="position">
                    <Briefcase size={16} />
                    Position *
                  </label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Enter position/role"
                    className={formErrors.position ? "error-onb" : ""}
                  />
                  {formErrors.position && <span className="error-message-onb">{formErrors.position}</span>}
                </div>

                <div className="form-actions-onb">
                  <button type="button" className="cancel-btn-onb" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn-onb" disabled={loading}>
                    {loading ? "Creating..." : "Create Candidate"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
