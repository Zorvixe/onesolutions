import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CheatsheetEditor = ({ subtopicId, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'link', 'image', 'color', 'background', 'code-block'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/course/subtopics/${subtopicId}/cheatsheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content
        }),
      });

      if (!response.ok) throw new Error('Failed to save cheatsheet');
      onSuccess();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save cheatsheet');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-green-100 rounded-lg"><FileText className="w-6 h-6 text-green-600"/></div>
             <h3 className="text-xl font-bold text-gray-800">Create Cheatsheet</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form id="cheatsheet-form" onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 border-b bg-white">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cheatsheet Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="e.g., HTML5 Semantic Elements Guide"
              required
            />
          </div>

          <div className="flex-1 p-6 overflow-hidden flex flex-col bg-gray-50">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="flex-1 flex flex-col overflow-hidden"
                placeholder="Start writing your cheatsheet content..."
              />
            </div>
          </div>
        </form>

        <div className="p-6 border-t bg-white flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="cheatsheet-form"
            disabled={saving}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-lg disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Cheatsheet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheatsheetEditor;