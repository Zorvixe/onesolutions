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
        <p>
          <b>Schema</b>
        </p>
        <img
          src="/assets/img/expressions_schema.png"
          alt="DOM Tree"
          style={{ width: "70%", height: "300px" }}
        />
      </section>

      <section>
        <h2>SQL Function Categories</h2>
        <p>SQL functions can be divided into different categories such as:</p>
        <ol>
          <li>
            <b>Date Functions: </b>Used to work with dates or times.
          </li>
          <li>
            <b>Cast Functions: </b> Used to change the data type of a value.
          </li>
          <li>
            <b>Arithmetic Functions:</b> Used to perform calculations on
            numbers.
          </li>
        </ol>
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
          The <code>strftime()</code> function is used to extract{" "}
          <b>year, month, day, hour,</b> etc., from a date (or) datetime field
          based on a specified <b>format</b> as strings.
        </p>

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock language="sql" code={`strftime(format, field_name)`} />

        <p>
          <b>Example</b>
        </p>
        <CodeBlock language="sql" code={`strftime("%Y", release_date)`} />
        <p>
          Let's understand various formats in date functions with an example.
        </p>
        <p>
          Consider the datetime <code>2021-02-28 08:00:00</code>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Format</th>
              <th>Description</th>
              <th>Output Format</th>
              <th>Function</th>
              <th>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>%Y</td>
              <td>Year</td>
              <td>1990, 2021 etc.</td>
              <td>strftime("%Y", field_name)</td>
              <td>Extract Year</td>
            </tr>
            <tr>
              <td>%m</td>
              <td>Month</td>
              <td>01 - 12</td>
              <td>strftime("%m", field_name)</td>
              <td>Extract Month</td>
            </tr>
            <tr>
              <td>%d</td>
              <td>Day of the month</td>
              <td>01 - 31</td>
              <td>strftime("%d", field_name)</td>
              <td>Extract Day</td>
            </tr>
            <tr>
              <td>%H</td>
              <td>Hour</td>
              <td>00 - 24</td>
              <td>strftime("%H", field_name)</td>
              <td>Extract Hour</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>How to use strftime()</h2>
        <ol>
          <li>
            Choose the format of the datetime that you want, such as the{" "}
            <code>year</code>, the <code>month</code>, or the <code>day</code>,
            etc.
          </li>
          <li>
            Write the function using <code>strftime(format, field_name)</code>{" "}
            in your SQL query.
          </li>
        </ol>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <b>Strftime()</b> extracts date and time in the string format.
          </p>
        </div>
      </section>

      <section>
        <h3>Example</h3>
        <p>
          1. Get the movie title and release year for every movie from the
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
        <p>From the above query,</p>
        <ul>
          <li>
            We want to get the year from the <code>release_date</code> column in
            the movie table.
          </li>
          <li>
            We use <code>strftime('%Y', release_date)</code> to extract the year
            from the
            <code>release_date</code> column.
          </li>
          <li>
            We write this function in the <code>SELECT</code> clause of the
            query.
          </li>
        </ul>
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
        <p>
          2. Get the number of movies released in each month of the year 2010
        </p>

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

        <section>
          <p>From the above query,</p>
          <ul>
            <li>
              We want to get data from the <code>movie</code> table.
            </li>
            <li>
              We use the <code>COUNT()</code> function to count the number of
              movies released per month in the year 2010.
            </li>
            <li>
              We use <code>strftime('%m', release_date)</code> to extract the
              month from the <code>release_date</code> column.
            </li>
            <li>
              We also use <code>strftime('%Y', release_date)</code> to extract
              the year from the <code>release_date</code> column.
            </li>
            <li>
              We group the results by month using the <code>GROUP BY</code>{" "}
              clause.
            </li>
          </ul>
        </section>

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
        <p>
          By using <code>strftime()</code>, we can perform weekly, monthly, or
          annual analyses enabling us to gain deeper insight into the data
        </p>
      </section>

      <section>
        <h2>Try it Yourself!</h2>
        <p>
          Now that you've learned about Date Functions in SQL, let's try some
          practice exercises. Here are four example questions:
        </p>

        <h3>Question 1</h3>
        <p>Get the number of Action movies released in the year 2010.</p>

        <h4>Approach</h4>
        <ul>
          <li>
            We need to count the total number of movies that have a genre of{" "}
            <code>Action</code> and were released in the year 2010.
          </li>
        </ul>

        <h4>Expected Output</h4>
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

        <h4>Hints</h4>
        <ul>
          <li>
            Use the <code>COUNT()</code> function to count the movies.
          </li>
          <li>
            Use <code>strftime('%Y', release_date)</code> to get the release
            year of the movie.
          </li>
          <li>
            Use a <code>WHERE</code> clause to filter for genre = 'Action' and
            year = 2010.
          </li>
        </ul>

        <h4>SQL</h4>
        <CodeBlock
          language="sql"
          code={`SELECT COUNT(*) AS total_movies
FROM movie
WHERE genre = 'Action' 
  AND strftime('%Y', release_date) = '2010';`}
        />

        <h3>Question 2</h3>
        <p>
          Get all the names of the movies that are released in summer, i.e.,
          between April and June.
        </p>

        <h4>Approach</h4>
        <p>
          We need to find all the movies that were released in the months of
          <b> April, May,</b> and <b>June</b>.
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
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
        <h3>Hints</h3>
        <ul>
          <li>We need to find all movies released in April, May, and June.</li>
          <li>
            Use <code>strftime('%m', release_date)</code> to extract the release
            month.
          </li>
          <li>
            Use a <code>WHERE</code> clause with{" "}
            <code>IN ('04','05','06')</code> to filter summer months.
          </li>
        </ul>

        <h4>SQL</h4>
        <CodeBlock
          language="sql"
          code={`SELECT name
FROM movie
WHERE strftime('%m', release_date) IN ('04','05','06');`}
        />

        <h3>Question 3</h3>
        <p>Get the month in which the highest number of movies are released.</p>

        <h4>Approach</h4>
        <ul>
          <li>Count the number of movies released in each month.</li>
          <li>
            Use <code>strftime('%m', release_date)</code> to extract the month.
          </li>
          <li>
            Use <code>COUNT()</code> to get the number of movies per month.
          </li>
          <li>
            Use <code>GROUP BY</code> to group results by month.
          </li>
          <li>
            Use <code>ORDER BY total_movies DESC LIMIT 1</code> to get the top
            month.
          </li>
        </ul>

        <h4>SQL</h4>
        <CodeBlock
          language="sql"
          code={`SELECT strftime('%m', release_date) AS month,
       COUNT(*) AS total_movies
FROM movie
GROUP BY month
ORDER BY total_movies DESC
LIMIT 1;`}
        />

        <h3>Question 4</h3>
        <p>
          Get the name, profit, and release date for movies released in 2008,
          2009, or 2010.
        </p>

        <h4>Approach</h4>
        <ul>
          <li>
            Calculate profit using{" "}
            <code>(collection_in_cr - budget_in_cr)</code>.
          </li>
          <li>
            Use <code>strftime('%Y', release_date)</code> to get the release
            year.
          </li>
          <li>
            Use a <code>WHERE</code> clause with{" "}
            <code>IN ('2008','2009','2010')</code> to filter years.
          </li>
        </ul>

        <h4>SQL</h4>
        <CodeBlock
          language="sql"
          code={`SELECT name,
       (collection_in_cr - budget_in_cr) AS profit,
       release_date
FROM movie
WHERE strftime('%Y', release_date) IN ('2008','2009','2010');`}
        />
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
