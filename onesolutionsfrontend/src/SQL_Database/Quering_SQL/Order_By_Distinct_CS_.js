import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Order_By_Distinct_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>ORDER BY and DISTINCT</h1>

      <section>
        <p>
          In any e-commerce application, users have the option of sorting the
          products based on price, rating, etc. Also, for any product, users
          could know all the distinct brands available for the product.
        </p>

        <p>Let's learn how to retrieve such ordered results and unique data!</p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The database contains a <b>product</b> table that stores the data of
          products like name, category, price, brand and rating.
        </p>
        <p>
          You can check the schema and data of <b>product</b> table in the code
          playground.
        </p>
      </section>

      {/* ORDER BY Section */}
      <section>
        <h2>ORDER BY</h2>
        <p>
          We use <b>ORDER BY</b> clause to order rows. By default, ORDER BY
          sorts the data in the <b>ascending order</b>.
        </p>

        <h3>Syntax</h3>

        <CodeBlock
          language="sql"
          code={`SELECT  column1, column2, .. columnN
FROM  table_name
[WHERE condition]
ORDER BY  column1 ASC / DESC;`}
        />

        <h3>Example</h3>
        <p>
          Get all products in the order of lowest price first in <b>"Puma"</b>{" "}
          brand.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT  name, price, rating
FROM  product
WHERE  brand = "Puma"
ORDER BY  price ASC;`}
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
              <td>Blue Jeans</td>
              <td>800</td>
              <td>3.6</td>
            </tr>
            <tr>
              <td>Blue Shirt</td>
              <td>1000</td>
              <td>4.3</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ORDER BY - Multiple Columns */}
      <section>
        <h2>ORDER BY with Multiple Columns</h2>

        <p>
          When you specify multiple columns in ORDER BY, the data is first
          sorted by the first column. If values match, sorting continues using
          the second column, and so on.
        </p>

        <h3>Syntax</h3>

        <CodeBlock
          language="sql"
          code={`SELECT column1, column2, .. columnN
FROM table_name
[WHERE condition]
ORDER BY column1 ASC / DESC,
         column2 ASC / DESC;`}
        />

        <h3>Example 1</h3>
        <p>
          Get all the products with the name <b>"Blue Shirt"</b> in the order of
          highest rating first and then lowest price.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT  name, price, rating
FROM  product
WHERE  name = "Blue Shirt"
ORDER BY  rating DESC, price ASC;`}
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
              <td>Blue Shirt</td>
              <td>1000</td>
              <td>4.3</td>
            </tr>
            <tr>
              <td>Blue Shirt</td>
              <td>750</td>
              <td>3.8</td>
            </tr>
          </tbody>
        </table>

        <h3>Example 2</h3>
        <p>
          Get all the products with the name <b>"Black Jeans"</b> and{" "}
          <b>"Blue Shirt"</b> in the order of lowest price first and then
          highest rating.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT  name, price, rating
FROM  product
WHERE  name IN ("Black Jeans", "Blue Shirt")
ORDER BY  price ASC, rating DESC;`}
        />

        <h3>Output</h3>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "45%" }}
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
              <td>Black Jeans</td>
              <td>750</td>
              <td>4.5</td>
            </tr>
            <tr>
              <td>Blue Shirt</td>
              <td>750</td>
              <td>3.8</td>
            </tr>
            <tr>
              <td>Blue Shirt</td>
              <td>1000</td>
              <td>4.3</td>
            </tr>
          </tbody>
        </table>

        <h3>Try it Yourself!</h3>
        <p>
          Get all the shirts from <b>product</b> table in the{" "}
          <b>descending order of rating</b> and <b>ascending order of price</b>.
        </p>

        <p>
          <b>Note:</b> A product is a shirt if the <b>name</b> contains "Shirt".
        </p>
      </section>

      {/* DISTINCT Section */}
      <section>
        <h2>DISTINCT</h2>
        <p>
          DISTINCT clause is used to return the <b>unique</b> values from a
          column.
        </p>

        <h3>Syntax</h3>

        <CodeBlock
          language="sql"
          code={`SELECT DISTINCT column1, column2, ..
FROM  table_name
WHERE [condition];`}
        />

        <h3>Example</h3>
        <p>Get all the unique brands present in the product table.</p>

        <CodeBlock
          language="sql"
          code={`SELECT DISTINCT brand
FROM product
ORDER BY brand;`}
        />

        <h3>Output</h3>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Absa</td>
            </tr>
            <tr>
              <td>Apple</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <h3>Try it Yourself!</h3>
        <p>
          Get a list of distinct <b>categories</b> available in the{" "}
          <b>product</b> table.
        </p>
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

export default Order_By_Distinct_CS;
