import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>When would you use this for an image?</p>
        <CodeBlock
          language="html"
          code={`<img src="festival.jpg" alt="Festival">`}
        />
      </div>
    ),
    options: [
      "When image is background",
      "When content overlaps image",
      "When image is part of content",
      "When no height is needed",
    ],
    answer: "When image is part of content",
  },
  {
    question: (
      <div>
        <p>Which approach is used here for the background?</p>
        <CodeBlock
          language="css"
          code={`.top-section { background-image: url('diwali-bg.jpg'); height: 400px; background-size: cover; }`}
        />
        <CodeBlock language="html" code={`<div class="top-section"></div>`} />
      </div>
    ),
    options: [
      "HTML img element",
      "CSS background image",
      "Inline image",
      "No image",
    ],
    answer: "CSS background image",
  },
  {
    question: (
      <div>
        <p>What does this CSS add to the element?</p>
        <CodeBlock language="css" code={`.card { padding: 20px; }`} />
        <CodeBlock language="html" code={`<div class="card">Content</div>`} />
      </div>
    ),
    options: [
      "Space outside border",
      "Space between elements",
      "Space around content inside border",
      "Border thickness",
    ],
    answer: "Space around content inside border",
  },
  {
    question: (
      <div>
        <p>What is the purpose of this margin?</p>
        <CodeBlock language="css" code={`.item { margin: 10px; }`} />
        <CodeBlock
          language="html"
          code={`<div class="container"><div class="item"></div><div class="item"></div></div>`}
        />
      </div>
    ),
    options: [
      "Space inside item",
      "Space between items",
      "Background color",
      "Text alignment",
    ],
    answer: "Space between items",
  },
  {
    question: (
      <div>
        <p>Which image URL is for the diya in the Diwali page cards?</p>
        <CodeBlock
          language="html"
          code={`<img src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/diya-img.png" alt="Diya">`}
        />
      </div>
    ),
    options: [
      "Lamp image",
      "Diya image",
      "Firework image",
      "Firecracker image",
    ],
    answer: "Diya image",
  },
  {
    question: (
      <div>
        <p>What color is applied to this container in the bottom section?</p>
        <CodeBlock
          language="css"
          code={`.bottom-section { background-color: #e6f6ff; padding: 20px; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="bottom-section">Cards here</div>`}
        />
      </div>
    ),
    options: ["White", "#e6f6ff", "#616e7c", "#323f4b"],
    answer: "#e6f6ff",
  },
  {
    question: (
      <div>
        <p>In the Diwali page top section, what does this do?</p>
        <CodeBlock
          language="css"
          code={`.heading { color: white; font-size: 40px; padding: 100px; }`}
        />
        <CodeBlock
          language="html"
          code={`<h1 class="heading">Happy Diwali</h1>`}
        />
      </div>
    ),
    options: [
      "Adds background image",
      "Sets heading style over background",
      "Aligns cards",
      "Adds button",
    ],
    answer: "Sets heading style over background",
  },
  {
    question:
      "The HTML image element is used to add images that are part of the content.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "The margin is the space present outside the border of an HTML element.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "In the step-by-step process for the Diwali page, what is done first in the top section?",
    options: [
      "Add heading",
      "Add a background image",
      "Specify background size",
      "Set color",
    ],
    answer: "Add a background image",
  },
];

const Approachto_Develop_Layout_MCQ_2 = ({
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
      title="Approach to Develop Layout - MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Approachto_Develop_Layout_MCQ_2;
