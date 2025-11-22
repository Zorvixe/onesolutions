import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ThreadDetail.css";

const ThreadDetail = () => {
  const { threadId } = useParams();
  const { user } = useAuth();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThreadDetail();
  }, [threadId]);

  const loadThreadDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5002"
        }/discussions/thread-detail/${threadId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setThread(data.data.thread);
          setReplies(data.data.replies);
        }
      }
    } catch (error) {
      console.error("Error loading thread detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!newReply.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5002"
        }/discussions/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            threadId: threadId,
            content: newReply,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNewReply("");
          loadThreadDetail(); // Reload to get updated replies
        }
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading thread...</div>;
  }

  if (!thread) {
    return <div className="error">Thread not found</div>;
  }

  return (
    <div className="thread-detail-container">
      <div className="thread-detail">
        {/* Thread Header */}
        <div className="thread-header">
          <h1>{thread.title}</h1>
          <div className="thread-meta">
            <div className="author-info">
              <img
                src={thread.profile_image || "/default-avatar.png"}
                alt="Author"
                className="author-avatar"
              />
              <span>
                {thread.first_name} {thread.last_name}
              </span>
            </div>
            <span className="thread-date">
              {new Date(thread.created_at).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Thread Content */}
        <div className="thread-content">
          <p>{thread.content}</p>
          {thread.images && thread.images.length > 0 && (
            <div className="thread-images">
              {thread.images.map((img, index) => (
                <img key={index} src={img} alt={`Thread image ${index + 1}`} />
              ))}
            </div>
          )}
        </div>

        {/* Replies Section */}
        <div className="replies-section">
          <h2>Replies ({replies.length})</h2>

          {/* Reply Form */}
          <div className="reply-form">
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write your reply..."
              rows="4"
            />
            <button onClick={handleSubmitReply} disabled={!newReply.trim()}>
              Post Reply
            </button>
          </div>

          {/* Replies List */}
          <div className="replies-list">
            {replies.map((reply) => (
              <div key={reply.id} className="reply-item">
                <div className="reply-header">
                  <div className="reply-author">
                    <img
                      src={reply.replied_by_image || "/default-avatar.png"}
                      alt="Author"
                    />
                    <div>
                      <strong>{reply.replied_by_name}</strong>
                      <span className={`role-badge ${reply.replied_by_role}`}>
                        {reply.replied_by_role}
                      </span>
                    </div>
                  </div>
                  <span className="reply-date">
                    {new Date(reply.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="reply-content">
                  <p>{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;
