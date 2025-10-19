import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // OutputBlock not needed here

const Introductionto_Opp_CS_2 = ({ onSubtopicComplete }) => {
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
          Building software differs from solving coding questions. Once a coding problem is
          solved, you move on — but with software, you keep working with the same code over
          time (adding features, fixing bugs).
        </p>
        <p>
          Therefore, <b>code readability</b> and <b>code maintainability</b> are crucial in
          software development.
        </p>
      </section>

      {/* OOPs */}
      <section>
        <h2>OOPs</h2>
        <p>
          Object-Oriented Programming is a way of approaching, designing and developing
          software, so that components and their interactions resemble real-life objects and
          interactions.
        </p>
        <p>
          Proper usage of OOPS concepts helps us build well-organized systems that are easy
          to use and extend.
        </p>
      </section>

      {/* Describing Real-Life Objects */}
      <section>
        <h2>Describing Real-Life Objects</h2>
        <p>
          In OOP, we model software after real-life objects. To be good at this, we should
          be able to properly describe objects.
        </p>

        <p>The following is a <b>bad way</b> of describing — scattered and unorganized:</p>
        <CodeBlock
          language="text"
          code={`Car: Red color, can drive, has 4 wheels, brand is Toyota, can stop`}
        />

        <h3>Organized Description</h3>
        <p>In the organized description, we group information clearly:</p>
        <CodeBlock
          language="text"
          code={`Object: Car
What it is: A vehicle
What it has: 4 wheels, Red color, Brand Toyota
What it can do: Drive, Stop`}
        />

        <h3>Organized Description should be:</h3>
        <ul>
          <li>A clear separation of objects.</li>
          <li>A clear grouping of what the object has and what it does.</li>
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

export default Introductionto_Opp_CS_2;
