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
          We can write expressions in various SQL clauses. Expressions can
          comprise of various data types like integers, floats, strings,
          datetime, etc.
        </p>
        <p>Let’s learn more about expressions using the following database.</p>
      </section>

      <section>
        <h2>Database</h2>
        <p>The IMDb stores various movies, actors and cast information.</p>
      </section>

      <section>
        <h2>Arithmetic Operators in SQL</h2>
        <p>
          Arithmetic operators can be used in SQL queries to perform arithmetic
          operations on numeric data.
        </p>

        <h3>Addition (+)</h3>
        <p>Adds two numbers together</p>
        <CodeBlock
          language="sql"
          code={`SELECT (budget_in_cr + 10) AS new_budget
FROM movie;`}
        />

        <h3>Subtraction (-)</h3>
        <p>Subtracts one number from another</p>
        <CodeBlock
          language="sql"
          code={`SELECT (budget_in_cr - 2) AS new_budget
FROM movie;`}
        />

        <h3>Multiplication (*)</h3>
        <p>Multiplies two numbers</p>
        <CodeBlock
          language="sql"
          code={`SELECT (budget_in_cr * 100) AS budget_as_lakhs
FROM movie;`}
        />

        <h3>Division (/)</h3>
        <p>Divides one number by another</p>
        <CodeBlock
          language="sql"
          code={`SELECT (collection_in_cr / budget_in_cr) AS collection_rate
FROM movie;`}
        />

        <h3>Modulo (%)</h3>
        <p>Returns the remainder of a division</p>
        <CodeBlock
          language="sql"
          code={`SELECT age % 2 AS age_reminder_for_2
FROM actor;`}
        />
      </section>

      <section>
        <h2>Using Expressions in SELECT Clause</h2>
        <p>
          Get profits of all movies. Consider profit as the difference between
          collection and budget.
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT id, name, (collection_in_cr - budget_in_cr) AS profit
FROM movie;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            We use the <code>||</code> operator to concatenate strings in
            sqlite3.
          </p>
        </div>

        <CodeBlock
          language="sql"
          code={`SELECT name || " - " || genre AS movie_genre
FROM movie;`}
        />
      </section>

      <section>
        <h2>Using Expressions in WHERE Clause</h2>
        <p>Get all the movies with a profit of at least 50 crores.</p>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM movie
WHERE (collection_in_cr - budget_in_cr) >= 50;`}
        />
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
          code={`SELECT genre
FROM movie
GROUP BY genre
HAVING AVG(collection_in_cr - budget_in_cr) >= 100;`}
        />
      </section>

      <section>
        <h2>Try it Yourself!</h2>
        <ul>
          <li>Get the profit of every movie with rating greater than 8.0.</li>
          <li>
            Get all the movies having a profit of at least 30 crores, and belong
            to "Action", "Animation" or "Drama" genres.
          </li>
          <li>Scale up the ratings from 5 to 100 in the movie table.</li>
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
