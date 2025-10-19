import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const CSS_Gradience_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Bootstrap Modal & CSS Gradients</h1>

      {/* 1. Bootstrap Components */}
      <section>
        <h2>1. Bootstrap Components</h2>
        <h3>1.1 Modal</h3>
        <p>
          Try changing the content and styles of the Modal Header, Body, and Footer.
        </p>
        <CodeBlock
          language="html"
          code={`<!-- Modal Example -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Modal body content goes here.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`}
        />
      </section>

      {/* 2. Thanking Customers Section with Bootstrap Modal */}
      <section>
        <h2>2. Thanking Customers Section</h2>
        <p>Use a Bootstrap Modal to thank customers after form submission or purchase.</p>
        <CodeBlock
          language="html"
          code={`<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#thankModal">
  Thank You
</button>

<div class="modal fade" id="thankModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Thank You!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        We appreciate your visit.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`}
        />
      </section>

      {/* 3. Gradients */}
      <section>
        <h2>3. Gradients</h2>
        <p>A gradient is a background image that transitions between two or more colors.</p>

        <h3>3.1 Linear Gradient</h3>
        <p>Basic linear gradient using two colors:</p>
        <CodeBlock
          language="css"
          code={`background: linear-gradient(to bottom, #ff7e5f, #feb47b);`}
        />

        <h4>3.1.1 Changing Direction</h4>
        <p>Linear gradient directions:</p>
        <ul>
          <li><code>to top</code>: bottom → top</li>
          <li><code>to bottom</code>: top → bottom (default)</li>
          <li><code>to left</code>: right → left</li>
          <li><code>to right</code>: left → right</li>
        </ul>
        <CodeBlock
          language="css"
          code={`background: linear-gradient(to right, #6a11cb, #2575fc);`}
        />

        <h4>3.1.2 More than two colors</h4>
        <p>You can use multiple colors in a linear gradient:</p>
        <CodeBlock
          language="css"
          code={`background: linear-gradient(to right, red, orange, yellow, green, blue);`}
        />

        <h3>3.2 Radial Gradient</h3>
        <p>Radial gradient example:</p>
        <CodeBlock
          language="css"
          code={`background: radial-gradient(circle, #ff7e5f, #feb47b);`}
        />

        <h4>3.2.1 More than two colors</h4>
        <p>Using multiple colors in a radial gradient:</p>
        <CodeBlock
          language="css"
          code={`background: radial-gradient(circle, red, yellow, green, blue);`}
        />
      </section>

      {/* 4. Food Munch Website Code */}
      <section>
        <h2>4. Food Munch Website Example</h2>
        <p>Example container using Bootstrap:</p>
        <CodeBlock
          language="html"
          code={`<div class="container">
  <h2>Food Munch</h2>
  <p>Delicious meals delivered to your doorstep.</p>
</div>`}
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

export default CSS_Gradience_CS;
