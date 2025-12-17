import React, { useState } from "react";

const MileStone_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>SQL Milestone</h1>

      {/* ================= CLAUSES ================= */}
      <section>
        <h2>Clauses</h2>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Clauses</th>
              <th>How to Use It</th>
              <th>Functionality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CREATE TABLE</td>
              <td>CREATE TABLE table_name ...</td>
              <td>Creates a new table</td>
            </tr>
            <tr>
              <td>INSERT</td>
              <td>INSERT INTO table_name ...</td>
              <td>Used to insert new data in the table</td>
            </tr>
            <tr>
              <td>SELECT</td>
              <td>SELECT col1, col2 ...</td>
              <td>Retrieves the selected columns</td>
            </tr>
            <tr>
              <td>SELECT</td>
              <td>SELECT * FROM ...</td>
              <td>Retrieves all the columns from a table</td>
            </tr>
            <tr>
              <td>FROM</td>
              <td>FROM table_name</td>
              <td>
                FROM clause specifies the table(s) in which the required data
                columns are located
              </td>
            </tr>
            <tr>
              <td>WHERE</td>
              <td>WHERE col &gt; 5</td>
              <td>
                Retrieves only specific rows based on the given conditions
              </td>
            </tr>
            <tr>
              <td>UPDATE, SET</td>
              <td>UPDATE table_name SET column1 = value1;</td>
              <td>
                Updates the value of a column of all the rows (or only specific
                rows using WHERE clause)
              </td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>DELETE FROM table_name</td>
              <td>Deletes all the rows from the table</td>
            </tr>
            <tr>
              <td>DROP</td>
              <td>DROP TABLE table_name</td>
              <td>Deletes the table from the database</td>
            </tr>
            <tr>
              <td>ALTER</td>
              <td>ALTER TABLE table_name ...</td>
              <td>Used to add, delete or modify columns in a table</td>
            </tr>
            <tr>
              <td>ORDER BY</td>
              <td>ORDER BY col1 ASC/DESC</td>
              <td>
                Sorts the table based on the column(s) in ascending or
                descending order
              </td>
            </tr>
            <tr>
              <td>DISTINCT</td>
              <td>SELECT DISTINCT col, ...</td>
              <td>Gets the unique values of given column(s)</td>
            </tr>
            <tr>
              <td>LIMIT</td>
              <td>LIMIT 10</td>
              <td>
                Limits the number of rows in the output to the mentioned number
              </td>
            </tr>
            <tr>
              <td>OFFSET</td>
              <td>OFFSET 5</td>
              <td>
                Specifies the position (from nth row) from where the results are
                retrieved
              </td>
            </tr>
            <tr>
              <td>GROUP BY</td>
              <td>GROUP BY col ...</td>
              <td>
                Groups the rows that have same values in the given columns
              </td>
            </tr>
            <tr>
              <td>HAVING</td>
              <td>HAVING col &gt; 20</td>
              <td>Filters the resultant rows after applying GROUP BY</td>
            </tr>
            <tr>
              <td>CASE</td>
              <td>CASE WHEN condition1 THEN value1 WHEN ... ELSE ... END</td>
              <td>
                Returns a corresponding value when the first condition is met
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ================= OPERATORS ================= */}
      <section>
        <h2>Operators</h2>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Operators</th>
              <th>How to Use It</th>
              <th>Functionality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt;&gt;</td>
              <td>WHERE col &lt;&gt; 5</td>
              <td>Filters rows where the column value is not equal to 5</td>
            </tr>
            <tr>
              <td>LIKE</td>
              <td>WHERE col LIKE '%Apple%'</td>
              <td>Retrieves rows where the column contains the given text</td>
            </tr>
            <tr>
              <td>AND</td>
              <td>WHERE col1 &gt; 5 AND col2 &lt; 3</td>
              <td>Retrieves rows that satisfy all the given conditions</td>
            </tr>
            <tr>
              <td>OR</td>
              <td>WHERE col1 &gt; 5 OR col2 &lt; 3</td>
              <td>Retrieves rows that satisfy at least one condition</td>
            </tr>
            <tr>
              <td>NOT</td>
              <td>WHERE NOT col = 'apple'</td>
              <td>Retrieves rows if the condition is NOT TRUE</td>
            </tr>
            <tr>
              <td>IN</td>
              <td>WHERE col IN ('Apple', 'Microsoft')</td>
              <td>
                Retrieves rows if the column value is present in given values
              </td>
            </tr>
            <tr>
              <td>BETWEEN</td>
              <td>WHERE col BETWEEN 3 AND 5</td>
              <td>Retrieves rows between (and including) given values</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ================= FUNCTIONS ================= */}
      <section>
        <h2>Functions</h2>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Functions</th>
              <th>How to Use It</th>
              <th>Functionality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>COUNT()</td>
              <td>SELECT COUNT(col) ...</td>
              <td>Counts the number of values in the column</td>
            </tr>
            <tr>
              <td>SUM()</td>
              <td>SELECT SUM(col) ...</td>
              <td>Adds all the values of given column</td>
            </tr>
            <tr>
              <td>MIN()</td>
              <td>SELECT MIN(col) ...</td>
              <td>Gets the minimum value of given column</td>
            </tr>
            <tr>
              <td>MAX()</td>
              <td>SELECT MAX(col) ...</td>
              <td>Gets the maximum value of given column</td>
            </tr>
            <tr>
              <td>AVG()</td>
              <td>SELECT AVG(col) ...</td>
              <td>Gets the average of the values present in the column</td>
            </tr>
            <tr>
              <td>strftime()</td>
              <td>strftime("%Y", col)</td>
              <td>Extracts year from the column value as string</td>
            </tr>
            <tr>
              <td>CAST()</td>
              <td>CAST(col AS datatype)</td>
              <td>Converts the value to the given datatype</td>
            </tr>
            <tr>
              <td>FLOOR()</td>
              <td>FLOOR(col)</td>
              <td>Rounds a number to the nearest integer below its value</td>
            </tr>
            <tr>
              <td>CEIL()</td>
              <td>CEIL(col)</td>
              <td>Rounds a number to the nearest integer above its value</td>
            </tr>
            <tr>
              <td>ROUND()</td>
              <td>ROUND(col)</td>
              <td>Rounds a number to specified decimal places</td>
            </tr>
            <tr>
              <td>UPPER()</td>
              <td>UPPER(col)</td>
              <td>Converts a string to upper case</td>
            </tr>
            <tr>
              <td>LOWER()</td>
              <td>LOWER(col)</td>
              <td>Converts a string to lower case</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ================= CONTINUE ================= */}
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

export default MileStone_CS;
