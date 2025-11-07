import React, { useState, useEffect, useRef } from "react";

const Introduction_Opp_MCQ2 = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>What does 'software softness' refer to?</p>
      </div>
    ),
    options: [
      "Ease of changing and updating the software",
      "Physical softness of the computer",
      "Low memory usage",
      "Execution speed"
    ],
    answer: "Ease of changing and updating the software",
  },
  {
    question: (
      <div>
        <p>Why is code readability important in software development?</p>
            </div>
    ),
    options: [
      "It improves execution speed",
      "It helps maintain and extend software easily",
      "It reduces memory usage",
      "It avoids using functions"
    ],
    answer: "It helps maintain and extend software easily",
  },
  {
    question: (
      <div>
        <p>What is the main purpose of Object-Oriented Programming?</p>
              </div>
    ),
    options: [
      "To write sequential code only",
      "To model software after real-life objects and their interactions",
      "To avoid using classes",
      "To use only procedural programming"
    ],
    answer: "To model software after real-life objects and their interactions",
  },
  {
    question: (
      <div>
        <p>Which of the following is a good practice when describing objects?</p>
              </div>
    ),
    options: [
      "Listing attributes randomly",
      "Organizing what an object has and what it can do",
      "Ignoring object behaviors",
      "Using only object names"
    ],
    answer: "Organizing what an object has and what it can do",
  },
  {
    question: (
      <div>
        <p>Why is maintainability crucial in software development?</p>
              </div>
    ),
    options: [
      "Because software is always used once",
      "Because software evolves with new features and fixes",
      "Because code never changes",
      "Because debugging is unnecessary"
    ],
    answer: "Because software evolves with new features and fixes",
  },
  {
    question: (
      <div>
        <p>Which of the following statements is TRUE about OOP?</p>
              </div>
    ),
    options: [
      "OOP models software as unrelated functions",
      "OOP models software based on real-life objects and interactions",
      "OOP avoids using classes",
      "OOP only focuses on memory optimization"
    ],
    answer: "OOP models software based on real-life objects and interactions",
  },
  {
    question: (
      <div>
        <p>What does organized description of objects help with?</p>
             </div>
    ),
    options: [
      "Clear separation of objects and grouping of their attributes and behaviors",
      "Increasing random bugs",
      "Making code less modular",
      "Confusing developers"
    ],
    answer: "Clear separation of objects and grouping of their attributes and behaviors",
  },
  {
    question: (
      <div>
        <p>Which of the following is NOT a key aspect of good software?</p>
             </div>
    ),
    options: [
      "Easy to understand",
      "Easy to maintain",
      "Hard to understand",
      "Easy to extend"
    ],
    answer: "Hard to understand",
  },
  {
    question: (
      <div>
        <p>Why is OOP recommended for long-term software projects?</p>
              </div>
    ),
    options: [
      "It automatically writes documentation",
      "It allows organized, reusable, and extendable code",
      "It avoids debugging",
      "It requires fewer programmers"
    ],
    answer: "It allows organized, reusable, and extendable code",
  },
  {
    question: (
      <div>
        <p>Which approach helps in modeling software effectively?</p>
              </div>
    ),
    options: [
      "Modeling after real-life objects",
      "Using only procedural code",
      "Avoiding classes and inheritance",
      "Random grouping of data"
    ],
    answer: "Modeling after real-life objects",
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
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
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
        if (onComplete) onComplete();
      }
    } else {
      if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex(prev => prev + 1);
      else {
        setCompleted(true);
        if (onComplete) onComplete();
      }
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

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">Introduction to Opps Part2 - MCQs</h3>

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
              <i
                className={`bi ${feedback.correct ? "bi-check-circle" : "bi-x-circle"}`}
                style={{ marginRight: "10px", fontSize: "20px" }}
              ></i>
              {feedback.correct ? `+${feedback.points}` : `-${Math.abs(feedback.points)}`}
            </div>
          )}

          <div className="mcq-buttons">
            <button
              className="mcq-next"
              disabled={!selectedAnswer}
              onClick={feedback ? nextQuestion : handleNext}
            >
              {showingSkipped && currentIndex + 1 === skippedQuestions.length
                ? "Finish"
                : !showingSkipped && currentIndex + 1 === questions.length && skippedQuestions.length === 0
                ? "Finish"
                : "Next"}
            </button>
            {!showingSkipped && (
              <button
                className="mcq-skip"
                onClick={handleSkip}
                disabled={feedback !== null}
              >
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

export default Introduction_Opp_MCQ2;
