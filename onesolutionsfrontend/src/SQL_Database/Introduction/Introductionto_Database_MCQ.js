import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / CONCEPT QUESTIONS ====================

  {
    question: "What is data?",
    options: [
      "Processed information only",
      "Any sort of information that is stored",
      "Only numbers stored in tables",
      "Only text information",
    ],
    answer: "Any sort of information that is stored",
  },

  {
    question: "Which of the following is an example of data?",
    options: [
      "Operating system",
      "Messages and multimedia on WhatsApp",
      "Programming language",
      "Compiler",
    ],
    answer: "Messages and multimedia on WhatsApp",
  },

  {
    question: "What is a database?",
    options: [
      "A single file of data",
      "An organised collection of data",
      "Only tables",
      "Only software",
    ],
    answer: "An organised collection of data",
  },

  {
    question: "What does DBMS stand for?",
    options: [
      "Data Backup Management System",
      "Database Maintenance Software",
      "Database Management System",
      "Data Based Memory System",
    ],
    answer: "Database Management System",
  },

  {
    question: "What is the main purpose of a DBMS?",
    options: [
      "To write programs",
      "To easily store and access data securely",
      "To design websites",
      "To create operating systems",
    ],
    answer: "To easily store and access data securely",
  },

  {
    question: "Which advantage ensures data is protected?",
    options: ["Performance", "Ease of Use", "Security", "Durability"],
    answer: "Security",
  },

  {
    question: "Which advantage allows access at any point in time?",
    options: [
      "Performance",
      "Ease of Use",
      "Durability and Availability",
      "Security",
    ],
    answer: "Durability and Availability",
  },

  {
    question: "Which advantage focuses on fast access to data?",
    options: ["Security", "Performance", "Durability", "Ease of Use"],
    answer: "Performance",
  },

  {
    question: "How is data organised in a relational database?",
    options: ["Key-value pairs", "Documents", "Graphs", "Tables"],
    answer: "Tables",
  },

  {
    question: "Which type of database stores data in non-tabular form?",
    options: [
      "Relational database",
      "Spreadsheet",
      "Non-relational database",
      "File system",
    ],
    answer: "Non-relational database",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Which DBMS is designed specifically for relational databases?",
    options: [
      "Non-relational DBMS",
      "Relational DBMS",
      "File system",
      "Operating system",
    ],
    answer: "Relational DBMS",
  },

  {
    question: "Which of the following is a relational DBMS example?",
    options: ["MongoDB", "Cassandra", "MySQL", "Redis"],
    answer: "MySQL",
  },

  {
    question: "Which of the following is a non-relational DBMS example?",
    options: ["Oracle", "PostgreSQL", "SQLite", "MongoDB"],
    answer: "MongoDB",
  },

  {
    question: "Which statement is true?",
    options: [
      "Non-relational databases store data only in tables",
      "Relational databases store data in non-tabular form",
      "Relational databases are most commonly used",
      "DBMS is not required for databases",
    ],
    answer: "Relational databases are most commonly used",
  },

  {
    question: "The choice of database depends on:",
    options: [
      "Programming language",
      "Operating system",
      "Project requirements",
      "Internet speed",
    ],
    answer: "Project requirements",
  },
];

const Introductionto_Database_MCQ = ({
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
      title="Introduction to Database | MCQs"
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

export default Introductionto_Database_MCQ;
