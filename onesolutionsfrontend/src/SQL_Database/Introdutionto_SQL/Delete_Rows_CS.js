// /project/workspace/onesolutionsfrontend/src/SQL_Database/Introdutionto_SQL/Delete_Rows_CS.js

import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Delete_Rows_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Delete Rows | Cheat Sheet</h1>

      {/* 1. Database Overview */}
      <section>
        <h2>Database</h2>
        <p>
          The given database consists of tables that store the information of{" "}
          <b>student</b> and <b>player</b>.
        </p>

        <h3>Tables</h3>

        <p>
          <b>student</b> table
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>percentage</th>
              <th>scholarship_amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ramesh</td>
              <td>82</td>
              <td>10000</td>
            </tr>
            <tr>
              <td>Mahesh</td>
              <td>85</td>
              <td>11000</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
        <p>
          The <code>student</code> table stores the data of the students,
          including <b>name</b>, <b>percentage</b>, and{" "}
          <b>scholarship_amount</b>.
        </p>

        <p>
          <b>player</b> table
        </p>
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
              <td>Suresh</td>
              <td>21</td>
              <td>70</td>
            </tr>
            <tr>
              <td>Venkat</td>
              <td>21</td>
              <td>43</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
        <p>
          The <code>player</code> table stores the data of players, including{" "}
          <b>name</b>, <b>age</b>, and <b>score</b>.
        </p>
      </section>

      {/* 2. Delete Rows */}
      <section>
        <h2>Delete Rows</h2>
        <p>
          The <b>DELETE</b> clause is used to delete existing records from a
          table.
        </p>
      </section>

      {/* 3. Delete All Rows */}
      <section>
        <h3>Delete All Rows</h3>
        <h3>Syntax</h3>
        <CodeBlock language="sql" code={`DELETE FROM table_name;`} />

        <h3>Example</h3>
        <p>
          Delete all the rows from the <code>player</code> table.
        </p>

        <CodeBlock language="sql" code={`DELETE FROM player;`} />
      </section>

      {/* 4. Delete Specific Rows */}
      <section>
        <h3>Delete Specific Rows</h3>
        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`DELETE FROM table_name
WHERE column1 = value1;`}
        />

        <h3>Example</h3>
        <p>
          Delete <b>"Shyam"</b> from the <code>player</code> table.
        </p>

        <p>
          <b>Note:</b> In this table, we can uniquely identify a player by{" "}
          <b>name</b>.
        </p>

        <CodeBlock
          language="sql"
          code={`DELETE FROM player
WHERE name = "Shyam";`}
        />

        <p>
          Check if the rows are deleted as per your queries in the{" "}
          <code>player</code> table.
        </p>
      </section>

      {/* 5. Warning */}
      <section>
        <h2>Warning</h2>
        <p>
          We cannot retrieve the data once we delete the data from the table.
        </p>
      </section>

      {/* 6. Drop Table */}
      <section>
        <h2>Drop Table</h2>
        <p>
          The <b>DROP</b> clause is used to delete a table from the database.
        </p>

        <h3>Syntax</h3>
        <CodeBlock language="sql" code={`DROP TABLE table_name;`} />

        <h3>Example</h3>
        <p>
          Delete <code>player</code> table from the database.
        </p>

        <CodeBlock language="sql" code={`DROP TABLE player;`} />

        <p>
          After you run the above query, you will not see the{" "}
          <code>player</code> table in the database.
        </p>
      </section>

      {/* 7. DELETE VS DROP */}
      <section>
        <img
          src="/assets/img/delete_vs_drop_img.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "400px" }}
        />
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

export default Delete_Rows_CS;
