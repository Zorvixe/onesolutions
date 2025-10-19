import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // OutputBlock not needed here

const Introductionto_OOP_CS_1 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) {
      onSubtopicComplete();
    }
  };

  return (
    <div className="intro-container">
      <h1>Introduction to OOP | Cheat Sheet</h1>

      {/* Good Software */}
      <section>
        <h2>Good Software</h2>
        <p>
          Before jumping into Object Oriented Programming, let’s understand the word{" "}
          <b>Software</b>.
        </p>
        <p>Software is an easily changeable tool/product that performs a specific task.</p>
        <p>
          The ease of changing or making changes to the software is referred as its{" "}
          <b>softness</b>.
        </p>
        <ul>
          <li>Easy to understand and make changes.</li>
          <li>Easy to fix bugs and add new features within the scope.</li>
        </ul>
        <p>
          Object-Oriented Programming System (OOPS) is a way of approaching, designing,
          developing software that is easy to change.
        </p>
      </section>

      {/* Note */}
      <section>
        <h2>Note</h2>
        <p>
          Unlike coding questions where you move on after solving, with software you keep
          working on the same code for a long time — adding new features and fixing bugs.
        </p>
        <p>
          Therefore, <b>code readability</b> and <b>code maintainability</b> become
          crucial in software development.
        </p>
      </section>

      {/* OOPs */}
      <section>
        <h2>OOPs</h2>
        <p>
          Object-Oriented Programming models software after real-life objects and their
          interactions. Proper usage of OOPS concepts helps us build well-organized,
          extendable systems.
        </p>
      </section>

      {/* Describing Real-Life Objects */}
      <section>
        <h2>Describing Real-Life Objects</h2>
        <p>
          To model real-life objects, we should be able to describe them clearly. A{" "}
          <b>bad way</b> is unorganized and scattered, while an{" "}
          <b>organized description</b> groups details neatly.
        </p>

        <h3>Bad Example</h3>
        <CodeBlock
          language="text"
          code={`Car: Red color, can drive, has 4 wheels, brand is Toyota, can stop`}
        />

        <h3>Organized Example</h3>
        <CodeBlock
          language="text"
          code={`Object: Car
What it is: A vehicle
What it has: 4 wheels, Red color, Brand Toyota
What it can do: Drive, Stop`}
        />

        <ul>
          <li>A clear separation of objects.</li>
          <li>A clear grouping of what object has and what it does.</li>
        </ul>
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

export default Introductionto_OOP_CS_1;
