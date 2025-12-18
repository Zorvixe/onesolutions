import React, { useState } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Quering_with_Joins_CS_Part_2 = ({ onSubtopicComplete }) => {
  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);

  const handleContinue = () => {
    setIsSubtopicCompleted(true);
    if (onSubtopicComplete) onSubtopicComplete();
  };

  return (
    <div className="intro-container">
      <h1>Querying with Joins</h1>

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

      {/* Joins on Multiple Tables */}
      <section>
        <h2>Joins on Multiple Tables</h2>
        <p>We can also perform join on a combined table.</p>

        <h3>Example</h3>
        <p>
          Fetch all the students who enrolled for the courses taught by the
          instructor <b>“Arun” (id = 102)</b>.
        </p>

        <CodeBlock
          language="sql"
          code={`SELECT
  T.name AS course_name,
  student.full_name
FROM
  (course
   INNER JOIN student_course
   ON course.id = student_course.course_id) AS T
INNER JOIN student
ON T.student_id = student.id
WHERE course.instructor_id = 102;`}
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
              <th>course_name</th>
              <th>full_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Machine Learning</td>
              <td>Varun</td>
            </tr>
            <tr>
              <td>Machine Learning</td>
              <td>Sandhya</td>
            </tr>
          </tbody>
        </table>
        <div className="Note-container">
          <div className="icon-note">
            <h6>
              <i className="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <b>Best Practices</b>
          <ul>
            <li>
              Use <b>ALIAS</b> to name the combined table.
            </li>
            <li>
              Use alias table names to refer the columns in the combined table.
            </li>
          </ul>
        </div>
      </section>

      {/* Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>

        <b>Question 1:</b>
        <p>
          Fetch the name of the students who gave reviews to the "Machine
          Learning" course.
        </p>

        <h3>Expected Output</h3>
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
              <td>Varun</td>
            </tr>
          </tbody>
        </table>

        <br />

        <b>Question 2:</b>
        <p>Fetch the course names in which "Varun" has registered.</p>

        <h3>Expected Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "40%" }}
        >
          <thead>
            <tr>
              <th>course_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Machine Learning</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Using joins with other clauses */}
      <section>
        <h2>Using joins with other clauses</h2>
        <p>
          We can apply <code>WHERE</code>, <code>ORDER BY </code>,
          <code>HAVING </code>,<code>GROUP BY </code>,<code>LIMIT </code>,
          <code>OFFSET</code>
          and other clauses (which are used for retrieving data tables) on the
          temporary joined table as well.
        </p>

        <p>
          Get the name of the student who scored highest in "Machine Learning"
          course.
        </p>
        <b>Example: </b>

        <CodeBlock
          language="sql"
          code={`SELECT
  student.full_name
FROM
  (course
   INNER JOIN student_course
   ON course.id = student_course.course_id) AS T
INNER JOIN student
ON T.student_id = student.id
WHERE course.name = "Machine Learning"
ORDER BY student_course.score DESC
LIMIT 1;`}
        />

        <p>
          <b>Output</b>
        </p>

        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "20%" }}
        >
          <thead>
            <tr>
              <th>full_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sandhya</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>

        <b>Question 1:</b>
        <p>
          Get all the courses taken by the student with id = 1 and his
          respective scores.
        </p>

        <h3>Expected Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "35%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Machine Learning</td>
              <td>80</td>
            </tr>
          </tbody>
        </table>

        <br />

        <b>Question 2:</b>
        <p>Get all the students who registered for at least one course.</p>

        <h3>Expected Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "25%" }}
        >
          <thead>
            <tr>
              <th>full_name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Varun</td>
            </tr>
            <tr>
              <td>Ajay</td>
            </tr>
            <tr>
              <td>Sandhya</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Aggregations */}
      <section>
        <h2>Using joins with aggregations</h2>
        <p>
          We can apply aggregate functions such as{" "}
          <b>SUM, AVG, COUNT, MAX, MIN</b> and others to perform calculations on
          the temporary joined table as well.
        </p>
        <p>Get the highest score in each course.</p>

        <CodeBlock
          language="sql"
          code={`SELECT
  course.name AS course_name,
  MAX(score) AS highest_score
FROM course
LEFT JOIN student_course
ON course.id = student_course.course_id
GROUP BY course.id;`}
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
              <th>course_name</th>
              <th>highest_score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Machine Learning</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Cyber Security</td>
              <td>60</td>
            </tr>
            <tr>
              <td>Linux</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Final Try it Yourself */}
      <section>
        <h2>Try it Yourself!</h2>

        <b>Question 1:</b>
        <p>Get the course name and the average score for each course.</p>

        <h3>Expected Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>avg_score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Machine Learning</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Cyber Security</td>
              <td>60</td>
            </tr>
            <tr>
              <td>Linux</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <br />

        <b>Question 2:</b>
        <p>Get the number of students in each course.</p>

        <h3>Expected Output</h3>
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <thead>
            <tr>
              <th>name</th>
              <th>no_of_students</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Machine Learning</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Cyber Security</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Linux</td>
              <td>0</td>
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

export default Quering_with_Joins_CS_Part_2;
