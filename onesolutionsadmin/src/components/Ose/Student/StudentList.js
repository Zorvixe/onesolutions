import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Pagination,
  CircularProgress,
  Avatar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

const API_BASE_URL = "https://api.onesolutionsekam.in";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || localStorage.getItem("token")
  );

  const [filters, setFilters] = useState({
    search: "",
    batchMonth: "",
    batchYear: "",
    status: "",
    page: 1,
    limit: 10,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      // Build query parameters
      const params = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });

      console.log(
        "Fetching students from:",
        `${API_BASE_URL}/api/admin/students?${params}`
      );

      const response = await fetch(
        `${API_BASE_URL}/api/admin/students?${params}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError("Authentication failed. Please login again.");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        setStudents(result.data.students || []);
        setPagination(
          result.data.pagination || {
            page: 1,
            limit: 10,
            total: 0,
            pages: 1,
          }
        );
      } else {
        throw new Error(result.message || "Failed to fetch students");
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.message || "Failed to fetch students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/students/${studentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSuccess("Student deleted successfully");
        setDeleteDialog(null);
        fetchStudents(); // Refresh the list
      } else {
        throw new Error(result.message || "Failed to delete student");
      }
    } catch (err) {
      console.error("Error deleting student:", err);
      setError("Failed to delete student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters.page, filters.limit]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (event, value) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      batchMonth: "",
      batchYear: "",
      status: "",
      page: 1,
      limit: 10,
    });
  };

  const applyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1, // Reset to first page
    }));
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getDisplayName = (student) => {
    return (
      student.fullName ||
      `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
      "Unknown Student"
    );
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" component="h2">
              Student Management
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchStudents}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              severity="success"
              sx={{ mb: 2 }}
              onClose={() => setSuccess("")}
            >
              {success}
            </Alert>
          )}

          {/* Filters */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <FilterIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Filters
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Search Students"
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    placeholder="Name, email, or student ID"
                    InputProps={{
                      startAdornment: (
                        <SearchIcon color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    select
                    label="Batch Month"
                    value={filters.batchMonth}
                    onChange={(e) =>
                      handleFilterChange("batchMonth", e.target.value)
                    }
                    disabled={loading}
                  >
                    <MenuItem value="">All Months</MenuItem>
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                    <MenuItem value="April">April</MenuItem>
                    <MenuItem value="May">May</MenuItem>
                    <MenuItem value="June">June</MenuItem>
                    <MenuItem value="July">July</MenuItem>
                    <MenuItem value="August">August</MenuItem>
                    <MenuItem value="September">September</MenuItem>
                    <MenuItem value="October">October</MenuItem>
                    <MenuItem value="November">November</MenuItem>
                    <MenuItem value="December">December</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    select
                    label="Batch Year"
                    value={filters.batchYear}
                    onChange={(e) =>
                      handleFilterChange("batchYear", e.target.value)
                    }
                    disabled={loading}
                  >
                    <MenuItem value="">All Years</MenuItem>
                    {[2023, 2024, 2025, 2026].map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    disabled={loading}
                  >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      onClick={clearFilters}
                      disabled={loading}
                    >
                      Clear
                    </Button>
                    <Button
                      variant="contained"
                      onClick={applyFilters}
                      disabled={loading}
                    >
                      Apply Filters
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Students Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Current Batch</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <CircularProgress />
                        <Typography variant="body2" sx={{ mt: 2 }}>
                          Loading students...
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        gutterBottom
                      >
                        No students found
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {filters.search ||
                        filters.batchMonth ||
                        filters.batchYear ||
                        filters.status
                          ? "Try adjusting your filters to see more results."
                          : "There are no students in the system yet."}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow
                      key={student.id}
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        opacity: student.status === "inactive" ? 0.7 : 1,
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="primary"
                        >
                          {student.student_id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            src={student.profileImage}
                            alt={getDisplayName(student)}
                            sx={{ width: 40, height: 40, mr: 2 }}
                          >
                            {getDisplayName(student).charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {getDisplayName(student)}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {student.email || "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {student.phone || "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {student.batch_month && student.batch_year
                            ? `${student.batch_month} ${student.batch_year}`
                            : "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            student.status
                              ? student.status.charAt(0).toUpperCase() +
                                student.status.slice(1)
                              : "Unknown"
                          }
                          color={getStatusColor(student.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(student.join_date || student.created_at)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={student.is_current_batch ? "Yes" : "No"}
                          color={
                            student.is_current_batch ? "success" : "default"
                          }
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() =>
                              window.open(
                                `/admin/students/${student.id}`,
                                "_blank"
                              )
                            }
                            title="View Student"
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() =>
                              window.open(
                                `/admin/students/${student.id}/edit`,
                                "_blank"
                              )
                            }
                            title="Edit Student"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteDialog(student)}
                            title="Delete Student"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {!loading && pagination.pages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={pagination.pages}
                page={pagination.page}
                onChange={handlePageChange}
                color="primary"
                disabled={loading}
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete student "
            {deleteDialog ? getDisplayName(deleteDialog) : ""}"? This action
            cannot be undone and will permanently delete all their data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteStudent(deleteDialog?.id)}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentList;
