import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock } from "../../CodeOutputBlocks"; // Adjust path if needed

const Responsive_Summary_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary } = useAuth();
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = async () => {
    try {
      await markSubtopicComplete(subtopicId, goalName, courseName);
      await loadProgressSummary();
      setIsSubtopicCompleted(true);
    } catch (error) {
      console.error("Failed to mark subtopic complete:", error);
    }
  };

  return (
    <div
      className="intro-container"
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.7",
        background: "#f8f9fa",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2c3e50", fontSize: "30px" }}>
        Responsive Summary Cheat Sheet
      </h1>

      {/* Bootstrap Grid System */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "3px solid #3498db",
            paddingBottom: "0.5rem",
          }}
        >
          Bootstrap Grid System
        </h2>
        <p>
          Bootstrap Grid System is a collection of reusable code snippets to
          create responsive layouts. It is made up of{" "}
          <strong>containers</strong>, <strong>rows</strong>, and{" "}
          <strong>columns</strong>.
        </p>
        <p>
          <strong>12-column system</strong> | Mobile-first | Up to 12 columns
          per row
        </p>

        <h3>1. Container</h3>
        <CodeBlock language="html" code={`<div class="container"></div>`} />
        <p>Holds rows and columns. Provides default padding.</p>

        <h3>2. Row</h3>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <div class="row"></div>
</div>`}
        />
        <p>Wraps all columns. Enables horizontal alignment.</p>

        <h3>3. Column</h3>
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
          <code>col-*</code> → number of columns (1–12)
        </p>
        <p>
          <strong>Note:</strong> <code>col-12</code> = full width |{" "}
          <code>col-6</code> = 50% | <code>col-4</code> = 33.33%
        </p>

        <h3>4. Column Wrapping</h3>
        <p>If total columns &gt; 12 → extra columns wrap to next line</p>

        <h3>Responsive Breakpoints</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "1rem 0",
          }}
        >
          <thead>
            <tr style={{ background: "#3498db", color: "white" }}>
              <th style={{ padding: "1rem", border: "1px solid #ddd" }}>
                Device
              </th>
              <th style={{ padding: "1rem", border: "1px solid #ddd" }}>
                Width
              </th>
              <th style={{ padding: "1rem", border: "1px solid #ddd" }}>
                Prefix
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.8rem", background: "#ecf0f1" }}>
                Extra small
              </td>
              <td>&lt;576px</td>
              <td>
                <code>col-</code>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.8rem" }}>Small</td>
              <td>≥576px</td>
              <td>
                <code>col-sm-</code>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.8rem", background: "#ecf0f1" }}>
                Medium
              </td>
              <td>≥768px</td>
              <td>
                <code>col-md-</code>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.8rem" }}>Large</td>
              <td>≥992px</td>
              <td>
                <code>col-lg-</code>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.8rem", background: "#ecf0f1" }}>
                Extra large
              </td>
              <td>≥1200px</td>
              <td>
                <code>col-xl-</code>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Mobile First:</strong> Define small screen first → inherits
          upward
        </p>
        <CodeBlock
          language="html"
          code={`<div class="col-12 col-sm-6 col-md-4 col-lg-3">
  Responsive column
</div>`}
        />
      </section>

      {/* CSS Box Properties - Margin */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "3px solid #e74c3c",
            paddingBottom: "0.5rem",
          }}
        >
          CSS Box Properties - Margin
        </h2>
        <p>
          Use <code>margin</code> for outer spacing
        </p>
        <ul>
          <li>
            <code>margin-top</code>, <code>margin-right</code>,{" "}
            <code>margin-bottom</code>, <code>margin-left</code>
          </li>
          <li>
            <code>margin: auto</code> → horizontal center (block elements)
          </li>
          <li>
            <code>margin-left: auto</code> → push to right
          </li>
          <li>
            <code>margin-right: auto</code> → push to left
          </li>
        </ul>

        <h3>Center Nav Items</h3>
        <CodeBlock
          language="html"
          code={`<div class="navbar-nav nav-items-center">
  <a class="nav-link" href="#">Home</a>
  <a class="nav-link" href="#">About</a>
