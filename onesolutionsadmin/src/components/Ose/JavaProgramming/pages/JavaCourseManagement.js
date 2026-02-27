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
  GripVertical,
  Code,
} from "lucide-react";
import JavaVideoUploadModal from "../admin/JavaVideoUploadModal";
import JavaCheatsheetEditor from "../admin/JavaCheatsheetEditor";
import JavaMCQCreator from "../admin/JavaMCQCreator";
import JavaCodingPractice from "../admin/JavaCodingPractice";

const JavaCourseManagement = () => {
  const [goals, setGoals] = useState([]);

  // Store data in objects keyed by parent ID instead of arrays
  const [modulesByGoal, setModulesByGoal] = useState({});
  const [topicsByModule, setTopicsByModule] = useState({});
  const [subtopicsByTopic, setSubtopicsByTopic] = useState({});
  const [contentBySubtopic, setContentBySubtopic] = useState({});
  const [practicesBySubtopic, setPracticesBySubtopic] = useState({}); // for coding practices

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState(null); // for coding practice view

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMCQModal, setShowMCQModal] = useState(false);

  // State to manage the View Mode (Dashboard vs Editor)
  const [contentViewMode, setContentViewMode] = useState("dashboard"); // 'dashboard', 'cheatsheet_editor', 'coding_practice'
  const [contentToEdit, setContentToEdit] = useState(null);

  const [newGoalName, setNewGoalName] = useState("");
  const [newModuleName, setNewModuleName] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [newSubtopicName, setNewSubtopicName] = useState("");

  const [editingGoal, setEditingGoal] = useState(null);
  const [editingModule, setEditingModule] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingSubtopic, setEditingSubtopic] = useState(null);

  const [editGoalName, setEditGoalName] = useState("");
  const [editModuleName, setEditModuleName] = useState("");
  const [editTopicName, setEditTopicName] = useState("");
  const [editSubtopicName, setEditSubtopicName] = useState("");

  const [viewMode, setViewMode] = useState("grid");
  const [expandedGoals, setExpandedGoals] = useState({});
  const [expandedModules, setExpandedModules] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});

  const [activeMenu, setActiveMenu] = useState(null);
  const [addingTo, setAddingTo] = useState(null);

  // Drag and Drop States
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Store which parent's children are currently loading
  const [loadingStates, setLoadingStates] = useState({
    modules: {},
    topics: {},
    subtopics: {},
    content: {},
    practices: {},
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

  // Reset view mode when changing subtopics
  useEffect(() => {
    setContentViewMode("dashboard");
    setContentToEdit(null);
    setSelectedPractice(null);
  }, [selectedSubtopic]);

  const fetchGoals = async () => {
    try {
      const res = await fetch(
        "https://api.onesolutionsekam.in/admin/java/goals",
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
        `https://api.onesolutionsekam.in/admin/java/goals/${goalId}/modules`,
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
        `https://api.onesolutionsekam.in/admin/java/modules/${moduleId}/topics`,
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
        `https://api.onesolutionsekam.in/admin/java/topics/${topicId}/subtopics`,
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
        `https://api.onesolutionsekam.in/admin/java/subtopics/${subtopicId}/content`,
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

  const fetchCodingPractices = async (subtopicId) => {
    if (loadingStates.practices[subtopicId]) return;

    setLoadingStates((prev) => ({
      ...prev,
      practices: { ...prev.practices, [subtopicId]: true },
    }));

    try {
      const res = await fetch(
        `https://api.onesolutionsekam.in/admin/java/subtopics/${subtopicId}/coding-practices`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const data = await res.json();
      setPracticesBySubtopic((prev) => ({
        ...prev,
        [subtopicId]: data.data || [],
      }));
    } catch (error) {
      console.error("Error fetching coding practices:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        practices: { ...prev.practices, [subtopicId]: false },
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
    fetchCodingPractices(subtopic.id);
    setContentViewMode("dashboard");
    setContentToEdit(null);
    setSelectedPractice(null);
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

  // Drag and Drop Handlers
  const handleDragStart = (type, item, parentId = null, e) => {
    e.stopPropagation();
    setDraggedItem({ type, item, parentId });
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
  };

  const handleDragOver = (e, type, id, parentId = null) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverItem({ type, id, parentId });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
    setIsDragging(false);
  };

  const handleDrop = async (e, targetType, targetId, targetParentId = null) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || !dragOverItem) {
      handleDragEnd();
      return;
    }

    // Only allow reordering within the same type and same parent
    if (
      draggedItem.type !== targetType ||
      draggedItem.parentId !== targetParentId
    ) {
      alert(`Cannot move ${draggedItem.type} to a different parent`);
      handleDragEnd();
      return;
    }

    // Don't do anything if dropped on itself
    if (draggedItem.item.id === targetId) {
      handleDragEnd();
      return;
    }

    try {
      // Get the current list
      let currentList = [];
      if (targetType === "goal") {
        currentList = [...goals];
      } else if (targetType === "module") {
        currentList = [...(modulesByGoal[targetParentId] || [])];
      } else if (targetType === "topic") {
        currentList = [...(topicsByModule[targetParentId] || [])];
      } else if (targetType === "subtopic") {
        currentList = [...(subtopicsByTopic[targetParentId] || [])];
      } else if (targetType === "content") {
        currentList = [...(contentBySubtopic[targetParentId] || [])];
      } else if (targetType === "practice") {
        currentList = [...(practicesBySubtopic[targetParentId] || [])];
      }

      // Find indices
      const draggedIndex = currentList.findIndex(
        (item) => item.id === draggedItem.item.id
      );
      const targetIndex = currentList.findIndex((item) => item.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1) {
        handleDragEnd();
        return;
      }

      // Reorder the array
      const [removed] = currentList.splice(draggedIndex, 1);
      currentList.splice(targetIndex, 0, removed);

      // Update the UI immediately for better UX
      if (targetType === "goal") {
        setGoals(currentList);
      } else if (targetType === "module") {
        setModulesByGoal((prev) => ({
          ...prev,
          [targetParentId]: currentList,
        }));
      } else if (targetType === "topic") {
        setTopicsByModule((prev) => ({
          ...prev,
          [targetParentId]: currentList,
        }));
      } else if (targetType === "subtopic") {
        setSubtopicsByTopic((prev) => ({
          ...prev,
          [targetParentId]: currentList,
        }));
      } else if (targetType === "content") {
        setContentBySubtopic((prev) => ({
          ...prev,
          [targetParentId]: currentList,
        }));
      } else if (targetType === "practice") {
        setPracticesBySubtopic((prev) => ({
          ...prev,
          [targetParentId]: currentList,
        }));
      }

      // Call API to save the new order
      const orderedIds = currentList.map((item) => item.id);

      let endpoint = "";
      let body = {};

      if (targetType === "goal") {
        endpoint = "/admin/java/goals/reorder";
        body = { orderedIds };
      } else if (targetType === "module") {
        endpoint = "/admin/java/modules/reorder";
        body = { goalId: targetParentId, orderedIds };
      } else if (targetType === "topic") {
        endpoint = "/admin/java/topics/reorder";
        body = { moduleId: targetParentId, orderedIds };
      } else if (targetType === "subtopic") {
        endpoint = "/admin/java/subtopics/reorder";
        body = { topicId: targetParentId, orderedIds };
      } else if (targetType === "content") {
        endpoint = "/admin/java/content/reorder";
        body = { subtopicId: targetParentId, orderedIds };
      } else if (targetType === "practice") {
        endpoint = "/admin/java/coding-practices/reorder";
        body = { subtopicId: targetParentId, orderedIds };
      }

      const res = await fetch(`https://api.onesolutionsekam.in${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Failed to save new order. Please refresh and try again.");
        // Optionally revert the UI change here
      }
    } catch (error) {
      console.error("Error reordering:", error);
      alert("Error saving new order");
    } finally {
      handleDragEnd();
    }
  };

  const createGoal = async () => {
    if (!newGoalName.trim()) return;
    try {
      const res = await fetch(
        "https://api.onesolutionsekam.in/admin/java/goals",
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
        "https://api.onesolutionsekam.in/admin/java/modules",
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
        "https://api.onesolutionsekam.in/admin/java/topics",
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
        "https://api.onesolutionsekam.in/admin/java/subtopics",
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
        `https://api.onesolutionsekam.in/admin/java/goals/${goalId}`,
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
        `https://api.onesolutionsekam.in/admin/java/goals/${goalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setGoals((prevGoals) => prevGoals.filter((g) => g.id !== goalId));
        setModulesByGoal((prev) => {
          const newState = { ...prev };
          delete newState[goalId];
          return newState;
        });
        if (selectedGoal?.id === goalId) {
          setSelectedGoal(null);
          setSelectedModule(null);
          setSelectedTopic(null);
          setSelectedSubtopic(null);
        }
        setExpandedGoals((prev) => {
          const newState = { ...prev };
          delete newState[goalId];
          return newState;
        });
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
        `https://api.onesolutionsekam.in/admin/java/modules/${moduleId}`,
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
        `https://api.onesolutionsekam.in/admin/java/modules/${moduleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        let parentGoalId = null;
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

        setTopicsByModule((prev) => {
          const newState = { ...prev };
          delete newState[moduleId];
          return newState;
        });

        if (selectedModule?.id === moduleId) {
          setSelectedModule(null);
          setSelectedTopic(null);
          setSelectedSubtopic(null);
        }

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
        `https://api.onesolutionsekam.in/admin/java/topics/${topicId}`,
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
        `https://api.onesolutionsekam.in/admin/java/topics/${topicId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
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

        setSubtopicsByTopic((prev) => {
          const newState = { ...prev };
          delete newState[topicId];
          return newState;
        });

        if (selectedTopic?.id === topicId) {
          setSelectedTopic(null);
          setSelectedSubtopic(null);
        }

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
        `https://api.onesolutionsekam.in/admin/java/subtopics/${subtopicId}`,
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
        "Are you sure you want to delete this subtopic? This will delete all content and coding practices within it."
      )
    ) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(
        `https://api.onesolutionsekam.in/admin/java/subtopics/${subtopicId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
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

        setContentBySubtopic((prev) => {
          const newState = { ...prev };
          delete newState[subtopicId];
          return newState;
        });

        setPracticesBySubtopic((prev) => {
          const newState = { ...prev };
          delete newState[subtopicId];
          return newState;
        });

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
        `https://api.onesolutionsekam.in/admin/java/content/${contentId}`,
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
      case "coding":
        return <Code className="course-content-icon coding" />;
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

  const renderDragHandle = (type, item, parentId = null) => {
    return (
      <div
        className="course-drag-handle"
        draggable
        onDragStart={(e) => handleDragStart(type, item, parentId, e)}
        onDragEnd={handleDragEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical size={16} />
      </div>
    );
  };

  const currentContent = selectedSubtopic
    ? contentBySubtopic[selectedSubtopic.id] || []
    : [];
  const currentPractices = selectedSubtopic
    ? practicesBySubtopic[selectedSubtopic.id] || []
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
                <h3>Java Curriculum</h3>
                <span className="course-tooltip" style={{ marginLeft: "15px" }}>
                  Java Programming Curriculum
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
            {goals.map((goal, index) => (
              <div
                key={goal.id}
                className={`course-nav-item ${
                  dragOverItem?.type === "goal" && dragOverItem?.id === goal.id
                    ? "drag-over"
                    : ""
                }`}
                onDragOver={(e) => handleDragOver(e, "goal", goal.id)}
                onDrop={(e) => handleDrop(e, "goal", goal.id)}
              >
                <div
                  className={`course-nav-header ${
                    selectedGoal?.id === goal.id ? "active" : ""
                  } ${isDragging ? "dragging-enabled" : ""}`}
                  onClick={() => handleGoalSelect(goal)}
                >
                  <div className="course-nav-header-left">
                    {renderDragHandle("goal", goal)}
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

                    {(modulesByGoal[goal.id] || []).map(
                      (module, moduleIndex) => (
                        <div
                          key={module.id}
                          className={`course-nav-child ${
                            dragOverItem?.type === "module" &&
                            dragOverItem?.id === module.id
                              ? "drag-over"
                              : ""
                          }`}
                          onDragOver={(e) =>
                            handleDragOver(e, "module", module.id, goal.id)
                          }
                          onDrop={(e) =>
                            handleDrop(e, "module", module.id, goal.id)
                          }
                        >
                          <div
                            className={`course-nav-child-header ${
                              selectedModule?.id === module.id ? "active" : ""
                            }`}
                            onClick={() => handleModuleSelect(module)}
                          >
                            <div className="course-nav-header-left">
                              {renderDragHandle("module", module, goal.id)}
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
                                    onClick={(e) =>
                                      saveEditModule(module.id, e)
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
                                <span className="course-nav-child-title">
                                  {module.name}
                                </span>
                              )}
                            </div>
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

                              {(topicsByModule[module.id] || []).map(
                                (topic, topicIndex) => (
                                  <div
                                    key={topic.id}
                                    className={`course-nav-grandchild ${
                                      dragOverItem?.type === "topic" &&
                                      dragOverItem?.id === topic.id
                                        ? "drag-over"
                                        : ""
                                    }`}
                                    onDragOver={(e) =>
                                      handleDragOver(
                                        e,
                                        "topic",
                                        topic.id,
                                        module.id
                                      )
                                    }
                                    onDrop={(e) =>
                                      handleDrop(
                                        e,
                                        "topic",
                                        topic.id,
                                        module.id
                                      )
                                    }
                                  >
                                    <div
                                      className={`course-nav-grandchild-header ${
                                        selectedTopic?.id === topic.id
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() => handleTopicSelect(topic)}
                                    >
                                      <div className="course-nav-header-left">
                                        {renderDragHandle(
                                          "topic",
                                          topic,
                                          module.id
                                        )}
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
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
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
                                      </div>
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
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <input
                                                type="text"
                                                value={newSubtopicName}
                                                onChange={(e) =>
                                                  setNewSubtopicName(
                                                    e.target.value
                                                  )
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
                                                onClick={() =>
                                                  setAddingTo(null)
                                                }
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
                                          (subtopic, subtopicIndex) => (
                                            <div
                                              key={subtopic.id}
                                              className={`course-nav-great-grandchild ${
                                                selectedSubtopic?.id ===
                                                subtopic.id
                                                  ? "active"
                                                  : ""
                                              } ${
                                                dragOverItem?.type ===
                                                  "subtopic" &&
                                                dragOverItem?.id === subtopic.id
                                                  ? "drag-over"
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                handleSubtopicSelect(subtopic)
                                              }
                                              onDragOver={(e) =>
                                                handleDragOver(
                                                  e,
                                                  "subtopic",
                                                  subtopic.id,
                                                  topic.id
                                                )
                                              }
                                              onDrop={(e) =>
                                                handleDrop(
                                                  e,
                                                  "subtopic",
                                                  subtopic.id,
                                                  topic.id
                                                )
                                              }
                                            >
                                              <div className="course-nav-header-left">
                                                {renderDragHandle(
                                                  "subtopic",
                                                  subtopic,
                                                  topic.id
                                                )}
                                                <FileText
                                                  size={12}
                                                  className="course-nav-icon subtopic"
                                                />
                                                {editingSubtopic ===
                                                subtopic.id ? (
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
                                              </div>
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
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )
                    )}
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

              {/* Conditional Rendering: Editor vs Dashboard vs Coding Practice */}
              {contentViewMode === "cheatsheet_editor" ? (
                <JavaCheatsheetEditor
                  subtopicId={selectedSubtopic.id}
                  initialData={contentToEdit}
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
              ) : contentViewMode === "coding_practice" ? (
                <JavaCodingPractice
                  subtopicId={selectedSubtopic.id}
                  practiceId={selectedPractice?.id}
                  onCancel={() => {
                    setContentViewMode("dashboard");
                    setSelectedPractice(null);
                  }}
                  onSuccess={() => {
                    setContentViewMode("dashboard");
                    setSelectedPractice(null);
                    fetchCodingPractices(selectedSubtopic.id);
                  }}
                />
              ) : (
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
                      <div className="course-stat">
                        <Code size={16} />
                        <span>
                          {
                            currentContent.filter(
                              (c) => c.content_type === "coding"
                            ).length
                          }{" "}
                          Coding
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

                    <div
                      className="course-action-card coding"
                      onClick={() => {
                        setSelectedPractice(null);
                        setContentViewMode("coding_practice");
                      }}
                    >
                      <div className="course-action-icon-wrapper">
                        <Code size={24} />
                      </div>
                      <div className="course-action-info">
                        <h4>Add Coding Practice</h4>
                        <p>Create multiple coding problems</p>
                      </div>
                      <Plus size={20} className="course-action-plus" />
                    </div>
                  </div>

                  {/* Coding Practices Section */}
                  {currentPractices.length > 0 && (
                    <div className="course-existing-content" style={{ marginTop: "2rem" }}>
                      <div className="course-content-header">
                        <h3>Coding Practices</h3>
                      </div>
                      <div className="course-content-grid list">
                        {currentPractices.map((practice) => (
                          <div
                            key={practice.id}
                            className="course-content-card"
                            onClick={() => {
                              setSelectedPractice(practice);
                              setContentViewMode("coding_practice");
                            }}
                          >
                            <div className="course-content-card-header">
                              <div className="course-content-header-left">
                                <Code className="course-content-icon coding" />
                              </div>
                              <div className="course-content-card-actions">
                                <button
                                  className="course-content-edit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPractice(practice);
                                    setContentViewMode("coding_practice");
                                  }}
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  className="course-content-delete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // TODO: delete practice
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="course-content-card-body">
                              <h4>{practice.title}</h4>
                              <span className="course-content-type">
                                {practice.description || "Coding Practice"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Existing Content */}
                  <div className="course-existing-content">
                    <div className="course-content-header">
                      <h3>Lesson Content</h3>
                      <div className="course-content-view-options">
                        <button
                          className={`view-mode-btn ${
                            viewMode === "grid" ? "active" : ""
                          }`}
                          onClick={() => setViewMode("grid")}
                        >
                          <Grid size={16} />
                        </button>
                        <button
                          className={`view-mode-btn ${
                            viewMode === "list" ? "active" : ""
                          }`}
                          onClick={() => setViewMode("list")}
                        >
                          <List size={16} />
                        </button>
                      </div>
                    </div>

                    {currentContent.length === 0 ? (
                      <div className="course-empty-content">
                        <FileText size={48} />
                        <p>No content added yet</p>
                        <span>
                          Start adding videos, cheatsheets, quizzes, or coding practices
                        </span>
                      </div>
                    ) : (
                      <div className={`course-content-grid ${viewMode}`}>
                        {currentContent.map((item, index) => (
                          <div
                            key={item.id}
                            className={`course-content-card ${
                              dragOverItem?.type === "content" &&
                              dragOverItem?.id === item.id
                                ? "drag-over"
                                : ""
                            }`}
                            draggable
                            onDragStart={(e) =>
                              handleDragStart(
                                "content",
                                item,
                                selectedSubtopic.id,
                                e
                              )
                            }
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) =>
                              handleDragOver(
                                e,
                                "content",
                                item.id,
                                selectedSubtopic.id
                              )
                            }
                            onDrop={(e) =>
                              handleDrop(
                                e,
                                "content",
                                item.id,
                                selectedSubtopic.id
                              )
                            }
                          >
                            <div className="course-content-card-header">
                              <div className="course-content-header-left">
                                <div className="course-drag-handle content-drag-handle">
                                  <GripVertical size={16} />
                                </div>
                                {getContentIcon(item.content_type)}
                              </div>
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
                                  item.mcq_title ||
                                  item.coding_title ||
                                  "Untitled"}
                              </h4>
                              <span className="course-content-type">
                                {item.content_type}
                              </span>
                              {(item.video_duration || item.time_limit) && (
                                <div className="course-content-meta">
                                  <Clock size={12} />
                                  <span>
                                    {item.video_duration || item.time_limit}{" "}
                                    mins
                                  </span>
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
        <JavaVideoUploadModal
          subtopicId={selectedSubtopic.id}
          editData={contentToEdit}
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
        <JavaMCQCreator
          subtopicId={selectedSubtopic.id}
          editData={contentToEdit}
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

export default JavaCourseManagement;