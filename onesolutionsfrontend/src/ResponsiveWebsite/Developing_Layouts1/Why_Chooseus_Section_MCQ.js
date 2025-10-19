import React, { useState, useEffect, useRef } from "react";

const Why_Chooseus_Section_MCQ = () => {
     const originalQuestions = [
  {
    question: "Which Bootstrap class is used to add padding to all sides of an element?",
    options: ["p-*", "pt-*", "pr-*", "pl-*"],
    answer: "p-*",
  },
  {
    question: "Which Bootstrap class adds padding to the top of an element?",
    options: ["p-*", "pt-*", "pb-*", "pl-*"],
    answer: "pt-*",
  },
  {
    question: "What is the pixel value of p-3 if the default spacer is 16px?",
    options: ["4px", "8px", "16px", "24px"],
    answer: "16px",
  },
  {
    question: "What is the pixel value of pt-4 if the default spacer is 16px?",
    options: ["16px", "24px", "32px", "48px"],
    answer: "24px",
  },
  {
    question: "What range of numbers can replace the asterisk (*) in Bootstrap spacing classes?",
    options: ["0-3", "0-4", "0-5", "1-5"],
    answer: "0-5",
  },
  {
    question: "Which CSS property do Bootstrap padding classes correspond to?",
    options: ["margin", "padding", "border", "width"],
    answer: "padding",
  },
  {
    question: "Which Bootstrap class adds padding to the right side of an element?",
    options: ["pr-*", "pl-*", "pb-*", "pt-*"],
    answer: "pr-*",
  },
  {
    question: "Which HTML element is a generic inline container mainly used for styling text?",
    options: ["div", "span", "section", "p"],
    answer: "span",
  },
  {
    question: "Bootstrap class pb-5 corresponds to which padding value if spacer = 16px?",
    options: ["16px", "24px", "48px", "80px"],
    answer: "48px",
  },
  {
    question: "Which of the following is TRUE about the HTML span element?",
    options: [
      "It is a block-level element",
      "It is an inline element",
      "It creates a line break",
      "It can contain other block elements",
    ],
    answer: "It is an inline element",
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
            <h3 className="mcq-title">Why Choose Us Section - MCQs</h3>
      
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

export default Why_Chooseus_Section_MCQ
