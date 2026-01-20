import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
    {
      question: (
        <div>
          <p>What is the role of Provider in React Context?</p>
        </div>
      ),
      options: [
        "To read context values",
        "To update context values",
        "To delete context",
        "To style components",
      ],
      answer: "To update context values",
    },
    {
      question: (
        <div>
          <p>Who can access the updated context value?</p>
        </div>
      ),
      options: [
        "All components",
        "Only parent components",
        "Only consumers inside the Provider",
        "Only sibling components",
      ],
      answer: "Only consumers inside the Provider",
    },
    {
      question: (
        <div>
          <p>Which prop is used to pass data to Provider?</p>
          <CodeBlock
            language="jsx"
            code={`<LanguageContext.Provider value={{activeLanguage: 'EN'}}>`}
          />
        </div>
      ),
      options: ["data", "props", "value", "context"],
      answer: "value",
    },
    {
      question: (
        <div>
          <p>What happens when Provider value changes?</p>
        </div>
      ),
      options: [
        "Only Provider re-renders",
        "Only parent re-renders",
        "All nested Consumers re-render",
        "Nothing happens",
      ],
      answer: "All nested Consumers re-render",
    },
    {
      question: (
        <div>
          <p>Which method updates the language?</p>
          <CodeBlock
            language="jsx"
            code={`changeLanguage = activeLanguage => {
    this.setState({activeLanguage})
  }`}
          />
        </div>
      ),
      options: ["setLanguage()", "changeLanguage()", "updateLang()", "switchLang()"],
      answer: "changeLanguage()",
    },
    {
      question: (
        <div>
          <p>What is passed through Context in this app?</p>
        </div>
      ),
      options: [
        "Only activeLanguage",
        "Only changeLanguage function",
        "Both activeLanguage and changeLanguage",
        "Only Header component",
      ],
      answer: "Both activeLanguage and changeLanguage",
    },
    {
      question: (
        <div>
          <p>Which component wraps the whole app with Provider?</p>
          <CodeBlock language="jsx" code={`<LanguageContext.Provider>...</LanguageContext.Provider>`} />
        </div>
      ),
      options: ["Header", "App", "LandingSection", "FeaturesSection"],
      answer: "App",
    },
    {
      question: (
        <div>
          <p>Which syntax correctly creates a context?</p>
          <CodeBlock language="jsx" code={`React.createContext({})`} />
        </div>
      ),
      options: [
        "createContext()",
        "useContext()",
        "React.createContext()",
        "Context.create()",
      ],
      answer: "React.createContext()",
    },
    {
      question: (
        <div>
          <p>Where is Consumer used to read language?</p>
          <CodeBlock
            language="jsx"
            code={`<LanguageContext.Consumer>{value => ...}</LanguageContext.Consumer>`}
          />
        </div>
      ),
      options: ["Inside Provider", "Inside Router", "Inside Consumer", "Inside State"],
      answer: "Inside Consumer",
    },
    {
      question: (
        <div>
          <p>Which event updates the language from dropdown?</p>
          <CodeBlock
            language="jsx"
            code={`const onChangeLanguage = event => {
    changeLanguage(event.target.value)
  }`}
          />
        </div>
      ),
      options: ["onClick", "onSubmit", "onChange", "onBlur"],
      answer: "onChange",
    },
    {
      question: (
        <div>
          <p>Which file defines default context values?</p>
          <CodeBlock
            language="jsx"
            code={`const LanguageContext = React.createContext({ activeLanguage: 'EN' })`}
          />
        </div>
      ),
      options: ["App.js", "Header.js", "LanguageContext.js", "LandingSection.js"],
      answer: "LanguageContext.js",
    },
    {
      question: (
        <div>
          <p>What is accessed inside Consumer callback?</p>
        </div>
      ),
      options: ["Props", "State", "Context Value", "Refs"],
      answer: "Context Value",
    },
    {
      question: (
        <div>
          <p>Which component displays the language content?</p>
        </div>
      ),
      options: ["Header", "LandingSection", "App", "Provider"],
      answer: "LandingSection",
    },
    {
      question: (
        <div>
          <p>Which function decides content based on active language?</p>
        </div>
      ),
      options: [
        "getLandingSectionData",
        "changeLanguage",
        "render",
        "setState",
      ],
      answer: "getLandingSectionData",
    },
    {
      question: (
        <div>
          <p>What is the best practice for Context value?</p>
        </div>
      ),
      options: [
        "Only data",
        "Only methods",
        "Both data and update methods",
        "Only UI elements",
      ],
      answer: "Both data and update methods",
    },
];
  

const React_Cpart2_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  // Check if subtopic is already completed
  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      // Validate that we have the required parameters
      if (!subtopicId) {
        console.error("❌ Subtopic ID is required");
        alert("Error: Subtopic ID is missing");
        return;
      }

      console.log("🎯 Marking subtopic complete:", {
        subtopicId,
        goalName,
        courseName,
      });

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        console.log("✅ MCQ successfully marked as completed");

        // Call the parent completion handler if provided
        if (onComplete) {
          onComplete();
        }
      } else {
        console.error("❌ Failed to mark MCQ complete:", result.message);
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Failed to mark MCQ complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MCQLogic
      title="Introduction to React JS - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default React_Cpart2_MCQ;
