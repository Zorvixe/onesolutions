// pages/admin/DiscussionManagement.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Filter,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  ChevronRight,
  Eye,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import "./DiscussionManagement.css";

const API_BASE = process.env.REACT_APP_API_APP_URL;

const DiscussionManagement = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1,
  });

  const fetchThreads = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `https://api.onesolutionsekam.in/api/admin/discussions/threads`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page,
            limit: pagination.limit,
            search: searchTerm,
            status: statusFilter !== "all" ? statusFilter : undefined,
          },
        }
      );

      setThreads(response.data.data.threads);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error("Error fetching threads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [searchTerm, statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchThreads(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchThreads(newPage);
    }
  };

  const getStatusBadge = (thread) => {
    if (thread.has_admin_reply) {
      return {
        label: "Replied",
        color: "dissMStatusReplied",
        icon: <CheckCircle size={14} />,
      };
    }
    if (thread.reply_count === 0) {
      return {
        label: "Unanswered",
        color: "dissMStatusUnanswered",
        icon: <AlertCircle size={14} />,
      };
    }
    return {
      label: "Student Replied",
      color: "dissMStatusStudent",
      icon: <Clock size={14} />,
    };
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

  return (
    <div className="dissMContainer">
      {/* Header */}
      <div className="dissMHeaderContainer">
        <div className="dissMHeaderFlex">
          <div className="dissMHeaderTitleContainer">
            <h1 className="dissMHeaderTitle">Discussion Management</h1>
            <p className="dissMHeaderSubtitle">
              Manage student discussions, questions, and replies
            </p>
          </div>
          <div className="dissMHeaderActions">
            <button
              onClick={() => fetchThreads(pagination.page)}
              className="dissMRefreshButton"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dissMStatsGrid">
        <div className="dissMStatCard">
          <div className="dissMStatCardInner">
            <div className="dissMStatTextContainer">
              <p className="dissMStatLabel">Total Threads</p>
              <p className="dissMStatValue">{pagination.total}</p>
            </div>
            <div className="dissMStatIconContainer dissMStatIconBlue">
              <MessageSquare
                className="dissMStatIcon dissMStatIconBlueText"
                size={24}
              />
            </div>
          </div>
        </div>

        <div className="dissMStatCard">
          <div className="dissMStatCardInner">
            <div className="dissMStatTextContainer">
              <p className="dissMStatLabel">Unanswered</p>
              <p className="dissMStatValue">
                {threads.filter((t) => t.reply_count === 0).length}
              </p>
            </div>
            <div className="dissMStatIconContainer dissMStatIconRed">
              <AlertCircle
                className="dissMStatIcon dissMStatIconRedText"
                size={24}
              />
            </div>
          </div>
        </div>

        <div className="dissMStatCard">
          <div className="dissMStatCardInner">
            <div className="dissMStatTextContainer">
              <p className="dissMStatLabel">Admin Replied</p>
              <p className="dissMStatValue">
                {threads.filter((t) => t.has_admin_reply).length}
              </p>
            </div>
            <div className="dissMStatIconContainer dissMStatIconGreen">
              <CheckCircle
                className="dissMStatIcon dissMStatIconGreenText"
                size={24}
              />
            </div>
          </div>
        </div>

        <div className="dissMStatCard">
          <div className="dissMStatCardInner">
            <div className="dissMStatTextContainer">
              <p className="dissMStatLabel">Important Threads</p>
              <p className="dissMStatValue">
                {threads.filter((t) => t.is_important).length}
              </p>
            </div>
            <div className="dissMStatIconContainer dissMStatIconPurple">
              <Star
                className="dissMStatIcon dissMStatIconPurpleText"
                size={24}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="dissMFiltersCard">
        <div className="dissMFiltersFlex">
          <form onSubmit={handleSearch} className="dissMSearchForm">
            <div className="dissMSearchContainer">
              <Search className="dissMSearchIcon" size={20} />
              <input
                type="text"
                placeholder="Search threads by title, content, or student..."
                className="dissMSearchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>

          <div className="dissMFiltersContainer">
            <div className="dissMFiltersGroup">
              <Filter size={18} className="dissMFilterIcon" />
              <select
                className="dissMFilterSelect"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="unanswered">Unanswered</option>
                <option value="replied">Admin Replied</option>
                <option value="student_replied">Student Replied</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Threads Table */}
      <div className="dissMTableCard">
        {loading ? (
          <div className="dissMLoadingContainer">
            <div className="dissMSpinner"></div>
          </div>
        ) : threads.length === 0 ? (
          <div className="dissMEmptyState">
            <MessageSquare size={48} className="dissMEmptyIcon" />
            <h3 className="dissMEmptyTitle">No threads found</h3>
            <p className="dissMEmptyText">
              No discussion threads match your search criteria.
            </p>
          </div>
        ) : (
          <div className="dissMTableWrapper">
            <table className="dissMTable">
              <thead className="dissMTableHead">
                <tr>
                  <th className="dissMTableHeader">Thread Details</th>
                  <th className="dissMTableHeader">Student</th>
                  <th className="dissMTableHeader">Status</th>
                  <th className="dissMTableHeader">Activity</th>
                  <th className="dissMTableHeader">Actions</th>
                </tr>
              </thead>
              <tbody className="dissMTableBody">
                {threads.map((thread) => {
                  const status = getStatusBadge(thread);
                  return (
                    <tr key={thread.id} className="dissMTableRow">
                      <td className="dissMTableCell">
                        <div className="dissMThreadCell">
                          <div
                            className={`dissMThreadIcon ${
                              thread.is_important
                                ? "dissMThreadIconImportant"
                                : "dissMThreadIconNormal"
                            }`}
                          >
                            {thread.is_important ? (
                              <Star
                                size={18}
                                className="dissMThreadIconImportantText"
                              />
                            ) : (
                              <MessageSquare
                                size={18}
                                className="dissMThreadIconNormalText"
                              />
                            )}
                          </div>
                          <div className="dissMThreadContent">
                            <Link
                              to={`/discussions/thread/${thread.id}`}
                              className="dissMThreadTitle"
                            >
                              {thread.title}
                            </Link>
                            <p className="dissMThreadExcerpt">
                              {thread.content}
                            </p>
                            <div className="dissMThreadMeta">
                              <span className="dissMThreadDate">
                                {formatDate(thread.created_at)}
                              </span>
                              {thread.module_name && (
                                <span className="dissMThreadTag">
                                  {thread.module_name}
                                </span>
                              )}
                              {thread.topic_name && (
                                <span className="dissMThreadTag">
                                  {thread.topic_name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="dissMTableCell">
                        <div className="dissMStudentCell">
                          <div className="dissMAvatar">
                            <span className="dissMAvatarText">
                              {thread.first_name?.[0] || "S"}
                            </span>
                          </div>
                          <div className="dissMStudentInfo">
                            <p className="dissMStudentName">
                              {thread.first_name} {thread.last_name}
                            </p>
                            <p className="dissMStudentBatch">
                              Batch: {thread.batch_month} {thread.batch_year}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="dissMTableCell">
                        <div className="dissMStatusCell">
                          <span className={`dissMStatusBadge ${status.color}`}>
                            {status.icon}
                            <span className="dissMStatusLabel">
                              {status.label}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="dissMTableCell">
                        <div className="dissMActivityCell">
                          <div className="dissMActivityItem">
                            <MessageCircle
                              size={14}
                              className="dissMActivityIcon"
                            />
                            <span className="dissMActivityText">
                              {thread.reply_count} replies
                            </span>
                          </div>
                          <div className="dissMActivityDate">
                            Updated {formatDate(thread.updated_at)}
                          </div>
                        </div>
                      </td>
                      <td className="dissMTableCell">
                        <Link
                          to={`/discussions/thread/${thread.id}`}
                          className="dissMViewButton"
                        >
                          <Eye size={16} className="dissMViewButtonIcon" />
                          View
                          <ChevronRight
                            size={16}
                            className="dissMViewButtonChevron"
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && threads.length > 0 && (
          <div className="dissMPagination">
            <div className="dissMPaginationInfo">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} threads
            </div>
            <div className="dissMPaginationControls">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="dissMPaginationButton dissMPaginationPrev"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                let pageNum;
                if (pagination.pages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.pages - 2) {
                  pageNum = pagination.pages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`dissMPaginationButton dissMPaginationPage ${
                      pagination.page === pageNum
                        ? "dissMPaginationPageActive"
                        : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="dissMPaginationButton dissMPaginationNext"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionManagement;
