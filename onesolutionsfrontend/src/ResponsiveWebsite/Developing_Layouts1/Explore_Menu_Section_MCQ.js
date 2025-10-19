import React, { useState, useEffect, useRef } from "react";

const Explore_Menu_Section_MCQ = () => {
     const originalQuestions = [
  {
    question: "Which CSS unit defines the size of a child element relative to its parent?",
    options: ["px", "em", "%", "rem"],
    answer: "%",
  },
  {
    question: "Which Bootstrap class sets the width of an element to 25%?",
    options: ["w-25", "w-50", "w-75", "w-100"],
    answer: "w-25",
  },
  {
    question: "Which Bootstrap class sets the width of an element to 50%?",
    options: ["w-25", "w-50", "w-75", "w-100"],
    answer: "w-50",
  },
  {
    question: "When you change the width of an image using Bootstrap width classes, what happens to the height by default?",
    options: [
      "It stays the same",
      "It automatically adjusts",
      "It becomes zero",
      "It increases by 50%",
    ],
    answer: "It automatically adjusts",
  },
  {
    question: "Where can you find Bootstrap icons to use on your website?",
    options: [
      "https://getbootstrap.com/docs/icons",
      "https://icons.getbootstrap.com",
      "https://fontawesome.com/icons",
      "https://icons.bootstrap.io",
    ],
    answer: "https://icons.getbootstrap.com",
  },
  {
    question: "Which HTML element is used to add an inline SVG icon?",
    options: ["div", "img", "svg", "span"],
    answer: "svg",
  },
  {
    question: "Which Bootstrap class applies a small shadow to an element?",
    options: ["shadow-none", "shadow-sm", "shadow", "shadow-lg"],
    answer: "shadow-sm",
  },
  {
    question: "Which Bootstrap class applies a large shadow to an element?",
    options: ["shadow-none", "shadow-sm", "shadow", "shadow-lg"],
    answer: "shadow-lg",
  },
  {
    question: "Which Bootstrap class removes all shadows from an element?",
    options: ["shadow-none", "shadow-sm", "shadow", "shadow-lg"],
    answer: "shadow-none",
  },
  {
    question: "Which attribute can you modify in the SVG element to change the icon color?",
    options: ["width", "height", "fill", "class"],
    answer: "fill",
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
            <h3 className="mcq-title">Explore Menu Section - MCQs</h3>
      
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

export default Explore_Menu_Section_MCQ
