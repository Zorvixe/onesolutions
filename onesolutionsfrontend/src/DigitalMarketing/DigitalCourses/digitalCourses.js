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
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [localProgress, setLocalProgress] = useState({
    goals: {},
    courses: {},
    modules: {},
  });
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  const courseSelection = user?.courseSelection || "digital_marketing";
  const hasDigitalAccess = courseSelection === "digital_marketing";

  // Load digital marketing structure
  useEffect(() => {
    if (hasDigitalAccess) {
      loadDigitalMarketingAllStructure().catch((err) => {
        console.error("Failed to load digital courses:", err);
      });
    }
  }, [hasDigitalAccess, loadDigitalMarketingAllStructure]);

  // Calculate progress when data changes
  useEffect(() => {
    if (digitalMarketingGoals.length > 0) {
      calculateLocalProgress();
    }
  }, [completedContent, digitalMarketingGoals]);

  // Listen for global completion events
  useEffect(() => {
    const handleGlobalCompletion = () => {
      console.log("DigitalCourses: Received global completion event");
      calculateLocalProgress();
      setLastUpdateTime(Date.now());
    };

    window.addEventListener("contentCompleted", handleGlobalCompletion);
    window.addEventListener("subtopicCompleted", handleGlobalCompletion);
    window.addEventListener("progressUpdated", handleGlobalCompletion);

    return () => {
      window.removeEventListener("contentCompleted", handleGlobalCompletion);
      window.removeEventListener("subtopicCompleted", handleGlobalCompletion);
      window.removeEventListener("progressUpdated", handleGlobalCompletion);
    };
  }, []);

  const calculateLocalProgress = useCallback(() => {
    console.log("DigitalCourses: Calculating local progress");
    const goalsProgress = {};
    const coursesProgress = {};
    const modulesProgress = {};

    digitalMarketingGoals.forEach((goal) => {
      // Calculate goal progress
      let goalTotal = 0;
      let goalCompleted = 0;

      goal.modules?.forEach((module) => {
        // Calculate module progress
        let moduleTotal = 0;
        let moduleCompleted = 0;

        module.topics?.forEach((topic) => {
          topic.subtopics?.forEach((subtopic) => {
            subtopic.content?.forEach((content) => {
              goalTotal++;
              moduleTotal++;

              if (isContentCompleted(content)) {
                goalCompleted++;
                moduleCompleted++;
              }
            });
          });
        });

        modulesProgress[module.id] =
          moduleTotal > 0 ? (moduleCompleted / moduleTotal) * 100 : 0;
      });

      goalsProgress[goal.id] =
        goalTotal > 0 ? (goalCompleted / goalTotal) * 100 : 0;

      // For courses, we'll use module progress as course progress
      // since digital marketing doesn't have a course level
      goal.modules?.forEach((module) => {
        coursesProgress[module.id] = modulesProgress[module.id] || 0;
      });
    });

    setLocalProgress({
      goals: goalsProgress,
      courses: coursesProgress,
      modules: modulesProgress,
    });
  }, [completedContent, digitalMarketingGoals]);

  const isContentCompleted = (content) => {
    if (!content) return false;
    return (
      completedContent.some((id) => String(id) === String(content.id)) ||
      content.is_completed === true
    );
  };

  const isSubtopicCompleted = (subtopic) => {
    if (!subtopic?.content) return false;

    // A subtopic is considered completed if all its content items are completed
    const allContent = subtopic.content || [];
    if (allContent.length === 0) return false;

    return allContent.every((content) => isContentCompleted(content));
  };

  const getGoalProgress = (goal) => {
    return localProgress.goals[goal.id] || 0;
  };

  const getCourseProgress = (module) => {
    // In digital marketing, modules act as courses
    return localProgress.courses[module.id] || 0;
  };

  const getModuleProgress = (module) => {
    return localProgress.modules[module.id] || 0;
  };

  const toggleGoal = (goalId) => {
    setExpandedGoal(expandedGoal === goalId ? null : goalId);
    setExpandedCourse(null);
    setExpandedModule(null);
    setSelectedSubtopic(null);
  };

  const toggleCourse = (moduleId, e) => {
    e.stopPropagation();
    setExpandedCourse(expandedCourse === moduleId ? null : moduleId);
    setExpandedModule(null);
    setSelectedSubtopic(null);
  };

  const toggleModule = (topicId, e) => {
    e.stopPropagation();
    setExpandedModule(expandedModule === topicId ? null : topicId);
  };

  const handleSubtopicClick = (
    subtopic,
    goal,
    module,
    topic,
    goalName,
    moduleName,
    topicName
  ) => {
    if (!hasDigitalAccess) {
      alert(
        "You don't have access to Digital Marketing. Please upgrade your subscription."
      );
      return;
    }

    setSelectedSubtopic(subtopic.id);

    // Navigate to the first content item in the subtopic
    if (subtopic.content && subtopic.content.length > 0) {
      const firstContent = subtopic.content[0];
      if (firstContent.content_uuid) {
        // ✅ FIXED: Always use the generic digital content route
        // since that's the only route defined in App.js
        navigate(`/digital/content/${firstContent.content_uuid}`, {
          state: {
            goalId: goal.id,
            moduleId: module.id,
            topicId: topic.id,
            subtopicId: subtopic.id,
            goalName: goal.name,
            moduleName: module.name,
            topicName: topic.name,
            subtopicName: subtopic.name,
            contentUuid: firstContent.content_uuid,
            contentType: firstContent.content_type,
            contentItem: firstContent,
            fromCourse: true,
          },
        });
      }
    }
  };

  const isMCQ = (subtopic) => {
    if (!subtopic) return false;
    // Check if any content is MCQ type
    return subtopic.content?.some((content) => content.content_type === "mcq");
  };

  const getSubtopicDisplayName = (subtopic) => {
    if (isMCQ(subtopic)) return "MCQ Practice";
    return subtopic.name || "Untitled Subtopic";
  };

  const getContentTypeIcon = (contentType) => {
    switch (contentType) {
      case "video":
      case "class":
        return "🎥";
      case "cheatsheet":
        return "📄";
      case "mcq":
        return "❓";
      default:
        return "📁";
    }
  };

  if (digitalMarketingLoading) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="loading-spinner">Loading courses...</div>
      </div>
    );
  }

  if (!hasDigitalAccess) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="access-denied">
          <h2>Digital Marketing Access Required</h2>
          <p>You don't have access to Digital Marketing courses.</p>
          <button onClick={() => navigate("/profile")}>Upgrade Now</button>
        </div>
      </div>
    );
  }

  if (!digitalMarketingGoals || digitalMarketingGoals.length === 0) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="no-courses">
          <h3>No courses available</h3>
          <p>Please check back later or contact support.</p>
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
      {/* Debug info (hidden) */}
      <div style={{ display: "none" }}>
        Last update: {lastUpdateTime}
        <br />
        Completed count: {completedContent?.length || 0}
      </div>

      {/* Goals List */}
      <div className="goals-wrapper">
        {digitalMarketingGoals.map((goal, goalIndex) => {
          const goalPercent = getGoalProgress(goal);
          const isGoalExpanded = expandedGoal === goal.id;

          return (
            <section className="goal-group" key={goal.id}>
              <div
                className="goal-rail"
                style={{ backgroundColor: goal.color || "#9c27b0" }}
                aria-hidden="true"
              />
              <header
                className="goal-header"
                onClick={() => toggleGoal(goal.id)}
              >
                <div className="goal-title-wrap">
                  <h2
                    className="goal-title"
                    style={{ color: goal.color || "#9c27b0" }}
                  >
                    {goal.name}
                    {!goal.is_enrolled && (
                      <span className="locked-tag"> 🔒 Not Enrolled</span>
                    )}
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

              <div className="goal-body">
                {isGoalExpanded && !goal.is_enrolled && (
                  <div
                    className="enroll-prompt"
                    style={{ padding: "20px", textAlign: "center" }}
                  >
                    <p>You are not enrolled in this course.</p>
                    <button
                      className="enroll-btn"
                      onClick={async () => {
                        const result = await enrollInDigitalMarketingCourse(
                          goal.id
                        );
                        if (result.success) {
                          alert("Successfully enrolled!");
                          loadDigitalMarketingAllStructure();
                        }
                      }}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: goal.color || "#9c27b0",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Enroll Now
                    </button>
                  </div>
                )}

                {isGoalExpanded &&
                  goal.is_enrolled &&
                  goal.modules?.map((module) => {
                    const modulePercent = getCourseProgress(module);
                    const isCourseExpanded = expandedCourse === module.id;
                    const accessibleTopics = module.topics || [];

                    return (
                      <div className="courses" key={module.id}>
                        {/* Module Header (acts as Course) */}
                        <div className="couses-and-status">
                          <h4 style={{ color: "inherit" }}>{module.name}</h4>

                          <div className="progress-section_module">
                            <div
                              className="circular-progress"
                              style={{ "--progress": modulePercent }}
                            >
                              <span className="progress-value">
                                {modulePercent.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expand Topics Button */}
                        <div className="active-module_course">
                          <button onClick={(e) => toggleCourse(module.id, e)}>
                            {isCourseExpanded ? (
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
                            onClick={(e) => toggleCourse(module.id, e)}
                            style={{
                              cursor: "pointer",
                              color: "inherit",
                            }}
                          >
                            Topics
                          </p>
                        </div>

                        {/* Topics */}
                        {isCourseExpanded && (
                          <div className="module-details">
                            {accessibleTopics.map((topic) => {
                              const isExpanded = expandedModule === topic.id;
                              const topicProgress = getModuleProgress(topic);
                              const isTopicCompleted = topicProgress >= 100;
                              const accessibleSubtopics = topic.subtopics || [];

                              return (
                                <div
                                  className={`module-container ${
                                    isExpanded ? "expanded" : ""
                                  }`}
                                  key={topic.id}
                                >
                                  <div
                                    className="module-single-div"
                                    onClick={(e) => toggleModule(topic.id, e)}
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

                                      {isExpanded && (
                                        <>
                                          {accessibleSubtopics.map(
                                            (subtopic) => {
                                              const isCompleted =
                                                isSubtopicCompleted(subtopic);
                                              return (
                                                <div
                                                  className="circle-row subtopic-circle-row"
                                                  key={subtopic.id}
                                                >
                                                  <div
                                                    className={`circle subtopic-circle ${
                                                      isCompleted
                                                        ? "completed"
                                                        : ""
                                                    }`}
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleSubtopicClick(
                                                        subtopic,
                                                        goal,
                                                        module,
                                                        topic,
                                                        goal.name,
                                                        module.name,
                                                        topic.name
                                                      );
                                                    }}
                                                  >
                                                    {isCompleted ? "✓" : ""}
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                          {accessibleSubtopics.length > 0 && (
                                            <div className="vertical-line"></div>
                                          )}
                                        </>
                                      )}
                                    </div>

                                    {/* Content Column */}
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

                                        {/* Expand Subtopics Button */}
                                        <div className="active-module_subtopic">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleModule(topic.id, e);
                                            }}
                                            aria-label={
                                              isExpanded
                                                ? "Collapse topic"
                                                : "Expand topic"
                                            }
                                          >
                                            {isExpanded ? (
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

                                      {isExpanded && (
                                        <div className="subtopics-section">
                                          {accessibleSubtopics.map(
                                            (subtopic) => {
                                              const isCompleted =
                                                isSubtopicCompleted(subtopic);
                                              return (
                                                <div
                                                  className={`subtopic-content-row ${
                                                    isCompleted
                                                      ? "completed"
                                                      : ""
                                                  }`}
                                                  key={subtopic.id}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSubtopicClick(
                                                      subtopic,
                                                      goal,
                                                      module,
                                                      topic,
                                                      goal.name,
                                                      module.name,
                                                      topic.name
                                                    );
                                                  }}
                                                >
                                                  <span className="subtopic-text">
                                                    {getSubtopicDisplayName(
                                                      subtopic
                                                    )}
                                                  </span>
                                                  {subtopic.content &&
                                                    subtopic.content.length >
                                                      0 && (
                                                      <div className="content-type-icons">
                                                        {subtopic.content.map(
                                                          (content, idx) => (
                                                            <span
                                                              key={idx}
                                                              className="content-type-icon"
                                                              title={
                                                                content.content_type
                                                              }
                                                            >
                                                              {getContentTypeIcon(
                                                                content.content_type
                                                              )}
                                                            </span>
                                                          )
                                                        )}
                                                      </div>
                                                    )}
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Right Side Lesson Content */}
                                  {isExpanded && selectedSubtopic && (
                                    <div className="lesson-content">
                                      {/* Content will be displayed in the routed component */}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
