import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../SubtopicsPage/SubtopicPage.css";
import JavaClasses from "../Pages/javaClasses";
import JavaCheatSheet from "../Pages/javaCheatSheet";
import JavaMcqs from "../Pages/javaMcqs";
import JavaCodingPractice from "../Pages/javaCodingPractice";

const JavaSubtopicPage = () => {
  const { contentUuid, practiceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    completedContent,
    markJavaContentComplete,
    user,
    getJavaContentByUuid,
    getJavaCodingPractice,
    loadJavaAllStructure,
    javaGoals,
  } = useAuth();

  const [content, setContent] = useState(null);
  const [practice, setPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAccessible, setIsAccessible] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [goalModules, setGoalModules] = useState([]);
  const [isMobileContentVisible, setIsMobileContentVisible] = useState(false);

  const courseSelection = user?.courseSelection;
  const hasJavaAccess = courseSelection === "java_programming" || courseSelection === "all";

  const getContentType = (c) => {
    if (c.content_type) return c.content_type;
    if (c.video_title) return "video";
    if (c.cheatsheet_title) return "cheatsheet";
    if (c.mcq_title) return "mcq";
    if (c.coding_title) return "coding";
    return "video";
  };

  const checkIsItemCompleted = (item) => {
    if (!item) return false;
    const isInRx = completedContent.some((id) => String(id) === String(item.id));
    const isDb = item.is_completed === true || item.is_completed === 1;
    return isInRx || isDb;
  };

  const markAsCompleted = async () => {
    if (!content?.id || checkIsItemCompleted(content)) return;

    try {
      await markJavaContentComplete(content.id, selectedGoal?.id);

      const timestamp = Date.now();
      localStorage.setItem("lastProgressUpdate", timestamp.toString());

      const events = [
        new CustomEvent("subtopicCompleted", {
          detail: { subtopicId: content.id, timestamp, isJava: true },
        }),
        new CustomEvent("markSubtopicCompleted", {
          detail: { subtopicId: content.id, isJava: true },
        }),
      ];
      events.forEach((event) => window.dispatchEvent(event));

      setContent((prev) => ({ ...prev, is_completed: true }));
    } catch (err) {
      console.error("Error marking Java content complete:", err);
    }
  };

  useEffect(() => {
    if (!hasJavaAccess) {
      setError("Access denied");
      setIsAccessible(false);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        // 1. ALWAYS fetch the FULL content from backend so we have video_url, cheatsheet_content, etc.
        let fetchedContent = null;
        if (contentUuid) {
          const res = await getJavaContentByUuid(contentUuid);
          if (res?.success) {
            fetchedContent = res.data;
            fetchedContent.content_type = getContentType(fetchedContent);
            setContent(fetchedContent);
            setIsAccessible(true);
            setIsMobileContentVisible(true);
          } else {
            setError("Content not found");
            setIsAccessible(false);
          }
        } else if (practiceId) {
          const res = await getJavaCodingPractice(practiceId);
          if (res?.success) {
            setPractice(res.data);
            setIsAccessible(true);
            setIsMobileContentVisible(true);
          } else {
            setError("Practice not found");
            setIsAccessible(false);
          }
        }

        // 2. Load the sidebar structure if it isn't loaded yet
        let currentGoals = javaGoals;
        if (!currentGoals || currentGoals.length === 0) {
          const structRes = await loadJavaAllStructure();
          if (structRes?.success) currentGoals = structRes.data;
        }

        // 3. Setup the Sidebar UI state (Breadcrumbs & Expanding menus)
        if (location.state && location.state.moduleId) {
          // Fast Path: Used if user clicked from the course menu
          setSelectedGoal({ id: location.state.goalId, name: location.state.goalName || "Java Programming" });
          setSelectedModule({ id: location.state.moduleId, name: location.state.moduleName });
          setSelectedTopic({ id: location.state.topicId, name: location.state.topicName });
          setSelectedSubtopic({ id: location.state.subtopicId, name: location.state.subtopicName });
          setExpandedModule(location.state.moduleId);
          setExpandedTopic(location.state.topicId);

          if (currentGoals) {
            const g = currentGoals.find(g => g.id === location.state.goalId) || currentGoals[0];
            const m = g?.modules?.find(m => m.id === location.state.moduleId);
            if (m) setGoalModules([m]);
          }
        } else if (fetchedContent && currentGoals) {
          // Hard Refresh Path: User refreshed the page, rebuild sidebar from fetched IDs
          const g = currentGoals.find(g => g.id === fetchedContent.goal_id) || currentGoals[0];
          if (g) {
            setSelectedGoal(g);
            const m = g.modules?.find(m => m.id === fetchedContent.module_id);
            if (m) {
              setGoalModules([m]);
              setSelectedModule({ id: m.id, name: m.name });
              setExpandedModule(m.id);
              const t = m.topics?.find(t => t.id === fetchedContent.topic_id);
              if (t) {
                setSelectedTopic({ id: t.id, name: t.name });
                setExpandedTopic(t.id);
                const s = t.subtopics?.find(s => s.id === fetchedContent.subtopic_id);
                if (s) {
                  setSelectedSubtopic({ id: s.id, name: s.name });
                }
              }
            }
          }
        }
      } catch (err) {
        console.error("Load Error:", err);
        setError(err.message || "Failed to load content");
        setIsAccessible(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentUuid, practiceId, hasJavaAccess]);

  const handleTopicClick = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const handleSubtopicClick = (module, topic, subtopic, item) => {
    if (item.content_uuid) {
      const contentItem = { ...item };
      contentItem.content_type = getContentType(item);
      setIsMobileContentVisible(true);

      navigate(`/java/content/${item.content_uuid}`, {
        state: {
          goalId: selectedGoal?.id,
          goalName: selectedGoal?.name,
          moduleId: module.id,
          moduleName: module.name,
          topicId: topic.id,
          topicName: topic.name,
          subtopicId: subtopic.id,
          subtopicName: subtopic.name,
          fromCourse: true,
          isJava: true,
        },
      });
    } else if (item.id && item.title) {
      setIsMobileContentVisible(true);
      navigate(`/java/practice/${item.id}`, {
        state: {
          moduleId: module.id,
          moduleName: module.name,
          topicId: topic.id,
          topicName: topic.name,
          subtopicId: subtopic.id,
          subtopicName: subtopic.name,
          fromCourse: true,
          isJava: true,
        },
      });
    }
  };

  const renderContent = () => {
    if (content) {
      const props = {
        contentId: content.id,
        contentUuid: content.content_uuid,
        goalId: selectedGoal?.id || content.goal_id,
        moduleId: selectedModule?.id || content.module_id,
        topicId: selectedTopic?.id || content.topic_id,
        subtopicId: selectedSubtopic?.id || content.subtopic_id,
        onComplete: markAsCompleted,
        preLoadedContent: content,
      };
      switch (content.content_type) {
        case "video": return <JavaClasses {...props} />;
        case "cheatsheet": return <JavaCheatSheet {...props} />;
        case "mcq": return <JavaMcqs {...props} />;
        case "coding": return <JavaCodingPractice {...props} isSingleProblem={true} />;
        default: return <JavaClasses {...props} />;
      }
    }
    if (practice) {
      return <JavaCodingPractice practice={practice} onComplete={markAsCompleted} />;
    }
    return null;
  };

  if (loading) return (
    <div className="subtopic-page-sub">
      <div className="loading-container" style={{ width: "100%", padding: "50px" }}>
        <div className="spinner" />
        <p>Loading Java content...</p>
      </div>
    </div>
  );

  if (!hasJavaAccess || !isAccessible) {
    return (
      <div className="subtopic-page-sub">
        <div className="subtopic-page-sub__right-panel-sub" style={{ width: "100%" }}>
          <div className="not-found-con">
            <img src="/assets/img/locked_image.png" className="locked_image" alt="Access Denied" />
            <h2>Java Access Required</h2>
            <p>You don't have access to Java content.</p>
            <button className="upgrade-button" onClick={() => navigate("/profile")}>
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subtopic-page-sub java-subtopic-page">
      {/* LEFT PANEL */}
      <div className="subtopic-page-sub__left-panel-sub">
        {goalModules.length > 0 ? (
          <div className="subtopic-page-sub__navigation-sub">
            <h3 className="subtopic-page-sub__course-title-sub">
              {goalModules[0]?.name || "Java Programming"}
            </h3>
            {goalModules.map((module) =>
              module.topics?.map((topic) => (
                <div key={topic.id} className="subtopic-page-sub__module-section-sub">
                  <h4
                    className={`subtopic-page-sub__module-title-sub ${
                      expandedTopic === topic.id ? "subtopic-page-sub__module-title-sub--active" : ""
                    }`}
                    onClick={() => handleTopicClick(topic.id)}
                  >
                    {topic.name}
                  </h4>
                  {expandedTopic === topic.id &&
                    topic.subtopics?.map((subtopic) => (
                      <div key={subtopic.id}>
                        {subtopic.content?.map((c) => {
                          const isActive = content && (String(c.id) === String(content.id) || c.content_uuid === content.content_uuid);
                          const isCompleted = checkIsItemCompleted(c);
                          return (
                            <div
                              className={`subtopic-page-sub__topics-sub`}
                              key={`content-${c.id}`}
                            >
                              <div
                                className={`subtopic-page-sub__item-sub ${isActive ? "active-sub" : ""} ${isCompleted ? "completed-sub" : ""}`}
                                onClick={() => handleSubtopicClick(module, topic, subtopic, c)}
                              >
                                <span className="subtopic-page-sub__item-text-sub">
                                  {c.video_title || c.cheatsheet_title || c.mcq_title || c.coding_title || subtopic.name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        {subtopic.coding_practices?.map((p) => {
                          const isActive = practice && p.id === practice.id;
                          const isCompleted = p.is_completed;
                          return (
                            <div className="subtopic-page-sub__topics-sub" key={`practice-${p.id}`}>
                              <div
                                className={`subtopic-page-sub__item-sub practice-item ${isActive ? "active-sub" : ""} ${isCompleted ? "completed-sub" : ""}`}
                                onClick={() => handleSubtopicClick(module, topic, subtopic, p)}
                              >
                                <span className="subtopic-page-sub__item-text-sub">
                                  {p.title}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                </div>
              ))
            )}
          </div>
        ) : (
         <div className="no-content-placeholder">
           <p>Select a topic from the courses page to start learning</p>
         </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className={`subtopic-page-sub__right-panel-sub ${isMobileContentVisible ? "mobile-visible" : ""}`}>
        <button className="mobile-back-button" onClick={() => setIsMobileContentVisible(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Topics
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default JavaSubtopicPage;