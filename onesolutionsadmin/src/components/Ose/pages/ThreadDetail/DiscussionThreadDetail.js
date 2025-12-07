// pages/admin/DiscussionThreadDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
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
  ThumbsUp
} from 'lucide-react';

const DiscussionThreadDetail = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [adminDetails, setAdminDetails] = useState({
    name: 'Admin User',
    image: null
  });

  useEffect(() => {
    fetchThreadDetails();
  }, [threadId]);

  const fetchThreadDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/api/admin/discussions/threads/${threadId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setThread(response.data.data.thread);
      setReplies(response.data.data.replies || []);
    } catch (error) {
      console.error('Error fetching thread details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return;

    try {
      const token = localStorage.getItem('adminToken');
      const adminId = localStorage.getItem('adminId') || '1';

      await axios.post('/api/admin/discussions/replies', {
        threadId: thread.id,
        content: replyContent,
        adminId,
        adminName: adminDetails.name,
        adminImage: adminDetails.image
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setReplyContent('');
      setReplying(false);
      fetchThreadDetails(); // Refresh thread and replies
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleMarkImportant = async (important) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/admin/discussions/threads/${threadId}/status`, {
        is_important: important
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setThread(prev => ({ ...prev, is_important: important }));
    } catch (error) {
      console.error('Error updating thread status:', error);
    }
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

  const getStatusBadge = (reply) => {
    if (reply.replied_by_role === 'admin') {
      return {
        label: 'Admin Reply',
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle size={12} />
      };
    }
    return {
      label: 'Student Reply',
      color: 'bg-blue-100 text-blue-800',
      icon: <User size={12} />
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Thread not found</h3>
        <p className="text-gray-500 mt-1">The requested discussion thread could not be found.</p>
        <button
          onClick={() => navigate('/admin/discussions')}
          className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Discussions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/discussions')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Discussions
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{thread.title}</h1>
              {thread.is_important && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <Star size={14} className="mr-1" />
                  Important
                </span>
              )}
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(thread.created_at)}
              </span>
              <span className="flex items-center">
                <MessageSquare size={14} className="mr-1" />
                {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
              </span>
              {thread.module_name && (
                <span className="flex items-center">
                  <Tag size={14} className="mr-1" />
                  {thread.module_name}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleMarkImportant(!thread.is_important)}
              className={`px-4 py-2 rounded-lg flex items-center ${
                thread.is_important
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star size={16} className="mr-2" />
              {thread.is_important ? 'Unmark Important' : 'Mark Important'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Student Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-4">Student Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-lg font-semibold text-indigo-600">
                    {thread.first_name?.[0] || 'S'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {thread.first_name} {thread.last_name}
                  </p>
                  <p className="text-sm text-gray-500">{thread.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Student ID:</span>
                  <span className="text-sm font-medium">{thread.student_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Batch:</span>
                  <span className="text-sm font-medium">
                    {thread.batch_month} {thread.batch_year}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Phone:</span>
                  <span className="text-sm font-medium">{thread.phone || 'Not provided'}</span>
                </div>
              </div>

              <Link
                to={`/admin/students/${thread.student_id}`}
                className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                View Full Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Thread Content & Replies */}
        <div className="lg:col-span-3">
          {/* Original Thread */}
          <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="text-blue-600" size={20} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium text-gray-900">
                      {thread.first_name} {thread.last_name}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      {formatDate(thread.created_at)}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Original Post
                  </span>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{thread.content}</p>
                </div>
                {thread.images && thread.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {thread.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thread image ${index + 1}`}
                        className="rounded-lg w-full h-32 object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-gray-900">Replies ({replies.length})</h3>
            
            {replies.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <MessageSquare size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">No replies yet. Be the first to respond!</p>
              </div>
            ) : (
              replies.map((reply) => {
                const status = getStatusBadge(reply);
                return (
                  <div
                    key={reply.id}
                    className="bg-white rounded-xl p-6 shadow-sm border"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          reply.replied_by_role === 'admin'
                            ? 'bg-green-100'
                            : 'bg-blue-100'
                        }`}>
                          {reply.replied_by_role === 'admin' ? (
                            <span className="text-sm font-semibold text-green-600">A</span>
                          ) : (
                            <User className="text-blue-600" size={20} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {reply.replied_by_name}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${status.color}`}>
                              {status.icon}
                              <span className="ml-1">{status.label}</span>
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(reply.created_at)}
                          </span>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Reply Form */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-4">Post a Reply</h3>
            
            <div className="space-y-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply here..."
                rows="4"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-600">A</span>
                  </div>
                  <span className="text-sm text-gray-700">Replying as: {adminDetails.name}</span>
                </div>
                
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyContent.trim()}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Send size={16} className="mr-2" />
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