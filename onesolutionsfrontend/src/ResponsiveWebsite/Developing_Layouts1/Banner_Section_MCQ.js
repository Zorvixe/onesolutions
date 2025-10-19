import React, { useState, useEffect, useRef } from "react";

const Banner_Section_MCQ = () => {
     const originalQuestions = [
  {
    question: "Which Bootstrap class provides a fixed-width container with responsive paddings?",
    options: ["container", "container-fluid", "container-fixed", "container-responsive"],
    answer: "container",
  },
  {
    question: "Which Bootstrap class spans the entire width of the viewport?",
    options: ["container", "container-fluid", "container-full", "container-wide"],
    answer: "container-fluid",
  },
  {
    question: "What is the maximum width of a Bootstrap container on a medium device (>=768px)?",
    options: ["540px", "720px", "960px", "1140px"],
    answer: "720px",
  },
  {
    question: "Which Bootstrap component is used to create a responsive navigation bar?",
    options: ["Navbar", "Container", "Card", "Dropdown"],
    answer: "Navbar",
  },
  {
    question: "Does a Bootstrap container-fluid have left and right spacing by default?",
    options: ["Yes", "No", "Only on large screens", "Depends on CSS"],
    answer: "No",
  },
  {
    question: "Which CSS keyword makes an element fully transparent?",
    options: ["transparent", "none", "opacity", "invisible"],
    answer: "transparent",
  },
  {
    question: "Which Bootstrap class sets the background color of an element to fully transparent?",
    options: ["bg-transparent", "bg-none", "bg-clear", "bg-opacity-0"],
    answer: "bg-transparent",
  },
  {
    question: "For extra small devices (<576px), what is the max width of a Bootstrap container?",
    options: ["100%", "540px", "720px", "960px"],
    answer: "100%",
  },
  {
    question: "Bootstrap Navbar code without a list-based approach is placed inside which HTML element?",
    options: ["<header>", "<body>", "<nav>", "<div>"],
    answer: "<body>",
  },
  {
    question: "Which of the following is TRUE about Bootstrap containers?",
    options: [
      "container-fluid spans full width, container has fixed max-width per breakpoint",
      "container spans full width, container-fluid has fixed width",
      "Both container and container-fluid have fixed width",
      "Both container and container-fluid span full width",
    ],
    answer: "container-fluid spans full width, container has fixed max-width per breakpoint",
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
            <h3 className="mcq-title">Banner Section - MCQs</h3>
      
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

export default Banner_Section_MCQ
