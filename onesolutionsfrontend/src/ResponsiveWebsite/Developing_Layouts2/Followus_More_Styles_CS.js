import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks";
const Followus_More_Styles_CS = ({
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

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleAnswer = (question, option) => {
    setMcqAnswers((prev) => ({ ...prev, [question]: option }));
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
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Follow Us & More Styling | Cheat Sheet</h1>

      {/* 1. Adding Icons */}
      <section>
        <h2>1. Adding Icons</h2>
        <p>
          There are a limited number of Icon choices in Bootstrap icons. Since
          we don’t have the desired icons in Bootstrap Icons, we use Font
          Awesome Icons.
        </p>
        <h3>1.1 Font Awesome Icons</h3>
        <p>
          To use the Font Awesome Icons, you need to add the below Font Awesome
          Icons Kit Code in the HTML <code>head</code> element.
        </p>
        <CodeBlock
          language="html"
          code={`<script src="https://kit.fontawesome.com/your-kit-code.js" crossorigin="anonymous"></script>`}
        />
      </section>

      {/* 2. Follow Us Section */}
      <section>
        <h2>2. Follow Us Section</h2>
        <CodeBlock
          language="html"
          code={`<section class="follow-us p-3 text-center">
  <h2>Follow Us</h2>
  <a href="#" class="fab fa-facebook-f mx-2"></a>
  <a href="#" class="fab fa-twitter mx-2"></a>
  <a href="#" class="fab fa-instagram mx-2"></a>
</section>`}
        />
        <p>
          <b>Note: </b> Use <code>border-radius</code> to create circular icons.
          Ensure height = width for perfect circles.
        </p>
      </section>

      {/* 3. Adding Links to Sections */}
      <section>
        <h2>3. Adding Links to the Sections</h2>
        <p>
          Add an <code>id</code> to the target section and use it in the{" "}
          <code>href</code> of nav items:
        </p>
        <CodeBlock
          language="html"
          code={`<!-- Section -->
<section id="contact-us">
  <h2>Contact Us</h2>
</section>

<!-- Nav Link -->
<a href="#contact-us">Contact</a>`}
        />
      </section>

      {/* 4. Bootstrap Position Utilities */}
      <section>
        <h2>4. Bootstrap Position Utilities</h2>

        <h3>4.1 Fixed Top</h3>
        <p>
          Use <code>fixed-top</code> to pin an element to the top of the
          viewport:
        </p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar fixed-top navbar-light bg-light">
  Fixed Top Navbar
</nav>`}
        />

        <h3>4.2 Fixed Bottom</h3>
        <p>
          Use <code>fixed-bottom</code> to pin an element to the bottom of the
          viewport:
        </p>
        <CodeBlock
          language="html"
          code={`<footer class="footer fixed-bottom bg-dark text-white p-3 text-center">
  Fixed Bottom Footer
</footer>`}
        />
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

export default Followus_More_Styles_CS;
