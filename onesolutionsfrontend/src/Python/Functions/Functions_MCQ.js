import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Functions_CS_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: "Which of the following best describes a function in Python?",
    options: [
      "A block of reusable code to perform a specific action",
      "A variable that stores values",
      "A loop that repeats actions",
      "A conditional statement",
    ],
    answer: "A block of reusable code to perform a specific action",
  },
  {
    question: (
      <div>
        <p>What will the following code output?</p>
        <CodeBlock
          language="python"
          code={`def greet():\n    print('Hello')\ngreet()\ngreet()`}
        />
      </div>
    ),
    options: ["Hello", "Hello Hello", "Error", "Nothing"],
    answer: "Hello Hello",
  },
  {
    question: "Which of the following is correct about function definition?",
    options: [
      "Function is uniquely identified by the function_name",
      "Function executes automatically without calling",
      "Functions cannot have arguments",
      "Functions cannot return values",
    ],
    answer: "Function is uniquely identified by the function_name",
  },
  {
    question: (
      <div>
        <p>What will this code output?</p>
        <CodeBlock
          language="python"
          code={`def add(a, b):\n    return a + b\nresult = add(3, 4)\nprint(result)`}
        />
      </div>
    ),
    options: ["7", "34", "Error", "None"],
    answer: "7",
  },
  {
    question: (
      <div>
        <p>What will this code print?</p>
        <CodeBlock
          language="python"
          code={`name = 'Alice'\ndef print_message():\n    print(f'Hello, {name}')\nprint_message()`}
        />
      </div>
    ),
    options: ["Hello, Alice", "Hello, ?", "Error", "Nothing"],
    answer: "Hello, Alice",
  },
  {
    question: "What is true about variables inside a function?",
    options: [
      "A variable created inside a function can only be used in it",
      "Variables inside functions are global",
      "They can be accessed anywhere without declaration",
      "They overwrite variables outside",
    ],
    answer: "A variable created inside a function can only be used in it",
  },
  {
    question: (
      <div>
        <p>What keyword is used to return a value from a function?</p>
        <CodeBlock language="python" code={`# Example:\ndef add(a, b):\n    return a + b`} />
      </div>
    ),
    options: ["return", "print", "yield", "exit"],
    answer: "return",
  },
  {
    question: (
      <div>
        <p>Will this code execute the print statement after return?</p>
        <CodeBlock
          language="python"
          code={`def example():\n    return 10\n    print("This won't print")\nresult = example()\nprint(result)`}
        />
      </div>
    ),
    options: ["No", "Yes", "Sometimes", "Error"],
    answer: "No",
  },
  {
    question: (
      <div>
        <p>Which of the following are built-in Python functions?</p>
        <CodeBlock
          language="python"
          code={`# Examples of built-in functions:\nprint(), int(), str(), len()`}
        />
      </div>
    ),
    options: [
      "print(), int(), str(), len()",
      "myfunc(), custom(), calc(), len()",
      "function(), int(), list(), print()",
      "None of these",
    ],
    answer: "print(), int(), str(), len()",
  },
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`def multiply(x, y=2):\n    return x * y\n\nprint(multiply(3))\nprint(multiply(3, 4))`}
        />
      </div>
    ),
    options: ["6 and 12", "6 and 7", "3 and 12", "Error"],
    answer: "6 and 12",
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
      <h3 className="mcq-title">Functions - MCQs</h3>

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

export default Functions_CS_MCQ;
