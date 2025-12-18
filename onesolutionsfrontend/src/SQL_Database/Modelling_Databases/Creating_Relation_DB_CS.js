import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Creating_Relation_DB_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Modelling Databse - 2</h1>

      <section>
        <h2>Creating a Relational Database</h2>
        <p>
          In the previous sessions, we've explored how to represent an ER model
          in the form of tables in a relational database.
        </p>
        <p>
          Now, let's create tables to store the data in the database by defining
          all the columns and relationships between the tables.
        </p>
        <p>
          Consider the <b>e-commerce scenario</b>. The tables, columns and the
          relations between them are as follows.
          <section>
            <div className="img-text">
              <div className="text">
                <img
                  src="/assets/img/keys_relational_database.png"
                  alt="DOM Tree"
                  style={{ width: "100%", height: "100px", padding: "20px" }}
                />
              </div>
            </div>
            <img
              src="/assets/img/customer_address_rd_model.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <img
              src="/assets/img/cart_product_relational_model.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <img
              src="/assets/img/cart_product_junction_table.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
          </section>
        </p>
      </section>

      <section>
        <h2>Primary Key</h2>
        <p>
          Following syntax creates a table with <code>c1</code> as the primary
          key.
        </p>

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE table_name (
  c1 t1 NOT NULL PRIMARY KEY,
  ...
  cn tn
);`}
        />
      </section>

      <section>
        <h2>Foreign Key</h2>
        <p>In case of foreign key, we just create a foreign key constraint.</p>

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE table2(
  c1 t1 NOT NULL PRIMARY KEY,
  c2 t2,
  FOREIGN KEY(c2) REFERENCES table1(c3) ON DELETE CASCADE
);`}
        />

        <p>
          <b>Understanding</b>
        </p>
        <CodeBlock
          language="sql"
          code={`FOREIGN KEY(c2) REFERENCES table1(c3)`}
        />
        <p>
          Above part of the foreign key constraint ensure that foreign key can
          only contain values that are in the referenced primary key.
        </p>

        <CodeBlock language="sql" code={`ON DELETE CASCADE`} />
        <p>
          Ensure that if a row in <code>table1</code> is deleted, then all its
          related rows in <code>table2</code> will also be deleted.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            To enable foreign key constraints in SQLite, use
            <b> PRAGMA foreign_keys = ON;</b> By default it is enabled in our
            platform!
          </p>
        </div>
      </section>

      <section>
        <h2>Creating Tables in Relational Database</h2>

        <h3>Customer Table</h3>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE customer (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(250),
  age INT
);`}
        />

        <h3>Product Table</h3>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE product (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(250),
  price INT,
  brand VARCHAR(250),
  category VARCHAR(250)
);`}
        />

        <h3>Address Table</h3>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE address(
  id INTEGER NOT NULL PRIMARY KEY,
  pin_code INTEGER,
  door_no VARCHAR(250),
  city VARCHAR(250),
  customer_id INTEGER,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);`}
        />

        <h3>Cart Table</h3>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE cart(
  id INTEGER NOT NULL PRIMARY KEY,
  customer_id INTEGER NOT NULL UNIQUE,
  total_price INTEGER,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);`}
        />

        <h3>Cart Product Table (Junction Table)</h3>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE cart_product(
  id INTEGER NOT NULL PRIMARY KEY,
  cart_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);`}
        />
      </section>

      <section>
        <h2>Inserting data into the respective tables</h2>

        <h3>Customer Table</h3>
        <CodeBlock
          language="sql"
          code={`INSERT INTO customer(id, name, age)
VALUES
  (1, 'John', 29),
  (2, 'Emma', 24);`}
        />

        <h3>Address Table</h3>
        <CodeBlock
          language="sql"
          code={`INSERT INTO address(id, pin_code, door_no, city, customer_id)
