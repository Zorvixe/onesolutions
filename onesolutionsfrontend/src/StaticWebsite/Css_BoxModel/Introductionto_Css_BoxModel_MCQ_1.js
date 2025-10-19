import React, { useState, useEffect, useRef } from "react";

const Introductionto_Css_BoxModel_MCQ_1 = () => {
  const originalQuestions = [
    // ---------- Height ----------
    {
      question: "Which CSS Property specifies the height to an HTML element?",
      options: ["height", "width", "color", "background-color"],
      answer: "height",
    },
    // ---------- Width ----------
    {
      question: "Which CSS Property specifies the width to an HTML element?",
      options: ["height", "width", "color", "background-color"],
      answer: "width",
    },
    // ---------- Background Image ----------
    {
      question: "Which CSS Property specifies the background image of an HTML element?",
      options: ["background", "bg-image", "color", "background-image"],
      answer: "background-image",
    },
    // ---------- Background Size ----------
    {
      question: "Which value of background-size scales the image to cover the entire element while maintaining aspect ratio?",
      options: ["cover", "contain", "auto", "fit"],
      answer: "cover",
    },
    // ---------- Viewport Height ----------
    {
      question: "Which CSS unit equals to 1% of the height of the viewport (browser window size)?",
      options: ["px", "vh", "vw", "h"],
      answer: "vh",
    },
    // ---------- Viewport Width ----------
    {
      question: "Which CSS unit equals to 1% of the width of the viewport (browser window size)?",
      options: ["px", "vh", "vw", "w"],
      answer: "vw",
    },
    // ---------- Extra Box Model ----------
    {
      question: "If you don’t specify height for a background image, its height will be equal to?",
      options: ["Viewport height", "Content height", "100px", "100% of page"],
      answer: "Content height",
    },
    {
      question: "The height 100vh sets an HTML element to?",
      options: ["100 pixels", "Entire height of viewport", "100% of content", "Auto"],
      answer: "Entire height of viewport",
    },
    {
      question: "The width 100vw sets an HTML element to?",
      options: ["100 pixels", "Entire width of viewport", "100% of content", "Auto"],
      answer: "Entire width of viewport",
    },
    {
      question: "Which CSS property maintains aspect ratio while scaling a background image?",
      options: ["background-size", "background-image", "height", "width"],
      answer: "background-size",
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
      setTimeLeft(prev => {
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
      if (currentIndex + 1 < questions.length) setCurrentIndex(prev => prev + 1);
      else if (skippedQuestions.length > 0) {
        setShowingSkipped(true);
        setCurrentIndex(0);
      } else {
        setCompleted(true);
      }
    } else {
      if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex(prev => prev + 1);
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

  const getNextButtonLabel = () => {
    if (showingSkipped && currentIndex + 1 === skippedQuestions.length) return "Finish";
    if (!showingSkipped && currentIndex + 1 === questions.length && skippedQuestions.length === 0) return "Finish";
    return "Next";
  };

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">CSS Box Model & Background Properties Quiz</h3>

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
              {feedback.correct ? `✅ Correct! +${feedback.points}` : `❌ Wrong! -${Math.abs(feedback.points)}`}
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

export default Introductionto_Css_BoxModel_MCQ_1;
