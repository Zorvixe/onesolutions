import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / JOIN QUESTIONS ====================

  {
    question: (
      <>
        Which query fetches students enrolled in courses taught by instructor
        "Arun" (id = 102)?
        <CodeBlock
          language="sql"
          code={`SELECT c.name AS course_name, s.full_name
FROM course c
JOIN student_course sc ON c.id = sc.course_id
JOIN student s ON s.id = sc.student_id
WHERE c.instructor_id = 102;`}
        />
      </>
    ),
    options: [
      "SELECT * FROM course",
      "JOIN without condition",
      "SELECT c.name AS course_name, s.full_name FROM course c JOIN student_course sc ON c.id = sc.course_id JOIN student s ON s.id = sc.student_id WHERE c.instructor_id = 102",
      "WHERE instructor = Arun",
    ],
    answer:
      "SELECT c.name AS course_name, s.full_name FROM course c JOIN student_course sc ON c.id = sc.course_id JOIN student s ON s.id = sc.student_id WHERE c.instructor_id = 102",
  },

  {
    question: (
      <>
        Which query fetches students who reviewed "Machine Learning" course?
        <CodeBlock
          language="sql"
          code={`SELECT s.full_name
FROM review r
JOIN student s ON r.student_id = s.id
JOIN course c ON r.course_id = c.id
WHERE c.name = 'Machine Learning';`}
        />
      </>
    ),
    options: [
      "SELECT * FROM review",
      "JOIN student course",
      "SELECT s.full_name FROM review r JOIN student s ON r.student_id = s.id JOIN course c ON r.course_id = c.id WHERE c.name = 'Machine Learning'",
      "WHERE name = Varun",
    ],
    answer:
      "SELECT s.full_name FROM review r JOIN student s ON r.student_id = s.id JOIN course c ON r.course_id = c.id WHERE c.name = 'Machine Learning'",
  },

  {
    question: (
      <>
        Which query fetches courses registered by student "Varun"?
        <CodeBlock
          language="sql"
          code={`SELECT c.name AS course_name
FROM student s
JOIN student_course sc ON s.id = sc.student_id
JOIN course c ON c.id = sc.course_id
WHERE s.full_name = 'Varun';`}
        />
      </>
    ),
    options: [
      "SELECT * FROM course",
      "JOIN without WHERE",
      "SELECT c.name AS course_name FROM student s JOIN student_course sc ON s.id = sc.student_id JOIN course c ON c.id = sc.course_id WHERE s.full_name = 'Varun'",
      "WHERE course = Varun",
    ],
    answer:
      "SELECT c.name AS course_name FROM student s JOIN student_course sc ON s.id = sc.student_id JOIN course c ON c.id = sc.course_id WHERE s.full_name = 'Varun'",
  },

  {
    question: (
      <>
        Which query gets the student who scored highest in "Machine Learning"?
        <CodeBlock
          language="sql"
          code={`SELECT s.full_name
FROM review r
JOIN student s ON r.student_id = s.id
JOIN course c ON r.course_id = c.id
WHERE c.name = 'Machine Learning'
ORDER BY r.score DESC
LIMIT 1;`}
        />
      </>
    ),
    options: [
      "GROUP BY score",
      "ORDER BY ASC",
      "SELECT s.full_name FROM review r JOIN student s ON r.student_id = s.id JOIN course c ON r.course_id = c.id WHERE c.name = 'Machine Learning' ORDER BY r.score DESC LIMIT 1",
      "WHERE score = MAX",
    ],
    answer:
      "SELECT s.full_name FROM review r JOIN student s ON r.student_id = s.id JOIN course c ON r.course_id = c.id WHERE c.name = 'Machine Learning' ORDER BY r.score DESC LIMIT 1",
  },

  {
    question: (
      <>
        Which query gets courses taken by student with id = 1 and their scores?
        <CodeBlock
          language="sql"
          code={`SELECT c.name, r.score
FROM review r
JOIN course c ON r.course_id = c.id
WHERE r.student_id = 1;`}
        />
      </>
    ),
    options: [
      "SELECT * FROM course",
      "JOIN student only",
      "SELECT c.name, r.score FROM review r JOIN course c ON r.course_id = c.id WHERE r.student_id = 1",
      "WHERE id = 1",
    ],
    answer:
      "SELECT c.name, r.score FROM review r JOIN course c ON r.course_id = c.id WHERE r.student_id = 1",
  },

  {
    question: (
      <>
        Which query gets students who registered for at least one course?
        <CodeBlock
          language="sql"
          code={`SELECT DISTINCT s.full_name
FROM student s
JOIN student_course sc ON s.id = sc.student_id;`}
        />
      </>
    ),
    options: [
      "LEFT JOIN",
      "GROUP BY student",
      "SELECT DISTINCT s.full_name FROM student s JOIN student_course sc ON s.id = sc.student_id",
      "WHERE course IS NULL",
    ],
    answer:
      "SELECT DISTINCT s.full_name FROM student s JOIN student_course sc ON s.id = sc.student_id",
  },

  {
    question: (
      <>
        Which query gets highest score in each course?
        <CodeBlock
          language="sql"
          code={`SELECT c.name AS course_name, MAX(r.score) AS highest_score
FROM course c
LEFT JOIN review r ON c.id = r.course_id
GROUP BY c.name;`}
        />
      </>
    ),
    options: [
      "ORDER BY score",
      "SUM(score)",
      "SELECT c.name AS course_name, MAX(r.score) AS highest_score FROM course c LEFT JOIN review r ON c.id = r.course_id GROUP BY c.name",
      "HAVING score",
    ],
    answer:
      "SELECT c.name AS course_name, MAX(r.score) AS highest_score FROM course c LEFT JOIN review r ON c.id = r.course_id GROUP BY c.name",
  },

  {
    question: (
      <>
        Which query gets average score for each course?
        <CodeBlock
          language="sql"
          code={`SELECT c.name, AVG(r.score) AS avg_score
FROM course c
LEFT JOIN review r ON c.id = r.course_id
GROUP BY c.name;`}
        />
      </>
    ),
    options: [
      "SUM(score)",
      "COUNT(score)",
      "SELECT c.name, AVG(r.score) AS avg_score FROM course c LEFT JOIN review r ON c.id = r.course_id GROUP BY c.name",
      "WHERE avg &gt; 70",
    ],
    answer:
      "SELECT c.name, AVG(r.score) AS avg_score FROM course c LEFT JOIN review r ON c.id = r.course_id GROUP BY c.name",
  },

  {
    question: (
      <>
        Which query gets number of students in each course?
        <CodeBlock
          language="sql"
          code={`SELECT c.name, COUNT(sc.student_id) AS no_of_students
FROM course c
LEFT JOIN student_course sc ON c.id = sc.course_id
GROUP BY c.name;`}
        />
      </>
    ),
    options: [
      "SUM(student_id)",
      "MAX(student_id)",
      "SELECT c.name, COUNT(sc.student_id) AS no_of_students FROM course c LEFT JOIN student_course sc ON c.id = sc.course_id GROUP BY c.name",
      "WHERE student_id",
    ],
    answer:
      "SELECT c.name, COUNT(sc.student_id) AS no_of_students FROM course c LEFT JOIN student_course sc ON c.id = sc.course_id GROUP BY c.name",
  },

  {
    question: (
      <>
        Why are aliases used in JOIN queries?
        <CodeBlock language="sql" code={`course c, student s`} />
      </>
    ),
    options: [
      "To rename columns permanently",
      "To shorten table references",
      "To create tables",
      "To drop tables",
    ],
    answer: "To shorten table references",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Why are joins on multiple tables used?",
    options: [
      "To delete data",
      "To combine related data from multiple tables",
      "To update tables",
      "To create indexes",
    ],
    answer: "To combine related data from multiple tables",
  },

  {
    question: "Which clause is commonly used with JOIN to filter rows?",
    options: ["ORDER BY", "WHERE", "LIMIT", "OFFSET"],
    answer: "WHERE",
  },

  {
    question: "Which function finds the highest value?",
    options: ["AVG()", "SUM()", "MAX()", "COUNT()"],
    answer: "MAX()",
  },

  {
    question: "Which clause groups rows for aggregation?",
    options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
    answer: "GROUP BY",
  },

  {
    question: "Which JOIN keeps courses even if no reviews exist?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
    answer: "LEFT JOIN",
  },
];

const Quering_with_Joins_Part_2_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "SQL & Databases"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MCQLogic
      title="Querying with Joins | Part 2 | MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default Quering_with_Joins_Part_2_MCQ;
