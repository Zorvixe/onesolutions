import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 7 CODEBLOCK QUESTIONS ====================

  {
    question: (
      <div>
        <p>What will be the output?</p>
        <CodeBlock
          language="python"
          code={`text = "Python"\nprint(text[1:5:2])`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">yth</span>,
      <span className="mcq-option-text">yhn</span>,
      <span className="mcq-option-text">yt</span>,
      <span className="mcq-option-text">Pto</span>,
    ],
    answer: <span className="mcq-option-text">yt</span>,
  },

  {
    question: (
      <div>
        <p>Predict the sliced string:</p>
        <CodeBlock
          language="python"
          code={`s = "Programming"\nprint(s[::2])`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">Pormig</span>,
      <span className="mcq-option-text">Program</span>,
      <span className="mcq-option-text">Prgam</span>,
      <span className="mcq-option-text">Pgmn</span>,
    ],
    answer: <span className="mcq-option-text">Pormig</span>,
  },

  {
    question: (
      <div>
        <p>What does this print?</p>
        <CodeBlock
          language="python"
          code={`word = "Python"\nprint(word[::-1])`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">nohtyP</span>,
      <span className="mcq-option-text">Python</span>,
      <span className="mcq-option-text">Pto</span>,
      <span className="mcq-option-text">Error</span>,
    ],
    answer: <span className="mcq-option-text">nohtyP</span>,
  },

  {
    question: (
      <div>
        <p>Output of this slicing?</p>
        <CodeBlock
          language="python"
          code={`name = "Ravi Kumar"\nprint(name[0:4])`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">Ravi</span>,
      <span className="mcq-option-text">Rav</span>,
      <span className="mcq-option-text">avi</span>,
      <span className="mcq-option-text">Kumar</span>,
    ],
    answer: <span className="mcq-option-text">Ravi</span>,
  },

  {
    question: (
      <div>
        <p>
          What does <code>isdigit()</code> return?
        </p>
        <CodeBlock
          language="python"
          code={`print("123".isdigit())\nprint("12a".isdigit())`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">True{"\n"}False</span>,
      <span className="mcq-option-text">False{"\n"}True</span>,
      <span className="mcq-option-text">True{"\n"}True</span>,
      <span className="mcq-option-text">Error</span>,
    ],
    answer: <span className="mcq-option-text">True{"\n"}False</span>,
  },

  {
    question: (
      <div>
        <p>
          What will <code>strip()</code> produce?
        </p>
        <CodeBlock
          language="python"
          code={`msg = "   hello   "\nprint(msg.strip())`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">hello</span>,
      <span className="mcq-option-text">" hello "</span>,
      <span className="mcq-option-text"> hello</span>,
      <span className="mcq-option-text">Error</span>,
    ],
    answer: <span className="mcq-option-text">hello</span>,
  },

  {
    question: (
      <div>
        <p>Which method removes only leading/trailing commas and dots?</p>
        <CodeBlock
          language="python"
          code={`text = ",,,Hello World..."\nprint(text.strip(",."))`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">Hello World</span>,
      <span className="mcq-option-text">,,,Hello World...</span>,
      <span className="mcq-option-text">Hello World...</span>,
      <span className="mcq-option-text">Error</span>,
    ],
    answer: <span className="mcq-option-text">Hello World</span>,
  },

  // ==================== 3 NORMAL QUESTIONS ====================

  {
    question: "What is the default step in slicing if not provided?",
    options: [
      <span className="mcq-option-text">1</span>,
      <span className="mcq-option-text">0</span>,
      <span className="mcq-option-text">-1</span>,
      <span className="mcq-option-text">None</span>,
    ],
    answer: <span className="mcq-option-text">1</span>,
  },

  {
    question: "Which method converts a string to uppercase?",
    options: [
      <span className="mcq-option-text">upper()</span>,
      <span className="mcq-option-text">lower()</span>,
      <span className="mcq-option-text">capitalize()</span>,
      <span className="mcq-option-text">title()</span>,
    ],
    answer: <span className="mcq-option-text">upper()</span>,
  },

  {
    question: (
      <div>
        <p>What is the output of this code?</p>
        <CodeBlock
          language="python"
          code={`text = "Python is fun"\nprint(text.startswith("Py"))`}
        />
      </div>
    ),
    options: [
      <span className="mcq-option-text">True</span>,
      <span className="mcq-option-text">False</span>,
      <span className="mcq-option-text">Error</span>,
      <span className="mcq-option-text">None</span>,
    ],
    answer: <span className="mcq-option-text">True</span>,
  },
];

const String_Methods_MCQ = ({ subtopicId, goalName, courseName }) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompletion = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Failed to mark subtopic complete:", error);
    }
  };

  const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
  return (
    <MCQLogic
      title="Extended Slicing & String Methods - MCQs"
      questions={shuffledQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default String_Methods_MCQ;
