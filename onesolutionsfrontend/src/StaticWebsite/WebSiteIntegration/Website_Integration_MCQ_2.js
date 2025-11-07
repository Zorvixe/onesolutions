import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What is required for this carousel to work correctly when multiple carousels exist?</p>
        <CodeBlock language="html" code={`<div id="goldenTempleCarousel" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="gt1.jpg" class="d-block w-100">
    </div>
  </div>
</div>`} />
      </div>
    ),
    options: ["Same id as others", "Unique id across the page", "No id needed", "id starting with 'section'"],
    answer: "Unique id across the page",
  },
  {
    question: (
      <div>
        <p>Which section will be shown when this card is clicked?</p>
        <CodeBlock language="html" code={`<div class="card" onclick="display('sectionMysorePalace')">
  <img src="mysore.jpg">
  <h3>Mysore Palace</h3>
</div>`} />
      </div>
    ),
    options: ["Golden Temple", "Varanasi Temple", "Mysore Palace", "Home Section"],
    answer: "Mysore Palace",
  },
  {
    question: (
      <div>
        <p>What does this button do in the Detailed View?</p>
        <CodeBlock language="html" code={`<button onclick="display('sectionFavouritePlaces')" class="btn btn-primary">
  Back to Favourite Places
</button>`} />
      </div>
    ),
    options: ["Goes to Home", "Goes to Favourite Places", "Reloads page", "Closes section"],
    answer: "Goes to Favourite Places",
  },
  {
    question: (
      <div>
        <p>How many unique carousel ids are needed for three detailed views?</p>
        <CodeBlock language="html" code={`<!-- Golden Temple -->
<div id="carousel1" class="carousel"></div>

<!-- Mysore Palace -->
<div id="carousel2" class="carousel"></div>

<!-- Varanasi -->
<div id="carousel3" class="carousel"></div>`} />
      </div>
    ),
    options: ["One shared id", "Two ids", "Three unique ids", "No ids needed"],
    answer: "Three unique ids",
  },
  {
    question: (
      <div>
        <p>What type of list is this?</p>
        <CodeBlock language="html" code={`<ul>
  <li>Golden Temple</li>
  <li>Mysore Palace</li>
  <li>Varanasi</li>
</ul>`} />
      </div>
    ),
    options: ["Ordered list", "Unordered list", "Definition list", "Navigation list"],
    answer: "Unordered list",
  },
  {
    question: (
      <div>
        <p>What will this CSS do to the list?</p>
        <CodeBlock language="css" code={`ul { list-style-type: square; }`} />
        <CodeBlock language="html" code={`<ul><li>Item</li></ul>`} />
      </div>
    ),
    options: ["Remove bullets", "Use square bullets", "Number the items", "Make it bold"],
    answer: "Use square bullets",
  },
  {
    question: (
      <div>
        <p>Which integration step adds this onclick to a card?</p>
        <CodeBlock language="html" code={`<div onclick="display('sectionVaranasi')">Varanasi Card</div>`} />
      </div>
    ),
    options: ["Step 1: Add container", "Step 2: Add HTML", "Step 3: Add onclick to the card", "Step 4: Add back button"],
    answer: "Step 3: Add onclick to the card",
  },
  {
    question: "Which HTML tag is used to start an unordered list in HTML?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ul>",
  },
  {
    question: "Which HTML tag is used to start an ordered list in HTML?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ol>",
  },
  {
    question: "In the integration process, what must be added to go back from Golden Temple Detailed View?",
    options: ["A button with onclick to sectionHome", "A button with onclick to sectionFavouritePlaces", "A link to external site", "No button needed"],
    answer: "A button with onclick to sectionFavouritePlaces",
  },
];

const Website_Integration_MCQ_2 = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Website Integration Part 2 - MCQs"
      questions={randomQuestions}
    />
  );
};

export default Website_Integration_MCQ_2;