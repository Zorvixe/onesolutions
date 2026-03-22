// /project/workspace/onesolutionsfrontend/src/SQL_Database/Introdutionto_SQL/Update_Rows_CS.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { CodeBlock, OutputBlock } from "../../CodeOutputBlocks";

const Update_Rows_CS = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if subtopic is already completed
  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("✅ Cheat sheet marked as completed");
      } else {
        console.error(
          "❌ Failed to mark cheat sheet complete:",
          result.message
        );
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark cheat sheet complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="intro-container">
      <h1>Update Rows | Cheat Sheet</h1>

      {/* 1. Database Overview */}
      <section>
        <h2>Database</h2>
        <p>
          The given database consists of tables that store the information of{" "}
          <b>student</b> and <b>player</b>.
        </p>

        <h3>Tables</h3>

        <p>
          <b>student</b> table
        </p>
        <table
         className="custom-table"
        >
          <thead>
            <tr>
              <th>name</th>
              <th>percentage</th>
              <th>scholarship_amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ramesh</td>
              <td>82</td>
              <td>10000</td>
            </tr>
            <tr>
              <td>Mahesh</td>
              <td>85</td>
              <td>11000</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
        <p>
          The <code>student</code> table stores the data of the students,
          including <b>name</b>, <b>percentage</b>, and{" "}
          <b>scholarship_amount</b>.
        </p>

        <p>
          <b>player</b> table
        </p>
        <table
       className="custom-table"
        >
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Suresh</td>
              <td>21</td>
              <td>70</td>
            </tr>
            <tr>
              <td>Venkat</td>
              <td>21</td>
              <td>43</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
        <p>
          The <code>player</code> table stores the data of players, including{" "}
          <b>name</b>, <b>age</b>, and <b>score</b>.
        </p>
      </section>

      {/* 2. Update Rows */}
      <section>
        <h2>Update Rows</h2>
        <p>
          The <code>UPDATE</code> clause is used to update the data of an
          existing table in a database. We can update all rows or only specific
          rows as per the requirement.
        </p>
      </section>

      {/* 3. Update All Rows */}
      <section>
        <h3>Update All Rows</h3>
        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`UPDATE table_name
SET column1 = value1;`}
        />

        <h3>Example</h3>
        <p>
          Update the <code>score</code> of all players to <b>100</b> in the{" "}
          <code>player</code> table.
        </p>

        <CodeBlock
          language="sql"
          code={`UPDATE player
SET score = 100;`}
        />
      </section>

      {/* 4. Update Specific Rows */}
      <section>
        <h3>Update Specific Rows</h3>
        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`UPDATE table_name
SET column1 = value1
WHERE column2 = value2;`}
        />

        <h3>Example</h3>
        <p>
          Update the <b>score</b> of "Ram" to <b>150</b> in the{" "}
          <code>player</code> table.
        </p>

        <CodeBlock
          language="sql"
          code={`UPDATE player
SET score = 150
WHERE name = "Ram";`}
        />
      </section>

      {/* 5. Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>
        <p>
          The database contains a <code>student</code> table that stores the
          information of <b>name</b>, <b>percentage</b>, and{" "}
          <b>scholarship amount</b> of students.
        </p>
        <ul>
          <li>
            Update the <b>scholarship_amount</b> of all students to <b>15000</b>{" "}
            in the <code>student</code> table.
          </li>
          <li>
            Update the <b>scholarship_amount</b> of "Raju" to <b>25000</b> in
            the <code>student</code> table.
          </li>
          <li>
            Check if the values are updated as per your queries in the{" "}
            <code>student</code> table.
          </li>
        </ul>
      </section>

      {/* 6. SQLite Case Insensitive */}
      <section>
        <h2>SQLite is Case Insensitive!</h2>

        <h3>Query 1</h3>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM player;`}
        />

        <h3>Query 2</h3>
        <CodeBlock
          language="sql"
          code={`select *
from player;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <b>Best Practice:</b> Both Query 1 and Query 2 give the same output.
            But, it is recommended to write keywords in uppercase to make the
            query more readable. Prefer Query 1 format over Query 2.
          </p>
        </div>
      </section>

      {/* Continue Button */}
      <div className="view-continue">
        <button
          className={`btn-continue ${isSubtopicCompleted ? "completed" : ""}`}
          onClick={handleContinue}
          disabled={isSubtopicCompleted || isLoading}
        >
          {isLoading
            ? "Marking..."
            : isSubtopicCompleted
            ? "✓ Completed"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Update_Rows_CS;
