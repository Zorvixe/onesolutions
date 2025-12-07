// pages/admin/DiscussionManagement.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  Filter,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  ChevronRight,
  Users,
  Eye,
  MessageCircle,
  RefreshCw,
  TrendingUp
} from 'lucide-react';

const DiscussionManagement = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  });

  const fetchThreads = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/discussions/threads', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          limit: pagination.limit,
          search: searchTerm,
          status: statusFilter !== 'all' ? statusFilter : undefined
        }
      });

      setThreads(response.data.data.threads);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Error fetching threads:', error);
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
        label: 'Replied',
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle size={14} />
      };
    }
    if (thread.reply_count === 0) {
      return {
        label: 'Unanswered',
        color: 'bg-red-100 text-red-800',
        icon: <AlertCircle size={14} />
      };
    }
    return {
      label: 'Student Replied',
      color: 'bg-yellow-100 text-yellow-800',
      icon: <Clock size={14} />
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discussion Management</h1>
            <p className="text-gray-600 mt-2">Manage student discussions, questions, and replies</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => fetchThreads(pagination.page)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Threads</p>
              <p className="text-2xl font-bold mt-2">{pagination.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unanswered</p>
              <p className="text-2xl font-bold mt-2">
                {threads.filter(t => t.reply_count === 0).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Admin Replied</p>
              <p className="text-2xl font-bold mt-2">
                {threads.filter(t => t.has_admin_reply).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Important Threads</p>
              <p className="text-2xl font-bold mt-2">
                {threads.filter(t => t.is_important).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <form onSubmit={handleSearch} className="flex-1 md:mr-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search threads by title, content, or student..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-500" />
              <select
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : threads.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No threads found</h3>
            <p className="text-gray-500 mt-1">No discussion threads match your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thread Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {threads.map((thread) => {
                  const status = getStatusBadge(thread);
                  return (
                    <tr key={thread.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${thread.is_important ? 'bg-purple-100' : 'bg-gray-100'}`}>
                            {thread.is_important ? (
                              <Star size={18} className="text-purple-600" />
                            ) : (
                              <MessageSquare size={18} className="text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/admin/discussions/thread/${thread.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-indigo-600 line-clamp-1"
                            >
                              {thread.title}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {thread.content}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">
                                {formatDate(thread.created_at)}
                              </span>
                              {thread.module_name && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {thread.module_name}
                                </span>
                              )}
                              {thread.topic_name && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {thread.topic_name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-sm font-semibold text-indigo-600">
                              {thread.first_name?.[0] || 'S'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {thread.first_name} {thread.last_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Batch: {thread.batch_month} {thread.batch_year}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.icon}
                            <span className="ml-1">{status.label}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MessageCircle size={14} />
                            <span>{thread.reply_count} replies</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Updated {formatDate(thread.updated_at)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/discussions/thread/${thread.id}`}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <Eye size={16} className="mr-2" />
                          View
                          <ChevronRight size={16} className="ml-1" />
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
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} threads
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className={`px-3 py-1 rounded-lg ${
                        pagination.page === pageNum
                          ? 'bg-indigo-600 text-white'
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionManagement;