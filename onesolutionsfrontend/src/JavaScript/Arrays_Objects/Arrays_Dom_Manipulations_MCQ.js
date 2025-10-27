import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Arrays_Dom_Manipulations_MCQ = () => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>What will this code print in the console?</p>
          <CodeBlock
            language="javascript"
            code={`const numbers = [1, 2, 3, 4];
  console.log(numbers);`}
          />
        </div>
      ),
      options: ["[1, 2, 3, 4]", "1,2,3,4", "{1, 2, 3, 4}", "Error"],
      answer: "[1, 2, 3, 4]",
    },
    {
      question: (
        <div>
          <p>What will be displayed in the console?</p>
          <CodeBlock
            language="javascript"
            code={`const arr = [10, 20, 30, 40];
  console.log(arr[0]);
  console.log(arr[3]);`}
          />
        </div>
      ),
      options: ["10 and 40", "20 and 30", "undefined", "Error"],
      answer: "10 and 40",
    },
    {
      question: (
        <div>
          <p>Predict the output after modifying the array:</p>
          <CodeBlock
            language="javascript"
            code={`const data = [1, 2, 3, 4];
  data[1] = 20;
  console.log(data);`}
          />
        </div>
      ),
      options: ["[1, 2, 3, 4]", "[1, 20, 3, 4]", "[20, 1, 3, 4]", "Error"],
      answer: "[1, 20, 3, 4]",
    },
    {
      question: (
        <div>
          <p>What will this code log?</p>
          <CodeBlock
            language="javascript"
            code={`const items = [5, 10, 15, 20];
  console.log(items.length);`}
          />
        </div>
      ),
      options: ["3", "4", "5", "undefined"],
      answer: "4",
    },
    {
      question: (
        <div>
          <p>
            What will be the output after using <code>push()</code>?
          </p>
          <CodeBlock
            language="javascript"
            code={`const values = [1, 2, 3, 4];
  values.push(true);
  console.log(values);`}
          />
        </div>
      ),
      options: [
        "[1, 2, 3, 4]",
        "[1, 2, 3, 4, true]",
        "[true, 1, 2, 3, 4]",
        "Error",
      ],
      answer: "[1, 2, 3, 4, true]",
    },
    {
      question: (
        <div>
          <p>
            What happens after calling <code>pop()</code> here?
          </p>
          <CodeBlock
            language="javascript"
            code={`const colors = [1, 2, 3, 4, true];
  colors.pop();
  console.log(colors);`}
          />
        </div>
      ),
      options: ["[1, 2, 3, 4]", "[2, 3, 4, true]", "true", "Error"],
      answer: "[1, 2, 3, 4]",
    },
    {
      question: (
        <div>
          <p>What element will be created and displayed?</p>
          <CodeBlock
            language="javascript"
            code={`const div = document.createElement("div");
  div.textContent = "Hello World!";
  document.body.appendChild(div);`}
          />
        </div>
      ),
      options: [
        "Creates a div with 'Hello World!'",
        "Creates a paragraph",
        "Creates nothing",
        "Throws an error",
      ],
      answer: "Creates a div with 'Hello World!'",
    },
    {
      question:
        "Which array method adds one or more elements to the end of an array?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      answer: "push()",
    },
    {
      question:
        "Which DOM method is used to append a new element to a parent element?",
      options: [
        "appendChild()",
        "addElement()",
        "insertChild()",
        "pushElement()",
      ],
      answer: "appendChild()",
    },
    {
      question:
        "Which property returns the total number of elements in an array?",
      options: ["size", "count", "length", "index"],
      answer: "length",
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
      <h3 className="mcq-title">Input Element and Math Functions - MCQs</h3>

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

export default Arrays_Dom_Manipulations_MCQ;
