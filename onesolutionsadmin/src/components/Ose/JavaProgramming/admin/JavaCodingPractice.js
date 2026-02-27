import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Code,
  Users,
  Clock,
  HardDrive,
} from "lucide-react";
import Editor from "react-simple-code-editor";
import ReactQuill from "react-quill";
// Changed to bubble theme for Notion-style selection toolbar
import "react-quill/dist/quill.bubble.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import "prismjs/themes/prism-tomorrow.css";
import "./CodingPractice.css";

const studentTypeOptions = [
  { value: "zorvixe_core", label: "Zorvixe Core" },
  { value: "zorvixe_pro", label: "Zorvixe Pro" },
  { value: "zorvixe_elite", label: "Zorvixe Elite" },
];

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const JavaCodingPractice = ({
  subtopicId,
  practiceId,
  onCancel,
  onSuccess,
  editData = null,
}) => {
  const [practice, setPractice] = useState({
    title: "",
    description: "",
    allowed_student_types: ["zorvixe_core", "zorvixe_pro", "zorvixe_elite"],
  });
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const isEditing = !!practiceId || !!editData;

  // Wrapped in useMemo to prevent ReactQuill from remounting on every keystroke
  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ color: [] }, { background: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: function () {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files[0];
              const formData = new FormData();
              formData.append("image", file);

              try {
                const token = localStorage.getItem("token");
                const res = await fetch(
                  "https://api.onesolutionsekam.in/admin/java/upload-image",
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                  }
                );
                const data = await res.json();
                if (data.success) {
                  // 'this.quill' gets the specific editor instance you are typing in
                  const quill = this.quill;
                  const range = quill.getSelection();
                  const position = range ? range.index : 0;
                  quill.insertEmbed(position, "image", data.url);
                } else {
                  alert("Image upload failed");
                }
              } catch (error) {
                console.error("Upload error:", error);
                alert("Image upload failed");
              }
            };
          },
        },
      },
      clipboard: { matchVisual: false },
    }),
    []
  );

  useEffect(() => {
    if (practiceId) {
      fetchPractice();
    } else if (editData) {
      setPractice({
        title: editData.title || "",
        description: editData.description || "",
        allowed_student_types: editData.allowed_student_types || [
          "zorvixe_core",
          "zorvixe_pro",
          "zorvixe_elite",
        ],
      });
      fetchProblems(editData.id);
    }
  }, [practiceId, editData]);

  const fetchPractice = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://api.onesolutionsekam.in/admin/java/coding-practices/${practiceId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setPractice(data.data);
      }
    } catch (error) {
      console.error("Error fetching practice:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProblems = async (pid) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://api.onesolutionsekam.in/admin/java/subtopics/${subtopicId}/content?practice_id=${pid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        const codingProblems = data.data.filter(
          (c) => c.content_type === "coding"
        );
        const problemsWithAccess = codingProblems.map((p) => ({
          ...p,
          allowed_student_types: p.allowed_student_types || [
            "zorvixe_core",
            "zorvixe_pro",
            "zorvixe_elite",
          ],
          difficulty: p.difficulty || "easy",
          score: p.score || 0,
        }));
        setProblems(problemsWithAccess);
      }
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  const addProblem = () => {
    setProblems([
      ...problems,
      {
        id: `temp-${Date.now()}`,
        coding_title: "",
        coding_description: "",
        starter_code: "",
        difficulty: "easy",
        score: 0,
        test_cases: [{ input: "", expected_output: "", is_sample: true }],
        coding_time_limit: 2,
        coding_memory_limit: 256,
        allowed_student_types: [...practice.allowed_student_types],
      },
    ]);
  };

  const updateProblem = (index, field, value) => {
    const updated = [...problems];
    updated[index][field] = value;
    setProblems(updated);
  };

  const updateProblemAccess = (index, type) => {
    const updated = [...problems];
    const current = updated[index].allowed_student_types || [];
    if (current.includes(type)) {
      updated[index].allowed_student_types = current.filter((t) => t !== type);
    } else {
      updated[index].allowed_student_types = [...current, type];
    }
    setProblems(updated);
  };

  const addTestCase = (problemIndex, isSample = true) => {
    const updated = [...problems];
    if (!updated[problemIndex].test_cases) {
      updated[problemIndex].test_cases = [];
    }
    updated[problemIndex].test_cases.push({
      input: "",
      expected_output: "",
      is_sample: isSample,
    });
    setProblems(updated);
  };

  const updateTestCase = (problemIndex, testIndex, field, value) => {
    const updated = [...problems];
    updated[problemIndex].test_cases[testIndex][field] = value;
    setProblems(updated);
  };

  const removeTestCase = (problemIndex, testIndex) => {
    const updated = [...problems];
    updated[problemIndex].test_cases.splice(testIndex, 1);
    setProblems(updated);
  };

  const removeProblem = (index) => {
    if (problems.length > 1) {
      const updated = [...problems];
      updated.splice(index, 1);
      setProblems(updated);
    }
  };

  const handlePracticeTypeToggle = (type) => {
    setPractice((prev) => ({
      ...prev,
      allowed_student_types: prev.allowed_student_types.includes(type)
        ? prev.allowed_student_types.filter((t) => t !== type)
        : [...prev.allowed_student_types, type],
    }));
  };

  const handleSubmit = async () => {
    if (!practice.title.trim()) {
      alert("Practice title is required");
      return;
    }
    if (practice.allowed_student_types.length === 0) {
      alert("Please select at least one student type for the practice");
      return;
    }
    if (problems.length === 0) {
      alert("Please add at least one coding problem");
      return;
    }

    for (let i = 0; i < problems.length; i++) {
      const p = problems[i];
      if (!p.coding_title.trim()) {
        alert(`Problem ${i + 1} title is required`);
        return;
      }
      if (!p.coding_description || p.coding_description === "<p><br></p>") {
        alert(`Problem ${i + 1} description is required`);
        return;
      }
      if (!p.allowed_student_types || p.allowed_student_types.length === 0) {
        alert(`Please select at least one student type for Problem ${i + 1}`);
        return;
      }
      if (!p.test_cases || p.test_cases.length === 0) {
        alert(`Problem ${i + 1} must have at least one test case`);
        return;
      }
      for (let j = 0; j < p.test_cases.length; j++) {
        const tc = p.test_cases[j];
        if (!tc.input.trim() || !tc.expected_output.trim()) {
          alert(
            `Test case ${j + 1} in Problem ${
              i + 1
            } must have both input and expected output`
          );
          return;
        }
      }
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");

      let practiceResult;
      if (isEditing) {
        const res = await fetch(
          `https://api.onesolutionsekam.in/admin/java/coding-practices/${
            practiceId || editData.id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(practice),
          }
        );
        practiceResult = await res.json();
      } else {
        const res = await fetch(
          `https://api.onesolutionsekam.in/admin/java/subtopics/${subtopicId}/coding-practices`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(practice),
          }
        );
        practiceResult = await res.json();
      }

      if (!practiceResult.success) {
        throw new Error(practiceResult.error || "Failed to save practice");
      }

      const finalPracticeId = practiceResult.data.id;

      for (const problem of problems) {
        if (problem.id && !problem.id.toString().startsWith("temp-")) {
          // Update existing problem
          await fetch(
            `https://api.onesolutionsekam.in/admin/java/content/${problem.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                content_type: "coding",
                coding_title: problem.coding_title,
                coding_description: problem.coding_description,
                starter_code: problem.starter_code,
                test_cases: problem.test_cases,
                coding_time_limit: problem.coding_time_limit,
                coding_memory_limit: problem.coding_memory_limit,
                allowed_student_types: problem.allowed_student_types,
                difficulty: problem.difficulty,
                score: problem.score,
              }),
            }
          );
        } else {
          // Create new problem under this practice
          await fetch(
            `https://api.onesolutionsekam.in/admin/java/subtopics/${subtopicId}/coding`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                title: problem.coding_title,
                description: problem.coding_description,
                starterCode: problem.starter_code,
                testCases: problem.test_cases,
                time_limit: problem.coding_time_limit,
                memory_limit: problem.coding_memory_limit,
                allowed_student_types: problem.allowed_student_types,
                difficulty: problem.difficulty,
                score: problem.score,
                practice_id: finalPracticeId,
              }),
            }
          );
        }
      }

      onSuccess();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save coding practice");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="coddd-coding-practice-container">
      <div className="coddd-coding-practice-header">
        <button onClick={onCancel} className="coddd-coding-practice-back-btn">
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="coddd-coding-practice-save-btn"
          disabled={saving}
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Practice"}
        </button>
      </div>

      <div className="coddd-coding-practice-form">
        {/* Practice Title */}
        <div className="coddd-coding-practice-field coddd-title-field">
          <input
            type="text"
            value={practice.title}
            onChange={(e) =>
              setPractice({ ...practice, title: e.target.value })
            }
            placeholder="Untitled Practice..."
            className="coddd-notion-title-input"
          />
        </div>

        {/* Practice Description (Rich Text - Notion Style Bubble) */}
        <div className="coddd-coding-practice-field">
          <ReactQuill
            theme="bubble"
            value={practice.description || ""}
            onChange={(value) =>
              setPractice({ ...practice, description: value })
            }
            modules={quillModules}
            placeholder="Add a description... (Highlight text for options)"
            className="coddd-quill-editor coddd-notion-body-input"
          />
        </div>

        {/* Practice Access */}
        <div className="coddd-coding-practice-field coddd-access-block">
          <label className="coddd-notion-label">Practice Access</label>
          <div className="coddd-student-type-checkboxes">
            {studentTypeOptions.map((option) => (
              <label
                style={{ display: "flex", alignItems: "center" }}
                key={option.value}
                className="coddd-student-type-checkbox"
              >
                <input
                  type="checkbox"
                  checked={practice.allowed_student_types.includes(
                    option.value
                  )}
                  onChange={() => handlePracticeTypeToggle(option.value)}
                />
                <Users size={14} />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="coddd-divider"></div>

        {/* Coding Problems Section */}
        <div className="coddd-coding-problems-section">
          <div className="coddd-coding-problems-header">
            <h3 className="coddd-notion-heading">Problems</h3>
          </div>

          {problems.map((problem, pIndex) => (
            <div key={problem.id} className="coddd-coding-problem-card">
              <div className="coddd-coding-problem-header">
                <div className="coddd-problem-badge">Problem {pIndex + 1}</div>
                {problems.length > 1 && (
                  <button
                    onClick={() => removeProblem(pIndex)}
                    className="coddd-coding-remove-problem-btn"
                    title="Delete Problem"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* Problem Title */}
              <div className="coddd-coding-problem-field">
                <input
                  type="text"
                  value={problem.coding_title}
                  onChange={(e) =>
                    updateProblem(pIndex, "coding_title", e.target.value)
                  }
                  placeholder="Problem Title"
                  className="coddd-notion-subtitle-input"
                />
              </div>

              {/* Problem Description (Rich Text - Notion Style Bubble) */}
              <div className="coddd-coding-problem-field">
                <ReactQuill
                  theme="bubble"
                  value={problem.coding_description || ""}
                  onChange={(value) =>
                    updateProblem(pIndex, "coding_description", value)
                  }
                  modules={quillModules}
                  placeholder="Type problem description here... (Highlight text to format)"
                  className="coddd-quill-editor coddd-notion-body-input"
                />
              </div>

              {/* Difficulty and Score */}
              <div className="coddd-coding-difficulty-row">
                <div className="coddd-coding-difficulty-field">
                  <label className="coddd-notion-label">Difficulty</label>
                  <select
                    className="coddd-notion-select"
                    value={problem.difficulty || "easy"}
                    onChange={(e) =>
                      updateProblem(pIndex, "difficulty", e.target.value)
                    }
                  >
                    {difficultyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="coddd-coding-score-field">
                  <label className="coddd-notion-label">Score (points)</label>
                  <input
                    type="number"
                    value={problem.score || 0}
                    onChange={(e) =>
                      updateProblem(
                        pIndex,
                        "score",
                        parseInt(e.target.value) || 0
                      )
                    }
                    min="0"
                    className="coddd-notion-number-input"
                  />
                </div>
              </div>

              {/* Starter Code Editor */}
              <div className="coddd-coding-problem-field-code">
                <label className="coddd-notion-label">
                  <Code size={14} style={{ marginRight: "4px" }} />
                  Starter Code
                </label>
                <div className="coddd-notion-code-block">
                  <Editor
                    value={problem.starter_code || ""}
                    onValueChange={(code) =>
                      updateProblem(pIndex, "starter_code", code)
                    }
                    highlight={(code) => highlight(code, languages.java)}
                    padding={15}
                    textareaClassName="coddd-editor-textarea"
                    className="coddd-editor"
                  />
                </div>
              </div>

              {/* Problem Access */}
              <div className="coddd-coding-problem-field coddd-access-block">
                <label className="coddd-notion-label">Student Access</label>
                <div className="coddd-student-type-checkboxes">
                  {studentTypeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="coddd-student-type-checkbox"
                    >
                      <input
                        type="checkbox"
                        checked={(
                          problem.allowed_student_types ||
                          practice.allowed_student_types
                        ).includes(option.value)}
                        onChange={() =>
                          updateProblemAccess(pIndex, option.value)
                        }
                      />
                      <Users size={14} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time and Memory Limits */}
              <div className="coddd-coding-limits-row">
                <div className="coddd-coding-limit-field">
                  <label className="coddd-notion-label">
                    <Clock size={14} /> Time Limit (s)
                  </label>
                  <input
                    type="number"
                    value={problem.coding_time_limit}
                    onChange={(e) =>
                      updateProblem(
                        pIndex,
                        "coding_time_limit",
                        parseInt(e.target.value) || 2
                      )
                    }
                    min="1"
                    className="coddd-notion-number-input"
                  />
                </div>
                <div className="coddd-coding-limit-field">
                  <label className="coddd-notion-label">
                    <HardDrive size={14} /> Memory Limit (MB)
                  </label>
                  <input
                    type="number"
                    value={problem.coding_memory_limit}
                    onChange={(e) =>
                      updateProblem(
                        pIndex,
                        "coding_memory_limit",
                        parseInt(e.target.value) || 256
                      )
                    }
                    min="16"
                    className="coddd-notion-number-input"
                  />
                </div>
              </div>

              {/* Test Cases */}
              <div className="coddd-coding-testcases-section">
                <div className="coddd-coding-testcases-header">
                  <label className="coddd-notion-label">Test Cases</label>
                  <div className="coddd-testcase-actions">
                    <button
                      onClick={() => addTestCase(pIndex, true)}
                      className="coddd-notion-text-btn"
                    >
                      <Plus size={14} /> Sample
                    </button>
                    <button
                      onClick={() => addTestCase(pIndex, false)}
                      className="coddd-notion-text-btn"
                    >
                      <Plus size={14} /> Hidden
                    </button>
                  </div>
                </div>

                {problem.test_cases?.map((tc, tIndex) => (
                  <div key={tIndex} className="coddd-coding-testcase-row">
                    <span
                      className={`coddd-coding-testcase-badge ${
                        tc.is_sample ? "sample" : "hidden"
                      }`}
                    >
                      {tc.is_sample ? "Sample" : "Hidden"}
                    </span>
                    <input
                      type="text"
                      value={tc.input}
                      onChange={(e) =>
                        updateTestCase(pIndex, tIndex, "input", e.target.value)
                      }
                      placeholder="Input"
                      className="coddd-coding-testcase-input"
                    />
                    <div className="coddd-testcase-arrow">→</div>
                    <input
                      type="text"
                      value={tc.expected_output}
                      onChange={(e) =>
                        updateTestCase(
                          pIndex,
                          tIndex,
                          "expected_output",
                          e.target.value
                        )
                      }
                      placeholder="Expected Output"
                      className="coddd-coding-testcase-output"
                    />
                    <button
                      onClick={() => removeTestCase(pIndex, tIndex)}
                      className="coddd-coding-remove-testcase-btn"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button onClick={addProblem} className="coddd-coding-add-problem-btn">
            <Plus size={16} />
            <span>Add another problem</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JavaCodingPractice;
