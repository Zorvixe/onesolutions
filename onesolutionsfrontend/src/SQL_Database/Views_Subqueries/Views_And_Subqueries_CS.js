import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Views_And_Subqueries_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Views</h1>

      {/* Database */}
      <section>
        <h2>Database</h2>
        <p>The database stores the sample data of an e-commerce application.</p>
        <p>
          Here, the database consists of <code>user</code>,{" "}
          <code>order_details</code> and <code>product</code> tables that store
          the information of products, orders placed, and the products on the
          platform.
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

        <p>
          The given database consists of the tables <code>user</code>,{" "}
          <code>product</code>, <code>order_product</code> and{" "}
          <code>order_details</code>.
        </p>
      </section>

      {/* User table */}
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

        <p>
          <code>user</code> table stores the data of the user details i.e.,{" "}
          <b>id, name, age, gender, phone_no, address</b> and <b>pincode</b>.
        </p>
      </section>

      {/* Product table */}
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

        <p>
          <code>product</code> table stores the data of the product details.
        </p>
        <p>
          <code>product_id</code>,<code>name</code>,<code>price_per_unit</code>,
          <code>rating</code>,<code>category</code> and brand.
        </p>
      </section>

      {/* Order product */}
      <section>
        <h2>Order Product Table</h2>
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
          <code>order_producttable</code> stores the data of order_id,
          product_id and no_of_units ordered.
        </p>
        <p>
          First row in the table represents that the order with order_id=611 has
          contain the product with product_id=236 and the ordered no_of_units=1.
        </p>
      </section>

      {/* Order details */}
      <section>
        <h2>Order Details Table</h2>
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
          Similarly, <code>order_detailstable</code> stores the data of
          order_id, customer_id, order_date, shipped_date, shipped_id and
          total_amount.
        </p>
      </section>

      {/* Error format example */}
      <section>
        <h3>Error Example</h3>
        <CodeBlock
          language="sql"
          code={`SELECT name, address\nFROM user_base_details\nWHERE gender = "Male"\nORDER BY age ASC;`}
        />
        <div className="Error-message">
          <p>Error: no such column:address</p>
        </div>
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

export default Views_And_Subqueries_CS;
