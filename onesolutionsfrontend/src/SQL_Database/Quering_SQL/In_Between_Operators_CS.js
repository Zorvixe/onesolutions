import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const In_Between_Operators_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>IN and BETWEEN Operators</h1>

      <section>
        <p>
          Consider the case of a typical e-commerce scenario. Users generally
          search for the products that belong to a list of brands, or the
          products that lie within a particular price range.
        </p>

        <p>
          In such scenarios, we use the IN operator to check if a value is
          present in the list of values. And, BETWEEN operator is used to check
          if a particular value exists in the given range.
        </p>

        <p>
          Let’s learn about these operators in detail using the following
          database.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The database contains a <code>product</code> table that stores the
          data of products like name, category, price, brand and rating.
        </p>
        <p>
          You can check the schema and data of <code>product</code> table in the
          code playground.
        </p>
      </section>

      <section>
        <h2>IN Operator</h2>
        <p>
          Retrieves the corresponding rows from the table if the value of
          column(c1) is present in the given values(v1,v2,..).
        </p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  table_name
WHERE  c1 IN (v1, v2,..);`}
        />

        <h3>Example</h3>
        <p>
          Get the details of all the products from <code>product</code> table,
          where the <b>brand</b> is either "Puma", "Mufti", "Levi's", "Lee" or
          "Denim".
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  product
WHERE  brand IN ( "Puma", "Levi's", "Mufti", "Lee", "Denim");`}
        />

        <h3>Output</h3>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
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
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <h3>Try it Yourself!</h3>
        <p>
          Get all the products from <code>product</code> table, that belong to
          "Britannia", "Lay's", "Cadbury" brands from the "Food" category.
        </p>
      </section>

      <section>
        <h2>BETWEEN Operator</h2>
        <p>
          Retrieves all the rows from table that have Column(c1) value present
          between the given range(v1 and v2).
        </p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT  *
FROM  table_name
WHERE  c1 BETWEEN v1  AND v2;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <b>BETWEEN</b> operator is inclusive, i.e., both the lower and upper
            limit values of the range are included.
          </p>
        </div>

        <h3>Example</h3>
        <p>
          Find the products with <code>price</code> ranging from 1000 to 5000.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT  name,  price,  brand
FROM  product
WHERE  price BETWEEN 1000  AND 5000;`}
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
              <th>brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Blue Shirt</td>
              <td>1000</td>
              <td>Puma</td>
            </tr>
            <tr>
              <td>Smart Cam</td>
              <td>2600</td>
              <td>Realme</td>
            </tr>
            <tr>
              <td>Realme Smart Band</td>
              <td>3000</td>
              <td>Realme</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Possible Mistakes</h2>

        <p>
          1. When using the <code>BETWEEN</code> operator, the first value
          should be less than second value. If not, we'll get an incorrect
          result depending on the DBMS.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT  name,  price,  brand
FROM  product
WHERE  price BETWEEN 500  AND 300;`}
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
              <th>brand</th>
            </tr>
          </thead>
        </table>

        <p>
          2. We have to give both lower limit and upper limit while specifying
          range.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT  name,  price,  brand
FROM  product
WHERE  price BETWEEN  AND 300;`}
        />

        <div className="Error-message">
          <p>Error: near "AND": syntax error</p>
        </div>

        <p>
          3. The data type of the column for which we're using the{" "}
          <code>BETWEEN</code>
          operator must match with the data types of the lower and upper limits.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT  name,  price,  brand
FROM  product
WHERE  name BETWEEN 300  AND 500;`}
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
              <th>brand</th>
            </tr>
          </thead>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>
        <p>
          Get all the products from the <code>product</code> table with the{" "}
          <b>rating </b>
          values ranging from 4.3 to 4.8.
        </p>
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

export default In_Between_Operators_CS;
