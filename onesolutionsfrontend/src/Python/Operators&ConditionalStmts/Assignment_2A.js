"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CodingPracticeCss/CodingPractice.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";

const Assignment_2A = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Use Auth context for progress tracking
  const {
    codingPracticeProgress,
    loadProgressSummary,
    markSubtopicComplete,

    loadProgressSummary: refreshProgress,
  } = useAuth();

  const [selectedPractice, setSelectedPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [practiceCompletionStatus, setPracticeCompletionStatus] = useState({});

  // Get goalName and courseName from navigation state
  const {
    goalName: stateGoalName,
    courseName: stateCourseName,
    subtopicId: codingPracticeSubtopicId,
  } = location.state || {};

  const goalName = stateGoalName;
  const courseName = stateCourseName;
  const finalSubtopicId = codingPracticeSubtopicId;

  // Load practice data
  useEffect(() => {
    const practice = codingPracticesData.python.find(
      (p) => p.id === "Codingpractice-python-Assignment-2A"
    );

    if (practice) {
      setSelectedPractice(practice);
      console.log("📝 Loaded practice:", {
        practiceId: practice.id,
        goalName,
        courseName,
        subtopicId: finalSubtopicId,
      });
    }

    setLoading(false);
  }, [goalName, courseName, finalSubtopicId]);

  // Load progress data
  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setLoading(true);
        await loadProgressSummary();

        if (selectedPractice) {
          const completionStatus = {};

          for (const practice of codingPracticesData.python) {
            try {
              const response = await CodingPracticeService.getCompletionStatus(
                practice.id
              );

              completionStatus[practice.id] =
                response.success && response.data.isCompleted;
            } catch (error) {
              console.error(
                `Failed to check completion for ${practice.id}`,
                error
              );
              completionStatus[practice.id] = false;
            }
          }

          setPracticeCompletionStatus(completionStatus);
        }
      } catch (error) {
        console.error("Failed to load progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [selectedPractice, loadProgressSummary]);

  // Progress helpers
  const getQuestionStatus = useCallback(
    (id) => codingPracticeProgress[id]?.status || "unsolved",
    [codingPracticeProgress]
  );

  const getQuestionScore = useCallback(
    (id) => codingPracticeProgress[id]?.score || 0,
    [codingPracticeProgress]
  );

  const getQuestionAttempts = useCallback(
    (id) => {
      const progress = codingPracticeProgress[id];
      if (!progress) return [];

      return [
        {
          passed: progress.status === "solved",
          score: progress.score,
          timestamp: new Date().toISOString(),
        },
      ];
    },
    [codingPracticeProgress]
  );

  const isPracticeCompleted = useCallback(
    (practiceId) => practiceCompletionStatus[practiceId] || false,
    [practiceCompletionStatus]
  );

  const areAllQuestionsSolved = useCallback(
    (practice) =>
      practice?.questions?.every((q) => getQuestionStatus(q.id) === "solved") ||
      false,
    [getQuestionStatus]
  );

  // Auto-complete practice
  useEffect(() => {
    const autoCompletePractice = async () => {
      if (
        selectedPractice &&
        areAllQuestionsSolved(selectedPractice) &&
        !isPracticeCompleted(selectedPractice.id)
      ) {
        try {
          await CodingPracticeService.completePractice(
            selectedPractice.id,
            goalName,
            courseName
          );

          await markSubtopicComplete(finalSubtopicId, goalName, courseName);

          await refreshProgress();

          setPracticeCompletionStatus((prev) => ({
            ...prev,
            [selectedPractice.id]: true,
          }));
        } catch (error) {
          console.error("Failed to auto-complete practice:", error);
        }
      }
    };

    autoCompletePractice();
  }, [
    selectedPractice,
    areAllQuestionsSolved,
    isPracticeCompleted,
    markSubtopicComplete,
    refreshProgress,
    finalSubtopicId,
    goalName,
    courseName,
  ]);

  const handleQuestionSelect = (question) => {
    navigate(`/practice/${selectedPractice.id}/${question.id}`, {
      state: {
        subtopicId: finalSubtopicId,
        goalName,
        courseName,
      },
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  if (!selectedPractice) {
    return (
      <div className="cod-loader">
        <h3>Practice not found</h3>
      </div>
    );
  }

  const solvedCount = selectedPractice.questions.filter(
    (q) => getQuestionStatus(q.id) === "solved"
  ).length;

  return (
    <div className="coding-practice-container-cod">
      <div className="coding-header-cod">
        <h3>{selectedPractice.title}</h3>
        <p>{selectedPractice.description}</p>
        <p>
          {solvedCount} / {selectedPractice.questions.length} solved
        </p>
      </div>

      <table>
        <tbody>
          {selectedPractice.questions.map((question) => {
            const status = getQuestionStatus(question.id);
            const score = getQuestionScore(question.id);
            const attempts = getQuestionAttempts(question.id);
            const lastAttempt = attempts.at(-1);

            return (
              <tr
                key={question.id}
                onClick={() => handleQuestionSelect(question)}
              >
                <td>{status}</td>
                <td>{question.title}</td>
                <td>
                  {status === "solved"
                    ? `${score}/${question.score}`
                    : `0/${question.score}`}
                </td>
                <td>{lastAttempt ? "Attempted" : "Not attempted"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Assignment_2A;
