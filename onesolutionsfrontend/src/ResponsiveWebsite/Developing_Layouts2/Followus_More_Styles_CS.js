import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Followus_More_Styles_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Follow Us & More Styles</h1>

      {/* 1. Adding Icons */}
      <section>
        <h2>1. Adding Icons</h2>
        <p>
          Bootstrap icons are limited. For additional icons, we use <strong>Font Awesome</strong>.
        </p>
        <h3>1.1 Font Awesome Icons</h3>
        <p>Add this Font Awesome Kit in the <code>&lt;head&gt;</code> of your HTML:</p>
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
        <p className="note">
          Note: Use <code>border-radius</code> to create circular icons. Ensure height = width for perfect circles.
        </p>
      </section>

      {/* 3. Adding Links to Sections */}
      <section>
        <h2>3. Adding Links to the Sections</h2>
        <p>Add an <code>id</code> to the target section and use it in the <code>href</code> of nav items:</p>
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
        <p>Use <code>fixed-top</code> to pin an element to the top of the viewport:</p>
        <CodeBlock
          language="html"
          code={`<nav class="navbar fixed-top navbar-light bg-light">
  Fixed Top Navbar
</nav>`}
        />

        <h3>4.2 Fixed Bottom</h3>
        <p>Use <code>fixed-bottom</code> to pin an element to the bottom of the viewport:</p>
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
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Followus_More_Styles_CS;
