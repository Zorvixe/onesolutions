import React, { useState } from 'react';
import { X, Bold, Italic, List, Link, Image, Type } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CheatsheetEditor = ({ subtopicId, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide title and content');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/course/subtopics/${subtopicId}/cheatsheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save cheatsheet');
      }

      onSuccess();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save cheatsheet');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold">Create Cheatsheet</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="p-6 border-b">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cheatsheet Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter cheatsheet title"
              required
            />
          </div>

          <div className="flex-1 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <div className="h-full border rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="h-full"
                placeholder="Write your cheatsheet content here..."
              />
            </div>
          </div>

          <div className="p-6 border-t flex justify-end space-x-4">
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
              disabled={saving || !title || !content}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Cheatsheet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheatsheetEditor;