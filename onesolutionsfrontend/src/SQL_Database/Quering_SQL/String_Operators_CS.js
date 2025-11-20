import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const String_Operators_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>String Operations | Cheat Sheet</h1>

      {/* 1. Introduction */}
      <section>
        <h2>Concepts in Focus</h2>
        <p>
          Consider the case of e-commerce platforms. We generally search for the
          products on the basis of product name. But while searching, we need
          not enter the full name. For example, typing “mobiles” in a search bar
          will fetch thousands of results. How to get the data on the basis of
          only a part of the string? Let’s learn about it!
        </p>
      </section>

      {/* 2. Database */}
      <section>
        <h2>Database</h2>
        <p>
          The database contains a <b>product</b> table that stores the data of
          products like <b>name</b>, <b>category</b>, <b>price</b>, <b>brand</b>{" "}
          and <b>rating</b>.
        </p>
        <p>
          You can check the schema and data of <b>product</b> table in the code
          playground.
        </p>
      </section>

      {/* 3. LIKE Operator */}
      <section>
        <h2>LIKE Operator</h2>
        <p>
          <b>LIKE</b> operator is used to perform queries on strings. This
          operator is especially used in <b>WHERE</b> clause to retrieve all the
          rows that match the given pattern.
        </p>
        <p>
          We write <b>patterns</b> using the following <b>wildcard</b>{" "}
          characters:
        </p>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Percent sign (%)</td>
              <td>Represents zero or more characters</td>
              <td>
                ch% finds <b>ch</b>, <b>chips</b>, <b>chocolate</b>..
              </td>
            </tr>
            <tr>
              <td>Underscore (_)</td>
              <td>Represents a single character</td>
              <td>
                _at finds <b>mat</b>, <b>hat</b> and <b>bat</b>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. Common Patterns */}
      <section>
        <h2>Common Patterns</h2>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Example</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Exact Match</td>
              <td>WHERE name LIKE "mobiles"</td>
              <td>
                Retrieves products whose name is exactly equals to "mobiles"
              </td>
            </tr>
            <tr>
              <td>Starts With</td>
              <td>WHERE name LIKE "mobiles%"</td>
              <td>Retrieves products whose name starts with "mobiles"</td>
            </tr>
            <tr>
              <td>Ends With</td>
              <td>WHERE name LIKE "%mobiles"</td>
              <td>Retrieves products whose name ends with "mobiles"</td>
            </tr>
            <tr>
              <td>Contains</td>
              <td>WHERE name LIKE "%mobiles%"</td>
              <td>Retrieves products whose name contains "mobiles"</td>
            </tr>
            <tr>
              <td>Pattern Matching</td>
              <td>WHERE name LIKE "a_%"</td>
              <td>
                Retrieves products whose name starts with "a" and have at least
                2 characters in length
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 5. Syntax */}
      <section>
        <h2>Syntax</h2>
        <CodeBlock
          language="sql"
          code={`SELECT
    *
FROM
    table_name
WHERE
    c1 LIKE matching_pattern;`}
        />
      </section>

      {/* 6. Examples */}
      <section>
        <h2>Examples</h2>

        <h3>Example 1</h3>
        <p>
          Get all the products in the "Gadgets" category from the <b>product</b>{" "}
          table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  product
WHERE  category LIKE "Gadgets";`}
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
              <td>Smart Watch</td>
              <td>Gadgets</td>
              <td>17000</td>
              <td>Apple</td>
              <td>4.9</td>
            </tr>
            <tr>
              <td>Smart Cam</td>
              <td>Gadgets</td>
              <td>2600</td>
              <td>Realme</td>
              <td>4.7</td>
            </tr>
            <tr>
              <td>Smart TV</td>
              <td>Gadgets</td>
              <td>40000</td>
              <td>Sony</td>
              <td>4.0</td>
            </tr>
            <tr>
              <td>Realme Smart Band</td>
              <td>Gadgets</td>
              <td>3000</td>
              <td>Realme</td>
              <td>4.6</td>
            </tr>
          </tbody>
        </table>

        <h3>Example 2</h3>
        <p>
          Get all the products whose <b>name</b> starts with "Bourbon" from the{" "}
          <b>product</b> table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  product
WHERE  name LIKE "Bourbon%";`}
        />
        <p>
          Here <b>%</b> represents that, following the string "Bourbon", there
          can be 0 or more characters.
        </p>

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
              <td>Bourbon Small</td>
              <td>Food</td>
              <td>10</td>
              <td>Britannia</td>
              <td>3.9</td>
            </tr>
            <tr>
              <td>Bourbon Special</td>
              <td>Food</td>
              <td>15</td>
              <td>Britannia</td>
              <td>4.6</td>
            </tr>
            <tr>
              <td>Bourbon With Extra Cookies</td>
              <td>Food</td>
              <td>30</td>
              <td>Britannia</td>
              <td>4.4</td>
            </tr>
          </tbody>
        </table>

        <h3>Example 3</h3>
        <p>
          Get all smart electronic products i.e., name contains "Smart" from the{" "}
          <b>product</b> table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  product
WHERE  name LIKE "%Smart%";`}
        />
        <p>
          Here, <b>%</b> before and after the string "Smart" represents that
          there can be 0 or more characters succeeding or preceding the string.
        </p>

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
              <td>Smart Watch</td>
              <td>Gadgets</td>
              <td>17000</td>
              <td>Apple</td>
              <td>4.9</td>
            </tr>
            <tr>
              <td>Smart Cam</td>
              <td>Gadgets</td>
              <td>2600</td>
              <td>Realme</td>
              <td>4.7</td>
            </tr>
            <tr>
              <td>Smart TV</td>
              <td>Gadgets</td>
              <td>40000</td>
              <td>Sony</td>
              <td>4.0</td>
            </tr>
            <tr>
              <td>Realme Smart Band</td>
              <td>Gadgets</td>
              <td>3000</td>
              <td>Realme</td>
              <td>4.6</td>
            </tr>
          </tbody>
        </table>

        <h3>Example 4</h3>
        <p>
          Get all the products which have exactly 5 characters in <b>brand</b>{" "}
          from the product table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  product
WHERE  brand LIKE "_____";`}
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
              <td>Black Jeans</td>
              <td>Clothing</td>
              <td>750</td>
              <td>Denim</td>
              <td>4.5</td>
            </tr>
            <tr>
              <td>Smart Watch</td>
              <td>Gadgets</td>
              <td>17000</td>
              <td>Apple</td>
              <td>4.9</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 7. Note */}
      <section>
        <h2>Note</h2>
        <p>
          The percent sign (<b>%</b>) is used when we are not sure of the number
          of characters present in the string.
        </p>
        <p>
          If we know the exact length of the string, then the wildcard character{" "}
          <b>underscore (_)</b> comes in handy.
        </p>
      </section>

      {/* 8. Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>
        <p>
          Put your learning into practice and try fetching the products based on
          the different patterns:
        </p>
        <p>Write a query for each of the below patterns.</p>
        <ul>
          <li>category is exactly "Food".</li>
          <li>name containing "Cake".</li>
          <li>name ends with "T-Shirt".</li>
          <li>name contains "Chips".</li>
          <li>category contains exactly 4 characters.</li>
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

export default String_Operators_CS;
