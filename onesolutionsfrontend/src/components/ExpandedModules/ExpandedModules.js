import React, { useState } from "react";
import "./ExpandedModules.css";

// Import subtopic components
import Variables_DT_CS_2 from "../../Python/IntroductiontoPython/Variables_DT_CS_2";
import Pro_W_P_CS_1 from "../../Python/IntroductiontoPython/Pro_W_P_CS_1";
import Seq_OF_Instruction_CS_3 from "../../Python/IntroductiontoPython/Seq_OF_Instruction_CS_3";
import Inp_Oup_Basics_CS_1 from "../../Python/Inp_Oup_Basiscs/Inp_Oup_Basics_CS_1";

// Import MCQs
import MCQ_1 from "../../Python/IntroductiontoPython/MCQ_1";
import MCQ_2 from "../../Python/IntroductiontoPython/MCQ_2";
import MCQInstructions from "../../Python/MCQInstructions";

const ExpandedModules = ({ modules }) => {
  const [expandedModule, setExpandedModule] = useState(null);
  const [completedSubtopics, setCompletedSubtopics] = useState({});
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const toggleModule = (moduleName) => {
    setExpandedModule(expandedModule === moduleName ? null : moduleName);
    setSelectedSubtopic(null);
  };

  const toggleSubtopicCompletion = (moduleName, subtopic) => {
    setCompletedSubtopics((prev) => ({
      ...prev,
      [moduleName]: {
        ...prev[moduleName],
        [subtopic]: true,
      },
    }));
  };

  // Lesson subtopics
  const subtopicComponents = {
    "Variables and Data Types | Cheat Sheet": <Variables_DT_CS_2 />,
    "Programing with Python | Cheat Sheet": <Pro_W_P_CS_1 />,
    "Sequence of Instructions | Cheat Sheet": <Seq_OF_Instruction_CS_3 />,
    "Inputs and Outputs Basics": <Inp_Oup_Basics_CS_1 />,
  };

  // MCQs
  const mcqComponents = {
    "MCQ 1": <MCQ_1 />,
    "MCQ 2": <MCQ_2 />,
  };

  // Decide what to render for each subtopic
  const getSubtopicContent = (subtopic) => {
    const onContinue = () => {
      const moduleName = modules.find((m) => m.topic.includes(subtopic))?.name;
      if (moduleName) toggleSubtopicCompletion(moduleName, subtopic);
    };

    if (subtopic.toLowerCase().includes("mcq")) {
      return (
        <>
          <MCQInstructions />
          {mcqComponents[subtopic] || <p>No MCQ content available</p>}
        </>
      );
    }

    if (subtopicComponents[subtopic]) {
      return React.cloneElement(subtopicComponents[subtopic], { onContinue });
    }

    return <p>No content available for "{subtopic}"</p>;
  };

  return (
    <div className="module-details">
      {modules.map((module) => {
        const isExpanded = expandedModule === module.name;
        const subtopics = module.topic || [];

        const completedCount = subtopics.filter(
          (sub) => completedSubtopics[module.name]?.[sub]
        ).length;

        const progressPercent =
          subtopics.length > 0 ? (completedCount / subtopics.length) * 100 : 0;
        const isModuleCompleted = progressPercent === 100;

        return (
          <div
            className={`module-container ${isExpanded ? "expanded" : ""}`}
            key={module.name}
          >
            {/* Module Heading */}
            <div
              className="module-single-div"
              onClick={() => toggleModule(module.name)}
            >
              <div className="timeline">
                <div className="circle-position module-circle-row">
                  <div
                    className={`circle module-circle ${
                      progressPercent > 0 ? "partial" : ""
                    } ${isModuleCompleted ? "completed" : ""}`}
                    style={{ "--progress": `${progressPercent}%` }}
                  >
                    <div className="progress-ring">
                      <div className="progress-bg"></div>
                      <div className="progress-fill"></div>
                      <div className="inner-circle"></div>
                      <div className="circle-fill">
                        {isModuleCompleted ? "✓" : ""}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtopic circles */}
                {isExpanded &&
                  subtopics.map((subtopic, index) => (
                    <div
                      className="circle-position subtopic-circle-position"
                      key={`${subtopic}-${index}`}
                    >
                      <div
                        className={`circle subtopic-circle ${
                          completedSubtopics[module.name]?.[subtopic]
                            ? "completed"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubtopic(subtopic);
                        }}
                      >
                        {completedSubtopics[module.name]?.[subtopic] ? "✓" : ""}
                      </div>
                    </div>
                  ))}

                {isExpanded && subtopics.length > 0 && (
                  <div className="vertical-line"></div>
                )}
              </div>

              {/* Module title and subtopics list */}
              <div className="content-area">
                <div className="heading-row">
                  <p>Topic</p>
                  <h5 className="module-title-row">{module.name}</h5>
                </div>

                {isExpanded && (
                  <div className="subtopics-section">
                    {subtopics.map((subtopic) => (
                      <div
                        key={subtopic}
                        className="subtopic-row"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubtopic(subtopic);
                        }}
                      >
                        <span className="subtopic-text">{subtopic}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Content */}
            {isExpanded && selectedSubtopic && (
              <div className="lesson-content">
                {getSubtopicContent(selectedSubtopic)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExpandedModules;
