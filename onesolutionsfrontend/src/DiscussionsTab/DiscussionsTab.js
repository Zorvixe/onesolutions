import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api"; // We need to add the thread API calls to our services

const DiscussionsTab = ({ subtopicId }) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);

  useEffect(() => {
    loadThreads();
  }, [subtopicId]);

  const loadThreads = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/threads/${subtopicId}`);
      if (response.data.success) {
        setThreads(response.data.data.threads);
      } else {
        setError("Failed to load threads.");
      }
    } catch (err) {
      setError("Error loading threads.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Discussions</h2>
      <button onClick={() => setShowNewThreadModal(true)}>New Thread</button>

      {loading && <p>Loading threads...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {threads.map(thread => (
          <div key={thread.id}>
            <h3>{thread.title}</h3>
            <p>By: {thread.first_name} {thread.last_name}</p>
            <p>{thread.description}</p>
            {thread.image_url && <img src={thread.image_url} alt="Thread" style={{ maxWidth: '200px' }} />}
            <button onClick={() => {/* Navigate to thread detail */}}>View Thread</button>
          </div>
        ))}
      </div>

      {showNewThreadModal && (
        <NewThreadModal
          subtopicId={subtopicId}
          onClose={() => setShowNewThreadModal(false)}
          onThreadCreated={loadThreads}
        />
      )}
    </div>
  );
};

export default DiscussionsTab;