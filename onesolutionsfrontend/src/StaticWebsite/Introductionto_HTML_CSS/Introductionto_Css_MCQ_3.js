import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>What font will be applied to the heading?</p>
        <CodeBlock language="css" code={`.title { font-family: "Roboto"; }`} />
        <CodeBlock language="html" code={`<h1 class="title">Welcome</h1>`} />
      </div>
    ),
    options: ['"Arial"', '"Roboto"', '"Times New Roman"', "Helvetica"],
    answer: '"Roboto"',
  },
  {
    question: (
      <div>
        <p>What will be the size of the text?</p>
        <CodeBlock language="css" code={`p { font-size: 18px; }`} />
        <CodeBlock language="html" code={`<p>This is a paragraph.</p>`} />
      </div>
    ),
    options: ["18px", "18 px", "18", '"18px"'],
    answer: "18px",
  },
  {
    question: (
      <div>
        <p>How will the text "Important" appear?</p>
        <CodeBlock language="css" code={`.imp { font-style: italic; }`} />
        <CodeBlock
          language="html"
          code={`<span class="imp">Important</span>`}
        />
      </div>
    ),
    options: ["Normal", "Italic", "Bold", "Underlined"],
    answer: "Italic",
  },
  {
    question: (
      <div>
        <p>What will be the thickness of the text?</p>
        <CodeBlock language="css" code={`h2 { font-weight: bold; }`} />
        <CodeBlock language="html" code={`<h2>About Us</h2>`} />
      </div>
    ),
    options: ["Normal", "Bold", "Light", "Bolder"],
    answer: "Bold",
  },
  {
    question: (
      <div>
        <p>What decoration will the link have?</p>
        <CodeBlock
          language="css"
          code={`.link { text-decoration: underline; }`}
        />
        <CodeBlock
          language="html"
          code={`<a href="#" class="link">Visit Site</a>`}
        />
      </div>
    ),
    options: ["No decoration", "Underline", "Line-through", "Overline"],
    answer: "Underline",
  },
  {
    question: (
      <div>
        <p>How will the deleted text appear?</p>
        <CodeBlock
          language="css"
          code={`.del { text-decoration: line-through; }`}
        />
        <CodeBlock
          language="html"
          code={`<p>Old price: <span class="del">$99</span></p>`}
        />
      </div>
    ),
    options: ["Underlined", "No change", "Line-through", "Bold"],
    answer: "Line-through",
  },
  {
    question: (
      <div>
        <p>What font and size will be applied to all paragraphs?</p>
        <CodeBlock
          language="css"
          code={`p { 
  font-family: "Georgia"; 
  font-size: 16px; 
}`}
        />
        <CodeBlock
          language="html"
          code={`<p>This is a sample paragraph.</p>`}
        />
      </div>
    ),
    options: [
      "Font: Georgia, Size: 16px",
      "Font: Arial, Size: 16px",
      "Font: Georgia, Size: 16",
      'Font: "Georgia", Size: 16 px',
    ],
    answer: "Font: Georgia, Size: 16px",
  },
  {
    question: (
      <div>
        <p>What will be the font weight of the title?</p>
        <CodeBlock language="css" code={`.main-title { font-weight: 700; }`} />
        <CodeBlock
          language="html"
          code={`<h1 class="main-title">Main Heading</h1>`}
        />
      </div>
    ),
    options: ["Normal", "Bold", "Light", "Very Bold"],
    answer: "Bold",
  },
  {
    question: (
      <div>
        <p>How will the text "Note" be styled?</p>
        <CodeBlock
          language="css"
          code={`.note { 
  font-style: oblique; 
  text-decoration: underline; 
}`}
        />
        <CodeBlock
          language="html"
          code={`<p class="note">Note: Read carefully.</p>`}
        />
      </div>
    ),
    options: [
      "Normal and underlined",
      "Italic and underlined",
      "Oblique and underlined",
      "Bold and overline",
    ],
    answer: "Oblique and underlined",
  },
  {
    question: (
      <div>
        <p>What font family is used for the banner?</p>
        <CodeBlock
          language="css"
          code={`.banner { font-family: "Courier New", monospace; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="banner">Code Example</div>`}
        />
      </div>
    ),
    options: [
      "Sans-serif",
      '"Courier New" (with fallback)',
      "Serif",
      "Fantasy",
    ],
    answer: '"Courier New" (with fallback)',
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question:
      "Which of the following is a valid value of the CSS property font-family?",
    options: ["blue", '"Roboto"', "red", "center"],
    answer: '"Roboto"',
  },
  {
    question:
      "Fill in the blank with an appropriate value for the CSS property font-size.",
    options: ["center", "blue", '"Roboto"', "20px"],
    answer: "20px",
  },
  {
    question:
      "Fill in the blank with an appropriate value for the CSS property font-style.",
    options: ["20px", "italic", "blue", '"Roboto"'],
    answer: "italic",
  },
  {
    question:
      "The CSS _______ property specifies how thick or thin characters in text should be displayed.",
    options: ["font-style", "font-family", "font-size", "font-weight"],
    answer: "font-weight",
  },
  {
    question:
      "Fill in the blank with an appropriate value for the CSS property text-decoration.",
    options: ["bold", "underline", '"Roboto"', "20px"],
    answer: "underline",
  },
];

const Introductionto_Css_MCQ_3 = ({
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
      title="CIntroduction to CSS Part 3 - MCQs"
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

export default Introductionto_Css_MCQ_3;
