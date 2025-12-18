import React, { useState } from "react";

const ER_Model_Relational_DB = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>ER Model to Relational Database</h1>

      <section>
        <p>
          In the previous cheatsheet, we've learnt to build an ER model for a
          given scenario. Now, let's convert this ER model to Relational
          Database.
        </p>
        <p>Let's consider the same e-commerce application.</p>
      </section>

      <section>
        <h2>E-commerce Application</h2>
        <p>In a typical e-commerce application,</p>
        <ul>
          <li>
            Customer has only one cart. A cart belongs to only one customer
          </li>
          <li>Customer can add products to cart</li>
          <li>Cart contains multiple products</li>
          <li>
            Customer can save multiple addresses in the application for further
            use like selecting delivery address
          </li>
        </ul>
        <img
          src="/assets/img/e_commerse_1.png"
          alt="DOM Tree"
          style={{ width: "90%", height: "300px" }}
        />
      </section>

      <section>
        <h2>Entity Type to Table</h2>
        <img
          src="/assets/img/entity_type_to_table.png"
          alt="DOM Tree"
          style={{ width: "90%", height: "250px" }}
        />
        <p>
          <b>Primary key:</b> A minimal set of attributes (columns) in a table
          that uniquely identifies rows in a table.
        </p>
        <p>
          In the following tables, all the ids are primary keys as they uniquely
          identify each row in the table.
        </p>
        <img
          src="/assets/img/customer_address_cart_product_er_to_rd.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "100%" }}
        />
      </section>

      <section>
        <h2>Relationships</h2>

        <h3>
          Relation Between Customer and Address - One to Many Relationship
        </h3>
        <ul>
          <li>A customer can have multiple addresses.</li>
          <li>An address is related to only one customer.</li>
        </ul>
        <p>
          We store the primary key of a customer in the address table to denote
          that the addresses are related to a particular customer.
        </p>
        <p>
          This new column/s in the table that refer to the primary key of
          another table is called <b>Foreign Key</b>.
        </p>

        <div className="img-text">
          <div className="text">
            <img
              src="/assets/img/one_to_many_rd_model.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px", padding: "10px" }}
            />
          </div>
          <img
            src="/assets/img/keys_relational_database.png"
            alt="DOM Tree"
            style={{ width: "40%", height: "100px", padding: "20px" }}
          />
        </div>
        <p>
          Here, <code>customer_id</code> is the foreign key that stores{" "}
          <code>id</code>
          (primary key) of customers.
        </p>
      </section>

      <section>
        <h3>Relation Between Cart and Customer - One to One Relationship</h3>
        <ul>
          <li>A customer has only one cart.</li>
          <li>A cart is related to only one customer.</li>
        </ul>
        <p>
          This is similar to one-to-many relationship. But, we need to ensure
          that only one cart is associated to a customer
        </p>
        <div className="img-text">
          <div className="text">
            <img
              src="/assets/img/unique_f_key.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px", padding: "10px" }}
            />
          </div>
          <img
            src="/assets/img/keys_relational_database.png"
            alt="DOM Tree"
            style={{ width: "40%", height: "100px", padding: "20px" }}
          />
        </div>
      </section>

      <section>
        <h3>Relation Between Cart and Products - Many to Many Relationship</h3>
        <ul>
          <li>A cart can have many products.</li>
          <li>A product can be in many carts.</li>
        </ul>
        <p>
          Here, we cannot store either the primary key of a product in the cart
          table or vice versa.
        </p>
        <p>
          To store the relationship between the cart and product tables, we use
          a <b>Junction Table</b>.
        </p>
        <img
          src="/assets/img/many_to_many_rd_model.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "100%" }}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            We store the properties related to a many-to-many relationship in
            the junction table. For example, quantity of each product in the
            cart should be stored in the junction table <b>cart_product</b>
          </p>
        </div>
      </section>

      <section>
        <h2>E-commerce Usecase: ER Model to Relational Database</h2>
        <p>
          Following ER model is represented as the below tables in the
          relational database.
        </p>
        <p>
          <b>ER Model</b>
        </p>
        <img
          src="/assets/img/e_commerse_2.png"
          alt="DOM Tree"
          style={{ width: "90%", height: "300px" }}
        />
      </section>
      <section>
        <b>Relational Database</b>
        <div className="img-text">
          <div className="text">
            <img
              src="/assets/img/keys_relational_database.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "100px", padding: "20px" }}
            />
          </div>
        </div>
        <img
          src="/assets/img/customer_address_rd_model.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />
        <img
          src="/assets/img/cart_product_relational_model.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />
        <img
          src="/assets/img/cart_product_junction_table.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
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

export default ER_Model_Relational_DB;
