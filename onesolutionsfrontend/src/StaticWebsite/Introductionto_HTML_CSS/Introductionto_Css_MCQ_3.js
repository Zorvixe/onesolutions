import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  
  {
    question: (
      <div>
        <p>What font will be applied to the heading?</p>
        <CodeBlock language="css" code={`.title { font-family: "Roboto"; }`} />
        <CodeBlock language="html" code={`<h1 class="title">Welcome</h1>`} />
      </div>
    ),
    options: ['"Arial"', '"Roboto"', '"Times New Roman"', "Helvetica"],
    answer: '"Roboto"',
  },
  {
    question: (
      <div>
        <p>What will be the size of the text?</p>
        <CodeBlock language="css" code={`p { font-size: 18px; }`} />
        <CodeBlock language="html" code={`<p>This is a paragraph.</p>`} />
      </div>
    ),
    options: ["18px", "18 px", "18", '"18px"'],
    answer: "18px",
  },
  {
    question: (
      <div>
        <p>How will the text "Important" appear?</p>
        <CodeBlock language="css" code={`.imp { font-style: italic; }`} />
        <CodeBlock
          language="html"
          code={`<span class="imp">Important</span>`}
        />
      </div>
    ),
    options: ["Normal", "Italic", "Bold", "Underlined"],
    answer: "Italic",
  },
  {
    question: (
      <div>
        <p>What will be the thickness of the text?</p>
        <CodeBlock language="css" code={`h2 { font-weight: bold; }`} />
        <CodeBlock language="html" code={`<h2>About Us</h2>`} />
      </div>
    ),
    options: ["Normal", "Bold", "Light", "Bolder"],
    answer: "Bold",
  },
  {
    question: (
      <div>
        <p>What decoration will the link have?</p>
        <CodeBlock
          language="css"
          code={`.link { text-decoration: underline; }`}
        />
        <CodeBlock
          language="html"
          code={`<a href="#" class="link">Visit Site</a>`}
        />
      </div>
    ),
    options: ["No decoration", "Underline", "Line-through", "Overline"],
    answer: "Underline",
  },
  {
    question: (
      <div>
        <p>How will the deleted text appear?</p>
        <CodeBlock
          language="css"
          code={`.del { text-decoration: line-through; }`}
        />
        <CodeBlock
          language="html"
          code={`<p>Old price: <span class="del">$99</span></p>`}
        />
      </div>
    ),
    options: ["Underlined", "No change", "Line-through", "Bold"],
    answer: "Line-through",
  },
  {
    question: (
      <div>
        <p>What font and size will be applied to all paragraphs?</p>
        <CodeBlock
          language="css"
          code={`p { 
  font-family: "Georgia"; 
  font-size: 16px; 
}`}
        />
        <CodeBlock
          language="html"
          code={`<p>This is a sample paragraph.</p>`}
        />
      </div>
    ),
    options: [
      "Font: Georgia, Size: 16px",
      "Font: Arial, Size: 16px",
      "Font: Georgia, Size: 16",
      'Font: "Georgia", Size: 16 px',
    ],
    answer: "Font: Georgia, Size: 16px",
  },

  
  {
    question:
      "Which of the following is a valid value of the CSS property font-family?",
    options: ["blue", '"Roboto"', "red", "center"],
    answer: '"Roboto"',
  },
  {
    question:
      "Fill in the blank with an appropriate value for the CSS property font-size.",
    options: ["center", "blue", '"Roboto"', "20px"],
    answer: "20px",
  },
  {
    question:
      "Fill in the blank with an appropriate value for the CSS property font-style.",
    options: ["20px", "italic", "blue", '"Roboto"'],
    answer: "italic",
  },
];

const Introductionto_Css_MCQ_3 = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="CIntroduction to CSS Part 3 - MCQs"
      questions={randomQuestions}
    />
  );
};

export default Introductionto_Css_MCQ_3;
