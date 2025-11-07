import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Dictionaries_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>Which of the following is true about Python dictionaries?</p>
        <CodeBlock
          language="python"
          code={`# Example dictionary\nd = {'name': 'Alice', 'age': 25}`}
        />
      </div>
    ),
    options: [
      "Dictionaries are ordered collections",
      "Dictionaries store key-value pairs",
      "Keys in dictionaries can be mutable",
      "Dictionaries allow duplicate keys"
    ],
    answer: "Dictionaries store key-value pairs"
  },
  {
    question: (
      <div>
        <p>How do you access the value associated with key 'name' in a dictionary?</p>
        <CodeBlock
          language="python"
          code={`my_dict = {'name': 'Alice'}\nprint(my_dict['name'])\nprint(my_dict.get('name'))`}
        />
      </div>
    ),
    options: [
      "my_dict[name]",
      "my_dict.get('name')",
      "Both of the above",
      "None of the above"
    ],
    answer: "Both of the above"
  },
  {
    question: (
      <div>
        <p>What happens if you try to access a non-existent key using square brackets []?</p>
        <CodeBlock
          language="python"
          code={`my_dict = {'age': 25}\nprint(my_dict['name'])  # KeyError`}
        />
      </div>
    ),
    options: [
      "Returns None",
      "Raises KeyError",
      "Creates a new key",
      "Returns an empty string"
    ],
    answer: "Raises KeyError"
  },
  {
    question: (
      <div>
        <p>Which method can safely access a key without raising KeyError?</p>
        <CodeBlock
          language="python"
          code={`my_dict = {'name': 'Alice'}\nprint(my_dict.get('name'))`}
        />
      </div>
    ),
    options: ["get()", "keys()", "values()", "items()"],
    answer: "get()"
  },
  {
    question: (
      <div>
        <p>Which of the following statements is true about dictionary keys?</p>
        <CodeBlock
          language="python"
          code={`# Keys must be unique and immutable\nmy_dict = {'a': 1, 'b': 2}`}
        />
      </div>
    ),
    options: [
      "Keys must be unique and immutable",
      "Keys can be duplicated",
      "Keys can be of any data type",
      "Keys must be mutable"
    ],
    answer: "Keys must be unique and immutable"
  },
  {
    question: (
      <div>
        <p>Which method returns a list of dictionary keys?</p>
        <CodeBlock
          language="python"
          code={`my_dict = {'name': 'Alice', 'age': 25}\nprint(list(my_dict.keys()))`}
        />
      </div>
    ),
    options: ["dict.keys()", "dict.values()", "dict.items()", "dict.get()"],
    answer: "dict.keys()"
  },
  {
    question: (
      <div>
        <p>Which method returns a list of dictionary values?</p>
        <CodeBlock
          language="python"
          code={`my_dict = {'name': 'Alice', 'age': 25}\nprint(list(my_dict.values()))`}
        />
      </div>
    ),
    options: ["dict.keys()", "dict.values()", "dict.items()", "dict.get()"],
    answer: "dict.values()"
  },
  {
    question: (
      <div>
        <p>Which method returns key-value pairs as tuples?</p>
        <CodeBlock
          language="python"
          code={`my_dict = {'name': 'Alice', 'age': 25}\nprint(list(my_dict.items()))`}
        />
      </div>
    ),
    options: ["dict.keys()", "dict.values()", "dict.items()", "dict.get()"],
    answer: "dict.items()"
  },
  {
    question: "Which of the following is immutable in Python?",
    options: ["List", "Dictionary", "Tuple", "Set"],
    answer: "Tuple"
  },
  {
    question: "What is the default data type for a number with a decimal point in Python?",
    options: ["int", "float", "complex", "decimal"],
    answer: "float"
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
      <h3 className="mcq-title">Dictionaries - MCQs</h3>

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

export default Dictionaries_MCQ;
