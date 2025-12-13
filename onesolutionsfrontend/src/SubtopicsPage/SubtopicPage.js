import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import "./SubtopicPage.css";
import { goalsData } from "../data/goalsData";

import {
  subtopicComponents,
  mcqMapping,
} from "../SubtopicsPage/Imports_Of_All_Files.js";

import MCQWrapper from "../SubtopicsPage/MCQWrapper.js";

const SubtopicPage = () => {
  const { topicId, subtopicId } = useParams();
  const { completedContent } = useAuth();
  const [selectedSubtopicSub, setSelectedSubtopicSub] = useState(null);
  const [selectedModuleSub, setSelectedModuleSub] = useState(null);
  const [selectedCourseSub, setSelectedCourseSub] = useState(null);
  const [selectedGoalSub, setSelectedGoalSub] = useState(null);
  const [expandedModuleSub, setExpandedModuleSub] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Enhanced content finding with better error handling
  const findContentByIds = (moduleId, subtopicId) => {
    let foundSubtopicSub = null;
    let foundModuleSub = null;
    let foundCourseSub = null;
    let foundGoalSub = null;

    goalsData.forEach((goal) => {
      goal.courses.forEach((course) => {
        course.modules.forEach((module) => {
          if (module.topic) {
            module.topic.forEach((subtopic) => {
              if (subtopic.id === subtopicId && module.id === moduleId) {
                foundSubtopicSub = subtopic;
                foundModuleSub = module;
                foundCourseSub = course;
                foundGoalSub = goal;
              }
            });
          }
        });
      });
    });

    return { foundSubtopicSub, foundModuleSub, foundCourseSub, foundGoalSub };
  };

  useEffect(() => {
    if (topicId && subtopicId && goalsData) {
      const { foundSubtopicSub, foundModuleSub, foundCourseSub, foundGoalSub } =
        findContentByIds(topicId, subtopicId);

      if (foundSubtopicSub && foundModuleSub) {
        setSelectedSubtopicSub(foundSubtopicSub);
        setSelectedModuleSub(foundModuleSub);
        setSelectedCourseSub(foundCourseSub);
        setSelectedGoalSub(foundGoalSub);
        setExpandedModuleSub(topicId);
      } else {
        console.warn("Content not found for:", { topicId, subtopicId });
        // Fallback: Use state from navigation if available
        if (location.state) {
          setSelectedSubtopicSub({
            id: subtopicId,
            name: location.state.subtopicName || "Unknown Subtopic",
          });
        }
      }
    }
  }, [topicId, subtopicId, goalsData, location.state]);

  // ✅ Auto-scroll to active element
  useEffect(() => {
    if (expandedModuleSub && selectedSubtopicSub) {
      const timer = setTimeout(() => {
        const activeSubtopicElementSub = document.querySelector(
          ".subtopic-page-sub__item-sub.active-sub"
        );

        if (activeSubtopicElementSub) {
          const leftPanelSub = document.querySelector(
            ".subtopic-page-sub__left-panel-sub"
          );
          if (leftPanelSub) {
            const scrollPositionSub =
              activeSubtopicElementSub.offsetTop -
              leftPanelSub.clientHeight / 10;

            leftPanelSub.scrollTo({
              top: scrollPositionSub,
              behavior: "smooth",
            });
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [expandedModuleSub, selectedSubtopicSub]);

  const handleModuleClickSub = (moduleId) => {
    setExpandedModuleSub((prev) => (prev === moduleId ? null : moduleId));
  };

  // ✅ Enhanced subtopic click handler
  const handleSubtopicClickSub = (module, subtopic) => {
    // Navigate to the new subtopic
    navigate(`/topic/${module.id}/subtopic/${subtopic.id}`, {
      state: {
        moduleId: module.id,
        subtopicId: subtopic.id,
        subtopicName: subtopic.name,
        goalName: selectedGoalSub?.title,
        courseName: selectedCourseSub?.title,
        fromCourse: true,
      },
    });
  };

  // Universal MCQ check
  const isMCQSub = (subtopic) => {
    if (typeof subtopic === "string") {
      return subtopic.toLowerCase().includes("mcq");
    } else if (subtopic && subtopic.name) {
      return subtopic.name.toLowerCase().includes("mcq");
    }
    return false;
  };

  // ✅ Enhanced content renderer
  const renderSubtopicContentSub = (subtopic) => {
    if (!subtopic) return <p>No subtopic selected</p>;

    if (isMCQSub(subtopic)) {
      const actualSubtopicSub = mcqMapping[subtopic.name];
      return actualSubtopicSub ? (
        <MCQWrapper
          subtopic={actualSubtopicSub}
          subtopicId={subtopic.id}
          goalName={selectedGoalSub?.title}
          courseName={selectedCourseSub?.title}
          onSubtopicComplete={() => {
            console.log("MCQ completed for:", subtopic.name);
          }}
        />
      ) : (
        <p>MCQ content not available for "{subtopic.name}"</p>
      );
    } else if (subtopic.name.toLowerCase().includes("cheat sheet")) {
      const ComponentSub = subtopicComponents[subtopic.name];
      return ComponentSub ? (
        <ComponentSub
          subtopicId={subtopic.id}
          goalName={selectedGoalSub?.title}
          courseName={selectedCourseSub?.title}
          subtopic={subtopic.name}
        />
      ) : (
        <p>Cheat sheet content not available for "{subtopic.name}"</p>
      );
    } else {
      const ComponentSub = subtopicComponents[subtopic.name];
      return ComponentSub ? (
        <ComponentSub
          subtopicId={subtopic.id}
          goalName={selectedGoalSub?.title}
          courseName={selectedCourseSub?.title}
          subtopic={subtopic.name}
        />
      ) : (
        <div>
          <h3>{subtopic.name}</h3>
          <p>Content for this subtopic is coming soon...</p>
          {completedContent.includes(subtopic.id) && (
            <p style={{ color: "green", marginTop: "10px" }}>
              ✓ This subtopic has been completed
            </p>
          )}
        </div>
      );
    }
  };

  // ✅ Check if content exists in current context
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
                  <span className="subtopic-page-sub__chevron-sub">
                    {expandedModuleSub === module.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    )}
                  </span>
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
                        } ${
                          !isContentInCurrentContext(subtopic)
                            ? "disabled-sub"
                            : ""
                        }`}
                        onClick={() => {
                          if (isContentInCurrentContext(subtopic)) {
                            handleSubtopicClickSub(module, subtopic);
                          }
                        }}
                      >
                        <div className="subtopic-page-sub__item-content-sub">
                          <span className="subtopic-page-sub__item-text-sub">
                            {subtopic.name}
                          </span>
                          {!isContentInCurrentContext(subtopic) && (
                            <span className="subtopic-page-sub__lock-icon-sub">
                              🔒
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="subtopic-page-sub__loading-sub">
            <p>Loading course content...</p>
          </div>
        )}
      </div>

      <div className="subtopic-page-sub__right-panel-sub">
        {selectedSubtopicSub ? (
          <div className="subtopic-page-sub__content-area-sub">
            {isContentInCurrentContext(selectedSubtopicSub) ? (
              renderSubtopicContentSub(selectedSubtopicSub)
            ) : (
              <div className="subtopic-page-sub__access-denied-sub">
                <h3>Content Not Accessible</h3>
                <p>
                  This content is not available in the current course context.
                  Please navigate to this content from the Courses page.
                </p>
                <button
                  onClick={() => navigate("/courses")}
                  className="subtopic-page-sub__back-button-sub"
                >
                  Back to Courses
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="subtopic-page-sub__welcome-sub">
            <h3>Welcome to the Learning Platform</h3>
            <p>Select a subtopic from the left panel to start learning.</p>
            {!selectedCourseSub && (
              <p className="subtopic-page-sub__error-sub">
                Could not find the requested content. Please check the URL or
                navigate from the courses page.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtopicPage;
