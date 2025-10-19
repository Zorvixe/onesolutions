import React, { useState, useEffect, useRef } from "react";

const Bootstrap_Grid_Sys_MCQ_2 = () => {
  const originalQuestions = [
    {
      question: "Which CSS property is used to get space between two HTML elements?",
      options: ["padding", "margin", "spacing", "border-spacing"],
      answer: "margin",
    },
    {
      question: "Which margin variant sets space only on the top side of an element?",
      options: ["margin-top", "mt", "margin-t", "m-top"],
      answer: "margin-top",
    },
    {
      question: "Which Bootstrap class sets margin on all sides of an element?",
      options: ["m-*", "p-*", "mt-*", "mb-*"],
      answer: "m-*",
    },
    {
      question: "Bootstrap class 'mt-3' means:",
      options: [
        "Margin top = 3px",
        "Margin top = 1 * spacer",
        "Margin top = 16px",
        "Margin top = 0.25 * spacer",
      ],
      answer: "Margin top = 1 * spacer",
    },
    {
      question: "Bootstrap spacer variable has a default value of:",
      options: ["8px", "12px", "16px", "24px"],
      answer: "16px",
    },
    {
      question: "Which CSS property is used to get space inside an element?",
      options: ["margin", "padding", "spacing", "border-spacing"],
      answer: "padding",
    },
    {
      question: "Bootstrap class 'p-4' means:",
      options: [
        "Padding = 4px",
        "Padding = 1 * spacer",
        "Padding = 1.5 * spacer",
        "Padding = 3 * spacer",
      ],
      answer: "Padding = 1.5 * spacer",
    },
    {
      question: "Which Bootstrap class sets padding on the left side of an element?",
      options: ["pl-*", "pr-*", "pt-*", "pb-*"],
      answer: "pl-*",
    },
    {
      question: "Which Bootstrap class sets background color to an element?",
      options: ["bg-*", "bcolor-*", "color-*", "background-*"],
      answer: "bg-*",
    },
    {
      question: "Why should you avoid using CSS margin-left or margin-right on Bootstrap grid columns?",
      options: [
        "It has no effect",
        "It disturbs the grid system and gives unexpected results",
        "It is slower in rendering",
        "It only works on small devices",
      ],
      answer: "It disturbs the grid system and gives unexpected results",
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
      <h3 className="mcq-title">Bootstrap CSS Box & Spacing Utilities Quiz</h3>

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

export default Bootstrap_Grid_Sys_MCQ_2;
