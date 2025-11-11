import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>
          Why do we use Font Awesome instead of Bootstrap Icons in the Follow Us
          section?
        </p>
      </div>
    ),
    options: [
      "Bootstrap Icons are paid",
      "Bootstrap doesn't have social media icons we need",
      "Font Awesome is faster",
      "Bootstrap Icons don't support colors",
    ],
    answer: "Bootstrap doesn't have social media icons we need",
  },
  {
    question: (
      <div>
        <p>Where should you paste the Font Awesome Kit code?</p>
      </div>
    ),
    options: [
      "In the body tag",
      "Inside &lt;head&gt; tag",
      "Before closing &lt;/body&gt;",
      "In a CSS file",
    ],
    answer: "Inside &lt;head&gt; tag",
  },
  {
    question: (
      <div>
        <p>How do you make a social icon perfectly circular?</p>
      </div>
    ),
    options: [
      "Use border-radius: 50% and equal width/height",
      "Use class=&quot;rounded&quot;",
      "Add circle class",
      "Use shape-outside",
    ],
    answer: "Use border-radius: 50% and equal width/height",
  },
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
      "Use href=&quot;#follow-us&quot; and id=&quot;follow-us&quot;",
      "Use name=&quot;follow-us&quot;",
      "Use data-target",
      "Not possible with HTML only",
    ],
    answer: "Use href=&quot;#follow-us&quot; and id=&quot;follow-us&quot;",
  },
  {
    question: (
      <div>
        <p>Correct Font Awesome icon class for Instagram?</p>
        <CodeBlock language="html" code={`<i class="fab fa-instagram"></i>`} />
      </div>
    ),
    options: [
      "&lt;i class=&quot;fa fa-instagram&quot;&gt;",
      "&lt;i class=&quot;fab fa-instagram&quot;&gt;",
      "&lt;i class=&quot;bi bi-instagram&quot;&gt;",
      "&lt;svg instagram&gt;",
    ],
    answer: "&lt;i class=&quot;fab fa-instagram&quot;&gt;",
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
];

const Followus_More_Styles_MCQ = ({ subtopicId, goalName, courseName }) => {
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
      title="Follow Us Section & More Styling - Font Awesome, Links, Fixed Position MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      onComplete={handleCompletion}
    />
  );
};

export default Followus_More_Styles_MCQ;
