import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========= 10 CODE BLOCK QUESTIONS =========

  {
    question: (
      <div>
        <p>What is happening in the following code?</p>
        <CodeBlock
          language="javascript"
          code={`function greet(name) {
  console.log("Hello " + name);
}

function callFunction(callback) {
  callback("Rahul");
}

callFunction(greet);`}
        />
      </div>
    ),
    options: [
      "A function is returned",
      "A function is passed as an argument",
      "A function is stored in a variable",
      "A function is executed immediately",
    ],
    answer: "A function is passed as an argument",
  },

  {
    question: (
      <div>
        <p>What will this code demonstrate?</p>
        <CodeBlock
          language="javascript"
          code={`function display() {
  console.log("Hello");
}

setTimeout(display, 2000);`}
        />
      </div>
    ),
    options: [
      "Repeated execution",
      "Immediate execution",
      "Execution after specified delay",
      "Infinite loop",
    ],
    answer: "Execution after specified delay",
  },

  {
    question: (
      <div>
        <p>What will be the output behavior of this code?</p>
        <CodeBlock
          language="javascript"
          code={`setInterval(() => {
  console.log("Running...");
}, 1000);`}
        />
      </div>
    ),
    options: [
      "Logs once after 1 second",
      "Logs repeatedly every 1 second",
      "Throws an error",
      "Stops automatically",
    ],
    answer: "Logs repeatedly every 1 second",
  },

  {
    question: (
      <div>
        <p>How does the following code stop execution?</p>
        <CodeBlock
          language="javascript"
          code={`let intervalId = setInterval(() => {
  console.log("Working");
}, 1000);

clearInterval(intervalId);`}
        />
      </div>
    ),
    options: [
      "By stopping the browser",
      "By clearing interval using its ID",
      "By clearing timeout",
      "By returning false",
    ],
    answer: "By clearing interval using its ID",
  },

  {
    question: (
      <div>
        <p>What will this code do?</p>
        <CodeBlock
          language="javascript"
          code={`setTimeout(() => {
  console.log("Done");
}, 3000);`}
        />
      </div>
    ),
    options: [
      "Executes repeatedly",
      "Executes immediately",
      "Executes once after 3 seconds",
      "Never executes",
    ],
    answer: "Executes once after 3 seconds",
  },

  {
    question: (
      <div>
        <p>
          What is the purpose of the variable <b>timerId</b>?
        </p>
        <CodeBlock
          language="javascript"
          code={`let timerId = setTimeout(() => {
  console.log("Hello");
}, 5000);`}
        />
      </div>
    ),
    options: [
      "Stores the callback function",
      "Stores delay value",
      "Stores unique timeout ID",
      "Stores execution result",
    ],
    answer: "Stores unique timeout ID",
  },

  {
    question: (
      <div>
        <p>What does this code ensure?</p>
        <CodeBlock
          language="javascript"
          code={`let timer = setTimeout(() => {
  console.log("Will not run");
}, 4000);

clearTimeout(timer);`}
        />
      </div>
    ),
    options: [
      "Callback executes twice",
      "Callback executes once",
      "Callback is cancelled",
      "Callback runs immediately",
    ],
    answer: "Callback is cancelled",
  },

  {
    question: (
      <div>
        <p>What does this function call show?</p>
        <CodeBlock
          language="javascript"
          code={`function execute(callback) {
  callback();
}

execute(() => console.log("Callback executed"));`}
        />
      </div>
    ),
    options: [
      "Returning a function",
      "Passing function expression as argument",
      "Calling function without arguments",
      "Loop execution",
    ],
    answer: "Passing function expression as argument",
  },

  {
    question: (
      <div>
        <p>What happens in the following code?</p>
        <CodeBlock
          language="javascript"
          code={`function first(callback) {
  console.log("Start");
  callback();
}

first(() => console.log("Callback"));`}
        />
      </div>
    ),
    options: [
      "Callback executes before function",
      "Callback executes inside another function",
      "Callback is ignored",
      "Syntax error occurs",
    ],
    answer: "Callback executes inside another function",
  },

  {
    question: (
      <div>
        <p>What does this code demonstrate?</p>
        <CodeBlock
          language="javascript"
          code={`let id = setInterval(() => {
  console.log("Hello");
}, 2000);

clearInterval(id);`}
        />
      </div>
    ),
    options: [
      "Delayed execution",
      "Repeated execution without stop",
      "Cancelling scheduled interval",
      "Recursive function",
    ],
    answer: "Cancelling scheduled interval",
  },

  // ========= 5 NORMAL QUESTIONS =========

  {
    question: "What is a callback function?",
    options: [
      "A function that executes immediately",
      "A function passed as an argument to another function",
      "A function that runs only once",
      "A function inside a loop",
    ],
    answer: "A function passed as an argument to another function",
  },

  {
    question: "Which method is used to execute a function repeatedly?",
    options: [
      "setTimeout()",
      "clearTimeout()",
      "setInterval()",
      "clearInterval()",
    ],
    answer: "setInterval()",
  },

  {
    question: "What does setInterval() return?",
    options: [
      "A callback function",
      "A unique interval ID",
      "Execution result",
      "Delay time",
    ],
    answer: "A unique interval ID",
  },

  {
    question: "Which method is used to cancel setTimeout()?",
    options: [
      "clearInterval()",
      "stopTimeout()",
      "clearTimeout()",
      "cancelTimeout()",
    ],
    answer: "clearTimeout()",
  },

  {
    question: "In schedulers, delay time is measured in:",
    options: ["Seconds", "Minutes", "Milliseconds", "Hours"],
    answer: "Milliseconds",
  },
];

const Callbacks_Schedulers_MCQ = ({
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
      title="Callbacks & Schedulers - MCQs"
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

export default Callbacks_Schedulers_MCQ;
