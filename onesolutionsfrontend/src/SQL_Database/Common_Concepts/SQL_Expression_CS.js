import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const SQL_Expression_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Expressions in Querying</h1>

      <section>
        <p>
          We can write <code>expressions</code> in various SQL clauses.
          Expressions can comprise of various data types like integers, floats,
          strings, datetime, etc.
        </p>
        <p>Let's learn more about expressions using the following database.</p>
      </section>

      <section>
        <h2>Database</h2>
        <p>The IMDb stores various movies, actors and cast information.</p>
        <img
          src="/assets/img/expressions_schema.png"
          alt="DOM Tree"
          style={{ width: "70%", height: "300px" }}
        />
      </section>

      <section>
        <h2>Arithmetic Operators in SQL</h2>
        <p>
          Arithmetic operators can be used in SQL queries to perform arithmetic
          operations on numeric data.
        </p>

        <p>
          <b>Addition (+) :</b> Adds two numbers together
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
  (budget_in_cr + 10) AS new_budget
FROM
  movie;`}
        />
        <h4>Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "25%" }}
        >
          <thead>
            <tr>
              <th>new_budget</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>16.3</td>
            </tr>
            <tr>
              <td>26</td>
            </tr>
            <tr>
              <td>28</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <p>
          <b>Subtraction (-) :</b> Subtracts one number from another
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
  (budget_in_cr - 2) AS new_budget
FROM
  movie;`}
        />
        <h4>Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "25%" }}
        >
          <thead>
            <tr>
              <th>new_budget</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4.3</td>
            </tr>
            <tr>
              <td>14</td>
            </tr>
            <tr>
              <td>16</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <p>
          <b>Multiplication (*) :</b> Multiplies two numbers
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
  (budget_in_cr * 100) AS budget_as_lakhs
FROM
  movie;`}
        />
        <h4>Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>budget_as_lakhs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>630</td>
            </tr>
            <tr>
              <td>1600</td>
            </tr>
            <tr>
              <td>1800</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <p>
          <b>Division ( / ) :</b> Divides one number by another
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
  (collection_in_cr / budget_in_cr) AS collection_rate
FROM
  movie;`}
        />
        <h4>Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <thead>
            <tr>
              <th>collection_rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>7.36984126984127</td>
            </tr>
            <tr>
              <td>5.23</td>
            </tr>
            <tr>
              <td>5.583333333333333</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <p>
          <b>Modulo (%) :</b> Returns the remainder of a division
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
  age % 2 AS age_reminder_for_2
FROM
  actor;`}
        />
        <h4>Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>age_reminder_for_2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
            </tr>
            <tr>
              <td>0</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Using Expressions in SELECT Clause</h2>
        <p>1. Get profits of all movies.</p>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            Consider profit as the difference between collection and budget.
          </p>
        </div>
        <CodeBlock
          language="sql"
          code={`SELECT
  id,
  name,
  (collection_in_cr - budget_in_cr) AS profit
FROM
  movie;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>profit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>The Matrix</td>
              <td>40.31</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Inception</td>
              <td>67.68</td>
            </tr>
            <tr>
              <td>3</td>
              <td>The Dark Knight</td>
              <td>82.5</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>We use "||" operator to concatenate strings in sqlite3</p>
        </div>
        <p>
          2. Get the movie <code>name</code> and <code>genre</code> in the
          following format:
          <b> movie_name - genre</b>
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  name || " - " || genre AS movie_genre
FROM
  movie;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>movie_genre</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Matrix - Sci-fi</td>
            </tr>
            <tr>
              <td>Inception - Action</td>
            </tr>
            <tr>
              <td>The Dark Knight - Drama</td>
            </tr>
            <tr>
              <td>Toy Story 3 - Animation</td>
            </tr>
            <tr>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Using Expressions in WHERE Clause</h2>

        <p>1. Get all the movies with a profit of at least 50 crores.</p>

        <CodeBlock
          language="sql"
          code={`SELECT
  *
FROM
  movie
WHERE
  (collection_in_cr - budget_in_cr) >= 50;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "80%" }}
        >
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>genre</th>
              <th>budget_in_cr</th>
              <th>collection_in_cr</th>
              <th>rating</th>
              <th>release_date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>Inception</td>
              <td>Action</td>
              <td>16.0</td>
              <td>83.68</td>
              <td>8.8</td>
              <td>2010-07-14</td>
            </tr>
            <tr>
              <td>3</td>
              <td>The Dark Knight</td>
              <td>Action</td>
              <td>18.0</td>
              <td>100.5</td>
              <td>9.0</td>
              <td>2008-07-16</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Toy Story 3</td>
              <td>Animation</td>
              <td>20.0</td>
              <td>106.7</td>
              <td>8.5</td>
              <td>2010-06-25</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
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
        <h2>Using Expressions in UPDATE Clause</h2>

        <p>Scale down ratings from 10 to 5 in movie table.</p>

        <CodeBlock
          language="sql"
          code={`UPDATE movie
SET rating = rating / 2;`}
        />

        <p>
          You can check the updation of movie ratings by retrieving the data
          from the table.
        </p>
      </section>

      <section>
        <h2>Using Expressions in UPDATE Clause</h2>
        <p>Scale down ratings from 10 to 5 in movie table.</p>
        <CodeBlock
          language="sql"
          code={`UPDATE movie
SET rating = rating / 2;`}
        />
      </section>

      <section>
        <h2>Expressions in HAVING Clause</h2>
        <p>Get all the genres with an average profit of at least 100 crores.</p>
        <CodeBlock
          language="sql"
          code={`SELECT
  genre
FROM
  movie
GROUP BY
  genre
HAVING
  AVG(collection_in_cr - budget_in_cr) >= 100;`}
        />
      </section>

      <section>
        <h2>Try it Yourself!</h2>
        <p>
          <b>Question 1</b>
          <br />
          Get the profit of every movie with rating greater than 8.0
        </p>
        <p>
          <b>Question 2</b>
          <br />
          Get all the movies having a profit of at least 30 crores, and belong
          to "Action", "Animation" or "Drama" genres.
        </p>
        <p>
          <b>Question 3</b>
          <br />
          Scale up the ratings from 5 to 100 in the movie table.
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

export default SQL_Expression_CS;
