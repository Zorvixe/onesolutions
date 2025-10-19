import React, { useState, useEffect, useRef } from "react";

const Bootstrap_Navbar_MCQ = () => {
  const originalQuestions = [
    {
      question: "Which HTML element is commonly used as a container for a Bootstrap Navbar?",
      options: ["div", "header", "nav", "section"],
      answer: "nav",
    },
    {
      question: "What happens to a Bootstrap Navbar on smaller devices?",
      options: [
        "It stays fixed in full size",
        "It collapses or extends depending on device size",
        "It disappears",
        "It changes color automatically",
      ],
      answer: "It collapses or extends depending on device size",
    },
    {
      question: "Which of the following are Block-level HTML elements?",
      options: ["h1, p, div", "span, a, img", "button, img, a", "input, label, br"],
      answer: "h1, p, div",
    },
    {
      question: "Which of the following are Inline HTML elements?",
      options: ["h1, p, div", "span, a, img", "section, article, div", "ul, li, nav"],
      answer: "span, a, img",
    },
    {
      question: "Which CSS property aligns a block-level element horizontally?",
      options: ["text-align", "float", "margin", "padding"],
      answer: "margin",
    },
    {
      question: "What does `margin: auto` do to a block-level element?",
      options: [
        "Centers the element horizontally inside its container",
        "Aligns the element to the left",
        "Aligns the element to the right",
        "Removes all margins",
      ],
      answer: "Centers the element horizontally inside its container",
    },
    {
      question: "Using `margin-left: auto` on a block-level element aligns it to the:",
      options: ["Left", "Right", "Center", "Top"],
      answer: "Right",
    },
    {
      question: "Using `margin-right: auto` on a block-level element aligns it to the:",
      options: ["Left", "Right", "Center", "Bottom"],
      answer: "Left",
    },
    {
      question: "Which Bootstrap class centers an element using auto margins?",
      options: ["m-auto", "p-auto", "text-center", "mx-auto"],
      answer: "m-auto",
    },
    {
      question: "Which is the correct order to build a Navbar step-by-step in Bootstrap?",
      options: [
        "Add Navbar, Align Nav Items, Add Logo, Change Background",
        "Add Navbar, Add Logo, Align Nav Items, Change Background",
        "Add Logo, Add Navbar, Change Background, Align Nav Items",
        "Change Background, Add Navbar, Add Logo, Align Nav Items",
      ],
      answer: "Add Navbar, Add Logo, Align Nav Items, Change Background",
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
      <h3 className="mcq-title">Bootstrap Navbar & Block/Inline Elements Quiz</h3>

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

export default Bootstrap_Navbar_MCQ;
