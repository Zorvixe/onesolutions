import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>What does this HTML code create?</p>
        <CodeBlock
          language="html"
          code={`<div>This is inside a container</div>`}
        />
      </div>
    ),
    options: [
      "A paragraph",
      "A container element with text",
      "A heading",
      "A button",
    ],
    answer: "A container element with text",
  },
  {
    question: (
      <div>
        <p>What is the output of this CSS?</p>
        <CodeBlock language="css" code={`p { text-align: center; }`} />
      </div>
    ),
    options: [
      "Text aligned to the left",
      "Text aligned to the center",
      "Text aligned to the right",
      "No alignment",
    ],
    answer: "Text aligned to the center",
  },
  {
    question: (
      <div>
        <p>Which property is used in this CSS rule?</p>
        <CodeBlock language="css" code={`h1 { text-align: left; }`} />
      </div>
    ),
    options: ["align-text", "text-align", "horizontal-align", "center"],
    answer: "text-align",
  },
  {
    question: (
      <div>
        <p>What value is applied to text-align in this code?</p>
        <CodeBlock language="css" code={`div { text-align: right; }`} />
      </div>
    ),
    options: ["left", "center", "right", "justify"],
    answer: "right",
  },
  {
    question: (
      <div>
        <p>Which element will be centered by this CSS?</p>
        <CodeBlock language="html" code={`<p class="center">Hello</p>`} />
        <CodeBlock language="css" code={`.center { text-align: center; }`} />
      </div>
    ),
    options: [
      "All paragraphs",
      "Only the paragraph with class 'center'",
      "Headings",
      "No elements",
    ],
    answer: "Only the paragraph with class 'center'",
  },
  {
    question: (
      <div>
        <p>What does this CSS rule do?</p>
        <CodeBlock language="css" code={`.container { text-align: center; }`} />
      </div>
    ),
    options: [
      "Centers the container itself",
      "Centers text inside elements with class 'container'",
      "Aligns to the right",
      "No effect",
    ],
    answer: "Centers text inside elements with class 'container'",
  },
  {
    question: (
      <div>
        <p>Identify the CSS property in this rule:</p>
        <CodeBlock language="css" code={`span { text-align: justify; }`} />
      </div>
    ),
    options: ["justify", "text-align", "align", "span"],
    answer: "text-align",
  },
  {
    question: (
      <div>
        <p>What will this HTML + CSS display?</p>
        <CodeBlock
          language="html"
          code={`<div style="text-align: center;">Centered Text</div>`}
        />
      </div>
    ),
    options: [
      "Text aligned left",
      "Text aligned center",
      "Text aligned right",
      "Bold text",
    ],
    answer: "Text aligned center",
  },
  {
    question: (
      <div>
        <p>Which of these is a valid text-align value?</p>
        <CodeBlock language="css" code={`p { text-align: ???; }`} />
      </div>
    ),
    options: ["middle", "center", "align-center", "text-center"],
    answer: "center",
  },
  {
    question: (
      <div>
        <p>How many container elements are in this code?</p>
        <CodeBlock language="html" code={`<div><div>Nested</div></div>`} />
      </div>
    ),
    options: ["0", "1", "2", "3"],
    answer: "2",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "Which HTML element is used as a container?",
    options: ["<span>", "<div>", "<section>", "<container>"],
    answer: "<div>",
  },
  {
    question: "Which of the following is a CSS property?",
    options: ["text-align", ".h-center", "center", "Text Align"],
    answer: "text-align",
  },
  {
    question: "What does the CSS property 'text-align' control?",
    options: [
      "Vertical alignment",
      "Horizontal alignment of text",
      "Font size",
      "Color of text",
    ],
    answer: "Horizontal alignment of text",
  },
  {
    question: "Which value aligns text to the right in CSS?",
    options: ["left", "center", "right", "justify"],
    answer: "right",
  },
  {
    question:
      "Which HTML element is commonly used to group block-level content?",
    options: ["<span>", "<p>", "<div>", "<header>"],
    answer: "<div>",
  },
];

const HTML_Elements_MCQ = ({
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
      title="HTML Elements & CSS Text Align - MCQs"
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

export default HTML_Elements_MCQ;
