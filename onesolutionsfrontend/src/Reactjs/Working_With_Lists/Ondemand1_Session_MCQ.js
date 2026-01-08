import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [

    {
      question: (
        <div>
          <p>What is the purpose of tabs in this application?</p>
        </div>
      ),
      options: [
        "To navigate between pages",
        "To filter projects based on category",
        "To change CSS styles",
        "To load API data",
      ],
      answer: "To filter projects based on category",
    },
    {
      question: (
        <div>
          <p>Where is the active tab information stored?</p>
        </div>
      ),
      options: [
        "In props",
        "In local variables",
        "In component state",
        "In project list",
      ],
      answer: "In component state",
    },
    {
      question: (
        <div>
          <p>Which React concept allows rendering lists?</p>
        </div>
      ),
      options: ["filter()", "map()", "reduce()", "forEach()"],
      answer: "map()",
    },
    {
      question: (
        <div>
          <p>Why is the key prop important while rendering lists?</p>
        </div>
      ),
      options: [
        "To apply styles",
        "To uniquely identify list items",
        "To update state",
        "To pass props",
      ],
      answer: "To uniquely identify list items",
    },
    {
      question: (
        <div>
          <p>Which component is responsible for displaying project details?</p>
        </div>
      ),
      options: ["TabItem", "Header", "ProjectItem", "App"],
      answer: "ProjectItem",
    },
  
    {
      question: (
        <div>
          <p>What does this state variable represent?</p>
          <CodeBlock
            language="jsx"
            code={`state = {
    activeTabId: tabsList[0].tabId,
  };`}
          />
        </div>
      ),
      options: [
        "Currently selected project",
        "Currently active tab",
        "Total tabs count",
        "Project list length",
      ],
      answer: "Currently active tab",
    },
    {
      question: (
        <div>
          <p>What does this method do?</p>
          <CodeBlock
            language="javascript"
            code={`clickTabItem = tabValue => {
    this.setState({ activeTabId: tabValue });
  };`}
          />
        </div>
      ),
      options: [
        "Deletes a tab",
        "Updates the active tab",
        "Filters projects",
        "Loads API data",
      ],
      answer: "Updates the active tab",
    },
    {
      question: (
        <div>
          <p>What is the purpose of this function?</p>
          <CodeBlock
            language="javascript"
            code={`getFilteredProjects = () => {
    const { activeTabId } = this.state;
    return projectsList.filter(
      eachProject => eachProject.category === activeTabId
    );
  };`}
          />
        </div>
      ),
      options: [
        "Sorts projects",
        "Filters projects by active tab",
        "Deletes projects",
        "Updates state",
      ],
      answer: "Filters projects by active tab",
    },
    {
      question: (
        <div>
          <p>Which prop helps highlight the active tab?</p>
          <CodeBlock
            language="jsx"
            code={`<TabItem
    isActive={activeTabId === tabDetails.tabId}
  />`}
          />
        </div>
      ),
      options: [
        "tabDetails",
        "clickTabItem",
        "isActive",
        "key",
      ],
      answer: "isActive",
    },
    {
      question: (
        <div>
          <p>What does this code achieve?</p>
          <CodeBlock
            language="jsx"
            code={`const activeTabBtnClassName = isActive ? "active-tab-btn" : "";`}
          />
        </div>
      ),
      options: [
        "Adds conditional class name",
        "Updates state",
        "Filters projects",
        "Calls API",
      ],
      answer: "Adds conditional class name",
    },
    {
      question: (
        <div>
          <p>Why is template literal used here?</p>
          <CodeBlock
            language="jsx"
            code={`className={\`tab-btn \${activeTabBtnClassName}\`}`}
          />
        </div>
      ),
      options: [
        "To loop JSX",
        "To combine multiple class names",
        "To update props",
        "To bind events",
      ],
      answer: "To combine multiple class names",
    },
    {
      question: (
        <div>
          <p>What does this map() render?</p>
          <CodeBlock
            language="jsx"
            code={`{tabsList.map(tabDetails => (
    <TabItem key={tabDetails.tabId} />
  ))}`}
          />
        </div>
      ),
      options: [
        "Project cards",
        "Tab buttons",
        "Header items",
        "Images",
      ],
      answer: "Tab buttons",
    },
    {
      question: (
        <div>
          <p>Which component displays social media icons?</p>
          <CodeBlock
            language="jsx"
            code={`const Header = () => (
    <nav className="nav-header">
      ...
    </nav>
  );`}
          />
        </div>
      ),
      options: ["App", "ProjectItem", "Header", "TabItem"],
      answer: "Header",
    },
    {
      question: (
        <div>
          <p>Why is Fragment (&lt;&gt;&lt;/&gt;) used here?</p>
          <CodeBlock
            language="jsx"
            code={`<>
    <li className="project-item-container">
      ...
    </li>
  </>`}
          />
        </div>
      ),
      options: [
        "To add extra DOM nodes",
        "To return multiple JSX elements",
        "To style components",
        "To pass props",
      ],
      answer: "To return multiple JSX elements",
    },
    {
      question: (
        <div>
          <p>What is the purpose of the alt attribute here?</p>
          <CodeBlock
            language="jsx"
            code={`alt={\`project-item\${projectId}\`}`}
          />
        </div>
      ),
      options: [
        "For SEO only",
        "For accessibility and unique identification",
        "For styling",
        "For filtering projects",
      ],
      answer: "For accessibility and unique identification",
    },
];
  

const Ondemand1_Session_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
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
      title="Components and Props - MCQs"
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

export default Ondemand1_Session_MCQ;
