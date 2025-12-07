import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ThreadDetail.css";

const ThreadDetail = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const [error, setError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(null); // Add this state

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate(`/login?redirect=/thread/${threadId}`);
      return;
    }

    setAuthChecked(true);
  }, [isAuthenticated, authLoading, threadId, navigate]);

  // In ThreadDetail.js, update the useEffect for loading thread detail
  useEffect(() => {
    if (authChecked && threadId) {
      // Check if threadId is numeric or a slug
      const isNumeric = /^\d+$/.test(threadId);

      if (isNumeric) {
        // For backward compatibility, if numeric ID is provided,
        // first get the thread to find its slug, then redirect
        loadThreadDetailByNumericId(threadId);
      } else {
        // If it's already a slug, load directly
        loadThreadDetailBySlug(threadId);
      }
    }
  }, [authChecked, threadId]);

  const loadThreadDetailByNumericId = async (threadId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL || "http://localhost:5002"
        }/api/discussions/thread-detail-by-id/${threadId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.thread.thread_slug) {
          // Redirect to slug-based URL
          navigate(`/thread/${data.data.thread.thread_slug}`, {
            replace: true,
          });
        } else {
          setError("Thread not found");
        }
      } else {
        setError("Failed to load thread");
      }
    } catch (error) {
      console.error("Error loading thread:", error);
      setError("Error loading thread. Please try again.");
    }
  };

  const loadThreadDetailBySlug = async (threadSlug) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentSlug(threadSlug); // Store the current slug

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL || "http://localhost:5002"
        }/api/discussions/thread-detail/${threadSlug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate(`/login?redirect=/thread/${threadSlug}`);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setThread(data.data.thread);
          setReplies(data.data.replies);
        } else {
          setError(data.message || "Thread not found");
        }
      } else {
        setError("Failed to load thread");
      }
    } catch (error) {
      console.error("Error loading thread detail:", error);
      setError("Error loading thread. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!newReply.trim() || replying || !thread) return;

    try {
      setReplying(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL || "http://localhost:5002"
        }/api/discussions/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            threadId: thread.id, // This should be the numeric ID
            content: newReply,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNewReply("");
          // Reload using the current slug
          if (currentSlug) {
            loadThreadDetailBySlug(currentSlug);
          } else {
            // Fallback to thread's slug
            loadThreadDetailBySlug(thread.thread_slug || threadId);
          }
        }
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        navigate(`/login?redirect=/thread/${currentSlug || threadId}`);
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

  // Show loading while auth is being checked
  if (authLoading || loading) {
    return (
      <div className="thread-detail-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading thread...</p>
        </div>
      </div>
    );
  }

  // Show error if any
  if (error) {
    return (
      <div className="thread-detail-container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/home")}>Go Home</button>
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
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="thread-detail">
        {/* Thread Header */}
        <div className="thread-header">
          <div className="thread-meta">
            <div className="author-info">
              <div className="avatar-initials">
                {getInitials(thread.first_name, thread.last_name)}
              </div>

              <div className="author-details">
                <span className="author-name">
                  {thread.first_name} {thread.last_name}
                </span>
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
          <h2>{thread.title}</h2>
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
                     
                        <div className="reply-avatar-initials">
                          {getInitials(
                            reply.student_first_name ||
                              reply.admin_name?.split(" ")[0],
                            reply.student_last_name ||
                              reply.admin_name?.split(" ")[1]
                          )}
                        </div>
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
