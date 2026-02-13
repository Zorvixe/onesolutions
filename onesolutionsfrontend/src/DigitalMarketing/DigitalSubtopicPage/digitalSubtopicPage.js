import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import "../../SubtopicsPage/SubtopicPage.css";
import DigitalClasses from "../Pages/digitalClasses.js";
import DigitalCheatsheet from "../Pages/digitalCheatSheet.js";
import DigitalMcqs from "../Pages/digitalMcqs.js";

const DigitalSubtopicPage = () => {
  const { contentUuid } = useParams();
  const { topicId, subtopicId } = useParams();
  const {
    completedContent,
    markSubtopicComplete,
    user,
    getContentByUuid,
    digitalMarketingStructure,
    loadDigitalMarketingAllStructure,
  } = useAuth();

  const [content, setContent] = useState(null);
  const [selectedSubtopicSub, setSelectedSubtopicSub] = useState(null);
  const [selectedModuleSub, setSelectedModuleSub] = useState(null);
  const [selectedTopicSub, setSelectedTopicSub] = useState(null);
  const [selectedGoalSub, setSelectedGoalSub] = useState(null);
  const [expandedModuleSub, setExpandedModuleSub] = useState(null);
  const [expandedTopicSub, setExpandedTopicSub] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      console.log(
        `Digital content ${content?.id} already completed or invalid`
      );
      return;
    }

    console.log(
      `DigitalSubtopicPage: Marking content ${content.id} as completed`
    );

    try {
      await markSubtopicComplete(
        content.id,
        selectedGoalSub?.id,
        selectedModuleSub?.id,
        selectedSubtopicSub?.id
      );

      const timestamp = Date.now();
      localStorage.setItem("lastProgressUpdate", timestamp.toString());
      localStorage.setItem("progress_update", timestamp.toString());

      const events = [
        new CustomEvent("subtopicCompleted", {
          detail: { subtopicId: content.id, timestamp, isDigital: true },
        }),
        new CustomEvent("contentCompleted", {
          detail: { subtopicId: content.id, timestamp, isDigital: true },
        }),
        new CustomEvent("progressUpdated", {
          detail: { subtopicId: content.id, timestamp, isDigital: true },
        }),
      ];

      events.forEach((event) => {
        window.dispatchEvent(event);
        if (window.parent !== window) {
          window.parent.dispatchEvent(event);
        }
      });

      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "completedContent",
          newValue: JSON.stringify([...completedContent, content.id]),
        })
      );

      console.log(`DigitalSubtopicPage: ${content.id} marked as completed`);
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
    if (contentData.cheatsheet_title) {
      return "cheatsheet";
    }
    if (contentData.mcq_title) {
      return "mcq";
    }
    if (contentData.video_title) {
      return "video";
    }
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

        if (location.state) {
          console.log(
            "Loading digital content from navigation state:",
            location.state
          );

          const contentFromState = {
            id: location.state.contentId || location.state.subtopicId,
            content_uuid: contentUuid || location.state.contentUuid,
            content_type: location.state.contentType,
            video_title: location.state.video_title,
            cheatsheet_title: location.state.cheatsheet_title,
            mcq_title: location.state.mcq_title,
            subtopicName: location.state.subtopicName,
            goal_id: location.state.goalId,
            module_id: location.state.moduleId,
            topic_id: location.state.topicId,
            subtopic_id: location.state.subtopicId,
            ...location.state,
          };

          console.log("Created content from state:", contentFromState);
          setContent(contentFromState);
          setIsAccessible(true);

          if (location.state.goalName) {
            setSelectedGoalSub({
              id: location.state.goalId,
              name: location.state.goalName,
            });
          }
          if (location.state.moduleName) {
            setSelectedModuleSub({
              id: location.state.moduleId,
              name: location.state.moduleName,
            });
          }
          if (location.state.topicName) {
            setSelectedTopicSub({
              id: location.state.topicId,
              name: location.state.topicName,
            });
          }
          if (location.state.subtopicName) {
            setSelectedSubtopicSub({
              id: location.state.subtopicId,
              name: location.state.subtopicName,
            });
          }

          await loadCourseStructure(location.state.goalId);

          setLoading(false);
          return;
        }

        if (contentUuid) {
          console.log(`Loading digital content by UUID: ${contentUuid}`);
          const response = await getContentByUuid(contentUuid);

          if (response?.success) {
            const contentData = response.data;
            contentData.content_type =
              contentData.content_type || getContentType(contentData);

            setContent(contentData);
            setIsAccessible(true);

            if (contentData.goal_id) {
              setSelectedGoalSub({ id: contentData.goal_id });
              await loadCourseStructure(contentData.goal_id);

              if (contentData.module_id) {
                setSelectedModuleSub({ id: contentData.module_id });
              }
              if (contentData.topic_id) {
                setSelectedTopicSub({ id: contentData.topic_id });
              }
              if (contentData.subtopic_id) {
                setSelectedSubtopicSub({ id: contentData.subtopic_id });
              }
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
    try {
      const structureResponse = await loadDigitalMarketingAllStructure();
      if (structureResponse?.success && structureResponse.data) {
        const goalData = structureResponse.data.find(
          (g) => g.id === parseInt(goalId)
        );
        if (goalData && goalData.modules) {
          setGoalModules(goalData.modules);

          if (goalData.modules.length > 0) {
            setExpandedModuleSub(goalData.modules[0].id);
          }
        }
      }
    } catch (err) {
      console.error("Error loading course structure:", err);
    }
  };

  const navigateToContent = (direction) => {
    if (!navigationStructure.length || !content) return;

    const currentIndex = navigationStructure.findIndex(
      (item) => item.id === content.id || item.uuid === content.content_uuid
    );

    if (currentIndex === -1) return;

    let targetIndex;
    if (direction === "next") {
      targetIndex = currentIndex + 1;
    } else {
      targetIndex = currentIndex - 1;
    }

    if (targetIndex >= 0 && targetIndex < navigationStructure.length) {
      const targetContent = navigationStructure[targetIndex];
      navigate(`/digital/content/${targetContent.uuid}`);
    }
  };

  const renderContentComponent = () => {
    if (!content || !isAccessible) return null;

    const contentType = getContentType(content);

    console.log(
      "DigitalSubtopicPage: Rendering content with type:",
      contentType,
      "Content:",
      content
    );

    switch (contentType) {
      case "video":
        return (
          <DigitalClasses
            contentId={content.id}
            contentUuid={content.content_uuid}
            goalId={selectedGoalSub?.id}
            moduleId={selectedModuleSub?.id}
            topicId={selectedTopicSub?.id}
            subtopicId={selectedSubtopicSub?.id}
            onComplete={() => {
              console.log("DigitalClasses: onComplete called");
              markAsCompleted();
              window.dispatchEvent(
                new CustomEvent("markSubtopicCompleted", {
                  detail: { subtopicId: content.id, isDigital: true },
                })
              );
            }}
          />
        );
      case "cheatsheet":
        return (
          <DigitalCheatsheet
            contentId={content.id}
            contentUuid={content.content_uuid}
            goalId={selectedGoalSub?.id}
            moduleId={selectedModuleSub?.id}
            topicId={selectedTopicSub?.id}
            subtopicId={selectedSubtopicSub?.id}
            onComplete={() => {
              console.log("DigitalCheatsheet: onComplete called");
              markAsCompleted();
              window.dispatchEvent(
                new CustomEvent("markSubtopicCompleted", {
                  detail: { subtopicId: content.id, isDigital: true },
                })
              );
            }}
          />
        );
      case "mcq":
        return (
          <DigitalMcqs
            contentId={content.id}
            contentUuid={content.content_uuid}
            goalId={selectedGoalSub?.id}
            moduleId={selectedModuleSub?.id}
            topicId={selectedTopicSub?.id}
            subtopicId={selectedSubtopicSub?.id}
            onComplete={() => {
              console.log("DigitalMcqs: onComplete called");
              markAsCompleted();
              window.dispatchEvent(
                new CustomEvent("markSubtopicCompleted", {
                  detail: { subtopicId: content.id, isDigital: true },
                })
              );
            }}
          />
        );
      default:
        return (
          <DigitalClasses
            contentId={content.id}
            contentUuid={content.content_uuid}
            goalId={selectedGoalSub?.id}
            moduleId={selectedModuleSub?.id}
            topicId={selectedTopicSub?.id}
            subtopicId={selectedSubtopicSub?.id}
            onComplete={markAsCompleted}
          />
        );
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

    navigate(`/digital/content/${contentItem.content_uuid}`, {
      state: {
        contentId: contentItem.id,
        contentUuid: contentItem.content_uuid,
        contentType: contentItem.content_type,
        video_title: contentItem.video_title,
        cheatsheet_title: contentItem.cheatsheet_title,
        mcq_title: contentItem.mcq_title,
        subtopicName: subtopic.name,
        goalId: selectedGoalSub?.id,
        goalName: selectedGoalSub?.name,
        moduleId: module.id,
        moduleName: module.name,
        topicId: topic.id,
        topicName: topic.name,
        subtopicId: subtopic.id,
        fromCourse: true,
        isDigital: true,
      },
    });
  };

  useEffect(() => {
    if (expandedModuleSub && selectedSubtopicSub && isAccessible) {
      const timer = setTimeout(() => {
        const activeEl = document.querySelector(
          ".subtopic-page-sub__item-sub.active-sub"
        );
        const leftPanel = document.querySelector(
          ".subtopic-page-sub__left-panel-sub"
        );

        if (activeEl && leftPanel) {
          leftPanel.scrollTo({
            top: activeEl.offsetTop - leftPanel.clientHeight / 10,
            behavior: "smooth",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [expandedModuleSub, selectedSubtopicSub, isAccessible]);

  useEffect(() => {
    const handleChildCompletion = (e) => {
      if (e.detail?.subtopicId === content?.id) {
        console.log(
          "DigitalSubtopicPage: Received completion from child component"
        );
        markAsCompleted();
      }
    };

    window.addEventListener("markSubtopicCompleted", handleChildCompletion);

    return () => {
      window.removeEventListener(
        "markSubtopicCompleted",
        handleChildCompletion
      );
    };
  }, [content]);

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
              onLoad={() => setImageLoaded(true)}
              alt="Access Denied"
            />
            <h2>Digital Marketing Access Required</h2>
            <p>You don't have access to Digital Marketing content.</p>
            <p>Please upgrade your subscription to access these courses.</p>
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

  if (error) {
    return (
      <div className="subtopic-page-sub">
        <div
          className="subtopic-page-sub__right-panel-sub"
          style={{ width: "100%" }}
        >
          <div className="not-found-con">
            <img
              src="/assets/img/not_found.png"
              className="not-found-image"
              alt="Not Found"
            />
            <h2>Content Not Found</h2>
            <p>{error}</p>
            <button
              className="back-button"
              onClick={() => navigate("/digital-courses")}
            >
              Back to Courses
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
                  className={`subtopic-page-sub__module-title-sub ${
                    expandedModuleSub === module.id
                      ? "subtopic-page-sub__module-title-sub--active"
                      : ""
                  }`}
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
                          className={`subtopic-page-sub__topic-title-sub ${
                            expandedTopicSub === topic.id ? "active" : ""
                          }`}
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
                                const isActive =
                                  contentItem.id === content?.id ||
                                  contentItem.content_uuid ===
                                    content?.content_uuid;
                                const isCompleted = completedContent.includes(
                                  contentItem.id
                                );

                                return (
                                  <div
                                    key={contentItem.id}
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
                                    <span
                                      className={`content-type-tag ${contentItem.content_type}`}
                                    >
                                      {getContentTypeIcon(
                                        contentItem.content_type
                                      )}
                                      {contentItem.content_type}
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
              <span className="placeholder-icon">📚</span>
              <h4>No Content Selected</h4>
              <p>Select a lesson from the course structure to start learning</p>
            </div>
          </div>
        )}
      </div>

      <div className="subtopic-page-sub__right-panel-sub">
        {content && isAccessible ? (
          <div className="digital-content-container">
            <div className="digital-subtopic-header">
              <div className="content-header-top">
                <div className="breadcrumb">
                  <span onClick={() => navigate("/digital-courses")}>
                    Digital Marketing
                  </span>
                  {selectedGoalSub && (
                    <>
                      <span className="separator">→</span>
                      <span onClick={() => navigate("/digital-courses")}>
                        {selectedGoalSub.name}
                      </span>
                    </>
                  )}
                  {selectedModuleSub && (
                    <>
                      <span className="separator">→</span>
                      <span>{selectedModuleSub.name}</span>
                    </>
                  )}
                  {selectedTopicSub && (
                    <>
                      <span className="separator">→</span>
                      <span>{selectedTopicSub.name}</span>
                    </>
                  )}
                </div>

                <span
                  className={`content-type-badge-large ${getContentType(content)}`}
                >
                  {getContentTypeIcon(getContentType(content))}
                  {getContentType(content)}
                </span>
              </div>

              <h2 className="content-title">
                {content.video_title ||
                  content.cheatsheet_title ||
                  content.mcq_title ||
                  "Digital Marketing Lesson"}
              </h2>

              <div className="content-navigation-arrows">
                <button
                  className="nav-arrow prev-arrow"
                  onClick={() => navigateToContent("prev")}
                  disabled={!navigationStructure.length}
                >
                  ← Previous
                </button>
                <button
                  className="nav-arrow next-arrow"
                  onClick={() => navigateToContent("next")}
                  disabled={!navigationStructure.length}
                >
                  Next →
                </button>
              </div>
            </div>

            {renderContentComponent()}

            {!isSubtopicCompleted() && (
              <div className="mark-complete-container">
                <button
                  className="mark-complete-button"
                  onClick={markAsCompleted}
                >
                  ✓ Mark as Completed
                </button>
              </div>
            )}

            {isSubtopicCompleted() && (
              <div className="completed-message">
                <span className="completed-check">✓</span>
                <span>You have completed this lesson!</span>
              </div>
            )}
          </div>
        ) : (
          <div className="digital-welcome">
            <div className="welcome-content">
              <span className="welcome-icon">📱</span>
              <h2>Digital Marketing Mastery</h2>
              <p>
                Select a digital marketing topic from the left sidebar to start
                learning
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalSubtopicPage;
