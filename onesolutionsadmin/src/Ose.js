// App.jsx or App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import DiscussionManagement from './pages/admin/DiscussionManagement';
import DiscussionThreadDetail from './pages/admin/DiscussionThreadDetail';
import FeedbackManagement from './pages/admin/FeedbackManagement';
import NotFound from './pages/NotFound';

function Ose() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="discussions" element={<DiscussionManagement />} />
          <Route path="discussions/thread/:threadId" element={<DiscussionThreadDetail />} />
          <Route path="feedback" element={<FeedbackManagement />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Ose;