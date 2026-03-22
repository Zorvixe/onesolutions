
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
      <h2>SQL Practice Set - 1</h2>
      <h2>Practice the popular interview questions in SQL using ZorMock.</h2>

    <section>
    <h3>1. Define joins and list the types of joins?</h3>
    <p>Joins are operations in databases that combine data from multiple tables based on related columns.<br/> The types of joins include: <br/>
     <ul>
  <li>Inner join</li>
  <li>Natural join</li>
  <li>Left join</li>
  <li>Right join</li>
  <li>Full join</li>
  <li>Cross join</li>
  <li>Self join</li>
</ul></p>
    <h3>2. Explain about LEFT JOIN and RIGHT JOIN?</h3>
    <ul>
    <li><b>LEFT JOIN : </b> is used to combine all the rows from the left table with the matching rows from the right table. If there is no match, NULL values are assigned to the right half of the rows in the temporary table.</li>
     <li><b>RIGHT JOIN :</b> is used to combine all the rows from the right table with the matching rows from the left table. If there is no match, NULL values are assigned to the left half of the rows in the temporary table.</li>
     </ul>
     <h3>3. Explain about INNER JOIN and FULL JOIN?</h3>
     <ul>
      <li><b>INNER JOIN: </b> is the most common type of join that is used to return only the rows that have matching values in both tables. </li>
      <li>  <b>FULL JOIN: </b> is the most common type of join that is used to return only the rows that have matching values in both tables. A full join is used to combine all rows from both the right and left tables. It includes matching rows from both tables and if there is no match, NULL values are assigned to the non-matching columns from either table.</li>
     </ul>
     <h3>4. What is CROSS JOIN?</h3>
     <p><b>CROSS JOIN or CARTESIAN JOIN : </b> combines every row from the first table with every row from the second table, resulting in a Cartesian product.</p>
    <h3>5. What is SELF JOIN?</h3>
    <p><b>SELF JOIN : </b> is when a table is joined with itself, it combines the records of a table with itself. It's like looking at the same table from two different angles. It helps us compare or analyze data within the table itself.</p>
    <h3>6. How to get the names from database?</h3>
    <p>To get the names from a database, you can utilize SQL queries. Assuming there is a table named 'users' with a column named 'name', you can execute the following SQL query to obtain all the names from the database:
      <CodeBlock
      language="sql"
      code={`SELECT name FROM users;`}
       />
      </p>
      <h3>7. What are triggers in SQL?</h3>
      <p><code>Triggers</code> in SQL are special database objects that are automatically executed in response to specific events, such as data modifications (inserts, updates, deletes). They allow you to define custom actions to be performed, such as updating related tables or enforcing data integrity constraints.</p>
      <h3>8. Explain the types of triggers in SQL</h3>

      <p><b>DML Triggers:</b> These triggers are executed in response to Data Manipulation Language (DML) statements such as INSERT, UPDATE, or DELETE. They are used to enforce data integrity, perform auditing, or automate data-related actions.</p>

      <p><b>DDL Triggers:</b> These triggers are executed in response to Data Definition Language (DDL) statements such as CREATE, ALTER, or DROP. They are used to track schema changes, enforce security policies, or perform specific actions when database objects are modified.</p>
      <h3>9. What is Index in SQL?</h3>
      <p>In databases, we maintain indexes to speed up the search for data in a table. It improves the performance of queries. It works like an index in a book, allowing for faster data retrieval.</p>
      <h3>10. Explain the different types of indexes in SQL</h3>
      <p>The types of indexes in SQL include clustered indexes, which determine the physical order of data in a table, and non-clustered indexes, which create a separate structure to improve search performance.</p>
      <h3>11. How do you retrieve data from database?</h3>
      <p>To retrieve data from a database, you can use the SQL SELECT clause. 
        <br/>Syntax:
        <CodeBlock
  language="sql"
  code={`SELECT column1, column2, column3 FROM table_name;`}
/>
        </p>
      <h3>12. What is SQL?</h3>
      <p>SQL stands for <code>Structured Query Language</code> and is used to perform various operations on Relational DBMS. These operations includes creating tables, querying data, inserting, updating, and deleting records.SQL stands for Structured Query Language and is used to perform various operations on Relational DBMS. These operations includes creating tables, querying data, inserting, updating, and deleting records.</p>
      <h3>13. What will be the result when a join operation is performed on two tables?</h3>
      <p>When you perform a join operation on two tables, the result is a new table that combines rows from both tables based on a specified condition. This resulting table includes columns from both tables and only includes rows that satisfy the join condition.<br/> <b>For example</b>, let's take <code>"TableA"</code> and <code>"TableB"</code> as the two tables. If you perform a join using a common column like <code>"id"</code>, the output will contain rows where the <code>"id"</code> values match in both tables.</p>
      <h3>14. What are the different normal forms in database normalization?</h3>

<p>
Database normalization has different normal forms to organize data efficiently in a database. The commonly known normal forms are:
</p>

<ul>
  <li>1NF (First Normal Form)</li>
  <li>2NF (Second Normal Form)</li>
  <li>3NF (Third Normal Form)</li>
  <li>BCNF (Boyce-Codd Normal Form)</li>
</ul>

<p>
Each normal form has specific rules to reduce data redundancy and maintain data integrity in the database.
</p>
   <h3>15. Define First Normal Form (1NF) in database normalization?</h3>
   <p><code>First Normal Form (1NF)</code> in database normalization requires that a table has a primary key and that each column contains only atomic values (indivisible and non-repeating). It eliminates repeating groups by ensuring that each attribute holds a single value, promoting data integrity and enabling efficient querying.</p>
   <h3>16. What is a stored procedure in SQL?</h3>
   <p>A stored procedure in SQL is essentially a set of SQL commands that are saved as single logic and reused. It is defined using the <code>"CREATE PROCEDURE"</code> statement, it groups a series of SQL commands as a single logic, After creation, this procedure can be called using the <code>`EXECUTE`</code> or <code>`CALL`</code> command.</p>
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
