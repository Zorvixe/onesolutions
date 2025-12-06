import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ThreadDetail.css";

const ThreadDetail = () => {
  const { threadSlug } = useParams(); // Changed from threadId to threadSlug
  const navigate = useNavigate();
  const { user } = useAuth();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    if (threadSlug) {
      loadThreadDetail();
    }
  }, [threadSlug]);

  const loadThreadDetail = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5002"
        }/api/discussions/thread-detail/${threadSlug}`,
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
        } else {
          console.error("Error loading thread:", data.message);
          navigate("/not-found");
        }
      } else {
        console.error("Failed to load thread");
        navigate("/not-found");
      }
    } catch (error) {
      console.error("Error loading thread detail:", error);
      navigate("/not-found");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!newReply.trim() || replying) return;

    try {
      setReplying(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5002"
        }/api/discussions/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            threadId: thread.id, // Still use numeric ID for the database
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
      alert("Failed to submit reply. Please try again.");
    } finally {
      setReplying(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (firstName = "", lastName = "") => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="thread-detail-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading thread...</p>
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="thread-detail-container">
        <div className="error-container">
          <h2>Thread Not Found</h2>
          <p>
            The thread you're looking for doesn't exist or has been removed.
          </p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="thread-detail-container">
      <div className="thread-detail">
        {/* Thread Header */}
        <div className="thread-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1>{thread.title}</h1>
          <div className="thread-meta">
            <div className="author-info">
              {thread.profile_image ? (
                <img
                  src={thread.profile_image}
                  alt="Author"
                  className="author-avatar"
                />
              ) : (
                <div className="avatar-initials">
                  {getInitials(thread.first_name, thread.last_name)}
                </div>
              )}
              <div className="author-details">
                <span className="author-name">
                  {thread.first_name} {thread.last_name}
                </span>
                <span className="author-email">{thread.student_email}</span>
              </div>
            </div>
            <div className="thread-info">
              <span className="thread-date">
                {formatDate(thread.created_at)}
              </span>
              {thread.is_important && (
                <span className="important-badge">⭐ Important</span>
              )}
              {thread.status && (
                <span className={`status-badge ${thread.status}`}>
                  {thread.status}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Thread Content */}
        <div className="thread-content">
          <div dangerouslySetInnerHTML={{ __html: thread.content }} />

          {thread.images && thread.images.length > 0 && (
            <div className="thread-images">
              {thread.images.map((img, index) => (
                <div key={index} className="thread-image">
                  <img src={img} alt={`Thread content ${index + 1}`} />
                </div>
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
              placeholder="Write your reply here..."
              rows="4"
              className="reply-textarea"
            />
            <div className="reply-actions">
              <button
                onClick={handleSubmitReply}
                disabled={!newReply.trim() || replying}
                className="submit-reply-btn"
              >
                {replying ? "Posting..." : "Post Reply"}
              </button>
            </div>
          </div>

          {/* Replies List */}
          <div className="replies-list">
            {replies.length === 0 ? (
              <div className="no-replies">
                <p>No replies yet. Be the first to respond!</p>
              </div>
            ) : (
              replies.map((reply) => (
                <div key={reply.id} className="reply-item">
                  <div className="reply-header">
                    <div className="reply-author">
                      {reply.replied_by_image ? (
                        <img
                          src={reply.replied_by_image}
                          alt="Reply author"
                          className="reply-avatar"
                        />
                      ) : (
                        <div className="reply-avatar-initials">
                          {getInitials(
                            reply.student_first_name ||
                              reply.admin_name?.split(" ")[0],
                            reply.student_last_name ||
                              reply.admin_name?.split(" ")[1]
                          )}
                        </div>
                      )}
                      <div className="reply-author-details">
                        <strong>{reply.replied_by_name}</strong>
                        <span className={`role-badge ${reply.replied_by_role}`}>
                          {reply.replied_by_role}
                        </span>
                      </div>
                    </div>
                    <span className="reply-date">
                      {formatDate(reply.created_at)}
                    </span>
                  </div>
                  <div className="reply-content">
                    <p>{reply.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;
