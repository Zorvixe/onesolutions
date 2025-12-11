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
          Expressions can be written in various SQL clauses and can include
          integers, floats, strings, datetime, etc.
        </p>
        <p>
          Let’s learn more using the <b>IMDb</b> database which stores movies,
          actors, and cast information.
        </p>
      </section>

      <section>
        <h2>Arithmetic Operators in SQL</h2>

        <h3>Addition (+)</h3>
        <p>Adds two numbers together</p>
        <CodeBlock
          language="sql"
          code={`SELECT (budget_in_cr + 10) AS new_budget
FROM movie;`}
        />
        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
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
          </tbody>
        </table>

        <h3>Subtraction (-)</h3>
        <CodeBlock
          language="sql"
          code={`SELECT (budget_in_cr - 2) AS new_budget
FROM movie;`}
        />

        <h3>Multiplication (*)</h3>
        <CodeBlock
          language="sql"
          code={`SELECT (budget_in_cr * 100) AS budget_as_lakhs
FROM movie;`}
        />

        <h3>Division (/)</h3>
        <CodeBlock
          language="sql"
          code={`SELECT (collection_in_cr / budget_in_cr) AS collection_rate
FROM movie;`}
        />

        <h3>Modulo (%)</h3>
        <CodeBlock
          language="sql"
          code={`SELECT age % 2 AS age_reminder_for_2
FROM actor;`}
        />
      </section>

      <section>
        <h2>Using Expressions in SELECT Clause</h2>

        <p>Get profits of all movies (profit = collection - budget)</p>
        <CodeBlock
          language="sql"
          code={`SELECT id, name, (collection_in_cr - budget_in_cr) AS profit
FROM movie;`}
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
          </tbody>
        </table>

        <p>Concatenate strings using "||"</p>
        <CodeBlock
          language="sql"
          code={`SELECT name || " - " || genre AS movie_genre
FROM movie;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "50%" }}
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
          </tbody>
        </table>
      </section>

      <section>
        <h2>Using Expressions in WHERE Clause</h2>
        <p>Get all movies with a profit of at least 50 crores</p>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM movie
WHERE (collection_in_cr - budget_in_cr) >= 50;`}
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
          </tbody>
        </table>
      </section>

      <section>
        <h2>Using Expressions in UPDATE Clause</h2>
        <p>Scale down ratings from 10 to 5 in movie table</p>
        <CodeBlock
          language="sql"
          code={`UPDATE movie
SET rating = rating / 2;`}
        />
      </section>

      <section>
        <h2>Using Expressions in HAVING Clause</h2>
        <p>Get all genres with average profit &ge; 100 crores (corrected)</p>
        <CodeBlock
          language="sql"
          code={`SELECT genre
FROM movie
GROUP BY genre
HAVING AVG(collection_in_cr - budget_in_cr) >= 100;`}
        />

        <h3>Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>genre</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Action</td>
            </tr>
            <tr>
              <td>Animation</td>
            </tr>
            <tr>
              <td>Mystery</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>
        <ul>
          <li>Get the profit of every movie with rating greater than 8.0</li>
          <li>
            Get all movies with profit ≥ 30 crores and genres in "Action",
            "Animation", "Drama"
          </li>
          <li>Scale up the ratings from 5 to 100 in the movie table</li>
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

export default SQL_Expression_CS;
