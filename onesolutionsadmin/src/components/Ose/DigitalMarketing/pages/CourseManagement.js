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

  // Store data in objects keyed by parent ID instead of arrays
  const [modulesByGoal, setModulesByGoal] = useState({});
  const [topicsByModule, setTopicsByModule] = useState({});
  const [subtopicsByTopic, setSubtopicsByTopic] = useState({});
  const [contentBySubtopic, setContentBySubtopic] = useState({});

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMCQModal, setShowMCQModal] = useState(false);

  // State to manage the View Mode (Dashboard vs Editor)
  const [contentViewMode, setContentViewMode] = useState("dashboard"); // 'dashboard' or 'cheatsheet_editor'
  // State to hold content being edited
  const [contentToEdit, setContentToEdit] = useState(null);

  const [newGoalName, setNewGoalName] = useState("");
  const [newModuleName, setNewModuleName] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [newSubtopicName, setNewSubtopicName] = useState("");

  const [editingGoal, setEditingGoal] = useState(null);
  const [editingModule, setEditingModule] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingSubtopic, setEditingSubtopic] = useState(null);
  // Removed editingContent state as we now use full modals

  const [editGoalName, setEditGoalName] = useState("");
  const [editModuleName, setEditModuleName] = useState("");
  const [editTopicName, setEditTopicName] = useState("");
  const [editSubtopicName, setEditSubtopicName] = useState("");
  // Removed editContentTitle as we now use full modals

  const [viewMode, setViewMode] = useState("grid");
  const [expandedGoals, setExpandedGoals] = useState({});
  const [expandedModules, setExpandedModules] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});

  const [activeMenu, setActiveMenu] = useState(null);
  const [addingTo, setAddingTo] = useState(null);

  // Store which parent's children are currently loading
  const [loadingStates, setLoadingStates] = useState({
    modules: {},
    topics: {},
    subtopics: {},
    content: {},
  });

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Reset view mode to dashboard when changing subtopics
  useEffect(() => {
    setContentViewMode("dashboard");
    setContentToEdit(null);
  }, [selectedSubtopic]);

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
    if (loadingStates.modules[goalId]) return;

    setLoadingStates((prev) => ({
      ...prev,
      modules: { ...prev.modules, [goalId]: true },
    }));

    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/goals/${goalId}/modules`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setModulesByGoal((prev) => ({
        ...prev,
        [goalId]: data.data || [],
      }));
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        modules: { ...prev.modules, [goalId]: false },
      }));
    }
  };

  const fetchTopics = async (moduleId) => {
    if (loadingStates.topics[moduleId]) return;

    setLoadingStates((prev) => ({
      ...prev,
      topics: { ...prev.topics, [moduleId]: true },
    }));

    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/modules/${moduleId}/topics`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setTopicsByModule((prev) => ({
        ...prev,
        [moduleId]: data.data || [],
      }));
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        topics: { ...prev.topics, [moduleId]: false },
      }));
    }
  };

  const fetchSubtopics = async (topicId) => {
    if (loadingStates.subtopics[topicId]) return;

    setLoadingStates((prev) => ({
      ...prev,
      subtopics: { ...prev.subtopics, [topicId]: true },
    }));

    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/topics/${topicId}/subtopics`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setSubtopicsByTopic((prev) => ({
        ...prev,
        [topicId]: data.data || [],
      }));
    } catch (error) {
      console.error("Error fetching subtopics:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        subtopics: { ...prev.subtopics, [topicId]: false },
      }));
    }
  };

  const fetchContent = async (subtopicId) => {
    if (loadingStates.content[subtopicId]) return;

    setLoadingStates((prev) => ({
      ...prev,
      content: { ...prev.content, [subtopicId]: true },
    }));

    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}/content`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setContentBySubtopic((prev) => ({
        ...prev,
        [subtopicId]: data.data || [],
      }));
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        content: { ...prev.content, [subtopicId]: false },
      }));
    }
  };

  const handleGoalSelect = async (goal) => {
    if (editingGoal) return;

    const newExpandedState = !expandedGoals[goal.id];

    setExpandedGoals({ ...expandedGoals, [goal.id]: newExpandedState });

    if (newExpandedState) {
      setSelectedGoal(goal);
      await fetchModules(goal.id);
    } else {
      if (selectedGoal?.id === goal.id) {
        setSelectedGoal(null);
        setSelectedModule(null);
        setSelectedTopic(null);
        setSelectedSubtopic(null);
      }
    }
  };

  const handleModuleSelect = async (module) => {
    if (editingModule) return;

    const newExpandedState = !expandedModules[module.id];

    setExpandedModules({ ...expandedModules, [module.id]: newExpandedState });

    if (newExpandedState) {
      setSelectedModule(module);
      await fetchTopics(module.id);
    } else {
      if (selectedModule?.id === module.id) {
        setSelectedModule(null);
        setSelectedTopic(null);
        setSelectedSubtopic(null);
      }
    }
  };

  const handleTopicSelect = async (topic) => {
    if (editingTopic) return;

    const newExpandedState = !expandedTopics[topic.id];

    setExpandedTopics({ ...expandedTopics, [topic.id]: newExpandedState });

    if (newExpandedState) {
      setSelectedTopic(topic);
      await fetchSubtopics(topic.id);
    } else {
      if (selectedTopic?.id === topic.id) {
        setSelectedTopic(null);
        setSelectedSubtopic(null);
      }
    }
  };

  const handleSubtopicSelect = (subtopic) => {
    if (editingSubtopic) return;
    setSelectedSubtopic(subtopic);
    fetchContent(subtopic.id);
    setContentViewMode("dashboard"); // Ensure we show the dashboard when clicking navigation
    setContentToEdit(null);
  };

  const toggleMenu = (type, id, e) => {
    e.stopPropagation();
    if (activeMenu?.type === type && activeMenu?.id === id) {
      setActiveMenu(null);
    } else {
      setActiveMenu({ type, id });
    }
  };

  const handleMenuAction = async (action, type, item, e) => {
    e.stopPropagation();
    setActiveMenu(null);

    if (action === "edit") {
      if (type === "goal") startEditGoal(item, e);
      if (type === "module") startEditModule(item, e);
      if (type === "topic") startEditTopic(item, e);
      if (type === "subtopic") startEditSubtopic(item, e);
    } else if (action === "delete") {
      if (type === "goal") deleteGoal(item.id, e);
      if (type === "module") deleteModule(item.id, e);
      if (type === "topic") deleteTopic(item.id, e);
      if (type === "subtopic") deleteSubtopic(item.id, e);
    } else if (action === "add") {
      if (type === "goal") {
        setAddingTo({ type: "goal", id: item.id });
        setSelectedGoal(item);
        if (!expandedGoals[item.id]) {
          setExpandedGoals({ ...expandedGoals, [item.id]: true });
          await fetchModules(item.id);
        }
      }
      if (type === "module") {
        setAddingTo({ type: "module", id: item.id });
        setSelectedModule(item);
        if (!expandedModules[item.id]) {
          setExpandedModules({ ...expandedModules, [item.id]: true });
          await fetchTopics(item.id);
        }
      }
      if (type === "topic") {
        setAddingTo({ type: "topic", id: item.id });
        setSelectedTopic(item);
        if (!expandedTopics[item.id]) {
          setExpandedTopics({ ...expandedTopics, [item.id]: true });
          await fetchSubtopics(item.id);
        }
      }
    }
  };

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
        setAddingTo(null);
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
        setModulesByGoal((prev) => ({
          ...prev,
          [selectedGoal.id]: [...(prev[selectedGoal.id] || []), data.data],
        }));
        setNewModuleName("");
        setAddingTo(null);
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
        setTopicsByModule((prev) => ({
          ...prev,
          [selectedModule.id]: [...(prev[selectedModule.id] || []), data.data],
        }));
        setNewTopicName("");
        setAddingTo(null);
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
        setSubtopicsByTopic((prev) => ({
          ...prev,
          [selectedTopic.id]: [...(prev[selectedTopic.id] || []), data.data],
        }));
        setNewSubtopicName("");
        setAddingTo(null);
      }
    } catch (error) {
      console.error("Error creating subtopic:", error);
    }
  };

  const startEditGoal = (goal, e) => {
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
    if (e) e.stopPropagation();

    // Show confirmation dialog
    if (
      !window.confirm(
        "Are you sure you want to delete this goal? This will delete all modules, topics, subtopics, and content within it."
      )
    ) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/goals/${goalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update goals state
        setGoals((prevGoals) => prevGoals.filter((g) => g.id !== goalId));

        // Clean up related data in all state objects
        setModulesByGoal((prev) => {
          const newState = { ...prev };
          delete newState[goalId];
          return newState;
        });

        // Clear selected items if needed
        if (selectedGoal?.id === goalId) {
          setSelectedGoal(null);
          setSelectedModule(null);
          setSelectedTopic(null);
          setSelectedSubtopic(null);
        }

        // Clear expanded state
        setExpandedGoals((prev) => {
          const newState = { ...prev };
          delete newState[goalId];
          return newState;
        });

        // Show success message
        alert("Goal deleted successfully");
      } else {
        alert(data.message || "Failed to delete goal");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert("Error deleting goal. Please try again.");
    }
  };

  const startEditModule = (module, e) => {
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

        // Find which goal this module belongs to
        for (const [goalId, modules] of Object.entries(modulesByGoal)) {
          if (modules.some((m) => m.id === moduleId)) {
            setModulesByGoal((prev) => ({
              ...prev,
              [goalId]: prev[goalId].map((m) =>
                m.id === moduleId ? updatedModule : m
              ),
            }));
            break;
          }
        }

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
    if (e) e.stopPropagation();

    if (
      !window.confirm(
        "Are you sure you want to delete this module? This will delete all topics, subtopics, and content within it."
      )
    ) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/modules/${moduleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Find which goal this module belongs to and update state
        let parentGoalId = null;

        // Search through modulesByGoal to find the parent
        Object.entries(modulesByGoal).forEach(([goalId, modules]) => {
          if (modules.some((m) => m.id === moduleId)) {
            parentGoalId = goalId;
          }
        });

        if (parentGoalId) {
          setModulesByGoal((prev) => ({
            ...prev,
            [parentGoalId]: prev[parentGoalId].filter((m) => m.id !== moduleId),
          }));
        }

        // Clean up related data
        // Remove any topics/subtopics content for this module from state
        const topicsToRemove = Object.entries(topicsByModule)
          .filter(([moduleIdKey]) => moduleIdKey === String(moduleId))
          .map(([_, topics]) => topics);

        if (topicsToRemove.length > 0) {
          setTopicsByModule((prev) => {
            const newState = { ...prev };
            delete newState[moduleId];
            return newState;
          });
        }

        // Clear selected items if needed
        if (selectedModule?.id === moduleId) {
          setSelectedModule(null);
          setSelectedTopic(null);
          setSelectedSubtopic(null);
        }

        // Clear expanded state
        setExpandedModules((prev) => {
          const newState = { ...prev };
          delete newState[moduleId];
          return newState;
        });

        alert("Module deleted successfully");
      } else {
        alert(data.message || "Failed to delete module");
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Error deleting module. Please try again.");
    }
  };

  const startEditTopic = (topic, e) => {
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

        // Find which module this topic belongs to
        for (const [moduleId, topics] of Object.entries(topicsByModule)) {
          if (topics.some((t) => t.id === topicId)) {
            setTopicsByModule((prev) => ({
              ...prev,
              [moduleId]: prev[moduleId].map((t) =>
                t.id === topicId ? updatedTopic : t
              ),
            }));
            break;
          }
        }

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
    if (e) e.stopPropagation();

    if (
      !window.confirm(
        "Are you sure you want to delete this topic? This will delete all subtopics and content within it."
      )
    ) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/topics/${topicId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Find which module this topic belongs to
        let parentModuleId = null;

        Object.entries(topicsByModule).forEach(([moduleId, topics]) => {
          if (topics.some((t) => t.id === topicId)) {
            parentModuleId = moduleId;
          }
        });

        if (parentModuleId) {
          setTopicsByModule((prev) => ({
            ...prev,
            [parentModuleId]: prev[parentModuleId].filter(
              (t) => t.id !== topicId
            ),
          }));
        }

        // Clean up related data
        setSubtopicsByTopic((prev) => {
          const newState = { ...prev };
          delete newState[topicId];
          return newState;
        });

        setContentBySubtopic((prev) => {
          const newState = { ...prev };
          // Remove any content that belonged to subtopics under this topic
          Object.entries(prev).forEach(([subtopicId, content]) => {
            // You might need to track topic-subtopic relationships to clean this properly
            // For now, we'll just keep it and rely on backend cascade
          });
          return newState;
        });

        // Clear selected items if needed
        if (selectedTopic?.id === topicId) {
          setSelectedTopic(null);
          setSelectedSubtopic(null);
        }

        // Clear expanded state
        setExpandedTopics((prev) => {
          const newState = { ...prev };
          delete newState[topicId];
          return newState;
        });

        alert("Topic deleted successfully");
      } else {
        alert(data.message || "Failed to delete topic");
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
      alert("Error deleting topic. Please try again.");
    }
  };

  const startEditSubtopic = (subtopic, e) => {
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

        // Find which topic this subtopic belongs to
        for (const [topicId, subtopics] of Object.entries(subtopicsByTopic)) {
          if (subtopics.some((s) => s.id === subtopicId)) {
            setSubtopicsByTopic((prev) => ({
              ...prev,
              [topicId]: prev[topicId].map((s) =>
                s.id === subtopicId ? updatedSubtopic : s
              ),
            }));
            break;
          }
        }

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
    if (e) e.stopPropagation();

    if (
      !window.confirm(
        "Are you sure you want to delete this subtopic? This will delete all content within it."
      )
    ) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Find which topic this subtopic belongs to
        let parentTopicId = null;

        Object.entries(subtopicsByTopic).forEach(([topicId, subtopics]) => {
          if (subtopics.some((s) => s.id === subtopicId)) {
            parentTopicId = topicId;
          }
        });

        if (parentTopicId) {
          setSubtopicsByTopic((prev) => ({
            ...prev,
            [parentTopicId]: prev[parentTopicId].filter(
              (s) => s.id !== subtopicId
            ),
          }));
        }

        // Clean up content
        setContentBySubtopic((prev) => {
          const newState = { ...prev };
          delete newState[subtopicId];
          return newState;
        });

        // Clear selected if needed
        if (selectedSubtopic?.id === subtopicId) {
          setSelectedSubtopic(null);
        }

        alert("Subtopic deleted successfully");
      } else {
        alert(data.message || "Failed to delete subtopic");
      }
    } catch (error) {
      console.error("Error deleting subtopic:", error);
      alert("Error deleting subtopic. Please try again.");
    }
  };

  // --- CONTENT EDITING LOGIC ---
  const startEditContent = (contentItem, e) => {
    e.stopPropagation();
    setContentToEdit(contentItem);

    if (contentItem.content_type === "cheatsheet") {
      setContentViewMode("cheatsheet_editor");
    } else if (contentItem.content_type === "video") {
      setShowVideoModal(true);
    } else if (contentItem.content_type === "mcq") {
      setShowMCQModal(true);
    }
  };

  const deleteContent = async (contentId, e) => {
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this content?")) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/course/content/${contentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        const subtopicId = selectedSubtopic?.id;
        if (subtopicId) {
          setContentBySubtopic((prev) => ({
            ...prev,
            [subtopicId]: prev[subtopicId].filter((c) => c.id !== contentId),
          }));
        }
        alert("Content deleted successfully");
      } else {
        alert(data.message || "Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Error deleting content. Please try again.");
    }
  };

  const cancelEdit = (e) => {
    if (e) e.stopPropagation();
    setEditingGoal(null);
    setEditingModule(null);
    setEditingTopic(null);
    setEditingSubtopic(null);
    setAddingTo(null);
  };

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

  const renderActionMenu = (type, item) => {
    const isEditing =
      (type === "goal" && editingGoal === item.id) ||
      (type === "module" && editingModule === item.id) ||
      (type === "topic" && editingTopic === item.id) ||
      (type === "subtopic" && editingSubtopic === item.id);

    if (isEditing) return null;

    const isOpen = activeMenu?.type === type && activeMenu?.id === item.id;

    return (
      <div className="course-menu-wrapper">
        <button
          className={`course-menu-btn ${isOpen ? "active" : ""}`}
          onClick={(e) => toggleMenu(type, item.id, e)}
        >
          <MoreVertical size={16} />
        </button>
        {isOpen && (
          <div className="course-menu-dropdown">
            {type !== "subtopic" && (
              <div
                className="course-menu-item"
                onClick={(e) => handleMenuAction("add", type, item, e)}
              >
                <Plus size={14} />
                <span>
                  Add{" "}
                  {type === "goal"
                    ? "Module"
                    : type === "module"
                    ? "Topic"
                    : "Subtopic"}
                </span>
              </div>
            )}
            <div
              className="course-menu-item"
              onClick={(e) => handleMenuAction("edit", type, item, e)}
            >
              <Edit size={14} />
              <span>Rename</span>
            </div>
            <div
              className="course-menu-item delete"
              onClick={(e) => handleMenuAction("delete", type, item, e)}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const currentContent = selectedSubtopic
    ? contentBySubtopic[selectedSubtopic.id] || []
    : [];

  return (
    <div className="course-container">
      {/* Main Content */}
      <div className="course-main">
        {/* Left Sidebar - Hierarchical Navigation */}
        <div className="course-sidebar">
          <div className="course-sidebar-header">
            <div className="left-header-course course-add-goal">
              <div className="course-tooltip-wrapper">
                <h3>DM Curriculum</h3>
                <span className="course-tooltip" style={{ marginLeft: "15px" }}>
                  Digital Marketing Curriculum
                </span>
              </div>
              <div className="course-tooltip-wrapper">
                <button onClick={() => setAddingTo({ type: "root" })}>
                  <Plus size={16} />
                </button>
                <span className="course-tooltip">New Goal</span>
              </div>
            </div>
            {addingTo?.type === "root" && (
              <div
                className="course-add-child"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  placeholder="Add goal..."
                  onKeyPress={(e) => e.key === "Enter" && createGoal()}
                  autoFocus
                />
                <button onClick={createGoal}>
                  <Check size={14} />
                </button>
                <button
                  onClick={() => setAddingTo(null)}
                  className="course-cancel-btn-small"
                  style={{
                    background: "#fee2e2",
                    color: "#ef4444",
                    border: "none",
                    borderRadius: 4,
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            )}
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
                    {renderActionMenu("goal", goal)}
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
                    {addingTo?.type === "goal" && addingTo?.id === goal.id && (
                      <div
                        className="course-add-child"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={newModuleName}
                          onChange={(e) => setNewModuleName(e.target.value)}
                          placeholder="Add module..."
                          onKeyPress={(e) =>
                            e.key === "Enter" && createModule()
                          }
                          autoFocus
                        />
                        <button onClick={createModule}>
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setAddingTo(null)}
                          className="course-cancel-btn-small"
                          style={{
                            background: "#fee2e2",
                            color: "#ef4444",
                            border: "none",
                            borderRadius: 4,
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}

                    {(modulesByGoal[goal.id] || []).map((module) => (
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
                            {renderActionMenu("module", module)}
                            <ChevronRight
                              size={14}
                              className={`course-nav-arrow ${
                                expandedModules[module.id] ? "expanded" : ""
                              }`}
                            />
                          </div>
                        </div>

                        {expandedModules[module.id] && (
                          <div className="course-nav-grandchildren">
                            {addingTo?.type === "module" &&
                              addingTo?.id === module.id && (
                                <div
                                  className="course-add-child"
                                  onClick={(e) => e.stopPropagation()}
                                >
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
                                    autoFocus
                                  />
                                  <button onClick={createTopic}>
                                    <Check size={14} />
                                  </button>
                                  <button
                                    onClick={() => setAddingTo(null)}
                                    className="course-cancel-btn-small"
                                    style={{
                                      background: "#fee2e2",
                                      color: "#ef4444",
                                      border: "none",
                                      borderRadius: 4,
                                      width: 28,
                                      height: 28,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              )}

                            {(topicsByModule[module.id] || []).map((topic) => (
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
                                    {renderActionMenu("topic", topic)}
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

                                {expandedTopics[topic.id] && (
                                  <div className="course-nav-great-grandchildren">
                                    {addingTo?.type === "topic" &&
                                      addingTo?.id === topic.id && (
                                        <div
                                          className="course-add-child"
                                          onClick={(e) => e.stopPropagation()}
                                        >
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
                                            autoFocus
                                          />
                                          <button onClick={createSubtopic}>
                                            <Check size={14} />
                                          </button>
                                          <button
                                            onClick={() => setAddingTo(null)}
                                            className="course-cancel-btn-small"
                                            style={{
                                              background: "#fee2e2",
                                              color: "#ef4444",
                                              border: "none",
                                              borderRadius: 4,
                                              width: 28,
                                              height: 28,
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <X size={14} />
                                          </button>
                                        </div>
                                      )}

                                    {(subtopicsByTopic[topic.id] || []).map(
                                      (subtopic) => (
                                        <div
                                          key={subtopic.id}
                                          className={`course-nav-great-grandchild ${
                                            selectedSubtopic?.id === subtopic.id
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
                                            {renderActionMenu(
                                              "subtopic",
                                              subtopic
                                            )}
                                          </div>
                                        </div>
                                      )
                                    )}
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

              {/* Conditional Rendering: Editor vs Dashboard */}
              {contentViewMode === "cheatsheet_editor" ? (
                // --- INLINE CHEATSHEET EDITOR ---
                <CheatsheetEditor
                  subtopicId={selectedSubtopic.id}
                  initialData={contentToEdit} // Pass existing data if editing
                  onCancel={() => {
                    setContentViewMode("dashboard");
                    setContentToEdit(null);
                  }}
                  onSuccess={() => {
                    setContentViewMode("dashboard");
                    setContentToEdit(null);
                    fetchContent(selectedSubtopic.id);
                  }}
                />
              ) : (
                // --- STANDARD DASHBOARD VIEW ---
                <>
                  {/* Subtopic Header */}
                  <div className="course-subtopic-header">
                    <div className="course-subtopic-title-wrapper">
                      {editingSubtopic === selectedSubtopic.id ? (
                        <div className="course-edit-title">
                          <input
                            type="text"
                            value={editSubtopicName}
                            onChange={(e) =>
                              setEditSubtopicName(e.target.value)
                            }
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
                            onClick={(e) =>
                              startEditSubtopic(selectedSubtopic, e)
                            }
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
                          {
                            currentContent.filter(
                              (c) => c.content_type === "video"
                            ).length
                          }{" "}
                          Videos
                        </span>
                      </div>
                      <div className="course-stat">
                        <FileText size={16} />
                        <span>
                          {
                            currentContent.filter(
                              (c) => c.content_type === "cheatsheet"
                            ).length
                          }{" "}
                          Cheatsheets
                        </span>
                      </div>
                      <div className="course-stat">
                        <HelpCircle size={16} />
                        <span>
                          {
                            currentContent.filter(
                              (c) => c.content_type === "mcq"
                            ).length
                          }{" "}
                          Quizzes
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Actions */}
                  <div className="course-action-cards">
                    <div
                      className="course-action-card video"
                      onClick={() => {
                        setContentToEdit(null);
                        setShowVideoModal(true);
                      }}
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

                    {/* CLICKING THIS NOW SWITCHES TO THE INLINE EDITOR */}
                    <div
                      className="course-action-card cheatsheet"
                      onClick={() => {
                        setContentToEdit(null);
                        setContentViewMode("cheatsheet_editor");
                      }}
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
                      onClick={() => {
                        setContentToEdit(null);
                        setShowMCQModal(true);
                      }}
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
                    {currentContent.length === 0 ? (
                      <div className="course-empty-content">
                        <FileText size={48} />
                        <p>No content added yet</p>
                        <span>
                          Start adding videos, cheatsheets, or quizzes
                        </span>
                      </div>
                    ) : (
                      <div className={`course-content-grid ${viewMode}`}>
                        {currentContent.map((item) => (
                          <div key={item.id} className="course-content-card">
                            <div className="course-content-card-header">
                              {getContentIcon(item.content_type)}
                              <div className="course-content-card-actions">
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
              )}
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
          editData={contentToEdit} // Pass existing data if editing
          onClose={() => {
            setShowVideoModal(false);
            setContentToEdit(null);
          }}
          onSuccess={() => {
            setShowVideoModal(false);
            setContentToEdit(null);
            fetchContent(selectedSubtopic.id);
          }}
        />
      )}

      {showMCQModal && selectedSubtopic && (
        <MCQCreator
          subtopicId={selectedSubtopic.id}
          editData={contentToEdit} // Pass existing data if editing
          onClose={() => {
            setShowMCQModal(false);
            setContentToEdit(null);
          }}
          onSuccess={() => {
            setShowMCQModal(false);
            setContentToEdit(null);
            fetchContent(selectedSubtopic.id);
          }}
        />
      )}
    </div>
  );
};

export default CourseManagement;
