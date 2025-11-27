import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { Security, AdminPanelSettings } from '@mui/icons-material';

const API_BASE_URL = process.env.REACT_APP_API_APP_URL || "https://api.onesolutionsekam.in";

const AdminAuthModal = ({ open, onClose, onSuccess }) => {
  const [secretKey, setSecretKey] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!agreed) {
      setError('Please confirm that you are authorized to access the admin panel');
      setLoading(false);
      return;
    }

    if (!secretKey.trim()) {
      setError('Please enter the admin secret key');
      setLoading(false);
      return;
    }

    try {
      // Verify admin access by making a test API call
      const response = await fetch(`${API_BASE_URL}/api/admin/students/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
          'x-admin-secret': secretKey
        }
      });

      if (response.ok) {
        // Store admin authentication
        const authData = {
          authenticated: true,
          timestamp: new Date().getTime(),
          expiresIn: 24 * 60 * 60 * 1000, // 24 hours
          token: secretKey
        };
        
        localStorage.setItem('adminAuth', JSON.stringify(authData));
        localStorage.setItem('adminToken', secretKey);
        
        setLoading(false);
        onSuccess();
        onClose();
        
        // Clear form
        setSecretKey('');
        setAgreed(false);
        setError('');
        setAttempts(0);
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setLoading(false);
      
      if (newAttempts >= 3) {
        setError('Too many failed attempts. Please refresh the page and try again.');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setError(`Invalid secret key. ${3 - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleClose = () => {
    if (attempts > 0) {
      window.location.href = '/';
    } else {
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={attempts > 0}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <Security color="primary" />
            <Typography variant="h6">Admin Authorization Required</Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Restricted Access:</strong> This area contains sensitive student data and administrative functions.
          </Alert>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" paragraph>
              To proceed, you must:
            </Typography>
            <ul style={{ color: 'text.secondary', fontSize: '0.875rem', paddingLeft: '20px' }}>
              <li>Be an authorized administrator</li>
              <li>Have the valid admin secret key</li>
              <li>Agree to handle data responsibly</li>
            </ul>
          </Box>

          <TextField
            fullWidth
            label="Admin Secret Key"
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            margin="normal"
            error={!!error}
            helperText={error ? error : "Enter the admin authorization key"}
            disabled={attempts >= 3 || loading}
            autoComplete="off"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                color="primary"
                disabled={attempts >= 3 || loading}
              />
            }
            label={
              <Typography variant="body2">
                I confirm that I am an authorized administrator and will handle all data responsibly
              </Typography>
            }
            sx={{ mt: 2 }}
          />

          {attempts >= 3 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Security lock activated. Redirecting to home page...
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button 
            onClick={handleClose}
            disabled={attempts >= 3 || loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            startIcon={loading ? <CircularProgress size={16} /> : <AdminPanelSettings />}
            disabled={attempts >= 3 || !agreed || !secretKey.trim() || loading}
          >
            {loading ? 'Verifying...' : 'Authorize Access'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AdminAuthModal;