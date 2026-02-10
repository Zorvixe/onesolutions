import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Video, 
  FileText, 
  BarChart3,
  MessageSquare,
  Trophy
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    totalVideos: 0,
    totalCheatsheets: 0,
    pendingDiscussions: 0,
    completionRate: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Mock data - replace with actual API calls
      setStats({
        totalStudents: 1250,
        activeCourses: 3,
        totalVideos: 48,
        totalCheatsheets: 36,
        pendingDiscussions: 12,
        completionRate: 68
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, change }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '↗' : '↘'} {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[
          { user: 'Rajesh Kumar', action: 'completed SEO module', time: '2 mins ago' },
          { user: 'Priya Sharma', action: 'asked a question', time: '15 mins ago' },
          { user: 'Amit Patel', action: 'uploaded project', time: '1 hour ago' },
          { user: 'Sneha Reddy', action: 'achieved certificate', time: '2 hours ago' }
        ].map((activity, idx) => (
          <div key={idx} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.user}</p>
              <p className="text-sm text-gray-500">{activity.action}</p>
            </div>
            <span className="text-sm text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your digital marketing platform</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          Create New Course
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={Users} 
          title="Total Students" 
          value={stats.totalStudents} 
          color="bg-blue-500"
          change={12}
        />
        <StatCard 
          icon={BookOpen} 
          title="Active Courses" 
          value={stats.activeCourses} 
          color="bg-green-500"
        />
        <StatCard 
          icon={Video} 
          title="Video Lessons" 
          value={stats.totalVideos} 
          color="bg-red-500"
          change={8}
        />
        <StatCard 
          icon={FileText} 
          title="Cheatsheets" 
          value={stats.totalCheatsheets} 
          color="bg-yellow-500"
        />
        <StatCard 
          icon={MessageSquare} 
          title="Pending Discussions" 
          value={stats.pendingDiscussions} 
          color="bg-purple-500"
        />
        <StatCard 
          icon={Trophy} 
          title="Completion Rate" 
          value={`${stats.completionRate}%`} 
          color="bg-indigo-500"
          change={5}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Course Progress Overview</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Chart would go here */}
            <BarChart3 className="w-16 h-16" />
            <p>Progress chart visualization</p>
          </div>
        </div>
        <RecentActivity />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Video', icon: Video, color: 'bg-blue-100 text-blue-600' },
            { label: 'Create Quiz', icon: FileText, color: 'bg-green-100 text-green-600' },
            { label: 'Upload Resource', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
            { label: 'View Reports', icon: BarChart3, color: 'bg-yellow-100 text-yellow-600' }
          ].map((action, idx) => (
            <button 
              key={idx}
              className={`${action.color} p-4 rounded-lg flex flex-col items-center justify-center hover:opacity-90 transition`}
            >
              <action.icon className="w-8 h-8 mb-2" />
              <span className="font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;