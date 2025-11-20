import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Inserting_Row_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Inserting Rows | Cheat Sheet</h1>

      {/* 1. Introduction */}
      <section>
        <h2>1. INSERT Clause</h2>
        <p>
          The <b>INSERT</b> clause is used to insert new rows into a table.
        </p>
      </section>

      {/* 2. Syntax */}
      <section>
        <p>
          <b>Syntax:</b>
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO table_name (column1, column2, ..., columnN)
VALUES (value11, value12, ..., value1N),
       (value21, value22, ..., value2N),
       ...;`}
        />
        <p>
          You can insert any number of rows (from 1 to n) into a table using the
          above syntax.
        </p>
      </section>

      {/* 3. Database Example */}
      <section>
        <h3> Database</h3>
        <p>
          Let's learn more about the <b>INSERT</b> clause using the{" "}
          <code>player</code> and <code>match_details</code> tables that store
          details of players and matches in a tournament respectively.
        </p>
        <ul>
          <li>
            <b>player</b> table stores: <i>name</i>, <i>age</i>, and{" "}
            <i>score</i> of players.
          </li>
          <li>
            <b>match_details</b> table stores: <i>team_name</i>,{" "}
            <i>played_with</i>, <i>venue</i>, <i>date</i>, and <i>is_won</i>.
          </li>
        </ul>
      </section>

      {/* 4. Example 1: Inserting players */}
      <section>
        <h3> Example: Inserting Players</h3>
        <p>
          Insert <i>name</i>, <i>age</i>, and <i>score</i> of 2 players into the{" "}
          <code>player</code> table.
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO player (name, age, score)
VALUES ("Rakesh", 39, 35),
       ("Sai", 47, 30);`}
        />
        <p>
          Upon executing the above query, both entries will be added to the{" "}
          <code>player</code> table.
        </p>
      </section>

      {/* 5. Viewing the inserted data */}
      <section>
        <h2>2. Viewing Inserted Data</h2>
        <p>
          Retrieve the inserted data using the <b>SELECT</b> statement.
        </p>
        <CodeBlock language="sql" code={`SELECT * FROM player;`} />
        <p>
          We will learn more about retrieving data in upcoming cheat sheets.
        </p>
      </section>

      {/* 6. Example 2: Inserting match details */}
      <section>
        <h3> Example: Inserting Match Details</h3>
        <CodeBlock
          language="sql"
          code={`INSERT INTO match_details (team_name, played_with, venue, date, is_won)
VALUES ("CSK", "MI", "Chennai", "2020-04-21", true),
       ("SRH", "RR", "Hyderabad", "2020-04-23", true);`}
        />
      </section>

      {/* 7. Notes */}
      <section>
        <h2>Notes</h2>
        <ul>
          <li>
            Boolean values can be written as <b>TRUE</b> or <b>FALSE</b>, or{" "}
            <b>1</b> or <b>0</b>. In databases, they are stored as 1 or 0.
          </li>
          <li>
            <b>Date</b> format: <code>'YYYY-MM-DD'</code>
          </li>
          <li>
            <b>Datetime</b> format: <code>'YYYY-MM-DD HH:MM:SS'</code>
          </li>
        </ul>
      </section>

      {/* 8. Possible Mistakes */}
      <section>
        <h2>Possible Mistakes</h2>

        <p>
          <b>Mistake 1:</b> Mismatch in column and value count
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO player (name, age, score)
VALUES ("Virat", 31);`}
        />
        <p>Error: 2 values for 3 columns</p>

        <p>
          <b>Mistake 2:</b> Inserting into a non-existing table
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO players_information (name, age, score)
VALUES ("Virat", 31, 30);`}
        />
        <p>Error: no such table: players_information</p>

        <hp>
          <b>Mistake 3:</b> Extra parentheses after VALUES
        </hp>
        <CodeBlock
          language="sql"
          code={`INSERT INTO player (name, age, score)
VALUES (("Rakesh", 39, 35), ("Sai", 47, 30));`}
        />
        <p>
          Error: <b>2 values for 3 columns</b>
        </p>

        <p>
          <b>Mistake 4:</b> Mismatched data types
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO player (name, age, score)
VALUES ("Virat", 31, "Hundred");`}
        />
        <p>
          <b>Warning:</b> SQLite does not raise an error if datatypes do not
          match.
        </p>
      </section>

      {/* 9. Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>
        <p>
          Three new players have joined the tournament. Try inserting their data
          into the <code>player</code> table.
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ram</td>
              <td>28</td>
              <td>70</td>
            </tr>
            <tr>
              <td>Sita</td>
              <td>25</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Ravi</td>
              <td>30</td>
              <td>53</td>
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop: "10px" }}>
          Check if the data is inserted into the <code>player</code> table after
          you run the query.
        </p>
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

export default Inserting_Row_CS;
