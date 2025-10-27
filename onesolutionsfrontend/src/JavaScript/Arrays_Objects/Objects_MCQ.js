import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Objects_MCQ = () => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>What will this code log in the console?</p>
          <CodeBlock
            language="javascript"
            code={`const person = {
    firstName: "Rahul",
    lastName: "Attuluri",
    age: 28
  };
  console.log(person.firstName);`}
          />
        </div>
      ),
      options: ["Rahul", "Attuluri", "28", "undefined"],
      answer: "Rahul",
    },
    {
      question: (
        <div>
          <p>What is the output of this code?</p>
          <CodeBlock
            language="javascript"
            code={`const car = {
    brand: "Tesla",
    model: "Model 3"
  };
  console.log(car["model"]);`}
          />
        </div>
      ),
      options: ["Tesla", "Model 3", "undefined", "Error"],
      answer: "Model 3",
    },
    {
      question: (
        <div>
          <p>What will happen when accessing a non-existent property?</p>
          <CodeBlock
            language="javascript"
            code={`const user = { name: "Ravi" };
  console.log(user.age);`}
          />
        </div>
      ),
      options: ["Error", "undefined", "null", "0"],
      answer: "undefined",
    },
    {
      question: (
        <div>
          <p>What will be logged in the console?</p>
          <CodeBlock
            language="javascript"
            code={`const key = "city";
  const person = { name: "Ravi", city: "Hyderabad" };
  console.log(person[key]);`}
          />
        </div>
      ),
      options: ["city", "Hyderabad", "undefined", "Error"],
      answer: "Hyderabad",
    },
    {
      question: (
        <div>
          <p>What will this code print?</p>
          <CodeBlock
            language="javascript"
            code={`const user = { name: "Ravi", age: 25 };
  user.age = 30;
  console.log(user.age);`}
          />
        </div>
      ),
      options: ["25", "30", "undefined", "Error"],
      answer: "30",
    },
    {
      question: (
        <div>
          <p>What is the output of this code?</p>
          <CodeBlock
            language="javascript"
            code={`const student = {};
  student.name = "Rahul";
  student["age"] = 20;
  console.log(student);`}
          />
        </div>
      ),
      options: [
        `{ name: "Rahul", age: 20 }`,
        `{}`,
        `{ name: "Rahul" }`,
        "Error",
      ],
      answer: `{ name: "Rahul", age: 20 }`,
    },
    {
      question: (
        <div>
          <p>What will this code log in the console?</p>
          <CodeBlock
            language="javascript"
            code={`const laptop = {
    brand: "HP",
    specs: { ram: "8GB", storage: "512GB" }
  };
  console.log(laptop.specs.ram);`}
          />
        </div>
      ),
      options: ["HP", "8GB", "512GB", "undefined"],
      answer: "8GB",
    },
    {
      question:
        "Which notation should be used to access a property when the key contains spaces or special characters?",
      options: ["Dot Notation", "Bracket Notation", "Both", "Neither"],
      answer: "Bracket Notation",
    },
    {
      question:
        "In JavaScript, what is it called when a property value of an object is a function?",
      options: [
        "Object Method",
        "Property Function",
        "Callable Value",
        "Action",
      ],
      answer: "Object Method",
    },
    {
      question:
        "Which keyword is used to unpack properties from an object into separate variables?",
      options: ["Spread", "Unpack", "Destructure", "Extract"],
      answer: "Destructure",
    },
  ];

  // ====== Existing MCQ Logic ======
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
      <h3 className="mcq-title">Objects - MCQs</h3>

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

export default Objects_MCQ;
