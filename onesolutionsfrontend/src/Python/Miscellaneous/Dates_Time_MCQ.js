import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Dates_Time_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>Which Python module is used to work with dates and times?</p>
        <CodeBlock language="python" code={`import datetime`} />
      </div>
    ),
    options: ["time", "datetime", "calendar", "os"],
    answer: "datetime",
  },
  {
    question: (
      <div>
        <p>Which function gives the current date and time?</p>
        <CodeBlock language="python" code={`datetime.now()`} />
      </div>
    ),
    options: ["datetime.today()", "datetime.now()", "datetime.current()", "datetime.time()"],
    answer: "datetime.now()",
  },
  {
    question: (
      <div>
        <p>What method is used to format a datetime object as a string?</p>
        <CodeBlock language="python" code={`dt.strftime("%Y-%m-%d %H:%M:%S")`} />
      </div>
    ),
    options: ["strftime()", "strptime()", "format()", "parse()"],
    answer: "strftime()",
  },
  {
    question: (
      <div>
        <p>What does <code>strptime()</code> do?</p>
        <CodeBlock language="python" code={`datetime.strptime("27-09-2025", "%d-%m-%Y")`} />
      </div>
    ),
    options: [
      "Formats a datetime object as string",
      "Parses a string into a datetime object",
      "Returns current date",
      "Creates a timedelta"
    ],
    answer: "Parses a string into a datetime object",
  },
  {
    question: (
      <div>
        <p>Which class is used for date arithmetic?</p>
        <CodeBlock language="python" code={`from datetime import timedelta`} />
      </div>
    ),
    options: ["time", "date", "timedelta", "calendar"],
    answer: "timedelta",
  },
  {
    question: (
      <div>
        <p>How do you add 5 days to the current datetime?</p>
        <CodeBlock language="python" code={`from datetime import datetime, timedelta\ndatetime.now() + timedelta(days=5)`} />
      </div>
    ),
    options: [
      "datetime.now() + 5",
      "datetime.now() + timedelta(days=5)",
      "datetime.now() + date(5)",
      "datetime.now() + time(5)"
    ],
    answer: "datetime.now() + timedelta(days=5)",
  },
  {
    question: (
      <div>
        <p>Which format code represents a 4-digit year in <code>strftime</code>?</p>
        <CodeBlock language="python" code={`%Y`} />
      </div>
    ),
    options: ["%Y", "%y", "%m", "%d"],
    answer: "%Y",
  },
  {
    question: (
      <div>
        <p>Which format code represents month as zero-padded decimal?</p>
        <CodeBlock language="python" code={`%m`} />
      </div>
    ),
    options: ["%M", "%m", "%d", "%H"],
    answer: "%m",
  },
  {
    question: (
      <div>
        <p>What will <code>datetime.strptime('27-09-2025','%d-%m-%Y')</code> return?</p>
        <CodeBlock language="python" code={`datetime.strptime('27-09-2025','%d-%m-%Y')`} />
      </div>
    ),
    options: ["A string", "A datetime object", "An int", "A list"],
    answer: "A datetime object",
  },
  {
    question: (
      <div>
        <p>Which of the following gives the date 3 hours from now?</p>
        <CodeBlock language="python" code={`datetime.now() + timedelta(hours=3)`} />
      </div>
    ),
    options: [
      "datetime.now() + timedelta(hours=3)",
      "datetime.now() + 3",
      "datetime.now().add(hours=3)",
      "datetime.now() + time(3)"
    ],
    answer: "datetime.now() + timedelta(hours=3)",
  },
];

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const [questions] = useState(shuffleArray([...originalQuestions]));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [showingSkipped, setShowingSkipped] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (completed) return;
    setTimeLeft(10);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, completed]);

  const nextQuestion = () => {
    clearInterval(timerRef.current);
    setSelectedAnswer(null);
    setFeedback(null);

    if (!showingSkipped) {
      if (currentIndex + 1 < questions.length) setCurrentIndex((prev) => prev + 1);
      else if (skippedQuestions.length > 0) {
        setShowingSkipped(true);
        setCurrentIndex(0);
      } else {
        setCompleted(true);
        if (onComplete) onComplete();
      }
    } else {
      if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex((prev) => prev + 1);
      else {
        setCompleted(true);
        if (onComplete) onComplete();
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

    setScore((prev) => prev + points);
    setFeedback({ correct: isCorrect, points });
  };

  const handleSkip = () => {
    if (!showingSkipped) setSkippedQuestions((prev) => [...prev, currentIndex]);
    nextQuestion();
  };

  const currentQuestion = showingSkipped
    ? questions[skippedQuestions[currentIndex]]
    : questions[currentIndex];

  const questionNumber = showingSkipped
    ? questions.length - skippedQuestions.length + currentIndex + 1
    : currentIndex + 1;

  const percentage = (score / (questions.length * 10)) * 100;

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">Dates & Time - MCQs</h3>

      {!completed ? (
        <div className="mcq-question-block">
          <p className="mcq-question">
            Q{questionNumber}. {currentQuestion.question}
          </p>

          <ul className="mcq-options">
            {currentQuestion.options.map((option) => (
              <li key={option} className="mcq-option">
                <label>
                  <input
                    type="radio"
                    name={`q${currentIndex}`}
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
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
              {feedback.correct
                ? `+${feedback.points}`
                : `-${Math.abs(feedback.points)}`}
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
        <div className="mcq-completed shadow">
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

export default Dates_Time_MCQ;
