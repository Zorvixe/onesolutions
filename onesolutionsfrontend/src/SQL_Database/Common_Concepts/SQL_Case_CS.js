import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const SQL_Case_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>CASE Clause</h1>

      <section>
        <p>
          SQL provides the <code>CASE</code> clause to perform conditional
          operations. This is similar to the <b>switch case / if-else</b>{" "}
          conditions in other programming languages.
        </p>
        <p>
          Let's learn more about the usage of CASE clause using the given
          database.
        </p>
      </section>

      <section>
        <h2>Database</h2>
        <p>
          The IMDb dataset consists of movies, actors and cast. You can refer to
          the database in the code playground for a better understanding.
        </p>
        <img
          src="/assets/img/expressions_schema.png"
          alt="Schema"
          style={{ width: "70%", height: "300px" }}
        />
      </section>

      <section>
        <h2>CASE Clause</h2>
        <p>
          Each condition in the <code>CASE</code> clause is evaluated and
          results in the corresponding value when the first condition is met.
        </p>

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT c1, c2,
CASE
  WHEN condition1 THEN value1
  WHEN condition2 THEN value2
  ...
  ELSE value
END AS cn
FROM table;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <ul>
            <li>
              In the <b>CASE</b> clause, if no condition is satisfied, it
              returns the value in the ELSE part. If the ELSE part is specified,
              CASE clause results in <b>NULL</b>.
            </li>
            <li>
              We can use <b>CASE</b> in various clauses like SELECT, WHERE,
              HAVING, ORDER BY and GROUP BY.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Example</h2>
        <p>
          Calculate the tax amount for all movies based on the profit. Check the
          following table for tax percentages.
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "80%" }}
        >
          <thead>
            <tr>
              <th>profit</th>
              <th>tax_percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Less than or equal to 100 crores</td>
              <td>10% of profit</td>
            </tr>
            <tr>
              <td>
                Greater than 100 crores and less than or equal to 500 crores
              </td>
              <td>15% of profit</td>
            </tr>
            <tr>
              <td>Greater than 500 crores</td>
              <td>18% of profit</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock
          language="sql"
          code={`SELECT
  id,
  name,
  (collection_in_cr - budget_in_cr) AS profit,
  CASE
    WHEN (collection_in_cr - budget_in_cr) <= 100
      THEN (collection_in_cr - budget_in_cr) * 0.1
    WHEN (collection_in_cr - budget_in_cr) > 100
      AND (collection_in_cr - budget_in_cr) <= 500
      THEN (collection_in_cr - budget_in_cr) * 0.15
    ELSE (collection_in_cr - budget_in_cr) * 0.18
  END AS tax_amount
FROM
  movie;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "70%" }}
        >
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>profit</th>
              <th>tax_amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>The Matrix</td>
              <td>40.13</td>
              <td>4.013</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Inception</td>
              <td>67.68</td>
              <td>6.768</td>
            </tr>
            <tr>
              <td>3</td>
              <td>The Dark Knight</td>
              <td>82.5</td>
              <td>8.25</td>
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
        <h2>Try it Yourself</h2>

        <h3>Question 1</h3>
        <p>Categorise movies as following.</p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "50%" }}
        >
          <thead>
            <tr>
              <th>Rating</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Less than 5</td>
              <td>Poor</td>
            </tr>
            <tr>
              <td>Between 5 and 7</td>
              <td>Average</td>
            </tr>
            <tr>
              <td>Greater than 7</td>
              <td>Good</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>CASE with Aggregates</h2>
        <p>
          CASE statements can also be used together with aggregate functions.
        </p>

        <p>
          <b>Example</b>
        </p>
        <p>
          Get the number of movies with a rating greater than or equal to 8, and
          the movies with rating less than 8, and are released between 2015 and
          2020.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  COUNT(
    CASE
      WHEN rating >= 8 THEN 1
    END
  ) AS above_eight,
  COUNT(
    CASE
      WHEN rating < 8 THEN 1
    END
  ) AS below_eight
  FROM
  movie
  WHERE
  CAST(strftime("%Y", release_date) AS INTEGER) BETWEEN 2015 AND 2020;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>above_eight</th>
              <th>below_eight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>

        <h3>Question 1</h3>
        <p>
          Get the number of movies with a collection{" "}
          <b>greater than or equal to 100 crores</b>, and the movies with
          collection less than 100 crores.
        </p>

        <h4>Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <thead>
            <tr>
              <th>above_100_cr</th>
              <th>below_100_cr</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>13</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>

        <h3>Question 2</h3>
        <p>
          For each genre, get the count of movies that had a rating of at least
          8.0 and count of movies that had a <b>rating below 8.0</b>.
        </p>

        <h4>Output</h4>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "70%" }}
        >
          <thead>
            <tr>
              <th>genre</th>
              <th>rating_above_or_equal_8</th>
              <th>rating_below_8</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Action</td>
              <td>7</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Animation</td>
              <td>2</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Drama</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Mystery</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Sci-fi</td>
              <td>2</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
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

export default SQL_Case_CS;
