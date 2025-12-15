import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE BLOCK QUESTIONS ====================

  {
    question: (
      <div>
        <p>What is the error in the SQL query?</p>
        <CodeBlock
          language="sql"
          code={`INERT INTO PLAYER (name, age, score)\nVALUES ('Virat', 32, 50);`}
        />
      </div>
    ),
    options: [
      "Missing table name",
      "Misspelled SQL keyword",
      "Incorrect data type",
      "Duplicate column name",
    ],
    answer: "Misspelled SQL keyword",
  },

  {
    question: (
      <div>
        <p>What change fixes the syntax error?</p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO PLAYER (name, age, score)\nVAUES ('Virat', 32, 50);`}
        />
      </div>
    ),
    options: [
      "Change table name",
      "Correct the values",
      "Replace VAUES with VALUES",
      "Add a new column",
    ],
    answer: "Replace VAUES with VALUES",
  },

  {
    question: (
      <div>
        <p>What is the error in this SQL query?</p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE Employee ((\n id INT,\n name VARCHAR(100),\n salary DECIMAL(10,2)\n);`}
        />
      </div>
    ),
    options: [
      "Incorrect data types",
      "Missing semicolon",
      "Extra parenthesis after table name",
      "Incorrect column names",
    ],
    answer: "Extra parenthesis after table name",
  },

  {
    question: (
      <div>
        <p>Why does this query fail?</p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE PLAYER (\n name VARCHAR(255) age INTEGER score INTEGER\n);`}
        />
      </div>
    ),
    options: [
      "Missing comma between columns",
      "Incorrect table name",
      "Invalid data type",
      "Extra semicolon",
    ],
    answer: "Missing comma between columns",
  },

  {
    question: (
      <div>
        <p>What is the error in this query?</p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE EMPLOYEE (\n employee_id INT,\n employee_name VARCHAR(50),\n salary INTEGER,\n);`}
        />
      </div>
    ),
    options: [
      "Missing semicolon",
      "Extra comma after salary",
      "Incorrect keyword",
      "Duplicate column",
    ],
    answer: "Extra comma after salary",
  },

  {
    question: (
      <div>
        <p>Why does this SQL statement produce an error?</p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE STUDENT (\n name VARCHAR(),\n age INTEGER,\n marks INTEGER\n);`}
        />
      </div>
    ),
    options: [
      "Missing table name",
      "VARCHAR length not specified",
      "Extra comma",
      "Incorrect keyword",
    ],
    answer: "VARCHAR length not specified",
  },

  {
    question: (
      <div>
        <p>What is the issue in this query?</p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE PRODUCT (\n id INTEGER(),\n name VARCHAR(255),\n price INTEGER()\n);`}
        />
      </div>
    ),
    options: [
      "Invalid data type INTEGER()",
      "Invalid VARCHAR",
      "Missing semicolon",
      "Correct query",
    ],
    answer: "Invalid data type INTEGER()",
  },

  {
    question: (
      <div>
        <p>Why does this INSERT statement fail?</p>
        <CodeBlock
          language="sql"
          code={`INSERT INTO PLAYER {name, age, score}\nVALUES ('Sravan', 22, 424);`}
        />
      </div>
    ),
    options: [
      "Missing VALUES keyword",
      "Unrecognized token",
      "Incorrect table name",
      "Duplicate values",
    ],
    answer: "Unrecognized token",
  },

  {
    question: (
      <div>
        <p>Why does this query result in an error?</p>
        <CodeBlock
          language="sql"
          code={`CREATE TABLE ORDER (\n order_name VARCHAR(200),\n price INTEGER\n);`}
        />
      </div>
    ),
    options: [
      "ORDER is a reserved keyword",
      "Missing semicolon",
      "Incorrect data type",
      "Duplicate column",
    ],
    answer: "ORDER is a reserved keyword",
  },

  {
    question: (
      <div>
        <p>What error will occur?</p>
        <CodeBlock
          language="sql"
          code={`SELECT (id, name, price)\nFROM PRODUCT\nWHERE price > 5000;`}
        />
      </div>
    ),
    options: [
      "Unrecognized token",
      "Row value misused",
      "Missing delimiter",
      "Incorrect number of values",
    ],
    answer: "Row value misused",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "When does a syntax error occur in SQL?",
    options: [
      "When data is missing",
      "When query structure does not follow SQL rules",
      "When table already exists",
      "When column values are duplicated",
    ],
    answer: "When query structure does not follow SQL rules",
  },

  {
    question: "What causes a 'table already exists' error?",
    options: [
      "Using duplicate column names",
      "Creating a table with an existing name",
      "Inserting duplicate rows",
      "Using invalid data types",
    ],
    answer: "Creating a table with an existing name",
  },

  {
    question: "When does 'no such table' error occur?",
    options: [
      "When column name is wrong",
      "When referenced table does not exist",
      "When data types mismatch",
      "When duplicate columns exist",
    ],
    answer: "When referenced table does not exist",
  },

  {
    question: "When does 'duplicate column name' error occur?",
    options: [
      "When inserting duplicate rows",
      "When adding a column that already exists",
      "When deleting a column",
      "When using wrong data type",
    ],
    answer: "When adding a column that already exists",
  },

  {
    question: "What causes 'incorrect number of values' error?",
    options: [
      "Wrong table name",
      "Mismatch between columns and values count",
      "Duplicate column name",
      "Missing semicolon",
    ],
    answer: "Mismatch between columns and values count",
  },
];

const Common_Mistakes_MCQ = ({
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
      title="Common SQL Mistakes | MCQs"
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

export default Common_Mistakes_MCQ;
