// /project/workspace/onesolutionsfrontend/src/SQL_Database/Introdutionto_SQL/Alter_Table_CS.js

import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Alter_Table_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Alter Table | Cheat Sheet</h1>

      {/* 1. Introduction */}
      <section>
        <h2>ALTER Clause</h2>
        <p>
          The <b>ALTER</b> clause is used to <b>add</b>, <b>delete</b>, or{" "}
          <b>modify</b> columns in an existing table. Let’s learn more about the{" "}
          <b>ALTER</b> clause using the following database.
        </p>
      </section>

      {/* 2. Database Overview */}
      <section>
        <h2>Database</h2>
        <p>
          The given database consists of tables that store the information of{" "}
          <b>student</b> and <b>player</b>.
        </p>

        <h3>Tables</h3>
        <ul>
          <li>
            <b>student</b> table
          </li>
          <li>
            <b>player</b> table
          </li>
        </ul>
      </section>

      {/* 3. Add Column */}
      <section>
        <h2>Add Column</h2>
        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`ALTER TABLE table_name
ADD column_name datatype;`}
        />
        <p>
          You can use the <code>PRAGMA TABLE_INFO(table_name)</code> command to
          check the updated schema of the table.
        </p>

        <h3>Example</h3>
        <p>
          Add a new column <b>jersey_num</b> of type <b>integer</b> to the{" "}
          <code>player</code> table.
        </p>
        <CodeBlock
          language="sql"
          code={`ALTER TABLE player
ADD jersey_num INT;`}
        />
        <p>
          After you run the query, check the <b>player</b> table in the database
          for the new column.
        </p>

        <p>
          <b>Note:</b> Default values for newly added columns in the existing
          rows will be <b>NULL</b>.
        </p>
      </section>

      {/* 4. Rename Column */}
      <section>
        <h2>Rename Column</h2>
        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`ALTER TABLE table_name
RENAME COLUMN c1 TO c2;`}
        />

        <h3>Example</h3>
        <p>
          Rename the column <b>jersey_num</b> in the <code>player</code> table
          to <b>jersey_number</b>.
        </p>
        <CodeBlock
          language="sql"
          code={`ALTER TABLE player
RENAME COLUMN jersey_num TO jersey_number;`}
        />
        <p>
          After you run the query, check the <b>player</b> table in the database
          for the column rename.
        </p>
      </section>

      {/* 5. Drop Column */}
      <section>
        <h2>Drop Column</h2>
        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`ALTER TABLE table_name
DROP COLUMN column_name;`}
        />

        <h3>Example</h3>
        <p>
          Remove the column <b>jersey_number</b> from the <code>player</code>{" "}
          table.
        </p>
        <CodeBlock
          language="sql"
          code={`ALTER TABLE player
DROP COLUMN jersey_number;`}
        />
        <p>
          After you run the above query, you will not see the{" "}
          <b>jersey_number</b> column in the <b>player</b> table in the
          database.
        </p>
      </section>

      {/* 6. Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>
        <ul>
          <li>
            Add a new column <b>id</b> of type <b>int</b> to the{" "}
            <code>player</code> table.
          </li>
          <li>
            Update the name of the column <b>id</b> to <b>player_id</b> in the{" "}
            <code>player</code> table.
          </li>
          <li>
            After executing the queries, check the <b>player</b> table in the
            database. Use <code>PRAGMA TABLE_INFO</code> to check the schema
            level updates.
          </li>
        </ul>
      </section>

      {/* 7. ALTER vs UPDATE */}
      <section>
        <h2>ALTER vs UPDATE</h2>
        <ul>
          <li>
            <b>UPDATE</b> clause updates the data of an existing table in the
            database.
          </li>
          <li>
            <b>ALTER</b> clause alters the layout of the table. It adds,
            deletes, or modifies existing columns in a table.
          </li>
        </ul>
      </section>
      <section>
        <img
          src="/assets/img/update_vs_alter_img.png"
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

export default Alter_Table_CS;
