import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Common_Mistakes_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Common Mistakes in SQL | Cheat Sheet</h1>

      <section>
        <h2>1. Syntax Errors</h2>
        <p>
          This error occurs when the structure of the SQL query or statement is
          incorrect and does not obey the rules of the SQL language.
        </p>

        <h3>1.1. Misspelling Commands</h3>
        <p>
          This error occurs when a wrong keyword is used, and the SQL
          interpreter cannot recognize the command or keyword. Refer to the SQL
          query below for an example.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            The SQL interpreter is a component of a database management system
            (DBMS) that interprets and executes SQL commands. It's responsible
            for reading the SQL queries, checking them for syntax errors,
            compiling them into a format that can be executed, and then running
            the commands against the database.
          </p>
        </div>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`INERT INTO -- Error
PLAYER (name, age, score)
VALUES
('Virat', 32, 50);`}
        />

        <div className="Error-message">
          <p>near "INERT": syntax error</p>
        </div>

        <p>
          This error message indicates that the SQL interpreter encountered an
          unexpected keyword "INERT", resulting in a syntax error.
        </p>

        <h4>Solution: </h4>
        <p>
          We have to use <b>INSERT</b> instead of <b>INERT</b>. Below is the
          corrected SQL query.
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO
PLAYER (name, age, score)
VALUES
('Virat', 32, 50);`}
        />

        <h3>1.2. Missing/Extra character Errors</h3>
        <p>
          This error occurs when we write some extra characters or forget to use
          some characters that may be a part of the SQL Query, and the SQL
          interpreter cannot recognize the command or keyword we have used.
          Refer to the SQL query below for an example.
        </p>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`CREATE - TABLE PLAYER ( -- Error
(name VARCHAR(200), age INTEGER, score INTEGER);`}
        />

        <div className="Error-message">
          <p>near "–": syntax error</p>
        </div>

        <p>
          This error message indicates that the SQL interpreter encountered some
          unexpected characters "-" and "(", resulting in a syntax error.
        </p>

        <h4>Solution: </h4>
        <p>
          We have to remove the extra characters which are present after the
          <b> CREATE</b> keyword and after the table name <code>PLAYER</code>.
        </p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE PLAYER
(name VARCHAR(200), age INTEGER, score INTEGER);`}
        />

        <h3>1.3. Missing/Extra delimiter Errors</h3>
        <p>
          This error occurs when we forget to add the delimiters (such as{" "}
          <code>,</code>, etc) while writing the SQL Query. Refer to the SQL
          query below for an example.
        </p>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE PLAYER
(name VARCHAR(255) age INTEGER score INTEGER); -- Error`}
        />

        <div className="Error-message">
          <p>near "age": syntax error</p>
        </div>

        <p>
          This error message indicates that the SQL interpreter encountered
          unexpected delimiter, such as a missing comma , in the code, resulting
          in a syntax error.
        </p>

        <h4>Solution: </h4>
        <p>
          We need to add commas between the columns. Below is the corrected SQL
          query.
        </p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE PLAYER
(name VARCHAR(255), age INTEGER, score INTEGER);`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Delimiters are special characters used to mark the start and end of
            a piece of data or to separate different parts of data.
          </p>
        </div>

        <h3>1.4. Incorrect Data Type Usage</h3>
        <p>
          This error occurs when there is a mismatch of usage of data types in
          the SQL Query. Refer to the SQL query below for an example.
        </p>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE STUDENT
(name VARCHAR(), age INTEGER, marks INTEGER); -- Error`}
        />

        <div className="Error-message">
          <p>near ")": syntax error</p>
        </div>

        <p>
          This error message indicates that in the code, the length of{" "}
          <code>VARCHAR()</code>
          is not mentioned inside the parentheses, resulting in a syntax error.
        </p>

        <h4>Solution: </h4>
        <p>
          We have to mention the length of VARCHAR inside the parentheses
          <code>VARCHAR(255)</code>. Below is the corrected SQL query for an
          example.
        </p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE STUDENT
(name VARCHAR(255), age INTEGER, marks INTEGER);`}
        />

        <p>
          <strong>Other possible wrong usage of data types:</strong>
        </p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE STUDENT
