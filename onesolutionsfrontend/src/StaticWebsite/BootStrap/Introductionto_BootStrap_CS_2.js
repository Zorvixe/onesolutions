import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const Introductionto_BootStrap_CS_2 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});

  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (questionId, option) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
      } else {
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      alert("Error marking as complete.");
    } finally {
      setIsLoading(false);
    }
  };

  /* MCQ DATA - Bootstrap Flexbox */
  const mcqs = [
    {
      id: "flex_container",
      section: "Flexbox Container",
      question: "Which Bootstrap class name defines a Flexbox Container?",
      options: ["flex", "d-flex", "flexbox-container", "flexbox"],
      answer: "d-flex",
      explanation:
        "The class `d-flex` turns an element into a flex container, enabling flexbox layout for its direct children.",
    },
    {
      id: "flex_direction_horizontal",
      section: "Flex Direction",
      question:
        "Which Bootstrap class name will move the flex items horizontally?",
      options: ["flex-vertical", "flex-horizontal", "flex-column", "flex-row"],
      answer: "flex-row",
      explanation:
        "`flex-row` is the default direction in Bootstrap flexbox and arranges items horizontally from left to right.",
    },
    {
      id: "justify_content_start",
      section: "Justify Content",
      question:
        "Which Bootstrap class aligns the flex items at the start of a Flexbox Container?",
      options: [
        "justify-content-center",
        "justify-content-end",
        "justify-content-start",
        "justify-content-between",
      ],
      answer: "justify-content-start",
      explanation:
        "`justify-content-start` packs flex items toward the start of the main axis (left for row, top for column).",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Introduction to Bootstrap | Cheat Sheet | Part 2</h1>

      {/* 1. Flexbox Container */}

      <section>
        <h2>1. Flexbox Container</h2>
        <p>
          The Bootstrap class <code>d-flex</code> defines a Flexbox Container.
          The direct HTML elements in the Flexbox Container are called{" "}
          <b> flex items</b>.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="d-flex">
  <div>
    <h1>Explore Paradise</h1>
    <p>Discover the world's most beautiful destinations and create unforgettable memories</p>
    <button>Explore Places</button>
  </div>
</div>`}
        />

        <ul>
          <li>
            The HTML container element with the <code>class="d-flex"</code> is a
            Flexbox Container.
          </li>
          <li>
            The HTML container element div in Flexbox Container is a flex item.
            Because it is directly inside the Flexbox Container.
          </li>
          <li>
            The HTML main heading, paragraph, and button elements are not flex
            items. Because these elements are not directly inside the Flexbox
            Container.
          </li>
        </ul>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Wrapping HTML elements in the Flexbox Container is mandatory to
            apply other flex properties.
          </p>
        </div>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 2. Flex Direction */}

      <section>
        <h2>2. Flex Direction</h2>

        <p>
          The Flex Direction specifies the direction of the flex items in the
          Flexbox Container.
        </p>
        <p>
          Flex Direction controls the main axis along which flex items are
          placed in the container.
        </p>

        <table style={{ width: "70%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>Left → Right (Horizontal)</td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>Top → Bottom (Vertical)</td>
            </tr>
          </tbody>
        </table>

        <h3>2.1 flex-row (Default)</h3>
        <p>
          The Bootstrap class name <code>flex-row</code> is used to move the
          flex items <b>horizontally</b> in the Flexbox Container.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <h3>2.2 flex-column</h3>
        <p>
          The Bootstrap class name <code>flex-column</code> is used to move the
          flex items <b>vertically</b> in the Flexbox Container.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The Bootstrap class name <b>flex-row</b> is the default Flex
            Direction for the Flexbox Container. So, once <b>d-flex</b> is
            specified, all the flex items in the Flexbox Container display
            horizontally.
          </p>
        </div>

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 3. Justify Content */}

      <section>
        <h2>3. Justify Content</h2>
        <p>
          The justify-content property specifies the alignment of flex items
          along the Flex Direction in a Flexbox Container.
        </p>
        <p>
          <b>justify-content</b> classes distribute items along the{" "}
          <strong>main axis</strong> (horizontal in row, vertical in column).
        </p>

        <h4>3.1 justify-content-start</h4>
        <p>
          The Bootstrap class name <code>justify-content-start</code> is used to
          align the flex items at the start of the Flexbox Container either
          horizontally or vertically based on the Flex Direction.
        </p>
        <table style={{ width: "80%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Flex Direction</th>
              <th>Alignment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>Items align horizontally to the left</td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>Items align vertically to the top</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column justify-content-start">
  <div>
    <h1>Explore Paradise</h1>
    <p>Discover the world's most beautiful destinations and create unforgettable memories</p>
    <button>Explore Places</button>
  </div>
</div>`}
        />

        <h4>3.2 justify-content-center</h4>
        <p>
          The Bootstrap class name <code>justify-content-center</code> is used
          to align the flex items at the center of the Flexbox Container either
          horizontally or vertically based on the Flex Direction.
        </p>

        <table style={{ width: "80%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Flex Direction</th>
              <th>Alignment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>Items move horizontally to the center</td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>Items move vertically to the center</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column justify-content-center">
  <div>
    <h1>Explore Paradise</h1>
    <p>Discover the world's most beautiful destinations and create unforgettable memories</p>
    <button>Explore Places</button>
  </div>
</div>`}
        />

        <h4>3.3 justify-content-end</h4>
        <p>
          The Bootstrap class name <code>justify-content-end</code> is used to
          align the flex items at the end of the Flexbox Container either
          horizontally or vertically based on the Flex Direction.
        </p>

        <table style={{ width: "80%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Flex Direction</th>
              <th>Alignment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>Items align horizontally to the right</td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>Items align vertically to the bottom</td>
            </tr>
          </tbody>
        </table>
        {/* <table className="cheat-table">
  <thead>
    <tr>
      <th>Flex Direction</th>
      <th>Alignment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>flex-row</td>
      <td>Items align horizontally to the right</td>
    </tr>
    <tr>
      <td>flex-column</td>
      <td>Items align vertically to the bottom</td>
    </tr>
  </tbody>
</table> */}

        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column justify-content-end">
  <div>
    <h1>Explore Paradise</h1>
    <p>Discover the world's most beautiful destinations and create unforgettable memories</p>
    <button>Explore Places</button>
  </div>
</div>`}
        />

        <h4>3.4 justify-content-between</h4>
        <p>
          The Bootstrap class name <code>justify-content-between</code> is used
          to provide equal space between the flex items within the Flexbox
          Container, aligning them either horizontally or vertically based on
          the Flex Direction.
        </p>

        <table style={{ width: "80%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Flex Direction</th>
              <th>Alignment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>flex-row</td>
              <td>Equal space between items horizontally</td>
            </tr>
            <tr>
              <td>flex-column</td>
              <td>Equal space between items vertically</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="html"
          code={`<div class="d-flex flex-column justify-content-between">
  <div>
    <h1>Explore Paradise</h1>
    <p>Discover the world's most beautiful destinations and create unforgettable memories</p>
    <button>Explore Places</button>
  </div>
</div>`}
        />

        {/* MCQ */}
        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* Continue Button */}

      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

/*    REUSABLE MCQ COMPONENT (Same as Part 1) */
const MCQBlock = ({ mcq, answers, onAnswer }) => {
  const userAnswer = answers[mcq.id];
  const isCorrect = userAnswer === mcq.answer;

  return (
    <div className="mcq-container">
      <h3 className="mcq-title">Quiz: {mcq.section}</h3>

      <p className="mcq-question">{mcq.question}</p>

      {mcq.options.map((option) => {
        const active = userAnswer === option;
        const correct = active && isCorrect;
        const wrong = active && !isCorrect;

        return (
          <label
            key={option}
            className={`mcq-option ${
              correct ? "selected-correct" : wrong ? "selected-wrong" : ""
            }`}
          >
            <input
              type="radio"
              name={mcq.id}
              checked={active}
              onChange={() => onAnswer(mcq.id, option)}
              style={{ marginRight: "8px" }}
            />
            <code>{option}</code>
          </label>
        );
      })}

      {userAnswer && (
        <div className={`mcq-result ${isCorrect ? "correct" : "wrong"}`}>
          {isCorrect ? "Correct!" : `Wrong. Correct: ${mcq.answer}`}
          <p>
            <strong>Explanation:</strong> {mcq.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Introductionto_BootStrap_CS_2;
