import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Classes_Object_MCQ = ({ onComplete }) => {
 const questionsData =  [
  {
    question: (
      <div>
        <p>What is a class in Python?</p>
        <CodeBlock language="python" code={`class Car:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model`} />
      </div>
    ),
    options: [
      "A blueprint for creating objects",
      "An individual object",
      "A built-in data type",
      "A Python function"
    ],
    answer: "A blueprint for creating objects",
  },
  {
    question: (
      <div>
        <p>What is an object in Python?</p>
        <CodeBlock language="python" code={`car1 = Car("Toyota", "Corolla")`} />
      </div>
    ),
    options: [
      "A class definition",
      "An instance of a class",
      "A method",
      "A module"
    ],
    answer: "An instance of a class",
  },
  {
    question: (
      <div>
        <p>How do you access an attribute of an object?</p>
        <CodeBlock language="python" code={`print(car1.brand)`} />
      </div>
    ),
    options: [
      "car1.brand",
      "brand.car1",
      "car1['brand']",
      "Car.brand"
    ],
    answer: "car1.brand",
  },
  {
    question: (
      <div>
        <p>Which method initializes an object when it is created?</p>
        <CodeBlock language="python" code={`class Car:\n    def __init__(self, brand, model):\n        self.brand = brand`} />
      </div>
    ),
    options: [
      "__init__",
      "__create__",
      "__start__",
      "__new__"
    ],
    answer: "__init__",
  },
  {
    question: (
      <div>
        <p>How can you update an attribute safely?</p>
        <CodeBlock language="python" code={`class Car:\n    def update_model(self, new_model):\n        self.model = new_model`} />
      </div>
    ),
    options: [
      "Direct assignment is always unsafe",
      "Use a method to update the attribute",
      "Use global variable to update",
      "Cannot update attributes after creation"
    ],
    answer: "Use a method to update the attribute",
  },
  {
    question: (
      <div>
        <p>How can an object access its attributes in another method?</p>
        <CodeBlock language="python" code={`class Car:\n    def display_info(self):\n        return f"{self.brand} {self.model}"`} />
      </div>
    ),
    options: [
      "Using the class name",
      "Using self.attribute_name",
      "Using global variables",
      "Directly writing attribute name"
    ],
    answer: "Using self.attribute_name",
  },
  {
    question: (
      <div>
        <p>Which of the following correctly adds an item to a cart object?</p>
        <CodeBlock language="python" code={`cart.add_item("Laptop", 50000, 1)`} />
      </div>
    ),
    options: [
      "cart.add_item('Laptop', 50000, 1)",
      "Cart.add_item('Laptop', 50000, 1)",
      "add_item(cart, 'Laptop', 50000, 1)",
      "cart['add_item']('Laptop', 50000, 1)"
    ],
    answer: "cart.add_item('Laptop', 50000, 1)",
  },
  {
    question: (
      <div>
        <p>How is the total price of items in a cart calculated?</p>
        <CodeBlock language="python" code={`sum(v["price"] * v["qty"] for v in cart.items.values())`} />
      </div>
    ),
    options: [
      "Adding all quantities",
      "Multiplying prices by quantities and summing them",
      "Counting number of items",
      "Using max() function on prices"
    ],
    answer: "Multiplying prices by quantities and summing them",
  },
  {
    question: (
      <div>
        <p>Which of the following statements is TRUE about objects?</p>
        <CodeBlock language="python" code={`car1 = Car("Honda", "Civic")`} />
      </div>
    ),
    options: [
      "Objects store both data and behavior",
      "Objects cannot have methods",
      "Attributes cannot be updated",
      "Objects are always global"
    ],
    answer: "Objects store both data and behavior",
  },
  {
    question: (
      <div>
        <p>Which of the following is the recommended way to update object data?</p>
        <CodeBlock language="python" code={`car1.update_model("City")`} />
      </div>
    ),
    options: [
      "Directly modify self.attribute outside class",
      "Use methods defined in class to update",
      "Recreate the object every time",
      "Modify the class definition"
    ],
    answer: "Use methods defined in class to update",
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
      <h3 className="mcq-title">Classes & Objects - MCQs</h3>

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

export default Classes_Object_MCQ;
