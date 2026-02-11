import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Video,
  FileText,
  HelpCircle,
  Edit,
  Trash2,
  FolderOpen,
  File,
  Layout,
  BookOpen,
  Target,
  Layers,
  Grid,
  List,
  MoreVertical,
  Play,
  FileCheck,
  Award,
  Clock,
  Save,
  X,
  Check,
} from "lucide-react";
import VideoUploadModal from "../admin/VideoUploadModal";
import CheatsheetEditor from "../admin/CheatsheetEditor";
import MCQCreator from "../admin/MCQCreator";
import "./CourseManagement.css";

const CourseManagement = () => {
  const [goals, setGoals] = useState([]);
  const [modules, setModules] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [content, setContent] = useState([]);

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showCheatsheetModal, setShowCheatsheetModal] = useState(false);
  const [showMCQModal, setShowMCQModal] = useState(false);

  const [newGoalName, setNewGoalName] = useState("");
  const [newModuleName, setNewModuleName] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [newSubtopicName, setNewSubtopicName] = useState("");

  const [editingGoal, setEditingGoal] = useState(null);
  const [editingModule, setEditingModule] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingSubtopic, setEditingSubtopic] = useState(null);
  const [editingContent, setEditingContent] = useState(null);

  const [editGoalName, setEditGoalName] = useState("");
  const [editModuleName, setEditModuleName] = useState("");
  const [editTopicName, setEditTopicName] = useState("");
  const [editSubtopicName, setEditSubtopicName] = useState("");
  const [editContentTitle, setEditContentTitle] = useState("");

  const [viewMode, setViewMode] = useState("grid");
  const [expandedGoals, setExpandedGoals] = useState({});
  const [expandedModules, setExpandedModules] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});

  // Authentication Token
  const getToken = () => localStorage.getItem("token");

  // Fetch goals on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch(
        "https://api.onesolutionsekam.in/api/admin/course/goals",
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setGoals(data.data || []);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const fetchModules = async (goalId) => {
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/goals/${goalId}/modules`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setModules(data.data || []);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const fetchTopics = async (moduleId) => {
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/modules/${moduleId}/topics`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setTopics(data.data || []);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const fetchSubtopics = async (topicId) => {
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/topics/${topicId}/subtopics`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setSubtopics(data.data || []);
    } catch (error) {
      console.error("Error fetching subtopics:", error);
    }
  };

  const fetchContent = async (subtopicId) => {
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}/content`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setContent(data.data || []);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // Selection Handlers
  const handleGoalSelect = async (goal) => {
    if (editingGoal) return; // Prevent selection while editing
    if (expandedGoals[goal.id]) {
      setExpandedGoals({ ...expandedGoals, [goal.id]: false });
      if (selectedGoal?.id === goal.id) {
        setSelectedGoal(null);
        setSelectedModule(null);
        setSelectedTopic(null);
        setSelectedSubtopic(null);
        setModules([]);
        setTopics([]);
        setSubtopics([]);
      }
    } else {
      setExpandedGoals({ ...expandedGoals, [goal.id]: true });
      setSelectedGoal(goal);
      setSelectedModule(null);
      setSelectedTopic(null);
      setSelectedSubtopic(null);
      await fetchModules(goal.id);
    }
  };

  const handleModuleSelect = async (module) => {
    if (editingModule) return;
    if (expandedModules[module.id]) {
      setExpandedModules({ ...expandedModules, [module.id]: false });
      if (selectedModule?.id === module.id) {
        setSelectedModule(null);
        setSelectedTopic(null);
        setSelectedSubtopic(null);
        setTopics([]);
        setSubtopics([]);
      }
    } else {
      setExpandedModules({ ...expandedModules, [module.id]: true });
      setSelectedModule(module);
      setSelectedTopic(null);
      setSelectedSubtopic(null);
      await fetchTopics(module.id);
    }
  };

  const handleTopicSelect = async (topic) => {
    if (editingTopic) return;
    if (expandedTopics[topic.id]) {
      setExpandedTopics({ ...expandedTopics, [topic.id]: false });
      if (selectedTopic?.id === topic.id) {
        setSelectedTopic(null);
        setSelectedSubtopic(null);
        setSubtopics([]);
      }
    } else {
      setExpandedTopics({ ...expandedTopics, [topic.id]: true });
      setSelectedTopic(topic);
      setSelectedSubtopic(null);
      await fetchSubtopics(topic.id);
    }
  };

  const handleSubtopicSelect = (subtopic) => {
    if (editingSubtopic) return;
    setSelectedSubtopic(subtopic);
    fetchContent(subtopic.id);
  };

  // Creation Handlers
  const createGoal = async () => {
    if (!newGoalName.trim()) return;
    try {
      const res = await fetch(
        "https://api.onesolutionsekam.in/api/admin/course/goals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            name: newGoalName,
            description: "New goal",
            duration_months: 2,
            certificate_name: `${newGoalName} Certificate`,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setGoals([...goals, data.data]);
        setNewGoalName("");
      }
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const createModule = async () => {
    if (!newModuleName.trim() || !selectedGoal) return;
    try {
      const res = await fetch(
        "https://api.onesolutionsekam.in/api/admin/course/modules",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            goal_id: selectedGoal.id,
            name: newModuleName,
            description: "New module",
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setModules([...modules, data.data]);
        setNewModuleName("");
      }
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const createTopic = async () => {
    if (!newTopicName.trim() || !selectedModule) return;
    try {
      const res = await fetch(
        "https://api.onesolutionsekam.in/api/admin/course/topics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            module_id: selectedModule.id,
            name: newTopicName,
            description: "New topic",
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setTopics([...topics, data.data]);
        setNewTopicName("");
      }
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  const createSubtopic = async () => {
    if (!newSubtopicName.trim() || !selectedTopic) return;
    try {
      const res = await fetch(
        "https://api.onesolutionsekam.in/api/admin/course/subtopics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            topic_id: selectedTopic.id,
            name: newSubtopicName,
            description: "New subtopic",
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setSubtopics([...subtopics, data.data]);
        setNewSubtopicName("");
      }
    } catch (error) {
      console.error("Error creating subtopic:", error);
    }
  };

  // Edit Handlers
  const startEditGoal = (goal, e) => {
    e.stopPropagation();
    setEditingGoal(goal.id);
    setEditGoalName(goal.name);
  };

  const saveEditGoal = async (goalId, e) => {
    e.stopPropagation();
    if (!editGoalName.trim()) return;
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/goals/${goalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            name: editGoalName,
          }),
        }
      );
      const data = await res.json();
      if (data.data) {
        const updatedGoal = data.data;
        setGoals(goals.map((g) => (g.id === goalId ? updatedGoal : g)));
        // Also update selectedGoal if it is the one being edited
        if (selectedGoal?.id === goalId) {
          setSelectedGoal(updatedGoal);
        }
        setEditingGoal(null);
        setEditGoalName("");
      } else {
        alert(data.message || data.error || "Failed to update goal");
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      alert("Error updating goal");
    }
  };

  const deleteGoal = async (goalId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/goals/${goalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setGoals(goals.filter((g) => g.id !== goalId));
        if (selectedGoal?.id === goalId) {
          setSelectedGoal(null);
          setSelectedModule(null);
          setSelectedTopic(null);
          setSelectedSubtopic(null);
          setModules([]);
          setTopics([]);
          setSubtopics([]);
        }
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const startEditModule = (module, e) => {
    e.stopPropagation();
    setEditingModule(module.id);
    setEditModuleName(module.name);
  };

  const saveEditModule = async (moduleId, e) => {
    e.stopPropagation();
    if (!editModuleName.trim()) return;
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/modules/${moduleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            name: editModuleName,
          }),
        }
      );
      const data = await res.json();
      if (data.data) {
        const updatedModule = data.data;
        setModules(modules.map((m) => (m.id === moduleId ? updatedModule : m)));
        // Update selectedModule if it's the current one
        if (selectedModule?.id === moduleId) {
          setSelectedModule(updatedModule);
        }
        setEditingModule(null);
        setEditModuleName("");
      } else {
        alert(data.message || "Failed to update module");
      }
    } catch (error) {
      console.error("Error updating module:", error);
      alert("Error updating module");
    }
  };

  const deleteModule = async (moduleId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/modules/${moduleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setModules(modules.filter((m) => m.id !== moduleId));
        if (selectedModule?.id === moduleId) {
          setSelectedModule(null);
          setSelectedTopic(null);
          setSelectedSubtopic(null);
          setTopics([]);
          setSubtopics([]);
        }
      }
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const startEditTopic = (topic, e) => {
    e.stopPropagation();
    setEditingTopic(topic.id);
    setEditTopicName(topic.name);
  };

  const saveEditTopic = async (topicId, e) => {
    e.stopPropagation();
    if (!editTopicName.trim()) return;
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/topics/${topicId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            name: editTopicName,
          }),
        }
      );
      const data = await res.json();
      if (data.data) {
        const updatedTopic = data.data;
        setTopics(topics.map((t) => (t.id === topicId ? updatedTopic : t)));
        // Update selectedTopic if active
        if (selectedTopic?.id === topicId) {
          setSelectedTopic(updatedTopic);
        }
        setEditingTopic(null);
        setEditTopicName("");
      } else {
        alert(data.message || "Failed to update topic");
      }
    } catch (error) {
      console.error("Error updating topic:", error);
      alert("Error updating topic");
    }
  };

  const deleteTopic = async (topicId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/topics/${topicId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setTopics(topics.filter((t) => t.id !== topicId));
        if (selectedTopic?.id === topicId) {
          setSelectedTopic(null);
          setSelectedSubtopic(null);
          setSubtopics([]);
        }
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const startEditSubtopic = (subtopic, e) => {
    e.stopPropagation();
    setEditingSubtopic(subtopic.id);
    setEditSubtopicName(subtopic.name);
  };

  const saveEditSubtopic = async (subtopicId, e) => {
    e.stopPropagation();
    if (!editSubtopicName.trim()) return;
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            name: editSubtopicName,
          }),
        }
      );
      const data = await res.json();
      if (data.data) {
        const updatedSubtopic = data.data;
        setSubtopics(
          subtopics.map((s) => (s.id === subtopicId ? updatedSubtopic : s))
        );

        if (selectedSubtopic?.id === subtopicId) {
          setSelectedSubtopic(updatedSubtopic);
        }
        setEditingSubtopic(null);
        setEditSubtopicName("");
      } else {
        alert(data.message || "Failed to update subtopic");
      }
    } catch (error) {
      console.error("Error updating subtopic:", error);
      alert("Error updating subtopic");
    }
  };

  const deleteSubtopic = async (subtopicId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this subtopic?"))
      return;
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setSubtopics(subtopics.filter((s) => s.id !== subtopicId));
        if (selectedSubtopic?.id === subtopicId) {
          setSelectedSubtopic(null);
        }
      }
    } catch (error) {
      console.error("Error deleting subtopic:", error);
    }
  };

  const startEditContent = (contentItem, e) => {
    e.stopPropagation();
    setEditingContent(contentItem.id);
    setEditContentTitle(
      contentItem.video_title ||
        contentItem.cheatsheet_title ||
        contentItem.mcq_title
    );
  };

  const saveEditContent = async (contentId, e) => {
    e.stopPropagation();
    if (!editContentTitle.trim()) return;
    try {
      let field = "";
      let contentType = content.find((c) => c.id === contentId)?.content_type;

      if (contentType === "video") field = "video_title";
      else if (contentType === "cheatsheet") field = "cheatsheet_title";
      else if (contentType === "mcq") field = "mcq_title";

      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/content/${contentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            [field]: editContentTitle,
          }),
        }
      );
      const data = await res.json();
      if (data.data) {
        // Optimistically update the content list
        setContent(
          content.map((c) => {
            if (c.id === contentId) {
              if (c.content_type === "video")
                return { ...c, video_title: editContentTitle };
              if (c.content_type === "cheatsheet")
                return { ...c, cheatsheet_title: editContentTitle };
              if (c.content_type === "mcq")
                return { ...c, mcq_title: editContentTitle };
            }
            return c;
          })
        );
        setEditingContent(null);
        setEditContentTitle("");
      } else {
        alert(data.message || "Failed to update content");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Error updating content");
    }
  };

  const deleteContent = async (contentId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this content?"))
      return;
    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/content/${contentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setContent(content.filter((c) => c.id !== contentId));
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const cancelEdit = (e) => {
    e.stopPropagation();
    setEditingGoal(null);
    setEditingModule(null);
    setEditingTopic(null);
    setEditingSubtopic(null);
    setEditingContent(null);
  };

  // Get icon for content type
  const getContentIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="course-content-icon video" />;
      case "cheatsheet":
        return <FileText className="course-content-icon cheatsheet" />;
      case "mcq":
        return <HelpCircle className="course-content-icon mcq" />;
      default:
        return <File className="course-content-icon" />;
    }
  };

  return (
    <div className="course-container">
      {/* Header */}
      <div className="course-header">
        <div className="course-header-left">
          <div className="course-header-icon">
            <BookOpen size={28} />
          </div>
          <div>
            <h1 className="course-title">Course Structure</h1>
            <p className="course-subtitle">
              Build and organize your learning path
            </p>
          </div>
        </div>
        <div className="course-header-actions">
          <button
            className={`course-view-toggle ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={18} />
          </button>
          <button
            className={`course-view-toggle ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="course-main">
        {/* Left Sidebar - Hierarchical Navigation */}
        <div className="course-sidebar">
          <div className="course-sidebar-header">
            <h3>Curriculum</h3>
            <div className="course-add-goal">
              <input
                type="text"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                placeholder="Add new goal..."
                onKeyPress={(e) => e.key === "Enter" && createGoal()}
              />
              <button onClick={createGoal}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="course-navigation">
            {goals.map((goal) => (
              <div key={goal.id} className="course-nav-item">
                <div
                  className={`course-nav-header ${
                    selectedGoal?.id === goal.id ? "active" : ""
                  }`}
                  onClick={() => handleGoalSelect(goal)}
                >
                  <div className="course-nav-header-left">
                    <Target size={18} className="course-nav-icon goal" />
                    {editingGoal === goal.id ? (
                      <div
                        className="course-edit-inline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={editGoalName}
                          onChange={(e) => setEditGoalName(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && saveEditGoal(goal.id, e)
                          }
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={(e) => saveEditGoal(goal.id, e)}
                          className="course-save-btn"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="course-cancel-btn"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <span className="course-nav-title">{goal.name}</span>
                    )}
                  </div>
                  <div className="course-nav-actions">
                    {!editingGoal && (
                      <>
                        <button
                          className="course-nav-edit-btn"
                          onClick={(e) => startEditGoal(goal, e)}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="course-nav-delete-btn"
                          onClick={(e) => deleteGoal(goal.id, e)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                    <ChevronRight
                      size={16}
                      className={`course-nav-arrow ${
                        expandedGoals[goal.id] ? "expanded" : ""
                      }`}
                    />
                  </div>
                </div>

                {expandedGoals[goal.id] && (
                  <div className="course-nav-children">
                    {selectedGoal?.id === goal.id && (
                      <div className="course-add-child">
                        <input
                          type="text"
                          value={newModuleName}
                          onChange={(e) => setNewModuleName(e.target.value)}
                          placeholder="Add module..."
                          onKeyPress={(e) =>
                            e.key === "Enter" && createModule()
                          }
                        />
                        <button onClick={createModule}>
                          <Plus size={14} />
                        </button>
                      </div>
                    )}

                    {modules.map((module) => (
                      <div key={module.id} className="course-nav-child">
                        <div
                          className={`course-nav-child-header ${
                            selectedModule?.id === module.id ? "active" : ""
                          }`}
                          onClick={() => handleModuleSelect(module)}
                        >
                          <Layers
                            size={16}
                            className="course-nav-icon module"
                          />
                          {editingModule === module.id ? (
                            <div
                              className="course-edit-inline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="text"
                                value={editModuleName}
                                onChange={(e) =>
                                  setEditModuleName(e.target.value)
                                }
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  saveEditModule(module.id, e)
                                }
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                              <button
                                onClick={(e) => saveEditModule(module.id, e)}
                                className="course-save-btn"
                              >
                                <Check size={12} />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="course-cancel-btn"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ) : (
                            <span className="course-nav-child-title">
                              {module.name}
                            </span>
                          )}
                          <div className="course-nav-actions">
                            {!editingModule && (
                              <>
                                <button
                                  className="course-nav-edit-btn"
                                  onClick={(e) => startEditModule(module, e)}
                                >
                                  <Edit size={12} />
                                </button>
                                <button
                                  className="course-nav-delete-btn"
                                  onClick={(e) => deleteModule(module.id, e)}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </>
                            )}
                            <ChevronRight
                              size={14}
                              className={`course-nav-arrow ${
                                expandedModules[module.id] ? "expanded" : ""
                              }`}
                            />
                          </div>
                        </div>

                        {expandedModules[module.id] &&
                          selectedModule?.id === module.id && (
                            <div className="course-nav-grandchildren">
                              <div className="course-add-child">
                                <input
                                  type="text"
                                  value={newTopicName}
                                  onChange={(e) =>
                                    setNewTopicName(e.target.value)
                                  }
                                  placeholder="Add topic..."
                                  onKeyPress={(e) =>
                                    e.key === "Enter" && createTopic()
                                  }
                                />
                                <button onClick={createTopic}>
                                  <Plus size={14} />
                                </button>
                              </div>

                              {topics.map((topic) => (
                                <div
                                  key={topic.id}
                                  className="course-nav-grandchild"
                                >
                                  <div
                                    className={`course-nav-grandchild-header ${
                                      selectedTopic?.id === topic.id
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => handleTopicSelect(topic)}
                                  >
                                    <File
                                      size={14}
                                      className="course-nav-icon topic"
                                    />
                                    {editingTopic === topic.id ? (
                                      <div
                                        className="course-edit-inline"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <input
                                          type="text"
                                          value={editTopicName}
                                          onChange={(e) =>
                                            setEditTopicName(e.target.value)
                                          }
                                          onKeyPress={(e) =>
                                            e.key === "Enter" &&
                                            saveEditTopic(topic.id, e)
                                          }
                                          autoFocus
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                          onClick={(e) =>
                                            saveEditTopic(topic.id, e)
                                          }
                                          className="course-save-btn"
                                        >
                                          <Check size={12} />
                                        </button>
                                        <button
                                          onClick={cancelEdit}
                                          className="course-cancel-btn"
                                        >
                                          <X size={12} />
                                        </button>
                                      </div>
                                    ) : (
                                      <span className="course-nav-grandchild-title">
                                        {topic.name}
                                      </span>
                                    )}
                                    <div className="course-nav-actions">
                                      {!editingTopic && (
                                        <>
                                          <button
                                            className="course-nav-edit-btn"
                                            onClick={(e) =>
                                              startEditTopic(topic, e)
                                            }
                                          >
                                            <Edit size={12} />
                                          </button>
                                          <button
                                            className="course-nav-delete-btn"
                                            onClick={(e) =>
                                              deleteTopic(topic.id, e)
                                            }
                                          >
                                            <Trash2 size={12} />
                                          </button>
                                        </>
                                      )}
                                      <ChevronRight
                                        size={12}
                                        className={`course-nav-arrow ${
                                          expandedTopics[topic.id]
                                            ? "expanded"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </div>

                                  {expandedTopics[topic.id] &&
                                    selectedTopic?.id === topic.id && (
                                      <div className="course-nav-great-grandchildren">
                                        <div className="course-add-child">
                                          <input
                                            type="text"
                                            value={newSubtopicName}
                                            onChange={(e) =>
                                              setNewSubtopicName(e.target.value)
                                            }
                                            placeholder="Add subtopic..."
                                            onKeyPress={(e) =>
                                              e.key === "Enter" &&
                                              createSubtopic()
                                            }
                                          />
                                          <button onClick={createSubtopic}>
                                            <Plus size={14} />
                                          </button>
                                        </div>

                                        {subtopics.map((subtopic) => (
                                          <div
                                            key={subtopic.id}
                                            className={`course-nav-great-grandchild ${
                                              selectedSubtopic?.id ===
                                              subtopic.id
                                                ? "active"
                                                : ""
                                            }`}
                                            onClick={() =>
                                              handleSubtopicSelect(subtopic)
                                            }
                                          >
                                            <FileText
                                              size={12}
                                              className="course-nav-icon subtopic"
                                            />
                                            {editingSubtopic === subtopic.id ? (
                                              <div
                                                className="course-edit-inline"
                                                onClick={(e) =>
                                                  e.stopPropagation()
                                                }
                                              >
                                                <input
                                                  type="text"
                                                  value={editSubtopicName}
                                                  onChange={(e) =>
                                                    setEditSubtopicName(
                                                      e.target.value
                                                    )
                                                  }
                                                  onKeyPress={(e) =>
                                                    e.key === "Enter" &&
                                                    saveEditSubtopic(
                                                      subtopic.id,
                                                      e
                                                    )
                                                  }
                                                  autoFocus
                                                  onClick={(e) =>
                                                    e.stopPropagation()
                                                  }
                                                />
                                                <button
                                                  onClick={(e) =>
                                                    saveEditSubtopic(
                                                      subtopic.id,
                                                      e
                                                    )
                                                  }
                                                  className="course-save-btn"
                                                >
                                                  <Check size={12} />
                                                </button>
                                                <button
                                                  onClick={cancelEdit}
                                                  className="course-cancel-btn"
                                                >
                                                  <X size={12} />
                                                </button>
                                              </div>
                                            ) : (
                                              <span>{subtopic.name}</span>
                                            )}
                                            <div className="course-nav-actions">
                                              {!editingSubtopic && (
                                                <>
                                                  <button
                                                    className="course-nav-edit-btn"
                                                    onClick={(e) =>
                                                      startEditSubtopic(
                                                        subtopic,
                                                        e
                                                      )
                                                    }
                                                  >
                                                    <Edit size={12} />
                                                  </button>
                                                  <button
                                                    className="course-nav-delete-btn"
                                                    onClick={(e) =>
                                                      deleteSubtopic(
                                                        subtopic.id,
                                                        e
                                                      )
                                                    }
                                                  >
                                                    <Trash2 size={12} />
                                                  </button>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="course-content">
          {selectedSubtopic ? (
            <>
              {/* Breadcrumb */}
              <div className="course-breadcrumb">
                <span className="course-breadcrumb-item">
                  <Target size={14} />
                  {selectedGoal?.name}
                </span>
                <ChevronRight
                  size={14}
                  className="course-breadcrumb-separator"
                />
                <span className="course-breadcrumb-item">
                  <Layers size={14} />
                  {selectedModule?.name}
                </span>
                <ChevronRight
                  size={14}
                  className="course-breadcrumb-separator"
                />
                <span className="course-breadcrumb-item">
                  <File size={14} />
                  {selectedTopic?.name}
                </span>
                <ChevronRight
                  size={14}
                  className="course-breadcrumb-separator"
                />
                <span className="course-breadcrumb-item active">
                  <FileText size={14} />
                  {selectedSubtopic?.name}
                </span>
                <button
                  className="course-breadcrumb-edit"
                  onClick={(e) => startEditSubtopic(selectedSubtopic, e)}
                >
                  <Edit size={12} />
                </button>
              </div>

              {/* Subtopic Header */}
              <div className="course-subtopic-header">
                <div className="course-subtopic-title-wrapper">
                  {editingSubtopic === selectedSubtopic.id ? (
                    <div className="course-edit-title">
                      <input
                        type="text"
                        value={editSubtopicName}
                        onChange={(e) => setEditSubtopicName(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          saveEditSubtopic(selectedSubtopic.id, e)
                        }
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        onClick={(e) =>
                          saveEditSubtopic(selectedSubtopic.id, e)
                        }
                        className="course-save-btn"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="course-cancel-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="course-subtopic-title">
                        {selectedSubtopic.name}
                      </h2>
                      <button
                        className="course-edit-btn"
                        onClick={(e) => startEditSubtopic(selectedSubtopic, e)}
                      >
                        <Edit size={16} />
                      </button>
                    </>
                  )}
                </div>
                <div className="course-content-stats">
                  <div className="course-stat">
                    <Video size={16} />
                    <span>
                      {content.filter((c) => c.content_type === "video").length}{" "}
                      Videos
                    </span>
                  </div>
                  <div className="course-stat">
                    <FileText size={16} />
                    <span>
                      {
                        content.filter((c) => c.content_type === "cheatsheet")
                          .length
                      }{" "}
                      Cheatsheets
                    </span>
                  </div>
                  <div className="course-stat">
                    <HelpCircle size={16} />
                    <span>
                      {content.filter((c) => c.content_type === "mcq").length}{" "}
                      Quizzes
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Actions */}
              <div className="course-action-cards">
                <div
                  className="course-action-card video"
                  onClick={() => setShowVideoModal(true)}
                >
                  <div className="course-action-icon-wrapper">
                    <Video size={24} />
                  </div>
                  <div className="course-action-info">
                    <h4>Add Video</h4>
                    <p>Upload lecture videos</p>
                  </div>
                  <Plus size={20} className="course-action-plus" />
                </div>

                <div
                  className="course-action-card cheatsheet"
                  onClick={() => setShowCheatsheetModal(true)}
                >
                  <div className="course-action-icon-wrapper">
                    <FileText size={24} />
                  </div>
                  <div className="course-action-info">
                    <h4>Add Cheatsheet</h4>
                    <p>Create quick reference guides</p>
                  </div>
                  <Plus size={20} className="course-action-plus" />
                </div>

                <div
                  className="course-action-card quiz"
                  onClick={() => setShowMCQModal(true)}
                >
                  <div className="course-action-icon-wrapper">
                    <HelpCircle size={24} />
                  </div>
                  <div className="course-action-info">
                    <h4>Add Quiz</h4>
                    <p>Create assessments</p>
                  </div>
                  <Plus size={20} className="course-action-plus" />
                </div>
              </div>

              {/* Existing Content */}
              <div className="course-existing-content">
                <h3>Lesson Content</h3>
                {content.length === 0 ? (
                  <div className="course-empty-content">
                    <FileText size={48} />
                    <p>No content added yet</p>
                    <span>Start adding videos, cheatsheets, or quizzes</span>
                  </div>
                ) : (
                  <div className={`course-content-grid ${viewMode}`}>
                    {content.map((item) => (
                      <div key={item.id} className="course-content-card">
                        <div className="course-content-card-header">
                          {getContentIcon(item.content_type)}
                          <div className="course-content-card-actions">
                            {editingContent === item.id ? (
                              <div className="course-edit-content">
                                <input
                                  type="text"
                                  value={editContentTitle}
                                  onChange={(e) =>
                                    setEditContentTitle(e.target.value)
                                  }
                                  onKeyPress={(e) =>
                                    e.key === "Enter" &&
                                    saveEditContent(item.id, e)
                                  }
                                  autoFocus
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <button
                                  onClick={(e) => saveEditContent(item.id, e)}
                                  className="course-save-btn"
                                >
                                  <Check size={14} />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="course-cancel-btn"
                                  type="button"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  className="course-content-edit"
                                  onClick={(e) => startEditContent(item, e)}
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  className="course-content-delete"
                                  onClick={(e) => deleteContent(item.id, e)}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="course-content-card-body">
                          <h4>
                            {item.video_title ||
                              item.cheatsheet_title ||
                              item.mcq_title}
                          </h4>
                          <span className="course-content-type">
                            {item.content_type}
                          </span>
                          {item.duration && (
                            <div className="course-content-meta">
                              <Clock size={12} />
                              <span>{item.duration} mins</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="course-empty-state">
              <div className="course-empty-icon">
                <BookOpen size={64} />
              </div>
              <h3>Select a subtopic to begin</h3>
              <p>
                Choose a subtopic from the navigation tree to view and manage
                its content
              </p>
              <div className="course-empty-steps">
                <div className="course-step">
                  <Target size={20} />
                  <span>Select Goal</span>
                </div>
                <ChevronRight size={16} />
                <div className="course-step">
                  <Layers size={20} />
                  <span>Select Module</span>
                </div>
                <ChevronRight size={16} />
                <div className="course-step">
                  <File size={20} />
                  <span>Select Topic</span>
                </div>
                <ChevronRight size={16} />
                <div className="course-step">
                  <FileText size={20} />
                  <span>Select Subtopic</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showVideoModal && selectedSubtopic && (
        <VideoUploadModal
          subtopicId={selectedSubtopic.id}
          onClose={() => setShowVideoModal(false)}
          onSuccess={() => {
            setShowVideoModal(false);
            fetchContent(selectedSubtopic.id);
          }}
        />
      )}

      {showCheatsheetModal && selectedSubtopic && (
        <CheatsheetEditor
          subtopicId={selectedSubtopic.id}
          onClose={() => setShowCheatsheetModal(false)}
          onSuccess={() => {
            setShowCheatsheetModal(false);
            fetchContent(selectedSubtopic.id);
          }}
        />
      )}

      {showMCQModal && selectedSubtopic && (
        <MCQCreator
          subtopicId={selectedSubtopic.id}
          onClose={() => setShowMCQModal(false)}
          onSuccess={() => {
            setShowMCQModal(false);
            fetchContent(selectedSubtopic.id);
          }}
        />
      )}
    </div>
  );
};

export default CourseManagement;
