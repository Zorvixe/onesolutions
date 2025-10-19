import React, { useState, useEffect, useRef } from "react";

const Bootstrap_Grid_Sys_MCQ_1 = () => {
  const originalQuestions = [
    {
      question: "What happens if you place more than 12 columns in a single Bootstrap row?",
      options: [
        "They overlap each other",
        "Extra columns wrap to the next line",
        "They are ignored",
        "Layout breaks completely",
      ],
      answer: "Extra columns wrap to the next line",
    },
    {
      question: "Which class prefix is used for extra small devices (<576px)?",
      options: ["col-", "col-sm-", "col-md-", "col-lg-"],
      answer: "col-",
    },
    {
      question: "Which class prefix is used for small devices (>=576px)?",
      options: ["col-", "col-sm-", "col-md-", "col-lg-"],
      answer: "col-sm-",
    },
    {
      question: "Which class prefix is used for medium devices (>=768px)?",
      options: ["col-", "col-sm-", "col-md-", "col-lg-"],
      answer: "col-md-",
    },
    {
      question: "Which class prefix is used for large devices (>=992px)?",
      options: ["col-", "col-sm-", "col-md-", "col-lg-"],
      answer: "col-lg-",
    },
    {
      question: "Which class prefix is used for extra large devices (>=1200px)?",
      options: ["col-", "col-sm-", "col-md-", "col-xl-"],
      answer: "col-xl-",
    },
    {
      question: "Bootstrap Grid System follows which design approach?",
      options: ["Desktop First", "Mobile First", "Tablet First", "Responsive Later"],
      answer: "Mobile First",
    },
    {
      question: "Can we combine multiple Bootstrap column classes for different breakpoints?",
      options: ["No, only one class allowed", "Yes, for each breakpoint", "Only for medium and large", "Only for extra large"],
      answer: "Yes, for each breakpoint",
    },
    {
      question: "Which of the following is a valid combination of column classes?",
      options: ["col-6 col-md-4", "col-4 col-5", "col-12 col-12 col-12", "col-sm-6 col-6 col-lg-3"],
      answer: "col-6 col-md-4",
    },
    {
      question: "In a mobile first approach, which layout should you design first?",
      options: ["Desktop version", "Tablet version", "Mobile version", "Large screen version"],
      answer: "Mobile version",
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
      <h3 className="mcq-title">Bootstrap Grid Column & Breakpoints Quiz</h3>

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

export default Bootstrap_Grid_Sys_MCQ_1;
