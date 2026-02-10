import React, { useState } from 'react';
import { X, Plus, Trash2, Check, HelpCircle } from 'lucide-react';

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
      const response = await fetch(`/api/admin/course/subtopics/${subtopicId}/mcq`, {
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
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-purple-100 rounded-lg"><HelpCircle className="w-6 h-6 text-purple-600"/></div>
             <h3 className="text-xl font-bold text-gray-800">Create MCQ Quiz</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-8">
          <form id="mcq-form" onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                placeholder="e.g., SEO Fundamentals Quiz"
                required
              />
            </div>

            <div className="space-y-8">
              {questions.map((q, qIndex) => (
                <div key={q.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50 relative group">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-gray-700">Question {qIndex + 1}</h4>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(q.id)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition opacity-50 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="mb-6">
                    <textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                      placeholder="Enter question text..."
                      rows="2"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {q.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={() => setCorrectAnswer(q.id, optIndex)}
                            className={`p-2 rounded-full border transition-all ${
                                q.correctAnswer === optIndex 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : 'bg-white border-gray-300 text-gray-300 hover:border-green-500'
                            }`}
                            title="Mark as correct answer"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                          className={`flex-1 border rounded-lg px-4 py-2 outline-none transition ${q.correctAnswer === optIndex ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'border-gray-300 focus:border-purple-500'}`}
                          placeholder={`Option ${optIndex + 1}`}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Explanation (Optional)</label>
                    <input
                      type="text"
                      value={q.explanation}
                      onChange={(e) => updateQuestion(q.id, 'explanation', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-purple-500 outline-none bg-white"
                      placeholder="Why is the correct answer correct?"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addQuestion}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-gray-500 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Question
            </button>
          </form>
        </div>

        <div className="p-6 border-t bg-white flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="mcq-form"
            disabled={saving}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition shadow-lg disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Create Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCQCreator;