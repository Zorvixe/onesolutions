import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Retrieving_Data_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Retrieving Data | Cheat Sheet</h1>

      {/* 1. Introduction */}
      <section>
        <h2>1. SELECT Clause</h2>
        <p>
          The <code>SELECT</code> clause is used to retrieve data from a table.
        </p>
      </section>

      {/* 2. Database Overview */}
      <section>
        <h2>2. Database</h2>
        <p>
          The database consists of a <code>player</code> table that stores
          details of players participating in a tournament.
        </p>
        <p>
          The <code>player</code> table contains the following columns:
          <b> name</b>, <b>age</b>, and <b>score</b>.
        </p>
        <p>Let's explore how to use the SELECT clause with this table!</p>
      </section>

      {/* 3. Selecting Specific Columns */}
      <section>
        <h2>3. Selecting Specific Columns</h2>
        <p>
          To retrieve the data of only specific columns from a table, add the
          respective column names in the <b>SELECT</b> clause.
        </p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT column1, column2, ..., columnN
FROM table_name;`}
        />

        <h3>Example</h3>
        <p>
          Fetch the <b>name</b> and <b>age</b> of players from the{" "}
          <code>player</code> table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT name, age
FROM player;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Virat</td>
              <td>32</td>
            </tr>
            <tr>
              <td>Rakesh</td>
              <td>39</td>
            </tr>
            <tr>
              <td>Sai</td>
              <td>47</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. Selecting All Columns */}
      <section>
        <h2>4. Selecting All Columns</h2>
        <p>
          Sometimes, we may want to select all the columns from a table. Typing
          out every column name, for every time we have to retrive the data,
          would be a pain.
          <p>
            We have a shortcut for this! <code>*</code>
          </p>
        </p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT * 
FROM table_name;`}
        />

        <h3>Example</h3>
        <p>
          Get all the data of players from the <code>player</code> table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM player;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Virat</td>
              <td>32</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Rakesh</td>
              <td>39</td>
              <td>35</td>
            </tr>
            <tr>
              <td>Sai</td>
              <td>47</td>
              <td>30</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 5. Selecting Specific Rows */}
      <section>
        <h2>5. Selecting Specific Rows</h2>
        <p>
          To retrieve only specific rows, we use the <b>WHERE</b> clause.
        </p>
        <p>
          The <b>WHERE</b> clause specifies a condition that must be satisfied
          to retrieve data from the database.
        </p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT * 
FROM table_name
WHERE condition;`}
        />

        <h3>Example</h3>
        <p>
          Get the <b>name</b> and <b>age</b> of the player whose name is
          <b> "Sai"</b>.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT name, age 
FROM player 
WHERE name = "Sai";`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sai</td>
              <td>47</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 6. Try it Yourself */}
      <section>
        <h2>6. Try it Yourself!</h2>
        <p>
          The database consists of an <code>employee</code> table that stores{" "}
          <b>employee_id</b>, <b>name</b>, and <b>salary</b> of employees.
        </p>
        <p>Try writing queries for the following tasks:</p>
        <ul>
          <li>
            Get all the data from the <code>employee</code> table.
          </li>
          <li>
            Get <b>name</b> and <b>salary</b> of all employees from the{" "}
            <code>employee</code> table.
          </li>
          <li>
            Get <b>employee_id</b> and <b>salary</b> of the employee whose{" "}
            <b>name</b> is "Raju".
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

export default Retrieving_Data_CS;
