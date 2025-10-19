import React, { useState, useEffect, useRef } from "react";

const Healthy_Delivary_Payments_MCQ = () => {
     const originalQuestions =  [
  {
    question: "Which Bootstrap class changes the visual order of flex items?",
    options: ["flex-order", "order-*", "position-*", "display-*"],
    answer: "order-*",
  },
  {
    question: "What is the valid range of numbers you can use with Bootstrap order classes?",
    options: ["0-5", "0-10", "0-12", "1-12"],
    answer: "0-12",
  },
  {
    question: "How can you make a flex item appear second only on medium screens?",
    options: ["order-2-md", "order-md-2", "order-2-md-auto", "order-md-auto-2"],
    answer: "order-md-2",
  },
  {
    question: "Which Bootstrap class hides an element on all screen sizes?",
    options: ["d-hide", "d-none", "d-all-none", "d-block-none"],
    answer: "d-none",
  },
  {
    question: "Which Bootstrap class hides an element only on small screens?",
    options: ["d-sm-none", "d-md-none", "d-lg-none", "d-xl-none"],
    answer: "d-sm-none",
  },
  {
    question: "Which Bootstrap class shows an element as inline only on medium screens?",
    options: ["d-md-inline", "d-inline-md", "d-md-block", "d-inline"],
    answer: "d-md-inline",
  },
  {
    question: "Which Bootstrap class shows an element as block on large screens?",
    options: ["d-lg-block", "d-block-lg", "d-md-block", "d-block"],
    answer: "d-lg-block",
  },
  {
    question: "In the Food Munch website, which section displays healthy food options?",
    options: ["Delivery & Payment Section", "Thanking Customers Section", "Healthy Food Section", "Home Banner Section"],
    answer: "Healthy Food Section",
  },
  {
    question: "Which section in the Food Munch website explains how customers pay for orders?",
    options: ["Healthy Food Section", "Delivery & Payment Section", "Thanking Customers Section", "Menu Section"],
    answer: "Delivery & Payment Section",
  },
  {
    question: "Which section in the Food Munch website expresses gratitude to customers?",
    options: ["Healthy Food Section", "Delivery & Payment Section", "Thanking Customers Section", "Order Summary Section"],
    answer: "Thanking Customers Section",
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
            <h3 className="mcq-title">Healthy Delivary Payments - MCQs</h3>
      
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

export default Healthy_Delivary_Payments_MCQ
