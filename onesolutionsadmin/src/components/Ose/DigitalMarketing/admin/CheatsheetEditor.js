import React, { useState, useEffect } from "react";
import { Save, X, FileText } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CheatsheetEditor.css";

const CheatsheetEditor = ({ subtopicId, onCancel, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Notion-like simple toolbar configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please provide both a title and content.");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}/cheatsheet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to save cheatsheet");
      
      setLastSaved(new Date());
      // Optional: Wait a moment to show "Saved" state before closing
      setTimeout(() => {
        onSuccess();
      }, 500);
      
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save cheatsheet");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="notion-editor-container">
      {/* Top Action Bar */}
      <div className="notion-top-bar">
        <div className="notion-status">
            {saving ? "Saving..." : lastSaved ? "Saved" : "Unsaved changes"}
        </div>
        <div className="notion-actions">
          <button 
            onClick={onCancel} 
            className="notion-btn-cancel"
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="notion-btn-save"
            disabled={saving || !title.trim()}
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Document"}
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="notion-paper">
        {/* Huge Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="notion-title-input"
          placeholder="Untitled Cheatsheet"
          autoFocus
        />

        {/* Rich Text Editor */}
        <div className="notion-body">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Type '/' for commands or start writing..."
            className="notion-quill-instance"
          />
        </div>
      </div>
    </div>
  );
};

export default CheatsheetEditor;