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
    // SQL Assignment 1
    {
      id: "sql-Assignment-1",
      title: "SQL Coding Practice 8",
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
        // {
        //   id: "sql-query-8-6",
        //   title: "Distinct ids",
        //   description:
        //     "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

        //   difficulty: "Easy",
        //   score: 35,
        //   type: "sql",

        //   defaultCode: {
        //     sql: ``,
        //   },

        //   tableData: {
        //     video_genre: {
        //       columns: ["video_id", "genre_id"],
        //       rows: [
        //         [1100, 201],
        //         [1316, 202],
        //         [1488, 203],
        //         [1089, 211],
        //         [1009, 201],
        //         [1348, 202],
        //         [1003, 203],
        //         [1289, 211],
        //         [1038, 201],
        //         [1322, 202],
        //         [1100, 202], // duplicate video in another allowed genre
        //         [1488, 211], // duplicate video in another allowed genre
        //         [1009, 203], // duplicate video in another allowed genre
        //         [1348, 205], // not required genre
        //         [1322, 210], // not required genre
        //       ],
        //     },
        //   },

        //   descriptionDetails: `
        //     <div class="desc-question-details">
        //       <p class="desc-que-blue">Database</p>
        //       <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes.</p>
        // <p>NOTE:</p>
        //       <div class="sql-table-desc">
        //         <div class="sql-table-caption">Table: channel_user table
        //         </div>
        //         <table>
        //         <thead>
        //           <tr>
        //             <th>channel_id</th>
        //             <th>user_id</th>
        //             <th>subscribed_datetime</th>
        //           </tr>
        //         </thead>
        //         <tbody>
        //           <tr>
        //             <td>100</td>
        //             <td>1</td>
        //             <td>2020-12-10 10:30:45</td>
        //           </tr>
        //           <tr>
        //             <td>100</td>
        //             <td>7</td>
        //             <td>2020-10-10 11:30:45</td>
        //           </tr>
        //           <tr>
        //             <td>--</td>
        //             <td>--</td>
        //             <td>--</td>
        //           </tr>
        //         </tbody>
        //       </table>
        //       </div>
        //       <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
        //       <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
        //       <div class="sql-table-desc">
        //       <div class="sql-table-caption">Table: user_likes table
        //       </div>
        //       <table>
        //         <thead>
        //           <tr>
        //             <th>user_id</th>
        //             <th>video_id</th>
        //             <th>reaction_type</th>
        //             <th>reacted_at</th>
        //           </tr>
        //         </thead>
        //         <tbody>
        //           <tr>
        //             <td>1</td>
        //             <td>10</td>
        //             <td>LIKE</td>
        //             <td>2020-12-10 10:30:45</td>
        //           </tr>
        //           <tr>
        //             <td>7</td>
        //             <td>10</td>
        //             <td>DISLIKE</td>
        //             <td>2020-10-10 11:30:45</td>
        //           </tr>
        //           <tr>
        //             <td>--</td>
        //             <td>--</td>
        //             <td>--</td>
        //             <td>--</td>
        //           </tr>
        //         </tbody>
        //       </table>
        //     </div>

        //       <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video. A user can either like or dislike a video. He cannot like or dislike a video multiple times (similar to how youtube works)</p>
        //             <div class="sql-table-desc">
        //   <div class="sql-table-caption">Table: video_genre table
        //   </div>
        //   <table>
        //   <thead>
        //     <tr>
        //       <th>video_id</th>
        //       <th>genre_id</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     <tr>
        //       <td>10</td>
        //       <td>201</td>
        //     </tr>
        //     <tr>
        //       <td>10</td>
        //       <td>202</td>
        //     </tr>
        //     <tr>
        //       <td>--</td>
        //       <td>--</td>
        //     </tr>
        //   </tbody>
        //   </table>
        //   </div>
        //             <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to. A single video can belong to multiple genres</p>
        //       <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>

        //       <p class="desc-que-blue">Question</p>
        //      <p>Get the distinct ids of videos that belong to the following genres.</p>
        //      <div class="sql-table-desc">
        //      <table>
        //        <thead>
        //          <tr>
        //            <th>genre_id</th>
        //            <th>genre</th>
        //          </tr>
        //        </thead>
        //        <tbody>
        //          <tr>
        //            <td>201</td>
        //            <td>Comedy</td>
        //          </tr>
        //          <tr>
        //            <td>202</td>
        //            <td>Action</td>
        //          </tr>
        //          <tr>
        //            <td>203</td>
        //            <td>Thriller</td>
        //          </tr>
        //          <tr>
        //            <td>211</td>
        //            <td>Scifi</td>
        //          </tr>
        //        </tbody>
        //      </table>
        //    </div>
        //    <div class="Note-container">
        //    <div class="icon-note">
        //      <h6>
        //        <i class="bi bi-journal-text"></i>Note
        //      </h6>
        //    </div>
        //    <p>Sort the output in the descending order of <b>video_id</b></p>
        //    </div>
        //    <p class="desc-que-blue">Expected Output Format</p>
        //    <div class="sql-table-desc">
        //    <table>
        //   <thead>
        //   <tr>
        //   <th>name</th>
        //   </tr>
        //   </thead>
        //   <tbody>
        //   <tr><td>--</td></tr>
        //   </tbody>
        //   </table>
        //     </div>
        //      </div>
        //   `,

        //   testCases: [
        //     {
        //       id: 1,
        //       description: "Query should select DISTINCT video_id",
        //       type: "syntax-validation",
        //       expectedKeywords: ["SELECT", "DISTINCT", "video_id"],
        //       visible: true,
        //     },
        //     {
        //       id: 2,
        //       description: "Query should select data from video_genre table",
        //       type: "syntax-validation",
        //       expectedKeywords: ["FROM", "video_genre"],
        //       visible: true,
        //     },
        //     {
        //       id: 3,
        //       description: "Query should filter using genre_id",
        //       type: "syntax-validation",
        //       expectedKeywords: ["WHERE", "genre_id"],
        //       visible: true,
        //     },
        //     {
        //       id: 4,
        //       description:
        //         "Query should use IN operator with required genre IDs",
        //       type: "syntax-validation",
        //       expectedKeywords: ["IN", "201", "202", "203", "211"],
        //       visible: true,
        //     },
        //     {
        //       id: 5,
        //       description:
        //         "Query should sort the result in descending order of video_id",
        //       type: "syntax-validation",
        //       expectedKeywords: ["ORDER BY", "video_id", "DESC"],
        //       visible: true,
        //     },
        //   ],
        // },
        // {
        //   id: "sql-query-8-7",
        //   title: "Distinct ids",
        //   description:
        //     "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

        //   difficulty: "Easy",
        //   score: 35,
        //   type: "sql",

        //   defaultCode: {
        //     sql: ``,
        //   },

        //   tableData: {
        //     VIDEO: {
        //       columns: [
        //         "video_id",
        //         "name",
        //         "duration_in_secs",
        //         "published_datetime",
        //         "no_of_views",
        //         "channel_id",
        //       ],
        //       rows: [
        //         [
        //           1100,
        //           "#VeteransDay: Thank You for Everything",
        //           4830,
        //           "2018-05-05 19:00",
        //           137261,
        //           367,
        //         ],
        //         [
        //           1316,
        //           "'Lord of the Rings' TV Series Gets Multi-Season Order At Amazon | News Flash | Entertainment Weekly",
        //           4654,
        //           "2017-06-10 12:32",
        //           130574,
        //           366,
        //         ],
        //         [
        //           1488,
        //           "(HD VERSION) Kelly Clarkson & P!nk Everybody Hurts LIVE at the 2017 American Music Awards!",
        //           3389,
        //           "2021-01-19 21:19",
        //           201187,
        //           366,
        //         ],
        //         [
        //           1089,
        //           "10 LIFE HACKS YOU NEED TO KNOW with TEENS (REACT)",
        //           1867,
        //           "2019-05-05 17:32",
        //           133738,
        //           350,
        //         ],
        //         [
        //           1009,
        //           "100 People Hold Their Breath for as Long as They Can",
        //           2885,
        //           "2015-05-17 19:32",
        //           272102,
        //           354,
        //         ],
        //         [
        //           1348,
        //           "2CELLOS - Cinema Paradiso [OFFICIAL VIDEO]",
        //           1312,
        //           "2017-06-10 12:32",
        //           154370,
        //           360,
        //         ],
        //         [
        //           1003,
        //           "4 Reasons I Don't Like Thanksgiving || Mayim Bialik",
        //           1751,
        //           "2017-05-05 17:32",
        //           279351,
        //           350,
        //         ],
        //         [
        //           1289,
        //           "7.3 Magnitude Earthquake Along Iraq-Iran Border Leaves At Least 400 Dead, 7,200 Injured | TIME",
        //           4019,
        //           "2019-11-10 12:32",
        //           293255,
        //           362,
        //         ],
        //         [
        //           1038,
        //           "A Day in The Life of David Letterman",
        //           2949,
        //           "2019-02-05 17:32",
        //           298876,
        //           353,
        //         ],
        //         [
        //           1322,
        //           "A Quiet Place (2018) - Official Teaser Trailer - Paramount Pictures",
        //           1225,
        //           "2015-02-10 12:32",
        //           286795,
        //           366,
        //         ],
        //       ],
        //     },
        //   },

        //   descriptionDetails: `
        //     <div class="desc-question-details">
        //       <p class="desc-que-blue">Database</p>
        //       <p>The sample database consists of tables that store the information of users, channels, videos, genres and likes/dislikes.</p>
        // <p>NOTE:</p>
        //       <div class="sql-table-desc">
        //         <div class="sql-table-caption">Table: channel_user table
        //         </div>
        //         <table>
        //         <thead>
        //           <tr>
        //             <th>channel_id</th>
        //             <th>user_id</th>
        //             <th>subscribed_datetime</th>
        //           </tr>
        //         </thead>
        //         <tbody>
        //           <tr>
        //             <td>100</td>
        //             <td>1</td>
        //             <td>2020-12-10 10:30:45</td>
        //           </tr>
        //           <tr>
        //             <td>100</td>
        //             <td>7</td>
        //             <td>2020-10-10 11:30:45</td>
        //           </tr>
        //           <tr>
        //             <td>--</td>
        //             <td>--</td>
        //             <td>--</td>
        //           </tr>
        //         </tbody>
        //       </table>
        //       </div>
        //       <p><b>channel_user</b> table stores the data of the channel_ids and their subscribers' user_ids.</p>
        //       <p>First row in the table represents that the user with user_id = 1 is subscribed to the channel with channel_id = 100 at <b>2020-12-10 10:30:45</b></p>
        //       <div class="sql-table-desc">
        //       <div class="sql-table-caption">Table: user_likes table
        //       </div>
        //       <table>
        //         <thead>
        //           <tr>
        //             <th>user_id</th>
        //             <th>video_id</th>
        //             <th>reaction_type</th>
        //             <th>reacted_at</th>
        //           </tr>
        //         </thead>
        //         <tbody>
        //           <tr>
        //             <td>1</td>
        //             <td>10</td>
        //             <td>LIKE</td>
        //             <td>2020-12-10 10:30:45</td>
        //           </tr>
        //           <tr>
        //             <td>7</td>
        //             <td>10</td>
        //             <td>DISLIKE</td>
        //             <td>2020-10-10 11:30:45</td>
        //           </tr>
        //           <tr>
        //             <td>--</td>
        //             <td>--</td>
        //             <td>--</td>
        //             <td>--</td>
        //           </tr>
        //         </tbody>
        //       </table>
        //     </div>

        //       <p>Similarly, <b>user_likes</b> table stores the data of video_id and the user_ids who reacted to the video. A user can either like or dislike a video. He cannot like or dislike a video multiple times (similar to how youtube works)</p>
        //             <div class="sql-table-desc">
        //   <div class="sql-table-caption">Table: video_genre table
        //   </div>
        //   <table>
        //   <thead>
        //     <tr>
        //       <th>video_id</th>
        //       <th>genre_id</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     <tr>
        //       <td>10</td>
        //       <td>201</td>
        //     </tr>
        //     <tr>
        //       <td>10</td>
        //       <td>202</td>
        //     </tr>
        //     <tr>
        //       <td>--</td>
        //       <td>--</td>
        //     </tr>
        //   </tbody>
        //   </table>
        //   </div>
        //             <p>Similarly, <b>video_genre</b> table stores the data of video_id and the ids of the genres that the corresponding video belongs to. A single video can belong to multiple genres</p>
        //       <p>Let’s dive in to analyze the in and outs of each part of the data. Here we go!</p>

        //       <p class="desc-que-blue">Question</p>
        //      <p>
        //      Get all the esport videos that crossed one lakh views and were released between 2018 and 2020.</p>

        //    <div class="Note-container">
        //    <div class="icon-note">
        //      <h6>
        //        <i class="bi bi-journal-text"></i>Note
        //      </h6>
        //    </div>
        //    <ul>
        //    <li>Consider the videos that have "esport" in theirname as gaming videos.<\li>
        //    <li>Sort the output in the descending order of no_of_views and published_date time</li>
        //    </ul>
        //    </div>
        //    <p class="desc-que-blue">Expected Output Format</p>
        //    <div class="sql-table-desc">
        //    <table>
        //   <thead>
        //   <tr>
        //   <th>name</th>
        //   <th>published_datetime</th>
        //   <th>no_of_viewse</th>
        //   </tr>
        //   </thead>
        //   <tbody>
        //   <tr><td>--</td><td>--</td><td>--</td></tr>
        //   </tbody>
        //   </table>
        //     </div>
        //      </div>
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
        //       description:
        //         "Query should select name, published_datetime and no_of_views",
        //       type: "syntax-validation",
        //       expectedKeywords: ["name", "published_datetime", "no_of_views"],
        //       visible: true,
        //     },
        //     {
        //       id: 3,
        //       description: "Query should use FROM VIDEO",
        //       type: "syntax-validation",
        //       expectedKeywords: ["from video"],
        //       visible: true,
        //     },
        //     {
        //       id: 4,
        //       description:
        //         "Query should filter videos with more than 100000 views",
        //       type: "syntax-validation",
        //       expectedKeywords: ["no_of_views > 100000"],
        //       visible: true,
        //     },
        //     {
        //       id: 5,
        //       description:
        //         "Query should filter name containing 'esport' using LIKE",
        //       type: "syntax-validation",
        //       expectedKeywords: ["name like", "esport"],
        //       visible: true,
        //     },
        //     {
        //       id: 6,
        //       description:
        //         "Query should filter published year between 2018 and 2020",
        //       type: "syntax-validation",
        //       expectedKeywords: ["strftime", "2018", "2020"],
        //       visible: true,
        //     },
        //     {
        //       id: 7,
        //       description:
        //         "Query should use ORDER BY with no_of_views DESC and published_datetime DESC",
        //       type: "syntax-validation",
        //       expectedKeywords: [
        //         "order by",
        //         "no_of_views desc",
        //         "published_datetime desc",
        //       ],
        //       visible: true,
        //     },
        //     {
        //       id: 8,
        //       description: "Query should not use GROUP BY",
        //       type: "negative-validation",
        //       forbiddenKeywords: ["group by"],
        //       visible: false,
        //     },
        //     {
        //       id: 9,
        //       description: "Query should not use JOIN",
        //       type: "negative-validation",
        //       forbiddenKeywords: ["join"],
        //       visible: false,
        //     },
        //     {
        //       id: 10,
        //       description: "Query should not use DISTINCT",
        //       type: "negative-validation",
        //       forbiddenKeywords: ["distinct"],
        //       visible: false,
        //     },
        //   ],
        // },
        {
          id: "sql-query-8-8",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Number of channels",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 35,
          type: "sql",

          defaultCode: {
            sql: ``,
          },

          tableData: {
            channel: {
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
             <p>Get the total number of channels in the database as channels_count</p>
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
             <th>channels_count</th>
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
              description: "Query should count channel_id",
              type: "syntax-validation",
              expectedKeywords: ["count(channel_id)"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should use alias as channels_count",
              type: "syntax-validation",
              expectedKeywords: ["as channels_count"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should use FROM channel",
              type: "syntax-validation",
              expectedKeywords: ["from channel"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-9",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "highest and least views ",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 35,
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
             <p>Get the highest and least number of views for the videos in the database.</p>
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
             <th>highest_number_of_views</th>
             <th>least_number_of_views</th>
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
              description: "Query should use MIN function",
              type: "syntax-validation",
              expectedKeywords: ["min"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should calculate MAX on no_of_views",
              type: "syntax-validation",
              expectedKeywords: ["max(no_of_views)"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should calculate MIN on no_of_views",
              type: "syntax-validation",
              expectedKeywords: ["min(no_of_views)"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should use alias as highest_number_of_views",
              type: "syntax-validation",
              expectedKeywords: ["as highest_number_of_views"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should use alias as least_number_of_views",
              type: "syntax-validation",
              expectedKeywords: ["as least_number_of_views"],
              visible: true,
            },
            {
              id: 8,
              description: "Query should use FROM VIDEO",
              type: "syntax-validation",
              expectedKeywords: ["from video"],
              visible: true,
            },
          ],
        },
        {
          id: "sql-query-8-10",
          accessibleTo: ["zorvixe_pro", "zorvixe_elite"],
          title: "Average number of views",
          description:
            "Consider an online video-sharing platform like YouTube which hosts tens of thousands of channels and crores of users.You have to analyse the data and provide meaningful insights on the type of content that drives engagement, users growth, and many more to all the stakeholders. Let’s roll our sleeves up for an insightful analysis!",

          difficulty: "Medium",
          score: 35,
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
             <p>Get the average number of views for the videos released by the "Single Shot" Channel (id = 373)</p>
             <p class="desc-que-blue">Expected Output Format</p>
             <div class="sql-table-desc">
             <table>
            <thead>
            <tr>
             <th>avg_views</th></tr>
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
              description: "Query should use AVG function",
              type: "syntax-validation",
              expectedKeywords: ["avg"],
              visible: true,
            },
            {
              id: 3,
              description: "Query should calculate AVG on no_of_views",
              type: "syntax-validation",
              expectedKeywords: ["avg(no_of_views)"],
              visible: true,
            },
            {
              id: 4,
              description: "Query should use alias as avg_views",
              type: "syntax-validation",
              expectedKeywords: ["as avg_views"],
              visible: true,
            },
            {
              id: 5,
              description: "Query should use FROM VIDEO",
              type: "syntax-validation",
              expectedKeywords: ["from video"],
              visible: true,
            },
            {
              id: 6,
              description: "Query should filter using WHERE clause",
              type: "syntax-validation",
              expectedKeywords: ["where"],
              visible: true,
            },
            {
              id: 7,
              description: "Query should filter channel_id = 373",
              type: "syntax-validation",
              expectedKeywords: ["channel_id = 373"],
              visible: true,
            },
          ],
        },
      ],
    },
    // SQL Assignment 2
    {
      id: "sql-Assignment-2",
      title: "SQL Coding Practice 9",
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
            // <img
            //   src="/assets/img/joins_db_diagram_coding_pratice_2.png"
            //   alt="DOM Tree"
            //   style={{ width: "100%", height: "300px" }}
            // />
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

              <p>1. Fetch all the posts along with user details.</p>

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
            // <img
            //   src="/assets/img/joins_db_diagram_coding_pratice_2.png"
            //   alt="DOM Tree"
            //   style={{ width: "100%", height: "300px" }}
            // />
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
          <p>In this practice set, let’s apply Joins and Aggregation on a sample social networking application database.</p>
          <p>The database contains user and post tables.</p>

          <ul>
            <li>1:n relation between user and post</li>
            <li>A user can have zero or many posts.</li>
          </ul>

          <div class="Note-container">
            <div class="icon-note">
              <h6>
                <i class="bi bi-journal-text"></i>Note
              </h6>
            </div>
            <ul>
              <li>Consider that the name of the user is “James Williams”.</li>
              <li>Count all the posts posted by him till date.</li>
              <li>Return the result as <b>posts_count</b>.</li>
            </ul>
          </div>

          <p class="desc-que-blue">Question</p>
          <p>Fetch the total number of posts posted by “James Williams” till date as posts_count.</p>

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
      ],
    },
  ],
};
