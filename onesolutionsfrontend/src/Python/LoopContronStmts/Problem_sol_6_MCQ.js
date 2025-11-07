import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; 

const Problem_sol_6_MCQ = ({ onComplete }) => {
 const questionsData = [
  {
    question: "What is the default behavior of the print() statement in Python?",
    options: [
      "Prints on the same line",
      "Moves cursor to a new line after printing",
      "Does nothing",
      "Prints backwards",
    ],
    answer: "Moves cursor to a new line after printing",
  },
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`print("Hello", end="-")\nprint("World")`}
        />
      </div>
    ),
    options: ["Hello-World", "Hello World", "Hello\nWorld", "HelloWorld-"],
    answer: "Hello-World",
  },
  {
    question: (
      <div>
        <p>How can you print multiple outputs on the same line?</p>
        <CodeBlock
          language="python"
          code={`print("A", end=" ")\nprint("B", end=" ")`}
        />
      </div>
    ),
    options: [
      "Using the 'sep' keyword",
      "Using the 'end' keyword",
      "Using '+=' operator",
      "It is not possible",
    ],
    answer: "Using the 'end' keyword",
  },
  {
    question: (
      <div>
        <p>What does this code print?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    print("*", end="")`}
        />
      </div>
    ),
    options: ["*\n*\n*", "***", "* * *", "Error"],
    answer: "***",
  },
  {
    question: "Which character does print() append by default at the end?",
    options: ["Space", "Newline (\\n)", "Tab (\\t)", "Nothing"],
    answer: "Newline (\\n)",
  },
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`for i in range(2):\n    for j in range(2):\n        print("*", end="-")\n    print()`}
        />
      </div>
    ),
    options: ["*-* \n*-*", "*-*-*-\n*-*-*-", "* *\n* *", "**\n**"],
    answer: "*-*- \n*-*- ",
  },
  {
    question: (
      <div>
        <p>Which of the following is true about the 'end' keyword in print()?</p>
      </div>
    ),
    options: [
      "It changes the separator between items",
      "It changes the character printed at the end of print",
      "It terminates the program",
      "It pauses the loop",
    ],
    answer: "It changes the character printed at the end of print",
  },
  // ---------- New Question 1 ----------
  {
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`print("1", "2", "3", sep="-")`}
        />
      </div>
    ),
    options: ["1 2 3", "1-2-3", "123", "Error"],
    answer: "1-2-3",
  },
  // ---------- New Question 2 ----------
  {
    question: (
      <div>
        <p>What is printed by this code?</p>
        <CodeBlock
          language="python"
          code={`for i in range(3):\n    print(i, end="|")`}
        />
      </div>
    ),
    options: ["0|1|2|", "0 1 2", "012", "0\n1\n2"],
    answer: "0|1|2|",
  },
  // ---------- New Question 3 ----------
  {
    question: (
      <div>
        <p>How can you print items of a list on the same line separated by commas?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1,2,3]\nprint(*my_list, sep=",")`}
        />
      </div>
    ),
    options: ["1 2 3", "1,2,3", "[1,2,3]", "Error"],
    answer: "1,2,3",
  }
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
      <h3 className="mcq-title">Nested Loops - MCQs</h3>

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


export default Problem_sol_6_MCQ
