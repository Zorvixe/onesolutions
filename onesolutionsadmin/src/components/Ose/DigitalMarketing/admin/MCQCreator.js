import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, HelpCircle } from 'lucide-react';
import './MCQCreator.css';

const MCQCreator = ({ subtopicId, onClose, onSuccess, editData = null }) => {
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

  const isEditing = !!editData;

  useEffect(() => {
    if (editData) {
      setTitle(editData.mcq_title || '');
      if (editData.questions && Array.isArray(editData.questions)) {
        const formattedQuestions = editData.questions.map((q, idx) => ({
          ...q,
          id: idx + 1,
          options: q.options || ['', '', '', '']
        }));
        setQuestions(formattedQuestions);
      }
    }
  }, [editData]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
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
      let url, method, body;

      const payloadQuestions = questions.map(q => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }));

      if (isEditing) {
        url = `https://api.onesolutionsekam.in/api/admin/course/content/${editData.id}`;
        method = 'PUT';
        body = {
          mcq_title: title,
          questions: payloadQuestions
        };
      } else {
        url = `https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}/mcq`;
        method = 'POST';
        body = {
          title,
          questions: payloadQuestions
        };
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
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
    <div className="mcq-creator-overlay">
      <div className="mcq-creator-modal">
        <div className="mcq-creator-header">
          <div className="mcq-creator-header-left">
            <div className="mcq-creator-icon-wrapper">
              <HelpCircle className="mcq-creator-icon" />
            </div>
            <div>
              <h3 className="mcq-creator-title">
                {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
              </h3>
              <p className="mcq-creator-subtitle">
                {isEditing ? 'Update your multiple choice questions' : 'Add multiple choice questions for assessment'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="mcq-creator-close-btn">
            <X className="mcq-creator-close-icon" />
          </button>
        </div>

        <div className="mcq-creator-content">
          <form id="mcq-creator-form" onSubmit={handleSubmit} className="mcq-creator-form">
            <div className="mcq-creator-title-section">
              <label className="mcq-creator-field-label">
                Quiz Title <span className="mcq-creator-required">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mcq-creator-title-input"
                placeholder="e.g., SEO Fundamentals Quiz"
                required
              />
              <span className="mcq-creator-title-hint">
                Give your quiz a clear, descriptive title
              </span>
            </div>

            <div className="mcq-creator-questions-section">
              <div className="mcq-creator-questions-header">
                <label className="mcq-creator-field-label">
                  Questions <span className="mcq-creator-required">*</span>
                </label>
                <span className="mcq-creator-question-count">
                  {questions.length} {questions.length === 1 ? 'question' : 'questions'}
                </span>
              </div>

              <div className="mcq-creator-questions-container">
                {questions.map((q, qIndex) => (
                  <div key={q.id} className="mcq-creator-question-card">
                    <div className="mcq-creator-question-header">
                      <div className="mcq-creator-question-number-wrapper">
                        <span className="mcq-creator-question-number">
                          Q{qIndex + 1}
                        </span>
                      </div>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(q.id)}
                          className="mcq-creator-remove-btn"
                        >
                          <Trash2 className="mcq-creator-remove-icon" />
                        </button>
                      )}
                    </div>

                    <div className="mcq-creator-question-field">
                      <textarea
                        value={q.question}
                        onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                        className="mcq-creator-textarea"
                        placeholder="Enter your question here..."
                        rows="2"
                        required
                      />
                    </div>

                    <div className="mcq-creator-options-label">
                      <span>Answer Options</span>
                      <span className="mcq-creator-options-hint">
                        Click ✓ to mark correct answer
                      </span>
                    </div>

                    <div className="mcq-creator-options-grid">
                      {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="mcq-creator-option-item">
                          <button
                            type="button"
                            onClick={() => setCorrectAnswer(q.id, optIndex)}
                            className={`mcq-creator-correct-btn ${
                              q.correctAnswer === optIndex ? 'mcq-creator-correct-active' : ''
                            }`}
                            title="Mark as correct answer"
                          >
                            <Check className="mcq-creator-check-icon" />
                          </button>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                            className={`mcq-creator-option-input ${q.correctAnswer === optIndex ? 'mcq-creator-option-correct' : ''}`}
                            placeholder={`Option ${optIndex + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mcq-creator-explanation-wrapper">
                      <label className="mcq-creator-explanation-label">
                        Explanation (Optional)
                      </label>
                      <input
                        type="text"
                        value={q.explanation || ''}
                        onChange={(e) => updateQuestion(q.id, 'explanation', e.target.value)}
                        className="mcq-creator-explanation-input"
                        placeholder="Explain why the correct answer is right..."
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addQuestion}
                className="mcq-creator-add-btn"
              >
                <Plus className="mcq-creator-add-icon" />
                Add Question
              </button>
            </div>
          </form>
        </div>

        <div className="mcq-creator-footer">
          <div className="mcq-creator-footer-info">
            <span className="mcq-creator-footer-hint">
              ⚡ Each question must have one correct answer
            </span>
          </div>
          <div className="mcq-creator-footer-actions">
            <button
              type="button"
              onClick={onClose}
              className="mcq-creator-cancel-btn"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="mcq-creator-form"
              disabled={saving}
              className="mcq-creator-save-btn"
            >
              {saving ? (
                <>
                  <span className="mcq-creator-spinner" />
                  Saving...
                </>
              ) : isEditing ? 'Update Quiz' : 'Create Quiz'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQCreator;