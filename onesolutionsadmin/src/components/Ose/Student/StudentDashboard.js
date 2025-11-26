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
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/students/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setStats(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch stats");
      }
    } catch (error) {
      console.error("Error fetching stats:", error);

      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        setError(
          "Cannot connect to server. Please check if the server is running and CORS is configured properly."
        );
      } else if (error.message.includes("Network Error")) {
        setError(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        setError(
          error.message || "Failed to load dashboard data. Please try again."
        );
      }
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
        <Button
          variant="contained"
          onClick={fetchStats}
          startIcon={<RefreshIcon />}
        >
          Retry Loading Dashboard
        </Button>
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

  const { overview = {}, batchStats = [], monthlyStats = [] } = stats;

  // Default values to prevent undefined errors
  const safeOverview = {
    total_students: 0,
    active_students: 0,
    current_batch_students: 0,
    job_seekers: 0,
    first_join_date: null,
    latest_join_date: null,
    unique_batches: 0,
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
          Admin Dashboard
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
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Students"
            value={safeOverview.active_students}
            icon={<SchoolIcon fontSize="large" />}
            color="success"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Current Batch"
            value={safeOverview.current_batch_students}
            icon={<TrendingUpIcon fontSize="large" />}
            color="info"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Job Seekers"
            value={safeOverview.job_seekers}
            icon={<WorkIcon fontSize="large" />}
            color="warning"
            loading={loading}
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

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Student Registrations
              </Typography>
              <Typography variant="body2" color="textSecondary">
                First Join:{" "}
                {safeOverview.first_join_date
                  ? new Date(safeOverview.first_join_date).toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Latest Join:{" "}
                {safeOverview.latest_join_date
                  ? new Date(safeOverview.latest_join_date).toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Unique Batches: {safeOverview.unique_batches}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
