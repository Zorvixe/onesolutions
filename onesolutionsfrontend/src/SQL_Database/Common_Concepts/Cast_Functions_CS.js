import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Cast_Functions_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>CAST Function</h1>

      <section>
        <p>
          In SQL, data belongs to different data types like integers, floats,
          strings, datetime, etc. In some cases, we might need to change the
          data type of a value. In such cases, we can use the <code>CAST</code>{" "}
          function.
        </p>
        <p>
          Let's learn more about CAST Function using the following database.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The database contains movies, actors, and cast. You can check the
          schema and data of movies, actors, and cast tables in the code
          playground.
        </p>
        <p>
          <b>Schema</b>
        </p>
        <img
          src="/assets/img/expressions_schema.png"
          alt="Schema"
          style={{ width: "70%", height: "300px" }}
        />
      </section>

      <section>
        <h2>CAST Function Syntax and Examples</h2>
        <p>
          In database management systems, the <code>CAST</code> function is used
          to convert a value from one data type to another data type.
        </p>

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock language="sql" code={`CAST(value AS data_type);`} />

        <p>
          <b>Example</b>
        </p>
        <CodeBlock
          language="sql"
          code={`CAST(strftime('%Y', release_date) AS INTEGER)`}
        />

        <p>
          The <code>CAST</code> function takes:
        </p>
        <ol>
          <li>
            <b>Value:</b> The value that you want to convert into a specific
            data type.
          </li>
          <li>
            <b>Data type:</b> The data type to which you want to convert the
            value.
          </li>
        </ol>
      </section>

      <section>
        <h3>Example</h3>
        <p>
          Let's say you have a database of movie details, and you want to find
          out how many movies were released in each month of the year 2010.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  strftime('%m', release_date) AS month,
  COUNT(*) AS total_movies
FROM
  movie
WHERE
  CAST(strftime('%Y', release_date) AS INTEGER) = 2010
GROUP BY
  month;`}
        />

        <p>From the above query,</p>
        <ul>
          <li>
            We want to get the data from the <code>movie</code> table.
          </li>
          <li>
            We use the <code>COUNT() </code>function to count the number of
            movies released per month in the year 2010.
          </li>
          <li>
            We use <code>strftime('%m', release_date)</code> to extract the
            month from the release_date column.
          </li>
          <li>
            We also use <code>strftime('%Y', release_date)</code> to extract the
            year from the release_date column.
          </li>
          <li>
            We use the <code>CAST() </code> function to convert the release date
            of movies from string format to integer format.
          </li>
          <li>
            We use the <code>WHERE</code> clause, the year part of the date can
            be compared with the year <b>2010</b>.
          </li>
          <li>
            We group the results by month using the <code>GROUP BY</code>{" "}
            clause.
          </li>
        </ul>

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
        <p>
          Now that you've learned about CAST function in SQL, let's try some
          practice exercises. Here are three example questions:
        </p>

        <h3>Question 1</h3>
        <p>
          Get all the <code>collection_in_cr</code> values from the movie table,
          where the rating is greater than <b>8.5</b>.
        </p>
        <p>
          <b>Note:</b> For this question, get the values in the <code>INT</code>{" "}
          datatype.
        </p>

        <h4>Approach</h4>
        <p>
          We need to retrieve all the <code>collection_in_cr</code> values from
          the movie table where the rating is greater than <b>8.5</b>.
        </p>

        <h4>Expected Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "18%" }}
        >
          <thead>
            <tr>
              <th>collection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>46</td>
            </tr>
            <tr>
              <td>83</td>
            </tr>
            <tr>
              <td>100</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <h4>Hints</h4>
        <ul>
          <li>
            Use the <code>CAST()</code> function to convert the{" "}
            <code>collection_in_cr</code> value to INT.
          </li>
          <CodeBlock
            language="sql"
            code={`SELECT
  CAST(collection_in_cr AS INT) AS collection
FROM
  movie`}
          />
          <li>
            Use a <code>WHERE</code> clause to filter for a rating greater than{" "}
            <code>8.5</code>.
          </li>
        </ul>

        <h3>Question 2</h3>
        <p>
          Get all years from the movie table where the genre belongs to the
          "Drama".
        </p>
        <p>
          <b>Note:</b> For this question, convert the year in string datatype to
          the <code>INT</code> datatype.
        </p>

        <h4>Approach</h4>
        <p>
          We need to retrieve all the years from the movie table that's present
          in the database, where the genre is <code>Drama</code>.
        </p>

        <h4>Expected Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2008</td>
            </tr>
            <tr>
              <td>1972</td>
            </tr>
            <tr>
              <td>1974</td>
            </tr>
          </tbody>
        </table>

        <h4>Hints</h4>
        <ul>
          <li>
            Use the <code>CAST()</code> function to convert the year value to an
            integer.
          </li>
          <CodeBlock
            language="sql"
            code={`SELECT
  CAST(strftime("%Y", release_date) AS INT) AS year
FROM
  movie`}
          />
          <li>
            Use a <code>WHERE</code> clause to filter for genre equal to Drama.
          </li>
        </ul>

        <h3>Question 3</h3>
        <p>
          Get all the DISTINCT <code>leap years</code> from the movie table in
          the database. A year is considered a leap year if it satisfies any one
          of the below conditions,
        </p>
        <ul>
          <li>It is divisible by 4 and not divisible by 100.</li>
          <li>It is divisible by 400.</li>
        </ul>

        <h4>Expected Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1972</td>
            </tr>
            <tr>
              <td>2008</td>
            </tr>
            <tr>
              <td>2016</td>
            </tr>
          </tbody>
        </table>

        <h4>Hints</h4>
        <ul>
          <li>
            Use the <code>CAST()</code> function to convert the year value to an
            integer.
          </li>
          <CodeBlock
            language="sql"
            code={`SELECT
  DISTINCT CAST(strftime('%Y', release_date) AS INT) AS year
FROM
  movie`}
          />
          <li>
            Use a <code>WHERE</code> clause to filter for years that satisfy the
            leap year conditions.
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

export default Cast_Functions_CS;
