import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will be printed?</p>
        <CodeBlock
          language="python"
          code={`name = "Rajesh Kumar"\nprint(name[0:6:2])`}
        />
      </div>
    ),
    options: [
      <span>Rjs</span>,
      <span>Raj</span>,
      <span>Rae</span>,
      <span>Rajesh</span>,
    ],
    answer: <span>Rjs</span>,
  },

  {
    question: (
      <div>
        <p>What is the output?</p>
        <CodeBlock
          language="python"
          code={`word = "Learning"\nprint(word[::3])`}
        />
      </div>
    ),
    options: [
      <span>Lenn</span>,
      <span>Lrnn</span>,
      <span>Leni</span>,
      <span>Lnag</span>,
    ],
    answer: <span>Lrnn</span>,
  },

  {
    question: (
      <div>
        <p>What does this reverse the string?</p>
        <CodeBlock
          language="python"
          code={`text = "Hello World"\nprint(text[::-1])`}
        />
      </div>
    ),
    options: [
      <span>dlroW olleH</span>,
      <span>Hello World</span>,
      <span>Error</span>,
      <span>World Hello</span>,
    ],
    answer: <span>dlroW olleH</span>,
  },

  {
    question: (
      <div>
        <p>What does isdigit() return?</p>
        <CodeBlock
          language="python"
          code={`print("4567".isdigit())\nprint("45.67".isdigit())`}
        />
      </div>
    ),
    options: [
      <span>
        True
        <br />
        True
      </span>,
      <span>
        True
        <br />
        False
      </span>,
      <span>
        False
        <br />
        True
      </span>,
      <span>
        False
        <br />
        False
      </span>,
    ],
    answer: (
      <span>
        True
        <br />
        False
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What will strip() do here?</p>
        <CodeBlock
          language="python"
          code={`data = "   Python Programming   "\nprint(data.strip())`}
        />
      </div>
    ),
    options: [
      <span> Python Programming </span>,
      <span>Python Programming</span>,
      <span> Python Programming </span>,
      <span>Error</span>,
    ],
    answer: <span>Python Programming</span>,
  },

  {
    question: (
      <div>
        <p>What will be the cleaned string?</p>
        <CodeBlock
          language="python"
          code={`msg = "!!!Hi there!!!")\nprint(msg.strip("!"))`}
        />
      </div>
    ),
    options: [
      <span>Hi there</span>,
      <span>!!!Hi there</span>,
      <span>Hi there!!!</span>,
      <span>Hi there!!!)</span>,
    ],
    answer: <span>Hi there</span>,
  },

  {
    question: (
      <div>
        <p>What does replace() return?</p>
        <CodeBlock
          language="python"
          code={`sentence = "I love cats"\nprint(sentence.replace("cats", "dogs"))`}
        />
      </div>
    ),
    options: [
      <span>I love dogs</span>,
      <span>I love cats</span>,
      <span>I love cats and dogs</span>,
      <span>Error</span>,
    ],
    answer: <span>I love dogs</span>,
  },

  {
    question: (
      <div>
        <p>Check start and end:</p>
        <CodeBlock
          language="python"
          code={`file = "report.pdf"\nprint(file.startswith("re"))\nprint(file.endswith(".pdf"))`}
        />
      </div>
    ),
    options: [
      <span>
        True
        <br />
        True
      </span>,
      <span>
        True
        <br />
        False
      </span>,
      <span>
        False
        <br />
        True
      </span>,
      <span>
        False
        <br />
        False
      </span>,
    ],
    answer: (
      <span>
        True
        <br />
        True
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What will upper() and lower() do?</p>
        <CodeBlock
          language="python"
          code={`text = "PyThOn123"\nprint(text.upper())\nprint(text.lower())`}
        />
      </div>
    ),
    options: [
      <span>
        PYTHON123
        <br />
        python123
      </span>,
      <span>
        PyThOn123
        <br />
        PyThOn123
      </span>,
      <span>
        PYTHON
        <br />
        python
      </span>,
      <span>Error</span>,
    ],
    answer: (
      <span>
        PYTHON123
        <br />
        python123
      </span>
    ),
  },

  {
    question: (
      <div>
        <p>What slice gives every second character from index 1 to 8?</p>
        <CodeBlock
          language="python"
          code={`s = "Wonderful"\nprint(s[1:8:2])`}
        />
      </div>
    ),
    options: [
      <span>oderf</span>,
      <span>ondef</span>,
      <span>onder</span>,
      <span>ndrfu</span>,
    ],
    answer: <span>ondef</span>,
  },

  {
    question: "Which method removes leading and trailing whitespace?",
    options: ["strip()", "trim()", "remove()", "clean()"],
    answer: "strip()",
  },

  {
    question:
      "What does startswith('abc') return if the string begins with 'abc'?",
    options: ["True", "False", "abc", "None"],
    answer: "True",
  },

  {
    question: "Which method converts all letters in a string to uppercase?",
    options: ["upper()", "capitalize()", "title()", "higher()"],
    answer: "upper()",
  },

  {
    question: "In slicing text[::2], what does the step value 2 mean?",
    options: [
      "Take every character",
      "Take every 2nd character",
      "Take first 2 characters",
      "Reverse the string",
    ],
    answer: "Take every 2nd character",
  },

  {
    question: "Which method can replace all occurrences of a substring?",
    options: ["replace()", "swap()", "change()", "sub()"],
    answer: "replace()",
  },
];

const String_Methods_MCQ = ({
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
      title="Extended Slicing & String Methods - MCQs"
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

export default String_Methods_MCQ;
