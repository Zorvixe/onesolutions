import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const PrimitiveTypes_Conditionals_MCQ = () => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock
            language="javascript"
            code={`let a = 10;\nconsole.log(typeof a);`}
          />
        </div>
      ),
      options: ["'integer'", "'number'", "'string'", "'object'"],
      answer: "'number'",
    },
    {
      question: (
        <div>
          <p>What is the result of the following code?</p>
          <CodeBlock
            language="javascript"
            code={`let value;\nconsole.log(typeof value);`}
          />
        </div>
      ),
      options: ["'undefined'", "'null'", "'object'", "'string'"],
      answer: "'undefined'",
    },
    {
      question: (
        <div>
          <p>What will this code print?</p>
          <CodeBlock
            language="javascript"
            code={`let isHappy = true;\nconsole.log(typeof isHappy);`}
          />
        </div>
      ),
      options: ["'boolean'", "'string'", "'object'", "'undefined'"],
      answer: "'boolean'",
    },
    {
      question: (
        <div>
          <p>What is the output of the following code?</p>
          <CodeBlock
            language="javascript"
            code={`let name = "Rahul";\nconsole.log(typeof name);`}
          />
        </div>
      ),
      options: ["'object'", "'string'", "'symbol'", "'number'"],
      answer: "'string'",
    },
    {
      question: (
        <div>
          <p>What will this code log in the console?</p>
          <CodeBlock
            language="javascript"
            code={`let value = null;\nconsole.log(typeof value);`}
          />
        </div>
      ),
      options: ["'null'", "'undefined'", "'object'", "'boolean'"],
      answer: "'object'",
    },
    {
      question: (
        <div>
          <p>What is the output of this conditional statement?</p>
          <CodeBlock
            language="javascript"
            code={`let x = 5;\nif (x === "5") {\n  console.log("Equal");\n} else {\n  console.log("Not Equal");\n}`}
          />
        </div>
      ),
      options: ["Equal", "Not Equal", "Error", "undefined"],
      answer: "Not Equal",
    },
    {
      question: (
        <div>
          <p>What is the result of this code snippet?</p>
          <CodeBlock
            language="javascript"
            code={`let y = "10";\nif (y == 10) {\n  console.log("Loose Equality");\n} else {\n  console.log("No Match");\n}`}
          />
        </div>
      ),
      options: ["Loose Equality", "No Match", "Error", "undefined"],
      answer: "Loose Equality",
    },
    {
      question:
        "Which of the following is a primitive data type in JavaScript?",
      options: ["Object", "Array", "String", "Function"],
      answer: "String",
    },
    {
      question: "What does `parseInt('25')` return in JavaScript?",
      options: ["'25'", "25", "NaN", "undefined"],
      answer: "25",
    },
    {
      question:
        "In an if...else statement, what happens when the condition evaluates to false?",
      options: [
        "Only the if block executes",
        "The else block executes",
        "The program stops execution",
        "It throws an error",
      ],
      answer: "The else block executes",
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

  useEffect(() => {
    if (completed) return;
    setTimeLeft(10);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, completed]);

  const nextQuestion = () => {
    clearInterval(timerRef.current);
    setSelectedAnswer(null);
    setFeedback(null);

    if (!showingSkipped) {
      if (currentIndex + 1 < questions.length)
        setCurrentIndex((prev) => prev + 1);
      else if (skippedQuestions.length > 0) {
        setShowingSkipped(true);
        setCurrentIndex(0);
      } else setCompleted(true);
    } else {
      if (currentIndex + 1 < skippedQuestions.length)
        setCurrentIndex((prev) => prev + 1);
      else setCompleted(true);
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

    setScore((prev) => prev + points);
    setFeedback({ correct: isCorrect, points });
  };

  const handleSkip = () => {
    if (!showingSkipped) setSkippedQuestions((prev) => [...prev, currentIndex]);
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

  const getNextButtonLabel = () => {
    if (showingSkipped && currentIndex + 1 === skippedQuestions.length)
      return "Finish";
    if (
      !showingSkipped &&
      currentIndex + 1 === questions.length &&
      skippedQuestions.length === 0
    )
      return "Finish";
    return "Next";
  };

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">Primitive Types & Conditionals - MCQs</h3>

      {!completed ? (
        <div className="mcq-question-block">
          <p className="mcq-question">
            Q{questionNumber}. {currentQuestion.question}
          </p>

          <ul className="mcq-options">
            {currentQuestion.options.map((option) => (
              <li key={option} className="mcq-option">
                <label>
                  <input
                    type="radio"
                    name={`q${currentIndex}`}
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={feedback !== null}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>

          {feedback && (
            <div
              className={`mcq-feedback ${
                feedback.correct ? "correct" : "wrong"
              }`}
            >
              {feedback.correct
                ? `✅ Correct! +${feedback.points}`
                : `❌ Wrong! -${Math.abs(feedback.points)}`}
            </div>
          )}

          <div className="mcq-buttons">
            <button
              className="mcq-next"
              disabled={!selectedAnswer}
              onClick={feedback ? nextQuestion : handleNext}
            >
              {getNextButtonLabel()}
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
          <p>
            Your Score: {score} / {questions.length * 10}
          </p>
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

export default PrimitiveTypes_Conditionals_MCQ;
