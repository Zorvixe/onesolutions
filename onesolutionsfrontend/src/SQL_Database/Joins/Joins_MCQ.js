import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / JOIN QUESTIONS ====================

  {
    question: (
      <>
        Which query fetches courses taught by instructor "Alex" using NATURAL
        JOIN?
        <CodeBlock
          language="sql"
          code={`SELECT name, full_name
FROM course
NATURAL JOIN instructor
WHERE full_name = 'Alex';`}
        />
      </>
    ),
    options: [
      "SELECT * FROM course",
      "SELECT name, full_name FROM course NATURAL JOIN instructor WHERE full_name = 'Alex'",
      "JOIN course instructor",
      "SELECT * FROM instructor",
    ],
    answer:
      "SELECT name, full_name FROM course NATURAL JOIN instructor WHERE full_name = 'Alex'",
  },

  {
    question: (
      <>
        Which columns are matched automatically in NATURAL JOIN?
        <CodeBlock language="sql" code={`NATURAL JOIN`} />
      </>
    ),
    options: [
      "Primary key only",
      "Foreign key only",
      "All common column names",
      "First column",
    ],
    answer: "All common column names",
  },

  {
    question: (
      <>
        Which query fetches reviews where score &gt; 70 using NATURAL JOIN?
        <CodeBlock
          language="sql"
          code={`SELECT course_id, content, created_at, score
FROM review
NATURAL JOIN student_course
WHERE score > 70;`}
        />
      </>
    ),
    options: [
      "SELECT * FROM review",
      "SELECT * FROM student_course",
      "SELECT course_id, content, created_at, score FROM review NATURAL JOIN student_course WHERE score > 70",
      "WHERE score = 70",
    ],
    answer:
      "SELECT course_id, content, created_at, score FROM review NATURAL JOIN student_course WHERE score > 70",
  },

  {
    question: (
      <>
        Which JOIN returns only matching rows from both tables?
        <CodeBlock language="sql" code={`INNER JOIN`} />
      </>
    ),
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "CROSS JOIN"],
    answer: "INNER JOIN",
  },

  {
    question: (
      <>
        Which query gets reviews of course with id = 15?
        <CodeBlock
          language="sql"
          code={`SELECT full_name, content, created_at
FROM review r
INNER JOIN student s
ON r.student_id = s.id
WHERE r.course_id = 15;`}
        />
      </>
    ),
    options: [
      "SELECT * FROM review",
      "INNER JOIN without condition",
      "SELECT full_name, content, created_at FROM review r INNER JOIN student s ON r.student_id = s.id WHERE r.course_id = 15",
      "WHERE id = 15",
    ],
    answer:
      "SELECT full_name, content, created_at FROM review r INNER JOIN student s ON r.student_id = s.id WHERE r.course_id = 15",
  },

  {
    question: (
      <>
        Which query fetches students enrolled for course id = 11?
        <CodeBlock
          language="sql"
          code={`SELECT full_name, age, gender
FROM student s
INNER JOIN student_course sc
ON s.id = sc.student_id
WHERE sc.course_id = 11;`}
        />
      </>
    ),
    options: [
      "SELECT * FROM student",
      "JOIN without WHERE",
      "SELECT full_name, age, gender FROM student s INNER JOIN student_course sc ON s.id = sc.student_id WHERE sc.course_id = 11",
      "WHERE student_id = 11",
    ],
    answer:
      "SELECT full_name, age, gender FROM student s INNER JOIN student_course sc ON s.id = sc.student_id WHERE sc.course_id = 11",
  },

  {
    question: (
      <>
        Which JOIN returns all rows from left table even if no match?
        <CodeBlock language="sql" code={`LEFT JOIN`} />
      </>
    ),
    options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "NATURAL JOIN"],
    answer: "LEFT JOIN",
  },

  {
    question: (
      <>
        Which query fetches students who have not enrolled in any course?
        <CodeBlock
          language="sql"
          code={`SELECT s.full_name
FROM student s
LEFT JOIN student_course sc
ON s.id = sc.student_id
WHERE sc.course_id IS NULL;`}
        />
      </>
    ),
    options: [
      "INNER JOIN",
      "SELECT * FROM student",
      "SELECT s.full_name FROM student s LEFT JOIN student_course sc ON s.id = sc.student_id WHERE sc.course_id IS NULL",
      "WHERE course_id = 0",
    ],
    answer:
      "SELECT s.full_name FROM student s LEFT JOIN student_course sc ON s.id = sc.student_id WHERE sc.course_id IS NULL",
  },

  {
    question: (
      <>
        Which query gets all students and their enrolled course_id?
        <CodeBlock
          language="sql"
          code={`SELECT s.full_name, sc.course_id
FROM student s
LEFT JOIN student_course sc
ON s.id = sc.student_id;`}
        />
      </>
    ),
    options: [
      "INNER JOIN",
      "RIGHT JOIN",
      "SELECT s.full_name, sc.course_id FROM student s LEFT JOIN student_course sc ON s.id = sc.student_id",
      "SELECT * FROM student_course",
    ],
    answer:
      "SELECT s.full_name, sc.course_id FROM student s LEFT JOIN student_course sc ON s.id = sc.student_id",
  },

  {
    question: (
      <>
        Which query gets all instructors with courses they teach?
        <CodeBlock
          language="sql"
          code={`SELECT i.full_name, c.name
FROM instructor i
LEFT JOIN course c
ON i.id = c.instructor_id;`}
        />
      </>
    ),
    options: [
      "INNER JOIN",
      "NATURAL JOIN",
      "SELECT i.full_name, c.name FROM instructor i LEFT JOIN course c ON i.id = c.instructor_id",
      "SELECT * FROM instructor",
    ],
    answer:
      "SELECT i.full_name, c.name FROM instructor i LEFT JOIN course c ON i.id = c.instructor_id",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Why are JOINs used in SQL?",
    options: [
      "To delete tables",
      "To combine data from multiple tables",
      "To update rows",
      "To create indexes",
    ],
    answer: "To combine data from multiple tables",
  },

  {
    question:
      "Which JOIN matches rows based on common column names automatically?",
    options: ["INNER JOIN", "LEFT JOIN", "NATURAL JOIN", "CROSS JOIN"],
    answer: "NATURAL JOIN",
  },

  {
    question: "Which JOIN returns NULL for unmatched rows on right table?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
    answer: "LEFT JOIN",
  },

  {
    question: "Which JOIN requires an explicit condition using ON?",
    options: ["NATURAL JOIN", "INNER JOIN", "CROSS JOIN", "UNION"],
    answer: "INNER JOIN",
  },

  {
    question:
      "Which relationship allows students to enroll in multiple courses?",
    options: ["One-to-One", "One-to-Many", "Many-to-Many", "Unary"],
    answer: "Many-to-Many",
  },
];

const Joins_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="SQL JOINS | MCQs"
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

export default Joins_MCQ;
