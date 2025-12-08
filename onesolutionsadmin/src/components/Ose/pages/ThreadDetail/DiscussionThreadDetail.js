// pages/admin/DiscussionThreadDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  MessageSquare,
  Star,
  CheckCircle,
  AlertCircle,
  Send,
  User,
  Calendar,
  Tag,
  Flag,
  MoreVertical,
  Copy,
  Trash2,
  Edit,
  Eye,
  Users,
  Clock,
  ThumbsUp,
} from "lucide-react";
import "./DiscussionThreadDetail.css"; // Import the CSS file

const API_BASE = process.env.REACT_APP_API_APP_URL;

const DiscussionThreadDetail = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [adminDetails, setAdminDetails] = useState({
    name: "Admin User",
    image: null,
  });

  useEffect(() => {
    fetchThreadDetails();
  }, [threadId]);

  const fetchThreadDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `https://api.onesolutionsekam.in/api/admin/discussions/threads/${threadId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setThread(response.data.data.thread);
      setReplies(response.data.data.replies || []);
    } catch (error) {
      console.error("Error fetching thread details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return;

    try {
      const token = localStorage.getItem("adminToken");
      const adminId = localStorage.getItem("adminId") || "1";

      await axios.post(
        `https://api.onesolutionsekam.in/api/admin/discussions/replies`,
        {
          threadId: thread.id,
          content: replyContent,
          adminId,
          adminName: adminDetails.name,
          adminImage: adminDetails.image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReplyContent("");
      setReplying(false);
      fetchThreadDetails();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleMarkImportant = async (important) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `https://api.onesolutionsekam.in/api/admin/discussions/threads/${threadId}/status`,
        {
          is_important: important,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setThread((prev) => ({ ...prev, is_important: important }));
    } catch (error) {
      console.error("Error updating thread status:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (reply) => {
    if (reply.replied_by_role === "admin") {
      return {
        label: "Admin Reply",
        color: "badge-admin-detT",
        icon: <CheckCircle size={12} />,
      };
    }
    return {
      label: "Student Reply",
      color: "badge-student-detT",
      icon: <User size={12} />,
    };
  };

  if (loading) {
    return (
      <div className="loading-container-detT">
        <div className="loading-spinner-detT"></div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="not-found-container-detT">
        <AlertCircle className="not-found-icon-detT" />
        <h3 className="not-found-title-detT">Thread not found</h3>
        <p className="not-found-description-detT">
          The requested discussion thread could not be found.
        </p>
        <button
          onClick={() => navigate("/discussions")}
          className="back-button-detT"
        >
          <ArrowLeft className="back-icon-detT" />
          Back to Discussions
        </button>
      </div>
    );
  }

  return (
    <div className="container-detT">
      {/* Header */}
      <div className="header-detT">
        <button
          onClick={() => navigate("/discussions")}
          className="back-link-detT"
        >
          <ArrowLeft className="back-link-icon-detT" />
          Back to Discussions
        </button>

        <div className="header-content-detT">
          <div className="header-left-detT">
            <div className="thread-title-row-detT">
              <h1 className="thread-title-detT">{thread.title}</h1>
              {thread.is_important && (
                <span className="important-badge-detT">
                  <Star className="star-icon-detT" />
                  Important
                </span>
              )}
            </div>
            <div className="thread-meta-detT">
              <span className="meta-item-detT">
                <Calendar className="meta-icon-detT" />
                {formatDate(thread.created_at)}
              </span>
              <span className="meta-item-detT">
                <MessageSquare className="meta-icon-detT" />
                {replies.length} {replies.length === 1 ? "reply" : "replies"}
              </span>
              {thread.module_name && (
                <span className="meta-item-detT">
                  <Tag className="meta-icon-detT" />
                  {thread.module_name}
                </span>
              )}
            </div>
          </div>

          <div className="header-actions-detT">
            <button
              onClick={() => handleMarkImportant(!thread.is_important)}
              className={`action-button-detT ${
                thread.is_important
                  ? "important-active-detT"
                  : "important-inactive-detT"
              }`}
            >
              <Star className="action-icon-detT" />
              {thread.is_important ? "Unmark Important" : "Mark Important"}
            </button>
          </div>
        </div>
      </div>

      <div className="content-grid-detT">
        {/* Left Column - Student Info */}
        <div className="left-column-detT">
          <div className="student-card-detT">
            <h3 className="card-title-detT">Student Information</h3>

            <div className="student-info-detT">
              <div className="student-avatar-row-detT">
                <div className="student-avatar-detT">
                  <span className="avatar-initial-detT">
                    {thread.first_name?.[0] || "S"}
                  </span>
                </div>
                <div className="student-details-detT">
                  <p className="student-name-detT">
                    {thread.first_name} {thread.last_name}
                  </p>
                  <p className="student-email-detT">{thread.email}</p>
                </div>
              </div>

              <div className="student-meta-detT">
                <div className="meta-row-detT">
                  <span className="meta-label-detT">Student ID:</span>
                  <span className="meta-value-detT">{thread.student_id}</span>
                </div>
                <div className="meta-row-detT">
                  <span className="meta-label-detT">Batch:</span>
                  <span className="meta-value-detT">
                    {thread.batch_month} {thread.batch_year}
                  </span>
                </div>
                <div className="meta-row-detT">
                  <span className="meta-label-detT">Phone:</span>
                  <span className="meta-value-detT">
                    {thread.phone || "Not provided"}
                  </span>
                </div>
              </div>

              <Link
                to={`/admin/students/${thread.student_id}`}
                className="profile-link-detT"
              >
                View Full Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Thread Content & Replies */}
        <div className="right-column-detT">
          {/* Original Thread */}
          <div className="thread-card-detT">
            <div className="thread-content-detT">
              <div className="thread-avatar-detT">
                <div className="avatar-circle-detT student-avatar-circle-detT">
                  <User className="avatar-user-icon-detT" />
                </div>
              </div>
              <div className="thread-body-detT">
                <div className="thread-header-detT">
                  <div className="thread-author-detT">
                    <span className="author-name-detT">
                      {thread.first_name} {thread.last_name}
                    </span>
                    <span className="thread-date-detT">
                      {formatDate(thread.created_at)}
                    </span>
                  </div>
                  <span className="original-badge-detT">Original Post</span>
                </div>
                <div className="thread-text-detT">
                  <p className="thread-message-detT">{thread.content}</p>
                </div>
                {thread.images && thread.images.length > 0 && (
                  <div className="thread-images-detT">
                    {thread.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thread image ${index + 1}`}
                        className="thread-image-detT"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="replies-section-detT">
            <h3 className="replies-title-detT">Replies ({replies.length})</h3>

            {replies.length === 0 ? (
              <div className="no-replies-detT">
                <MessageSquare className="no-replies-icon-detT" />
                <p className="no-replies-text-detT">
                  No replies yet. Be the first to respond!
                </p>
              </div>
            ) : (
              replies.map((reply) => {
                const status = getStatusBadge(reply);
                return (
                  <div key={reply.id} className="reply-card-detT">
                    <div className="reply-content-detT">
                      <div className="reply-avatar-detT">
                        <div
                          className={`avatar-circle-detT ${
                            reply.replied_by_role === "admin"
                              ? "admin-avatar-circle-detT"
                              : "student-avatar-circle-detT"
                          }`}
                        >
                          {reply.replied_by_role === "admin" ? (
                            <span className="avatar-admin-initial-detT">
                              A
                            </span>
                          ) : (
                            <User className="avatar-user-icon-detT" />
                          )}
                        </div>
                      </div>
                      <div className="reply-body-detT">
                        <div className="reply-header-detT">
                          <div className="reply-author-detT">
                            <span className="author-name-detT">
                              {reply.replied_by_name}
                            </span>
                            <span
                              className={`badge-detT ${status.color}`}
                            >
                              {status.icon}
                              <span className="badge-label-detT">
                                {status.label}
                              </span>
                            </span>
                          </div>
                          <span className="reply-date-detT">
                            {formatDate(reply.created_at)}
                          </span>
                        </div>
                        <div className="reply-text-detT">
                          <p className="reply-message-detT">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Reply Form */}
          <div className="reply-form-card-detT">
            <h3 className="form-title-detT">Post a Reply</h3>

            <div className="form-content-detT">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply here..."
                rows="4"
                className="reply-textarea-detT"
              />

              <div className="form-footer-detT">
                <div className="admin-info-detT">
                  <div className="admin-avatar-detT">
                    <span className="admin-avatar-initial-detT">A</span>
                  </div>
                  <span className="admin-name-detT">
                    Replying as: {adminDetails.name}
                  </span>
                </div>

                <button
                  onClick={handleSubmitReply}
                  disabled={!replyContent.trim()}
                  className="submit-button-detT"
                >
                  <Send className="submit-icon-detT" />
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionThreadDetail;