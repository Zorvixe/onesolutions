
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const SQL_Practice_Set_2 = ({
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
      <h2>SQL Practice Set - 2</h2>
      <h2>Practice the popular interview questions in SQL using ZorMock.</h2>

    <section>
    <h3>1. Define Second Normal Form (2NF) in database normalization?</h3>
    <p>Second Normal Form (2NF) is a database normalization technique that ensures the removal of partial dependencies in a relation. It requires the data to meet the criteria of being in First Normal Form (1NF) and further mandates that non-key attributes are functionally dependent on the entire primary key.</p>
    <h3>2. Define Third Normal Form (3NF) in database normalization?</h3>
    <p>The Third Normal Form (3NF) in database normalization extends 2NF and states that a table must meet 2NF requirements, and there should be no transitive dependencies. This means that non-key attributes should not depend on other non-key attributes.</p>
    <h3>3. What is the difference between a primary key and a foreign key in SQL?</h3>
    <p>A primary key uniquely identifies each row in a table, while a foreign key establishes relationships between tables by referencing the primary key of another table. Primary keys ensure uniqueness, while foreign keys maintain referential integrity in SQL databases.</p>
    <h3>4. What is the difference between DBMS and RDBMS ?</h3>
    <p>The main difference between <code>DBMS</code> and <code>RDBMS</code> is in the way they store and manage data.
      </p>
      <ul>
      <li><b>DBMS (Database Management System):</b> It stores data in files or simple structures without strict relationships between the data. It mainly focuses on storing and retrieving data.
      </li>
      <li><b>RDBMS (Relational Database Management System):</b> It stores data in the form of tables (rows and columns). It supports relationships between tables using keys and constraints, which helps in maintaining data accuracy and integrity.
      </li></ul>
      <h3>5. What are the differences between the WHERE and HAVING clauses?</h3>
      <p>Both <code>WHERE</code> and <code>HAVING</code> clauses are used to filter data in SQL queries, but they are applied at different stages.
      </p>
      <p><b>WHERE clause:</b> It is used to filter rows before grouping or aggregation. It works on individual row values.
      </p>
      <p><b>HAVING clause:</b> It is used to filter grouped data after aggregation functions like <code>COUNT</code>, <code>SUM</code>, or <code>AVG</code> are applied. It works on aggregated values.
      </p>
      <h3>6. What is the difference between DROP, DELETE, and TRUNCATE statements in SQL?</h3>
      <p>These SQL statements are used to remove data or database objects, but they work in different ways.</p>
     <ul><li>
     <p><b>DROP:</b> It is used to permanently remove an entire database object such as a table or database. Once dropped, both structure and data are completely deleted.</p>
      </li>
      <li>
        <p><b>DELETE:</b> It is used to remove specific rows from a table. You can use conditions with the <code>WHERE</code> clause to delete selected records.</p>
      </li>
      <li>
        <p><b>TRUNCATE:</b> It is used to remove all rows from a table at once. It clears the table data but keeps the table structure for future use.</p>
      </li>
    </ul>
    <h3> 7. Explain the concept of normalization in databases.</h3>
    <p>Normalization is the process of organizing and structuring a database to eliminate redundancy and improve data integrity. It involves breaking down a large table into smaller, more manageable tables and defining relationships between them. Normalization follows a set of rules, called normal forms, to ensure data is stored efficiently and without data anomalies. This helps in reducing data duplication, improving data consistency, and enhancing database performance.</p>
    <h3>8. What is the purpose of a VIEW in SQL?</h3>
    <p>A view can simply be considered as a name to a SQL Query. A <code>"VIEW"</code> in SQL is a virtual table that is derived from the result of a previous SQL query. The purpose of a view is to provide a simplified and customized representation of the data stored in one or more tables.</p>
    <h3>9. What are functions in SQL?</h3>
    <p>In SQL, functions are predefined operations that perform specific tasks on the data in a database. They can take input parameters, perform calculations, manipulate strings or dates, aggregate data, and return a result. Functions increase the capabilities of SQL by providing reusable and efficient operations for data manipulation and analysis.</p>
    <h3>10. How can we use functions in SQL?</h3>
    <p>Functions in SQL, either built-in or user-defined, perform specific tasks during data retrieval, manipulation, or transformation. They're used within SQL statements, including <code>SELECT</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, and JOIN clauses, making queries more modular, efficient, and expressive.</p>
    <h3>11. What is the purpose of the ORDER BY command in SQL?</h3>
    <p>In SQL, the <code>ORDER BY</code> command is used to sort the results of a query based on one or more columns. This can be in ascending (ASC) or descending (DESC) order. It's usually used with the <code>SELECT</code> statement.</p>
    <h3>12. What is the purpose of the HAVING command in SQL?</h3>
    <p>The <code>HAVING</code> command in SQL is used to filter the result set of a query based on conditions applied to aggregated data. It is similar to the <code>WHERE</code> clause but operates on the grouped data generated by the <code>GROUP BY</code> clause. The <code>HAVING</code> command allows you to specify conditions that involve aggregate functions like <code>SUM</code>, <code>COUNT</code>, <code>AVG</code>, etc.</p>
    <h3>13. What is the purpose of the GROUP BY command in SQL?</h3>
    <p>The <code>GROUP BY</code> command in SQL is used to group rows from a table based on one or more columns. It is commonly used with aggregate functions to perform calculations on groups of data. The <code>GROUP BY</code> clause divides the result set into groups based on the specified columns, and the aggregate functions are applied to each group separately.</p>
    <h3>14. What are the operations performed in DBMS?</h3>
    <p>In a Database Management System (DBMS), you can perform different operations to manage and manipulate data. These operations, commonly known as CRUD operations:<br/> </p>
    <ul>
      <li>1. Create</li>
      <li>2. Retrieve</li>
      <li>3. Update</li>
      <li>4. Delete</li>
      </ul>
    <h3>15. What is a foreign key?</h3>
    <p>A foreign key is a column in a database table that creates a link to the primary key column of another table. This linkage helps maintain data consistency and supports relationships between tables in a relational database.</p>
    <h3>16. How many types of clauses do we have in SQL?</h3>
    <p>SQL provides multiple clauses for managing and querying relational databases. These include <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code>, <code>JOIN</code>, <code>LIMIT</code>, <code>DISTINCT</code>, among others.</p>
    <h3>17. What types of files are stored in DBMS and RDBMS?</h3>
    <p>In a <code>DBMS</code> and <code>RDBMS</code>, various types of files are stored, including data files, index files, and log files. Data files hold the actual data records, index files help optimize data retrieval, and log files record transactions and ensure data consistency.</p>
    <h3>18. What is the difference between DDL and DML?</h3>
    <p>DDL and DML are categories of SQL commands used for different purposes in a database.</p>
     <ul>
      <li>
        <p><b>DDL (Data Definition Language):</b> It is used to manage the structure of the database. Commands like <code>CREATE</code>, <code>ALTER</code>, and <code>DROP</code> are used to create, modify, or delete database objects such as tables.</p>
      </li>
      <li>
        <p><b>DML (Data Manipulation Language):</b> It is used to manage the data stored in the database. Commands like <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> are used to add, modify, or remove records from tables.</p>
      </li>
    </ul>
    <h3>19. How can you alter or stop a trigger?</h3>
    <p>To modify an existing trigger, you must drop the existing trigger using the <code>"DROP TRIGGER"</code> command and then recreate it with the desired modifications. SQLite does not support the <code>"ALTER TRIGGER"</code></p>
    <p></p>
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

export default SQL_Practice_Set_2
