import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          Which selector has the <strong>highest specificity</strong>?
        </p>
      </div>
    ),
    options: ["Type Selector", "Class Selector", "ID Selector", "Inline Style"],
    answer: "Inline Style",
  },
  {
    question: (
      <div>
        <p>When two rules have equal specificity, which one is applied?</p>
      </div>
    ),
    options: ["The first rule", "The last rule", "Both", "Neither"],
    answer: "The last rule",
  },
  {
    question: (
      <div>
        <p>
          Which property overrides all other selectors except another
          !important?
        </p>
      </div>
    ),
    options: [
      "ID Selector",
      "Class Selector",
      "Inline Style",
      "!important property",
    ],
    answer: "!important property",
  },
  {
    question: (
      <div>
        <p>What color will the paragraph be?</p>
        <CodeBlock
          language="html"
          code={`<p class="text" id="title" style="color: green;">Hello</p>`}
        />
        <CodeBlock
          language="css"
          code={`
p { color: blue; }
.text { color: red; }
#title { color: purple; }
`}
        />
      </div>
    ),
    options: ["Blue", "Red", "Purple", "Green"],
    answer: "Green",
  },
  {
    question: (
      <div>
        <p>Which rule wins due to specificity?</p>
        <CodeBlock
          language="css"
          code={`
.warning { color: orange; }
p { color: gray; }
`}
        />
        <CodeBlock language="html" code={`<p class="warning">Alert!</p>`} />
      </div>
    ),
    options: [
      "p selector (type)",
      ".warning selector (class wins)",
      "Both applied",
      "No color",
    ],
    answer: ".warning selector (class wins)",
  },
  {
    question: (
      <div>
        <p>What color will this text be?</p>
        <CodeBlock
          language="css"
          code={`
#unique { color: blue; }
.special { color: red; }
`}
        />
        <CodeBlock
          language="html"
          code={`<p id="unique" class="special">Text</p>`}
        />
      </div>
    ),
    options: ["Red (class)", "Blue (ID wins)", "Purple", "Black"],
    answer: "Blue (ID wins)",
  },
  {
    question: (
      <div>
        <p>Which color is applied last?</p>
        <CodeBlock
          language="css"
          code={`
.text-red { color: red; }
.text-blue { color: blue; }
`}
        />
        <CodeBlock
          language="html"
          code={`<p class="text-red text-blue">Final Color?</p>`}
        />
      </div>
    ),
    options: ["Red", "Blue (last wins)", "Both", "None"],
    answer: "Blue (last wins)",
  },
  {
    question: (
      <div>
        <p>Only way to override this without !important?</p>
        <CodeBlock
          language="css"
          code={`
#header { color: white !important; }
`}
        />
      </div>
    ),
    options: [
      "Use a class",
      "Use inline style",
      "Use another !important",
      "Impossible",
    ],
    answer: "Use another !important",
  },
  {
    question: (
      <div>
        <p>Why should you avoid inline styles?</p>
        <CodeBlock
          language="html"
          code={`<div style="font-size: 20px; color: red; margin: 10px;">
  Hard to maintain
</div>`}
        />
      </div>
    ),
    options: [
      "They are reusable",
      "They reduce readability and are not reusable",
      "They have low specificity",
      "They don't work in Bootstrap",
    ],
    answer: "They reduce readability and are not reusable",
  },
  {
    question: (
      <div>
        <p>Which rule is applied due to cascade (source order)?</p>
        <CodeBlock
          language="css"
          code={`
.make-green { color: green; }
.make-yellow { color: yellow; }
.make-green { color: orange; }
`}
        />
        <CodeBlock
          language="html"
          code={`<p class="make-green make-yellow">Color?</p>`}
        />
      </div>
    ),
    options: ["Green", "Yellow", "Orange (last make-green)", "Black"],
    answer: "Orange (last make-green)",
  },
];

const Css_Specificity_Cascade_MCQ = ({ subtopicId, goalName, courseName }) => {
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
  return (
    <MCQLogic
      title="CSS Specificity & Cascade - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};
}

export default Css_Specificity_Cascade_MCQ;
