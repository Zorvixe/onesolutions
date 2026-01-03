import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ======== CodeBlock Questions (10) ========
  {
    question: (
      <div>
        <p>Which HTML element creates a checkbox?</p>
        <CodeBlock language="html" code={`<input type="checkbox" />`} />
      </div>
    ),
    options: [
      "<input type='text'>",
      "<input type='checkbox'>",
      "<checkbox>",
      "<check>",
    ],
    answer: "<input type='checkbox'>",
  },
  {
    question: (
      <div>
        <p>Which element defines a label for an input?</p>
        <CodeBlock language="html" code={`<label for="todo">Todo</label>`} />
      </div>
    ),
    options: ["<div>", "<p>", "<label>", "<span>"],
    answer: "<label>",
  },
  {
    question: (
      <div>
        <p>
          What does the <b>for</b> attribute do?
        </p>
        <CodeBlock
          language="html"
          code={`<label for="task"></label>
<input id="task" />`}
        />
      </div>
    ),
    options: [
      "Styles the label",
      "Links label with input",
      "Creates a checkbox",
      "Adds value to input",
    ],
    answer: "Links label with input",
  },
  {
    question: (
      <div>
        <p>
          Which property sets the <b>for</b> attribute using JavaScript?
        </p>
        <CodeBlock
          language="javascript"
          code={`label.htmlFor = "todoInput";`}
        />
      </div>
    ),
    options: ["forAttr", "htmlFor", "setFor", "labelFor"],
    answer: "htmlFor",
  },
  {
    question: (
      <div>
        <p>What will this code do?</p>
        <CodeBlock
          language="javascript"
          code={`input.setAttribute("type", "checkbox");`}
        />
      </div>
    ),
    options: [
      "Removes input",
      "Changes input type to checkbox",
      "Adds label",
      "Throws error",
    ],
    answer: "Changes input type to checkbox",
  },
  {
    question: (
      <div>
        <p>Which loop is used here?</p>
        <CodeBlock
          language="javascript"
          code={`for (let item of todos) {
  console.log(item);
}`}
        />
      </div>
    ),
    options: ["for loop", "for...in", "for...of", "while"],
    answer: "for...of",
  },
  {
    question: (
      <div>
        <p>Which CSS property is this?</p>
        <CodeBlock language="css" code={`border: 2px solid black;`} />
      </div>
    ),
    options: ["border-width", "border-style", "border", "outline"],
    answer: "border",
  },
  {
    question: (
      <div>
        <p>What does this CSS remove?</p>
        <CodeBlock language="css" code={`border-top: none;`} />
      </div>
    ),
    options: ["All borders", "Bottom border", "Top border", "Left border"],
    answer: "Top border",
  },
  {
    question: (
      <div>
        <p>Which border will this apply?</p>
        <CodeBlock language="css" code={`border-left: 1px solid gray;`} />
      </div>
    ),
    options: ["Top", "Right", "Bottom", "Left"],
    answer: "Left",
  },
  {
    question: (
      <div>
        <p>What happens if attribute already exists?</p>
        <CodeBlock
          language="javascript"
          code={`element.setAttribute("id", "todo1");`}
        />
      </div>
    ),
    options: [
      "Deletes attribute",
      "Creates duplicate",
      "Updates value",
      "Throws error",
    ],
    answer: "Updates value",
  },

  // ======== Normal Questions (5) ========
  {
    question: "Which HTML input type is used for Todos selection?",
    options: ["text", "radio", "checkbox", "button"],
    answer: "checkbox",
  },
  {
    question: "Which loop is best suited to iterate over arrays?",
    options: ["for...in", "for...of", "while", "do...while"],
    answer: "for...of",
  },
  {
    question: "Which CSS border property is mandatory?",
    options: ["border-width", "border-color", "border-style", "border-radius"],
    answer: "border-style",
  },
  {
    question: "What does htmlFor connect?",
    options: [
      "CSS to HTML",
      "Label to input",
      "Input to form",
      "JavaScript to HTML",
    ],
    answer: "Label to input",
  },
  {
    question: "Which method sets or updates HTML attributes?",
    options: [
      "addAttribute()",
      "changeAttribute()",
      "setAttribute()",
      "updateAttribute()",
    ],
    answer: "setAttribute()",
  },
];

const Todos_Applications_MCQ = ({
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
      title="Todos Applications - MCQs"
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

export default Todos_Applications_MCQ;
