import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_CSS_Flexbox_MCQ_2 = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>
            What is the purpose of the <code>flex-wrap</code> property in
            Flexbox?
          </p>
        </div>
      ),
      options: [
        "To align flex items along the cross axis",
        "To control whether flex items are forced into a single line or can wrap onto multiple lines",
        "To define the direction of the main axis",
        "To set the spacing between flex items",
      ],
      answer:
        "To control whether flex items are forced into a single line or can wrap onto multiple lines",
    },
    {
      question: (
        <div>
          <p>
            What is the default value of the <code>flex-wrap</code> property?
          </p>
        </div>
      ),
      options: ["wrap", "nowrap", "wrap-reverse", "auto"],
      answer: "nowrap",
    },
    {
      question: (
        <div>
          <p>
            Which <code>flex-wrap</code> value allows flex items to move to the
            next line?
          </p>
        </div>
      ),
      options: ["nowrap", "wrap", "wrap-reverse", "stretch"],
      answer: "wrap",
    },
    {
      question: (
        <div>
          <p>
            What happens when <code>flex-wrap: wrap-reverse;</code> is applied?
          </p>
        </div>
      ),
      options: [
        "Items wrap normally from top to bottom",
        "Items wrap in the reverse direction (bottom to top)",
        "Items overlap each other",
        "Items become invisible",
      ],
      answer: "Items wrap in the reverse direction (bottom to top)",
    },
    {
      question: (
        <div>
          <p>
            Which of the following is the correct CSS syntax for using the{" "}
            <code>flex-wrap</code> property?
          </p>
          <CodeBlock
            language="css"
            code={`.container {\n  flex-wrap: wrap;\n}`}
          />
        </div>
      ),
      options: [
        "flexWrap: wrap;",
        "wrap: flex;",
        "flex-wrap: wrap;",
        "wrap-flex: true;",
      ],
      answer: "flex-wrap: wrap;",
    },
    {
      question: (
        <div>
          <p>Can a Flex Item also act as a Flex Container?</p>
        </div>
      ),
      options: [
        "Yes, it can be both a container and an item",
        "No, a Flex Item cannot be a Flex Container",
        "Only if it uses grid display",
        "Only when nested inside inline elements",
      ],
      answer: "Yes, it can be both a container and an item",
    },
    {
      question: (
        <div>
          <p>
            In the example, which class acts as a Flex Container for all the
            cards?
          </p>
        </div>
      ),
      options: ["bg-container", "cards-container", "card", "main-container"],
      answer: "cards-container",
    },
    {
      question: (
        <div>
          <p>
            In the given DOM tree, which class acts as a Flex Item to{" "}
            <code>bg-container</code>?
          </p>
        </div>
      ),
      options: ["cards-container", "card", "flex-item", "content-box"],
      answer: "cards-container",
    },
    {
      question: (
        <div>
          <p>
            In the given DOM structure, which elements behave as Flex Items
            inside <code>cards-container</code>?
          </p>
        </div>
      ),
      options: [
        "bg-container",
        "elements with class name card",
        "header and footer",
        "meta and script tags",
      ],
      answer: "elements with class name card",
    },
    {
      question: (
        <div>
          <p>
            What does it mean when we say{" "}
            <b>
              “cards-container acts as both a Flex Item and a Flex Container”
            </b>
            ?
          </p>
        </div>
      ),
      options: [
        "It can align both horizontally and vertically",
        "It can be a child in one flex context and a parent in another",
        "It stops rendering its children",
        "It uses two display types at once",
      ],
      answer: "It can be a child in one flex context and a parent in another",
    },
  ];

  return (
    <MCQLogic
      title="Introduction to CSS Flexbox | Part 2 - MCQs"
      questions={originalQuestions}
      onComplete={onComplete}
    />
  );
};

export default Introductionto_CSS_Flexbox_MCQ_2;
