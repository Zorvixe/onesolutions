import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / DATABASE MODELLING QUESTIONS ====================

  {
    question: (
      <>
        Which table correctly represents the Customer entity?
        <CodeBlock
          language="sql"
          code={`CREATE TABLE customer (
  id INT PRIMARY KEY,
  name TEXT,
  email TEXT
);`}
        />
      </>
    ),
    options: [
      "CREATE customer TABLE",
      "CREATE TABLE customer",
      "CREATE TABLE customer (id INT PRIMARY KEY, name TEXT, email TEXT)",
      "MAKE TABLE customer",
    ],
    answer: "CREATE TABLE customer (id INT PRIMARY KEY, name TEXT, email TEXT)",
  },

  {
    question: (
      <>
        Which column acts as a foreign key in the address table?
        <CodeBlock
          language="sql"
          code={`CREATE TABLE address (
  id INT PRIMARY KEY,
  street TEXT,
  customer_id INT
);`}
        />
      </>
    ),
    options: ["id", "street", "customer_id", "address"],
    answer: "customer_id",
  },

  {
    question: (
      <>
        Which relationship does this table design represent?
        <CodeBlock
          language="sql"
          code={`CREATE TABLE cart (
  id INT PRIMARY KEY,
  customer_id INT UNIQUE
);`}
        />
      </>
    ),
    options: ["One-to-Many", "Many-to-Many", "One-to-One", "Recursive"],
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
    options: ["cart", "product", "cart_product", "customer"],
    answer: "cart_product",
  },

  {
    question: (
      <>
        Which relationship requires a junction table?
        <CodeBlock language="sql" code={`Cart <----> Product`} />
      </>
    ),
    options: ["One-to-One", "One-to-Many", "Many-to-Many", "Unary"],
    answer: "Many-to-Many",
  },

  {
    question: (
      <>
        Where should quantity of a product in cart be stored?
        <CodeBlock language="sql" code={`Cart ↔ Product`} />
      </>
    ),
    options: [
      "cart table",
      "product table",
      "customer table",
      "junction table",
    ],
    answer: "junction table",
  },

  {
    question: (
      <>
        Which statement defines a primary key?
        <CodeBlock language="sql" code={`id INT PRIMARY KEY`} />
      </>
    ),
    options: ["Foreign Key", "Composite Key", "Primary Key", "Candidate Key"],
    answer: "Primary Key",
  },

  {
    question: (
      <>
        Which design correctly maps One-to-Many relationship?
        <CodeBlock
          language="sql"
          code={`Customer (id)
Address (customer_id)`}
        />
      </>
    ),
    options: [
      "Foreign key in customer",
      "Foreign key in address",
      "Junction table",
      "No key needed",
    ],
    answer: "Foreign key in address",
  },

  {
    question: (
      <>
        Which key uniquely identifies each row?
        <CodeBlock language="sql" code={`PRIMARY KEY (id)`} />
      </>
    ),
    options: [
      "Foreign Key",
      "Primary Key",
      "Alternate Key",
      "Composite Attribute",
    ],
    answer: "Primary Key",
  },

  {
    question: (
      <>
        Which table ensures one cart per customer?
        <CodeBlock language="sql" code={`customer_id INT UNIQUE`} />
      </>
    ),
    options: ["Many-to-Many", "One-to-One", "One-to-Many", "Weak Entity"],
    answer: "One-to-One",
  },

  // ==================== 5 NORMAL THEORY QUESTIONS ====================

  {
    question: "What is an entity in ER Model?",
    options: [
      "A database",
      "A real-world object or concept",
      "A relationship",
      "A column",
    ],
    answer: "A real-world object or concept",
  },

  {
    question: "What is a key attribute?",
    options: [
      "An attribute with duplicate values",
      "An attribute that uniquely identifies an entity",
      "A foreign key",
      "A relationship",
    ],
    answer: "An attribute that uniquely identifies an entity",
  },

  {
    question: "What is cardinality?",
    options: [
      "Number of attributes",
      "Number of tables",
      "Maximum number of relationships",
      "Data type size",
    ],
    answer: "Maximum number of relationships",
  },

  {
    question: "Which relationship allows multiple entities on both sides?",
    options: ["One-to-One", "One-to-Many", "Many-to-Many", "Weak Relationship"],
    answer: "Many-to-Many",
  },

  {
    question: "What is a foreign key?",
    options: [
      "Primary key of same table",
      "Key that links two tables",
      "Duplicate key",
      "Composite attribute",
    ],
    answer: "Key that links two tables",
  },
];

const Modelling_Database_MCQ = ({
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
      title="Modelling Databases | MCQs"
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

export default Modelling_Database_MCQ;
