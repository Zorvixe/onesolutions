import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          What is the purpose of the Bootstrap <code>container</code> class?
        </p>
      </div>
    ),
    options: [
      "To center content and add padding",
      "To make content full-width",
      "To create a grid row",
      "To style text",
    ],
    answer: "To center content and add padding",
  },
  {
    question: (
      <div>
        <p>Which class creates a full-width container in Bootstrap?</p>
      </div>
    ),
    options: [
      "container",
      "container-fluid",
      "container-full",
      "container-wide",
    ],
    answer: "container-fluid",
  },
  {
    question: (
      <div>
        <p>How many columns does Bootstrap Grid use by default?</p>
      </div>
    ),
    options: ["6", "10", "12", "16"],
    answer: "12",
  },
  {
    question: (
      <div>
        <p>
          What does <code>col-6</code> mean?
        </p>
      </div>
    ),
    options: [
      "6 columns wide on all devices",
      "6 columns wide only on large devices",
      "50% width on all devices",
      "6 pixels wide",
    ],
    answer: "50% width on all devices",
  },
  {
    question: (
      <div>
        <p>Which class makes a column take full width on small devices?</p>
      </div>
    ),
    options: ["col-12", "col-sm-12", "col-xs-12", "col-full"],
    answer: "col-12",
  },
  {
    question: (
      <div>
        <p>What happens if you use more than 12 columns in a row?</p>
      </div>
    ),
    options: [
      "Error occurs",
      "Extra columns wrap to next line",
      "They overlap",
      "Browser crashes",
    ],
    answer: "Extra columns wrap to next line",
  },
  {
    question: (
      <div>
        <p>Which breakpoint is for tablets (≥768px)?</p>
      </div>
    ),
    options: ["sm", "md", "lg", "xl"],
    answer: "md",
  },
  {
    question: (
      <div>
        <p>Which class targets medium devices and above?</p>
      </div>
    ),
    options: ["col-md-6", "col-sm-6", "col-6", "col-lg-6"],
    answer: "col-md-6",
  },
  {
    question: (
      <div>
        <p>Bootstrap follows which design approach?</p>
      </div>
    ),
    options: ["Desktop First", "Mobile First", "Tablet First", "TV First"],
    answer: "Mobile First",
  },
  {
    question: (
      <div>
        <p>
          What does <code>col-sm-6 col-md-4 col-lg-3</code> mean?
        </p>
      </div>
    ),
    options: [
      "Different widths at different breakpoints",
      "Always 6 columns",
      "Only applies to small devices",
      "Invalid syntax",
    ],
    answer: "Different widths at different breakpoints",
  },
  {
    question: (
      <div>
        <p>Which class adds 16px margin on all sides?</p>
      </div>
    ),
    options: ["m-1", "m-2", "m-3", "m-4"],
    answer: "m-3",
  },
  {
    question: (
      <div>
        <p>
          What does <code>mt-5</code> do?
        </p>
      </div>
    ),
    options: [
      "margin-top: 48px",
      "margin-top: 16px",
      "margin-top: 8px",
      "margin-top: 4px",
    ],
    answer: "margin-top: 48px",
  },
  {
    question: (
      <div>
        <p>Which class centers content horizontally?</p>
      </div>
    ),
    options: ["mx-auto", "m-auto", "text-center", "justify-center"],
    answer: "mx-auto",
  },
  {
    question: (
      <div>
        <p>
          Why should you avoid <code>ml-3</code> on grid columns?
        </p>
      </div>
    ),
    options: [
      "It breaks the grid system",
      "It's deprecated",
      "It adds padding",
      "It's only for containers",
    ],
    answer: "It breaks the grid system",
  },
  {
    question: (
      <div>
        <p>Which class pushes an element to the right?</p>
      </div>
    ),
    options: ["mr-auto", "ml-auto", "mx-auto", "m-auto"],
    answer: "ml-auto",
  },
  {
    question: (
      <div>
        <p>
          What does <code>p-3</code> add?
        </p>
      </div>
    ),
    options: ["16px padding", "48px padding", "8px padding", "0 padding"],
    answer: "16px padding",
  },
  {
    question: (
      <div>
        <p>Which class makes width 50%?</p>
      </div>
    ),
    options: ["w-25", "w-50", "w-75", "w-100"],
    answer: "w-50",
  },
  {
    question: (
      <div>
        <p>Which class adds a large shadow?</p>
      </div>
    ),
    options: ["shadow", "shadow-sm", "shadow-lg", "shadow-xl"],
    answer: "shadow-lg",
  },
  {
    question: (
      <div>
        <p>
          What does <code>d-none d-md-block</code> do?
        </p>
      </div>
    ),
    options: [
      "Hidden on small, visible on medium+",
      "Visible on small, hidden on medium+",
      "Always hidden",
      "Always visible",
    ],
    answer: "Hidden on small, visible on medium+",
  },
  {
    question: (
      <div>
        <p>Which class fixes navbar to top?</p>
      </div>
    ),
    options: ["fixed-top", "sticky-top", "fixed-header", "navbar-fixed"],
    answer: "fixed-top",
  },
  {
    question: (
      <div>
        <p>What is the correct order for navbar items alignment?</p>
      </div>
    ),
    options: ["ms-auto", "me-auto", "mx-auto", "m-auto"],
    answer: "ms-auto",
  },
  {
    question: (
      <div>
        <p>Which class changes visual order of flex items?</p>
      </div>
    ),
    options: ["order-1", "flex-order", "sort", "position"],
    answer: "order-1",
  },
  {
    question: (
      <div>
        <p>
          What does <code>bg-primary</code> do?
        </p>
      </div>
    ),
    options: [
      "Blue background",
      "Red background",
      "Green background",
      "Gray background",
    ],
    answer: "Blue background",
  },
  {
    question: (
      <div>
        <p>Which class makes text white?</p>
      </div>
    ),
    options: ["text-white", "text-light", "text-bright", "text-pale"],
    answer: "text-white",
  },
  {
    question: (
      <div>
        <p>
          What does <code>justify-content-center</code> do in flex?
        </p>
      </div>
    ),
    options: [
      "Centers items horizontally",
      "Centers items vertically",
      "Aligns to left",
      "Spreads items",
    ],
    answer: "Centers items horizontally",
  },
  {
    question: (
      <div>
        <p>Which class is used for responsive images?</p>
      </div>
    ),
    options: ["img-responsive", "img-fluid", "img-full", "img-auto"],
    answer: "img-fluid",
  },
  {
    question: (
      <div>
        <p>
          What is the max-width of <code>.container</code> at ≥1200px?
        </p>
      </div>
    ),
    options: ["1140px", "960px", "720px", "540px"],
    answer: "1140px",
  },
  {
    question: (
      <div>
        <p>Which class hides an element on large screens?</p>
      </div>
    ),
    options: ["d-lg-none", "d-none-lg", "hidden-lg", "hide-lg"],
    answer: "d-lg-none",
  },
  {
    question: (
      <div>
        <p>
          What does <code>order-md-1</code> do?
        </p>
      </div>
    ),
    options: [
      "Changes order only on medium and larger screens",
      "Changes order on all screens",
      "Only on mobile",
      "Invalid class",
    ],
    answer: "Changes order only on medium and larger screens",
  },
  {
    question: (
      <div>
        <p>Which class adds circular corners?</p>
      </div>
    ),
    options: ["rounded", "rounded-circle", "rounded-pill", "circle"],
    answer: "rounded-circle",
  },
  {
    question: (
      <div>
        <p>What is the spacer value in Bootstrap spacing?</p>
      </div>
    ),
    options: ["10px", "16px", "20px", "8px"],
    answer: "16px",
  },
  {
    question: (
      <div>
        <p>Which class makes a button outline style?</p>
      </div>
    ),
    options: [
      "btn-outline-primary",
      "btn-primary-outline",
      "outline-btn",
      "btn-border",
    ],
    answer: "btn-outline-primary",
  },
  {
    question: (
      <div>
        <p>
          What does <code>text-center</code> do?
        </p>
      </div>
    ),
    options: [
      "Centers block elements",
      "Centers text only",
      "Centers inline elements",
      "Does nothing",
    ],
    answer: "Centers text only",
  },
  {
    question: (
      <div>
        <p>Which class is used for responsive embeds?</p>
      </div>
    ),
    options: [
      "embed-responsive",
      "responsive-embed",
      "video-responsive",
      "iframe-responsive",
    ],
    answer: "embed-responsive",
  },
  {
    question: (
      <div>
        <p>
          What does <code>w-100</code> do to an image?
        </p>
      </div>
    ),
    options: [
      "Makes it full width",
      "Makes it 100px wide",
      "Makes it 100% height",
      "No effect",
    ],
    answer: "Makes it full width",
  },
  {
    question: (
      <div>
        <p>Which class adds a modal in Bootstrap?</p>
      </div>
    ),
    options: ["modal", "dialog", "popup", "alert"],
    answer: "modal",
  },
  {
    question: (
      <div>
        <p>What is the correct way to make a responsive column?</p>
      </div>
    ),
    options: [
      "<div class='col-12 col-md-6'>",
      "<div class='column responsive'>",
      "<div class='grid-6'>",
      "<div class='col responsive'>",
    ],
    answer: "<div class='col-12 col-md-6'>",
  },
  {
    question: (
      <div>
        <p>Which class makes an element sticky?</p>
      </div>
    ),
    options: ["sticky-top", "fixed-top", "sticky", "affix"],
    answer: "sticky-top",
  },
  {
    question: (
      <div>
        <p>
          What does <code>bg-transparent</code> do?
        </p>
      </div>
    ),
    options: [
      "Removes background",
      "Makes text transparent",
      "Makes border transparent",
      "No effect",
    ],
    answer: "Removes background",
  },
  {
    question: (
      <div>
        <p>Which class is used for large screens (≥992px)?</p>
      </div>
    ),
    options: ["lg", "md", "sm", "xl"],
    answer: "lg",
  },
  {
    question: (
      <div>
        <p>What is the correct Bootstrap 5 navbar structure?</p>
      </div>
    ),
    options: [
      "<nav class='navbar navbar-expand-lg'>",
      "<div class='nav'>",
      "<header class='navbar'>",
      "<section class='nav'>",
    ],
    answer: "<nav class='navbar navbar-expand-lg'>",
  },
];

const Responsive_MCQ_Assignments_1 = ({ subtopicId, goalName, courseName }) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const randomQuestions = [...questionsData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 25);

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
      title="Responsive MCQ Assignments 1"
      questions={randomQuestions}
      showScore={true}
      allowReview={true}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Responsive_MCQ_Assignments_1;
