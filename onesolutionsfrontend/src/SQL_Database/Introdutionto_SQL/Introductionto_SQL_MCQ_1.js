import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which SQL command is used to create a new table?
        <CodeBlock
          language="sql"
          code={`CREATE TABLE table_name (
  column_name data_type
);`}
        />
      </>
    ),
    options: ["INSERT TABLE", "CREATE TABLE", "ADD TABLE", "NEW TABLE"],
    answer: "CREATE TABLE",
  },

  {
    question: (
      <>Which data type should be used to store a date like '2025-08-01'?</>
    ),
    options: ["VARCHAR", "DATETIME", "DATE", "TEXT"],
    answer: "DATE",
  },

  {
    question: <>What will BOOLEAN values be stored as in SQL databases?</>,
    options: ["TRUE / FALSE", "Yes / No", "1 / 0", "On / Off"],
    answer: "1 / 0",
  },

  {
    question: (
      <>
        Which SQL command is used to view table structure?
        <CodeBlock language="sql" code={`PRAGMA TABLE_INFO(student);`} />
      </>
    ),
    options: [
      "DESCRIBE TABLE",
      "SHOW TABLE",
      "PRAGMA TABLE_INFO",
      "TABLE STRUCTURE",
    ],
    answer: "PRAGMA TABLE_INFO",
  },

  {
    question: (
      <>
        Which SQL statement inserts multiple rows into a table?
        <CodeBlock
          language="sql"
          code={`INSERT INTO player (name, age, score)
VALUES ('Ram', 28, 70), ('Sita', 25, 30);`}
        />
      </>
    ),
    options: ["INSERT ROW", "ADD VALUES", "INSERT INTO", "UPDATE"],
    answer: "INSERT INTO",
  },

  {
    question: <>What happens if the number of values does not match columns?</>,
    options: [
      "Data is ignored",
      "Values are auto-filled",
      "Error occurs",
      "Table is deleted",
    ],
    answer: "Error occurs",
  },

  {
    question: <>Which symbol is used to select all columns?</>,
    options: ["#", "%", "*", "&"],
    answer: "*",
  },

  {
    question: (
      <>
        Which clause filters rows based on a condition?
        <CodeBlock
          language="sql"
          code={`SELECT * FROM player WHERE name = 'Sai';`}
        />
      </>
    ),
    options: ["SELECT", "FROM", "WHERE", "INSERT"],
    answer: "WHERE",
  },

  {
    question: <>Which format represents DATETIME correctly?</>,
    options: ["YYYY/MM/DD", "DD-MM-YYYY", "YYYY-MM-DD HH:MM:SS", "MM-DD-YYYY"],
    answer: "YYYY-MM-DD HH:MM:SS",
  },

  {
    question: (
      <>
        Which SQL statement retrieves all data from a table?
        <CodeBlock language="sql" code={`SELECT * FROM employee;`} />
      </>
    ),
    options: ["GET ALL", "FETCH DATA", "SELECT *", "SHOW TABLE"],
    answer: "SELECT *",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Sequential Query Language",
      "System Query Language",
    ],
    answer: "Structured Query Language",
  },

  {
    question: "SQL is mainly used to work with:",
    options: [
      "Operating Systems",
      "Relational Databases",
      "Programming Languages",
      "Networks",
    ],
    answer: "Relational Databases",
  },

  {
    question: "Which SQL feature makes it easy to learn?",
    options: [
      "Procedural nature",
      "Declarative nature",
      "Object-oriented design",
      "Compilation speed",
    ],
    answer: "Declarative nature",
  },

  {
    question: "Which clause is mandatory in a SELECT query?",
    options: ["WHERE", "ORDER BY", "SELECT", "GROUP BY"],
    answer: "SELECT",
  },

  {
    question: "If a table does not exist, PRAGMA TABLE_INFO will:",
    options: [
      "Throw an error",
      "Create the table",
      "Return no result",
      "Delete the database",
    ],
    answer: "Return no result",
  },
];

const Introductionto_SQL_MCQ_1 = ({
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
      title="Introduction to SQL | Part 1 | MCQs"
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

export default Introductionto_SQL_MCQ_1;
