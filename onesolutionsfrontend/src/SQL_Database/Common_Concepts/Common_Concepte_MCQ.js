
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which query calculates the profit of each movie?
        <CodeBlock
          language="sql"
          code={`SELECT id, name, collection_in_cr - budget_in_cr AS profit
FROM movie;`}
        />
      </>
    ),
    options: [
      "SELECT collection_in_cr + budget_in_cr FROM movie",
      "SELECT collection_in_cr - budget_in_cr AS profit FROM movie",
      "SELECT budget_in_cr - collection_in_cr FROM movie",
      "SELECT SUM(collection_in_cr) FROM movie",
    ],
    answer: "SELECT collection_in_cr - budget_in_cr AS profit FROM movie",
  },

  {
    question: (
      <>
        Which query concatenates movie name and genre?
        <CodeBlock
          language="sql"
          code={`SELECT name || ' - ' || genre AS movie_genre
FROM movie;`}
        />
      </>
    ),
    options: [
      "name + genre",
      "CONCAT(name, genre)",
      "name || ' - ' || genre",
      "JOIN(name, genre)",
    ],
    answer: "name || ' - ' || genre",
  },

  {
    question: (
      <>
        Which query gets movies with profit at least 50 crores?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM movie
WHERE collection_in_cr - budget_in_cr >= 50;`}
        />
      </>
    ),
    options: [
      "WHERE budget_in_cr >= 50",
      "WHERE collection_in_cr >= 50",
      "WHERE collection_in_cr - budget_in_cr >= 50",
      "WHERE profit >= 50",
    ],
    answer: "WHERE collection_in_cr - budget_in_cr >= 50",
  },

  {
    question: (
      <>
        Which query scales ratings from 10 to 5?
        <CodeBlock
          language="sql"
          code={`UPDATE movie
SET rating = rating / 2;`}
        />
      </>
    ),
    options: [
      "rating * 2",
      "rating + 5",
      "rating / 2",
      "rating - 5",
    ],
    answer: "rating / 2",
  },

  {
    question: (
      <>
        Which query extracts the release year from release_date?
        <CodeBlock
          language="sql"
          code={`SELECT name, strftime('%Y', release_date) AS year
FROM movie;`}
        />
      </>
    ),
    options: [
      "YEAR(release_date)",
      "strftime('%Y', release_date)",
      "DATE(release_date)",
      "CAST(release_date AS YEAR)",
    ],
    answer: "strftime('%Y', release_date)",
  },

  {
    question: (
      <>
        Which query gets movies released between April and June?
        <CodeBlock
          language="sql"
          code={`SELECT name
FROM movie
WHERE strftime('%m', release_date) IN ('04','05','06');`}
        />
      </>
    ),
    options: [
      "BETWEEN 4 AND 6",
      "IN ('04','05','06')",
      "MONTH(release_date)",
      "YEAR(release_date)",
    ],
    answer: "IN ('04','05','06')",
  },

  {
    question: (
      <>
        Which query converts collection_in_cr into INT?
        <CodeBlock
          language="sql"
          code={`SELECT CAST(collection_in_cr AS INT) AS collection
FROM movie;`}
        />
      </>
    ),
    options: [
      "INT(collection_in_cr)",
      "CAST(collection_in_cr AS INT)",
      "CONVERT(collection_in_cr)",
      "TO_INT(collection_in_cr)",
    ],
    answer: "CAST(collection_in_cr AS INT)",
  },

  {
    question: (
      <>
        Which query rounds collection to 1 decimal?
        <CodeBlock
          language="sql"
          code={`SELECT ROUND(collection_in_cr, 1)
FROM movie;`}
        />
      </>
    ),
    options: [
      "CEIL(collection_in_cr)",
      "FLOOR(collection_in_cr)",
      "ROUND(collection_in_cr, 1)",
      "ROUND(collection_in_cr)",
    ],
    answer: "ROUND(collection_in_cr, 1)",
  },

  {
    question: (
      <>
        Which query converts actor names to uppercase?
        <CodeBlock
          language="sql"
          code={`SELECT UPPER(name) AS capitalized_name
FROM actor;`}
        />
      </>
    ),
    options: [
      "LOWER(name)",
      "CAPITAL(name)",
      "UPPER(name)",
      "TOUPPER(name)",
    ],
    answer: "UPPER(name)",
  },

  {
    question: (
      <>
        Which query categorizes movies based on rating?
        <CodeBlock
          language="sql"
          code={`SELECT name,
CASE
  WHEN rating < 5 THEN 'Poor'
  WHEN rating BETWEEN 5 AND 7 THEN 'Average'
  ELSE 'Good'
END AS category
FROM movie;`}
        />
      </>
    ),
    options: [
      "IF ELSE",
      "SWITCH",
      "CASE",
      "GROUP BY",
    ],
    answer: "CASE",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Which operator is used for string concatenation in SQLite?",
    options: ["+", "||", "&", "CONCAT"],
    answer: "||",
  },

  {
    question: "Which function extracts month from a date?",
    options: ["MONTH()", "strftime('%m')", "DATE()", "EXTRACT()"],
    answer: "strftime('%m')",
  },

  {
    question: "Which function converts a value from one datatype to another?",
    options: ["ALTER", "CHANGE", "CAST", "MODIFY"],
    answer: "CAST",
  },

  {
    question: "Which function rounds a number to the nearest integer above?",
    options: ["FLOOR", "ROUND", "CEIL", "AVG"],
    answer: "CEIL",
  },

  {
    question: "Which set operator removes duplicate rows?",
    options: ["UNION ALL", "INTERSECT", "UNION", "MINUS"],
    answer: "UNION",
  },
];

const Common_Concepte_MCQ = ({
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
      title="Common Concepts | MCQs"
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

export default Common_Concepte_MCQ;
