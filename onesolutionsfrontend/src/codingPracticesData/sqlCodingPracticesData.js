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
          title: "Create Student Table",
          description: "Write a SQL query to Create a Student table.",
          difficulty: "Easy",
          score: 50,
          type: "sql",
          defaultCode: {
            sql: `-- Write your SQL query here`,
          },
          descriptionDetails: `
            <div class="desc-question-details">
             
              <div class="sql-table-desc">
                <div class="sql-table-caption">Table: Student</div>
                <table>
                  <thead>
                    <tr>
                      <th>Column Name</th>
                      <th>Data Type</th>
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
              
              
              <p class="desc-que-blue">Your Task</p>
              <p>Create a student table to store name, age and score of students.</p>
              
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
                    <li>The query should work for any data in the Students table</li>
                  </ul>
                </p>
              </div>
              
              <p class="desc-que-blue">Expected Output</p>
              <p>Your query should create a student table in the same order as the table structure.</p>
              
              <hr>
              
              <p class="desc-que-blue">SQL Concepts Review</p>
              <p><strong>CREATE statement syntax:</strong></p>
              <pre style="background: #1e293b; padding: 10px; border-radius: 6px; color: #cbd5e1; margin: 10px 0;">
              CREATE TABLE table_name (
                column1 type1,
                column2 type2,
                ...
              );</pre>
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
              description: "Query should end with semicolon",
              type: "syntax-validation",
              expectedKeywords: [";"],
              visible: true,
            },
          ],
        },
      ],
    },
  ],
};
