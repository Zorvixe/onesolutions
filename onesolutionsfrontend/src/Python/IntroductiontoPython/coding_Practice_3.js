"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CodingPractice.css";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";

const Coding_Practice_3 = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [selectedPractice, setSelectedPractice] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  // Load "Coding Practice - 1" from codingPracticesData
  useEffect(() => {
    const practice3 = codingPracticesData.python.find(
      (p) => p.id === "practice-python-3"
    );
    if (practice3) {
      setSelectedPractice(practice3);
    }

    // Load user progress from localStorage
    const savedProgress = localStorage.getItem("codingPracticeProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const getQuestionStatus = (questionId) => {
    return userProgress[questionId]?.status || "unsolved";
  };

  const getQuestionAttempts = (questionId) => {
    return userProgress[questionId]?.attempts || [];
  };

  const handleQuestionSelect = (question) => {
    navigate(`/practice/${selectedPractice.id}/${question.id}`);
  };

  if (!selectedPractice)
    return (
      <div className="loading-state-cod">
        <h3>Loading Coding Practice - 1...</h3>
      </div>
    );

  return (
    <div className="coding-practice-container-cod">
      {/* Header */}
      <div className="coding-header-cod">
        <div className="header-left-cod">
          <h3>{selectedPractice.title}</h3>

          <div className="practice-stats-cod">
            <p className="practice-description-cod">
              {selectedPractice.description}
            </p>
            <div className="practice-cod-right-header">
              <span className="total-questions-cod">
                {selectedPractice.questions.length} questions
              </span>
              <span className="solved-questions-cod">
                {
                  selectedPractice.questions.filter(
                    (q) => getQuestionStatus(q.id) === "solved"
                  ).length
                }{" "}
                solved
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="coding-practice-content-cod">
        {/* Questions List View */}
        <div className="questions-list-view-cod">
          <div className="questions-table-container-cod">
            <div className="questions-table-cod">
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Question</th>
                    <th>Difficulty</th>
                    <th>Score</th>
                    <th>Last Attempt</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPractice.questions.map((question) => {
                    const status = getQuestionStatus(question.id);
                    const attempts = getQuestionAttempts(question.id);
                    const lastAttempt =
                      attempts.length > 0
                        ? attempts[attempts.length - 1]
                        : null;

                    return (
                      <tr
                        key={question.id}
                        className={`question-row-cod ${
                          status === "solved"
                            ? "solved-cod"
                            : status === "attempted"
                            ? "attempted-cod"
                            : ""
                        }`}
                        onClick={() => handleQuestionSelect(question)}
                      >
                        <td className="status-cell-cod">
                          <span className={`status-indicator-cod ${status}`}>
                            {status === "solved"
                              ? "✓"
                              : status === "attempted"
                              ? "●"
                              : "○"}
                          </span>
                        </td>
                        <td className="question-title-cell-cod">
                          <div className="question-title-main-cod">
                            {question.title}
                          </div>
                          <div className="question-description-cod">
                            {question.description}
                          </div>
                        </td>
                        <td className="difficulty-cell-cod">
                          <span
                            className={`difficulty-badge-cod ${question.difficulty.toLowerCase()}`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="score-cell-cod">
                          {lastAttempt
                            ? `${lastAttempt.score}/${question.score}`
                            : `0/${question.score}`}{" "}
                          pts
                        </td>
                        <td className="attempts-cell-cod">
                          {lastAttempt ? (
                            <div className="attempts-info-cod">
                              <span className="attempts-count-cod">
                                {lastAttempt.passed ? "Passed" : "Failed"}
                              </span>
                              <span className="attempts-date-cod">
                                {new Date(
                                  lastAttempt.timestamp
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <span className="no-attempts-cod">
                              Not attempted
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coding_Practice_3;
