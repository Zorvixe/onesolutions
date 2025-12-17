import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Core_Concepts_ER_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Modelling Databases: Part 1</h1>

      <section>
        <p>
          To model a database, we have to first understand the business
          requirements at conceptual level, which is later translated into a
          relational database.
        </p>

        <p>
          For understanding the business requirements at a conceptual level, we
          use <code>Entity Relationship Model (ER Model)</code>.
        </p>
      </section>

      <section>
        <h2>Core Concepts in ER Model</h2>
      </section>

      <section>
        <h3>Entity</h3>
        <p>Real world objects/concepts are called entities in ER Model.</p>
      </section>

      <section>
        <h3>Attributes of an Entity</h3>
        <p>
          Properties of real world objects/concepts are represented as
          attributes of an entity in ER model.
        </p>
      </section>

      <section>
        <h3>Key Attribute</h3>
        <p>
          The attribute that uniquely identifies each entity is called key
          attribute.
        </p>
      </section>

      <section>
        <h3>Entity Type</h3>
        <p>
          Entity Type is a collection of entities that have the same attributes
          (not values).
        </p>
      </section>

      <section>
        <h3>Relationships</h3>
        <p>Association among the entities is called a relationship.</p>

        <b>Example:</b>
        <ul>
          <li>Person has a passport.</li>
          <li>Person can have many cars.</li>
          <li>
            Each student can register for many courses, and a course can have
            many students.
          </li>
        </ul>
      </section>

      <section>
        <h2>Types of relationships</h2>
        <ul>
          <li>One-to-One Relationship</li>
          <li>One-to-Many or Many-to-One Relationship</li>
          <li>Many-to-Many Relationship</li>
        </ul>
      </section>

      <section>
        <h3>One-to-One Relationship</h3>
        <p>An entity is related to only one entity, and vice versa.</p>

        <b>Example</b>
        <p>A person can have only one passport.</p>
        <p>similarly, a passport belongs to one and only one person.</p>
      </section>

      <section>
        <h3>One-to-Many Relationship</h3>
        <p>An entity is related to many other entities.</p>

        <b>Example</b>
        <p>
          A person can have many cars. But a car belongs to only one person.
        </p>
      </section>

      <section>
        <h3>Many-to-Many Relationship</h3>
        <p>Multiple entities are related to multiple entities.</p>

        <b>Example</b>
        <p>Each student can register to multiple courses.</p>
        <p>similarly each course is taken by multiple students.</p>
      </section>

      <section>
        <h3>Cardinality Ratio</h3>
        <p>
          Cardinality in DBMS defines the maximum number of times an instance in
          one entity can relate to instances of another entity.
        </p>
      </section>

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

export default Core_Concepts_ER_CS;