(name VARCHAR(255), age INTEGER(), marks INTEGER()); -- Error`}
        />

        <h3>1.5. Unrecognized token</h3>
        <p>
          This error occurs when the interpreter encounters a sequence of
          characters that it does not recognize as a valid part of the SQL
          language. Refer to the SQL query below for an example.
        </p>

        <h4>Example (Error)</h4>
        {/* Escaped curly braces with {"{"} and {"}"} */}
        <CodeBlock
          language="sql"
          code={`INSERT INTO
PLAYER {"{"} name, -- Error
age,
score {"}"} -- Error
VALUES
('Sravan', 22, 424);`}
        />

        <div className="Error-message">
          <p>unrecognized token: "{"{"}"</p>
        </div>

        <p>
          This error message indicates that in the code, there is an error due
          to the unrecognized token {"{"} after the table name PLAYER, resulting
          in a syntax error.
        </p>

        <h4>Solution: </h4>
        <p>
          We have to use parentheses <code>()</code> instead of curly braces{" "}
          <code> {"{}"}</code> to enclose the column names in the{" "}
          <b>INSERT INTO</b>
          statement. Below is the corrected SQL query.
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO
PLAYER (name,
age,
score)
VALUES
('Sravan', 22, 424);`}
        />

        <h3>1.6. Invalid Identifier</h3>
        <p>
          This error occurs when a reserved keyword is used as an identifier in
          SQL, such as a table name, column name, etc. Refer to the SQL query
          below for an example.
        </p>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE ORDER ( -- Error
order_name VARCHAR(200),
order_rating INTEGER,
order_id INTEGER,
price INTEGER
);`}
        />

        <div className="Error-message">
          <p>near "ORDER": syntax error</p>
        </div>

        <p>
          This error message indicates that the code has an error due to the
          table being named <b>ORDER</b>, which is a reserved keyword in SQL,
          resulting in a syntax error.
        </p>

        <h4>Solution: </h4>
        <p>
          We are changing the table name from <b>ORDER</b> to <b>ORDERS</b> to
          avoid conflicts. Below is the corrected SQL query.
        </p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE ORDERS (
order_name VARCHAR(200),
order_rating INTEGER,
order_id INTEGER,
price INTEGER
);`}
        />
      </section>

      <section>
        <h2>2. Table already exists</h2>
        <p>
          This error occurs when we attempt to create a table with a name that
          is already used by an existing table in the same database. Refer to
          the SQL query below for an example.
        </p>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE COLLEGE( -- Error
name VARCHAR(255),
reg_no VARCHAR(255),
address VARCHAR(255)
);`}
        />

        <div className="Error-message">
          <p>table COLLEGE already exists</p>
        </div>

        <p>
          This error message indicates that in the code, we are creating a table
          named <b>COLLEGE</b> with columns <code>name</code>,{" "}
          <code>reg_no</code>, and <code>address</code>, but an error occurred
          because there is a table with the same name in the database, resulting
          in table already exists error.
        </p>

        <h4>Solution:</h4>
        <p>
          You can either drop the existing table (if it's no longer needed) and
          create a new one with the same name, or create a table with a
          different name.
        </p>

        <ul>
          <li>
            <strong>DROP the previous table and CREATE the table.</strong>
          </li>
        </ul>
        <CodeBlock
          language="sql"
          code={`DROP TABLE COLLEGE;
