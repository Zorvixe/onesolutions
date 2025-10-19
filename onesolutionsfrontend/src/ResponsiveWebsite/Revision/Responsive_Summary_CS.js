import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path if needed

const Responsive_Summary_CS = ({ onSubtopicComplete }) => {
  const [completed, setCompleted] = useState(false);

  const handleContinue = () => {
    setCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container" style={{ padding: "1rem" }}>
      <h1>Responsive Summary Cheat Sheet</h1>

      {/* 1. Bootstrap Grid System */}
      <section>
        <h2>Bootstrap Grid System</h2>
        <p>
          Bootstrap Grid uses containers, rows, and columns. 12-column layout, mobile-first.
        </p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-12">
      I'm your content inside the grid!
    </div>
  </div>
</div>`}
        />
        <p>
          Use responsive breakpoints: <code>col-</code>, <code>col-sm-</code>, <code>col-md-</code>, <code>col-lg-</code>, <code>col-xl-</code>
        </p>
      </section>

      {/* 2. Bootstrap Containers */}
      <section>
        <h2>Containers</h2>
        <p><strong>Fixed container:</strong> left & right spacing varies by screen size.</p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row">
    <div class="col-12">
      <h1>Taj Mahal</h1>
      <p>The Taj Mahal is an ivory-white marble mausoleum...</p>
    </div>
  </div>
</div>`}
        />

        <p><strong>Fluid container:</strong> full width of viewport.</p>
        <CodeBlock
          language="html"
          code={`<div class="container-fluid">
  <div class="row">
    <div class="col-12">
      <h1>Taj Mahal</h1>
      <p>The Taj Mahal is an ivory-white marble mausoleum...</p>
    </div>
  </div>
</div>`}
        />
      </section>

      {/* 3. Bootstrap Spacing Utilities */}
      <section>
        <h2>Spacing Utilities</h2>
        <p>Margin: m-*, mt-*, mr-*, mb-*, ml-*, m-auto</p>
        <p>Padding: p-*, pt-*, pr-*, pb-*, pl-*</p>
        <p>Size values: 0-5 (spacer = 16px)</p>
        <div className="example-preview" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <div className="p-3 mb-3 bg-light border">Padding 3, Margin bottom 3</div>
          <div className="m-auto p-2 bg-secondary text-white">Auto margin</div>
        </div>
      </section>

      {/* 4. Bootstrap Utilities */}
      <section>
        <h2>Other Bootstrap Utilities</h2>
        <p>Background colors: bg-primary, bg-secondary, bg-success, bg-info, bg-warning, bg-light, bg-dark, bg-white, bg-danger</p>
        <div className="d-flex gap-2 flex-wrap mb-3">
          <div className="bg-primary text-white p-2">Primary</div>
          <div className="bg-success text-white p-2">Success</div>
          <div className="bg-warning text-dark p-2">Warning</div>
        </div>

        <p>Width: w-25, w-50, w-75, w-100</p>
        <div className="d-flex gap-2 mb-3">
          <div className="w-25 bg-info text-white p-2">25%</div>
          <div className="w-50 bg-dark text-white p-2">50%</div>
          <div className="w-75 bg-secondary text-white p-2">75%</div>
          <div className="w-100 bg-primary text-white p-2">100%</div>
        </div>

        <p>Shadow: shadow-none, shadow-sm, shadow, shadow-lg</p>
        <div className="d-flex gap-2 flex-wrap mb-3">
          <div className="p-2 shadow-none border">No shadow</div>
          <div className="p-2 shadow-sm border">Small shadow</div>
          <div className="p-2 shadow border">Default shadow</div>
          <div className="p-2 shadow-lg border">Large shadow</div>
        </div>

        <p>Flex order: order-0 to order-12, responsive like order-md-2</p>
        <div className="d-flex mb-3">
          <div className="order-3 p-2 bg-light border">Order 3</div>
          <div className="order-1 p-2 bg-secondary text-white border">Order 1</div>
          <div className="order-2 p-2 bg-primary text-white border">Order 2</div>
        </div>

        <p>Display: d-none, d-sm-none, d-md-inline, d-lg-block, etc.</p>
        <div className="mb-3">
          <p className="d-none d-md-block bg-warning p-2">Visible only on md+</p>
        </div>

        <p>Position: fixed-top, fixed-bottom</p>
      </section>

      {/* 5. HTML Elements */}
      <section>
        <h2>HTML Elements</h2>
        <p>Block-level elements: div, p, h1...</p>
        <p>Inline elements: span, a, img...</p>
        <CodeBlock
          language="html"
          code={`<p class="wcu-card-description">
  Food Coupons upto <span class="offers">50% OFF</span>
</p>`}
        />
      </section>

      {/* 6. CSS Selectors */}
      <section>
        <h2>CSS Selectors</h2>
        <ul>
          <li>Class selector: <code>.className</code></li>
          <li>ID selector: <code>#idName</code></li>
          <li>Type selector: <code>tagName</code></li>
        </ul>
      </section>

      {/* 7. CSS Building Blocks */}
      <section>
        <h2>CSS Fundamentals</h2>
        <ul>
          <li>Inheritance: child elements inherit from parent</li>
          <li>Specificity: ID &gt; Class &gt; Tag</li>
          <li>Cascade: later rules override earlier if specificity equal</li>
          <li>Inline styles: highest specificity</li>
        </ul>
      </section>

      {/* 8. Icons */}
      <section>
        <h2>Icons</h2>
        <p>Bootstrap Icons and Font Awesome Icons</p>
        <p>Font Awesome Kit:</p>
        <CodeBlock
          language="html"
          code={`<script src="https://kit.fontawesome.com/ac42c3b1f7.js" crossorigin="anonymous"></script>`}
        />
        <p>Example Bootstrap SVG icon:</p>
        <div className="mb-3">
          <svg width="24px" height="24px" className="bi bi-arrow-right-short" fill="#d0b200" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </section>

      {/* 9. CSS Gradients */}
      <section>
        <h2>CSS Gradients</h2>
        <p>Linear Gradient:</p>
        <div style={{ height: "100px", background: "linear-gradient(to right, #2196f3, #f44336)", marginBottom: "1rem" }} />
        <CodeBlock
          language="css"
          code={`background-image: linear-gradient(to right, #2196f3, #f44336);`}
        />

        <p>Radial Gradient:</p>
        <div style={{ height: "100px", background: "radial-gradient(#2196f3, #f44336)", marginBottom: "1rem" }} />
        <CodeBlock
          language="css"
          code={`background-image: radial-gradient(#2196f3, #f44336);`}
        />
      </section>

      {/* Continue Button */}
      <div className="view-continue" style={{ marginTop: "2rem" }}>
        <button
          className={`btn-continue ${completed ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={completed}
          style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: completed ? "not-allowed" : "pointer" }}
        >
          {completed ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Responsive_Summary_CS;
