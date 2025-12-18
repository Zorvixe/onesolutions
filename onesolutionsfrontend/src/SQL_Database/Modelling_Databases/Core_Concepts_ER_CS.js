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
        <div className="img-text">
          <img
            src="/assets/img/entity_er_model.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              Real world objects/concepts are called <b>entities</b> in ER
              Model.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3>Attributes of an Entity</h3>
        <div className="img-text">
          <img
            src="/assets/img/attributes_er_model.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              Properties of real world objects/concepts are represented as
              <b> attributes</b> of an entity in ER model.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3>Key Attribute</h3>
        <div className="img-text">
          <img
            src="/assets/img/key_attribute_er_model.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              The attribute that uniquely identifies each entity is called key
              attribute.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h3>Entity Type</h3>
        <div className="img-text">
          <img
            src="/assets/img/entity_type_er_model.png"
            alt="DOM Tree"
            style={{ width: "450px", height: "350px" }}
          />
          <div className="text">
            <p>
              Entity Type is a <b>collection of entities</b> that have the same
              attributes (not values).
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>Relationships</h2>
        <p>
          Association among the entities is called a <b>relationship</b>.
        </p>
        <p>Example: </p>
        <ul>
          <li>
            Person <b>has a</b> passport.
          </li>
          <li>
            Person can <b>have many</b> cars.
          </li>
          <li>
            Each student can <b>register for many</b> courses, and a course can{" "}
            <b>have many</b> students.
          </li>
        </ul>
        <h2>Types of relationships</h2>
        <ul>
          <li>One-to-One Relationship</li>
          <li>One-to-Many or Many-to-One Relationship</li>
          <li>Many-to-Many Relationship</li>
        </ul>
      </section>

      <section>
        <h3>One-to-One Relationship</h3>
        <div className="img-text">
          <img
            src="/assets/img/one_to_one_relationship.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              An entity is related to <b>only one entity</b>, and vice versa.
            </p>
            <b>Example:</b>
            <ul>
              <li>A person can have only one passport.</li>
              <li>similarly, a passport belongs to one and only one person.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3>One-to-Many Relationship</h3>
        <div className="img-text">
          <img
            src="/assets/img/one_to_many_relationship.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              An entity is related to <b>many other</b> entities.
            </p>
            <b>Example:</b>
            <p>
              A person <b>can have many</b> cars. But a car belongs to{" "}
              <b>only one</b>
              person.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3>Many-to-Many Relationship</h3>
        <div className="img-text">
          <img
            src="/assets/img/many_to_many_relationship.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>Multiple entities are related to multiple entities.</p>
            <b>Example:</b>
            <ul>
              <li>Each student can register to multiple courses.</li>
              <li>similarly each course is taken by multiple students.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3>Cardinality Ratio</h3>
        <p>
          Cardinality in DBMS defines the maximum number of times an instance in
          one entity can relate to instances of another entity.
        </p>

        <img
          src="/assets/img/cardinality_ratio.png"
          alt="DOM Tree"
          style={{ width: "80%", height: "300px" }}
        />
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
