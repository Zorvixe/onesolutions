import React, { useState, useEffect, useRef } from "react";

const Followus_More_Styles_MCQ = () => { 
 const originalQuestions =  [
  {
    question: "Why do we use Font Awesome Icons along with Bootstrap?",
    options: [
      "Bootstrap icons are not responsive",
      "Bootstrap icons have limited choices",
      "Font Awesome is faster",
      "Bootstrap icons do not support color",
    ],
    answer: "Bootstrap icons have limited choices",
  },
  {
    question: "Where should the Font Awesome Icons Kit Code be added in an HTML document?",
    options: ["head element", "body element", "footer element", "script tag"],
    answer: "head element",
  },
  {
    question: "Which CSS property allows you to create circular corners?",
    options: ["border-radius", "border-style", "border-width", "border"],
    answer: "border-radius",
  },
  {
    question: "To get perfect circular corners, what should be equal?",
    options: [
      "Only border-radius",
      "Height and width",
      "Font size and width",
      "Margin and padding",
    ],
    answer: "Height and width",
  },
  {
    question: "Which attribute is used in Nav Item to navigate to a section?",
    options: ["class", "href", "src", "id"],
    answer: "href",
  },
  {
    question: "Which HTML attribute is added to the section to enable navigation?",
    options: ["id", "href", "src", "alt"],
    answer: "id",
  },
  {
    question: "What does the Bootstrap class name fixed-top do?",
    options: [
      "Fixes element to the top of the viewport",
      "Fixes element to the bottom of the viewport",
      "Fixes element in the center",
      "Scrolls element to top",
    ],
    answer: "Fixes element to the top of the viewport",
  },
  {
    question: "What does the Bootstrap class name fixed-bottom do?",
    options: [
      "Positions element at the top",
      "Positions element at the bottom",
      "Centers the element",
      "Removes position property",
    ],
    answer: "Positions element at the bottom",
  },
  {
    question: "What is the purpose of adding Font Awesome?",
    options: [
      "To use custom fonts",
      "To get access to more icons",
      "To reduce file size",
      "To make images circular",
    ],
    answer: "To get access to more icons",
  },
  {
    question: "Which tag is typically used to add icons with Font Awesome?",
    options: ["<img>", "<svg>", "<i>", "<span>"],
    answer: "<i>",
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
            <h3 className="mcq-title">Follows Us - MCQs</h3>
      
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

export default Followus_More_Styles_MCQ
