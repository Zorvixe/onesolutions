import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions
  {
    question: (
      <div>
        <p>What does this HTML create?</p>
        <CodeBlock
          language="html"
          code={`<a href="https://ccbp.in">Visit CCBP</a>`}
        />
      </div>
    ),
    options: ["A paragraph", "A heading", "A clickable hyperlink", "An image"],
    answer: "A clickable hyperlink",
  },
  {
    question: (
      <div>
        <p>Where will this link open?</p>
        <CodeBlock
          language="html"
          code={`<a href="about.html" target="_blank">About Us</a>`}
        />
      </div>
    ),
    options: ["Same tab", "New tab", "Same page section", "Downloads a file"],
    answer: "New tab",
  },
  {
    question: (
      <div>
        <p>Clicking this link will scroll to which section?</p>
        <CodeBlock
          language="html"
          code={`<a href="#contactSection">Contact</a>`}
        />
        <CodeBlock
          language="html"
          code={`<div id="contactSection">Contact Form Here</div>`}
        />
      </div>
    ),
    options: [
      "Top of page",
      "Contact section on same page",
      "New page",
      "No action",
    ],
    answer: "Contact section on same page",
  },
  {
    question: (
      <div>
        <p>What happens when this image is clicked?</p>
        <CodeBlock
          language="html"
          code={`<a href="gallery.html">
  <img src="tajmahal.jpg" alt="Taj Mahal">
</a>`}
        />
      </div>
    ),
    options: [
      "Image enlarges",
      "Goes to gallery.html",
      "Image downloads",
      "No action",
    ],
    answer: "Goes to gallery.html",
  },
  {
    question: (
      <div>
        <p>What does this element do in the content?</p>
        <CodeBlock language="html" code={`Line one<br>Line two`} />
      </div>
    ),
    options: [
      "Adds bold text",
      "Creates a new paragraph",
      "Breaks to next line",
      "Adds space",
    ],
    answer: "Breaks to next line",
  },
  {
    question: (
      <div>
        <p>What will this insert between sections?</p>
        <CodeBlock language="html" code={`<hr>`} />
      </div>
    ),
    options: ["Vertical line", "Horizontal line", "Blank space", "Dotted line"],
    answer: "Horizontal line",
  },
  {
    question: (
      <div>
        <p>Which attribute defines the destination of a hyperlink?</p>
        <CodeBlock
          language="html"
          code={`<a href="https://example.com">Example</a>`}
        />
      </div>
    ),
    options: ["src", "target", "href", "link"],
    answer: "href",
  },
  {
    question: (
      <div>
        <p>What does <code>target="_self"</code> do in this link?</p>
        <CodeBlock
          language="html"
          code={`<a href="home.html" target="_self">Home</a>`}
        />
      </div>
    ),
    options: [
      "Opens in new tab",
      "Opens in same tab (default)",
      "Opens in parent frame",
      "Downloads the file",
    ],
    answer: "Opens in same tab (default)",
  },
  {
    question: (
      <div>
        <p>How do you link to the top of the page?</p>
        <CodeBlock
          language="html"
          code={`<a href="#">Back to Top</a>`}
        />
      </div>
    ),
    options: [
      "Links to a file",
      "Links to top of current page",
      "Does nothing",
      "Links to external site",
    ],
    answer: "Links to top of current page",
  },
  {
    question: (
      <div>
        <p>What is the result of wrapping this image in an anchor?</p>
        <CodeBlock
          language="html"
          code={`<a href="details.html">
  <img src="place.jpg" alt="Place">
</a>`}
        />
      </div>
    ),
    options: [
      "Image becomes non-clickable",
      "Image links to details.html",
      "Image gets a border",
      "Image is hidden",
    ],
    answer: "Image links to details.html",
  },

  // 5 Normal (Non-CodeBlock) Questions
  {
    question: "What is the purpose of an HTML a (anchor) element?",
    options: [
      "To create a paragraph.",
      "To create a heading.",
      "To create a hyperlink.",
      "To create an image.",
    ],
    answer: "To create a hyperlink.",
  },
  {
    question:
      "HTML hyperlinks can be used to navigate within the same document.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "Which HTML element is used to insert a horizontal line to separate content?",
    options: ["<br>", "<hr>", "<div>", "<p>"],
    answer: "<hr>",
  },
  {
    question: "Which attribute specifies where to open the linked document?",
    options: ["href", "src", "target", "id"],
    answer: "target",
  },
  {
    question:
      "What value of the <code>href</code> attribute links to an element with id 'services' on the same page?",
    options: ["services.html", "#services", "services", "/#services"],
    answer: "#services",
  },
];
const HTML_HyperLinks_MCQ = ({
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
      title="HTML Hyperlinks - MCQs"
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

export default HTML_HyperLinks_MCQ;
