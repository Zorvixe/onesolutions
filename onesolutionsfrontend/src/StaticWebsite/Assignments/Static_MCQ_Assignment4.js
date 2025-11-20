import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 CodeBlock Questions – Website Integration (All Subtopics) ==========
  {
    question: (
      <div>
        <p>What happens when you click this button?</p>
        <CodeBlock language="html" code={`<button class="btn btn-primary" onclick="display('sectionHome')">
  Go Home
</button>`} />
      </div>
    ),
    options: ["Page reloads", "Shows section with id='sectionHome'", "Opens link", "Nothing happens"],
    answer: "Shows section with id='sectionHome'",
  },
  {
    question: (
      <div>
        <p>Why does this image link work?</p>
        <CodeBlock language="html" code={`<a href="https://www.ccbp.in/" target="_blank">
  <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/learn-technologies-img.png" />
</a>`} />
      </div>
    ),
    options: ["Because img is inside anchor", "Because of target='_blank'", "Because of alt text", "Only text can be links"],
    answer: "Because img is inside anchor",
  },
  {
    question: (
      <div>
        <p>What does this CCBP UI Kit setup do?</p>
        <CodeBlock language="html" code={`<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="sectionAbout">About</div>
    <script type="text/javascript" src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/js/ccbp-ui-kit.js"></script>
  </body>
</html>`} />
      </div>
    ),
    options: ["Enables display('sectionAbout')", "Adds Bootstrap", "Loads jQuery", "Breaks the page"],
    answer: "Enables display('sectionAbout')",
  },
  {
    question: (
      <div>
        <p>Which section will be shown?</p>
        <CodeBlock language="html" code={`<button onclick="display('sectionGallery')">Gallery</button>
<button onclick="display('sectionContact')">Contact</button>`} />
      </div>
    ),
    options: ["Both at once", "Only the first one", "Depends on which button clicked", "None"],
    answer: "Depends on which button clicked",
  },
  {
    question: (
      <div>
        <p>What is required for CCBP UI Kit to work?</p>
        <CodeBlock language="html" code={`<div id="sectionHome" class="section">
  <h1>Welcome</h1>
</div>`} />
      </div>
    ),
    options: ["id must start with 'section'", "class must be 'container'", "Must use Bootstrap", "No requirement"],
    answer: "id must start with 'section'",
  },
  {
    question: (
      <div>
        <p>How to open a link in new tab?</p>
        <CodeBlock language="html" code={`<a href="https://cloudinary.com/" target="_blank" rel="noopener">
  Upload Image
</a>`} />
      </div>
    ),
    options: ["target='_blank'", "rel='noopener'", "Both are needed", "Only href"],
    answer: "Both are needed",
  },
  {
    question: (
      <div>
        <p>Where should CCBP UI Kit script be placed?</p>
        <CodeBlock language="html" code={`<body>
  <!-- content -->
  <script src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/js/ccbp-ui-kit.js"></script>
</body>`} />
      </div>
    ),
    options: ["In head", "Before body", "Just before closing body tag", "Anywhere"],
    answer: "Just before closing body tag",
  },
  {
    question: (
      <div>
        <p>How to navigate to a section on the same page?</p>
        <CodeBlock language="html" code={`<a href="#sectionServices">Go to Services</a>
<div id="sectionServices">Our Services</div>`} />
      </div>
    ),
    options: ["Use onclick", "Use #id in href", "Use display()", "Use target"],
    answer: "Use #id in href",
  },
  {
    question: (
      <div>
        <p>What happens if you click this image?</p>
        <CodeBlock language="html" code={`<a href="https://ccbp.in/" target="_blank">
  <img src="ccbp-logo.png" alt="CCBP Logo">
</a>`} />
      </div>
    ),
    options: ["Image zooms", "Opens CCBP in new tab", "Downloads image", "Nothing"],
    answer: "Opens CCBP in new tab",
  },
  {
    question: (
      <div>
        <p>Why is this button safe for external links?</p>
        <CodeBlock language="html" code={`<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit Site
</a>`} />
      </div>
    ),
    options: ["Because of href", "Because of target", "Because of rel='noopener noreferrer'", "Because it's a button"],
    answer: "Because of rel='noopener noreferrer'",
  },

  // ========== 5 Classic MCQs – Website Integration ==========
  {
    question: "The display() function is provided by which script?",
    options: ["Bootstrap", "jQuery", "CCBP UI Kit", "Custom JS file"],
    answer: "CCBP UI Kit",
  },
  {
    question: "To navigate within the same page, use #sectionName in href and matching id on the section.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question: "Which attribute makes a link open in a new tab safely?",
    options: ["target='_blank'", "rel='noopener'", "Both target='_blank' and rel='noopener'", "href='_blank'"],
    answer: "Both target='_blank' and rel='noopener'",
  },
  {
    question: "Where should the CCBP UI Kit script be placed in the HTML file?",
    options: ["Inside <head>", "At the top of <body>", "Just before closing </body>", "After </html>"],
    answer: "Just before closing </body>",
  },
  {
    question: "What must the id of a section start with to work with CCBP UI Kit's display()?",
    options: ["id", "section", "div", "container"],
    answer: "section",
  },
];

const Static_MCQ_Assignment4 = ({
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
      title="Static MCQ Assignment 4"
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

export default Static_MCQ_Assignment4;