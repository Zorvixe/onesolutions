import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which query groups players and counts the number of half-centuries
        scored by each player?
        <CodeBlock
          language="sql"
          code={`SELECT name, COUNT(*) AS half_centuries
FROM player_match_details
WHERE score >= 50
GROUP BY name;`}
        />
      </>
    ),
    options: [
      "GROUP BY score",
      "GROUP BY name",
      "GROUP BY match",
      "GROUP BY year",
    ],
    answer: "GROUP BY name",
  },

  {
    question: (
      <>
        Which clause is used to filter aggregated data?
        <CodeBlock
          language="sql"
          code={`SELECT name, COUNT(*) AS half_centuries
FROM player_match_details
WHERE score >= 50
GROUP BY name
HAVING COUNT(*) > 1;`}
        />
      </>
    ),
    options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
    answer: "HAVING",
  },

  {
    question: (
      <>
        Which query fetches players who scored more than one half-century?
        <CodeBlock
          language="sql"
          code={`SELECT name, COUNT(*) AS half_centuries
FROM player_match_details
WHERE score >= 50
GROUP BY name
HAVING COUNT(*) > 1;`}
        />
      </>
    ),
    options: [
      "HAVING score > 50",
      "WHERE COUNT(*) > 1",
      "HAVING COUNT(*) > 1",
      "GROUP BY COUNT(*) > 1",
    ],
    answer: "HAVING COUNT(*) > 1",
  },

  {
    question: (
      <>
        Which query gets the total runs scored by each player?
        <CodeBlock
          language="sql"
          code={`SELECT name, SUM(score) AS total_runs
FROM player_match_details
GROUP BY name;`}
        />
      </>
    ),
    options: ["SUM(score)", "GROUP BY score", "GROUP BY name", "HAVING score"],
    answer: "GROUP BY name",
  },

  {
    question: (
      <>
        Which query gets players whose total runs are greater than 200?
        <CodeBlock
          language="sql"
          code={`SELECT name, SUM(score) AS total_runs
FROM player_match_details
GROUP BY name
HAVING SUM(score) > 200;`}
        />
      </>
    ),
    options: [
      "WHERE SUM(score) > 200",
      "HAVING SUM(score) > 200",
      "GROUP BY SUM(score)",
      "WHERE score > 200",
    ],
    answer: "HAVING SUM(score) > 200",
  },

  {
    question: (
      <>
        Which query counts the number of matches played by each player?
        <CodeBlock
          language="sql"
          code={`SELECT name, COUNT(*) AS matches_played
FROM player_match_details
GROUP BY name;`}
        />
      </>
    ),
    options: ["COUNT(score)", "COUNT(match)", "COUNT(*)", "COUNT(name)"],
    answer: "COUNT(*)",
  },

  {
    question: (
      <>
        Which query filters players who played at least 3 matches?
        <CodeBlock
          language="sql"
          code={`SELECT name, COUNT(*) AS matches_played
FROM player_match_details
GROUP BY name
HAVING COUNT(*) >= 3;`}
        />
      </>
    ),
    options: [
      "WHERE COUNT(*) >= 3",
      "HAVING COUNT(*) >= 3",
      "GROUP BY COUNT(*) >= 3",
      "WHERE matches_played >= 3",
    ],
    answer: "HAVING COUNT(*) >= 3",
  },

  {
    question: (
      <>
        Which query finds the maximum score scored by each player?
        <CodeBlock
          language="sql"
          code={`SELECT name, MAX(score) AS highest_score
FROM player_match_details
GROUP BY name;`}
        />
      </>
    ),
    options: ["MIN(score)", "SUM(score)", "AVG(score)", "MAX(score)"],
    answer: "MAX(score)",
  },

  {
    question: (
      <>
        Which query filters players whose maximum score is greater than 70?
        <CodeBlock
          language="sql"
          code={`SELECT name, MAX(score) AS highest_score
FROM player_match_details
GROUP BY name
HAVING MAX(score) > 70;`}
        />
      </>
    ),
    options: [
      "WHERE MAX(score) > 70",
      "HAVING MAX(score) > 70",
      "GROUP BY MAX(score) > 70",
      "WHERE score > 70",
    ],
    answer: "HAVING MAX(score) > 70",
  },

  {
    question: <>Which clause is executed first in GROUP BY queries?</>,
    options: ["HAVING", "GROUP BY", "WHERE", "SELECT"],
    answer: "WHERE",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "What does GROUP BY do?",
    options: [
      "Filters rows",
      "Groups rows with same values",
      "Sorts rows",
      "Deletes rows",
    ],
    answer: "Groups rows with same values",
  },

  {
    question: "Which clause filters grouped results?",
    options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
    answer: "HAVING",
  },

  {
    question: "WHERE clause is applied before or after GROUP BY?",
    options: ["Before", "After", "At the same time", "Never"],
    answer: "Before",
  },

  {
    question: "HAVING clause is applied before or after GROUP BY?",
    options: ["Before", "After", "At the same time", "Never"],
    answer: "After",
  },

  {
    question: "Can HAVING be used without GROUP BY?",
    options: ["Yes", "No", "Only in SQLite", "Only in PostgreSQL"],
    answer: "Yes",
  },
];

const Groupby_Having_MCQ = ({
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
      title="GROUP BY & HAVING | MCQs"
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

export default Groupby_Having_MCQ;
