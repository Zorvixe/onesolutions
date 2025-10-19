import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Inheritance_Part2_MCQ = ({ onComplete }) => {
  const questionsData = [
  {
    question: (
      <div>
        <p>What is composition in Python OOP?</p>
        <CodeBlock language="python" code={`class Order:\n    def __init__(self, order_id, products):\n        self.products = products`} />
      </div>
    ),
    options: [
      "Creating a subclass from a superclass",
      "Using objects of one class inside another class",
      "Overriding methods of a superclass",
      "Defining class variables"
    ],
    answer: "Using objects of one class inside another class",
  },
  {
    question: (
      <div>
        <p>In the statement 'Order has Product', what type of relationship is this?</p>
      </div>
    ),
    options: ["IS-A", "HAS-A", "CAN-DO", "DOES-A"],
    answer: "HAS-A",
  },
  {
    question: (
      <div>
        <p>What is method overriding?</p>
        <CodeBlock language="python" code={`class Product:\n    def display_product_details(self):\n        print("Generic Product")\n\nclass ElectronicItem(Product):\n    def display_product_details(self):\n        print("Electronic Item")`} />
      </div>
    ),
    options: [
      "Writing multiple methods with same name but different parameters in one class",
      "Defining a method in subclass with the same name as in superclass to change its behavior",
      "Deleting a method from superclass",
      "Calling a method multiple times"
    ],
    answer: "Defining a method in subclass with the same name as in superclass to change its behavior",
  },
  {
    question: (
      <div>
        <p>Which function allows calling the superclass method from a subclass?</p>
        <CodeBlock language="python" code={`super().display_product_details()`} />
      </div>
    ),
    options: ["super()", "base()", "parent()", "extends()"],
    answer: "super()",
  },
  {
    question: (
      <div>
        <p>What happens if a subclass defines a method with the same name as its superclass?</p>
      </div>
    ),
    options: [
      "The subclass method overrides the superclass method",
      "Both methods are executed",
      "The superclass method gets deleted",
      "It raises an error"
    ],
    answer: "The subclass method overrides the superclass method",
  },
  {
    question: (
      <div>
        <p>What is multi-level inheritance?</p>
        <CodeBlock language="python" code={`class SpecialElectronic(ElectronicItem):\n    pass`} />
      </div>
    ),
    options: [
      "A class inheriting from multiple base classes",
      "A class inheriting from a subclass forming a chain",
      "A class having multiple constructors",
      "A class without a parent class"
    ],
    answer: "A class inheriting from a subclass forming a chain",
  },
  {
    question: (
      <div>
        <p>Which of the following correctly defines multi-level inheritance?</p>
        <CodeBlock language="python" code={`class C(B):\n    pass\nclass B(A):\n    pass`} />
      </div>
    ),
    options: [
      "class C(A, B):",
      "class C(B): and class B(A):",
      "class A(B, C):",
      "class A inherits B and C"
    ],
    answer: "class C(B): and class B(A):",
  },
  {
    question: (
      <div>
        <p>When should inheritance be used over composition?</p>
      </div>
    ),
    options: [
      "When classes have a HAS-A relationship",
      "When classes have an IS-A relationship",
      "When one class uses another class only internally",
      "Always use composition instead"
    ],
    answer: "When classes have an IS-A relationship",
  },
  {
    question: (
      <div>
        <p>When should composition be preferred over inheritance?</p>
      </div>
    ),
    options: [
      "When classes share an IS-A relationship",
      "When one class uses functionalities of another without being its type",
      "When subclassing is mandatory",
      "When methods do not need overriding"
    ],
    answer: "When one class uses functionalities of another without being its type",
  },
  {
    question: (
      <div>
        <p>Which statement is TRUE about inheritance vs composition?</p>
      </div>
    ),
    options: [
      "Inheritance is used for HAS-A relationships, Composition for IS-A",
      "Inheritance is used for IS-A relationships, Composition for HAS-A",
      "Both are exactly the same",
      "Composition cannot access superclass methods"
    ],
    answer: "Inheritance is used for IS-A relationships, Composition for HAS-A",
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
      <h3 className="mcq-title">Inheritance Part2 - MCQs</h3>

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

export default Inheritance_Part2_MCQ;
