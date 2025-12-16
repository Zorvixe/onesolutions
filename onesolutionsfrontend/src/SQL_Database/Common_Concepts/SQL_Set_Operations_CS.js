import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const SQL_Set_Operations_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>SQL Set Operations</h1>

      <section>
        <p>
          The SQL Set operation is used to combine the results of two or more
          SQL queries.
        </p>
        <p>
          Let us understand common set operators by performing operations on two
          sets.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The IMDb dataset consists of movies, actors, and cast tables. You can
          refer to the database in the code playground for better understanding.
        </p>
      </section>

      <section>
        <h2>Common Set Operators</h2>

        <ul>
          <li>
            <b>INTERSECT</b> – Returns common rows from both queries
          </li>
          <li>
            <b>EXCEPT / MINUS</b> – Returns rows from the first query that are
            not present in the second query
          </li>
          <li>
            <b>UNION</b> – Returns unique rows from both queries
          </li>
          <li>
            <b>UNION ALL</b> – Returns all rows including duplicates
          </li>
        </ul>
      </section>

      <section>
        <h2>Applying Set Operations</h2>

        <p>
          We can apply these set operations on two or more SQL queries to
          combine their results.
        </p>

        <p>
          <b>Syntax</b>
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  c1, c2
FROM
  table_name_1
SET_OPERATOR
SELECT
  c1, c2
FROM
  table_name_2;`}
        />

        <p>
          <b>Basic rules when combining SQL queries:</b>
        </p>
        <ul>
          <li>Each SELECT must have the same number of columns</li>
          <li>Columns must have similar data types</li>
          <li>Columns must be in the same order</li>
        </ul>
      </section>

      <section>
        <h2>INTERSECT Example</h2>

        <p>
          Get ids of actors who acted in both "Sherlock Holmes" (id = 6) and
          "Avengers: Endgame" (id = 15).
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 6
INTERSECT
SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 15;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>actor_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>EXCEPT (MINUS) Example</h2>

        <p>
          Get ids of actors who acted in "Sherlock Holmes" (id = 6) and not in
          "Avengers: Endgame" (id = 15).
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 6
EXCEPT
SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 15;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>actor_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>16</td>
            </tr>
            <tr>
              <td>21</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>UNION Example</h2>

        <p>
          Get distinct ids of actors who acted in "Sherlock Holmes" (id = 6) or
          "Avengers: Endgame" (id = 15).
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 6
UNION
SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 15;`}
        />
      </section>

      <section>
        <h2>UNION ALL Example</h2>

        <p>Get ids of actors who acted in both movies including duplicates.</p>

        <CodeBlock
          language="sql"
          code={`SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 6
UNION ALL
SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 15;`}
        />
      </section>

      <section>
        <h2>ORDER BY in Set Operations</h2>

        <p>
          The ORDER BY clause can appear only once at the end of the query
          containing multiple SELECT statements.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 6
UNION
SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 15
ORDER BY
  1 DESC;`}
        />
      </section>

      <section>
        <h2>Pagination in Set Operations</h2>

        <p>
          LIMIT and OFFSET clauses are used at the end of the combined query.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 6
UNION
SELECT
  actor_id
FROM
  cast
WHERE
  movie_id = 15
ORDER BY
  1 DESC
LIMIT
  5;`}
        />
      </section>

      <section>
        <h2>Try it Yourself!</h2>

        <b>Question 1</b>
        <p>
          Get all the movie ids in which actors "Robert Downey Jr." (id = 6) and
          "Chris Evans" (id = 22) have been casted.
        </p>

        <b>Question 2</b>
        <p>
          Get all the movie ids in which actor "Robert Downey Jr." (id = 6) is
          casted and not "Chris Evans" (id = 22).
        </p>

        <b>Question 3</b>
        <p>
          Get all the unique movie ids in which either actor "Robert Downey Jr."
          (id = 6) or "Chris Evans" (id = 22) is casted.
        </p>

        <b>Question 4</b>
        <p>
          Get the first 5 unique movie ids in which either actor "Robert Downey
          Jr." (id = 6) or "Ryan Reynolds" (id = 7) is casted. Sort ids in
          descending order.
        </p>
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

export default SQL_Set_Operations_CS;
