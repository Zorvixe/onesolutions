"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Copy,
  RefreshCw,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  FileText,
} from "lucide-react"
import "./ClientManagement.css"

const ClientManagement = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectName: "",
    paymentAmount: "",
    projectDescription: "",
  })
  const [errors, setErrors] = useState({})
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://zorvixelocalbackend.onrender.com/api/admin/clients")
      const data = await response.json()
      if (data.success) {
        setClients(data.clients)
      }
    } catch (error) {
      console.error("Error fetching clients:", error)
    } finally {
      setLoading(false)
    }
  }

  const validateClient = () => {
    const newErrors = {}
    if (!newClient.name.trim()) newErrors.name = "Name is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newClient.email)) {
      newErrors.email = "Valid email is required"
    }
    if (!/^[0-9]{10,15}$/.test(newClient.phone)) {
      newErrors.phone = "Valid phone number is required"
    }
    if (!newClient.projectName.trim()) newErrors.projectName = "Project name is required"
    if (!newClient.paymentAmount || newClient.paymentAmount <= 0) {
      newErrors.paymentAmount = "Valid payment amount is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateClient = async (e) => {
    e.preventDefault()
    if (!validateClient()) return

    try {
      const response = await fetch("https://zorvixelocalbackend.onrender.com/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      })
      const data = await response.json()
      if (data.success) {
        setClients([data.client, ...clients])
        setNewClient({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectName: "",
          paymentAmount: "",
          projectDescription: "",
        })
        setShowForm(false)
        alert("Client created successfully!")
      }
    } catch (error) {
      console.error("Error creating client:", error)
      alert("Failed to create client")
    }
  }

  const generateClientLink = async (clientId) => {
    try {
      const response = await fetch("https://zorvixelocalbackend.onrender.com/api/admin/client-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId }),
      })
      const data = await response.json()
      if (data.success) {
        setClients(
          clients.map((client) =>
            client.id === clientId
              ? {
                  ...client,
                  active_token: data.token,
                  token_expiry: data.expiresAt,
                  token_active: true,
                  link_url: data.link,
                }
              : client,
          ),
        )
        alert("Payment link generated successfully!")
      } else {
        alert(data.message || "Failed to generate link")
      }
    } catch (error) {
      console.error("Error generating link:", error)
      alert("Network error: Failed to generate link")
    }
  }

  const toggleClientLink = async (clientId, currentStatus) => {
    try {
      const response = await fetch(
        `https://zorvixelocalbackend.onrender.com/api/admin/client-links/${clientId}/toggle`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: !currentStatus }),
        },
      )
      const data = await response.json()
      if (data.success) {
        setClients(
          clients.map((client) => (client.id === clientId ? { ...client, token_active: !currentStatus } : client)),
        )
        alert(`Link ${!currentStatus ? "activated" : "deactivated"} successfully!`)
      } else {
        alert(data.message || "Failed to toggle link")
      }
    } catch (error) {
      console.error("Error toggling link:", error)
      alert("Failed to toggle link status")
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert("Link copied to clipboard!")
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const isTokenExpired = (expiry) => {
    return new Date(expiry) < new Date()
  }

  return (
    <div className="client-management-container">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-content">
          <div className="header-text">
            <h1>Client Management</h1>
            <p>Create and manage client information with project details</p>
          </div>
          <div className="header-actions">
            <button onClick={fetchClients} className="refresh-btn" title="Refresh">
              <RefreshCw size={18} />
            </button>
            <button onClick={() => setShowForm(true)} className="add-client-btn">
              <Plus size={18} />
              Add New Client
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon clients">
            <User size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-number">{clients.length}</div>
            <div className="stat-label">Total Clients</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <Building size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-number">
              {clients.filter((c) => c.active_token && !isTokenExpired(c.token_expiry)).length}
            </div>
            <div className="stat-label">Active Links</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-number">{clients.filter((c) => c.payment_completed).length}</div>
            <div className="stat-label">Completed Payments</div>
          </div>
        </div>
      </div>

      {/* Create Client Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Add New Client</h2>
              <button onClick={() => setShowForm(false)} className="close-btn">
                ×
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleCreateClient}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <User size={16} />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      className={errors.name ? "error" : ""}
                      placeholder="Enter client's full name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      <Mail size={16} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      className={errors.email ? "error" : ""}
                      placeholder="client@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      <Phone size={16} />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      className={errors.phone ? "error" : ""}
                      placeholder="1234567890"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      <Building size={16} />
                      Company
                    </label>
                    <input
                      type="text"
                      value={newClient.company}
                      onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                      placeholder="Company name (optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FileText size={16} />
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={newClient.projectName}
                      onChange={(e) => setNewClient({ ...newClient, projectName: e.target.value })}
                      className={errors.projectName ? "error" : ""}
                      placeholder="Enter project name"
                    />
                    {errors.projectName && <span className="error-message">{errors.projectName}</span>}
                  </div>

                  <div className="form-group">
                    <label>
                      <DollarSign size={16} />
                      Payment Amount (Rs.) *
                    </label>
                    <input
                      type="number"
                      value={newClient.paymentAmount}
                      onChange={(e) => setNewClient({ ...newClient, paymentAmount: e.target.value })}
                      className={errors.paymentAmount ? "error" : ""}
                      min="1"
                      placeholder="5000"
                    />
                    {errors.paymentAmount && <span className="error-message">{errors.paymentAmount}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>
                      <FileText size={16} />
                      Project Description
                    </label>
                    <textarea
                      value={newClient.projectDescription}
                      onChange={(e) => setNewClient({ ...newClient, projectDescription: e.target.value })}
                      rows="4"
                      placeholder="Describe the project requirements and scope..."
                    />
                  </div>
                </div>

                <div className="form-footer">
                  <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    <Plus size={16} />
                    Create Client
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Clients List */}
      <div className="clients-section">
        <div className="section-header">
          <h2>Client List ({clients.length})</h2>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading clients...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="empty-state">
            <User size={64} />
            <h3>No clients found</h3>
            <p>Click "Add New Client" to create your first client</p>
          </div>
        ) : (
          <div className="clients-grid">
            {clients.map((client) => (
              <div key={client.id} className="client-card">
                <div className="client-header">
                  <div className="client-avatar">
                    <User size={24} />
                  </div>
                  <div className="client-info">
                    <h3>{client.name}</h3>
                    <p className="client-email">{client.email}</p>
                  </div>
                  <div className="client-badges">
                    <span className="client-id">#{client.id}</span>
                    {client.payment_completed && <span className="payment-status completed">Paid</span>}
                  </div>
                </div>

                <div className="client-details">
                  <div className="detail-row">
                    <Phone size={14} />
                    <span>{client.phone}</span>
                  </div>
                  {client.company && (
                    <div className="detail-row">
                      <Building size={14} />
                      <span>{client.company}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <FileText size={14} />
                    <span>{client.project_name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="project-id">Project: {client.project_id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="zorvixe-id">Zorvixe: {client.zorvixe_id}</span>
                  </div>
                  <div className="detail-row amount">
                    <DollarSign size={14} />
                    <span>Rs. {client.payment_amount?.toLocaleString()}</span>
                  </div>
                  {client.project_description && (
                    <div className="project-description">
                      <p>{client.project_description}</p>
                    </div>
                  )}
                  <div className="detail-row created">
                    <Calendar size={14} />
                    <span>{formatDate(client.created_at)}</span>
                  </div>
                </div>

                {/* Payment Link Section */}
                {client.active_token && !isTokenExpired(client.token_expiry) ? (
                  <div className={`payment-link-section ${client.token_active ? "active" : "inactive"}`}>
                    <div className="link-header">
                      <div className="link-status">
                        <div className={`status-indicator ${client.token_active ? "active" : "inactive"}`}></div>
                        <span>{client.token_active ? "Active Link" : "Inactive Link"}</span>
                      </div>
                      <span className="expiry">Expires: {formatDate(client.token_expiry)}</span>
                    </div>
                    <div className="link-actions">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            client.link_url ||
                              `https://zorvixetechnologies.onrender.com/payment/${client.active_token}`,
                          )
                        }
                        className="action-btn copy"
                        title="Copy Link"
                      >
                        <Copy size={14} />
                        Copy
                      </button>
                      <a
                        href={
                          client.link_url || `https://zorvixetechnologies.onrender.com/payment/${client.active_token}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn open"
                        title="Open Link"
                      >
                        <ExternalLink size={14} />
                        Open
                      </a>
                      <button
                        onClick={() => toggleClientLink(client.id, client.token_active)}
                        className={`action-btn toggle ${client.token_active ? "active" : "inactive"}`}
                        title={client.token_active ? "Deactivate" : "Activate"}
                      >
                        {client.token_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                        {client.token_active ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                    {client.reference_id && (
                      <div className="reference-info">
                        <strong>Reference ID:</strong> {client.reference_id}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-link-section">
                    <p>No active payment link</p>
                  </div>
                )}

                <div className="client-footer">
                  <button
                    onClick={() => generateClientLink(client.id)}
                    className="generate-link-btn"
                    disabled={client.payment_completed}
                  >
                    {client.active_token ? "Regenerate Link" : "Generate Payment Link"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientManagement
