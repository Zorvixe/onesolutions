import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>What does this code do to the navbar?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar fixed-top navbar-expand-lg bg-white shadow">
  <!-- nav items -->
</nav>`}
        />
      </div>
    ),
    options: [
      "Sticks navbar to the top when scrolling",
      "Hides navbar on mobile",
      "Makes navbar full width",
      "Adds dark background",
    ],
    answer: "Sticks navbar to the top when scrolling",
  },
  {
    question: (
      <div>
        <p>How to link a nav item to the "Follow Us" section?</p>
        <CodeBlock
          language="html"
          code={`<!-- Nav item -->
<a class="nav-link" href="#follow-us">Follow Us</a>

<!-- Target section -->
<section id="follow-us">
  <h2>Follow Us</h2>
</section>`}
        />
      </div>
    ),
    options: [
      "Use href=\"#follow-us\" and id=\"follow-us\"",
      "Use name=\"follow-us\"",
      "Use data-target",
      "Not possible with HTML only",
    ],
    answer: "Use href=\"#follow-us\" and id=\"follow-us\"",
  },
  {
    question: (
      <div>
        <p>Correct Font Awesome icon class for Instagram?</p>
        <CodeBlock language="html" code={`<i class="fab fa-instagram"></i>`} />
      </div>
    ),
    options: [
      "<i class=\"fa fa-instagram\">",
      "<i class=\"fab fa-instagram\">",
      "<i class=\"bi bi-instagram\">",
      "<svg instagram>",
    ],
    answer: "<i class=\"fab fa-instagram\">",
  },
  {
    question: (
      <div>
        <p>
          What happens when you use <code>fixed-bottom</code>?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="fixed-bottom bg-dark text-white p-3 text-center">
  © 2025 Food Munch. All rights reserved.
</div>`}
        />
      </div>
    ),
    options: [
      "Element stays at bottom of screen while scrolling",
      "Element appears only on mobile",
      "Element disappears on scroll",
      "Element becomes sticky only on large screens",
    ],
    answer: "Element stays at bottom of screen while scrolling",
  },
  {
    question: (
      <div>
        <p>Best way to create colored circular social icons?</p>
        <CodeBlock
          language="html"
          code={`<a href="#" class="text-white bg-primary d-flex align-items-center justify-content-center rounded-circle" 
     style="width: 50px; height: 50px;">
  <i class="fab fa-facebook-f"></i>
</a>`}
        />
      </div>
    ),
    options: [
      "Use img tags",
      "Use flex + rounded-circle + fixed width/height",
      "Use Bootstrap card",
      "Use list-group",
    ],
    answer: "Use flex + rounded-circle + fixed width/height",
  },
  {
    question: (
      <div>
        <p>Which class keeps the navbar always visible at the top?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg fixed-top bg-light">
  <!-- content -->
</nav>`}
        />
      </div>
    ),
    options: ["sticky-top", "fixed-top", "navbar-fixed", "top-fixed"],
    answer: "fixed-top",
  },
  {
    question: (
      <div>
        <p>Can you smooth scroll to sections using only HTML?</p>
        <CodeBlock
          language="html"
          code={`<a href="#contact">Go to Contact</a>
<section id="contact">Contact Form</section>`}
        />
      </div>
    ),
    options: [
      "No, needs JavaScript",
      "Yes, modern browsers support smooth scrolling automatically",
      "Only with Bootstrap JS",
      "Only with onclick event",
    ],
    answer: "Yes, modern browsers support smooth scrolling automatically",
  },
  {
    question: (
      <div>
        <p>How to make a perfectly circular icon with Font Awesome?</p>
        <CodeBlock
          language="html"
          code={`<div class="d-inline-block rounded-circle bg-danger text-white d-flex align-items-center justify-content-center" 
     style="width: 40px; height: 40px;">
  <i class="fab fa-twitter"></i>
</div>`}
        />
      </div>
    ),
    options: [
      "Use rounded class only",
      "Use rounded-circle + equal width/height",
      "Use border-radius: 10px",
      "Use img tag instead",
    ],
    answer: "Use rounded-circle + equal width/height",
  },
  {
    question: (
      <div>
        <p>Where should the Font Awesome kit be placed?</p>
        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html>
<head>
  <script src="https://kit.fontawesome.com/your-kit-id.js" crossorigin="anonymous"></script>
  <!-- other head content -->
</head>
<body>
  <!-- content -->
</body>
</html>`}
        />
      </div>
    ),
    options: [
      "Before closing </body>",
      "Inside <head>",
      "After <body>",
      "In external CSS",
    ],
    answer: "Inside <head>",
  },
  {
    question: (
      <div>
        <p>What does <code>fixed-top</code> do to page content?</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar fixed-top">...</nav>
<div style="height: 100px;">Content below navbar</div>`}
        />
      </div>
    ),
    options: [
      "Content starts below navbar automatically",
      "Content overlaps navbar (need padding-top)",
      "Navbar disappears on scroll",
      "No effect on content",
    ],
    answer: "Content overlaps navbar (need padding-top)",
    // fixed-top removes element from flow → content jumps up
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "Why do we use Font Awesome instead of Bootstrap Icons in the Follow Us section?",
    options: [
      "Bootstrap Icons are paid",
      "Bootstrap doesn't have social media icons we need",
      "Font Awesome is faster",
      "Bootstrap Icons don't support colors",
    ],
    answer: "Bootstrap doesn't have social media icons we need",
  },
  {
    question: "Where should you paste the Font Awesome Kit code?",
    options: [
      "In the body tag",
      "Inside <head> tag",
      "Before closing </body>",
      "In a CSS file",
    ],
    answer: "Inside <head> tag",
  },
  {
    question: "How do you make a social icon perfectly circular?",
    options: [
      "Use border-radius: 50% and equal width/height",
      "Use class=\"rounded\"",
      "Add circle class",
      "Use shape-outside",
    ],
    answer: "Use border-radius: 50% and equal width/height",
  },
  {
    question: "Which class pins an element to the bottom of the viewport?",
    options: ["sticky-bottom", "fixed-bottom", "bottom-fixed", "position-bottom"],
    answer: "fixed-bottom",
  },
  {
    question: "What is required to use Font Awesome brand icons like Facebook, Twitter?",
    options: [
      "Only <i class=\"fa fa-facebook\">",
      "<i class=\"fab fa-facebook\"> (fab prefix)",
      "<i class=\"fas fa-facebook\">",
      "SVG code only",
    ],
    answer: "<i class=\"fab fa-facebook\"> (fab prefix)",
  },
];

const Followus_More_Styles_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } = useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  // Check if subtopic is already completed
  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      // Validate that we have the required parameters
      if (!subtopicId) {
        console.error("❌ Subtopic ID is required");
        alert("Error: Subtopic ID is missing");
        return;
      }

      console.log("🎯 Marking subtopic complete:", {
        subtopicId,
        goalName,
        courseName
      });

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        console.log("✅ MCQ successfully marked as completed");

        // Call the parent completion handler if provided
        if (onComplete) {
          onComplete();
        }
      } else {
        console.error("❌ Failed to mark MCQ complete:", result.message);
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Failed to mark MCQ complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MCQLogic
      title="Follow Us Section & More Styling - Font Awesome, Links, Fixed Position MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default Followus_More_Styles_MCQ;
