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
    options: ["Rjs", "Raj", "Rae", "Rajesh"],
    answer: "Rjs",
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
    options: ["Lenn", "Lrnn", "Leni", "Lnag"],
    answer: "Lrnn",
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
    options: ["dlroW olleH", "Hello World", "Error", "World Hello"],
    answer: "dlroW olleH",
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
    options: ["True\nTrue", "True\nFalse", "False\nTrue", "False\nFalse"],
    answer: "True\nFalse",
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
      " Python Programming ",
      "Python Programming",
      "   Python Programming   ",
      "Error",
    ],
    answer: "Python Programming",
  },

  {
    question: (
      <div>
        <p>What will be the cleaned string?</p>
        <CodeBlock
          language="python"
          code={`msg = "!!!Hi there!!!"\nprint(msg.strip("!"))`}
        />
      </div>
    ),
    options: ["Hi there", "!!!Hi there", "Hi there!!!", "Hi there!!!)"],
    answer: "Hi there",
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
    options: ["I love dogs", "I love cats", "I love cats and dogs", "Error"],
    answer: "I love dogs",
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
    options: ["True\nTrue", "True\nFalse", "False\nTrue", "False\nFalse"],
    answer: "True\nTrue",
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
      "PYTHON123\npython123",
      "PyThOn123\nPyThOn123",
      "PYTHON\npython",
      "Error",
    ],
    answer: "PYTHON123\npython123",
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
    options: ["oderf", "ondef", "onder", "ndrfu"],
    answer: "ondef",
  },

  // NORMAL MCQs
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
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="String Methods - MCQs"
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
