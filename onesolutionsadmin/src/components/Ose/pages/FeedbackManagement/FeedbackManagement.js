// pages/admin/FeedbackManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search,
  Filter,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  User,
  TrendingUp,
  BarChart3,
  Download,
  RefreshCw,
  Eye,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    subtopicId: '',
    moduleName: '',
    rating: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  });

  const fetchFeedbacks = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/feedback', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          limit: pagination.limit,
          search: searchTerm,
          subtopicId: filters.subtopicId || undefined,
          moduleName: filters.moduleName || undefined,
          rating: filters.rating || undefined
        }
      });

      setFeedbacks(response.data.data.feedbacks);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/feedback/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFeedbacks(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchFeedbacks(newPage);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600 bg-green-100';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Feedback Management</h1>
            <p className="text-gray-600 mt-2">View and analyze student feedback for classes</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                fetchFeedbacks();
                fetchStats();
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Feedbacks</p>
                <p className="text-2xl font-bold mt-2">
                  {stats[0]?.total_feedbacks || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Understanding</p>
                <p className="text-2xl font-bold mt-2">
                  {stats[0]?.avg_understanding || 0}/5
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Instructor Rating</p>
                <p className="text-2xl font-bold mt-2">
                  {stats[0]?.avg_instructor || 0}/5
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Pace Rating</p>
                <p className="text-2xl font-bold mt-2">
                  {stats[0]?.avg_pace || 0}/5
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <BarChart3 className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search feedback by student, subtopic, or content..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtopic ID
              </label>
              <input
                type="text"
                placeholder="Enter subtopic ID"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.subtopicId}
                onChange={(e) => handleFilterChange('subtopicId', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Module Name
              </label>
              <input
                type="text"
                placeholder="Enter module name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.moduleName}
                onChange={(e) => handleFilterChange('moduleName', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Stars</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => fetchFeedbacks(1)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No feedback found</h3>
            <p className="text-gray-500 mt-1">No feedback matches your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student & Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ratings
                  </th>
                  <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feedback
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-sm font-semibold text-indigo-600">
                            {feedback.first_name?.[0] || 'S'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {feedback.first_name} {feedback.last_name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {feedback.batch_month} {feedback.batch_year}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-900">
                              {feedback.module_name || 'No module'}
                            </p>
                            <p className="text-xs text-gray-500">
                              Subtopic: {feedback.subtopic_id}
                            </p>
                            {feedback.topic_name && (
                              <p className="text-xs text-gray-500">
                                Topic: {feedback.topic_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Understanding:</span>
                          <div className="flex items-center">
                            {renderStars(feedback.rating_understanding)}
                            <span className={`ml-2 text-xs px-2 py-1 rounded ${getRatingColor(feedback.rating_understanding)}`}>
                              {feedback.rating_understanding}/5
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Instructor:</span>
                          <div className="flex items-center">
                            {renderStars(feedback.rating_instructor)}
                            <span className={`ml-2 text-xs px-2 py-1 rounded ${getRatingColor(feedback.rating_instructor)}`}>
                              {feedback.rating_instructor}/5
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Pace:</span>
                          <div className="flex items-center">
                            {renderStars(feedback.rating_pace)}
                            <span className={`ml-2 text-xs px-2 py-1 rounded ${getRatingColor(feedback.rating_pace)}`}>
                              {feedback.rating_pace}/5
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {feedback.feedback_text ? (
                          <p className="text-sm text-gray-700 line-clamp-3">
                            {feedback.feedback_text}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-400 italic">No written feedback</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {formatDate(feedback.submitted_at)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(feedback.submitted_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          // View full feedback
                          alert(feedback.feedback_text || 'No written feedback');
                        }}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                      >
                        <Eye size={14} className="mr-2" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && feedbacks.length > 0 && (
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} feedbacks
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

export default FeedbackManagement;