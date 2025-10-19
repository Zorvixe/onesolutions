import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Inheritance_Part1_MCQ = ({ onComplete }) => {
const questionsData = [
  {
    question: "What is Inheritance in Python?",
    options: [
      "A process of defining multiple classes in one file",
      "A process of creating a new class from an existing class",
      "A way to define variables inside a class",
      "A method to hide data from users"
    ],
    answer: "A process of creating a new class from an existing class"
  },
  {
    question: (
      <div>
        <p>Which keyword is used to inherit a class in Python?</p>
        <CodeBlock language="python" code={`class SubClass(BaseClass):\n    pass`} />
      </div>
    ),
    options: ["inherits", "extends", "super", "class SubClass(BaseClass)"],
    answer: "class SubClass(BaseClass)"
  },
  {
    question: "What is the superclass in inheritance?",
    options: [
      "The class which inherits",
      "The class being inherited from",
      "A built-in Python class",
      "A static class"
    ],
    answer: "The class being inherited from"
  },
  {
    question: (
      <div>
        <p>In the example <code>class ElectronicItem(Product):</code>, which is the parent class?</p>
        <CodeBlock language="python" code={`class ElectronicItem(Product):\n    pass`} />
      </div>
    ),
    options: ["ElectronicItem", "Product", "Both are parent", "None"],
    answer: "Product"
  },
  {
    question: "Which function is used to call the parent class constructor inside the subclass?",
    options: ["base()", "super()", "parent()", "inherit()"],
    answer: "super()"
  },
  {
    question: "What happens if the subclass does not have an `__init__` method?",
    options: [
      "The program crashes",
      "The parent class `__init__` method is automatically called",
      "No initialization happens",
      "It becomes an abstract class"
    ],
    answer: "The parent class `__init__` method is automatically called"
  },
  {
    question: "Which of the following statements is TRUE about inheritance?",
    options: [
      "Child class cannot use methods of the parent class",
      "Parent class cannot contain methods",
      "Child class inherits attributes and methods of the parent class",
      "Inheritance works only with built-in classes"
    ],
    answer: "Child class inherits attributes and methods of the parent class"
  },
  {
    question: "Which type of inheritance involves a class inheriting from multiple parent classes?",
    options: ["Single Inheritance", "Multiple Inheritance", "Multilevel Inheritance", "Hybrid Inheritance"],
    answer: "Multiple Inheritance"
  },
  {
    question: "What is the main advantage of using inheritance?",
    options: [
      "Increases redundancy in code",
      "Improves reusability and organization",
      "Makes the code slower",
      "Removes encapsulation"
    ],
    answer: "Improves reusability and organization"
  },
  {
    question: "What is the correct way to define a subclass in Python?",
    options: [
      "class Subclass inherits BaseClass:",
      "class Subclass[BaseClass]:",
      "class Subclass(BaseClass):",
      "class Subclass -> BaseClass:"
    ],
    answer: "class Subclass(BaseClass):"
  },
];

 const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const [questions] = useState(shuffleArray([...questionsData]));

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
      <h3 className="mcq-title">Inheritance Part1 - MCQs</h3>

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

export default Inheritance_Part1_MCQ;
