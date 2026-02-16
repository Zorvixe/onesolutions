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
    enrollInDigitalMarketingCourse,
  } = useAuth();

  const [expandedGoal, setExpandedGoal] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [localProgress, setLocalProgress] = useState({});
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  // Get student type from user context
  const courseSelection = user?.courseSelection || "digital_marketing";

  // Check if user has digital marketing access
  const hasDigitalAccess = courseSelection === "digital_marketing";

  // Load digital marketing courses from backend
  useEffect(() => {
    if (hasDigitalAccess) {
      loadDigitalMarketingAllStructure().catch((err) => {
        console.error("Failed to load digital courses:", err);
      });
    }
  }, [hasDigitalAccess, loadDigitalMarketingAllStructure]);

  // Helper: Check if content is completed
  const checkIsContentCompleted = useCallback(
    (content) => {
      if (!content) return false;

      // Check if content has is_completed flag
      const isCompleted = content.is_completed === true;

      // Check if content ID is in completedContent array
      const isInCompletedArray = completedContent.some(
        (id) => String(id) === String(content.id)
      );

      return isCompleted || isInCompletedArray;
    },
    [completedContent]
  );

  // Calculate progress for all goals

  const calculateGoalProgressManual = (goal) => {
    if (!goal.modules || !Array.isArray(goal.modules)) return 0;

    let total = 0;
    let completed = 0;

    goal.modules.forEach((module) => {
      if (module.topics && Array.isArray(module.topics)) {
        module.topics.forEach((topic) => {
          if (topic.subtopics && Array.isArray(topic.subtopics)) {
            topic.subtopics.forEach((subtopic) => {
              if (subtopic.content && Array.isArray(subtopic.content)) {
                subtopic.content.forEach((content) => {
                  total++;
                  if (checkIsContentCompleted(content)) completed++;
                });
              }
            });
          }
        });
      }
    });

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const calculateAllProgress = useCallback(() => {
    const progressMap = {};

    digitalMarketingGoals.forEach((goal) => {
      // If we have calculated stats from backend, use them
      if (goal.stats) {
        progressMap[goal.id] = goal.stats.progress_percentage || 0;
      } else {
        progressMap[goal.id] = calculateGoalProgressManual(goal);
      }
    });

    setLocalProgress(progressMap);
  }, [digitalMarketingGoals]);

  // Calculate progress whenever completedContent changes
  useEffect(() => {
    if (hasDigitalAccess && digitalMarketingGoals.length > 0) {
      calculateAllProgress();
      setLastUpdateTime(Date.now());
    }
  }, [
    completedContent,
    digitalMarketingGoals,
    hasDigitalAccess,
    calculateAllProgress,
  ]);

  // Check if goal is locked
  const isGoalLocked = (goalIndex) => {
    // First two goals are always unlocked
    if (goalIndex === 0 || goalIndex === 1) return false;

    // Check if all previous goals are 100% complete
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
    setExpandedModule(null);
    setExpandedTopic(null);
  };

  const toggleModule = (moduleId, goalIndex, e) => {
    e.stopPropagation();

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
  };

  const toggleTopic = (topicId, goalIndex, e) => {
    e.stopPropagation();

    if (!hasDigitalAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }

    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  // Handle content click - Navigate using content UUID
  const handleContentClick = (
    content,
    moduleId,
    subtopicId,
    subtopicName,
    goalName,
    courseName,
    goalIndex
  ) => {
    if (!hasDigitalAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }

    if (content.content_uuid) {
      navigate(`/digital/content/${content.content_uuid}`, {
        state: {
          goalId: digitalMarketingGoals[goalIndex]?.id,
          moduleId,
          subtopicId,
          subtopicName,
          goalName,
          courseName,
          goalIndex,
          fromCourse: true,
          isDigital: true,
          contentType: content.content_type,
          video_title: content.video_title,
          cheatsheet_title: content.cheatsheet_title,
          mcq_title: content.mcq_title,
          contentUuid: content.content_uuid,
          contentItem: content,
        },
      });
    }
  };

  const getGoalProgress = (goal) => {
    return localProgress[goal.id] || goal.stats?.progress_percentage || 0;
  };

  const getModuleProgress = (module) => {
    if (!module.topics || !Array.isArray(module.topics)) return 0;

    let totalContent = 0;
    let completedContentCount = 0;

    module.topics.forEach((topic) => {
      if (topic.subtopics && Array.isArray(topic.subtopics)) {
        topic.subtopics.forEach((subtopic) => {
          if (subtopic.content && Array.isArray(subtopic.content)) {
            subtopic.content.forEach((content) => {
              totalContent++;
              if (checkIsContentCompleted(content)) {
                completedContentCount++;
              }
            });
          }
        });
      }
    });

    return totalContent > 0
      ? Math.round((completedContentCount / totalContent) * 100)
      : 0;
  };

  const getTopicProgress = (topic) => {
    if (!topic.subtopics || !Array.isArray(topic.subtopics)) return 0;

    let totalContent = 0;
    let completedContentCount = 0;

    topic.subtopics.forEach((subtopic) => {
      if (subtopic.content && Array.isArray(subtopic.content)) {
        subtopic.content.forEach((content) => {
          totalContent++;
          if (checkIsContentCompleted(content)) {
            completedContentCount++;
          }
        });
      }
    });

    return totalContent > 0
      ? Math.round((completedContentCount / totalContent) * 100)
      : 0;
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
          <h1>Digital Marketing Mastery</h1>
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
      key={`digital-courses-${lastUpdateTime}`}
    >
      {/* Goals List */}
      <div className="goals-wrapper digital-goals-wrapper">
        {digitalMarketingGoals.map((goal, goalIndex) => {
          const goalPercent = getGoalProgress(goal);
          const locked = isGoalLocked(goalIndex);
          const isEnrolled = goal.is_enrolled === true;

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
                  <h2
                    className="goal-title"
                    style={{ color: goal.color || "#9c27b0" }}
                  >
                    {goal.name || goal.title}
                    {!isEnrolled && (
                      <span className="not-enrolled-tag"> Not Enrolled</span>
                    )}
                    {locked && <span className="locked-tag"> 🔒</span>}
                  </h2>
                  {goal.dateRange && (
                    <span className="goal-dates">({goal.dateRange})</span>
                  )}
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
                    >{`${goalPercent}%`}</span>
                  </div>
                </div>
              </header>

              {expandedGoal === goal.id && (
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
                  ) : locked ? (
                    <div className="locked-message">
                      <p>Complete previous goals to unlock this course.</p>
                    </div>
                  ) : !goal.modules || goal.modules.length === 0 ? (
                    <div className="no-courses">
                      <h4>No modules found</h4>
                      <p>This course is currently being prepared.</p>
                    </div>
                  ) : (
                    goal.modules.map((module) => {
                      const moduleProgress = getModuleProgress(module);
                      const isModuleExpanded = expandedModule === module.id;

                      return (
                        <div className="courses" key={module.id}>
                          {/* Module Header */}
                          <div className="couses-and-status">
                            <h4 style={{ color: "inherit" }}>{module.name}</h4>
                            <div className="progress-section_module">
                              <div
                                className={`circular-progress ${moduleProgress >= 100 ? "completed" : ""}`}
                                style={{ "--progress": moduleProgress }}
                              >
                                <span className="progress-value">
                                  {moduleProgress}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Expand Module Button */}
                          <div className="active-module_course">
                            <button
                              onClick={(e) =>
                                toggleModule(module.id, goalIndex, e)
                              }
                            >
                              {isModuleExpanded ? (
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
                              onClick={(e) =>
                                toggleModule(module.id, goalIndex, e)
                              }
                              style={{ cursor: "pointer", color: "inherit" }}
                            >
                              {isModuleExpanded
                                ? "Hide Modules"
                                : "Show Modules"}
                            </p>
                          </div>

                          {/* Topics Section */}
                          {isModuleExpanded &&
                            module.topics &&
                            module.topics.length > 0 && (
                              <div className="module-details">
                                {module.topics.map((topic) => {
                                  const topicProgress = getTopicProgress(topic);
                                  const isTopicExpanded =
                                    expandedTopic === topic.id;

                                  return (
                                    <div
                                      key={topic.id}
                                      className="module-container"
                                    >
                                      <div className="module-single-div">
                                        <div className="timeline">
                                          <div className="circle-row module-circle-row">
                                            <div
                                              className={`circle module-circle ${topicProgress >= 100 ? "completed" : ""}`}
                                              style={{
                                                "--progress": `${topicProgress}%`,
                                              }}
                                            >
                                              {topicProgress >= 100 ? "✓" : ""}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="content-area">
                                          <div className="module_topic_names">
                                            <div className="module-header-row">
                                              <div className="topic-label">
                                                <h6>TOPIC</h6>
                                              </div>
                                              <div className="module-title">
                                                <h5>{topic.name}</h5>
                                              </div>
                                            </div>

                                            <div className="active-module_subtopic">
                                              <button
                                                onClick={(e) =>
                                                  toggleTopic(
                                                    topic.id,
                                                    goalIndex,
                                                    e
                                                  )
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

                                          {/* Subtopics and Content Section */}
                                          {isTopicExpanded && (
                                            <div className="subtopics-section">
                                              {topic.subtopics &&
                                              topic.subtopics.length > 0 ? (
                                                topic.subtopics.map(
                                                  (subtopic) => (
                                                    <div
                                                      key={subtopic.id}
                                                      className="subtopic-container"
                                                    >
                                                      <div className="subtopic-header">
                                                        <h6>{subtopic.name}</h6>
                                                      </div>

                                                      {subtopic.content &&
                                                      subtopic.content.length >
                                                        0 ? (
                                                        <div className="content-list">
                                                          {subtopic.content.map(
                                                            (content) => {
                                                              const isCompleted =
                                                                checkIsContentCompleted(
                                                                  content
                                                                );
                                                              const contentTitle =
                                                                content.video_title ||
                                                                content.cheatsheet_title ||
                                                                content.mcq_title ||
                                                                "Untitled Content";

                                                              return (
                                                                <div
                                                                  key={
                                                                    content.id
                                                                  }
                                                                  className={`content-item ${isCompleted ? "completed" : ""}`}
                                                                  onClick={() =>
                                                                    handleContentClick(
                                                                      content,
                                                                      module.id,
                                                                      subtopic.id,
                                                                      subtopic.name,
                                                                      goal.name ||
                                                                        goal.title,
                                                                      module.name,
                                                                      goalIndex
                                                                    )
                                                                  }
                                                                >
                                                                  <span className="content-type-badge">
                                                                    {content.content_type ===
                                                                    "video"
                                                                      ? "📹"
                                                                      : content.content_type ===
                                                                          "cheatsheet"
                                                                        ? "📄"
                                                                        : content.content_type ===
                                                                            "mcq"
                                                                          ? "❓"
                                                                          : "📝"}
                                                                  </span>
                                                                  <span className="content-title">
                                                                    {
                                                                      contentTitle
                                                                    }
                                                                  </span>
                                                                  {isCompleted && (
                                                                    <span className="completed-badge">
                                                                      ✓
                                                                    </span>
                                                                  )}
                                                                </div>
                                                              );
                                                            }
                                                          )}
                                                        </div>
                                                      ) : (
                                                        <p className="no-content">
                                                          No content available
                                                        </p>
                                                      )}
                                                    </div>
                                                  )
                                                )
                                              ) : (
                                                <p className="no-subtopics">
                                                  No subtopics available
                                                </p>
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
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
