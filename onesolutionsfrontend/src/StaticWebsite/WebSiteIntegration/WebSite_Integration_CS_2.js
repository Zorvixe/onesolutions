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
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      alert("Error marking as complete.");
    } finally {
      setIsLoading(false);
    }
  };

  /* 
      MCQ DATA - Part 2: Detailed Views + HTML Lists
 */
  const mcqs = [
    {
      id: "detailed_view_id",
      section: "Detailed View Sections",
      question:
        "What must the container ID of every Detailed View start with in CCBP UI Kit?",
      options: ["detail", "view", "section", "page"],
      answer: "section",
      explanation:
        "All sections (Home, Favourite Places, Golden Temple, etc.) must have IDs starting with 'section' → e.g., sectionGoldenTempleDetail",
    },
    {
      id: "carousel_unique_id",
      section: "Bootstrap Carousel",
      question: "Why do carousel IDs need to be unique in Detailed Views?",
      options: [
        "For better SEO",
        "So that next/prev buttons work correctly",
        "To make images load faster",
        "It's just a style preference",
      ],
      answer: "So that next/prev buttons work correctly",
      explanation:
        "Bootstrap carousels use the carousel ID to link controls (buttons, indicators). Duplicate IDs break navigation!",
    },
    {
      id: "onclick_card",
      section: "Card Click → Detailed View",
      question:
        "How do you make a Favourite Place card open its Detailed View?",
      options: [
        "Add href='#sectionGoldenTempleDetail'",
        "Add onclick='display(\"sectionGoldenTempleDetail\")'",
        "Use <a> tag around the card",
        "Add data-target attribute",
      ],
      answer: "Add onclick='display(\"sectionGoldenTempleDetail\")'",
      explanation:
        "CCBP UI Kit uses the display('sectionId') function to switch views — same as navigation buttons.",
    },
    {
      id: "back_button",
      section: "Back Navigation",
      question: "What should the 'Back' button in a Detailed View do?",
      options: [
        "Go to Home",
        "Reload the page",
        "Return to Favourite Places section",
        "Close the browser",
      ],
      answer: "Return to Favourite Places section",
      explanation:
        "Best UX: clicking a card → detail, back button → return to list. Use onclick=\"display('sectionFavouritePlaces')\"",
    },
    {
      id: "unordered_list",
      section: "HTML Lists",
      question: "Which tag creates a bullet-point (unordered) list?",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
      answer: "<ul>",
      explanation:
        "<ul> = Unordered List → shows bullets, discs, circles, or squares.",
    },
    {
      id: "ordered_list",
      section: "HTML Lists",
      question: "Which tag creates a numbered (ordered) list?",
      options: ["<ul>", "<ol>", "<num>", "<list>"],
      answer: "<ol>",
      explanation:
        "<ol> = Ordered List → shows numbers, letters, or roman numerals.",
    },
    {
      id: "list_item",
      section: "HTML Lists",
      question: "Which tag defines each item inside <ul> or <ol>?",
      options: ["<li>", "<item>", "<entry>", "<point>"],
      answer: "<li>",
      explanation: "<li> = List Item — used inside both <ul> and <ol>.",
    },
  ];

  return (
    <div className="intro-container">
      <h1>Website Integration | Cheat Sheet | Part 2</h1>

      {/* 1. Detailed View Sections */}

      <section>
        <h2>1. Adding Multiple Detailed View Sections</h2>
        <p>
          Each place (Golden Temple, Mysore Palace, Varanasi) gets its own
          detailed page — shown/hidden using CCBP UI Kit.
        </p>

        <h3>Rules for Detailed Views</h3>
        <ul>
          <li>
            Container ID must start with <code>section</code>
          </li>
          <li>
            Each carousel must have a <strong>unique</strong> ID
          </li>
          <li>
            Use <code>onclick="display('sectionXYZ')"</code> to navigate
          </li>
        </ul>

        <h3>Example IDs</h3>
        <CodeBlock
          language="html"
          code={`<!-- Section Containers -->
<div id="sectionGoldenTempleDetail">...</div>
<div id="sectionMysorePalaceDetail">...</div>
<div id="sectionVaranasiDetail">...</div>

<!-- Carousel IDs (must be unique!) -->
<div id="goldenTempleCarousel" class="carousel">
<div id="mysorePalaceCarousel" class="carousel">
<div id="varanasiCarousel" class="carousel">`}
        />

        <div className="Note-container">
          <h6>Critical Rule</h6>
          <p>
            Duplicate carousel IDs = broken next/prev buttons!
            <br />
            Always use unique IDs like: <code>goldenTempleCarousel</code>,{" "}
            <code>mysoreCarousel</code>, etc.
          </p>
        </div>

        <MCQBlock mcq={mcqs[0]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[1]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 2. Card → Detailed View Integration */}

      <section>
        <h2>2. Make Cards Clickable → Open Detailed View</h2>

        <h3>Step-by-Step</h3>
        <ol>
          <li>
            Create section: <code>id="sectionGoldenTempleDetail"</code>
          </li>
          <li>Add full HTML + CSS of Golden Temple page inside it</li>
          <li>
            Add <code>onclick</code> to the card in Favourite Places:
          </li>
        </ol>

        <CodeBlock
          language="html"
          code={`<!-- In Favourite Places Section -->
<div class="card" onclick="display('sectionGoldenTempleDetail')">
  <img src="golden-temple.jpg" alt="Golden Temple" />
  <h3>Golden Temple</h3>
  <p>Amritsar, Punjab</p>
</div>`}
        />

        <h3>Back Button in Detailed View</h3>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-secondary" onclick="display('sectionFavouritePlaces')">
  ← Back to Places
</button>`}
        />

        <MCQBlock mcq={mcqs[2]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[3]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* 3. HTML Lists - <ul>, <ol>, <li> */}

      <section>
        <h2>3. HTML Lists - The Right Way</h2>

        <table
          style={{
            width: "100%",
            margin: "20px 0",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>List Type</th>
              <th>Tag</th>
              <th>Default Marker</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unordered</td>
              <td>
                <code>&lt;ul&gt;</code>
              </td>
              <td>Bullets (disc)</td>
              <td>Navigation, features, hobbies</td>
            </tr>
            <tr>
              <td>Ordered</td>
              <td>
                <code>&lt;ol&gt;</code>
              </td>
              <td>Numbers (1, 2, 3)</td>
              <td>Steps, rankings, instructions</td>
            </tr>
          </tbody>
        </table>

        <h3>Unordered List Example</h3>
        <CodeBlock
          language="html"
          code={`<ul class="list-unstyled"> <!-- removes bullets -->
  <li>Painting</li>
  <li>Reading Books</li>
  <li>Playing Guitar</li>
</ul>`}
        />

        <h3>Ordered List Example</h3>
        <CodeBlock
          language="html"
          code={`<ol type="I"> <!-- Roman numerals -->
  <li>Requirement Gathering</li>
  <li>Design</li>
  <li>Development</li>
  <li>Testing</li>
</ol>`}
        />

        <h3>Remove Bullets/Numbers</h3>
        <CodeBlock
          language="css"
          code={`ul, ol {
  list-style-type: none;
  padding-left: 0;
}`}
        />

        <MCQBlock mcq={mcqs[4]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[5]} answers={mcqAnswers} onAnswer={handleAnswer} />
        <MCQBlock mcq={mcqs[6]} answers={mcqAnswers} onAnswer={handleAnswer} />
      </section>

      {/* Pro Tips Summary */}

      <div className="Note-container">
        <h6>Golden Rules for This Project</h6>
        <ul>
          <li>
            All section IDs → <code>sectionSomething</code>
          </li>
          <li>All carousel IDs → unique (never repeat!)</li>
          <li>
            Card click → <code>onclick="display('sectionXYZ')"</code>
          </li>
          <li>
            Back button →{" "}
            <code>onclick="display('sectionFavouritePlaces')"</code>
          </li>
          <li>
            Use <code>&lt;ul&gt;</code> for non-sequential items
          </li>
          <li>
            Use <code>&lt;ol&gt;</code> for steps or ranked items
          </li>
        </ul>
      </div>

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

/* 
      REUSABLE MCQ COMPONENT (Same as all previous)
*/
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
