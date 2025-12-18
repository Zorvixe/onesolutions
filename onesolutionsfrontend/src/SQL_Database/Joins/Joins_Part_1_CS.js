import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Joins_Part_1_CS = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>JOINS</h1>

      <section>
        <p>
          So far, we have learnt to analyse the data that is present in a single
          table. But in the real-world scenarios, often, the data is distributed
          in multiple tables. To fetch meaningful insights, we have to bring the
          data together by combining the tables.
        </p>

        <p>
          We use <b>JOIN</b> clause to combine rows from two or more tables,
          based on a related column between them. There are various types of
          joins, namely Natural join, Inner Join, Full Join, Cross Join, Left
          join, Right join.
        </p>
      </section>

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

      <section>
        <h2>Natural JOIN</h2>
        <p>
          <code>NATURAL JOIN</code> combines the tables based on the common
          columns.
        </p>

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM table1
NATURAL JOIN table2;`}
        />

        <h3>Example</h3>
        <p>Fetch the details of courses that are being taught by "Alex".</p>
        <p>
          Solving this problem involves querying on data stored in two tables,
          i.e., <code>course</code> & <code>instructor</code>. Both the tables
          have common column <b>instructor_id</b>. Hence, we use{" "}
          <code>Natural JOIN</code>.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  course.name,
  instructor.full_name
FROM course
NATURAL JOIN instructor
WHERE instructor.full_name = "Alex";`}
        />

        <b>Output</b>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>full_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cyber Security</td>
              <td>Alex</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>NATURAL JOIN on multiple common Columns</h2>
        <p>
          If the two tables contain multiple common columns, then{" "}
          <code>NATURAL JOIN</code>
          combines the tables based on the multiple common columns.
        </p>

        <h3>Example</h3>
        <p>
          1. Fetch the details of reviews for courses where student got greater
          than 70 score.
        </p>
        <p>
          Solving this problem involves querying on data stored in two tables
          i.e., <code>review</code> & <code>student_course</code>. Both the
          tables have multiple common columns <code>id</code>,{" "}
          <code>student_id</code> and
          <code>course_id</code>.
        </p>

        <p>
          So the <code>NATURAL JOIN</code> will match rows where the{" "}
          <code>id</code>, <code>student_id</code> and
          <code>course_id</code> are same in both tables.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  review.course_id,
  review.content,
  review.created_at,
  student_course.score
FROM review
NATURAL JOIN student_course
WHERE student_course.score > 70;`}
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
              <th>course_id</th>
              <th>content</th>
              <th>created_at</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>11</td>
              <td>Great course</td>
              <td>2021-01-19</td>
              <td>80</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>

        <p>
          <b>Question 1:</b>
        </p>
        <p>
          Get the details of the instructor who is teaching "Cyber Security".
        </p>

        <p>
          <b>Expected Output:</b>
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <thead>
            <tr>
              <th>full_name</th>
              <th>gender</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alex</td>
              <td>M</td>
            </tr>
          </tbody>
        </table>

        <br />

        <p>
          <b>Question 2:</b>
        </p>
        <p>
          Get the "Machine Learning" course instructor's full name and the
          course duration of it.
        </p>

        <p>
          <b>Expected Output:</b>
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "50%" }}
        >
          <thead>
            <tr>
              <th>full_name</th>
              <th>course_duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Arun</td>
              <td>90</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>INNER JOIN</h2>
        <p>
          <code>INNER JOIN</code> combines rows from both the tables if they
          meet a specified condition.
        </p>

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM table1
INNER JOIN table2
ON table1.c1 = table2.c2;`}
        />

        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>We can use any comparison operator in the condition.</p>
        </div>

        <h3>Example</h3>
        <p>
          Get the reviews of course “Cyber Security”{" "}
          <code>(course with id = 15)</code>
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  student.full_name,
  review.content,
  review.created_at
FROM student
INNER JOIN review
ON student.id = review.student_id
WHERE review.course_id = 15;`}
        />

        <b>Output</b>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "70%" }}
        >
          <thead>
            <tr>
              <th>full_name</th>
              <th>content</th>
              <th>created_at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ajay</td>
              <td>Good explanation</td>
              <td>2021-01-19</td>
            </tr>
            <tr>
              <td>Ajay</td>
              <td>Cyber Security is awesome</td>
              <td>2021-01-20</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>

        <p>
          <b>Question 1:</b>
        </p>
        <p>
          Get the details of students who enrolled for "Machine Learning"
          <code>(course with id = 11)</code>.
        </p>

        <p>
          <b>Expected Output:</b>
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "50%" }}
        >
          <thead>
            <tr>
              <th>full_name</th>
              <th>age</th>
              <th>gender</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Varun</td>
              <td>16</td>
              <td>M</td>
            </tr>
            <tr>
              <td>Sandhya</td>
              <td>19</td>
              <td>F</td>
            </tr>
          </tbody>
        </table>

        <br />

        <p>
          <b>Question 2:</b>
        </p>
        <p>Get the details of reviews given by the student named "Varun".</p>

        <p>
          <b>Expected Output:</b>
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>course_id</th>
              <th>content</th>
              <th>created_at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>11</td>
              <td>Great course</td>
              <td>2021-01-19</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>LEFT JOIN</h2>
        <p>
          In <code>LEFT JOIN</code>, for each row in the left table, matched
          rows from the right table are combined. If there is no match, NULL
          values are assigned to the right half of the rows in the temporary
          table.
        </p>

        <p>
          <b>Syntax</b>
        </p>
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM table1
LEFT JOIN table2
ON table1.c1 = table2.c2;`}
        />

        <h3>Example</h3>
        <p>
          Fetch the full_name of students who have not enrolled for any course
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT student.full_name
FROM student
LEFT JOIN student_course
ON student.id = student_course.student_id
WHERE student_course.id IS NULL;`}
        />

        <b>Output</b>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "30%" }}
        >
          <thead>
            <tr>
              <th>full_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Afrin</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Try it Yourself!</h2>

        <b>Question 1:</b>
        <p>
          Get the full_name of all students and <code>course_id</code> for which
          they have enrolled.
        </p>

        <h3>Expected Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>full_name</th>
              <th>course_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Varun</td>
              <td>11</td>
            </tr>
            <tr>
              <td>Ajay</td>
              <td>15</td>
            </tr>
            <tr>
              <td>Sandhya</td>
              <td>11</td>
            </tr>
            <tr>
              <td>Afrin</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <b>Question 2:</b>
        <p>
          Get all the instructor names along with the <code>course_name</code>{" "}
          they are teaching.
        </p>

        <h3>Expected Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>instructor_name</th>
              <th>course_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alex</td>
              <td>Cyber Security</td>
            </tr>
            <tr>
              <td>Arun</td>
              <td>Machine Learning</td>
            </tr>
            <tr>
              <td>Bentlee</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>

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

export default Joins_Part_1_CS;
