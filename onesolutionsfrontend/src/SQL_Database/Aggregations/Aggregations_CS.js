import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Aggregations_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Aggregations</h1>

      <section>
        <p>
          Consider the case of sports tournaments like cricket. Players’
          performances are analysed based on their batting average, maximum
          number of sixes hit, the least score in a tournament, etc.
        </p>
        <p>
          We perform aggregations in such scenarios to combine multiple values
          into a single value, i.e., individual scores to an average score.
        </p>
        <p>
          Let’s learn more about aggregations to perform insightful analysis
          using the following database.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The database consists of <code>player_match_details</code> table which
          stores the details of players in a match like name, match, score,
          year, number of fours and sixes scored. In the table:
        </p>
        <ul>
          <li>
            The score, fours, and sixes may have NULL values if the player did
            not get a chance to play in the match.
          </li>
          <li>
            A single player can participate in multiple matches in a year. So,
            there can be multiple entries for each player.
          </li>
        </ul>

        <h3>Schema</h3>
        <CodeBlock
          language="sql"
          code={`player_match_details (
  name VARCHAR(250),
  match VARCHAR(10),
  score INTEGER,
  fours INTEGER,
  sixes INTEGER,
  year INTEGER
);`}
        />
      </section>

      <section>
        <h2>Aggregation Functions</h2>
        <p>
          Combining multiple values into a single value is called aggregation.
          Following are the functions provided by SQL to perform aggregations on
          the given data:
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>Aggregate Function</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>COUNT</td>
              <td>Counts the number of values</td>
            </tr>
            <tr>
              <td>SUM</td>
              <td>Adds all the values</td>
            </tr>
            <tr>
              <td>MIN</td>
              <td>Returns the minimum value</td>
            </tr>
            <tr>
              <td>MAX</td>
              <td>Returns the maximum value</td>
            </tr>
            <tr>
              <td>AVG</td>
              <td>Calculates the average of the values</td>
            </tr>
          </tbody>
        </table>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT aggregate_function(c1), aggregate_function(c2)
FROM TABLE;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            We can calculate multiple aggregate functions in a single query.
          </p>
        </div>
      </section>

      <section>
        <h2>Examples</h2>

        <p>
          1. Get the total runs scored by "Ram" from the{" "}
          <code>player_match_details</code> table.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT SUM(score)
FROM player_match_details
WHERE name = "Ram";`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>SUM(score)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>221</td>
            </tr>
          </tbody>
        </table>

        <p>
          2. Get the highest and least scores among all the matches that
          happened in the year 2011.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT MAX(score), MIN(score)
FROM player_match_details
WHERE year = 2011;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "35%" }}
        >
          <thead>
            <tr>
              <th>MAX(score)</th>
              <th>MIN(score)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>75</td>
              <td>62</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>COUNT Variants</h2>

        <p>Calculate the total number of matches played in the tournament.</p>

        <CodeBlock
          language="sql"
          code={`-- Variant 1
SELECT COUNT(*) FROM player_match_details;

-- Variant 2
SELECT COUNT(1) FROM player_match_details;

-- Variant 3
SELECT COUNT(column_name) FROM player_match_details;`}
        />

        <b>Output of Variant 1, Variant 2 and Variant 3</b>
        <p>
          All the variants, i.e., Variant 1, Variant 2 and Variant 3 give the
          same result: 18
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            In SQL, there's a difference between using <b>COUNT(*)</b> and
            <b> COUNT(column_name)</b>:
            <ul>
              <li>
                <b>COUNT(*): </b> This function counts the total number of rows
                in a table, regardless of whether any specific column contains
                NULL values. It counts all rows, including those with NULL
                values, and returns the total count.
              </li>
              <li>
                <b>COUNT(column_name): </b> This function counts the number of
                Non-NULL values in the specified column. It excludes NULL values
                from the count and only considers the Non-NULL values within the
                specified column.
              </li>
            </ul>
          </p>
        </div>
      </section>

      <section>
        <h2>Special Cases</h2>
        <ul>
          <li>
            When <code>SUM</code> function is applied on non-numeric data types
            like strings, date, time, datetime etc.,
            <br />
            <strong>SQLite DBMS</strong> returns <code>0.0</code> and
            <strong> PostgreSQL DBMS</strong> returns <code>NULL</code>.
          </li>

          <li>Aggregate functions on strings and their outputs</li>
          <li>
            <table
              border="1"
              cellPadding="6"
              style={{ borderCollapse: "collapse", width: "60%" }}
            >
              <thead>
                <tr>
                  <th>Aggregate Functions</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MIN, MAX</td>
                  <td>Based on lexicographic ordering</td>
                </tr>
                <tr>
                  <td>SUM, AVG</td>
                  <td>0 (depends on DBMS)</td>
                </tr>
                <tr>
                  <td>COUNT</td>
                  <td>Default behavior</td>
                </tr>
              </tbody>
            </table>
          </li>
          <li>
            <code>NULL</code> values are ignored while computing the aggregation
            values.
          </li>

          <li>
            When aggregate functions are applied on only <code>NULL</code>{" "}
            values:
          </li>
          <li>
            <table
              border="1"
              cellPadding="6"
              style={{ borderCollapse: "collapse", width: "40%" }}
            >
              <thead>
                <tr>
                  <th>Aggregate Functions</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MIN</td>
                  <td>NULL</td>
                </tr>
                <tr>
                  <td>MAX</td>
                  <td>NULL</td>
                </tr>
                <tr>
                  <td>SUM</td>
                  <td>NULL</td>
                </tr>
                <tr>
                  <td>COUNT</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>AVG</td>
                  <td>NULL</td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </section>

      <section>
        <h2>Alias</h2>
        <p>
          Using the keyword <code>AS</code>, we can provide alternate temporary
          names to the columns in the output.
        </p>
        <b>Syntax: </b>
        <CodeBlock
          language="sql"
          code={`SELECT
  c1 AS a1,
  c2 AS a2,
  ...
FROM
  table_name;`}
        />
        <h3>Examples </h3>
        <p>
          1. Get all the names of players with column name as{" "}
          <code>"player_name"</code>.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT name AS player_name
FROM player_match_details;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "35%" }}
        >
          <thead>
            <tr>
              <th>player_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ram</td>
            </tr>
            <tr>
              <td>Joseph</td>
            </tr>
          </tbody>
        </table>

        <p>
          2. Get the average of all scores as <code>"avg_score"</code>.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT AVG(score) AS avg_score
FROM player_match_details;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>avg_score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>60</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>
        <ul>
          <li>Get the average score of "Ram" in the year 2011.</li>
          <li>Get the least score among all matches.</li>
          <li>Get the highest score in 2014.</li>
          <li>
            Get the total number of sixes hit as <code>sixes_hit</code>.
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

export default Aggregations_CS;
