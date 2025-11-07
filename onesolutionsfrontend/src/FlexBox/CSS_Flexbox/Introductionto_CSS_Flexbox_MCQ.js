import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_CSS_Flexbox_MCQ = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>What does a layout define on a webpage?</p>
        </div>
      ),
      options: [
        "The color scheme of the page",
        "The arrangement and structure of elements",
        "The font size of text",
        "The hyperlinks of the page",
      ],
      answer: "The arrangement and structure of elements",
    },
    {
      question: (
        <div>
          <p>
            Which of the following methods is considered stable for designing a
            webpage layout?
          </p>
        </div>
      ),
      options: ["CSS Grid", "Flexbox", "Table Layout", "Float Layout"],
      answer: "Flexbox",
    },
    {
      question: (
        <div>
          <p>
            Which layout method is advanced and fast-growing but not yet fully
            stable?
          </p>
        </div>
      ),
      options: ["Flexbox", "CSS Grid", "Float Layout", "Inline Block Layout"],
      answer: "CSS Grid",
    },
    {
      question: (
        <div>
          <p>Flexbox helps to arrange elements in which directions?</p>
        </div>
      ),
      options: [
        "Only vertically",
        "Only horizontally",
        "Rows or columns",
        "Diagonally",
      ],
      answer: "Rows or columns",
    },
    {
      question: (
        <div>
          <p>Which CSS property makes an element a Flex Container?</p>
        </div>
      ),
      options: [
        "display: flex;",
        "flex-direction: row;",
        "justify-content: center;",
        "align-items: stretch;",
      ],
      answer: "display: flex;",
    },
    {
      question: (
        <div>
          <p>
            When <code>display: flex;</code> is applied, what do the direct
            children become?
          </p>
        </div>
      ),
      options: ["Flex Wrappers", "Flex Items", "Flex Rows", "Flex Columns"],
      answer: "Flex Items",
    },
    {
      question: (
        <div>
          <p>
            Which CSS property defines the direction in which flex items are
            placed?
          </p>
        </div>
      ),
      options: [
        "flex-direction",
        "justify-content",
        "align-items",
        "flex-wrap",
      ],
      answer: "flex-direction",
    },
    {
      question: (
        <div>
          <p>
            The <b>main axis</b> in Flexbox is defined by which property?
          </p>
        </div>
      ),
      options: ["align-items", "flex-direction", "flex-flow", "align-content"],
      answer: "flex-direction",
    },
    {
      question: (
        <div>
          <p>
            Which <code>flex-direction</code> value places items horizontally?
          </p>
        </div>
      ),
      options: ["column", "row", "reverse", "auto"],
      answer: "row",
    },
    {
      question: (
        <div>
          <p>
            Which <code>flex-direction</code> value places items vertically?
          </p>
        </div>
      ),
      options: ["row", "column", "inline", "stretch"],
      answer: "column",
    },
    {
      question: (
        <div>
          <p>Which property aligns items along the main axis?</p>
        </div>
      ),
      options: ["align-items", "justify-content", "flex-wrap", "align-content"],
      answer: "justify-content",
    },
    {
      question: (
        <div>
          <p>
            What is the default value of <code>justify-content</code>?
          </p>
        </div>
      ),
      options: ["center", "flex-end", "flex-start", "space-between"],
      answer: "flex-start",
    },
    {
      question: (
        <div>
          <p>
            Which <code>justify-content</code> value aligns items at the center
            of the container?
          </p>
        </div>
      ),
      options: ["flex-end", "flex-start", "center", "space-around"],
      answer: "center",
    },
    {
      question: (
        <div>
          <p>
            Which value of <code>justify-content</code> distributes equal space
            between items?
          </p>
        </div>
      ),
      options: ["space-between", "space-around", "center", "flex-end"],
      answer: "space-between",
    },
    {
      question: (
        <div>
          <p>
            Which value of <code>justify-content</code> provides equal space
            around each item?
          </p>
        </div>
      ),
      options: ["space-around", "space-between", "center", "flex-end"],
      answer: "space-around",
    },
    {
      question: (
        <div>
          <p>Which property aligns flex items along the cross axis?</p>
        </div>
      ),
      options: [
        "justify-content",
        "align-items",
        "flex-direction",
        "align-content",
      ],
      answer: "align-items",
    },
    {
      question: (
        <div>
          <p>
            What is the default value of <code>align-items</code>?
          </p>
        </div>
      ),
      options: ["center", "stretch", "flex-start", "flex-end"],
      answer: "stretch",
    },
    {
      question: (
        <div>
          <p>
            Which <code>align-items</code> value aligns items to the top of the
            container?
          </p>
        </div>
      ),
      options: ["center", "flex-end", "stretch", "flex-start"],
      answer: "flex-start",
    },
    {
      question: (
        <div>
          <p>
            Which <code>align-items</code> value centers items vertically in the
            container?
          </p>
        </div>
      ),
      options: ["flex-end", "flex-start", "center", "stretch"],
      answer: "center",
    },
    {
      question: (
        <div>
          <p>
            Which <code>align-items</code> value aligns items at the bottom of
            the container?
          </p>
        </div>
      ),
      options: ["flex-end", "center", "stretch", "flex-start"],
      answer: "flex-end",
    },
  ];

  return (
    <MCQLogic
      title="Introduction to CSS Flexbox | MCQs"
      questions={originalQuestions}
      onComplete={onComplete}
    />
  );
};

export default Introductionto_CSS_Flexbox_MCQ;
