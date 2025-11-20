import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: "What is the correct way to define a function in Python?",
    options: [
      "function my_func():",
      "def my_func():",
      "define my_func():",
      "func my_func():",
    ],
    answer: "def my_func():",
  },
  {
    question: "When is the code inside a function executed?",
    options: [
      "When the function is defined",
      "Only when the function is called",
      "When Python starts",
      "Never",
    ],
    answer: "Only when the function is called",
  },
  {
    question: "What keyword is used to send a value back from a function?",
    options: ["print", "give", "return", "output"],
    answer: "return",
  },
  {
    question:
      "What happens to code written after a return statement inside a function?",
    options: [
      "It runs normally",
      "It is never executed",
      "It causes an error",
      "It runs twice",
    ],
    answer: "It is never executed",
  },
  {
    question: "Which of these is a built-in Python function?",
    options: ["make()", "len()", "size()", "count()"],
    answer: "len()",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def greet():
    print("Welcome!")

greet()
greet()`}
        />
      </div>
    ),
    options: [
      <span>
        Welcome!
        <br />
        Welcome!
      </span>,
      "Welcome!",
      "Error",
      "None",
    ],
    answer: (
      <span>
        Welcome!
        <br />
        Welcome!
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`def hello(name):
    print("Hi", name)

hello("Charlie")`}
        />
      </div>
    ),
    options: ["Hi Charlie", "Charlie", "hello", "Error"],
    answer: "Hi Charlie",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def multiply(a, b):
    return a * b

print(multiply(4, 5))`}
        />
      </div>
    ),
    options: ["20", "9", "45", "None"],
    answer: "20",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def demo():
    x = 50
    print(x)

demo()
print(x)`}
        />
      </div>
    ),
    options: [
      <span>
        50
        <br />
        50
      </span>,
      <span>
        50
        <br />
        NameError
      </span>,
      "NameError on first print",
      "No output",
    ],
    answer: (
      <span>
        50
        <br />
        NameError
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`def test():
    print("A")
    return
    print("B")

test()`}
        />
      </div>
    ),
    options: [
      "A",
      <span>
        A<br />B
      </span>,
      "B",
      "Nothing",
    ],
    answer: "A",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`say_hi()

def say_hi():
    print("Hello")`}
        />
      </div>
    ),
    options: [
      "Hello",
      "NameError: name 'say_hi' is not defined",
      "No output",
      "SyntaxError",
    ],
    answer: "NameError: name 'say_hi' is not defined",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def power(num):
    return num ** 2

result = power(6)
print(result)`}
        />
      </div>
    ),
    options: ["36", "12", "6", "Error"],
    answer: "36",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`def show():
    print("First")
    print("Second")
    return 100
    print("Third")

print(show())`}
        />
      </div>
    ),
    options: [
      <span>
        First
        <br />
        Second
        <br />
        100
      </span>,
      <span>
        First
        <br />
        Second
        <br />
        Third
        <br />
        100
      </span>,
      "100",
      "Third",
    ],
    answer: (
      <span>
        First
        <br />
        Second
        <br />
        100
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`message = "Python"

def display():
    print(message)

display()`}
        />
      </div>
    ),
    options: ["Python", "message", "Error", "None"],
    answer: "Python",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def info(name, age):
    print(f"{name} is {age} years old")

info("Emma", 25)`}
        />
      </div>
    ),
    options: ["Emma is 25 years old", "name age", "Error", "None"],
    answer: "Emma is 25 years old",
  },
];

const Functions_MCQ = ({
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
      title="Functions | MCQs"
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

export default Functions_MCQ;
