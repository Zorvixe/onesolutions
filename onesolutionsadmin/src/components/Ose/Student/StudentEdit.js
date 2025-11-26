// src/components/admin/StudentEdit.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../../services/adminApi";

const StudentEdit = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchStudent();
  }, [studentId]);

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getStudent(studentId);
      setStudent(response.data.student);
    } catch (err) {
      setError("Failed to fetch student details");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await adminApi.updateStudent(studentId, student);
      setSuccess("Student updated successfully");
      fetchStudent(); // Refresh data
    } catch (err) {
      setError("Failed to update student");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section, field, value) => {
    setStudent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, field, value) => {
    const arrayValue =
      typeof value === "string"
        ? value.split(",").map((item) => item.trim())
        : value;
    handleChange(section, field, arrayValue);
  };

  const addProject = () => {
    const newProject = {
      projectTitle: "",
      projectDescription: "",
      projectLink: "",
      skills: [],
    };
    setStudent((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProject],
    }));
  };

  const updateProject = (index, field, value) => {
    setStudent((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  const removeProject = (index) => {
    setStudent((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addAchievement = () => {
    const newAchievement = {
      achievementTitle: "",
      achievementDescription: "",
      achievementLink: "",
      achievementDate: "",
    };
    setStudent((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), newAchievement],
    }));
  };

  const updateAchievement = (index, field, value) => {
    setStudent((prev) => {
      const updatedAchievements = [...prev.achievements];
      updatedAchievements[index] = {
        ...updatedAchievements[index],
        [field]: value,
      };
      return { ...prev, achievements: updatedAchievements };
    });
  };

  const removeAchievement = (index) => {
    setStudent((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <Typography>Loading student details...</Typography>;
  }

  if (!student) {
    return <Typography>Student not found</Typography>;
  }

  const tabLabels = [
    "Basic Info",
    "Personal Details",
    "Education",
    "Career",
    "Projects",
    "Achievements",
  ];

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3} gap={2}>
        <IconButton onClick={() => navigate("/admin/students")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">
          Edit Student: {student.first_name} {student.last_name}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
          >
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>

          {/* Basic Information Tab */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Student ID"
                  value={student.student_id || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({
                      ...prev,
                      student_id: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={student.email || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={student.first_name || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={student.last_name || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={student.phone || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  select
                  label="Batch Month"
                  value={student.batch_month || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({
                      ...prev,
                      batch_month: e.target.value,
                    }))
                  }
                >
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
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Batch Year"
                  type="number"
                  value={student.batch_year || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({
                      ...prev,
                      batch_year: parseInt(e.target.value),
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={student.status || "active"}
                  onChange={(e) =>
                    setStudent((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={student.is_current_batch || false}
                      onChange={(e) =>
                        setStudent((prev) => ({
                          ...prev,
                          is_current_batch: e.target.checked,
                        }))
                      }
                    />
                  }
                  label="Current Batch Student"
                />
              </Grid>
            </Grid>
          )}

          {/* Projects Tab */}
          {activeTab === 4 && (
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">Projects</Typography>
                <Button startIcon={<AddIcon />} onClick={addProject}>
                  Add Project
                </Button>
              </Box>

              {student.projects?.map((project, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                    mb={2}
                  >
                    <Typography variant="h6">Project {index + 1}</Typography>
                    <IconButton
                      color="error"
                      onClick={() => removeProject(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Project Title"
                        value={project.projectTitle || ""}
                        onChange={(e) =>
                          updateProject(index, "projectTitle", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Project Description"
                        value={project.projectDescription || ""}
                        onChange={(e) =>
                          updateProject(
                            index,
                            "projectDescription",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Project Link"
                        value={project.projectLink || ""}
                        onChange={(e) =>
                          updateProject(index, "projectLink", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Skills (comma separated)"
                        value={project.skills?.join(", ") || ""}
                        onChange={(e) =>
                          updateProject(index, "skills", e.target.value)
                        }
                        placeholder="React, Node.js, MongoDB"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              {(!student.projects || student.projects.length === 0) && (
                <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
                  No projects added yet
                </Typography>
              )}
            </Box>
          )}

          {/* Achievements Tab */}
          {activeTab === 5 && (
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">Achievements</Typography>
                <Button startIcon={<AddIcon />} onClick={addAchievement}>
                  Add Achievement
                </Button>
              </Box>

              {student.achievements?.map((achievement, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                    mb={2}
                  >
                    <Typography variant="h6">
                      Achievement {index + 1}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => removeAchievement(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Achievement Title"
                        value={achievement.achievementTitle || ""}
                        onChange={(e) =>
                          updateAchievement(
                            index,
                            "achievementTitle",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Achievement Description"
                        value={achievement.achievementDescription || ""}
                        onChange={(e) =>
                          updateAchievement(
                            index,
                            "achievementDescription",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Achievement Link"
                        value={achievement.achievementLink || ""}
                        onChange={(e) =>
                          updateAchievement(
                            index,
                            "achievementLink",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Achievement Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={achievement.achievementDate || ""}
                        onChange={(e) =>
                          updateAchievement(
                            index,
                            "achievementDate",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              {(!student.achievements || student.achievements.length === 0) && (
                <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
                  No achievements added yet
                </Typography>
              )}
            </Box>
          )}

          {/* Save Button */}
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/students")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentEdit;
