import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which SQL query updates the score of all players to 100?
        <CodeBlock
          language="sql"
          code={`UPDATE player
SET score = 100;`}
        />
      </>
    ),
    options: [
      "UPDATE player score = 100",
      "UPDATE player SET score = 100",
      "SET score = 100 FROM player",
      "ALTER player score = 100",
    ],
    answer: "UPDATE player SET score = 100",
  },

  {
    question: (
      <>
        Which query updates the score of only player named 'Ram'?
        <CodeBlock
          language="sql"
          code={`UPDATE player
SET score = 150
WHERE name = 'Ram';`}
        />
      </>
    ),
    options: [
      "UPDATE player score = 150",
      "UPDATE player SET score = 150",
      "UPDATE player SET score = 150 WHERE name = 'Ram'",
      "ALTER player SET score = 150 WHERE name = 'Ram'",
    ],
    answer: "UPDATE player SET score = 150 WHERE name = 'Ram'",
  },

  {
    question: (
      <>
        Which query deletes all rows from the player table?
        <CodeBlock language="sql" code={`DELETE FROM player;`} />
      </>
    ),
    options: [
      "DROP player",
      "DELETE player",
      "DELETE FROM player",
      "REMOVE FROM player",
    ],
    answer: "DELETE FROM player",
  },

  {
    question: (
      <>
        Which query deletes the player named 'Shyam'?
        <CodeBlock
          language="sql"
          code={`DELETE FROM player
WHERE name = 'Shyam';`}
        />
      </>
    ),
    options: [
      "DELETE player WHERE name = 'Shyam'",
      "REMOVE FROM player WHERE name = 'Shyam'",
      "DELETE FROM player WHERE name = 'Shyam'",
      "DROP FROM player WHERE name = 'Shyam'",
    ],
    answer: "DELETE FROM player WHERE name = 'Shyam'",
  },

  {
    question: (
      <>
        Which SQL query deletes the entire player table?
        <CodeBlock language="sql" code={`DROP TABLE player;`} />
      </>
    ),
    options: [
      "DELETE TABLE player",
      "REMOVE player",
      "DROP TABLE player",
      "DELETE FROM player",
    ],
    answer: "DROP TABLE player",
  },

  {
    question: (
      <>
        Which SQL statement adds a new column jersey_num to player table?
        <CodeBlock
          language="sql"
          code={`ALTER TABLE player
ADD COLUMN jersey_num INTEGER;`}
        />
      </>
    ),
    options: [
      "ADD COLUMN jersey_num INTEGER",
      "ALTER player ADD jersey_num",
      "ALTER TABLE player ADD COLUMN jersey_num INTEGER",
      "UPDATE TABLE player ADD jersey_num",
    ],
    answer: "ALTER TABLE player ADD COLUMN jersey_num INTEGER",
  },

  {
    question: (
      <>
        Which query renames column jersey_num to jersey_number?
        <CodeBlock
          language="sql"
          code={`ALTER TABLE player
RENAME COLUMN jersey_num TO jersey_number;`}
        />
      </>
    ),
    options: [
      "RENAME jersey_num TO jersey_number",
      "ALTER TABLE player RENAME jersey_num",
      "ALTER TABLE player RENAME COLUMN jersey_num TO jersey_number",
      "UPDATE player RENAME jersey_num",
    ],
    answer: "ALTER TABLE player RENAME COLUMN jersey_num TO jersey_number",
  },

  {
    question: (
      <>
        Which query removes a column from a table?
        <CodeBlock
          language="sql"
          code={`ALTER TABLE player
DROP COLUMN jersey_number;`}
        />
      </>
    ),
    options: [
      "DELETE COLUMN jersey_number",
      "REMOVE COLUMN jersey_number",
      "ALTER TABLE player DROP COLUMN jersey_number",
      "DROP jersey_number FROM player",
    ],
    answer: "ALTER TABLE player DROP COLUMN jersey_number",
  },

  {
    question: (
      <>
        After adding a new column, what is the default value for existing rows?
      </>
    ),
    options: ["0", "Empty string", "NULL", "Undefined"],
    answer: "NULL",
  },

  {
    question: (
      <>
        Which command checks updated table structure?
        <CodeBlock language="sql" code={`PRAGMA TABLE_INFO(player);`} />
      </>
    ),
    options: [
      "DESCRIBE TABLE",
      "SHOW COLUMNS",
      "PRAGMA TABLE_INFO",
      "TABLE STRUCTURE",
    ],
    answer: "PRAGMA TABLE_INFO",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Which clause is used to update existing data in a table?",
    options: ["ALTER", "INSERT", "UPDATE", "DELETE"],
    answer: "UPDATE",
  },

  {
    question: "Which clause is used to delete rows from a table?",
    options: ["DROP", "ALTER", "DELETE", "UPDATE"],
    answer: "DELETE",
  },

  {
    question: "What is the key difference between DELETE and DROP?",
    options: [
      "DELETE removes table, DROP removes rows",
      "DELETE removes rows, DROP removes table",
      "Both do the same thing",
      "DELETE is faster than DROP",
    ],
    answer: "DELETE removes rows, DROP removes table",
  },

  {
    question: "Which clause is used to modify table structure?",
    options: ["UPDATE", "INSERT", "ALTER", "DELETE"],
    answer: "ALTER",
  },

  {
    question: "SQLite keywords are:",
    options: [
      "Case-sensitive",
      "Case-insensitive",
      "Lowercase only",
      "Uppercase only",
    ],
    answer: "Case-insensitive",
  },
];

const Introductionto_SQL_MCQ_2 = ({
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
      title="Introduction to SQL | Part 2 | MCQs"
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

export default Introductionto_SQL_MCQ_2;
