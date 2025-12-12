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
          The <code>INSERT</code> clause is used to insert new rows into a
          table.
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
          Any number of rows from 1 to n can be inserted into a specified table
          using the above syntax.
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
            <code>player</code> table stores: <i>name</i>, <i>age</i>, and{" "}
            <i>score</i> of players.
          </li>
          <li>
            <code>match_details</code> table stores: <i>team_name</i>,{" "}
            <i>played_with</i>, <i>venue</i>, <i>date</i>, and <i>is_won</i>.
          </li>
        </ul>
      </section>

      {/* 4. Example 1: Inserting players */}
      <section>
        <h3> Example: Inserting Players</h3>
        <p>
          1. Insert <code>name</code>, <code>age</code>, and <code>score</code>{" "}
          of 2 players into the <code>player</code> table.
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
        <b>Let's view the added data!</b>
        <p>We can retrieve the inserted data by using the following command.</p>
        <CodeBlock language="sql" code={`SELECT * FROM player;`} />
        <p>We shall know more about retrieving data in further cheat sheets.</p>
        <p>
          2. Similarly, let's insert the details of 2 matches in the
          match_details table.
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO match_details (team_name, played_with, venue, date, is_won)
VALUES ("CSK", "MI", "Chennai", "2020-04-21", true),
       ("SRH", "RR", "Hyderabad", "2020-04-23", true);`}
        />
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <ul>
            <li>
              Boolean values can be either given as <b>(TRUE or FALSE)</b> or{" "}
              <b>(1 or 0)</b>. But in the database, the values are stored as 1
              or 0.
            </li>
            <li>
              Date object is represented as: <b>‘YYYY-MM-DD’</b>
            </li>
            <li>
              Datetime object is represented as: <b>‘YYYY-MM-DD HH:MM:SS’</b>
            </li>
          </ul>
        </div>
      </section>

      {/* 8. Possible Mistakes */}
      <section>
        <h2>Possible Mistakes</h2>

        <p>
          <b>Mistake 1:</b> The number of values that we're inserting must match
          with the number of column names that are specified in the query.
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO player (name, age, score)
VALUES ("Virat", 31);`}
        />

        <div className="Error-message">
          <p>Error: 2 values for 3 columns</p>
        </div>

        <p>
          <b>Mistake 2:</b> We have to specify only the existing tables in the
          database.
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO players_information (name, age, score)
VALUES ("Virat", 31, 30);`}
        />

        <div className="Error-message">
          <p>Error: no such table: players_information</p>
        </div>
        <p>
          <b>Mistake 3:</b> Do not add additional parenthesis <code>()</code>{" "}
          post <code>VALUES</code> keyword in the code.
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO player (name, age, score)
VALUES (("Rakesh", 39, 35), ("Sai", 47, 30));`}
        />

        <div className="Error-message">
          <p>
            Error: <b>2 values for 3 columns</b>
          </p>
        </div>

        <p>
          <b>Mistake 4:</b> While inserting data, be careful with the datatypes
          of the input values. Input value datatype should be same as the column
          datatype.
        </p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO player (name, age, score)
VALUES ("Virat", 31, "Hundred");`}
        />

        <div className="Warning-container">
          <div>
            <h5>
              <i class="bi bi-exclamation-triangle"></i>Warning
            </h5>
          </div>
          <p>
            If the datatype of the input value doesn't match with the datatype
            of column, <b>SQLite</b> doesn't raise an error.
          </p>
        </div>
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
