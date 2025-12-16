import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Arithmetic_Functions_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Arithmetic & String Functions</h1>

      <section>
        <p>
          Arithmetic functions in SQL are used to perform mathematical
          operations on numeric values. Some commonly used arithmetic functions
          are FLOOR, CEIL, and ROUND.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The database contains movies, actors, and cast. You can check the
          schema and data of movies, actors, and cast tables in the code
          playground.
        </p>
      </section>

      <section>
        <h2>FLOOR Function</h2>
        <p>
          The FLOOR function rounds a number to the nearest integer below its
          current value.
        </p>

        <CodeBlock language="sql" code={`SELECT FLOOR(2.3);`} />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>FLOOR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>CEIL Function</h2>
        <p>
          The CEIL function rounds a number to the nearest integer above its
          current value.
        </p>

        <CodeBlock language="sql" code={`SELECT CEIL(-2.7);`} />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>CEIL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-2</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>ROUND Function</h2>
        <p>
          The ROUND function rounds a number to the specified number of decimal
          places.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT ROUND(2.345, 2);
SELECT ROUND(2.345, 1);`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>ROUND</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2.35</td>
            </tr>
            <tr>
              <td>2.3</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Example</h2>
        <p>
          Fetch the ceil, floor, and round (to 1 decimal) values of the
          collections of all movies.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  name,
  ROUND(collection_in_cr, 1) AS rounded_value,
  CEIL(collection_in_cr) AS ceil_value,
  FLOOR(collection_in_cr) AS floor_value
FROM movie;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "70%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>rounded_value</th>
              <th>ceil_value</th>
              <th>floor_value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Matrix</td>
              <td>46.4</td>
              <td>47</td>
              <td>46</td>
            </tr>
            <tr>
              <td>Inception</td>
              <td>83.7</td>
              <td>84</td>
              <td>83</td>
            </tr>
            <tr>
              <td>The Dark Knight</td>
              <td>100.5</td>
              <td>101</td>
              <td>100</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>String Functions</h2>
        <p>
          String functions in SQL are used to manipulate and operate on string
          values.
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "50%" }}
        >
          <thead>
            <tr>
              <th>SQL Function</th>
              <th>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UPPER()</td>
              <td>Converts a string to upper case</td>
            </tr>
            <tr>
              <td>LOWER()</td>
              <td>Converts a string to lowercase</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="sql"
          code={`SELECT name
FROM movie
WHERE UPPER(name) LIKE UPPER('%avengers%');`}
        />
      </section>

      <section>
        <h2>Try it Yourself!</h2>

        <p>
          <b>Question 1:</b> Get ceil, floor and round values of budget.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
  name,
  ROUND(budget_in_cr, 1) AS round_value,
  CEIL(budget_in_cr) AS ceil_value,
  FLOOR(budget_in_cr) AS floor_value
FROM movie;`}
        />

        <p>
          <b>Question 2:</b> Get average rating of movies released in 2010.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT ROUND(AVG(rating), 1) AS avg_rating
FROM movie
WHERE strftime('%Y', release_date) = '2010';`}
        />

        <p>
          <b>Question 3:</b> Get all collections greater than 250 cr.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT CEIL(collection_in_cr) AS collection
FROM movie
WHERE collection_in_cr > 250;`}
        />

        <p>
          <b>Question 4:</b> Get all actor names over the age of 45 in
          uppercase.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT UPPER(name) AS capitalized_name
FROM actor
WHERE age > 45;`}
        />
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

export default Arithmetic_Functions_CS;
