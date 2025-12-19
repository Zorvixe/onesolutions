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

      {/* Introduction */}
      <section>
        <h2>Database information:</h2>
        <p>
          We can write nested queries, i.e., a query inside another query. A
          subquery must be enclosed in parentheses.
        </p>
        <p>
          Let's understand the scenarios where subqueries can be used with the
          following database.
        </p>
        <img
          src="/assets/img/subqueries_views_practice_set_er_diagram.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />

        <ul>
          <li>
            A <code>user</code> can place multiple <code>orders</code>.
          </li>
          <li>
            An <code>order</code> can be placed by only one <code>user</code>.
          </li>
          <li>
            A single <code>order</code> can contain multiple{" "}
            <code>products</code>.
          </li>
          <li>
            A <code>product</code> can be included in multiple{" "}
            <code>orders</code>.
          </li>
        </ul>
      </section>

      {/* Note */}
      <section>
        <h3>Note</h3>

        {/* User Table */}
        <b>User Table</b>
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
              <td>28 , Super Gas Indl. Estate, Maharastra</td>
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

        <p>
          <code>user</code> table stores the data of the user details i.e.,{" "}
          <code>id</code>, <code>name</code>, <code>age</code>,{" "}
          <code>gender</code>, <code></code>phone_no, <code>address</code> and{" "}
          <code>pincode</code>.
        </p>

        {/* Product Table */}
        <b>Product Table</b>
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

        <p>
          <code>product</code> table stores the data of the product details
          i.e., product_id, name, price_per_unit, rating, category and brand.
        </p>

        {/* Order Product Table */}
        <b>Order Product Table</b>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>611</td>
              <td>236</td>
              <td>1</td>
            </tr>
            <tr>
              <td>611</td>
              <td>248</td>
              <td>2</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <p>
          <code>order_product</code> table stores the data of{" "}
          <code>order_id</code>, <code>product_id</code> and
          <b> no_of_units</b> ordered.
        </p>
        <p>
          First row in the table represents that the order with{" "}
          <code>order_id = 611</code>
          has contain the product with <br></br>
          <code>product_id = 236</code> and the ordered
          <code>no_of_units = 1</code>.
        </p>

        {/* Order Details Table */}
        <b>Order Details Table</b>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>order_id</th>
              <th>customer_id</th>
              <th>order_date</th>
              <th>shipped_date</th>
              <th>shipped_id</th>
              <th>total_amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>500</td>
              <td>15</td>
              <td>2021-01-09 01:14</td>
              <td>2021-01-13 01:14</td>
              <td>3052</td>
              <td>2858</td>
            </tr>
            <tr>
              <td>501</td>
              <td>8</td>
              <td>2021-01-26 07:09</td>
              <td>2021-01-28 07:09</td>
              <td>3086</td>
              <td>5441</td>
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

        <p>
          Similarly, <code>order_details</code> table stores the data of{" "}
          <code>order_id</code>,<code>customer_id</code>,{" "}
          <code>order_date</code>, <code>shipped_date</code>,{" "}
          <code>shipped_id</code> and <code>total_amount</code>.
        </p>

        <p>
          Refer the tables in the code playground for a better understanding of
          the database.
        </p>
      </section>

      {/* Example 1 */}
      <section>
        <h2>Examples</h2>
        <b>Example 1:</b>
        <p>
          <b>Scenario:</b> Get the rating variance of products in the "WATCH"
          category.
        </p>
        <p>
          Rating variance is the difference between average rating and rating of
          a product.
        </p>
        <p>
          Here, we need to write an expression to subtract rating of each
          product from the average rating as following.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT name, 
(average_rating - rating) AS rating_variance
...`}
        />
        <p>
          Replace <code>average_rating</code> with a query which computes the
          average.
        </p>

        <CodeBlock
          language="sql"
          code={`SSELECT
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
          style={{ borderCollapse: "collapse", width: "50%" }}
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
        <b>Example 2:</b>
        <p>
          <b>Scenario:</b> Fetch all the products whose ratings is greater than
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

      {/* Example 3 */}
      <section>
        <b>Example 3</b>
        <p>
          <b>Scenario:</b> Fetch all the order_ids in which order consists of
          mobile (product_ids : 291, 292, 293, 294, 296) and not ear phones
          (product_ids : 227, 228, 229, 232, 233).
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT order_id
FROM order_details
WHERE order_id IN (
  SELECT order_id
  FROM order_product
  WHERE product_id IN (291,292,293,294,296)
)
AND order_id NOT IN (
  SELECT order_id
  FROM order_product
  WHERE product_id IN (227,228,229,232,233)
);`}
        />

        <p>
          <b>Expected Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>order_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>801</td>
            </tr>
            <tr>
              <td>802</td>
            </tr>
            <tr>
              <td>806</td>
            </tr>
            <tr>
              <td>807</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Errors */}
      <section>
        <h2>Possible Mistakes</h2>

        <h3>In SELECT Clause</h3>
        <p>A subquery in the SELECT clause can have only one column.</p>
        <b>Query</b>
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
        <div className="Error-message">
          <p>
            Error: <br></br>sub-select returns 2 columns - expected 1
          </p>
        </div>

        <h3>In WHERE Clause</h3>
        <b>Query</b>
        <p>In WHERE clause, a subquery can have only one column.</p>
        <CodeBlock
          language="sql"
          code={`SELECT order_id, total_amount
