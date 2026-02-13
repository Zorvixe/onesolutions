import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import "../../SubtopicsPage/SubtopicPage.css";
import DigitalClasses from "../Pages/digitalClasses.js";
import DigitalCheatsheet from "../Pages/digitalCheatSheet.js";
import DigitalMcqs from "../Pages/digitalMcqs.js";

const DigitalSubtopicPage = () => {
  const { contentUuid } = useParams();
  const {
    completedContent,
    markSubtopicComplete,
    user,
    getContentByUuid,
    loadDigitalMarketingAllStructure,
  } = useAuth();

  const [content, setContent] = useState(null);
  const [selectedSubtopicSub, setSelectedSubtopicSub] = useState(null);
  const [selectedModuleSub, setSelectedModuleSub] = useState(null);
  const [selectedTopicSub, setSelectedTopicSub] = useState(null);
  const [selectedGoalSub, setSelectedGoalSub] = useState(null);
  const [expandedModuleSub, setExpandedModuleSub] = useState(null);
  const [expandedTopicSub, setExpandedTopicSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navigationStructure, setNavigationStructure] = useState([]);
  const [isAccessible, setIsAccessible] = useState(true);
  const [goalModules, setGoalModules] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const courseSelection = user?.courseSelection || "web_development";

  const hasDigitalAccess =
    courseSelection === "web_development" ||
    courseSelection === "digital_marketing" ||
    courseSelection === "all";

  const markAsCompleted = async () => {
    if (!content?.id || isSubtopicCompleted()) {
      return;
    }

    try {
      await markSubtopicComplete(
        content.id,
        selectedGoalSub?.id,
        selectedModuleSub?.id,
        selectedSubtopicSub?.id
      );

      const timestamp = Date.now();
      localStorage.setItem("lastProgressUpdate", timestamp.toString());

      const events = [
        new CustomEvent("subtopicCompleted", {
          detail: { subtopicId: content.id, timestamp, isDigital: true },
        }),
        new CustomEvent("markSubtopicCompleted", {
          detail: { subtopicId: content.id, isDigital: true },
        }),
      ];

      events.forEach((event) => {
        window.dispatchEvent(event);
      });

      // Update local state to reflect completion immediately
      setContent((prev) => ({ ...prev, is_completed: true }));
    } catch (error) {
      console.error("Error marking digital content as completed:", error);
    }
  };

  const isSubtopicCompleted = () => {
    if (content) {
      return completedContent.includes(content.id) || content.is_completed;
    }
    return false;
  };

  const getContentType = (contentData) => {
    if (contentData.content_type) {
      return contentData.content_type;
    }
    // Fallback detection
    if (contentData.cheatsheet_title) return "cheatsheet";
    if (contentData.mcq_title) return "mcq";
    return "video";
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case "video":
        return "🎬 ";
      case "cheatsheet":
        return "📘 ";
      case "mcq":
        return "📝 ";
      default:
        return "📄 ";
    }
  };

  useEffect(() => {
    if (!hasDigitalAccess) {
      setError("You don't have access to Digital Marketing content.");
      setIsAccessible(false);
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Try to load from state first (navigation click)
        if (location.state && location.state.contentItem) {
          const contentFromState = location.state.contentItem;

          setContent(contentFromState);
          setIsAccessible(true);

          // Set navigation context
          if (location.state.goalId)
            setSelectedGoalSub({
              id: location.state.goalId,
              name: location.state.goalName,
            });
          if (location.state.moduleId)
            setSelectedModuleSub({
              id: location.state.moduleId,
              name: location.state.moduleName,
            });
          if (location.state.topicId)
            setSelectedTopicSub({
              id: location.state.topicId,
              name: location.state.topicName,
            });
          if (location.state.subtopicId)
            setSelectedSubtopicSub({
              id: location.state.subtopicId,
              name: location.state.subtopicName,
            });

          // Load sidebar structure
          await loadCourseStructure(
            location.state.goalId || contentFromState.goal_id
          );
          setLoading(false);
          return;
        }

        // 2. If no state, fetch by UUID (URL direct access/refresh)
        if (contentUuid) {
          const response = await getContentByUuid(contentUuid);

          if (response?.success) {
            const contentData = response.data;
            // Ensure type is set
            contentData.content_type =
              contentData.content_type || getContentType(contentData);

            setContent(contentData);
            setIsAccessible(true);

            if (contentData.goal_id) {
              setSelectedGoalSub({ id: contentData.goal_id });
              await loadCourseStructure(contentData.goal_id);

              if (contentData.module_id)
                setSelectedModuleSub({ id: contentData.module_id });
              if (contentData.topic_id)
                setSelectedTopicSub({ id: contentData.topic_id });
              if (contentData.subtopic_id)
                setSelectedSubtopicSub({ id: contentData.subtopic_id });
            }
          } else {
            setError("Content not found");
            setIsAccessible(false);
          }
        }
      } catch (err) {
        console.error("Error loading digital content:", err);
        setError(err.message || "Failed to load content");
        setIsAccessible(false);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentUuid, hasDigitalAccess, location.state]);

  const loadCourseStructure = async (goalId) => {
    if (!goalId) return;
    try {
      const structureResponse = await loadDigitalMarketingAllStructure();
      if (structureResponse?.success && structureResponse.data) {
        const goalData = structureResponse.data.find(
          (g) => g.id === parseInt(goalId)
        );
        if (goalData && goalData.modules) {
          setGoalModules(goalData.modules);
          if (goalData.modules.length > 0 && !expandedModuleSub) {
            // Only auto-expand if not already set
            setExpandedModuleSub(goalData.modules[0].id);
          }
        }
      }
    } catch (err) {
      console.error("Error loading course structure:", err);
    }
  };

  const renderContentComponent = () => {
    if (!content || !isAccessible) return null;

    const contentType = getContentType(content);

    // Common props for all viewers
    const commonProps = {
      contentId: content.id,
      contentUuid: content.content_uuid,
      goalId: selectedGoalSub?.id || content.goal_id,
      moduleId: selectedModuleSub?.id || content.module_id,
      topicId: selectedTopicSub?.id || content.topic_id,
      subtopicId: selectedSubtopicSub?.id || content.subtopic_id,
      onComplete: markAsCompleted,
      preLoadedContent: content, // Pass full content to avoid re-fetch
    };

    switch (contentType) {
      case "video":
        return <DigitalClasses {...commonProps} />;
      case "cheatsheet":
        return <DigitalCheatsheet {...commonProps} />;
      case "mcq":
        return <DigitalMcqs {...commonProps} />;
      default:
        // Default to video if unknown, but handle gracefully
        return <DigitalClasses {...commonProps} />;
    }
  };

  const handleModuleClick = (moduleId) => {
    setExpandedModuleSub(expandedModuleSub === moduleId ? null : moduleId);
    setExpandedTopicSub(null);
  };

  const handleTopicClick = (topicId) => {
    setExpandedTopicSub(expandedTopicSub === topicId ? null : topicId);
  };

  const handleSubtopicClick = (module, topic, subtopic, contentItem) => {
    if (!contentItem || !contentItem.content_uuid) return;

    // Determine type before navigation
    let contentType = contentItem.content_type;
    if (!contentType) {
      if (contentItem.cheatsheet_title) contentType = "cheatsheet";
      else if (contentItem.mcq_title) contentType = "mcq";
      else contentType = "video";
    }
    contentItem.content_type = contentType;

    navigate(`/digital/content/${contentItem.content_uuid}`, {
      state: {
        contentItem: contentItem, // Pass the whole object!
        goalId: selectedGoalSub?.id,
        goalName: selectedGoalSub?.name,
        moduleId: module.id,
        moduleName: module.name,
        topicId: topic.id,
        topicName: topic.name,
        subtopicId: subtopic.id,
        subtopicName: subtopic.name,
        fromCourse: true,
        isDigital: true,
      },
    });
  };

  if (loading) {
    return (
      <div className="subtopic-page-sub">
        <div
          className="loading-container"
          style={{ width: "100%", padding: "50px" }}
        >
          <div className="spinner"></div>
          <p>Loading digital marketing content...</p>
        </div>
      </div>
    );
  }

  if (!hasDigitalAccess || !isAccessible) {
    return (
      <div className="subtopic-page-sub">
        <div
          className="subtopic-page-sub__right-panel-sub"
          style={{ width: "100%" }}
        >
          <div className="not-found-con">
            <img
              src="/assets/img/locked_image.png"
              className="locked_image"
              alt="Access Denied"
            />
            <h2>Digital Marketing Access Required</h2>
            <p>You don't have access to Digital Marketing content.</p>
            <button
              className="upgrade-button"
              onClick={() => navigate("/profile")}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subtopic-page-sub digital-subtopic-page">
      <div className="subtopic-page-sub__left-panel-sub">
        {selectedGoalSub && goalModules.length > 0 ? (
          <div className="subtopic-page-sub__navigation-sub">
            <h3 className="subtopic-page-sub__course-title-sub">
              📱 {selectedGoalSub.name || "Digital Marketing"}
            </h3>

            {goalModules.map((module) => (
              <div
                key={module.id}
                className="subtopic-page-sub__module-section-sub"
              >
                <h4
                  className={`subtopic-page-sub__module-title-sub ${expandedModuleSub === module.id ? "subtopic-page-sub__module-title-sub--active" : ""}`}
                  onClick={() => handleModuleClick(module.id)}
                >
                  <span className="module-icon">📊</span>
                  {module.name}
                  <span className="expand-icon">
                    {expandedModuleSub === module.id ? "−" : "+"}
                  </span>
                </h4>

                {expandedModuleSub === module.id && module.topics && (
                  <div className="subtopic-page-sub__topics-sub">
                    {module.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="subtopic-page-sub__topic-section"
                      >
                        <h5
                          className={`subtopic-page-sub__topic-title-sub ${expandedTopicSub === topic.id ? "active" : ""}`}
                          onClick={() => handleTopicClick(topic.id)}
                        >
                          <span className="topic-icon">📌</span>
                          {topic.name}
                          <span className="expand-icon-small">
                            {expandedTopicSub === topic.id ? "−" : "+"}
                          </span>
                        </h5>

                        {expandedTopicSub === topic.id && topic.subtopics && (
                          <div className="subtopic-page-sub__subtopics-sub">
                            {topic.subtopics.map((subtopic) =>
                              subtopic.content?.map((contentItem) => {
                                const isActive = contentItem.id === content?.id;
                                const isCompleted = completedContent.includes(
                                  contentItem.id
                                );

                                return (
                                  <div
                                    key={contentItem.id}
                                    className={`subtopic-page-sub__item-sub ${isActive ? "active-sub" : ""} ${isCompleted ? "completed-sub" : ""}`}
                                    onClick={() =>
                                      handleSubtopicClick(
                                        module,
                                        topic,
                                        subtopic,
                                        contentItem
                                      )
                                    }
                                  >
                                    <span className="subtopic-page-sub__item-text-sub">
                                      {contentItem.video_title ||
                                        contentItem.cheatsheet_title ||
                                        contentItem.mcq_title ||
                                        subtopic.name}
                                    </span>
                                    <span
                                      className={`content-type-tag ${contentItem.content_type || "video"}`}
                                    >
                                      {getContentTypeIcon(
                                        contentItem.content_type || "video"
                                      )}
                                    </span>
                                  </div>
                                );
                              })
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
        ) : (
          <div className="digital-navigation-placeholder">
            <div className="placeholder-content">
              <h4>No Content Selected</h4>
            </div>
          </div>
        )}
      </div>

      <div className="subtopic-page-sub__right-panel-sub">
        {content && isAccessible ? (
          <div className="digital-content-container">
            <div className="digital-subtopic-header">
              <div className="content-header-top">
                <span
                  className={`content-type-badge-large ${getContentType(content)}`}
                >
                  {getContentTypeIcon(getContentType(content))}
                  {getContentType(content).toUpperCase()}
                </span>
              </div>
            </div>

            {renderContentComponent()}
          </div>
        ) : (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalSubtopicPage;
