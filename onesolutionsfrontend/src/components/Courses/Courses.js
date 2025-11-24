"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { goalsData } from "../../data/goalsData";
import "./Courses.css";

export default function Courses() {
  const navigate = useNavigate();
  const {
    completedContent,
    goalProgress: contextGoalProgress,
    goalDates,
    unlockedGoals,
    goalsLoading,
    loadGoalProgress,
    calculateModuleProgress,
    calculateCourseProgress,
    calculateGoalProgress,
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

  // ✅ Load goal progress on component mount
  useEffect(() => {
    loadGoalProgress();
  }, [loadGoalProgress]);

  // ✅ Calculate local progress whenever completedContent changes
  useEffect(() => {
    calculateLocalProgress();
  }, [completedContent, goalsData, unlockedGoals]);

  const calculateLocalProgress = () => {
    const goalsProgress = {};
    const coursesProgress = {};
    const modulesProgress = {};

    goalsData.forEach((goal) => {
      // Only calculate progress for unlocked goals
      const isGoalUnlocked =
        unlockedGoals[goal.id.toLowerCase().replace(" ", "")];

      if (isGoalUnlocked) {
        // Calculate goal progress
        goalsProgress[goal.id] = calculateGoalProgress(goal);

        goal.courses.forEach((course) => {
          // Calculate course progress
          const courseProg = calculateCourseProgress(course);
          coursesProgress[course.id] = courseProg;

          course.modules.forEach((module) => {
            // Calculate module progress
            const moduleProg = calculateModuleProgress(module);
            modulesProgress[module.id] = moduleProg;
          });
        });
      } else {
        goalsProgress[goal.id] = 0;
      }
    });

    setLocalProgress({
      goals: goalsProgress,
      courses: coursesProgress,
      modules: modulesProgress,
    });
  };

  const toggleGoal = (goalId) => {
    const isUnlocked = unlockedGoals[goalId.toLowerCase().replace(" ", "")];
    if (!isUnlocked) return;

    setExpandedGoal(expandedGoal === goalId ? null : goalId);
    setExpandedCourse(null);
    setExpandedModule(null);
    setSelectedSubtopic(null);
  };

  const toggleCourse = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
    setExpandedModule(null);
    setSelectedSubtopic(null);
  };

  const toggleModule = (moduleName) => {
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

  // ✅ Enhanced subtopic click handler
  const handleSubtopicClick = (
    moduleId,
    subtopicId,
    subtopicName,
    goalName,
    courseName
  ) => {
    setSelectedSubtopic(subtopicName);

    // Navigate based on content type
    if (isMCQ(subtopicName)) {
      navigate(`/topic/${moduleId}/subtopic/${subtopicId}`, {
        state: {
          subtopicId,
          subtopicName,
          goalName,
          courseName,
          isMCQ: true,
        },
      });
    } else if (subtopicName.toLowerCase().includes("cheat sheet")) {
      navigate(`/topic/${moduleId}/subtopic/${subtopicId}`, {
        state: {
          subtopicId,
          subtopicName,
          goalName,
          courseName,
          isCheatSheet: true,
        },
      });
    } else if (isCodingPractice(subtopicName)) {
      navigate(`/topic/${moduleId}/subtopic/${subtopicId}`, {
        state: {
          subtopicId,
          goalName,
          courseName,
          fromCourse: true,
        },
      });
    } else {
      navigate(`/topic/${moduleId}/subtopic/${subtopicId}`, {
        state: {
          subtopicId,
          subtopicName,
          goalName,
          courseName,
        },
      });
    }
  };

  const getSubtopicContent = (subtopic) => {
    return <p>Content for {subtopic}</p>;
  };

  // ✅ Get progress percentage with fallbacks
  const getGoalProgress = (goal) => {
    return (
      localProgress.goals[goal.id] ||
      contextGoalProgress[goal.id] ||
      goal.progress ||
      0
    );
  };

  const getCourseProgress = (course) => {
    return localProgress.courses[course.id] || course.progress || 0;
  };

  const getModuleProgress = (module) => {
    return (
      localProgress.modules[module.id] || calculateModuleProgress(module) || 0
    );
  };

  // ✅ Get date range for goal - FIXED
  const getGoalDateRange = (goal) => {
    const goalKey = goal.id.toLowerCase().replace(" ", "");
    const dateRange = goalDates[goalKey]?.range;
    
    if (!dateRange) {
      return "Calculating dates...";
    }
    
    // If it's the default message, return it as is
    if (dateRange.includes("Calculating") || dateRange.includes("Complete") || dateRange.includes("unlock")) {
      return dateRange;
    }
    
    return dateRange;
  };

  // ✅ Check if goal is unlocked - FIXED
  const isGoalUnlocked = (goal) => {
    const goalKey = goal.id.toLowerCase().replace(" ", "");
    return unlockedGoals[goalKey] || false;
  };

  // ✅ Render locked goal message
  const renderLockedGoalMessage = (goal) => {
    const previousGoal = goal.id === "Goal 2" ? "Goal 1" : "Goal 2";
    const previousGoalProgress = getGoalProgress(
      goalsData.find((g) => g.id === previousGoal) || {}
    );

    return (
      <div className="locked-goal-message">
        <h3>{goal.title} is Locked</h3>
        <p>
          Complete {previousGoal} to unlock this goal. Current progress:{" "}
          {previousGoalProgress.toFixed(1)}%
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${previousGoalProgress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  if (goalsLoading) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your learning journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-container" style={{ marginTop: "50px" }}>
      {/* Goals List */}
      <div className="goals-wrapper">
        {goalsData.map((goal) => {
          const goalPercent = getGoalProgress(goal);
          const isUnlocked = isGoalUnlocked(goal);
          const dateRange = getGoalDateRange(goal);

          return (
            <section
              className={`goal-group ${!isUnlocked ? "locked" : ""}`}
              key={goal.id}
            >
              <div
                className="goal-rail"
                style={{ backgroundColor: goal.color }}
                aria-hidden="true"
              />
              <header
                className={`goal-header ${!isUnlocked ? "locked" : ""}`}
                onClick={() => toggleGoal(goal.id)}
              >
                <div className="goal-title-wrap">
                  <h2 className="goal-title" style={{ color: goal.color }}>
                    {goal.title}
                    {!isUnlocked && <span className="lock-icon"> 🔒</span>}
                  </h2>
                  {dateRange && (
                    <span className="goal-dates">({dateRange})</span>
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
                    >{`${goalPercent.toFixed(1)}%`}</span>
                  </div>
                </div>
              </header>

              <div className="goal-body">
                {!isUnlocked ? (
                  renderLockedGoalMessage(goal)
                ) : goal.courses.length === 0 ? (
                  <div className="no-courses">
                    <h4>No courses found</h4>
                    <p>You don't have any courses in this goal.</p>
                  </div>
                ) : (
                  goal.courses.map((course) => {
                    const coursePercent = getCourseProgress(course);

                    return (
                      <div className="courses" key={course.id}>
                        {/* Course Header */}
                        <div className="couses-and-status">
                          {(() => {
                            const [before, after] = course.title.split(":");

                            return (
                              <h4>
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
                              className="circular-progress"
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
                          <button onClick={() => toggleCourse(course.id)}>
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
                          <p onClick={() => toggleCourse(course.id)}>
                            Active Modules
                          </p>
                        </div>

                        {/* Modules */}
                        {expandedCourse === course.id && (
                          <div className="module-details">
                            {(course.modules || []).map((module) => {
                              const subtopics = module.topic || [];
                              const isExpanded = expandedModule === module.name;
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
                                    onClick={() => toggleModule(module.name)}
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
                                          {subtopics.map((subtopic) => {
                                            const isCompleted =
                                              completedContent.includes(
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
                                                      course.title
                                                    );
                                                  }}
                                                >
                                                  {isCompleted ? "✓" : ""}
                                                </div>
                                              </div>
                                            );
                                          })}
                                          {subtopics.length > 0 && (
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
                                              toggleModule(module.name);
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
                                          {subtopics.map((subtopic) => {
                                            const isCompleted =
                                              completedContent.includes(
                                                subtopic.id
                                              );
                                            return (
                                              <div
                                                className={`subtopic-content-row ${
                                                  isCompleted ? "completed" : ""
                                                }`}
                                                key={subtopic.id}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleSubtopicClick(
                                                    module.id,
                                                    subtopic.id,
                                                    subtopic.name,
                                                    goal.title,
                                                    course.title
                                                  );
                                                }}
                                              >
                                                <span className="subtopic-text">
                                                  {isMCQ(subtopic)
                                                    ? "MCQ Practice"
                                                    : isCodingPractice(subtopic)
                                                    ? "Coding Practice"
                                                    : subtopic.name}
                                                </span>
                                                {isCompleted && (
                                                  <span className="completed-badge">
                                                    ✓
                                                  </span>
                                                )}
                                              </div>
                                            );
                                          })}
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