VALUES
  (1001, 517130, '6-1', 'Hyderabad', 1),
  (1002, 615670, '6-13', 'Bengaluru', 1);`}
        />

        <h3>Cart Table</h3>
        <CodeBlock
          language="sql"
          code={`INSERT INTO cart(id, total_price, customer_id)
VALUES
  (1, 12000, 1),
  (2, 500, 2);`}
        />

        <h3>Product Table</h3>
        <CodeBlock
          language="sql"
          code={`INSERT INTO product(id, name, price, brand, category)
VALUES
  (1, 'Jeans', 1500, 'Pepe', 'Clothing'),
  (2, 'T-shirt', 500, 'Puma', 'Clothing'),
  (3, 'Mobile', 10000, 'Redmi', 'Gadgets'),
  (4, 'Watch', 2000, 'Titan', 'Gadgets');`}
        />

        <h3>Cart Product Table</h3>
        <CodeBlock
          language="sql"
          code={`INSERT INTO cart_product(id, cart_id, product_id, quantity)
VALUES
  (1, 1, 1, 1),
  (2, 1, 2, 1),
  (3, 1, 3, 1),
  (4, 2, 1, 1);`}
        />
      </section>

      <section>
        <h2>Querying in SQL</h2>
        <p>
          Once we've inserted data into the tables, the next step is to learn
          how to retrieve and analyze it by extracting meaningful information
          using SQL queries
        </p>

        <h3>1. One-to-Many Relationships</h3>
        <p>
          In a one-to-many relationship, one record in the first table is linked
          to many records in another table.
        </p>
        <p>For example, a customer can have multiple addresses.</p>

        <p>
          <b>Scenario:</b> Retrieve all the addresses for <code>John</code>
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT *
FROM customer
JOIN address ON customer.id = address.customer_id
WHERE customer.name = 'John';`}
        />

        <p>
          <b>Explanation:</b>
        </p>
        <ul>
          <li>
            The customer table and the address table are joined on{" "}
            <code>customer.id</code>
            and <code>address.customer_id</code>
          </li>
          <li>
            This retrieves all the records from the address table where the
            customer is John.
          </li>
        </ul>

        <h3>2. One-to-One Relationships</h3>
        <p>
          In a one-to-one relationship, each record in one table is associated
          with exactly one record in another table. For example, each customer
          has exactly one cart.
        </p>

        <p>
          <b>Scenario:</b> Retrieve the cart details for <code>John</code>
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT *
FROM customer
JOIN cart ON customer.id = cart.customer_id
WHERE customer.name = 'John';`}
        />

        <p>
          <b>Explanation:</b>
        </p>
        <ul>
          <li>
            The customer and cart tables are joined on <code>customer.id</code>{" "}
            and
            <code>cart.customer_id</code>
          </li>
          <li>
            This query retrieves the cart details of<code>John</code>.
          </li>
        </ul>

        <h3>3. Many-to-Many Relationships</h3>
        <p>
          A many-to-many relationship occurs when multiple records in one table
          are related to multiple records in another table.
        </p>
        <p>
          For example, a <code>cart</code> can contain multiple{" "}
          <code>products</code>, and each <code>product</code>
          can appear in multiple <code>carts</code>.
        </p>

        <p>
          <b>Scenario:</b> Retrieve all the products in <code>John's</code> cart{" "}
          where <code>(customer_id = 1)</code>.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT *
FROM cart
JOIN cart_product ON cart.id = cart_product.cart_id
JOIN product ON product.id = cart_product.product_id
WHERE cart.customer_id = 1;`}
        />

        <p>
          <b>Explanation:</b>
        </p>
        <ul>
          <li>
            The cart table is joined with the <code>cart_product</code> table
            using <code>cart.id = cart_product.cart_id</code>.
          </li>
          <li>
            Then, the <code>cart_product</code> table is joined with the product
            table using
            <code>product.id = cart_product.product_id</code>.
          </li>
          <li>
            This retrieves all products associated with John's cart{" "}
            <code>(with customer_id = 1)</code>.
          </li>
        </ul>
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

export default Creating_Relation_DB_CS;
