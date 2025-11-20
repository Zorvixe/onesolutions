import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ========== 10 Code Block Questions ==========
  {
    question: (
      <div>
        <p>
          Which container should be used inside a Navbar for proper alignment?
        </p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <!-- nav items -->
  </div>
</nav>`}
        />
      </div>
    ),
    options: [
      "container only",
      "container-fluid only",
      "Either works the same",
      "No container needed",
    ],
    answer: "container-fluid only",
  },
  {
    question: (
      <div>
        <p>What will this banner background look like?</p>
        <CodeBlock
          language="html"
          code={`<section class="bg-primary text-white py-5">
  <div class="container">
    <h1>Welcome</h1>
  </div>
</section>`}
        />
      </div>
    ),
    options: [
      "Transparent background",
      "Blue background with padding",
      "No background",
      "White background",
    ],
    answer: "Blue background with padding",
  },
  {
    question: (
      <div>
        <p>
          Why use <code>container-fluid</code> in this hero section?
        </p>
        <CodeBlock
          language="html"
          code={`<div class="bg-image vh-100">
  <div class="container-fluid h-100 d-flex align-items-center">
    <div class="container">
      <h1>Full Width Banner</h1>
    </div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "To add side margins",
      "To make outer div full width",
      "To center text",
      "To reduce width",
    ],
    answer: "To make outer div full width",
  },
  {
    question: (
      <div>
        <p>Which class makes this overlay transparent?</p>
        <CodeBlock
          language="html"
          code={`<div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>`}
        />
        <CodeBlock language="html" code={`<!-- Alternative -->`} />
        <CodeBlock
          language="html"
          code={`<div class="bg-transparent">No overlay</div>`}
        />
      </div>
    ),
    options: ["bg-dark", "opacity-50", "bg-transparent", "position-absolute"],
    answer: "bg-transparent",
  },
  {
    question: (
      <div>
        <p>Best practice for a full-width banner with centered content?</p>
        <CodeBlock
          language="html"
          code={`<section class="bg-light py-5">
  <div class="container-fluid bg-primary text-white">
    <div class="container text-center">
      <h1>Centered in Full Width</h1>
    </div>
  </div>
</section>`}
        />
      </div>
    ),
    options: [
      "Use container everywhere",
      "Use container-fluid outer + container inner",
      "Use only container-fluid",
      "No container needed",
    ],
    answer: "Use container-fluid outer + container inner",
  },
  {
    question: (
      <div>
        <p>
          What max-width does <code>container</code> have on Medium devices (
          &gt;=768px )?
        </p>

        <CodeBlock language="html" code={`<!-- Medium: 720px max-width -->`} />
      </div>
    ),
    options: ["540px", "720px", "960px", "1140px"],
    answer: "720px",
  },
  {
    question: (
      <div>
        <p>What does this structure do for responsive spacing?</p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-12">Content with side spacing</div>
  </div>
</div>`}
        />
      </div>
    ),
    options: [
      "Full width, no spacing",
      "Fixed width with automatic left/right spacing",
      "Only centers content",
      "Applies background color",
    ],
    answer: "Fixed width with automatic left/right spacing",
  },
  {
    question: (
      <div>
        <p>
          What happens when using <code>bg-transparent</code> on a section?
        </p>
        <CodeBlock
          language="html"
          code={`<section class="bg-transparent py-4">
  <div class="container">Content</div>
</section>`}
        />
      </div>
    ),
    options: [
      "White background",
      "No background (see through)",
      "Light gray background",
      "Dark background",
    ],
    answer: "No background (see through)",
  },
  {
    question: (
      <div>
        <p>Which container is used for full-width hero banners?</p>
        <CodeBlock
          language="html"
          code={`<header class="bg-dark text-white">
  <div class="container-fluid py-5 text-center">
    <h1>Full Width Hero</h1>
  </div>
</header>`}
        />
      </div>
    ),
    options: ["container", "container-fluid", "container-full", "No container"],
    answer: "container-fluid",
  },
  {
    question: (
      <div>
        <p>
          What is the max-width of <code>container</code> on Extra large devices
          ( &gt;=1200px )?
        </p>

        <CodeBlock language="html" code={`<!-- XL: 1140px -->`} />
      </div>
    ),
    options: ["960px", "1140px", "1320px", "100%"],
    answer: "1140px",
  },

  // ========== 5 Normal (Non-CodeBlock) Questions ==========
  {
    question: "What is the purpose of the Bootstrap `container` class?",
    options: [
      "Makes content full width",
      "Adds fixed max-width with left/right spacing",
      "Centers text only",
      "Adds background color",
    ],
    answer: "Adds fixed max-width with left/right spacing",
  },
  {
    question:
      "Which class creates a full-width container with no side spacing?",
    options: [
      "container",
      "container-fluid",
      "container-full",
      "container-wide",
    ],
    answer: "container-fluid",
  },
  {
    question: "What does the `bg-transparent` class do?",
    options: [
      "Makes text invisible",
      "Removes background color completely",
      "Adds white background",
      "Makes element disappear",
    ],
    answer: "Removes background color completely",
  },
  {
    question:
      "What max-width does `container` have on Large devices (>=992px)?",
    options: ["720px", "960px", "1140px", "100%"],
    answer: "960px",
  },
  {
    question: "What happens on Extra small devices (<576px) with `container`?",
    options: [
      "Fixed width of 540px",
      "Full width (100%)",
      "Width of 720px",
      "No width applied",
    ],
    answer: "Full width (100%)",
  },
];

const Banner_Section_MCQ = ({
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
      title="Banner Section - Navbar, Containers & Transparent Background MCQs"
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

export default Banner_Section_MCQ;
