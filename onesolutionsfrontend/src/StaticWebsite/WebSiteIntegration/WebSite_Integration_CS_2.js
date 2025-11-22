import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CodeBlock } from "../../CodeOutputBlocks";

const WebSite_Integration_CS_2 = ({
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
        alert("Failed to mark as complete.");
      }
    } catch (error) {
      alert("Error marking as complete.");
    } finally {
      setIsLoading(false);
    }
  };

  /*  MCQs — STRICT TOPIC ONLY */
  const mcqs = [
    {
      id: "golden_step",
      section: "Website Integration",
      question:
        "Which step is required to display the Detailed View Section when clicking the Golden Temple Card?",
      options: [
        "Add onclick to the Golden Temple Card",
        "Remove all ids",
        "Delete Favourite Places Section",
        "Add script inside head only",
      ],
      answer: "Add onclick to the Golden Temple Card",
      explanation:
        "To open a specific detailed view, you must add onclick with display('sectionName').",
    },
    {
      id: "unordered_list_tag",
      section: "Unordered List",
      question: "Which HTML tag is used to create an Unordered List?",
      options: ["<ul>", "<ol>", "<li>", "<u>"],
      answer: "<ul>",
      explanation:
        "The <ul> tag is used to create an unordered list. It wraps multiple <li> items.",
    },
    {
      id: "ordered_list_tag",
      section: "Ordered List",
      question: "Which HTML tag is used to create an Ordered List?",
      options: ["<ul>", "<ol>", "<li>", "<order>"],
      answer: "<ol>",
      explanation:
        "The <ol> tag defines an ordered list, which uses numbers by default.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Website Integration | Favourite Places Detailed View</h1>

      {/* 2. Website Integration */}
      <section>
        <h2>1. Website Integration</h2>

        <h3>1.1 Integration of Favourite Places and Detailed View Sections</h3>
        <p>
          To display the Detailed View Section when we click on the Golden
          Temple Card in the Favourite Places Section:
        </p>
        <div className="steps">
          <p>
            <b>Step-1:</b> Add the Section Container with a unique id.
          </p>
          <p>
            <b>Step-2:</b> Add the HTML code of the Golden Temple Detailed View
            Section.
          </p>
          <p>
            <b>Step-3:</b> Add an HTML <code>onclick</code> attribute to the
            <b> Golden Temple Card</b> in the Favourite Places Section.
          </p>
        </div>
        <p>
          To display the Favourite Places Section when we are in the Detailed
          View Section:
        </p>
        <div className="steps">
          <p>
            <b>Step-4:</b> Add an HTML <code>button</code> element in the
            Detailed View Section.
          </p>
          <p>
            <b>Step-5:</b> Add an HTML <code>onclick</code> attribute to the
            HTML button element.
          </p>
        </div>

        <CodeBlock
          language="html"
          code={`<div class="favourite-place-card-container d-flex flex-row"
  onclick="display('sectionGoldenTempleDetailedView')">
  <div>
    <h1 class="favourite-place-card-heading">Golden Temple</h1>
    <p class="favourite-place-card-description">
      Amritsar is world-famous for the beautiful and highly revered Golden Temple
    </p>
  </div>
  <img
    src="https://d2clawv67efefq.cloudfront.net/ccbp-static-website/golden-temple-img.png"
    class="favourite-place-card-image"
/>
</div>`}
        />
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            To use multiple Carousels in the same HTML document, we have to
            provide a unique id to each Carousel.
          </p>
          <p>
            So while adding a new Carousel, you need to change the id of the
            Carousel. Else, the Carousel controls don’t work.
          </p>
        </div>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>
      <section>
        <h2>2. HTML Lists</h2>

        <p>
          The List is a way to group related pieces of information so that they
          are easy to read and understand.
        </p>

        <p>For example, Shopping list, Todo list, etc.</p>

        <p>There are mainly two types of Lists available in HTML.</p>

        <ul>
          <li>Unordered List</li>
          <li>Ordered List</li>
        </ul>

        <h3>2.1 Unordered List</h3>

        <p>
          It is a collection of related items that have no special order or
          sequence.
        </p>

        <p>For example, List of Hobbies</p>

        <ul>
          <li>Painting</li>
          <li>Reading Books</li>
          <li>Playing the Guitar</li>
        </ul>

        <p>
          The Unordered List starts with the <code>&lt;ul&gt;</code> tag. It
          wraps around all the list items and each list item starts with the{" "}
          <code>&lt;li&gt;</code> tag.
        </p>

        <CodeBlock
          language="html"
          code={`<ul>
  <li>Painting</li>
  <li>Reading Books</li>
  <li>Playing the Guitar</li>
</ul>`}
        />

        <p>
          By default, list items in the Unordered List are marked with bullets.
        </p>

        <h3>2.1.1 Styling Unordered List</h3>

        <p>
          The CSS <code>list-style-type</code> property is used to style the
          List.
        </p>

        <CodeBlock
          language="css"
          code={`.unordered-square-list {
  list-style-type: square;
}`}
        />

        <p>
          You can use one of the below values of the CSS{" "}
          <code>list-style-type</code> property to style the Unordered List.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "20%" }}>
          <thead>
            <tr>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>square</td>
            </tr>
            <tr>
              <td>circle</td>
            </tr>
            <tr>
              <td>disc</td>
            </tr>
            <tr>
              <td>none</td>
            </tr>
          </tbody>
        </table>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Ensure there are no spelling mistakes in the value of the{" "}
            <b>list-style-type</b> property. Incorrect values will disable the
            required styling.
          </p>
        </div>

        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>
      <section>
        <h3>2.2 Ordered List</h3>

        <p>
          It is a collection of related items that follow some order or have a
          sequence.
        </p>

        <p>For example, Web Technologies</p>

        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>

        <p>
          The Ordered List starts with the <code>&lt;ol&gt;</code> tag. It wraps
          around all the list items and each list item starts with the{" "}
          <code>&lt;li&gt;</code> tag.
        </p>

        <CodeBlock
          language="html"
          code={`<ol>
  <li>Go through the HTML elements and CSS properties</li>
  <li>Complete the Todolist Coding Practice</li>
  <li>Go through the Bootstrap Concepts</li>
  <li>Read the Bootstrap cheat sheet</li>
  <li>Build a Tourism Website</li>
</ol>`}
        />

        <p>
          By default, list items in the Ordered List are marked with numbers.
        </p>

        <h3>3.2.1 Styling Ordered List</h3>

        <p>
          The CSS <code>list-style-type</code> property is used to style the
          List.
        </p>

        <CodeBlock
          language="css"
          code={`.ordered-lower-roman-list {
  list-style-type: lower-roman;
}`}
        />

        <p>
          You can use one of the below values of the CSS{" "}
          <code>list-style-type</code> property to style the Ordered List.
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "20%" }}>
          <thead>
            <tr>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>upper-alpha</td>
            </tr>
            <tr>
              <td>lower-alpha</td>
            </tr>
            <tr>
              <td>upper-roman</td>
            </tr>
            <tr>
              <td>lower-roman</td>
            </tr>
            <tr>
              <td>decimal</td>
            </tr>
            <tr>
              <td>none</td>
            </tr>
          </tbody>
        </table>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Make sure the values provided to the <b>list-style-type</b> property
            are spelled correctly. Incorrect values will remove or alter the
            numbering style.
          </p>
        </div>

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
            ? "Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

/* REUSABLE MCQ BLOCK */
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

export default WebSite_Integration_CS_2;
