import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  // ==================== 10 CODE / SQL QUESTIONS ====================

  {
    question: (
      <>
        Which query gets the total runs scored by "Ram"?
        <CodeBlock
          language="sql"
          code={`SELECT SUM(score)
FROM player_match_details
WHERE name = 'Ram';`}
        />
      </>
    ),
    options: [
      "SELECT COUNT(score) FROM player_match_details WHERE name = 'Ram'",
      "SELECT AVG(score) FROM player_match_details WHERE name = 'Ram'",
      "SELECT SUM(score) FROM player_match_details WHERE name = 'Ram'",
      "SELECT MAX(score) FROM player_match_details WHERE name = 'Ram'",
    ],
    answer: "SELECT SUM(score) FROM player_match_details WHERE name = 'Ram'",
  },

  {
    question: (
      <>
        Which query gets the highest and least scores in 2011?
        <CodeBlock
          language="sql"
          code={`SELECT MAX(score), MIN(score)
FROM player_match_details
WHERE year = 2011;`}
        />
      </>
    ),
    options: [
      "SELECT MAX(score) OR MIN(score) FROM player_match_details",
      "SELECT MAX(score), MIN(score) FROM player_match_details WHERE year = 2011",
      "SELECT AVG(score), COUNT(score) FROM player_match_details",
      "SELECT SUM(score), MIN(score) FROM player_match_details",
    ],
    answer:
      "SELECT MAX(score), MIN(score) FROM player_match_details WHERE year = 2011",
  },

  {
    question: (
      <>
        Which query counts the total number of matches played?
        <CodeBlock
          language="sql"
          code={`SELECT COUNT(*)
FROM player_match_details;`}
        />
      </>
    ),
    options: ["COUNT(score)", "COUNT(name)", "COUNT(*)", "COUNT(match)"],
    answer: "COUNT(*)",
  },

  {
    question: (
      <>
        Which query counts only non-NULL scores?
        <CodeBlock
          language="sql"
          code={`SELECT COUNT(score)
FROM player_match_details;`}
        />
      </>
    ),
    options: ["COUNT(*)", "COUNT(score)", "SUM(score)", "AVG(score)"],
    answer: "COUNT(score)",
  },

  {
    question: (
      <>
        Which query calculates the average score of all players?
        <CodeBlock
          language="sql"
          code={`SELECT AVG(score)
FROM player_match_details;`}
        />
      </>
    ),
    options: [
      "SELECT SUM(score)",
      "SELECT COUNT(score)",
      "SELECT AVG(score)",
      "SELECT MAX(score)",
    ],
    answer: "SELECT AVG(score)",
  },

  {
    question: (
      <>
        Which query finds the least score among all matches?
        <CodeBlock
          language="sql"
          code={`SELECT MIN(score)
FROM player_match_details;`}
        />
      </>
    ),
    options: [
      "SELECT MAX(score)",
      "SELECT AVG(score)",
      "SELECT MIN(score)",
      "SELECT SUM(score)",
    ],
    answer: "SELECT MIN(score)",
  },

  {
    question: (
      <>
        Which query finds the highest score in the year 2014?
        <CodeBlock
          language="sql"
          code={`SELECT MAX(score)
FROM player_match_details
WHERE year = 2014;`}
        />
      </>
    ),
    options: [
      "SELECT MAX(score) FROM player_match_details",
      "SELECT MAX(score) FROM player_match_details WHERE year = 2014",
      "SELECT MIN(score) FROM player_match_details WHERE year = 2014",
      "SELECT SUM(score) FROM player_match_details WHERE year = 2014",
    ],
    answer: "SELECT MAX(score) FROM player_match_details WHERE year = 2014",
  },

  {
    question: (
      <>
        Which query uses alias to name the total sixes as "sixes_hit"?
        <CodeBlock
          language="sql"
          code={`SELECT SUM(sixes) AS sixes_hit
FROM player_match_details;`}
        />
      </>
    ),
    options: [
      "SUM(sixes) sixes_hit",
      "SUM(sixes) = sixes_hit",
      "SUM(sixes) AS sixes_hit",
      "SUM(sixes) TO sixes_hit",
    ],
    answer: "SUM(sixes) AS sixes_hit",
  },

  {
    question: (
      <>
        Which query calculates the average score of "Ram" in 2011?
        <CodeBlock
          language="sql"
          code={`SELECT AVG(score)
FROM player_match_details
WHERE name = 'Ram' AND year = 2011;`}
        />
      </>
    ),
    options: [
      "WHERE name = 'Ram' OR year = 2011",
      "WHERE name = 'Ram' AND year = 2011",
      "WHERE year = 2011",
      "WHERE name = 'Ram'",
    ],
    answer: "WHERE name = 'Ram' AND year = 2011",
  },

  {
    question: (
      <>
        What happens when aggregate functions are applied only on NULL values?
      </>
    ),
    options: [
      "SUM returns 0",
      "AVG returns 0",
      "COUNT returns 0",
      "MIN returns 0",
    ],
    answer: "COUNT returns 0",
  },

  // ==================== 5 NORMAL QUESTIONS ====================

  {
    question: "Which function is used to count the number of rows?",
    options: ["SUM", "AVG", "COUNT", "MAX"],
    answer: "COUNT",
  },

  {
    question: "Which aggregate function ignores NULL values?",
    options: ["SUM", "AVG", "COUNT(column)", "All of the above"],
    answer: "All of the above",
  },

  {
    question: "What does AVG() calculate?",
    options: [
      "Total value",
      "Highest value",
      "Lowest value",
      "Average of values",
    ],
    answer: "Average of values",
  },

  {
    question: "Which keyword is used to give a temporary column name?",
    options: ["RENAME", "AS", "ALIAS", "TO"],
    answer: "AS",
  },

  {
    question: "What does COUNT(*) count?",
    options: [
      "Only non-NULL rows",
      "Only numeric rows",
      "All rows",
      "Only unique rows",
    ],
    answer: "All rows",
  },
];

const Aggregations_MCQ = ({ subtopicId, goalName, courseName, onComplete }) => {
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
      title="Aggregations | MCQs"
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

export default Aggregations_MCQ;
