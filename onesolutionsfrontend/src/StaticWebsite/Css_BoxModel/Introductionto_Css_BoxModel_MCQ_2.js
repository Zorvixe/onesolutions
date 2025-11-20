import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>How thick will the border be?</p>
        <CodeBlock language="css" code={`.box { border-width: 5px; border-style: solid; }`} />
        <CodeBlock language="html" code={`<div class="box">Box</div>`} />
      </div>
    ),
    options: ["5px", "1px", "10px", "No border (missing style)"],
    answer: "5px",
  },
  {
    question: (
      <div>
        <p>What will the corners look like?</p>
        <CodeBlock language="css" code={`.card { border-radius: 15px; border-style: solid; }`} />
        <CodeBlock language="html" code={`<div class="card">Card</div>`} />
      </div>
    ),
    options: [
      "Sharp corners",
      "Rounded corners (all four)",
      "Only top rounded",
      "Only one corner rounded",
    ],
    answer: "Rounded corners (all four)",
  },
  {
    question: (
      <div>
        <p>What color will the border be?</p>
        <CodeBlock language="css" code={`.alert { border-color: #ff0000; border-style: solid; }`} />
        <CodeBlock language="html" code={`<div class="alert">Warning</div>`} />
      </div>
    ),
    options: ["Black", "Red", "Blue", "Green"],
    answer: "Red",
  },
  {
    question: (
      <div>
        <p>What style will the border have?</p>
        <CodeBlock language="css" code={`.line { border-style: dashed; border-width: 2px; }`} />
        <CodeBlock
          language="html"
          code={`<div class="line">Dashed Border</div>`}
        />
      </div>
    ),
    options: ["No border", "Dotted", "Dashed", "Solid"],
    answer: "Dashed",
  },
  {
    question: (
      <div>
        <p>How much space will be inside the box?</p>
        <CodeBlock language="css" code={`.content { padding: 20px; border: 1px solid; }`} />
        <CodeBlock
          language="html"
          code={`<div class="content">Text inside</div>`}
        />
      </div>
    ),
    options: [
      "20px space around content (inside border)",
      "20px space outside border",
      "20px margin",
      "No space",
    ],
    answer: "20px space around content (inside border)",
  },
  {
    question: (
      <div>
        <p>What will this button look like?</p>
        <CodeBlock
          language="css"
          code={`.btn {
  border-width: 3px;
  border-style: solid;
  border-color: #008000;
  border-radius: 10px;
  padding: 10px;
}`}
        />
        <CodeBlock
          language="html"
          code={`<button class="btn">Click</button>`}
        />
      </div>
    ),
    options: [
      "Green solid border, rounded corners, inner spacing",
      "Blue dashed border, sharp corners",
      "No border, no padding",
      "Red border with no style",
    ],
    answer: "Green solid border, rounded corners, inner spacing",
  },
  {
    question: (
      <div>
        <p>Which color is represented by this hex code?</p>
        <CodeBlock language="css" code={`.orange { border-color: #ffa500; border-style: solid; }`} />
        <CodeBlock
          language="html"
          code={`<div class="orange">Border Test</div>`}
        />
      </div>
    ),
    options: ["Red", "Blue", "Orange", "Green"],
    answer: "Orange",
  },
  {
    question: (
      <div>
        <p>Which corner will be rounded?</p>
        <CodeBlock
          language="css"
          code={`.corner { border-bottom-left-radius: 20px; border: 2px solid; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="corner">Corner Test</div>`}
        />
      </div>
    ),
    options: [
      "Top-right",
      "Bottom-left",
      "Top-left",
      "All corners",
    ],
    answer: "Bottom-left",
  },
  {
    question: (
      <div>
        <p>Will the border be visible?</p>
        <CodeBlock
          language="css"
          code={`.invisible { border-width: 0px; border-style: solid; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="invisible">Hidden Border</div>`}
        />
      </div>
    ),
    options: [
      "Yes, thick border",
      "No, width is 0px",
      "Only color visible",
      "Dotted border",
    ],
    answer: "No, width is 0px",
  },
  {
    question: (
      <div>
        <p>What happens if border-style is missing?</p>
        <CodeBlock
          language="css"
          code={`.no-style { border-width: 4px; border-color: blue; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="no-style">No Style</div>`}
        />
      </div>
    ),
    options: [
      "Border appears blue",
      "No border visible",
      "Dotted border",
      "Only width visible",
    ],
    answer: "No border visible",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question:
      "Which CSS Property can be used to set the border thickness of an HTML element?",
    options: ["height", "border-width", "width", "border"],
    answer: "border-width",
  },
  {
    question:
      "Which CSS Property is used to round the bottom left corner of an HTML element?",
    options: [
      "left-bottom-border-radius",
      "border-bottom-left-radius",
      "border-bottom-top-radius",
      "border-bottom-right-radius",
    ],
    answer: "border-bottom-left-radius",
  },
  {
    question:
      "Which CSS Property specifies the color for all the four borders of an HTML element?",
    options: ["border-color", "border-width", "color", "background-color"],
    answer: "border-color",
  },
  {
    question:
      "Which CSS Property specifies the style for all the four borders of an HTML element?",
    options: ["border-color", "border", "style", "border-style"],
    answer: "border-style",
  },
  {
    question:
      "Which of the following statements is true regarding the CSS Box Model?",
    options: [
      "Padding is the border surrounding the content of an HTML element.",
      "Padding is the background surrounding the content of an HTML element.",
      "Padding is the space surrounding the content of an HTML element.",
      "Padding is the border color of the content of an HTML element.",
    ],
    answer: "Padding is the space surrounding the content of an HTML element.",
  },
];
const Introductionto_Css_BoxModel_MCQ_2 = ({
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
      title="Introduction to CSS BoxModel Part 2 - MCQs"
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

export default Introductionto_Css_BoxModel_MCQ_2;
