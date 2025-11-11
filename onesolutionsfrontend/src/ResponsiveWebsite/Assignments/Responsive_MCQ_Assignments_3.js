import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          What does <code>gap: 1rem</code> do in a flex container?
        </p>
      </div>
    ),
    options: [
      "Adds space between flex items",
      "Adds space inside items",
      "Adds margin to container",
      "Does nothing in flex",
    ],
    answer: "Adds space between flex items",
  },
  {
    question: (
      <div>
        <p>Which property controls spacing between grid items?</p>
      </div>
    ),
    options: ["margin", "padding", "gap", "space"],
    answer: "gap",
  },
  {
    question: (
      <div>
        <p>How to make a flex item not shrink?</p>
      </div>
    ),
    options: ["flex-shrink: 0", "flex: 1", "flex-grow: 0", "width: fixed"],
    answer: "flex-shrink: 0",
  },
  {
    question: (
      <div>
        <p>
          What does <code>align-content</code> control?
        </p>
      </div>
    ),
    options: [
      "Alignment of items on cross axis",
      "Alignment of lines when there's extra space in cross axis",
      "Main axis alignment",
      "Individual item alignment",
    ],
    answer: "Alignment of lines when there's extra space in cross axis",
  },
  {
    question: (
      <div>
        <p>Which is correct for a 3-column responsive grid?</p>
      </div>
    ),
    options: [
      "grid-template-columns: repeat(3, 1fr)",
      "grid-template-columns: 1fr 1fr 1fr",
      "Both are correct",
      "grid-columns: 3",
    ],
    answer: "Both are correct",
  },
  {
    question: (
      <div>
        <p>
          What does <code>grid-auto-rows: 200px</code> do?
        </p>
      </div>
    ),
    options: [
      "Sets explicit rows to 200px",
      "Sets implicit rows (auto-created) to 200px",
      "Sets all rows to 200px",
      "Invalid property",
    ],
    answer: "Sets implicit rows (auto-created) to 200px",
  },
  {
    question: (
      <div>
        <p>How to place an item in grid from column 1 to 3?</p>
      </div>
    ),
    options: [
      "grid-column: 1 / 3",
      "grid-column: 1 / span 2",
      "Both are correct",
      "grid-column: 1-3",
    ],
    answer: "Both are correct",
  },
  {
    question: (
      <div>
        <p>
          What does <code>grid-area: header</code> do?
        </p>
      </div>
    ),
    options: [
      "Names a grid item",
      "Names a grid area",
      "Creates a header",
      "Invalid",
    ],
    answer: "Names a grid area",
  },
  {
    question: (
      <div>
        <p>Which creates a full-bleed layout using grid?</p>
      </div>
    ),
    options: [
      "grid-template-columns: 1fr minmax(0, 1200px) 1fr",
      "width: 100vw",
      "margin: 0 auto",
      "container-fluid",
    ],
    answer: "grid-template-columns: 1fr minmax(0, 1200px) 1fr",
  },
  {
    question: (
      <div>
        <p>
          What does <code>position: absolute</code> do?
        </p>
      </div>
    ),
    options: [
      "Removes from document flow",
      "Keeps in flow",
      "Floats",
      "Becomes inline",
    ],
    answer: "Removes from document flow",
  },
  {
    question: (
      <div>
        <p>
          When is <code>position: absolute</code> positioned relative to?
        </p>
      </div>
    ),
    options: ["Nearest positioned ancestor", "Parent div", "Body", "Viewport"],
    answer: "Nearest positioned ancestor",
  },
  {
    question: (
      <div>
        <p>What makes an element a "positioned ancestor"?</p>
      </div>
    ),
    options: [
      "position: relative",
      "position: absolute",
      "position: fixed",
      "Any of the above",
    ],
    answer: "Any of the above",
  },
  {
    question: (
      <div>
        <p>How to center absolutely positioned element?</p>
      </div>
    ),
    options: [
      "top: 50%; left: 50%; transform: translate(-50%, -50%)",
      "margin: auto",
      "text-align: center",
      "position: center",
    ],
    answer: "top: 50%; left: 50%; transform: translate(-50%, -50%)",
  },
  {
    question: (
      <div>
        <p>
          What does <code>z-index: 999</code> do?
        </p>
      </div>
    ),
    options: [
      "Controls stacking order",
      "Controls opacity",
      "Controls size",
      "Invalid",
    ],
    answer: "Controls stacking order",
  },
  {
    question: (
      <div>
        <p>Which has higher stack level?</p>
      </div>
    ),
    options: ["z-index: 100", "z-index: 10", "Later in HTML", "Both same"],
    answer: "z-index: 100",
  },
  {
    question: (
      <div>
        <p>
          What does <code>position: sticky</code> do?
        </p>
      </div>
    ),
    options: [
      "Sticks when scrolled to",
      "Always fixed",
      "Only on mobile",
      "Invalid",
    ],
    answer: "Sticks when scrolled to",
  },
  {
    question: (
      <div>
        <p>
          Which is required for <code>position: sticky</code> to work?
        </p>
      </div>
    ),
    options: [
      "top, bottom, left, or right",
      "z-index",
      "display: block",
      "overflow: visible",
    ],
    answer: "top, bottom, left, or right",
  },
  {
    question: (
      <div>
        <p>How to create a card with shadow on hover?</p>
      </div>
    ),
    options: [
      "transition + box-shadow",
      "filter: brightness()",
      "transform: scale() only",
      "opacity",
    ],
    answer: "transition + box-shadow",
  },
  {
    question: (
      <div>
        <p>
          What does <code>object-fit: cover</code> do?
        </p>
      </div>
    ),
    options: [
      "Crops image to fill container",
      "Stretches image",
      "Shows full image",
      "Adds border",
    ],
    answer: "Crops image to fill container",
  },
  {
    question: (
      <div>
        <p>Best way to make responsive images?</p>
      </div>
    ),
    options: [
      "width: 100%; height: auto",
      "max-width: 100%",
      "Both",
      "img-fluid class",
    ],
    answer: "Both",
  },
  {
    question: (
      <div>
        <p>
          What does <code>minmax(200px, 1fr)</code> mean in grid?
        </p>
      </div>
    ),
    options: [
      "Minimum 200px, grow to fill",
      "Maximum 200px",
      "Exactly 200px",
      "Invalid",
    ],
    answer: "Minimum 200px, grow to fill",
  },
  {
    question: (
      <div>
        <p>How to create auto-filling grid?</p>
      </div>
    ),
    options: [
      "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))",
      "display: flex; flex-wrap: wrap",
      "float: left",
      "Both flex and grid",
    ],
    answer: "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))",
  },
  {
    question: (
      <div>
        <p>
          What is <code>auto-fit</code> vs <code>auto-fill</code>?
        </p>
      </div>
    ),
    options: [
      "auto-fit collapses empty tracks",
      "auto-fill keeps empty tracks",
      "Both same",
      "auto-fit is deprecated",
    ],
    answer: "auto-fit collapses empty tracks",
  },
  {
    question: (
      <div>
        <p>How to overlap elements?</p>
      </div>
    ),
    options: [
      "position: absolute + z-index",
      "float",
      "display: inline",
      "margin-negative",
    ],
    answer: "position: absolute + z-index",
  },
  {
    question: (
      <div>
        <p>
          What does <code>inset: 0</code> do?
        </p>
      </div>
    ),
    options: [
      "top: 0; right: 0; bottom: 0; left: 0",
      "margin: 0",
      "padding: 0",
      "border: 0",
    ],
    answer: "top: 0; right: 0; bottom: 0; left: 0",
  },
  {
    question: (
      <div>
        <p>Which creates a holy grail layout?</p>
      </div>
    ),
    options: [
      "CSS Grid with header, sidebar, main, footer",
      "Flexbox only",
      "Floats",
      "Tables",
    ],
    answer: "CSS Grid with header, sidebar, main, footer",
  },
  {
    question: (
      <div>
        <p>
          What does <code>grid-column: 1 / -1</code> mean?
        </p>
      </div>
    ),
    options: [
      "Span from first to last column",
      "Only first column",
      "Last column only",
      "Invalid",
    ],
    answer: "Span from first to last column",
  },
  {
    question: (
      <div>
        <p>How to make equal height columns?</p>
      </div>
    ),
    options: [
      "display: grid or flex",
      "height: 100%",
      "table-cell",
      "Both grid/flex",
    ],
    answer: "Both grid/flex",
  },
  {
    question: (
      <div>
        <p>What is the modern way to center content?</p>
      </div>
    ),
    options: [
      "display: grid; place-items: center",
      "margin: auto",
      "text-align: center",
      "vertical-align: middle",
    ],
    answer: "display: grid; place-items: center",
  },
  {
    question: (
      <div>
        <p>Which has better browser support?</p>
      </div>
    ),
    options: ["Flexbox", "CSS Grid", "Both same", "Grid has better"],
    answer: "Flexbox",
  },
  {
    question: (
      <div>
        <p>
          What does <code>fr</code> unit represent?
        </p>
      </div>
    ),
    options: [
      "Fraction of available space",
      "Fixed pixels",
      "Percentage",
      "Font size",
    ],
    answer: "Fraction of available space",
  },
];

const Responsive_MCQ_Assignments_3 = ({ subtopicId, goalName, courseName }) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const randomQuestions = [...questionsData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 30);

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
      title="Responsive MCQ Assignments 3"
      questions={randomQuestions}
      showScore={true}
      allowReview={true}
      timeLimit={1800} // 30 minutes
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Responsive_MCQ_Assignments_3;
