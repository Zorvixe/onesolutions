"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DigitalCourses() {
  const navigate = useNavigate();
  const {
    user,
    digitalMarketingGoals,
    digitalMarketingLoading,
    loadDigitalMarketingAllStructure,
    completedContent,
    markSubtopicComplete,
    loadDigitalMarketingProgress,
    enrollInDigitalMarketingCourse,
  } = useAuth();

  const [expandedGoal, setExpandedGoal] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [localProgress, setLocalProgress] = useState({});
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  // Get student type from user context
  const courseSelection = user?.courseSelection || "web_development";

  // ✅ Check if user has digital marketing access
  const hasDigitalAccess =
    courseSelection === "web_development" ||
    courseSelection === "digital_marketing" ||
    courseSelection === "all";

  // ✅ Load digital marketing courses from backend
  useEffect(() => {
    if (hasDigitalAccess) {
      console.log("DigitalCourses: Loading courses from backend");
      loadDigitalMarketingAllStructure().catch((err) => {
        console.error("Failed to load digital courses:", err);
      });
    }
  }, [hasDigitalAccess]);

  // ✅ Calculate progress whenever completedContent changes
  useEffect(() => {
    if (hasDigitalAccess && digitalMarketingGoals.length > 0) {
      calculateAllProgress();
      setLastUpdateTime(Date.now());
    }
  }, [completedContent, digitalMarketingGoals, hasDigitalAccess]);

  // ✅ Calculate progress for all goals
  const calculateAllProgress = useCallback(() => {
    const progressMap = {};

    digitalMarketingGoals.forEach((goal) => {
      if (goal.stats) {
        progressMap[goal.id] = goal.stats.progress_percentage || 0;
      }
    });

    setLocalProgress(progressMap);
  }, [digitalMarketingGoals]);

  // ✅ Enhanced goal locking - checks ALL previous goals
  const isGoalLocked = (goalIndex) => {
    if (goalIndex === 0 || goalIndex === 1) return false;

    for (let i = 0; i < goalIndex; i++) {
      const previousGoal = digitalMarketingGoals[i];
      const previousGoalProgress = getGoalProgress(previousGoal);

      if (previousGoalProgress < 100) {
        return true;
      }
    }
    return false;
  };

  const toggleGoal = (goalId, goalIndex) => {
    if (!hasDigitalAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }

    setExpandedGoal(expandedGoal === goalId ? null : goalId);
    setExpandedCourse(null);
    setExpandedModule(null);
    setExpandedTopic(null);
    setSelectedSubtopic(null);
  };

  const toggleCourse = (courseId, goalIndex) => {
    if (!hasDigitalAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }

    setExpandedCourse(expandedCourse === courseId ? null : courseId);
    setExpandedModule(null);
    setExpandedTopic(null);
    setSelectedSubtopic(null);
  };

  const toggleModule = (moduleId, goalIndex) => {
    if (!hasDigitalAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }

    setExpandedModule(expandedModule === moduleId ? null : moduleId);
    setExpandedTopic(null);
    setSelectedSubtopic(null);
  };

  const toggleTopic = (topicId, goalIndex) => {
    if (!hasDigitalAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }

    setExpandedTopic(expandedTopic === topicId ? null : topicId);
    setSelectedSubtopic(null);
  };

  const isMCQ = (subtopic) => {
    if (subtopic.name) {
      return subtopic.name.toLowerCase().includes("mcq");
    }
    return false;
  };

  const isCodingPractice = (subtopic) => {
    if (subtopic.name) {
      return subtopic.name.toLowerCase().includes("coding practice");
    }
    return false;
  };

  // ✅ Handle subtopic click - Navigate using content UUID with proper content type
  const handleSubtopicClick = async (
    moduleId,
    subtopicId,
    subtopicName,
    contentUuid,
    goalName,
    courseName,
    goalIndex,
    contentItem = null
  ) => {
    if (!hasDigitalAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }

    setSelectedSubtopic(subtopicName);

    // Determine content type
    let contentType = "video";
    let videoTitle = null;
    let cheatsheetTitle = null;
    let mcqTitle = null;

    if (contentItem) {
      if (contentItem.content_type) {
        contentType = contentItem.content_type;
      }
      videoTitle = contentItem.video_title;
      cheatsheetTitle = contentItem.cheatsheet_title;
      mcqTitle = contentItem.mcq_title;
    } else {
      // Try to determine from subtopic name
      if (subtopicName) {
        const nameLower = subtopicName.toLowerCase();
        if (nameLower.includes("cheat") || nameLower.includes("cheatsheet")) {
          contentType = "cheatsheet";
        } else if (nameLower.includes("mcq") || nameLower.includes("quiz") || nameLower.includes("assessment")) {
          contentType = "mcq";
        }
      }
    }

    // Navigate using content UUID from backend
    if (contentUuid) {
      navigate(`/digital/content/${contentUuid}`, {
        state: {
          moduleId,
          subtopicId,
          subtopicName,
          goalName,
          courseName,
          goalIndex,
          fromCourse: true,
          isDigital: true,
          contentType: contentType,
          video_title: videoTitle,
          cheatsheet_title: cheatsheetTitle,
          mcq_title: mcqTitle,
          contentUuid: contentUuid,
        },
      });
    } else {
      // Fallback to old route if no UUID
      navigate(`/digital/topic/${moduleId}/subtopic/${subtopicId}`, {
        state: {
          moduleId,
          subtopicId,
          subtopicName,
          goalName,
          courseName,
          goalIndex,
          fromCourse: true,
          isDigital: true,
          contentType: contentType,
          video_title: videoTitle,
          cheatsheet_title: cheatsheetTitle,
          mcq_title: mcqTitle,
        },
      });
    }
  };

  // ✅ Mark subtopic as completed
  const handleMarkComplete = async (
    contentId,
    goalId,
    moduleId,
    subtopicId
  ) => {
    try {
      const result = await markSubtopicComplete(
        contentId,
        goalId,
        moduleId,
        subtopicId
      );
      if (result.success) {
        await loadDigitalMarketingProgress(goalId);
        await loadDigitalMarketingAllStructure();
      }
      return result;
    } catch (error) {
      console.error("Error marking subtopic complete:", error);
    }
  };

  const getGoalProgress = (goal) => {
    return localProgress[goal.id] || goal.stats?.progress_percentage || 0;
  };

  const getCourseProgress = (course) => {
    if (!course.stats) return 0;
    return course.stats.progress_percentage || 0;
  };

  const getModuleProgress = (module) => {
    if (!module.topics) return 0;

    let totalContent = 0;
    let completedContentCount = 0;

    module.topics.forEach((topic) => {
      topic.subtopics?.forEach((subtopic) => {
        subtopic.content?.forEach((content) => {
          totalContent++;
          if (content.is_completed || completedContent.includes(content.id)) {
            completedContentCount++;
          }
        });
      });
    });

    return totalContent > 0 ? (completedContentCount / totalContent) * 100 : 0;
  };

  const getTopicProgress = (topic) => {
    if (!topic.subtopics) return 0;

    let totalContent = 0;
    let completedContentCount = 0;

    topic.subtopics?.forEach((subtopic) => {
      subtopic.content?.forEach((content) => {
        totalContent++;
        if (content.is_completed || completedContent.includes(content.id)) {
          completedContentCount++;
        }
      });
    });

    return totalContent > 0 ? (completedContentCount / totalContent) * 100 : 0;
  };

  // ✅ REAL-TIME check if subtopic is completed
  const isSubtopicCompleted = (subtopicId) => {
    return completedContent.includes(subtopicId);
  };

  const showLockedMessage = () => {
    alert("This content is locked. Complete previous goals first.");
  };

  const showNoAccessMessage = () => {
    alert(
      "You don't have access to Digital Marketing. Please upgrade your subscription."
    );
  };

  // Show loading state
  if (digitalMarketingLoading) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading Digital Marketing courses...</p>
        </div>
      </div>
    );
  }

  // Show access denied message if user doesn't have digital access
  if (!hasDigitalAccess) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="access-denied-container">
          <img
            src="/assets/img/locked_image.png"
            alt="Access Denied"
            className="locked_image"
          />
          <h2>Digital Marketing Access Required</h2>
          <p>You don't have access to Digital Marketing courses.</p>
          <p>
            Please upgrade to Zorvixe Digital or Zorvixe Fullstack to access
            this content.
          </p>
          <button
            className="upgrade-button"
            onClick={() => navigate("/profile")}
          >
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  // Show empty state if no courses
  if (!digitalMarketingGoals || digitalMarketingGoals.length === 0) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="digital-header">
          <h1>📱 Digital Marketing Mastery</h1>
          <p>Learn SEO, Social Media, PPC, Analytics & more</p>
        </div>
        <div className="no-courses-container">
          <h3>No courses available</h3>
          <p>Please check back later or contact support.</p>
          <button
            className="enroll-button"
            onClick={() => navigate("/profile")}
          >
            Enroll in Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="courses-container"
      style={{ marginTop: "50px" }}
      key={`digital-courses-${lastUpdateTime}-${courseSelection}`}
    >
      {/* Goals List */}
      <div className="goals-wrapper digital-goals-wrapper">
        {digitalMarketingGoals.map((goal, goalIndex) => {
          const goalPercent = getGoalProgress(goal);
          const locked = isGoalLocked(goalIndex);
          const isEnrolled = goal.is_enrolled;

          return (
            <section
              className={`goal-group ${locked ? "goal-locked" : ""}`}
              key={goal.id}
            >
              <div
                className="goal-rail"
                style={{ backgroundColor: goal.color || "#9c27b0" }}
                aria-hidden="true"
              />
              <header
                className={`goal-header ${locked ? "goal-header-locked" : ""}`}
                onClick={() => toggleGoal(goal.id, goalIndex)}
              >
                <div className="goal-title-wrap">
                  <h2 className="goal-title" style={{ color: goal.color || "#9c27b0" }}>
                    {goal.name || goal.title}
                    {!isEnrolled && (
                      <span className="not-enrolled-tag"> 📝 Not Enrolled</span>
                    )}
                    {locked && <span className="locked-tag"> 🔒</span>}
                  </h2>
                  {goal.dateRange ? (
                    <span className="goal-dates">({goal.dateRange})</span>
                  ) : null}
                </div>
                <div className="goal-meta">
                  <div className="progress-section">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${goalPercent}%`,
                          backgroundColor: goal.color || "#9c27b0",
                        }}
                      />
                    </div>
                    <span
                      className="progress-percent"
                      style={{ color: goal.color || "#9c27b0" }}
                    >{`${goalPercent.toFixed(1)}%`}</span>
                  </div>
                </div>
              </header>

              <div className="goal-body">
                {!isEnrolled ? (
                  <div className="enroll-prompt">
                    <p>You are not enrolled in this course.</p>
                    <button
                      className="enroll-button"
                      onClick={async () => {
                        const result = await enrollInDigitalMarketingCourse(
                          goal.id
                        );
                        if (result.success) {
                          alert("Successfully enrolled!");
                          loadDigitalMarketingAllStructure();
                        }
                      }}
                    >
                      Enroll Now
                    </button>
                  </div>
                ) : !locked && (!goal.modules || goal.modules.length === 0) ? (
                  <div className="no-courses">
                    <h4>No modules found</h4>
                    <p>This course is currently being prepared.</p>
                  </div>
                ) : (
                  goal.modules?.map((module) => {
                    const moduleProgress = getModuleProgress(module);
                    const isModuleExpanded = expandedModule === module.id;
                    const isModuleCompleted = moduleProgress >= 100;

                    return (
                      <div className="courses" key={module.id}>
                        {/* Course Header */}
                        <div className="couses-and-status">
                          <h4 style={{ color: "inherit" }}>
                            {module.name}
                          </h4>
                          <div className="progress-section_module">
                            <div
                              className={`circular-progress ${isModuleCompleted ? "completed" : ""}`}
                              style={{ "--progress": moduleProgress }}
                            >
                              <span className="progress-value">
                                {moduleProgress.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expand Modules Button */}
                        <div className="active-module_course">
                          <button
                            onClick={() =>
                              locked
                                ? showLockedMessage()
                                : toggleModule(module.id, goalIndex)
                            }
                          >
                            {expandedModule === module.id ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                              </svg>
                            )}
                          </button>
                          <p
                            onClick={() =>
                              locked
                                ? showLockedMessage()
                                : toggleModule(module.id, goalIndex)
                            }
                            style={{
                              cursor: "pointer",
                              color: "inherit",
                            }}
                          >
                            {expandedModule === module.id ? "Active Modules" : "Active Modules"}
                          </p>
                        </div>

                        {/* Topics Section - FIXED: Now shows topic names correctly */}
                        {expandedModule === module.id && !locked && (
                          <div className="module-details">
                            {module.topics?.map((topic) => {
                              const topicProgress = getTopicProgress(topic);
                              const isTopicExpanded = expandedTopic === topic.id;
                              const isTopicCompleted = topicProgress >= 100;

                              return (
                                <div
                                  key={topic.id}
                                  className="module-container"
                                >
                                  <div
                                    className="module-single-div"
                                    onClick={() => toggleTopic(topic.id, goalIndex)}
                                  >
                                    {/* Timeline Column */}
                                    <div className="timeline">
                                      <div className="circle-row module-circle-row">
                                        <div
                                          className={`circle module-circle ${
                                            isTopicCompleted ? "completed" : ""
                                          }`}
                                          style={{
                                            "--progress": `${topicProgress}%`,
                                          }}
                                        >
                                          {isTopicCompleted ? "✓" : ""}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Content Column - UPDATED to show topic name properly */}
                                    <div className="content-area">
                                      <div className="module_topic_names">
                                        <div className="module-header-row">
                                          <div className="topic-label">
                                            <h6>DIGITAL TOPIC</h6>
                                          </div>
                                          <div className="module-title">
                                            <h5>{topic.name}</h5>
                                          </div>
                                        </div>

                                        {/* Expand/Collapse Button for Topic */}
                                        <div className="active-module_subtopic">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleTopic(topic.id, goalIndex);
                                            }}
                                            aria-label={
                                              isTopicExpanded
                                                ? "Collapse topic"
                                                : "Expand topic"
                                            }
                                          >
                                            {isTopicExpanded ? (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="22"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                              </svg>
                                            ) : (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="22"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                              </svg>
                                            )}
                                          </button>
                                        </div>
                                      </div>

                                      {/* Subtopics Section - Only show when expanded */}
                                      {isTopicExpanded && (
                                        <div className="subtopics-section">
                                          {topic.subtopics?.map((subtopic) =>
                                            subtopic.content?.map((content) => {
                                              const isCompleted = isSubtopicCompleted(
                                                content.id
                                              );
                                              return (
                                                <div
                                                  className={`subtopic-content-row ${
                                                    isCompleted ? "completed" : ""
                                                  }`}
                                                  key={content.id}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSubtopicClick(
                                                      module.id,
                                                      subtopic.id,
                                                      subtopic.name,
                                                      content.content_uuid,
                                                      goal.name || goal.title,
                                                      module.name,
                                                      goalIndex,
                                                      content // Pass the full content object
                                                    );
                                                  }}
                                                >
                                                  <span className="subtopic-text">
                                                    {content.video_title ||
                                                      content.cheatsheet_title ||
                                                      content.mcq_title ||
                                                      subtopic.name}
                                                  </span>
                                                 
                                                </div>
                                              );
                                            })
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}