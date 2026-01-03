import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which of the following is written in correct camel case syntax?</p>
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
        <p>What will be the output of this code?</p>
        <CodeBlock
          language="javascript"
          code={`const para = document.createelement("p");
  para.textcontent = "Hello!"; 
  console.log(para.textContent);`}
        />
      </div>
    ),
    options: ["Hello!", "undefined", "Error", "null"],
    answer: "Hello!",
  },
  {
    question: (
      <div>
        <p>What is the mistake in this code snippet?</p>
        <CodeBlock
          language="html"
          code={`<p id="greet">Welcome!</p>
  <script>
    document.getElementById("greeting").textContent = "Hello!";
  </script>`}
        />
      </div>
    ),
    options: [
      "No mistake",
      "The ID in JS and HTML don’t match",
      "Extra space in ID",
      "Missing semicolon",
    ],
    answer: "The ID in JS and HTML don’t match",
  },
  {
    question: (
      <div>
        <p>Why will the text not change in this example?</p>
        <CodeBlock
          language="html"
          code={`<p id="title ">JS Practice</p>
  <script>
    document.getElementById("title").textContent = "DOM Practice";
  </script>`}
        />
      </div>
    ),
    options: [
      "Extra space in ID",
      "Missing quotes",
      "Wrong tag",
      "Incorrect method name",
    ],
    answer: "Extra space in ID",
  },
  {
    question: (
      <div>
        <p>What will happen when this code runs?</p>
        <CodeBlock
          language="javascript"
          code={`function greetUser() {
    console.log("Hello User!");
  }
  greetsUser();`}
        />
      </div>
    ),
    options: [
      "Prints Hello User!",
      "Undefined",
      "Throws ReferenceError",
      "Prints nothing",
    ],
    answer: "Throws ReferenceError",
  },
  {
    question: (
      <div>
        <p>Which correction will fix the error in this code?</p>
        <CodeBlock
          language="javascript"
          code={`function sayHi() {
    console.log("Hi!");
  }
  sayhi();`}
        />
      </div>
    ),
    options: [
      "Change sayhi() → sayHi()",
      "Add semicolon",
      "Change console.log to alert",
      "No correction needed",
    ],
    answer: "Change sayhi() → sayHi()",
  },
  {
    question: (
      <div>
        <p>Which of the following methods is written incorrectly?</p>
        <CodeBlock
          language="javascript"
          code={`element.classlist.add("highlight");`}
        />
      </div>
    ),
    options: [
      "element.classList.add('highlight');",
      "element.classlist.add('highlight');",
      "element.classList.Add('highlight');",
      "element.classlist.Add('highlight');",
    ],
    answer: "element.classlist.add('highlight');",
  },
  {
    question:
      "Why should JavaScript method names like getElementById follow camel case convention?",
    options: [
      "Because JavaScript is case-insensitive",
      "Because most built-in JS methods are camel case",
      "Because HTML tags are camel case",
      "Because browser requires it",
    ],
    answer: "Because most built-in JS methods are camel case",
  },
  {
    question:
      "What happens if the ID in HTML and JavaScript don’t match exactly?",
    options: [
      "Code still runs correctly",
      "The text or element won’t be updated",
      "Syntax error is thrown",
      "It automatically matches similar IDs",
    ],
    answer: "The text or element won’t be updated",
  },
  {
    question:
      "In JavaScript, if a function is declared as greetUser() but called as greetuser(), what occurs?",
    options: [
      "Both are same; function executes",
      "Browser automatically corrects case",
      "ReferenceError occurs",
      "It logs undefined",
    ],
    answer: "ReferenceError occurs",
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
