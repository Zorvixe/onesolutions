import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which query fetches products whose category is "Clothing" and price is
        less than or equal to 1000?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE category = 'Clothing'
AND price <= 1000;`}
        />
      </>
    ),
    options: [
      "WHERE category = 'Clothing' OR price <= 1000",
      "WHERE category = 'Clothing' AND price <= 1000",
      "WHERE category <> 'Clothing' AND price <= 1000",
      "WHERE category = 'Clothing' NOT price <= 1000",
    ],
    answer: "WHERE category = 'Clothing' AND price <= 1000",
  },

  {
    question: (
      <>
        Which query ignores products whose name contains "Cake"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE NOT name LIKE '%Cake%';`}
        />
      </>
    ),
    options: [
      "WHERE name LIKE '%Cake%'",
      "WHERE name <> '%Cake%'",
      "WHERE NOT name LIKE '%Cake%'",
      "WHERE name NOT '%Cake%'",
    ],
    answer: "WHERE NOT name LIKE '%Cake%'",
  },

  {
    question: (
      <>
        Which query fetches products with price less than 20000 and brand is
        "Apple"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE price < 20000
AND brand = 'Apple';`}
        />
      </>
    ),
    options: [
      "WHERE price < 20000 OR brand = 'Apple'",
      "WHERE price <= 20000 AND brand = 'Apple'",
      "WHERE price < 20000 AND brand = 'Apple'",
      "WHERE brand = 'Apple' NOT price < 20000",
    ],
    answer: "WHERE price < 20000 AND brand = 'Apple'",
  },

  {
    question: (
      <>
        Which query fetches products with rating greater than 4.0 OR brand is
        "Britannia"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE rating > 4.0
OR brand = 'Britannia';`}
        />
      </>
    ),
    options: [
      "WHERE rating > 4.0 AND brand = 'Britannia'",
      "WHERE rating > 4.0 OR brand = 'Britannia'",
      "WHERE rating >= 4.0 NOT brand = 'Britannia'",
      "WHERE rating = 4.0 OR brand <> 'Britannia'",
    ],
    answer: "WHERE rating > 4.0 OR brand = 'Britannia'",
  },

  {
    question: (
      <>
        Which query ignores products whose category contains "Food"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE NOT category LIKE '%Food%';`}
        />
      </>
    ),
    options: [
      "WHERE category LIKE '%Food%'",
      "WHERE category <> 'Food'",
      "WHERE NOT category LIKE '%Food%'",
      "WHERE category NOT '%Food%'",
    ],
    answer: "WHERE NOT category LIKE '%Food%'",
  },

  {
    question: (
      <>
        Which query fetches products from "Clothing" category whose name does
        not contain "Jeans"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE category = 'Clothing'
AND NOT name LIKE '%Jeans%';`}
        />
      </>
    ),
    options: [
      "WHERE category = 'Clothing' OR NOT name LIKE '%Jeans%'",
      "WHERE category = 'Clothing' AND name LIKE '%Jeans%'",
      "WHERE category = 'Clothing' AND NOT name LIKE '%Jeans%'",
      "WHERE NOT category = 'Clothing' AND name LIKE '%Jeans%'",
    ],
    answer: "WHERE category = 'Clothing' AND NOT name LIKE '%Jeans%'",
  },

  {
    question: (
      <>
        Which query fetches products belonging to brands Puma or Denim,
        excluding names containing "Shirts"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE (brand = 'Puma' OR brand = 'Denim')
AND NOT name LIKE '%Shirts%';`}
        />
      </>
    ),
    options: [
      "WHERE brand = 'Puma' OR brand = 'Denim' AND NOT name LIKE '%Shirts%'",
      "WHERE (brand = 'Puma' OR brand = 'Denim') AND NOT name LIKE '%Shirts%'",
      "WHERE brand = 'Puma' AND brand = 'Denim'",
      "WHERE NOT brand = 'Puma' OR name LIKE '%Shirts%'",
    ],
    answer:
      "WHERE (brand = 'Puma' OR brand = 'Denim') AND NOT name LIKE '%Shirts%'",
  },

  {
    question: (
      <>
        Which query applies operator precedence correctly using parentheses?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE (brand = 'Redmi' AND rating > 4)
OR brand = 'OnePlus';`}
        />
      </>
    ),
    options: [
      "WHERE brand = 'Redmi' AND rating > 4 OR brand = 'OnePlus'",
      "WHERE (brand = 'Redmi' AND rating > 4) OR brand = 'OnePlus'",
      "WHERE brand = 'Redmi' AND (rating > 4 OR brand = 'OnePlus')",
      "WHERE brand = 'Redmi' OR rating > 4 AND brand = 'OnePlus'",
    ],
    answer: "WHERE (brand = 'Redmi' AND rating > 4) OR brand = 'OnePlus'",
  },

  {
    question: (
      <>
        Which query fetches products with price less than 100 OR category is
        "Food"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE price < 100
OR category = 'Food';`}
        />
      </>
    ),
    options: [
      "WHERE price < 100 AND category = 'Food'",
      "WHERE price < 100 OR category = 'Food'",
      "WHERE price <= 100 NOT category = 'Food'",
      "WHERE price = 100 OR category <> 'Food'",
    ],
    answer: "WHERE price < 100 OR category = 'Food'",
  },

  {
    question: (
      <>
        Which query excludes products with name containing "Chocolate" after
        applying conditions?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE (price < 100 OR category = 'Food')
AND NOT name LIKE '%Chocolate%';`}
        />
      </>
    ),
    options: [
      "WHERE price < 100 OR category = 'Food' NOT name LIKE '%Chocolate%'",
      "WHERE (price < 100 OR category = 'Food') AND NOT name LIKE '%Chocolate%'",
      "WHERE price < 100 AND category = 'Food'",
      "WHERE NOT price < 100 OR name LIKE '%Chocolate%'",
    ],
    answer:
      "WHERE (price < 100 OR category = 'Food') AND NOT name LIKE '%Chocolate%'",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Which logical operator is used to combine multiple conditions?",
    options: ["LIKE", "AND", "WHERE", "="],
    answer: "AND",
  },

  {
    question:
      "Which operator returns rows that satisfy at least one condition?",
    options: ["AND", "NOT", "OR", "<>"],
    answer: "OR",
  },

  {
    question: "Which logical operator negates a condition?",
    options: ["AND", "OR", "NOT", "LIKE"],
    answer: "NOT",
  },

  {
    question: "What is the correct precedence order of logical operators?",
    options: [
      "AND → OR → NOT",
      "OR → AND → NOT",
      "NOT → AND → OR",
      "NOT → OR → AND",
    ],
    answer: "NOT → AND → OR",
  },

  {
    question: "Why are parentheses recommended in complex conditions?",
    options: [
      "To increase query speed",
      "To avoid syntax errors",
      "To ensure correct logical grouping",
      "To reduce code length",
    ],
    answer: "To ensure correct logical grouping",
  },
];

const Quering_SQL_MCQ_2 = ({
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
      title="Quering SQL | Part 2 | MCQs"
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

export default Quering_SQL_MCQ_2;
