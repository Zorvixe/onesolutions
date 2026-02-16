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
    loadDigitalMarketingProgress,
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

  // Calculate progress whenever completedContent changes
  useEffect(() => {
    if (hasDigitalAccess && digitalMarketingGoals.length > 0) {
      calculateAllProgress();
      setLastUpdateTime(Date.now());
    }
  }, [completedContent, digitalMarketingGoals, hasDigitalAccess]);

  // Helper: Robust completion check
  const checkIsContentCompleted = useCallback(
    (content) => {
      if (!content) return false;
      // Check 1: Is the ID in the global completedContent array?
      const isInArray = completedContent.some(
        (id) => String(id) === String(content.id)
      );
      // Check 2: Does the content object itself say it's completed?
      const isCompleted = content.is_completed === true;

      return isInArray || isCompleted;
    },
    [completedContent]
  );

  // Calculate progress for all goals
  const calculateAllProgress = useCallback(() => {
    const progressMap = {};

    digitalMarketingGoals.forEach((goal) => {
      if (goal.stats) {
        progressMap[goal.id] = goal.stats.progress_percentage || 0;
      } else {
        progressMap[goal.id] = calculateGoalProgressManual(goal);
      }
    });

    setLocalProgress(progressMap);
  }, [digitalMarketingGoals]);

  const calculateGoalProgressManual = (goal) => {
    if (!goal.modules || !Array.isArray(goal.modules)) return 0;

    let total = 0;
    let completed = 0;

    goal.modules.forEach((module) => {
      module.topics?.forEach((topic) => {
        topic.subtopics?.forEach((subtopic) => {
          subtopic.content?.forEach((content) => {
            total++;
            if (checkIsContentCompleted(content)) completed++;
          });
        });
      });
    });

    return total === 0 ? 0 : (completed / total) * 100;
  };

  // Check if goal is locked
  const isGoalLocked = (goalIndex) => {
    if (goalIndex === 0) return false;

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
  };

  // Handle subtopic click - Navigate using content UUID
  const handleSubtopicClick = (
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

    if (contentUuid) {
      navigate(`/digital/content/${contentUuid}`, {
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
          contentUuid: contentUuid,
          contentItem: contentItem,
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
      topic.subtopics?.forEach((subtopic) => {
        subtopic.content?.forEach((content) => {
          totalContent++;
          if (checkIsContentCompleted(content)) {
            completedContentCount++;
          }
        });
      });
    });

    return totalContent > 0 ? (completedContentCount / totalContent) * 100 : 0;
  };

  const getTopicProgress = (topic) => {
    if (!topic.subtopics || !Array.isArray(topic.subtopics)) return 0;

    let totalContent = 0;
    let completedContentCount = 0;

    topic.subtopics?.forEach((subtopic) => {
      subtopic.content?.forEach((content) => {
        totalContent++;
        if (checkIsContentCompleted(content)) {
          completedContentCount++;
        }
      });
    });

    return totalContent > 0 ? (completedContentCount / totalContent) * 100 : 0;
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
                  ) : !locked &&
                    (!goal.modules || goal.modules.length === 0) ? (
                    <div className="no-courses">
                      <h4>No modules found</h4>
                      <p>This course is currently being prepared.</p>
                    </div>
                  ) : (
                    goal.modules?.map((module) => {
                      const moduleProgress = getModuleProgress(module);
                      const isModuleExpanded = expandedModule === module.id;

                      return (
                        <div className="courses" key={module.id}>
                          {/* Module Header */}
                          <div
                            className="module-header"
                            onClick={() => toggleModule(module.id, goalIndex)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="couses-and-status">
                              <h4 style={{ color: "inherit" }}>
                                {module.name}
                              </h4>
                              <div className="progress-section_module">
                                <div
                                  className={`circular-progress ${moduleProgress >= 100 ? "completed" : ""}`}
                                  style={{ "--progress": `${moduleProgress}%` }}
                                >
                                  <span className="progress-value">
                                    {moduleProgress.toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Topics Section */}
                          {isModuleExpanded && !locked && (
                            <div className="module-details">
                              {module.topics?.map((topic) => {
                                const topicProgress = getTopicProgress(topic);
                                const isTopicExpanded =
                                  expandedTopic === topic.id;

                                return (
                                  <div
                                    key={topic.id}
                                    className="topic-container"
                                  >
                                    <div
                                      className="topic-header"
                                      onClick={() =>
                                        toggleTopic(topic.id, goalIndex)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      <div className="topic-title">
                                        <h5>{topic.name}</h5>
                                        <span className="topic-progress">
                                          {topicProgress.toFixed(1)}%
                                        </span>
                                      </div>
                                      <button className="toggle-button">
                                        {isTopicExpanded ? "−" : "+"}
                                      </button>
                                    </div>

                                    {/* Subtopics and Content */}
                                    {isTopicExpanded && (
                                      <div className="subtopics-section">
                                        {topic.subtopics?.map((subtopic) => (
                                          <div
                                            key={subtopic.id}
                                            className="subtopic-group"
                                          >
                                            <h6 className="subtopic-name">
                                              {subtopic.name}
                                            </h6>
                                            <div className="content-list">
                                              {subtopic.content?.map(
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
                                                      key={content.id}
                                                      className={`content-item ${isCompleted ? "completed" : ""}`}
                                                      onClick={() =>
                                                        handleSubtopicClick(
                                                          module.id,
                                                          subtopic.id,
                                                          subtopic.name,
                                                          content.content_uuid,
                                                          goal.name ||
                                                            goal.title,
                                                          module.name,
                                                          goalIndex,
                                                          content
                                                        )
                                                      }
                                                    >
                                                      <span className="content-type-badge">
                                                        {content.content_type ===
                                                          "video" && "🎥"}
                                                        {content.content_type ===
                                                          "cheatsheet" && "📄"}
                                                        {content.content_type ===
                                                          "mcq" && "❓"}
                                                      </span>
                                                      <span className="content-title">
                                                        {contentTitle}
                                                      </span>
                                                      {isCompleted && (
                                                        <span className="completed-check">
                                                          ✓
                                                        </span>
                                                      )}
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
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
