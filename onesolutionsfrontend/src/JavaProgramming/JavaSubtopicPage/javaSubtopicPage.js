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

  const courseSelection = user?.courseSelection || "web_development";
  const hasJavaAccess = courseSelection === "web_development" || courseSelection === "all";

  const checkIsItemCompleted = (item) => {
    if (!item) return false;
    return completedContent.some((id) => String(id) === String(item.id)) || item.is_completed === true;
  };

  const markAsCompleted = async () => {
    if (!content?.id || checkIsItemCompleted(content)) return;
    try {
      await markJavaContentComplete(content.id, selectedGoal?.id);
      setContent(prev => ({ ...prev, is_completed: true }));
      window.dispatchEvent(new CustomEvent("subtopicCompleted", { detail: { subtopicId: content.id } }));
    } catch (err) {
      console.error("Error marking Java content complete:", err);
    }
  };

  const getContentType = (c) => c.content_type || (c.video_title ? "video" : c.cheatsheet_title ? "cheatsheet" : c.mcq_title ? "mcq" : "coding");

  // Load data based on route
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
        if (contentUuid) {
          const res = await getJavaContentByUuid(contentUuid);
          if (res?.success) {
            const c = res.data;
            c.content_type = getContentType(c);
            setContent(c);
            setIsAccessible(true);
            setIsMobileContentVisible(true);
            if (c.goal_id) setSelectedGoal({ id: c.goal_id });
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
            // practice.goal_id etc may be in the response
          } else {
            setError("Practice not found");
            setIsAccessible(false);
          }
        }
      } catch (err) {
        setError(err.message);
        setIsAccessible(false);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [contentUuid, practiceId, hasJavaAccess]);

  // After data loaded, load full structure to get sidebar
  useEffect(() => {
    if (javaGoals.length === 0) {
      loadJavaAllStructure().catch(console.error);
    }
  }, []);

  // Find module/topic/subtopic from content
  useEffect(() => {
    if (!content || !javaGoals.length) return;
    for (const goal of javaGoals) {
      for (const module of goal.modules || []) {
        for (const topic of module.topics || []) {
          for (const subtopic of topic.subtopics || []) {
            const found = subtopic.content?.find(c => String(c.id) === String(content.id) || c.content_uuid === content.content_uuid);
            if (found) {
              setSelectedGoal(goal);
              setSelectedModule({ id: module.id, name: module.name });
              setSelectedTopic({ id: topic.id, name: topic.name });
              setSelectedSubtopic({ id: subtopic.id, name: subtopic.name });
              setExpandedModule(module.id);
              setExpandedTopic(topic.id);
              setGoalModules([module]);
              return;
            }
          }
        }
      }
    }
  }, [content, javaGoals]);

  // Find module/topic/subtopic from practice
  useEffect(() => {
    if (!practice || !javaGoals.length) return;
    // practice contains subtopic_id? maybe not, but we can assume it's passed via state
    if (location.state?.moduleId) {
      setSelectedModule({ id: location.state.moduleId, name: location.state.moduleName });
      setSelectedTopic({ id: location.state.topicId, name: location.state.topicName });
      setSelectedSubtopic({ id: location.state.subtopicId, name: location.state.subtopicName });
      setExpandedModule(location.state.moduleId);
      setExpandedTopic(location.state.topicId);
      // Find the module in goals
      for (const goal of javaGoals) {
        const mod = goal.modules?.find(m => m.id === location.state.moduleId);
        if (mod) {
          setSelectedGoal(goal);
          setGoalModules([mod]);
          break;
        }
      }
    }
  }, [practice, javaGoals, location.state]);

  const renderContent = () => {
    if (content) {
      const props = {
        contentId: content.id,
        contentUuid: content.content_uuid,
        goalId: selectedGoal?.id,
        moduleId: selectedModule?.id,
        topicId: selectedTopic?.id,
        subtopicId: selectedSubtopic?.id,
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

  const handleSubtopicClick = (module, topic, subtopic, item) => {
    if (item.content_uuid) {
      navigate(`/java/content/${item.content_uuid}`, {
        state: { ...location.state, ...item, module, topic, subtopic }
      });
    } else if (item.id && item.title) { // it's a practice
      navigate(`/java/practice/${item.id}`, {
        state: { ...location.state, practice: item, module, topic, subtopic }
      });
    }
    setIsMobileContentVisible(true);
  };

  if (loading) return <div className="subtopic-page-sub"><div className="spinner" /></div>;
  if (!hasJavaAccess || !isAccessible) {
    return (
      <div className="subtopic-page-sub">
        <div className="not-found-con">
          <img src="/assets/img/locked_image.png" className="locked_image" alt="Access Denied" />
          <h2>Java Access Required</h2>
          <button onClick={() => navigate("/profile")}>Upgrade</button>
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
                    className={`subtopic-page-sub__module-title-sub ${expandedTopic === topic.id ? "active" : ""}`}
                    onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
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
                              className={`subtopic-page-sub__item-sub ${isActive ? "active-sub" : ""} ${isCompleted ? "completed-sub" : ""}`}
                              key={c.id}
                              onClick={() => handleSubtopicClick(module, topic, subtopic, c)}
                            >
                              <span className="subtopic-page-sub__item-text-sub">
                                {c.video_title || c.cheatsheet_title || c.mcq_title || c.coding_title || subtopic.name}
                              </span>
                            </div>
                          );
                        })}
                        {subtopic.coding_practices?.map((p) => {
                          const isActive = practice && p.id === practice.practice?.id;
                          const isCompleted = p.is_completed;
                          return (
                            <div
                              className={`subtopic-page-sub__item-sub practice-item ${isActive ? "active-sub" : ""} ${isCompleted ? "completed-sub" : ""}`}
                              key={p.id}
                              onClick={() => handleSubtopicClick(module, topic, subtopic, p)}
                            >
                              <span className="subtopic-page-sub__item-text-sub">
                                {p.title} (Practice)
                              </span>
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
          <p>Select a topic from the courses page</p>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className={`subtopic-page-sub__right-panel-sub ${isMobileContentVisible ? "mobile-visible" : ""}`}>
        <button className="mobile-back-button" onClick={() => setIsMobileContentVisible(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to Topics
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default JavaSubtopicPage;