// OnlineStatusContext.js
import React, { createContext, useState, useEffect } from 'react';
export const OnlineStatusContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const OnlineStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [todayTime, setTodayTime] = useState(0);
  const [currentSessionStart, setCurrentSessionStart] = useState(null);

  // Fetch the current session status when the provider mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const fetchInitialStatus = async () => {
      try {
        const response = await fetch(`https://apiose.onesolutionsekam.in/api/session/status`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        
        setIsOnline(data.isOnline);
        setTodayTime(data.todayTotal);
        
        if (data.currentSessionStart) {
          const startTime = new Date(data.currentSessionStart);
          setCurrentSessionStart(startTime);
          
          // Calculate elapsed time since session start
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          setTodayTime(prev => prev + elapsed);
        }
      } catch (error) {
        console.error('Error fetching initial status:', error);
      }
    };
  
    fetchInitialStatus();
  }, []);
  
  useEffect(() => {
    let interval;
    
    if (isOnline) {
      interval = setInterval(() => {
        setTodayTime(prev => {
          const newTime = prev + 1;
          // Update every minute (optional optimization)
          if (newTime % 60 === 0) {
            persistTimeToBackend(newTime);
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isOnline]);
  
  const persistTimeToBackend = async (time) => {
    try {
      await fetch(`https://apiose.onesolutionsekam.in/api/session/update`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ duration: time })
      });
    } catch (error) {
      console.error('Error persisting time:', error);
    }
  };

  // Handler to go online
  const handleOnline = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://apiose.onesolutionsekam.in/api/session/start`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsOnline(true);
      setCurrentSessionStart(new Date());
      setTodayTime(prev => prev + 1);
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  // Handler to go offline
  const handleOffline = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://apiose.onesolutionsekam.in/api/session/end`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsOnline(false);
      setCurrentSessionStart(null);
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  return (
    <OnlineStatusContext.Provider
      value={{
        isOnline,
        todayTime,
        currentSessionStart,
        handleOnline,
        handleOffline
      }}
    >
      {children}
    </OnlineStatusContext.Provider>
  );
};
