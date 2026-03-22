
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const SQL_Practice_Set_1 = ({
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
      <h2>SQL Practice Set - 4</h2>
      <h2>Practice the popular interview questions in Python using ZorMock.</h2>

    <section>
    <h3>1. What are the various types of constraints used in SQL?</h3>
    <p>SQL constraints are rules applied to table columns to ensure data accuracy and integrity.</p>
     <ul>
      <li>
        <p><b>PRIMARY KEY:</b> Uniquely identifies each record in a table.</p>
      </li>
      <li>
        <p><b>FOREIGN KEY:</b> Establishes a relationship between two tables and maintains referential integrity.</p>
      </li>
      <li>
        <p><b>UNIQUE:</b> Ensures that all values in a column are different.</p>
      </li>
      <li>
        <p><b>CHECK:</b> Specifies a condition that must be satisfied before inserting or updating data.</p>
      </li>
      <li>
        <p><b>NOT NULL:</b> Prevents a column from having NULL values.</p>
      </li>
      <li>
        <p><b>DEFAULT:</b> Assigns a default value to a column if no value is provided.</p>
      </li>
    </ul>

    <p>These constraints can be applied at both column level and table level.</p>
        <h3>2. What are keys in SQL?</h3>
        <p>Keys in SQL are used to uniquely identify rows in a table, establish relationships between tables, and ensure data integrity. There are different types of keys in SQL: <code>Primary Key</code>, <code>Foreign Key</code>, <code>unique Key</code> etc. Keys play a crucial role in ensuring the uniqueness of rows in a table and establishing relationships between tables while preserving data integrity.</p>
        <h3>3. Define Primary Key, Foreign Key, and Unique Key</h3>
         <ul>
          <li>
            <p><b>Primary Key:</b> A primary key is a column or a set of columns that uniquely identifies each row in a table. A table can have only one primary key, and its values must be unique and cannot be NULL.</p>
          </li>
          <li>
            <p><b>Foreign Key:</b> A foreign key is a column or a set of columns that refers to the primary key of another table. It is used to create a relationship between tables and maintain referential integrity.</p>
          </li>
          <li>
            <p><b>Unique Key:</b> A unique key is a column or set of columns that ensures all values are unique in a table. A table can have multiple unique keys, and unlike a primary key, it can allow NULL values.</p>
          </li>
        </ul>
        <h3>4. What is store procedure?</h3>
        <p>A stored procedure is like a named code block in a database that can be used over and over. It's handy for doing complex tasks, working with data, and giving back results. Stored procedures make code reusable, help databases run faster, and make things more secure.</p>
        <h3>5. Explain the difference between SQL and NoSQL databases</h3>
        <ul>
        <li>
          <p><b>SQL Databases:</b> These databases store data in structured tables with predefined schemas. They support relationships between tables and use joins to combine data from multiple tables.</p>
        </li>

        <li>
          <p><b>NoSQL Databases:</b> These databases store data in flexible formats such as key-value pairs, documents, graphs, or wide-column stores. They focus on faster data retrieval and scalability without requiring a fixed schema.</p>
        </li>
      </ul>
      <h3>6. What is the MOD function in SQL?</h3>
      <p>In SQL, the MOD function (short for modulo) calculates the remainder when one number is divided by another. It returns the remainder value. Example: SELECT MOD(17, 5); The query above returns the remainder 2 when 17 is divided by 5.</p>
      <h3>7. How to use wildcards?</h3>
      <p>Wildcards are used in SQL with the <code>LIKE</code> operator to search for specific patterns in strings. The two common wildcards are <code>'%'</code> and <code>'_'</code>. The <code>'%'</code> wildcard represents any sequence of characters, while the <code>'_'</code> wildcard represents a single character.
        <br/> <b>For example: </b>to find all names starting with 'A', you can use:<br/> </p>
        <CodeBlock
  language="sql"
  code={`SELECT * FROM table_name WHERE name LIKE 'A%';`}
/>     
       <h3>8. How to design database schema and implement in PostgreSQL?</h3>

<p>
To design and implement a database schema in PostgreSQL, follow these steps:
</p>

<ul>
  <li>
    <p><b>Identify Entities and Relationships:</b> Determine the main objects (entities) in the system and how they are related to each other.</p>
  </li>
  <li>
    <p><b>Create Tables:</b> Use the <b>CREATE TABLE</b> statement to create tables for each entity.</p>
  </li>
  <li>
    <p><b>Define Columns and Data Types:</b> Specify appropriate data types for each column based on the data to be stored.</p>
  </li>
  <li>
    <p><b>Set Primary Keys:</b> Assign primary keys to uniquely identify each record in a table.</p>
  </li>
  <li>
    <p><b>Establish Relationships:</b> Use foreign keys to create relationships between related tables.</p>
  </li>
  <li>
    <p><b>Insert Data:</b> Use the <code>INSERT INTO</code> statement to add records into the tables.</p>
  </li>
</ul>
        <h3>9. What are the types of commands in SQL?</h3>
        <p>SQL commands are categorized into DDL for managing database structures with commands such as <code>CREATE</code>, <code>DROP</code> and <code>ALTER</code>, DML for handling database data with commands such as <code>INSERT</code>, <code>DELETE</code> and <code>UPDATE</code>, DQL for retrieving data from database using <code>SELECT</code>, DCL for controlling access to data in database with commands like <code>GRANT</code> and <code>REVOKE</code>, and <code>TCL</code> for overseeing transactions with commands such as <code>COMMIT</code> and <code>ROLLBACK</code>.</p>
        <h3>10. What is the difference between COMMIT and ROLLBACK?</h3>
           <p>Both commands help maintain data integrity by either confirming or cancelling transaction changes.</p>
            <ul>
            <li>
              <p><b>COMMIT:</b> The COMMIT command is used to permanently save all changes made during a transaction. Once committed, the changes become visible to other users and cannot be undone.</p>
            </li>
            <li><p><b>ROLLBACK:</b> The ROLLBACK command is used to undo all changes made during a transaction. It restores the database to its previous state before the transaction was executed.</p>
            </li>
          </ul>
          <h3>11. Where do we use clauses such as WHERE and HAVING?</h3>
            <p>In simple terms, <code>WHERE</code> works at the row level, while <code>HAVING</code> works at the group level.</p>
            <ul>
            <li>
              <p><b>WHERE clause:</b> It is used to filter individual rows based on column values before grouping or aggregation is performed in a SQL query.</p>
            </li>

            <li>
              <p><b>HAVING clause:</b> It is used to filter grouped or aggregated data after the <code>GROUP BY</code> clause is applied.</p>
            </li>
          </ul>

          <h3>12. List five commands used in DML</h3>
         <ul>
            <li><p><b>INSERT:</b> Used to add new records into a table.</p></li>
            <li><p><b>UPDATE:</b> Used to modify existing records in a table.</p></li>
            <li><p><b>DELETE:</b> Used to remove records from a table.</p></li>
            <li><p><b>MERGE:</b> Used to insert or update records based on a condition.</p></li>
            <li><p><b>CALL:</b> Used to execute stored procedures or subprograms.</p></li>
          </ul>
          <h3>13. What is the difference between the left operand and the right operand?</h3>
          <p>In SQL, the <code>"left operand"</code> is the initial value in an operation, situated to the left of the operator. <br/> <code>"right operand"</code> is the comparative value, located to the right of the operator.</p>
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

export default SQL_Practice_Set_1
