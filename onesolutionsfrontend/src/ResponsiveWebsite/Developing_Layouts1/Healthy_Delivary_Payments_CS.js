import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // adjust path if needed

const Healthy_Delivary_Payments_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Bootstrap Flex & Display Utilities</h1>

      {/* 1. Bootstrap Flex Utilities */}
      <section>
        <h2>1. Bootstrap Flex Utilities</h2>
        <h3>1.1 Order</h3>
        <p>
          The <code>order</code> classes change the visual order of flex items
          inside a flex container. Numbers can be 0–12. They are responsive:
        </p>
        <ul>
          <li>order-1, order-2, order-3, …</li>
          <li>order-md-2, order-lg-3, etc.</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="d-flex">
  <div class="order-2">Second</div>
  <div class="order-1">First</div>
  <div class="order-3">Third</div>
</div>`}
        />
      </section>

      {/* 2. Bootstrap Display Utilities */}
      <section>
        <h2>2. Bootstrap Display Utilities</h2>
        <p>
          Show or hide HTML elements responsively using <code>d-*-none</code>, <code>d-*-block</code>, and <code>d-*-inline</code> classes.
        </p>
        <ul>
          <li>Hide: d-none, d-sm-none, d-md-none, …</li>
          <li>Show: d-block, d-md-inline, d-lg-block, …</li>
        </ul>

        <CodeBlock
          language="html"
          code={`<div class="d-none d-md-block">Visible on md and up</div>
<div class="d-block d-md-none">Visible on sm and below</div>`}
        />
      </section>

      {/* 3. Sections in Food Munch Website */}
      <section>
        <h2>3. Sections in Food Munch Website</h2>

        <h3>3.1 Healthy Food Section</h3>
        <CodeBlock
          language="html"
          code={`<section class="healthy-food p-3">
  <h2>Healthy Food Options</h2>
  <p>Fresh salads, juices, and organic meals.</p>
</section>`}
        />

        <h3>3.2 Delivery & Payment Section</h3>
        <CodeBlock
          language="html"
          code={`<section class="delivery-payment p-3">
  <h2>Delivery & Payment</h2>
  <p>Fast delivery and multiple payment options available.</p>
</section>`}
        />

        <h3>3.3 Thanking Customers Section</h3>
        <CodeBlock
          language="html"
          code={`<section class="thank-you p-3">
  <h2>Thank You!</h2>
  <p>We appreciate your order and hope you enjoy your meal.</p>
</section>`}
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

export default Healthy_Delivary_Payments_CS;
