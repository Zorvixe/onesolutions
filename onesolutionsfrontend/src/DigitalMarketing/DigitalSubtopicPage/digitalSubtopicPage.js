import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import "../../SubtopicsPage/SubtopicPage.css"; // Import the same CSS as web subtopic page
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
  const [selectedCourseSub, setSelectedCourseSub] = useState(null);
  const [selectedGoalSub, setSelectedGoalSub] = useState(null);
  const [expandedModuleSub, setExpandedModuleSub] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navigationStructure, setNavigationStructure] = useState([]);
  const [isAccessible, setIsAccessible] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Get student type from user context
  const courseSelection = user?.courseSelection || "web_development";

  // Check if user has digital marketing access
  const hasDigitalAccess =
    courseSelection === "web_development" ||
    courseSelection === "digital_marketing" ||
    courseSelection === "all";

  // ✅ IMMEDIATELY mark subtopic as completed and notify all components - EXACT same as web
  const markAsCompleted = async () => {
    if (!content?.id || isSubtopicCompleted()) {
      console.log(`Digital content ${content?.id} already completed or invalid`);
      return;
    }

    console.log(`DigitalSubtopicPage: Marking content ${content.id} as completed`);

    try {
      // 1. Mark as completed in AuthContext
      await markSubtopicComplete(content.id, selectedGoalSub?.id, selectedModuleSub?.id, selectedSubtopicSub?.id);

      // 2. Force immediate update
      const timestamp = Date.now();
      localStorage.setItem("lastProgressUpdate", timestamp.toString());
      localStorage.setItem("progress_update", timestamp.toString());

      // 3. Dispatch multiple events for different listeners
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

      // 4. Force storage event
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

  // Check if subtopic is already completed
  const isSubtopicCompleted = () => {
    if (content) {
      return completedContent.includes(content.id) || content.is_completed;
    }
    return false;
  };

  // Determine content type from content object
  const getContentType = (contentData) => {
    // Check if content type is directly provided
    if (contentData.content_type) {
      return contentData.content_type;
    }
    
    // Check based on which title exists
    if (contentData.cheatsheet_title) {
      return "cheatsheet";
    }
    if (contentData.mcq_title) {
      return "mcq";
    }
    if (contentData.class_title || contentData.video_title) {
      return "video";
    }
    
    // Check the subtopic name for keywords
    if (contentData.subtopicName) {
      const name = contentData.subtopicName.toLowerCase();
      if (name.includes("cheat") || name.includes("cheatsheet")) {
        return "cheatsheet";
      }
      if (name.includes("mcq") || name.includes("quiz") || name.includes("assessment")) {
        return "mcq";
      }
    }
    
    // Default to video
    return "video";
  };

  // Load content by UUID from backend
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

        // Check if we have state from navigation
        if (location.state) {
          console.log("Loading digital content from navigation state:", location.state);
          
          // Create content object from navigation state
          const contentFromState = {
            id: location.state.subtopicId || subtopicId,
            content_uuid: contentUuid || location.state.contentUuid || subtopicId,
            content_type: location.state.contentType || getContentType(location.state),
            video_title: location.state.video_title || location.state.subtopicName,
            cheatsheet_title: location.state.cheatsheet_title,
            mcq_title: location.state.mcq_title,
            class_title: location.state.class_title,
            subtopicName: location.state.subtopicName,
            ...location.state,
          };
          
          console.log("Created content from state:", contentFromState);
          setContent(contentFromState);
          setIsAccessible(true);
          
          // Set the selected items from state
          if (location.state.goalName) {
            setSelectedGoalSub({ name: location.state.goalName, title: location.state.goalName });
          }
          if (location.state.courseName) {
            setSelectedCourseSub({ name: location.state.courseName });
            setSelectedModuleSub({ id: location.state.moduleId, name: location.state.courseName });
          }
          if (location.state.subtopicName) {
            setSelectedSubtopicSub({ name: location.state.subtopicName });
          }
          
          setLoading(false);
          return;
        }

        // Try to load by UUID first (new route)
        if (contentUuid) {
          console.log(`Loading digital content by UUID: ${contentUuid}`);
          const response = await getContentByUuid(contentUuid);

          if (response?.success) {
            // Ensure content_type is set
            const contentData = response.data;
            contentData.content_type = contentData.content_type || getContentType(contentData);
            
            setContent(contentData);
            setIsAccessible(true);
            
            // Also load the course structure to populate navigation
            const structureResponse = await loadDigitalMarketingAllStructure();
            
            // Find the content in the structure to get context
            findContentInStructure(contentData);
          } else {
            setError("Content not found");
            setIsAccessible(false);
          }
        }
        // Fallback to old topicId/subtopicId route
        else if (topicId && subtopicId) {
          console.log(
            `Loading digital content by IDs: ${topicId}/${subtopicId}`
          );
          if (location.state) {
            const contentFromState = {
              id: subtopicId,
              content_uuid: subtopicId,
              content_type: location.state.contentType || getContentType(location.state),
              video_title: location.state.video_title || location.state.subtopicName || "Digital Marketing Content",
              cheatsheet_title: location.state.cheatsheet_title,
              mcq_title: location.state.mcq_title,
              ...location.state,
            };
            setContent(contentFromState);
            setIsAccessible(true);
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
  }, [contentUuid, topicId, subtopicId, hasDigitalAccess, location.state]);

  // Find content in the loaded structure to populate navigation
  const findContentInStructure = (contentData) => {
    if (!contentData || !digitalMarketingStructure) return;

    const navigationItems = [];

    // Search through all goals to find this content
    Object.values(digitalMarketingStructure).forEach((goalData) => {
      const goal = goalData.goal || goalData;
      goalData.modules?.forEach((module) => {
        module.topics?.forEach((topic) => {
          topic.subtopics?.forEach((subtopic) => {
            subtopic.content?.forEach((c) => {
              if (
                c.content_uuid === contentData.uuid ||
                c.id === contentData.id
              ) {
                setSelectedGoalSub(goal);
                setSelectedCourseSub(module);
                setSelectedModuleSub(module);
                setSelectedSubtopicSub(subtopic);
                setExpandedModuleSub(module.id);
              }

              // Build navigation structure
              navigationItems.push({
                id: c.id,
                uuid: c.content_uuid,
                title: c.video_title || c.cheatsheet_title || c.mcq_title || subtopic.name,
                type: c.content_type || getContentType(c),
                moduleId: module.id,
                moduleName: module.name,
                topicId: topic.id,
                topicName: topic.name,
                subtopicId: subtopic.id,
                subtopicName: subtopic.name,
                goalId: goal.id,
                goalName: goal.name || goal.title,
                completed: completedContent.includes(c.id) || c.is_completed,
              });
            });
          });
        });
      });
    });

    setNavigationStructure(navigationItems);
  };

  // Navigate to next/previous content
  const navigateToContent = (direction) => {
    if (!navigationStructure.length || !content) return;

    const currentIndex = navigationStructure.findIndex(
      (item) => item.id === content.id || item.uuid === content.uuid
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
      navigate(`/digital/content/${targetContent.uuid || targetContent.id}`);
    }
  };

  // Render the appropriate component based on content type
  const renderContentComponent = () => {
    if (!content || !isAccessible) return null;

    const contentType = getContentType(content);
    
    console.log("DigitalSubtopicPage: Rendering content with type:", contentType, "Content:", content);

    switch (contentType) {
      case "video":
      case "class":
        return (
          <DigitalClasses
            subtopicId={content.id}
            goalName={selectedGoalSub?.name || selectedGoalSub?.title}
            courseName={selectedCourseSub?.name}
            subtopic={selectedSubtopicSub?.name}
            videoTitle={content.video_title || content.subtopicName}
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
            subtopicId={content.id}
            goalName={selectedGoalSub?.name || selectedGoalSub?.title}
            courseName={selectedCourseSub?.name}
            subtopic={selectedSubtopicSub?.name}
            cheatsheetTitle={content.cheatsheet_title}
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
      case "quiz":
      case "assessment":
        return (
          <DigitalMcqs
            subtopicId={content.id}
            goalName={selectedGoalSub?.name || selectedGoalSub?.title}
            courseName={selectedCourseSub?.name}
            subtopic={selectedSubtopicSub?.name}
            mcqTitle={content.mcq_title}
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
            subtopicId={content.id}
            goalName={selectedGoalSub?.name || selectedGoalSub?.title}
            courseName={selectedCourseSub?.name}
            subtopic={selectedSubtopicSub?.name}
            videoTitle={content.video_title || content.subtopicName}
            onComplete={markAsCompleted}
          />
        );
    }
  };

  // Handle module click - EXACT same as web
  const handleModuleClickSub = (moduleId) => {
    setExpandedModuleSub((prev) => (prev === moduleId ? null : moduleId));
  };

  // Handle subtopic click - EXACT same as web
  const handleSubtopicClickSub = (module, subtopic, contentItem) => {
    navigate(`/digital/content/${contentItem.content_uuid}`, {
      state: {
        subtopicName: subtopic.name,
        contentType: contentItem.content_type || getContentType(contentItem),
        video_title: contentItem.video_title,
        cheatsheet_title: contentItem.cheatsheet_title,
        mcq_title: contentItem.mcq_title,
        fromCourse: true,
        isDigital: true,
        moduleId: module.id,
        courseName: module.name,
        subtopicId: subtopic.id,
        contentUuid: contentItem.content_uuid,
      },
    });
  };

  // Auto-scroll active subtopic - EXACT same as web
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

  // Listen for completion events from child components - EXACT same as web
  useEffect(() => {
    const handleChildCompletion = (e) => {
      if (e.detail?.subtopicId === content?.id) {
        console.log("DigitalSubtopicPage: Received completion from child component");
        markAsCompleted();
      }
    };

    window.addEventListener("markSubtopicCompleted", handleChildCompletion);

    return () => {
      window.removeEventListener("markSubtopicCompleted", handleChildCompletion);
    };
  }, [content]);

  // Show loading state
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

  // Show access denied
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

  // Show error
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
      {/* LEFT PANEL - EXACT same structure as web subtopic page */}
      <div className="subtopic-page-sub__left-panel-sub">
        {selectedCourseSub && isAccessible ? (
          <div className="subtopic-page-sub__navigation-sub">
            <h3 className="subtopic-page-sub__course-title-sub">
              📱 {selectedCourseSub.name}
            </h3>

            <div className="course-progress-mini">
              <div className="progress-bar-mini">
                <div
                  className="progress-fill-mini"
                  style={{
                    width: `${selectedCourseSub.stats?.progress_percentage || 0}%`,
                  }}
                ></div>
              </div>
              <span className="progress-text-mini">
                {selectedCourseSub.stats?.progress_percentage?.toFixed(0) || 0}%
              </span>
            </div>

            {selectedCourseSub.topics?.map((topic) => (
              <div
                key={topic.id}
                className="subtopic-page-sub__module-section-sub"
              >
                <h4
                  className={`subtopic-page-sub__module-title-sub ${
                    topic.id === expandedModuleSub
                      ? "subtopic-page-sub__module-title-sub--active"
                      : ""
                  }`}
                  onClick={() => handleModuleClickSub(topic.id)}
                >
                  <span className="module-icon">📊</span>
                  {topic.name}
                  <span className="expand-icon">
                    {expandedModuleSub === topic.id ? "−" : "+"}
                  </span>
                </h4>

                {expandedModuleSub === topic.id && (
                  <div className="subtopic-page-sub__topics-sub">
                    {topic.subtopics?.map((subtopic) =>
                      subtopic.content?.map((contentItem) => {
                        const isActive =
                          contentItem.id === content?.id ||
                          contentItem.content_uuid === content?.uuid ||
                          contentItem.content_uuid === content?.content_uuid;
                        const isCompleted = completedContent.includes(
                          contentItem.id
                        );

                        return (
                          <div
                            key={contentItem.id}
                            className={`subtopic-page-sub__item-sub ${
                              isActive ? "active-sub" : ""
                            } ${
                              isCompleted ? "completed-sub" : ""
                            }`}
                            onClick={() =>
                              handleSubtopicClickSub(topic, subtopic, contentItem)
                            }
                          >
                            <span className="subtopic-page-sub__item-text-sub">
                              {contentItem.video_title ||
                                contentItem.cheatsheet_title ||
                                contentItem.mcq_title ||
                                subtopic.name}
                            </span>
                            <span
                              className={`content-type-tag ${contentItem.content_type || getContentType(contentItem)}`}
                            >
                              {getContentTypeIcon(contentItem.content_type || getContentType(contentItem))}
                              {contentItem.content_type || getContentType(contentItem)}
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

      {/* RIGHT PANEL - EXACT same structure as web subtopic page */}
      <div className="subtopic-page-sub__right-panel-sub">
        {content && isAccessible ? (
          <div className="digital-content-container">
            {/* Content Header with Navigation */}
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
                        {selectedGoalSub.name || selectedGoalSub.title}
                      </span>
                    </>
                  )}
                  {selectedCourseSub && (
                    <>
                      <span className="separator">→</span>
                      <span>{selectedCourseSub.name}</span>
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
                  content.subtopicName ||
                  "Digital Marketing Lesson"}
              </h2>

              {/* Content Navigation Arrows */}
              <div className="content-navigation-arrows">
                <button
                  className="nav-arrow prev-arrow"
                  onClick={() => navigateToContent("prev")}
                  disabled={
                    !navigationStructure.length ||
                    navigationStructure.findIndex(
                      (i) => i.id === content.id || i.uuid === content.uuid || i.uuid === content.content_uuid
                    ) === 0
                  }
                >
                  ← Previous
                </button>
                <button
                  className="nav-arrow next-arrow"
                  onClick={() => navigateToContent("next")}
                  disabled={
                    !navigationStructure.length ||
                    navigationStructure.findIndex(
                      (i) => i.id === content.id || i.uuid === content.uuid || i.uuid === content.content_uuid
                    ) ===
                      navigationStructure.length - 1
                  }
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Render the appropriate component */}
            {renderContentComponent()}
            
            {/* Mark Complete Button - EXACT same as web */}
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
                Select a digital marketing topic from the left sidebar to start learning
              </p>
              <div className="digital-icons">
                <span className="icon-item">🔍 SEO</span>
                <span className="icon-item">📱 Social Media</span>
                <span className="icon-item">📊 Analytics</span>
                <span className="icon-item">💲 PPC</span>
                <span className="icon-item">📧 Email</span>
                <span className="icon-item">📝 Content</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function for content type icons
const getContentTypeIcon = (type) => {
  switch (type) {
    case "video":
      return "🎬 ";
    case "class":
      return "📺 ";
    case "cheatsheet":
      return "📘 ";
    case "mcq":
      return "📝 ";
    case "quiz":
      return "❓ ";
    case "assessment":
      return "📋 ";
    default:
      return "📄 ";
  }
};

export default DigitalSubtopicPage;