</div>`}
        />
        <CodeBlock
          language="css"
          code={`.nav-items-center {
  margin: auto;
}`}
        />

        <h3>Right Align Nav</h3>
        <CodeBlock
          language="css"
          code={`.nav-items-right {
  margin-left: auto;
}`}
        />
      </section>

      {/* Bootstrap Spacing Utilities */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2980b9",
            borderBottom: "3px solid #27ae60",
            paddingBottom: "0.5rem",
          }}
        >
          Bootstrap Spacing Utilities
        </h2>

        <h3>Margin Classes</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#27ae60", color: "white" }}>
              <th>Property</th>
              <th>Class</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>margin</td>
              <td>
                <code>m-3</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <td>margin-top</td>
              <td>
                <code>mt-5</code>
              </td>
              <td>48px</td>
            </tr>
            <tr>
              <td>margin-left auto</td>
              <td>
                <code>ml-auto</code>
              </td>
              <td>push right</td>
            </tr>
          </tbody>
        </table>

        <h3>Padding Classes</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr style={{ background: "#3498db", color: "white" }}>
              <th>Size</th>
              <th>Value</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>
                <code>p-0</code>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>4px</td>
              <td>
                <code>p-1</code>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>16px</td>
              <td>
                <code>p-3</code>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>48px</td>
              <td>
                <code>p-5</code>
              </td>
            </tr>
          </tbody>
        </table>

        <p style={{ color: "red", fontWeight: "bold" }}>
          Never use <code>ml-*</code> or <code>mr-*</code> on grid columns →
          breaks layout!
        </p>
      </section>

      {/* Background, Sizing, Shadow */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#2980b9" }}>Bootstrap Utilities</h2>

        <h3>Background Colors</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {[
            "primary",
            "success",
            "danger",
            "warning",
            "info",
            "light",
            "dark",
            "white",
            "secondary",
          ].map((c) => (
            <div
              key={c}
              className={`bg-${c} text-white p-3`}
              style={{
                borderRadius: "8px",
                minWidth: "120px",
                textAlign: "center",
              }}
            >
              bg-{c}
            </div>
          ))}
        </div>

        <h3>Sizing (Width)</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            margin: "1rem 0",
          }}
        >
          <div className="w-25 bg-info text-white p-3">w-25</div>
          <div className="w-50 bg-dark text-white p-3">w-50</div>
          <div className="w-75 bg-success text-white p-3">w-75</div>
          <div className="w-100 bg-primary text-white p-3">w-100</div>
        </div>

        <h3>Shadows</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div className="shadow-none p-3 border">shadow-none</div>
          <div className="shadow-sm p-3 border">shadow-sm</div>
          <div className="shadow p-3 border">shadow</div>
          <div className="shadow-lg p-3 border">shadow-lg</div>
        </div>
      </section>

      {/* Flex, Display, Position */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#2980b9" }}>Flex, Display & Position</h2>
        <ul>
          <li>
            <strong>Order:</strong> <code>order-1</code> to{" "}
            <code>order-12</code>, responsive: <code>order-md-3</code>
          </li>
          <li>
            <strong>Display:</strong> <code>d-none</code>,{" "}
            <code>d-sm-block</code>, <code>d-md-inline</code>
          </li>
          <li>
            <strong>Fixed:</strong> <code>fixed-top</code>,{" "}
            <code>fixed-bottom</code>
          </li>
        </ul>
      </section>

      {/* Navbar & Modal */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#2980b9" }}>Bootstrap Components</h2>

        <h3>Navbar</h3>
        <CodeBlock
          language="html"
          code={`<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
  <a class="navbar-brand" href="#">Brand</a>
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class="nav-link" href="#wcuSection">Why Us</a>
      </li>
    </ul>
  </div>
</nav>`}
        />

        <h3>Modal</h3>
        <CodeBlock
          language="html"
          code={`<div class="modal fade" id="exampleModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">...</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`}
        />
      </section>

      {/* Containers */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#2980b9" }}>Bootstrap Containers</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#9b59b6", color: "white" }}>
              <th>Device</th>
              <th>Width</th>
              <th>.container</th>
              <th>.container-fluid</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>XS</td>
              <td>&lt;576px</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>SM</td>
              <td>≥576px</td>
              <td>540px</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>MD</td>
              <td>≥768px</td>
              <td>720px</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>LG</td>
              <td>≥992px</td>
              <td>960px</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>≥1200px</td>
              <td>1140px</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* HTML Elements, Selectors, Inheritance, Specificity, Cascade */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#2980b9" }}>HTML & CSS Fundamentals</h2>
        <ul>
          <li>
            <strong>Block:</strong> div, p, h1 → full width, new line
          </li>
          <li>
            <strong>Inline:</strong> span, a, img → as needed
          </li>
          <li>
            <strong>Span:</strong> inline styling container
          </li>
        </ul>

        <h3>CSS Selectors</h3>
        <ul>
          <li>
            <code>.class</code> → multiple
          </li>
          <li>
            <code>#id</code> → unique
          </li>
          <li>
            <code>tag</code> → all
          </li>
        </ul>

        <h3>Specificity Order</h3>
        <p>
          Type → Class → ID → Inline → <code>!important</code>
        </p>

        <h3>Inheritance</h3>
        <p>
          Inherited: <code>color, font-*, text-align</code>
          <br />
          Not inherited: <code>margin, padding, width, background</code>
        </p>
      </section>

      {/* Icons, Gradients, Colors */}
      <section
        style={{
          marginBottom: "4rem",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#2980b9" }}>Icons, Colors & Gradients</h2>

        <h3>Font Awesome</h3>
        <CodeBlock
          language="html"
          code={`<script src="https://kit.fontawesome.com/ac42c3b1f7.js" crossorigin="anonymous"></script>
<i class="fas fa-heart"></i>`}
        />

        <h3>Bootstrap Icons</h3>
        <CodeBlock
          language="html"
          code={`<svg width="16" height="16" fill="#d0b200" class="bi bi-arrow-right-short">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg>`}
        />

        <h3>Gradients</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                height: "120px",
                background: "linear-gradient(to right, #2196f3, #f44336)",
                borderRadius: "8px",
              }}
            ></div>
            <CodeBlock
              language="css"
              code={`background-image: linear-gradient(to right, #2196f3, #f44336);`}
            />
          </div>
          <div>
            <div
              style={{
                height: "120px",
                background: "radial-gradient(circle, #2196f3, #f44336)",
                borderRadius: "8px",
              }}
            ></div>
            <CodeBlock
              language="css"
              code={`background-image: radial-gradient(#2196f3, #f44336);`}
            />
          </div>
        </div>

        <h3>Transparent</h3>
        <CodeBlock
          language="css"
          code={`background-color: transparent;
// or
bg-transparent`}
        />
      </section>

      {/* Continue Button */}
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <button
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
          style={{
            padding: "1rem 3rem",
            fontSize: "1.3rem",
            backgroundColor: isSubtopicCompleted ? "#95a5a6" : "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: isSubtopicCompleted ? "not-allowed" : "pointer",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            transition: "all 0.3s",
          }}
        >
          {isSubtopicCompleted ? "Completed" : "Mark as Complete & Continue"}
        </button>
      </div>
    </div>
  );
};

export default Responsive_Summary_CS;
