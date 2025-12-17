import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Arthmetic_Functions_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Arithmetic Functions</h1>

      <section>
        <p>
          Arithmetic functions in SQL are used to perform mathematical
          operations on numeric values. Some commonly used arithmetic functions
          are <code>FLOOR</code>, <code>CEIL</code>, and <code>ROUND</code>.
        </p>
        <p>
          Let's learn more about arithmetic functions using the following
          database.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>The database contains movies, actors, and cast.</p>
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
        <h2>FLOOR Function</h2>
        <p>
          The <code>FLOOR</code> function rounds a number to the nearest integer
          below its current value.
        </p>
        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock language="sql" code={`FLOOR(number)`} />
        <p>
          <b>Example</b>
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
          The <code>CEIL</code> function rounds a number to the nearest integer
          above its current value.
        </p>
        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock language="sql" code={`CEIL(number)`} />
        <p>
          <b>Example</b>
        </p>
        <CodeBlock language="sql" code={`SELECT CEIL(-2.7);`} />
        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "15%" }}
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
          The <code>ROUND</code> function rounds a number to the specified
          number of decimal places.
        </p>
        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock language="sql" code={`ROUND(number, decimal_places)`} />
        <p>
          <b>Example</b>
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
          style={{ borderCollapse: "collapse", width: "15%" }}
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
        <p>
          You can use these arithmetic functions in your SQL queries to perform
          calculations and manipulate numeric values as needed.
        </p>
        <p>
          Here values are some examples for the <code>FLOOR</code>,{" "}
          <code>CEIL</code>, and <code>ROUND</code>
          functions.
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "80%" }}
        >
          <thead>
            <tr>
              <th>Function</th>
              <th>2.3</th>
              <th>3.9</th>
              <th>4.0</th>
              <th>5.5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FLOOR</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr>
              <td>CEIL</td>
              <td>3</td>
              <td>4</td>
              <td>4</td>
              <td>6</td>
            </tr>
            <tr>
              <td>ROUND</td>
              <td>2</td>
              <td>4</td>
              <td>4</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>Example</h3>
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
FROM
  movie;`}
        />
        <p>From the above query,</p>
        <ul>
          <li>We want to get the data from the movie table.</li>
          <li>
            We use the <code>ROUND()</code> function to round the
            <code>collection_in_cr</code> to 1 decimal.
          </li>
          <li>
            We use the <code>CEIL()</code> function to round the
            <code>collection_in_cr</code> to the nearest integer above its
            current value.
          </li>
          <li>
            We use the <code>FLOOR()</code> function to round{" "}
            <code>collection_in_cr</code>
            to the nearest integer below its current value.
          </li>
        </ul>

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
          values or character data.
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
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

        <b>Example</b>
        <p>
          To search for all the Avengers movies regardless of their case(Upper
          or Lower), you can write the query below
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  name
FROM
  movie
WHERE
  UPPER(name) LIKE UPPER("%avengers%");`}
        />

        <b>Output</b>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Avengers: Age of Ultron</td>
            </tr>
            <tr>
              <td>Avengers: Endgame</td>
            </tr>
            <tr>
              <td>Avengers: Infinity War</td>
            </tr>
          </tbody>
        </table>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Usually, UPPER() and LOWER() functions can help you to perform
            case-insensitive searches.
          </p>
        </div>
      </section>

      <section>
        <h2>Try it Yourself!</h2>
        <p>
          Now that you've learned about Arithmetic and String Functions in SQL,
          let's try some practice exercises. Here are four example questions:
        </p>

        <h3>Question 1</h3>
        <p>
          For each movie, get the ceil, floor, and round (to 1 decimal) values
          of the budget.
        </p>

        <h4>Expected Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>round_value</th>
              <th>ceil_value</th>
              <th>floor_value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Matrix</td>
              <td>6.3</td>
              <td>7</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Inception</td>
              <td>16</td>
              <td>16</td>
              <td>16</td>
            </tr>
            <tr>
              <td>The Dark Knight</td>
              <td>18</td>
              <td>18</td>
              <td>18</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <h4>Hints</h4>
        <ul>
          <li>
            Use the <code>CEIL()</code> function to get the ceil value of the
            budget.
          </li>
          <li>
            Use the <code>FLOOR()</code> function to get the floor value of the
            budget.
          </li>
          <li>
            Use the <code>ROUND()</code> function with a precision of 1 to get
            the round value of the budget.
          </li>
        </ul>

        <CodeBlock
          language="sql"
          code={`SELECT
  name,
  ROUND(budget_in_cr, 1) AS round_value,
  CEIL(budget_in_cr) AS ceil_value,
  FLOOR(budget_in_cr) AS floor_value
FROM
  movie;`}
        />

        <h3>Question 2</h3>
        <p>
          Get the average rating of movies released in the year{" "}
          <code>2010</code> and round it to 1 decimal place.
        </p>

        <h4>Expected Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>avg_rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>7.8</td>
            </tr>
          </tbody>
        </table>

        <h4>Hints</h4>
        <ul>
          <li>Use the AVG() function to calculate the average rating.</li>
          <li>
            Use a WHERE clause to filter for movies released in the year 2010.
          </li>
        </ul>

        <CodeBlock
          language="sql"
          code={`SELECT
  ROUND(AVG(rating), 1) AS avg_rating
FROM
  movie;`}
        />

        <h3>Question 3</h3>
        <p>
          Get all collections of all movies in the database that are greater
          than <code>250</code> cr.
        </p>

        <b>Expected Output</b>
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
              <td>723</td>
            </tr>
            <tr>
              <td>266</td>
            </tr>
            <tr>
              <td>600</td>
            </tr>
            <tr>
              <td>600</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <h4>Hints</h4>
        <ul>
          <li>
            Use the <code>CEIL()</code> function to get the ceil value of the
            collections.
          </li>
          <li>
            Use a <code>WHERE</code> clause to filter for collections greater
            than 250 cr.
          </li>
        </ul>

        <CodeBlock
          language="sql"
          code={`SELECT
  CEIL(collection_in_cr) AS collection
FROM
  movie;`}
        />

        <h3>Question 4</h3>
        <p>Get all the actor names over the age of 45 in uppercase.</p>

        <h4>Expected Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "25%" }}
        >
          <thead>
            <tr>
              <th>capitalized_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>KEANU REEVES</td>
            </tr>
            <tr>
              <td>CARRIE-ANNE MOSS</td>
            </tr>
            <tr>
              <td>CHRISTOPHER NOLAN</td>
            </tr>
            <tr>
              <td>LEONARDO DICAPRIO</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <h4>Hints</h4>
        <ul>
          <li>
            Use the <code>UPPER()</code> function to convert the names to
            uppercase.
          </li>
          <li>
            Use a <code>WHERE</code> clause to filter for actors over the age of
            45.
          </li>
        </ul>

        <CodeBlock
          language="sql"
          code={`SELECT
  UPPER(name) AS capitalized_name
FROM
  actor;`}
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

export default Arthmetic_Functions_CS;
