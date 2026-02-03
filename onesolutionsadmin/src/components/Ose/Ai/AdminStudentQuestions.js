import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
  TextareaAutosize,
} from "@mui/material";
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  PriorityHigh as PriorityIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const AdminStudentQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/ai-content/student-questions?search=${searchTerm}`
      );
      const data = await response.json();
      if (data.success) {
        setQuestions(data.data.questions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (question) => {
    setSelectedQuestion(question);
    setAnswerText(question.answer || "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedQuestion(null);
    setAnswerText("");
  };

  const handleSaveAnswer = async () => {
    try {
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/ai-content/student-questions/${selectedQuestion.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answer: answerText,
            status: answerText.trim() ? "answered" : "pending",
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchQuestions();
        handleCloseDialog();
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };

  const markImportant = async (id, isImportant) => {
    try {
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/ai-content/student-questions/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_important: !isImportant }),
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error marking important:", error);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Student Questions & Answers
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Review and answer questions asked by students
        </Typography>

        <Box display="flex" gap={2} mt={2}>
          <TextField
            fullWidth
            label="Search Questions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchQuestions()}
            InputProps={{
              endAdornment: (
                <IconButton onClick={fetchQuestions}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Button variant="outlined" onClick={fetchQuestions}>
            Refresh
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Asked</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : questions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No questions found
                </TableCell>
              </TableRow>
            ) : (
              questions.map((q) => (
                <TableRow key={q.id}>
                  <TableCell>
                    <Typography fontWeight="medium">
                      {q.first_name} {q.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {q.batch_month} {q.batch_year}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{q.question}</Typography>
                    {q.answer && (
                      <Typography
                        variant="body2"
                        color="success.main"
                        sx={{ mt: 1 }}
                      >
                        ✓ Answered: {q.answer.substring(0, 100)}...
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={q.category || "General"}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={q.status}
                      size="small"
                      color={q.status === "answered" ? "success" : "warning"}
                      icon={
                        q.status === "answered" ? (
                          <CheckCircleIcon />
                        ) : (
                          <PriorityIcon />
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(q.asked_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(q)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color={q.is_important ? "error" : "default"}
                      onClick={() => markImportant(q.id, q.is_important)}
                    >
                      <PriorityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Answer Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Answer Student Question</DialogTitle>
        <DialogContent>
          {selectedQuestion && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Student: {selectedQuestion.first_name}{" "}
                    {selectedQuestion.last_name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      mb: 2,
                      p: 2,
                      bgcolor: "grey.50",
                      borderRadius: 1,
                    }}
                  >
                    <strong>Question:</strong> {selectedQuestion.question}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Your Answer:
                  </Typography>
                  <TextareaAutosize
                    minRows={8}
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                    }}
                    placeholder="Provide a detailed, helpful answer..."
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveAnswer}
            variant="contained"
            disabled={!answerText.trim()}
          >
            Save Answer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminStudentQuestions;
