import React, { useState, useEffect, useRef } from "react";

const Introductionto_BootStrap_MCQ_1 = () => {
  const originalQuestions = [
    // ---------- Reusability of CSS ----------
    {
      question:
        "Can we write the CSS Ruleset once and use it for multiple HTML elements?",
      options: ["Yes", "No"],
      answer: "Yes",
    },
    // ---------- Multiple class names ----------
    {
      question:
        "What is the correct syntax to provide multiple class names as a value to the HTML class attribute?",
      options: [
        '<tag class="name1, name2, name3">',
        '<tag class="name1 name2 name3">',
        '<tag class=name1 name2 name3>',
        '<tag class="name1; name2; name3">',
      ],
      answer: '<tag class="name1 name2 name3">',
    },
    // ---------- Bootstrap ----------
    {
      question:
        "What is a wide range of predefined reusable code snippets written in HTML, CSS, and JavaScript called?",
      options: ["Bootstrap", "CSS Ruleset", "Attributes", "HTML Snippets"],
      answer: "Bootstrap",
    },
    // ---------- Bootstrap Button ----------
    {
      question: "Which Bootstrap class name is used to style the HTML button element?",
      options: ["button", "btn", "class", "style"],
      answer: "btn",
    },
    // ---------- Bootstrap Outline Button ----------
    {
      question:
        "Which class name is used in Bootstrap to create outline buttons without background color?",
      options: ["btn", "btn-outline", "btn-bg", "btn-light"],
      answer: "btn-outline",
    },
    // ---------- Bootstrap Text Color ----------
    {
      question:
        "Which of the following Bootstrap classes is used to apply colors to text?",
      options: ["text-color", "font-color", "text-primary", "color"],
      answer: "text-primary",
    },
    // ---------- Bootstrap Background Color ----------
    {
      question:
        "Which Bootstrap class name applies background colors to HTML elements?",
      options: ["bg-primary", "text-bg", "background", "color-bg"],
      answer: "bg-primary",
    },
    // ---------- Bootstrap Text Transform ----------
    {
      question:
        "Which Bootstrap class is used to apply uppercase transformation to text?",
      options: ["text-upper", "text-uppercase", "font-uppercase", "upper-text"],
      answer: "text-uppercase",
    },
    // ---------- Bootstrap Components ----------
    {
      question:
        "Which of the following is NOT a Bootstrap component?",
      options: ["card", "carousel", "alert-success", "image-slider"],
      answer: "image-slider",
    },
    // ---------- Warning ----------
    {
      question:
        "Using predefined Bootstrap class names as selectors in our CSS Ruleset may give?",
      options: [
        "Expected results",
        "Unexpected results",
        "No effect",
        "Compile-time error",
      ],
      answer: "Unexpected results",
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

export default Introductionto_BootStrap_MCQ_1;
