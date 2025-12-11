import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Pagination_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Pagination</h1>

      <section>
        <p>
          E-commerce applications like Amazon or Flipkart hold millions of
          products. But the user does not require all the products at once.
          Fetching everything consumes a large amount of time and data.
        </p>

        <p>
          Using <b>pagination</b>, only a small chunk of data is fetched based
          on user request. The next chunk is fetched only when the user needs
          it.
        </p>

        {/* Note Box */}
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>Pagination helps reduce server load and improves performance.</p>
          <p>Only the required number of rows are fetched at a time.</p>
        </div>
      </section>

      <section>
        <h2>We use LIMIT &amp; OFFSET to fetch a chunk of results</h2>
        <p>
          Let's understand the pagination concept using the{" "}
          <b>product</b> table.
        </p>

        <h2>Database</h2>
        <p>
          The database contains a <b>product</b> table with name, category,
          price, brand and rating.
        </p>
      </section>

      {/* LIMIT Section */}
      <section>
        <h2>LIMIT</h2>
        <p>
          <b>LIMIT</b> clause is used to specify the{" "}
          <b>number of rows (n)</b> we want in the result.
        </p>

        <h3>Syntax</h3>

        <CodeBlock
          language="sql"
          code={`SELECT column1, column2, .. columnN
FROM table_name
LIMIT n;`}
        />

        <h3>Example</h3>
        <p>Get the details of 2 top-rated products from the brand "Puma".</p>

        <CodeBlock
          language="sql"
          code={`SELECT name, price, rating
FROM product
WHERE brand = "Puma"
ORDER BY rating DESC
LIMIT 2;`}
        />

        <h3>Output</h3>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>price</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Black Shirt</td>
              <td>600</td>
              <td>4.8</td>
            </tr>
            <tr>
              <td>Blue Shirt</td>
              <td>1000</td>
              <td>4.3</td>
            </tr>
          </tbody>
        </table>

        <h3>Try it Yourself!</h3>
        <p>Get the 3 lowest priced products from the brand "Puma".</p>

        {/* Note Box */}
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            If LIMIT value is greater than the total rows, then all rows will
            be retrieved.
          </p>
        </div>
      </section>

      {/* OFFSET Section */}
      <section>
        <h2>OFFSET</h2>
        <p>
          <b>OFFSET</b> is used to specify the starting position (from{" "}
          <b>n+1</b>th row) from where rows must be selected.
        </p>

        <h3>Syntax</h3>

        <CodeBlock
          language="sql"
          code={`SELECT column1, column2, .. columnN
FROM table_name
LIMIT m OFFSET n;`}
        />

        <h3>Example</h3>
        <p>Get the details of 5 top-rated products starting from 7th row.</p>

        <CodeBlock
          language="sql"
          code={`SELECT name, price, rating
FROM product
ORDER BY rating DESC
LIMIT 5 OFFSET 6;`}
        />

        <h3>Output</h3>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "55%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>price</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bourbon Special</td>
              <td>15</td>
              <td>4.6</td>
            </tr>
            <tr>
              <td>Realme Smart Band</td>
              <td>3000</td>
              <td>4.6</td>
            </tr>
            <tr>
              <td>Harry Potter - Goblet of Fire</td>
              <td>431</td>
              <td>4.6</td>
            </tr>
            <tr>
              <td>Black Jeans</td>
              <td>750</td>
              <td>4.5</td>
            </tr>
            <tr>
              <td>Potato Chips Cream & Onion</td>
              <td>63</td>
              <td>4.5</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Possible Mistakes */}
      <section>
        <h2>Possible Mistakes</h2>

        <h3>1. Using OFFSET before LIMIT</h3>

        <CodeBlock
          language="sql"
          code={`SELECT * 
FROM product 
OFFSET 2 
LIMIT 4;`}
        />

        <p><b>Error:</b> near "2": syntax error</p>

        <h3>2. Using OFFSET alone</h3>

        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
OFFSET 2;`}
        />

        <p><b>Error:</b> near "2": syntax error</p>

        <h3>Try it Yourself!</h3>
        <p>
          Get the details of 5 top-rated products, starting from the 10th row.
        </p>

        {/* Notes */}
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>In SQLite, OFFSET must be used after LIMIT.</p>
          <p>Default OFFSET value is 0.</p>
          <p>
            In PostgreSQL, OFFSET can be used <b>with or without</b> LIMIT.
          </p>
        </div>
      </section>

      {/* Continue Button */}
      <div className="view-continue" style={{ marginTop: "20px" }}>
        <button
          className={`btn-continue ${
            isSubtopicCompleted ? "completed" : ""
          }`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted}
        >
          {isSubtopicCompleted ? "Completed" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Pagination_CS;
