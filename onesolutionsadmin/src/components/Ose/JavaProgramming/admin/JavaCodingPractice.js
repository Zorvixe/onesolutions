import React, { useState, useEffect } from "react";
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
import "./CodingPractice.css";

const studentTypeOptions = [
  { value: "zorvixe_core", label: "Zorvixe Core" },
  { value: "zorvixe_pro", label: "Zorvixe Pro" },
  { value: "zorvixe_elite", label: "Zorvixe Elite" },
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
        setProblems(data.data.filter((c) => c.content_type === "coding"));
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
        test_cases: [{ input: "", expected_output: "", is_sample: true }],
        coding_time_limit: 2,
        coding_memory_limit: 256,
      },
    ]);
  };

  const updateProblem = (index, field, value) => {
    const updated = [...problems];
    updated[index][field] = value;
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

  const handleTypeToggle = (type) => {
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
      alert("Please select at least one student type");
      return;
    }
    if (problems.length === 0) {
      alert("Please add at least one coding problem");
      return;
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
                allowed_student_types: practice.allowed_student_types,
              }),
            }
          );
        } else {
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
                allowed_student_types: practice.allowed_student_types,
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
        <h2>{isEditing ? "Edit Coding Practice" : "Create Coding Practice"}</h2>
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
        <div className="coddd-coding-practice-field">
          <label>Practice Title *</label>
          <input
            type="text"
            value={practice.title}
            onChange={(e) =>
              setPractice({ ...practice, title: e.target.value })
            }
            placeholder="e.g., Java Loops Practice"
          />
        </div>

        <div className="coddd-coding-practice-field">
          <label>Description</label>
          <textarea
            value={practice.description}
            onChange={(e) =>
              setPractice({ ...practice, description: e.target.value })
            }
            placeholder="Brief description of this practice"
            rows="3"
          />
        </div>

        <div className="coddd-coding-practice-field">
          <label>Access for Student Types *</label>
          <div className="coddd-student-type-checkboxes">
            {studentTypeOptions.map((option) => (
              <label key={option.value} className="coddd-student-type-checkbox">
                <input
                  type="checkbox"
                  checked={practice.allowed_student_types.includes(
                    option.value
                  )}
                  onChange={() => handleTypeToggle(option.value)}
                />
                <Users size={14} />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="coddd-coding-problems-section">
          <div className="coddd-coding-problems-header">
            <h3>Coding Problems</h3>
            <button
              onClick={addProblem}
              className="coddd-coding-add-problem-btn"
            >
              <Plus size={16} />
              Add Problem
            </button>
          </div>

          {problems.map((problem, pIndex) => (
            <div key={problem.id} className="coddd-coding-problem-card">
              <div className="coddd-coding-problem-header">
                <h4>Problem {pIndex + 1}</h4>
                {problems.length > 1 && (
                  <button
                    onClick={() => removeProblem(pIndex)}
                    className="coddd-coding-remove-problem-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="coddd-coding-problem-field">
                <label>Title *</label>
                <input
                  type="text"
                  value={problem.coding_title}
                  onChange={(e) =>
                    updateProblem(pIndex, "coding_title", e.target.value)
                  }
                  placeholder="e.g., Sum of Two Numbers"
                />
              </div>

              <div className="coddd-coding-problem-field">
                <label>Description *</label>
                <textarea
                  value={problem.coding_description}
                  onChange={(e) =>
                    updateProblem(pIndex, "coding_description", e.target.value)
                  }
                  placeholder="Describe the problem..."
                  rows="3"
                />
              </div>

              <div className="coddd-coding-problem-field">
                <label>Starter Code (Optional)</label>
                <textarea
                  value={problem.starter_code}
                  onChange={(e) =>
                    updateProblem(pIndex, "starter_code", e.target.value)
                  }
                  placeholder="public class Main { ... }"
                  rows="5"
                  className="coddd-coding-code-textarea"
                />
              </div>

              <div className="coddd-coding-limits-row">
                <div className="coddd-coding-limit-field">
                  <label>
                    <Clock size={14} /> Time Limit (seconds)
                  </label>
                  <input
                    type="number"
                    value={problem.coding_time_limit}
                    onChange={(e) =>
                      updateProblem(
                        pIndex,
                        "coding_time_limit",
                        parseInt(e.target.value)
                      )
                    }
                    min="1"
                  />
                </div>
                <div className="coddd-coding-limit-field">
                  <label>
                    <HardDrive size={14} /> Memory Limit (MB)
                  </label>
                  <input
                    type="number"
                    value={problem.coding_memory_limit}
                    onChange={(e) =>
                      updateProblem(
                        pIndex,
                        "coding_memory_limit",
                        parseInt(e.target.value)
                      )
                    }
                    min="16"
                  />
                </div>
              </div>

              <div className="coddd-coding-testcases-section">
                <div className="coddd-coding-testcases-header">
                  <h5>Test Cases</h5>
                  <button
                    onClick={() => addTestCase(pIndex, true)}
                    className="coddd-coding-add-testcase-btn"
                  >
                    <Plus size={14} />
                    Add Sample
                  </button>
                  <button
                    onClick={() => addTestCase(pIndex, false)}
                    className="coddd-coding-add-testcase-btn"
                  >
                    <Plus size={14} />
                    Add Hidden
                  </button>
                </div>

                {problem.test_cases?.map((tc, tIndex) => (
                  <div key={tIndex} className="coddd-coding-testcase-row">
                    <span className="coddd-coding-testcase-badge">
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
        </div>
      </div>
    </div>
  );
};

export default JavaCodingPractice;
