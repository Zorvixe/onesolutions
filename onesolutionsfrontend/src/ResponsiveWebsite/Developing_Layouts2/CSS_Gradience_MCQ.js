import React, { useState, useEffect, useRef } from "react";

const CSS_Gradience_MCQ = () => {
 const originalQuestions = [
  {
    question: "What is the purpose of a Bootstrap Modal?",
    options: [
      "To display alerts only",
      "To display content in a popup dialog box",
      "To create forms only",
      "To show tooltips",
    ],
    answer: "To display content in a popup dialog box",
  },
  {
    question: "Which part of the Modal typically contains the title?",
    options: [
      "Modal Body",
      "Modal Footer",
      "Modal Header",
      "Modal Container",
    ],
    answer: "Modal Header",
  },
  {
    question: "Which Bootstrap component is used to display a thank-you message in the website?",
    options: [
      "Navbar",
      "Modal",
      "Card",
      "Accordion",
    ],
    answer: "Modal",
  },
  {
    question: "What is a gradient?",
    options: [
      "A border effect",
      "A transition between two or more colors",
      "A shadow effect",
      "An image filter",
    ],
    answer: "A transition between two or more colors",
  },
  {
    question: "Which of the following is NOT a type of gradient?",
    options: [
      "Linear Gradient",
      "Radial Gradient",
      "Angular Gradient",
      "None of the above",
    ],
    answer: "Angular Gradient",
  },
  {
    question: "By default, in which direction does a linear gradient run?",
    options: [
      "Left to right",
      "Bottom to top",
      "Top to bottom",
      "Right to left",
    ],
    answer: "Top to bottom",
  },
  {
    question: "Which direction keyword is used to make a linear gradient transition from bottom to top?",
    options: [
      "to top",
      "to bottom",
      "to left",
      "to right",
    ],
    answer: "to top",
  },
  {
    question: "What is required to create a linear gradient?",
    options: [
      "At least one color",
      "At least two colors",
      "An image file",
      "A background border",
    ],
    answer: "At least two colors",
  },
  {
    question: "Which gradient type radiates colors from the center?",
    options: [
      "Linear Gradient",
      "Radial Gradient",
      "Diagonal Gradient",
      "Box Gradient",
    ],
    answer: "Radial Gradient",
  },
  {
    question: "Which CSS property is used to apply gradients?",
    options: [
      "background-image",
      "background-color",
      "color",
      "border",
    ],
    answer: "background-image",
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
            <h3 className="mcq-title">CSS Gradience - MCQs</h3>
      
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


export default CSS_Gradience_MCQ
