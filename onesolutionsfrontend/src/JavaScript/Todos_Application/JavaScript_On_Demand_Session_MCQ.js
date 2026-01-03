import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ======== CodeBlock Questions (10) ========
  {
    question: (
      <div>
        <p>Which syntax correctly follows camel case?</p>
        <CodeBlock
          language="javascript"
          code={`document.getelementbyid("demo");`}
        />
      </div>
    ),
    options: [
      "document.GetElementById('demo');",
      "document.getElementByID('demo');",
      "document.getElementById('demo');",
      "document.getelementbyid('demo');",
    ],
    answer: "document.getElementById('demo');",
  },
  {
    question: (
      <div>
        <p>What is wrong in this code?</p>
        <CodeBlock
          language="javascript"
          code={`const el = document.CreateElement("div");`}
        />
      </div>
    ),
    options: [
      "Missing semicolon",
      "CreateElement should be lowercase",
      "Wrong variable name",
      "No error",
    ],
    answer: "CreateElement should be lowercase",
  },
  {
    question: (
      <div>
        <p>Why will this code not work?</p>
        <CodeBlock
          language="javascript"
          code={`element.textcontent = "Hello";`}
        />
      </div>
    ),
    options: [
      "textcontent should be camel case",
      "element is undefined",
      "Missing quotes",
      "No error",
    ],
    answer: "textcontent should be camel case",
  },
  {
    question: (
      <div>
        <p>Identify the issue in this example:</p>
        <CodeBlock
          language="html"
          code={`<p id="msg">Hi</p>
<script>
  document.getElementById("message").textContent = "Hello";
</script>`}
        />
      </div>
    ),
    options: [
      "Wrong tag used",
      "ID mismatch in HTML and JS",
      "Missing script tag",
      "Camel case error",
    ],
    answer: "ID mismatch in HTML and JS",
  },
  {
    question: (
      <div>
        <p>Why won’t the text change here?</p>
        <CodeBlock
          language="html"
          code={`<h1 id="title ">Welcome</h1>
<script>
  document.getElementById("title").textContent = "Hello";
</script>`}
        />
      </div>
    ),
    options: [
      "Extra space in ID",
      "Wrong method",
      "Missing quotes",
      "Invalid tag",
    ],
    answer: "Extra space in ID",
  },
  {
    question: (
      <div>
        <p>What happens when this code runs?</p>
        <CodeBlock
          language="javascript"
          code={`function greet() {
  console.log("Hi");
}
great();`}
        />
      </div>
    ),
    options: ["Prints Hi", "Prints undefined", "ReferenceError", "No output"],
    answer: "ReferenceError",
  },
  {
    question: (
      <div>
        <p>Which change will fix the error?</p>
        <CodeBlock
          language="javascript"
          code={`function sayHello() {
  console.log("Hello");
}
sayhello();`}
        />
      </div>
    ),
    options: [
      "Change sayhello() to sayHello()",
      "Add semicolon",
      "Change function keyword",
      "No change needed",
    ],
    answer: "Change sayhello() to sayHello()",
  },
  {
    question: (
      <div>
        <p>Which method name is written incorrectly?</p>
        <CodeBlock
          language="javascript"
          code={`element.classlist.add("active");`}
        />
      </div>
    ),
    options: [
      "element.classList.add()",
      "element.classlist.add()",
      "element.classList.Add()",
      "Both B and C",
    ],
    answer: "Both B and C",
  },
  {
    question: (
      <div>
        <p>What is the correct property name?</p>
        <CodeBlock language="javascript" code={`para.textcontent = "Hello";`} />
      </div>
    ),
    options: ["textContent", "text-content", "TextContent", "textcontent"],
    answer: "textContent",
  },
  {
    question: (
      <div>
        <p>Which correction is needed?</p>
        <CodeBlock
          language="javascript"
          code={`document.getElementbyId("box");`}
        />
      </div>
    ),
    options: [
      "Change by to By",
      "Change Id to ID",
      "Remove get",
      "No correction",
    ],
    answer: "Change by to By",
  },

  // ======== Normal Questions (5) ========
  {
    question: "Why must JavaScript methods follow camel case exactly?",
    options: [
      "JS ignores case",
      "JS is case-sensitive",
      "HTML requires it",
      "Browser fixes it",
    ],
    answer: "JS is case-sensitive",
  },
  {
    question: "What happens if HTML ID and JS ID differ?",
    options: [
      "Code still works",
      "Element is not accessed",
      "Syntax error",
      "Browser auto-corrects",
    ],
    answer: "Element is not accessed",
  },
  {
    question: "What causes issues when there is extra space in an HTML ID?",
    options: [
      "Styling breaks",
      "JS cannot find the element",
      "HTML becomes invalid",
      "Nothing happens",
    ],
    answer: "JS cannot find the element",
  },
  {
    question:
      "JavaScript function names must match in declaration and call because:",
    options: [
      "JS is loosely typed",
      "JS is case-sensitive",
      "Functions are hoisted",
      "Variables are global",
    ],
    answer: "JS is case-sensitive",
  },
  {
    question: "Which is the correct camel case format?",
    options: [
      "getelementbyid",
      "GetElementById",
      "getElementById",
      "getelementByID",
    ],
    answer: "getElementById",
  },
];

const JavaSript_On_Demand_Session_MCQ = ({
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
      title=" On Demand Session - MCQs"
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

export default JavaSript_On_Demand_Session_MCQ;
