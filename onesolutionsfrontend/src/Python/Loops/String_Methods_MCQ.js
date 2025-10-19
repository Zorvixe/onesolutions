import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; // ✅ Import your CodeBlock

const String_Methods_MCQ = ({ onComplete }) => {
  const questionsData = [
    {
      question: (
        <>
          What is the output of the following code?
          <CodeBlock language="python" code={`s = "Python"\nprint(s[0:6:2])`} />
        </>
      ),
      options: ["Pto", "Ptn", "Ptoh", "Pthn"],
      answer: "Pto",
    },
    {
      question: "Which of the following is the correct syntax for extended slicing?",
      options: ["s[start:end-step]", "s[start:end,step]", "s[start:end:step]", "s(start:end:step)"],
      answer: "s[start:end:step]",
    },
    {
      question: (
        <>
          What is the output of the following code?
          <CodeBlock language="python" code={`s = "abcdef"\nprint(s[::2])`} />
        </>
      ),
      options: ["ace", "bdf", "abc", "def"],
      answer: "ace",
    },
    {
      question: "What does isdigit() return when used on '12345'?",
      options: ["'12345'", "True", "False", "Error"],
      answer: "True",
    },
    {
      question: (
        <>
          What is the output of the following code?
          <CodeBlock language="python" code={`s = "  Hello  "\nprint(s.strip())`} />
        </>
      ),
      options: ["'  Hello  '", "'Hello'", "'Hello  '", "'  Hello'"],
      answer: "'Hello'",
    },
    {
      question: (
        <>
          What will the following code output?
          <CodeBlock language="python" code={`print("abc123".isdigit())`} />
        </>
      ),
      options: ["True", "False", "abc123", "Error"],
      answer: "False",
    },
    {
      question: (
        <>
          What does the following code print?
          <CodeBlock language="python" code={`s = "hello"\nprint(s.upper())`} />
        </>
      ),
      options: ["hello", "HELLO", "error", "HeLLo"],
      answer: "HELLO",
    },
    {
      question: (
        <>
          What is the output of the following code?
          <CodeBlock language="python" code={`s = "welcome"\nprint(s.startswith("wel"))`} />
        </>
      ),
      options: ["False", "True", "wel", "Error"],
      answer: "True",
    },
    {
      question: (
        <>
          What is the output of the following code?
          <CodeBlock language="python" code={`s = "apple."\nprint(s.strip("."))`} />
        </>
      ),
      options: ["apple", ".apple.", "apple.", ".apple"],
      answer: "apple",
    },
    {
      question: (
        <>
          What is the output of the following code?
          <CodeBlock language="python" code={`s = "HELLO"\nprint(s.lower())`} />
        </>
      ),
      options: ["HELLO", "hello", "Hello", "hELLO"],
      answer: "hello",
    },
  ];

  // Shuffle questions
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
      } else setCompleted(true);
    } else {
      if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex((prev) => prev + 1);
      else setCompleted(true);
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
      <h3 className="mcq-title">String Methods - MCQs</h3>

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
            <div
              className={`mcq-feedback ${feedback.correct ? "correct" : "wrong"}`}
            >
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
        <div className="mcq-completed">
          <h4>✅ Quiz Completed!</h4>
          <p>
            Your Score: {score} / {questions.length * 10}
          </p>
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

export default String_Methods_MCQ;
