import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Award,
  TrendingUp,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedLessons: 0,
    totalHours: 0,
    currentStreak: 0,
    certificates: 0,
    weeklyProgress: []
  });

  const [goals, setGoals] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch student goals
      const goalsRes = await fetch('/api/student/courses');
      const goalsData = await goalsRes.json();
      setGoals(goalsData.data || []);
      
      // Mock data for now
      setStats({
        enrolledCourses: goalsData.data?.length || 0,
        completedLessons: 42,
        totalHours: 86,
        currentStreak: 7,
        certificates: 2,
        weeklyProgress: [30, 45, 52, 48, 65, 72, 68]
      });

      setRecentActivity([
        { type: 'lesson', title: 'SEO Basics', time: '2 hours ago', icon: PlayCircle },
        { type: 'quiz', title: 'Google Ads Quiz', time: 'Yesterday', icon: CheckCircle },
        { type: 'project', title: 'Facebook Campaign', time: '2 days ago', icon: Award },
        { type: 'certificate', title: 'Content Specialist', time: '1 week ago', icon: Award }
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Progress',
        data: stats.weeklyProgress,
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: value => `${value}%`
        }
      }
    }
  };

  const StatCard = ({ icon: Icon, title, value, unit, color }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-2">
            {value} {unit && <span className="text-lg">{unit}</span>}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const GoalCard = ({ goal }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{goal.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{goal.description}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
          {goal.duration_months} months
        </span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{goal.progress_percentage || 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            style={{ width: `${goal.progress_percentage || 0}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{goal.enrolled_at ? 'Enrolled' : 'Not Enrolled'}</span>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90">
          {goal.enrolled_at ? 'Continue' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
            <p className="opacity-90 mt-2">Continue your digital marketing journey today</p>
            <div className="flex items-center space-x-4 mt-6">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Daily Goal: 60 mins</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Day {stats.currentStreak} streak</span>
              </div>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={BookOpen}
          title="Enrolled Courses"
          value={stats.enrolledCourses}
          color="bg-blue-500"
        />
        <StatCard 
          icon={CheckCircle}
          title="Completed Lessons"
          value={stats.completedLessons}
          color="bg-green-500"
        />
        <StatCard 
          icon={Clock}
          title="Total Hours"
          value={stats.totalHours}
          unit="hrs"
          color="bg-yellow-500"
        />
        <StatCard 
          icon={Target}
          title="Current Streak"
          value={stats.currentStreak}
          unit="days"
          color="bg-red-500"
        />
        <StatCard 
          icon={Award}
          title="Certificates"
          value={stats.certificates}
          color="bg-purple-500"
        />
        <StatCard 
          icon={BarChart3}
          title="Avg. Progress"
          value={stats.weeklyProgress.length ? Math.round(stats.weeklyProgress.reduce((a,b)=>a+b)/stats.weeklyProgress.length) : 0}
          unit="%"
          color="bg-indigo-500"
        />
      </div>

      {/* Goals and Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className="p-2 rounded-lg bg-blue-100 mr-3">
                  <activity.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs capitalize">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Goals */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Learning Goals</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.slice(0, 3).map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Continue Learning', icon: PlayCircle, color: 'from-blue-500 to-cyan-500' },
            { label: 'Take Quiz', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
            { label: 'View Certificates', icon: Award, color: 'from-purple-500 to-pink-500' },
            { label: 'Ask Doubts', icon: Target, color: 'from-orange-500 to-red-500' }
          ].map((action, idx) => (
            <button 
              key={idx}
              className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl flex flex-col items-center justify-center hover:opacity-90 transition`}
            >
              <action.icon className="w-8 h-8 mb-2" />
              <span className="font-medium text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;