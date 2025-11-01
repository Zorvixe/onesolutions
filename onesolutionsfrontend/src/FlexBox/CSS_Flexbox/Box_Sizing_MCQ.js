import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const Box_Sizing_MCQ = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>In CSS, every HTML element on a web page is represented as what shape?</p>
        </div>
      ),
      options: ["Circle", "Rectangle", "Triangle", "Polygon"],
      answer: "Rectangle",
    },
    {
      question: (
        <div>
          <p>
            By default, the width and height properties apply only to which part
            of an element?
          </p>
        </div>
      ),
      options: ["Padding", "Border", "Content", "Margin"],
      answer: "Content",
    },
    {
      question: (
        <div>
          <p>
            The <code>box-sizing</code> property defines how what is calculated?
          </p>
        </div>
      ),
      options: [
        "Font size",
        "Total width and height",
        "Margin space",
        "Border thickness",
      ],
      answer: "Total width and height",
    },
    {
      question: (
        <div>
          <p>Which of the following is the default value of the box-sizing property?</p>
        </div>
      ),
      options: [
        "border-box",
        "padding-box",
        "content-box",
        "margin-box",
      ],
      answer: "content-box",
    },
    {
      question: (
        <div>
          <p>In the content-box model, which parts are <b>not included</b> in the element’s width and height?</p>
        </div>
      ),
      options: [
        "Content only",
        "Padding, border, and margin",
        "Border only",
        "Padding only",
      ],
      answer: "Padding, border, and margin",
    },
    {
      question: (
        <div>
          <p>In the border-box model, which parts are included in the total width and height?</p>
        </div>
      ),
      options: [
        "Only content",
        "Content, padding, and border",
        "Content and margin",
        "Border and margin",
      ],
      answer: "Content, padding, and border",
    },
    {
      question: (
        <div>
          <p>
            According to best practices, which <code>box-sizing</code> model is
            recommended for layout development?
          </p>
        </div>
      ),
      options: [
        "content-box",
        "border-box",
        "margin-box",
        "padding-box",
      ],
      answer: "border-box",
    },
    {
      question: (
        <div>
          <p>Which CSS framework uses <code>box-sizing: border-box;</code> for all elements?</p>
        </div>
      ),
      options: ["Tailwind CSS", "Bootstrap", "Foundation", "Materialize"],
      answer: "Bootstrap",
    },
    {
      question: (
        <div>
          <p>
            What does the Universal Selector (<code>*</code>) do in CSS?
          </p>
        </div>
      ),
      options: [
        "Selects a specific element by ID",
        "Selects all HTML elements in the document",
        "Selects only text nodes",
        "Selects only class elements",
      ],
      answer: "Selects all HTML elements in the document",
    },
    {
      question: (
        <div>
          <p>Which of the following is the correct syntax for using the Universal Selector?</p>
          <CodeBlock language="css" code={`* {\n  box-sizing: border-box;\n}`} />
        </div>
      ),
      options: [
        "* { box-sizing: border-box; }",
        "all { box-sizing: border-box; }",
        "html { box-sizing: border-box; }",
        "# { box-sizing: border-box; }",
      ],
      answer: "* { box-sizing: border-box; }",
    },
  ];

  return <MCQLogic title="Box Sizing" questions={originalQuestions} onComplete={onComplete} />;
};

export default Box_Sizing_MCQ;
