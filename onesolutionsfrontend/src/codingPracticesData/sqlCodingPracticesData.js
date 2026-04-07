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
            }
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
              description: "Query should contain '*' to select all columns",
              type: "query-validation",
              expectedKeywords: ["*"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be 'player'",
              type: "query-validation",
              expectedTableName: "player",
              expectedKeywords: ["player"],
              visible: true,
            }
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
          title: "Get Products from Brands",
          description:
          "",
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


  <p>
    With this practice set, you'll get thorough with:
  </p>

  <ul>
    <li>How to filter based on multiple conditions and how to apply filters within a specified range.</li>
    <li>Sort and limit the entries of the output making it easier to fetch meaningful insights.</li>
   </ul>

  <p>Here, the database consists of aproducttable that stores the name, category, price, rating and brand of the products. Let's go!</p>

 <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>Expected output format for all the queries, unless specified.</p>
              </div>

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
                <tr>
                  <td>Black Shirt</td>
                  <td>Clothing</td>
                  <td>900</td>
                  <td>Puma</td>
                  <td>4.8</td>
                </tr>
                <tr>
                  <td>Black T-Shirt</td>
                  <td>Clothing</td>
                  <td>600</td>
                  <td>Roadster</td>
                  <td>4.2</td>
                </tr>
                <tr>
                  <td>Blue T-Shirt</td>
                  <td>Clothing</td>
                  <td>600</td>
                  <td>Nike</td>
                  <td>4.7</td>
                </tr>
                <tr>
                  <td>Grey Jeans</td>
                  <td>Clothing</td>
                  <td>1200</td>
                  <td>Levi's</td>
                  <td>4.6</td>
                </tr>
                <tr>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                </tr>
              </tbody>
            </table>
          </div>
           <p class="desc-que-blue">Question</p>
           <p>Get all the products from "Roadster", "Levi's" or "Puma" brands.</p>
            <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>Output must contain rows in the ascending order of price of the product. If two products are of same price, then sort by name in the alphabetical order.</p>
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
              description: "Query should use AND condition",
              type: "query-validation",
              expectedKeywords: ["and"],
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
  id: "sql-query-5-2",
  title: "Get Products in Price Range",
  description: "",
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

  <p>
    With this practice set, you'll get thorough with:
  </p>

  <ul>
    <li>How to filter based on multiple conditions and apply filters within a specified range.</li>
    <li>Sorting the results to extract meaningful insights.</li>
  </ul>

  <p>
    Here, the database consists of a <b>product</b> table that stores the name, category, price, brand and rating of products.
  </p>

  <div class="Note-container">
    <div class="icon-note">
      <h6><i class="bi bi-journal-text"></i>Note</h6>
    </div>
    <p>Expected output format for all the queries, unless specified.</p>
  </div>

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
        <tr>
          <td>Black Jeans</td>
          <td>Clothing</td>
          <td>750</td>
          <td>Denim</td>
          <td>4.5</td>
        </tr>
        <tr>
          <td>Blue Shirt</td>
          <td>Clothing</td>
          <td>750</td>
          <td>Denim</td>
          <td>3.8</td>
        </tr>
        <tr>
          <td>Blue Jeans</td>
          <td>Clothing</td>
          <td>800</td>
          <td>Puma</td>
          <td>3.6</td>
        </tr>
        <tr>
          <td>Blue Shirt</td>
          <td>Clothing</td>
          <td>1000</td>
          <td>Puma</td>
          <td>4.3</td>
        </tr>
        <tr>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="desc-que-blue">Question</p>
  <p>Get all the products that are in the price range of 750 to 1000.</p>

  <div class="Note-container">
    <div class="icon-note">
      <h6><i class="bi bi-journal-text"></i>Note</h6>
    </div>
    <p>
      Include the products with price 750 and 1000 as well. 
      Output must be sorted in ascending order of price. 
      If two products have the same price, sort them alphabetically by name.
    </p>
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
      description: "Query should filter using BETWEEN",
      type: "query-validation",
      expectedKeywords: ["between"],
      visible: true,
    },
    {
      id: 7,
      description: "Query should contain ORDER BY clause",
      type: "query-validation",
      expectedKeywords: ["order by"],
      visible: true,
    },
    {
      id: 8,
      description: "Query should sort by price and name",
      type: "query-validation",
      expectedKeywords: ["price", "name"],
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
  id: "sql-query-5-4",
  title: "High Rating Low Cost Clothing",
  description: "",
  difficulty: "Easy",
  score: 40,
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

  <p>
    With this practice set, you'll get thorough with:
  </p>

  <ul>
    <li>Filtering data using WHERE clause</li>
    <li>Sorting results using ORDER BY with multiple columns</li>
  </ul>

  <p>
    Here, the database consists of a <b>product</b> table that stores the name, category, price, brand, and rating of products.
  </p>

  <div class="Note-container">
    <div class="icon-note">
      <h6>
        <i class="bi bi-journal-text"></i>Note
      </h6>
    </div>
    <p>Expected output format for all the queries, unless specified.</p>
  </div>

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
        <tr>
          <td>Black Shirt</td>
          <td>Clothing</td>
          <td>600</td>
          <td>Puma</td>
          <td>4.8</td>
        </tr>
        <tr>
          <td>Blue T-Shirt</td>
          <td>Clothing</td>
          <td>600</td>
          <td>Nike</td>
          <td>4.7</td>
        </tr>
        <tr>
          <td>Black Jeans</td>
          <td>Clothing</td>
          <td>750</td>
          <td>Denim</td>
          <td>4.5</td>
        </tr>
        <tr>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="desc-que-blue">Question</p>
  <p>
    User wants to purchase clothes that have high-rating and low-cost.
  </p>
  <p>
    Get the products from the <b>"Clothing"</b> category as per the user requirements:
  </p>

  <ul>
    <li>Keep highly-rated products at the top</li>
    <li>Sort the price from low to high</li>
  </ul>

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
      description: "Query should select all columns",
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
      description: "Table name should be 'product'",
      type: "query-validation",
      expectedTableName: "product",
      expectedKeywords: ["product"],
      visible: true,
    },
    {
      id: 5,
      description: "Query should filter Clothing category",
      type: "query-validation",
      expectedKeywords: ["where", "clothing"],
      visible: true,
    },
    {
      id: 6,
      description: "Query should contain ORDER BY clause",
      type: "query-validation",
      expectedKeywords: ["order by"],
      visible: true,
    },
    {
      id: 7,
      description: "Query should sort by rating (DESC) first",
      type: "query-validation",
      expectedKeywords: ["rating", "desc"],
      visible: true,
    },
    {
      id: 8,
      description: "Query should sort by price (ASC) next",
      type: "query-validation",
      expectedKeywords: ["price", "asc"],
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
        {
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],

          id: "sql-query-7-5",
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
      ],
    },
    // SQL Assignment 1
    {
      id: "sql-Assignment-1",
      title: "SQL Assignment 1",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-8-1",
          title: "1 lakh views",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            VIDEO: {
              columns: [
                "video_id",
                "name",
                "duration_in_secs",
                "published_datetime",
                "no_of_views",
                "channel_id",
              ],
              rows: [
                [
                  1100,
                  "#VeteransDay: Thank You for Everything",
                  4830,
                  "2018-05-05 19:00",
                  137261,
                  367,
                ],
                [
                  1316,
                  "'Lord of the Rings' TV Series Gets Multi-Season Order At Amazon | News Flash | Entertainment Weekly",
                  4654,
                  "2017-06-10 12:32",
                  130574,
                  366,
                ],
                [
                  1488,
                  "(HD VERSION) Kelly Clarkson & P!nk Everybody Hurts LIVE at the 2017 American Music Awards!",
                  3389,
                  "2021-01-19 21:19",
                  201187,
                  366,
                ],
                [
                  1089,
                  "10 LIFE HACKS YOU NEED TO KNOW with TEENS (REACT)",
                  1867,
                  "2019-05-05 17:32",
                  133738,
                  350,
                ],
                [
                  1009,
                  "100 People Hold Their Breath for as Long as They Can",
                  2885,
                  "2015-05-17 19:32",
                  272102,
                  354,
                ],
                [
                  1348,
                  "2CELLOS - Cinema Paradiso [OFFICIAL VIDEO]",
                  1312,
                  "2017-06-10 12:32",
                  154370,
                  360,
                ],
                [
                  1003,
                  "4 Reasons I Don't Like Thanksgiving || Mayim Bialik",
                  1751,
                  "2017-05-05 17:32",
                  279351,
                  350,
                ],
                [
                  1289,
                  "7.3 Magnitude Earthquake Along Iraq-Iran Border Leaves At Least 400 Dead, 7,200 Injured | TIME",
                  4019,
                  "2019-11-10 12:32",
                  293255,
                  362,
                ],
                [
                  1038,
                  "A Day in The Life of David Letterman",
                  2949,
                  "2019-02-05 17:32",
                  298876,
                  353,
                ],
                [
                  1322,
                  "A Quiet Place (2018) - Official Teaser Trailer - Paramount Pictures",
                  1225,
                  "2015-02-10 12:32",
                  286795,
                  366,
                ],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes.</p>
        <p>NOTE:</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: channel_user table
                </div>
                <table>
                <thead>
                  <tr>
                    <th>channel_id</th>
                    <th>user_id</th>
                    <th>subscribed_datetime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>100</td>
                    <td>1</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>100</td>
                    <td>7</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: user_likes table
              </div>
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>video_id</th>
                    <th>reaction_type</th>
                    <th>reacted_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10</td>
                    <td>LIKE</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>10</td>
                    <td>DISLIKE</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video. A user can either like or dislike a video. He cannot like or dislike a video multiple times (similar to how youtube works)</p>
                    <div class="sql-table-desc">
          <div class="sql-table-caption">Table: video_genre table
          </div>
          <table>
          <thead>
            <tr>
              <th>video_id</th>
              <th>genre_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>201</td>
            </tr>
            <tr>
              <td>10</td>
              <td>202</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
          </table>
          </div>
                    <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to. A single video can belong to multiple genres</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get all the videos with more than 1 lakh views.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Output must be in the alphabetical order of video <b>name</b></p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>video_id</th>
            <th>name</th>
            <th>duration_in_secs</th>
            <th>published_datetime</th>
            <th>no_of_views</th>
            <th>channel_id</th>
            </tr>
            </thead>
            <tbody>
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
              description: "Query should select all required columns",
              type: "syntax-validation",
              expectedKeywords: [
                "video_id",
                "name",
                "duration_in_secs",
                "published_datetime",
                "no_of_views",
                "channel_id",
              ],
              visible: true,
            },
            {
              id: 3,
              description:
                "Query should filter videos with more than 100000 views",
              type: "syntax-validation",
              expectedKeywords: ["where", "no_of_views", ">"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should order results alphabetically by name",
              type: "syntax-validation",
              expectedKeywords: ["order by", "name", "asc"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-2",
          title: "TEDx channel views.",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            VIDEO: {
              columns: [
                "video_id",
                "name",
                "duration_in_secs",
                "published_datetime",
                "no_of_views",
                "channel_id",
              ],
              rows: [
                [
                  1100,
                  "#VeteransDay: Thank You for Everything",
                  4830,
                  "2018-05-05 19:00",
                  137261,
                  367,
                ],
                [
                  1316,
                  "'Lord of the Rings' TV Series Gets Multi-Season Order At Amazon | News Flash | Entertainment Weekly",
                  4654,
                  "2017-06-10 12:32",
                  130574,
                  366,
                ],
                [
                  1488,
                  "(HD VERSION) Kelly Clarkson & P!nk Everybody Hurts LIVE at the 2017 American Music Awards!",
                  3389,
                  "2021-01-19 21:19",
                  201187,
                  366,
                ],
                [
                  1089,
                  "10 LIFE HACKS YOU NEED TO KNOW with TEENS (REACT)",
                  1867,
                  "2019-05-05 17:32",
                  133738,
                  350,
                ],
                [
                  1009,
                  "100 People Hold Their Breath for as Long as They Can",
                  2885,
                  "2015-05-17 19:32",
                  272102,
                  354,
                ],
                [
                  1348,
                  "2CELLOS - Cinema Paradiso [OFFICIAL VIDEO]",
                  1312,
                  "2017-06-10 12:32",
                  154370,
                  360,
                ],
                [
                  1003,
                  "4 Reasons I Don't Like Thanksgiving || Mayim Bialik",
                  1751,
                  "2017-05-05 17:32",
                  279351,
                  350,
                ],
                [
                  1289,
                  "7.3 Magnitude Earthquake Along Iraq-Iran Border Leaves At Least 400 Dead, 7,200 Injured | TIME",
                  4019,
                  "2019-11-10 12:32",
                  293255,
                  362,
                ],
                [
                  1038,
                  "A Day in The Life of David Letterman",
                  2949,
                  "2019-02-05 17:32",
                  298876,
                  353,
                ],
                [
                  1322,
                  "A Quiet Place (2018) - Official Teaser Trailer - Paramount Pictures",
                  1225,
                  "2015-02-10 12:32",
                  286795,
                  366,
                ],
                [
                  1501,
                  "Behind The Scenes with David Letterman",
                  2500,
                  "2020-03-10 18:00",
                  180000,
                  353,
                ],
                [
                  1502,
                  "Top 10 David Letterman Moments",
                  3200,
                  "2021-07-21 20:15",
                  220000,
                  353,
                ],
                [
                  1503,
                  "Late Night Highlights Compilation",
                  2100,
                  "2018-09-12 14:45",
                  95000,
                  353,
                ],
                [
                  1504,
                  "Interview with Hollywood Star",
                  2800,
                  "2022-01-11 16:30",
                  305000,
                  353,
                ],
                [
                  1505,
                  "Comedy Monologue Special",
                  1900,
                  "2019-11-25 19:10",
                  120000,
                  353,
                ],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes.</p>
        <p>NOTE:</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: channel_user table
                </div>
                <table>
                <thead>
                  <tr>
                    <th>channel_id</th>
                    <th>user_id</th>
                    <th>subscribed_datetime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>100</td>
                    <td>1</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>100</td>
                    <td>7</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user_likes table
            </div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>video_id</th>
                  <th>reaction_type</th>
                  <th>reacted_at</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>10</td>
                  <td>LIKE</td>
                  <td>2020-12-10 10:30:45</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>10</td>
                  <td>DISLIKE</td>
                  <td>2020-10-10 11:30:45</td>
                </tr>
                <tr>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                </tr>
              </tbody>
            </table>
          </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video. A user can either like or dislike a video. He cannot like or dislike a video multiple times (similar to how youtube works)</p>
              <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video_genre table
            </div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>genre_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10</td>
                  <td>201</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>202</td>
                </tr>
                <tr>
                  <td>--</td>
                  <td>--</td>
                </tr>
              </tbody>
            </table>
          </div>
              <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to. A single video can belong to multiple genres</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get videos from TEDx channel (id=353) with more than 50 thousand views.

             </p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Sort the output in the descending order of <b>no_of_views</b> and in the ascending order of video <b>name</b></p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>video_id</th>
            <th>name</th>
            <th>duration_in_secs</th>
            <th>no_of_views</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--<td>--</td><td>--</td></tr>
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
              description: "Query should select required columns",
              type: "syntax-validation",
              expectedKeywords: [
                "video_id",
                "name",
                "duration_in_secs",
                "no_of_views",
              ],
              visible: true,
            },
            {
              id: 3,
              description: "Query should select from video table",
              type: "syntax-validation",
              expectedKeywords: ["from video"],
              visible: true,
            },
            {
              id: 4,
              description:
                "Query should filter TEDx channel (channel_id = 353)",
              type: "syntax-validation",
              expectedKeywords: ["channel_id = 353"],
              visible: true,
            },
            {
              id: 5,
              description:
                "Query should filter videos with more than 50000 views",
              type: "syntax-validation",
              expectedKeywords: ["no_of_views > 50000"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should contain ORDER BY clause",
              type: "syntax-validation",
              expectedKeywords: ["order by"],
              visible: true,
            },
            {
              id: 7,
              description:
                "Query should sort by no_of_views in descending order",
              type: "syntax-validation",
              expectedKeywords: ["no_of_views desc"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should sort by name in ascending order",
              type: "syntax-validation",
              expectedKeywords: ["name asc"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-3",
          title: "Top 10 most viewed videos",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            VIDEO: {
              columns: [
                "video_id",
                "name",
                "duration_in_secs",
                "published_datetime",
                "no_of_views",
                "channel_id",
              ],
              rows: [
                [
                  1100,
                  "#VeteransDay: Thank You for Everything",
                  4830,
                  "2018-05-05 19:00",
                  137261,
                  367,
                ],
                [
                  1316,
                  "'Lord of the Rings' TV Series Gets Multi-Season Order At Amazon | News Flash | Entertainment Weekly",
                  4654,
                  "2017-06-10 12:32",
                  130574,
                  366,
                ],
                [
                  1488,
                  "(HD VERSION) Kelly Clarkson & P!nk Everybody Hurts LIVE at the 2017 American Music Awards!",
                  3389,
                  "2021-01-19 21:19",
                  201187,
                  366,
                ],
                [
                  1089,
                  "10 LIFE HACKS YOU NEED TO KNOW with TEENS (REACT)",
                  1867,
                  "2019-05-05 17:32",
                  133738,
                  350,
                ],
                [
                  1009,
                  "100 People Hold Their Breath for as Long as They Can",
                  2885,
                  "2015-05-17 19:32",
                  272102,
                  354,
                ],
                [
                  1348,
                  "2CELLOS - Cinema Paradiso [OFFICIAL VIDEO]",
                  1312,
                  "2017-06-10 12:32",
                  154370,
                  360,
                ],
                [
                  1003,
                  "4 Reasons I Don't Like Thanksgiving || Mayim Bialik",
                  1751,
                  "2017-05-05 17:32",
                  279351,
                  350,
                ],
                [
                  1289,
                  "7.3 Magnitude Earthquake Along Iraq-Iran Border Leaves At Least 400 Dead, 7,200 Injured | TIME",
                  4019,
                  "2019-11-10 12:32",
                  293255,
                  362,
                ],
                [
                  1038,
                  "A Day in The Life of David Letterman",
                  2949,
                  "2019-02-05 17:32",
                  298876,
                  353,
                ],
                [
                  1322,
                  "A Quiet Place (2018) - Official Teaser Trailer - Paramount Pictures",
                  1225,
                  "2015-02-10 12:32",
                  286795,
                  366,
                ],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes.</p>
        <p>NOTE:</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: channel_user table
                </div>
                <table>
                <thead>
                  <tr>
                    <th>channel_id</th>
                    <th>user_id</th>
                    <th>subscribed_datetime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>100</td>
                    <td>1</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>100</td>
                    <td>7</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: user_likes table
              </div>
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>video_id</th>
                    <th>reaction_type</th>
                    <th>reacted_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10</td>
                    <td>LIKE</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>10</td>
                    <td>DISLIKE</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video. A user can either like or dislike a video. He cannot like or dislike a video multiple times (similar to how youtube works)</p>
                    <div class="sql-table-desc">
          <div class="sql-table-caption">Table: video_genre table
          </div>
          <table>
          <thead>
            <tr>
              <th>video_id</th>
              <th>genre_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>201</td>
            </tr>
            <tr>
              <td>10</td>
              <td>202</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
          </table>
          </div>
                    <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to. A single video can belong to multiple genres</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get the top 10 most viewed videos till date.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Sort the videos by <b>no_of_views</b> from highest to lowest. For videos with the same number of views, order them by <b>published_datetime</b>, with the most recent video first.

             </p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>name</th>
            <th>channel_id</th>
            <th>no_of_views</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--<td>--</td></tr>
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
              description: "Query should select required columns",
              type: "syntax-validation",
              expectedKeywords: ["name", "channel_id", "no_of_views"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should fetch data from VIDEO table",
              type: "syntax-validation",
              expectedKeywords: ["from", "video"],
              visible: true,
            },
            {
              id: 4,
              description:
                "Query should order by no_of_views in descending order",
              type: "syntax-validation",
              expectedKeywords: ["order by", "no_of_views", "desc"],
              visible: true,
            },
            {
              id: 5,
              description:
                "Query should order by published_datetime in descending order for tie-breaking",
              type: "syntax-validation",
              expectedKeywords: ["published_datetime", "desc"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should limit results to top 10",
              type: "syntax-validation",
              expectedKeywords: ["limit", "10"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-4",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Recent movie trailers",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            VIDEO: {
              columns: [
                "video_id",
                "name",
                "duration_in_secs",
                "published_datetime",
                "no_of_views",
                "channel_id",
              ],
              rows: [
                [
                  1100,
                  "#VeteransDay: Thank You for Everything",
                  4830,
                  "2018-05-05 19:00",
                  137261,
                  367,
                ],
                [
                  1316,
                  "'Lord of the Rings' TV Series Gets Multi-Season Order At Amazon | News Flash | Entertainment Weekly",
                  4654,
                  "2017-06-10 12:32",
                  130574,
                  366,
                ],
                [
                  1488,
                  "(HD VERSION) Kelly Clarkson & P!nk Everybody Hurts LIVE at the 2017 American Music Awards!",
                  3389,
                  "2021-01-19 21:19",
                  201187,
                  366,
                ],
                [
                  1089,
                  "10 LIFE HACKS YOU NEED TO KNOW with TEENS (REACT)",
                  1867,
                  "2019-05-05 17:32",
                  133738,
                  350,
                ],
                [
                  1009,
                  "100 People Hold Their Breath for as Long as They Can",
                  2885,
                  "2015-05-17 19:32",
                  272102,
                  354,
                ],
                [
                  1348,
                  "2CELLOS - Cinema Paradiso [OFFICIAL VIDEO]",
                  1312,
                  "2017-06-10 12:32",
                  154370,
                  360,
                ],
                [
                  1003,
                  "4 Reasons I Don't Like Thanksgiving || Mayim Bialik",
                  1751,
                  "2017-05-05 17:32",
                  279351,
                  350,
                ],
                [
                  1289,
                  "7.3 Magnitude Earthquake Along Iraq-Iran Border Leaves At Least 400 Dead, 7,200 Injured | TIME",
                  4019,
                  "2019-11-10 12:32",
                  293255,
                  362,
                ],
                [
                  1038,
                  "A Day in The Life of David Letterman",
                  2949,
                  "2019-02-05 17:32",
                  298876,
                  353,
                ],
                [
                  1322,
                  "A Quiet Place (2018) - Official Teaser Trailer - Paramount Pictures",
                  1225,
                  "2015-02-10 12:32",
                  286795,
                  366,
                ],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes.</p>
        <p>NOTE:</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: channel_user table
                </div>
                <table>
                <thead>
                  <tr>
                    <th>channel_id</th>
                    <th>user_id</th>
                    <th>subscribed_datetime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>100</td>
                    <td>1</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>100</td>
                    <td>7</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: user_likes table
              </div>
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>video_id</th>
                    <th>reaction_type</th>
                    <th>reacted_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10</td>
                    <td>LIKE</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>10</td>
                    <td>DISLIKE</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video. A user can either like or dislike a video. He cannot like or dislike a video multiple times (similar to how youtube works)</p>
                    <div class="sql-table-desc">
          <div class="sql-table-caption">Table: video_genre table
          </div>
          <table>
          <thead>
            <tr>
              <th>video_id</th>
              <th>genre_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>201</td>
            </tr>
            <tr>
              <td>10</td>
              <td>202</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
          </table>
          </div>
                    <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to. A single video can belong to multiple genres</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get all the recent movie trailers that have more than 1 lakh views.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul>
             <li>Consider the videos that have "trailer" in theirnameas trailers.</li>
             <li>Sort the output in the descending order of <b>no_of_views</b> and <b>published_date</b> time</li>
             </ul>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>name</th>
            <th>channel_id</th>
            <th>no_of_views</th>
            <th>published_datetime</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--</td><td>--<td>--</td></tr>
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
              description: "Query should select required columns",
              type: "syntax-validation",
              expectedKeywords: [
                "name",
                "channel_id",
                "no_of_views",
                "published_datetime",
              ],
              visible: true,
            },
            {
              id: 3,
              description: "Query should fetch data from VIDEO table",
              type: "syntax-validation",
              expectedKeywords: ["from", "video"],
              visible: true,
            },
            {
              id: 4,
              description:
                "Query should filter videos with more than 100000 views",
              type: "syntax-validation",
              expectedKeywords: ["where", "no_of_views", ">", "100000"],
              visible: true,
            },
            {
              id: 5,
              description:
                "Query should filter videos having 'trailer' in name",
              type: "syntax-validation",
              expectedKeywords: ["name", "like", "%trailer%"],
              visible: true,
            },
            {
              id: 6,
              description:
                "Query should sort by no_of_views in descending order",
              type: "syntax-validation",
              expectedKeywords: ["order by", "no_of_views", "desc"],
              visible: true,
            },
            {
              id: 7,
              description:
                "Query should sort by published_datetime in descending order",
              type: "syntax-validation",
              expectedKeywords: ["published_datetime", "desc"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-5",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Released in 2018",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            VIDEO: {
              columns: [
                "video_id",
                "name",
                "duration_in_secs",
                "published_datetime",
                "no_of_views",
                "channel_id",
              ],
              rows: [
                [
                  1100,
                  "#VeteransDay: Thank You for Everything",
                  4830,
                  "2018-05-05 19:00",
                  137261,
                  367,
                ],
                [
                  1316,
                  "'Lord of the Rings' TV Series Gets Multi-Season Order At Amazon | News Flash | Entertainment Weekly",
                  4654,
                  "2017-06-10 12:32",
                  130574,
                  366,
                ],
                [
                  1488,
                  "(HD VERSION) Kelly Clarkson & P!nk Everybody Hurts LIVE at the 2017 American Music Awards!",
                  3389,
                  "2021-01-19 21:19",
                  201187,
                  366,
                ],
                [
                  1089,
                  "10 LIFE HACKS YOU NEED TO KNOW with TEENS (REACT)",
                  1867,
                  "2019-05-05 17:32",
                  133738,
                  350,
                ],
                [
                  1009,
                  "100 People Hold Their Breath for as Long as They Can",
                  2885,
                  "2015-05-17 19:32",
                  272102,
                  354,
                ],
                [
                  1348,
                  "2CELLOS - Cinema Paradiso [OFFICIAL VIDEO]",
                  1312,
                  "2017-06-10 12:32",
                  154370,
                  360,
                ],
                [
                  1003,
                  "4 Reasons I Don't Like Thanksgiving || Mayim Bialik",
                  1751,
                  "2017-05-05 17:32",
                  279351,
                  350,
                ],
                [
                  1289,
                  "7.3 Magnitude Earthquake Along Iraq-Iran Border Leaves At Least 400 Dead, 7,200 Injured | TIME",
                  4019,
                  "2019-11-10 12:32",
                  293255,
                  362,
                ],
                [
                  1038,
                  "A Day in The Life of David Letterman",
                  2949,
                  "2019-02-05 17:32",
                  298876,
                  353,
                ],
                [
                  1322,
                  "A Quiet Place (2018) - Official Teaser Trailer - Paramount Pictures",
                  1225,
                  "2015-02-10 12:32",
                  286795,
                  366,
                ],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes.</p>
        <p>NOTE:</p>
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: channel_user table
                </div>
                <table>
                <thead>
                  <tr>
                    <th>channel_id</th>
                    <th>user_id</th>
                    <th>subscribed_datetime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>100</td>
                    <td>1</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>100</td>
                    <td>7</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: user_likes table
              </div>
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>video_id</th>
                    <th>reaction_type</th>
                    <th>reacted_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10</td>
                    <td>LIKE</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>10</td>
                    <td>DISLIKE</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video. A user can either like or dislike a video. He cannot like or dislike a video multiple times (similar to how youtube works)</p>
                    <div class="sql-table-desc">
          <div class="sql-table-caption">Table: video_genre table
          </div>
          <table>
          <thead>
            <tr>
              <th>video_id</th>
              <th>genre_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>201</td>
            </tr>
            <tr>
              <td>10</td>
              <td>202</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
          </table>
          </div>
                    <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to. A single video can belong to multiple genres</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get all the videos that are released in the year 2018. </p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Sort the output in the descending order of <b>published_date</b> time and then in the alphabetical order of <b>name</b></p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
             <th>video_id</th>
            <th>name</th>
            <th>duration_in_secs</th>
            <th>no_of_views</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--<td>--</td><td>--</td></tr>
            </tbody>
            </table>
              </div>
             </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should select required columns",
              type: "syntax-validation",
              expectedKeywords: [
                "video_id",
                "name",
                "duration_in_secs",
                "no_of_views",
              ],
              visible: true,
            },
            {
              id: 2,
              description: "Query should filter videos released in 2018",
              type: "syntax-validation",
              expectedKeywords: ["strftime", "2018"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should sort by published_datetime DESC",
              type: "syntax-validation",
              expectedKeywords: ["order by", "published_datetime", "desc"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should sort by name ASC",
              type: "syntax-validation",
              expectedKeywords: ["name", "asc"],
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Assignment 2
    {
      id: "sql-Assignment-2",
      title: "SQL Assignment 2",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-9-1",
          title: "Number of users",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            user: {
              columns: ["user_id", "name", "email", "country", "created_at"],
              rows: [
                [
                  1,
                  "Arjun Reddy",
                  "arjun@gmail.com",
                  "India",
                  "2018-01-10 10:00",
                ],
                [
                  2,
                  "Sneha Sharma",
                  "sneha@gmail.com",
                  "India",
                  "2018-02-15 12:30",
                ],
                [
                  3,
                  "Rahul Verma",
                  "rahul@gmail.com",
                  "USA",
                  "2018-03-20 09:45",
                ],
                [4, "Priya Nair", "priya@gmail.com", "UK", "2018-04-05 14:10"],
                [
                  5,
                  "Karan Mehta",
                  "karan@gmail.com",
                  "USA",
                  "2018-05-18 16:25",
                ],
                [
                  6,
                  "Anjali Rao",
                  "anjali@gmail.com",
                  "Canada",
                  "2018-06-22 18:40",
                ],
                [
                  7,
                  "Vikram Singh",
                  "vikram@gmail.com",
                  "India",
                  "2018-07-30 20:15",
                ],
                [
                  8,
                  "Neha Kapoor",
                  "neha@gmail.com",
                  "Australia",
                  "2018-08-11 11:05",
                ],
                [
                  9,
                  "Rohit Das",
                  "rohit@gmail.com",
                  "Canada",
                  "2018-09-09 13:50",
                ],
                [
                  10,
                  "Meera Iyer",
                  "meera@gmail.com",
                  "Germany",
                  "2018-10-25 17:35",
                ],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes. 

              </p>
        <p>NOTE:</p>
              
        <div class="sql-table-desc">
        <div class="sql-table-caption">Table: channel_user table
        </div>
        <table>
          <thead>
            <tr>
              <th>channel_id</th>
              <th>user_id</th>
              <th>subscribed_datetime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100</td>
              <td>1</td>
              <td>2020-12-10 10:30:45</td>
            </tr>
            <tr>
              <td>100</td>
              <td>7</td>
              <td>2020-10-10 11:30:45</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: user_likes table
              </div>
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>video_id</th>
                    <th>reaction_type</th>
                    <th>reacted_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10</td>
                    <td>LIKE</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>10</td>
                    <td>DISLIKE</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video.</p>
                    <div class="sql-table-desc">
          <div class="sql-table-caption">Table: video_genre table
          </div>
          <table>
          <thead>
            <tr>
              <th>video_id</th>
              <th>genre_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>201</td>
            </tr>
            <tr>
              <td>10</td>
              <td>202</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
          </table>
          </div>
                    <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to.</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get the total number of users in the platform as users_count.

             </p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Use <b>user</b> Table to fetch the data.</p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>users_count</th>
            </tr>
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
              description: "Query should use COUNT function",
              type: "syntax-validation",
              expectedKeywords: ["count"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should count user_id column",
              type: "syntax-validation",
              expectedKeywords: ["count(user_id)"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should use alias users_count",
              type: "syntax-validation",
              expectedKeywords: ["as users_count"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should use USER table",
              type: "syntax-validation",
              expectedKeywords: ["from user"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-2",
          title: "Distinct countries ",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            user: {
              columns: ["user_id", "name", "email", "country", "created_at"],
              rows: [
                [
                  1,
                  "Arjun Reddy",
                  "arjun@gmail.com",
                  "India",
                  "2018-01-10 10:00",
                ],
                [
                  2,
                  "Sneha Sharma",
                  "sneha@gmail.com",
                  "India",
                  "2018-02-15 12:30",
                ],
                [
                  3,
                  "Rahul Verma",
                  "rahul@gmail.com",
                  "USA",
                  "2018-03-20 09:45",
                ],
                [4, "Priya Nair", "priya@gmail.com", "UK", "2018-04-05 14:10"],
                [
                  5,
                  "Karan Mehta",
                  "karan@gmail.com",
                  "USA",
                  "2018-05-18 16:25",
                ],
                [
                  6,
                  "Anjali Rao",
                  "anjali@gmail.com",
                  "Canada",
                  "2018-06-22 18:40",
                ],
                [
                  7,
                  "Vikram Singh",
                  "vikram@gmail.com",
                  "India",
                  "2018-07-30 20:15",
                ],
                [
                  8,
                  "Neha Kapoor",
                  "neha@gmail.com",
                  "Australia",
                  "2018-08-11 11:05",
                ],
                [
                  9,
                  "Rohit Das",
                  "rohit@gmail.com",
                  "Canada",
                  "2018-09-09 13:50",
                ],
                [
                  10,
                  "Meera Iyer",
                  "meera@gmail.com",
                  "Germany",
                  "2018-10-25 17:35",
                ],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes. 

              </p>
        <p>NOTE:</p>
              
        <div class="sql-table-desc">
        <div class="sql-table-caption">Table: channel_user table
        </div>
        <table>
          <thead>
            <tr>
              <th>channel_id</th>
              <th>user_id</th>
              <th>subscribed_datetime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100</td>
              <td>1</td>
              <td>2020-12-10 10:30:45</td>
            </tr>
            <tr>
              <td>100</td>
              <td>7</td>
              <td>2020-10-10 11:30:45</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: user_likes table
              </div>
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>video_id</th>
                    <th>reaction_type</th>
                    <th>reacted_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10</td>
                    <td>LIKE</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>10</td>
                    <td>DISLIKE</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video.</p>
                    <div class="sql-table-desc">
          <div class="sql-table-caption">Table: video_genre table
          </div>
          <table>
          <thead>
            <tr>
              <th>video_id</th>
              <th>genre_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>201</td>
            </tr>
            <tr>
              <td>10</td>
              <td>202</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
          </table>
          </div>
                    <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to.</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get the total number of distinct countries where the users are located. Country of the user is present in the user table.

             </p>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>countries_count</th>
            </tr>
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
              description: "Query should use COUNT function",
              type: "syntax-validation",
              expectedKeywords: ["count"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use DISTINCT keyword",
              type: "syntax-validation",
              expectedKeywords: ["distinct"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should count DISTINCT country column",
              type: "syntax-validation",
              expectedKeywords: ["count(distinct country)"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should use alias countries_count",
              type: "syntax-validation",
              expectedKeywords: ["as countries_count"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use USER table",
              type: "syntax-validation",
              expectedKeywords: ["from user"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-3",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Number of videos",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 25,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            video: {
              columns: [
                "video_id",
                "name",
                "duration_in_secs",
                "published_datetime",
                "no_of_views",
                "channel_id",
              ],
              rows: [
                [
                  1100,
                  "#VeteransDay: Thank You for Everything",
                  4830,
                  "2018-05-05 19:00",
                  137261,
                  367,
                ],
                [
                  1316,
                  "'Lord of the Rings' TV Series Gets Multi-Season Order At Amazon | News Flash | Entertainment Weekly",
                  4654,
                  "2017-06-10 12:32",
                  130574,
                  366,
                ],
                [
                  1488,
                  "(HD VERSION) Kelly Clarkson & P!nk Everybody Hurts LIVE at the 2017 American Music Awards!",
                  3389,
                  "2021-01-19 21:19",
                  201187,
                  366,
                ],
                [
                  1089,
                  "10 LIFE HACKS YOU NEED TO KNOW with TEENS (REACT)",
                  1867,
                  "2019-05-05 17:32",
                  133738,
                  350,
                ],
                [
                  1009,
                  "100 People Hold Their Breath for as Long as They Can",
                  2885,
                  "2015-05-17 19:32",
                  272102,
                  354,
                ],
                [
                  1348,
                  "2CELLOS - Cinema Paradiso [OFFICIAL VIDEO]",
                  1312,
                  "2017-06-10 12:32",
                  154370,
                  360,
                ],
                [
                  1003,
                  "4 Reasons I Don't Like Thanksgiving || Mayim Bialik",
                  1751,
                  "2017-05-05 17:32",
                  279351,
                  350,
                ],
                [
                  1289,
                  "7.3 Magnitude Earthquake Along Iraq-Iran Border Leaves At Least 400 Dead, 7,200 Injured | TIME",
                  4019,
                  "2019-11-10 12:32",
                  293255,
                  362,
                ],
                [
                  1038,
                  "A Day in The Life of David Letterman",
                  2949,
                  "2019-02-05 17:32",
                  298876,
                  353,
                ],
                [
                  1322,
                  "A Quiet Place (2018) - Official Teaser Trailer - Paramount Pictures",
                  1225,
                  "2015-02-10 12:32",
                  286795,
                  366,
                ],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes. 

              </p>
        <p>NOTE:</p>
              
        <div class="sql-table-desc">
        <div class="sql-table-caption">Table: channel_user table
        </div>
        <table>
          <thead>
            <tr>
              <th>channel_id</th>
              <th>user_id</th>
              <th>subscribed_datetime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100</td>
              <td>1</td>
              <td>2020-12-10 10:30:45</td>
            </tr>
            <tr>
              <td>100</td>
              <td>7</td>
              <td>2020-10-10 11:30:45</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: user_likes table
              </div>
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>video_id</th>
                    <th>reaction_type</th>
                    <th>reacted_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10</td>
                    <td>LIKE</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>10</td>
                    <td>DISLIKE</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video.</p>
                    <div class="sql-table-desc">
          <div class="sql-table-caption">Table: video_genre table
          </div>
          <table>
          <thead>
            <tr>
              <th>video_id</th>
              <th>genre_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>201</td>
            </tr>
            <tr>
              <td>10</td>
              <td>202</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
          </table>
          </div>
                    <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to.</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get the number of videos uploaded by each channel.</p>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>channel_id</th>
            <th>videos_count</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td>
            <td>--</td></tr>
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
              type: "syntax-validation",
              expectedKeywords: ["count"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain GROUP BY clause",
              type: "syntax-validation",
              expectedKeywords: ["group by"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-4",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "All the channels",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            video: {
              columns: [
                "video_id",
                "name",
                "duration_in_secs",
                "published_datetime",
                "no_of_views",
                "channel_id",
              ],
              rows: [
                [
                  1100,
                  "#VeteransDay: Thank You for Everything",
                  4830,
                  "2018-05-05 19:00",
                  137261,
                  367,
                ],
                [
                  1316,
                  "'Lord of the Rings' TV Series Gets Multi-Season Order At Amazon | News Flash | Entertainment Weekly",
                  4654,
                  "2017-06-10 12:32",
                  130574,
                  366,
                ],
                [
                  1488,
                  "(HD VERSION) Kelly Clarkson & P!nk Everybody Hurts LIVE at the 2017 American Music Awards!",
                  3389,
                  "2021-01-19 21:19",
                  201187,
                  366,
                ],
                [
                  1089,
                  "10 LIFE HACKS YOU NEED TO KNOW with TEENS (REACT)",
                  1867,
                  "2019-05-05 17:32",
                  133738,
                  350,
                ],
                [
                  1009,
                  "100 People Hold Their Breath for as Long as They Can",
                  2885,
                  "2015-05-17 19:32",
                  272102,
                  354,
                ],
                [
                  1348,
                  "2CELLOS - Cinema Paradiso [OFFICIAL VIDEO]",
                  1312,
                  "2017-06-10 12:32",
                  154370,
                  360,
                ],
                [
                  1003,
                  "4 Reasons I Don't Like Thanksgiving || Mayim Bialik",
                  1751,
                  "2017-05-05 17:32",
                  279351,
                  350,
                ],
                [
                  1289,
                  "7.3 Magnitude Earthquake Along Iraq-Iran Border Leaves At Least 400 Dead, 7,200 Injured | TIME",
                  4019,
                  "2019-11-10 12:32",
                  293255,
                  362,
                ],
                [
                  1038,
                  "A Day in The Life of David Letterman",
                  2949,
                  "2019-02-05 17:32",
                  298876,
                  353,
                ],
                [
                  1322,
                  "A Quiet Place (2018) - Official Teaser Trailer - Paramount Pictures",
                  1225,
                  "2015-02-10 12:32",
                  286795,
                  366,
                ],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes. 

              </p>
        <p>NOTE:</p>
              
        <div class="sql-table-desc">
        <div class="sql-table-caption">Table: channel_user table
        </div>
        <table>
          <thead>
            <tr>
              <th>channel_id</th>
              <th>user_id</th>
              <th>subscribed_datetime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100</td>
              <td>1</td>
              <td>2020-12-10 10:30:45</td>
            </tr>
            <tr>
              <td>100</td>
              <td>7</td>
              <td>2020-10-10 11:30:45</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: user_likes table
              </div>
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>video_id</th>
                    <th>reaction_type</th>
                    <th>reacted_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10</td>
                    <td>LIKE</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>10</td>
                    <td>DISLIKE</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video.</p>
                    <div class="sql-table-desc">
          <div class="sql-table-caption">Table: video_genre table
          </div>
          <table>
          <thead>
            <tr>
              <th>video_id</th>
              <th>genre_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>201</td>
            </tr>
            <tr>
              <td>10</td>
              <td>202</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
          </table>
          </div>
                    <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to.</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get the ids of all the channels that have uploaded at least 50 videos.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Sort the output in the ascending order of the <b>channel_id</b>
             </p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>channel_id</th>
            </tr>
            </thead>
            <tbody>
            <td>--</td></tr>
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
              description: "Query should use GROUP BY clause",
              type: "syntax-validation",
              expectedKeywords: ["group by"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use HAVING clause",
              type: "syntax-validation",
              expectedKeywords: ["having"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should use COUNT aggregate",
              type: "syntax-validation",
              expectedKeywords: ["count"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should use ORDER BY channel_id ASC",
              type: "syntax-validation",
              expectedKeywords: ["order by", "asc"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-6",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "AI/ML Videos",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 50,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            video: {
              columns: [
                "video_id",
                "name",
                "duration_in_secs",
                "published_datetime",
                "no_of_views",
                "channel_id",
              ],
              rows: [
                [
                  2001,
                  "Introduction to AI/ML Basics",
                  1200,
                  "2019-03-10 10:00",
                  50000,
                  101,
                ],
                [
                  2002,
                  "Robotics for Beginners",
                  1500,
                  "2020-07-15 14:00",
                  60000,
                  102,
                ],
                [
                  2003,
                  "Advanced AI/ML Techniques",
                  1800,
                  "2018-11-20 09:30",
                  70000,
                  101,
                ],
                [2004, "Cooking Tutorial", 900, "2019-05-05 17:32", 20000, 103],
                [
                  2005,
                  "Robotics in 2022",
                  1600,
                  "2022-01-01 10:00",
                  80000,
                  104,
                ],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes. 

              </p>
        <p>NOTE:</p>
              
        <div class="sql-table-desc">
        <div class="sql-table-caption">Table: channel_user table
        </div>
        <table>
          <thead>
            <tr>
              <th>channel_id</th>
              <th>user_id</th>
              <th>subscribed_datetime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100</td>
              <td>1</td>
              <td>2020-12-10 10:30:45</td>
            </tr>
            <tr>
              <td>100</td>
              <td>7</td>
              <td>2020-10-10 11:30:45</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </div>
              <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
              <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: user_likes table
              </div>
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>video_id</th>
                    <th>reaction_type</th>
                    <th>reacted_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10</td>
                    <td>LIKE</td>
                    <td>2020-12-10 10:30:45</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>10</td>
                    <td>DISLIKE</td>
                    <td>2020-10-10 11:30:45</td>
                  </tr>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

              <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video.</p>
                    <div class="sql-table-desc">
          <div class="sql-table-caption">Table: video_genre table
          </div>
          <table>
          <thead>
            <tr>
              <th>video_id</th>
              <th>genre_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>201</td>
            </tr>
            <tr>
              <td>10</td>
              <td>202</td>
            </tr>
            <tr>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
          </table>
          </div>
                    <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to.</p>
              <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>
              
              <p class="desc-que-blue">Question</p>
             <p>Get all the channel_ids that uploaded at least one video in "AI/ML" technologies between 2018.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul><li>Consider all the videos that have any of the technologies mentioned above in their <b>name</b></li>
             <li>Sort the output in the ascending order of <b>channel_id</b></li></ul>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>channel_id</th>
            </tr>
            </thead>
            <tbody>
            <td>--</td></tr>
            </tbody>
            </table>
              </div>
             </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should select channel_id",
              type: "syntax-validation",
              expectedKeywords: ["select", "channel_id"],
              visible: true,
            },
            {
              id: 2,
              description: "Query should fetch from video table",
              type: "syntax-validation",
              expectedKeywords: ["from video"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should filter AI/ML videos",
              type: "syntax-validation",
              expectedKeywords: ["ai/ml"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should filter Robotics videos",
              type: "syntax-validation",
              expectedKeywords: ["robotics"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should filter year >= 2018",
              type: "syntax-validation",
              expectedKeywords: ["2018"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter year <= 2021",
              type: "syntax-validation",
              expectedKeywords: ["2021"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should group by channel_id",
              type: "syntax-validation",
              expectedKeywords: ["group by", "channel_id"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should order by channel_id ascending",
              type: "syntax-validation",
              expectedKeywords: ["order by", "asc"],
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Practice 8
    {
      id: "sql-coding-practice-8",
      title: "SQL Coding Practice 8",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-8-01",
          title: "user entity type",
          description:
            "In this practice set, let's build a relational database for a typical social networking site.In a social networking site, we have user, post, group, and comment entities.Use Case: user can create multiple posts. Each post can have only one user.A user can make multiple comments to a post. Each comment can have only one user.A post can have multiple comments. Each comment can have only one post.A user can be in multiple groups. Each group can have multiple users.",
          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            user: {
              columns: ["id", "name", "gender", "email_id"],
              rows: [
                [1, "Prathibha", "Female", "prathibha@gmail.com"],
                [2, "Ramesh", "Male", "ramesh@gmail.com"],
                [3, "Sneha", "Female", "sneha@gmail.com"],
                [4, "Arjun", "Male", "arjun@gmail.com"],
              ],
            },

            post: {
              columns: ["post_id", "content", "published_at", "user_id"],
              rows: [
                [101, "Learning SQL is interesting!", "2026-02-20 10:30:00", 1],
                [102, "Database design concepts", "2026-02-21 11:00:00", 2],
                [
                  103,
                  "Frontend vs Backend discussion",
                  "2026-02-22 09:15:00",
                  1,
                ],
                [104, "React Hooks explanation", "2026-02-23 04:45:00", 3],
              ],
            },

            comment: {
              columns: [
                "comment_id",
                "content",
                "commented_at",
                "user_id",
                "post_id",
              ],
              rows: [
                [1001, "Very useful post!", "2026-02-20 11:00:00", 2, 101],
                [1002, "Thanks for sharing!", "2026-02-21 12:10:00", 3, 102],
                [1003, "Great explanation", "2026-02-22 10:00:00", 4, 103],
                [1004, "Helpful content", "2026-02-23 05:00:00", 1, 104],
              ],
            },

            group_details: {
              columns: ["id", "name"],
              rows: [
                [201, "SQL Learners"],
                [202, "React Developers"],
                [203, "Full Stack Engineers"],
              ],
            },

            user_group: {
              columns: ["user_id", "group_id", "joined_at", "is_admin"],
              rows: [
                [1, 201, "2026-02-01 09:00:00", true],
                [2, 201, "2026-02-02 10:00:00", false],
                [3, 202, "2026-02-03 11:00:00", true],
                [4, 203, "2026-02-04 12:00:00", false],
                [1, 202, "2026-02-05 01:00:00", false],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Write a query to represent the user entity type in the relational database. Below are the attributes of a user entity type. </p>
        
              <div class="sql-table-desc">
               
                <table>
              <thead>
                <tr>
                  <th>attribute</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>id</td><td>an integer to uniquely identify a user - key attribute</td></tr>
                <tr><td>name</td><td>a string of max length 250 characters</td></tr>
                <tr><td>gender</td><td>a string of max length 50 characters</td></tr>
                <tr><td>email_id</td><td>a string of max length 500 characters</td></tr>
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
              description: "Query should not have syntax errors",
              type: "syntax-validation",
              expectedKeywords: ["select", "from", "user"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-02",
          title: "Created a user table",
          description:
            "In this practice set, let's build a relational database for a typical social networking site.In a social networking site, we have user, post, group, and comment entities.Use Case: user can create multiple posts. Each post can have only one user.A user can make multiple comments to a post. Each comment can have only one user.A post can have multiple comments. Each comment can have only one post.A user can be in multiple groups. Each group can have multiple users.",
          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            user: {
              columns: ["id", "name", "gender", "email_id"],
              rows: [
                [1, "Prathibha", "Female", "prathibha@gmail.com"],
                [2, "Ramesh", "Male", "ramesh@gmail.com"],
                [3, "Sneha", "Female", "sneha@gmail.com"],
                [4, "Arjun", "Male", "arjun@gmail.com"],
              ],
            },

            post: {
              columns: ["post_id", "content", "published_at", "user_id"],
              rows: [
                [101, "Learning SQL is interesting!", "2026-02-20 10:30:00", 1],
                [102, "Database design concepts", "2026-02-21 11:00:00", 2],
                [
                  103,
                  "Frontend vs Backend discussion",
                  "2026-02-22 09:15:00",
                  1,
                ],
                [104, "React Hooks explanation", "2026-02-23 04:45:00", 3],
              ],
            },

            comment: {
              columns: [
                "comment_id",
                "content",
                "commented_at",
                "user_id",
                "post_id",
              ],
              rows: [
                [1001, "Very useful post!", "2026-02-20 11:00:00", 2, 101],
                [1002, "Thanks for sharing!", "2026-02-21 12:10:00", 3, 102],
                [1003, "Great explanation", "2026-02-22 10:00:00", 4, 103],
                [1004, "Helpful content", "2026-02-23 05:00:00", 1, 104],
              ],
            },

            group_details: {
              columns: ["id", "name"],
              rows: [
                [201, "SQL Learners"],
                [202, "React Developers"],
                [203, "Full Stack Engineers"],
              ],
            },

            user_group: {
              columns: ["user_id", "group_id", "joined_at", "is_admin"],
              rows: [
                [1, 201, "2026-02-01 09:00:00", true],
                [2, 201, "2026-02-02 10:00:00", false],
                [3, 202, "2026-02-03 11:00:00", true],
                [4, 203, "2026-02-04 12:00:00", false],
                [1, 202, "2026-02-05 01:00:00", false],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>We have created a user table in the database.</p>
              <p>Now, let's write a query to represent the post entity type and its relation with user entity type.</p>
              <p>Below are the attributes of the post entity type.</p>
        
              <div class="sql-table-desc"><table>
              <thead>
                <tr>
                  <th>attribute</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>post_id</td><td>an integer to uniquely identify a post - key attribute</td></tr>
                <tr><td>content</td><td>a text field</td></tr>
                <tr><td>published_at</td><td>a datetime field</td></tr>
              </tbody>
            </table>
              </div>
              <div class="Note-container">
              <div class="icon-note">
                <h6>
                  <i class="bi bi-journal-text"></i>Note
                </h6>
              </div>
              <p>Create a table in such a way that if we delete a user from the user table, then the related posts in the post table must be automatically deleted.</p>
              </div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description: "Query should start with CREATE TABLE",
              type: "syntax-validation",
              expectedKeywords: ["create table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be post",
              type: "syntax-validation",
              expectedKeywords: ["post"],
              visible: true,
            },
            {
              id: 3,
              description: "post_id should be PRIMARY KEY",
              type: "syntax-validation",
              expectedKeywords: ["post_id", "primary key"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain FOREIGN KEY constraint",
              type: "syntax-validation",
              expectedKeywords: ["foreign key"],
              visible: true,
            },
            {
              id: 5,
              description: "Foreign key should reference user table",
              type: "syntax-validation",
              expectedKeywords: ["references user"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should contain ON DELETE CASCADE",
              type: "syntax-validation",
              expectedKeywords: ["on delete cascade"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-03",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Created comment posts",
          description:
            "In this practice set, let's build a relational database for a typical social networking site.In a social networking site, we have user, post, group, and comment entities.Use Case: user can create multiple posts. Each post can have only one user.A user can make multiple comments to a post. Each comment can have only one user.A post can have multiple comments. Each comment can have only one post.A user can be in multiple groups. Each group can have multiple users.",
          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            user: {
              columns: ["id", "name", "gender", "email_id"],
              rows: [
                [1, "Prathibha", "Female", "prathibha@gmail.com"],
                [2, "Ramesh", "Male", "ramesh@gmail.com"],
                [3, "Sneha", "Female", "sneha@gmail.com"],
                [4, "Arjun", "Male", "arjun@gmail.com"],
              ],
            },

            post: {
              columns: ["post_id", "content", "published_at", "user_id"],
              rows: [
                [101, "Learning SQL is interesting!", "2026-02-20 10:30:00", 1],
                [102, "Database design concepts", "2026-02-21 11:00:00", 2],
                [
                  103,
                  "Frontend vs Backend discussion",
                  "2026-02-22 09:15:00",
                  1,
                ],
                [104, "React Hooks explanation", "2026-02-23 04:45:00", 3],
              ],
            },

            comment: {
              columns: [
                "comment_id",
                "content",
                "commented_at",
                "user_id",
                "post_id",
              ],
              rows: [
                [1001, "Very useful post!", "2026-02-20 11:00:00", 2, 101],
                [1002, "Thanks for sharing!", "2026-02-21 12:10:00", 3, 102],
                [1003, "Great explanation", "2026-02-22 10:00:00", 4, 103],
                [1004, "Helpful content", "2026-02-23 05:00:00", 1, 104],
              ],
            },

            group_details: {
              columns: ["id", "name"],
              rows: [
                [201, "SQL Learners"],
                [202, "React Developers"],
                [203, "Full Stack Engineers"],
              ],
            },

            user_group: {
              columns: ["user_id", "group_id", "joined_at", "is_admin"],
              rows: [
                [1, 201, "2026-02-01 09:00:00", true],
                [2, 201, "2026-02-02 10:00:00", false],
                [3, 202, "2026-02-03 11:00:00", true],
                [4, 203, "2026-02-04 12:00:00", false],
                [1, 202, "2026-02-05 01:00:00", false],
              ],
            },
          },

          descriptionDetails: `
              <div class="desc-question-details">
                <p class="desc-que-blue">Question</p>
                <p>We have created user and post tables in the database.</p>
                <p>Now, users want to comment on the posts. So, let's create a comment table.</p>
                <p>Write a query to represent the comment entity type, and its relation with user and post entity types.</p>
                <p>Below are the attributes of the comment entity type.</p>

                <div class="sql-table-desc">
                  <table>
                    <thead>
                      <tr>
                        <th>attribute</th>
                        <th>description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>comment_id</td><td>an integer to uniquely identify a comment - key attribute</td></tr>
                      <tr><td>content</td><td>a text field</td></tr>
                      <tr><td>commented_at</td><td>a datetime field</td></tr>
                    </tbody>
                  </table>
                </div>

                <div class="Note-container">
                  <div class="icon-note">
                    <h6>
                      <i class="bi bi-journal-text"></i>Note
                    </h6>
                  </div>
                  <ul>
                    <li>If we delete a user from the user table, then the related comments in the comment table must be automatically deleted.</li>
                    <li>If we delete a post from the post table, then the related comments in the comment table must be automatically deleted.</li>
                  </ul>
                </div>
              </div>
            `,

          testCases: [
            {
              id: 1,
              description: "Query should start with CREATE TABLE",
              type: "syntax-validation",
              expectedKeywords: ["create table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be comment",
              type: "syntax-validation",
              expectedKeywords: ["comment"],
              visible: true,
            },
            {
              id: 3,
              description: "comment_id should be PRIMARY KEY",
              type: "syntax-validation",
              expectedKeywords: ["comment_id", "primary key"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain FOREIGN KEY constraint",
              type: "syntax-validation",
              expectedKeywords: ["foreign key"],
              visible: true,
            },
            {
              id: 5,
              description: "Foreign key should reference user table",
              type: "syntax-validation",
              expectedKeywords: ["references user"],
              visible: true,
            },
            {
              id: 6,
              description: "Foreign key should reference post table",
              type: "syntax-validation",
              expectedKeywords: ["references post"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain ON DELETE CASCADE for user",
              type: "syntax-validation",
              expectedKeywords: ["references user", "on delete cascade"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should contain ON DELETE CASCADE for post",
              type: "syntax-validation",
              expectedKeywords: ["references post", "on delete cascade"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-04",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Group details table",
          description:
            "In this practice set, let's build a relational database for a typical social networking site.In a social networking site, we have user, post, group, and comment entities.Use Case: user can create multiple posts. Each post can have only one user.A user can make multiple comments to a post. Each comment can have only one user.A post can have multiple comments. Each comment can have only one post.A user can be in multiple groups. Each group can have multiple users.",
          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            user: {
              columns: ["id", "name", "gender", "email_id"],
              rows: [
                [1, "Prathibha", "Female", "prathibha@gmail.com"],
                [2, "Ramesh", "Male", "ramesh@gmail.com"],
                [3, "Sneha", "Female", "sneha@gmail.com"],
                [4, "Arjun", "Male", "arjun@gmail.com"],
              ],
            },

            post: {
              columns: ["post_id", "content", "published_at", "user_id"],
              rows: [
                [101, "Learning SQL is interesting!", "2026-02-20 10:30:00", 1],
                [102, "Database design concepts", "2026-02-21 11:00:00", 2],
                [
                  103,
                  "Frontend vs Backend discussion",
                  "2026-02-22 09:15:00",
                  1,
                ],
                [104, "React Hooks explanation", "2026-02-23 04:45:00", 3],
              ],
            },

            comment: {
              columns: [
                "comment_id",
                "content",
                "commented_at",
                "user_id",
                "post_id",
              ],
              rows: [
                [1001, "Very useful post!", "2026-02-20 11:00:00", 2, 101],
                [1002, "Thanks for sharing!", "2026-02-21 12:10:00", 3, 102],
                [1003, "Great explanation", "2026-02-22 10:00:00", 4, 103],
                [1004, "Helpful content", "2026-02-23 05:00:00", 1, 104],
              ],
            },

            group_details: {
              columns: ["id", "name"],
              rows: [
                [201, "SQL Learners"],
                [202, "React Developers"],
                [203, "Full Stack Engineers"],
              ],
            },

            user_group: {
              columns: ["user_id", "group_id", "joined_at", "is_admin"],
              rows: [
                [1, 201, "2026-02-01 09:00:00", true],
                [2, 201, "2026-02-02 10:00:00", false],
                [3, 202, "2026-02-03 11:00:00", true],
                [4, 203, "2026-02-04 12:00:00", false],
                [1, 202, "2026-02-05 01:00:00", false],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Question</p>
              <p>Any social network application has groups with users of similar interests.</p>
              <p>Now, let’s create a group_details table that stores the information about a group.</p>
              <p>Write a query to represent the group_details entity type in the relational database.</p>
              <p>Below are the attributes of the group_details entity type.</p>

              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>attribute</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>id</td>
                      <td>an integer to uniquely identify a group - key attribute</td>
                    </tr>
                    <tr>
                      <td>name</td>
                      <td>a string of max length 500 characters</td>
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
                <ul>
                  <li>The id should be the PRIMARY KEY of the table.</li>
                  <li>The name attribute should support a maximum of 500 characters.</li>
                </ul>
              </div>
            </div>
            `,

          testCases: [
            {
              id: 1,
              description: "Query should start with CREATE TABLE",
              type: "syntax-validation",
              expectedKeywords: ["create table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be group_details",
              type: "syntax-validation",
              expectedKeywords: ["group_details"],
              visible: true,
            },
            {
              id: 3,
              description: "id should be PRIMARY KEY",
              type: "syntax-validation",
              expectedKeywords: ["id", "primary key"],
              visible: true,
            },
            {
              id: 4,
              description: "id should be INTEGER",
              type: "syntax-validation",
              expectedKeywords: ["id integer"],
              visible: true,
            },
            {
              id: 5,
              description: "name should be VARCHAR(500)",
              type: "syntax-validation",
              expectedKeywords: ["name varchar(500)"],
              visible: true,
            },
            {
              id: 6,
              description: "id should be NOT NULL",
              type: "syntax-validation",
              expectedKeywords: ["id", "not null"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-05",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Create user group table",
          description:
            "In this practice set, let's build a relational database for a typical social networking site.In a social networking site, we have user, post, group, and comment entities.Use Case: user can create multiple posts. Each post can have only one user.A user can make multiple comments to a post. Each comment can have only one user.A post can have multiple comments. Each comment can have only one post.A user can be in multiple groups. Each group can have multiple users.",
          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            user: {
              columns: ["id", "name", "gender", "email_id"],
              rows: [
                [1, "Prathibha", "Female", "prathibha@gmail.com"],
                [2, "Ramesh", "Male", "ramesh@gmail.com"],
                [3, "Sneha", "Female", "sneha@gmail.com"],
                [4, "Arjun", "Male", "arjun@gmail.com"],
              ],
            },

            post: {
              columns: ["post_id", "content", "published_at", "user_id"],
              rows: [
                [101, "Learning SQL is interesting!", "2026-02-20 10:30:00", 1],
                [102, "Database design concepts", "2026-02-21 11:00:00", 2],
                [
                  103,
                  "Frontend vs Backend discussion",
                  "2026-02-22 09:15:00",
                  1,
                ],
                [104, "React Hooks explanation", "2026-02-23 04:45:00", 3],
              ],
            },

            comment: {
              columns: [
                "comment_id",
                "content",
                "commented_at",
                "user_id",
                "post_id",
              ],
              rows: [
                [1001, "Very useful post!", "2026-02-20 11:00:00", 2, 101],
                [1002, "Thanks for sharing!", "2026-02-21 12:10:00", 3, 102],
                [1003, "Great explanation", "2026-02-22 10:00:00", 4, 103],
                [1004, "Helpful content", "2026-02-23 05:00:00", 1, 104],
              ],
            },

            group_details: {
              columns: ["id", "name"],
              rows: [
                [201, "SQL Learners"],
                [202, "React Developers"],
                [203, "Full Stack Engineers"],
              ],
            },

            user_group: {
              columns: ["user_id", "group_id", "joined_at", "is_admin"],
              rows: [
                [1, 201, "2026-02-01 09:00:00", true],
                [2, 201, "2026-02-02 10:00:00", false],
                [3, 202, "2026-02-03 11:00:00", true],
                [4, 203, "2026-02-04 12:00:00", false],
                [1, 202, "2026-02-05 01:00:00", false],
              ],
            },
          },

          descriptionDetails: `
        <div class="desc-question-details">
          <p class="desc-que-blue">Question</p>
          <p>A user can be in multiple groups, and a group can contain many users.</p>
          <p>Now, let’s create user_group table to capture the many-to-many relationship between user and group entity types.</p>
          <p>Write a query to represent this relationship in the relational database.</p>
          <p>Below are the attributes of the relationship.</p>

          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                  <th>attribute</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>joined_at</td>
                  <td>a datetime field</td>
                </tr>
                <tr>
                  <td>is_admin</td>
                  <td>a boolean field</td>
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
            <ul>
              <li>This table should act as a junction table between user and group_details tables.</li>
              <li>If a user is deleted, then the related records in user_group must be automatically deleted.</li>
              <li>If a group is deleted, then the related records in user_group must be automatically deleted.</li>
              <li>Use appropriate FOREIGN KEY constraints with ON DELETE CASCADE.</li>
            </ul>
          </div>
        </div>
      `,

          testCases: [
            {
              id: 1,
              description: "Query should start with CREATE TABLE",
              type: "syntax-validation",
              expectedKeywords: ["create table"],
              visible: true,
            },
            {
              id: 2,
              description: "Table name should be user_group",
              type: "syntax-validation",
              expectedKeywords: ["user_group"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain user_id column",
              type: "syntax-validation",
              expectedKeywords: ["user_id"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should contain group_id column",
              type: "syntax-validation",
              expectedKeywords: ["group_id"],
              visible: true,
            },
            {
              id: 5,
              description:
                "Query should contain joined_at column with DATETIME type",
              type: "syntax-validation",
              expectedKeywords: ["joined_at", "datetime"],
              visible: true,
            },
            {
              id: 6,
              description:
                "Query should contain is_admin column with BOOLEAN type",
              type: "syntax-validation",
              expectedKeywords: ["is_admin", "bool"],
              visible: true,
            },
            {
              id: 7,
              description:
                "Foreign key should reference user table with ON DELETE CASCADE",
              type: "syntax-validation",
              expectedKeywords: [
                "foreign key",
                "references user",
                "on delete cascade",
              ],
              visible: true,
            },
            {
              id: 8,
              description:
                "Foreign key should reference group_details table with ON DELETE CASCADE",
              type: "syntax-validation",
              expectedKeywords: [
                "foreign key",
                "references group_details",
                "on delete cascade",
              ],
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Practice 9
    {
      id: "sql-coding-practice-9",
      title: "SQL Coding Practice 9",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-9-01",
          title: "Natural join",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            course: {
              columns: ["id", "name", "duration", "instructor_id"],
              rows: [
                [11, "Machine Learning", 90, 102],
                [12, "Artificial Intelligence", 90, 102],
                [13, "Data Science", 60, 103],
                [14, "Augmented Reality", 80, 104],
                [15, "Cyber Security", 60, 101],
                [16, "Virtual Reality", 80, 105],
                [18, "Big Data", 20, 108],
                [20, "Cloud Computing", 15, 101],
                [22, "Linux", 20, 102],
              ],
            },

            instructor: {
              columns: ["instructor_id", "full_name", "gender"],
              rows: [
                [101, "Alex", "M"],
                [102, "Arun", "M"],
                [103, "Robert A. Iyer", "M"],
                [104, "Bhavani", "F"],
                [105, "Bentlee", "M"],
                [108, "Nihonbashi", "M"],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>Perform natural join between course and instructor table.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Do not apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem.</p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>id</th>
            <th>name</th>
            <th>duration</th>
            <th>instructor_id</th>
            <th>full_name</th>
            <th>gender</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>
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
              description: "Query should select all columns using *",
              type: "syntax-validation",
              expectedKeywords: ["select *"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should contain FROM course",
              type: "syntax-validation",
              expectedKeywords: ["from course"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should use NATURAL JOIN",
              type: "syntax-validation",
              expectedKeywords: ["natural join"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should join instructor table",
              type: "syntax-validation",
              expectedKeywords: ["instructor"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-02",
          title: "Inner join",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            review: {
              columns: [
                "id",
                "course_id",
                "content",
                "created_at",
                "student_id",
              ],
              rows: [
                [1, 11, "Excellent course", "2024-01-10", 201],
                [2, 12, "Very informative", "2024-01-15", 202],
                [3, 13, "Good explanation", "2024-02-01", 203],
                [4, 15, "Loved the examples", "2024-02-05", 201],
                [5, 20, "Needs improvement", "2024-02-10", 204],
                [6, 18, "Well structured", "2024-02-20", 205],
              ],
            },

            student: {
              columns: ["id", "full_name", "age", "gender"],
              rows: [
                [201, "Rahul Sharma", 21, "M"],
                [202, "Sneha Kapoor", 22, "F"],
                [203, "Arjun Verma", 20, "M"],
                [204, "Meera Iyer", 23, "F"],
                [205, "Karan Mehta", 24, "M"],
                [206, "Priya Singh", 22, "F"],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>Perform inner join betweenreviewandstudenttable.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Do not apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem.</p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>id</th>
            <th>course_id</th>
            <th>content</th>
            <th>created_at</th>
            <th>student_id</th>
            <th>id</th>
            <th>full_name</th>
            <th>age</th>
            <th>gender</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>
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
              description: "Query should contain FROM clause",
              type: "syntax-validation",
              expectedKeywords: ["from"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should reference review table",
              type: "syntax-validation",
              expectedKeywords: ["review"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should reference student table",
              type: "syntax-validation",
              expectedKeywords: ["student"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should use INNER JOIN",
              type: "syntax-validation",
              expectedKeywords: ["inner join"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use ON condition",
              type: "syntax-validation",
              expectedKeywords: ["on"],
              visible: true,
            },
            {
              id: 7,
              description:
                "Query should join on student.id = review.student_id",
              type: "syntax-validation",
              expectedKeywords: ["student.id", "review.student_id"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-03",
          title: "course names",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            review: {
              columns: [
                "id",
                "course_id",
                "content",
                "created_at",
                "student_id",
              ],
              rows: [
                [1, 11, "Excellent course", "2024-01-10", 201],
                [2, 12, "Very informative", "2024-01-15", 202],
                [3, 13, "Good explanation", "2024-02-01", 203],
                [4, 15, "Loved the examples", "2024-02-05", 201],
                [5, 20, "Needs improvement", "2024-02-10", 204],
                [6, 18, "Well structured", "2024-02-20", 205],
              ],
            },

            course: {
              columns: ["id", "name", "duration", "instructor_id"],
              rows: [
                [11, "Machine Learning", 90, 102],
                [12, "Artificial Intelligence", 90, 102],
                [13, "Data Science", 60, 103],
                [14, "Augmented Reality", 80, 104],
                [15, "Cyber Security", 60, 101],
                [16, "Virtual Reality", 80, 105],
                [18, "Big Data", 20, 108],
                [20, "Cloud Computing", 15, 101],
                [22, "Linux", 20, 102],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>Get all the reviews along with the course names.
             Every review is associated with a course. So, we can perform an inner join on review and course tables.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Do not apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem.</p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>id</th>
            <th>course_id</th>
            <th>content</th>
            <th>created_at</th>
            <th>student_id</th>
            <th>id</th>
            <th>name</th>
            <th>duration</th>
            <th>instructor_id</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>
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
              description: "Query should contain FROM review",
              type: "syntax-validation",
              expectedKeywords: ["from review"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use INNER JOIN",
              type: "syntax-validation",
              expectedKeywords: ["inner join"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should join course table",
              type: "syntax-validation",
              expectedKeywords: ["join course"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain ON condition",
              type: "syntax-validation",
              expectedKeywords: ["on course.id = review.course_id"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-04",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Cyber Security",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 30,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            review: {
              columns: [
                "id",
                "course_id",
                "content",
                "created_at",
                "student_id",
              ],
              rows: [
                [1, 11, "Excellent course", "2024-01-10", 201],
                [2, 12, "Very informative", "2024-01-15", 202],
                [3, 13, "Good explanation", "2024-02-01", 203],
                [4, 15, "Loved the examples", "2024-02-05", 201],
                [5, 20, "Needs improvement", "2024-02-10", 204],
                [6, 18, "Well structured", "2024-02-20", 205],
              ],
            },

            course: {
              columns: ["id", "name", "duration", "instructor_id"],
              rows: [
                [11, "Machine Learning", 90, 102],
                [12, "Artificial Intelligence", 90, 102],
                [13, "Data Science", 60, 103],
                [14, "Augmented Reality", 80, 104],
                [15, "Cyber Security", 60, 101],
                [16, "Virtual Reality", 80, 105],
                [18, "Big Data", 20, 108],
                [20, "Cloud Computing", 15, 101],
                [22, "Linux", 20, 102],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>Continuation of question course names</p>
             <p>Get all the reviews on the “Cyber Security” course.
             
             </p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul>
             <li>Do not apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem.</li>
            <li>We can perform inner join onreviewandcoursetable.</li></ul>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
               <thead>
                 <tr>
                   <th>id</th>
                   <th>course_id</th>
                   <th>content</th>
                   <th>created_at</th>
                   <th>student_id</th>
                   <th>id</th>
                   <th>name</th>
                   <th>duration</th>
                   <th>instructor_id</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>--</td>
                   <td>--</td>
                   <td>--</td>
                   <td>--</td>
                   <td>--</td>
                   <td>--</td>
                   <td>--</td>
                   <td>--</td>
                   <td>--</td>
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
              description: "Query should contain FROM review",
              type: "syntax-validation",
              expectedKeywords: ["from review"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use INNER JOIN",
              type: "syntax-validation",
              expectedKeywords: ["inner join"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should join course table",
              type: "syntax-validation",
              expectedKeywords: ["join course"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain ON condition",
              type: "syntax-validation",
              expectedKeywords: ["on course.id = review.course_id"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter for 'Cyber Security' course",
              type: "syntax-validation",
              expectedKeywords: ['where course.name like "cyber security"'],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-05",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Get all the courses ",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            review: {
              columns: [
                "id",
                "course_id",
                "content",
                "created_at",
                "student_id",
              ],
              rows: [
                [1, 11, "Excellent course", "2024-01-10", 201],
                [2, 12, "Very informative", "2024-01-15", 202],
                [3, 13, "Good explanation", "2024-02-01", 203],
                [4, 15, "Loved the examples", "2024-02-05", 201],
                [5, 20, "Needs improvement", "2024-02-10", 204],
                [6, 18, "Well structured", "2024-02-20", 205],
              ],
            },

            course: {
              columns: ["id", "name", "duration", "instructor_id"],
              rows: [
                [11, "Machine Learning", 90, 102],
                [12, "Artificial Intelligence", 90, 102],
                [13, "Data Science", 60, 103],
                [14, "Augmented Reality", 80, 104],
                [15, "Cyber Security", 60, 101],
                [16, "Virtual Reality", 80, 105],
                [18, "Big Data", 20, 108],
                [20, "Cloud Computing", 15, 101],
                [22, "Linux", 20, 102],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>Continuation of question course names</p>
             <p>Get all the reviews on the “Cyber Security” course.
             
             </p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
            <p>Don't apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem</p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
               <thead>
                 <tr>
                   <th>id</th>
                   <th>name</th>
                   <th>duration</th>
                   <th>instructor_id</th>
                   <th>id</th>
                   <th>course_id</th>
                   <th>content</th>
                   <th>created_at</th>
                   <th>student_id</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>...</td>
                   <td>...</td>
                   <td>...</td>
                   <td>...</td>
                   <td>...</td>
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
              description: "Query should contain FROM course",
              type: "syntax-validation",
              expectedKeywords: ["from course"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use LEFT JOIN",
              type: "syntax-validation",
              expectedKeywords: ["left join"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should join review table",
              type: "syntax-validation",
              expectedKeywords: ["join review"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain ON condition for joining",
              type: "syntax-validation",
              expectedKeywords: ["on review.course_id = course.id"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-06",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Left join",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            review: {
              columns: [
                "id",
                "course_id",
                "content",
                "created_at",
                "student_id",
              ],
              rows: [
                [1, 11, "Excellent course", "2024-01-10", 201],
                [2, 12, "Very informative", "2024-01-15", 202],
                [3, 13, "Good explanation", "2024-02-01", 203],
                [4, 15, "Loved the examples", "2024-02-05", 201],
                [5, 20, "Needs improvement", "2024-02-10", 204],
                [6, 18, "Well structured", "2024-02-20", 205],
              ],
            },

            course: {
              columns: ["id", "name", "duration", "instructor_id"],
              rows: [
                [11, "Machine Learning", 90, 102],
                [12, "Artificial Intelligence", 90, 102],
                [13, "Data Science", 60, 103],
                [14, "Augmented Reality", 80, 104],
                [15, "Cyber Security", 60, 101],
                [16, "Virtual Reality", 80, 105],
                [18, "Big Data", 20, 108],
                [20, "Cloud Computing", 15, 101],
                [22, "Linux", 20, 102],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>Continuation of question course names</p>
             <p>
             For the “Cyber Security” course, get all the reviews using the left join between the course and review tables.
             </p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
            <p>Don't apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem</p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>duration</th>
                  <th>instructor_id</th>
                  <th>id</th>
                  <th>course_id</th>
                  <th>content</th>
                  <th>created_at</th>
                  <th>student_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
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
              description: "Query should contain FROM course",
              type: "syntax-validation",
              expectedKeywords: ["from course"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use LEFT JOIN",
              type: "syntax-validation",
              expectedKeywords: ["left join"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should join review table",
              type: "syntax-validation",
              expectedKeywords: ["join review"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain proper ON condition",
              type: "syntax-validation",
              expectedKeywords: ["on review.course_id = course.id"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter for Cyber Security course",
              type: "syntax-validation",
              expectedKeywords: ['where course.name like "cyber security"'],
              visible: true,
            },
            {
              id: 7,
              description: "Query should not contain ORDER BY clause",
              type: "syntax-validation",
              unexpectedKeywords: ["order by"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should not contain LIMIT clause",
              type: "syntax-validation",
              unexpectedKeywords: ["limit"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should not contain OFFSET clause",
              type: "syntax-validation",
              unexpectedKeywords: ["offset"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-9-07",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Left join Linux course",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            review: {
              columns: [
                "id",
                "course_id",
                "content",
                "created_at",
                "student_id",
              ],
              rows: [
                [1, 11, "Excellent course", "2024-01-10", 201],
                [2, 12, "Very informative", "2024-01-15", 202],
                [3, 13, "Good explanation", "2024-02-01", 203],
                [4, 15, "Loved the examples", "2024-02-05", 201],
                [5, 20, "Needs improvement", "2024-02-10", 204],
                [6, 18, "Well structured", "2024-02-20", 205],
              ],
            },

            course: {
              columns: ["id", "name", "duration", "instructor_id"],
              rows: [
                [11, "Machine Learning", 90, 102],
                [12, "Artificial Intelligence", 90, 102],
                [13, "Data Science", 60, 103],
                [14, "Augmented Reality", 80, 104],
                [15, "Cyber Security", 60, 101],
                [16, "Virtual Reality", 80, 105],
                [18, "Big Data", 20, 108],
                [20, "Cloud Computing", 15, 101],
                [22, "Linux", 20, 102],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>Continuation of question course names</p>
             <p>
             For the “Linux” course, get all the reviews using the left join between the course and review tables.
             </p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
            <p>Don't apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem</p>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>duration</th>
                  <th>instructor_id</th>
                  <th>id</th>
                  <th>course_id</th>
                  <th>content</th>
                  <th>created_at</th>
                  <th>student_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
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
              description: "Query should contain FROM course",
              type: "syntax-validation",
              expectedKeywords: ["from course"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should use LEFT JOIN",
              type: "syntax-validation",
              expectedKeywords: ["left join"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should join review table",
              type: "syntax-validation",
              expectedKeywords: ["join review"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain proper ON condition",
              type: "syntax-validation",
              expectedKeywords: ["on review.course_id = course.id"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter for Linux course",
              type: "syntax-validation",
              expectedKeywords: ['where course.name like "linux"'],
              visible: true,
            },
            {
              id: 7,
              description: "Query should not contain ORDER BY clause",
              type: "syntax-validation",
              unexpectedKeywords: ["order by"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should not contain LIMIT clause",
              type: "syntax-validation",
              unexpectedKeywords: ["limit"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should not contain OFFSET clause",
              type: "syntax-validation",
              unexpectedKeywords: ["offset"],
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Practice 10
    {
      id: "sql-coding-practice-10",
      title: "SQL Coding Practice 10",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-10-1",
          title: "All courses Alex",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            course: {
              columns: ["id", "name", "duration", "instructor_id"],
              rows: [
                [11, "Machine Learning", 90, 102],
                [12, "Artificial Intelligence", 90, 102],
                [13, "Data Science", 60, 103],
                [14, "Augmented Reality", 80, 104],
                [15, "Cyber Security", 60, 101],
                [16, "Virtual Reality", 80, 105],
                [18, "Big Data", 20, 108],
                [20, "Cloud Computing", 15, 101],
                [22, "Linux", 20, 102],
              ],
            },

            instructor: {
              columns: ["instructor_id", "full_name", "gender"],
              rows: [
                [101, "Alex", "M"],
                [102, "Arun", "M"],
                [103, "Robert A. Iyer", "M"],
                [104, "Bhavani", "F"],
                [105, "Bentlee", "M"],
                [108, "Nihonbashi", "M"],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>Fetch all the courses that are being taught by “Alex”.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul>
             <li>Fetch all the courses that are being taught by “Alex”.</li>
             <li>As we only want the courses taught by "Alex", we have to apply filter condition.</li>
             <li>Don't apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem.</li>
             </ul>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>course_id</th>
            <th>course_name</th>
            <th>instructor_name</th>
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
              description: "Query should select course.id as course_id",
              type: "syntax-validation",
              expectedKeywords: ["course.id as course_id"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should select course.name as course_name",
              type: "syntax-validation",
              expectedKeywords: ["course.name as course_name"],
              visible: true,
            },
            {
              id: 4,
              description:
                "Query should select instructor.full_name as instructor_name",
              type: "syntax-validation",
              expectedKeywords: ["instructor.full_name as instructor_name"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain FROM course",
              type: "syntax-validation",
              expectedKeywords: ["from course"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use NATURAL JOIN instructor",
              type: "syntax-validation",
              expectedKeywords: ["natural join instructor"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should filter instructor.full_name = 'Alex'",
              type: "syntax-validation",
              expectedKeywords: ["where instructor.full_name ="],
              visible: true,
            },
            {
              id: 8,
              description: "Query should not contain ORDER BY clause",
              type: "syntax-validation",
              unexpectedKeywords: ["order by"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should not contain LIMIT clause",
              type: "syntax-validation",
              unexpectedKeywords: ["limit"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should not contain OFFSET clause",
              type: "syntax-validation",
              unexpectedKeywords: ["offset"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-10-2",
          title: "Cyber Security course",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            course: {
              columns: ["id", "name", "duration", "instructor_id"],
              rows: [
                [11, "Machine Learning", 90, 102],
                [12, "Artificial Intelligence", 90, 102],
                [13, "Data Science", 60, 103],
                [14, "Augmented Reality", 80, 104],
                [15, "Cyber Security", 60, 101],
                [16, "Virtual Reality", 80, 105],
                [18, "Big Data", 20, 108],
                [20, "Cloud Computing", 15, 101],
                [22, "Linux", 20, 102],
              ],
            },

            instructor: {
              columns: ["instructor_id", "full_name", "gender"],
              rows: [
                [101, "Alex", "M"],
                [102, "Arun", "M"],
                [103, "Robert A. Iyer", "M"],
                [104, "Bhavani", "F"],
                [105, "Bentlee", "M"],
                [108, "Nihonbashi", "M"],
              ],
            },

            review: {
              columns: [
                "id",
                "course_id",
                "content",
                "created_at",
                "student_id",
              ],
              rows: [
                [1, 15, "Very informative course", "2023-01-10", 201],
                [2, 15, "Excellent security concepts", "2023-02-12", 202],
                [3, 11, "Great ML explanations", "2023-03-01", 203],
                [4, 20, "Good cloud basics", "2023-03-15", 204],
              ],
            },
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>Get all the reviews of “Cyber Security” course .</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul>
             <li>Solving this problem involves performing inner join on review and coursetables.</li>
             <li>Don't apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem.</li>
             </ul>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
            <th>course_name</th>
            <th>student_id</th>
            <th>content</th>
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
              description: "Query should select course.name as course_name",
              type: "syntax-validation",
              expectedKeywords: ["course.name as course_name"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should select review.student_id",
              type: "syntax-validation",
              expectedKeywords: ["review.student_id"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select review.content",
              type: "syntax-validation",
              expectedKeywords: ["review.content"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should contain FROM review",
              type: "syntax-validation",
              expectedKeywords: ["from review"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use INNER JOIN course",
              type: "syntax-validation",
              expectedKeywords: ["inner join course"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should join on review.course_id = course.id",
              type: "syntax-validation",
              expectedKeywords: ["review.course_id = course.id"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should filter course.name = 'Cyber Security'",
              type: "syntax-validation",
              expectedKeywords: ["where course.name ="],
              visible: true,
            },
            {
              id: 9,
              description: "Query should not contain ORDER BY",
              type: "syntax-validation",
              unexpectedKeywords: ["order by"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should not contain LIMIT",
              type: "syntax-validation",
              unexpectedKeywords: ["limit"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-10-3",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Student ID",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            course: {
              columns: ["id", "name", "duration", "instructor_id"],
              rows: [
                [11, "Machine Learning", 90, 102],
                [12, "Artificial Intelligence", 90, 102],
                [13, "Data Science", 60, 103],
                [14, "Augmented Reality", 80, 104],
                [15, "Cyber Security", 60, 101],
                [16, "Virtual Reality", 80, 105],
                [18, "Big Data", 20, 108],
                [20, "Cloud Computing", 15, 101],
                [22, "Linux", 20, 102],
              ],
            },

            instructor: {
              columns: ["instructor_id", "full_name", "gender"],
              rows: [
                [101, "Alex", "M"],
                [102, "Arun", "M"],
                [103, "Robert A. Iyer", "M"],
                [104, "Bhavani", "F"],
                [105, "Bentlee", "M"],
                [108, "Nihonbashi", "M"],
              ],
            },

            review: {
              columns: [
                "id",
                "course_id",
                "content",
                "created_at",
                "student_id",
              ],
              rows: [
                [1, 15, "Very informative course", "2023-01-10", 201],
                [2, 15, "Excellent security concepts", "2023-02-12", 202],
                [3, 11, "Great ML explanations", "2023-03-01", 203],
                [4, 20, "Good cloud basics", "2023-03-15", 204],
              ],
            },
            student_course: {
            columns: ["id", "student_id", "course_id", "score", "enrollment_date"],
            rows: [
              [1, 1, 11, 85, "2021-01-15"],
              [2, 1, 12, 90, "2021-06-10"],
              [3, 1, 15, 88, "2020-03-05"],  
              [4, 2, 13, 75, "2021-04-20"],  
              [5, 1, 20, 92, "2022-02-12"],  
            ],
          }
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
              <img
              src="/assets/img/joins_db_diagram_coding_pratice.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <ul>
            <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
            <li>A student can enroll for multiple courses. A course can have multiple students.</li>
            <li>A student can give multiple reviews.</li>
            <li>A course can have multiple reviews</li>
            </ul>
            <p>Refer the tables in the code playground for a better understanding of the database.</p>

       
              <p class="desc-que-blue">Question</p>
             <p>For a student with student (id = 1), get all the courses and the scores she/he secured in the year 2021.</p>
             <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul>
             <li>Solving this question involves performing inner join on student_course and course tables.</li>
             <li>You can get the year from the enrollment date.</li>
             <li>Don't apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem.</li>
             </ul>
             </div>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
              <table>
                <thead>
                  <tr>
                    <th>student_id</th>
                    <th>name</th>
                    <th>score</th>
                  </tr>
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
            description: "Query should select student_course.student_id",
            type: "syntax-validation",
            expectedKeywords: ["student_course.student_id"],
            visible: true,
          },
          {
            id: 3,
            description: "Query should select course.name",
            type: "syntax-validation",
            expectedKeywords: ["course.name"],
            visible: true,
          },
          {
            id: 4,
            description: "Query should select student_course.score",
            type: "syntax-validation",
            expectedKeywords: ["student_course.score"],
            visible: true,
          },
          {
            id: 5,
            description: "Query should contain FROM course",
            type: "syntax-validation",
            expectedKeywords: ["from course"],
            visible: true,
          },
          {
            id: 6,
            description: "Query should use INNER JOIN student_course",
            type: "syntax-validation",
            expectedKeywords: ["inner join student_course"],
            visible: true,
          },
          {
            id: 7,
            description: "Query should join on course.id = student_course.course_id",
            type: "syntax-validation",
            expectedKeywords: ["course.id = student_course.course_id"],
            visible: true,
          },
          {
            id: 8,
            description: "Query should filter student_id = 1",
            type: "syntax-validation",
            expectedKeywords: ["student_course.student_id = 1"],
            visible: true,
          },
          {
            id: 9,
            description: "Query should filter year 2021 using strftime",
            type: "syntax-validation",
            expectedKeywords: ['strftime("%Y", enrollment_date) = \'2021\''],
            visible: true,
          },
          {
            id: 10,
            description: "Query should not contain ORDER BY",
            type: "syntax-validation",
            unexpectedKeywords: ["order by"],
            visible: true,
          },
        ],
        },
        {
          id: "sql-query-10-4",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Scored more than 70 in Cyber Security",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 30,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
        course: {
          columns: ["id", "name", "duration", "instructor_id"],
          rows: [
            [11, "Machine Learning", 90, 102],
            [12, "Artificial Intelligence", 90, 102],
            [13, "Data Science", 60, 103],
            [14, "Augmented Reality", 80, 104],
            [15, "Cyber Security", 60, 101],
            [16, "Virtual Reality", 80, 105],
            [18, "Big Data", 20, 108],
            [20, "Cloud Computing", 15, 101],
            [22, "Linux", 20, 102],
          ],
        },

        student: {
          columns: ["id", "full_name", "email"],
          rows: [
            [1, "John Carter", "john@gmail.com"],
            [2, "Emma Watson", "emma@gmail.com"],
            [3, "David Miller", "david@gmail.com"],
            [4, "Sophia Brown", "sophia@gmail.com"],
            [5, "Liam Anderson", "liam@gmail.com"],
          ],
        },

        student_course: {
          columns: ["student_id", "course_id", "score", "enrollment_date"],
          rows: [
            [1, 15, 75, "2020-03-15"],  // ✅ Should appear
            [2, 15, 82, "2020-07-20"],  // ✅ Should appear
            [3, 15, 69, "2020-05-10"],  // ❌ score < 70
            [4, 15, 90, "2021-01-10"],  // ❌ wrong year
            [5, 11, 88, "2020-08-12"],  // ❌ wrong course
            [1, 15, 65, "2020-11-11"],  // ❌ score < 70
          ],
        },
      },
      descriptionDetails: `
        <div class="desc-question-details">
          <p class="desc-que-blue">Database</p>
          <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
          <img
          src="/assets/img/joins_db_diagram_coding_pratice.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />
        <ul>
        <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
        <li>A student can enroll for multiple courses. A course can have multiple students.</li>
        <li>A student can give multiple reviews.</li>
        <li>A course can have multiple reviews</li>
        </ul>
        <p>Refer the tables in the code playground for a better understanding of the database.</p>
        <p class="desc-que-blue">Question</p>
          <p>Get all the student details who scored more than 70 in Cyber Security course (course_id = 15) in the year 2020.</p>
          <div class="Note-container">
          <div class="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <ul>
          <li>Solving this question involves performing inner join on student_course and student tables.</li>
          <li>You can get the year from the enrollment date.</li>
          <li>Don't apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem.</li>
          </ul>
          </div>
          <p class="desc-que-blue">Expected Output Format</p>
        <div class="sql-table-desc">
          <table>
            <thead>
              <tr>
                <th>student_id</th>
                <th>student_name</th>
                <th>score</th>
                <th>course_id</th>
                <th>enrollment_date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>...</td>
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
            description: "Should use INNER JOIN between student_course and student tables",
            type: "syntax-validation",
            expectedKeywords: ["inner join student"],
            visible: true,
          },
          {
            id: 3,
            description: "Should filter for course_id = 15 (Cyber Security)",
            type: "syntax-validation",
            expectedKeywords: ["course_id = 15"],
            visible: true,
          },
          {
            id: 4,
            description: "Should filter year 2020 using strftime function",
            type: "syntax-validation",
            expectedKeywords: ["strftime", "2020"],
            visible: true,
          },
          {
            id: 5,
            description: "Should filter score greater than or equal to 70",
            type: "syntax-validation",
            expectedKeywords: ["score >= 70"],
            visible: true,
          },
        ]
        },
        {
          id: "sql-query-10-5",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Machine Learning",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
        course: {
          columns: ["id", "name", "duration", "instructor_id"],
          rows: [
            [11, "Machine Learning", 90, 102],
            [12, "Artificial Intelligence", 90, 102],
            [13, "Data Science", 60, 103],
            [14, "Augmented Reality", 80, 104],
            [15, "Cyber Security", 60, 101],
            [16, "Virtual Reality", 80, 105],
            [18, "Big Data", 20, 108],
            [20, "Cloud Computing", 15, 101],
            [22, "Linux", 20, 102],
          ],
        },

        student_course: {
          columns: ["student_id", "course_id", "score", "enrollment_date"],
          rows: [
            [1, 11, 85, "2021-01-15"],  // ✅ Should appear
            [2, 11, 78, "2021-06-10"],  // ✅ Should appear
            [4, 11, 88, "2020-03-20"],  // ❌ Wrong year
            [6, 11, 67, "2022-04-18"],  // ❌ Wrong year
            
          ],
        },
      },
      descriptionDetails: `
        <div class="desc-question-details">
          <p class="desc-que-blue">Database</p>
          <p>The database stores the sample data of an e-learning platform. The database consists of instructor, course, review, and student tables.</p>
          <img
          src="/assets/img/joins_db_diagram_coding_pratice.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />
        <ul>
        <li>An instructor can teach many courses. A course is taught by only one instructor.</li>
        <li>A student can enroll for multiple courses. A course can have multiple students.</li>
        <li>A student can give multiple reviews.</li>
        <li>A course can have multiple reviews</li>
        </ul>
        <p>Refer the tables in the code playground for a better understanding of the database.</p>
        <p class="desc-que-blue">Question</p>
          <p>
Get all the student_ids who enrolled for the "Machine Learning" course in 2021.</p>
          <div class="Note-container">
          <div class="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <ul>
          <li>Solving this question involves performing inner join on student_course and course tables.</li>
          <li>You can get the year from the enrollment date.</li>
          <li>Don't apply ORDER BY, LIMIT, OFFSET clauses as it is not required for this problem.</li>
          </ul>
          </div>
          <p class="desc-que-blue">Expected Output Format</p>
        <div class="sql-table-desc">
          <table>
            <thead>
              <tr>
                <th>student_id</th>
                <th>course_name</th>
                <th>enrollment_date</th>
              </tr>
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
          description: "Should use INNER JOIN between student_course and course tables",
          type: "syntax-validation",
          expectedKeywords: ["inner join course"],
          visible: true,
        },
        {
          id: 3,
          description: "Should filter course name as Machine Learning",
          type: "syntax-validation",
          expectedKeywords: ["course.name", "machine learning"],
          visible: true,
        },
        {
          id: 4,
          description: "Should filter year 2021 using strftime function",
          type: "syntax-validation",
          expectedKeywords: ["strftime", "2021"],
          visible: true,
        }
      ]
        },
      ],
    },
    // SQL Practice 11
    {
      id: "sql-coding-practice-11",
      title: "SQL Coding Practice 11",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-11-1",
          title: "All courses Alex",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

            tableData: {
            user: {
              columns: ["user_id", "name", "age"],
              rows: [
                [1, "Aarav", 25],
                [2, "Bhavya", 30],
                [3, "Charan", 22],
                [4, "Divya", 28],
              ],
            },

            post: {
              columns: ["post_id", "content", "posted_at", "posted_by"],
              rows: [
                [101, "Hello World!", "2023-08-01 10:30:00", 1],
                [102, "Learning SQL is fun!", "2023-08-03 09:15:00", 2],
                [103, "Good Morning!", "2023-07-29 07:00:00", 3],
                [104, "Inner Join Practice", "2023-08-05 18:45:00", 1],
                [105, "Database Concepts", "2023-08-02 14:20:00", 4],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>In this practice set, let’s apply Joins to fetch meaningful data from a sample database of social networking application.</p>
              <p>The database contains user, post, comment and reaction tables.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_2.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
              <ul>
                <li>1:n relation between user and comment</li>
                <li>1:1 relation between user and reaction</li>
                <li>1:n relation between post and comment</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>You can assume that a user may or may not post on the social media platform, i.e., a user can have zero or many posts.</li>
                  <li>A post can have zero or many comments or reactions.</li>
                  <li>Take care of this detail while writing various queries on the database, especially when deciding on INNER JOIN / LEFT JOIN.</li>
                </ul>
              </div>

              <p>Refer the tables in the code playground for a better understanding of the database.</p>

              <p class="desc-que-blue">Questions</p>

              <p>Fetch all the posts along with user details.</p>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>Sort the posts in the descending order of posted_at.</li>
                </ul>
              </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>age</th>
                      <th>post_id</th>
                      <th>content</th>
                      <th>posted_at</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>...</td>
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
              description: "Query should select user.name",
              type: "syntax-validation",
              expectedKeywords: ["user.name"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should select user.age",
              type: "syntax-validation",
              expectedKeywords: ["user.age"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select post.post_id",
              type: "syntax-validation",
              expectedKeywords: ["post.post_id"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should select post.content",
              type: "syntax-validation",
              expectedKeywords: ["post.content"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should select post.posted_at",
              type: "syntax-validation",
              expectedKeywords: ["post.posted_at"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain FROM user",
              type: "syntax-validation",
              expectedKeywords: ["from user"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should use INNER JOIN post",
              type: "syntax-validation",
              expectedKeywords: ["inner join post"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should join user.user_id = post.posted_by",
              type: "syntax-validation",
              expectedKeywords: ["user.user_id", "post.posted_by"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should contain ORDER BY posted_at DESC",
              type: "syntax-validation",
              expectedKeywords: ["order by", "posted_at desc"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should not contain LIMIT clause",
              type: "syntax-validation",
              unexpectedKeywords: ["limit"],
              visible: true,
            },
            {
              id: 12,
              description: "Query should not contain OFFSET clause",
              type: "syntax-validation",
              unexpectedKeywords: ["offset"],
              visible: true,
            },
            ],
        }, 
        {
          id: "sql-query-11-2",
          title: "5 Recent Posts by James Williams",
          description:
            "In this practice set, let’s apply SQL Joins to fetch recent posts from a social networking database.",

          difficulty: "Easy",
          score: 40,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            user: {
              columns: ["user_id", "name", "age"],
              rows: [
                [1, "James Williams", 29],
                [2, "Emma Johnson", 31],
                [3, "Liam Brown", 24],
                [4, "Olivia Davis", 27],
              ],
            },

            post: {
              columns: ["post_id", "content", "posted_at", "posted_by"],
              rows: [
                [201, "AI is the future!", "2023-08-10 10:00:00", 1],
                [202, "Robotics workshop today", "2023-08-12 09:30:00", 1],
                [203, "Learning SQL joins", "2023-07-25 14:00:00", 2],
                [204, "Machine Learning Basics", "2023-08-15 18:45:00", 1],
                [205, "Database Optimization", "2023-08-08 12:15:00", 3],
                [206, "Deep Learning Trends", "2023-08-18 16:20:00", 1],
                [207, "Cloud Computing", "2023-08-05 11:10:00", 4],
                [208, "Neural Networks Explained", "2023-08-20 08:40:00", 1],
              ],
            },
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>In this practice set, let’s apply Joins to fetch meaningful data from a sample database of social networking application.</p>
              <p>The database contains user, post, comment and reaction tables.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_2.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
              <ul>
                <li>1:n relation between user and comment</li>
                <li>1:1 relation between user and reaction</li>
                <li>1:n relation between post and comment</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>You can assume that a user may or may not post on the social media platform, i.e., a user can have zero or many posts.</li>
                  <li>A post can have zero or many comments or reactions.</li>
                  <li>Take care of this detail while writing various queries on the database, especially when deciding on INNER JOIN / LEFT JOIN.</li>
                </ul>
              </div>

              <p>Refer the tables in the code playground for a better understanding of the database.</p>

              <p class="desc-que-blue">Questions</p>

              <p>Fetch the 5 recent posts posted by “James Williams”.</p>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>Condiser that the name of the user is “James Williams”</li>
                  <li>Get the recent posts based on posted_at column in post table</li>
                </ul>
              </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>age</th>
                      <th>post_id</th>
                      <th>content</th>
                      <th>posted_at</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>...</td>
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
              description: "Query should select user.name",
              type: "syntax-validation",
              expectedKeywords: ["user.name"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should select user.age",
              type: "syntax-validation",
              expectedKeywords: ["user.age"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should select post.post_id",
              type: "syntax-validation",
              expectedKeywords: ["post.post_id"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should select post.content",
              type: "syntax-validation",
              expectedKeywords: ["post.content"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should select post.posted_at",
              type: "syntax-validation",
              expectedKeywords: ["post.posted_at"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should contain FROM user",
              type: "syntax-validation",
              expectedKeywords: ["from user"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should use INNER JOIN post",
              type: "syntax-validation",
              expectedKeywords: ["inner join post"],
              visible: true,
            },
            {
              id: 9,
              description: "Query should join user.user_id = post.posted_by",
              type: "syntax-validation",
              expectedKeywords: ["user.user_id", "post.posted_by"],
              visible: true,
            },
            {
              id: 10,
              description: "Query should filter by James Williams",
              type: "syntax-validation",
              expectedKeywords: ["where", "james williams"],
              visible: true,
            },
            {
              id: 11,
              description: "Query should contain ORDER BY posted_at DESC",
              type: "syntax-validation",
              expectedKeywords: ["order by", "posted_at desc"],
              visible: true,
            },
            {
              id: 12,
              description: "Query should contain LIMIT 5",
              type: "syntax-validation",
              expectedKeywords: ["limit 5"],
              visible: true,
            },
            {
              id: 13,
              description: "Query should not contain OFFSET clause",
              type: "syntax-validation",
              unexpectedKeywords: ["offset"],
              visible: true,
            },
          ],
        },
        {
        id: "sql-query-11-3",
        title: "Total Posts by James Williams",
        description:
          "In this practice set, let’s apply SQL Joins and Aggregation to fetch the total number of posts posted by a specific user.",

        difficulty: "Medium",
        score: 40,
        type: "sql",

        defaultCode: {
          sql: ``,
        },

        tableData: {
        user: {
          columns: ["user_id", "name", "age"],
          rows: [
            [1, "James Williams", 35],
            [2, "Sophia Brown", 28],
            [3, "Liam Johnson", 31],
            [4, "Emma Davis", 26],
          ],
        },

        post: {
          columns: ["post_id", "content", "posted_at", "posted_by"],
          rows: [
            [101, "Morning Workout!", "2023-08-01 08:00:00", 1],
            [102, "Learning SQL Joins", "2023-08-02 10:30:00", 1],
            [103, "Coffee Time ☕", "2023-08-03 09:15:00", 1],
            [104, "Weekend Trip!", "2023-08-04 14:45:00", 1],
            [105, "Reading a new book", "2023-08-05 19:20:00", 1],
            [106, "Database Practice", "2023-08-06 17:10:00", 1],

            [107, "Hello World!", "2023-08-02 11:00:00", 2],
            [108, "React is awesome!", "2023-08-03 16:30:00", 3],
            [109, "Good Evening!", "2023-08-05 18:00:00", 4],
          ],
        },
      },

      descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>In this practice set, let’s apply Joins to fetch meaningful data from a sample database of social networking application.</p>
              <p>The database contains user, post, comment and reaction tables.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_2.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
              <ul>
                <li>1:n relation between user and comment</li>
                <li>1:1 relation between user and reaction</li>
                <li>1:n relation between post and comment</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>You can assume that a user may or may not post on the social media platform, i.e., a user can have zero or many posts.</li>
                  <li>A post can have zero or many comments or reactions.</li>
                  <li>Take care of this detail while writing various queries on the database, especially when deciding on INNER JOIN / LEFT JOIN.</li>
                </ul>
              </div>

              <p>Refer the tables in the code playground for a better understanding of the database.</p>

              <p class="desc-que-blue">Questions</p>

              <p>Fetch the total number of posts posted by “James Williams” till date as posts_count.</p>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>Condiser that the name of the user is “James Williams”</li>
                </ul>
              </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>posts_count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
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
          description: "Query should use COUNT function",
          type: "syntax-validation",
          expectedKeywords: ["count"],
          visible: true,
        },
        {
          id: 3,
          description: "Query should alias the count as posts_count",
          type: "syntax-validation",
          expectedKeywords: ["as posts_count"],
          visible: true,
        },
        {
          id: 4,
          description: "Query should contain FROM user",
          type: "syntax-validation",
          expectedKeywords: ["from user"],
          visible: true,
        },
        {
          id: 5,
          description: "Query should use INNER JOIN post",
          type: "syntax-validation",
          expectedKeywords: ["inner join post"],
          visible: true,
        },
        {
          id: 6,
          description: "Query should join user.user_id = post.posted_by",
          type: "syntax-validation",
          expectedKeywords: ["user.user_id", "post.posted_by"],
          visible: true,
        },
        {
          id: 7,
          description: "Query should filter by James Williams",
          type: "syntax-validation",
          expectedKeywords: ["where", "james williams"],
          visible: true,
        },
        {
          id: 8,
          description: "Query should not contain GROUP BY clause",
          type: "syntax-validation",
          unexpectedKeywords: ["group by"],
          visible: true,
        },
        {
          id: 9,
          description: "Query should not contain ORDER BY clause",
          type: "syntax-validation",
          unexpectedKeywords: ["order by"],
          visible: true,
        },
      ],
        },
        {
        id: "sql-query-11-4",
        accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
        title: "Total number of posts ",
        description:
          "In this practice set, let’s apply SQL Joins and Aggregation to fetch the total number of posts posted by a specific user.",

        difficulty: "Medium",
        score: 40,
        type: "sql",

        defaultCode: {
          sql: ``,
        },

        tableData: {
        user: {
          columns: ["user_id", "name", "age"],
          rows: [
            [1, "James Williams", 35],
            [2, "Sophia Brown", 28],
            [3, "Liam Johnson", 31],
            [4, "Emma Davis", 26],
          ],
        },

        post: {
          columns: ["post_id", "content", "posted_at", "posted_by"],
          rows: [
            [101, "Morning Workout!", "2023-08-01 08:00:00", 1],
            [102, "Learning SQL Joins", "2023-08-02 10:30:00", 1],
            [103, "Coffee Time ☕", "2023-08-03 09:15:00", 1],
            [104, "Weekend Trip!", "2023-08-04 14:45:00", 1],
            [105, "Reading a new book", "2023-08-05 19:20:00", 1],
            [106, "Database Practice", "2023-08-06 17:10:00", 1],

            [107, "Hello World!", "2023-08-02 11:00:00", 2],
            [108, "React is awesome!", "2023-08-03 16:30:00", 3],
            [109, "Good Evening!", "2023-08-05 18:00:00", 4],
          ],
        },
      },

      descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>In this practice set, let’s apply Joins to fetch meaningful data from a sample database of social networking application.</p>
              <p>The database contains user, post, comment and reaction tables.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_2.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
              <ul>
                <li>1:n relation between user and comment</li>
                <li>1:1 relation between user and reaction</li>
                <li>1:n relation between post and comment</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>You can assume that a user may or may not post on the social media platform, i.e., a user can have zero or many posts.</li>
                  <li>A post can have zero or many comments or reactions.</li>
                  <li>Take care of this detail while writing various queries on the database, especially when deciding on INNER JOIN / LEFT JOIN.</li>
                </ul>
              </div>

              <p>Refer the tables in the code playground for a better understanding of the database.</p>

              <p class="desc-que-blue">Questions</p>

              <p>For every user, fetch the total number of posts posted so far as posts_count</p>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>If a user does not publish any posts, keep the posts_count as 0.</li>
                  <li>Sort the output in the descending order of posts_count, and then in the ascending order of user_id.</li>
                </ul>
              </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>user_id</th>
                      <th>user_name</th>
                      <th>posts_count</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td></tr>
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
          description: "Query should use COUNT function",
          type: "syntax-validation",
          expectedKeywords: ["count"],
          visible: true,
        },
        {
          id: 3,
          description: "Query should alias the count as posts_count",
          type: "syntax-validation",
          expectedKeywords: ["as posts_count"],
          visible: true,
        },
        {
          id: 4,
          description: "Query should contain FROM user",
          type: "syntax-validation",
          expectedKeywords: ["from user"],
          visible: true,
        },
        {
          id: 5,
          description: "Query should use INNER JOIN post",
          type: "syntax-validation",
          expectedKeywords: ["inner join post"],
          visible: true,
        },
        {
          id: 6,
          description: "Query should join user.user_id = post.posted_by",
          type: "syntax-validation",
          expectedKeywords: ["user.user_id", "post.posted_by"],
          visible: true,
        },
        {
          id: 7,
          description: "Query should filter by James Williams",
          type: "syntax-validation",
          expectedKeywords: ["where", "james williams"],
          visible: true,
        },
        {
          id: 8,
          description: "Query should not contain GROUP BY clause",
          type: "syntax-validation",
          unexpectedKeywords: ["group by"],
          visible: true,
        },
        {
          id: 9,
          description: "Query should not contain ORDER BY clause",
          type: "syntax-validation",
          unexpectedKeywords: ["order by"],
          visible: true,
        },
      ],
        },
        {
        id: "sql-query-11-5",
         accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
        title: "At least 2 posts",
        description:
          "In this practice set, let’s apply SQL Joins and Aggregation to fetch the total number of posts posted by a specific user.",

        difficulty: "Medium",
        score: 45,
        type: "sql",

        defaultCode: {
          sql: ``,
        },

        tableData: {
        user: {
          columns: ["user_id", "name", "age", "gender"],
          rows: [
            [1, "James Williams", 25, "male"],
            [2, "Sophia Brown", 22, "female"],
            [3, "Liam Johnson", 23, "male"],
            [4, "Emma Davis", 21, "female"],
            [5, "Noah Wilson", 24, "male"]
          ]
        },

        post: {
          columns: ["post_id", "posted_by", "post_text"],
          rows: [
            [101, 1, "Post A"],
            [102, 1, "Post B"],
            [103, 1, "Post C"],
            [104, 2, "Post D"],
            [105, 2, "Post E"],
            [106, 3, "Post F"],
            [107, 1, "Post G"],
            [108, 5, "Post H"],
            [109, 5, "Post I"],
            [110, 3, "Post J"],
          ]
        }
      },

      descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>In this practice set, let’s apply Joins to fetch meaningful data from a sample database of social networking application.</p>
              <p>The database contains user, post, comment and reaction tables.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_2.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
              <ul>
                <li>1:n relation between user and comment</li>
                <li>1:1 relation between user and reaction</li>
                <li>1:n relation between post and comment</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>You can assume that a user may or may not post on the social media platform, i.e., a user can have zero or many posts.</li>
                  <li>A post can have zero or many comments or reactions.</li>
                  <li>Take care of this detail while writing various queries on the database, especially when deciding on INNER JOIN / LEFT JOIN.</li>
                </ul>
              </div>

              <p>Refer the tables in the code playground for a better understanding of the database.</p>

              <p class="desc-que-blue">Questions</p>

              <p>Get all the users details who posted at least 2 posts.</p>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>Sort the output in the descending order of posts_count, and then in the ascending order of user_id.</li>
                </ul>
              </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>user_name</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>posts_count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>...</td>
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
            description: "Query should use INNER JOIN between user and post tables",
            type: "syntax-validation",
            expectedKeywords: ["inner join", "on"],
            visible: true,
          },
          {
            id: 3,
            description: "Query should use GROUP BY clause",
            type: "syntax-validation",
            expectedKeywords: ["group by"],
            visible: true,
          },
          {
            id: 4,
            description: "Query should use HAVING clause with COUNT >= 2",
            type: "syntax-validation",
            expectedKeywords: ["having", "count"],
            visible: true,
          },
          {
            id: 5,
            description: "Query should sort by posts_count DESC and user_id ASC",
            type: "syntax-validation",
            expectedKeywords: ["order by", "desc", "asc"],
            visible: true,
          }
        ],
        },
        {
        id: "sql-query-11-6",
        accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
        title: "Active users in January 2021.",
        description:
          "In this practice set, let’s apply SQL Joins and Aggregation to fetch the total number of posts posted by a specific user.",

        difficulty: "Medium",
        score: 45,
        type: "sql",

        defaultCode: {
          sql: ``,
        },

       tableData: {
        user: {
          columns: ["user_id", "name"],
          rows: [
            [1, "James"],
            [2, "Sophia"],
            [3, "Liam"],
            [4, "Emma"],
            [5, "Noah"]
          ]
        },

        post: {
          columns: ["post_id", "posted_by", "posted_at"],
          rows: [
            [101, 1, "2021-01-05"],
            [102, 1, "2021-01-10"],
            [103, 1, "2021-01-15"],
            [104, 2, "2021-01-07"],
            [105, 2, "2021-01-20"],
            [106, 3, "2021-01-25"],
            [107, 3, "2020-01-10"],
            [108, 4, "2021-02-01"],
            [109, 5, "2021-01-11"],
            [110, 5, "2021-01-18"],
            [111, 5, "2021-01-30"]
          ]
        }
      },

      descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Database</p>
              <p>In this practice set, let’s apply Joins to fetch meaningful data from a sample database of social networking application.</p>
              <p>The database contains user, post, comment and reaction tables.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_2.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
              <ul>
                <li>1:n relation between user and comment</li>
                <li>1:1 relation between user and reaction</li>
                <li>1:n relation between post and comment</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>You can assume that a user may or may not post on the social media platform, i.e., a user can have zero or many posts.</li>
                  <li>A post can have zero or many comments or reactions.</li>
                  <li>Take care of this detail while writing various queries on the database, especially when deciding on INNER JOIN / LEFT JOIN.</li>
                </ul>
              </div>

              <p>Refer the tables in the code playground for a better understanding of the database.</p>

              <p class="desc-que-blue">Questions</p>

              <p>Fetch the active users in January 2021.</p>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                  <li>Consider the users as active, if they posted at least 2 posts in January 2021.</li>
                  <li>Sort the output in the descending order of posts_count, and then in the ascending order of user_id.</li>
                </ul>
              </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
              <table>
                <thead>
                  <tr>
                    <th>user_id</th>
                    <th>user_name</th>
                    <th>posts_count</th>
                  </tr>
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
          description: "Should use COUNT(post.post_id) AS posts_count",
          type: "syntax-validation",
          expectedKeywords: ["count(post.post_id) as posts_count"],
          visible: true,
        },
        {
          id: 3,
          description: "Should filter January 2021 using strftime",
          type: "syntax-validation",
          expectedKeywords: ['strftime("%y", post.posted_at)', 'strftime("%m", post.posted_at)'],
          visible: false,
        },
        {
          id: 4,
          description: "Should group by user_id and user_name",
          type: "syntax-validation",
          expectedKeywords: ["group by user.user_id, user.name"],
          visible: false,
        },
        {
          id: 5,
          description: "Should filter users with at least 2 posts",
          type: "syntax-validation",
          expectedKeywords: ["having posts_count >= 2"],
          visible: false,
        },
        {
          id: 6,
          description: "Should sort by posts_count DESC and user_id ASC",
          type: "syntax-validation",
          expectedKeywords: ["order by posts_count desc, user.user_id asc"],
          visible: false,
        }
      ],
        },
      ],
    },
    // SQL Practice 12
    {
      id: "sql-coding-practice-12",
      title: "SQL Coding Practice 12",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-12-1",
          title: "Actor ids of the cast",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Easy",
          score: 30,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            actor: {
              columns: ["id", "name"],
              rows: [
                [1, "Chris Evans"],
                [2, "Robert Downey Jr."],
                [3, "Scarlett Johansson"],
                [4, "Tom Holland"],
                [5, "Emma Watson"],
                [6, "Daniel Radcliffe"]
              ]
            },

            director: {
              columns: ["id", "name"],
              rows: [
                [1, "Director A"],
                [2, "Director B"],
                [3, "Director C"],
                [4, "Director D"]
              ]
            },

            movie: {
              columns: ["id", "name", "rating", "budget_in_cr", "collection_in_cr"],
              rows: [
                [101, "Movie 1", 7, 100, 170],  // profit 70 ✅
                [102, "Movie 2", 8, 80, 140],   // profit 60 ✅
                [103, "Movie 3", 5, 90, 120],   // profit 30 ❌
                [104, "Movie 4", 9, 60, 130],   // profit 70 ✅
                [105, "Movie 5", 4, 50, 90],    // profit 40 ❌
                [106, "Movie 6", 7, 75, 140],   // profit 65 ✅
                [107, "Movie 7", 3, 40, 95],    // profit 55 ✅
                [108, "Movie 8", 6, 50, 120]    // profit 70 ✅ (rating not >6)
              ]
            },

            movie_cast: {
              columns: ["movie_id", "actor_id"],
              rows: [
                // Chris Evans → 5 movies
                [101,1],[102,1],[103,1],[104,1],[105,1],

                // Robert Downey Jr. → 6 movies
                [101,2],[102,2],[104,2],[105,2],[106,2],[107,2],

                // Scarlett Johansson → 3 movies
                [101,3],[103,3],[106,3],

                // Tom Holland → 1 movie
                [104,4],

                // Emma Watson → 4 movies
                [102,5],[103,5],[104,5],[108,5],

                // Daniel Radcliffe → 2 movies
                [105,6],[107,6]
              ]
            },

            movie_director: {
              columns: ["movie_id", "director_id"],
              rows: [
                // Director 1 → 3 movies (2 rating>6, 2 profit≥50)
                [101,1],  // rating 7, profit 70
                [102,1],  // rating 8, profit 60
                [103,1],  // rating 5, profit 30

                // Director 2 → 3 movies (2 rating>6, 2 profit≥50)
                [104,2],  // rating 9, profit 70
                [106,2],  // rating 7, profit 65
                [105,2],  // rating 4, profit 40

                // Director 3 → 2 movies (only 1 qualifies)
                [105,3],  // rating 4, profit 40
                [107,3],  // rating 3, profit 55

                // Director 4 → 2 movies (only 1 rating>6 but 2 profit≥50)
                [101,4],  // rating 7, profit 70
                [108,4]   // rating 6, profit 70
              ]
            }
          },

          descriptionDetails: `
            <div class="desc-question-details">
           
              <p class="desc-que-blue">Database</p>
              <p>The database given is similar to IMDb, which consists data related to various movies, directors and actors.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_3.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <p>The database is designed to cover the below business requirements.</p>
              <ul>
                <li>A movie can have more than one actor casted and vice versa.</li>
                <li>A movie can have more than one director and vice versa.</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <p>You can assume that actors in the database have acted in at least one movie (in the database), where as some directors might not have the movies they directed(in the given database). So, do take care of this detail while writing various queries on the database, especially, when deciding on INNER JOIN / LEFT JOIN.</p>
                  </ul>
              </div>
              <p class="desc-que-blue">Junction Tables</p>

                <p>movie_cast is a junction table which stores the many-to-many relationship between movie and actor. And role of an actor for a movie is stored in the table. Similarly movie_director table stores the many-to-many relationship between movie and director</p>
                <p>Refer the tables in the code playground for a better understanding of the database.           </p>
              <p class="desc-que-blue">Questions</p>

              <p>For all the movies, get the actor_ids of the cast.</p>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div><p>Sort the output in the ascending order of movie_name, and then in the ascending order of the actor_id.</p>
              </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>movie_name</th>
                      <th>actor_id</th>
                    </tr>
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
              description: "Should join movie and movie_cast using INNER JOIN",
              type: "syntax-validation",
              expectedKeywords: ["inner join movie_cast on movie.id = movie_cast.movie_id"],
              visible: true,
            },
            {
              id: 3,
              description: "Should select movie.name as movie_name",
              type: "syntax-validation",
              expectedKeywords: ["movie.name as movie_name"],
              visible: false,
            },
            {
              id: 4,
              description: "Should select movie_cast.actor_id",
              type: "syntax-validation",
              expectedKeywords: ["movie_cast.actor_id"],
              visible: false,
            },
            {
              id: 5,
              description: "Should sort by movie_name ASC and actor_id ASC",
              type: "syntax-validation",
              expectedKeywords: ["order by movie.name asc, movie_cast.actor_id asc"],
              visible: false,
            }
          ],
        }, 
        {
          id: "sql-query-12-2",
          title: "Daniel Radcliffe has acted.",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

      tableData: {
      actor: {
        columns: ["id", "name"],
        rows: [
          [1, "Chris Evans"],
          [2, "Robert Downey Jr."],
          [3, "Scarlett Johansson"],
          [4, "Tom Holland"],
          [5, "Emma Watson"],
          [6, "Daniel Radcliffe"]
        ]
      },

      director: {
        columns: ["id", "name"],
        rows: [
          [1, "Director A"],
          [2, "Director B"],
          [3, "Director C"],
          [4, "Director D"]
        ]
      },

      movie: {
        columns: ["id", "name", "rating", "budget_in_cr", "collection_in_cr"],
        rows: [
          [101, "Movie 1", 7, 100, 170],  // profit 70 ✅
          [102, "Movie 2", 8, 80, 140],   // profit 60 ✅
          [103, "Movie 3", 5, 90, 120],   // profit 30 ❌
          [104, "Movie 4", 9, 60, 130],   // profit 70 ✅
          [105, "Movie 5", 4, 50, 90],    // profit 40 ❌
          [106, "Movie 6", 7, 75, 140],   // profit 65 ✅
          [107, "Movie 7", 3, 40, 95],    // profit 55 ✅
          [108, "Movie 8", 6, 50, 120]    // profit 70 ✅ (rating not >6)
        ]
      },

      movie_cast: {
        columns: ["movie_id", "actor_id"],
        rows: [
          // Chris Evans → 5 movies
          [101,1],[102,1],[103,1],[104,1],[105,1],

          // Robert Downey Jr. → 6 movies
          [101,2],[102,2],[104,2],[105,2],[106,2],[107,2],

          // Scarlett Johansson → 3 movies
          [101,3],[103,3],[106,3],

          // Tom Holland → 1 movie
          [104,4],

          // Emma Watson → 4 movies
          [102,5],[103,5],[104,5],[108,5],

          // Daniel Radcliffe → 2 movies
          [105,6],[107,6]
        ]
      },

      movie_director: {
        columns: ["movie_id", "director_id"],
        rows: [
          // Director 1 → 3 movies (2 rating>6, 2 profit≥50)
          [101,1],  // rating 7, profit 70
          [102,1],  // rating 8, profit 60
          [103,1],  // rating 5, profit 30

          // Director 2 → 3 movies (2 rating>6, 2 profit≥50)
          [104,2],  // rating 9, profit 70
          [106,2],  // rating 7, profit 65
          [105,2],  // rating 4, profit 40

          // Director 3 → 2 movies (only 1 qualifies)
          [105,3],  // rating 4, profit 40
          [107,3],  // rating 3, profit 55

          // Director 4 → 2 movies (only 1 rating>6 but 2 profit≥50)
          [101,4],  // rating 7, profit 70
          [108,4]   // rating 6, profit 70
        ]
      }
    },
     descriptionDetails: `
            <div class="desc-question-details">
           
              <p class="desc-que-blue">Database</p>
              <p>The database given is similar to IMDb, which consists data related to various movies, directors and actors.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_3.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <p>The database is designed to cover the below business requirements.</p>
              <ul>
                <li>A movie can have more than one actor casted and vice versa.</li>
                <li>A movie can have more than one director and vice versa.</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <p>You can assume that actors in the database have acted in at least one movie (in the database), where as some directors might not have the movies they directed(in the given database). So, do take care of this detail while writing various queries on the database, especially, when deciding on INNER JOIN / LEFT JOIN.</p>
                  </ul>
              </div>
              <p class="desc-que-blue">Junction Tables</p>

                <p>movie_cast is a junction table which stores the many-to-many relationship between movie and actor. And role of an actor for a movie is stored in the table. Similarly movie_director table stores the many-to-many relationship between movie and director</p>
                <p>Refer the tables in the code playground for a better understanding of the database.           </p>
              
              <p class="desc-que-blue">Questions</p>
              <p>Get the number of movies in which "Daniel Radcliffe" has acted.</p>

              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>no_of_movies</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
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
                description: "Should use COUNT with alias no_of_movies",
                type: "syntax-validation",
                expectedKeywords: ["count(movie_cast.movie_id) as no_of_movies"],
                visible: true,
              },
              {
                id: 3,
                description: "Should join actor and movie_cast",
                type: "syntax-validation",
                expectedKeywords: ["inner join movie_cast on actor.id = movie_cast.actor_id"],
                visible: false,
              },
              {
                id: 4,
                description: "Should filter actor by name Daniel Radcliffe",
                type: "syntax-validation",
                expectedKeywords: ['where actor.name = "daniel radcliffe"'],
                visible: false,
              },
            ],
        },
        {
          id: "sql-query-12-3",
          title: "Each actor casted",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },
          tableData: {
            actor: {
              columns: ["id", "name"],
              rows: [
                [1, "Chris Evans"],
                [2, "Robert Downey Jr."],
                [3, "Scarlett Johansson"],
                [4, "Tom Holland"],
                [5, "Emma Watson"],
                [6, "Daniel Radcliffe"]
              ]
            },

            director: {
              columns: ["id", "name"],
              rows: [
                [1, "Director A"],
                [2, "Director B"],
                [3, "Director C"],
                [4, "Director D"]
              ]
            },

            movie: {
              columns: ["id", "name", "rating", "budget_in_cr", "collection_in_cr"],
              rows: [
                [101, "Movie 1", 7, 100, 170],  // profit 70 ✅
                [102, "Movie 2", 8, 80, 140],   // profit 60 ✅
                [103, "Movie 3", 5, 90, 120],   // profit 30 ❌
                [104, "Movie 4", 9, 60, 130],   // profit 70 ✅
                [105, "Movie 5", 4, 50, 90],    // profit 40 ❌
                [106, "Movie 6", 7, 75, 140],   // profit 65 ✅
                [107, "Movie 7", 3, 40, 95],    // profit 55 ✅
                [108, "Movie 8", 6, 50, 120]    // profit 70 ✅ (rating not >6)
              ]
            },

            movie_cast: {
              columns: ["movie_id", "actor_id"],
              rows: [
                // Chris Evans → 5 movies
                [101,1],[102,1],[103,1],[104,1],[105,1],

                // Robert Downey Jr. → 6 movies
                [101,2],[102,2],[104,2],[105,2],[106,2],[107,2],

                // Scarlett Johansson → 3 movies
                [101,3],[103,3],[106,3],

                // Tom Holland → 1 movie
                [104,4],

                // Emma Watson → 4 movies
                [102,5],[103,5],[104,5],[108,5],

                // Daniel Radcliffe → 2 movies
                [105,6],[107,6]
              ]
            },

            movie_director: {
              columns: ["movie_id", "director_id"],
              rows: [
                // Director 1 → 3 movies (2 rating>6, 2 profit≥50)
                [101,1],  // rating 7, profit 70
                [102,1],  // rating 8, profit 60
                [103,1],  // rating 5, profit 30

                // Director 2 → 3 movies (2 rating>6, 2 profit≥50)
                [104,2],  // rating 9, profit 70
                [106,2],  // rating 7, profit 65
                [105,2],  // rating 4, profit 40

                // Director 3 → 2 movies (only 1 qualifies)
                [105,3],  // rating 4, profit 40
                [107,3],  // rating 3, profit 55

                // Director 4 → 2 movies (only 1 rating>6 but 2 profit≥50)
                [101,4],  // rating 7, profit 70
                [108,4]   // rating 6, profit 70
              ]
            }
          },

          descriptionDetails: `
            <div class="desc-question-details">
           
              <p class="desc-que-blue">Database</p>
              <p>The database given is similar to IMDb, which consists data related to various movies, directors and actors.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_3.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <p>The database is designed to cover the below business requirements.</p>
              <ul>
                <li>A movie can have more than one actor casted and vice versa.</li>
                <li>A movie can have more than one director and vice versa.</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <p>You can assume that actors in the database have acted in at least one movie (in the database), where as some directors might not have the movies they directed(in the given database). So, do take care of this detail while writing various queries on the database, especially, when deciding on INNER JOIN / LEFT JOIN.</p>
                  </ul>
              </div>
              <p class="desc-que-blue">Junction Tables</p>

              <p>movie_cast is a junction table which stores the many-to-many relationship between movie and actor. And role of an actor for a movie is stored in the table. Similarly movie_director table stores the many-to-many relationship between movie and director</p>
              <p>Refer the tables in the code playground for a better understanding of the database.           </p>
              
              <p class="desc-que-blue">Questions</p>
              <p>For each actor, get the number of movies in which they are casted. </p>
<div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>Sort the output in the ascending order of the actor_name.</p>
              </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>actor_name</th>
                      <th>no_of_movies</th>
                    </tr>
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
                description: "Should use COUNT(movie_cast.movie_id) AS no_of_movies",
                type: "syntax-validation",
                expectedKeywords: ["count(movie_cast.movie_id) as no_of_movies"],
                visible: true,
              },
              {
                id: 3,
                description: "Should join actor and movie_cast using INNER JOIN",
                type: "syntax-validation",
                expectedKeywords: ["inner join movie_cast on actor.id = movie_cast.actor_id"],
                visible: false,
              },
              {
                id: 4,
                description: "Should group by actor.id and actor.name",
                type: "syntax-validation",
                expectedKeywords: ["group by actor.id, actor.name"],
                visible: false,
              },
              {
                id: 5,
                description: "Should sort output by actor_name ASC",
                type: "syntax-validation",
                expectedKeywords: ["order by actor_name asc"],
                visible: false,
              },
            ],
        },
        {
          id: "sql-query-12-4",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Each director have directed",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 40,
          type: "sql",

          defaultCode: {
            sql: ``,
          },
        tableData: {
          actor: {
            columns: ["id", "name"],
            rows: [
              [1, "Chris Evans"],
              [2, "Robert Downey Jr."],
              [3, "Scarlett Johansson"],
              [4, "Tom Holland"],
              [5, "Emma Watson"],
              [6, "Daniel Radcliffe"]
            ]
          },

          director: {
            columns: ["id", "name"],
            rows: [
              [1, "Director A"],
              [2, "Director B"],
              [3, "Director C"],
              [4, "Director D"]
            ]
          },

          movie: {
            columns: ["id", "name", "rating", "budget_in_cr", "collection_in_cr"],
            rows: [
              [101, "Movie 1", 7, 100, 170],  // profit 70 ✅
              [102, "Movie 2", 8, 80, 140],   // profit 60 ✅
              [103, "Movie 3", 5, 90, 120],   // profit 30 ❌
              [104, "Movie 4", 9, 60, 130],   // profit 70 ✅
              [105, "Movie 5", 4, 50, 90],    // profit 40 ❌
              [106, "Movie 6", 7, 75, 140],   // profit 65 ✅
              [107, "Movie 7", 3, 40, 95],    // profit 55 ✅
              [108, "Movie 8", 6, 50, 120]    // profit 70 ✅ (rating not >6)
            ]
          },

          movie_cast: {
            columns: ["movie_id", "actor_id"],
            rows: [
              // Chris Evans → 5 movies
              [101,1],[102,1],[103,1],[104,1],[105,1],

              // Robert Downey Jr. → 6 movies
              [101,2],[102,2],[104,2],[105,2],[106,2],[107,2],

              // Scarlett Johansson → 3 movies
              [101,3],[103,3],[106,3],

              // Tom Holland → 1 movie
              [104,4],

              // Emma Watson → 4 movies
              [102,5],[103,5],[104,5],[108,5],

              // Daniel Radcliffe → 2 movies
              [105,6],[107,6]
            ]
          },

          movie_director: {
            columns: ["movie_id", "director_id"],
            rows: [
              // Director 1 → 3 movies (2 rating>6, 2 profit≥50)
              [101,1],  // rating 7, profit 70
              [102,1],  // rating 8, profit 60
              [103,1],  // rating 5, profit 30

              // Director 2 → 3 movies (2 rating>6, 2 profit≥50)
              [104,2],  // rating 9, profit 70
              [106,2],  // rating 7, profit 65
              [105,2],  // rating 4, profit 40

              // Director 3 → 2 movies (only 1 qualifies)
              [105,3],  // rating 4, profit 40
              [107,3],  // rating 3, profit 55

              // Director 4 → 2 movies (only 1 rating>6 but 2 profit≥50)
              [101,4],  // rating 7, profit 70
              [108,4]   // rating 6, profit 70
            ]
          }
        },

          descriptionDetails: `
            <div class="desc-question-details">
           
              <p class="desc-que-blue">Database</p>
              <p>The database given is similar to IMDb, which consists data related to various movies, directors and actors.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_3.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <p>The database is designed to cover the below business requirements.</p>
              <ul>
                <li>A movie can have more than one actor casted and vice versa.</li>
                <li>A movie can have more than one director and vice versa.</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <p>You can assume that actors in the database have acted in at least one movie (in the database), where as some directors might not have the movies they directed(in the given database). So, do take care of this detail while writing various queries on the database, especially, when deciding on INNER JOIN / LEFT JOIN.</p>
                  </ul>
              </div>
              <p class="desc-que-blue">Junction Tables</p>

              <p>movie_cast is a junction table which stores the many-to-many relationship between movie and actor. And role of an actor for a movie is stored in the table. Similarly movie_director table stores the many-to-many relationship between movie and director</p>
              <p>Refer the tables in the code playground for a better understanding of the database.           </p>
              
              <p class="desc-que-blue">Questions</p>
              <p>
For each director in the database, get the number of movies they have directed.</p>
              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <li>If a director did not direct any movie (in the database), consider the count as 0.</li>
                <li>Sort the output in descending order of no_of_movies, and then in the ascending order of director_name.</li>
                </ul>
                </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>director_name</th>
                      <th>no_of_movies</th>
                    </tr>
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
            description: "Should use LEFT JOIN between director and movie_director",
            type: "syntax-validation",
            expectedKeywords: ["left join movie_director on director.id = movie_director.director_id"],
            visible: true,
          },
          {
            id: 3,
            description: "Should use COUNT(movie_director.movie_id) AS no_of_movies",
            type: "syntax-validation",
            expectedKeywords: ["count(movie_director.movie_id) as no_of_movies"],
            visible: false,
          },
          {
            id: 4,
            description: "Should group by director.id and director.name",
            type: "syntax-validation",
            expectedKeywords: ["group by director.id, director.name"],
            visible: false,
          },
          {
            id: 5,
            description: "Should sort by no_of_movies DESC and director_name ASC",
            type: "syntax-validation",
            expectedKeywords: ["order by no_of_movies desc, director_name asc"],
            visible: false,
          }
        ],
        },
        {
          id: "sql-query-12-5",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Get all the ids of directors",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 40,
          type: "sql",

          defaultCode: {
            sql: ``,
          },
          tableData: {
            actor: {
              columns: ["id", "name"],
              rows: [
                [1, "Chris Evans"],
                [2, "Robert Downey Jr."],
                [3, "Scarlett Johansson"],
                [4, "Tom Holland"],
                [5, "Emma Watson"],
                [6, "Daniel Radcliffe"]
              ]
            },

            director: {
              columns: ["id", "name"],
              rows: [
                [1, "Director A"],
                [2, "Director B"],
                [3, "Director C"],
                [4, "Director D"]
              ]
            },

            movie: {
              columns: ["id", "name", "rating", "budget_in_cr", "collection_in_cr"],
              rows: [
                [101, "Movie 1", 7, 100, 170],  // profit 70 ✅
                [102, "Movie 2", 8, 80, 140],   // profit 60 ✅
                [103, "Movie 3", 5, 90, 120],   // profit 30 ❌
                [104, "Movie 4", 9, 60, 130],   // profit 70 ✅
                [105, "Movie 5", 4, 50, 90],    // profit 40 ❌
                [106, "Movie 6", 7, 75, 140],   // profit 65 ✅
                [107, "Movie 7", 3, 40, 95],    // profit 55 ✅
                [108, "Movie 8", 6, 50, 120]    // profit 70 ✅ (rating not >6)
              ]
            },

            movie_cast: {
              columns: ["movie_id", "actor_id"],
              rows: [
                // Chris Evans → 5 movies
                [101,1],[102,1],[103,1],[104,1],[105,1],

                // Robert Downey Jr. → 6 movies
                [101,2],[102,2],[104,2],[105,2],[106,2],[107,2],

                // Scarlett Johansson → 3 movies
                [101,3],[103,3],[106,3],

                // Tom Holland → 1 movie
                [104,4],

                // Emma Watson → 4 movies
                [102,5],[103,5],[104,5],[108,5],

                // Daniel Radcliffe → 2 movies
                [105,6],[107,6]
              ]
            },

            movie_director: {
              columns: ["movie_id", "director_id"],
              rows: [
                // Director 1 → 3 movies (2 rating>6, 2 profit≥50)
                [101,1],  // rating 7, profit 70
                [102,1],  // rating 8, profit 60
                [103,1],  // rating 5, profit 30

                // Director 2 → 3 movies (2 rating>6, 2 profit≥50)
                [104,2],  // rating 9, profit 70
                [106,2],  // rating 7, profit 65
                [105,2],  // rating 4, profit 40

                // Director 3 → 2 movies (only 1 qualifies)
                [105,3],  // rating 4, profit 40
                [107,3],  // rating 3, profit 55

                // Director 4 → 2 movies (only 1 rating>6 but 2 profit≥50)
                [101,4],  // rating 7, profit 70
                [108,4]   // rating 6, profit 70
              ]
            }
          },

          descriptionDetails: `
            <div class="desc-question-details">
           
              <p class="desc-que-blue">Database</p>
              <p>The database given is similar to IMDb, which consists data related to various movies, directors and actors.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_3.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <p>The database is designed to cover the below business requirements.</p>
              <ul>
                <li>A movie can have more than one actor casted and vice versa.</li>
                <li>A movie can have more than one director and vice versa.</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <p>You can assume that actors in the database have acted in at least one movie (in the database), where as some directors might not have the movies they directed(in the given database). So, do take care of this detail while writing various queries on the database, especially, when deciding on INNER JOIN / LEFT JOIN.</p>
                  </ul>
              </div>
              <p class="desc-que-blue">Junction Tables</p>

              <p>movie_cast is a junction table which stores the many-to-many relationship between movie and actor. And role of an actor for a movie is stored in the table. Similarly movie_director table stores the many-to-many relationship between movie and director</p>
              <p>Refer the tables in the code playground for a better understanding of the database.           </p>
              
              <p class="desc-que-blue">Questions</p>
              <p>
Get all the ids of directors who directed at least two movies, with rating greater than 6</p>
              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <li>Sort the output in descending order of no_of_movies, and then in the ascending order of director_id</li>
                </ul>
                </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>director_id</th>
                      <th>no_of_movies</th>
                    </tr>
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
              description: "Should join movie and movie_director using INNER JOIN",
              type: "syntax-validation",
              expectedKeywords: ["inner join movie_director on movie.id = movie_director.movie_id"],
              visible: true,
            },
            {
              id: 3,
              description: "Should filter movies with rating greater than 6",
              type: "syntax-validation",
              expectedKeywords: ["where movie.rating > 6"],
              visible: false,
            },
            {
              id: 4,
              description: "Should group by movie_director.director_id",
              type: "syntax-validation",
              expectedKeywords: ["group by movie_director.director_id"],
              visible: false,
            },
            {
              id: 5,
              description: "Should filter directors with at least 2 movies using HAVING",
              type: "syntax-validation",
              expectedKeywords: ["having count(movie_director.movie_id) >= 2"],
              visible: false,
            },
            {
              id: 6,
              description: "Should sort by no_of_movies DESC and director_id ASC",
              type: "syntax-validation",
              expectedKeywords: ["order by no_of_movies desc, movie_director.director_id asc"],
              visible: false,
            }
          ],
        },
        {
          id: "sql-query-12-6",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Profit at least 50 crores",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },
        tableData: {
          actor: {
            columns: ["id", "name"],
            rows: [
              [1, "Chris Evans"],
              [2, "Robert Downey Jr."],
              [3, "Scarlett Johansson"],
              [4, "Tom Holland"],
              [5, "Emma Watson"],
              [6, "Daniel Radcliffe"]
            ]
          },

          director: {
            columns: ["id", "name"],
            rows: [
              [1, "Director A"],
              [2, "Director B"],
              [3, "Director C"],
              [4, "Director D"]
            ]
          },

          movie: {
            columns: ["id", "name", "rating", "budget_in_cr", "collection_in_cr"],
            rows: [
              [101, "Movie 1", 7, 100, 170],  // profit 70 ✅
              [102, "Movie 2", 8, 80, 140],   // profit 60 ✅
              [103, "Movie 3", 5, 90, 120],   // profit 30 ❌
              [104, "Movie 4", 9, 60, 130],   // profit 70 ✅
              [105, "Movie 5", 4, 50, 90],    // profit 40 ❌
              [106, "Movie 6", 7, 75, 140],   // profit 65 ✅
              [107, "Movie 7", 3, 40, 95],    // profit 55 ✅
              [108, "Movie 8", 6, 50, 120]    // profit 70 ✅ (rating not >6)
            ]
          },

          movie_cast: {
            columns: ["movie_id", "actor_id"],
            rows: [
              // Chris Evans → 5 movies
              [101,1],[102,1],[103,1],[104,1],[105,1],

              // Robert Downey Jr. → 6 movies
              [101,2],[102,2],[104,2],[105,2],[106,2],[107,2],

              // Scarlett Johansson → 3 movies
              [101,3],[103,3],[106,3],

              // Tom Holland → 1 movie
              [104,4],

              // Emma Watson → 4 movies
              [102,5],[103,5],[104,5],[108,5],

              // Daniel Radcliffe → 2 movies
              [105,6],[107,6]
            ]
          },

          movie_director: {
            columns: ["movie_id", "director_id"],
            rows: [
              // Director 1 → 3 movies (2 rating>6, 2 profit≥50)
              [101,1],  // rating 7, profit 70
              [102,1],  // rating 8, profit 60
              [103,1],  // rating 5, profit 30

              // Director 2 → 3 movies (2 rating>6, 2 profit≥50)
              [104,2],  // rating 9, profit 70
              [106,2],  // rating 7, profit 65
              [105,2],  // rating 4, profit 40

              // Director 3 → 2 movies (only 1 qualifies)
              [105,3],  // rating 4, profit 40
              [107,3],  // rating 3, profit 55

              // Director 4 → 2 movies (only 1 rating>6 but 2 profit≥50)
              [101,4],  // rating 7, profit 70
              [108,4]   // rating 6, profit 70
            ]
          }
        },

          descriptionDetails: `
            <div class="desc-question-details">
           
              <p class="desc-que-blue">Database</p>
              <p>The database given is similar to IMDb, which consists data related to various movies, directors and actors.</p>
            <img
              src="/assets/img/joins_db_diagram_coding_pratice_3.png"
              alt="DOM Tree"
              style={{ width: "100%", height: "300px" }}
            />
            <p>The database is designed to cover the below business requirements.</p>
              <ul>
                <li>A movie can have more than one actor casted and vice versa.</li>
                <li>A movie can have more than one director and vice versa.</li>
              </ul>

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <p>You can assume that actors in the database have acted in at least one movie (in the database), where as some directors might not have the movies they directed(in the given database). So, do take care of this detail while writing various queries on the database, especially, when deciding on INNER JOIN / LEFT JOIN.</p>
                  </ul>
              </div>
              <p class="desc-que-blue">Junction Tables</p>

              <p>movie_cast is a junction table which stores the many-to-many relationship between movie and actor. And role of an actor for a movie is stored in the table. Similarly movie_director table stores the many-to-many relationship between movie and director</p>
              <p>Refer the tables in the code playground for a better understanding of the database.           </p>
              
              <p class="desc-que-blue">Questions</p>
              <p>Get all the director_ids who directed at least two movies that have a profit at least 50 crores.</p>
              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <li>Profit is the difference between collection and budget of movies</li>
                <li>Sort the output in the descending order of no_of_movies_with_atleast_profit_50_cr and then in the ascending order of director_id.</li>
                </ul>
                </div>
              <p class="desc-que-blue">Expected Output Format</p>
              <div class="sql-table-desc">
                <table>
                  <thead>
                    <tr>
                      <th>director_id</th>
                      <th>no_of_movies_with_atleast_profit_50_cr</th>
                    </tr>
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
            visible: true
          },
          {
            id: 2,
            description: "Should join movie and movie_director using INNER JOIN",
            type: "syntax-validation",
            expectedKeywords: [
              "inner join movie_director on movie.id = movie_director.movie_id"
            ],
            visible: true
          },
          {
            id: 3,
            description: "Should calculate profit using collection_in_cr - budget_in_cr",
            type: "syntax-validation",
            expectedKeywords: [
              "(movie.collection_in_cr - movie.budget_in_cr) >= 50"
            ],
            visible: false
          },
          {
            id: 4,
            description: "Should group by movie_director.director_id",
            type: "syntax-validation",
            expectedKeywords: [
              "group by movie_director.director_id"
            ],
            visible: false
          },
          {
            id: 5,
            description: "Should filter directors with at least 2 qualifying movies",
            type: "syntax-validation",
            expectedKeywords: [
              "having count(movie.id) >= 2"
            ],
            visible: false
          },
          {
            id: 6,
            description: "Should sort correctly by count DESC and director_id ASC",
            type: "syntax-validation",
            expectedKeywords: [
              "order by no_of_movies_with_atleast_profit_50_cr desc, movie_director.director_id asc"
            ],
            visible: false
          },
        ],
        },
      ],
    },
    // SQL Practice 13
    {
      id: "sql-coding-practice-13",
      title: "SQL Coding Practice 13",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-13-1",
          title: "Create a view user details",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Easy",
          score: 30,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
             user: {   // ✅ FIXED (was users)
              columns: ["id", "name", "age", "gender", "phone_no", "address", "pincode"],
              rows: [
                [1, "Arjun", 28, "M", "9876543210", "Hyderabad", "500001"],
                [2, "Sneha", 32, "F", "9876543211", "Mumbai", "500002"],
                [3, "Rahul", 26, "M", "9876543212", "Delhi", "500003"],
                [4, "Priya", 30, "F", "9876543213", "Chennai", "500004"]
              ]
            },

            products: {
              columns: ["id", "name", "category", "rating"],
              rows: [
                [291, "iPhone", "MOBILE", 4.5],
                [292, "Samsung Galaxy", "MOBILE", 4.2],
                [293, "OnePlus", "MOBILE", 4.0],
                [294, "Realme", "MOBILE", 3.8],
                [296, "Nokia", "MOBILE", 3.5],

                [301, "Screen Guard A", "ACCESSORY", 3.0],
                [302, "Screen Guard B", "ACCESSORY", 3.5],
                [303, "Screen Guard C", "ACCESSORY", 2.8],
                [304, "Screen Guard D", "ACCESSORY", 3.2],

                [401, "Titan Watch", "WATCH", 4.6],
                [402, "Fastrack Watch", "WATCH", 4.1],
                [403, "Sonata Watch", "WATCH", 3.9]
              ]
            },

            orders: {
              columns: ["id", "user_id", "total_amount"],
              rows: [
                [1001, 1, 60000],
                [1002, 1, 20000],
                [1003, 2, 75000],
                [1004, 2, 10000],
                [1005, 3, 55000],
                [1006, 4, 15000],
                [1007, 4, 80000]
              ]
            },

            order_items: {
              columns: ["order_id", "product_id"],
              rows: [
                // Order 1001 → Mobile only ✅
                [1001, 291],
                [1001, 292],

                // Order 1002 → Mobile + Screen Guard ❌
                [1002, 291],
                [1002, 301],

                // Order 1003 → Mobile only ✅
                [1003, 293],

                // Order 1004 → Watch only
                [1004, 401],

                // Order 1005 → Mobile only ✅
                [1005, 294],

                // Order 1006 → Screen Guard only ❌
                [1006, 302],

                // Order 1007 → Mobile + Screen Guard ❌
                [1007, 296],
                [1007, 303]
              ]
            }

          },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
          <p>The database stores the sample data of an e-commerce application.</p>
          <p>The database consists of <b>user</b>, <b>product</b>, <b>order_product</b> and <b>order_details</b> tables that store the information of users, orders placed, and the products available on the platform.</p>

          <p>The database is designed to cover the below business requirements.</p>
          <ul>
            <li>A user can place multiple orders.</li>
            <li>An order can be placed by only one user.</li>
            <li>A single order can contain multiple products.</li>
            <li>A product can be included in multiple orders.</li>
          </ul>

          <div class="Note-container">
            <div class="icon-note">
              <h6>
                <i class="bi bi-journal-text"></i>Note
              </h6>
            </div>
            <div class="sql-table-desc">
             <div class="sql-table-caption">Table: user table</div>
              <table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>phone_no</th>
                    <th>address</th>
                    <th>pincode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
            </div>
              <p>user table stores the data of the user details i.e., id,name,age,gender,phone_no,address and pincode</p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: product table</div>
        <table>
          <thead>
            <tr>
              <th>product_id</th>
              <th>name</th>
              <th>price_per_unit</th>
              <th>rating</th>
              <th>category</th>
              <th>brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>product table stores the data of the product details i.e., product_id,name,price_per_unit,rating,category and brand.</p>
                
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_product table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>order_producttable stores the data of  order_id, product_id and  no_of_units ordered.</p>
      <p>First row in the table represents that the order with order_id= 611 has contain the product with product_id=236 and the ordered no_of_units = 1.</p>
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_details table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>Similarly, order_detailstable stores the data of order_id , customer_id , order_date, shipped_date , shipped_id and total_amount.</p>
      </div>

          <p>Refer the tables in the code playground for a better understanding of the database.</p>

          <p class="desc-que-blue">Questions</p>

          <p>Create a view <b>user_details</b> to store the following information of the user.</p>

          <p class="desc-que-blue">Columns In View</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>age</th>
                  <th>gender</th>
                  <th>pincode</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
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
                description: "Query should create a view named user_details",
                type: "syntax-validation",
                expectedKeywords: ["create view user_details as"],
                visible: true
              },
              {
                id: 2,
                description: "View should select id column",
                type: "syntax-validation",
                expectedKeywords: ["select", "id"],
                visible: true
              },
              {
                id: 3,
                description: "View should select name column",
                type: "syntax-validation",
                expectedKeywords: ["name"],
                visible: false
              },
              {
                id: 4,
                description: "View should select age column",
                type: "syntax-validation",
                expectedKeywords: ["age"],
                visible: false
              },
              {
                id: 5,
                description: "View should select gender column",
                type: "syntax-validation",
                expectedKeywords: ["gender"],
                visible: false
              },
              {
                id: 6,
                description: "View should select pincode column",
                type: "syntax-validation",
                expectedKeywords: ["pincode"],
                visible: false
              }
            ],
        }, 
//         {
//           id: "sql-query-13-2",
//           title: "Create a view user order details",
//           description:
//             "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

//           difficulty: "Easy",
//           score: 35,
//           type: "sql",

//           defaultCode: {
//             sql: ``,
//           },

//           tableData: {
//              user: {   // ✅ FIXED (was users)
//               columns: ["id", "name", "age", "gender", "phone_no", "address", "pincode"],
//               rows: [
//                 [1, "Arjun", 28, "M", "9876543210", "Hyderabad", "500001"],
//                 [2, "Sneha", 32, "F", "9876543211", "Mumbai", "500002"],
//                 [3, "Rahul", 26, "M", "9876543212", "Delhi", "500003"],
//                 [4, "Priya", 30, "F", "9876543213", "Chennai", "500004"]
//               ]
//             },
//              order_details: {   // ✅ MUST match query
//                 columns: ["order_id", "customer_id", "total_amount"],
//                 rows: [
//                   [1001, 1, 60000],
//                   [1002, 1, 20000],
//                   [1003, 2, 75000],
//                   [1004, 2, 10000],
//                   [1005, 3, 55000],
//                   [1006, 4, 15000],
//                   [1007, 4, 80000]
//                 ]
//               },

//             products: {
//               columns: ["id", "name", "category", "rating"],
//               rows: [
//                 [291, "iPhone", "MOBILE", 4.5],
//                 [292, "Samsung Galaxy", "MOBILE", 4.2],
//                 [293, "OnePlus", "MOBILE", 4.0],
//                 [294, "Realme", "MOBILE", 3.8],
//                 [296, "Nokia", "MOBILE", 3.5],

//                 [301, "Screen Guard A", "ACCESSORY", 3.0],
//                 [302, "Screen Guard B", "ACCESSORY", 3.5],
//                 [303, "Screen Guard C", "ACCESSORY", 2.8],
//                 [304, "Screen Guard D", "ACCESSORY", 3.2],

//                 [401, "Titan Watch", "WATCH", 4.6],
//                 [402, "Fastrack Watch", "WATCH", 4.1],
//                 [403, "Sonata Watch", "WATCH", 3.9]
//               ]
//             },

//             orders: {
//               columns: ["id", "user_id", "total_amount"],
//               rows: [
//                 [1001, 1, 60000],
//                 [1002, 1, 20000],
//                 [1003, 2, 75000],
//                 [1004, 2, 10000],
//                 [1005, 3, 55000],
//                 [1006, 4, 15000],
//                 [1007, 4, 80000]
//               ]
//             },

//             order_items: {
//               columns: ["order_id", "product_id"],
//               rows: [
//                 // Order 1001 → Mobile only ✅
//                 [1001, 291],
//                 [1001, 292],

//                 // Order 1002 → Mobile + Screen Guard ❌
//                 [1002, 291],
//                 [1002, 301],

//                 // Order 1003 → Mobile only ✅
//                 [1003, 293],

//                 // Order 1004 → Watch only
//                 [1004, 401],

//                 // Order 1005 → Mobile only ✅
//                 [1005, 294],

//                 // Order 1006 → Screen Guard only ❌
//                 [1006, 302],

//                 // Order 1007 → Mobile + Screen Guard ❌
//                 [1007, 296],
//                 [1007, 303]
//               ]
//             }

//           },

//           descriptionDetails: `
//         <div class="desc-question-details">

//           <p class="desc-que-blue">Database</p>
//           <p>The database stores the sample data of an e-commerce application.</p>
//           <p>The database consists of <b>user</b>, <b>product</b>, <b>order_product</b> and <b>order_details</b> tables that store the information of users, orders placed, and the products available on the platform.</p>

//           <p>The database is designed to cover the below business requirements.</p>
//           <ul>
//             <li>A user can place multiple orders.</li>
//             <li>An order can be placed by only one user.</li>
//             <li>A single order can contain multiple products.</li>
//             <li>A product can be included in multiple orders.</li>
//           </ul>

//           <div class="Note-container">
//             <div class="icon-note">
//               <h6>
//                 <i class="bi bi-journal-text"></i>Note
//               </h6>
//             </div>
//             <div class="sql-table-desc">
//              <div class="sql-table-caption">Table: user table</div>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>id</th>
//                     <th>name</th>
//                     <th>age</th>
//                     <th>gender</th>
//                     <th>phone_no</th>
//                     <th>address</th>
//                     <th>pincode</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//               <p>user table stores the data of the user details i.e., id,name,age,gender,phone_no,address and pincode</p>
//               <div class="sql-table-desc">
//               <div class="sql-table-caption">Table: product table</div>
//         <table>
//           <thead>
//             <tr>
//               <th>product_id</th>
//               <th>name</th>
//               <th>price_per_unit</th>
//               <th>rating</th>
//               <th>category</th>
//               <th>brand</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p>product table stores the data of the product details i.e., product_id,name,price_per_unit,rating,category and brand.</p>
                
//       <div class="sql-table-desc">
//       <div class="sql-table-caption">Table: order_product table</div>
//         <table>
//           <thead>
//             <tr>
//               <th>order_id</th>
//               <th>product_id</th>
//               <th>no_of_units</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p>order_producttable stores the data of  order_id, product_id and  no_of_units ordered.</p>
//       <p>First row in the table represents that the order with order_id= 611 has contain the product with product_id=236 and the ordered no_of_units = 1.</p>
//       <div class="sql-table-desc">
//       <div class="sql-table-caption">Table: order_details table</div>
//         <table>
//           <thead>
//             <tr>
//               <th>order_id</th>
//               <th>product_id</th>
//               <th>no_of_units</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p>Similarly, order_detailstable stores the data of order_id , customer_id , order_date, shipped_date , shipped_id and total_amount.</p>
//       </div>

//           <p>Refer the tables in the code playground for a better understanding of the database.</p>

//           <p class="desc-que-blue">Questions</p>

//           <p>Create a view <b>user_order_details</b> to store the following information of the users and their orders.</p>
//           <p class="desc-que-blue">Columns In View</p>
//          <div class="sql-table-desc">
//             <table>
//               <thead>
//                 <tr>
//                   <th>user_id</th>
//                   <th>name</th>
//                   <th>age</th>
//                   <th>gender</th>
//                   <th>pincode</th>
//                   <th>order_id</th>
//                   <th>total_amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//         </div>
//          `,

//           testCases: [
//           {
//             id: 1,
//             description: "Query should create a view named user_order_details",
//             type: "syntax-validation",
//             expectedKeywords: ["create view user_order_details as"],
//             visible: true
//           },
//           {
//             id: 2,
//             description: "Query should select required columns",
//             type: "syntax-validation",
//             expectedKeywords: [
//               "id as user_id",
//               "name",
//               "age",
//               "gender",
//               "pincode",
//               "order_id",
//               "total_amount"
//             ],
//             visible: true
//           },
//           {
//             id: 3,
//             description: "Query should select data from user table",
//             type: "syntax-validation",
//             expectedKeywords: ["from user"],
//             visible: true
//           },
//           {
//             id: 4,
//             description: "Query should join order_details table",
//             type: "syntax-validation",
//             expectedKeywords: ["inner join order_details"],
//             visible: true
//           },
//           {
//             id: 5,
//             description: "Query should join using correct condition",
//             type: "syntax-validation",
//             expectedKeywords: ["user.id = order_details.customer_id"],
//             visible: true
//           }
//         ],
//         },
//         {
//           id: "sql-query-13-3",
//           title: "Shopped for more than 50,000 rupee",
//           description:
//             "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

//           difficulty: "Easy",
//           score: 35,
//           type: "sql",

//           defaultCode: {
//             sql: ``,
//           },

//           tableData: {

//   user: {
//     columns: ["id", "name", "age", "gender", "phone_no", "address", "pincode"],
//     rows: [
//       [1, "Arjun", 28, "M", "9876543210", "Hyderabad", "500001"],
//       [2, "Sneha", 32, "F", "9876543211", "Mumbai", "500002"],
//       [3, "Rahul", 26, "M", "9876543212", "Delhi", "500003"],
//       [4, "Priya", 30, "F", "9876543213", "Chennai", "500004"]
//     ]
//   },

//   order_details: {
//     columns: ["order_id", "customer_id", "total_amount"],
//     rows: [
//       [1001, 1, 60000],
//       [1002, 1, 20000],
//       [1003, 2, 75000],
//       [1004, 2, 10000],
//       [1005, 3, 55000],
//       [1006, 4, 15000],
//       [1007, 4, 80000]
//     ]
//   },

//   // ✅ REQUIRED VIEW FOR YOUR QUESTION
//   location_order_details: {
//     columns: ["user_id", "pincode", "order_id", "total_amount"],
//     rows: [
//       [1, "500001", 1001, 60000],
//       [1, "500001", 1002, 20000],
//       [2, "500002", 1003, 75000],
//       [2, "500002", 1004, 10000],
//       [3, "500003", 1005, 55000],
//       [4, "500004", 1006, 15000],
//       [4, "500004", 1007, 80000]
//     ]
//   }

// },

//           descriptionDetails: `
//         <div class="desc-question-details">

//           <p class="desc-que-blue">Database</p>
//           <p>The database stores the sample data of an e-commerce application.</p>
//           <p>The database consists of <b>user</b>, <b>product</b>, <b>order_product</b> and <b>order_details</b> tables that store the information of users, orders placed, and the products available on the platform.</p>

//           <p>The database is designed to cover the below business requirements.</p>
//           <ul>
//             <li>A user can place multiple orders.</li>
//             <li>An order can be placed by only one user.</li>
//             <li>A single order can contain multiple products.</li>
//             <li>A product can be included in multiple orders.</li>
//           </ul>

//           <div class="Note-container">
//             <div class="icon-note">
//               <h6>
//                 <i class="bi bi-journal-text"></i>Note
//               </h6>
//             </div>
//             <div class="sql-table-desc">
//              <div class="sql-table-caption">Table: user table</div>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>id</th>
//                     <th>name</th>
//                     <th>age</th>
//                     <th>gender</th>
//                     <th>phone_no</th>
//                     <th>address</th>
//                     <th>pincode</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//               <p>user table stores the data of the user details i.e., id,name,age,gender,phone_no,address and pincode</p>
//               <div class="sql-table-desc">
//               <div class="sql-table-caption">Table: product table</div>
//         <table>
//           <thead>
//             <tr>
//               <th>product_id</th>
//               <th>name</th>
//               <th>price_per_unit</th>
//               <th>rating</th>
//               <th>category</th>
//               <th>brand</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p>product table stores the data of the product details i.e., product_id,name,price_per_unit,rating,category and brand.</p>
                
//       <div class="sql-table-desc">
//       <div class="sql-table-caption">Table: order_product table</div>
//         <table>
//           <thead>
//             <tr>
//               <th>order_id</th>
//               <th>product_id</th>
//               <th>no_of_units</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p>order_producttable stores the data of  order_id, product_id and  no_of_units ordered.</p>
//       <p>First row in the table represents that the order with order_id= 611 has contain the product with product_id=236 and the ordered no_of_units = 1.</p>
//       <div class="sql-table-desc">
//       <div class="sql-table-caption">Table: order_details table</div>
//         <table>
//           <thead>
//             <tr>
//               <th>order_id</th>
//               <th>product_id</th>
//               <th>no_of_units</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p>Similarly, order_detailstable stores the data of order_id , customer_id , order_date, shipped_date , shipped_id and total_amount.</p>
//       </div>

//           <p>Refer the tables in the code playground for a better understanding of the database.</p>

//           <p class="desc-que-blue">Questions</p>

//           <p>Get the user_id and pincode of the customers who shopped for more than 50,000 rupees from thelocation_order_detailsview present in the database.</p>
//           <p class="desc-que-blue">Columns In View</p>
//          <div class="sql-table-desc">
//             <table>
//               <thead>
//                 <tr>
//                   <th>user_id</th>
//                   <th>pincode</th>
//                   <th>order_id</th>
//                   <th>total_amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <p class="desc-que-blue">Expected Output Format:</p>
//           <div class="sql-table-desc">
//             <table>
//               <thead>
//                 <tr>
//                   <th>user_id</th>
//                   <th>pincode</th>
//                   <th>total_amount_spent</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//         </div>
//          `,
//         testCases: [
//           {
//             id: 1,
//             description: "Query should select required columns",
//             type: "syntax-validation",
//             expectedKeywords: ["select", "user_id", "pincode", "sum(total_amount)"],
//             visible: true
//           },
//           {
//             id: 2,
//             description: "Query should use location_order_details view",
//             type: "syntax-validation",
//             expectedKeywords: ["from location_order_details"],
//             visible: true
//           },
//           {
//             id: 3,
//             description: "Query should group by user_id and pincode",
//             type: "syntax-validation",
//             expectedKeywords: ["group by", "user_id", "pincode"],
//             visible: true
//           },
//           {
//             id: 4,
//             description: "Query should filter customers who spent more than 50000",
//             type: "syntax-validation",
//             expectedKeywords: ["having", "sum(total_amount) > 50000"],
//             visible: true
//           }
//         ],
//         },
        {
          id: "sql-query-13-4",
          title: "Rating variance",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

        tableData: {
          product: {
            columns: ["id", "name", "rating"],
            rows: [
              [1, "Laptop", 4.2],
              [2, "Smartphone", 3.8],
              [3, "Headphones", 4.5],
              [4, "Keyboard", 4.0],
              [5, "Mouse", 3.5]
            ]
          }
        },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
          <p>The database stores the sample data of an e-commerce application.</p>
          <p>The database consists of <b>user</b>, <b>product</b>, <b>order_product</b> and <b>order_details</b> tables that store the information of users, orders placed, and the products available on the platform.</p>

          <p>The database is designed to cover the below business requirements.</p>
          <ul>
            <li>A user can place multiple orders.</li>
            <li>An order can be placed by only one user.</li>
            <li>A single order can contain multiple products.</li>
            <li>A product can be included in multiple orders.</li>
          </ul>

          <div class="Note-container">
            <div class="icon-note">
              <h6>
                <i class="bi bi-journal-text"></i>Note
              </h6>
            </div>
            <div class="sql-table-desc">
             <div class="sql-table-caption">Table: user table</div>
              <table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>phone_no</th>
                    <th>address</th>
                    <th>pincode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
            </div>
              <p>user table stores the data of the user details i.e., id,name,age,gender,phone_no,address and pincode</p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: product table</div>
        <table>
          <thead>
            <tr>
              <th>product_id</th>
              <th>name</th>
              <th>price_per_unit</th>
              <th>rating</th>
              <th>category</th>
              <th>brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>product table stores the data of the product details i.e., product_id,name,price_per_unit,rating,category and brand.</p>
                
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_product table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>order_producttable stores the data of  order_id, product_id and  no_of_units ordered.</p>
      <p>First row in the table represents that the order with order_id= 611 has contain the product with product_id=236 and the ordered no_of_units = 1.</p>
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_details table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>Similarly, order_detailstable stores the data of order_id , customer_id , order_date, shipped_date , shipped_id and total_amount.</p>
      </div>

          <p>Refer the tables in the code playground for a better understanding of the database.</p>

          <p class="desc-que-blue">Questions</p>

          <p>Get the rating variance for every product in the database.</p>
          <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <ul>
                <p>Rating variance is the difference between average rating and rating of a product </p>
                  </ul>
              </div>
          <p class="desc-que-blue">Expected Output Format:</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>rating_variance</th>
                </tr>
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
              description: "Query should select required columns: name and rating variance",
              type: "syntax-validation",
              expectedKeywords: ["select", "name", "avg", "rating", "-"],
              visible: true
            },
            {
              id: 2,
              description: "Query should calculate rating variance correctly for each product",
              type: "result-validation",
              expectedResult: [
                { name: "Laptop", rating_variance: 4.0 - 4.2 },      // -0.2
                { name: "Smartphone", rating_variance: 4.0 - 3.8 },  // 0.2
                { name: "Headphones", rating_variance: 4.0 - 4.5 },  // -0.5
                { name: "Keyboard", rating_variance: 4.0 - 4.0 },    // 0
                { name: "Mouse", rating_variance: 4.0 - 3.5 }        // 0.5
              ],
              visible: true
            }
          ],
        },
//         {
//           id: "sql-query-13-5",
//           title: "Rating variance MOBILE category.",
//           description:
//             "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

//           difficulty: "Easy",
//           score: 35,
//           type: "sql",

//           defaultCode: {
//             sql: ``,
//           },

//        tableData:{
//           product: {
//             "columns": ["id", "name", "category", "rating", "price"],
//             "rows": [
//               [1, "iPhone 14", "MOBILE", 4.5, 80000],
//               [2, "Samsung Galaxy S23", "MOBILE", 4.2, 70000],
//               [3, "OnePlus 11", "MOBILE", 4.0, 50000],
//               [4, "iPad Pro", "TABLET", 4.6, 90000],
//               [5, "Apple Watch Series 9", "WATCH", 4.7, 50000]
//             ]
//           }
//         },

//           descriptionDetails: `
//         <div class="desc-question-details">

//           <p class="desc-que-blue">Database</p>
//           <p>The database stores the sample data of an e-commerce application.</p>
//           <p>The database consists of <b>user</b>, <b>product</b>, <b>order_product</b> and <b>order_details</b> tables that store the information of users, orders placed, and the products available on the platform.</p>

//           <p>The database is designed to cover the below business requirements.</p>
//           <ul>
//             <li>A user can place multiple orders.</li>
//             <li>An order can be placed by only one user.</li>
//             <li>A single order can contain multiple products.</li>
//             <li>A product can be included in multiple orders.</li>
//           </ul>

//           <div class="Note-container">
//             <div class="icon-note">
//               <h6>
//                 <i class="bi bi-journal-text"></i>Note
//               </h6>
//             </div>
//             <div class="sql-table-desc">
//              <div class="sql-table-caption">Table: user table</div>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>id</th>
//                     <th>name</th>
//                     <th>age</th>
//                     <th>gender</th>
//                     <th>phone_no</th>
//                     <th>address</th>
//                     <th>pincode</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                     <td>...</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//               <p>user table stores the data of the user details i.e., id,name,age,gender,phone_no,address and pincode</p>
//               <div class="sql-table-desc">
//               <div class="sql-table-caption">Table: product table</div>
//         <table>
//           <thead>
//             <tr>
//               <th>product_id</th>
//               <th>name</th>
//               <th>price_per_unit</th>
//               <th>rating</th>
//               <th>category</th>
//               <th>brand</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p>product table stores the data of the product details i.e., product_id,name,price_per_unit,rating,category and brand.</p>
                
//       <div class="sql-table-desc">
//       <div class="sql-table-caption">Table: order_product table</div>
//         <table>
//           <thead>
//             <tr>
//               <th>order_id</th>
//               <th>product_id</th>
//               <th>no_of_units</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p>order_producttable stores the data of  order_id, product_id and  no_of_units ordered.</p>
//       <p>First row in the table represents that the order with order_id= 611 has contain the product with product_id=236 and the ordered no_of_units = 1.</p>
//       <div class="sql-table-desc">
//       <div class="sql-table-caption">Table: order_details table</div>
//         <table>
//           <thead>
//             <tr>
//               <th>order_id</th>
//               <th>product_id</th>
//               <th>no_of_units</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>...</td>
//               <td>...</td>
//               <td>...</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p>Similarly, order_detailstable stores the data of order_id , customer_id , order_date, shipped_date , shipped_id and total_amount.</p>
//       </div>

//           <p>Refer the tables in the code playground for a better understanding of the database.</p>

//           <p class="desc-que-blue">Questions</p>

//           <p>
// Let's now calculate the rating variance of products in the "MOBILE" category.</p>
//           <div class="Note-container">
//                 <div class="icon-note">
//                   <h6>
//                     <i class="bi bi-journal-text"></i>Note
//                   </h6>
//                 </div>
//                 <ul>
//                 <p>Rating variance is the difference between average rating and rating of a product </p>
//                   </ul>
//               </div>
//           <p class="desc-que-blue">Expected Output Format:</p>
//           <div class="sql-table-desc">
//             <table>
//               <thead>
//                 <tr>
//                   <th>name</th>
//                   <th>rating_variance</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>...</td>
//                   <td>...</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//         </div>
//          `,
//         testCases:[
//           {
//             "id": 1,
//             "description": "Query should select name and rating_variance for MOBILE products",
//             "type": "syntax-validation",
//             "expectedKeywords": ["select", "avg", "from", "where"],
//             "visible": true
//           }
//         ],
//         },
        {
          id: "sql-query-13-6",
          title: "WATCH category",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 40,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

       tableData: {
          product: {
            "columns": ["name", "category", "rating"],
            "rows": [
              ["Apple Watch Series 8", "WATCH", 4.5],
              ["Samsung Galaxy Watch 5", "WATCH", 4.0],
              ["Fossil Gen 6 WATCH", "WATCH", 3.8],
              ["Garmin Venu 2 WATCH", "WATCH", 4.3]
             
            ]
          }
        },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
          <p>The database stores the sample data of an e-commerce application.</p>
          <p>The database consists of <b>user</b>, <b>product</b>, <b>order_product</b> and <b>order_details</b> tables that store the information of users, orders placed, and the products available on the platform.</p>

          <p>The database is designed to cover the below business requirements.</p>
          <ul>
            <li>A user can place multiple orders.</li>
            <li>An order can be placed by only one user.</li>
            <li>A single order can contain multiple products.</li>
            <li>A product can be included in multiple orders.</li>
          </ul>

          <div class="Note-container">
            <div class="icon-note">
              <h6>
                <i class="bi bi-journal-text"></i>Note
              </h6>
            </div>
            <div class="sql-table-desc">
             <div class="sql-table-caption">Table: user table</div>
              <table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>phone_no</th>
                    <th>address</th>
                    <th>pincode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
            </div>
              <p>user table stores the data of the user details i.e., id,name,age,gender,phone_no,address and pincode</p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: product table</div>
        <table>
          <thead>
            <tr>
              <th>product_id</th>
              <th>name</th>
              <th>price_per_unit</th>
              <th>rating</th>
              <th>category</th>
              <th>brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>product table stores the data of the product details i.e., product_id,name,price_per_unit,rating,category and brand.</p>
                
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_product table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>order_producttable stores the data of  order_id, product_id and  no_of_units ordered.</p>
      <p>First row in the table represents that the order with order_id= 611 has contain the product with product_id=236 and the ordered no_of_units = 1.</p>
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_details table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>Similarly, order_detailstable stores the data of order_id , customer_id , order_date, shipped_date , shipped_id and total_amount.</p>
      </div>

          <p>Refer the tables in the code playground for a better understanding of the database.</p>

          <p class="desc-que-blue">Questions</p>
          <p>Get all the products from the "WATCH" category, where rating is greater than average rating</p>
          <div class="Note-container">
                
          <p class="desc-que-blue">Expected Output Format:</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>rating</th>
                </tr>
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
            "id": 1,
            "description": "Query should select name and rating of products in WATCH category with rating above average",
            "type": "syntax-validation",
            "expectedKeywords": ["select", "name", "rating", "from", "where", "avg"],
            "visible": true
          }
        ],
        }, 
        {
          id: "sql-query-13-7",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Average amount spent",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

       tableData: {
          order_details: {
            "columns": ["order_id", "customer_id", "total_amount"],
            "rows": [
              [1001, 1, 60000],
              [1002, 1, 20000],
              [1003, 2, 75000],
              [1004, 2, 10000],
              [1005, 3, 55000],
              [1006, 4, 15000],
              [1007, 4, 80000]
            ]
          }
        },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
          <p>The database stores the sample data of an e-commerce application.</p>
          <p>The database consists of <b>user</b>, <b>product</b>, <b>order_product</b> and <b>order_details</b> tables that store the information of users, orders placed, and the products available on the platform.</p>

          <p>The database is designed to cover the below business requirements.</p>
          <ul>
            <li>A user can place multiple orders.</li>
            <li>An order can be placed by only one user.</li>
            <li>A single order can contain multiple products.</li>
            <li>A product can be included in multiple orders.</li>
          </ul>

          <div class="Note-container">
            <div class="icon-note">
              <h6>
                <i class="bi bi-journal-text"></i>Note
              </h6>
            </div>
            <div class="sql-table-desc">
             <div class="sql-table-caption">Table: user table</div>
              <table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>phone_no</th>
                    <th>address</th>
                    <th>pincode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
            </div>
              <p>user table stores the data of the user details i.e., id,name,age,gender,phone_no,address and pincode</p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: product table</div>
        <table>
          <thead>
            <tr>
              <th>product_id</th>
              <th>name</th>
              <th>price_per_unit</th>
              <th>rating</th>
              <th>category</th>
              <th>brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>product table stores the data of the product details i.e., product_id,name,price_per_unit,rating,category and brand.</p>
                
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_product table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>order_producttable stores the data of  order_id, product_id and  no_of_units ordered.</p>
      <p>First row in the table represents that the order with order_id= 611 has contain the product with product_id=236 and the ordered no_of_units = 1.</p>
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_details table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>Similarly, order_detailstable stores the data of order_id , customer_id , order_date, shipped_date , shipped_id and total_amount.</p>
      </div>

          <p>Refer the tables in the code playground for a better understanding of the database.</p>

          <p class="desc-que-blue">Questions</p>
          <p>
Get the  users where average amount spent by the user is greater than the average amount spent on all the orders on the platform</p>
          <div class="Note-container">
                
          <p class="desc-que-blue">Expected Output Format:</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                  <th>customer_id</th>
                  <th>avg_amount_spent</th>
                </tr>
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
            "id": 1,
            "description": "Query should select customer_id and avg_amount_spent for users with above-average spending",
            "type": "syntax-validation",
            "expectedKeywords": ["select", "avg", "from", "group by", "having"],
            "visible": true
          }
        ],
        },
        {
          id: "sql-query-13-8",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Get order ids",
          description:
            "In this practice set, let’s get the hold of SQL Joins operations using the following database.",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

       tableData: {
          order_details: {
            "columns": ["order_id", "customer_id", "total_amount"],
            "rows": [
              [1001, 1, 60000],
              [1002, 1, 20000],
              [1003, 2, 75000],
              [1004, 2, 10000],
              [1005, 3, 55000],
              [1006, 4, 15000],
              [1007, 4, 80000]
            ]
          },
          order_product: {
            "columns": ["order_id", "product_id", "quantity"],
            "rows": [
              [1001, 291, 1],  // mobile
              [1001, 301, 1],  // screen guard
              [1002, 292, 2],  // mobile
              [1003, 293, 1],  // mobile
              [1004, 304, 1],  // screen guard
              [1005, 294, 1],  // mobile
              [1005, 302, 1],  // screen guard
              [1006, 296, 1],  // mobile
              [1007, 305, 1]   // other product
            ]
          }
        },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
          <p>The database stores the sample data of an e-commerce application.</p>
          <p>The database consists of <b>user</b>, <b>product</b>, <b>order_product</b> and <b>order_details</b> tables that store the information of users, orders placed, and the products available on the platform.</p>

          <p>The database is designed to cover the below business requirements.</p>
          <ul>
            <li>A user can place multiple orders.</li>
            <li>An order can be placed by only one user.</li>
            <li>A single order can contain multiple products.</li>
            <li>A product can be included in multiple orders.</li>
          </ul>

          <div class="Note-container">
            <div class="icon-note">
              <h6>
                <i class="bi bi-journal-text"></i>Note
              </h6>
            </div>
            <div class="sql-table-desc">
             <div class="sql-table-caption">Table: user table</div>
              <table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>phone_no</th>
                    <th>address</th>
                    <th>pincode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
            </div>
              <p>user table stores the data of the user details i.e., id,name,age,gender,phone_no,address and pincode</p>
              <div class="sql-table-desc">
              <div class="sql-table-caption">Table: product table</div>
        <table>
          <thead>
            <tr>
              <th>product_id</th>
              <th>name</th>
              <th>price_per_unit</th>
              <th>rating</th>
              <th>category</th>
              <th>brand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>product table stores the data of the product details i.e., product_id,name,price_per_unit,rating,category and brand.</p>
                
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_product table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>order_producttable stores the data of  order_id, product_id and  no_of_units ordered.</p>
      <p>First row in the table represents that the order with order_id= 611 has contain the product with product_id=236 and the ordered no_of_units = 1.</p>
      <div class="sql-table-desc">
      <div class="sql-table-caption">Table: order_details table</div>
        <table>
          <thead>
            <tr>
              <th>order_id</th>
              <th>product_id</th>
              <th>no_of_units</th>
            </tr>
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
      <p>Similarly, order_detailstable stores the data of order_id , customer_id , order_date, shipped_date , shipped_id and total_amount.</p>
      </div>

          <p>Refer the tables in the code playground for a better understanding of the database.</p>

          <p class="desc-que-blue">Questions</p>
          <p>Get order ids in which order consists of mobile (product_ids: 291, 292, 293, 294, 296). Exclude the orders that consists of screen guard (product_ids: 301, 302, 303, 304).</p>
          
                
          <p class="desc-que-blue">Expected Output Format:</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                  <th>order\_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
         `,
        testCases: [
          {
            "id": 1,
            "description": "Query should select only order_id where order contains mobile products",
            "type": "syntax-validation",
            "expectedKeywords": ["select", "order_id", "in", "not in"],
            "visible": true
          }
        ],
        },
      ],
    },
    // SQL Assignment 3
    {
      id: "sql-Assignment-3",
      title: "SQL Coding Practice 3",
      description: "Practice basic SQL queries",
      questions: [
        {
          id: "sql-query-14-1",
          title: "Top 10 videos",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            video: {
              "columns": ["video_id", "name", "duration_in_secs", "published_datetime", "no_of_views", "channel_id"],
              "rows": [
                [1000, "Getting My Driver's License", 3652, "2011-12-05 19:00", 10619, 367],
                [1001, "Apple iPhone X Review: The Best Yet!", 4556, "2021-01-19 20:12", 140012, 362],
                [1002, "Top 10 Coding Tricks", 1200, "2020-05-12 15:00", 95000, 350],
                [1003, "React JS Tutorial", 3600, "2022-03-15 18:00", 95000, 351],
                [1004, "Marvel Movie Analysis", 2400, "2019-11-11 12:00", 50000, 351],
                [1005, "Motivational Speech Compilation", 1800, "2018-08-10 09:00", 75000, 350],
                [1006, "Comedy Skits 2021", 1500, "2021-06-01 10:00", 75000, 352],
                [1007, "Fitness Tips", 2100, "2020-01-05 07:00", 85000, 353],
                [1008, "Music Video 2021", 2000, "2021-09-09 14:00", 85000, 354],
                [1009, "Advanced Python Tricks", 2700, "2022-01-12 17:00", 120000, 355],
                [1010, "AI/ML Basics", 3300, "2021-07-15 16:00", 95000, 356]
              ]
            }
          },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
         <p>The given database consists of tables that stores the information of online video-sharing platform. </p>
         <p class="desc-que-blue">Tables</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>name</th>
                  <th>gender</th>
                  <th>age</th>
                  <th>country</th>
                  <th>premium_membership</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div> <p>user table stores the data of users including user_id, name, gender, age, country and premium_membership status.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>name</th>
                  <th>owner_id</th>
                  <th>created_datetime</th>
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
          
            <p>channel table stores the data of channels including channel_id, name, owner_id and created_datetime.</p>

          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>name</th>
                  <th>duration_in_secs</th>
                  <th>published_datetime</th>
                  <th>no_of_views</th>
                  <th>channel_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>video table stores the data of videos including video_id, name, duration_in_secs, published_datetime, no_of_views, and associated channel_id.</p>
          
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: genre table</div>
            <table>
              <thead>
                <tr>
                  <th>genre_id</th>
                  <th>genre_type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>genre table stores the data of genres including genre_id and genre_type.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel_user table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>user_id</th>
                  <th>subscribed_datetime</th>
                </tr>
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
            <p>channel_user table stores the data of channel subscriptions including channel_id, user_id and subscribed_datetime.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user_likes table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>video_id</th>
                  <th>reaction_type</th>
                  <th>reacted_at</th>
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
            <p>user_likes table stores the data of user reactions including user_id, video_id, reaction_type, and reacted_at.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video_genre table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>genre_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
             </div>
             <p>video_genre table stores the data of video-genre mapping including video_id and genre_id.</p>
         <p>Refer the tables in the code playground for a better understanding of the database.</p>
          <p class="desc-que-blue">Questions</p>

          <p>Fetch the top 10 videos having more number of views</p>
          <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul>
             <li>Output must contain rows with the highest no_of_views first.</li>
             <li>If two videos have the same no_of_views, then sort by name in alphabetical order.</li>
             </ul>
             </div>
          <p class="desc-que-blue">Columns In View</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr><th>name</th>
                  <th>no_of_views</th></tr>
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
              description: "Query should select video.name and video.no_of_views",
              type: "syntax-validation",
              expectedKeywords: ["video.name", "video.no_of_views"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should fetch from video table",
              type: "syntax-validation",
              expectedKeywords: ["from video"],
              visible: true,
            },
            {
              id: 4,
              description: "Should sort videos by no_of_views DESC",
              type: "syntax-validation",
              expectedKeywords: ["order by no_of_views desc"],
              visible: true,
            },
            {
              id: 5,
              description: "Should break ties on no_of_views by sorting name ASC",
              type: "syntax-validation",
              expectedKeywords: ["order by no_of_views desc, name asc"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should limit the output to top 10 videos",
              type: "syntax-validation",
              expectedKeywords: ["limit 10"],
              visible: true,
            }
          ],
        },
        {
          id: "sql-query-14-2",
          title: "Get all the review videos",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Easy",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            video: {
              columns: ["video_id", "name", "duration_in_secs", "published_datetime", "no_of_views", "channel_id"],
              rows: [
                [1000, "Getting My Driver's License", 3652, "2011-12-05 19:00", 10619, 367],
                [1001, "Apple iPhone X Review: The Best Yet!", 4556, "2021-01-19 20:12", 140012, 362],
                [1002, "Samsung Galaxy S20 Review", 3987, "2020-03-15 18:00", 98000, 361],
                [1003, "Top 10 Movie Reviews", 2900, "2019-11-10 16:45", 75000, 359],
                [1004, "Daily Vlog: My Day in LA", 1200, "2021-05-05 12:00", 15000, 368],
                [1005, "MacBook Pro 2021 Review", 4200, "2021-06-10 14:30", 120000, 362],
                [1006, "Comedy Skit: Funniest Moments", 1800, "2020-08-20 19:00", 80000, 360],
                [1007, "iPhone Accessories Review", 2100, "2021-02-20 10:00", 90000, 362],
                [1008, "Gadget Review: Best Laptops", 3600, "2020-12-15 11:00", 110000, 362],
                [1009, "Travel Guide to Paris", 2500, "2018-06-10 09:00", 50000, 365]
              ]
            }
          },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
         <p>The given database consists of tables that stores the information of online video-sharing platform. </p>
         <p class="desc-que-blue">Tables</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>name</th>
                  <th>gender</th>
                  <th>age</th>
                  <th>country</th>
                  <th>premium_membership</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div> <p>user table stores the data of users including user_id, name, gender, age, country and premium_membership status.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>name</th>
                  <th>owner_id</th>
                  <th>created_datetime</th>
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
          
            <p>channel table stores the data of channels including channel_id, name, owner_id and created_datetime.</p>

          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>name</th>
                  <th>duration_in_secs</th>
                  <th>published_datetime</th>
                  <th>no_of_views</th>
                  <th>channel_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>video table stores the data of videos including video_id, name, duration_in_secs, published_datetime, no_of_views, and associated channel_id.</p>
          
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: genre table</div>
            <table>
              <thead>
                <tr>
                  <th>genre_id</th>
                  <th>genre_type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>genre table stores the data of genres including genre_id and genre_type.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel_user table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>user_id</th>
                  <th>subscribed_datetime</th>
                </tr>
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
            <p>channel_user table stores the data of channel subscriptions including channel_id, user_id and subscribed_datetime.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user_likes table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>video_id</th>
                  <th>reaction_type</th>
                  <th>reacted_at</th>
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
            <p>user_likes table stores the data of user reactions including user_id, video_id, reaction_type, and reacted_at.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video_genre table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>genre_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
             </div>
             <p>video_genre table stores the data of video-genre mapping including video_id and genre_id.</p>
         <p>Refer the tables in the code playground for a better understanding of the database.</p>
          <p class="desc-que-blue">Questions</p>

          <p>Get all the review videos i.e., videos which contain "review" in their name.</p>
          <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul>
             <li>Output must contain rows with the highest no_of_views first.</li></ul>
             </div>
          <p class="desc-que-blue">Columns In View</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr><th>name</th>
                  <th>no_of_views</th></tr>
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
              description: "Should select video.name and video.no_of_views",
              type: "syntax-validation",
              expectedKeywords: ["name", "no_of_views"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should fetch from video table",
              type: "syntax-validation",
              expectedKeywords: ["from video"],
              visible: true,
            },
            {
              id: 4,
              description: "Should filter videos containing 'review' in name",
              type: "syntax-validation",
              expectedKeywords: ["where name like \"%review%\""],
              visible: true,
            },
            {
              id: 5,
              description: "Should sort videos by no_of_views DESC",
              type: "syntax-validation",
              expectedKeywords: ["order by no_of_views desc"],
              visible: true,
            }
          ],
        },
        {
          id: "sql-query-14-3",
          title: "Total number of channels",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

         tableData: {
            channel: {
              columns: ["channel_id", "name", "owner_id", "created_datetime"],
              rows: [
                [350, "Motivation grid", 1011, "2014-10-05 17:32"],
                [351, "Marvel", 1011, "2014-10-05 17:32"],
                [352, "Tech Guru", 1012, "2015-01-12 10:00"],
                [353, "Daily Vlogs", 1013, "2016-07-20 09:30"],
                [354, "Movie Mania", 1014, "2017-03-15 14:45"],
                [355, "Gaming Hub", 1015, "2018-05-10 11:15"],
                [356, "Fitness Freak", 1016, "2019-08-22 18:00"]
              ]
            }
          },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
         <p>The given database consists of tables that stores the information of online video-sharing platform. </p>
         <p class="desc-que-blue">Tables</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>name</th>
                  <th>gender</th>
                  <th>age</th>
                  <th>country</th>
                  <th>premium_membership</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div> <p>user table stores the data of users including user_id, name, gender, age, country and premium_membership status.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>name</th>
                  <th>owner_id</th>
                  <th>created_datetime</th>
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
          
            <p>channel table stores the data of channels including channel_id, name, owner_id and created_datetime.</p>

          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>name</th>
                  <th>duration_in_secs</th>
                  <th>published_datetime</th>
                  <th>no_of_views</th>
                  <th>channel_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>video table stores the data of videos including video_id, name, duration_in_secs, published_datetime, no_of_views, and associated channel_id.</p>
          
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: genre table</div>
            <table>
              <thead>
                <tr>
                  <th>genre_id</th>
                  <th>genre_type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>genre table stores the data of genres including genre_id and genre_type.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel_user table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>user_id</th>
                  <th>subscribed_datetime</th>
                </tr>
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
            <p>channel_user table stores the data of channel subscriptions including channel_id, user_id and subscribed_datetime.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user_likes table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>video_id</th>
                  <th>reaction_type</th>
                  <th>reacted_at</th>
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
            <p>user_likes table stores the data of user reactions including user_id, video_id, reaction_type, and reacted_at.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video_genre table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>genre_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
             </div>
             <p>video_genre table stores the data of video-genre mapping including video_id and genre_id.</p>
         <p>Refer the tables in the code playground for a better understanding of the database.</p>
          <p class="desc-que-blue">Questions</p>

          <p>Get the total number of channels in the database.</p>
          
          <p class="desc-que-blue">Columns In View</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                <th>no_of_channels</th>
              </thead>
              <tbody>
                <tr>
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
              description: "Should count all channels",
              type: "syntax-validation",
              expectedKeywords: ["count() as no_of_channels"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should fetch from channel table",
              type: "syntax-validation",
              expectedKeywords: ["from channel"],
              visible: true,
            }
          ],
        },
        {
          id: "sql-query-14-4",
          title: "Music videos",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

         tableData: {
          video: {
            columns: ["video_id", "name", "channel_id", "no_of_views", "published_datetime"],
            rows: [
              [1, "Top Hits Music 2015", 350, 5000, "2015-08-12 10:00"],
              [2, "Relaxing Music Playlist", 351, 3000, "2014-03-22 12:30"],
              [3, "Workout Music", 352, 4500, "2013-11-05 08:20"],
              [4, "Gaming Highlights", 355, 6000, "2015-07-19 14:15"], // not music
              [5, "Classical Music Collection", 356, 7000, "2012-06-30 09:00"],
              [6, "Music Mix 2016", 354, 4000, "2016-01-01 07:50"], // after 2016, should be excluded
              [7, "Daily Vlog", 353, 2000, "2015-09-10 18:40"], // not music
              [8, "Jazz Music Hits", 350, 3200, "2014-12-15 11:10"]
            ]
          }
        },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
         <p>The given database consists of tables that stores the information of online video-sharing platform. </p>
         <p class="desc-que-blue">Tables</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>name</th>
                  <th>gender</th>
                  <th>age</th>
                  <th>country</th>
                  <th>premium_membership</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div> <p>user table stores the data of users including user_id, name, gender, age, country and premium_membership status.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>name</th>
                  <th>owner_id</th>
                  <th>created_datetime</th>
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
          
            <p>channel table stores the data of channels including channel_id, name, owner_id and created_datetime.</p>

          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>name</th>
                  <th>duration_in_secs</th>
                  <th>published_datetime</th>
                  <th>no_of_views</th>
                  <th>channel_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>video table stores the data of videos including video_id, name, duration_in_secs, published_datetime, no_of_views, and associated channel_id.</p>
          
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: genre table</div>
            <table>
              <thead>
                <tr>
                  <th>genre_id</th>
                  <th>genre_type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>genre table stores the data of genres including genre_id and genre_type.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel_user table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>user_id</th>
                  <th>subscribed_datetime</th>
                </tr>
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
            <p>channel_user table stores the data of channel subscriptions including channel_id, user_id and subscribed_datetime.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user_likes table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>video_id</th>
                  <th>reaction_type</th>
                  <th>reacted_at</th>
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
            <p>user_likes table stores the data of user reactions including user_id, video_id, reaction_type, and reacted_at.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video_genre table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>genre_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
             </div>
             <p>video_genre table stores the data of video-genre mapping including video_id and genre_id.</p>
         <p>Refer the tables in the code playground for a better understanding of the database.</p>
          <p class="desc-que-blue">Questions</p>

          <p>Get all the music videos released before the year 2016.</p>
            <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul>
             <li>You can consider the videos which contain "music" in name as music videos.</li>
             <li>Get the year in the integer format</li>
             <li>Sort the output in the descending order of year, and then in the ascending order of name.</li>
             </ul>
             
             </div>
          <p class="desc-que-blue">Expected Output Format:</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                <th>name</th>
                <th>no_of_views</th>
                <th>year</th>
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
            description: "Query should select name, no_of_views and extract year",
            type: "syntax-validation",
            expectedKeywords: [
              "name",
              "no_of_views",
              'cast(strftime("%y", published_datetime) as integer) as year'
            ],
            visible: true,
          },
          {
            id: 3,
            description: "Query should fetch data from video table",
            type: "syntax-validation",
            expectedKeywords: ["from video"],
            visible: true,
          },
          {
            id: 4,
            description: "Query should filter videos containing music in name",
            type: "syntax-validation",
            expectedKeywords: ['name like "%music%"'],
            visible: true,
          },
          {
            id: 5,
            description: "Query should filter videos released before 2016",
            type: "syntax-validation",
            expectedKeywords: ['cast(strftime("%y", published_datetime) as integer) < 2016'],
            visible: true,
          },
          {
            id: 6,
            description: "Query should sort by year DESC and name ASC",
            type: "syntax-validation",
            expectedKeywords: ["order by year desc, name asc"],
            visible: true,
          }
        ],
        },
        {
          id: "sql-query-14-5",
          title: "Total number of countries",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

         tableData: {
            user: {
              columns: [
                "user_id",
                "name",
                "gender",
                "age",
                "country",
                "created_datetime"
              ],
              rows: [
                [1, "Rahul", "Male", 25, "India", "2019-05-10 10:30"],
                [2, "John", "Male", 30, "USA", "2018-07-21 11:15"],
                [3, "Priya", "Female", 22, "India", "2020-01-12 09:40"],
                [4, "David", "Male", 28, "Canada", "2017-03-05 14:20"],
                [5, "Sophia", "Female", 26, "UK", "2021-06-18 16:00"],
                [6, "Anita", "Female", 24, "Australia", "2022-02-25 12:10"],
                [7, "Michael", "Male", 31, "USA", "2019-11-30 18:45"]
              ]
            }
          },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
         <p>The given database consists of tables that stores the information of online video-sharing platform. </p>
         <p class="desc-que-blue">Tables</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>name</th>
                  <th>gender</th>
                  <th>age</th>
                  <th>country</th>
                  <th>premium_membership</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div> <p>user table stores the data of users including user_id, name, gender, age, country and premium_membership status.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>name</th>
                  <th>owner_id</th>
                  <th>created_datetime</th>
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
          
            <p>channel table stores the data of channels including channel_id, name, owner_id and created_datetime.</p>

          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>name</th>
                  <th>duration_in_secs</th>
                  <th>published_datetime</th>
                  <th>no_of_views</th>
                  <th>channel_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>video table stores the data of videos including video_id, name, duration_in_secs, published_datetime, no_of_views, and associated channel_id.</p>
          
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: genre table</div>
            <table>
              <thead>
                <tr>
                  <th>genre_id</th>
                  <th>genre_type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>genre table stores the data of genres including genre_id and genre_type.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel_user table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>user_id</th>
                  <th>subscribed_datetime</th>
                </tr>
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
            <p>channel_user table stores the data of channel subscriptions including channel_id, user_id and subscribed_datetime.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user_likes table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>video_id</th>
                  <th>reaction_type</th>
                  <th>reacted_at</th>
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
            <p>user_likes table stores the data of user reactions including user_id, video_id, reaction_type, and reacted_at.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video_genre table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>genre_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
             </div>
             <p>video_genre table stores the data of video-genre mapping including video_id and genre_id.</p>
         <p>Refer the tables in the code playground for a better understanding of the database.</p>
          <p class="desc-que-blue">Questions</p>

          <p>Get the total number of countries where the users of the platform are present.</p>
            
          <p class="desc-que-blue">Expected Output Format:</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                <th>country_count</th>
              </thead>
              <tbody>
                <tr>
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
              description: "Query should count distinct countries",
              type: "syntax-validation",
              expectedKeywords: ["count(distinct country) as country_count"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should fetch from user table",
              type: "syntax-validation",
              expectedKeywords: ["from user"],
              visible: true,
            }
          ],
        },
        {
          id: "sql-query-14-6",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Top 10 videos",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

       tableData: {
  video: {
    columns: [
      "video_id",
      "channel_id",
      "name",
      "published_datetime",
      "no_of_views"
    ],
    rows: [
      [1, 350, "Tech Review", "2018-03-12 10:30", 12000],
      [2, 351, "Marvel Trailer", "2019-06-10 11:20", 50000],
      [3, 352, "Python Tutorial", "2020-01-15 09:45", 30000],
      [4, 353, "Daily Vlog Episode 1", "2021-02-18 14:00", 15000],
      [5, 354, "Movie Review", "2019-08-05 17:30", 22000],
      [6, 355, "Gaming Highlights", "2020-11-11 20:10", 40000],
      [7, 356, "Fitness Workout", "2021-03-25 07:50", 18000],
      [8, 350, "Motivation Speech", "2018-12-12 16:00", 25000],
      [9, 352, "JavaScript Basics", "2022-05-05 13:30", 35000],
      [10, 351, "Marvel Behind Scenes", "2023-01-01 10:10", 28000],
      [11, 355, "Gaming Tips", "2022-04-14 21:00", 26000]
    ]
  },

  channel: {
    columns: ["channel_id", "name", "owner_id", "created_datetime"],
    rows: [
      [350, "Motivation Grid", 1011, "2014-10-05 17:32"],
      [351, "Marvel", 1011, "2014-10-05 17:32"],
      [352, "Tech Guru", 1012, "2015-01-12 10:00"],
      [353, "Daily Vlogs", 1013, "2016-07-20 09:30"],
      [354, "Movie Mania", 1014, "2017-03-15 14:45"],
      [355, "Gaming Hub", 1015, "2018-05-10 11:15"],
      [356, "Fitness Freak", 1016, "2019-08-22 18:00"]
    ]
  }
},

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
         <p>The given database consists of tables that stores the information of online video-sharing platform. </p>
         <p class="desc-que-blue">Tables</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>name</th>
                  <th>gender</th>
                  <th>age</th>
                  <th>country</th>
                  <th>premium_membership</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div> <p>user table stores the data of users including user_id, name, gender, age, country and premium_membership status.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>name</th>
                  <th>owner_id</th>
                  <th>created_datetime</th>
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
          
            <p>channel table stores the data of channels including channel_id, name, owner_id and created_datetime.</p>

          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>name</th>
                  <th>duration_in_secs</th>
                  <th>published_datetime</th>
                  <th>no_of_views</th>
                  <th>channel_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>video table stores the data of videos including video_id, name, duration_in_secs, published_datetime, no_of_views, and associated channel_id.</p>
          
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: genre table</div>
            <table>
              <thead>
                <tr>
                  <th>genre_id</th>
                  <th>genre_type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>genre table stores the data of genres including genre_id and genre_type.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel_user table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>user_id</th>
                  <th>subscribed_datetime</th>
                </tr>
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
            <p>channel_user table stores the data of channel subscriptions including channel_id, user_id and subscribed_datetime.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user_likes table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>video_id</th>
                  <th>reaction_type</th>
                  <th>reacted_at</th>
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
            <p>user_likes table stores the data of user reactions including user_id, video_id, reaction_type, and reacted_at.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video_genre table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>genre_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
             </div>
             <p>video_genre table stores the data of video-genre mapping including video_id and genre_id.</p>
         <p>Refer the tables in the code playground for a better understanding of the database.</p>
          <p class="desc-que-blue">Questions</p>

          <p>
Fetch the top 10 videos having more number of views, along with the channel details.</p>
            <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <p>Sort the output in the descending order of no_of_views, and then in the ascending order of channel_name.</p>
             
             </div>
          <p class="desc-que-blue">Expected Output Format:</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                <th>video_name</th>
                <th>no_of_views</th>
                <th>channel_name</th>
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
    description: "Query should select video name, no_of_views and channel name",
    type: "syntax-validation",
    expectedKeywords: [
      "video.name as video_name",
      "video.no_of_views",
      "channel.name as channel_name"
    ],
    visible: true,
  },
  {
    id: 3,
    description: "Query should fetch data from video table",
    type: "syntax-validation",
    expectedKeywords: ["from video"],
    visible: true,
  },
  {
    id: 4,
    description: "Query should join channel table",
    type: "syntax-validation",
    expectedKeywords: ["join channel"],
    visible: true,
  },
  {
    id: 5,
    description: "Query should join tables using channel_id",
    type: "syntax-validation",
    expectedKeywords: ["video.channel_id = channel.channel_id"],
    visible: true,
  },
  {
    id: 6,
    description: "Query should sort by no_of_views DESC and channel_name ASC",
    type: "syntax-validation",
    expectedKeywords: ["order by no_of_views desc, channel_name asc"],
    visible: true,
  },
  {
    id: 7,
    description: "Query should limit output to top 10 videos",
    type: "syntax-validation",
    expectedKeywords: ["limit 10"],
    visible: true,
  }
],
        },
        {
          id: "sql-query-14-7",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Number of subscribers",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

    tableData: {
  channel_user: {
    columns: [
      "channel_id",
      "user_id",
      "subscribed_datetime"
    ],
    rows: [
      [376, 101, "2018-01-10 10:30"],
      [376, 102, "2018-03-15 11:00"],
      [376, 103, "2017-05-20 09:45"],
      [376, 104, "2018-07-25 14:20"],
      [376, 105, "2019-02-18 16:40"],
      [377, 106, "2018-06-10 12:10"],
      [376, 107, "2018-11-30 18:25"],
      [376, 108, "2020-01-01 08:15"],
      [378, 109, "2018-09-09 13:35"],
      [376, 110, "2016-12-12 15:50"]
    ]
  }
},

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
         <p>The given database consists of tables that stores the information of online video-sharing platform. </p>
         <p class="desc-que-blue">Tables</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>name</th>
                  <th>gender</th>
                  <th>age</th>
                  <th>country</th>
                  <th>premium_membership</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div> <p>user table stores the data of users including user_id, name, gender, age, country and premium_membership status.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>name</th>
                  <th>owner_id</th>
                  <th>created_datetime</th>
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
          
            <p>channel table stores the data of channels including channel_id, name, owner_id and created_datetime.</p>

          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>name</th>
                  <th>duration_in_secs</th>
                  <th>published_datetime</th>
                  <th>no_of_views</th>
                  <th>channel_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>video table stores the data of videos including video_id, name, duration_in_secs, published_datetime, no_of_views, and associated channel_id.</p>
          
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: genre table</div>
            <table>
              <thead>
                <tr>
                  <th>genre_id</th>
                  <th>genre_type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>genre table stores the data of genres including genre_id and genre_type.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel_user table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>user_id</th>
                  <th>subscribed_datetime</th>
                </tr>
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
            <p>channel_user table stores the data of channel subscriptions including channel_id, user_id and subscribed_datetime.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user_likes table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>video_id</th>
                  <th>reaction_type</th>
                  <th>reacted_at</th>
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
            <p>user_likes table stores the data of user reactions including user_id, video_id, reaction_type, and reacted_at.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video_genre table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>genre_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
             </div>
             <p>video_genre table stores the data of video-genre mapping including video_id and genre_id.</p>
         <p>Refer the tables in the code playground for a better understanding of the database.</p>
          <p class="desc-que-blue">Questions</p>
       <p>Get the total number of users subscribed for the channel "Tyler Oakley" (channel_id = 376) in the year 2018.</p>
           
          <p class="desc-que-blue">Expected Output Format:</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                <th>no_of_subscribers</th>
              </thead>
              <tbody>
                <tr>
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
    description: "Query should count subscribers",
    type: "syntax-validation",
    expectedKeywords: ["count() as no_of_subscribers"],
    visible: true,
  },
  {
    id: 3,
    description: "Query should fetch from channel_user table",
    type: "syntax-validation",
    expectedKeywords: ["from channel_user"],
    visible: true,
  },
  {
    id: 4,
    description: "Query should filter channel_id 376",
    type: "syntax-validation",
    expectedKeywords: ["channel_id = 376"],
    visible: true,
  },
  {
    id: 5,
    description: "Query should filter subscriptions in the year 2018",
    type: "syntax-validation",
    expectedKeywords: ["strftime(\"%y\", subscribed_datetime)"],
    visible: false,
  },
  {
    id: 6,
    description: "Query should check year equals 2018",
    type: "syntax-validation",
    expectedKeywords: ["2018"],
    visible: true,
  }
],
        },
        {
          id: "sql-query-14-8",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Indian users details",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 45,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
          user: {
            columns: [
              "user_id",
              "name",
              "gender",
              "age",
              "country",
              "premium_membership"
            ],
            rows: [
              [1, "Akhil", "MALE", 25, "INDIA", "TRUE"],
              [2, "Bhavana", "FEMALE", 28, "INDIA", "FALSE"],
              [3, "Charan", "MALE", 32, "INDIA", "TRUE"],
              [4, "Divya", "FEMALE", 24, "INDIA", "FALSE"],
              [5, "Ethan", "MALE", 27, "USA", "TRUE"],
              [6, "Farhan", "MALE", 29, "INDIA", "TRUE"],
              [7, "Gauri", "FEMALE", 22, "INDIA", "FALSE"],
              [8, "Henry", "MALE", 26, "UK", "FALSE"]
            ]
          },

          user_likes: {
            columns: [
              "user_id",
              "video_id",
              "reaction_type",
              "reacted_at"
            ],
            rows: [
              [1, 1011, "LIKE", "2020-01-15 10:30"],
              [2, 1011, "LIKE", "2020-03-10 12:10"],
              [3, 1011, "LIKE", "2020-04-18 09:45"],
              [4, 1011, "DISLIKE", "2020-06-20 14:30"],
              [5, 1011, "LIKE", "2020-07-25 16:00"],
              [6, 1011, "LIKE", "2020-08-30 11:50"],
              [7, 1011, "LIKE", "2020-10-05 18:40"],
              [2, 1005, "LIKE", "2020-09-09 13:10"],
              [4, 1011, "LIKE", "2019-12-01 08:20"]
            ]
          }
        },

          descriptionDetails: `
        <div class="desc-question-details">

          <p class="desc-que-blue">Database</p>
         <p>The given database consists of tables that stores the information of online video-sharing platform. </p>
         <p class="desc-que-blue">Tables</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>name</th>
                  <th>gender</th>
                  <th>age</th>
                  <th>country</th>
                  <th>premium_membership</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div> <p>user table stores the data of users including user_id, name, gender, age, country and premium_membership status.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>name</th>
                  <th>owner_id</th>
                  <th>created_datetime</th>
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
          
            <p>channel table stores the data of channels including channel_id, name, owner_id and created_datetime.</p>

          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>name</th>
                  <th>duration_in_secs</th>
                  <th>published_datetime</th>
                  <th>no_of_views</th>
                  <th>channel_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>video table stores the data of videos including video_id, name, duration_in_secs, published_datetime, no_of_views, and associated channel_id.</p>
          
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: genre table</div>
            <table>
              <thead>
                <tr>
                  <th>genre_id</th>
                  <th>genre_type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>genre table stores the data of genres including genre_id and genre_type.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: channel_user table</div>
            <table>
              <thead>
                <tr>
                  <th>channel_id</th>
                  <th>user_id</th>
                  <th>subscribed_datetime</th>
                </tr>
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
            <p>channel_user table stores the data of channel subscriptions including channel_id, user_id and subscribed_datetime.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: user_likes table</div>
            <table>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>video_id</th>
                  <th>reaction_type</th>
                  <th>reacted_at</th>
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
            <p>user_likes table stores the data of user reactions including user_id, video_id, reaction_type, and reacted_at.</p>
          <div class="sql-table-desc">
            <div class="sql-table-caption">Table: video_genre table</div>
            <table>
              <thead>
                <tr>
                  <th>video_id</th>
                  <th>genre_id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
             </div>
             <p>video_genre table stores the data of video-genre mapping including video_id and genre_id.</p>
         <p>Refer the tables in the code playground for a better understanding of the database.</p>
          <p class="desc-que-blue">Questions</p>
       <p>Get all the Indian users details whose age is below 30 years and liked the video (video_id = 1011) in the year 2020.</p>
            <div class="Note-container">
             <div class="icon-note">
               <h6>
                 <i class="bi bi-journal-text"></i>Note
               </h6>
             </div>
             <ul>
             <li>Consider the name of the country as "INDIA"</li>
             <li>Consider reaction_type LIKE as liked.</li>
             <li>Sort the output in the ascending order of name.</li>
             </ul>
             
             </div>
          <p class="desc-que-blue">Expected Output Format:</p>
          <div class="sql-table-desc">
            <table>
              <thead>
                <tr>
                <th>name</th>
                <th>gender</th>
                <th>age</th>
                <th>country</th>
                <th>premium_membership</th>
              </thead>
              <tbody>
                <tr>
                  <td>...</td>
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
          description: "Query should select required user columns",
          type: "syntax-validation",
          expectedKeywords: ["user.name", "gender", "age", "country", "premium_membership"],
          visible: true,
        },
        {
          id: 3,
          description: "Query should fetch data from user table",
          type: "syntax-validation",
          expectedKeywords: ["from user"],
          visible: true,
        },
        {
          id: 4,
          description: "Query should join user_likes table",
          type: "syntax-validation",
          expectedKeywords: ["join user_likes"],
          visible: true,
        },
        {
          id: 5,
          description: "Query should filter users from INDIA",
          type: "syntax-validation",
          expectedKeywords: ["country = \"india\""],
          visible: true,
        },
        {
          id: 6,
          description: "Query should filter users age below 30",
          type: "syntax-validation",
          expectedKeywords: ["age < 30"],
          visible: true,
        },
        {
          id: 7,
          description: "Query should filter likes for video_id 1011",
          type: "syntax-validation",
          expectedKeywords: ["video_id = 1011"],
          visible: true,
        },
        {
          id: 8,
          description: "Query should check reaction_type LIKE",
          type: "syntax-validation",
          expectedKeywords: ["reaction_type like"],
          visible: true,
        },
        {
          id: 9,
          description: "Query should sort results by user.name ASC",
          type: "syntax-validation",
          expectedKeywords: ["order by user.name asc"],
          visible: true,
        }
      ],
        },
      ],
    },
  ],
};