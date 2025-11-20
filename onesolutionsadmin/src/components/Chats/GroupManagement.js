// GroupManagement.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, List, message } from 'antd';

const API_BASE_URL = process.env.REACT_APP_API_URL;


const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);
  const [editedGroupName, setEditedGroupName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch(`https://ose.onesolutionsekam.in/api/chat/rooms`);
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      message.error('Failed to fetch groups');
    }
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setEditedGroupName(group.room_name);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://ose.onesolutionsekam.in/api/chat/rooms/${editingGroup.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ room_name: editedGroupName })
      });

      if (!response.ok) throw new Error('Update failed');
      
      message.success('Group updated successfully');
      setIsModalVisible(false);
      fetchGroups();
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async (groupId) => {
    try {
      const response = await fetch(`https://ose.onesolutionsekam.in/api/chat/rooms/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Delete failed');
      
      message.success('Group deleted successfully');
      fetchGroups();
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="group-management">
      <h2>Manage Groups</h2>
      <List
        dataSource={groups}
        renderItem={group => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEdit(group)}>Edit</Button>,
              <Button danger type="link" onClick={() => handleDelete(group.id)}>
                Delete
              </Button>
            ]}
          >
            <List.Item.Meta
              title={group.room_name}
              description={`Created: ${new Date(group.created_at).toLocaleDateString()}`}
            />
          </List.Item>
        )}
      />

      <Modal
        title="Edit Group"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
      >
        <input
          type="text"
          value={editedGroupName}
          onChange={(e) => setEditedGroupName(e.target.value)}
          placeholder="Enter new group name"
          style={{ width: '100%' }}
        />
      </Modal>
    </div>
  );
};

export default GroupManagement;
