import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 7 CodeBlock Questions - Developing Layouts (All Subtopics) ==========
  {
    question: (
      <div>
        <p>What layout does this create?</p>
        <CodeBlock language="html" code={`<div class="d-flex flex-column justify-content-center" style="height: 100vh;">
  <h1>Welcome</h1>
  <p>Centered vertically</p>
</div>`} />
      </div>
    ),
    options: ["Horizontal center", "Vertical center full screen", "Top aligned", "Grid layout"],
    answer: "Vertical center full screen",
  },
  {
    question: (
      <div>
        <p>How to create equal spacing between three cards?</p>
        <CodeBlock language="html" code={`<div class="d-flex justify-content-between">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>`} />
      </div>
    ),
    options: ["justify-content-center", "justify-content-between", "justify-content-around", "justify-content-start"],
    answer: "justify-content-between",
  },
  {
    question: (
      <div>
        <p>What does this navigation bar code do?</p>
        <CodeBlock language="html" code={`<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Tourism</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
  </button>
</nav>`} />
      </div>
    ),
    options: ["Fixed navbar", "Responsive collapsible navbar", "Simple link list", "Footer"],
    answer: "Responsive collapsible navbar",
  },
  {
    question: (
      <div>
        <p>How to make a full-width hero section?</p>
        <CodeBlock language="html" code={`<div class="bg-primary text-white text-center" style="height: 80vh; background-image: url('ocean.jpg'); background-size: cover;">
  <h1>Explore the World</h1>
</div>`} />
      </div>
    ),
    options: ["Uses container", "Uses vw units", "Uses background-size: cover + fixed height", "Uses grid"],
    answer: "Uses background-size: cover + fixed height",
  },
  {
    question: (
      <div>
        <p>What layout is this?</p>
        <CodeBlock language="html" code={`<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">Left</div>
    <div class="col-12 col-md-6">Right</div>
  </div>
</div>`} />
      </div>
    ),
    options: ["Flexbox", "CSS Grid", "Bootstrap Grid - 2 columns on medium+", "Float layout"],
    answer: "Bootstrap Grid - 2 columns on medium+",
  },
  {
    question: (
      <div>
        <p>How to center an image in a card both horizontally and vertically?</p>
        <CodeBlock language="html" code={`<div class="card d-flex justify-content-center align-items-center" style="height: 300px;">
  <img src="tajmahal.png" class="card-img-top w-50" />
</div>`} />
      </div>
    ),
    options: ["text-center only", "d-flex + justify-content-center + align-items-center", "mx-auto only", "position-absolute"],
    answer: "d-flex + justify-content-center + align-items-center",
  },
  {
    question: (
      <div>
        <p>What creates a sticky footer?</p>
        <CodeBlock language="html" code={`<body class="d-flex flex-column" style="min-height: 100vh;">
  <main class="flex-fill">Content</main>
  <footer class="bg-dark text-white text-center py-3">Footer</footer>
</body>`} />
      </div>
    ),
    options: ["position-fixed", "Flexbox with flex-fill on main", "margin-top auto", "vh-100 on body"],
    answer: "Flexbox with flex-fill on main",
  },

  // ========== 3 Classic MCQs from Developing Layouts ==========
  {
    question: "Which Bootstrap class creates a responsive grid container?",
    options: ["container", "container-fluid", "row", "d-grid"],
    answer: "container",
  },
  {
    question: "To make a navbar responsive, you must include navbar-toggler and data-target.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question: "The class 'justify-content-around' distributes space evenly around items.",
    options: ["True", "False"],
    answer: "True",
  },
];

const Static_MCQ_Assignment3 = ({ subtopicId, goalName, courseName }) => {
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
      title="Static MCQ Assignment 3"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Static_MCQ_Assignment3;