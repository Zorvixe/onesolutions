import React, { useState } from "react";


const Introductionto_CSS_Flexbox_CS_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Introduction to CSS Flexbox | Part 2 | Cheat Sheet</h1>

      {/* 1. Flex Wrap */}
      <section>
        <h2>1. Flex Wrap</h2>
        <p>
          The <b>flex-wrap</b> property arranges the flex items in multiple
          lines.
        </p>

        <p>Flex Wrap property can have the following values:</p>
        <ul>
          <li>
            <b>nowrap</b> (default)
          </li>
          <li>
            <b>wrap</b>
          </li>
          <li>
            <b>wrap-reverse</b>
          </li>
        </ul>
      </section>

      {/* 2. Frontend Developer Section Example */}
      <section>
        <h2>2. Frontend Developer Section Example</h2>

        <p>
          <b>Note:</b> A Flex Item can also be a Flex Container.
        </p>
        <p>
          The class name <code>bg-container</code> acts as a{" "}
          <b>flex container</b>, and <code>cards-container</code> acts as a{" "}
          <b>flex item</b> to <b>bg-container</b>.
        </p>
        <img
          src="/assets/img/flex_container_1.png"
          alt="DOM Tree"
          style={{ width: "90%", height: "300px" }}
        />
        <p>
          Similarly, the class names with <code>card</code> act as{" "}
          <b>flex items</b> to the <code>cards-container</code>. Here,{" "}
          <code>cards-container</code> behaves as a <b>flex container</b> for
          all the class names with <code>card</code>.
        </p>
        <img
          src="/assets/img/flex_container_2.png"
          alt="DOM Tree"
          style={{ width: "90%", height: "300px" }}
        />
      </section>

      {/* Continue Button */}
      <div className="view-continue" style={{ marginTop: "20px" }}>
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

export default Introductionto_CSS_Flexbox_CS_2;
