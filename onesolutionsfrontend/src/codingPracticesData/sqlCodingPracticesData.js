export const sqlCodingPracticesData = {
  sql: [
    // SQL Practice 1 - Basic SELECT queries
    {
      id: "sql-coding-practice-1",
      title: "Introduction to SQL",
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
      title: "Introduction to SQL",
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
      title: "Introduction to SQL",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-2-1",
          title: "Get All Products",
          description:
            "Consider an e-commerce company like Amazon that holds the data of a wide variety of products. While shopping online, we often search for the product or brand with a partial name over giving the exact name of the product. And, while applying filters, we tend to select if the price/rating is greater than a certain number over mentioning the exact number.\n is greater than a certain number over mentioning the exact numbe\n Comparison operators such as LIKE, equal to(=), greater than(>) help us fetch data for such queries.\n Similar to the e-commerce scenario, we have a database that contains a range of products with details like the name of the product, category it belongs to, price, brand and rating. Help the user get the desired products by writing SQL queries satisfying user requirements.\n NOTE: Expected output format for all the queries, unless specified.",

          difficulty: "Easy",
          score: 35,
          type: "sql",
          defaultCode: {
            sql: ``,
          },

          tableData: {
            player: {
              columns: ["name", "category", "price", "brand", "rating"],
              rows: [
                ["Black Shirt", "Clothing", 900, "Puma", 4.8],
                ["Running Shoes", "Footwear", 2500, "Nike", 4.5],
                ["Smart Watch", "Electronics", 3000, "Noise", 4.2],
                ["Cap", "Accessories", 500, "Adidas", 4.0],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p> Get all the products whosepriceis less than or equal to 1000.</p>              
         <div class="sql-table-desc">
                <div class="sql-table-caption">Table: player</div>
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
      <td>---</td>
      <td>---</td>
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
      ],
    },
  ],
};
