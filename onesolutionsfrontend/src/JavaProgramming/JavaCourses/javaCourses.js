"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function JavaCourses() {
  const navigate = useNavigate();
  const {
    user,
    javaGoals,
    javaLoading,
    loadJavaAllStructure,
    completedContent,
    enrollInJavaCourse,
  } = useAuth();

  const [expandedGoal, setExpandedGoal] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [expandedPractice, setExpandedPractice] = useState(null);
  const [localProgress, setLocalProgress] = useState({});
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  const courseSelection = user?.courseSelection;
  const hasJavaAccess = courseSelection === "java_programming" || courseSelection === "all";
  useEffect(() => {
    if (hasJavaAccess) {
      loadJavaAllStructure().catch(console.error);
    }
  }, [hasJavaAccess]);

  useEffect(() => {
    if (hasJavaAccess && javaGoals.length > 0) {
      calculateAllProgress();
      setLastUpdateTime(Date.now());
    }
  }, [completedContent, javaGoals, hasJavaAccess]);

  const checkIsContentCompleted = useCallback(
    (content) => {
      if (!content) return false;
      const isRx = completedContent.some((id) => String(id) === String(content.id));
      const isDb = content.is_completed === true || content.is_completed === 1;
      return isRx || isDb;
    },
    [completedContent]
  );

  const calculateAllProgress = useCallback(() => {
    const progressMap = {};
    javaGoals.forEach((goal) => {
      if (goal.stats) {
        progressMap[goal.id] = goal.stats.progress_percentage || 0;
      } else {
        progressMap[goal.id] = calculateGoalProgress(goal);
      }
    });
    setLocalProgress(progressMap);
  }, [javaGoals, completedContent]);

  const calculateGoalProgress = (goal) => {
    if (!goal.modules) return 0;
    let total = 0, completed = 0;
    goal.modules.forEach((m) => {
      m.topics?.forEach((t) => {
        t.subtopics?.forEach((s) => {
          // Only count content items that have a valid title
          const validContent = s.content?.filter(c => c.video_title || c.cheatsheet_title || c.mcq_title) || [];
          validContent.forEach((c) => { total++; if (checkIsContentCompleted(c)) completed++; });
          s.coding_practices?.forEach((p) => {
            total++;
            if (p.is_completed) completed++;
          });
        });
      });
    });
    return total === 0 ? 0 : (completed / total) * 100;
  };

  const getModuleProgress = (module) => {
    let total = 0, completed = 0;
    module.topics?.forEach((t) => {
      t.subtopics?.forEach((s) => {
        const validContent = s.content?.filter(c => c.video_title || c.cheatsheet_title || c.mcq_title) || [];
        validContent.forEach((c) => { total++; if (checkIsContentCompleted(c)) completed++; });
        s.coding_practices?.forEach((p) => {
          total++;
          if (p.is_completed) completed++;
        });
      });
    });
    return total === 0 ? 0 : (completed / total) * 100;
  };

  const getTopicProgress = (topic) => {
    let total = 0, completed = 0;
    topic.subtopics?.forEach((s) => {
      const validContent = s.content?.filter(c => c.video_title || c.cheatsheet_title || c.mcq_title) || [];
      validContent.forEach((c) => { total++; if (checkIsContentCompleted(c)) completed++; });
      s.coding_practices?.forEach((p) => {
        total++;
        if (p.is_completed) completed++;
      });
    });
    return total === 0 ? 0 : (completed / total) * 100;
  };

  const isGoalLocked = (goalIndex) => {
    if (goalIndex === 0) return false;
    for (let i = 0; i < goalIndex; i++) {
      if (localProgress[javaGoals[i]?.id] < 100) return true;
    }
    return false;
  };

  const toggleGoal = (goalId, goalIndex) => {
    if (!hasJavaAccess) return alert("Access denied");
    if (isGoalLocked(goalIndex)) return alert("Complete previous goals first");
    setExpandedGoal(expandedGoal === goalId ? null : goalId);
    setExpandedModule(null);
    setExpandedTopic(null);
    setExpandedPractice(null);
  };

  const handleContentClick = (content, goal, module, topic, subtopic) => {
    navigate(`/java/content/${content.content_uuid}`, {
      state: {
        contentItem: content,
        goalId: goal.id,
        goalName: goal.name,
        moduleId: module.id,
        moduleName: module.name,
        topicId: topic.id,
        topicName: topic.name,
        subtopicId: subtopic.id,
        subtopicName: subtopic.name,
        fromCourse: true,
        isJava: true,
      },
    });
  };

  // 🔥 UPDATED: Use unified /java/content/:uuid with practice_uuid
  const handlePracticeClick = (practice, goal, module, topic, subtopic) => {
    navigate(`/java/content/${practice.practice_uuid}`, {
      state: {
        practiceItem: practice,
        goalId: goal.id,
        goalName: goal.name,
        moduleId: module.id,
        moduleName: module.name,
        topicId: topic.id,
        topicName: topic.name,
        subtopicId: subtopic.id,
        subtopicName: subtopic.name,
        fromCourse: true,
        isJava: true,
      },
    });
  };

  if (javaLoading) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="loading-container"><div className="spinner"></div></div>
      </div>
    );
  }

  if (!hasJavaAccess) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <div className="access-denied-container">
          <img src="/assets/img/locked_image.png" alt="Access Denied" className="locked_image" />
        </div>
      </div>
    );
  }

  if (!javaGoals.length) {
    return (
      <div className="courses-container" style={{ marginTop: "50px" }}>
        <h1>Java Programming</h1>
        <p>No courses available yet.</p>
      </div>
    );
  }

  return (
    <div className="courses-container" style={{ marginTop: "50px" }} key={`java-${lastUpdateTime}`}>
      <div className="goals-wrapper">
        {javaGoals.map((goal, goalIndex) => {
          const locked = isGoalLocked(goalIndex);
          const isEnrolled = goal.is_enrolled;
          const progress = localProgress[goal.id] || 0;

          return (
            <section className={`goal-group ${locked ? "goal-locked" : ""}`} key={goal.id}>
              <div className="goal-rail" style={{ backgroundColor: "#f89820" }} />
              <header className={`goal-header ${locked ? "goal-header-locked" : ""}`}
                onClick={() => toggleGoal(goal.id, goalIndex)}>
                <div className="goal-title-wrap">
                  <h2 className="goal-title" style={{ color: "#f89820" }}>
                    {goal.name}
                    {!isEnrolled && <span className="not-enrolled-tag"> Not Enrolled</span>}
                    {locked && <span className="locked-tag"> 🔒</span>}
                  </h2>
                </div>
                <div className="goal-meta">
                  <div className="progress-section">
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: "#f89820" }} />
                    </div>
                    <span className="progress-percent">{progress.toFixed(1)}%</span>
                  </div>
                </div>
              </header>

              <div className="goal-body">
                {!isEnrolled ? (
                  <div className="enroll-prompt">
                    <p>You are not enrolled.</p>
                    <button className="enroll-button" onClick={async () => {
                      const res = await enrollInJavaCourse(goal.id);
                      if (res.success) {
                        alert("Enrolled!");
                        loadJavaAllStructure();
                      }
                    }}>Enroll Now</button>
                  </div>
                ) : !locked && goal.modules?.map((module) => {
                  const moduleProgress = getModuleProgress(module);
                  const isExpandedModule = expandedModule === module.id;
                  return (
                    <div className="courses" key={module.id}>
                      <div className="couses-and-status">
                        <h4>{module.name}</h4>
                        <div className="progress-section_module">
                          <div className={`circular-progress ${moduleProgress >= 100 ? "completed" : ""}`}
                            style={{ "--progress": moduleProgress }}>
                            <span className="progress-value">{moduleProgress.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="active-module_course">
                        <button onClick={() => setExpandedModule(isExpandedModule ? null : module.id)}>
                          {isExpandedModule ? "−" : "+"}
                        </button>
                        <p onClick={() => setExpandedModule(isExpandedModule ? null : module.id)}>Active Modules</p>
                      </div>

                      {isExpandedModule && (
                        <div className="module-details">
                          {module.topics?.map((topic) => {
                            const topicProgress = getTopicProgress(topic);
                            const isExpandedTopic = expandedTopic === topic.id;
                            return (
                              <div key={topic.id} className="module-container">
                                <div className="module-single-div">
                                  <div className="timeline">
                                    <div className="circle-row module-circle-row">
                                      <div className={`circle module-circle ${topicProgress >= 100 ? "completed" : ""}`}
                                        style={{ "--progress": `${topicProgress}%` }}>
                                        {topicProgress >= 100 ? "✓" : ""}
                                      </div>
                                    </div>
                                    {isExpandedTopic && (
                                      <>
                                        {topic.subtopics?.flatMap((sub) => {
                                          // Filter content items that have a valid title
                                          const validContent = sub.content?.filter(c => c.video_title || c.cheatsheet_title || c.mcq_title) || [];
                                          return [
                                            ...validContent.map((c) => (
                                              <div className="circle-row subtopic-circle-row" key={`content-${c.id}`}>
                                                <div className={`circle subtopic-circle ${checkIsContentCompleted(c) ? "completed" : ""}`}
                                                  onClick={(e) => { e.stopPropagation(); handleContentClick(c, goal, module, topic, sub); }}>
                                                  {checkIsContentCompleted(c) ? "✓" : ""}
                                                </div>
                                              </div>
                                            )),
                                            ...(sub.coding_practices || []).map((p) => (
                                              <div className="circle-row subtopic-circle-row" key={`practice-${p.id}`}>
                                                <div className={`circle subtopic-circle ${p.is_completed ? "completed" : ""}`}
                                                  onClick={(e) => { e.stopPropagation(); handlePracticeClick(p, goal, module, topic, sub); }}>
                                                  {p.is_completed ? "✓" : "⚙"}
                                                </div>
                                              </div>
                                            ))
                                          ];
                                        })}
                                        {/* Only show vertical line if there are any visible items */}
                                        {topic.subtopics?.some(sub => {
                                          const validContent = sub.content?.filter(c => c.video_title || c.cheatsheet_title || c.mcq_title) || [];
                                          return validContent.length > 0 || (sub.coding_practices?.length || 0) > 0;
                                        }) && (
                                          <div className="vertical-line"></div>
                                        )}
                                      </>
                                    )}
                                  </div>

                                  <div className="content-area">
                                    <div className="module_topic_names" onClick={() => setExpandedTopic(isExpandedTopic ? null : topic.id)}>
                                      <div className="module-header-row">
                                        <div className="topic-label"><h6>JAVA TOPIC</h6></div>
                                        <div className="module-title"><h5>{topic.name}</h5></div>
                                      </div>
                                      <div className="active-module_subtopic">
                                        <button onClick={() => setExpandedTopic(isExpandedTopic ? null : topic.id)}>
                                          {isExpandedTopic ? "−" : "+"}
                                        </button>
                                      </div>
                                    </div>

                                    {isExpandedTopic && (
                                      <div className="subtopics-section">
                                        {topic.subtopics?.map((sub) => {
                                          const validContent = sub.content?.filter(c => c.video_title || c.cheatsheet_title || c.mcq_title) || [];
                                          return (
                                            <div key={sub.id}>
                                              {validContent.map((c) => (
                                                <div className={`subtopic-content-row ${checkIsContentCompleted(c) ? "completed" : ""}`}
                                                  key={`content-${c.id}`}
                                                  onClick={() => handleContentClick(c, goal, module, topic, sub)}>
                                                  <span className="subtopic-text">
                                                    {c.video_title || c.cheatsheet_title || c.mcq_title}
                                                  </span>
                                                </div>
                                              ))}
                                              {sub.coding_practices?.map((p) => (
                                                <div className={`subtopic-content-row ${p.is_completed ? "completed" : ""}`}
                                                  key={`practice-${p.id}`}
                                                  onClick={() => handlePracticeClick(p, goal, module, topic, sub)}>
                                                  <span className="subtopic-text practice-title">
                                                    {p.title}
                                                  </span>
                                                </div>
                                              ))}
                                            </div>
                                          );
                                        })}
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
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}