FROM order_details
WHERE total_amount > (
  SELECT total_amount, order_id
  FROM order_details
);`}
        />
        <div className="Error-message">
          <p>Error: Row value misused</p>
        </div>
      </section>
      <section>
        <h2>More information about Subqueries</h2>

        {/* Evaluation Order */}
        <p>
          {" "}
          <b>Evaluation Order: </b>
          Innermost subqueries are evaluated first before outer queries.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT name
FROM PRODUCT
WHERE price_per_unit >
(
  SELECT AVG(price_per_unit)
  FROM PRODUCT
);`}
        />

        <p>
          First, the innermost subquery executes and calculates the average of{" "}
          <code>price_per_unit</code> from the <strong>PRODUCT</strong> table.
          The outer query then selects <code>name</code> where the{" "}
          <code>price_per_unit</code> is greater than the computed average.
        </p>

        <p>
          <b>Expected Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chrono Watch</td>
            </tr>
            <tr>
              <td>JBL Flip 3</td>
            </tr>
            <tr>
              <td>JBL TWS</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        {/* Comparison Operators */}
        <p>
          <b>Comparison operators with subqueries: </b>
          Use <b>single-row</b> comparison operators (<code>=</code>,{" "}
          <code>&lt;&gt;</code>,<code>&gt;</code>, <code>&lt;</code>) with
          <br></br>
          <b>single-row</b> subqueries, and <b>multiple-row</b> comparison
          operators (<code>IN</code>, <code>NOT IN</code>,<code>ANY</code>,{" "}
          <code>ALL</code>) with <b>multiple-row</b> subqueries.
        </p>

        {/* Single Row Subquery */}
        <h4>For single row subqueries:</h4>
        <CodeBlock
          language="sql"
          code={`SELECT name
FROM PRODUCT
WHERE product_id =
(
  SELECT product_id
  FROM PRODUCT
  WHERE price_per_unit = 1000
);`}
        />

        <p>
          The innermost subquery retrieves <code>product_id</code>
          with <code>price_per_unit</code> equal to 1000. The outer query
          selects the name for the corresponding <code>product_id</code>.
        </p>

        <p>
          <b>Expected Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gorilla Glass Screen Guard</td>
            </tr>
          </tbody>
        </table>

        {/* Multiple Row Subquery */}
        <h4>For multiple row subqueries</h4>
        <CodeBlock
          language="sql"
          code={`SELECT name
FROM PRODUCT
WHERE category IN
(
  SELECT category
  FROM PRODUCT
  WHERE price_per_unit BETWEEN 1000 AND 10000
);`}
        />

        <p>
          The innermost subquery fetches the <code>categories</code> whose
          <code>price_per_unit</code> is between 1000 and 10000. The outer query
          selects product <code>names</code> belonging to those categories.
        </p>

        <p>
          <b>Expected Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Boat Stone Speaker</td>
            </tr>
            <tr>
              <td>Analog-Digital</td>
            </tr>
            <tr>
              <td>Fastfit Watch</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        {/* NULLs in Subqueries */}
        <h3>Nested queries with NULLs</h3>
        <p>
          If a subquery (inner query) returns a <code>NULL</code> value to the
          outer query, the outer query will not return any rows when using
          certain comparison operators in a <code>WHERE</code> clause.
        </p>

        <p>
          Suppose we have a table named <strong>PRODUCT</strong> with columns
          <b>(product_id, name, price_per_unit, rating, category, brand)</b>. We
          are trying to insert a row by writing the below query.
        </p>

        <CodeBlock
          language="sql"
          code={`INSERT INTO PRODUCT
(product_id, name, price_per_unit, category, brand)
VALUES
(6, "Hockey", 2000, "SPORTS", "REEBOK");`}
        />

        <p>
          Now, if we run the following query, we won't get any rows. This is
          because no value is provided for the <code>rating</code> column in the
          above query, resulting in a <code>NULL</code> value for the newly
          inserted row. Hence, the inner query returns <code>NULL</code> to the
          outer query.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT product_id, name
FROM PRODUCT
WHERE rating =
(
  SELECT rating
  FROM PRODUCT
  WHERE product_id = 6
);`}
        />

        <p>
          <b>Expected Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No Data Found</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>

        <h3>Question 1</h3>
        <p>
          Get the rating variance of products in the "MOBILE" category. Rating
          variance is the difference between average rating and rating of a
          product. Rating variance is the difference between average rating and
          rating of a product and make it rounded off to two decimal places.
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
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

        <h3>Question 2</h3>
        <p>
          Get all the products from the "MOBILE" category, where rating is
          greater than average rating.
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
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

      {/* Continue */}
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
