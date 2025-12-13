import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Logical_Operators_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Logical Operators | Cheat Sheet</h1>

      {/* 1. Introduction */}
      <section>
        <h2>Concepts in Focus</h2>
        <p>
          So far, we've used comparison operators to filter the data. But in
          real-world scenarios, we often have to retrieve data using several
          conditions at once. For example, in e-commerce platforms, users often
          search for something like:
        </p>
        <p>
          <b>
            Get shoes from the Puma brand, which has ratings greater than 4.0
            and price less than 5000.
          </b>
        </p>
        <p>
          With logical operators, we can perform queries based on multiple
          conditions. Let's learn how with the following database.
        </p>
      </section>

      {/* 2. Database */}
      <section>
        <h2>Database</h2>
        <p>
          The database contains a <code>product</code> table that stores the
          data of products like <b>name</b>, <b>category</b>, <b>price</b>,{" "}
          <b>brand</b> and <b>rating</b>.
        </p>
        <p>
          You can check the schema and data of <code>product</code> table in the
          code playground.
        </p>
      </section>

      {/* 3. Logical Operators */}
      <section>
        <h2>AND, OR, NOT</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AND</td>
              <td>Used to fetch rows that satisfy two or more conditions.</td>
            </tr>
            <tr>
              <td>OR</td>
              <td>
                Used to fetch rows that satisfy at least one of the conditions.
              </td>
            </tr>
            <tr>
              <td>NOT</td>
              <td>
                Used to negate a condition in the <b>WHERE</b> clause.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. Syntax */}
      <section>
        <h2>Syntax</h2>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  table_name
WHERE  condition1  operator condition2  operator condition3  ...;`}
        />
      </section>

      {/* 5. Examples */}
      <section>
        <h2>Examples</h2>

        <p>
          1. Get all the details of the products whose <b>category</b> is
          "Clothing" and <b>price</b> is less than or equal to 1000 from the{" "}
          <b>product</b> table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  product
WHERE  category = "Clothing"  AND price <= 1000;`}
        />
        <h3>Output</h3>
        <table className="styled-table">
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

        <p>
          2. Ignore all the products with <code>name</code> containing "Cake"
          from the list of products.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  product
WHERE  NOT name LIKE "%Cake%";`}
        />
        <h3>Output</h3>
        <table className="styled-table">
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

      {/* 6. Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>
        <ul>
          <li>
            Fetch all the products with <code>price</code> less than 20000 and{" "}
            <code>brand</code> is "Apple".
          </li>
          <li>
            Fetch all the products which follow any of the following conditions:
            <code>rating</code> greater than 4.0 or <code>brand</code> is
            "Britannia".
          </li>
          <li>
            Ignore all the products with <code>category</code> containing "Food"
            in the
            <code>product</code> table.
          </li>
        </ul>
      </section>

      {/* 7. Multiple Logical Operators */}
      <section>
        <h2>Multiple Logical Operators</h2>
        <p>
          We can also use combinations of logical operators to combine more than
          two conditions. These compound conditions enable us to fine-tune data
          retrieval requirements.
        </p>

        <h3>Precedence</h3>
        <img
          src="/assets/img/logic_operator.png"
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
        <p>
          When a query has multiple logical operators, operator precedence
          determines the order:
        </p>
        <ul>
          <li>NOT</li>
          <li>AND</li>
          <li>OR</li>
        </ul>

        <h3>Example</h3>
        <p>Fetch the products that follow any of the following condition:</p>
        <ul>
          <li>
            Belongs to Redmi <code>brand</code> and <code>rating</code> greater
            than <b>4</b>
          </li>
          <li>
            Belongs to the products from OnePlus <code>brand</code>
          </li>
        </ul>

        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  product
WHERE  brand = "Redmi"  AND rating > 4  OR brand = "OnePlus";`}
        />

        <p>
          In the above query, <b>AND</b> has precedence over <b>OR</b>. So, the
          query is equivalent to:
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  product
WHERE  (brand = "Redmi" AND rating > 4) OR brand = "OnePlus";`}
        />

        <div className="Quick-Tip-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-lightbulb"></i>Quick Tip:
            </h6>
          </div>
          <p>
            Always use parentheses to ensure correctness while grouping
            conditions.
          </p>
        </div>
      </section>

      {/* 8. Try it Yourself 2 */}
      <section>
        <h2>Try it Yourself!</h2>
        <ul>
          <li>
            Fetch all the products from the <code>"Clothing"</code> category
            whose name does not contain <code>"Jeans"</code>.
          </li>
          <li>
            Fetch all the products belonging to any of the brands: Puma, Denim.
            Exclude the products with names containing <code>"Shirts"</code>.
          </li>

          <li>
            Fetch all the products that satisfy any of the following conditions:
            <ul>
              <li>price less than 100</li>
              <li>
                products belong to the <code>"Food"</code> category.
              </li>
            </ul>
            Of the products satisfying the above conditions, excluding the ones
            with the name containing <code>"Chocolate"</code>.
          </li>
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

export default Logical_Operators_CS;
