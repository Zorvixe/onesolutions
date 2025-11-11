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
    goalProgress,
    courseProgress,
    loadProgressSummary,
  } = useAuth();

  const [expandedGoal, setExpandedGoal] = useState(goalsData[0]?.id || null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  // ✅ Load progress summaries on mount
  useEffect(() => {
    loadProgressSummary();
  }, []);

  const toggleGoal = (goalId) => {
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

  // ✅ Handle subtopic click (only navigate, do not mark as complete)
  const handleSubtopicClick = (moduleId, subtopicId, subtopicName) => {
    setSelectedSubtopic(subtopicName);
    navigate(`/topic/${moduleId}/subtopic/${subtopicId}`);
  };

  const getSubtopicContent = (subtopic) => {
    return <p>Content for {subtopic}</p>;
  };

  return (
    <div className="courses-container" style={{ marginTop: "50px" }}>
      {/* Goals List */}
      <div className="goals-wrapper">
        {goalsData.map((goal) => {
          const goalPercent = goalProgress[goal.title] || 0;

          return (
            <section className="goal-group" key={goal.id}>
              <div
                className="goal-rail"
                style={{ backgroundColor: goal.color }}
                aria-hidden="true"
              />
              <header
                className="goal-header"
                onClick={() => toggleGoal(goal.id)}
              >
                <div className="goal-title-wrap">
                  <h2 className="goal-title" style={{ color: goal.color }}>
                    {goal.title}
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
                {goal.courses.length === 0 ? (
                  <div className="no-courses">
                    <h4>No courses found</h4>
                    <p>You don't have any courses in this goal.</p>
                  </div>
                ) : (
                  goal.courses.map((course) => {
                    const coursePercent = courseProgress[course.title] || 0;

                    return (
                      <div className="courses" key={course.id}>
                        {/* Course Header */}
                        <div className="couses-and-status">
                          <h4>{course.title}</h4>
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

                              // ✅ Calculate progress using backend completedContent
                              const completedCount = subtopics.filter((sub) =>
                                completedContent.includes(sub.id)
                              ).length;
                              const progressPercent = subtopics.length
                                ? (completedCount / subtopics.length) * 100
                                : 0;
                              const isModuleCompleted = progressPercent >= 100;

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
                                            "--progress": `${progressPercent}%`,
                                          }}
                                        >
                                          {isModuleCompleted ? "✓" : ""}
                                        </div>
                                      </div>

                                      {isExpanded && (
                                        <>
                                          {subtopics.map((subtopic) => (
                                            <div
                                              className="circle-row subtopic-circle-row"
                                              key={subtopic.id}
                                            >
                                              <div
                                                className={`circle subtopic-circle ${
                                                  completedContent.includes(
                                                    subtopic.id
                                                  )
                                                    ? "completed"
                                                    : ""
                                                }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleSubtopicClick(
                                                    module.id,
                                                    subtopic.id,
                                                    subtopic.name
                                                  );
                                                }}
                                              >
                                                {completedContent.includes(
                                                  subtopic.id
                                                )
                                                  ? "✓"
                                                  : ""}
                                              </div>
                                            </div>
                                          ))}
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
                                          {subtopics.map((subtopic) => (
                                            <div
                                              className="subtopic-content-row"
                                              key={subtopic.id}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleSubtopicClick(
                                                  module.id,
                                                  subtopic.id,
                                                  subtopic.name
                                                );
                                              }}
                                            >
                                              <span className="subtopic-text">
                                                {isMCQ(subtopic)
                                                  ? "MCQ Practice"
                                                  : subtopic.name}
                                              </span>
                                            </div>
                                          ))}
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
