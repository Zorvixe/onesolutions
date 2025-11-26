// AdminAuthModal.js
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
} from '@mui/material';
import { Security, AdminPanelSettings } from '@mui/icons-material';

const ADMIN_SECRET_KEY = process.env.REACT_APP_ADMIN_SECRET_KEY || "onesolution@2024";

const AdminAuthModal = ({ open, onClose, onSuccess }) => {
  const [secretKey, setSecretKey] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('Please confirm that you are authorized to access the admin panel');
      return;
    }

    if (!secretKey.trim()) {
      setError('Please enter the admin secret key');
      return;
    }

    if (secretKey === ADMIN_SECRET_KEY) {
      // Store admin auth in localStorage with expiry (24 hours)
      const authData = {
        authenticated: true,
        timestamp: new Date().getTime(),
        expiresIn: 24 * 60 * 60 * 1000 // 24 hours
      };
      localStorage.setItem('adminAuth', JSON.stringify(authData));
      onSuccess();
      onClose();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
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
      window.location.href = '/'; // Redirect to home if failed attempts
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
            disabled={attempts >= 3}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                color="primary"
                disabled={attempts >= 3}
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
            disabled={attempts >= 3}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            startIcon={<AdminPanelSettings />}
            disabled={attempts >= 3 || !agreed || !secretKey.trim()}
          >
            Authorize Access
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AdminAuthModal;