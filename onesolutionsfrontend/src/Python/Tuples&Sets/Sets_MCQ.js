import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Sets_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>Which of the following is true about sets in Python?</p>
        <CodeBlock
          language="python"
          code={`# Sets are unique and immutable items\nmy_set = {1, 2, 3}\nprint(my_set)`}
        />
      </div>
    ),
    options: [
      "Sets allow duplicate items",
      "Sets are ordered",
      "Sets are immutable and unique",
      "Sets can be indexed like lists"
    ],
    answer: "Sets are immutable and unique",
  },
  {
    question: (
      <div>
        <p>How do you create an empty set?</p>
        <CodeBlock
          language="python"
          code={`empty_set = set()\nprint(empty_set)\nprint(type(empty_set))`}
        />
      </div>
    ),
    options: ["{}", "set()", "[]", "empty_set()"],
    answer: "set()",
  },
  {
    question: (
      <div>
        <p>Which method adds a single item to a set?</p>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2}\nmy_set.add(3)\nprint(my_set)`}
        />
      </div>
    ),
    options: ["set.add(value)", "set.update(value)", "set.append(value)", "set.insert(value)"],
    answer: "set.add(value)",
  },
  {
    question: (
      <div>
        <p>Which method adds multiple items to a set while avoiding duplicates?</p>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2}\nmy_set.update([2, 3, 4])\nprint(my_set)`}
        />
      </div>
    ),
    options: ["set.add(sequence)", "set.extend(sequence)", "set.update(sequence)", "set.insert(sequence)"],
    answer: "set.update(sequence)",
  },
  {
    question: (
      <div>
        <p>Which method removes an item without raising an error if not present?</p>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 3}\nmy_set.discard(4)\nprint(my_set)`}
        />
      </div>
    ),
    options: ["remove()", "discard()", "pop()", "delete()"],
    answer: "discard()",
  },
  {
    question: (
      <div>
        <p>Which operation cannot be performed directly on a set?</p>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 3}\n# print(my_set[0])  # This will raise an error`}
        />
      </div>
    ),
    options: ["Indexing", "Iteration", "Membership check", "len()"],
    answer: "Indexing",
  },
  {
    question: (
      <div>
        <p>What does the following return?</p>
        <CodeBlock
          language="python"
          code={`my_set = {1, 2, 3}\nmy_set.remove(2)\nprint(my_set)`}
        />
      </div>
    ),
    options: ["{1, 3}", "{1, 2, 3}", "{2, 3}", "Error"],
    answer: "{1, 3}",
  },
  {
    question: (
      <div>
        <p>What is the result of the following code?</p>
        <CodeBlock
          language="python"
          code={`a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a | b)`}
        />
      </div>
    ),
    options: ["{3}", "{1, 2, 3, 4, 5}", "{1, 2, 4, 5}", "Error"],
    answer: "{1, 2, 3, 4, 5}",
  },
  {
    question: (
      <div>
        <p>What does this expression do?</p>
        <CodeBlock
          language="python"
          code={`a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a & b)`}
        />
      </div>
    ),
    options: ["Union", "Difference", "Intersection", "Symmetric Difference"],
    answer: "Intersection",
  },
  {
    question: (
      <div>
        <p>Which operator is used for set difference?</p>
        <CodeBlock
          language="python"
          code={`a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a - b)`}
        />
      </div>
    ),
    options: ["&", "|", "-", "^"],
    answer: "-",
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
      <h3 className="mcq-title">Sets - MCQs</h3>

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

export default Sets_MCQ;
