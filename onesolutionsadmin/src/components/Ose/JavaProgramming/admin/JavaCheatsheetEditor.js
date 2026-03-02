import React, { useState, useEffect } from "react";
import { Save, ArrowLeft, Users } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const studentTypeOptions = [
  { value: "zorvixe_core", label: "Zorvixe Core" },
  { value: "zorvixe_pro", label: "Zorvixe Pro" },
  { value: "zorvixe_elite", label: "Zorvixe Elite" },
];

const JavaCheatsheetEditor = ({ subtopicId, onCancel, onSuccess, initialData = null }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allowedStudentTypes, setAllowedStudentTypes] = useState([
    "zorvixe_core",
    "zorvixe_pro",
    "zorvixe_elite",
  ]);
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const isEditing = !!initialData;

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

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.cheatsheet_title || "");
      setContent(initialData.cheatsheet_content || "");
      setAllowedStudentTypes(initialData.allowed_student_types || [
        "zorvixe_core",
        "zorvixe_pro",
        "zorvixe_elite",
      ]);
    }
  }, [initialData]);

  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, ' ');
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleTypeToggle = (type) => {
    setAllowedStudentTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please provide both a title and content.");
      return;
    }
    if (allowedStudentTypes.length === 0) {
      alert("Please select at least one student type.");
      return;
    }

    setSaving(true);
    try {
      let url, method, body;

      if (isEditing) {
        url = `https://api.onesolutionsekam.in/admin/java/content/${initialData.id}`;
        method = "PUT";
        body = {
          content_type: "cheatsheet",
          cheatsheet_title: title,
          cheatsheet_content: content,
          allowed_student_types: allowedStudentTypes,
        };
      } else {
        url = `https://api.onesolutionsekam.in/admin/java/subtopics/${subtopicId}/cheatsheet`;
        method = "POST";
        body = {
          title: title,
          content: content,
          allowed_student_types: allowedStudentTypes,
        };
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          // No Authorization header needed for admin endpoints
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
            disabled={saving || !title.trim() || allowedStudentTypes.length === 0}
          >
            <Save size={16} />
            {saving ? "Saving..." : isEditing ? "Update Document" : "Save Document"}
          </button>
        </div>
      </div>

      <div className="notepad-paper">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="notepad-title-input"
          placeholder="Untitled Cheatsheet"
          autoFocus
        />

        <div className="student-type-selector" style={{ margin: "1rem 0", padding: "0 1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem" }}>
            Access for Student Types *
          </label>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {studentTypeOptions.map((option) => (
              <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  checked={allowedStudentTypes.includes(option.value)}
                  onChange={() => handleTypeToggle(option.value)}
                />
                <Users size={14} />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

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

export default JavaCheatsheetEditor;