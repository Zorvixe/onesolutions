import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Which of the following is NOT an object in Python?</p>
        <CodeBlock
          language="python"
          code={`x = 42\nname = "Python"\ndef greet(): pass\nnumbers = [1, 2, 3]`}
        />
      </div>
    ),
    options: ["x", "name", "greet", "None of these → All are objects"],
    answer: "None of these → All are objects",
  },

  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`x = 100\ny = 100\nprint(id(x) == id(y))`}
        />
      </div>
    ),
    options: ["True (small integers are cached)", "False", "Error", "None"],
    answer: "True (small integers are cached)",
  },

  {
    question: (
      <div>
        <p>
          Which namespace does <b>x</b> belong to?
        </p>
        <CodeBlock
          language="python"
          code={`def func():\n    x = 10\n    print("Hello")`}
        />
      </div>
    ),
    options: ["Global", "Local (inside func)", "Built-in", "Module"],
    answer: "Local (inside func)",
  },

  {
    question: (
      <div>
        <p>
          What happens if you try to print <b>x</b> here?
        </p>
        <CodeBlock
          language="python"
          code={`def func():\n    x = 5\n\nfunc()\nprint(x)`}
        />
      </div>
    ),
    options: [
      "Prints 5",
      "NameError: x is not defined",
      "Prints nothing",
      "Prints global x",
    ],
    answer: "NameError: x is not defined",
  },

  {
    question: (
      <div>
        <p>
          How to modify global <b>count</b> inside a function?
        </p>
        <CodeBlock
          language="python"
          code={`count = 0\ndef increase():\n    global count\n    count += 1`}
        />
      </div>
    ),
    options: [
      "Just write count += 1",
      "Use global count",
      "Use self.count",
      "Cannot modify global",
    ],
    answer: "Use global count",
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`x = 10\ndef func():\n    x = 20\n    print("Inside:", x)\n\nfunc()\nprint("Outside:", x)`}
        />
      </div>
    ),
    options: [
      "Inside: 20\nOutside: 20",
      "Inside: 20\nOutside: 10",
      "Error",
      "Inside: 10\nOutside: 10",
    ],
    answer: "Inside: 20\nOutside: 10",
  },

  {
    question: (
      <div>
        <p>
          Which namespace contains <b>print()</b> and <b>len()</b>?
        </p>
        <CodeBlock language="python" code={`print("Hello")\nlen([1,2,3])`} />
      </div>
    ),
    options: ["Local", "Global", "Built-in", "Module"],
    answer: "Built-in",
  },

  {
    question: (
      <div>
        <p>In which order does Python look for a name?</p>
        <CodeBlock language="python" code={`# Name lookup inside a function`} />
      </div>
    ),
    options: [
      "Global → Local → Built-in",
      "Built-in → Global → Local",
      "Local → Global → Built-in",
      "Local → Built-in → Global",
    ],
    answer: "Local → Global → Built-in",
  },

  {
    question: (
      <div>
        <p>What is the scope of this variable?</p>
        <CodeBlock language="python" code={`total = 100  # defined here`} />
      </div>
    ),
    options: [
      "Only inside a function",
      "Entire module (Global)",
      "Only in current line",
      "Built-in",
    ],
    answer: "Entire module (Global)",
  },

  {
    question: (
      <div>
        <p>What will this print?</p>
        <CodeBlock
          language="python"
          code={`def outer():\n    msg = "Hello"\n    def inner():\n        print(msg)\n    inner()\n\nouter()`}
        />
      </div>
    ),
    options: ["Hello", "Error: msg not found", "Nothing", "outer"],
    answer: "Hello",
  },

  {
    question: "In Python, which of the following is an object?",
    options: [
      "Only numbers and strings",
      "Only classes and functions",
      "Everything that can be assigned to a variable",
      "Only lists and dictionaries",
    ],
    answer: "Everything that can be assigned to a variable",
  },

  {
    question: "What is a namespace?",
    options: [
      "A type of loop",
      "A collection of names and the objects they refer to",
      "A memory location",
      "A built-in module",
    ],
    answer: "A collection of names and the objects they refer to",
  },

  {
    question:
      "Which namespace is searched first when looking up a name inside a function?",
    options: ["Built-in", "Global", "Local", "Enclosing"],
    answer: "Local",
  },

  {
    question:
      "How do you tell Python that a variable inside a function refers to the global one?",
    options: [
      "Use the 'var' keyword",
      "Use the 'global' keyword",
      "Use 'self.variable'",
      "It's automatic",
    ],
    answer: "Use the 'global' keyword",
  },

  {
    question: "Which of these belongs to the Built-in namespace?",
    options: [
      "Variables you define",
      "Functions you define",
      "print(), len(), id()",
      "Module names",
    ],
    answer: "print(), len(), id()",
  },
];

const Scope_Namespaces_MCQ = ({
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
      title="Scope Namespces | MCQs"
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

export default Scope_Namespaces_MCQ;
