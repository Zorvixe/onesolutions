import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 8 CODE / SUBQUERY QUESTIONS ====================

  {
    question: (
      <>
        Which query gets the rating variance of products in the "WATCH"
        category?
        <CodeBlock
          language="sql"
          code={`SELECT name,
ROUND((SELECT AVG(rating)
       FROM product
       WHERE category = 'WATCH') - rating, 2) AS rating_variance
FROM product
WHERE category = 'WATCH';`}
        />
      </>
    ),
    options: [
      "SELECT AVG(rating) FROM product",
      "SELECT name, rating FROM product",
      "SELECT name, ROUND((SELECT AVG(rating) FROM product WHERE category = 'WATCH') - rating, 2) AS rating_variance FROM product WHERE category = 'WATCH'",
      "SELECT * FROM product WHERE category = 'WATCH'",
    ],
    answer:
      "SELECT name, ROUND((SELECT AVG(rating) FROM product WHERE category = 'WATCH') - rating, 2) AS rating_variance FROM product WHERE category = 'WATCH'",
  },

  {
    question: (
      <>
        Which query fetches products with rating greater than average rating?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM product
WHERE rating >
(SELECT AVG(rating) FROM product);`}
        />
      </>
    ),
    options: [
      "SELECT * FROM product",
      "SELECT AVG(rating) FROM product",
      "SELECT * FROM product WHERE rating > (SELECT AVG(rating) FROM product)",
      "WHERE rating = AVG",
    ],
    answer:
      "SELECT * FROM product WHERE rating > (SELECT AVG(rating) FROM product)",
  },

  {
    question: (
      <>
        Which query fetches order_ids that contain mobiles but not earphones?
        <CodeBlock
          language="sql"
          code={`SELECT DISTINCT order_id
FROM order_product
WHERE product_id IN (291,292,293,294,296)
AND order_id NOT IN (
  SELECT order_id
  FROM order_product
  WHERE product_id IN (227,228,229,232,233)
);`}
        />
      </>
    ),
    options: [
      "SELECT order_id FROM order_product",
      "JOIN product",
      "SELECT DISTINCT order_id FROM order_product WHERE product_id IN (291,292,293,294,296) AND order_id NOT IN (SELECT order_id FROM order_product WHERE product_id IN (227,228,229,232,233))",
      "WHERE product_id = 291",
    ],
    answer:
      "SELECT DISTINCT order_id FROM order_product WHERE product_id IN (291,292,293,294,296) AND order_id NOT IN (SELECT order_id FROM order_product WHERE product_id IN (227,228,229,232,233))",
  },

  {
    question: (
      <>
        Which query gets products from "MOBILE" category with rating greater
        than average rating?
        <CodeBlock
          language="sql"
          code={`SELECT name, rating
FROM product
WHERE category = 'MOBILE'
AND rating >
(SELECT AVG(rating)
 FROM product
 WHERE category = 'MOBILE');`}
        />
      </>
    ),
    options: [
      "SELECT AVG(rating)",
      "SELECT * FROM product",
      "SELECT name, rating FROM product WHERE category = 'MOBILE' AND rating > (SELECT AVG(rating) FROM product WHERE category = 'MOBILE')",
      "GROUP BY rating",
    ],
    answer:
      "SELECT name, rating FROM product WHERE category = 'MOBILE' AND rating > (SELECT AVG(rating) FROM product WHERE category = 'MOBILE')",
  },

  {
    question: (
      <>
        Which query returns product names where price is greater than average
        price?
        <CodeBlock
          language="sql"
          code={`SELECT name
FROM product
WHERE price_per_unit >
(SELECT AVG(price_per_unit)
 FROM product);`}
        />
      </>
    ),
    options: [
      "SELECT AVG(price)",
      "SELECT name FROM product",
      "SELECT name FROM product WHERE price_per_unit > (SELECT AVG(price_per_unit) FROM product)",
      "WHERE price = AVG",
    ],
    answer:
      "SELECT name FROM product WHERE price_per_unit > (SELECT AVG(price_per_unit) FROM product)",
  },

  {
    question: (
      <>
        Which operator should be used for multiple-row subqueries?
        <CodeBlock language="sql" code={`IN / NOT IN`} />
      </>
    ),
    options: ["=", "<>", "IN", "<"],
    answer: "IN",
  },

  {
    question: <>What happens if a subquery returns NULL in a WHERE clause?</>,
    options: [
      "Outer query returns all rows",
      "Outer query throws syntax error",
      "Outer query returns no rows",
      "NULL is ignored",
    ],
    answer: "Outer query returns no rows",
  },

  {
    question: (
      <>
        Which error occurs when a subquery in SELECT returns multiple columns?
      </>
    ),
    options: [
      "Row value misused",
      "No such column",
      "Sub-select returns 2 columns",
      "NULL value error",
    ],
    answer: "Sub-select returns 2 columns",
  },

  // ==================== 5 THEORY QUESTIONS ====================

  {
    question: "What is a subquery?",
    options: [
      "A query inside another query",
      "A temporary table",
      "A view",
      "An index",
    ],
    answer: "A query inside another query",
  },

  {
    question: "Which clause commonly uses subqueries?",
    options: ["FROM", "WHERE", "ORDER BY", "LIMIT"],
    answer: "WHERE",
  },

  {
    question: "Evaluation order of subqueries?",
    options: [
      "Outer query first",
      "Random order",
      "Innermost query first",
      "Last query first",
    ],
    answer: "Innermost query first",
  },

  {
    question: "Which comparison operator is used for single-row subqueries?",
    options: ["IN", "ANY", "=", "ALL"],
    answer: "=",
  },

  {
    question: "Which keyword is used to create a view?",
    options: ["CREATE VIEW", "MAKE VIEW", "ADD VIEW", "INSERT VIEW"],
    answer: "CREATE VIEW",
  },
];

const Views_And_Subqueries_MCQ = ({
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
      title="Views & Subqueries | MCQs"
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

export default Views_And_Subqueries_MCQ;
