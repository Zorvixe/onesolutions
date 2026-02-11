import React, { useState } from 'react';
import { X, Plus, Trash2, Check, HelpCircle } from 'lucide-react';
import './MCQCreator.css';

const MCQCreator = ({ subtopicId, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }
  ]);
  const [saving, setSaving] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const setCorrectAnswer = (questionId, optionIndex) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, correctAnswer: optionIndex } : q
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Quiz title is required');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}/mcq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          questions: questions.map(q => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation
          }))
        }),
      });

      if (!response.ok) throw new Error('Failed to save MCQ');
      onSuccess();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save quiz');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mcq-overlay">
      <div className="mcq-modal">
        <div className="mcq-header">
          <div className="mcq-header-left">
            <div className="mcq-icon-wrapper">
              <HelpCircle className="mcq-icon" />
            </div>
            <h3 className="mcq-title">Create MCQ Quiz</h3>
          </div>
          <button onClick={onClose} className="mcq-close-btn">
            <X className="mcq-close-icon" />
          </button>
        </div>

        <div className="mcq-content">
          <form id="mcq-form" onSubmit={handleSubmit} className="mcq-form">
            <div className="mcq-form-section">
              <label className="mcq-label">Quiz Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mcq-input"
                placeholder="e.g., SEO Fundamentals Quiz"
                required
              />
            </div>

            <div className="mcq-questions-container">
              {questions.map((q, qIndex) => (
                <div key={q.id} className="mcq-question-card">
                  <div className="mcq-question-header">
                    <h4 className="mcq-question-number">Question {qIndex + 1}</h4>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(q.id)}
                        className="mcq-remove-btn"
                      >
                        <Trash2 className="mcq-remove-icon" />
                      </button>
                    )}
                  </div>

                  <div className="mcq-question-textarea-wrapper">
                    <textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                      className="mcq-textarea"
                      placeholder="Enter question text..."
                      rows="2"
                      required
                    />
                  </div>

                  <div className="mcq-options-grid">
                    {q.options.map((option, optIndex) => (
                      <div key={optIndex} className="mcq-option-item">
                        <button
                          type="button"
                          onClick={() => setCorrectAnswer(q.id, optIndex)}
                          className={`mcq-correct-btn ${
                            q.correctAnswer === optIndex ? 'mcq-correct-active' : ''
                          }`}
                          title="Mark as correct answer"
                        >
                          <Check className="mcq-check-icon" />
                        </button>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                          className={`mcq-option-input ${q.correctAnswer === optIndex ? 'mcq-option-correct' : ''}`}
                          placeholder={`Option ${optIndex + 1}`}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mcq-explanation-wrapper">
                    <label className="mcq-explanation-label">
                      Explanation (Optional)
                    </label>
                    <input
                      type="text"
                      value={q.explanation}
                      onChange={(e) => updateQuestion(q.id, 'explanation', e.target.value)}
                      className="mcq-explanation-input"
                      placeholder="Why is the correct answer correct?"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addQuestion}
              className="mcq-add-btn"
            >
              <Plus className="mcq-add-icon" />
              Add Question
            </button>
          </form>
        </div>

        <div className="mcq-footer">
          <button
            onClick={onClose}
            className="mcq-cancel-btn"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="mcq-form"
            disabled={saving}
            className="mcq-save-btn"
          >
            {saving ? 'Saving...' : 'Create Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCQCreator;