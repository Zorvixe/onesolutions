import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = () => {
    setLoading(true);
    try {
      const authData = localStorage.getItem('adminAuth');
      if (authData) {
        const { authenticated, timestamp, expiresIn } = JSON.parse(authData);
        const isExpired = new Date().getTime() - timestamp > expiresIn;
        
        if (authenticated && !isExpired) {
          setIsAuthenticated(true);
          setShowAuthModal(false);
        } else {
          // Clear expired auth
          localStorage.removeItem('adminAuth');
          setShowAuthModal(true);
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
    setIsAuthenticated(false);
    setShowAuthModal(true);
  };

  return {
    isAuthenticated,
    showAuthModal,
    loading,
    setShowAuthModal,
    handleAuthSuccess,
    logoutAdmin
  };
};