import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; 

const ComparingStrAndNamingVar_MCQ = ({ onComplete }) => {
 
const questionsData = [
  {
    question: "What does the ord() function return in Python?",
    options: [
      "ASCII value of a character",
      "Unicode value of a character",
      "Binary value of a character",
      "Hexadecimal value of a character",
    ],
    answer: "Unicode value of a character",
  },
  {
    question: "What will be the output of chr(65)?",
    options: ["65", "A", "a", "Error"],
    answer: "A",
  },
  {
    question: "Which Unicode range corresponds to digits (0–9)?",
    options: ["65–90", "48–57", "97–122", "32–47"],
    answer: "48–57",
  },
  {
    question: (
      <div>
        <p>What will be the output of this code?</p>
        <CodeBlock
          language="python"
          code={`print('A' < 'B')`}
        />
      </div>
    ),
    options: ["True", "False", "Error", "None"],
    answer: "True",
  },
  {
    question: (
      <div>
        <p>In Python, how are strings compared?</p>
        <CodeBlock
          language="python"
          code={`s1 = "apple"\ns2 = "banana"\nprint(s1 < s2)`}
        />
      </div>
    ),
    options: [
      "By string length only",
      "By character count",
      "By Unicode values character by character",
      "Randomly",
    ],
    answer: "By Unicode values character by character",
  },
  {
    question: (
      <div>
        <p>Which of the following is a valid variable name?</p>
        <CodeBlock
          language="python"
          code={`total_bill = 100\nprint(total_bill)`}
        />
      </div>
    ),
    options: ["total bill", "total_bill", "total-bill", "123bill"],
    answer: "total_bill",
  },
  {
    question: (
      <div>
        <p>Which of the following CANNOT be used as a variable name?</p>
        <CodeBlock
          language="python"
          code={`str = 10\nprint(str)`}
        />
      </div>
    ),
    options: ["total", "str", "value_1", "_count"],
    answer: "str",
  },
  {
    question: (
      <div>
        <p>Which case style is preferred for naming variables in Python?</p>
        <CodeBlock
          language="python"
          code={`snake_case_variable = 5`}
        />
      </div>
    ),
    options: ["CamelCase", "PascalCase", "Snake_case", "Kebab-case"],
    answer: "Snake_case",
  },
  {
    question: (
      <div>
        <p>Which of the following is NOT a valid variable starting character?</p>
        <CodeBlock
          language="python"
          code={`5var = 10\nprint(5var)`}
        />
      </div>
    ),
    options: ["A", "_", "a", "5"],
    answer: "5",
  },
  {
    question: (
      <div>
        <p>What does keyword.kwlist in Python return?</p>
        <CodeBlock
          language="python"
          code={`import keyword\nprint(keyword.kwlist)`}
        />
      </div>
    ),
    options: [
      "List of all variable names",
      "List of all reserved keywords",
      "List of all functions",
      "List of all operators",
    ],
    answer: "List of all reserved keywords",
  },
];
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const [questions] = useState(shuffleArray([...questionsData]));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [showingSkipped, setShowingSkipped] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (completed) return;
    setTimeLeft(10);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, completed]);

  const nextQuestion = () => {
    clearInterval(timerRef.current);
    setSelectedAnswer(null);
    setFeedback(null);

    if (!showingSkipped) {
      if (currentIndex + 1 < questions.length) setCurrentIndex(prev => prev + 1);
      else if (skippedQuestions.length > 0) {
        setShowingSkipped(true);
        setCurrentIndex(0);
      } else {
        setCompleted(true);
        if(onComplete) onComplete();
      }
    } else {
      if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex(prev => prev + 1);
      else {
        setCompleted(true);
        if(onComplete) onComplete();
      }
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentQuestion = showingSkipped
      ? questions[skippedQuestions[currentIndex]]
      : questions[currentIndex];

    const isCorrect = selectedAnswer === currentQuestion.answer;

    let points = 0;
    if (isCorrect) points = timeLeft > 0 ? 10 : 7;
    else points = -5;

    setScore(prev => prev + points);
    setFeedback({ correct: isCorrect, points });
  };

  const handleSkip = () => {
    if (!showingSkipped) setSkippedQuestions(prev => [...prev, currentIndex]);
    nextQuestion();
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = showingSkipped
    ? questions[skippedQuestions[currentIndex]]
    : questions[currentIndex];

  const questionNumber = showingSkipped
    ? questions.length - skippedQuestions.length + currentIndex + 1
    : currentIndex + 1;

  const percentage = (score / (questions.length * 10)) * 100;

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">Comparing Strings & Naming Variables - MCQs</h3>

      {!completed ? (
        <div className="mcq-question-block">
          <p className="mcq-question">
            Q{questionNumber}. {currentQuestion.question}
          </p>

          <ul className="mcq-options">
            {currentQuestion.options.map(option => (
              <li key={option} className="mcq-option">
                <label>
                  <input
                    type="radio"
                    name={`q${currentIndex}`}
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={e => setSelectedAnswer(e.target.value)}
                    disabled={feedback !== null}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>

          {feedback && (
            <div className={`mcq-feedback ${feedback.correct ? "correct" : "wrong"}`}>
              <i
                className={`bi ${feedback.correct ? "bi-check-circle" : "bi-x-circle"}`}
                style={{ marginRight: "10px", fontSize: "20px" }}
              ></i>
              {feedback.correct ? `+${feedback.points}` : `-${Math.abs(feedback.points)}`}
            </div>
          )}

          <div className="mcq-buttons">
            <button
              className="mcq-next"
              disabled={!selectedAnswer}
              onClick={feedback ? nextQuestion : handleNext}
            >
              {showingSkipped && currentIndex + 1 === skippedQuestions.length
                ? "Finish"
                : !showingSkipped && currentIndex + 1 === questions.length && skippedQuestions.length === 0
                ? "Finish"
                : "Next"}
            </button>
            {!showingSkipped && (
              <button
                className="mcq-skip"
                onClick={handleSkip}
                disabled={feedback !== null}
              >
                Skip
              </button>
            )}
          </div>

          <div className={`mcq-timer ${timeLeft === 0 ? "time-over" : ""}`}>
            Time Left: {timeLeft} sec
          </div>
        </div>
      ) : (
        <div className="mcq-completed">
          <h4>✅ Quiz Completed!</h4>
          <p>Your Score: {score} / {questions.length * 10}</p>
          <p className="score-feedback">
            {percentage < 50
              ? "Poor performance. You need to improve!"
              : percentage <= 80
              ? "Good performance. Keep practicing!"
              : "Excellent performance. Well done!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparingStrAndNamingVar_MCQ;
