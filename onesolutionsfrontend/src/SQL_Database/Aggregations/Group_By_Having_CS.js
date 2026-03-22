import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Group_By_Having_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Group By with Having</h1>

      <section>
        <p>
          The <code>GROUP BY</code> keyword in SQL is used to group rows which
          have the same values for the mentioned attributes. You can perform
          aggregations on these groups to get finer analytics.
        </p>
        <p>
          THE <code>HAVING</code> keyword is used to further refine the data by
          filtering the aggregated values. Let’s explore more about{" "}
          <b>GROUP BY</b>
          with <b>HAVING</b> clauses with the following database.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The database consists of <code>player_match_details</code> table that
          stores the information of players' details like name, match, score,
          year, number of fours and sixes scored. In the table:
        </p>
        <ul>
          <li>
            The score, fours, and sixes may have NULL values if the player has
            not played the match.
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
        <p>
          You can run the below command to get the schema of{" "}
          <code>player_match_details</code> table.
        </p>

        <CodeBlock
          language="sql"
          code={`PRAGMA table_info(player_match_details);`}
        />
      </section>

      <section>
        <h2>HAVING</h2>
        <p>
          <code>HAVING</code> clause is used to filter the resultant rows after
          the application ofGROUP BYclause.
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
         className="custom-table"
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
          <b>WHERE vs HAVING:</b>
          <ul>
            <li>
              <b>WHERE</b> is used to filter rows and this operation is
              performed before grouping.
            </li>
            <li>
              <b>HAVING</b> is used to filter groups and this operation is
              performed after grouping.
            </li>
          </ul>
        </div>
      </section>

     <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Group_By_Having_CS;
