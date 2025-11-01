import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const Sizing_Ele_Handling_Overflow_MCQ = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>What do we call an element's natural, default size in CSS?</p>
        </div>
      ),
      options: [
        "Intrinsic Size",
        "Extrinsic Size",
        "Natural Property",
        "Default Width",
      ],
      answer: "Intrinsic Size",
    },
    {
      question: (
        <div>
          <p>
            When a specific size is manually set for an element, it is known as?
          </p>
        </div>
      ),
      options: [
        "Intrinsic Size",
        "Extrinsic Size",
        "Inherited Size",
        "Fixed Width",
      ],
      answer: "Extrinsic Size",
    },
    {
      question: (
        <div>
          <p>
            Which CSS property controls what happens when content overflows an
            element's box?
          </p>
        </div>
      ),
      options: ["display", "overflow", "visibility", "clip"],
      answer: "overflow",
    },
    {
      question: (
        <div>
          <p>
            What is the default value of the <code>overflow</code> property?
          </p>
        </div>
      ),
      options: ["hidden", "auto", "visible", "scroll"],
      answer: "visible",
    },
    {
      question: (
        <div>
          <p>
            Which overflow value hides overflowing content without scrollbars?
          </p>
        </div>
      ),
      options: ["scroll", "auto", "visible", "hidden"],
      answer: "hidden",
    },
    {
      question: (
        <div>
          <p>
            The <code>overflow-x</code> property handles overflow in which
            direction?
          </p>
        </div>
      ),
      options: ["Vertical", "Horizontal", "Both", "None"],
      answer: "Horizontal",
    },
    {
      question: (
        <div>
          <p>
            Which CSS properties are used to set the minimum size of an element?
          </p>
        </div>
      ),
      options: [
        "min-size and max-size",
        "min-height and min-width",
        "min-length and min-breadth",
        "limit-height and limit-width",
      ],
      answer: "min-height and min-width",
    },
    {
      question: (
        <div>
          <p>Which properties restrict the maximum dimensions of an element?</p>
        </div>
      ),
      options: [
        "max-height and max-width",
        "min-height and min-width",
        "height and width",
        "overflow-x and overflow-y",
      ],
      answer: "max-height and max-width",
    },
    {
      question: (
        <div>
          <p>
            If content exceeds the maximum size, how can it be observed
            visually?
          </p>
        </div>
      ),
      options: [
        "By using the overflow property",
        "By increasing padding",
        "By setting position to relative",
        "By changing z-index",
      ],
      answer: "By using the overflow property",
    },
    {
      question: (
        <div>
          <p>Which meta tag ensures proper page scaling on mobile devices?</p>
          <CodeBlock
            language="html"
            code={`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`}
          />
        </div>
      ),
      options: [
        "<meta name='mobile' />",
        "<meta name='scale' />",
        "<meta name='viewport' />",
        "<meta content='viewport' />",
      ],
      answer: "<meta name='viewport' />",
    },
  ];

  return (
    <MCQLogic
      title="Sizing Elements and Handling Overflow"
      questions={originalQuestions}
      onComplete={onComplete}
    />
  );
};

export default Sizing_Ele_Handling_Overflow_MCQ;
