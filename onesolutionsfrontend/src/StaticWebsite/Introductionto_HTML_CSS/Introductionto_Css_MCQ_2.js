import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will be the text color of the heading?</p>
        <CodeBlock language="css" code={`.title { color: blue; }`} />
        <CodeBlock language="html" code={`<h1 class="title">Welcome</h1>`} />
      </div>
    ),
    options: ["Black", "Red", "Blue", "Green"],
    answer: "Blue",
  },
  {
    question: (
      <div>
        <p>What will be the background color of the box?</p>
        <CodeBlock language="css" code={`.box { background-color: yellow; }`} />
        <CodeBlock
          language="html"
          code={`<div class="box">Hello World</div>`}
        />
      </div>
    ),
    options: ["White", "Yellow", "Gray", "Transparent"],
    answer: "Yellow",
  },
  {
    question: (
      <div>
        <p>What color will the paragraph text be?</p>
        <CodeBlock language="css" code={`p { color: green; }`} />
        <CodeBlock language="html" code={`<p>This is a sample text.</p>`} />
      </div>
    ),
    options: ["Black", "Green", "Red", "Blue"],
    answer: "Green",
  },
  {
    question: (
      <div>
        <p>What will be the background color of the button?</p>
        <CodeBlock language="css" code={`.btn { background-color: red; }`} />
        <CodeBlock
          language="html"
          code={`<button class="btn">Click Me</button>`}
        />
      </div>
    ),
    options: ["Red", "Blue", "White", "Green"],
    answer: "Red",
  },
  {
    question: (
      <div>
        <p>What color will the text "Special" appear in?</p>
        <CodeBlock language="css" code={`.highlight { color: purple; }`} />
        <CodeBlock
          language="html"
          code={`<p>Regular text <span class="highlight">Special</span> text.</p>`}
        />
      </div>
    ),
    options: ["Black", "Purple", "Gray", "Orange"],
    answer: "Purple",
  },
  {
    question: (
      <div>
        <p>What will be the background color of the heading?</p>
        <CodeBlock language="css" code={`h2 { background-color: pink; }`} />
        <CodeBlock language="html" code={`<h2>About Section</h2>`} />
      </div>
    ),
    options: ["White", "Pink", "Light blue", "Gray"],
    answer: "Pink",
  },
  {
    question: (
      <div>
        <p>What text color will all list items have?</p>
        <CodeBlock language="css" code={`li { color: orange; }`} />
        <CodeBlock
          language="html"
          code={`<ul><li>Item 1</li><li>Item 2</li></ul>`}
        />
      </div>
    ),
    options: ["Black", "Orange", "Red", "Blue"],
    answer: "Orange",
  },
  {
    question: (
      <div>
        <p>What will be the text color of the paragraph?</p>
        <CodeBlock language="css" code={`.info { color: #ff4500; }`} />
        <CodeBlock
          language="html"
          code={`<p class="info">Important Notice</p>`}
        />
      </div>
    ),
    options: ["Orange-red", "Blue", "Green", "Black"],
    answer: "Orange-red",
  },
  {
    question: (
      <div>
        <p>What background color will the container have?</p>
        <CodeBlock
          language="css"
          code={`.card { background-color: #f0f0f0; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="card">Content here</div>`}
        />
      </div>
    ),
    options: ["White", "Light gray", "Dark gray", "Transparent"],
    answer: "Light gray",
  },
  {
    question: (
      <div>
        <p>What color will the link text be?</p>
        <CodeBlock language="css" code={`a { color: teal; }`} />
        <CodeBlock language="html" code={`<a href="#">Visit Site</a>`} />
      </div>
    ),
    options: ["Blue", "Teal", "Red", "Black"],
    answer: "Teal",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question:
      "Fill in the blank with CSS property to apply grey color to an HTML heading element.",
    options: ["color", "text-color", "text-align", "all of the above"],
    answer: "color",
  },
  {
    question:
      "Fill in the blank with appropriate CSS property to apply background color to an HTML container element.",
    options: [
      "background-color",
      "color",
      "text-align",
      "all of these options",
    ],
    answer: "background-color",
  },
  {
    question: "Which CSS property specifies the color of the text?",
    options: ["background-color", "color", "font-color", "text-style"],
    answer: "color",
  },
  {
    question:
      "Which CSS property is used to set the background color of an element?",
    options: ["color", "bg-color", "background-color", "fill"],
    answer: "background-color",
  },
  {
    question: "What does the CSS 'color' property control?",
    options: ["Background color", "Text color", "Border color", "All colors"],
    answer: "Text color",
  },
];
const Introductionto_Css_MCQ_2 = ({
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
      title="Introduction to CSS Part 2 - MCQs"
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

export default Introductionto_Css_MCQ_2;
