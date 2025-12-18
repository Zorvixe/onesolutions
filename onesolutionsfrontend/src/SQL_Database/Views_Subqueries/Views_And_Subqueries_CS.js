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

        <ul>
          <li>A user can place multiple orders.</li>
          <li>An order can be placed by only one user.</li>
          <li>A single order can contain multiple products.</li>
          <li>A product can be included in multiple orders.</li>
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
          <code>user</code> table stores the data of the user details i.e., id,
          name, age, gender, phone_no, address and pincode.
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
          First row represents that order_id = 611 contains product_id = 236
          with no_of_units = 1.
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
      </section>

      {/* View */}
      <section>
        <h2>View</h2>
        <p>A view can simply be considered as a name to a SQL query.</p>

        <h3>Create View</h3>
        <CodeBlock
          language="sql"
          code={`CREATE VIEW user_base_details AS
SELECT id, name, age, gender, pincode
FROM user;`}
        />

        <div className="Note-container">
          <p>
            <b>Note:</b> In general, views are read only. We cannot perform
            insert, update or delete operations through views.
          </p>
        </div>
      </section>

      {/* Querying view */}
      <section>
        <h2>Querying Using View</h2>

        <CodeBlock
          language="sql"
          code={`SELECT *
FROM user_base_details;`}
        />

        <p>
          <b>Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
              <th>gender</th>
              <th>pincode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sai</td>
              <td>40</td>
              <td>Male</td>
              <td>400068</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Boult</td>
              <td>20</td>
              <td>Male</td>
              <td>30154</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Sri</td>
              <td>20</td>
              <td>Female</td>
              <td>700009</td>
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

      {/* Error example */}
      <section>
        <h3>Error Example</h3>
        <CodeBlock
          language="sql"
          code={`SELECT name, address
FROM user_base_details
WHERE gender = "Male"
ORDER BY age ASC;`}
        />

        <p>
          <b>Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <tbody>
            <tr>
              <td>Error: no such column: address</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* List views */}
      <section>
        <h2>List All Available Views</h2>
        <CodeBlock
          language="sql"
          code={`SELECT name
FROM sqlite_master
WHERE TYPE = 'view';`}
        />

        <p>
          <b>Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <thead>
            <tr>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>order_with_products</td>
            </tr>
            <tr>
              <td>user_base_details</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Drop view */}
      <section>
        <h2>Delete View</h2>
        <CodeBlock language="sql" code={`DROP VIEW user_base_details;`} />
      </section>

      {/* Advantages */}
      <section>
        <h2>Advantages</h2>
        <ul>
          <li>Used to store complex queries for reuse</li>
          <li>Restrict access to sensitive data</li>
        </ul>
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
