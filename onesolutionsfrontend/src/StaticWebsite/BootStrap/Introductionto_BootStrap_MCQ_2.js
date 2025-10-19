import React, { useState, useEffect, useRef } from "react";

const Introductionto_BootStrap_MCQ_2 = () => {
  const originalQuestions = [
    {
      question: "Which Bootstrap class name defines a Flexbox Container?",
      options: ["flex", "d-flex", "flexbox-container", "flexbox"],
      answer: "d-flex",
    },
    {
      question: "What are the direct HTML elements inside a Flexbox Container called?",
      options: ["Flex objects", "Flex items", "Flex blocks", "Containers"],
      answer: "Flex items",
    },
    {
      question: "Which of the following is true about the Flexbox Container?",
      options: [
        "d-flex defines a Flexbox Container",
        "Flexbox works without d-flex",
        "All elements automatically become flex items",
        "None of these",
      ],
      answer: "d-flex defines a Flexbox Container",
    },
    {
      question: "Which Bootstrap class name will move the flex items horizontally?",
      options: ["flex-vertical", "flex-horizontal", "flex-column", "flex-row"],
      answer: "flex-row",
    },
    {
      question: "Which Bootstrap class name will move the flex items vertically?",
      options: ["flex-down", "flex-up", "flex-row", "flex-column"],
      answer: "flex-column",
    },
    {
      question: "What is the default Flex Direction in Bootstrap Flexbox Container?",
      options: ["flex-column", "flex-row", "flex-start", "flex-default"],
      answer: "flex-row",
    },
    {
      question:
        "Which Bootstrap class aligns the flex items at the start of a Flexbox Container?",
      options: [
        "justify-content-center",
        "justify-content-end",
        "justify-content-start",
        "justify-content-between",
      ],
      answer: "justify-content-start",
    },
    {
      question:
        "Which Bootstrap class aligns the flex items at the center of a Flexbox Container?",
      options: [
        "justify-content-between",
        "justify-content-center",
        "justify-content-start",
        "justify-content-end",
      ],
      answer: "justify-content-center",
    },
    {
      question:
        "Which Bootstrap class aligns the flex items with equal space between them?",
      options: [
        "justify-content-around",
        "justify-content-between",
        "justify-content-center",
        "justify-content-start",
      ],
      answer: "justify-content-between",
    },
    {
      question:
        "In flex-row direction, 'justify-content-end' aligns items where?",
      options: [
        "At the top",
        "At the bottom",
        "To the right",
        "To the left",
      ],
      answer: "To the right",
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

  // Timer
  useEffect(() => {
    if (completed) return;
    setTimeLeft(10);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
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
      }
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

  const getNextButtonLabel = () => {
    if (showingSkipped && currentIndex + 1 === skippedQuestions.length) return "Finish";
    if (!showingSkipped && currentIndex + 1 === questions.length && skippedQuestions.length === 0)
      return "Finish";
    return "Next";
  };

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">Introduction to Bootstrap Quiz</h3>

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
              {feedback.correct
                ? `✅ Correct! +${feedback.points}`
                : `❌ Wrong! -${Math.abs(feedback.points)}`}
            </div>
          )}

          <div className="mcq-buttons">
            <button
              className="mcq-next"
              disabled={!selectedAnswer}
              onClick={feedback ? nextQuestion : handleNext}
            >
              {getNextButtonLabel()}
            </button>
            {!showingSkipped && (
              <button className="mcq-skip" onClick={handleSkip} disabled={feedback !== null}>
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

export default Introductionto_BootStrap_MCQ_2;
