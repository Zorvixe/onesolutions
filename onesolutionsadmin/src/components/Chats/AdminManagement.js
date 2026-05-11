import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminManagement = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    adminname: "",
    username: "",
    phone: "",
    admin_image_link: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://apiose.onesolutionsekam.in/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://apiose.onesolutionsekam.in/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Role update failed");
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      adminname: user.adminname,
      username: user.username,
      phone: user.phone,
      admin_image_link: user.admin_image_link || "",
      password: "",
    });
    setEditModalOpen(true);
  };

  // Save edited user
  const saveEdit = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("token");
      const payload = {};
      if (editForm.adminname) payload.adminname = editForm.adminname;
      if (editForm.username) payload.username = editForm.username;
      if (editForm.phone) payload.phone = editForm.phone;
      if (editForm.admin_image_link) payload.admin_image_link = editForm.admin_image_link;
      if (editForm.password) payload.password = editForm.password;

      await axios.put(
        `https://apiose.onesolutionsekam.in/api/admin/users/${selectedUser.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User updated successfully");
      setEditModalOpen(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://apiose.onesolutionsekam.in/api/admin/users/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted");
      setDeleteModalOpen(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };

  if (loading) return <div className="loader-approval"></div>;

  return (
    <div className="admin-management">
      <h4 style={{ marginBottom: "1rem" }}>Manage Admins</h4>
      <div className="scroll-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.admin_image_link} alt={user.adminname} width="40" height="40" style={{ borderRadius: "50%" }} />
                </td>
                <td>{user.adminname}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={user.id === currentUser?.id && user.role === "super_admin"}
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(user)}>
                    <MdEdit />
                  </button>
                  <button className="delete-btn" onClick={() => openDeleteModal(user)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editModalOpen && (
        <div className="modal-overlay" onClick={() => setEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Admin</h3>
              <button className="modal-close" onClick={() => setEditModalOpen(false)}>
                <MdClose />
              </button>
            </div>
            <div className="modal-body">
              <label>Admin Name</label>
              <input
                type="text"
                value={editForm.adminname}
                onChange={(e) => setEditForm({ ...editForm, adminname: e.target.value })}
              />
              <label>Username</label>
              <input
                type="text"
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              />
              <label>Phone</label>
              <input
                type="text"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
              <label>Profile Image URL</label>
              <input
                type="text"
                value={editForm.admin_image_link}
                onChange={(e) => setEditForm({ ...editForm, admin_image_link: e.target.value })}
              />
              <label>New Password (optional)</label>
              <input
                type="password"
                placeholder="Leave blank to keep current"
                value={editForm.password}
                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setEditModalOpen(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={saveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && (
        <div className="modal-overlay" onClick={() => setDeleteModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button className="modal-close" onClick={() => setDeleteModalOpen(false)}>
                <MdClose />
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete <strong>{selectedUser?.adminname}</strong>?
                <br />
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminManagement;