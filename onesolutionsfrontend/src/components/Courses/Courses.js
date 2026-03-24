"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { goalsData } from "../../data/goalsData";
import "./Courses.css";

export default function Courses() {
  const navigate = useNavigate();
  const {
    completedContent,
    goalProgress,
    courseProgress,
    loadProgressSummary,
    calculateModuleProgress,
    refreshProgress,
    user,
  } = useAuth();

  const [expandedGoal, setExpandedGoal] = useState(goalsData[0]?.id || null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [localProgress, setLocalProgress] = useState({
    goals: {},
    courses: {},
    modules: {},
  });
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const isInitialMount = useRef(true);

  // Get student type and course selection from user context
  const studentType = user?.studentType || "zorvixe_core";
  const courseSelection = user?.courseSelection || "web_development";

  // Check if user has web development access
  const hasWebDevelopmentAccess = courseSelection === "web_development";

  // ========== FILTER FUNCTIONS (memoized with stable dependencies) ==========
  const getFilteredCourses = useCallback(
    (courses) => {
      if (!courses) return [];
      return courses.filter((course) => {
        // Exclude specific courses (Frontend Interview Kit and Backend Interview Kit)
        if (course.id === "g3 c3" || course.id === "QW9_m1_A0 g3_H c5_7B") {
          return false;
        }
        const isAccessibleByType =
          !course.accessibleTo || course.accessibleTo.includes(studentType);
        const isSelectedByCourse =
          !course.course_selection ||
          course.course_selection.some((selection) => selection === courseSelection);
        return isAccessibleByType && isSelectedByCourse;
      });
    },
    [studentType, courseSelection]
  );

  const getFilteredModules = useCallback(
    (modules) => {
      if (!modules) return [];
      return modules.filter(
        (module) => !module.accessibleTo || module.accessibleTo.includes(studentType)
      );
    },
    [studentType]
  );

  const getFilteredSubtopics = useCallback(
    (topics) => {
      if (!topics) return [];
      return topics.filter(
        (topic) => !topic.accessibleTo || topic.accessibleTo.includes(studentType)
      );
    },
    [studentType]
  );

  // Memoized filtered goals based on student type and access
  const filteredGoals = useMemo(() => {
    if (!hasWebDevelopmentAccess) return [];
    return goalsData.filter(
      (goal) => !goal.accessibleTo || goal.accessibleTo.includes(studentType)
    );
  }, [hasWebDevelopmentAccess, studentType]);

  // ========== CORE PROGRESS CALCULATION (memoized with stable dependencies) ==========
  const calculateLocalProgress = useCallback(() => {
    if (!hasWebDevelopmentAccess) return;

    console.log("Courses: Calculating local progress based on accessible items");
    const goalsProgress = {};
    const coursesProgress = {};
    const modulesProgress = {};

    filteredGoals.forEach((goal) => {
      const accessibleCourses = getFilteredCourses(goal.courses);

      if (accessibleCourses.length === 0) {
        goalsProgress[goal.id] = 0;
        return;
      }

      let totalCourseProgress = 0;
      accessibleCourses.forEach((course) => {
        const accessibleModules = getFilteredModules(course.modules);

        if (accessibleModules.length === 0) {
          coursesProgress[course.id] = 0;
          return;
        }

        let totalModuleProgress = 0;
        accessibleModules.forEach((module) => {
          const accessibleSubtopics = getFilteredSubtopics(module.topic);

          if (accessibleSubtopics.length === 0) {
            modulesProgress[module.id] = 0;
            return;
          }

          let completedCount = 0;
          accessibleSubtopics.forEach((subtopic) => {
            if (completedContent.includes(subtopic.id)) {
              completedCount++;
            }
          });

          const modulePercent = (completedCount / accessibleSubtopics.length) * 100;
          modulesProgress[module.id] = modulePercent;
          totalModuleProgress += modulePercent;
        });

        const coursePercent = totalModuleProgress / accessibleModules.length;
        coursesProgress[course.id] = coursePercent;
        totalCourseProgress += coursePercent;
      });

      const goalPercent = totalCourseProgress / accessibleCourses.length;
      goalsProgress[goal.id] = goalPercent;

      console.log(`Goal ${goal.title}: ${goalPercent.toFixed(1)}% (${accessibleCourses.length} courses)`);
    });

    setLocalProgress((prev) => {
      // Only update if something actually changed to prevent unnecessary re-renders
      const newState = {
        goals: goalsProgress,
        courses: coursesProgress,
        modules: modulesProgress,
      };
      
      // Simple comparison to avoid unnecessary updates
      if (JSON.stringify(prev) === JSON.stringify(newState)) {
        return prev;
      }
      return newState;
    });
  }, [
    filteredGoals,
    getFilteredCourses,
    getFilteredModules,
    getFilteredSubtopics,
    completedContent,
    hasWebDevelopmentAccess,
  ]);

  // ========== EFFECTS ==========
  // Load initial progress only on mount
  useEffect(() => {
    if (hasWebDevelopmentAccess && isInitialMount.current) {
      console.log("Courses: Initial load progress");
      isInitialMount.current = false;
      loadProgressSummary();
      calculateLocalProgress();
    }
  }, [hasWebDevelopmentAccess, loadProgressSummary, calculateLocalProgress]);

  // Recalculate when completedContent changes (but not on initial mount)
  useEffect(() => {
    if (hasWebDevelopmentAccess && !isInitialMount.current) {
      console.log("Courses: completedContent changed, recalculating progress", {
        completedContentLength: completedContent?.length || 0,
      });
      calculateLocalProgress();
      setLastUpdateTime(Date.now());
    }
  }, [completedContent, hasWebDevelopmentAccess, calculateLocalProgress]);

  // Listen for global completion events
  useEffect(() => {
    const handleGlobalCompletion = () => {
      if (hasWebDevelopmentAccess) {
        console.log("Courses: Received global completion event");
        if (refreshProgress) {
          refreshProgress();
        }
        loadProgressSummary().then(() => {
          calculateLocalProgress();
          setLastUpdateTime(Date.now());
        });
      }
    };

    const handleStorageChange = (e) => {
      if (
        hasWebDevelopmentAccess &&
        (e.key === "completedContent" || e.key === "progress_update")
      ) {
        console.log("Courses: Storage changed, refreshing...");
        setTimeout(() => {
          loadProgressSummary().then(() => {
            calculateLocalProgress();
            setLastUpdateTime(Date.now());
          });
        }, 100);
      }
    };

    window.addEventListener("contentCompleted", handleGlobalCompletion);
    window.addEventListener("subtopicCompleted", handleGlobalCompletion);
    window.addEventListener("progressUpdated", handleGlobalCompletion);
    window.addEventListener("storage", handleStorageChange);

    const intervalId = setInterval(() => {
      if (hasWebDevelopmentAccess) {
        const lastUpdate = localStorage.getItem("lastProgressUpdate");
        if (lastUpdate && parseInt(lastUpdate) > lastUpdateTime) {
          console.log("Courses: Interval check - progress updated externally");
          loadProgressSummary().then(() => {
            calculateLocalProgress();
            setLastUpdateTime(parseInt(lastUpdate));
          });
        }
      }
    }, 5000); // Increased interval to 5 seconds to reduce frequency

    return () => {
      window.removeEventListener("contentCompleted", handleGlobalCompletion);
      window.removeEventListener("subtopicCompleted", handleGlobalCompletion);
      window.removeEventListener("progressUpdated", handleGlobalCompletion);
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, [lastUpdateTime, hasWebDevelopmentAccess, refreshProgress, loadProgressSummary, calculateLocalProgress]);

  // ========== UI HELPERS ==========
  const isGoalLocked = useCallback((goalIndex) => {
    if (goalIndex === 0 || goalIndex === 1 || goalIndex === 2) return false;

    for (let i = 0; i < goalIndex; i++) {
      const previousGoal = filteredGoals[i];
      if (!previousGoal) continue;
      const previousGoalProgress = getGoalProgress(previousGoal);
      if (previousGoalProgress < 100) {
        return true;
      }
    }
    return false;
  }, [filteredGoals, localProgress.goals]);

  const toggleGoal = (goalId, goalIndex) => {
    if (!hasWebDevelopmentAccess) {
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
    setSelectedSubtopic(null);
  };

  const toggleCourse = (courseId, goalIndex) => {
    if (!hasWebDevelopmentAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
    setExpandedModule(null);
    setSelectedSubtopic(null);
  };

  const toggleModule = (moduleName, goalIndex) => {
    if (!hasWebDevelopmentAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }
    setExpandedModule(expandedModule === moduleName ? null : moduleName);
  };

  const isMCQ = (subtopic) => {
    if (typeof subtopic === "string") {
      return subtopic.toLowerCase().includes("mcq");
    } else if (subtopic && subtopic.name) {
      return subtopic.name.toLowerCase().includes("mcq");
    }
    return false;
  };

  const isCodingPractice = (subtopic) => {
    if (typeof subtopic === "string") {
      return subtopic.toLowerCase().includes("coding practice");
    } else if (subtopic && subtopic.name) {
      return subtopic.name.toLowerCase().includes("coding practice");
    }
    return false;
  };

  const handleSubtopicClick = (
    moduleId,
    subtopicId,
    subtopicName,
    goalName,
    courseName,
    goalIndex
  ) => {
    if (!hasWebDevelopmentAccess) {
      showNoAccessMessage();
      return;
    }
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }
    setSelectedSubtopic(subtopicName);
    navigate(`/topic/${moduleId}/subtopic/${subtopicId}`, {
      state: {
        moduleId,
        subtopicId,
        subtopicName,
        goalName,
        courseName,
        goalIndex,
        fromCourse: true,
      },
    });
  };

  const getSubtopicContent = (subtopic) => {
    return <p>Content for {subtopic}</p>;
  };

  // Progress getters - memoized to prevent recreation
  const getGoalProgress = useCallback((goal) => {
    const progress = localProgress.goals[goal.id];
    if (progress !== undefined) {
      return Math.min(100, Math.max(0, Number(progress) || 0));
    }
    const fallbackProgress = goalProgress[goal.title] || goal.progress || 0;
    return Math.min(100, Math.max(0, Number(fallbackProgress) || 0));
  }, [localProgress.goals, goalProgress]);

  const getCourseProgress = useCallback((course) => {
    const progress = localProgress.courses[course.id];
    if (progress !== undefined) {
      return Math.min(100, Math.max(0, Number(progress) || 0));
    }
    const fallbackProgress = courseProgress[course.title] || course.progress || 0;
    return Math.min(100, Math.max(0, Number(fallbackProgress) || 0));
  }, [localProgress.courses, courseProgress]);

  const getModuleProgress = useCallback((module) => {
    const progress = localProgress.modules[module.id];
    if (progress !== undefined) {
      return Math.min(100, Math.max(0, Number(progress) || 0));
    }
    const fallbackProgress = calculateModuleProgress(module) || 0;
    return Math.min(100, Math.max(0, Number(fallbackProgress) || 0));
  }, [localProgress.modules, calculateModuleProgress]);

  const isSubtopicCompleted = useCallback((subtopicId) => {
    return completedContent.includes(subtopicId);
  }, [completedContent]);

  const showLockedMessage = () => {
    alert("This content is locked. Please complete the previous goal first.");
  };

  const showNoAccessMessage = () => {
    alert(
      "You don't have access to Web Development courses. Please select Web Development in your profile."
    );
  };

  // Debug info - reduced logging frequency
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Current student type:", studentType);
      console.log("Current course selection:", courseSelection);
      console.log("Has web development access:", hasWebDevelopmentAccess);
      console.log("Filtered goals count:", filteredGoals.length);
    }
  }, [studentType, courseSelection, hasWebDevelopmentAccess, filteredGoals.length]);

  // ========== RENDERING ==========
  if (!hasWebDevelopmentAccess) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="access-denied-container">
          <img
            src="/assets/img/locked_image.png"
            alt="Access Denied"
            className="locked_image"
          />
          <h3>Access Denied</h3>
          <p>You don't have access to Web Development courses.</p>
          <p>Please update your profile to select Web Development.</p>
        </div>
      </div>
    );
  }

  if (filteredGoals.length === 0) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="no-courses-container">
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
      key={`courses-${lastUpdateTime}-${studentType}-${courseSelection}`}
    >
      <div className="goals-wrapper">
        {filteredGoals.map((goal, goalIndex) => {
          const goalPercent = getGoalProgress(goal);
          const locked = isGoalLocked(goalIndex);
          const accessibleCourses = getFilteredCourses(goal.courses);

          return (
            <section
              className={`goal-group ${locked ? "goal-locked" : ""}`}
              key={goal.id}
            >
              <div
                className="goal-rail"
                style={{ backgroundColor: goal.color }}
                aria-hidden="true"
              />
              <header
                className={`goal-header ${locked ? "goal-header-locked" : ""}`}
                onClick={() => toggleGoal(goal.id, goalIndex)}
              >
                <div className="goal-title-wrap">
                  <h2 className="goal-title" style={{ color: goal.color }}>
                    {goal.title}
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
                          backgroundColor: goal.color,
                        }}
                      />
                    </div>
                    <span
                      className="progress-percent"
                      style={{ color: goal.color }}
                    >
                      {`${goalPercent.toFixed(1)}%`}
                    </span>
                  </div>
                </div>
              </header>

              <div className="goal-body">
                {!locked && accessibleCourses.length === 0 && (
                  <div className="no-courses">
                    <h4>No courses found</h4>
                    <p>
                      You don't have any accessible courses in this goal based
                      on your student type and course selection.
                    </p>
                  </div>
                )}
                {!locked &&
                  accessibleCourses.map((course) => {
                    const coursePercent = getCourseProgress(course);
                    return (
                      <div className="courses" key={course.id}>
                        <div className="couses-and-status">
                          {(() => {
                            const [before, after] = course.title.split(":");
                            return (
                              <h4 style={{ color: "inherit" }}>
                                {before}
                                {after && (
                                  <span className="highlight-after">{after}</span>
                                )}
                              </h4>
                            );
                          })()}
                          <div className="progress-section_module">
                            <div
                              className="circular-progress"
                              style={{ "--progress": coursePercent }}
                            >
                              <span className="progress-value">
                                {coursePercent.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="active-module_course">
                          <button
                            onClick={() =>
                              locked
                                ? showLockedMessage()
                                : toggleCourse(course.id, goalIndex)
                            }
                          >
                            {expandedCourse === course.id ? (
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
                                : toggleCourse(course.id, goalIndex)
                            }
                            style={{
                              cursor: "pointer",
                              color: "inherit",
                            }}
                          >
                            Active Modules
                          </p>
                        </div>

                        {expandedCourse === course.id && !locked && (
                          <div className="module-details">
                            {getFilteredModules(course.modules).map(
                              (module) => {
                                const accessibleSubtopics = getFilteredSubtopics(
                                  module.topic
                                );
                                const isExpanded =
                                  expandedModule === module.name;
                                const moduleProgress = getModuleProgress(module);
                                const isModuleCompleted = moduleProgress >= 100;

                                return (
                                  <div
                                    className={`module-container ${
                                      isExpanded ? "expanded" : ""
                                    }`}
                                    key={module.id}
                                  >
                                    <div
                                      className="module-single-div"
                                      onClick={() =>
                                        toggleModule(module.name, goalIndex)
                                      }
                                    >
                                      {/* Timeline Column */}
                                      <div className="timeline">
                                        <div className="circle-row module-circle-row">
                                          <div
                                            className={`circle module-circle ${
                                              isModuleCompleted ? "completed" : ""
                                            }`}
                                            style={{
                                              "--progress": `${moduleProgress}%`,
                                            }}
                                          >
                                            {isModuleCompleted ? "✓" : ""}
                                          </div>
                                        </div>

                                        {isExpanded && (
                                          <>
                                            {accessibleSubtopics.map(
                                              (subtopic) => {
                                                const isCompleted =
                                                  isSubtopicCompleted(
                                                    subtopic.id
                                                  );
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
                                                          module.id,
                                                          subtopic.id,
                                                          subtopic.name,
                                                          goal.title,
                                                          course.title,
                                                          goalIndex
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
                                              <h5>{module.name}</h5>
                                            </div>
                                          </div>

                                          <div className="active-module_subtopic">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleModule(
                                                  module.name,
                                                  goalIndex
                                                );
                                              }}
                                              aria-label={
                                                isExpanded
                                                  ? "Collapse module"
                                                  : "Expand module"
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
                                                  isSubtopicCompleted(
                                                    subtopic.id
                                                  );
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
                                                        module.id,
                                                        subtopic.id,
                                                        subtopic.name,
                                                        goal.title,
                                                        course.title,
                                                        goalIndex
                                                      );
                                                    }}
                                                  >
                                                    <span className="subtopic-text">
                                                      {isMCQ(subtopic)
                                                        ? "MCQ Practice"
                                                        : isCodingPractice(
                                                            subtopic
                                                          )
                                                          ? "Coding Practice"
                                                          : subtopic.name}
                                                    </span>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {isExpanded && selectedSubtopic && (
                                      <div className="lesson-content">
                                        {getSubtopicContent(selectedSubtopic)}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
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