import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>What color will the paragraph be?</p>
        <CodeBlock
          language="html"
          code={`<p class="text" id="title" style="color: green;">Hello</p>`}
        />
        <CodeBlock
          language="css"
          code={`
p { color: blue; }
.text { color: red; }
#title { color: purple; }
`}
        />
      </div>
    ),
    options: ["Blue", "Red", "Purple", "Green"],
    answer: "Green", // Inline style has highest specificity
  },
  {
    question: (
      <div>
        <p>Which rule wins due to specificity?</p>
        <CodeBlock
          language="css"
          code={`
.warning { color: orange; }
p { color: gray; }
`}
        />
        <CodeBlock language="html" code={`<p class="warning">Alert!</p>`} />
      </div>
    ),
    options: [
      "p selector",
      ".warning selector",
      "Both applied",
      "No color",
    ],
    answer: ".warning selector", // Class > Type
  },
  {
    question: (
      <div>
        <p>What color will this text be?</p>
        <CodeBlock
          language="css"
          code={`
#unique { color: blue; }
.special { color: red; }
`}
        />
        <CodeBlock
          language="html"
          code={`<p id="unique" class="special">Text</p>`}
        />
      </div>
    ),
    options: ["Red", "Blue", "Purple", "Black"],
    answer: "Blue", // ID > Class
  },
  {
    question: (
      <div>
        <p>Which color is applied last?</p>
        <CodeBlock
          language="css"
          code={`
.text-red { color: red; }
.text-blue { color: blue; }
`}
        />
        <CodeBlock
          language="html"
          code={`<p class="text-red text-blue">Final Color?</p>`}
        />
      </div>
    ),
    options: ["Red", "Blue", "Both", "None"],
    answer: "Blue", // Same specificity → cascade
  },
  {
    question: (
      <div>
        <p>Only way to override this without !important?</p>
        <CodeBlock
          language="css"
          code={`
#header { color: white !important; }
`}
        />
      </div>
    ),
    options: [
      "Use a class",
      "Use inline style",
      "Use another !important",
      "Impossible",
    ],
    answer: "Use another !important",
  },
  {
    question: (
      <div>
        <p>Why should you avoid inline styles?</p>
        <CodeBlock
          language="html"
          code={`<div style="font-size: 20px; color: red; margin: 10px;">
  Hard to maintain
</div>`}
        />
      </div>
    ),
    options: [
      "They are reusable",
      "They reduce readability and are not reusable",
      "They have low specificity",
      "They don't work in Bootstrap",
    ],
    answer: "They reduce readability and are not reusable",
  },
  {
    question: (
      <div>
        <p>Which rule is applied due to cascade (source order)?</p>
        <CodeBlock
          language="css"
          code={`
.make-green { color: green; }
.make-yellow { color: yellow; }
.make-green { color: orange; }
`}
        />
        <CodeBlock
          language="html"
          code={`<p class="make-green make-yellow">Color?</p>`}
        />
      </div>
    ),
    options: ["Green", "Yellow", "Orange", "Black"],
    answer: "Orange", // Last declaration wins
  },
  {
    question: (
      <div>
        <p>What happens when !important is used?</p>
        <CodeBlock
          language="css"
          code={`
p { color: red !important; }
#title { color: blue; }
`}
        />
        <CodeBlock language="html" code={`<p id="title">Text</p>`} />
      </div>
    ),
    options: [
      "Blue",
      "Red",
      "No color",
      "Both applied",
    ],
    answer: "Red",
  },
  {
    question: (
      <div>
        <p>Which selector has higher specificity?</p>
        <CodeBlock
          language="css"
          code={`
h1 { color: black; }
.title { color: gold; }
`}
        />
        <CodeBlock language="html" code={`<h1 class="title">Heading</h1>`} />
      </div>
    ),
    options: [
      "h1 (type selector)",
      ".title (class selector)",
      "Both same",
      "No style",
    ],
    answer: ".title (class selector)",
  },
  {
    question: (
      <div>
        <p>Which rule is ignored due to specificity?</p>
        <CodeBlock
          language="css"
          code={`
div { padding: 10px; }
.container { padding: 20px; }
#main { padding: 30px; }
`}
        />
        <CodeBlock
          language="html"
          code={`<div id="main" class="container">Box</div>`}
        />
      </div>
    ),
    options: [
      "div rule",
      "container rule",
      "main rule",
      "All applied",
    ],
    answer: "main rule",
  },

  {
    question: "Which selector has the highest specificity?",
    options: ["Type Selector", "Class Selector", "ID Selector", "Inline Style"],
    answer: "Inline Style",
  },
  {
    question: "When two rules have equal specificity, which one is applied?",
    options: ["The first rule", "The last rule", "Both", "Neither"],
    answer: "The last rule",
  },
  {
    question:
      "Which property overrides all other selectors except another !important?",
    options: [
      "ID Selector",
      "Class Selector",
      "Inline Style",
      "!important property",
    ],
    answer: "!important property",
  },
  {
    question:
      "What is the correct order of specificity from lowest to highest?",
    options: [
      "ID → Class → Type",
      "Type → Class → ID → Inline",
      "Inline → Type → Class → ID",
      "Class → ID → Type → Inline",
    ],
    answer: "Type → Class → ID → Inline",
  },
  {
    question: "Which of the following is true about CSS cascade?",
    options: [
      "Only specificity matters",
      "Source order matters only when specificity is equal",
      "Inline styles are always ignored",
      "!important is ignored by browsers",
    ],
    answer: "Source order matters only when specificity is equal",
  },
];

const Css_Specificity_Cascade_MCQ = ({
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
      title="CSS Specificity & Cascade - MCQs"
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

export default Css_Specificity_Cascade_MCQ;
