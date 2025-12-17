import React, { useState } from "react";

const Applying_ER_Model_Concepts_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Applying ER Model Concepts</h1>

      <section>
        <p>
          In the previous cheatsheet, we have understood the{" "}
          <b>core concepts of ER Model</b> — entity types, relationships and
          attributes. Now, let's build an ER model for a real-world scenario.
        </p>
      </section>

      <section>
        <h2>E-commerce Application</h2>
        <p>In a typical e-commerce application,</p>
        <ul>
          <li>
            <code>Customer</code> has only one <code>cart</code>. A cart belongs
            to only one <code>Customer</code>
          </li>
          <li>
            <code>Customer</code> can add products to <code>cart</code>
          </li>
          <li>
            <code>cart</code> contains multiple products
          </li>
          <li>
            <code>Customer</code> can save multiple <code>addresses</code> in
            the application for further use like selecting delivery address
          </li>
        </ul>
        <p>Let’s apply the concepts of ER Model to this e-commerce scenario.</p>
      </section>

      <section>
        <h2>Entity types</h2>
        <ul>
          <li>Customer</li>
          <li>Product</li>
          <li>Cart</li>
          <li>Address</li>
        </ul>
      </section>

      <section>
        <h2>Relationships</h2>
        <p>Let's understand the relationships in the e-commerce use-case.</p>

        <h3>Relation Between Cart and Customer</h3>
        <div className="img-text">
          <img
            src="/assets/img/er_model_one_to_one_relationship.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <ul>
              <li>
                A customer has <b>only one</b> cart.
              </li>
              <li>
                A cart is related to <b>only one</b> customer.
              </li>
              <li>
                Hence, the relation between customer and cart entities is
                <br></br>
                <b>One-to-One relation.</b>
              </li>
            </ul>
          </div>
        </div>

        <h3>Relation Between Cart and Products</h3>
        <div className="img-text">
          <img
            src="/assets/img/er_model_many_to_many_relationship.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <ul>
              <li>
                A cart can have <b>many</b> products.
              </li>
              <li>
                A product can be in <b>many</b> carts.
              </li>
              <li>
                Therefore, the relation between cart and product is <br></br>
                <b>Many-to-Many relation</b>.
              </li>
            </ul>
          </div>
        </div>
        <h3>Relation Between Customer and Address</h3>
        <div className="img-text">
          <img
            src="/assets/img/er_model_one_to_many_relationship.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <ul>
              <li>
                A customer can have <b>multiple</b> addresses.
              </li>
              <li>
                An address is related to <b>only one</b> customer.
              </li>
              <li>
                Hence, the relation between customer and address is <br></br>{" "}
                <b>One-to-Many relation</b>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Attributes</h2>
        <p>
          Following are the attributes for the entity types in the e-commerce
          scenario.
        </p>
        <p>
          Here, attributes like id, product_id, etc., are <b>key attributes</b>{" "}
          as they <b>uniquely identify each entity</b> in the entity type.
        </p>
        <img
          src="/assets/img/er_model_entity_attributes.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />
      </section>

      <section>
        <h2>ER Model of e-commerce application</h2>
        <img
          src="/assets/img/e_commerse.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />
        <ul>
          <li>
            A <code>customer</code> has only one <code>cart</code>.
          </li>
          <li>
            A cart belongs to only one <code>customer</code>.
          </li>
        </ul>
        <ul>
          <li>
            A <code>product</code> can be in multiple <code>cart</code>.
          </li>
          <li>
            A <code>cart</code> can contain multiple <code>product</code>.
          </li>
        </ul>
        <ul>
          <li>
            A <code>customer</code> can have multiple <code>addresses</code>.
          </li>
          <li>
            An address is related to only one <code>customer</code>.
          </li>
        </ul>
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

export default Applying_ER_Model_Concepts_CS;