CREATE TABLE COLLEGE(
name VARCHAR(255),
reg_no VARCHAR(255),
address VARCHAR(255)
);`}
        />

        <ul>
          <li>
            <strong>CREATE the table with a new name.</strong>
          </li>
        </ul>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE COLLEGE_STUDENTS(
name VARCHAR(255),
reg_no VARCHAR(255),
address VARCHAR(255)
);`}
        />

        <h2>3. No such column/ No such Table</h2>
        <p>
          This error occurs when a column or table referenced in a SQL query
          does not exist in the database. Refer to the SQL query below for an
          example.
        </p>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`INSERT INTO
PLAYERS (name, age, score) -- Error
VALUES
("Dhoni", 32, 46),
("Virat", 22, 45);`}
        />

        <div className="Error-message">
          <p>no such table: PLAYERS</p>
        </div>

        <p>
          This error message indicates that in the code, we are attempting to
          insert values into a table named <code>PLAYERS</code>, but the table
          likely doesn't exist, resulting in no such table error.
        </p>

        <h4>Solution:</h4>
        <p>
          To resolve this error, we need to verify that the table <b>PLAYERS</b>{" "}
          exists in the database. If it doesn't, you need to create it before
          executing the <b>INSERT INTO</b>statement. Also, ensure that the table
          name is spelled correctly.
        </p>

        <h2>4. Row value misused</h2>
        <p>
          This error occurs when there is a misuse or misplacement of row values
          in a query. Refer to the SQL query below for an example.
        </p>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`SELECT
(employee_id, salary) -- Error
FROM
EMPLOYEE
WHERE
name = "Raju";`}
        />

        <div className="Error-message">
          <p>row value misused</p>
        </div>

        <p>
          This error message indicates that in the code, we are trying to
          retrieve the columns <code>(employee_id, salary)</code> from the
          Employee table where the name is "Raju". However, the syntax is
          incorrect for selecting specific columns as we have used parentheses{" "}
          <code>(</code> after the <b>SELECT</b> statement, resulting in row
          value misused error.
        </p>

        <h4>Solution:</h4>
        <p>
          We have to remove the unnecessary parentheses after the <b>SELECT</b>{" "}
          clause. Below is the corrected SQL query.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
employee_id,
salary
FROM
EMPLOYEE
WHERE
name = "Raju";`}
        />

        <h2>5. Duplicate column name</h2>
        <p>
          This error occurs when we attempt to define or add a column into the
          table with a name that already exists in the table. Refer to the SQL
          query below for an example.
        </p>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`ALTER TABLE
PLAYER
ADD
COLUMN height; -- Error`}
        />

        <div className="Error-message">
          <p>duplicate column name: height</p>
        </div>

        <p>
          This error message indicates that in the code, we are adding a new
          column named <code>height</code> to the existing <b>PLAYER</b> table.
          However, a column with the same name already exists, a conflict
          arises, and the <code>ALTER TABLE</code> operation cannot proceed,
          resulting in duplicate column name error.
        </p>

        <h4>Solution:</h4>
        <p>
          Either we can drop the previous column (if it's no longer needed) and
          add a column with the same name or we can add the column with a
          different name. Below are the corrected SQL queries.
        </p>

        <ul>
          <li>
            <strong>DROP the previous column and ADD the column</strong>
          </li>
        </ul>
        <CodeBlock
          language="sql"
          code={`ALTER TABLE
PLAYER DROP COLUMN height;
ALTER TABLE
PLAYER
ADD
COLUMN height;`}
        />
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>Dropping the column from the table will result in loss of data.</p>
        </div>

        <ul>
          <li>
            <strong>ADD the column with a new name</strong>
          </li>
        </ul>
        <CodeBlock
          language="sql"
          code={`ALTER TABLE
PLAYER
ADD
COLUMN height_of_player;`}
        />

        <h2>6. Incorrect Number of Values</h2>
        <p>
          This error occurs when attempting to insert a record into a table, and
          the number of values provided does not match the expected number of
          columns. Refer to the SQL query below for an example.
        </p>

        <h4>Example (Error)</h4>
        <CodeBlock
          language="sql"
          code={`INSERT INTO
PRODUCT(id, name, price, brand, category)
VALUES
(7, 3000, "Denim", "Clothing"); -- Error`}
        />

        <div className="Error-message">
          <p>4 values for 5 columns</p>
        </div>

        <p>
          This error message indicates that we are trying to insert 4 values
          into a table for 5 columns.
        </p>

        <h4>Solution:</h4>
        <p>
          To resolve this error, ensure that the number of values matches the
          number of columns and that the data types are correct. In this case,
          we are adding <code>Shirt</code> for the <b>name</b> column.
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO
PRODUCT(id, name, price, brand, category)
VALUES
(7, "Shirt", 3000, "Denim", "Clothing");`}
        />
      </section>
      {/* The rest of the sections (2–6) remain exactly the same as in the previous answer */}
      {/* ... (kept for brevity – copy them from the previous full version) ... */}

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

export default Common_Mistakes_CS;
