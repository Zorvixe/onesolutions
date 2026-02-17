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
              id: 2,
              description: "Table should contain columns name, age, and score",
              type: "syntax-validation",
              expectedKeywords: ["name", "age", "score"],
              visible: true,
            },
            {
              id: 3,
              description: "Column name should be VARCHAR(200)",
              type: "syntax-validation",
              expectedKeywords: ["varchar(200)"],
              visible: false,
            },
            {
              id: 4,
              description: "Columns age and score should be INTEGER",
              type: "syntax-validation",
              expectedKeywords: ["age integer", "score integer"],
              visible: false,
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
          testCases: [],
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
          testCases: [],
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
          testCases: [],
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
          testCases: [],
        },
        {
          id: "sql-query-9",
          title: "Get Details",
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
              Get all the details of "Suresh" from the 'player' table in the following format.</p> 
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
                </tbody>
              </table>
              
             
              </div> 
            </div>
          `,
          testCases: [],
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
          id: "sql-query-1",
          title: "Add Player",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

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
              A new player has joined the tournament. Write an SQL query to add the the following details to the player table.</p>              
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
          testCases: [],
        },
        {
          id: "sql-query-2",
          title: "Add Playefghr",
          description:
            "The database consists of a player table that stores the name, age and score of players.\n In a real-world scenario, during a tournament, we often have to insert the details of multiple players at once, update already existing details, or retrieve specific player’s details to analyze.\n This practice set helps you get a hang of all such queries. Let’s dive in!",

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
              A new player has joined the tournament. Write an SQL query to add the the following details to the player table.</p>              
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
          testCases: [],
        },
      ],
    },
  ],
};
