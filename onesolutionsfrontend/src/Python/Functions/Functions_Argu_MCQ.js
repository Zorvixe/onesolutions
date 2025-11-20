import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: "What are keyword arguments in Python?",
    options: [
      "Arguments passed in any order",
      "Arguments passed using parameter names like name='value'",
      "Arguments with default values",
      "Arguments that change the function behavior",
    ],
    answer: "Arguments passed using parameter names like name='value'",
  },
  {
    question:
      "In a function definition, can a non-default argument come after a default argument?",
    options: [
      "Yes",
      "No, it causes a SyntaxError",
      "Only if using *args",
      "Only in Python 2",
    ],
    answer: "No, it causes a SyntaxError",
  },
  {
    question:
      "When you pass an immutable object (like int or str) to a function and modify it inside, does the original variable outside change?",
    options: ["Yes", "No", "Only if using return", "Only with global keyword"],
    answer: "No",
  },
  {
    question:
      "What will happen if you call a function with a keyword argument that doesn't exist?",
    options: [
      "It uses the default value",
      "TypeError: unexpected keyword argument",
      "The argument is ignored",
      "NameError",
    ],
    answer: "TypeError: unexpected keyword argument",
  },
  {
    question:
      "What is the correct way to call a function using keyword arguments?",
    options: [
      "func(10, 20)",
      "func(a=10, b=20)",
      "func(b=20, 10)",
      "func(a:10, b:20)",
    ],
    answer: "func(a=10, b=20)",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def intro(name, age):
    print(f"{name} is {age} years old")

intro(age=30, name="Alex")`}
        />
      </div>
    ),
    options: ["Alex is 30 years old", "30 is Alex years old", "Error", "None"],
    answer: "Alex is 30 years old",
  },
  {
    question: (
      <div>
        <p>What error do you get?</p>
        <CodeBlock
          language="python"
          code={`def show(name):
    print("Hello", name)

show(name="Sam", city="NY")`}
        />
      </div>
    ),
    options: [
      "TypeError: unexpected keyword argument 'city'",
      "Hello Sam",
      "Hello NY",
      "No error",
    ],
    answer: "TypeError: unexpected keyword argument 'city'",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def subtract(x, y):
    return x - y

print(subtract(10, 4))
print(subtract(y=4, x=10))`}
        />
      </div>
    ),
    options: [
      <span>
        6<br />6
      </span>,
      <span>
        6<br />
        14
      </span>,
      <span>
        14
        <br />6
      </span>,
      "Error",
    ],
    answer: (
      <span>
        6<br />6
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What error occurs?</p>
        <CodeBlock
          language="python"
          code={`def power(base, exp):
    return base ** exp

power(2)`}
        />
      </div>
    ),
    options: [
      "TypeError: missing 1 required positional argument: 'exp'",
      "Returns 1",
      "Returns 2",
      "ValueError",
    ],
    answer: "TypeError: missing 1 required positional argument: 'exp'",
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`def greet(name="friend"):
    print(f"Hello, {name}!")

greet()
greet("Mia")`}
        />
      </div>
    ),
    options: [
      <span>
        Hello, friend!
        <br />
        Hello, Mia!
      </span>,
      <span>
        Hello, Mia!
        <br />
        Hello, Mia!
      </span>,
      "Error",
      "Hello, friend!",
    ],
    answer: (
      <span>
        Hello, friend!
        <br />
        Hello, Mia!
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What happens when defining this function?</p>
        <CodeBlock
          language="python"
          code={`def test(a=5, b, c):
    pass`}
        />
      </div>
    ),
    options: [
      "SyntaxError: non-default argument follows default argument",
      "Works fine",
      "b and c become optional",
      "Runtime error",
    ],
    answer: "SyntaxError: non-default argument follows default argument",
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def double(n):
    n = n * 2
    print("Inside:", n)

value = 8
double(value)
print("Outside:", value)`}
        />
      </div>
    ),
    options: [
      <span>
        Inside: 16
        <br />
        Outside: 8
      </span>,
      <span>
        Inside: 16
        <br />
        Outside: 16
      </span>,
      <span>
        Inside: 8<br />
        Outside: 8
      </span>,
      "Error",
    ],
    answer: (
      <span>
        Inside: 16
        <br />
        Outside: 8
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def info(name, age=18):
    print(f"{name} is {age}")

info("Tom")
info("Sara", 22)`}
        />
      </div>
    ),
    options: [
      <span>
        Tom is 18
        <br />
        Sara is 22
      </span>,
      <span>
        Tom is 22
        <br />
        Sara is 22
      </span>,
      "Error on first call",
      "Tom is Sara",
    ],
    answer: (
      <span>
        Tom is 18
        <br />
        Sara is 22
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`def demo(msg, times=1):
    print(msg * times)

demo("Hi")
demo("Bye", 3)`}
        />
      </div>
    ),
    options: [
      <span>
        Hi
        <br />
        ByeByeBye
      </span>,
      <span>
        HiHi
        <br />
        ByeByeBye
      </span>,
      "Error",
      <span>
        Hi
        <br />
        Bye
      </span>,
    ],
    answer: (
      <span>
        Hi
        <br />
        ByeByeBye
      </span>
    ),
  },
  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`def calculate(a, b, c=10):
    return a + b * c

print(calculate(2, 3))
print(calculate(2, 3, 5))`}
        />
      </div>
    ),
    options: [
      <span>
        32
        <br />
        17
      </span>,
      <span>
        15
        <br />
        15
      </span>,
      <span>
        32
        <br />
        32
      </span>,
      "Error",
    ],
    answer: (
      <span>
        32
        <br />
        17
      </span>
    ),
  },
];

const Functions_Argu_MCQ = ({
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
      title="Function Arguments | MCQs"
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

export default Functions_Argu_MCQ;
