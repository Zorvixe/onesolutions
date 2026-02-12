import React, { useState, useEffect } from "react";
import { Save, ArrowLeft } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CheatsheetEditor.css";

const CheatsheetEditor = ({ subtopicId, onCancel, onSuccess, initialData = null }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Determine if we are editing existing content or creating new
  const isEditing = !!initialData;

  // Simple, clean toolbar configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.cheatsheet_title || "");
      setContent(initialData.cheatsheet_content || "");
    }
  }, [initialData]);

  // Update word count
  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, ' ');
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please provide both a title and content.");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      let url, method, body;

      if (isEditing) {
        // --- UPDATE MODE ---
        url = `https://api.onesolutionsekam.in/api/admin/course/content/${initialData.id}`;
        method = "PUT";
        body = {
          cheatsheet_title: title,
          cheatsheet_content: content,
        };
      } else {
        // --- CREATE MODE ---
        url = `https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}/cheatsheet`;
        method = "POST";
        body = {
          title: title,
          content: content,
        };
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save cheatsheet");
      
      onSuccess();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save cheatsheet");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="notepad-container">
      {/* Top Action Bar */}
      <div className="notepad-header">
        <div className="notepad-left">
          <button onClick={onCancel} className="notepad-back-btn" disabled={saving}>
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="notepad-status">
            {saving ? "Saving..." : isEditing ? "Editing Mode" : `${wordCount} words`}
          </span>
        </div>
        <div className="notepad-actions">
          <button onClick={onCancel} className="notepad-cancel-btn" disabled={saving}>
            Discard
          </button>
          <button 
            onClick={handleSubmit} 
            className="notepad-save-btn"
            disabled={saving || !title.trim()}
          >
            <Save size={16} />
            {saving ? "Saving..." : isEditing ? "Update Document" : "Save Document"}
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="notepad-paper">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="notepad-title-input"
          placeholder="Untitled Cheatsheet"
          autoFocus
        />

        <div className="notepad-editor-wrapper">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Type '/' for commands or start writing your content here..."
            className="notepad-quill"
          />
        </div>
      </div>
    </div>
  );
};

export default CheatsheetEditor;