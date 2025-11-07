import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What will this HTML display?</p>
        <CodeBlock language="html" code={`<img src="mountain.jpg">`} />
      </div>
    ),
    options: ["A paragraph", "A heading", "An image", "A button"],
    answer: "An image",
  },
  {
    question: (
      <div>
        <p>Which attribute is used to specify the image path?</p>
        <CodeBlock language="html" code={`<img src="beach.jpg" alt="Beach">`} />
      </div>
    ),
    options: ["href", "src", "link", "path"],
    answer: "src",
  },
  {
    question: (
      <div>
        <p>What happens if we write this?</p>
        <CodeBlock language="html" code={`<img src="photo.jpg"></img>`} />
      </div>
    ),
    options: [
      "Works fine",
      "Invalid - img has no closing tag",
      "Shows broken image",
      "Displays twice",
    ],
    answer: "Invalid - img has no closing tag",
  },
  {
    question: (
      <div>
        <p>What does this CSS do to the image?</p>
        <CodeBlock
          language="css"
          code={`img { width: 300px; height: 200px; }`}
        />
        <CodeBlock language="html" code={`<img src="lake.jpg">`} />
      </div>
    ),
    options: [
      "No change",
      "Sets image size to 300x200 pixels",
      "Adds border",
      "Centers the image",
    ],
    answer: "Sets image size to 300x200 pixels",
  },
  {
    question: (
      <div>
        <p>How much space will be around this image?</p>
        <CodeBlock language="css" code={`.pic { margin: 20px; }`} />
        <CodeBlock language="html" code={`<img src="tree.jpg" class="pic">`} />
      </div>
    ),
    options: [
      "20px inside the image",
      "20px outside around the image",
      "20px border",
      "No space",
    ],
    answer: "20px outside around the image",
  },
  {
    question: (
      <div>
        <p>Which margin property adds space only at the bottom?</p>
        <CodeBlock language="css" code={`img { margin-bottom: 30px; }`} />
      </div>
    ),
    options: ["margin-top", "margin-left", "margin-bottom", "margin-right"],
    answer: "margin-bottom",
  },
  {
    question: (
      <div>
        <p>What will this combination do?</p>
        <CodeBlock
          language="html"
          code={`<img src="sunset.jpg" width="400" height="300" style="margin: 15px;">`}
        />
      </div>
    ),
    options: [
      "Image with inline size and margin",
      "Image with only margin",
      "Image with only size",
      "Error",
    ],
    answer: "Image with inline size and margin",
  },
  {
    question: "Which HTML element defines an image?",
    options: ["p", "h1", "img", "div"],
    answer: "img",
  },
  {
    question:
      "The image element in HTML is a void element and does not have a closing tag",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question: "Identify the CSS property used to add space between elements.",
    options: ["border-width", "space", "margin", "padding"],
    answer: "margin",
  },
];

const FavouritePlaces_Section_MCQ_1 = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Favourite Places Section - MCQs"
      questions={randomQuestions}
    />
  );
};

export default FavouritePlaces_Section_MCQ_1;
