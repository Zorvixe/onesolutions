import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const ListMethods_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>Which list method adds an element to the end of the list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3]\nmy_list.append(4)\nprint(my_list)`}
        />
      </div>
    ),
    options: ["append()", "extend()", "insert()", "pop()"],
    answer: "append()",
  },
  {
    question: (
      <div>
        <p>Which method adds all elements of another list to the end of the current list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1,2]\nmy_list.extend([3,4])\nprint(my_list)`}
        />
      </div>
    ),
    options: ["append()", "extend()", "insert()", "remove()"],
    answer: "extend()",
  },
  {
    question: (
      <div>
        <p>Which method inserts an element at a specified index?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1,2,4]\nmy_list.insert(2, 3)\nprint(my_list)`}
        />
      </div>
    ),
    options: ["insert()", "append()", "pop()", "clear()"],
    answer: "insert()",
  },
  {
    question: (
      <div>
        <p>Which method removes the last element of a list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1,2,3,4]\nmy_list.pop()\nprint(my_list)`}
        />
      </div>
    ),
    options: ["pop()", "remove()", "clear()", "append()"],
    answer: "pop()",
  },
  {
    question: (
      <div>
        <p>Which method removes the first occurrence of a specified value?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1,2,3,2]\nmy_list.remove(2)\nprint(my_list)`}
        />
      </div>
    ),
    options: ["pop()", "remove()", "clear()", "append()"],
    answer: "remove()",
  },
  {
    question: (
      <div>
        <p>Which method removes all items from a list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1,2,3]\nmy_list.clear()\nprint(my_list)`}
        />
      </div>
    ),
    options: ["pop()", "clear()", "remove()", "sort()"],
    answer: "clear()",
  },
  {
    question: (
      <div>
        <p>Which method returns the index of the first occurrence of a value?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1,2,3,2]\nprint(my_list.index(2))`}
        />
      </div>
    ),
    options: ["index()", "count()", "sort()", "insert()"],
    answer: "index()",
  },
  {
    question: (
      <div>
        <p>Which method counts the number of occurrences of a value in a list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1,2,2,3]\nprint(my_list.count(2))`}
        />
      </div>
    ),
    options: ["index()", "count()", "sort()", "remove()"],
    answer: "count()",
  },
  {
    question: (
      <div>
        <p>Which method sorts the list in place?</p>
        <CodeBlock
          language="python"
          code={`my_list = [3,1,2]\nmy_list.sort()\nprint(my_list)`}
        />
      </div>
    ),
    options: ["sort()", "sorted()", "append()", "extend()"],
    answer: "sort()",
  },
  {
    question: (
      <div>
        <p>Which method returns a new sorted list without modifying the original?</p>
        <CodeBlock
          language="python"
          code={`my_list = [3,1,2]\nprint(sorted(my_list))\nprint(my_list)`}
        />
      </div>
    ),
    options: ["sort()", "sorted()", "append()", "insert()"],
    answer: "sorted()",
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
      <h3 className="mcq-title">List Methods - MCQs</h3>

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

export default ListMethods_MCQ;
