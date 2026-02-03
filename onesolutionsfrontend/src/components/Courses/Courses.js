"use client";
import React, { useState, useEffect, useCallback } from "react";
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
    calculateCourseProgress,
    calculateGoalProgress,
    refreshProgress,
    user, // Assuming user object contains studentType
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

  // Get student type from user context
  const studentType = user?.studentType || "zorvixe_core"; // Default to core if not specified

  // ✅ Filter goals based on student type
  const filteredGoals = goalsData.filter(
    (goal) => !goal.accessibleTo || goal.accessibleTo.includes(studentType)
  );

  // ✅ Filter courses based on student type
  const getFilteredCourses = (courses) => {
    return courses.filter(
      (course) =>
        !course.accessibleTo || course.accessibleTo.includes(studentType)
    );
  };

  // ✅ Filter modules based on student type
  const getFilteredModules = (modules) => {
    return modules.filter(
      (module) =>
        !module.accessibleTo || module.accessibleTo.includes(studentType)
    );
  };

  // ✅ Filter subtopics based on student type
  const getFilteredSubtopics = (topics) => {
    if (!topics) return [];
    return topics.filter(
      (topic) => !topic.accessibleTo || topic.accessibleTo.includes(studentType)
    );
  };

  // ✅ Load progress and calculate local progress on mount
  useEffect(() => {
    console.log("Courses: Initial load progress");
    loadProgressSummary();
    calculateLocalProgress();
  }, []);

  // ✅ Calculate local progress whenever completedContent changes
  useEffect(() => {
    console.log("Courses: completedContent changed, recalculating progress", {
      completedContentLength: completedContent?.length || 0,
    });
    calculateLocalProgress();
    setLastUpdateTime(Date.now()); // Force re-render
  }, [completedContent]);

  // ✅ Listen for global completion events
  useEffect(() => {
    const handleGlobalCompletion = () => {
      console.log("Courses: Received global completion event");
      // Force refresh from context
      if (refreshProgress) {
        refreshProgress();
      }
      loadProgressSummary().then(() => {
        calculateLocalProgress();
        setLastUpdateTime(Date.now());
      });
    };

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "completedContent" || e.key === "progress_update") {
        console.log("Courses: Storage changed, refreshing...");
        setTimeout(() => {
          loadProgressSummary().then(() => {
            calculateLocalProgress();
            setLastUpdateTime(Date.now());
          });
        }, 100);
      }
    };

    // Listen for custom events
    window.addEventListener("contentCompleted", handleGlobalCompletion);
    window.addEventListener("subtopicCompleted", handleGlobalCompletion);
    window.addEventListener("progressUpdated", handleGlobalCompletion);
    window.addEventListener("storage", handleStorageChange);

    // Set up interval to check for updates
    const intervalId = setInterval(() => {
      const lastUpdate = localStorage.getItem("lastProgressUpdate");
      if (lastUpdate && parseInt(lastUpdate) > lastUpdateTime) {
        console.log("Courses: Interval check - progress updated externally");
        loadProgressSummary().then(() => {
          calculateLocalProgress();
          setLastUpdateTime(parseInt(lastUpdate));
        });
      }
    }, 1000);

    return () => {
      window.removeEventListener("contentCompleted", handleGlobalCompletion);
      window.removeEventListener("subtopicCompleted", handleGlobalCompletion);
      window.removeEventListener("progressUpdated", handleGlobalCompletion);
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, [lastUpdateTime]);

  const calculateLocalProgress = useCallback(() => {
    console.log("Courses: Calculating local progress");
    const goalsProgress = {};
    const coursesProgress = {};
    const modulesProgress = {};

    filteredGoals.forEach((goal) => {
      // Calculate goal progress - only include accessible content
      const goalProg = calculateGoalProgress(goal);
      goalsProgress[goal.id] = goalProg;
      console.log(`Goal ${goal.title}: ${goalProg}%`);

      const accessibleCourses = getFilteredCourses(goal.courses);
      accessibleCourses.forEach((course) => {
        // Calculate course progress - only include accessible content
        const courseProg = calculateCourseProgress(course);
        coursesProgress[course.id] = courseProg;
        console.log(`Course ${course.title}: ${courseProg}%`);

        const accessibleModules = getFilteredModules(course.modules);
        accessibleModules.forEach((module) => {
          // Calculate module progress - only include accessible content
          const moduleProg = calculateModuleProgress(module);
          modulesProgress[module.id] = moduleProg;
          console.log(`Module ${module.name}: ${moduleProg}%`);

          // Log accessible subtopic completion status
          const accessibleSubtopics = getFilteredSubtopics(module.topic);
          accessibleSubtopics.forEach((subtopic) => {
            const isCompleted = completedContent.includes(subtopic.id);
            console.log(
              `Subtopic ${subtopic.name} (${subtopic.id}): ${isCompleted ? "COMPLETED" : "not completed"}`
            );
          });
        });
      });
    });

    setLocalProgress({
      goals: goalsProgress,
      courses: coursesProgress,
      modules: modulesProgress,
    });
  }, [
    calculateGoalProgress,
    calculateCourseProgress,
    calculateModuleProgress,
    completedContent,
    filteredGoals,
    getFilteredCourses,
    getFilteredModules,
    getFilteredSubtopics,
  ]);

  // Enhanced goal locking - checks ALL previous goals
  const isGoalLocked = (goalIndex) => {
    if (goalIndex === 0 || goalIndex === 2) return false;

    for (let i = 0; i < goalIndex; i++) {
      const previousGoal = filteredGoals[i];
      const previousGoalProgress = getGoalProgress(previousGoal);

      if (previousGoalProgress < 100) {
        return true;
      }
    }

    return false;
  };

  const toggleGoal = (goalId, goalIndex) => {
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
    if (isGoalLocked(goalIndex)) {
      showLockedMessage();
      return;
    }

    setExpandedCourse(expandedCourse === courseId ? null : courseId);
    setExpandedModule(null);
    setSelectedSubtopic(null);
  };

  const toggleModule = (moduleName, goalIndex) => {
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

  const getGoalProgress = (goal) => {
    const progress =
      localProgress.goals[goal.id] ||
      goalProgress[goal.title] ||
      goal.progress ||
      0;

    return Math.min(100, Math.max(0, Number(progress) || 0));
  };

  const getCourseProgress = (course) => {
    const progress =
      localProgress.courses[course.id] ||
      courseProgress[course.title] ||
      course.progress ||
      0;

    return Math.min(100, Math.max(0, Number(progress) || 0));
  };

  const getModuleProgress = (module) => {
    const progress =
      localProgress.modules[module.id] || calculateModuleProgress(module) || 0;

    return Math.min(100, Math.max(0, Number(progress) || 0));
  };

  // ✅ REAL-TIME check if subtopic is completed
  const isSubtopicCompleted = (subtopicId) => {
    const completed = completedContent.includes(subtopicId);
    console.log(
      `Courses: Checking subtopic ${subtopicId}: ${completed ? "COMPLETED" : "not completed"}`
    );
    return completed;
  };

  const showLockedMessage = () => {
    alert("This content is locked.");
  };

  // Debug info for student type
  console.log("Current student type:", studentType);

  return (
    <div
      className="courses-container"
      style={{ marginTop: "50px" }}
      key={`courses-${lastUpdateTime}-${studentType}`}
    >
      {/* Debug info */}
      <div style={{ display: "none" }}>
        Last update: {lastUpdateTime}
        <br />
        Completed count: {completedContent?.length || 0}
        <br />
        Student type: {studentType}
      </div>

      {/* Goals List */}
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
                          backgroundColor: goal.color,
                        }}
                      />
                    </div>
                    <span
                      className="progress-percent"
                      style={{ color: goal.color }}
                    >{`${goalPercent.toFixed(1)}%`}</span>
                  </div>
                </div>
              </header>

              <div className="goal-body">
                {!locked && accessibleCourses.length === 0 ? (
                  <div className="no-courses">
                    <h4>No courses found</h4>
                    <p>You don't have any accessible courses in this goal.</p>
                  </div>
                ) : (
                  accessibleCourses.map((course) => {
                    const coursePercent = getCourseProgress(course);

                    return (
                      <div className={`courses ${""}`} key={course.id}>
                        {/* Course Header */}
                        <div className="couses-and-status">
                          {(() => {
                            const [before, after] = course.title.split(":");

                            return (
                              <h4 style={{ color: "inherit" }}>
                                {before}
                                {after && (
                                  <span className="highlight-after">
                                    {after}
                                  </span>
                                )}
                              </h4>
                            );
                          })()}

                          <div className="progress-section_module">
                            <div
                              className={`circular-progress ${""}`}
                              style={{ "--progress": coursePercent }}
                            >
                              <span className="progress-value">
                                {coursePercent.toFixed(1)}%
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

                        {/* Modules */}
                        {expandedCourse === course.id && !locked && (
                          <div className="module-details">
                            {(getFilteredModules(course.modules) || []).map(
                              (module) => {
                                const accessibleSubtopics =
                                  getFilteredSubtopics(module.topic);
                                const isExpanded =
                                  expandedModule === module.name;
                                const moduleProgress =
                                  getModuleProgress(module);
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
                                              isModuleCompleted
                                                ? "completed"
                                                : ""
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
                                                console.log(
                                                  `Rendering subtopic ${subtopic.id}: ${isCompleted ? "completed" : "not completed"}`
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

                                          {/* Expand Modules Button */}
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

                                    {/* Right Side Lesson Content */}
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
