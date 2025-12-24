import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which query retrieves products whose category is "Food"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE category = 'Food';`}
        />
      </>
    ),
    options: [
      "WHERE category == 'Food'",
      "WHERE category = 'Food'",
      "WHERE category LIKE Food",
      "WHERE category <> 'Food'",
    ],
    answer: "WHERE category = 'Food'",
  },

  {
    question: (
      <>
        Which query retrieves products not belonging to "Food" category?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE category <> 'Food';`}
        />
      </>
    ),
    options: [
      "WHERE category != 'Food'",
      "WHERE category <> 'Food'",
      "WHERE category = 'Food'",
      "WHERE NOT category = 'Food'",
    ],
    answer: "WHERE category <> 'Food'",
  },

  {
    question: (
      <>
        Which query fetches products with rating greater than 4.5?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE rating > 4.5;`}
        />
      </>
    ),
    options: [
      "WHERE rating >= 4.5",
      "WHERE rating > 4.5",
      "WHERE rating < 4.5",
      "WHERE rating = 4.5",
    ],
    answer: "WHERE rating > 4.5",
  },

  {
    question: (
      <>
        Which query fetches products with price less than or equal to 1000?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE price <= 1000;`}
        />
      </>
    ),
    options: [
      "WHERE price < 1000",
      "WHERE price <= 1000",
      "WHERE price >= 1000",
      "WHERE price <> 1000",
    ],
    answer: "WHERE price <= 1000",
  },

  {
    question: (
      <>
        Which query fetches products of brand "Puma"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE brand = 'Puma';`}
        />
      </>
    ),
    options: [
      "WHERE brand LIKE Puma",
      "WHERE brand = 'Puma'",
      "WHERE brand <> 'Puma'",
      "WHERE brand >= 'Puma'",
    ],
    answer: "WHERE brand = 'Puma'",
  },

  {
    question: (
      <>
        Which query fetches products whose name starts with "Bourbon"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE name LIKE 'Bourbon%';`}
        />
      </>
    ),
    options: [
      "LIKE '%Bourbon'",
      "LIKE 'Bourbon_'",
      "LIKE 'Bourbon%'",
      "LIKE '%Bourbon%'",
    ],
    answer: "LIKE 'Bourbon%'",
  },

  {
    question: (
      <>
        Which query fetches products whose name contains "Smart"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE name LIKE '%Smart%';`}
        />
      </>
    ),
    options: [
      "LIKE 'Smart'",
      "LIKE 'Smart%'",
      "LIKE '%Smart'",
      "LIKE '%Smart%'",
    ],
    answer: "LIKE '%Smart%'",
  },

  {
    question: (
      <>
        Which query fetches products whose brand has exactly 5 characters?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE brand LIKE '_____';`}
        />
      </>
    ),
    options: ["LIKE '_____'", "LIKE '%_____'", "LIKE '_____%'", "LIKE '%_%_%'"],
    answer: "LIKE '_____'",
  },

  {
    question: (
      <>
        Which query fetches products whose name ends with "T-Shirt"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE name LIKE '%T-Shirt';`}
        />
      </>
    ),
    options: [
      "LIKE 'T-Shirt%'",
      "LIKE '%T-Shirt'",
      "LIKE '%T_Shirt'",
      "LIKE 'T-Shirt'",
    ],
    answer: "LIKE '%T-Shirt'",
  },

  {
    question: (
      <>
        Which query fetches products whose category has exactly 4 characters?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE category LIKE '____';`}
        />
      </>
    ),
    options: ["LIKE '____'", "LIKE '%____'", "LIKE '____%'", "LIKE '%_%_%'"],
    answer: "LIKE '____'",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Which operator is used for 'not equal to' comparison?",
    options: ["!=", "<>", "<=", ">="],
    answer: "<>",
  },

  {
    question: "Which operator represents zero or more characters in LIKE?",
    options: ["_", "%", "*", "#"],
    answer: "%",
  },

  {
    question: "Which wildcard represents exactly one character?",
    options: ["%", "_", "*", "&"],
    answer: "_",
  },

  {
    question: "Which clause is mandatory when using comparison operators?",
    options: ["FROM", "WHERE", "SELECT", "LIKE"],
    answer: "WHERE",
  },

  {
    question: "LIKE operator is mainly used to perform operations on:",
    options: ["Numbers", "Dates", "Strings", "Booleans"],
    answer: "Strings",
  },
];

const Quering_SQL_MCQ_1 = ({
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
      title= "Quering SQL | Part 1 | MCQs"
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

export default Quering_SQL_MCQ_1;
