import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const SQL_Functions_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>SQL Functions</h1>

      <section>
        <p>
          SQL provides many built-in functions to perform various operations on
          data stored in tables.
        </p>
        <p>
          Let's look at a few most commonly used functions in the industry using
          the following database.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The IMDb dataset stores information about movies, actors, and cast
          members.
        </p>
      </section>

      <section>
        <h2>SQL Function Categories</h2>
        <p>SQL functions can be divided into different categories such as:</p>
        <ul>
          <li>Date Functions</li>
          <li>Cast Functions</li>
          <li>Arithmetic Functions</li>
        </ul>
      </section>

      <section>
        <h2>Date Functions</h2>
        <p>
          Date Functions are used to extract the date or time from a datetime
          field. An important function in date functions is the{" "}
          <code>strftime()</code> function.
        </p>

        <h3>strftime()</h3>
        <p>
          The <code>strftime()</code> function is used to extract year, month,
          day, hour, etc., from a date (or) datetime field based on a specified
          format as strings.
        </p>

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock language="sql" code={`strftime(format, field_name)`} />

        <p>
          <b>Example</b>
        </p>
        <CodeBlock language="sql" code={`strftime("%Y", release_date)`} />
      </section>

      <section>
        <h2>How to use strftime()</h2>
        <ul>
          <li>
            Choose the format of the datetime that you want, such as the year,
            the month, or the day, etc.
          </li>
          <li>
            Write the function using <code>strftime(format, field_name)</code>{" "}
            in your SQL query.
          </li>
        </ul>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>Strftime() extracts date and time in the string format.</p>
        </div>
      </section>

      <section>
        <h2>Example 1</h2>
        <p>
          Get the movie title and release year for every movie from the
          database.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  name,
  strftime('%Y', release_date) AS release_year
FROM
  movie;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>release_year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Matrix</td>
              <td>1999</td>
            </tr>
            <tr>
              <td>Inception</td>
              <td>2010</td>
            </tr>
            <tr>
              <td>The Dark Knight</td>
              <td>2008</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Example 2</h2>
        <p>Get the number of movies released in each month of the year 2010</p>

        <CodeBlock
          language="sql"
          code={`SELECT
  strftime('%m', release_date) AS month,
  COUNT(*) AS total_movies
FROM
  movie
WHERE
  strftime('%Y', release_date) = '2010'
GROUP BY
  month;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>month</th>
              <th>total_movies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>03</td>
              <td>2</td>
            </tr>
            <tr>
              <td>05</td>
              <td>1</td>
            </tr>
            <tr>
              <td>06</td>
              <td>3</td>
            </tr>
            <tr>
              <td>..</td>
              <td>..</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>

        <b>Question 1</b>
        <p>Get the number of Action movies released in the year 2010.</p>

        <b>Expected Output</b>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>total_movies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4</td>
            </tr>
          </tbody>
        </table>

        <b>Question 2</b>
        <p>
          Get all the names of the movies that are released in summer, i.e.,
          between April and June.
        </p>

        <b>Expected Output</b>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <thead>
            <tr>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Matrix</td>
            </tr>
            <tr>
              <td>Toy Story 3</td>
            </tr>
            <tr>
              <td>Shutter Island</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <b>Question 3</b>
        <p>Get the month in which the highest number of movies are released.</p>

        <b>Expected Output</b>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>month</th>
              <th>total_movies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>06</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>

        <b>Question 4</b>
        <p>
          Get the name, profit and release date for the movies that were
          released in the year 2008, 2009 or 2010.
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

export default SQL_Functions_CS;
