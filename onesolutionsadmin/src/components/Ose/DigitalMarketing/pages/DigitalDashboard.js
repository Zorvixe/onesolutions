import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Video, 
  FileText, 
  BarChart3,
  MessageSquare,
  Trophy,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 1250,
    activeCourses: 3,
    totalVideos: 48,
    totalCheatsheets: 36,
    pendingDiscussions: 12,
    completionRate: 68
  });

  // Mock fetch - typically this would hit an API endpoint like /api/admin/stats
  useEffect(() => {
    // fetchDashboardStats();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-gray-900">{value}</h3>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              <span className="font-medium">{Math.abs(trend)}% vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your digital marketing academy</p>
        </div>
        <button 
          onClick={() => window.location.href='/admin/courses'}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
        >
          Manage Courses
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={Users} 
          title="Total Students" 
          value={stats.totalStudents} 
          color="bg-blue-500"
          trend={12}
        />
        <StatCard 
          icon={Video} 
          title="Video Lessons" 
          value={stats.totalVideos} 
          color="bg-purple-500"
          trend={8}
        />
        <StatCard 
          icon={Trophy} 
          title="Completion Rate" 
          value={`${stats.completionRate}%`} 
          color="bg-green-500"
          trend={-2}
        />
      </div>

      {/* Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Course Content Distribution</h3>
          <div className="grid grid-cols-3 gap-4">
             <div className="p-4 bg-red-50 rounded-xl border border-red-100">
               <Video className="w-8 h-8 text-red-500 mb-2" />
               <p className="text-sm text-gray-600">Videos</p>
               <p className="text-xl font-bold text-gray-900">{stats.totalVideos}</p>
             </div>
             <div className="p-4 bg-green-50 rounded-xl border border-green-100">
               <FileText className="w-8 h-8 text-green-500 mb-2" />
               <p className="text-sm text-gray-600">Cheatsheets</p>
               <p className="text-xl font-bold text-gray-900">{stats.totalCheatsheets}</p>
             </div>
             <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
               <BookOpen className="w-8 h-8 text-yellow-500 mb-2" />
               <p className="text-sm text-gray-600">Modules</p>
               <p className="text-xl font-bold text-gray-900">{stats.activeCourses * 4}</p>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Actions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">New Discussions</span>
              </div>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{stats.pendingDiscussions}</span>
            </div>
            {/* Add more pending actions here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;