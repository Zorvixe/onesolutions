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
          products. But, the user does not require all the available products
          every time s/he accesses the application. Infact, fetching all the
          products takes too long and consumes huge amount of data.
        </p>
        <p>
          Using pagination, only a chunk of the data can be sent to the user
          based on their request. And, the next chunk of data can be fetched
          only when the user asks for it.
        </p>
        <img
          src="/assets/img/pagination.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />
        <p>
          We use <code>LIMIT</code> & <code>OFFSET</code> clauses to select a
          chunk of the results
        </p>
        <p>
          Let's understand more about pagination concept using the following
          databse.
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
        <h2>Database</h2>
        <p>
          The database contains aproducttable that stores the data of{" "}
          <b>products </b>
          like name, category, price, brand and rating. You can check the schema
          and data ofproducttable in the code playground.
        </p>
      </section>

      {/* LIMIT Section */}
      <section>
        <h2>LIMIT</h2>
        <p>
          <b>LIMIT</b> clause is used to specify the{" "}
          <code>number of rows (n)</code> we want in the result.
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
            If LIMIT value is greater than the total rows, then all rows will be
            retrieved.
          </p>
        </div>
      </section>

      {/* OFFSET Section */}
      <section>
        <h2>OFFSET</h2>
        <p>
          <b>OFFSET</b> is used to specify the starting position{" "}
          <code>
            (from <b>n+1</b>th row)
          </code>{" "}
          from where rows must be selected.
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

        <p>1. Using OFFSET before LIMIT</p>

        <CodeBlock
          language="sql"
          code={`SELECT * 
FROM product 
OFFSET 2 
LIMIT 4;`}
        />
        <div className="Error-message">
          <p>Error: near "2": syntax error</p>
        </div>

        <h3>2. Using OFFSET alone</h3>

        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
OFFSET 2;`}
        />

        <div className="Error-message">
          <p>Error: near "2": syntax error</p>
        </div>

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
          <ul>
            <li>
              In SQLite, <b>OFFSET</b> clause should be used after the{" "}
              <b>LIMIT</b> clause.
            </li>
            <li>
              Default <b>OFFSET</b> value is 0.
            </li>
            <li>
              In PostgreSQL, the <b>OFFSET</b> clause can be used with or
              without the <b>LIMIT</b> clause.
            </li>
          </ul>
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

export default Pagination_CS;
