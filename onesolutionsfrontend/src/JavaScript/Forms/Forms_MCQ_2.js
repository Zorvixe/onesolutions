import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ---------- 1 (Normal) ----------
  {
    question: (
      <div>
        <p>
          What is the purpose of the HTML <b>&lt;select&gt;</b> element?
        </p>
      </div>
    ),
    options: [
      "To create a drop-down list",
      "To create a text field",
      "To select multiple files",
      "To submit a form",
    ],
    answer: "To create a drop-down list",
  },

  // ---------- 2 (Normal) ----------
  {
    question: (
      <div>
        <p>
          Which HTML element is used to define options inside a drop-down list?
        </p>
      </div>
    ),
    options: ["<select>", "<input>", "<option>", "<list>"],
    answer: "<option>",
  },

  // ---------- 3 (Normal) ----------
  {
    question: (
      <div>
        <p>
          Which input type allows selecting only one option from multiple
          choices?
        </p>
      </div>
    ),
    options: ["checkbox", "radio", "text", "password"],
    answer: "radio",
  },

  // ---------- 4 (Normal) ----------
  {
    question: (
      <div>
        <p>What is a radio group?</p>
      </div>
    ),
    options: [
      "A group of checkboxes",
      "Radio buttons with different names",
      "Radio buttons sharing the same name",
      "A drop-down list",
    ],
    answer: "Radio buttons sharing the same name",
  },

  // ---------- 5 (Normal) ----------
  {
    question: (
      <div>
        <p>What does a Boolean attribute represent in HTML?</p>
      </div>
    ),
    options: [
      "True when value is provided",
      "True when attribute is present",
      "False when value is empty",
      "Requires true or false value",
    ],
    answer: "True when attribute is present",
  },

  // ---------- 6 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which HTML element creates a drop-down menu?</p>
        <CodeBlock
          language="html"
          code={`<select>
  <option>HTML</option>
  <option>CSS</option>
</select>`}
        />
      </div>
    ),
    options: ["<dropdown>", "<list>", "<select>", "<menu>"],
    answer: "<select>",
  },

  // ---------- 7 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which element defines each item in the drop-down list?</p>
        <CodeBlock
          language="html"
          code={`<option value="js">JavaScript</option>`}
        />
      </div>
    ),
    options: ["<input>", "<select>", "<option>", "<label>"],
    answer: "<option>",
  },

  // ---------- 8 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>
          What is the purpose of the <b>value</b> attribute here?
        </p>
        <CodeBlock language="html" code={`<option value="css">CSS</option>`} />
      </div>
    ),
    options: [
      "Displays option text",
      "Specifies value sent on selection",
      "Styles the option",
      "Groups options",
    ],
    answer: "Specifies value sent on selection",
  },

  // ---------- 9 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which input type is used below?</p>
        <CodeBlock
          language="html"
          code={`<input type="radio" name="gender" />`}
        />
      </div>
    ),
    options: ["checkbox", "radio", "select", "text"],
    answer: "radio",
  },

  // ---------- 10 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>
          What is the purpose of the <b>name</b> attribute here?
        </p>
        <CodeBlock
          language="html"
          code={`<input type="radio" name="payment" value="card" />
<input type="radio" name="payment" value="upi" />`}
        />
      </div>
    ),
    options: [
      "To style radio buttons",
      "To group radio buttons",
      "To disable radio buttons",
      "To validate input",
    ],
    answer: "To group radio buttons",
  },

  // ---------- 11 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>What happens when both radio buttons have the same name?</p>
        <CodeBlock
          language="html"
          code={`<input type="radio" name="color" /> Red
<input type="radio" name="color" /> Blue`}
        />
      </div>
    ),
    options: [
      "Both can be selected",
      "Only one can be selected",
      "Selection causes error",
      "Both are disabled",
    ],
    answer: "Only one can be selected",
  },

  // ---------- 12 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which option will be selected by default?</p>
        <CodeBlock
          language="html"
          code={`<select>
  <option value="html">HTML</option>
  <option value="css" selected>CSS</option>
</select>`}
        />
      </div>
    ),
    options: ["HTML", "CSS", "None", "Both"],
    answer: "CSS",
  },

  // ---------- 13 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which Boolean attribute is used below?</p>
        <CodeBlock
          language="html"
          code={`<option selected>JavaScript</option>`}
        />
      </div>
    ),
    options: ["checked", "selected", "value", "name"],
    answer: "selected",
  },

  // ---------- 14 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>
          What does the <b>checked</b> attribute do?
        </p>
        <CodeBlock language="html" code={`<input type="radio" checked />`} />
      </div>
    ),
    options: [
      "Disables input",
      "Pre-selects the input",
      "Groups inputs",
      "Adds validation",
    ],
    answer: "Pre-selects the input",
  },

  // ---------- 15 (CodeBlock) ----------
  {
    question: (
      <div>
        <p>Which statement about Boolean attributes is correct?</p>
        <CodeBlock language="html" code={`<input type="checkbox" checked />`} />
      </div>
    ),
    options: [
      "They require true or false values",
      "Presence means true",
      "They work only with radio buttons",
      "They store text values",
    ],
    answer: "Presence means true",
  },
];

const Forms_MCQ_2 = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Forms Part-2 - MCQs"
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

export default Forms_MCQ_2;
