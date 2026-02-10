import React, { useState } from 'react';
import { X, Plus, Trash2, Check, XCircle } from 'lucide-react';

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
    
    // Validate
    if (!title.trim()) {
      alert('Please provide quiz title');
      return;
    }

    for (const q of questions) {
      if (!q.question.trim()) {
        alert(`Please fill question ${q.id}`);
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        alert(`Please fill all options for question ${q.id}`);
        return;
      }
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/course/subtopics/${subtopicId}/mcq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

      if (!response.ok) {
        throw new Error('Failed to save MCQ');
      }

      onSuccess();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save MCQ quiz');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h3 className="text-xl font-bold">Create MCQ Quiz</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Quiz Title */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quiz Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter quiz title"
              required
            />
          </div>

          {/* Questions List */}
          <div className="space-y-8">
            {questions.map((q, qIndex) => (
              <div key={q.id} className="border rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold">Question {q.id}</h4>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(q.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Question Text */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Text *
                  </label>
                  <textarea
                    value={q.question}
                    onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter your question here..."
                    rows="2"
                    required
                  />
                </div>

                {/* Options */}
                <div className="space-y-4 mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Options * (Select correct answer)
                  </label>
                  {q.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder={`Option ${optIndex + 1}`}
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setCorrectAnswer(q.id, optIndex)}
                        className={`p-3 rounded-lg border ${
                          q.correctAnswer === optIndex 
                            ? 'bg-green-100 border-green-500 text-green-600' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {q.correctAnswer === optIndex ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Explanation (Optional)
                  </label>
                  <textarea
                    value={q.explanation}
                    onChange={(e) => updateQuestion(q.id, 'explanation', e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Explain why this answer is correct..."
                    rows="2"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Question Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={addQuestion}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-8 h-8 text-gray-400 mb-2" />
              <span className="font-medium text-gray-600">Add Another Question</span>
              <span className="text-sm text-gray-500 mt-1">
                Click to add more questions to this quiz
              </span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-8 mt-8 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-50"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !title || questions.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save MCQ Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MCQCreator;