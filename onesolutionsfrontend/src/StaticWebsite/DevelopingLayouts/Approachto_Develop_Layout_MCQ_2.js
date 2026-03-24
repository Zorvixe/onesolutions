import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // 10 Code Block Questions

  {
    question: (
      <div>
        <p>Is this image part of the content?</p>
        <CodeBlock language="html" code={`<img src="image.jpg" alt="Sample Image" />`} />
      </div>
    ),
    options: ["Yes", "No", "Only for styling", "Cannot say"],
    answer: "Yes",
  },
  {
    question: (
      <div>
        <p>What is this image used for?</p>
        <CodeBlock
          language="css"
          code={`.hero { background-image: url("bg.jpg"); }`}
        />
      </div>
    ),
    options: [
      "Content image",
      "Background image",
      "Inline image",
      "Icon image",
    ],
    answer: "Background image",
  },
  {
    question: (
      <div>
        <p>Where will the padding space be added?</p>
        <CodeBlock
          language="css"
          code={`.box { padding: 20px; border: 1px solid; }`}
        />
      </div>
    ),
    options: [
      "Outside border",
      "Inside border around content",
      "Between elements",
      "No space",
    ],
    answer: "Inside border around content",
  },
  {
    question: (
      <div>
        <p>Where will the margin space be applied?</p>
        <CodeBlock
          language="css"
          code={`.box { margin: 20px; border: 1px solid; }`}
        />
      </div>
    ),
    options: [
      "Inside border",
      "Outside the element",
      "Inside content",
      "No space",
    ],
    answer: "Outside the element",
  },
  {
    question: (
      <div>
        <p>Will background color cover padding?</p>
        <CodeBlock
          language="css"
          code={`.box { background-color: yellow; padding: 20px; }`}
        />
      </div>
    ),
    options: ["Yes", "No", "Only border area", "Only margin"],
    answer: "Yes",
  },
  {
    question: (
      <div>
        <p>What will this background-size do?</p>
        <CodeBlock
          language="css"
          code={`.hero { background-size: cover; }`}
        />
      </div>
    ),
    options: [
      "Image repeats",
      "Image fits with empty space",
      "Image covers entire container",
      "Image disappears",
    ],
    answer: "Image covers entire container",
  },
  {
    question: (
      <div>
        <p>What happens with this property?</p>
        <CodeBlock
          language="css"
          code={`.bg { background-repeat: no-repeat; }`}
        />
      </div>
    ),
    options: [
      "Image repeats",
      "Image shows only once",
      "Image disappears",
      "Image stretches",
    ],
    answer: "Image shows only once",
  },
  {
    question: (
      <div>
        <p>Which image is better for hero section?</p>
        <CodeBlock
          language="css"
          code={`.hero { background-image: url("bg.jpg"); }`}
        />
      </div>
    ),
    options: [
      "HTML image",
      "CSS background image",
      "Both same",
      "None",
    ],
    answer: "CSS background image",
  },
  {
    question: (
      <div>
        <p>What will happen to spacing between two boxes?</p>
        <CodeBlock
          language="css"
          code={`.box { margin: 20px; }`}
        />
        <CodeBlock
          language="html"
          code={`<div class="box"></div><div class="box"></div>`}
        />
      </div>
    ),
    options: [
      "Boxes overlap",
      "20px space between boxes",
      "Padding applied",
      "No space",
    ],
    answer: "20px space between boxes",
  },
  {
    question: (
      <div>
        <p>Which area increases element size?</p>
        <CodeBlock
          language="css"
          code={`.box { padding: 20px; }`}
        />
      </div>
    ),
    options: [
      "Margin",
      "Padding",
      "Border",
      "None",
    ],
    answer: "Padding",
  },

  // 5 Normal Questions

  {
    question:
      "The HTML <img> element is used to add images that are part of the content.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "Which property adds space between content and border?",
    options: ["margin", "padding", "border", "spacing"],
    answer: "padding",
  },
  {
    question:
      "Which property adds space between elements?",
    options: ["padding", "margin", "border", "width"],
    answer: "margin",
  },
  {
    question:
      "Which background-size value is best for hero sections?",
    options: ["contain", "cover", "auto", "repeat"],
    answer: "cover",
  },
  {
    question:
      "When should you use CSS background image?",
    options: [
      "When image is content",
      "When text is over image",
      "Only for icons",
      "Never",
    ],
    answer: "When text is over image",
  },
];

const Approachto_Develop_Layout_MCQ_2 = ({
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
      title="Approach to Develop Layout - MCQs"
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

export default Approachto_Develop_Layout_MCQ_2;
