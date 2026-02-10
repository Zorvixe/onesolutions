import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Award,
  TrendingUp,
  Calendar,
  Target,
  BarChart3,
  ArrowRight
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch student courses/goals
      const goalsRes = await fetch('/api/student/courses', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const goalsData = await goalsRes.json();
      
      if (goalsData.success) {
        setGoals(goalsData.data || []);
        
        // Calculate basic stats from real data
        const enrolledCount = goalsData.data.filter(g => g.enrolled_at).length;
        
        // Fetch progress summary
        const progressRes = await fetch('/api/progress/overall', {
             headers: { 'Authorization': `Bearer ${token}` }
        });
        const progressData = await progressRes.json();

        setStats({
          enrolledCourses: enrolledCount,
          completedLessons: progressData.data?.completedContent || 0,
          totalHours: 12, // Placeholder calculation based on content duration
          currentStreak: 5, // Placeholder
          certificates: 0, // Placeholder
          weeklyProgress: [20, 35, 40, 45, 60, 65, 75] // Mock chart data
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInGoal = async (goalId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/student/courses/enroll/${goalId}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData(); // Refresh UI
      }
    } catch (error) {
      console.error("Enrollment failed", error);
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2 text-gray-900">
            {value} {unit && <span className="text-lg text-gray-500 font-normal">{unit}</span>}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  const GoalCard = ({ goal }) => {
    const isEnrolled = !!goal.enrolled_at;
    const progress = goal.progress_percentage || 0;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{goal.name}</h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{goal.description}</p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wide">
            {goal.duration_months} Months
          </span>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 font-medium">Progress</span>
            <span className="text-blue-600 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {isEnrolled ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Enrolled</span>
              </>
            ) : (
              <span>Not Enrolled</span>
            )}
          </div>
          <button 
            onClick={() => isEnrolled ? navigate(`/course/${goal.id}/learn`) : enrollInGoal(goal.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isEnrolled 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            <span>{isEnrolled ? 'Continue Learning' : 'Enroll Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
            <p className="text-blue-100 mt-2 text-lg">Your digital marketing journey continues here.</p>
            <div className="flex items-center space-x-6 mt-8">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Target className="w-5 h-5 text-blue-200" />
                <span className="font-medium">Daily Goal: 60 mins</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-blue-200" />
                <span className="font-medium">Day {stats.currentStreak} streak</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={BookOpen}
          title="Active Courses"
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
          title="Learning Hours"
          value={stats.totalHours}
          unit="hrs"
          color="bg-purple-500"
        />
        <StatCard 
          icon={Award}
          title="Certificates"
          value={stats.certificates}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - Goals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Your Learning Path</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {goals.map(goal => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>

        {/* Sidebar - Charts & Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Activity</h3>
            <div className="h-48">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center group">
                <PlayCircle className="w-8 h-8 mx-auto text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Resume</span>
              </button>
              <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center group">
                <Target className="w-8 h-8 mx-auto text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Quiz</span>
              </button>
              <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center group">
                <Award className="w-8 h-8 mx-auto text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Certificates</span>
              </button>
              <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center group">
                <BarChart3 className="w-8 h-8 mx-auto text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Stats</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;