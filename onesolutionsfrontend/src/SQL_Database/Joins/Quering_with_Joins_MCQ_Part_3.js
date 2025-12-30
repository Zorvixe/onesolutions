import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 8 CODE / JOIN QUESTIONS ====================

  {
    question: (
      <>
        Which query performs a RIGHT JOIN between course and instructor tables?
        <CodeBlock
          language="sql"
          code={`SELECT c.name AS course_name, i.full_name AS instructor_name
FROM course c
RIGHT JOIN instructor i
ON c.instructor_id = i.id;`}
        />
      </>
    ),
    options: [
      "LEFT JOIN instructor",
      "INNER JOIN instructor",
      "SELECT c.name AS course_name, i.full_name AS instructor_name FROM course c RIGHT JOIN instructor i ON c.instructor_id = i.id",
      "CROSS JOIN instructor",
    ],
    answer:
      "SELECT c.name AS course_name, i.full_name AS instructor_name FROM course c RIGHT JOIN instructor i ON c.instructor_id = i.id",
  },

  {
    question: (
      <>
        Which JOIN returns all rows from both tables?
        <CodeBlock language="sql" code={`FULL JOIN`} />
      </>
    ),
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
    answer: "FULL JOIN",
  },

  {
    question: (
      <>
        Which query performs a FULL JOIN between course and instructor tables?
        <CodeBlock
          language="sql"
          code={`SELECT c.name, i.full_name
FROM course c
FULL JOIN instructor i
ON c.instructor_id = i.id;`}
        />
      </>
    ),
    options: [
      "LEFT JOIN",
      "RIGHT JOIN",
      "SELECT c.name, i.full_name FROM course c FULL JOIN instructor i ON c.instructor_id = i.id",
      "NATURAL JOIN",
    ],
    answer:
      "SELECT c.name, i.full_name FROM course c FULL JOIN instructor i ON c.instructor_id = i.id",
  },

  {
    question: (
      <>
        Which JOIN produces all possible combinations of rows?
        <CodeBlock language="sql" code={`CROSS JOIN`} />
      </>
    ),
    options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"],
    answer: "CROSS JOIN",
  },

  {
    question: (
      <>
        Which query performs a CROSS JOIN on course and instructor tables?
        <CodeBlock
          language="sql"
          code={`SELECT c.name AS course_name, i.full_name AS instructor_name
FROM course c
CROSS JOIN instructor i;`}
        />
      </>
    ),
    options: [
      "INNER JOIN",
      "LEFT JOIN",
      "SELECT c.name AS course_name, i.full_name AS instructor_name FROM course c CROSS JOIN instructor i",
      "RIGHT JOIN",
    ],
    answer:
      "SELECT c.name AS course_name, i.full_name AS instructor_name FROM course c CROSS JOIN instructor i",
  },

  {
    question: (
      <>
        Which JOIN is used to join a table with itself?
        <CodeBlock language="sql" code={`SELF JOIN`} />
      </>
    ),
    options: ["INNER JOIN", "CROSS JOIN", "SELF JOIN", "FULL JOIN"],
    answer: "SELF JOIN",
  },

  {
    question: (
      <>
        Which query finds student pairs registered for the same course?
        <CodeBlock
          language="sql"
          code={`SELECT sc1.student_id AS student_id1, sc2.student_id AS student_id2, sc1.course_id
FROM student_course sc1
JOIN student_course sc2
ON sc1.course_id = sc2.course_id
AND sc1.student_id < sc2.student_id;`}
        />
      </>
    ),
    options: [
      "CROSS JOIN",
      "LEFT JOIN",
      "SELECT sc1.student_id AS student_id1, sc2.student_id AS student_id2, sc1.course_id FROM student_course sc1 JOIN student_course sc2 ON sc1.course_id = sc2.course_id AND sc1.student_id < sc2.student_id",
      "RIGHT JOIN",
    ],
    answer:
      "SELECT sc1.student_id AS student_id1, sc2.student_id AS student_id2, sc1.course_id FROM student_course sc1 JOIN student_course sc2 ON sc1.course_id = sc2.course_id AND sc1.student_id < sc2.student_id",
  },

  {
    question: (
      <>
        Which JOIN is NOT supported in SQLite?
        <CodeBlock language="sql" code={`RIGHT JOIN / FULL JOIN`} />
      </>
    ),
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
    answer: "RIGHT JOIN",
  },

  // ==================== 4 THEORY QUESTIONS ====================

  {
    question: "RIGHT JOIN returns?",
    options: [
      "All rows from left table",
      "Matched rows only",
      "All rows from right table",
      "Common rows only",
    ],
    answer: "All rows from right table",
  },

  {
    question: "FULL JOIN returns?",
    options: [
      "Only matching rows",
      "All rows from both tables",
      "Only left table rows",
      "Only right table rows",
    ],
    answer: "All rows from both tables",
  },

  {
    question: "CROSS JOIN is also called?",
    options: ["Natural Join", "Outer Join", "Cartesian Join", "Self Join"],
    answer: "Cartesian Join",
  },

  {
    question: "SELF JOIN is mainly used to?",
    options: [
      "Join unrelated tables",
      "Join multiple databases",
      "Compare rows within the same table",
      "Delete duplicate rows",
    ],
    answer: "Compare rows within the same table",
  },
];

const Quering_with_Joins_MCQ_Part_3 = ({
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
      title="Querying with Joins | Part 3 | MCQs"
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

export default Quering_with_Joins_MCQ_Part_3;
