import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Quering_with_Joins_CS_Part_3 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>JOINS Cont'd</h1>

      {/* Database */}
      <section>
        <h2>Database</h2>
        <p>
          Here, the database stores the data of students, courses, course
          reviews, instructors, etc., of an e-learning platform.
        </p>
        <img
          src="/assets/img/joins_db_diagram.png"
          alt="DOM Tree"
          style={{ width: "100%", height: "300px" }}
        />

        <ul>
          <li>
            An <code>instructor</code> can teach many <code>courses</code>. A{" "}
            <code>course</code> is taught by only one
            <code>instructor</code>.
          </li>
          <li>
            A <code>student</code> can enroll for multiple <code>courses</code>.
            A <code>course</code> can have multiple students.
          </li>
          <li>
            A <code>student</code> can give multiple <code>reviews</code>.
          </li>
          <li>
            A <code>course</code> can have multiple <code>reviews</code>.
          </li>
        </ul>

        <p>
          Refer the tables in the code playground for a better understanding of
          the database.
        </p>
      </section>

      {/* RIGHT JOIN */}
      <section>
        <h2>RIGHT JOIN</h2>
        <p>RIGHT JOIN or RIGHT OUTER JOIN is vice versa of LEFT JOIN.</p>
        <p>
          In <code>RIGHT JOIN</code>, for each row in the right table, matched
          rows from the left table are combined. If there is no match, NULL
          values are assigned to the left half of the rows in the temporary
          table.
        </p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM table1
RIGHT JOIN table2
ON table1.c1 = table2.c2;`}
        />

        <p>
          <b>Which is similar to</b>
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM table2
LEFT JOIN table1
ON table1.c1 = table2.c2;`}
        />

        <h3>Example</h3>
        <p>
          Following query performs RIGHT JOIN on course and instructor tables
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
  course.name,
  instructor.full_name
FROM course
RIGHT JOIN instructor
ON course.instructor_id = instructor.instructor_id;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>Right Join is not supported in some dbms(SQLite).</p>
        </div>
      </section>

      {/* FULL JOIN */}
      <section>
        <h2>FULL JOIN</h2>
        <p>FULL JOIN or FULL OUTER JOIN returns all rows from both tables.</p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM table1
FULL JOIN table2
ON table1.c1 = table2.c2;`}
        />

        <h3>Example</h3>
        <p>
          Following query performs FULL JOIN ON course and instructor tables
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
  course.name,
  instructor.full_name
FROM course
FULL JOIN instructor
ON course.instructor_id = instructor.instructor_id;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>FULL JOIN is not supported in some dbms(SQLite).</p>
        </div>
      </section>

      {/* CROSS JOIN */}
      <section>
        <h2>CROSS JOIN</h2>
        <p>
          In CROSS JOIN, each row from the first table is combined with all rows
          in the second table.
        </p>
        <p>
          CROSS JOIN is also called <b>CARTESIAN JOIN</b>.
        </p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM table1
CROSS JOIN table2;`}
        />

        <h3>Example</h3>
        <p>
          Following query performs CROSS JOIN on course and instructor tables
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT
  course.name AS course_name,
  instructor.full_name AS instructor_name
FROM course
CROSS JOIN instructor;`}
        />

        <p>
          <b>Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "70%" }}
        >
          <thead>
            <tr>
              <th>course_name</th>
              <th>instructor_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Machine Learning</td>
              <td>Alex</td>
            </tr>
            <tr>
              <td>Machine Learning</td>
              <td>Arun</td>
            </tr>
            <tr>
              <td>Machine Learning</td>
              <td>Bentlee</td>
            </tr>
            <tr>
              <td>Cyber Security</td>
              <td>Alex</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* SELF JOIN */}
      <section>
        <h2>SELF JOIN</h2>
        <p>SELF JOIN is used to join a table with itself.</p>

        <h3>Syntax</h3>
        <CodeBlock
          language="sql"
          code={`SELECT
  t1.c1,
  t2.c2
FROM table1 AS t1
JOIN table1 AS t2
ON t1.c1 = t2.cn;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>We can use any JOIN clause in self-join.</p>
        </div>

        <h3>Example</h3>
        <p>Get student pairs who registered for common course.</p>

        <CodeBlock
          language="sql"
          code={`SELECT
  sc1.student_id AS student_id1,
  sc2.student_id AS student_id2,
  sc1.course_id
FROM student_course AS sc1
INNER JOIN student_course sc2
ON sc1.course_id = sc2.course_id
WHERE sc1.student_id < sc2.student_id;`}
        />

        <p>
          <b>Output</b>
        </p>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>student_id1</th>
              <th>student_id2</th>
              <th>course_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>3</td>
              <td>11</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Summary */}
      <section>
        <h2>JOINS Summary</h2>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "80%" }}
        >
          <thead>
            <tr>
              <th>Join Type</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Natural Join</td>
              <td>Joins based on common columns</td>
            </tr>
            <tr>
              <td>Inner Join</td>
              <td>Joins based on a given condition</td>
            </tr>
            <tr>
              <td>Left Join</td>
              <td>All rows from left table & matched rows from right table</td>
            </tr>
            <tr>
              <td>Right Join</td>
              <td>All rows from right table & matched rows from left table</td>
            </tr>
            <tr>
              <td>Full Join</td>
              <td>All rows from both the tables</td>
            </tr>
            <tr>
              <td>Cross Join</td>
              <td>All possible combinations</td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="view-continue">
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

export default Quering_with_Joins_CS_Part_3;
