// /project/workspace/onesolutionsfrontend/src/SQL_Database/Quering_SQL/Comparison_Operators_CS.js

import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Comparison_Operators_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Comparison Operators | Cheat Sheet</h1>

      {/* 1. Introduction */}
      <section>
        <h2>Concepts in Focus</h2>
        <p>
          In a typical e-commerce scenario, users would generally filter the
          products with good ratings, or want to purchase the products of a
          certain brand or of a certain price.
        </p>
        <p>
          Let's see how comparison operators are used to filter such kind of
          data using the following database.
        </p>
        <img
          src="/assets/img/comparision_operators_img.png"
          alt="DOM Tree"
          style={{
            width: "50%",
            height: "300px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </section>

      {/* 2. Database Overview */}
      <section>
        <h2>Database</h2>
        <p>
          The database contains a <b>product</b> table that stores information
          about products such as <b>name</b>, <b>category</b>, <b>price</b>,{" "}
          <b>brand</b>, and <b>rating</b>.
        </p>
        <p>
          You can check the schema and data of the <b>product</b> table in the
          code playground.
        </p>
      </section>

      {/* 3. Comparison Operators Table */}
      <section>
        <h2>Comparison Operators</h2>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Operator</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>=</td>
              <td>Equal to</td>
            </tr>
            <tr>
              <td>&lt;&gt;</td>
              <td>Not equal to</td>
            </tr>
            <tr>
              <td>&lt;</td>
              <td>Less than</td>
            </tr>
            <tr>
              <td>&lt;=</td>
              <td>Less than or equal to</td>
            </tr>
            <tr>
              <td>&gt;</td>
              <td>Greater than</td>
            </tr>
            <tr>
              <td>&gt;=</td>
              <td>Greater than or equal to</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. Examples */}
      <section>
        <h3>Example 1</h3>
        <p>
          Get all the details of the products whose <b>category</b> is "Food"
          from the <b>product</b> table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT * FROM product
WHERE category = "Food";`}
        />

        <h3>Output</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>name</th>
              <th>category</th>
              <th>price</th>
              <th>brand</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chocolate Cake</td>
              <td>Food</td>
              <td>25</td>
              <td>Britannia</td>
              <td>3.7</td>
            </tr>
            <tr>
              <td>Strawberry Cake</td>
              <td>Food</td>
              <td>60</td>
              <td>Cadbury</td>
              <td>4.1</td>
            </tr>
            <tr>
              <td>Chocolate Cake</td>
              <td>Food</td>
              <td>60</td>
              <td>Cadbury</td>
              <td>2.5</td>
            </tr>
          </tbody>
        </table>

        <h3>Example 2</h3>
        <p>
          Get all the details of the products that do not belong to the{" "}
          <b>Food</b> category from the <b>product</b> table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT * FROM product
WHERE category <> "Food";`}
        />

        <h3>Output</h3>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>name</th>
              <th>category</th>
              <th>price</th>
              <th>brand</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Blue Shirt</td>
              <td>Clothing</td>
              <td>750</td>
              <td>Denim</td>
              <td>3.8</td>
            </tr>
            <tr>
              <td>Blue Jeans</td>
              <td>Clothing</td>
              <td>800</td>
              <td>Puma</td>
              <td>3.6</td>
            </tr>
            <tr>
              <td>Black Jeans</td>
              <td>Clothing</td>
              <td>750</td>
              <td>Denim</td>
              <td>4.5</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 5. Additional Info */}
      <section>
        <h2>More Examples</h2>
        <p>
          Similarly, we can use other comparison operators like{" "}
          <b>greater than (&gt;)</b>, <b>greater than or equal to (&gt;=)</b>,{" "}
          <b>less than (&lt;)</b>, and <b>less than or equal to (&lt;=)</b> to
          filter the data as per the requirement.
        </p>
      </section>

      {/* 6. Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>
        <p>
          Put your learning into practice and try fetching the products based on
          the following conditions:
        </p>
        <ul>
          <li>rating greater than 4.5</li>
          <li>price less than or equal to 1000</li>
          <li>brand is "Puma"</li>
          <li>product that does not belong to "Gadgets" category</li>
        </ul>
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

export default Comparison_Operators_CS;
