import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Group_By_Having_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Group By with Having</h1>

      <section>
        <p>
          The <b>GROUP BY</b> keyword groups rows with the same values for the
          specified columns. Aggregations can then be performed on these groups
          for deeper analytics.
        </p>
        <p>
          <b>HAVING</b> keyword filters the aggregated results after GROUP BY is
          applied.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The database contains <b>player_match_details</b> table with player
          information like name, match, score, year, fours, and sixes.
        </p>
        <p>
          - Score, fours, and sixes may be <b>NULL</b> if the player did not
          play. <br />- A single player can participate in multiple matches,
          resulting in multiple entries.
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

        <h3>Check Schema</h3>
        <CodeBlock
          language="sql"
          code={`PRAGMA table_info(player_match_details);`}
        />
      </section>

      <section>
        <h2>HAVING</h2>
        <p>
          <b>HAVING</b> is used to filter groups after aggregation using GROUP
          BY.
        </p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT c1, c2, aggregate_function(c1)
FROM table_name
GROUP BY c1, c2
HAVING condition;`}
        />
      </section>

      <section>
        <h2>Example</h2>
        <p>
          Get the name and number of half-centuries of players who scored more
          than one half-century.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT name, COUNT(*) AS half_centuries
FROM player_match_details
WHERE score >= 50
GROUP BY name
HAVING half_centuries > 1;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "35%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>half_centuries</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lokesh</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Ram</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>
        <p>
          Get the name and number of half-centuries scored by each player who
          scored at least a half-century in two matches.
        </p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <b>WHERE</b> filters rows before grouping. <br />
            <b>HAVING</b> filters groups after grouping.
          </p>
        </div>
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

export default Group_By_Having_CS;
