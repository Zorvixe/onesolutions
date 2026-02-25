export const sqlCodingPracticesData = {
  sql: [
    // SQL Practice 1 - Basic SELECT queries
    {
      id: "sql-coding-practice-1",
      title: "SQL Coding Practice 1",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-1",
          title: "Select All Employees",
          description:
            "Write a SQL query to select all columns from the employees table.",
          difficulty: "Easy",
          score: 50,
          type: "sql",
          defaultCode: {
            sql: `-- Write your SQL query here;`,
          },
          tableData: {
            employees: {
              columns: ["id", "name", "department", "salary", "hire_date"],
              rows: [
                [1, "John Doe", "Engineering", 75000, "2022-01-15"],
                [2, "Jane Smith", "Marketing", 65000, "2021-03-22"],
                [3, "Bob Johnson", "Engineering", 55000, "2023-06-10"],
                [4, "Alice Brown", "Sales", 80000, "2020-11-05"],
                [5, "Charlie Wilson", "HR", 60000, "2022-09-30"],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query to select all columns from the employees table.</p>
              
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
                      <td>id</td>
                      <td>INTEGER</td>
                      <td>Employee ID (Primary Key)</td>
                    </tr>
                    <tr>
                      <td>name</td>
                      <td>VARCHAR(100)</td>
                      <td>Employee name</td>
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
                      <td>Date hired</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
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
              
              <p class="desc-que-blue">Expected Output</p>
              <p>Your query should return all 5 rows with all columns from the employees table.</p>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>SELECT statement syntax:</strong></p>
              <pre style="background: #1e293b; padding: 10px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
        SELECT * FROM table_name;
              </pre>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              forbiddenKeywords: ["insert", "update", "delete", "drop"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should use wildcard (*) for all columns",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should specify FROM employees",
              type: "query-validation",
              expectedKeywords: ["from", "employees"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should return exactly 5 rows",
              type: "result-validation",
              expectedRowCount: 5,
              visible: true,
            },
            {
              id: 5,
              description: "Query should return all 5 columns",
              type: "result-validation",
              expectedColumnCount: 5,
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-2",
          title: "Filter Employees by Department",
          description:
            "Write a SQL query to select all employees from the Engineering department.",
          difficulty: "Easy",
          score: 50,
          type: "sql",
          defaultCode: {
            sql: `-- Write your SQL query here\nSELECT * FROM employees WHERE department = 'Engineering';`,
          },
          tableData: {
            employees: {
              columns: ["id", "name", "department", "salary", "hire_date"],
              rows: [
                [1, "John Doe", "Engineering", 75000, "2022-01-15"],
                [2, "Jane Smith", "Marketing", 65000, "2021-03-22"],
                [3, "Bob Johnson", "Sales", 55000, "2023-06-10"],
                [4, "Alice Brown", "Engineering", 80000, "2020-11-05"],
                [5, "Charlie Wilson", "HR", 60000, "2022-09-30"],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query to select all employees who work in the Engineering department.</p>
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
                      <td>id</td>
                      <td>INTEGER</td>
                      <td>Employee ID (Primary Key)</td>
                    </tr>
                    <tr>
                      <td>name</td>
                      <td>VARCHAR(100)</td>
                      <td>Employee name</td>
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
                      <td>Date hired</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <p>Your query should return 2 rows (John Doe and Bob Johnson).</p>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should use WHERE clause",
              type: "syntax-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should filter by Engineering department",
              type: "query-validation",
              expectedKeywords: ["department", "=", "'Engineering'"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should return exactly 2 rows",
              type: "result-validation",
              expectedRowCount: 2,
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-3",
          title: "Calculate Average Salary",
          description:
            "Write a SQL query to calculate the average salary of all employees.",
          difficulty: "Medium",
          score: 75,
          type: "sql",
          defaultCode: {
            sql: `-- Write your SQL query here\nSELECT AVG(salary) as average_salary FROM employees;`,
          },
          tableData: {
            employees: {
              columns: ["id", "name", "department", "salary", "hire_date"],
              rows: [
                [1, "John Doe", "Engineering", 75000, "2022-01-15"],
                [2, "Jane Smith", "Marketing", 65000, "2021-03-22"],
                [3, "Bob Johnson", "Sales", 55000, "2023-06-10"],
                [4, "Alice Brown", "Engineering", 80000, "2020-11-05"],
                [5, "Charlie Wilson", "HR", 60000, "2022-09-30"],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Your Task</p>
              <p>Write a SQL query to calculate the average salary of all employees.</p>
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
                      <td>id</td>
                      <td>INTEGER</td>
                      <td>Employee ID (Primary Key)</td>
                    </tr>
                    <tr>
                      <td>name</td>
                      <td>VARCHAR(100)</td>
                      <td>Employee name</td>
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
                      <td>Date hired</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <p>Your query should return the average salary: 67000.00</p>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should use AVG aggregate function",
              type: "syntax-validation",
              expectedKeywords: ["avg(", "salary"],
              visible: true,
            },

            {
              id: 2,
              description: "Average salary should be correct",
              type: "result-validation",
              expectedValue: 67000,
              tolerance: 0.01,
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-4",
          title: "Create Student Table",
          description:
            "With this practice set, you will get to tweak the database by creating new tables, and inserting and retrieving the data. Here’s to your first step for playing around with databases! Put your thinking hats on and get your hands dirty.",
          difficulty: "Medium",
          score: 75,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            student: {
              columns: ["id", "name", "type", "notnull"],
              rows: [
                [0, "name", "VARCHAR(200)", 0, null, 0],
                [1, "age", "INTEGER", 0, null, 0],
                [2, "score", "INTEGER", 0, null, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Create a "student" table to store name, age and score of students.</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: student</div>
                <table>
                  <thead>
                    <tr>
                      <th>details</th>
                      <th>datatype</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                   
                    <tr>
                      <td>name</td>
                      <td>string of max length 200</td>
                      
                    </tr>
                    <tr>
                      <td>age</td>
                      <td>integer</td>
                      
                    </tr>
                    <tr>
                      <td>score</td>
                      <td>integer</td>
                     
                    </tr>
                   
                  </tbody>
                </table>
              </div>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with CREATE TABLE",
              type: "syntax-validation",
              expectedKeywords: ["create", "table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table should be named 'student'",
              type: "query-validation",
              expectedTableName: "student",
              expectedKeywords: ["student"],
              visible: true,
            },
            {
              id: 3,
              description: "Table should contain column 'name' as VARCHAR(200)",
              type: "query-validation",
              expectedColumns: [{ name: "name", type: "varchar(200)" }],
              visible: true,
            },
            {
              id: 4,
              description: "Table should contain column 'age' as INTEGER",
              type: "query-validation",
              expectedColumns: [{ name: "age", type: "integer" }],
              visible: true,
            },
            {
              id: 5,
              description: "Table should contain column 'score' as INTEGER",
              type: "query-validation",
              expectedColumns: [{ name: "score", type: "integer" }],
              visible: true,
            },
            {
              id: 6,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-5",
          title: "Create Customer Table",
          description:
            "With this practice set, you will get to tweak the database by creating new tables, and inserting and retrieving the data.\n Here’s to your first step for playing around with databases! Put your thinking hats on and get your hands dirty.",
          difficulty: "Medium",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {},

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              In a typical e-commerce application, we need to store the following customer details. Create a "customer" table to store the data.</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: customer</div>
                <table>
                  <thead>
                    <tr>
                      <th>details</th>
                      <th>datatype</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                   
                    <tr>
                      <td>customer_id</td>
                      <td>integer</td>
                      
                    </tr>
                    <tr>
                      <td>first_name</td>
                      <td>string of max length 200</td>
                      
                    </tr>
                    <tr>
                      <td>last_name</td>
                      <td>string of max length 200</td>
                     
                    </tr>
                    <tr>
                    <td>date_of_birth</td>
                    <td>date</td> 
                  </tr>
                  <tr>
                    <td>address</td>
                    <td>text</td> 
                  </tr>
                  <tr>
                  <td>phone_number</td>
                  <td>integer</td> 
                </tr>
                   
                  </tbody>
                </table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with CREATE TABLE",
              type: "syntax-validation",
              expectedKeywords: ["create", "table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be 'customer'",
              type: "query-validation",
              expectedTableName: "customer",
              expectedKeywords: ["customer"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain 'customer_id' column",
              type: "query-validation",
              expectedKeywords: ["customer_id"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain 'first_name' column",
              type: "query-validation",
              expectedKeywords: ["first_name"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain 'last_name' column",
              type: "query-validation",
              expectedKeywords: ["last_name"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should contain 'date_of_birth' column",
              type: "query-validation",
              expectedKeywords: ["date_of_birth"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain 'address' column",
              type: "query-validation",
              expectedKeywords: ["address"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should contain 'phone_number' column",
              type: "query-validation",
              expectedKeywords: ["phone_number"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should contain VARCHAR(200) for name fields",
              type: "query-validation",
              expectedKeywords: ["varchar(200)"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-6",
          title: "Create Order Details Table",
          description:
            "With this practice set, you will get to tweak the database by creating new tables, and inserting and retrieving the data.\n Here’s to your first step for playing around with databases! Put your thinking hats on and get your hands dirty.",
          difficulty: "Medium",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            student: {
              columns: ["id", "name", "type", "notnull", "dflt_value", "pk"],
              rows: [
                [0, "name", "VARCHAR(200)", 0, null, 0],
                [1, "age", "INTEGER", 0, null, 0],
                [2, "score", "INTEGER", 0, null, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              We need to store the details of orders in an e-commerce application. Create an "order_details" table to store the following details.</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: order_details</div>
                <table>
                <thead>
                  <tr>
                    <th>details</th>
                    <th>datatype</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>order_id</td>
                    <td>integer</td>
                  </tr>
                  <tr>
                    <td>customer_id</td>
                    <td>integer</td>
                  </tr>
                  <tr>
                    <td>order_datetime</td>
                    <td>datetime</td>
                  </tr>
                  <tr>
                    <td>shipped_datetime</td>
                    <td>datetime</td>
                  </tr>
                  <tr>
                    <td>total_amount</td>
                    <td>float</td>
                  </tr>
                </tbody>
              </table>
              
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with CREATE TABLE",
              type: "syntax-validation",
              expectedKeywords: ["create", "table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be 'order_details'",
              type: "query-validation",
              expectedTableName: "order_details",
              expectedKeywords: ["order_details"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain 'order_id' column",
              type: "query-validation",
              expectedKeywords: ["order_id"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain 'customer_id' column",
              type: "query-validation",
              expectedKeywords: ["customer_id"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain 'order_datetime' column",
              type: "query-validation",
              expectedKeywords: ["order_datetime"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should contain 'shipped_datetime' column",
              type: "query-validation",
              expectedKeywords: ["shipped_datetime"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain 'total_amount' column",
              type: "query-validation",
              expectedKeywords: ["total_amount"],
              visible: true,
            },
            {
              id: 8,
              description:
                "order_id and customer_id should use INTEGER datatype",
              type: "query-validation",
              expectedKeywords: ["integer"],
              visible: true,
            },
            {
              id: 9,
              description:
                "order_datetime and shipped_datetime should use DATETIME datatype",
              type: "query-validation",
              expectedKeywords: ["datetime"],
              visible: true,
            },
            {
              id: 10,
              description: "total_amount should use FLOAT datatype",
              type: "query-validation",
              expectedKeywords: ["float"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          id: "sql-query-7",
          title: "Storing Details",
          description:
            "With this practice set, you will get to tweak the database by creating new tables, and inserting and retrieving the data.\n Here’s to your first step for playing around with databases! Put your thinking hats on and get your hands dirty.",
          difficulty: "Medium",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [["Suresh", 21, 70]],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
             
We're storing the details of players who are a part of a tournament.<br/> The database contains a "player" table that stores the name, age and score of players.</p>
<p>We have to add a new player to the 'player' table.</p>              
<div class="sql-table-desc">
              
                <div class="sql-table-caption">Table: player</div>
                <table>
                <thead>
                  <tr>
                    <th>details</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>name</td>
                    <td>Ram</td>
                  </tr>
                  <tr>
                    <td>age</td>
                    <td>28</td>
                  </tr>
                  <tr>
                    <td>score</td>
                    <td>30</td>
                  </tr>
                </tbody>
              </table>
             
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with INSERT INTO",
              type: "syntax-validation",
              expectedKeywords: ["insert", "into"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain columns name, age, score",
              type: "query-validation",
              expectedKeywords: ["name", "age", "score"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should insert values Ram, 28, 30",
              type: "query-validation",
              expectedKeywords: ["ram", "28", "30"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should use VALUES keyword",
              type: "query-validation",
              expectedKeywords: ["values"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          id: "sql-query-8",
          title: "Store Data",
          description:
            "With this practice set, you will get to tweak the database by creating new tables, and inserting and retrieving the data.\n Here’s to your first step for playing around with databases! Put your thinking hats on and get your hands dirty.",
          difficulty: "Medium",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [
                ["Suresh", 21, 70],
                ["Venkat", 21, 43],
                ["Raj", 25, 80],
                ["Ram", 30, 60],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>The database contains a "player" table that stores the name, age and score of players.<p>Get all the players from the "player" table in the following format.</p> 
              <p class="desc-que-blue">Expected Output Format:</p>             
<div class="sql-table-desc">
              
                <div class="sql-table-caption">Table: player</div>
                <table>
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
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                </tr>
                </tbody>
              </table>
              
             
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain '*' to select all columns",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 4,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Practice 2
    {
      id: "sql-coding-practice-2",
      title: "SQL Coding Practice 2",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-01",
          title: "Add Player",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

          difficulty: "Easy",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [["Ram", 24, 10], ["Shyam", 25, 15], ["Suresh", 21, 9], ,],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              A new player has joined the tournament. Write an SQL query to add the the following details to the "player" table.</p>              
         <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>age</th>
                    <th>score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Raj</td>
                    <td>26</td>
                    <td>120</td>
                  </tr>
                </tbody>
              </table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with CREATE TABLE",
              type: "syntax-validation",
              expectedKeywords: ["create", "table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table should be named 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 3,
              description: "Table should contain column 'name' as VARCHAR(200)",
              type: "query-validation",
              expectedColumns: [{ name: "name", type: "varchar(200)" }],
              visible: true,
            },
            {
              id: 4,
              description: "Table should contain column 'age' as INTEGER",
              type: "query-validation",
              expectedColumns: [{ name: "age", type: "integer" }],
              visible: true,
            },
            {
              id: 5,
              description: "Table should contain column 'score' as INTEGER",
              type: "query-validation",
              expectedColumns: [{ name: "score", type: "integer" }],
              visible: true,
            },
            {
              id: 6,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-02",
          title: "Add Three Players",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

          difficulty: "Easy",
          score: 45,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [
                ["Ram", 24, 10],
                ["Shyam", 25, 15],
                ["Suresh", 21, 9],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Three new players have joined the tournament.
              Write a SQL query to add the the following details of players to the "player" table.</p>              
         <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>age</th>
                    <th>score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ram</td>
                    <td>28</td>
                    <td>125</td>
                  </tr>
                  <tr>
                    <td>Charan</td>
                    <td>25</td>
                    <td>173</td>
                  </tr>
                  <tr>
                    <td>Ravan</td>
                    <td>20</td>
                    <td>152</td>
                  </tr>
                </tbody>
                </table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 2,
              description: "Table should be named 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 3,
              description: "Table should contain column 'name' as VARCHAR(200)",
              type: "query-validation",
              expectedColumns: [{ name: "name", type: "varchar(200)" }],
              visible: true,
            },
            {
              id: 4,
              description: "Table should contain column 'age' as INTEGER",
              type: "query-validation",
              expectedColumns: [{ name: "age", type: "integer" }],
              visible: true,
            },
            {
              id: 5,
              description: "Table should contain column 'score' as INTEGER",
              type: "query-validation",
              expectedColumns: [{ name: "score", type: "integer" }],
              visible: true,
            },
            {
              id: 6,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-03",
          title: "Get All Details",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

          difficulty: "Easy",
          score: 45,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [
                ["Ram", 24, 10],
                ["Shyam", 25, 15],
                ["Suresh", 21, 9],
                ["jay", 25, 15],
                ["sam", 18, 10],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get all the details of the players from the player table.</p>  
              <p class="desc-que-blue">Expected Output Format:</p>              
         <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>age</th>
                    <th>score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ram</td>
                    <td>24</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Suresh</td>
                    <td>21</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                  </tr>
                </tbody>
                </table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should select all columns using '*'",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain FROM clause",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 4,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should not contain WHERE clause",
              type: "query-validation",
              forbiddenKeywords: ["where"],
              visible: false,
            },
            {
              id: 6,
              description: "Query should end with a semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-04",
          title: "Update Table",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

          difficulty: "Easy",
          score: 50,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [
                ["Ram", 24, 10],
                ["Shyam", 25, 15],
                ["Suresh", 21, 9],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Update the age of "Shyam" to 30 in the 'player' table.<p>NOTE: In this table, we can identify a player by name.</p>  
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>age</th>
                    <th>score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ram</td>
                    <td>24</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Shyam</td>
                    <td>25</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>Suresh</td>
                    <td>21</td>
                    <td>9</td>
                  </tr>
                </tbody>
              </table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with UPDATE",
              type: "syntax-validation",
              expectedKeywords: ["update"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain SET clause",
              type: "syntax-validation",
              expectedKeywords: ["set"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should update column 'age'",
              type: "query-validation",
              expectedKeywords: ["age"],
              visible: true,
            },
            {
              id: 5,
              description: "Age should be updated to 30",
              type: "query-validation",
              expectedKeywords: ["30"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should contain WHERE clause",
              type: "syntax-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 7,
              description: "WHERE clause should identify name as 'Shyam'",
              type: "query-validation",
              expectedKeywords: ["name", "shyam"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-05",
          title: "Delete Data",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

          difficulty: "Easy",
          score: 45,
          type: "sql",
          defaultCode: {
            sql: ``,
          },
          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [
                ["Ram", 24, 10],
                ["Shyam", 25, 15],
                ["Suresh", 21, 9],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Delete player "Suresh" from the player table.<p>NOTE: In this table, we can identify a player by name.</p>  
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: player</div>
              <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>age</th>
                  <th>score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ram</td>
                  <td>24</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Shyam</td>
                  <td>25</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>Suresh</td>
                  <td>21</td>
                  <td>9</td>
                </tr>
              </tbody>
            </table>
            </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with DELETE",
              type: "syntax-validation",
              expectedKeywords: ["delete"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain WHERE clause",
              type: "syntax-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 5,
              description: "WHERE clause should filter by name",
              type: "query-validation",
              expectedKeywords: ["name"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should delete player 'suresh'",
              type: "query-validation",
              expectedKeywords: ["suresh"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-06",
          title: "Store Data",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

          difficulty: "Medium",
          score: 45,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [
                ["Ram", 24, 10],
                ["Suresh", 21, 9],
                ["David", 26, 12],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>We have to store the strike_rate of players in the database. Make necessary changes to the existing player table to store the data.<p>NOTE: Name the column as strike_rate. It is measured in decimals.</p>  
            
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with ALTER TABLE",
              type: "syntax-validation",
              expectedKeywords: ["alter", "table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain ADD keyword",
              type: "syntax-validation",
              expectedKeywords: ["add"],
              visible: true,
            },
            {
              id: 4,
              description: "Column name should be 'strike_rate'",
              type: "query-validation",
              expectedKeywords: ["strike_rate"],
              visible: true,
            },
            {
              id: 5,
              description: "Data type should be FLOAT",
              type: "query-validation",
              expectedKeywords: ["float"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-07",
          title: "Get Name and Age",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

          difficulty: "Medium",
          score: 45,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [
                ["Ram", 24, 10],
                ["Shyam", 25, 15],
                ["Suresh", 21, 9],
                ["jay", 25, 15],
                ["sam", 18, 10],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get name and age of all the players from the player table.</p>  
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: player</div>
              <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>age</th>
                  <th>score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ram</td>
                  <td>24</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Suresh</td>
                  <td>21</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                </tr>
              </tbody>
              </table>
            </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select 'name' column",
              type: "query-validation",
              expectedKeywords: ["name"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should select 'age' column",
              type: "query-validation",
              expectedKeywords: ["age"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should NOT select all columns (*)",
              type: "query-validation",
              forbiddenKeywords: ["*"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          id: "sql-query-08",
          title: "Rename the Column",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

          difficulty: "Medium",
          score: 45,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [
                ["Ram", 24, 10],
                ["David", 26, 12],
                ["Suresh", 21, 9],
                ["Shyam", 25, 15],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Rename the column name to full_name in the player table.</p>  
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: player</div>
              <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>age</th>
                  <th>score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ram</td>
                  <td>24</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>David</td>
                  <td>26</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>Suresh</td>
                  <td>21</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>Shyam</td>
                  <td>25</td>
                  <td>15</td>
                </tr>
              </tbody>
            </table>
            </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with ALTER TABLE",
              type: "syntax-validation",
              expectedKeywords: ["alter", "table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain RENAME keyword",
              type: "syntax-validation",
              expectedKeywords: ["rename"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should rename column 'name'",
              type: "query-validation",
              expectedKeywords: ["name"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should rename to 'full_name'",
              type: "query-validation",
              expectedKeywords: ["full_name"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should contain TO keyword",
              type: "syntax-validation",
              expectedKeywords: ["to"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          id: "sql-query-09",
          title: "Delete Table",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

          difficulty: "Medium",
          score: 45,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "age", "score"],
              rows: [
                ["Ram", 24, 10],
                ["David", 26, 12],
                ["Suresh", 21, 9],
                ["Shyam", 25, 15],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Delete player table from the database.</p>  
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: player</div>
              <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>age</th>
                  <th>score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ram</td>
                  <td>24</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>David</td>
                  <td>26</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>Suresh</td>
                  <td>21</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>Shyam</td>
                  <td>25</td>
                  <td>15</td>
                </tr>
              </tbody>
            </table>
            </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with DROP",
              type: "syntax-validation",
              expectedKeywords: ["drop"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain TABLE keyword",
              type: "syntax-validation",
              expectedKeywords: ["table"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should NOT contain WHERE clause",
              type: "query-validation",
              forbiddenKeywords: ["where"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Practice 3
    {
      id: "sql-coding-practice-3",
      title: "SQL Coding Practice 3",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-2-1",
          title: "Get All Products based on Price",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. While shopping online, we often search for the product or brand with a partial name over giving the exact name of the product. And, while applying filters, we tend to select if the price/rating is greater than a certain number over mentioning the exact number.\nComparison operators such as LIKE, equal to (=), greater than (>) help us fetch data for such queries.\nSimilar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements.\nNOTE: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 900, "Puma", 4.8],
                ["Running Shoes", "Footwear", 2500, "Nike", 4.5],
                ["Sports Cap", "Accessories", 700, "Puma", 4.2],
                ["Bourbon Jeans", "Clothing", 1800, "Levis", 4.3],
                ["Bourbon Blue Jeans", "Clothing", 2000, "Wrangler", 4.4],
                ["Salted Chips", "Snacks", 50, "Lays", 4.1],
                ["Potato Chips Classic", "Snacks", 60, "Pringles", 4.6],
                ["Crunchy Chips", "Snacks", 45, "Bingo", 4.0],
                ["Blue Shirt", "Clothing", 1200, "Puma", 3.9],
                ["Flashgear", "Accessories", 1500, "Adidas", 4.5],
                ["Freshwear", "Clothing", 2200, "Zara", 4.2],
                ["Techgear", "Electronics", 3500, "Sony", 4.7],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get all the products whose price is less than or equal to 1000.</p>
        
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: products</div>
        
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>category</th>
                      <th>price</th>
                      <th>brand</th>
                      <th>rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Black Shirt</td><td>Clothing</td><td>900</td><td>Puma</td><td>4.8</td></tr>
                    <tr><td>Running Shoes</td><td>Footwear</td><td>2500</td><td>Nike</td><td>4.5</td></tr>
                    <tr><td>Sports Cap</td><td>Accessories</td><td>700</td><td>Puma</td><td>4.2</td></tr>
                    <tr><td>Bourbon Jeans</td><td>Clothing</td><td>1800</td><td>Levis</td><td>4.3</td></tr>
                    <tr><td>Bourbon Blue Jeans</td><td>Clothing</td><td>2000</td><td>Wrangler</td><td>4.4</td></tr>
                    <tr><td>Salted Chips</td><td>Snacks</td><td>50</td><td>Lays</td><td>4.1</td></tr>
                    <tr><td>Potato Chips Classic</td><td>Snacks</td><td>60</td><td>Pringles</td><td>4.6</td></tr>
                    <tr><td>Crunchy Chips</td><td>Snacks</td><td>45</td><td>Bingo</td><td>4.0</td></tr>
                    <tr><td>Blue Shirt</td><td>Clothing</td><td>1200</td><td>Puma</td><td>3.9</td></tr>
                    <tr><td>Flashgear</td><td>Accessories</td><td>1500</td><td>Adidas</td><td>4.5</td></tr>
                    <tr><td>Freshwear</td><td>Clothing</td><td>2200</td><td>Zara</td><td>4.2</td></tr>
                    <tr><td>Techgear</td><td>Electronics</td><td>3500</td><td>Sony</td><td>4.7</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should filter price using <= operator",
              type: "query-validation",
              expectedKeywords: ["price", "<=", "1000"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-2-2",
          title: "Get All Products based on Rating",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. While shopping online, we often search for the product or brand with a partial name over giving the exact name of the product. And, while applying filters, we tend to select if the price/rating is greater than a certain number over mentioning the exact number.\n is greater than a certain number over mentioning the exact numbe\n Comparison operators such as LIKE, equal to(=), greater than(>) help us fetch data for such queries.\n Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements.\n NOTE: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 900, "Puma", 4.8],
                ["Running Shoes", "Footwear", 2500, "Nike", 4.5],
                ["Sports Cap", "Accessories", 700, "Puma", 4.2],
                ["Bourbon Jeans", "Clothing", 1800, "Levis", 4.3],
                ["Bourbon Blue Jeans", "Clothing", 2000, "Wrangler", 4.4],
                ["Salted Chips", "Snacks", 50, "Lays", 4.1],
                ["Potato Chips Classic", "Snacks", 60, "Pringles", 4.6],
                ["Crunchy Chips", "Snacks", 45, "Bingo", 4.0],
                ["Blue Shirt", "Clothing", 1200, "Puma", 3.9],
                ["Flashgear", "Accessories", 1500, "Adidas", 4.5],
                ["Freshwear", "Clothing", 2200, "Zara", 4.2],
                ["Techgear", "Electronics", 3500, "Sony", 4.7],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p> 
              Get all the best rated products.<br />
              NOTE: Products whose rating is above 4.0 are considered as best rated products.</p>              
         <div class="sql-table-desc">
                <div class="sql-table-caption">Table: products</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>category</th>
                    <th>price</th>
                    <th>brand</th>
                    <th>rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Black Shirt</td>
                    <td>Clothing</td>
                    <td>900</td>
                    <td>Puma</td>
                    <td>4.8</td>
                  </tr>
                  <tr>
                    <td>Running Shoes</td>
                    <td>Footwear</td>
                    <td>2500</td>
                    <td>Nike</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Sports Cap</td>
                    <td>Accessories</td>
                    <td>700</td>
                    <td>Puma</td>
                    <td>4.2</td>
                  </tr>
                  <tr>
                    <td>Bourbon Jeans</td>
                    <td>Clothing</td>
                    <td>1800</td>
                    <td>Levis</td>
                    <td>4.3</td>
                  </tr>
                  <tr>
                    <td>Bourbon Blue Jeans</td>
                    <td>Clothing</td>
                    <td>2000</td>
                    <td>Wrangler</td>
                    <td>4.4</td>
                  </tr>
                  <tr>
                    <td>Salted Chips</td>
                    <td>Snacks</td>
                    <td>50</td>
                    <td>Lays</td>
                    <td>4.1</td>
                  </tr>
                  <tr>
                    <td>Potato Chips Classic</td>
                    <td>Snacks</td>
                    <td>60</td>
                    <td>Pringles</td>
                    <td>4.6</td>
                  </tr>
                  <tr>
                    <td>Crunchy Chips</td>
                    <td>Snacks</td>
                    <td>45</td>
                    <td>Bingo</td>
                    <td>4.0</td>
                  </tr>
                  <tr>
                    <td>Blue Shirt</td>
                    <td>Clothing</td>
                    <td>1200</td>
                    <td>Puma</td>
                    <td>3.9</td>
                  </tr>
                  <tr>
                    <td>Flashgear</td>
                    <td>Accessories</td>
                    <td>1500</td>
                    <td>Adidas</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Freshwear</td>
                    <td>Clothing</td>
                    <td>2200</td>
                    <td>Zara</td>
                    <td>4.2</td>
                  </tr>
                  <tr>
                    <td>Techgear</td>
                    <td>Electronics</td>
                    <td>3500</td>
                    <td>Sony</td>
                    <td>4.7</td>
                  </tr>
                </tbody>
              </table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should filter rating using > operator",
              type: "query-validation",
              expectedKeywords: ["rating", ">", "4.0"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-2-3",
          title: "Get All Products based on Brand",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. While shopping online, we often search for the product or brand with a partial name over giving the exact name of the product. And, while applying filters, we tend to select if the price/rating is greater than a certain number over mentioning the exact number.\n is greater than a certain number over mentioning the exact numbe\n Comparison operators such as LIKE, equal to(=), greater than(>) help us fetch data for such queries.\n Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements.\n NOTE: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 900, "Puma", 4.8],
                ["Running Shoes", "Footwear", 2500, "Nike", 4.5],
                ["Sports Cap", "Accessories", 700, "Puma", 4.2],
                ["Bourbon Jeans", "Clothing", 1800, "Levis", 4.3],
                ["Bourbon Blue Jeans", "Clothing", 2000, "Wrangler", 4.4],
                ["Salted Chips", "Snacks", 50, "Lays", 4.1],
                ["Potato Chips Classic", "Snacks", 60, "Pringles", 4.6],
                ["Crunchy Chips", "Snacks", 45, "Bingo", 4.0],
                ["Blue Shirt", "Clothing", 1200, "Puma", 3.9],
                ["Flashgear", "Accessories", 1500, "Adidas", 4.5],
                ["Freshwear", "Clothing", 2200, "Zara", 4.2],
                ["Techgear", "Electronics", 3500, "Sony", 4.7],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p> 
              Get all details of products from the "Puma" brand.</p>              
         <div class="sql-table-desc">
                <div class="sql-table-caption">Table: products</div>
                <table>
  <thead>
    <tr>
      <th>name</th>
      <th>category</th>
      <th>price</th>
      <th>brand</th>
      <th>rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Black Shirt</td>
      <td>Clothing</td>
      <td>900</td>
      <td>Puma</td>
      <td>4.8</td>
    </tr>
    <tr>
      <td>Running Shoes</td>
      <td>Footwear</td>
      <td>2500</td>
      <td>Nike</td>
      <td>4.5</td>
    </tr>
    <tr>
      <td>Sports Cap</td>
      <td>Accessories</td>
      <td>700</td>
      <td>Puma</td>
      <td>4.2</td>
    </tr>
    <tr>
      <td>Bourbon Jeans</td>
      <td>Clothing</td>
      <td>1800</td>
      <td>Levis</td>
      <td>4.3</td>
    </tr>
    <tr>
      <td>Bourbon Blue Jeans</td>
      <td>Clothing</td>
      <td>2000</td>
      <td>Wrangler</td>
      <td>4.4</td>
    </tr>
    <tr>
      <td>Salted Chips</td>
      <td>Snacks</td>
      <td>50</td>
      <td>Lays</td>
      <td>4.1</td>
    </tr>
    <tr>
      <td>Potato Chips Classic</td>
      <td>Snacks</td>
      <td>60</td>
      <td>Pringles</td>
      <td>4.6</td>
    </tr>
    <tr>
      <td>Crunchy Chips</td>
      <td>Snacks</td>
      <td>45</td>
      <td>Bingo</td>
      <td>4.0</td>
    </tr>
    <tr>
      <td>Blue Shirt</td>
      <td>Clothing</td>
      <td>1200</td>
      <td>Puma</td>
      <td>3.9</td>
    </tr>
    <tr>
      <td>Flashgear</td>
      <td>Accessories</td>
      <td>1500</td>
      <td>Adidas</td>
      <td>4.5</td>
    </tr>
    <tr>
      <td>Freshwear</td>
      <td>Clothing</td>
      <td>2200</td>
      <td>Zara</td>
      <td>4.2</td>
    </tr>
    <tr>
      <td>Techgear</td>
      <td>Electronics</td>
      <td>3500</td>
      <td>Sony</td>
      <td>4.7</td>
    </tr>
  </tbody>
</table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "Product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter brand as 'Puma'",
              type: "query-validation",
              expectedKeywords: ["brand", "puma"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-2-4",
          title: "Get All Products of Jeans",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. While shopping online, we often search for the product or brand with a partial name over giving the exact name of the product. And, while applying filters, we tend to select if the price/rating is greater than a certain number over mentioning the exact number.\n is greater than a certain number over mentioning the exact numbe\n Comparison operators such as LIKE, equal to(=), greater than(>) help us fetch data for such queries.\n Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements.\n NOTE: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 900, "Puma", 4.8],
                ["Running Shoes", "Footwear", 2500, "Nike", 4.5],
                ["Sports Cap", "Accessories", 700, "Puma", 4.2],
                ["Bourbon Jeans", "Clothing", 1800, "Levis", 4.3],
                ["Bourbon Blue Jeans", "Clothing", 2000, "Wrangler", 4.4],
                ["Salted Chips", "Snacks", 50, "Lays", 4.1],
                ["Potato Chips Classic", "Snacks", 60, "Pringles", 4.6],
                ["Crunchy Chips", "Snacks", 45, "Bingo", 4.0],
                ["Blue Shirt", "Clothing", 1200, "Puma", 3.9],
                ["Flashgear", "Accessories", 1500, "Adidas", 4.5],
                ["Freshwear", "Clothing", 2200, "Zara", 4.2],
                ["Techgear", "Electronics", 3500, "Sony", 4.7],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p> 
              User would like to shop for "Jeans". A common pattern in all the jeans products is that their name ends with "Jeans". Help the user get the details of required products.</p>              
         <div class="sql-table-desc">
                <div class="sql-table-caption">Table: products</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>category</th>
                    <th>price</th>
                    <th>brand</th>
                    <th>rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Black Shirt</td>
                    <td>Clothing</td>
                    <td>900</td>
                    <td>Puma</td>
                    <td>4.8</td>
                  </tr>
                  <tr>
                    <td>Running Shoes</td>
                    <td>Footwear</td>
                    <td>2500</td>
                    <td>Nike</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Sports Cap</td>
                    <td>Accessories</td>
                    <td>700</td>
                    <td>Puma</td>
                    <td>4.2</td>
                  </tr>
                  <tr>
                    <td>Bourbon Jeans</td>
                    <td>Clothing</td>
                    <td>1800</td>
                    <td>Levis</td>
                    <td>4.3</td>
                  </tr>
                  <tr>
                    <td>Bourbon Blue Jeans</td>
                    <td>Clothing</td>
                    <td>2000</td>
                    <td>Wrangler</td>
                    <td>4.4</td>
                  </tr>
                  <tr>
                    <td>Salted Chips</td>
                    <td>Snacks</td>
                    <td>50</td>
                    <td>Lays</td>
                    <td>4.1</td>
                  </tr>
                  <tr>
                    <td>Potato Chips Classic</td>
                    <td>Snacks</td>
                    <td>60</td>
                    <td>Pringles</td>
                    <td>4.6</td>
                  </tr>
                  <tr>
                    <td>Crunchy Chips</td>
                    <td>Snacks</td>
                    <td>45</td>
                    <td>Bingo</td>
                    <td>4.0</td>
                  </tr>
                  <tr>
                    <td>Blue Shirt</td>
                    <td>Clothing</td>
                    <td>1200</td>
                    <td>Puma</td>
                    <td>3.9</td>
                  </tr>
                  <tr>
                    <td>Flashgear</td>
                    <td>Accessories</td>
                    <td>1500</td>
                    <td>Adidas</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Freshwear</td>
                    <td>Clothing</td>
                    <td>2200</td>
                    <td>Zara</td>
                    <td>4.2</td>
                  </tr>
                  <tr>
                    <td>Techgear</td>
                    <td>Electronics</td>
                    <td>3500</td>
                    <td>Sony</td>
                    <td>4.7</td>
                  </tr>
                </tbody>
              </table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should use WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use LIKE operator",
              type: "query-validation",
              expectedKeywords: ["like"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should search for names ending with 'Jeans'",
              type: "query-validation",
              expectedKeywords: ["%jeans"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          id: "sql-query-2-5",
          title: "Retrive all Details",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. While shopping online, we often search for the product or brand with a partial name over giving the exact name of the product. And, while applying filters, we tend to select if the price/rating is greater than a certain number over mentioning the exact number.\n is greater than a certain number over mentioning the exact numbe\n Comparison operators such as LIKE, equal to(=), greater than(>) help us fetch data for such queries.\n Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements.\n NOTE: Expected output format for all the queries, unless specified.",

          difficulty: "Medium",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 900, "Puma", 4.8],
                ["Running Shoes", "Footwear", 2500, "Nike", 4.5],
                ["Sports Cap", "Accessories", 700, "Puma", 4.2],
                ["Bourbon Small", "Food", 10, "Britannia", 3.9],
                ["Bourbon Special", "Food", 15, "Britannia", 4.6],
                ["Salted Chips", "Snacks", 50, "Lays", 4.1],
                ["Potato Chips Classic", "Snacks", 60, "Pringles", 4.6],
                ["Crunchy Chips", "Snacks", 45, "Bingo", 4.0],
                ["Blue Shirt", "Clothing", 1200, "Puma", 3.9],
                ["Flashgear", "Accessories", 1500, "Adidas", 4.5],
                ["Freshwear", "Clothing", 2200, "Zara", 4.2],
                ["Techgear", "Electronics", 3500, "Sony", 4.7],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p> 
              User wants to purchase "Bourbon Small", "Bourbon With Extra Cookies", or products from bourbon. Retrieve all details of such products accordingly.<br/> HINT: All the product whosenamestarts with "Bourbon".</p>              
         <div class="sql-table-desc">
                <div class="sql-table-caption">Table: products</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>category</th>
                    <th>price</th>
                    <th>brand</th>
                    <th>rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Black Shirt</td>
                    <td>Clothing</td>
                    <td>900</td>
                    <td>Puma</td>
                    <td>4.8</td>
                  </tr>
                  <tr>
                    <td>Running Shoes</td>
                    <td>Footwear</td>
                    <td>2500</td>
                    <td>Nike</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Sports Cap</td>
                    <td>Accessories</td>
                    <td>700</td>
                    <td>Puma</td>
                    <td>4.2</td>
                  </tr>
                  <tr>
                  <td>Bourbon Small</td>
                  <td>Food</td>
                  <td>10</td>
                  <td>Britannia</td>
                  <td>3.9</td>
                </tr>
                <tr>
                  <td>Bourbon Special</td>
                  <td>Food</td>
                  <td>15</td>
                  <td>Britannia</td>
                  <td>4.6</td>
                </tr>
                <tr>
                  <td>Bourbon With Extra Cookies</td>
                  <td>Food</td>
                  <td>30</td>
                  <td>Britannia</td>
                  <td>4.4</td>
                </tr>
                  <tr>
                    <td>Salted Chips</td>
                    <td>Snacks</td>
                    <td>50</td>
                    <td>Lays</td>
                    <td>4.1</td>
                  </tr>
                  <tr>
                    <td>Potato Chips Classic</td>
                    <td>Snacks</td>
                    <td>60</td>
                    <td>Pringles</td>
                    <td>4.6</td>
                  </tr>
                  <tr>
                    <td>Crunchy Chips</td>
                    <td>Snacks</td>
                    <td>45</td>
                    <td>Bingo</td>
                    <td>4.0</td>
                  </tr>
                  <tr>
                    <td>Blue Shirt</td>
                    <td>Clothing</td>
                    <td>1200</td>
                    <td>Puma</td>
                    <td>3.9</td>
                  </tr>
                  <tr>
                    <td>Flashgear</td>
                    <td>Accessories</td>
                    <td>1500</td>
                    <td>Adidas</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Freshwear</td>
                    <td>Clothing</td>
                    <td>2200</td>
                    <td>Zara</td>
                    <td>4.2</td>
                  </tr>
                  <tr>
                    <td>Techgear</td>
                    <td>Electronics</td>
                    <td>3500</td>
                    <td>Sony</td>
                    <td>4.7</td>
                  </tr>
                </tbody>
              </table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use LIKE operator",
              type: "query-validation",
              expectedKeywords: ["like"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should filter names starting with 'Bourbon'",
              type: "query-validation",
              expectedKeywords: ["bourbon%"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should NOT use '=' operator for exact match",
              type: "query-validation",
              forbiddenKeywords: ["= 'bourbon'"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          id: "sql-query-2-6",
          title: "Products of Chips",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. While shopping online, we often search for the product or brand with a partial name over giving the exact name of the product. And, while applying filters, we tend to select if the price/rating is greater than a certain number over mentioning the exact number.\n is greater than a certain number over mentioning the exact numbe\n Comparison operators such as LIKE, equal to(=), greater than(>) help us fetch data for such queries.\n Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements.\n NOTE: Expected output format for all the queries, unless specified.",

          difficulty: "Medium",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 900, "Puma", 4.8],
                ["Running Shoes", "Footwear", 2500, "Nike", 4.5],
                ["Sports Cap", "Accessories", 700, "Puma", 4.2],
                ["Bourbon Small", "Food", 10, "Britannia", 3.9],
                ["Bourbon Special", "Food", 15, "Britannia", 4.6],
                ["Salted Chips", "Snacks", 50, "Lays", 4.1],
                ["Potato Chips Classic", "Snacks", 60, "Pringles", 4.6],
                ["Crunchy Chips", "Snacks", 45, "Bingo", 4.0],
                ["Blue Shirt", "Clothing", 1200, "Puma", 3.9],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p> 
              List all the "Chips" in the database.
NOTE: Consider the products that have "Chips" in thename.</p>              
         <div class="sql-table-desc">
                <div class="sql-table-caption">Table: products</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>category</th>
                    <th>price</th>
                    <th>brand</th>
                    <th>rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Black Shirt</td>
                    <td>Clothing</td>
                    <td>900</td>
                    <td>Puma</td>
                    <td>4.8</td>
                  </tr>
                  <tr>
                    <td>Running Shoes</td>
                    <td>Footwear</td>
                    <td>2500</td>
                    <td>Nike</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Sports Cap</td>
                    <td>Accessories</td>
                    <td>700</td>
                    <td>Puma</td>
                    <td>4.2</td>
                  </tr>
                  <tr>
                  <td>Bourbon Small</td>
                  <td>Food</td>
                  <td>10</td>
                  <td>Britannia</td>
                  <td>3.9</td>
                </tr>
                <tr>
                  <td>Bourbon Special</td>
                  <td>Food</td>
                  <td>15</td>
                  <td>Britannia</td>
                  <td>4.6</td>
                </tr>
                <tr>
                  <td>Bourbon With Extra Cookies</td>
                  <td>Food</td>
                  <td>30</td>
                  <td>Britannia</td>
                  <td>4.4</td>
                </tr>
                  <tr>
                    <td>Salted Chips</td>
                    <td>Snacks</td>
                    <td>50</td>
                    <td>Lays</td>
                    <td>4.1</td>
                  </tr>
                  <tr>
                    <td>Potato Chips Classic</td>
                    <td>Snacks</td>
                    <td>60</td>
                    <td>Pringles</td>
                    <td>4.6</td>
                  </tr>
                  <tr>
                    <td>Crunchy Chips</td>
                    <td>Snacks</td>
                    <td>45</td>
                    <td>Bingo</td>
                    <td>4.0</td>
                  </tr>
                  <tr>
                    <td>Blue Shirt</td>
                    <td>Clothing</td>
                    <td>1200</td>
                    <td>Puma</td>
                    <td>3.9</td>
                  </tr>
                  <tr>
                    <td>Flashgear</td>
                    <td>Accessories</td>
                    <td>1500</td>
                    <td>Adidas</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Freshwear</td>
                    <td>Clothing</td>
                    <td>2200</td>
                    <td>Zara</td>
                    <td>4.2</td>
                  </tr>
                  <tr>
                    <td>Techgear</td>
                    <td>Electronics</td>
                    <td>3500</td>
                    <td>Sony</td>
                    <td>4.7</td>
                  </tr>
                </tbody>
              </table>
              </div> 
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use LIKE operator",
              type: "query-validation",
              expectedKeywords: ["like"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should filter products containing 'Chips'",
              type: "query-validation",
              expectedKeywords: ["%chips%"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Practice 4
    {
      id: "sql-coding-practice-4",
      title: "SQL Coding Practice 4",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-4-1",
          title: "Get Products belongs to clothing",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get all the details of products that belong to "Clothing" category and price less than 700.


              </p>
        
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
        
             <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter category as 'Clothing'",
              type: "query-validation",
              expectedKeywords: ["category", "clothing"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should use AND condition",
              type: "query-validation",
              expectedKeywords: ["and"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should filter price less than 700",
              type: "query-validation",
              expectedKeywords: ["price", "<", "700"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-4-2",
          title: "Get Products belongs to brand",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get all the details of products that belong to "Denim" brand with rating greater than 4.</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
                <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter brand as 'Denim'",
              type: "query-validation",
              expectedKeywords: ["brand", "denim"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should use AND condition",
              type: "query-validation",
              expectedKeywords: ["and"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should filter rating greater than 4",
              type: "query-validation",
              expectedKeywords: ["rating", ">", "4"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-4-3",
          title: "Get Products based on Rating",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get all the best-rated products with price less than or equal to 1000.
              NOTE: Assume that the products with rating greater than 4.0 as best rated products.</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
                <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter rating greater than 4",
              type: "query-validation",
              expectedKeywords: ["rating", ">", "4"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should use AND condition",
              type: "query-validation",
              expectedKeywords: ["and"],
              visible: true,
            },
            {
              id: 8,
              description:
                "Query should filter price less than or equal to 1000",
              type: "query-validation",
              expectedKeywords: ["price", "<=", "1000"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-4-4",
          title: "Get Products based on Conditions",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get all the products that satisfy all the given conditions

              <br/> rating is above 3.6 and
              <br/>price is less than 1000 and
              <br/>belongs to "Puma" brand</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
                <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter rating greater than 3.6",
              type: "query-validation",
              expectedKeywords: ["rating", ">", "3.6"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should filter price less than 1000",
              type: "query-validation",
              expectedKeywords: ["price", "<", "1000"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should filter brand as 'Puma'",
              type: "query-validation",
              expectedKeywords: ["brand", "puma"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should use AND condition for all filters",
              type: "query-validation",
              expectedKeywords: ["and"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-4-5",
          title: "Get Products any Brand",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get all the products that belong to any of the following brands.
              
              <br/>Puma
              <br/>Denim
              <br/>Nike</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
                <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter brand as 'Puma'",
              type: "query-validation",
              expectedKeywords: ["brand", "puma"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should filter brand as 'Denim'",
              type: "query-validation",
              expectedKeywords: ["denim"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should filter brand as 'Nike'",
              type: "query-validation",
              expectedKeywords: ["nike"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should use OR condition or IN operator",
              type: "query-validation",
              expectedKeywords: ["or"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-4-6",
          title: "Get Products based in Condition",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get all the details of products that follow any of the below conditions

              <br/>brand is "Redmi" with a rating greater than 4
              <br/>products that belong to the "OnePlus" brand.</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
                <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter brand as 'Redmi'",
              type: "query-validation",
              expectedKeywords: ["brand", "redmi"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should filter rating greater than 4",
              type: "query-validation",
              expectedKeywords: ["rating", ">", "4"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should use AND condition",
              type: "query-validation",
              expectedKeywords: ["and"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should use OR condition",
              type: "query-validation",
              expectedKeywords: ["or"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should filter brand as 'OnePlus'",
              type: "query-validation",
              expectedKeywords: ["brand", "oneplus"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          id: "sql-query-4-7",
          title: "Get Cakes",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get the cakes from any of the following brands with a rating greater than 4.0.

              <br/>Cadbury
              <br/>Britannia
              <br/>NOTE: Consider the products that have "Cake" in name as cakes.</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
                <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter products with 'Cake' in name",
              type: "query-validation",
              expectedKeywords: ["name", "like", "cake"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should filter brand as Cadbury",
              type: "query-validation",
              expectedKeywords: ["cadbury"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should filter brand as Britannia",
              type: "query-validation",
              expectedKeywords: ["britannia"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should filter rating greater than 4",
              type: "query-validation",
              expectedKeywords: ["rating", ">", "4"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should use AND condition",
              type: "query-validation",
              expectedKeywords: ["and"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          id: "sql-query-4-8",
          title: "Bases on Condition",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              
   Get all the shirts available in any of the following brands, excluding the black color shirts.

<br/>Puma
<br/>Nike
<br/>Levi's
<br/>Note: 
You can assume that:
<br/>1. Products containing “Shirt” in the name are considered as shirts.
<br/>2. Black color shirts contain "Black" in their names.

</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
                <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter products containing 'Shirt'",
              type: "query-validation",
              expectedKeywords: ["name", "like", "%shirt%"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should exclude black shirts",
              type: "query-validation",
              expectedKeywords: ["not", "black"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should filter brand as Puma",
              type: "query-validation",
              expectedKeywords: ["puma"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should filter brand as Nike",
              type: "query-validation",
              expectedKeywords: ["nike"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should filter brand as Levi's",
              type: "query-validation",
              expectedKeywords: ["levi"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should use AND condition",
              type: "query-validation",
              expectedKeywords: ["and"],
              visible: true,
            },
            {
              id: 12,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Practice 5
    {
      id: "sql-coding-practice-5",
      title: "SQL Coding Practice 5",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-5-1",
          title: "Get Products belongs to clothing",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get all the details of products that belong to "Clothing" category and price less than 700.


              </p>
        
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
        
             <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter category as 'Clothing'",
              type: "query-validation",
              expectedKeywords: ["category", "clothing"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should use AND condition",
              type: "query-validation",
              expectedKeywords: ["and"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should filter price less than 700",
              type: "query-validation",
              expectedKeywords: ["price", "<", "700"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Practice 6
    {
      id: "sql-coding-practice-6",
      title: "SQL Coding Practice 6",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-6-1",
          title: "Total Score",
          description:
            "The database consists of player_match_details table that stores the information of player's details like name, match, score, year, number of fours and sixes scored. In the table: The score, fours, and sixes may have NULL values if the player has not played the match. A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: "",
          },

          // ✅ CORRECT RAW TABLE DATA
          tableData: {
            player_match_details: {
              columns: ["name", "match", "score", "year", "fours", "sixes"],
              rows: [
                ["Ram", "Match1", 100, 2023, 10, 2],
                ["Ram", "Match2", 121, 2023, 12, 3],
                ["Lokesh", "Match1", 90, 2023, 8, 1],
                ["Lokesh", "Match2", 96, 2023, 7, 2],
                ["Joseph", "Match1", 50, 2023, 4, 1],
                ["Joseph", "Match2", 66, 2023, 6, 2],
                ["David", "Match1", 45, 2023, 3, 1],
                ["David", "Match2", 60, 2023, 5, 1],
                ["Stark", "Match1", 75, 2023, 7, 3],
                ["Shyam", "Match1", 75, 2023, 6, 2],
                ["Viraj", "Match1", 53, 2023, 5, 1],
                ["Ramesh", "Match1", 9, 2023, 1, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
                Get the total score of each player.<br/>
                NOTE: Output must contain rows in the descending order of total_score
              </p>
              <p class="desc-que-blue">Expected Output Format :</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player_match_details</div>
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>total_score</th>
                    </tr>
                  </thead>
                  <tr><td>--</td><td>--</td></tr> <tr><td>--</td><td>--</td></tr>
                </table>
              </div>
            </div>
          `,

          // ✅ CORRECTED TEST CASES
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              visible: true,
            },
            {
              id: 2,
              description: "Query should use SUM(score)",
              type: "query-validation",
              visible: true,
            },
            {
              id: 3,
              description: "SUM(score) must be aliased as total_score",
              type: "query-validation",
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              visible: true,
            },
            {
              id: 5,
              description: "Table name should be player_match_details",
              type: "query-validation",
              visible: true,
            },
            {
              id: 6,
              description: "Query should contain GROUP BY name",
              type: "query-validation",
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain ORDER BY total_score DESC",
              type: "query-validation",
              visible: true,
            },
            {
              id: 8,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-6-2",
          title: "Get half centuries scored",
          description:
            "The database consists of player_match_details table that stores the information of player's details like name, match, score, year, number of fours and sixes scored. In the table: The score, fours, and sixes may have NULL values if the player has not played the match. A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: "",
          },

          tableData: {
            player_match_details: {
              columns: ["name", "match", "score", "year", "fours", "sixes"],
              rows: [
                ["Ram", "Match1", 100, 2023, 10, 2],
                ["Ram", "Match2", 121, 2023, 12, 3],
                ["Ram", "Match3", 127, 2023, 12, 4],
                ["Lokesh", "Match1", 90, 2023, 8, 1],
                ["Lokesh", "Match2", 96, 2023, 7, 2],
                ["Joseph", "Match1", 50, 2023, 4, 1],
                ["Joseph", "Match2", 66, 2023, 6, 2],
                ["David", "Match1", 45, 2023, 3, 1],
                ["David", "Match2", 60, 2023, 5, 1],
                ["Stark", "Match1", 75, 2023, 7, 3],
                ["Shyam", "Match1", 75, 2023, 6, 2],
                ["Viraj", "Match1", 53, 2023, 5, 1],
                ["Ramesh", "Match1", 9, 2023, 1, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get the number of half centuries scored by each player.<br/> NOTE: Output must contain rows in the descending order of half_centuries
              </p>
              <p class="desc-que-blue">Expected Output Format :</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player_match_details</div>
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>half_centuries</th>
                    </tr>
                  </thead>
                  <tr><td>--</td><td>--</td></tr> 
                </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain COUNT function",
              type: "query-validation",
              expectedKeywords: ["count"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should alias COUNT as half_centuries",
              type: "query-validation",
              expectedKeywords: ["half_centuries"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 5,
              description: "Table name should be player_match_details",
              type: "query-validation",
              expectedKeywords: ["player_match_details"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter scores between 50 and 99",
              type: "query-validation",
              expectedKeywords: ["score", ">=", "50"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain GROUP BY clause",
              type: "query-validation",
              expectedKeywords: ["group", "by"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should group by name",
              type: "query-validation",
              expectedKeywords: ["group by name"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should contain ORDER BY clause",
              type: "query-validation",
              expectedKeywords: ["order", "by"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should sort in descending order",
              type: "query-validation",
              expectedKeywords: ["desc"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-6-3",
          title: "Total number of 4's hit",
          description:
            "The database consists of player_match_details table that stores the information of player's details like name, match, score, year, number of fours and sixes scored. In the table: The score, fours, and sixes may have NULL values if the player has not played the match. A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: "",
          },

          tableData: {
            player_match_details: {
              columns: ["name", "match", "score", "year", "fours", "sixes"],
              rows: [
                ["Ram", "Match1", 100, 2023, 10, 2],
                ["Ram", "Match2", 121, 2023, 12, 3],
                ["Ram", "Match3", 127, 2023, 12, 4],
                ["Lokesh", "Match1", 90, 2023, 8, 1],
                ["Lokesh", "Match2", 96, 2023, 7, 2],
                ["Joseph", "Match1", 50, 2023, 4, 1],
                ["Joseph", "Match2", 66, 2023, 6, 2],
                ["David", "Match1", 45, 2023, 3, 1],
                ["David", "Match2", 60, 2023, 5, 1],
                ["Stark", "Match1", 75, 2023, 7, 3],
                ["Shyam", "Match1", 75, 2023, 6, 2],
                ["Viraj", "Match1", 53, 2023, 5, 1],
                ["Ramesh", "Match1", 9, 2023, 1, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get the total number of 4's hit by each player as no_of_fours.

          NOTE: Output must contain rows in the descending order of no_of_fours


              </p>
              <p class="desc-que-blue">Expected Output Format :</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player_match_details</div>
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>no_of_fours</th>
                    </tr>
                  </thead>
                  <tr><td>--</td><td>--</td></tr> 
                </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain SUM function",
              type: "query-validation",
              expectedKeywords: ["sum"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use SUM(fours)",
              type: "query-validation",
              expectedKeywords: ["sum", "fours"],
              visible: true,
            },
            {
              id: 4,
              description: "SUM(fours) should be aliased as no_of_fours",
              type: "query-validation",
              expectedKeywords: ["no_of_fours"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 6,
              description: "Table name should be 'player_match_details'",
              type: "query-validation",
              expectedTableName: "player_match_details",
              expectedKeywords: ["player_match_details"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain GROUP BY clause",
              type: "query-validation",
              expectedKeywords: ["group", "by"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should group by name",
              type: "query-validation",
              expectedKeywords: ["group by name"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should contain ORDER BY clause",
              type: "query-validation",
              expectedKeywords: ["order", "by"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should sort in descending order",
              type: "query-validation",
              expectedKeywords: ["desc"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-6-4",
          title: "Highest score of each player",
          description:
            "The database consists of player_match_details table that stores the information of player's details like name, match, score, year, number of fours and sixes scored. In the table: The score, fours, and sixes may have NULL values if the player has not played the match. A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: "",
          },

          tableData: {
            player_match_details: {
              columns: ["name", "match", "score", "year", "fours", "sixes"],
              rows: [
                ["Ram", "Match1", 100, 2023, 10, 2],
                ["Ram", "Match2", 121, 2023, 12, 3],
                ["Ram", "Match3", 127, 2023, 12, 4],
                ["Lokesh", "Match1", 90, 2023, 8, 1],
                ["Lokesh", "Match2", 96, 2023, 7, 2],
                ["Joseph", "Match1", 50, 2023, 4, 1],
                ["Joseph", "Match2", 66, 2023, 6, 2],
                ["David", "Match1", 45, 2023, 3, 1],
                ["David", "Match2", 60, 2023, 5, 1],
                ["Stark", "Match1", 75, 2023, 7, 3],
                ["Shyam", "Match1", 75, 2023, 6, 2],
                ["Viraj", "Match1", 53, 2023, 5, 1],
                ["Ramesh", "Match1", 9, 2023, 1, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get the highest score of every player as max_score.

              NOTE: Output must contain rows in the descending order ofmax_scoreof the player. </p>
              <p class="desc-que-blue">Expected Output Format :</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player_match_details</div>
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>max_score</th>
                    </tr>
                  </thead>
                  <tr><td>--</td><td>--</td></tr> 
                </table>
              </div>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedRegex: "^\\s*select\\b",
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain MAX function",
              type: "query-validation",
              expectedRegex: "\\bmax\\s*\\(",
              visible: true,
            },
            {
              id: 3,
              description: "Query should use MAX(score)",
              type: "query-validation",
              expectedRegex: "max\\s*\\(\\s*score\\s*\\)",
              visible: true,
            },
            {
              id: 4,
              description: "MAX(score) should be aliased as max_score",
              type: "query-validation",
              expectedRegex: "max\\s*\\(\\s*score\\s*\\)\\s+as\\s+max_score",
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedRegex: "\\bfrom\\b",
              visible: true,
            },
            {
              id: 6,
              description: "Table name should be 'player_match_details'",
              type: "query-validation",
              expectedRegex: "\\bfrom\\s+player_match_details\\b",
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain GROUP BY clause",
              type: "query-validation",
              expectedRegex: "\\bgroup\\s+by\\b",
              visible: true,
            },
            {
              id: 8,
              description: "Query should group by name",
              type: "query-validation",
              expectedRegex: "group\\s+by\\s+name",
              visible: true,
            },
            {
              id: 9,
              description: "Query should contain ORDER BY clause",
              type: "query-validation",
              expectedRegex: "\\border\\s+by\\b",
              visible: true,
            },
            {
              id: 10,
              description: "Query should sort in descending order",
              type: "query-validation",
              expectedRegex: "order\\s+by\\s+max_score\\s+desc",
              visible: true,
            },
            {
              id: 11,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              expectedRegex: ";\\s*$",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-6-5",
          title: "Get player name",
          description:
            "The database consists of player_match_details table that stores the information of player's details like name, match, score, year, number of fours and sixes scored. In the table: The score, fours, and sixes may have NULL values if the player has not played the match. A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: "",
          },

          tableData: {
            player_match_details: {
              columns: ["name", "match", "score", "year", "fours", "sixes"],
              rows: [
                ["Ram", "Match1", 100, 2023, 10, 2],
                ["Ram", "Match2", 121, 2023, 12, 3],
                ["Ram", "Match3", 127, 2023, 12, 4],
                ["Lokesh", "Match1", 90, 2023, 8, 1],
                ["Lokesh", "Match2", 96, 2023, 7, 2],
                ["Joseph", "Match1", 50, 2023, 4, 1],
                ["Joseph", "Match2", 66, 2023, 6, 2],
                ["David", "Match1", 45, 2023, 3, 1],
                ["David", "Match2", 60, 2023, 5, 1],
                ["Stark", "Match1", 75, 2023, 7, 3],
                ["Shyam", "Match1", 75, 2023, 6, 2],
                ["Viraj", "Match1", 53, 2023, 5, 1],
                ["Ramesh", "Match1", 9, 2023, 1, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get player name and the total number of matches played as no_of_matches by each player in the year 2023.<br/> NOTE: Output must contain rows in the descending order of no_of_matches of each player. </p>
              <p class="desc-que-blue">Expected Output Format :</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player_match_details</div>
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>no_of_matches</th>
                    </tr>
                  </thead>
                  <tr><td>--</td><td>--</td></tr> 
                </table>
              </div>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain COUNT function",
              type: "query-validation",
              expectedKeywords: ["count"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use COUNT(*)",
              type: "query-validation",
              expectedKeywords: ["count", "*"],
              visible: true,
            },
            {
              id: 4,
              description: "COUNT(*) should be aliased as no_of_matches",
              type: "query-validation",
              expectedKeywords: ["no_of_matches"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 6,
              description: "Table name should be 'player_match_details'",
              type: "query-validation",
              expectedTableName: "player_match_details",
              expectedKeywords: ["player_match_details"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should filter year 2023 using WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where", "year", "2023"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should contain GROUP BY clause",
              type: "query-validation",
              expectedKeywords: ["group", "by"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should group by name",
              type: "query-validation",
              expectedKeywords: ["group by name"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should contain ORDER BY clause",
              type: "query-validation",
              expectedKeywords: ["order", "by"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should sort in descending order",
              type: "query-validation",
              expectedKeywords: ["desc"],
              visible: true,
            },
            {
              id: 12,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-6-6",
          title: "Year wise performance",
          description:
            "The database consists of player_match_details table that stores the information of player's details like name, match, score, year, number of fours and sixes scored. In the table: The score, fours, and sixes may have NULL values if the player has not played the match. A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: "",
          },

          tableData: {
            player_match_details: {
              columns: ["name", "match", "score", "year", "fours", "sixes"],
              rows: [
                ["Ram", "Match1", 100, 2023, 10, 2],
                ["Ram", "Match2", 121, 2024, 12, 3],
                ["Ram", "Match3", 127, 2023, 12, 4],
                ["Lokesh", "Match1", 90, 2024, 8, 1],
                ["Lokesh", "Match2", 96, 2023, 7, 2],
                ["Joseph", "Match1", 50, 2024, 4, 1],
                ["Joseph", "Match2", 66, 2023, 6, 2],
                ["David", "Match1", 45, 2024, 3, 1],
                ["David", "Match2", 60, 2023, 5, 1],
                ["Stark", "Match1", 75, 2023, 7, 3],
                ["Shyam", "Match1", 75, 2023, 6, 2],
                ["Viraj", "Match1", 53, 2023, 5, 1],
                ["Ramesh", "Match1", 9, 2023, 1, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get the year-wise performance, i.e., no_of_matches and runs_scored by each player.NOTE: Output must contain rows in the ascending order of name & year </p>
              <p class="desc-que-blue">Expected Output Format :</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player_match_details</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>year</th>
                    <th>no_of_matches</th>
                    <th>runs_scored</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain COUNT function",
              type: "query-validation",
              expectedKeywords: ["count"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use COUNT(*)",
              type: "query-validation",
              expectedKeywords: ["count", "*"],
              visible: true,
            },
            {
              id: 4,
              description: "COUNT(*) should be aliased as no_of_matches",
              type: "query-validation",
              expectedKeywords: ["no_of_matches"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain SUM function",
              type: "query-validation",
              expectedKeywords: ["sum"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use SUM(score)",
              type: "query-validation",
              expectedKeywords: ["sum(score)"],
              visible: true,
            },
            {
              id: 7,
              description: "SUM(score) should be aliased as runs_scored",
              type: "query-validation",
              expectedKeywords: ["runs_scored"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 9,
              description: "Table name should be 'player_match_details'",
              type: "query-validation",
              expectedTableName: "player_match_details",
              expectedKeywords: ["player_match_details"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should contain GROUP BY clause",
              type: "query-validation",
              expectedKeywords: ["group", "by"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should group by name and year",
              type: "query-validation",
              expectedKeywords: ["group by name, year"],
              visible: true,
            },
            {
              id: 12,
              description: "Query should contain ORDER BY clause",
              type: "query-validation",
              expectedKeywords: ["order", "by"],
              visible: true,
            },
            {
              id: 13,
              description:
                "Query should sort by name and year in ascending order",
              type: "query-validation",
              expectedKeywords: ["order by name", "year"],
              visible: true,
            },
            {
              id: 14,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          id: "sql-query-6-7",
          title: "Score greater than 50",
          description:
            "The database consists of player_match_details table that stores the information of player's details like name, match, score, year, number of fours and sixes scored. In the table: The score, fours, and sixes may have NULL values if the player has not played the match. A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: "",
          },

          tableData: {
            player_match_details: {
              columns: ["name", "match", "score", "year", "fours", "sixes"],
              rows: [
                ["Ram", "Match1", 100, 2023, 10, 2],
                ["Ram", "Match2", 121, 2024, 12, 3],
                ["Ram", "Match3", 127, 2023, 12, 4],
                ["Lokesh", "Match1", 90, 2024, 8, 1],
                ["Lokesh", "Match2", 96, 2023, 7, 2],
                ["Joseph", "Match1", 50, 2024, 4, 1],
                ["Joseph", "Match2", 66, 2023, 6, 2],
                ["David", "Match1", 45, 2024, 3, 1],
                ["David", "Match2", 60, 2023, 5, 1],
                ["Stark", "Match1", 75, 2023, 7, 3],
                ["Shyam", "Match1", 75, 2023, 6, 2],
                ["Viraj", "Match1", 53, 2023, 5, 1],
                ["Ramesh", "Match1", 9, 2023, 1, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get the details of all players whose average score is greater than 50 , along with the number of sixes they have scored.<br/>NOTE: Output must contain rows in the ascending order ofnameof the player.</p>
              <p class="desc-que-blue">Expected Output Format :</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player_match_details</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>avg_score</th>
                    <th>total_sixes</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain AVG function",
              type: "query-validation",
              expectedKeywords: ["avg"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use AVG(score)",
              type: "query-validation",
              expectedKeywords: ["avg(score)"],
              visible: true,
            },
            {
              id: 4,
              description: "AVG(score) should be aliased as avg_score",
              type: "query-validation",
              expectedKeywords: ["avg_score"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain SUM function",
              type: "query-validation",
              expectedKeywords: ["sum"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use SUM(sixes)",
              type: "query-validation",
              expectedKeywords: ["sum(sixes)"],
              visible: true,
            },
            {
              id: 7,
              description: "SUM(sixes) should be aliased as total_sixes",
              type: "query-validation",
              expectedKeywords: ["total_sixes"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 9,
              description: "Table name should be 'player_match_details'",
              type: "query-validation",
              expectedTableName: "player_match_details",
              expectedKeywords: ["player_match_details"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should contain GROUP BY clause",
              type: "query-validation",
              expectedKeywords: ["group", "by"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should group by name",
              type: "query-validation",
              expectedKeywords: ["group by name"],
              visible: true,
            },
            {
              id: 12,
              description: "Query should contain HAVING clause",
              type: "query-validation",
              expectedKeywords: ["having"],
              visible: true,
            },
            {
              id: 13,
              description: "HAVING clause should filter avg_score > 50",
              type: "query-validation",
              expectedKeywords: ["avg_score >", "50"],
              visible: true,
            },
            {
              id: 14,
              description: "Query should contain ORDER BY clause",
              type: "query-validation",
              expectedKeywords: ["order", "by"],
              visible: true,
            },
            {
              id: 15,
              description: "Query should sort by name in ascending order",
              type: "query-validation",
              expectedKeywords: ["order by name asc"],
              visible: true,
            },
            {
              id: 16,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-6-8",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Scored more than 50 in 2 matches",
          description:
            "The database consists of player_match_details table that stores the information of player's details like name, match, score, year, number of fours and sixes scored. In the table: The score, fours, and sixes may have NULL values if the player has not played the match. A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: "",
          },

          tableData: {
            player_match_details: {
              columns: ["name", "match", "score", "year", "fours", "sixes"],
              rows: [
                ["Ram", "Match1", 100, 2023, 10, 2],
                ["Ram", "Match2", 121, 2024, 12, 3],
                ["Ram", "Match3", 127, 2023, 12, 4],
                ["Lokesh", "Match1", 90, 2024, 8, 1],
                ["Lokesh", "Match2", 96, 2023, 7, 2],
                ["Joseph", "Match1", 50, 2024, 4, 1],
                ["Joseph", "Match2", 66, 2023, 6, 2],
                ["David", "Match1", 45, 2024, 3, 1],
                ["David", "Match2", 60, 2023, 5, 1],
                ["Stark", "Match1", 75, 2023, 7, 3],
                ["Shyam", "Match1", 75, 2023, 6, 2],
                ["Viraj", "Match1", 53, 2023, 5, 1],
                ["Ramesh", "Match1", 9, 2023, 1, 0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Get the player wise total number of matches where the players scored more than 50 and in at least 2 matches.<br/> NOTE: Output must contain rows in the ascending order ofnameof the player.

     .</p>
              <p class="desc-que-blue">Expected Output Format :</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player_match_details</div>
                <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>no_of_matches</th>
                    </thead>
                <tbody>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          `,
          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain COUNT function",
              type: "query-validation",
              expectedKeywords: ["count"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use COUNT(*)",
              type: "query-validation",
              expectedKeywords: ["count", "*"],
              visible: true,
            },
            {
              id: 4,
              description: "COUNT(*) should be aliased as no_of_matches",
              type: "query-validation",
              expectedKeywords: ["no_of_matches"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 6,
              description: "Table name should be 'player_match_details'",
              type: "query-validation",
              expectedTableName: "player_match_details",
              expectedKeywords: ["player_match_details"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain GROUP BY clause",
              type: "query-validation",
              expectedKeywords: ["group", "by"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should group by name",
              type: "query-validation",
              expectedKeywords: ["group by name"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should contain HAVING clause",
              type: "query-validation",
              expectedKeywords: ["having"],
              visible: true,
            },
            {
              id: 10,
              description: "HAVING clause should filter no_of_matches >= 2",
              type: "query-validation",
              expectedKeywords: ["no_of_matches >=", "2"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should contain ORDER BY clause",
              type: "query-validation",
              expectedKeywords: ["order", "by"],
              visible: true,
            },
            {
              id: 12,
              description: "Query should sort by name in ascending order",
              type: "query-validation",
              expectedKeywords: ["order by name asc"],
              visible: true,
            },
            {
              id: 13,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Practice 7
    {
      id: "sql-coding-practice-7",
      title: "SQL Coding Practice 7",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-7-1",
          title: "Boundaries scored",
          description:
            "In this practice set, you will get thorough with using SQL expressions, functions, case statements and set operations, that can be used perform much finer analysis.\nThe database consists of a player table that stores the information of name, match date, team, score, match, number of balls, number of fours and sixes scored.\n NOTE: A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.Let’s get started!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: [
                "name",
                "match_date",
                "team",
                "score",
                "match",
                "no_of_balls",
                "fours",
                "sixes",
              ],
              rows: [
                ["Ravi", "2006-01-10", "CSK", 92, "CSK vs RCB", 69, 8, 3],
                ["Ravi", "2006-02-12", "RCB", 35, "RCB vs SRH", 34, 4, 1],
                ["Ravi", "2006-03-15", "SRH", 50, "SRH vs MI", 49, 5, 1],
                ["Ravi", "2006-04-18", "MI", 40, "MI vs RR", 57, 3, 1],

                ["Sai", "2006-01-11", "MI", 80, "MI vs RCB", 70, 6, 2],
                ["Sai", "2006-02-14", "RR", 45, "RR vs SRH", 40, 4, 1],
                ["Sai", "2006-03-20", "SRH", 50, "SRH vs RCB", 50, 5, 1],

                ["Jadhav", "2006-01-15", "CSK", 54, "CSK vs SRH", 40, 4, 1],
                ["Jadhav", "2006-02-17", "CSK", 50, "CSK vs MI", 40, 4, 1],

                ["Manoj", "2006-01-18", "MI", 68, "MI vs RCB", 60, 5, 2],
                ["Manoj", "2006-02-20", "RR", 45, "RR vs CSK", 72, 4, 1],

                ["Raghav", "2006-01-21", "SRH", 36, "SRH vs MI", 25, 3, 1],

                ["Karthik", "2006-01-25", "MI", 32, "MI vs RR", 28, 3, 0],

                ["Sanjay", "2006-01-28", "SRH", 45, "SRH vs RR", 60, 4, 0],

                ["Madhu", "2006-01-30", "MI", 40, "MI vs RCB", 55, 3, 0],

                ["Vijay", "2006-02-02", "RR", 92, "RR vs SRH", 92, 8, 2],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Calculate the overall number of boundaries scored by each batsman in the tournament

             <br/> number of boundaries = fours + sixes
              
             <br/> NOTE: Output must contain rows in the descending order of number_of_boundaries and name.

              </p>
              <p class="desc-que-blue">Expected Output Format :</p>
        
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player</div>
        
             <table>
            <thead>
            <tr>
            <th>name</th>
            <th>number_of_boundaries</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--</td></tr>
            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should calculate fours + sixes",
              type: "query-validation",
              expectedKeywords: ["fours", "+", "sixes"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use SUM function",
              type: "query-validation",
              expectedKeywords: ["sum"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should use GROUP BY name",
              type: "query-validation",
              expectedKeywords: ["group by", "name"],
              visible: true,
            },
            {
              id: 5,
              description:
                "Query should sort by number_of_boundaries in descending order",
              type: "query-validation",
              expectedKeywords: ["order by", "number_of_boundaries", "desc"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should also sort by name in descending order",
              type: "query-validation",
              expectedKeywords: ["name", "desc"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-7-2",
          title: "Highest scores",
          description:
            "In this practice set, you will get thorough with using SQL expressions, functions, case statements and set operations, that can be used perform much finer analysis.\nThe database consists of a player table that stores the information of name, match date, team, score, match, number of balls, number of fours and sixes scored.\n NOTE: A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.Let’s get started!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: [
                "name",
                "match_date",
                "team",
                "score",
                "match",
                "no_of_balls",
                "fours",
                "sixes",
              ],
              rows: [
                ["Ravi", "2006-01-10", "CSK", 92, "CSK vs RCB", 69, 8, 3],
                ["Ravi", "2006-02-12", "RCB", 35, "RCB vs SRH", 34, 4, 1],
                ["Ravi", "2006-03-15", "SRH", 50, "SRH vs MI", 49, 5, 1],
                ["Ravi", "2006-04-18", "MI", 40, "MI vs RR", 57, 3, 1],

                ["Sai", "2006-01-11", "MI", 80, "MI vs RCB", 70, 6, 2],
                ["Sai", "2006-02-14", "RR", 45, "RR vs SRH", 40, 4, 1],
                ["Sai", "2006-03-20", "SRH", 50, "SRH vs RCB", 50, 5, 1],

                ["Jadhav", "2006-01-15", "CSK", 54, "CSK vs SRH", 40, 4, 1],
                ["Jadhav", "2006-02-17", "CSK", 50, "CSK vs MI", 40, 4, 1],

                ["Manoj", "2006-01-18", "MI", 68, "MI vs RCB", 60, 5, 2],
                ["Manoj", "2006-02-20", "RR", 45, "RR vs CSK", 72, 4, 1],

                ["Raghav", "2006-01-21", "SRH", 36, "SRH vs MI", 25, 3, 1],

                ["Karthik", "2006-01-25", "MI", 32, "MI vs RR", 28, 3, 0],

                ["Sanjay", "2006-01-28", "SRH", 45, "SRH vs RR", 60, 4, 0],

                ["Madhu", "2006-01-30", "MI", 40, "MI vs RCB", 55, 3, 0],

                ["Vijay", "2006-02-02", "RR", 92, "RR vs SRH", 92, 8, 2],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get the highest score of each player who played in the year 2006.

              <br/>NOTE: Output must contain rows in the descending order of highest_score.

              </p>
             
              <p class="desc-que-blue">Expected Output Format :</p>
        
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player</div>
        
             <table>
            <thead>
            <tr>
            <th>name</th>
            <th>highest_score</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--</td></tr>
            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should use MAX function",
              type: "syntax-validation",
              expectedKeywords: ["max"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should filter year 2006",
              type: "syntax-validation",
              expectedKeywords: ["2006"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should group by name",
              type: "syntax-validation",
              expectedKeywords: ["group by name"],
              visible: true,
            },
            {
              id: 5,
              description:
                "Query should order by highest_score in descending order",
              type: "syntax-validation",
              expectedKeywords: ["order by", "desc"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should alias MAX(score) as highest_score",
              type: "syntax-validation",
              expectedKeywords: ["highest_score"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-7-3",
          title: "Calculate strike rate",
          description:
            "In this practice set, you will get thorough with using SQL expressions, functions, case statements and set operations, that can be used perform much finer analysis.\nThe database consists of a player table that stores the information of name, match date, team, score, match, number of balls, number of fours and sixes scored.\n NOTE: A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.Let’s get started!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: [
                "name",
                "match_date",
                "team",
                "score",
                "match",
                "no_of_balls",
                "fours",
                "sixes",
              ],
              rows: [
                ["Ravi", "2006-01-10", "CSK", 92, "CSK vs RCB", 69, 8, 3],
                ["Ravi", "2006-02-12", "RCB", 35, "RCB vs SRH", 34, 4, 1],
                ["Ravi", "2006-03-15", "SRH", 50, "SRH vs MI", 49, 5, 1],
                ["Ravi", "2006-04-18", "MI", 40, "MI vs RR", 57, 3, 1],

                ["Sai", "2006-01-11", "MI", 80, "MI vs RCB", 70, 6, 2],
                ["Sai", "2006-02-14", "RR", 45, "RR vs SRH", 40, 4, 1],
                ["Sai", "2006-03-20", "SRH", 50, "SRH vs RCB", 50, 5, 1],

                ["Jadhav", "2006-01-15", "CSK", 54, "CSK vs SRH", 40, 4, 1],
                ["Jadhav", "2006-02-17", "CSK", 50, "CSK vs MI", 40, 4, 1],

                ["Manoj", "2006-01-18", "MI", 68, "MI vs RCB", 60, 5, 2],
                ["Manoj", "2006-02-20", "RR", 45, "RR vs CSK", 72, 4, 1],

                ["Raghav", "2006-01-21", "SRH", 36, "SRH vs MI", 25, 3, 1],

                ["Karthik", "2006-01-25", "MI", 32, "MI vs RR", 28, 3, 0],

                ["Sanjay", "2006-01-28", "SRH", 45, "SRH vs RR", 60, 4, 0],

                ["Madhu", "2006-01-30", "MI", 40, "MI vs RCB", 55, 3, 0],

                ["Vijay", "2006-02-02", "RR", 92, "RR vs SRH", 92, 8, 2],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Calculate the strike rate of all the players in every match.
              
              <br/>strike_rate = (score of the player / no_of_balls)*100

              <br/>NOTE: Strike rate in the output should be a float value.
              <br/>In SQL, when an integer is divided by another integer, it results in another integer value, i.e, 3/2 = 1 which is an integer instead of 1.5 which is of float type. So we need to convert either the numerator or denominator to float to get more accurate results, i.e 3.0/2 or 3/2.0, to get 1.5 as output.
              <br/>Let's apply the same while calculating the strike_rate to get accurate results.



              </p>
              <div class="Note-container">
                  <div class="icon-note">
                    <h6>
                      <i class="bi bi-journal-text"></i>Note
                    </h6>
                  </div>
                  <p>
                  <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                   
                   
                    The use of parentheses allows us to modify the default operator precedence, ensuring operations inside the braces are executed first.
                    <li>(a/b) * 100 : The parentheses prioritize the division operation (a/b), ensuring it's calculated first before multiplying the result by 100.</li>
                    <li>(a * 100)/b : The parentheses prioritize the multiplication operation (a * 100), ensuring it's calculated first before dividing the result by b.</li>
                  </ul>
                </p>
                
                  </div>
                  <p>NOTE: Output must contain rows in the descending order of strike_rate</p>
              <p class="desc-que-blue">Expected Output Format :</p>
        
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player</div>
        
             <table>
            <thead>
            <tr>
            <th>name</th>
            <th>match</th>
            <th>strike_rate</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--</td><td>--</td></tr>
            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should select name, match and strike_rate",
              type: "syntax-validation",
              expectedKeywords: ["name", "match", "strike_rate"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should calculate strike rate using division",
              type: "syntax-validation",
              expectedKeywords: ["/"],
              visible: false,
            },
            {
              id: 4,
              description: "Query should multiply by 100",
              type: "syntax-validation",
              expectedKeywords: ["100"],
              visible: false,
            },
            {
              id: 5,
              description: "Query should convert score to FLOAT using CAST",
              type: "syntax-validation",
              expectedKeywords: ["cast", "float"],
              visible: false,
            },
            {
              id: 6,
              description: "Query should use ORDER BY clause",
              type: "syntax-validation",
              expectedKeywords: ["order by"],
              visible: true,
            },
            {
              id: 7,
              description:
                "Query should sort results in descending order of strike_rate",
              type: "syntax-validation",
              expectedKeywords: ["desc"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-7-4",
          title: "performance report",
          description:
            "In this practice set, you will get thorough with using SQL expressions, functions, case statements and set operations, that can be used perform much finer analysis.\nThe database consists of a player table that stores the information of name, match date, team, score, match, number of balls, number of fours and sixes scored.\n NOTE: A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.Let’s get started!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: [
                "name",
                "match_date",
                "team",
                "score",
                "match",
                "no_of_balls",
                "fours",
                "sixes",
              ],
              rows: [
                ["Ravi", "2006-01-10", "CSK", 92, "CSK vs RCB", 69, 8, 3],
                ["Ravi", "2006-02-12", "RCB", 35, "RCB vs SRH", 34, 4, 1],
                ["Ravi", "2006-03-15", "SRH", 50, "SRH vs MI", 49, 5, 1],
                ["Ravi", "2006-04-18", "MI", 40, "MI vs RR", 57, 3, 1],

                ["Sai", "2006-01-11", "MI", 80, "MI vs RCB", 70, 6, 2],
                ["Sai", "2006-02-14", "RR", 45, "RR vs SRH", 40, 4, 1],
                ["Sai", "2006-03-20", "SRH", 50, "SRH vs RCB", 50, 5, 1],

                ["Jadhav", "2006-01-15", "CSK", 54, "CSK vs SRH", 40, 4, 1],
                ["Jadhav", "2006-02-17", "CSK", 50, "CSK vs MI", 40, 4, 1],

                ["Manoj", "2006-01-18", "MI", 68, "MI vs RCB", 60, 5, 2],
                ["Manoj", "2006-02-20", "RR", 45, "RR vs CSK", 72, 4, 1],

                ["Raghav", "2006-01-21", "SRH", 36, "SRH vs MI", 25, 3, 1],

                ["Karthik", "2006-01-25", "MI", 32, "MI vs RR", 28, 3, 0],

                ["Sanjay", "2006-01-28", "SRH", 45, "SRH vs RR", 60, 4, 0],

                ["Madhu", "2006-01-30", "MI", 40, "MI vs RCB", 55, 3, 0],

                ["Vijay", "2006-02-02", "RR", 92, "RR vs SRH", 92, 8, 2],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              Let's generate a performance report for all the players who played in the year 2006.

              <br/> Apply the below logic to grade the player's performance. </p>
              
              <div class="sql-table-desc">
               
        
                <table>
                <thead>
                  <tr>
                    <th>Total Score</th>
                    <th>Performance Report</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>>= 150</td>
                    <td>GOOD</td>
                  </tr>
                  <tr>
                    <td>100 <= score < 150</td>
                    <td>AVERAGE</td>
                  </tr>
                  <tr>
                    <td>< 100</td>
                    <td>BELOW AVERAGE</td>
                  </tr>
                </tbody>
              </table>
              </div>
            
            <div class="Note-container">
            <div class="icon-note">
              <h6>
                <i class="bi bi-journal-text"></i>Note
              </h6>
            </div>
            <p>
            NOTE: Output must be in the descending order of total_score
          </p>
          
            </div>
              <p class="desc-que-blue">Expected Output Format :</p>
        
              <div class="sql-table-desc">
              <table>
            <thead>
            <tr>
            <th>name</th>
            <th>total_score</th>
            <th>badge</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--</td><td>--</td></tr>
            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description:
                "Query should select name, total_score and badge columns",
              type: "syntax-validation",
              expectedKeywords: ["name", "total_score", "badge"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should calculate SUM(score) as total_score",
              type: "syntax-validation",
              expectedKeywords: ["sum", "score", "total_score"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should filter records for the year 2006",
              type: "syntax-validation",
              expectedKeywords: ["where", "2006"],
              visible: true,
            },
            {
              id: 5,
              description:
                "Query should use CASE statement for performance grading",
              type: "syntax-validation",
              expectedKeywords: ["case", "when", "then", "end"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should group results by player name",
              type: "syntax-validation",
              expectedKeywords: ["group by", "name"],
              visible: true,
            },
            {
              id: 7,
              description:
                "Results should be ordered by total_score in descending order",
              type: "syntax-validation",
              expectedKeywords: ["order by", "total_score", "desc"],
              visible: true,
            },
          ],
        },
        // {
        //   accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

        //   id: "sql-query-7-5",
        //   title: "Based on strike rate",
        //   description:
        //     "In this practice set, you will get thorough with using SQL expressions, functions, case statements and set operations, that can be used perform much finer analysis.\nThe database consists of a player table that stores the information of name, match date, team, score, match, number of balls, number of fours and sixes scored.\n NOTE: A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.Let’s get started!",

        //   difficulty: "Medium",
        //   score: 45,
        //   type: "sql",

        //   defaultCode: {
        //     sql: ``,
        //   },

        //   tableData: {
        //     player: {
        //       columns: [
        //         "name",
        //         "match_date",
        //         "team",
        //         "score",
        //         "match",
        //         "no_of_balls",
        //         "fours",
        //         "sixes",
        //       ],
        //       rows: [
        //         ["Ravi", "2006-01-10", "CSK", 92, "CSK vs RCB", 69, 8, 3],
        //         ["Ravi", "2006-02-12", "RCB", 35, "RCB vs SRH", 34, 4, 1],
        //         ["Ravi", "2006-03-15", "SRH", 50, "SRH vs MI", 49, 5, 1],
        //         ["Ravi", "2006-04-18", "MI", 40, "MI vs RR", 57, 3, 1],

        //         ["Sai", "2006-01-11", "MI", 80, "MI vs RCB", 70, 6, 2],
        //         ["Sai", "2006-02-14", "RR", 45, "RR vs SRH", 40, 4, 1],
        //         ["Sai", "2006-03-20", "SRH", 50, "SRH vs RCB", 50, 5, 1],

        //         ["Jadhav", "2006-01-15", "CSK", 54, "CSK vs SRH", 40, 4, 1],
        //         ["Jadhav", "2006-02-17", "CSK", 50, "CSK vs MI", 40, 4, 1],

        //         ["Manoj", "2006-01-18", "MI", 68, "MI vs RCB", 60, 5, 2],
        //         ["Manoj", "2006-02-20", "RR", 45, "RR vs CSK", 72, 4, 1],

        //         ["Raghav", "2006-01-21", "SRH", 36, "SRH vs MI", 25, 3, 1],

        //         ["Karthik", "2006-01-25", "MI", 32, "MI vs RR", 28, 3, 0],

        //         ["Sanjay", "2006-01-28", "SRH", 45, "SRH vs RR", 60, 4, 0],

        //         ["Madhu", "2006-01-30", "MI", 40, "MI vs RCB", 55, 3, 0],

        //         ["Vijay", "2006-02-02", "RR", 92, "RR vs SRH", 92, 8, 2],
        //       ],
        //     },
        //   },

        //   descriptionDetails: `
        //     <div class="desc-question-details">
        //       <p class="desc-que-blue">Question</p>
        //       <p>
        //       For each player, get the number of matches in which their strike rate is less than 80.0, and the number of matches with strike rate greater than or equal to 80.0.

        //       <br/>strike_rate = (score of the player / no_of_balls)*100</p>
        //       <div class="Note-container">
        //           <div class="icon-note">
        //             <h6>
        //               <i class="bi bi-journal-text"></i>Note
        //             </h6>
        //           </div>
        //           <p>
        //           <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
        //           <li>Strike rate should always be a float value.</li>
        //             <li>Output must be in the ascending order of name</li>
        //           </ul>
        //         </p>
        //         </div>

        //       <p class="desc-que-blue">Expected Output Format :</p>

        //       <div class="sql-table-desc">

        //      <table>
        //     <thead>
        //     <tr>
        //     <th>name</th>
        //     <th>strike_rate_less_than_80	</th>
        //     <th>strike_rate_greater_than_or_equal_to_80</th>
        //     </tr>
        //     </thead>
        //     <tbody>
        //     <tr><td>--</td><td>--</td><td>--</td></tr>
        //     </tbody>
        //     </table>
        //       </div>
        //     </div>
        //   `,

        //   testCases: [
        //     {
        //       id: 1,
        //       description: "Query should start with SELECT",
        //       type: "syntax-validation",
        //       expectedKeywords: ["select"],
        //       visible: true,
        //     },
        //     {
        //       id: 2,
        //       description: "Query should select from player table",
        //       type: "syntax-validation",
        //       expectedKeywords: ["from", "player"],
        //       visible: true,
        //     },
        //     {
        //       id: 3,
        //       description: "Query should select name column",
        //       type: "syntax-validation",
        //       expectedKeywords: ["name"],
        //       visible: true,
        //     },
        //     {
        //       id: 4,
        //       description:
        //         "Query should calculate strike rate using score and no_of_balls",
        //       type: "syntax-validation",
        //       expectedKeywords: ["score", "no_of_balls", "100"],
        //       visible: true,
        //     },
        //     {
        //       id: 5,
        //       description: "Query should use CAST to convert score to FLOAT",
        //       type: "syntax-validation",
        //       expectedKeywords: ["cast", "float"],
        //       visible: true,
        //     },
        //     {
        //       id: 6,
        //       description: "Query should use CASE statement",
        //       type: "syntax-validation",
        //       expectedKeywords: ["case", "when", "then", "end"],
        //       visible: true,
        //     },
        //     {
        //       id: 7,
        //       description: "Query should count matches with strike rate < 80.0",
        //       type: "syntax-validation",
        //       expectedKeywords: ["< 80.0", "strike_rate_less_than_80"],
        //       visible: true,
        //     },
        //     {
        //       id: 8,
        //       description:
        //         "Query should count matches with strike rate >= 80.0",
        //       type: "syntax-validation",
        //       expectedKeywords: [
        //         ">= 80.0",
        //         "strike_rate_greater_than_or_equal_to_80",
        //       ],
        //       visible: true,
        //     },
        //     {
        //       id: 9,
        //       description: "Query should use COUNT function",
        //       type: "syntax-validation",
        //       expectedKeywords: ["count"],
        //       visible: true,
        //     },
        //     {
        //       id: 10,
        //       description: "Query should group results by name",
        //       type: "syntax-validation",
        //       expectedKeywords: ["group by", "name"],
        //       visible: true,
        //     },
        //     {
        //       id: 11,
        //       description:
        //         "Query should order results by name in ascending order",
        //       type: "syntax-validation",
        //       expectedKeywords: ["order by", "name", "asc"],
        //       visible: true,
        //     },
        //     {
        //       id: 12,
        //       description: "Query should define alias strike_rate_less_than_80",
        //       type: "syntax-validation",
        //       expectedKeywords: ["as strike_rate_less_than_80"],
        //       visible: true,
        //     },
        //     {
        //       id: 13,
        //       description:
        //         "Query should define alias strike_rate_greater_than_or_equal_to_80",
        //       type: "syntax-validation",
        //       expectedKeywords: ["as strike_rate_greater_than_or_equal_to_80"],
        //       visible: true,
        //     },
        //   ],
        // },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-7-6",
          title: "CSK and RCB",
          description:
            "In this practice set, you will get thorough with using SQL expressions, functions, case statements and set operations, that can be used perform much finer analysis.\nThe database consists of a player table that stores the information of name, match date, team, score, match, number of balls, number of fours and sixes scored.\n NOTE: A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.Let’s get started!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: [
                "name",
                "match_date",
                "team",
                "score",
                "match",
                "no_of_balls",
                "fours",
                "sixes",
              ],
              rows: [
                ["Ravi", "2006-01-10", "CSK", 92, "CSK vs RCB", 69, 8, 3],
                ["Ravi", "2006-02-12", "RCB", 35, "RCB vs SRH", 34, 4, 1],
                ["Ravi", "2006-03-15", "SRH", 50, "SRH vs MI", 49, 5, 1],
                ["Ravi", "2006-04-18", "MI", 40, "MI vs RR", 57, 3, 1],

                ["Sai", "2006-01-11", "MI", 80, "MI vs RCB", 70, 6, 2],
                ["Sai", "2006-02-14", "RR", 45, "RR vs SRH", 40, 4, 1],
                ["Sai", "2006-03-20", "SRH", 50, "SRH vs RCB", 50, 5, 1],

                ["Jadhav", "2006-01-15", "CSK", 54, "CSK vs SRH", 40, 4, 1],
                ["Jadhav", "2006-02-17", "CSK", 50, "CSK vs MI", 40, 4, 1],

                ["Manoj", "2006-01-18", "MI", 68, "MI vs RCB", 60, 5, 2],
                ["Manoj", "2006-02-20", "RR", 45, "RR vs CSK", 72, 4, 1],

                ["Raghav", "2006-01-21", "SRH", 36, "SRH vs MI", 25, 3, 1],

                ["Karthik", "2006-01-25", "MI", 32, "MI vs RR", 28, 3, 0],

                ["Sanjay", "2006-01-28", "SRH", 45, "SRH vs RR", 60, 4, 0],

                ["Madhu", "2006-01-30", "MI", 40, "MI vs RCB", 55, 3, 0],

                ["Vijay", "2006-02-02", "RR", 92, "RR vs SRH", 92, 8, 2],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>
              
          Get all the player/s who played for both CSK and RCB.</p>
              <div class="Note-container">
                  <div class="icon-note">
                    <h6>
                      <i class="bi bi-journal-text"></i>Note
                    </h6>
                  </div>
                  <p>
                  Output must be in the ascending order of name </p>
                </div>
                 
              <p class="desc-que-blue">Expected Output Format :</p>
        
              <div class="sql-table-desc">
               
             <table>
            <thead>
            <tr>
            <th>name</th></tr>
            </thead>
            <tbody>
            <tr><td>--</td></tr>
            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should select name column",
              type: "syntax-validation",
              expectedKeywords: ["select name"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain FROM player",
              type: "syntax-validation",
              expectedKeywords: ["from player"],
              visible: true,
            },
            {
              id: 4,
              description: 'Query should filter played_for_team = "CSK"',
              type: "syntax-validation",
              expectedKeywords: ['played_for_team = "CSK"'],
              visible: true,
            },
            {
              id: 5,
              description: "Query should use INTERSECT operator",
              type: "syntax-validation",
              expectedKeywords: ["intersect"],
              visible: true,
            },
            {
              id: 6,
              description: 'Query should filter played_for_team = "RCB"',
              type: "syntax-validation",
              expectedKeywords: ['played_for_team = "RCB"'],
              visible: true,
            },
            {
              id: 7,
              description: "Query should use ORDER BY name ASC",
              type: "syntax-validation",
              expectedKeywords: ["order by name asc"],
              visible: true,
            },
          ],
        },
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-7-7",
          title: "SRH",
          description:
            "In this practice set, you will get thorough with using SQL expressions, functions, case statements and set operations, that can be used perform much finer analysis.\nThe database consists of a player table that stores the information of name, match date, team, score, match, number of balls, number of fours and sixes scored.\n NOTE: A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.Let’s get started!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: [
                "name",
                "match_date",
                "team",
                "score",
                "match",
                "no_of_balls",
                "fours",
                "sixes",
              ],
              rows: [
                ["Ravi", "2006-01-10", "CSK", 92, "CSK vs RCB", 69, 8, 3],
                ["Ravi", "2006-02-12", "RCB", 35, "RCB vs SRH", 34, 4, 1],
                ["Ravi", "2006-03-15", "SRH", 50, "SRH vs MI", 49, 5, 1],
                ["Ravi", "2006-04-18", "MI", 40, "MI vs RR", 57, 3, 1],

                ["Sai", "2006-01-11", "MI", 80, "MI vs RCB", 70, 6, 2],
                ["Sai", "2006-02-14", "RR", 45, "RR vs SRH", 40, 4, 1],
                ["Sai", "2006-03-20", "SRH", 50, "SRH vs RCB", 50, 5, 1],

                ["Jadhav", "2006-01-15", "CSK", 54, "CSK vs SRH", 40, 4, 1],
                ["Jadhav", "2006-02-17", "CSK", 50, "CSK vs MI", 40, 4, 1],

                ["Manoj", "2006-01-18", "MI", 68, "MI vs RCB", 60, 5, 2],
                ["Manoj", "2006-02-20", "RR", 45, "RR vs CSK", 72, 4, 1],

                ["Raghav", "2006-01-21", "SRH", 36, "SRH vs MI", 25, 3, 1],

                ["Karthik", "2006-01-25", "MI", 32, "MI vs RR", 28, 3, 0],

                ["Sanjay", "2006-01-28", "SRH", 45, "SRH vs RR", 60, 4, 0],

                ["Madhu", "2006-01-30", "MI", 40, "MI vs RCB", 55, 3, 0],

                ["Vijay", "2006-02-02", "RR", 92, "RR vs SRH", 92, 8, 2],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get all the player/s who played only for SRH.</p>
              <div class="Note-container">
              <div class="icon-note">
                <h6>
                  <i class="bi bi-journal-text"></i>Note
                </h6>
              </div>
              <p>
              <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>Names in the output must be in capital letters.</li>
                <li>Output must be in the ascending order of name</li>
              </ul>
            </p>
            </div>
                </div>
                 
              <p class="desc-que-blue">Expected Output Format :</p>
        
              <div class="sql-table-desc">
               
             <table>
            <thead>
            <tr>
            <th>name</th></tr>
            </thead>
            <tbody>
            <tr><td>--</td></tr>
            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should select name column",
              type: "syntax-validation",
              expectedKeywords: ["select name"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain FROM player",
              type: "syntax-validation",
              expectedKeywords: ["from player"],
              visible: true,
            },
            {
              id: 4,
              description: 'Query should filter played_for_team = "SRH"',
              type: "syntax-validation",
              expectedKeywords: ['played_for_team = "SRH"'],
              visible: true,
            },
            {
              id: 5,
              description:
                "Query should ensure players played only for SRH using GROUP BY",
              type: "syntax-validation",
              expectedKeywords: ["group by name"],
              visible: true,
            },
            {
              id: 6,
              description:
                "Query should use HAVING clause to ensure only SRH team",
              type: "syntax-validation",
              expectedKeywords: ["having"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should convert names to capital letters",
              type: "syntax-validation",
              expectedKeywords: ["upper(name)"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should use ORDER BY name ASC",
              type: "syntax-validation",
              expectedKeywords: ["order by name asc"],
              visible: true,
            },
          ],
        },
        // {
        //   accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

        //   id: "sql-query-7-8",
        //   title: "SRH, CSK, or MI",
        //   description:
        //     "In this practice set, you will get thorough with using SQL expressions, functions, case statements and set operations, that can be used perform much finer analysis.\nThe database consists of a player table that stores the information of name, match date, team, score, match, number of balls, number of fours and sixes scored.\n NOTE: A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.Let’s get started!",

        //   difficulty: "Medium",
        //   score: 45,
        //   type: "sql",

        //   defaultCode: {
        //     sql: ``,
        //   },

        //   tableData: {
        //     player: {
        //       columns: [
        //         "name",
        //         "match_date",
        //         "team",
        //         "score",
        //         "match",
        //         "no_of_balls",
        //         "fours",
        //         "sixes",
        //       ],
        //       rows: [
        //         ["Ravi", "2006-01-10", "CSK", 92, "CSK vs RCB", 69, 8, 3],
        //         ["Ravi", "2006-02-12", "RCB", 35, "RCB vs SRH", 34, 4, 1],
        //         ["Ravi", "2006-03-15", "SRH", 50, "SRH vs MI", 49, 5, 1],
        //         ["Ravi", "2006-04-18", "MI", 40, "MI vs RR", 57, 3, 1],

        //         ["Sai", "2006-01-11", "MI", 80, "MI vs RCB", 70, 6, 2],
        //         ["Sai", "2006-02-14", "RR", 45, "RR vs SRH", 40, 4, 1],
        //         ["Sai", "2006-03-20", "SRH", 50, "SRH vs RCB", 50, 5, 1],

        //         ["Jadhav", "2006-01-15", "CSK", 54, "CSK vs SRH", 40, 4, 1],
        //         ["Jadhav", "2006-02-17", "CSK", 50, "CSK vs MI", 40, 4, 1],

        //         ["Manoj", "2006-01-18", "MI", 68, "MI vs RCB", 60, 5, 2],
        //         ["Manoj", "2006-02-20", "RR", 45, "RR vs CSK", 72, 4, 1],

        //         ["Raghav", "2006-01-21", "SRH", 36, "SRH vs MI", 25, 3, 1],

        //         ["Karthik", "2006-01-25", "MI", 32, "MI vs RR", 28, 3, 0],

        //         ["Sanjay", "2006-01-28", "SRH", 45, "SRH vs RR", 60, 4, 0],

        //         ["Madhu", "2006-01-30", "MI", 40, "MI vs RCB", 55, 3, 0],

        //         ["Vijay", "2006-02-02", "RR", 92, "RR vs SRH", 92, 8, 2],
        //       ],
        //     },
        //   },

        //   descriptionDetails: `
        //     <div class="desc-question-details">
        //       <p class="desc-que-blue">Question</p>
        //       <p>Get all the player/s who played either for SRH, CSK, or MI.</p>
        //       <div class="Note-container">
        //       <div class="icon-note">
        //         <h6>
        //           <i class="bi bi-journal-text"></i>Note
        //         </h6>
        //       </div>
        //       <p>
        //       <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
        //       <li>Get unique players.</li>
        //       <li>Output must be in the ascending order of name</li>
        //       </ul>
        //     </p>
        //     </div>
        //         </div>

        //       <p class="desc-que-blue">Expected Output Format :</p>

        //       <div class="sql-table-desc">

        //      <table>
        //     <thead>
        //     <tr>
        //     <th>name</th></tr>
        //     </thead>
        //     <tbody>
        //     <tr><td>--</td></tr>
        //     </tbody>
        //     </table>
        //       </div>
        //     </div>
        //   `,

        //   testCases: [
        //     {
        //       id: 1,
        //       description: "Query should start with SELECT",
        //       type: "syntax-validation",
        //       expectedKeywords: ["select"],
        //       visible: true,
        //     },
        //     {
        //       id: 2,
        //       description: "Query should select name column",
        //       type: "syntax-validation",
        //       expectedKeywords: ["select name"],
        //       visible: true,
        //     },
        //     {
        //       id: 3,
        //       description: "Query should contain FROM player",
        //       type: "syntax-validation",
        //       expectedKeywords: ["from player"],
        //       visible: true,
        //     },
        //     {
        //       id: 4,
        //       description: "Query should filter team for SRH, CSK, or MI",
        //       type: "syntax-validation",
        //       expectedKeywords: ["where team in"],
        //       visible: true,
        //     },
        //     {
        //       id: 5,
        //       description: "Query should return unique players",
        //       type: "syntax-validation",
        //       expectedKeywords: ["distinct"],
        //       visible: true,
        //     },
        //     {
        //       id: 6,
        //       description: "Query should convert names to uppercase",
        //       type: "syntax-validation",
        //       expectedKeywords: ["upper(name)"],
        //       visible: true,
        //     },
        //     {
        //       id: 7,
        //       description: "Query should use ORDER BY name ASC",
        //       type: "syntax-validation",
        //       expectedKeywords: ["order by name asc"],
        //       visible: true,
        //     },
        //   ],
        // },
        // {
        //   accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
        //   id: "sql-query-7-9",
        //   title: "Highest and lowest scores",
        //   description:
        //     "In this practice set, you will get thorough with using SQL expressions, functions, case statements and set operations, that can be used perform much finer analysis.\nThe database consists of a player table that stores the information of name, match date, team, score, match, number of balls, number of fours and sixes scored.\n NOTE: A single player can participate in multiple matches in a year. So, there can be multiple entries for each player.Let’s get started!",

        //   difficulty: "Medium",
        //   score: 45,
        //   type: "sql",

        //   defaultCode: {
        //     sql: ``,
        //   },

        //   tableData: {
        //     player: {
        //       columns: [
        //         "name",
        //         "match_date",
        //         "team",
        //         "score",
        //         "match",
        //         "no_of_balls",
        //         "fours",
        //         "sixes",
        //       ],
        //       rows: [
        //         ["Ravi", "2006-01-10", "CSK", 92, "CSK vs RCB", 69, 8, 3],
        //         ["Ravi", "2006-02-12", "RCB", 35, "RCB vs SRH", 34, 4, 1],
        //         ["Ravi", "2006-03-15", "SRH", 50, "SRH vs MI", 49, 5, 1],
        //         ["Ravi", "2006-04-18", "MI", 40, "MI vs RR", 57, 3, 1],

        //         ["Sai", "2006-01-11", "MI", 80, "MI vs RCB", 70, 6, 2],
        //         ["Sai", "2006-02-14", "RR", 45, "RR vs SRH", 40, 4, 1],
        //         ["Sai", "2006-03-20", "SRH", 50, "SRH vs RCB", 50, 5, 1],

        //         ["Jadhav", "2006-01-15", "CSK", 54, "CSK vs SRH", 40, 4, 1],
        //         ["Jadhav", "2006-02-17", "CSK", 50, "CSK vs MI", 40, 4, 1],

        //         ["Manoj", "2006-01-18", "MI", 68, "MI vs RCB", 60, 5, 2],
        //         ["Manoj", "2006-02-20", "RR", 45, "RR vs CSK", 72, 4, 1],

        //         ["Raghav", "2006-01-21", "SRH", 36, "SRH vs MI", 25, 3, 1],

        //         ["Karthik", "2006-01-25", "MI", 32, "MI vs RR", 28, 3, 0],

        //         ["Sanjay", "2006-01-28", "SRH", 45, "SRH vs RR", 60, 4, 0],

        //         ["Madhu", "2006-01-30", "MI", 40, "MI vs RCB", 55, 3, 0],

        //         ["Vijay", "2006-02-02", "RR", 92, "RR vs SRH", 92, 8, 2],
        //       ],
        //     },
        //   },

        //   descriptionDetails: `
        //     <div class="desc-question-details">
        //       <p class="desc-que-blue">Question</p>
        //       <p>Fetch the name, highest and lowest scores of player/s for the matches in which strike rate is greater than 50.0.</p>

        //       <p class="desc-que-blue">Expected Output Format :</p>

        //       <div class="sql-table-desc">

        //      <table>
        //     <thead>
        //     <tr><th>name</th><th>highest_score</th><th>lowest_score</th></tr>
        //     </thead>
        //     <tbody>
        //     <tr><td>--</td>
        //     <td>--</td>
        //     <td>--</td></tr>
        //     </tbody>
        //     </table>
        //       </div>
        //     </div>
        //   `,

        //   testcases: [
        //     {
        //       id: 1,
        //       description: "Query should start with SELECT",
        //       type: "syntax-validation",
        //       expectedKeywords: ["select"],
        //       visible: true,
        //     },
        //     {
        //       id: 2,
        //       description:
        //         "Query should select name, MAX(score) as highest_score, and MIN(score) as lowest_score",
        //       type: "syntax-validation",
        //       expectedKeywords: [
        //         "select name",
        //         "max(score) as highest_score",
        //         "min(score) as lowest_score",
        //       ],
        //       visible: true,
        //     },
        //     {
        //       id: 3,
        //       description: "Query should contain FROM player",
        //       type: "syntax-validation",
        //       expectedKeywords: ["from player"],
        //       visible: true,
        //     },
        //     {
        //       id: 4,
        //       description:
        //         "Query should filter only matches where strike rate > 50.0",
        //       type: "syntax-validation",
        //       expectedKeywords: ["where", "/ no_of_balls", "> 50"],
        //       visible: true,
        //     },
        //     {
        //       id: 5,
        //       description: "Query should group results by name",
        //       type: "syntax-validation",
        //       expectedKeywords: ["group by name"],
        //       visible: true,
        //     },
        //     {
        //       id: 6,
        //       description:
        //         "Output should have columns: name, highest_score, lowest_score",
        //       type: "output-validation",
        //       expectedColumns: ["name", "highest_score", "lowest_score"],
        //       visible: true,
        //     },
        //   ],
        // },
      ],
    },
    // SQL Practice 8
    {
      id: "sql-Assignment-1",
      title: "SQL Coding Practice 8",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-5-1",
          title: "Get Products belongs to clothing",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. On such platforms, users often search for products by appling multiple conditions at once.For example, user could ask for shoes from Puma brand, that have ratings greater than 4.0 (and price less than 5000).With logical operators, we can perform queries based on multiple conditions. Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements. Note: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            product: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 600, "Puma", 4.8],
                ["Black T-Shirt", "Clothing", 600, "Roadster", 4.2],
                ["Blue T-Shirt", "Clothing", 600, "Nike", 4.7],
                ["Black Jeans", "Clothing", 750, "Denim", 4.5],
                ["Blue Shirt", "Clothing", 750, "Denim", 3.8],
                ["Blue Jeans", "Clothing", 800, "Puma", 3.6],
                ["Blue Shirt", "Clothing", 1000, "Puma", 4.3],
                ["White Shirt", "Clothing", 700, "Denim", 4.3],
                ["White T-Shirt", "Clothing", 700, "Levi's", 4.0],
                ["OnePlus 6T", "Smartphone", 32990, "OnePlus", 4.5],
                ["Redmi K20", "Smartphone", 24999, "Redmi", 4.1],
                ["Strawberry Cake", "Food", 60, "Cadbury", 4.1],
                ["Strawberry Cake", "Food", 10, "Britannia", 4.6],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Get all the details of products that belong to "Clothing" category and price less than 700.


              </p>
        
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: product</div>
        
             <table>
            <thead>
            <tr>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>brand</th>
            <th>rating</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>Black Shirt</td><td>Clothing</td><td>600</td><td>Puma</td><td>4.8</td></tr>
            <tr><td>Black T-Shirt</td><td>Clothing</td><td>600</td><td>Roadster</td><td>4.2</td></tr>
            <tr><td>Blue T-Shirt</td><td>Clothing</td><td>600</td><td>Nike</td><td>4.7</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>
            <tr><td>--</td><td>--<td>--</td><td>--</td><td>--</td></tr>

            </tbody>
            </table>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with SELECT",
              type: "syntax-validation",
              expectedKeywords: ["select"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should contain FROM keyword",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Table name should be 'product'",
              type: "query-validation",
              expectedTableName: "product",
              expectedKeywords: ["product"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select all columns using *",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain WHERE clause",
              type: "query-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter category as 'Clothing'",
              type: "query-validation",
              expectedKeywords: ["category", "clothing"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should use AND condition",
              type: "query-validation",
              expectedKeywords: ["and"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should filter price less than 700",
              type: "query-validation",
              expectedKeywords: ["price", "<", "700"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should end with semicolon",
              type: "syntax-validation",
              visible: true,
            },
          ],
        },
      ],
    },
  ],
};
