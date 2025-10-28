import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Todos_Applications_MCQ = () => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>Which HTML element is used to create a checkbox in a Todo list?</p>
          <CodeBlock language="html" code={`<input type="checkbox" />`} />
        </div>
      ),
      options: [
        "<input type='text'>",
        "<checkbox>",
        "<input type='checkbox'>",
        "<box>",
      ],
      answer: "<input type='checkbox'>",
    },
    {
      question: (
        <div>
          <p>
            What does the HTML <code>label</code> element define?
          </p>
          <CodeBlock
            language="html"
            code={`<label for="task1">Complete Homework</label>`}
          />
        </div>
      ),
      options: [
        "A clickable button element",
        "A caption for form elements like input, checkbox, etc.",
        "An input field for user data",
        "A list of items",
      ],
      answer: "A caption for form elements like input, checkbox, etc.",
    },
    {
      question: (
        <div>
          <p>
            What is the purpose of the <code>for</code> attribute in the label
            element?
          </p>
          <CodeBlock
            language="html"
            code={`<label for="todo1">Buy Groceries</label>\n<input type="checkbox" id="todo1" />`}
          />
        </div>
      ),
      options: [
        "It links the label to the corresponding input element",
        "It adds a CSS style to the label",
        "It creates a function for the checkbox",
        "It is used for form validation",
      ],
      answer: "It links the label to the corresponding input element",
    },
    {
      question: (
        <div>
          <p>
            Which property in JavaScript corresponds to the HTML{" "}
            <code>for</code> attribute?
          </p>
          <CodeBlock
            language="javascript"
            code={`const label = document.createElement("label");\nlabel.htmlFor = "taskCheckbox";`}
          />
        </div>
      ),
      options: ["for", "setFor", "htmlFor", "forAttribute"],
      answer: "htmlFor",
    },
    {
      question: (
        <div>
          <p>
            What does the <code>setAttribute()</code> method do in JavaScript?
          </p>
          <CodeBlock
            language="javascript"
            code={`const label = document.createElement("label");\nlabel.setAttribute("for", "task1");`}
          />
        </div>
      ),
      options: [
        "Removes an attribute from an element",
        "Sets or updates the value of an attribute",
        "Creates a new HTML element",
        "Links CSS styles",
      ],
      answer: "Sets or updates the value of an attribute",
    },
    {
      question: (
        <div>
          <p>
            Which loop would be most suitable to iterate through an array of
            Todo items?
          </p>
          <CodeBlock
            language="javascript"
            code={`const todos = ["Buy milk", "Read book", "Exercise"];\nfor (const task of todos) {\n  console.log(task);\n}`}
          />
        </div>
      ),
      options: ["for", "for...in", "for...of", "while"],
      answer: "for...of",
    },
    {
      question: (
        <div>
          <p>What does the following CSS code do?</p>
          <CodeBlock
            language="css"
            code={`div {\n  border: 2px solid green;\n}`}
          />
        </div>
      ),
      options: [
        "Adds a 2px green border around the div element",
        "Removes the border from the div element",
        "Adds padding inside the div",
        "Adds a green background color",
      ],
      answer: "Adds a 2px green border around the div element",
    },
    {
      question:
        "Which CSS property is used to remove the border completely from an element?",
      options: [
        "border: 0;",
        "border: none;",
        "border: hidden;",
        "border: clear;",
      ],
      answer: "border: none;",
    },
    {
      question: "What is the correct syntax for setting a top border in CSS?",
      options: [
        "border-top: 1px solid red;",
        "border-top-style: red solid 1px;",
        "border-up: solid red 1px;",
        "border-high: red 1px solid;",
      ],
      answer: "border-top: 1px solid red;",
    },
    {
      question: "What does a loop allow you to do in JavaScript?",
      options: [
        "Execute a block of code multiple times",
        "Stop code execution immediately",
        "Define variables",
        "Add CSS to elements",
      ],
      answer: "Execute a block of code multiple times",
    },
  ];

  // Shuffle and state logic
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
      <h3 className="mcq-title">DOM and Event Fundamentals - MCQs</h3>

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

export default Todos_Applications_MCQ;
