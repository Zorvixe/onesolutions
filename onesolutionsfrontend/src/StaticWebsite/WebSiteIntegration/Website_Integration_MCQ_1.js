import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>Where should this CCBP UI Kit script be placed?</p>
        <CodeBlock
          language="html"
          code={`<script src="https://cdn.ccbp.in/ui-kit/v1.0/ui-kit.min.js"></script>`}
        />
      </div>
    ),
    options: [
      "Inside the head tag",
      "Before the closing body tag",
      "At the top of HTML file",
      "Inside a div element",
    ],
    answer: "Before the closing body tag",
  },
  {
    question: (
      <div>
        <p>What is required for this section ID when using CCBP UI Kit?</p>
        <CodeBlock
          language="html"
          code={`<div id="sectionHome">Home Content</div>`}
        />
      </div>
    ),
    options: [
      "Can be any name",
      "Must start with 'section'",
      "Must be 'home'",
      "No id needed",
    ],
    answer: "Must start with 'section'",
  },
  {
    question: (
      <div>
        <p>What will happen when this button is clicked?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('sectionFavouritePlaces')">Go to Favourite Places</button>`}
        />
      </div>
    ),
    options: [
      "Nothing happens",
      "Shows the section with id sectionFavouritePlaces",
      "Reloads the page",
      "Hides current section only",
    ],
    answer: "Shows the section with id sectionFavouritePlaces",
  },
  {
    question: (
      <div>
        <p>Why remove fixed height from this container?</p>
        <CodeBlock
          language="css"
          code={`.favourite-places-bg-container { height: 100vh; }`}
        />
        <CodeBlock
          language="html"
          code={`<!-- Remove fixed height to take content height -->`}
        />
      </div>
    ),
    options: [
      "To make it disappear",
      "To let background take full content height",
      "To center it",
      "To apply flexbox",
    ],
    answer: "To let background take full content height",
  },
  {
    question: (
      <div>
        <p>What is the correct onclick syntax for CCBP UI Kit?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('sectionDetailedView')">View Details</button>`}
        />
      </div>
    ),
    options: [
      "onclick=display(sectionDetailedView)",
      "onclick='display(sectionDetailedView)'",
      "onclick=\"display('sectionDetailedView')\"",
      "onclick=show('sectionDetailedView')",
    ],
    answer: "onclick=\"display('sectionDetailedView')\"",
  },
  {
    question: (
      <div>
        <p>In the integration process, what must be done first?</p>
        <CodeBlock language="html" code={`<!-- Step-1 -->`} />
      </div>
    ),
    options: [
      "Add onclick",
      "Change section container ids to start with 'section'",
      "Add CSS",
      "Add buttons",
    ],
    answer: "Change section container ids to start with 'section'",
  },
  {
    question: (
      <div>
        <p>Which section should this button return to?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('sectionHome')">Back to Home</button>`}
        />
      </div>
    ),
    options: [
      "Favourite Places",
      "Detailed View",
      "Home Section",
      "No section",
    ],
    answer: "Home Section",
  },
  {
    question: (
      <div>
        <p>What does this button do in the Favourite Places section?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="display('sectionHome')">Back</button>`}
        />
      </div>
    ),
    options: [
      "Goes to Detailed View",
      "Returns to Home Section",
      "Refreshes the page",
      "Hides the section",
    ],
    answer: "Returns to Home Section",
  },
  {
    question: (
      <div>
        <p>Which id will this onclick target?</p>
        <CodeBlock
          language="html"
          code={`<div class="card" onclick="display('sectionTajMahal')">Taj Mahal</div>`}
        />
      </div>
    ),
    options: [
      "sectionHome",
      "sectionTajMahal",
      "sectionFavouritePlaces",
      "No id",
    ],
    answer: "sectionTajMahal",
  },
  {
    question: (
      <div>
        <p>What is the purpose of this script in CCBP UI Kit?</p>
        <CodeBlock
          language="html"
          code={`<script src="https://cdn.ccbp.in/ui-kit/v1.0/ui-kit.min.js"></script>`}
        />
      </div>
    ),
    options: [
      "Adds Bootstrap",
      "Enables display() function for section switching",
      "Applies CSS",
      "Loads images",
    ],
    answer: "Enables display() function for section switching",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "Where should the CCBP UI Kit Script Code be placed?",
    options: [
      "Inside the head tag",
      "Before the closing body tag",
      "At the top of HTML file",
      "Inside a div element",
    ],
    answer: "Before the closing body tag",
  },
  {
    question:
      "Which HTML attribute is used to uniquely identify elements within an HTML document?",
    options: ["id", "src", "class", "all of the above"],
    answer: "id",
  },
  {
    question:
      "In CCBP UI Kit, what must the id of a section container start with?",
    options: ["home", "section", "div", "container"],
    answer: "section",
  },
  {
    question:
      "What is the correct function name used in onclick to show a section in CCBP UI Kit?",
    options: ["show()", "open()", "display()", "view()"],
    answer: "display()",
  },
  {
    question:
      "In the integration of Home and Favourite Places, what is Step-4?",
    options: [
      "Add onclick to Home Section button",
      "Change section ids",
      "Add CSS",
      "Add button to go back",
    ],
    answer: "Add onclick to Home Section button",
  },
];

const Website_Integration_MCQ_1 = ({
  subtopicId,
  goalName,
  courseName,
  onComplete
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } = useAuth();

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
        courseName
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
      title="Website Integration - MCQs"
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

export default Website_Integration_MCQ_1;
