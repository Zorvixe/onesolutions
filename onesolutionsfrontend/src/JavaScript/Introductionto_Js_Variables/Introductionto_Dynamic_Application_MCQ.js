import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: "What is the main purpose of a dynamic web page?",
    options: [
      "To display the same content for every user",
      "To allow content to change based on user interaction",
      "To prevent any user interaction",
      "To make pages load slower",
    ],
    answer: "To allow content to change based on user interaction",
  },
  {
    question:
      "Which language is primarily responsible for making web pages dynamic and interactive?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "JavaScript",
  },
  {
    question: "What is the benefit of using dynamic web pages?",
    options: [
      "They automatically reload every few seconds",
      "They improve interactivity without reloading the page",
      "They cannot handle user inputs",
      "They disable event handling",
    ],
    answer: "They improve interactivity without reloading the page",
  },
  {
    question:
      "Which of the following is an example of a dynamic behavior on a webpage?",
    options: [
      "Static text displayed on the screen",
      "An image that changes when you hover over it",
      "A fixed layout with no user interaction",
      "Plain text displayed using HTML only",
    ],
    answer: "An image that changes when you hover over it",
  },
  {
    question:
      "Which of the following JavaScript events is triggered when a button is clicked?",
    options: ["onload", "onclick", "onhover", "onscroll"],
    answer: "onclick",
  },
  {
    question: "What does DOM stand for in JavaScript?",
    options: [
      "Document Object Model",
      "Data Object Manager",
      "Dynamic Output Mechanism",
      "Document Order Mapping",
    ],
    answer: "Document Object Model",
  },
  {
    question: (
      <div>
        <p>What will happen when this code runs?</p>
        <CodeBlock
          language="html"
          code={`<button onclick="alert('Hello!')">Click Me</button>`}
        />
      </div>
    ),
    options: [
      "Displays 'Hello!' in an alert box when clicked",
      "Shows 'Hello!' on the page",
      "Does nothing",
      "Throws an error",
    ],
    answer: "Displays 'Hello!' in an alert box when clicked",
  },
  {
    question: (
      <div>
        <p>What will this JavaScript code do when executed?</p>
        <CodeBlock
          language="javascript"
          code={`document.getElementById("demo").innerHTML = "Welcome!";`}
        />
      </div>
    ),
    options: [
      "Deletes the element with ID 'demo'",
      "Adds a new element to the DOM",
      "Changes the content of the element with ID 'demo' to 'Welcome!'",
      "Shows an alert box with 'Welcome!'",
    ],
    answer: "Changes the content of the element with ID 'demo' to 'Welcome!'",
  },
  {
    question: (
      <div>
        <p>What happens when the user types something in this input box?</p>
        <CodeBlock
          language="html"
          code={`<input type="text" onchange="alert('Input changed!')">`}
        />
      </div>
    ),
    options: [
      "Shows an alert as soon as user types",
      "Shows an alert when user presses a key",
      "Shows an alert when input value changes and loses focus",
      "Does nothing",
    ],
    answer: "Shows an alert when input value changes and loses focus",
  },
  {
    question: (
      <div>
        <p>What will this JavaScript code do?</p>
        <CodeBlock
          language="javascript"
          code={`const heading = document.querySelector("h1");\nheading.style.color = "blue";`}
        />
      </div>
    ),
    options: [
      "Deletes the h1 element",
      "Changes the text of the h1 element",
      "Changes the color of the h1 text to blue",
      "Creates a new h1 element",
    ],
    answer: "Changes the color of the h1 text to blue",
  },
];

const Introductionto_Dynamic_Application_MCQ =  ({
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
  return <MCQLogic title="Introduction to Dynamic Application - MCQs" questions={randomQuestions}
  isCompleted={isCompleted}
  isLoading={isLoading}
  onComplete={handleCompletion}
  subtopicId={subtopicId}
  goalName={goalName}
  courseName={courseName} />;
};
export default Introductionto_Dynamic_Application_MCQ;
