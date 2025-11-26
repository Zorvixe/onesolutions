import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

const API_BASE_URL = "https://api.onesolutionsekam.in";

const StatCard = ({
  title,
  value,
  icon,
  color = "primary",
  loading = false,
}) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {title}
          </Typography>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          )}
        </Box>
        <Box color={`${color}.main`}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

const StudentDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || localStorage.getItem("token")
  );

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/students/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Stats API Response:", result);

      if (result.success) {
        setStats(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch stats");
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError(
        err.message || "Failed to load dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
        flexDirection="column"
      >
        <CircularProgress size={40} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchStats}>
              <RefreshIcon sx={{ mr: 1 }} />
              Retry
            </Button>
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Alert severity="warning">
          No data available. Please check your connection and try again.
        </Alert>
      </Box>
    );
  }

  const { overview = {}, batchStats = [] } = stats;

  // Safe overview with defaults
  const safeOverview = {
    total_students: 0,
    active_students: 0,
    inactive_students: 0,
    current_batch_students: 0,
    unique_batches: 0,
    first_join_date: null,
    latest_join_date: null,
    ...overview,
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          Student Dashboard
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchStats}
        >
          Refresh
        </Button>
      </Box>

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={safeOverview.total_students}
            icon={<PeopleIcon fontSize="large" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Students"
            value={safeOverview.active_students}
            icon={<SchoolIcon fontSize="large" />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Current Batch"
            value={safeOverview.current_batch_students}
            icon={<TrendingUpIcon fontSize="large" />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Inactive Students"
            value={safeOverview.inactive_students}
            icon={<WorkIcon fontSize="large" />}
            color="warning"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Batch Statistics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Batch Statistics
              </Typography>
              {batchStats && batchStats.length > 0 ? (
                <List>
                  {batchStats.map((batch, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={`${batch.batch_month} ${batch.batch_year}`}
                          secondary={`${batch.student_count} students`}
                        />
                      </ListItem>
                      {index < batchStats.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography color="textSecondary" align="center" sx={{ py: 2 }}>
                  No batch data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* System Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Information
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Batches: {safeOverview.unique_batches}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                First Student Joined:{" "}
                {safeOverview.first_join_date
                  ? new Date(safeOverview.first_join_date).toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Latest Student Joined:{" "}
                {safeOverview.latest_join_date
                  ? new Date(safeOverview.latest_join_date).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
