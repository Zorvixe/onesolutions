import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which HTML element is used to create a checkbox?</p>
        <CodeBlock language="html" code={`<input type="checkbox" />`} />
      </div>
    ),
    options: [
      "<input type='button'>",
      "<input type='checkbox'>",
      "<checkbox>",
      "<input checkbox>",
    ],
    answer: "<input type='checkbox'>",
  },
  {
    question: (
      <div>
        <p>
          Which HTML element is used to define a label for an input element?
        </p>
        <CodeBlock
          language="html"
          code={`<label for="username">Username</label>`}
        />
      </div>
    ),
    options: ["<p>", "<div>", "<label>", "<span>"],
    answer: "<label>",
  },
  {
    question: (
      <div>
        <p>
          What is the purpose of the <code>for</code> attribute in the label
          tag?
        </p>
        <CodeBlock
          language="html"
          code={`<label for="email">Email</label>
<input type="text" id="email" />`}
        />
      </div>
    ),
    options: [
      "To style the label",
      "To link the label to an input element",
      "To add a tooltip",
      "To create a loop",
    ],
    answer: "To link the label to an input element",
  },
  {
    question: (
      <div>
        <p>
          Which JavaScript property is used to set the <code>for</code>{" "}
          attribute of a label?
        </p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("myLabel").htmlFor = "username";`}
        />
      </div>
    ),
    options: ["forValue", "setFor", "htmlFor", "forAttr"],
    answer: "htmlFor",
  },
  {
    question: (
      <div>
        <p>What will this code do?</p>
        <CodeBlock
          language="javascript"
          code={`const input = document.querySelector("input");
input.setAttribute("placeholder", "Enter name");`}
        />
      </div>
    ),
    options: [
      "Removes placeholder attribute",
      "Sets the placeholder text to 'Enter name'",
      "Creates a new input element",
      "Throws an error",
    ],
    answer: "Sets the placeholder text to 'Enter name'",
  },
  {
    question: (
      <div>
        <p>
          Which of the following loops is used to iterate over iterable objects
          like arrays or strings?
        </p>
        <CodeBlock
          language="javascript"
          code={`for (let value of ["a", "b", "c"]) {
  console.log(value);
}`}
        />
      </div>
    ),
    options: ["for...in", "for...of", "while", "do...while"],
    answer: "for...of",
  },
  {
    question: (
      <div>
        <p>
          Which CSS property combines border-width, border-style, and
          border-color?
        </p>
        <CodeBlock language="css" code={`border: 2px solid red;`} />
      </div>
    ),
    options: ["border-all", "border", "border-style", "border-width"],
    answer: "border",
  },
  {
    question: (
      <div>
        <p>Which property removes the top border of an element?</p>
        <CodeBlock language="css" code={`border-top: none;`} />
      </div>
    ),
    options: [
      "border-remove",
      "border-style: none;",
      "border-top: none;",
      "border-clear: top;",
    ],
    answer: "border-top: none;",
  },
  {
    question: (
      <div>
        <p>
          If we want a red dashed border of 3px on an element, which CSS code is
          correct?
        </p>
        <CodeBlock language="css" code={`border: 3px dashed red;`} />
      </div>
    ),
    options: [
      "border: red dashed 3px;",
      "border: 3px dashed red;",
      "border-color: red dashed;",
      "border-width: 3px red dashed;",
    ],
    answer: "border: 3px dashed red;",
  },
  {
    question:
      "What happens if you use setAttribute() on an attribute that already exists?",
    options: [
      "It deletes the attribute",
      "It ignores the call",
      "It updates the attribute's value",
      "It throws an error",
    ],
    answer: "It updates the attribute's value",
  },
];

const Todos_Applications_MCQ = ({
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
    <MCQLogic title="Todos Applications - MCQs" questions={randomQuestions}
    isCompleted={isCompleted}
    isLoading={isLoading}
    onComplete={handleCompletion}
    subtopicId={subtopicId}
    goalName={goalName}
    courseName={courseName} />
  );
};

export default Todos_Applications_MCQ;
