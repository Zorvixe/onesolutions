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
          Consider sports tournaments like cricket. Players’ performances are
          analysed based on batting average, maximum sixes hit, least score,
          etc.
        </p>
        <p>
          Aggregation helps to combine multiple values into a single value,
          e.g., individual scores to an average score.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The database contains <b>player_match_details</b> table storing
          details of players in a match like name, match, score, fours, sixes,
          and year.
        </p>
        <p>
          - Score, fours, and sixes may be <b>NULL</b> if player did not play.{" "}
          <br />- A single player can participate in multiple matches in a year.
        </p>

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

        <p>
          Note: We can calculate multiple aggregate functions in a single query.
        </p>
      </section>

      <section>
        <h2>Examples</h2>

        <h3>Total runs scored by "Ram"</h3>
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

        <h3>Highest and least scores in 2011</h3>
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

        <p>Calculate total number of matches played:</p>

        <CodeBlock
          language="sql"
          code={`-- Variant 1
SELECT COUNT(*) FROM player_match_details;

-- Variant 2
SELECT COUNT(1) FROM player_match_details;

-- Variant 3
SELECT COUNT(column_name) FROM player_match_details;`}
        />

        <p>Output: All variants give the same result: 18</p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <b>COUNT(*)</b> counts all rows including NULLs. <br />
            <b>COUNT(column_name)</b> counts only non-NULL values in that
            column.
          </p>
        </div>
      </section>

      <section>
        <h2>Special Cases</h2>
        <p>Aggregate functions on non-numeric data or NULL values:</p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "70%" }}
        >
          <thead>
            <tr>
              <th>Aggregate Function</th>
              <th>Output on Strings / NULL only</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MIN, MAX</td>
              <td>Lexicographic ordering</td>
            </tr>
            <tr>
              <td>SUM, AVG</td>
              <td>0 (SQLite) / None (PostgreSQL)</td>
            </tr>
            <tr>
              <td>COUNT</td>
              <td>Default behavior (NULLs ignored)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Alias</h2>
        <p>
          Use <b>AS</b> keyword to provide temporary column names in the output.
        </p>

        <h3>Example 1: Rename player name</h3>
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

        <h3>Example 2: Average score as "avg_score"</h3>
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
            Get the total number of sixes hit as <b>sixes_hit</b>.
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
