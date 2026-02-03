import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Grid,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Category as CategoryIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

const AdminAIContent = () => {
  const [content, setContent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterActive, setFilterActive] = useState("all");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    title: "",
    content: "",
    keywords: "",
    content_type: "text",
    file_url: "",
    priority: 1,
    is_active: true,
  });

  useEffect(() => {
    fetchContent();
    fetchCategories();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002'}/api/admin/ai-content?category=${selectedCategory}&search=${searchTerm}&is_active=${filterActive}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setContent(data.data.content || []);
      } else {
        throw new Error(data.error || "Failed to fetch content");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      setSnackbar({
        open: true,
        message: `Failed to fetch content: ${error.message}`,
        severity: "error"
      });
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002'}/api/admin/ai-content/categories`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setSnackbar({
        open: true,
        message: `Failed to fetch categories: ${error.message}`,
        severity: "error"
      });
      setCategories([]);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingContent(item);
      setFormData({
        category: item.category || "",
        subcategory: item.subcategory || "",
        title: item.title || "",
        content: item.content || "",
        keywords: Array.isArray(item.keywords)
          ? item.keywords.join(", ")
          : item.keywords || "",
        content_type: item.content_type || "text",
        file_url: item.file_url || "",
        priority: item.priority || 1,
        is_active: item.is_active !== undefined ? item.is_active : true,
      });
    } else {
      setEditingContent(null);
      setFormData({
        category: "",
        subcategory: "",
        title: "",
        content: "",
        keywords: "",
        content_type: "text",
        file_url: "",
        priority: 1,
        is_active: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingContent(null);
  };

  const handleSubmit = async () => {
    if (!formData.category || !formData.title || !formData.content) {
      setSnackbar({
        open: true,
        message: "Category, title, and content are required",
        severity: "error"
      });
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const url = `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002'}/api/admin/ai-content`;
      
      const payload = {
        ...formData,
        id: editingContent?.id,
        keywords: formData.keywords 
          ? formData.keywords.split(',').map(k => k.trim()).filter(k => k)
          : []
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (data.success) {
        setSnackbar({
          open: true,
          message: `Content ${editingContent ? 'updated' : 'created'} successfully`,
          severity: "success"
        });
        fetchContent();
        handleCloseDialog();
      } else {
        throw new Error(data.error || "Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      setSnackbar({
        open: true,
        message: `Failed to save content: ${error.message}`,
        severity: "error"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002'}/api/admin/ai-content/${id}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      if (data.success) {
        setSnackbar({
          open: true,
          message: "Content deleted successfully",
          severity: "success"
        });
        fetchContent();
      } else {
        throw new Error(data.error || "Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      setSnackbar({
        open: true,
        message: `Failed to delete content: ${error.message}`,
        severity: "error"
      });
    }
  };

  const handleSearch = () => {
    fetchContent();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <CategoryIcon fontSize="large" color="primary" />
            <div>
              <Typography variant="h5" gutterBottom>
                AI Learning Content Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add and manage content for BroOne AI Assistant
              </Typography>
            </div>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            disabled={loading}
          >
            Add New Content
          </Button>
        </Box>

        {/* Filters */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Content"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch} disabled={loading}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.category_name} value={cat.category_name}>
                    {cat.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterActive}
                label="Status"
                onChange={(e) => setFilterActive(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              variant="outlined" 
              onClick={fetchContent} 
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Loading..." : "Apply Filters"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Content Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Keywords</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <CircularProgress />
                  <Typography sx={{ mt: 2 }}>Loading content...</Typography>
                </TableCell>
              </TableRow>
            ) : content.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No content found. Add some content to get started!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              content.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Typography fontWeight="medium">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {item.content.substring(0, 100)}...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.category || "Uncategorized"}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    {item.subcategory && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        {item.subcategory}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {Array.isArray(item.keywords) && item.keywords.length > 0 ? (
                        item.keywords.slice(0, 3).map((keyword, idx) => (
                          <Chip 
                            key={idx} 
                            label={keyword} 
                            size="small" 
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          No keywords
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`P${item.priority}`}
                      size="small"
                      sx={{
                        backgroundColor: 
                          item.priority === 1 ? '#f44336' :
                          item.priority === 2 ? '#ff9800' :
                          item.priority === 3 ? '#ffeb3b' :
                          item.priority === 4 ? '#4caf50' :
                          '#9e9e9e',
                        color: item.priority <= 3 ? 'white' : 'black',
                        fontWeight: 'bold'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.is_active ? "Active" : "Inactive"}
                      size="small"
                      color={item.is_active ? "success" : "default"}
                      icon={item.is_active ? <CheckCircleIcon /> : <ErrorIcon />}
                      variant={item.is_active ? "filled" : "outlined"}
                    />
                  </TableCell>
                  <TableCell>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(item)}
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={saving}
      >
        <DialogTitle>
          {editingContent ? "Edit Content" : "Add New Content"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category *</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category *"
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    disabled={saving}
                  >
                    <MenuItem value="">Select a category</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem
                        key={cat.category_name}
                        value={cat.category_name}
                      >
                        {cat.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Subcategory"
                  value={formData.subcategory}
                  onChange={(e) =>
                    setFormData({ ...formData, subcategory: e.target.value })
                  }
                  disabled={saving}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title *"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  disabled={saving}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Keywords (comma separated)"
                  value={formData.keywords}
                  onChange={(e) =>
                    setFormData({ ...formData, keywords: e.target.value })
                  }
                  disabled={saving}
                  helperText="Enter keywords separated by commas (e.g., react, hooks, state)"
                  placeholder="react, javascript, hooks, state"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content *"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  multiline
                  rows={6}
                  disabled={saving}
                  required
                  helperText="Detailed content that AI will use to answer questions"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Content Type</InputLabel>
                  <Select
                    value={formData.content_type}
                    label="Content Type"
                    onChange={(e) =>
                      setFormData({ ...formData, content_type: e.target.value })
                    }
                    disabled={saving}
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="code">Code</MenuItem>
                    <MenuItem value="example">Example</MenuItem>
                    <MenuItem value="tutorial">Tutorial</MenuItem>
                    <MenuItem value="faq">FAQ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Priority (1-5)"
                  type="number"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: parseInt(e.target.value) || 1,
                    })
                  }
                  disabled={saving}
                  inputProps={{ min: 1, max: 5 }}
                  helperText="1 = Highest priority, 5 = Lowest"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="File URL (optional)"
                  value={formData.file_url}
                  onChange={(e) =>
                    setFormData({ ...formData, file_url: e.target.value })
                  }
                  disabled={saving}
                  helperText="Link to external resources, images, or files"
                  placeholder="https://example.com/resource.pdf"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_active: e.target.checked,
                        })
                      }
                      disabled={saving}
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={saving}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={saving || !formData.category || !formData.title || !formData.content}
            startIcon={saving ? <CircularProgress size={20} /> : null}
          >
            {saving ? "Saving..." : editingContent ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAIContent;