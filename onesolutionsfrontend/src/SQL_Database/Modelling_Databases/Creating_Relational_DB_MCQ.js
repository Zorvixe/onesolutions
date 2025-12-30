import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which query correctly creates a customer table with a primary key?
        <CodeBlock
          language="sql"
          code={`CREATE TABLE customer (
  id INT PRIMARY KEY,
  name TEXT
);`}
        />
      </>
    ),
    options: [
      "CREATE customer TABLE",
      "CREATE TABLE customer id INT",
      "CREATE TABLE customer (id INT PRIMARY KEY, name TEXT)",
      "MAKE TABLE customer",
    ],
    answer: "CREATE TABLE customer (id INT PRIMARY KEY, name TEXT)",
  },

  {
    question: (
      <>
        Which query correctly creates a foreign key in the address table?
        <CodeBlock
          language="sql"
          code={`CREATE TABLE address (
  id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customer(id)
);`}
        />
      </>
    ),
    options: [
      "REFERENCES address(id)",
      "FOREIGN KEY REFERENCES customer",
      "FOREIGN KEY (customer_id) REFERENCES customer(id)",
      "PRIMARY KEY (customer_id)",
    ],
    answer: "FOREIGN KEY (customer_id) REFERENCES customer(id)",
  },

  {
    question: (
      <>
        Which constraint ensures related rows are deleted automatically?
        <CodeBlock
          language="sql"
          code={`FOREIGN KEY (customer_id)
REFERENCES customer(id)
ON DELETE CASCADE`}
        />
      </>
    ),
    options: [
      "ON UPDATE",
      "ON DELETE CASCADE",
      "PRAGMA foreign_keys",
      "PRIMARY KEY",
    ],
    answer: "ON DELETE CASCADE",
  },

  {
    question: (
      <>
        Which query enables foreign key constraints in SQLite?
        <CodeBlock language="sql" code={`PRAGMA foreign_keys = ON;`} />
      </>
    ),
    options: [
      "ENABLE FOREIGN KEY",
      "SET foreign_keys = true",
      "PRAGMA foreign_keys = ON",
      "ALTER TABLE foreign_keys",
    ],
    answer: "PRAGMA foreign_keys = ON",
  },

  {
    question: (
      <>
        Which table represents a One-to-One relationship?
        <CodeBlock
          language="sql"
          code={`CREATE TABLE cart (
  id INT PRIMARY KEY,
  customer_id INT UNIQUE
);`}
        />
      </>
    ),
    options: ["Many-to-Many", "One-to-Many", "One-to-One", "Recursive"],
    answer: "One-to-One",
  },

  {
    question: (
      <>
        Which table is a junction table?
        <CodeBlock
          language="sql"
          code={`CREATE TABLE cart_product (
  cart_id INT,
  product_id INT,
  quantity INT
);`}
        />
      </>
    ),
    options: ["cart", "product", "cart_product", "address"],
    answer: "cart_product",
  },

  {
    question: (
      <>
        Which query retrieves all addresses for John?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM address a
JOIN customer c
ON a.customer_id = c.id
WHERE c.name = 'John';`}
        />
      </>
    ),
    options: [
      "SELECT * FROM address",
      "JOIN address customer",
      "SELECT * FROM address a JOIN customer c ON a.customer_id = c.id WHERE c.name = 'John'",
      "WHERE name = John",
    ],
    answer:
      "SELECT * FROM address a JOIN customer c ON a.customer_id = c.id WHERE c.name = 'John'",
  },

  {
    question: (
      <>
        Which query retrieves cart details of John?
        <CodeBlock
          language="sql"
          code={`SELECT *
FROM cart ca
JOIN customer c
ON ca.customer_id = c.id
WHERE c.name = 'John';`}
        />
      </>
    ),
    options: [
      "SELECT * FROM cart",
      "JOIN cart customer",
      "SELECT * FROM cart ca JOIN customer c ON ca.customer_id = c.id WHERE c.name = 'John'",
      "WHERE customer = John",
    ],
    answer:
      "SELECT * FROM cart ca JOIN customer c ON ca.customer_id = c.id WHERE c.name = 'John'",
  },

  {
    question: (
      <>
        Which query retrieves all products in John's cart?
        <CodeBlock
          language="sql"
          code={`SELECT p.*
FROM cart c
JOIN cart_product cp ON c.id = cp.cart_id
JOIN product p ON p.id = cp.product_id
WHERE c.customer_id = 1;`}
        />
      </>
    ),
    options: [
      "SELECT * FROM product",
      "JOIN cart product",
      "SELECT p.* FROM cart c JOIN cart_product cp ON c.id = cp.cart_id JOIN product p ON p.id = cp.product_id WHERE c.customer_id = 1",
      "WHERE product_id = 1",
    ],
    answer:
      "SELECT p.* FROM cart c JOIN cart_product cp ON c.id = cp.cart_id JOIN product p ON p.id = cp.product_id WHERE c.customer_id = 1",
  },

  {
    question: (
      <>
        Where is quantity stored in a many-to-many relationship?
        <CodeBlock language="sql" code={`cart_product (quantity)`} />
      </>
    ),
    options: [
      "cart table",
      "product table",
      "junction table",
      "customer table",
    ],
    answer: "junction table",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "What is the purpose of a primary key?",
    options: [
      "Link tables",
      "Store duplicates",
      "Uniquely identify rows",
      "Allow null values",
    ],
    answer: "Uniquely identify rows",
  },

  {
    question: "What does a foreign key do?",
    options: [
      "Uniquely identify rows",
      "Link two tables",
      "Store text values",
      "Create indexes",
    ],
    answer: "Link two tables",
  },

  {
    question: "Which relationship uses a junction table?",
    options: ["One-to-One", "One-to-Many", "Many-to-Many", "Weak Entity"],
    answer: "Many-to-Many",
  },

  {
    question: "Which JOIN is used to combine related tables?",
    options: ["MERGE", "UNION", "JOIN", "CONNECT"],
    answer: "JOIN",
  },

  {
    question: "What happens when ON DELETE CASCADE is used?",
    options: [
      "Deletes only parent row",
      "Deletes only child row",
      "Deletes related child rows",
      "Prevents deletion",
    ],
    answer: "Deletes related child rows",
  },
];

const Creating_Relational_DB_MCQ = ({
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
      title="Creating Relational Database | MCQs"
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

export default Creating_Relational_DB_MCQ;
