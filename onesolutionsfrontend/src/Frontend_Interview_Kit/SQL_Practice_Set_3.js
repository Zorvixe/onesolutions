
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CodeBlock } from "../CodeOutputBlocks";

const SQL_Practice_Set_3 = ({
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
      <h2>SQL Practice Set - 3</h2>
      <h2>Practice the popular interview questions in SQL using ZorMock.</h2>

    <section>
    <h3>1. What is the purpose of Data Definition operations in a DBMS?</h3>
    <p>Data Definition operations in a DBMS define the structure of the database and its objects. This includes creating tables, specifying attributes and data types, setting up table relationships, and defining constraints. These operations establish the foundation of the database and determine how data is organized and stored.</p>
    <h3>2. What are Data Manipulation operations in DBMS?</h3>
    <p>Data Manipulation operations in a DBMS involve manipulating the data stored in the database. These operations include retrieving data using <code>SELECT</code> statements, inserting new data using <code>INSERT</code> statements, updating existing data using <code>UPDATE</code> statements, and deleting data using <code>DELETE</code> statements. Data Manipulation operations allow users to interact with the database and modify its contents.</p>
    <h3>3. What is the purpose of Data Control operations in a DBMS?</h3>
    <p><code>Data Control</code> operations in a DBMS ensure data integrity, security, and access control. They define user permissions and roles, set up constraints and validations to maintain data integrity, implement data encryption for protection, and manage backups and recovery processes. These operations maintain the security and reliability of the database.</p>
    <h3>4. What are Data Querying and Reporting operations in DBMS?</h3>
    <p>Data Querying and Reporting operations in a DBMS involve retrieving specific information and generating reports. SQL is used to perform tasks like filtering, sorting, joining, and aggregating data. These operations help extract insights from the database and present data in an organized format for analysis and decision-making.</p>
    <h3>5. What is a database?</h3>
    <p>A database is a <code>structured collection</code> of data stored in a computer system. It allows efficient storage, retrieval, and management of large amounts of information.</p>
    <h3>6. What are the features of a database related to data organization and integrity?</h3>
    <ul>
    <li><p><b>Data Organization:</b> Databases organize data into tables, rows, and columns, providing a structured format for storing and managing information efficiently.</p>
    </li>
    <li><p><b>Data Integrity:</b> Databases maintain data accuracy and consistency using constraints such as primary keys, unique keys, and foreign keys. These help prevent duplicate or invalid data and maintain proper relationships between tables.</p>
    </li>
    </ul>
    <h3>7. What are the features of a database related to data security and querying?</h3>
    <ul><li>
    <p><b>Database Security:</b> Databases provide security mechanisms to protect data from unauthorized access and ensure privacy. These include user authentication, access control, encryption, and auditing features to safeguard sensitive information.</p>
    </li>
    <li><p><b>Data Querying:</b> Databases support query languages such as SQL to retrieve, manipulate, and analyze data. Querying allows operations like filtering, sorting, joining, and aggregating data to extract meaningful information from the database.</p>
    </li>
    </ul>
    <h3>8. What are the features of a database related to transactions, scalability, and data recovery?</h3>
     <ul><li>
        <p><b>Transactions:</b> Databases support transactions that group multiple operations into a single unit. This ensures data consistency by applying all changes successfully or rolling back if any operation fails.</p>
      </li>
      <li>
        <p><b>Scalability:</b> Databases can handle large volumes of data efficiently. They optimize storage, indexing, and query processing to support growing data and increasing user demands.</p>
      </li>
      <li>
        <p><b>Data Recovery:</b> Databases provide backup and recovery mechanisms to restore data in case of system failures, crashes, or accidental data loss.</p>
      </li>
    </ul>
    <h3>9. What is a non-relational database?</h3>
    <p>A <code>non-relational database</code>, or <code>NoSQL</code>, provides a flexible and scalable way to store data without fixed tables. It supports various data models like key-value, document, columnar, and graph databases. Non-relational databases handle unstructured data, scale horizontally, and offer high availability and performance. Popular examples include MongoDB, Cassandra, Redis, and Couchbase.</p>
    <h3>10. What are the advantages of using DBMS?</h3>
    <ul>
      <li>
        <p><b>Security:</b> A DBMS stores and maintains data securely by providing controlled access and protection against unauthorized usage.</p>
      </li>
      <li>
        <p><b>Ease of Use:</b> It offers simple methods to create, update, and manage data efficiently as it is generated.</p>
      </li>
      <li>
        <p><b>Durability and Availability:</b> Data remains durable and can be accessed by multiple users or clients whenever required.</p>
      </li>
      <li>
        <p><b>Performance:</b> A DBMS enables quick data retrieval and efficient access for applications and stakeholders.</p>
      </li>
    </ul>
    <h3>11. Define SQL Injection and explain the methods to prevent it?</h3>

    <p>
    <code>SQL Injection</code> is a security vulnerability in which attackers insert or manipulate malicious SQL code through user input fields. This can lead to unauthorized data access, data loss, or changes in the database.
    </p>

    <ul>
      <li>
        <p><b>Use Prepared Statements / Parameterized Queries:</b> These separate SQL logic from user input, preventing attackers from injecting harmful SQL code.</p>
      </li>
      <li>
        <p><b>Validate User Input:</b> Always check and restrict input based on expected formats, length, or data type.</p>
      </li>
      <li>
        <p><b>Manage User Privileges:</b> Provide only necessary database permissions to users to minimize potential damage.</p>
      </li>
      <li>
        <p><b>Avoid Direct Query Concatenation:</b> Do not directly combine user input with SQL queries. Instead, sanitize or escape special characters and use secure database APIs.</p>
      </li>
    </ul>
    <h3>12. What are aggregations in SQL?</h3>
    <p><code>Aggregations</code> in SQL are functions that perform calculations on a set of values and return a single result. Common aggregations include:<br/></p>
    <ul>
      <li>SUM (calculates the sum of values)</li>
      <li>COUNT (counts the number of rows)</li>
      <li>AVG (calculates the average of values)</li>
      <li>AVG (calculates the average of values)</li>
      <li>MIN (finds the minimum value)</li>
      <li>MAX (finds the maximum value)</li>
      </ul>.<p> Aggregations are often used with the <code>GROUP BY</code> clause to perform calculations on grouped data.</p>
    <h3>13. What is the use of the ORDER BY clause in SQL?</h3>
    <p>The <code>ORDER BY</code> clause in SQL is used to sort the result set of a query. It specifies the columns by which the data should be sorted, such as <code>ascending (ASC)</code> or <code>descending (DESC)</code> order. The query returns the rows in the specified order based on the values in the specified column(s).<br/> <b>For example: </b>, "ORDER BY column_name ASC" would sort the data in ascending order based on the values in the specified column.</p>
    <h3>14. What is the use of the GROUP BY clause in SQL?</h3>
    <p>The <code>GROUP BY</code> clause in SQL is used to group rows based on a specified column. It allows aggregation functions like <code>SUM</code>, <code>COUNT</code>, <code>AVG</code>, etc., to be applied to each group. The result is a summary of data where rows with the same values in the specified column are combined into groups, and calculations are performed on each group rather than individual rows.</p>
    <h3>15. What are constraints in SQL?</h3>
    <p><code>Constraints</code> in SQL are rules applied to table columns to ensure accurate and reliable data storage. They limit the type of data allowed, maintain data integrity, and establish table relationships.</p>
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

export default SQL_Practice_Set_3
