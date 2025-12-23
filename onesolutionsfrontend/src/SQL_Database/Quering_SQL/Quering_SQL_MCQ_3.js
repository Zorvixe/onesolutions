import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which query fetches products whose brand is either "Puma", "Mufti",
        "Levi's", "Lee", or "Denim"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE brand IN ('Puma', 'Mufti', 'Levi''s', 'Lee', 'Denim');`}
        />
      </>
    ),
    options: [
      "WHERE brand = 'Puma' OR 'Mufti' OR 'Lee'",
      "WHERE brand IN ('Puma', 'Mufti', 'Levi''s', 'Lee', 'Denim')",
      "WHERE brand BETWEEN 'Puma' AND 'Denim'",
      "WHERE brand LIKE ('Puma','Mufti')",
    ],
    answer: "WHERE brand IN ('Puma', 'Mufti', 'Levi''s', 'Lee', 'Denim')",
  },

  {
    question: (
      <>
        Which query fetches food products from brands "Britannia", "Lay's", and
        "Cadbury"?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE category = 'Food'
AND brand IN ('Britannia', 'Lay''s', 'Cadbury');`}
        />
      </>
    ),
    options: [
      "WHERE brand IN ('Britannia','Lay''s','Cadbury')",
      "WHERE category = 'Food' OR brand IN ('Britannia','Lay''s','Cadbury')",
      "WHERE category = 'Food' AND brand IN ('Britannia','Lay''s','Cadbury')",
      "WHERE category IN ('Food','Britannia')",
    ],
    answer:
      "WHERE category = 'Food' AND brand IN ('Britannia','Lay''s','Cadbury')",
  },

  {
    question: (
      <>
        Which query fetches products with price between 1000 and 5000?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE price BETWEEN 1000 AND 5000;`}
        />
      </>
    ),
    options: [
      "WHERE price > 1000 AND price < 5000",
      "WHERE price BETWEEN 5000 AND 1000",
      "WHERE price BETWEEN 1000 AND 5000",
      "WHERE price IN (1000,5000)",
    ],
    answer: "WHERE price BETWEEN 1000 AND 5000",
  },

  {
    question: (
      <>
        Which query fetches products with rating between 4.3 and 4.8?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE rating BETWEEN 4.3 AND 4.8;`}
        />
      </>
    ),
    options: [
      "WHERE rating > 4.3 AND rating < 4.8",
      "WHERE rating BETWEEN 4.3 AND 4.8",
      "WHERE rating IN (4.3, 4.8)",
      "WHERE rating >= 4.8 AND rating <= 4.3",
    ],
    answer: "WHERE rating BETWEEN 4.3 AND 4.8",
  },

  {
    question: (
      <>
        Which query sorts Puma products by lowest price first?
        <CodeBlock
          language="sql"
          code={`SELECT name, price, rating
FROM product
WHERE brand = 'Puma'
ORDER BY price ASC;`}
        />
      </>
    ),
    options: [
      "ORDER BY price DESC",
      "ORDER BY rating ASC",
      "ORDER BY price ASC",
      "ORDER BY brand ASC",
    ],
    answer: "ORDER BY price ASC",
  },

  {
    question: (
      <>
        Which query sorts products named "Blue Shirt" by highest rating first
        and then lowest price?
        <CodeBlock
          language="sql"
          code={`SELECT name, price, rating
FROM product
WHERE name = 'Blue Shirt'
ORDER BY rating DESC, price ASC;`}
        />
      </>
    ),
    options: [
      "ORDER BY price ASC, rating DESC",
      "ORDER BY rating DESC, price ASC",
      "ORDER BY rating ASC, price DESC",
      "ORDER BY price DESC",
    ],
    answer: "ORDER BY rating DESC, price ASC",
  },

  {
    question: (
      <>
        Which query fetches unique brands from the product table?
        <CodeBlock
          language="sql"
          code={`SELECT DISTINCT brand
FROM product;`}
        />
      </>
    ),
    options: [
      "SELECT brand FROM product",
      "SELECT UNIQUE brand FROM product",
      "SELECT DISTINCT brand FROM product",
      "SELECT brand DISTINCT FROM product",
    ],
    answer: "SELECT DISTINCT brand FROM product",
  },

  {
    question: (
      <>
        Which query fetches the top 2 highest-rated Puma products?
        <CodeBlock
          language="sql"
          code={`SELECT name, price, rating
FROM product
WHERE brand = 'Puma'
ORDER BY rating DESC
LIMIT 2;`}
        />
      </>
    ),
    options: [
      "LIMIT 2 ORDER BY rating DESC",
      "ORDER BY rating DESC LIMIT 2",
      "OFFSET 2",
      "LIMIT rating DESC",
    ],
    answer: "ORDER BY rating DESC LIMIT 2",
  },

  {
    question: (
      <>
        Which query fetches 5 top-rated products starting from the 7th row?
        <CodeBlock
          language="sql"
          code={`SELECT name, price, rating
FROM product
ORDER BY rating DESC
LIMIT 5 OFFSET 6;`}
        />
      </>
    ),
    options: [
      "OFFSET 6 LIMIT 5",
      "LIMIT 6 OFFSET 5",
      "LIMIT 5 OFFSET 6",
      "OFFSET 5 LIMIT 6",
    ],
    answer: "LIMIT 5 OFFSET 6",
  },

  {
    question: (
      <>
        Which clause must come first in SQLite when using pagination?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
LIMIT 5 OFFSET 10;`}
        />
      </>
    ),
    options: ["OFFSET", "LIMIT", "ORDER BY", "DISTINCT"],
    answer: "LIMIT",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Which operator is used to match values from a list?",
    options: ["BETWEEN", "LIKE", "IN", "DISTINCT"],
    answer: "IN",
  },

  {
    question: "Is the BETWEEN operator inclusive?",
    options: ["Yes", "No", "Only lower limit", "Only upper limit"],
    answer: "Yes",
  },

  {
    question: "What is the default sorting order of ORDER BY?",
    options: ["Descending", "Random", "Ascending", "None"],
    answer: "Ascending",
  },

  {
    question: "Which clause returns unique values?",
    options: ["UNIQUE", "GROUP BY", "DISTINCT", "ORDER BY"],
    answer: "DISTINCT",
  },

  {
    question: "What is the default OFFSET value?",
    options: ["1", "5", "NULL", "0"],
    answer: "0",
  },
];

const Quering_SQL_MCQ_3 = ({
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
      title="IN, BETWEEN, ORDER BY, DISTINCT & Pagination | MCQs"
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

export default Quering_SQL_MCQ_3;
