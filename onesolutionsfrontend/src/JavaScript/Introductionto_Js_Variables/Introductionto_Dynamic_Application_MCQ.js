import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ======== 5 Normal Questions ========
  {
    question: "What are dynamic applications?",
    options: [
      "Web pages that never change",
      "Applications that reload the page for every action",
      "Web pages that interact with users and update content dynamically",
      "Pages created using only HTML",
    ],
    answer: "Web pages that interact with users and update content dynamically",
  },
  {
    question: "Which technology makes static web pages dynamic?",
    options: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    answer: "JavaScript",
  },
  {
    question: "What is a key feature of a dynamic web page?",
    options: [
      "Requires page reload for every update",
      "Does not respond to user input",
      "Updates content without refreshing the page",
      "Contains only fixed content",
    ],
    answer: "Updates content without refreshing the page",
  },
  {
    question: "Why are dynamic applications important?",
    options: [
      "They reduce user interaction",
      "They improve user experience and interactivity",
      "They prevent DOM usage",
      "They disable events",
    ],
    answer: "They improve user experience and interactivity",
  },
  {
    question: "Which of the following improves interactivity in web pages?",
    options: [
      "Static HTML content",
      "JavaScript event handling",
      "Only CSS styling",
      "Fixed layouts",
    ],
    answer: "JavaScript event handling",
  },

  // ======== 10 CodeBlock Questions ========
  {
    question: (
      <div>
        <p>What happens when this button is clicked?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="alert('Hi')">Click</button>`}
        />
      </div>
    ),
    options: [
      "Displays Hi in an alert box",
      "Displays Hi on the page",
      "Reloads the page",
      "Does nothing",
    ],
    answer: "Displays Hi in an alert box",
  },
  {
    question: (
      <div>
        <p>Which event is used in the following code?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="myFunction()">Submit</button>`}
        />
      </div>
    ),
    options: ["onload", "onclick", "onchange", "onmouseover"],
    answer: "onclick",
  },
  {
    question: (
      <div>
        <p>What does this JavaScript code do?</p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("msg").innerHTML = "Hello";`}
        />
      </div>
    ),
    options: [
      "Deletes the element",
      "Changes the content of the element",
      "Adds a new element",
      "Shows an alert",
    ],
    answer: "Changes the content of the element",
  },
  {
    question: (
      <div>
        <p>What will trigger this alert?</p>
        <CodeBlock
          language="html"
          code={`<input type="text" onchange="alert('Changed')">`}
        />
      </div>
    ),
    options: [
      "When the page loads",
      "When typing starts",
      "When input value changes and loses focus",
      "When mouse moves",
    ],
    answer: "When input value changes and loses focus",
  },
  {
    question: (
      <div>
        <p>What is the purpose of this code?</p>
        <CodeBlock
          language="javascript"
          code={`document.querySelector("p").style.color = "red";`}
        />
      </div>
    ),
    options: [
      "Deletes the paragraph",
      "Changes paragraph text",
      "Changes paragraph color",
      "Creates a new paragraph",
    ],
    answer: "Changes paragraph color",
  },
  {
    question: (
      <div>
        <p>Which concept is demonstrated below?</p>
        <CodeBlock
          language="html"
          code={`<div onmouseover="alert('Hovered')">Box</div>`}
        />
      </div>
    ),
    options: [
      "DOM creation",
      "Event handling",
      "CSS styling",
      "Static content",
    ],
    answer: "Event handling",
  },
  {
    question: (
      <div>
        <p>What does the DOM allow developers to do?</p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("title")`}
        />
      </div>
    ),
    options: [
      "Design CSS layouts",
      "Access and modify HTML elements",
      "Create databases",
      "Load external libraries",
    ],
    answer: "Access and modify HTML elements",
  },
  {
    question: (
      <div>
        <p>Which dynamic behavior is shown below?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="this.innerHTML='Done'">Click</button>`}
        />
      </div>
    ),
    options: [
      "Page reload",
      "Content update on click",
      "Static content",
      "CSS animation",
    ],
    answer: "Content update on click",
  },
  {
    question: (
      <div>
        <p>What happens when this code runs?</p>
        <CodeBlock
          language="javascript"
          code={`document.body.style.backgroundColor = "yellow";`}
        />
      </div>
    ),
    options: [
      "Deletes body content",
      "Changes background color",
      "Reloads page",
      "Adds new body element",
    ],
    answer: "Changes background color",
  },
  {
    question: (
      <div>
        <p>Which feature of dynamic applications is shown?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="alert('Clicked')">Click</button>`}
        />
      </div>
    ),
    options: [
      "Static design",
      "Real-time interactivity",
      "Fixed layout",
      "Server-side rendering",
    ],
    answer: "Real-time interactivity",
  },
];

const Introductionto_Dynamic_Application_MCQ = ({
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
      title="Introduction to Dynamic Application - MCQs"
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
export default Introductionto_Dynamic_Application_MCQ;
