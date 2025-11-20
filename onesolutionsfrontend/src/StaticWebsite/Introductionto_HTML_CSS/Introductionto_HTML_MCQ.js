import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>What will this HTML code display?</p>
        <CodeBlock
          language="html"
          code={`<h1>Hello Welcome to Static Website</h1>`}
        />
      </div>
    ),
    options: [
      "A paragraph",
      "A main heading saying 'Hello Welcome to Static Website'",
      "A button",
      "Nothing",
    ],
    answer: "A main heading saying 'Hello Welcome to Static Website'",
  },
  {
    question: (
      <div>
        <p>What does this HTML code create?</p>
        <CodeBlock language="html" code={`<button>Submit</button>`} />
      </div>
    ),
    options: [
      "A paragraph",
      "A clickable button labeled 'Submit'",
      "A heading",
      "A link",
    ],
    answer: "A clickable button labeled 'Submit'",
  },
  {
    question: (
      <div>
        <p>What will be the output of this code?</p>
        <CodeBlock
          language="html"
          code={`<p>This is a paragraph. It can contain bold or italic text.</p>`}
        />
      </div>
    ),
    options: [
      "A heading",
      "A paragraph saying 'This is a paragraph. It can contain bold or italic text.'",
      "A button",
      "No output",
    ],
    answer:
      "A paragraph saying 'This is a paragraph. It can contain bold or italic text.'",
  },
  {
    question: (
      <div>
        <p>What is missing in this HTML skeleton?</p>
        <CodeBlock
          language="html"
          code={`<html><head><title>Page</title></head><body></body></html>`}
        />
      </div>
    ),
    options: ["<!DOCTYPE html>", "<head>", "<body>", "<title>"],
    answer: "<!DOCTYPE html>",
  },
  {
    question: (
      <div>
        <p>What will this code display?</p>
        <CodeBlock language="html" code={`<h6>Smallest Heading</h6>`} />
      </div>
    ),
    options: [
      "A large heading",
      "A small heading saying 'Smallest Heading'",
      "A paragraph",
      "An error",
    ],
    answer: "A small heading saying 'Smallest Heading'",
  },
  {
    question: (
      <div>
        <p>Which element is rendered by this code?</p>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Main</h1></body></html>`}
        />
      </div>
    ),
    options: [
      "A paragraph",
      "A main heading saying 'Main'",
      "A button",
      "No visible content",
    ],
    answer: "A main heading saying 'Main'",
  },
  {
    question: (
      <div>
        <p>What does this button do?</p>
        <CodeBlock language="html" code={`<button>Click Here</button>`} />
      </div>
    ),
    options: [
      "Displays text",
      "Creates a clickable button labeled 'Click Here'",
      "Shows a paragraph",
      "Nothing until JavaScript is added",
    ],
    answer: "Creates a clickable button labeled 'Click Here'",
  },
  {
    question: (
      <div>
        <p>What is the purpose of this line?</p>
        <CodeBlock language="html" code={`<!DOCTYPE html>`} />
      </div>
    ),
    options: [
      "Starts the body",
      "Tells the browser it's an HTML5 document",
      "Defines a heading",
      "Creates a button",
    ],
    answer: "Tells the browser it's an HTML5 document",
  },
  {
    question: (
      <div>
        <p>What will this full HTML display?</p>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html><html><head><title>My Site</title></head><body><p>Welcome!</p></body></html>`}
        />
      </div>
    ),
    options: [
      "A heading saying 'Welcome!'",
      "A paragraph saying 'Welcome!'",
      "A button",
      "Blank page",
    ],
    answer: "A paragraph saying 'Welcome!'",
  },
  {
    question: (
      <div>
        <p>How many heading elements are in this code?</p>
        <CodeBlock
          language="html"
          code={`<h1>Title</h1><h3>Subtitle</h3><p>Text</p>`}
        />
      </div>
    ),
    options: ["1", "2", "3", "0"],
    answer: "2",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "What is the correct basic structure of an HTML document?",
    options: [
      "<html><body></body></html>",
      "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
      "<head><title></title></head><body></body>",
      "<!DOCTYPE><html><body></body></html>",
    ],
    answer:
      "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
  },
  {
    question: "The HTML <h1> element is known as the ______ element.",
    options: ["paragraph", "button", "main heading", "text"],
    answer: "main heading",
  },
  {
    question: "Which is the correct start tag for a paragraph?",
    options: ["<paragraph>", "<p>", "<para>", "<pg>"],
    answer: "<p>",
  },
  {
    question: "Which is the correct start tag for a native HTML button?",
    options: ["<btn>", "<button>", '<input type="button">', "<click>"],
    answer: "<button>",
  },
  {
    question: "How many heading levels are available in HTML?",
    options: ["4", "5", "6", "7"],
    answer: "6",
  },
];

const Introductionto_HTML_MCQ = ({
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
      title="Introduction to HTML - MCQs"
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

export default Introductionto_HTML_MCQ;
