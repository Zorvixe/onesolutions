import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete, MdAdminPanelSettings, MdPerson } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminManagement = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});

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

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Delete user "${userName}"? This action cannot be undone.`)) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://apiose.onesolutionsekam.in/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("User deleted");
        fetchUsers();
      } catch (err) {
        toast.error(err.response?.data?.error || "Delete failed");
      }
    }
  };

  const startEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      adminname: user.adminname,
      username: user.username,
      phone: user.phone,
      admin_image_link: user.admin_image_link,
      password: "",
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const saveEdit = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const payload = {};
      if (editForm.adminname) payload.adminname = editForm.adminname;
      if (editForm.username) payload.username = editForm.username;
      if (editForm.phone) payload.phone = editForm.phone;
      if (editForm.admin_image_link) payload.admin_image_link = editForm.admin_image_link;
      if (editForm.password) payload.password = editForm.password;

      await axios.put(
        `https://apiose.onesolutionsekam.in/api/admin/users/${userId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User updated");
      fetchUsers();
      cancelEdit();
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
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
                <td>
                  {editingUser === user.id ? (
                    <input value={editForm.adminname} onChange={(e) => setEditForm({ ...editForm, adminname: e.target.value })} />
                  ) : (
                    user.adminname
                  )}
                </td>
                <td>
                  {editingUser === user.id ? (
                    <input value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUser === user.id ? (
                    <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                  ) : (
                    user.phone
                  )}
                </td>
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
                  {editingUser === user.id ? (
                    <>
                      <button className="save-btn" onClick={() => saveEdit(user.id)}>Save</button>
                      <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => startEdit(user)}><MdEdit /></button>
                      <button className="delete-btn" onClick={() => handleDelete(user.id, user.adminname)}><MdDelete /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminManagement;