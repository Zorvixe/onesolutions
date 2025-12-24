import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 7 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which query creates a table named movie?
        <CodeBlock
          language="sql"
          code={`CREATE TABLE movie (
  id INT,
  name TEXT
);`}
        />
      </>
    ),
    options: [
      "CREATE movie TABLE",
      "CREATE TABLE movie",
      "CREATE TABLE movie (id INT, name TEXT)",
      "MAKE TABLE movie",
    ],
    answer: "CREATE TABLE movie (id INT, name TEXT)",
  },

  {
    question: (
      <>
        Which query inserts data into the movie table?
        <CodeBlock
          language="sql"
          code={`INSERT INTO movie (id, name)
VALUES (1, 'Inception');`}
        />
      </>
    ),
    options: [
      "INSERT movie VALUES (1, 'Inception')",
      "INSERT INTO movie VALUES (1, 'Inception')",
      "INSERT INTO movie (id, name) VALUES (1, 'Inception')",
      "ADD INTO movie VALUES (1, 'Inception')",
    ],
    answer:
      "INSERT INTO movie (id, name) VALUES (1, 'Inception')",
  },

  {
    question: (
      <>
        Which query retrieves only movies with rating greater than 8?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM movie
WHERE rating > 8;`}
        />
      </>
    ),
    options: [
      "SELECT rating > 8 FROM movie",
      "SELECT * FROM movie",
      "SELECT * FROM movie WHERE rating > 8",
      "WHERE rating > 8",
    ],
    answer: "SELECT * FROM movie WHERE rating > 8",
  },

  {
    question: (
      <>
        Which query updates the rating of all movies?
        <CodeBlock
          language="sql"
          code={`UPDATE movie
SET rating = 9;`}
        />
      </>
    ),
    options: [
      "UPDATE rating SET movie = 9",
      "UPDATE movie SET rating = 9",
      "SET rating = 9",
      "ALTER movie rating = 9",
    ],
    answer: "UPDATE movie SET rating = 9",
  },

  {
    question: (
      <>
        Which query deletes all rows from the movie table?
        <CodeBlock
          language="sql"
          code={`DELETE FROM movie;`}
        />
      </>
    ),
    options: [
      "DROP movie",
      "REMOVE FROM movie",
      "DELETE movie",
      "DELETE FROM movie",
    ],
    answer: "DELETE FROM movie",
  },

  {
    question: (
      <>
        Which query gets unique genres from movie table?
        <CodeBlock
          language="sql"
          code={`SELECT DISTINCT genre
FROM movie;`}
        />
      </>
    ),
    options: [
      "SELECT UNIQUE genre",
      "SELECT DISTINCT genre FROM movie",
      "SELECT genre FROM movie",
      "SELECT genre UNIQUE",
    ],
    answer: "SELECT DISTINCT genre FROM movie",
  },

  {
    question: (
      <>
        Which query groups movies by genre?
        <CodeBlock
          language="sql"
          code={`SELECT genre, COUNT(*)
FROM movie
GROUP BY genre;`}
        />
      </>
    ),
    options: [
      "GROUP genre",
      "GROUP BY genre",
      "ORDER BY genre",
      "HAVING genre",
    ],
    answer: "GROUP BY genre",
  },

  // ==================== 8 NORMAL QUESTIONS ====================

  {
    question: "Which clause is used to retrieve data from a table?",
    options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
    answer: "SELECT",
  },

  {
    question: "Which clause is used to filter rows based on conditions?",
    options: ["FROM", "WHERE", "GROUP BY", "ORDER BY"],
    answer: "WHERE",
  },

  {
    question: "Which operator checks for values within a range?",
    options: ["IN", "LIKE", "BETWEEN", "<>"],
    answer: "BETWEEN",
  },

  {
    question: "Which operator is used for pattern matching?",
    options: ["IN", "LIKE", "BETWEEN", "AND"],
    answer: "LIKE",
  },

  {
    question: "Which function counts the number of rows?",
    options: ["SUM()", "AVG()", "COUNT()", "MAX()"],
    answer: "COUNT()",
  },

  {
    question: "Which function converts a value to another datatype?",
    options: ["CAST()", "ROUND()", "CEIL()", "FLOOR()"],
    answer: "CAST()",
  },

  {
    question: "Which clause sorts the result set?",
    options: ["GROUP BY", "ORDER BY", "HAVING", "DISTINCT"],
    answer: "ORDER BY",
  },

  {
    question: "Which function converts text to uppercase?",
    options: ["LOWER()", "UPPER()", "CAST()", "ROUND()"],
    answer: "UPPER()",
  },
];

const MileStone_MCQ = ({
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
      title="SQL Milestone | MCQs"
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

export default MileStone_MCQ;
