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
      <h1>CAST Function in SQL</h1>

      <section>
        <p>
          In SQL, data belongs to different data types like integers, floats,
          strings, datetime, etc. The <b>CAST()</b> function is used to convert
          a value from one data type to another.
        </p>
      </section>

      <section>
        <h2>Syntax</h2>
        <CodeBlock language="sql" code={`CAST(value AS data_type);`} />

        <h2>Example</h2>
        <p>Convert release year from string to integer:</p>
        <CodeBlock
          language="sql"
          code={`CAST(strftime('%Y', release_date) AS INTEGER)`}
        />
      </section>

      <section>
        <h2>Use Case Example</h2>
        <p>Get number of movies released in each month of 2010:</p>
        <CodeBlock
          language="sql"
          code={`SELECT strftime('%m', release_date) AS month, COUNT(*) AS total_movies
FROM movie
WHERE CAST(strftime('%Y', release_date) AS INTEGER) = 2010
GROUP BY month;`}
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
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>

        <ul>
          <li>
            <b>Question 1:</b> Get all <code>collection_in_cr</code> values
            where rating > 8.5 as INT.
            <br />
            <CodeBlock
              language="sql"
              code={`SELECT CAST(collection_in_cr AS INT) AS collection
FROM movie
WHERE rating > 8.5;`}
            />
            <h3>Expected Output</h3>
            <table
              border="1"
              cellPadding="6"
              style={{ borderCollapse: "collapse", width: "20%" }}
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
              </tbody>
            </table>
          </li>

          <li>
            <b>Question 2:</b> Get all years of movies where genre is "Drama" as
            INT.
            <br />
            <CodeBlock
              language="sql"
              code={`SELECT CAST(strftime("%Y", release_date) AS INT) AS year
FROM movie
WHERE genre = 'Drama';`}
            />
            <h3>Expected Output</h3>
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
          </li>

          <li>
            <b>Question 3:</b> Get all DISTINCT leap years from the movie table.
            <br />
            <CodeBlock
              language="sql"
              code={`SELECT DISTINCT CAST(strftime('%Y', release_date) AS INT) AS year
FROM movie
WHERE (CAST(strftime('%Y', release_date) AS INT) % 4 = 0 AND CAST(strftime('%Y', release_date) AS INT) % 100 != 0)
   OR (CAST(strftime('%Y', release_date) AS INT) % 400 = 0);`}
            />
            <h3>Expected Output</h3>
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
