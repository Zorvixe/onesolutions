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
          SQL queries.Let us understand common set operators by performing
          operations on two sets.
        </p>
        <ul>
          <li>Cast in "Sherlock Holmes" movie</li>
          <li>Cast in "Avengers Endgame" movie</li>
        </ul>
        <img
          src="/assets/img/sets.png"
          alt="Schema"
          style={{ width: "100%", height: "300px" }}
        />
      </section>
      <section>
        <h2>Common Set Operators</h2>
        <b>INTERSECT</b>
        <div className="img-text">
          <img
            src="/assets/img/intersect_v1.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              Actors who acted in both "Sherlock Holmes" and "Avengers: Endgame"
            </p>
            <p>
              <b>Result: </b>Robert D Jr.
            </p>
          </div>
        </div>
        <b>MINUS</b>
        <div className="img-text">
          <img
            src="/assets/img/minus_v1.png"
            alt="DOM Tree"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="text">
            <p>
              Actors who acted in "Sherlock Holmes" and not in "Avengers:
              Endgame"
            </p>
            <p>
              <b>Result: </b>Jude Law, Mark Strong.
            </p>
          </div>
        </div>
        <b>UNION</b>
        <div className="img-text">
          <img
            src="/assets/img/union_v1.png"
            alt="DOM Tree"
            style={{ width: "450px", height: "180px" }}
          />
          <div className="text">
            <p>
              Unique actors who acted in either "Sherlock Holmes" or in
              "Avengers: Endgame"
            </p>
            <p>
              <b>Result: </b>Jude Law, Mark Strong, Robert D Jr, Chris Evans,
              Mark Ruffalo.
            </p>
          </div>
        </div>
        <b>UNION ALL</b>
        <div className="img-text">
          <img
            src="/assets/img/union_all_v1.png"
            alt="DOM Tree"
            style={{ width: "450px", height: "180px" }}
          />
          <div className="text">
            <p>Does not eliminate duplicate results</p>
            <p>
              <b>Result: </b>Jude Law, Mark Strong, Robert D Jr, Robert D Jr,
              Chris Evans, Mark Ruffalo.
            </p>
          </div>
        </div>
      </section>
      <section>
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
        <h2>Database</h2>
        <p>
          The IMDb dataset consists of <b>movies, actors,</b> and <b>cast</b>{" "}
          tables. You can refer to the database in the code playground for
          better understanding.
        </p>
        <img
          src="/assets/img/expressions_schema.png"
          alt="Schema"
          style={{ width: "70%", height: "300px" }}
        />
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
          <li>Each SELECT statement must have the same number of columns.</li>
          <li>The columns must have similar data types.</li>
          <li>
            The columns in each SELECT statement must be in the same order.
          </li>
        </ul>
      </section>

      <section>
        <h3>Examples</h3>
        <ul>
          <li>
            Get ids of actors who acted in both "Sherlock Holmes" (id = 6) and
            "Avengers: Endgame" (id = 15).
          </li>

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

          <li>
            Get ids of actors who acted in "Sherlock Holmes" (id = 6) and not in
            "Avengers: Endgame" (id = 15).
          </li>

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

          <li>
            Get distinct ids of actors who acted in "Sherlock Holmes" (id = 6)
            or "Avengers: Endgame" (id = 15).
          </li>

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
              <tr>
                <td>8</td>
              </tr>
              <tr>
                <td>16</td>
              </tr>
              <tr>
                <td>21</td>
              </tr>
              <tr>
                <td>22</td>
              </tr>
            </tbody>
          </table>

          <li>
            Get ids of actors who acted in "Sherlock Holmes"( id = 6) or
            "Avengers: Endgame"(id = 15), including duplicates for actors who
            appeared in both movies.
          </li>

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
              <tr>
                <td>16</td>
              </tr>
              <tr>
                <td>21</td>
              </tr>
              <tr>
                <td>6</td>
              </tr>
              <tr>
                <td>8</td>
              </tr>
              <tr>
                <td>22</td>
              </tr>
            </tbody>
          </table>
        </ul>
      </section>
      <section>
        <h2>Try it Yourself!</h2>
        <ol>
          <li>
            Get all the movie ids in which actors "Robert Downey Jr." (id = 6)
            and "Chris Evans" (id = 22) have been casted.
          </li>
          <li>
            Get all the movie ids in which actor "Robert Downey Jr." (id = 6))
            is casted and not "Chris Evans" (id = 22).
          </li>
          <li>
            Get all the unique movie ids in which either actor "Robert Downey
            Jr." (id = 6)) or "Chris Evans" (id = 22) is casted.
          </li>
        </ol>
      </section>

      <section>
        <h2>ORDER BY in Set Operations</h2>

        <p>
          The ORDER BY clause can appear only once at the end of the query
          containing multiple SELECT statements.
        </p>
        <p>
          While using Set Operators, individual SELECT statements cannot have
          ORDER BY clause. Additionally, sorting can be done based on the
          columns that appear in the first SELECT query. For this reason, it is
          <code>
            {" "}
            recommended to sort these kinds of queries using column positions
          </code>
          .
        </p>
        <b>Example</b>
        <p>
          Get distinct ids of actors who acted in "Sherlock Holmes" (id = 6) or
          "Avengers: Endgame"(id = 15). Sort ids in the descending order.
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
        <h2>Try it Yourself!</h2>
        <ul>
          <li>
            Get all the movie ids in which actor "Robert Downey Jr." (id = 6) is
            casted and not "Chris Evans" (id = 22). Sort the ids in descending
            order.
          </li>
        </ul>
      </section>

      <section>
        <h2>Pagination in Set Operations</h2>
        <p>
          Similar to the ORDER BY clause, the LIMIT and OFFSET clauses are used
          at the end of the list of queries.
        </p>
        <b>Example</b>
        <p>
          Get the first 5 ids of actors who acted in "Sherlock Holmes" (id = 6)
          or "Avengers: Endgame" (id = 15). Sort ids in the descending order.
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

        <ol>
          <li>
            Get the first 5 unique movie ids in which either actor "Robert
            Downey Jr." (id = 6) or "Ryan Reynolds" (id = 7) is casted. Sort ids
            in descending order.
          </li>
        </ol>
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
