import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_APP_URL || "https://api.onesolutionsekam.in";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    setLoading(true);
    try {
      const authData = localStorage.getItem('adminAuth');
      const storedToken = localStorage.getItem('adminToken');

      if (authData && storedToken) {
        const { authenticated, timestamp, expiresIn } = JSON.parse(authData);
        const isExpired = new Date().getTime() - timestamp > expiresIn;
        
        if (authenticated && !isExpired) {
          // Verify token is still valid by making a test API call
          try {
            const response = await fetch(`${API_BASE_URL}/api/admin/students/stats`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
                'x-admin-secret': storedToken
              }
            });

            if (response.ok) {
              setIsAuthenticated(true);
              setToken(storedToken);
              setShowAuthModal(false);
            } else {
              throw new Error('Token invalid');
            }
          } catch (error) {
            console.error('Token verification failed:', error);
            logoutAdmin();
          }
        } else {
          logoutAdmin();
        }
      } else {
        setShowAuthModal(true);
      }
    } catch (error) {
      console.error('Error checking admin auth:', error);
      setShowAuthModal(true);
    }
    setLoading(false);
  };

  const handleAuthSuccess = () => {
    const storedToken = localStorage.getItem('adminToken');
    setToken(storedToken);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setShowAuthModal(true);
    setToken('');
  };

  const getAuthHeaders = () => {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-admin-secret': token
    };
  };

  return {
    isAuthenticated,
    showAuthModal,
    loading,
    token,
    setShowAuthModal,
    handleAuthSuccess,
    logoutAdmin,
    getAuthHeaders
  };
};