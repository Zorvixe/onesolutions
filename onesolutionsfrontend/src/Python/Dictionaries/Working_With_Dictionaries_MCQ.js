import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Working_With_Dictionaries_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>What does <code>dict.copy()</code> do?</p>
        <CodeBlock language="python" code={`my_dict = {"a": 1, "b": 2}\ncopy_dict = my_dict.copy()`} />
      </div>
    ),
    options: [
      "Returns a reference to the original dictionary",
      "Creates a shallow copy of the dictionary",
      "Creates a deep copy of the dictionary",
      "Deletes the dictionary"
    ],
    answer: "Creates a shallow copy of the dictionary"
  },
  {
    question: (
      <div>
        <p>If <code>new_dict = original_dict</code>, modifying <code>new_dict</code> affects <code>original_dict</code>. Why?</p>
      </div>
    ),
    options: [
      "Because new_dict is a copy",
      "Because both reference the same object",
      "Because of deep copy",
      "Because dictionaries are immutable"
    ],
    answer: "Because both reference the same object"
  },
  {
    question: (
      <div>
        <p>What does <code>kwargs</code> represent in a function?</p>
        <CodeBlock language="python" code={`def my_func(**kwargs):\n    print(kwargs)`} />
      </div>
    ),
    options: [
      "A tuple of arguments",
      "A list of arguments",
      "A dictionary of keyword arguments",
      "A set of arguments"
    ],
    answer: "A dictionary of keyword arguments"
  },
  {
    question: (
      <div>
        <p>How can you pass a dictionary as keyword arguments to a function?</p>
        <CodeBlock language="python" code={`def greet(name, age):\n    print(f"{name} is {age}")\ndata = {"name": "Alice", "age": 25}\ngreet(**data)`} />
      </div>
    ),
    options: [
      "my_function(dict)",
      "my_function(*dict)",
      "my_function(**dict)",
      "my_function(&dict)"
    ],
    answer: "my_function(**dict)"
  },
  {
    question: (
      <div>
        <p>What happens if you modify a list inside a copied dictionary?</p>
        <CodeBlock language="python" code={`original = {"nums": [1,2]}\ncopy = original.copy()\ncopy["nums"].append(3)\nprint(original)`} />
      </div>
    ),
    options: [
      "Original dictionary remains unchanged",
      "Original dictionary changes too",
      "It raises an error",
      "List becomes immutable"
    ],
    answer: "Original dictionary changes too"
  },
  {
    question: (
      <div>
        <p>What does <code>my_dict.clear()</code> do?</p>
        <CodeBlock language="python" code={`my_dict = {"a":1, "b":2}\nmy_dict.clear()\nprint(my_dict)`} />
      </div>
    ),
    options: [
      "Deletes the dictionary",
      "Removes all items from the dictionary",
      "Copies the dictionary",
      "Returns the number of items"
    ],
    answer: "Removes all items from the dictionary"
  },
  {
    question: (
      <div>
        <p>Can you iterate over <code>kwargs</code> like a normal dictionary?</p>
        <CodeBlock language="python" code={`def my_func(**kwargs):\n    for k,v in kwargs.items():\n        print(k, v)`} />
      </div>
    ),
    options: ["Yes", "No", "Only keys", "Only values"],
    answer: "Yes"
  },
  // ---------- New Questions ----------
  {
    question: (
      <div>
        <p>Which method creates a deep copy of a dictionary?</p>
        <CodeBlock language="python" code={`import copy\nnew_dict = copy.deepcopy(original_dict)`} />
      </div>
    ),
    options: ["dict.copy()", "copy.copy()", "copy.deepcopy()", "dict.clear()"],
    answer: "copy.deepcopy()"
  },
  {
    question: (
      <div>
        <p>What will <code>print(my_dict.get("key", 0))</code> return if "key" does not exist?</p>
        <CodeBlock language="python" code={`my_dict = {"a":1}\nprint(my_dict.get("key", 0))`} />
      </div>
    ),
    options: ["None", "0", "KeyError", "Empty string"],
    answer: "0"
  },
  {
    question: (
      <div>
        <p>What is the difference between <code>my_dict["key"]</code> and <code>my_dict.get("key")</code>?</p>
      </div>
    ),
    options: [
      "Both do the same and raise KeyError if key not present",
      "my_dict['key'] raises KeyError if key not present, get() returns None or default value",
      "get() raises error, my_dict['key'] returns None",
      "None of the above"
    ],
    answer: "my_dict['key'] raises KeyError if key not present, get() returns None or default value"
  }
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
      <h3 className="mcq-title">Working With Dictionaries - MCQs</h3>

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

export default Working_With_Dictionaries_MCQ;
