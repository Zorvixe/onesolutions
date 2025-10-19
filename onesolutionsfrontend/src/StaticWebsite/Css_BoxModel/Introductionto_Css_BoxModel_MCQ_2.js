import React, { useState, useEffect, useRef } from "react";

const Introductionto_Css_BoxModel_MCQ_2 = () => {
  const originalQuestions = [
    // ---------- Border Width ----------
    {
      question: "Which CSS Property can be used to set the border thickness of an HTML element?",
      options: ["height", "border-width", "width", "border"],
      answer: "border-width",
    },
    // ---------- Border Radius ----------
    {
      question: "Which CSS Property is used to round the bottom left corner of an HTML element?",
      options: ["left-bottom-border-radius", "border-bottom-left-radius", "border-bottom-top-radius", "border-bottom-right-radius"],
      answer: "border-bottom-left-radius",
    },
    // ---------- Border Color ----------
    {
      question: "Which CSS Property specifies the color for all the four borders of an HTML element?",
      options: ["border-color", "border-width", "color", "background-color"],
      answer: "border-color",
    },
    // ---------- Border Style ----------
    {
      question: "Which CSS Property specifies the style for all the four borders of an HTML element?",
      options: ["border-color", "border", "style", "border-style"],
      answer: "border-style",
    },
    // ---------- Padding ----------
    {
      question: "Which of the following statements is true regarding the CSS Box Model?",
      options: [
        "Padding is the border surrounding the content of an HTML element.",
        "Padding is the background surrounding the content of an HTML element.",
        "Padding is the space surrounding the content of an HTML element.",
        "Padding is the border color of the content of an HTML element."
      ],
      answer: "Padding is the space surrounding the content of an HTML element.",
    },
    // ---------- Hex Color ----------
    {
      question: "Which of the following is the hex code for blue?",
      options: ["#ffa500", "#ff0000", "#0000ff", "#008000"],
      answer: "#0000ff",
    },
    {
      question: "Which of the following is the hex code for green?",
      options: ["#ffa500", "#ff0000", "#0000ff", "#008000"],
      answer: "#008000",
    },
    {
      question: "Which of the following is the hex code for orange?",
      options: ["#ffa500", "#ff0000", "#0000ff", "#008000"],
      answer: "#ffa500",
    },
    {
      question: "CSS border-width: 0px; will do what?",
      options: [
        "Set border thickness to default",
        "Remove the border of an HTML element",
        "Add a thin border",
        "Add a dotted border"
      ],
      answer: "Remove the border of an HTML element",
    },
    {
      question: "Specifying which CSS property is mandatory for border properties to appear?",
      options: ["border-style", "border-width", "border-color", "border-radius"],
      answer: "border-style",
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
      <h3 className="mcq-title">CSS Box Properties & Colors Quiz</h3>

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

export default Introductionto_Css_BoxModel_MCQ_2;
