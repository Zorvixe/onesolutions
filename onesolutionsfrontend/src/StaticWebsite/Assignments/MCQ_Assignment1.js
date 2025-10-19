import React, { useState, useEffect, useRef } from "react";

const MCQ_Assignment1 = () => {
  const originalQuestions = [
    // ---------- HTML Basics ----------
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "Hyperlink and Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinking Text Mark Language",
      ],
      answer: "HyperText Markup Language",
    },
    {
      question: "Which HTML tag is used for the largest heading?",
      options: ["<h1>", "<h6>", "<head>", "<heading>"],
      answer: "<h1>",
    },
    {
      question: "Which attribute is used to provide a unique identifier for an HTML element?",
      options: ["class", "id", "name", "key"],
      answer: "id",
    },
    {
      question: "Which tag is used to create a hyperlink in HTML?",
      options: ["<link>", "<a>", "<href>", "<hyper>"],
      answer: "<a>",
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      options: ["<break>", "<br>", "<lb>", "<hr>"],
      answer: "<br>",
    },
    // ---------- CSS Basics ----------
    {
      question: "Which CSS property controls the text color?",
      options: ["color", "font-color", "text-color", "foreground"],
      answer: "color",
    },
    {
      question: "How do you select an element with class 'example' in CSS?",
      options: [".example", "#example", "example", "*example"],
      answer: ".example",
    },
    {
      question: "Which CSS property is used to change the background color?",
      options: ["background-color", "bgcolor", "color", "background"],
      answer: "background-color",
    },
    {
      question: "What is the correct syntax to make all <p> elements have red text in CSS?",
      options: ["p {color:red;}", "<p style='color:red;'>", "{p:red;}", "p.color:red;"],
      answer: "p {color:red;}",
    },
    // ---------- CSS Box Model ----------
    {
      question: "What are the four parts of the CSS box model?",
      options: [
        "Content, Padding, Border, Margin",
        "Margin, Text, Border, Padding",
        "Content, Space, Outline, Margin",
        "Content, Border, Text, Margin",
      ],
      answer: "Content, Padding, Border, Margin",
    },
    {
      question: "Which property sets the space between the content and the border?",
      options: ["margin", "padding", "border-spacing", "spacing"],
      answer: "padding",
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
      <h3 className="mcq-title">Assignment 1 - MCQs</h3>
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

export default MCQ_Assignment1;
