import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Attributes_Methods_MCQ = ({ onComplete }) => {
  const questionsData =[
  {
    question: (
      <div>
        <p>What are attributes in Python classes?</p>
        <CodeBlock language="python" code={`class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price`} />
      </div>
    ),
    options: [
      "Functions defined inside a class",
      "Variables that store data related to an object",
      "Modules imported in a class",
      "Conditions inside a method"
    ],
    answer: "Variables that store data related to an object",
  },
  {
    question: (
      <div>
        <p>What are methods in Python classes?</p>
        <CodeBlock language="python" code={`class Product:\n    def show_product(self):\n        return self.name`} />
      </div>
    ),
    options: [
      "Loops defined inside a class",
      "Functions defined inside a class",
      "Operators used in classes",
      "Variables that define class state"
    ],
    answer: "Functions defined inside a class",
  },
  {
    question: (
      <div>
        <p>How do you define an instance attribute?</p>
        <CodeBlock language="python" code={`class Product:\n    def __init__(self, price):\n        self.price = price`} />
      </div>
    ),
    options: [
      "price = 500",
      "self.price = 500",
      "Product.price = 500",
      "def price(): return 500"
    ],
    answer: "self.price = 500",
  },
  {
    question: (
      <div>
        <p>Which statement correctly calls a method of an object?</p>
        <CodeBlock language="python" code={`product1 = Product("Shoes", 500)\nproduct1.show_product()`} />
      </div>
    ),
    options: [
      "Product.show()",
      "Product.show_product()",
      "product1.show_product()",
      "Product.show_product"
    ],
    answer: "product1.show_product()",
  },
  {
    question: (
      <div>
        <p>What will the following code output?</p>
        <CodeBlock language="python" code={`class Product:\n    def __init__(self, name):\n        self.name = name\np = Product("Shoes")\nprint(p.name)`} />
      </div>
    ),
    options: ["Product", "Shoes", "Error", "None"],
    answer: "Shoes",
  },
  {
    question: (
      <div>
        <p>Where are attributes typically initialized in a class?</p>
        <CodeBlock language="python" code={`class Product:\n    def __init__(self, name):\n        self.name = name`} />
      </div>
    ),
    options: [
      "Inside the __init__() method",
      "Outside the class definition",
      "Inside a for loop",
      "Using the class keyword"
    ],
    answer: "Inside the __init__() method",
  },
  {
    question: (
      <div>
        <p>Which of the following correctly accesses a class attribute?</p>
        <CodeBlock language="python" code={`class Product:\n    price = 500`} />
      </div>
    ),
    options: [
      "Product.price",
      "self.price",
      "price.Product",
      "Product->price"
    ],
    answer: "Product.price",
  },
  {
    question: (
      <div>
        <p>Which type of method can modify object attributes?</p>
        <CodeBlock language="python" code={`class Product:\n    def set_price(self, price):\n        self.price = price`} />
      </div>
    ),
    options: [
      "Class methods",
      "Instance methods",
      "Static methods",
      "All of the above"
    ],
    answer: "Instance methods",
  },
  {
    question: (
      <div>
        <p>What does the 'self' parameter in methods represent?</p>
        <CodeBlock language="python" code={`class Product:\n    def show_product(self):\n        return self.name`} />
      </div>
    ),
    options: [
      "It refers to the instance of the class",
      "It refers to the class itself",
      "It is a keyword for inheritance",
      "It refers to the main function"
    ],
    answer: "It refers to the instance of the class",
  },
  {
    question: (
      <div>
        <p>What happens when a method modifies an attribute of an object?</p>
        <CodeBlock language="python" code={`product1.price = 500\nproduct1.price -= 50\nprint(product1.price)`} />
      </div>
    ),
    options: [
      "The attribute value is updated for that object",
      "All objects of the class are updated",
      "An error occurs",
      "The attribute is deleted"
    ],
    answer: "The attribute value is updated for that object",
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
        } else setCompleted(true);
      } else {
        if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex(prev => prev + 1);
        else setCompleted(true);
      }
    };
  
    const handleNext = () => {
      if (!selectedAnswer) return;
  
      const currentQuestion = showingSkipped
        ? questions[skippedQuestions[currentIndex]]
        : questions[currentIndex];
  
      const isCorrect = selectedAnswer === currentQuestion.answer;
  
      // Time-based scoring
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
        <h3 className="mcq-title">Attribute Methods - MCQs</h3>
  
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

export default Attributes_Methods_MCQ;
