import React, { useState, useEffect, useRef } from "react";

const MCQ_Assignment3 = () => {
  const originalQuestions = [
    // ---------- HTML Media ----------
    {
      question: "Which tag is used to embed a video in HTML?",
      options: ["<video>", "<media>", "<movie>", "<embed>"],
      answer: "<video>",
    },
    {
      question: "Which attribute is used to specify the video file path in the <video> tag?",
      options: ["src", "href", "file", "path"],
      answer: "src",
    },
    {
      question: "Which attribute makes a video play automatically when the page loads?",
      options: ["autoplay", "play", "start", "auto"],
      answer: "autoplay",
    },
    {
      question: "Which tag is used to embed audio in HTML?",
      options: ["<audio>", "<sound>", "<music>", "<voice>"],
      answer: "<audio>",
    },
    {
      question: "Which attribute allows you to add multiple audio sources in the <audio> tag?",
      options: ["src", "type", "controls", "source"],
      answer: "src",
    },
    // ---------- HTML Semantic Tags ----------
    {
      question: "Which HTML5 element represents navigation links?",
      options: ["<nav>", "<menu>", "<header>", "<footer>"],
      answer: "<nav>",
    },
    {
      question: "Which HTML5 element is used for the main content of a page?",
      options: ["<main>", "<section>", "<article>", "<div>"],
      answer: "<main>",
    },
    {
      question: "Which tag is used to define independent content in HTML5?",
      options: ["<article>", "<section>", "<aside>", "<div>"],
      answer: "<article>",
    },
    {
      question: "Which tag is used for content related to the main content but not essential?",
      options: ["<aside>", "<section>", "<footer>", "<article>"],
      answer: "<aside>",
    },
    {
      question: "Which HTML element is used for page footer content?",
      options: ["<footer>", "<bottom>", "<end>", "<section>"],
      answer: "<footer>",
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
    let points = isCorrect ? (timeLeft > 0 ? 10 : 7) : -5;
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
      <h3 className="mcq-title">Assignment 3 - MCQs</h3>
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

export default MCQ_Assignment3;
