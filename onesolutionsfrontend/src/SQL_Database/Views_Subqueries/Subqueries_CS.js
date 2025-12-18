import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Subqueries_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Subqueries</h1>

      {/* Intro */}
      <section>
        <p>
          We can write nested queries, i.e., a query inside another query. A
          subquery must be enclosed in parentheses.
        </p>

        <p>
          Let's understand the scenarios where subqueries can be used with the
          following database.
        </p>
      </section>

      {/* Database */}
      <section>
        <h2>Database Information</h2>

        <p>
          The database stores the sample data of an e-commerce application. It
          consists of <code>user</code>, <code>order_details</code> and{" "}
          <code>product</code> tables.
        </p>

        <ul>
          <li>A user can place multiple orders.</li>
          <li>An order can be placed by only one user.</li>
          <li>A single order can contain multiple products.</li>
          <li>A product can be included in multiple orders.</li>
        </ul>
      </section>

      {/* User Table */}
      <section>
        <h2>User Table</h2>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
              <th>gender</th>
              <th>phone_no</th>
              <th>address</th>
              <th>pincode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sai</td>
              <td>40</td>
              <td>Male</td>
              <td>9860XXXXXX</td>
              <td>28, Super Gas Indl. Estate, Maharastra</td>
              <td>400068</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Boult</td>
              <td>20</td>
              <td>Male</td>
              <td>7328XXXXXX</td>
              <td>5454 Interstate, US</td>
              <td>30154</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Product Table */}
      <section>
        <h2>Product Table</h2>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>product_id</th>
              <th>name</th>
              <th>price_per_unit</th>
              <th>rating</th>
              <th>category</th>
              <th>brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>201</td>
              <td>Biotique Basil Soap</td>
              <td>81</td>
              <td>3.2</td>
              <td>SOAP</td>
              <td>BIPTIQUE</td>
            </tr>
            <tr>
              <td>202</td>
              <td>Biotique Almond Soap</td>
              <td>34</td>
              <td>4.5</td>
              <td>SOAP</td>
              <td>BIPTIQUE</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Example 1 */}
      <section>
        <h2>Example 1</h2>
        <p>
          <b>Scenario:</b> Get the rating variance of products in the{" "}
          <code>WATCH</code> category.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT 
  name,
  ROUND(
    (
      SELECT AVG(rating)
      FROM product
      WHERE category = "WATCH"
    ) - rating,
    2
  ) AS rating_variance
FROM product
WHERE category = "WATCH";`}
        />

        <p>
          <b>Expected Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>rating_variance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Analog-Digital</td>
              <td>-0.77</td>
            </tr>
            <tr>
              <td>Fastfit Watch</td>
              <td>-0.37</td>
            </tr>
            <tr>
              <td>Fastrack M01</td>
              <td>0.33</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Example 2 */}
      <section>
        <h2>Example 2</h2>
        <p>
          <b>Scenario:</b> Fetch all the products whose rating is greater than
          average rating of all products.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE rating > (
  SELECT AVG(rating)
  FROM product
);`}
        />

        <p>
          <b>Expected Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>product_id</th>
              <th>name</th>
              <th>price_per_unit</th>
              <th>rating</th>
              <th>category</th>
              <th>brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>202</td>
              <td>Biotique Almond Soap</td>
              <td>34</td>
              <td>4.5</td>
              <td>SOAP</td>
              <td>BIPTIQUE</td>
            </tr>
            <tr>
              <td>203</td>
              <td>Boat Stone Speaker</td>
              <td>1999</td>
              <td>4.3</td>
              <td>SPEAKER</td>
              <td>BOAT</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Possible Mistakes */}
      <section>
        <h2>Possible Mistakes</h2>

        <h3>In SELECT Clause</h3>
        <CodeBlock
          language="sql"
          code={`SELECT name,
(
  SELECT AVG(rating), MAX(rating)
  FROM product
  WHERE category = "WATCH"
) - rating AS rating_variance
FROM product
WHERE category = "WATCH";`}
        />

        <p>
          <b>Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <tbody>
            <tr>
              <td>Error: sub-select returns 2 columns - expected 1</td>
            </tr>
          </tbody>
        </table>

        <h3>In WHERE Clause</h3>
        <CodeBlock
          language="sql"
          code={`SELECT order_id, total_amount
FROM order_details
WHERE total_amount > (
  SELECT total_amount, order_id
  FROM order_details
);`}
        />

        <p>
          <b>Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <tbody>
            <tr>
              <td>Error: Row value misused</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Try It Yourself */}
      <section>
        <h2>Try it Yourself!</h2>

        <p>
          <b>Question 1</b>
        </p>
        <p>
          Get the rating variance of products in the <code>MOBILE</code>{" "}
          category and round it to two decimal places.
        </p>

        <p>
          <b>Expected Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>rating_variance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oneplus 8 Pro</td>
              <td>-0.04</td>
            </tr>
            <tr>
              <td>Oneplus 8t Pro</td>
              <td>0.26</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <p>
          <b>Question 2</b>
        </p>
        <p>
          Get all the products from the <code>MOBILE</code> category where
          rating is greater than average rating.
        </p>

        <p>
          <b>Expected Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oneplus 8 Pro</td>
              <td>4.5</td>
            </tr>
            <tr>
              <td>Mi 10T</td>
              <td>4.5</td>
            </tr>
            <tr>
              <td>Samsung S21 Ultra</td>
              <td>4.7</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

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

export default Subqueries_CS;
