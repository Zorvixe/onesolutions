import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will be the text color of the heading?</p>
        <CodeBlock language="css" code={`.title { color: blue; }`} />
        <CodeBlock language="html" code={`<h1 class="title">Welcome</h1>`} />
      </div>
    ),
    options: ["Black", "Red", "Blue", "Green"],
    answer: "Blue",
  },
  {
    question: (
      <div>
        <p>What will be the background color of the box?</p>
        <CodeBlock language="css" code={`.box { background-color: yellow; }`} />
        <CodeBlock
          language="html"
          code={`<div class="box">Hello World</div>`}
        />
      </div>
    ),
    options: ["White", "Yellow", "Gray", "Transparent"],
    answer: "Yellow",
  },
  {
    question: (
      <div>
        <p>What color will the paragraph text be?</p>
        <CodeBlock language="css" code={`p { color: green; }`} />
        <CodeBlock language="html" code={`<p>This is a sample text.</p>`} />
      </div>
    ),
    options: ["Black", "Green", "Red", "Blue"],
    answer: "Green",
  },
  {
    question: (
      <div>
        <p>What will be the background color of the button?</p>
        <CodeBlock language="css" code={`.btn { background-color: red; }`} />
        <CodeBlock
          language="html"
          code={`<button class="btn">Click Me</button>`}
        />
      </div>
    ),
    options: ["Red", "Blue", "White", "Green"],
    answer: "Red",
  },
  {
    question: (
      <div>
        <p>What color will the text "Special" appear in?</p>
        <CodeBlock language="css" code={`.highlight { color: purple; }`} />
        <CodeBlock
          language="html"
          code={`<p>Regular text <span class="highlight">Special</span> text.</p>`}
        />
      </div>
    ),
    options: ["Black", "Purple", "Gray", "Orange"],
    answer: "Purple",
  },
  {
    question: (
      <div>
        <p>What will be the background color of the heading?</p>
        <CodeBlock language="css" code={`h2 { background-color: pink; }`} />
        <CodeBlock language="html" code={`<h2>About Section</h2>`} />
      </div>
    ),
    options: ["White", "Pink", "Light blue", "Gray"],
    answer: "Pink",
  },
  {
    question: (
      <div>
        <p>What text color will all list items have?</p>
        <CodeBlock language="css" code={`li { color: orange; }`} />
        <CodeBlock
          language="html"
          code={`<ul><li>Item 1</li><li>Item 2</li></ul>`}
        />
      </div>
    ),
    options: ["Black", "Orange", "Red", "Blue"],
    answer: "Orange",
  },

  {
    question:
      "Fill in the blank with CSS property to apply grey color to an HTML heading element.",
    options: ["color", "text-color", "text-align", "all of the above"],
    answer: "color",
  },
  {
    question:
      "Fill in the blank with appropriate CSS property to apply background color to an HTML container element.",
    options: [
      "background-color",
      "color",
      "text-align",
      "all of these options",
    ],
    answer: "background-color",
  },
  {
    question: "Which CSS property specifies the color of the text?",
    options: ["background-color", "color", "font-color", "text-style"],
    answer: "color",
  },
];

const Introductionto_Css_MCQ = ({ subtopicId, goalName, courseName }) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  const handleCompletion = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsCompleted(true);
    } catch (error) {
      console.error("❌ Failed to mark subtopic complete:", error);
    }
  };
  return (
    <MCQLogic
      title="Introduction to CSS Part 2 - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Introductionto_Css_MCQ;
