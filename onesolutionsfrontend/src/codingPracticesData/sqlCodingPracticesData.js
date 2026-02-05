export const sqlCodingPracticesData = {
  sql: [
    // SQL Practice 1 - Basic SELECT queries
    {
      id: "sql-coding-practice-1",
      title: "SQL Basics: SELECT Queries",
      description: "Practice basic SQL SELECT queries with the employee database",
      questions: [
        {
          id: "sql-query-1",
          title: "Select All Employees",
          description: "Write a SQL query to select all columns from the employees table.",
          difficulty: "Easy",
          score: 50,
          type: "sql",
          defaultCode: {
            sql: `-- Write your SQL query here
      SELECT * FROM employees;`
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Problem Statement</p>
              <p>You are given an employees table with the following structure:</p>
              
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: employees</div>
                <table>
                  <thead>
                    <tr>
                      <th>Column Name</th>
                      <th>Data Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>employee_id</td>
                      <td>INTEGER</td>
                      <td>Primary key, unique identifier</td>
                    </tr>
                    <tr>
                      <td>first_name</td>
                      <td>VARCHAR(50)</td>
                      <td>Employee's first name</td>
                    </tr>
                    <tr>
                      <td>last_name</td>
                      <td>VARCHAR(50)</td>
                      <td>Employee's last name</td>
                    </tr>
                    <tr>
                      <td>department</td>
                      <td>VARCHAR(50)</td>
                      <td>Department name</td>
                    </tr>
                    <tr>
                      <td>salary</td>
                      <td>DECIMAL(10,2)</td>
                      <td>Annual salary</td>
                    </tr>
                    <tr>
                      <td>hire_date</td>
                      <td>DATE</td>
                      <td>Date when employee was hired</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p class="desc-que-blue">Sample Data</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">employees table data</div>
                <table>
                  <thead>
                    <tr>
                      <th>employee_id</th>
                      <th>first_name</th>
                      <th>last_name</th>
                      <th>department</th>
                      <th>salary</th>
                      <th>hire_date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John</td>
                      <td>Doe</td>
                      <td>Engineering</td>
                      <td>75000.00</td>
                      <td>2022-01-15</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jane</td>
                      <td>Smith</td>
                      <td>Marketing</td>
                      <td>65000.00</td>
                      <td>2022-03-20</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Bob</td>
                      <td>Johnson</td>
                      <td>Engineering</td>
                      <td>80000.00</td>
                      <td>2021-11-10</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Alice</td>
                      <td>Williams</td>
                      <td>Sales</td>
                      <td>70000.00</td>
                      <td>2023-02-01</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Charlie</td>
                      <td>Brown</td>
                      <td>Marketing</td>
                      <td>60000.00</td>
                      <td>2023-05-15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query that selects all columns and all rows from the employees table.</p>
              
              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 1.6;">
                    <li>Use proper SQL syntax</li>
                    <li>End your query with a semicolon</li>
                    <li>The query should work for any data in the employees table</li>
                  </ul>
                </p>
              </div>
              
              <p class="desc-que-blue">Expected Output Format</p>
              <p>Your query should return all 5 rows with all 6 columns in the same order as the table structure.</p>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>SELECT statement syntax:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
        SELECT column1, column2, ...
        FROM table_name;</pre>
                      
              <p><strong>Selecting all columns:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
      SELECT * FROM table_name;</pre>
              
              <p>The asterisk (*) is a wildcard that means "all columns".</p>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              forbiddenKeywords: ["insert", "update", "delete", "drop"],
              visible: true
            },
            {
              id: 2,
              description: "Query should use wildcard (*) for all columns",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true
            },
            {
              id: 3,
              description: "Query should specify FROM employees",
              type: "query-validation",
              expectedKeywords: ["from", "employees"],
              visible: true
            },
            {
              id: 4,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              expectedKeywords: [";"],
              visible: true
            }
          ]
        },
        {
          id: "sql-query-2",
          title: "Select Specific Columns",
          description: "Write a SQL query to select only first_name, last_name, and department from employees table.",
          difficulty: "Easy",
          score: 60,
          type: "sql",
          defaultCode: {
            sql: `-- Select only first_name, last_name, and department columns
      SELECT first_name, last_name, department FROM employees;`
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Problem Statement</p>
              <p>Write a SQL query to select only specific columns from the employees table.</p>
              
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: employees</div>
                <table>
                  <thead>
                    <tr>
                      <th>Column Name</th>
                      <th>Data Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>employee_id</td>
                      <td>INTEGER</td>
                    </tr>
                    <tr>
                      <td>first_name</td>
                      <td>VARCHAR(50)</td>
                    </tr>
                    <tr>
                      <td>last_name</td>
                      <td>VARCHAR(50)</td>
                    </tr>
                    <tr>
                      <td>department</td>
                      <td>VARCHAR(50)</td>
                    </tr>
                    <tr>
                      <td>salary</td>
                      <td>DECIMAL(10,2)</td>
                    </tr>
                    <tr>
                      <td>hire_date</td>
                      <td>DATE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query that selects only the following columns:</p>
              <ol style="margin-left: 1.5rem; line-height: 1.6;">
                <li>first_name</li>
                <li>last_name</li>
                <li>department</li>
              </ol>
              
              <p>Do not select any other columns.</p>
              
              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 1.6;">
                    <li>Column names are case-sensitive in some databases</li>
                    <li>Use commas to separate column names</li>
                    <li>Maintain the order: first_name, last_name, department</li>
                  </ul>
                </p>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <p>Your query should return 5 rows with 3 columns in this order:</p>
              
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>first_name</th>
                      <th>last_name</th>
                      <th>department</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John</td>
                      <td>Doe</td>
                      <td>Engineering</td>
                    </tr>
                    <tr>
                      <td>Jane</td>
                      <td>Smith</td>
                      <td>Marketing</td>
                    </tr>
                    <tr>
                      <td>Bob</td>
                      <td>Johnson</td>
                      <td>Engineering</td>
                    </tr>
                    <tr>
                      <td>Alice</td>
                      <td>Williams</td>
                      <td>Sales</td>
                    </tr>
                    <tr>
                      <td>Charlie</td>
                      <td>Brown</td>
                      <td>Marketing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>Selecting specific columns:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
        SELECT column1, column2, column3
        FROM table_name;</pre>
              
              <p><strong>Important:</strong></p>
              <ul style="margin-left: 1.5rem; line-height: 1.6;">
                <li>Separate column names with commas</li>
                <li>Do not put comma after the last column name</li>
                <li>Column order in SELECT determines output order</li>
              </ul>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should select first_name column",
              type: "query-validation",
              expectedKeywords: ["first_name"],
              visible: true
            },
            {
              id: 2,
              description: "Query should select last_name column",
              type: "query-validation",
              expectedKeywords: ["last_name"],
              visible: true
            },
            {
              id: 3,
              description: "Query should select department column",
              type: "query-validation",
              expectedKeywords: ["department"],
              visible: true
            },
            {
              id: 4,
              description: "Query should not use wildcard (*)",
              type: "query-validation",
              forbiddenKeywords: ["*"],
              visible: true
            },
            {
              id: 5,
              description: "Query should have correct column order",
              type: "functionality-validation",
              requiresWhere: false,
              expectedColumns: ["first_name", "last_name", "department"],
              visible: true
            }
          ]
        }
      ]
    },
    // SQL Practice 2 - WHERE clause and filtering
    {
      id: "sql-coding-practice-2",
      title: "SQL Filtering: WHERE Clause",
      description: "Practice using WHERE clause to filter results",
      questions: [
        {
          id: "sql-query-3",
          title: "Filter by Department",
          description: "Write a SQL query to select employees from the Engineering department.",
          difficulty: "Medium",
          score: 80,
          type: "sql",
          defaultCode: {
            sql: `-- Select employees from Engineering department
          SELECT * FROM employees
          WHERE department = 'Engineering';`
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Problem Statement</p>
              <p>Write a SQL query to filter employees based on their department.</p>
              
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: employees</div>
                <table>
                  <thead>
                    <tr>
                      <th>Column Name</th>
                      <th>Data Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>employee_id</td>
                      <td>INTEGER</td>
                    </tr>
                    <tr>
                      <td>first_name</td>
                      <td>VARCHAR(50)</td>
                    </tr>
                    <tr>
                      <td>last_name</td>
                      <td>VARCHAR(50)</td>
                    </tr>
                    <tr>
                      <td>department</td>
                      <td>VARCHAR(50)</td>
                    </tr>
                    <tr>
                      <td>salary</td>
                      <td>DECIMAL(10,2)</td>
                    </tr>
                    <tr>
                      <td>hire_date</td>
                      <td>DATE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query that selects all employees who work in the <strong>Engineering</strong> department.</p>
              
              <p>Expected to return 2 employees:</p>
              <ul style="margin-left: 1.5rem; line-height: 1.6;">
                <li>John Doe (Employee ID: 1)</li>
                <li>Bob Johnson (Employee ID: 3)</li>
              </ul>
              
              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 1.6;">
                    <li>String values must be enclosed in single quotes</li>
                    <li>'Engineering' is case-sensitive in the WHERE clause</li>
                    <li>Use the = operator for exact match</li>
                  </ul>
                </p>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>employee_id</th>
                      <th>first_name</th>
                      <th>last_name</th>
                      <th>department</th>
                      <th>salary</th>
                      <th>hire_date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John</td>
                      <td>Doe</td>
                      <td>Engineering</td>
                      <td>75000.00</td>
                      <td>2022-01-15</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Bob</td>
                      <td>Johnson</td>
                      <td>Engineering</td>
                      <td>80000.00</td>
                      <td>2021-11-10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>WHERE clause syntax:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
        SELECT column1, column2, ...
        FROM table_name
        WHERE condition;</pre>
                      
              <p><strong>String comparison:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
            WHERE department = 'Engineering'</pre>
              
              <p><strong>Common comparison operators:</strong></p>
              <ul style="margin-left: 1.5rem; line-height: 1.6;">
                <li>= (equal to)</li>
                <li>!= or <> (not equal to)</li>
                <li>> (greater than)</li>
                <li>< (less than)</li>
                <li>>= (greater than or equal to)</li>
                <li><= (less than or equal to)</li>
              </ul>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true
            },
            {
              id: 2,
              description: "Query should filter by department = 'Engineering'",
              type: "query-validation",
              expectedKeywords: ["department", "=", "engineering"],
              visible: true
            },
            {
              id: 3,
              description: "String value should be in single quotes",
              type: "syntax-validation",
              expectedKeywords: ["'engineering'"],
              visible: true
            },
            {
              id: 4,
              description: "Should return exactly 2 rows",
              type: "result-validation",
              expectedRowCount: 2,
              visible: true
            }
          ]
        },
        {
          id: "sql-query-4",
          title: "Filter by Salary Range",
          description: "Write a SQL query to select employees with salary greater than 70000.",
          difficulty: "Medium",
          score: 85,
          type: "sql",
          defaultCode: {
            sql: `-- Select employees with salary > 70000
        SELECT first_name, last_name, salary FROM employees
        WHERE salary > 70000;`
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Problem Statement</p>
              <p>Write a SQL query to filter employees based on their salary.</p>
              
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query that selects <strong>first_name, last_name, and salary</strong> of employees who earn <strong>more than 70000</strong>.</p>
              
              <p>Expected to return 3 employees:</p>
              <ul style="margin-left: 1.5rem; line-height: 1.6;">
                <li>John Doe - $75,000</li>
                <li>Bob Johnson - $80,000</li>
                <li>Alice Williams - $70,000 (NOT included because > 70000, not >=)</li>
              </ul>
              
              <div class="Warning-container">
                <div>
                  <h5>
                    <i class="bi bi-exclamation-triangle"></i>Important
                  </h5>
                </div>
                <ul style="margin-left: 1.5rem;">
                  <li>Use > operator (greater than), not >=</li>
                  <li>Do not include employees with salary exactly 70000</li>
                  <li>Numeric values should NOT be in quotes</li>
                </ul>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>first_name</th>
                      <th>last_name</th>
                      <th>salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John</td>
                      <td>Doe</td>
                      <td>75000.00</td>
                    </tr>
                    <tr>
                      <td>Bob</td>
                      <td>Johnson</td>
                      <td>80000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>Numeric comparison:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
WHERE salary > 70000</pre>
              
              <p><strong>Different salary conditions:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
WHERE salary >= 70000   -- greater than or equal to
WHERE salary < 70000    -- less than
WHERE salary <= 70000   -- less than or equal to
WHERE salary = 70000    -- exactly equal to
WHERE salary != 70000   -- not equal to</pre>
              
              <p><strong>Multiple conditions with AND/OR:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
WHERE salary > 70000 AND department = 'Engineering'
WHERE salary > 70000 OR department = 'Engineering'</pre>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should use > operator for salary",
              type: "query-validation",
              expectedKeywords: ["salary", ">", "70000"],
              visible: true
            },
            {
              id: 2,
              description: "Should select only first_name, last_name, salary",
              type: "query-validation",
              expectedKeywords: ["first_name", "last_name", "salary"],
              forbiddenKeywords: ["*"],
              visible: true
            },
            {
              id: 3,
              description: "Should return exactly 2 rows",
              type: "result-validation",
              expectedRowCount: 2,
              visible: true
            },
            {
              id: 4,
              description: "Should include Bob Johnson (salary 80000)",
              type: "result-validation",
              expectedData: [
                { first_name: "Bob", last_name: "Johnson", salary: 80000 }
              ],
              visible: true
            }
          ]
        }
      ]
    },
    // SQL Practice 3 - ORDER BY and LIMIT
    {
      id: "sql-coding-practice-3",
      title: "SQL Sorting: ORDER BY and LIMIT",
      description: "Practice sorting results and limiting output",
      questions: [
        {
          id: "sql-query-5",
          title: "Sort by Salary Descending",
          description: "Write a SQL query to list employees sorted by salary in descending order.",
          difficulty: "Medium",
          score: 90,
          type: "sql",
          defaultCode: {
            sql: `-- List employees by salary (highest first)
SELECT first_name, last_name, salary FROM employees
ORDER BY salary DESC;`
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Problem Statement</p>
              <p>Write a SQL query to sort employee records by salary.</p>
              
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query that selects <strong>first_name, last_name, and salary</strong> of all employees, sorted by <strong>salary in descending order</strong> (highest salary first).</p>
              
              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 1.6;">
                    <li>Use ORDER BY clause for sorting</li>
                    <li>DESC keyword for descending order</li>
                    <li>ASC keyword for ascending order (default)</li>
                    <li>Sorting happens after WHERE filtering (if any)</li>
                  </ul>
                </p>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>first_name</th>
                      <th>last_name</th>
                      <th>salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bob</td>
                      <td>Johnson</td>
                      <td>80000.00</td>
                    </tr>
                    <tr>
                      <td>John</td>
                      <td>Doe</td>
                      <td>75000.00</td>
                    </tr>
                    <tr>
                      <td>Alice</td>
                      <td>Williams</td>
                      <td>70000.00</td>
                    </tr>
                    <tr>
                      <td>Jane</td>
                      <td>Smith</td>
                      <td>65000.00</td>
                    </tr>
                    <tr>
                      <td>Charlie</td>
                      <td>Brown</td>
                      <td>60000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>ORDER BY syntax:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
SELECT column1, column2, ...
FROM table_name
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...;</pre>
              
              <p><strong>Examples:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
-- Ascending order (default)
ORDER BY salary ASC

-- Descending order
ORDER BY salary DESC

-- Multiple columns: sort by department, then by salary
ORDER BY department ASC, salary DESC</pre>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should contain ORDER BY clause",
              type: "query-validation",
              expectedKeywords: ["order by"],
              visible: true
            },
            {
              id: 2,
              description: "Should sort by salary column",
              type: "query-validation",
              expectedKeywords: ["salary"],
              visible: true
            },
            {
              id: 3,
              description: "Should use DESC for descending order",
              type: "query-validation",
              expectedKeywords: ["desc"],
              visible: true
            },
            {
              id: 4,
              description: "First row should be Bob Johnson (salary 80000)",
              type: "result-validation",
              expectedData: [
                { first_name: "Bob", last_name: "Johnson", salary: 80000 }
              ],
              visible: true
            },
            {
              id: 5,
              description: "Last row should be Charlie Brown (salary 60000)",
              type: "result-validation",
              expectedRowCount: 5,
              visible: true
            }
          ]
        },
        {
          id: "sql-query-6",
          title: "Top 3 Highest Paid Employees",
          description: "Write a SQL query to find the top 3 highest paid employees.",
          difficulty: "Medium",
          score: 95,
          type: "sql",
          defaultCode: {
            sql: `-- Get top 3 highest paid employees
SELECT first_name, last_name, salary FROM employees
ORDER BY salary DESC
LIMIT 3;`
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Problem Statement</p>
              <p>Write a SQL query to find the top 3 highest paid employees.</p>
              
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query that selects <strong>first_name, last_name, and salary</strong> of the <strong>top 3 highest paid employees</strong>.</p>
              
              <div class="Warning-container">
                <div>
                  <h5>
                    <i class="bi bi-exclamation-triangle"></i>Important
                  </h5>
                </div>
                <ul style="margin-left: 1.5rem;">
                  <li>Use ORDER BY to sort by salary descending</li>
                  <li>Use LIMIT to get only top 3 records</li>
                  <li>If multiple employees have same salary, any 3 can be selected</li>
                </ul>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>first_name</th>
                      <th>last_name</th>
                      <th>salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bob</td>
                      <td>Johnson</td>
                      <td>80000.00</td>
                    </tr>
                    <tr>
                      <td>John</td>
                      <td>Doe</td>
                      <td>75000.00</td>
                    </tr>
                    <tr>
                      <td>Alice</td>
                      <td>Williams</td>
                      <td>70000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>LIMIT clause syntax:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
SELECT column1, column2, ...
FROM table_name
ORDER BY column_name [ASC|DESC]
LIMIT number;</pre>
              
              <p><strong>Common use cases:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
-- Top 5 records
LIMIT 5

-- Pagination: skip first 10, get next 5
LIMIT 5 OFFSET 10

-- Alternative syntax (some databases)
SELECT TOP 3 * FROM employees
ORDER BY salary DESC</pre>
              
              <p><strong>Full query execution order:</strong></p>
              <ol style="margin-left: 1.5rem; line-height: 1.6;">
                <li>FROM - Select the table</li>
                <li>WHERE - Filter rows</li>
                <li>SELECT - Choose columns</li>
                <li>ORDER BY - Sort results</li>
                <li>LIMIT - Restrict output</li>
              </ol>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should contain LIMIT clause",
              type: "query-validation",
              expectedKeywords: ["limit", "3"],
              visible: true
            },
            {
              id: 2,
              description: "Should sort by salary descending",
              type: "query-validation",
              expectedKeywords: ["order by", "salary", "desc"],
              visible: true
            },
            {
              id: 3,
              description: "Should return exactly 3 rows",
              type: "result-validation",
              expectedRowCount: 3,
              visible: true
            },
            {
              id: 4,
              description: "Highest salary should be 80000",
              type: "result-validation",
              expectedData: [
                { salary: 80000 }
              ],
              visible: true
            }
          ]
        }
      ]
    },
    // SQL Practice 4 - Aggregate Functions
    {
      id: "sql-coding-practice-4",
      title: "SQL Aggregates: GROUP BY and Functions",
      description: "Practice using aggregate functions and GROUP BY",
      questions: [
        {
          id: "sql-query-7",
          title: "Count Employees by Department",
          description: "Write a SQL query to count how many employees are in each department.",
          difficulty: "Hard",
          score: 100,
          type: "sql",
          defaultCode: {
            sql: `-- Count employees in each department
SELECT department, COUNT(*) as employee_count FROM employees
GROUP BY department;`
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Problem Statement</p>
              <p>Write a SQL query to count employees grouped by department.</p>
              
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query that:</p>
              <ol style="margin-left: 1.5rem; line-height: 1.6;">
                <li>Groups employees by their department</li>
                <li>Counts how many employees are in each department</li>
                <li>Returns department name and employee count</li>
                <li>Uses alias 'employee_count' for the count column</li>
              </ol>
              
              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style="margin: 1rem 0 1rem 1.5rem; line-height: 1.6;">
                    <li>Use COUNT(*) aggregate function</li>
                    <li>Use GROUP BY department</li>
                    <li>Use AS keyword for column alias</li>
                    <li>Non-aggregated columns in SELECT must be in GROUP BY</li>
                  </ul>
                </p>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>department</th>
                      <th>employee_count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Engineering</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Marketing</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Sales</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p><em>Note: The order of rows may vary.</em></p>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>GROUP BY syntax:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
SELECT column1, AGGREGATE_FUNCTION(column2)
FROM table_name
GROUP BY column1;</pre>
              
              <p><strong>Common aggregate functions:</strong></p>
              <ul style="margin-left: 1.5rem; line-height: 1.6;">
                <li>COUNT() - Count rows</li>
                <li>SUM() - Sum of values</li>
                <li>AVG() - Average of values</li>
                <li>MIN() - Minimum value</li>
                <li>MAX() - Maximum value</li>
              </ul>
              
              <p><strong>Column aliases:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
SELECT department, COUNT(*) AS employee_count
SELECT department, COUNT(*) employee_count  -- AS is optional</pre>
              
              <p><strong>HAVING clause for filtering groups:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 1;</pre>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should contain GROUP BY clause",
              type: "query-validation",
              expectedKeywords: ["group by"],
              visible: true
            },
            {
              id: 2,
              description: "Should use COUNT(*) function",
              type: "query-validation",
              expectedKeywords: ["count(*)"],
              visible: true
            },
            {
              id: 3,
              description: "Should group by department column",
              type: "query-validation",
              expectedKeywords: ["department"],
              visible: true
            },
            {
              id: 4,
              description: "Should return 3 rows (3 departments)",
              type: "result-validation",
              expectedRowCount: 3,
              visible: true
            },
            {
              id: 5,
              description: "Engineering department should have 2 employees",
              type: "result-validation",
              expectedData: [
                { department: "Engineering", employee_count: 2 }
              ],
              visible: true
            }
          ]
        },
        {
          id: "sql-query-8",
          title: "Average Salary by Department",
          description: "Write a SQL query to calculate average salary for each department.",
          difficulty: "Hard",
          score: 120,
          type: "sql",
          defaultCode: {
            sql: `-- Calculate average salary per department
SELECT department, AVG(salary) as avg_salary FROM employees
GROUP BY department
ORDER BY avg_salary DESC;`
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Problem Statement</p>
              <p>Write a SQL query to calculate average salary grouped by department.</p>
              
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query that:</p>
              <ol style="margin-left: 1.5rem; line-height: 1.6;">
                <li>Groups employees by department</li>
                <li>Calculates average salary for each department</li>
                <li>Returns department name and average salary</li>
                <li>Sorts results by average salary in descending order</li>
                <li>Uses alias 'avg_salary' for the average column</li>
              </ol>
              
              <div class="Warning-container">
                <div>
                  <h5>
                    <i class="bi bi-exclamation-triangle"></i>Important
                  </h5>
                </div>
                <ul style="margin-left: 1.5rem;">
                  <li>Use AVG() aggregate function on salary column</li>
                  <li>Use ROUND() if you want to format the average</li>
                  <li>You can ORDER BY the alias name</li>
                  <li>Calculate for all departments, even with one employee</li>
                </ul>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>department</th>
                      <th>avg_salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Engineering</td>
                      <td>77500.00</td>
                    </tr>
                    <tr>
                      <td>Sales</td>
                      <td>70000.00</td>
                    </tr>
                    <tr>
                      <td>Marketing</td>
                      <td>62500.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p><strong>Calculation:</strong></p>
              <ul style="margin-left: 1.5rem; line-height: 1.6;">
                <li>Engineering: (75000 + 80000) / 2 = 77500</li>
                <li>Sales: 70000 / 1 = 70000</li>
                <li>Marketing: (65000 + 60000) / 2 = 62500</li>
              </ul>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>AVG() function:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
SELECT AVG(salary) FROM employees;  -- Overall average
SELECT department, AVG(salary) FROM employees GROUP BY department;</pre>
              
              <p><strong>Formatting numbers:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
-- Round to 2 decimal places
SELECT department, ROUND(AVG(salary), 2) as avg_salary
FROM employees
GROUP BY department;</pre>
              
              <p><strong>Multiple aggregates:</strong></p>
              <pre style="background: #1e293b; padding: 16px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
SELECT department,
       COUNT(*) as employee_count,
       AVG(salary) as avg_salary,
       MIN(salary) as min_salary,
       MAX(salary) as max_salary,
       SUM(salary) as total_salary
FROM employees
GROUP BY department;</pre>
              
              <p><strong>Execution order with HAVING:</strong></p>
              <ol style="margin-left: 1.5rem; line-height: 1.6;">
                <li>FROM</li>
                <li>WHERE</li>
                <li>GROUP BY</li>
                <li>HAVING (filters groups)</li>
                <li>SELECT</li>
                <li>ORDER BY</li>
                <li>LIMIT</li>
              </ol>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should use AVG() function",
              type: "query-validation",
              expectedKeywords: ["avg(salary)"],
              visible: true
            },
            {
              id: 2,
              description: "Should contain GROUP BY department",
              type: "query-validation",
              expectedKeywords: ["group by", "department"],
              visible: true
            },
            {
              id: 3,
              description: "Should use alias 'avg_salary'",
              type: "query-validation",
              expectedKeywords: ["as avg_salary", "avg_salary"],
              visible: true
            },
            {
              id: 4,
              description: "Should sort by avg_salary descending",
              type: "query-validation",
              expectedKeywords: ["order by", "avg_salary", "desc"],
              visible: true
            },
            {
              id: 5,
              description: "Engineering department average should be 77500",
              type: "result-validation",
              expectedData: [
                { department: "Engineering", avg_salary: 77500 }
              ],
              visible: true
            }
          ]
        }
      ]
    }
  ]
};