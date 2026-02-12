import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Plus,
  Video,
  FileText,
  HelpCircle,
  Edit,
  Trash2,
  File,
  Layers,
  BookOpen,
  Target,
  MoreVertical,
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
  
  const [modulesByGoal, setModulesByGoal] = useState({});
  const [topicsByModule, setTopicsByModule] = useState({});
  const [subtopicsByTopic, setSubtopicsByTopic] = useState({});
  const [contentBySubtopic, setContentBySubtopic] = useState({});

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  // Modals for Video and MCQ remain (as requested), Cheatsheet is now inline
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMCQModal, setShowMCQModal] = useState(false);

  // NEW: View State to toggle between "Viewing Content" and "Creating Cheatsheet"
  const [viewState, setViewState] = useState("view"); // "view" | "create_cheatsheet"

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

  const [activeMenu, setActiveMenu] = useState(null);
  const [addingTo, setAddingTo] = useState(null);
  
  const [loadingStates, setLoadingStates] = useState({
    modules: {},
    topics: {},
    subtopics: {},
    content: {}
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

  // --- Reset View State when changing subtopics ---
  useEffect(() => {
    setViewState("view");
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
    setLoadingStates(prev => ({ ...prev, modules: { ...prev.modules, [goalId]: true } }));
    try {
      const res = await fetch(`https://api.onesolutionsekam.in/api/admin/course/goals/${goalId}/modules`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
      const data = await res.json();
      setModulesByGoal(prev => ({ ...prev, [goalId]: data.data || [] }));
    } catch (error) { console.error(error); } 
    finally { setLoadingStates(prev => ({ ...prev, modules: { ...prev.modules, [goalId]: false } })); }
  };

  const fetchTopics = async (moduleId) => {
    if (loadingStates.topics[moduleId]) return;
    setLoadingStates(prev => ({ ...prev, topics: { ...prev.topics, [moduleId]: true } }));
    try {
      const res = await fetch(`https://api.onesolutionsekam.in/api/admin/course/modules/${moduleId}/topics`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
      const data = await res.json();
      setTopicsByModule(prev => ({ ...prev, [moduleId]: data.data || [] }));
    } catch (error) { console.error(error); } 
    finally { setLoadingStates(prev => ({ ...prev, topics: { ...prev.topics, [moduleId]: false } })); }
  };

  const fetchSubtopics = async (topicId) => {
    if (loadingStates.subtopics[topicId]) return;
    setLoadingStates(prev => ({ ...prev, subtopics: { ...prev.subtopics, [topicId]: true } }));
    try {
      const res = await fetch(`https://api.onesolutionsekam.in/api/admin/course/topics/${topicId}/subtopics`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
      const data = await res.json();
      setSubtopicsByTopic(prev => ({ ...prev, [topicId]: data.data || [] }));
    } catch (error) { console.error(error); } 
    finally { setLoadingStates(prev => ({ ...prev, subtopics: { ...prev.subtopics, [topicId]: false } })); }
  };

  const fetchContent = async (subtopicId) => {
    if (loadingStates.content[subtopicId]) return;
    setLoadingStates(prev => ({ ...prev, content: { ...prev.content, [subtopicId]: true } }));
    try {
      const res = await fetch(`https://api.onesolutionsekam.in/api/admin/course/subtopics/${subtopicId}/content`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
      const data = await res.json();
      setContentBySubtopic(prev => ({ ...prev, [subtopicId]: data.data || [] }));
    } catch (error) { console.error(error); } 
    finally { setLoadingStates(prev => ({ ...prev, content: { ...prev.content, [subtopicId]: false } })); }
  };

  // ... (Keep existing selection handlers: handleGoalSelect, handleModuleSelect, etc.)
  const handleGoalSelect = async (goal) => {
    if (editingGoal) return;
    const newExpandedState = !expandedGoals[goal.id];
    setExpandedGoals({ ...expandedGoals, [goal.id]: newExpandedState });
    if (newExpandedState) {
      setSelectedGoal(goal);
      await fetchModules(goal.id);
    } else if (selectedGoal?.id === goal.id) {
        setSelectedGoal(null); setSelectedModule(null); setSelectedTopic(null); setSelectedSubtopic(null);
    }
  };

  const handleModuleSelect = async (module) => {
    if (editingModule) return;
    const newExpandedState = !expandedModules[module.id];
    setExpandedModules({ ...expandedModules, [module.id]: newExpandedState });
    if (newExpandedState) {
      setSelectedModule(module);
      await fetchTopics(module.id);
    } else if (selectedModule?.id === module.id) {
        setSelectedModule(null); setSelectedTopic(null); setSelectedSubtopic(null);
    }
  };

  const handleTopicSelect = async (topic) => {
    if (editingTopic) return;
    const newExpandedState = !expandedTopics[topic.id];
    setExpandedTopics({ ...expandedTopics, [topic.id]: newExpandedState });
    if (newExpandedState) {
      setSelectedTopic(topic);
      await fetchSubtopics(topic.id);
    } else if (selectedTopic?.id === topic.id) {
        setSelectedTopic(null); setSelectedSubtopic(null);
    }
  };

  const handleSubtopicSelect = (subtopic) => {
    if (editingSubtopic) return;
    setSelectedSubtopic(subtopic);
    fetchContent(subtopic.id);
    setViewState("view"); // Reset to view mode when selecting a new subtopic
  };

  // ... (Keep existing toggleMenu, handleMenuAction, CRUD create functions) ...
  const toggleMenu = (type, id, e) => {
    e.stopPropagation();
    if (activeMenu?.type === type && activeMenu?.id === id) setActiveMenu(null);
    else setActiveMenu({ type, id });
  };

  const handleMenuAction = async (action, type, item, e) => { /* ... existing code ... */ 
      // Ensure you copy the logic from the previous file or keep it if using a partial update
      e.stopPropagation();
      setActiveMenu(null);
      // ... implementation
  };

  // ... (Keep createGoal, createModule, createTopic, createSubtopic) ...
  const createGoal = async () => { /* ... existing code ... */ };
  const createModule = async () => { /* ... existing code ... */ };
  const createTopic = async () => { /* ... existing code ... */ };
  const createSubtopic = async () => { /* ... existing code ... */ };
  
  // ... (Keep Edit/Delete functions for Goal, Module, Topic, Subtopic) ...
  const startEditGoal = (goal, e) => { setEditingGoal(goal.id); setEditGoalName(goal.name); };
  const saveEditGoal = async (goalId, e) => { /* ... existing code ... */ };
  const deleteGoal = async (goalId, e) => { /* ... existing code ... */ };
  
  // (Assuming similar functions for Module, Topic, Subtopic exist as per previous file)
  const startEditModule = (m, e) => { setEditingModule(m.id); setEditModuleName(m.name); };
  const saveEditModule = async (id, e) => { /* ... */ };
  const deleteModule = async (id, e) => { /* ... */ };
  
  const startEditTopic = (t, e) => { setEditingTopic(t.id); setEditTopicName(t.name); };
  const saveEditTopic = async (id, e) => { /* ... */ };
  const deleteTopic = async (id, e) => { /* ... */ };

  const startEditSubtopic = (s, e) => { setEditingSubtopic(s.id); setEditSubtopicName(s.name); };
  const saveEditSubtopic = async (id, e) => { /* ... */ };
  const deleteSubtopic = async (id, e) => { /* ... */ };

  const startEditContent = (contentItem, e) => {
    e.stopPropagation();
    setEditingContent(contentItem.id);
    setEditContentTitle(contentItem.video_title || contentItem.cheatsheet_title || contentItem.mcq_title);
  };

  const saveEditContent = async (contentId, e) => {
    /* ... existing save content logic ... */
    e.stopPropagation();
    if (!editContentTitle.trim()) return;
    // ... fetch implementation
  };

  const deleteContent = async (contentId, e) => {
    /* ... existing delete content logic ... */
    e.stopPropagation();
    if (!window.confirm("Delete content?")) return;
    // ... fetch implementation
  };

  const cancelEdit = (e) => {
    if (e) e.stopPropagation();
    setEditingGoal(null); setEditingModule(null); setEditingTopic(null); setEditingSubtopic(null); setEditingContent(null); setAddingTo(null);
  };

  const getContentIcon = (type) => {
    switch (type) {
      case "video": return <Video className="course-content-icon video" />;
      case "cheatsheet": return <FileText className="course-content-icon cheatsheet" />;
      case "mcq": return <HelpCircle className="course-content-icon mcq" />;
      default: return <File className="course-content-icon" />;
    }
  };

  // Helper for menu rendering (Keep existing)
  const renderActionMenu = (type, item) => {
      // ... existing implementation
      const isEditing = (type === "goal" && editingGoal === item.id) || 
                        (type === "module" && editingModule === item.id) ||
                        (type === "topic" && editingTopic === item.id) ||
                        (type === "subtopic" && editingSubtopic === item.id);
      if (isEditing) return null;
      const isOpen = activeMenu?.type === type && activeMenu?.id === item.id;
      return (
        <div className="course-menu-wrapper">
          <button className={`course-menu-btn ${isOpen ? "active" : ""}`} onClick={(e) => toggleMenu(type, item.id, e)}>
            <MoreVertical size={16} />
          </button>
          {isOpen && (
            <div className="course-menu-dropdown">
              {type !== "subtopic" && (
                <div className="course-menu-item" onClick={(e) => handleMenuAction("add", type, item, e)}>
                  <Plus size={14} /><span>Add {type === "goal" ? "Module" : type === "module" ? "Topic" : "Subtopic"}</span>
                </div>
              )}
              <div className="course-menu-item" onClick={(e) => handleMenuAction("edit", type, item, e)}>
                <Edit size={14} /><span>Rename</span>
              </div>
              <div className="course-menu-item delete" onClick={(e) => handleMenuAction("delete", type, item, e)}>
                <Trash2 size={14} /><span>Delete</span>
              </div>
            </div>
          )}
        </div>
      );
  };

  const currentContent = selectedSubtopic ? (contentBySubtopic[selectedSubtopic.id] || []) : [];

  return (
    <div className="course-container">
      <div className="course-main">
        {/* Left Sidebar - Hierarchical Navigation (SAME AS BEFORE) */}
        <div className="course-sidebar">
          {/* ... Header and Goal/Module/Topic/Subtopic Tree ... */}
          <div className="course-sidebar-header">
            <div className="left-header-course course-add-goal">
              <div className="course-tooltip-wrapper">
                <h3>DM Curriculum</h3>
                <span className="course-tooltip" style={{marginLeft: "15px"}}>Digital Marketing Curriculum</span>
              </div>
              <div className="course-tooltip-wrapper">
                <button onClick={() => setAddingTo({ type: "root" })}><Plus size={16} /></button>
                <span className="course-tooltip">New Goal</span>
              </div>
            </div>
            {addingTo?.type === "root" && (
              <div className="course-add-child" onClick={(e) => e.stopPropagation()}>
                <input type="text" value={newGoalName} onChange={(e) => setNewGoalName(e.target.value)} placeholder="Add goal..." onKeyPress={(e) => e.key === "Enter" && createGoal()} autoFocus />
                <button onClick={createGoal}><Check size={14} /></button>
                <button onClick={() => setAddingTo(null)} className="course-cancel-btn-small" style={{ background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: 4, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} /></button>
              </div>
            )}
          </div>
          <div className="course-navigation">
             {goals.map((goal) => (
                 /* ... Render Tree Logic (Same as original) ... */
                 <div key={goal.id} className="course-nav-item">
                    {/* Goal Header */}
                    <div className={`course-nav-header ${selectedGoal?.id === goal.id ? "active" : ""}`} onClick={() => handleGoalSelect(goal)}>
                        <div className="course-nav-header-left">
                            <Target size={18} className="course-nav-icon goal" />
                            {/* ... Edit Logic ... */}
                            <span className="course-nav-title">{goal.name}</span>
                        </div>
                        <div className="course-nav-actions">
                            {renderActionMenu("goal", goal)}
                            <ChevronRight size={16} className={`course-nav-arrow ${expandedGoals[goal.id] ? "expanded" : ""}`} />
                        </div>
                    </div>
                    {/* ... Render Children (Modules/Topics/Subtopics) - Logic identical to provided file ... */}
                    {expandedGoals[goal.id] && (
                        <div className="course-nav-children">
                            {/* Loop Modules */}
                            {(modulesByGoal[goal.id] || []).map((module) => (
                                <div key={module.id} className="course-nav-child">
                                     <div className={`course-nav-child-header ${selectedModule?.id === module.id ? "active" : ""}`} onClick={() => handleModuleSelect(module)}>
                                         <Layers size={16} className="course-nav-icon module" />
                                         <span className="course-nav-child-title">{module.name}</span>
                                         <div className="course-nav-actions">
                                             {renderActionMenu("module", module)}
                                             <ChevronRight size={14} className={`course-nav-arrow ${expandedModules[module.id] ? "expanded" : ""}`} />
                                         </div>
                                     </div>
                                     {expandedModules[module.id] && (
                                         <div className="course-nav-grandchildren">
                                             {(topicsByModule[module.id] || []).map((topic) => (
                                                 <div key={topic.id} className="course-nav-grandchild">
                                                      <div className={`course-nav-grandchild-header ${selectedTopic?.id === topic.id ? "active" : ""}`} onClick={() => handleTopicSelect(topic)}>
                                                          <File size={14} className="course-nav-icon topic" />
                                                          <span className="course-nav-grandchild-title">{topic.name}</span>
                                                          <div className="course-nav-actions">
                                                              {renderActionMenu("topic", topic)}
                                                              <ChevronRight size={12} className={`course-nav-arrow ${expandedTopics[topic.id] ? "expanded" : ""}`} />
                                                          </div>
                                                      </div>
                                                      {expandedTopics[topic.id] && (
                                                          <div className="course-nav-great-grandchildren">
                                                              {(subtopicsByTopic[topic.id] || []).map((subtopic) => (
                                                                  <div key={subtopic.id} 
                                                                       className={`course-nav-great-grandchild ${selectedSubtopic?.id === subtopic.id ? "active" : ""}`} 
                                                                       onClick={() => handleSubtopicSelect(subtopic)}>
                                                                      <FileText size={12} className="course-nav-icon subtopic" />
                                                                      <span>{subtopic.name}</span>
                                                                      <div className="course-nav-actions">{renderActionMenu("subtopic", subtopic)}</div>
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
                <span className="course-breadcrumb-item"><Target size={14} />{selectedGoal?.name}</span>
                <ChevronRight size={14} className="course-breadcrumb-separator" />
                <span className="course-breadcrumb-item"><Layers size={14} />{selectedModule?.name}</span>
                <ChevronRight size={14} className="course-breadcrumb-separator" />
                <span className="course-breadcrumb-item"><File size={14} />{selectedTopic?.name}</span>
                <ChevronRight size={14} className="course-breadcrumb-separator" />
                <span className="course-breadcrumb-item active"><FileText size={14} />{selectedSubtopic?.name}</span>
              </div>

              {/* === CONDITIONAL RENDERING: View Mode vs Create Cheatsheet Mode === */}
              {viewState === "create_cheatsheet" ? (
                // INLINE NOTEPAD EDITOR
                <CheatsheetEditor 
                    subtopicId={selectedSubtopic.id}
                    onCancel={() => setViewState("view")}
                    onSuccess={() => {
                        setViewState("view");
                        fetchContent(selectedSubtopic.id);
                    }}
                />
              ) : (
                // STANDARD VIEW DASHBOARD
                <>
                  {/* Subtopic Header */}
                  <div className="course-subtopic-header">
                    <div className="course-subtopic-title-wrapper">
                      <h2 className="course-subtopic-title">{selectedSubtopic.name}</h2>
                      <button className="course-edit-btn" onClick={(e) => startEditSubtopic(selectedSubtopic, e)}>
                        <Edit size={16} />
                      </button>
                    </div>
                    <div className="course-content-stats">
                      <div className="course-stat"><Video size={16} /><span>{currentContent.filter((c) => c.content_type === "video").length} Videos</span></div>
                      <div className="course-stat"><FileText size={16} /><span>{currentContent.filter((c) => c.content_type === "cheatsheet").length} Cheatsheets</span></div>
                      <div className="course-stat"><HelpCircle size={16} /><span>{currentContent.filter((c) => c.content_type === "mcq").length} Quizzes</span></div>
                    </div>
                  </div>

                  {/* Content Actions */}
                  <div className="course-action-cards">
                    <div className="course-action-card video" onClick={() => setShowVideoModal(true)}>
                      <div className="course-action-icon-wrapper"><Video size={24} /></div>
                      <div className="course-action-info"><h4>Add Video</h4><p>Upload lecture videos</p></div>
                      <Plus size={20} className="course-action-plus" />
                    </div>

                    {/* CLICKING THIS SWITCHES TO INLINE EDITOR */}
                    <div className="course-action-card cheatsheet" onClick={() => setViewState("create_cheatsheet")}>
                      <div className="course-action-icon-wrapper"><FileText size={24} /></div>
                      <div className="course-action-info"><h4>Add Cheatsheet</h4><p>Create quick reference guides</p></div>
                      <Plus size={20} className="course-action-plus" />
                    </div>

                    <div className="course-action-card quiz" onClick={() => setShowMCQModal(true)}>
                      <div className="course-action-icon-wrapper"><HelpCircle size={24} /></div>
                      <div className="course-action-info"><h4>Add Quiz</h4><p>Create assessments</p></div>
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
                        <span>Start adding videos, cheatsheets, or quizzes</span>
                      </div>
                    ) : (
                      <div className={`course-content-grid ${viewMode}`}>
                        {currentContent.map((item) => (
                          <div key={item.id} className="course-content-card">
                            <div className="course-content-card-header">
                              {getContentIcon(item.content_type)}
                              <div className="course-content-card-actions">
                                {/* Edit/Delete buttons (implementation same as provided) */}
                                <button className="course-content-edit"><Edit size={14} /></button>
                                <button className="course-content-delete" onClick={(e) => deleteContent(item.id, e)}><Trash2 size={14} /></button>
                              </div>
                            </div>
                            <div className="course-content-card-body">
                              <h4>{item.video_title || item.cheatsheet_title || item.mcq_title}</h4>
                              <span className="course-content-type">{item.content_type}</span>
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
            // Empty State when no subtopic selected
            <div className="course-empty-state">
              <div className="course-empty-icon"><BookOpen size={64} /></div>
              <h3>Select a subtopic to begin</h3>
              <p>Choose a subtopic from the navigation tree to view and manage its content</p>
            </div>
          )}
        </div>
      </div>

      {/* Other Modals */}
      {showVideoModal && selectedSubtopic && (
        <VideoUploadModal subtopicId={selectedSubtopic.id} onClose={() => setShowVideoModal(false)} onSuccess={() => { setShowVideoModal(false); fetchContent(selectedSubtopic.id); }} />
      )}
      {showMCQModal && selectedSubtopic && (
        <MCQCreator subtopicId={selectedSubtopic.id} onClose={() => setShowMCQModal(false)} onSuccess={() => { setShowMCQModal(false); fetchContent(selectedSubtopic.id); }} />
      )}
    </div>
  );
};

export default CourseManagement;