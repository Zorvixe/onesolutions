import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>How thick will the border be?</p>
        <CodeBlock language="css" code={`.box { border-width: 5px; }`} />
        <CodeBlock language="html" code={`<div class="box">Box</div>`} />
      </div>
    ),
    options: ["5px", "1px", "10px", "No border"],
    answer: "5px",
  },
  {
    question: (
      <div>
        <p>What will the corners look like?</p>
        <CodeBlock language="css" code={`.card { border-radius: 15px; }`} />
        <CodeBlock language="html" code={`<div class="card">Card</div>`} />
      </div>
    ),
    options: [
      "Sharp corners",
      "Rounded corners",
      "Only top rounded",
      "Only one corner rounded",
    ],
    answer: "Rounded corners",
  },
  {
    question: (
      <div>
        <p>What color will the border be?</p>
        <CodeBlock language="css" code={`.alert { border-color: #ff0000; }`} />
        <CodeBlock language="html" code={`<div class="alert">Warning</div>`} />
      </div>
    ),
    options: ["Black", "Red", "Blue", "Green"],
    answer: "Red",
  },
  {
    question: (
      <div>
        <p>What style will the border have?</p>
        <CodeBlock language="css" code={`.line { border-style: solid; }`} />
        <CodeBlock
          language="html"
          code={`<div class="line">Solid Border</div>`}
        />
      </div>
    ),
    options: ["No border", "Dotted", "Dashed", "Solid"],
    answer: "Solid",
  },
  {
    question: (
      <div>
        <p>How much space will be inside the box?</p>
        <CodeBlock language="css" code={`.content { padding: 20px; }`} />
        <CodeBlock
          language="html"
          code={`<div class="content">Text inside</div>`}
        />
      </div>
    ),
    options: [
      "20px space around content (inside border)",
      "20px space outside border",
      "20px margin",
      "No space",
    ],
    answer: "20px space around content (inside border)",
  },
  {
    question: (
      <div>
        <p>What will this button look like?</p>
        <CodeBlock
          language="css"
          code={`.btn {
  border-width: 3px;
  border-style: solid;
  border-color: #008000;
  border-radius: 10px;
  padding: 10px;
}`}
        />
        <CodeBlock
          language="html"
          code={`<button class="btn">Click</button>`}
        />
      </div>
    ),
    options: [
      "Green solid border, rounded corners, inner spacing",
      "Blue dashed border, sharp corners",
      "No border, no padding",
      "Red border with no style",
    ],
    answer: "Green solid border, rounded corners, inner spacing",
  },
  {
    question: (
      <div>
        <p>Which color is represented by this hex code?</p>
        <CodeBlock language="css" code={`.orange { border-color: #ffa500; }`} />
        <CodeBlock
          language="html"
          code={`<div class="orange">Border Test</div>`}
        />
      </div>
    ),
    options: ["Red", "Blue", "Orange", "Green"],
    answer: "Orange",
  },

  {
    question:
      "Which CSS Property can be used to set the border thickness of an HTML element?",
    options: ["height", "border-width", "width", "border"],
    answer: "border-width",
  },
  {
    question:
      "Which CSS Property is used to round the bottom left corner of an HTML element?",
    options: [
      "left-bottom-border-radius",
      "border-bottom-left-radius",
      "border-bottom-top-radius",
      "border-bottom-right-radius",
    ],
    answer: "border-bottom-left-radius",
  },
  {
    question:
      "Which of the following statements is true regarding the CSS Box Model?",
    options: [
      "Padding is the border surrounding the content of an HTML element.",
      "Padding is the background surrounding the content of an HTML element.",
      "Padding is the space surrounding the content of an HTML element.",
      "Padding is the border color of the content of an HTML element.",
    ],
    answer: "Padding is the space surrounding the content of an HTML element.",
  },
];

const Introductionto_Css_BoxModel_MCQ_2 = ({
  subtopicId,
  goalName,
  courseName,
}) => {
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
      title="Introduction to CSS BoxModel Part 2 - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Introductionto_Css_BoxModel_MCQ_2;
