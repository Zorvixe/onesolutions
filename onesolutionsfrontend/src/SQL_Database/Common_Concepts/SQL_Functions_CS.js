
import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const  SQL_Functions_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>SQL Functions – Date Functions</h1>

      <section>
        <p>
          SQL provides many built-in functions. Date Functions are used to extract the date or time from a datetime field.
          One important function is <b>strftime()</b>.
        </p>
        <p>
          <b>strftime()</b> extracts year, month, day, hour, etc., from a datetime field based on a specified format.
        </p>
      </section>

      <section>
        <h2>Syntax</h2>
        <CodeBlock
          language="sql"
          code={`strftime(format, field_name)`}
        />

        <h2>Examples</h2>

        <h3>1. Get movie title and release year</h3>
        <CodeBlock
          language="sql"
          code={`SELECT name, strftime('%Y', release_date) AS release_year
FROM movie;`}
        />
        <h3>Output</h3>
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "50%" }}>
          <thead>
            <tr><th>name</th><th>release_year</th></tr>
          </thead>
          <tbody>
            <tr><td>The Matrix</td><td>1999</td></tr>
            <tr><td>Inception</td><td>2010</td></tr>
            <tr><td>The Dark Knight</td><td>2008</td></tr>
          </tbody>
        </table>

        <h3>2. Get number of movies released per month in 2010</h3>
        <CodeBlock
          language="sql"
          code={`SELECT strftime('%m', release_date) AS month, COUNT(*) AS total_movies
FROM movie
WHERE strftime('%Y', release_date) = '2010'
GROUP BY month;`}
        />
        <h3>Output</h3>
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "30%" }}>
          <thead>
            <tr><th>month</th><th>total_movies</th></tr>
          </thead>
          <tbody>
            <tr><td>03</td><td>2</td></tr>
            <tr><td>05</td><td>1</td></tr>
            <tr><td>06</td><td>3</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>
        <ul>
          <li>
            <b>Question 1:</b> Get the number of Action movies released in the year 2010.
            <br />
            <CodeBlock
              language="sql"
              code={`SELECT COUNT(*) AS total_movies
FROM movie
WHERE genre = 'Action' AND strftime('%Y', release_date) = '2010';`}
            />
            <h3>Expected Output</h3>
            <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "20%" }}>
              <thead>
                <tr><th>total_movies</th></tr>
              </thead>
              <tbody>
                <tr><td>4</td></tr>
              </tbody>
            </table>
          </li>

          <li>
            <b>Question 2:</b> Get all movie names released in summer (April to June).
            <br />
            <CodeBlock
              language="sql"
              code={`SELECT name
FROM movie
WHERE strftime('%m', release_date) IN ('04','05','06');`}
            />
          </li>

          <li>
            <b>Question 3:</b> Get the month with the highest number of movie releases.
            <br />
            <CodeBlock
              language="sql"
              code={`SELECT strftime('%m', release_date) AS month, COUNT(*) AS total_movies
FROM movie
GROUP BY month
ORDER BY total_movies DESC
LIMIT 1;`}
            />
          </li>

          <li>
            <b>Question 4:</b> Get movie name, profit, and release date for movies released in 2008, 2009, or 2010.
            <br />
            <CodeBlock
              language="sql"
              code={`SELECT name, (collection_in_cr - budget_in_cr) AS profit, release_date
FROM movie
WHERE strftime('%Y', release_date) IN ('2008','2009','2010');`}
            />
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

export default  SQL_Functions_CS;
