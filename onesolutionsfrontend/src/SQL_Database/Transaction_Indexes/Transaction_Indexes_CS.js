import React, { useState } from "react";

const Transaction_Indexes_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Transactions | Cheat Sheet</h1>

      {/* 1. Transactions */}
      <section>
        <h2>Transactions</h2>
        <div className="img-text">
          <img
            src="/assets/img/transactions_defination.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              A transaction is a logical group of one or more SQL statements.
            </p>
            <p>
              Transactions are used in various scenarios such as banking,
              ecommerce, social networks, booking tickets, etc.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Transaction Properties */}
      <section>
        <p>A transaction has four important properties.</p>
        <ul>
          <li>Atomicity</li>
          <li>Consistency</li>
          <li>Isolation</li>
          <li>Durability</li>
        </ul>
      </section>

      {/* 3. Atomicity */}
      <section>
        <h3>Atomicity</h3>
        <p>
          Either <b>all SQL statements</b> or <b>none</b> are applied to the
          database.
        </p>
        <img
          src="/assets/img/transactions_atomicity.png"
          alt="DOM Tree"
          style={{ width: "80%", height: "300px" }}
        />
      </section>

      {/* 4. Consistency */}
      <section>
        <h3>Consistency</h3>
        <p>
          Transactions always leave the database in a <b>consistent state</b>.
        </p>
        <img
          src="/assets/img/transactions_consistency.png"
          alt="DOM Tree"
          style={{ width: "80%", height: "400px" }}
        />
      </section>

      {/* 5. Isolation */}
      <section>
        <h3>Isolation</h3>
        <p>
          Multiple transactions can occur at the same time without adversely
          affecting each other.
        </p>
        <img
          src="/assets/img/transactions_isolation.png"
          alt="DOM Tree"
          style={{ width: "70%", height: "400px" }}
        />
      </section>

      {/* 6. Durability */}
      <section>
        <h3>Durability</h3>
        <p>
          Changes of a successful transaction persist even after a system crash.
        </p>
        <img
          src="/assets/img/transactions_durability.png"
          alt="DOM Tree"
          style={{ width: "80%", height: "300px" }}
        />
        <p>These four properties are commonly acronymed as ACID.</p>
        <img
          src="/assets/img/transactions_acid_properties.png"
          alt="DOM Tree"
          style={{ width: "80%", height: "300px" }}
        />
      </section>

      <section>
        <h2>Indexes</h2>
        <div className="img-text">
          <img
            src="/assets/img/indexing-(1).png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              In scenarios like, searching for a word in dictionary, we use
              index to easily search for the word. Similarly, in databases, we
              maintain indexes to speed up the search for data in a table.
            </p>
          </div>
        </div>
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

export default Transaction_Indexes_CS;
