import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import "./SubtopicPage.css";
import { goalsData } from "../data/goalsData";

import { subtopicComponents } from "../SubtopicsPage/Imports_Of_All_Files.js";
import MCQWrapper from "../SubtopicsPage/MCQWrapper.js";

const SubtopicPage = () => {
  const { topicId, subtopicId } = useParams();
  const { completedContent, markContentAsCompleted, forceProgressUpdate } =
    useAuth();

  const [selectedSubtopicSub, setSelectedSubtopicSub] = useState(null);
  const [selectedModuleSub, setSelectedModuleSub] = useState(null);
  const [selectedCourseSub, setSelectedCourseSub] = useState(null);
  const [selectedGoalSub, setSelectedGoalSub] = useState(null);
  const [expandedModuleSub, setExpandedModuleSub] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔍 Find subtopic, module, course, goal
  const findContentByIds = (moduleId, subtopicId) => {
    let foundSubtopicSub = null;
    let foundModuleSub = null;
    let foundCourseSub = null;
    let foundGoalSub = null;

    goalsData.forEach((goal) => {
      goal.courses.forEach((course) => {
        course.modules.forEach((module) => {
          module.topic?.forEach((subtopic) => {
            if (subtopic.id === subtopicId && module.id === moduleId) {
              foundSubtopicSub = subtopic;
              foundModuleSub = module;
              foundCourseSub = course;
              foundGoalSub = goal;
            }
          });
        });
      });
    });

    return { foundSubtopicSub, foundModuleSub, foundCourseSub, foundGoalSub };
  };

  // ✅ Check if subtopic is already completed
  const isSubtopicCompleted = () => {
    return completedContent.includes(subtopicId);
  };

  // ✅ IMMEDIATELY mark subtopic as completed and notify all components
  const markAsCompleted = async () => {
    if (!subtopicId || isSubtopicCompleted()) {
      console.log(`Subtopic ${subtopicId} already completed or invalid`);
      return;
    }

    console.log(`SubtopicPage: Marking subtopic ${subtopicId} as completed`);

    try {
      // 1. Mark as completed in AuthContext
      await markContentAsCompleted(subtopicId);

      // 2. Force immediate update in AuthContext
      if (forceProgressUpdate) {
        forceProgressUpdate();
      }

      // 3. Store timestamp in localStorage for Courses.js to detect
      const timestamp = Date.now();
      localStorage.setItem("lastProgressUpdate", timestamp.toString());
      localStorage.setItem("progress_update", timestamp.toString());

      // 4. Dispatch multiple events for different listeners
      const events = [
        new CustomEvent("subtopicCompleted", {
          detail: { subtopicId, timestamp },
        }),
        new CustomEvent("contentCompleted", {
          detail: { subtopicId, timestamp },
        }),
        new CustomEvent("progressUpdated", {
          detail: { subtopicId, timestamp },
        }),
      ];

      events.forEach((event) => {
        window.dispatchEvent(event);
        // Also dispatch to parent frames if in iframe
        if (window.parent !== window) {
          window.parent.dispatchEvent(event);
        }
      });

      // 5. Force storage event
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "completedContent",
          newValue: JSON.stringify([...completedContent, subtopicId]),
        })
      );

      // 6. Log success
      console.log(
        `SubtopicPage: ${subtopicId} marked as completed, events dispatched`
      );

      // 7. Show immediate feedback
      alert(
        "Subtopic marked as completed! The Courses page should update immediately."
      );
    } catch (error) {
      console.error("Error marking subtopic as completed:", error);
    }
  };

  // 📌 Load content on route change
  useEffect(() => {
    if (topicId && subtopicId) {
      const { foundSubtopicSub, foundModuleSub, foundCourseSub, foundGoalSub } =
        findContentByIds(topicId, subtopicId);

      if (foundSubtopicSub && foundModuleSub) {
        setSelectedSubtopicSub(foundSubtopicSub);
        setSelectedModuleSub(foundModuleSub);
        setSelectedCourseSub(foundCourseSub);
        setSelectedGoalSub(foundGoalSub);
        setExpandedModuleSub(topicId);

        console.log(
          `SubtopicPage loaded: ${foundSubtopicSub.name} (${subtopicId})`
        );
        console.log(
          `Already completed? ${isSubtopicCompleted() ? "YES" : "NO"}`
        );
      } else if (location.state) {
        setSelectedSubtopicSub({
          id: subtopicId,
          name: location.state.subtopicName || "Unknown Subtopic",
        });
      }
    }

    // Listen for completion events from child components
    const handleChildCompletion = (e) => {
      if (e.detail?.subtopicId === subtopicId) {
        console.log("SubtopicPage: Received completion from child component");
        markAsCompleted();
      }
    };

    window.addEventListener("markSubtopicCompleted", handleChildCompletion);

    return () => {
      window.removeEventListener(
        "markSubtopicCompleted",
        handleChildCompletion
      );
    };
  }, [topicId, subtopicId, location.state]);

  // 🔄 Auto-scroll active subtopic
  useEffect(() => {
    if (expandedModuleSub && selectedSubtopicSub) {
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
  }, [expandedModuleSub, selectedSubtopicSub]);

  const handleModuleClickSub = (moduleId) => {
    setExpandedModuleSub((prev) => (prev === moduleId ? null : moduleId));
  };

  const handleSubtopicClickSub = (module, subtopic) => {
    navigate(`/topic/${module.id}/subtopic/${subtopic.id}`, {
      state: {
        subtopicName: subtopic.name,
        fromCourse: true,
      },
    });
  };

  // ✅ Pass markAsCompleted to all child components
  const renderSubtopicContentSub = (subtopic) => {
    if (!subtopic) return <p>No subtopic selected</p>;

    const ComponentSub = subtopicComponents[subtopic.name];

    if (!ComponentSub) {
      return (
        <div className="not-found-con">
          {!imageLoaded && (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          )}

          <img
            src="/assets/img/locked_image.png"
            className="locked_image"
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
      );
    }

    // ✅ MCQ → use MCQWrapper
    if (ComponentSub.name?.includes("MCQ")) {
      return (
        <MCQWrapper
          subtopic={subtopic.name}
          subtopicId={subtopic.id}
          goalName={selectedGoalSub?.title}
          courseName={selectedCourseSub?.title}
          onComplete={() => {
            console.log("MCQWrapper: onComplete called");
            markAsCompleted();
            // Also dispatch event for immediate update
            window.dispatchEvent(
              new CustomEvent("markSubtopicCompleted", {
                detail: { subtopicId: subtopic.id },
              })
            );
          }}
        />
      );
    }

    // ✅ Other components
    return (
      <ComponentSub
        subtopicId={subtopic.id}
        goalName={selectedGoalSub?.title}
        courseName={selectedCourseSub?.title}
        subtopic={subtopic.name}
        onComplete={() => {
          console.log("Component: onComplete called");
          markAsCompleted();
          window.dispatchEvent(
            new CustomEvent("markSubtopicCompleted", {
              detail: { subtopicId: subtopic.id },
            })
          );
        }}
      />
    );
  };

  const isContentInCurrentContext = (subtopic) => {
    if (!selectedCourseSub || !subtopic) return false;

    return selectedCourseSub.modules?.some((module) =>
      module.topic?.some((topic) => topic.id === subtopic.id)
    );
  };

  return (
    <div className="subtopic-page-sub">
      <div className="subtopic-page-sub__left-panel-sub">
        {selectedCourseSub ? (
          <div className="subtopic-page-sub__navigation-sub">
            <h3 className="subtopic-page-sub__course-title-sub">
              {selectedCourseSub.title}
            </h3>

            {selectedCourseSub.modules.map((module) => (
              <div
                key={module.id}
                className="subtopic-page-sub__module-section-sub"
              >
                <h4
                  className={`subtopic-page-sub__module-title-sub ${
                    module.id === topicId
                      ? "subtopic-page-sub__module-title-sub--active"
                      : ""
                  }`}
                  onClick={() => handleModuleClickSub(module.id)}
                >
                  {module.name}
                </h4>

                {expandedModuleSub === module.id && (
                  <div className="subtopic-page-sub__topics-sub">
                    {module.topic?.map((subtopic) => (
                      <div
                        key={subtopic.id}
                        className={`subtopic-page-sub__item-sub ${
                          subtopic.id === subtopicId ? "active-sub" : ""
                        } ${
                          completedContent.includes(subtopic.id)
                            ? "completed-sub"
                            : ""
                        }`}
                        onClick={() => handleSubtopicClickSub(module, subtopic)}
                      >
                        <span className="subtopic-page-sub__item-text-sub">
                          {subtopic.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading course content...</p>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="subtopic-page-sub__right-panel-sub">
        {selectedSubtopicSub ? (
          isContentInCurrentContext(selectedSubtopicSub) ? (
            <div>
              {/* Subtopic Content */}
              {renderSubtopicContentSub(selectedSubtopicSub)}
            </div>
          ) : (
            <div className="subtopic-page-sub__access-denied-sub">
              <h3>Content Not Accessible</h3>
              <button onClick={() => navigate("/courses")}>
                Back to Courses
              </button>
            </div>
          )
        ) : (
          <p>Select a subtopic to start learning.</p>
        )}
      </div>
    </div>
  );
};

export default SubtopicPage;
