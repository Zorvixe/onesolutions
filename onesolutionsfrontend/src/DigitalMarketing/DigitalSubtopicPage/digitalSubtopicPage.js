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
    digitalMarketingGoals,
  } = useAuth();

  const [content, setContent] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAccessible, setIsAccessible] = useState(true);
  const [goalModules, setGoalModules] = useState([]);
  const [goalIndex, setGoalIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const courseSelection = user?.courseSelection || "web_development";

  const hasDigitalAccess =
    courseSelection === "web_development" ||
    courseSelection === "digital_marketing" ||
    courseSelection === "all";

  // Robust check for completion
  const checkIsItemCompleted = (item) => {
    if (!item) return false;
    const isRx = completedContent.some((id) => String(id) === String(item.id));
    const isDb = item.is_completed === true || item.is_completed === 1;
    return isRx || isDb;
  };

  const markAsCompleted = async () => {
    if (!content?.id || checkIsItemCompleted(content)) {
      return;
    }

    try {
      await markSubtopicComplete(
        content.id,
        selectedGoal?.id,
        selectedModule?.id,
        selectedSubtopic?.id
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

      // Update local state immediately
      setContent((prev) => ({ ...prev, is_completed: true }));
    } catch (error) {
      console.error("Error marking digital content as completed:", error);
    }
  };

  const getContentType = (contentData) => {
    if (contentData.content_type) {
      return contentData.content_type;
    }
    if (contentData.cheatsheet_title) return "cheatsheet";
    if (contentData.mcq_title) return "mcq";
    return "video";
  };

  // Find and set the correct module, topic, and subtopic based on content
  const findAndSetCurrentPath = (modules, currentContent) => {
    if (!modules || !currentContent) return;

    for (const module of modules) {
      if (module.topics) {
        for (const topic of module.topics) {
          if (topic.subtopics) {
            for (const subtopic of topic.subtopics) {
              if (subtopic.content) {
                const foundContent = subtopic.content.find(
                  (c) =>
                    String(c.id) === String(currentContent.id) ||
                    c.content_uuid === currentContent.content_uuid
                );
                if (foundContent) {
                  setExpandedModule(module.id);
                  setExpandedTopic(topic.id);
                  setSelectedModule({ id: module.id, name: module.name });
                  setSelectedTopic({ id: topic.id, name: topic.name });
                  setSelectedSubtopic({ id: subtopic.id, name: subtopic.name });
                  return;
                }
              }
            }
          }
        }
      }
    }
  };

  const loadModuleStructure = async (moduleId, contentData = null) => {
    if (!moduleId) return;

    try {
      // Ensure structure is loaded
      if (!digitalMarketingGoals?.length) {
        await loadDigitalMarketingAllStructure();
      }

      // Search module inside all goals
      for (const goal of digitalMarketingGoals) {
        const foundModule = goal.modules?.find((m) => m.id === moduleId);

        if (foundModule) {
          // optional — set goal context
          setSelectedGoal(goal);

          // IMPORTANT — sidebar modules
          setGoalModules([foundModule]);

          // Expand current lesson path
          if (contentData) {
            findAndSetCurrentPath([foundModule], contentData);
          }

          return;
        }
      }
      console.warn("Module not found");
    } catch (err) {
      console.error("Module load failed:", err);
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

        // Try to load from state first (navigation click)
        if (location.state && location.state.contentItem) {
          const contentFromState = location.state.contentItem;

          contentFromState.content_type =
            contentFromState.content_type || getContentType(contentFromState);

          setContent(contentFromState);
          setIsAccessible(true);

          // Set navigation context from state
          if (location.state.goalId) {
            setSelectedGoal({
              id: location.state.goalId,
              name: location.state.goalName || "Digital Marketing",
            });

            // Find goal index from digitalMarketingGoals
            const goalIdx = digitalMarketingGoals?.findIndex(
              (g) => g.id === location.state.goalId
            );
            if (goalIdx !== -1) setGoalIndex(goalIdx);
          }

          if (location.state.moduleId) {
            setSelectedModule({
              id: location.state.moduleId,
              name: location.state.moduleName,
            });
            setExpandedModule(location.state.moduleId);
          }

          if (location.state.topicId) {
            setSelectedTopic({
              id: location.state.topicId,
              name: location.state.topicName,
            });
            setExpandedTopic(location.state.topicId);
          }

          if (location.state.subtopicId) {
            setSelectedSubtopic({
              id: location.state.subtopicId,
              name: location.state.subtopicName,
            });
          }

          await loadModuleStructure(location.state.moduleId, contentFromState);

          setLoading(false);
          return;
        }

        // If no state, fetch by UUID
        if (contentUuid) {
          const response = await getContentByUuid(contentUuid);

          if (response?.success) {
            const contentData = response.data;
            contentData.content_type =
              contentData.content_type || getContentType(contentData);

            setContent(contentData);
            setIsAccessible(true);

            if (contentData.goal_id) {
              setSelectedGoal({
                id: contentData.goal_id,
                name: contentData.goal_name || "Digital Marketing",
              });

              // Find goal index
              const goalIdx = digitalMarketingGoals?.findIndex(
                (g) => g.id === contentData.goal_id
              );
              if (goalIdx !== -1) setGoalIndex(goalIdx);
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
  }, [contentUuid, hasDigitalAccess, location.state, digitalMarketingGoals]);

  useEffect(() => {
    if (goalModules.length > 0 && content) {
      findAndSetCurrentPath(goalModules, content);
    }
  }, [goalModules, content]);

  const renderContentComponent = () => {
    if (!content || !isAccessible) return null;

    const contentType = getContentType(content);

    const commonProps = {
      contentId: content.id,
      contentUuid: content.content_uuid,
      goalId: selectedGoal?.id || content.goal_id,
      moduleId: selectedModule?.id || content.module_id,
      topicId: selectedTopic?.id || content.topic_id,
      subtopicId: selectedSubtopic?.id || content.subtopic_id,
      onComplete: markAsCompleted,
      preLoadedContent: content,
    };

    switch (contentType) {
      case "video":
        return <DigitalClasses {...commonProps} />;
      case "cheatsheet":
        return <DigitalCheatsheet {...commonProps} />;
      case "mcq":
        return <DigitalMcqs {...commonProps} />;
      default:
        return <DigitalClasses {...commonProps} />;
    }
  };

  const handleTopicClick = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const handleSubtopicClick = (module, topic, subtopic, contentItem) => {
    if (!contentItem || !contentItem.content_uuid) return;

    let contentType = contentItem.content_type;
    if (!contentType) {
      if (contentItem.cheatsheet_title) contentType = "cheatsheet";
      else if (contentItem.mcq_title) contentType = "mcq";
      else contentType = "video";
    }
    contentItem.content_type = contentType;

    navigate(`/digital/content/${contentItem.content_uuid}`, {
      state: {
        contentItem: contentItem,
        goalId: selectedGoal?.id,
        goalName: selectedGoal?.name,
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

  const isCurrentContent = (contentItem) => {
    if (!content || !contentItem) return false;
    return (
      String(contentItem.id) === String(content.id) ||
      contentItem.content_uuid === content.content_uuid
    );
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
      {/* LEFT PANEL - Navigation */}
      <div className="subtopic-page-sub__left-panel-sub">
        {goalModules.length > 0 ? (
          <div className="subtopic-page-sub__navigation-sub">
            {/* Module title header */}
            <h3 className="subtopic-page-sub__course-title-sub">
              {goalModules[0]?.name || "Digital Marketing"}
            </h3>

            {/* Topics directly visible */}
            {goalModules.map((module) =>
              module.topics?.map((topic) => (
                <div
                  key={topic.id}
                  className="subtopic-page-sub__module-section-sub"
                >
                  {/* Topic title */}
                  <h4
                    className={`subtopic-page-sub__module-title-sub ${
                      expandedTopic === topic.id
                        ? "subtopic-page-sub__module-title-sub--active"
                        : ""
                    }`}
                    onClick={() => handleTopicClick(topic.id)}
                  >
                    {topic.name}
                  </h4>

                  {/* Lessons */}
                  {expandedTopic === topic.id &&
                    topic.subtopics?.map((subtopic) =>
                      subtopic.content?.map((contentItem) => {
                        const isCompleted = checkIsItemCompleted(contentItem);
                        const isActive = isCurrentContent(contentItem);

                        return (
                          <div
                            className="subtopic-page-sub__topics-sub"
                            key={contentItem.id}
                          >
                            <div
                              className={`subtopic-page-sub__item-sub ${
                                isActive ? "active-sub" : ""
                              } ${isCompleted ? "completed-sub" : ""}`}
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
                            </div>
                          </div>
                        );
                      })
                    )}
                </div>
              ))
            )}
          </div>
        ) : (
          <p>Select a topic from the courses page to start learning</p>
        )}
      </div>

      {/* RIGHT PANEL - Content */}
      <div className="subtopic-page-sub__right-panel-sub">
        {content && isAccessible ? (
          <div className="digital-content-container">
            {renderContentComponent()}
          </div>
        ) : (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading content...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalSubtopicPage;
