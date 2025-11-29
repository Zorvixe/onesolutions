import { useState, useEffect } from 'react';

const API_BASE_URL = "https://api.onesolutionsekam.in";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

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
          // Frontend-only validation - no API call
          setIsAuthenticated(true);
          setShowAuthModal(false);
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
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setShowAuthModal(true);
  };

  const getAuthHeaders = () => {
    // Return empty headers since we don't need backend authorization
    return {
      'Content-Type': 'application/json'
    };
  };

  return {
    isAuthenticated,
    showAuthModal,
    loading,
    setShowAuthModal,
    handleAuthSuccess,
    logoutAdmin,
    getAuthHeaders
  };
};