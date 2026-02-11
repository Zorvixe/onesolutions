import React, { useState } from "react";
import { X, FileText } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CheatsheetEditor.css";

const CheatsheetEditor = ({ subtopicId, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "color",
    "background",
    "code-block",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
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
      onSuccess();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save cheatsheet");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="cheatsheet-overlay">
      <div className="cheatsheet-modal">
        <div className="cheatsheet-header">
          <div className="cheatsheet-header-left">
            <div className="cheatsheet-icon-wrapper">
              <FileText className="cheatsheet-icon" />
            </div>
            <h3 className="cheatsheet-title">Create Cheatsheet</h3>
          </div>
          <button onClick={onClose} className="cheatsheet-close-btn">
            <X className="cheatsheet-close-icon" />
          </button>
        </div>

        <form
          id="cheatsheet-form"
          onSubmit={handleSubmit}
          className="cheatsheet-form"
        >
          <div className="cheatsheet-form-section">
            <label className="cheatsheet-label">Cheatsheet Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="cheatsheet-input"
              placeholder="e.g., HTML5 Semantic Elements Guide"
              required
            />
          </div>

          <div className="cheatsheet-editor-section">
            <label className="cheatsheet-label">Content *</label>
            <div className="cheatsheet-editor-wrapper">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="cheatsheet-quill"
                placeholder="Start writing your cheatsheet content..."
              />
            </div>
          </div>
        </form>

        <div className="cheatsheet-footer">
          <button
            type="button"
            onClick={onClose}
            className="cheatsheet-cancel-btn"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="cheatsheet-form"
            disabled={saving}
            className="cheatsheet-save-btn"
          >
            {saving ? "Saving..." : "Save Cheatsheet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheatsheetEditor;
