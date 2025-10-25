import React, { useState } from "react";
import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Create_Table_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Introduction to SQL | Create Table | Cheat Sheet</h1>

      {/* Introduction */}
      <section>
        <p>
          Databases and DBMS are key to organizing and analyzing data for
          business uses. Let’s work with databases using SQL!
        </p>
        <p>
          <b>SQL</b> stands for <b>Structured Query Language</b>. It is used to
          perform operations on a Relational DBMS. SQL is declarative, easy to
          learn, and provides commands to create, retrieve, update, and delete
          data.
        </p>
      </section>

      {/* Data Types */}
      <section>
        <h2>Data Types</h2>
        <p>Frequently used SQL data types:</p>
        <table>
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Syntax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Integer</td>
              <td>INTEGER / INT</td>
            </tr>
            <tr>
              <td>Float</td>
              <td>FLOAT</td>
            </tr>
            <tr>
              <td>String</td>
              <td>VARCHAR</td>
            </tr>
            <tr>
              <td>Text</td>
              <td>TEXT</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>DATE</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>TIME</td>
            </tr>
            <tr>
              <td>Datetime</td>
              <td>DATETIME</td>
            </tr>
            <tr>
              <td>Boolean</td>
              <td>BOOLEAN</td>
            </tr>
          </tbody>
        </table>
        <p>
          <b>Note:</b> Boolean values are stored as <code>0</code> (FALSE) and{" "}
          <code>1</code> (TRUE). <br />
          Date format: <code>'YYYY-MM-DD'</code> <br />
          Datetime format: <code>'YYYY-MM-DD HH:MM:SS'</code>
        </p>
      </section>

      {/* Create Table */}
      <section>
        <h2>Create Table</h2>
        <p>Creates a new table in the database.</p>
        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE table_name (
  column1 type1,
  column2 type2,
  ...
);`}
        />
        <p>
          Here, <code>type1</code> and <code>type2</code> are the datatypes of{" "}
          <code>column1</code> and <code>column2</code>.
        </p>

        <h3>Example: Player Table</h3>
        <p>
          Create a <code>player</code> table to store player details:
        </p>
        <table>
          <thead>
            <tr>
              <th>column_name</th>
              <th>data_type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>VARCHAR(200)</td>
            </tr>
            <tr>
              <td>age</td>
              <td>INT / INTEGER</td>
            </tr>
            <tr>
              <td>score</td>
              <td>INT / INTEGER</td>
            </tr>
          </tbody>
        </table>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE player (
  name VARCHAR(200),
  age INTEGER,
  score INTEGER
);`}
        />
      </section>

      {/* Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>
        <p>Build a database for students, subjects, exam schedules, etc.</p>

        <h3>Student Table</h3>
        <table>
          <thead>
            <tr>
              <th>details</th>
              <th>data_type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>VARCHAR(200)</td>
            </tr>
            <tr>
              <td>date_of_birth</td>
              <td>DATE</td>
            </tr>
            <tr>
              <td>address</td>
              <td>TEXT</td>
            </tr>
          </tbody>
        </table>

        <h3>Exam Schedule Table</h3>
        <table>
          <thead>
            <tr>
              <th>details</th>
              <th>data_type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>VARCHAR(200)</td>
            </tr>
            <tr>
              <td>course</td>
              <td>VARCHAR(200)</td>
            </tr>
            <tr>
              <td>exam_date_time</td>
              <td>DATETIME</td>
            </tr>
            <tr>
              <td>duration_in_sec</td>
              <td>INT</td>
            </tr>
            <tr>
              <td>pass_percentage</td>
              <td>FLOAT</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* PRAGMA */}
      <section>
        <h2>PRAGMA</h2>
        <p>
          <code>PRAGMA TABLE_INFO</code> returns information about a table.
        </p>
        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock language="sql" code={`PRAGMA TABLE_INFO(table_name);`} />
        <p>Example: Employee table info:</p>
        <CodeBlock language="sql" code={`PRAGMA TABLE_INFO(employee);`} />
        <OutputBlock
          output={`cid | name        | type        | notnull | dflt_value | pk
0   | employee_id | INTEGER     | 0       | NULL       | 0
1   | name        | VARCHAR(200)| 0       | NULL       | 0
2   | salary      | INTEGER     | 0       | NULL       | 0`}
        />
        <p>
          <b>Note:</b> <code>dflt_value</code> is the default value of a column.
          If the table name does not exist, PRAGMA returns no result.
        </p>
      </section>

      {/* Continue Button */}
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

export default Create_Table_CS;
