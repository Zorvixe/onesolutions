import React, { useState, useEffect, useRef } from "react";

const Css_Specificity_Cascade_MCQ = () => {
   const originalQuestions =  [
  {
    question: "Which CSS selector has the lowest specificity?",
    options: ["Class selector", "ID selector", "Type (tag) selector", "Inline style"],
    answer: "Type (tag) selector",
  },
  {
    question: "Which CSS selector is more specific: a class selector or a type selector?",
    options: ["Class selector", "Type selector", "Both are equal", "Cannot determine"],
    answer: "Class selector",
  },
  {
    question: "Which CSS selector has higher specificity: class selector or ID selector?",
    options: ["Class selector", "ID selector", "Both are equal", "Depends on order in CSS"],
    answer: "ID selector",
  },
  {
    question: "Which type of CSS style has the highest specificity?",
    options: ["Class selector", "ID selector", "Inline style", "Type selector"],
    answer: "Inline style",
  },
  {
    question: "Why is using inline styles not recommended?",
    options: [
      "They are difficult to read",
      "They cannot be reused",
      "They reduce separation of concerns",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "When two CSS rules have equal specificity, which one is applied?",
    options: [
      "The one that appears first in the CSS",
      "The one that appears last in the CSS",
      "The one with more properties",
      "The one with fewer properties",
    ],
    answer: "The one that appears last in the CSS",
  },
  {
    question: "Does the order of classes in the HTML class attribute affect which style is applied?",
    options: ["Yes, always", "No, order in CSS matters", "Yes, if class names are long", "Cannot determine"],
    answer: "No, order in CSS matters",
  },
  {
    question: "What does the !important declaration do?",
    options: [
      "Removes all other styles",
      "Makes a CSS property and value most specific, overriding others",
      "Applies only to inline styles",
      "Makes styles optional",
    ],
    answer: "Makes a CSS property and value most specific, overriding others",
  },
  {
    question: "How can you override a CSS property marked as !important?",
    options: [
      "Using another !important property later in CSS",
      "Using a type selector",
      "Changing the HTML element",
      "Using a class selector before the original rule",
    ],
    answer: "Using another !important property later in CSS",
  },
  {
    question: "Which of the following is the correct order of specificity from lowest to highest?",
    options: [
      "ID selector < Class selector < Type selector",
      "Type selector < Class selector < ID selector < Inline style",
      "Class selector < Type selector < Inline style < ID selector",
      "Inline style < ID selector < Class selector < Type selector",
    ],
    answer: "Type selector < Class selector < ID selector < Inline style",
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
          <h3 className="mcq-title">Css Specificity Cascade - MCQs</h3>
    
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
    

export default Css_Specificity_Cascade_MCQ
