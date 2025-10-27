import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const InputEle_MathFunctions_MCQ = () => {
  const originalQuestions = [
    {
      question: "What is the main purpose of a dynamic web page?",
      options: [
        "To display the same content for every user",
        "To allow content to change based on user interaction",
        "To prevent any user interaction",
        "To make pages load slower",
      ],
      answer: "To allow content to change based on user interaction",
    },
    {
      question:
        "Which language is primarily responsible for making web pages dynamic and interactive?",
      options: ["HTML", "CSS", "JavaScript", "Python"],
      answer: "JavaScript",
    },
    {
      question: "What is the benefit of using dynamic web pages?",
      options: [
        "They automatically reload every few seconds",
        "They improve interactivity without reloading the page",
        "They cannot handle user inputs",
        "They disable event handling",
      ],
      answer: "They improve interactivity without reloading the page",
    },
    {
      question:
        "Which of the following is an example of a dynamic behavior on a webpage?",
      options: [
        "Static text displayed on the screen",
        "An image that changes when you hover over it",
        "A fixed layout with no user interaction",
        "Plain text displayed using HTML only",
      ],
      answer: "An image that changes when you hover over it",
    },
    {
      question:
        "Which of the following JavaScript events is triggered when a button is clicked?",
      options: ["onload", "onclick", "onhover", "onscroll"],
      answer: "onclick",
    },
    {
      question: "What does DOM stand for in JavaScript?",
      options: [
        "Document Object Model",
        "Data Object Manager",
        "Dynamic Output Mechanism",
        "Document Order Mapping",
      ],
      answer: "Document Object Model",
    },
    {
      question: (
        <div>
          <p>What will happen when this code runs?</p>
          <CodeBlock
            language="html"
            code={`<button onclick="alert('Hello!')">Click Me</button>`}
          />
        </div>
      ),
      options: [
        "Displays 'Hello!' in an alert box when clicked",
        "Shows 'Hello!' on the page",
        "Does nothing",
        "Throws an error",
      ],
      answer: "Displays 'Hello!' in an alert box when clicked",
    },
    {
      question: (
        <div>
          <p>What will this JavaScript code do when executed?</p>
          <CodeBlock
            language="javascript"
            code={`document.getElementById("demo").innerHTML = "Welcome!";`}
          />
        </div>
      ),
      options: [
        "Deletes the element with ID 'demo'",
        "Adds a new element to the DOM",
        "Changes the content of the element with ID 'demo' to 'Welcome!'",
        "Shows an alert box with 'Welcome!'",
      ],
      answer: "Changes the content of the element with ID 'demo' to 'Welcome!'",
    },
    {
      question: (
        <div>
          <p>What happens when the user types something in this input box?</p>
          <CodeBlock
            language="html"
            code={`<input type="text" onchange="alert('Input changed!')">`}
          />
        </div>
      ),
      options: [
        "Shows an alert as soon as user types",
        "Shows an alert when user presses a key",
        "Shows an alert when input value changes and loses focus",
        "Does nothing",
      ],
      answer: "Shows an alert when input value changes and loses focus",
    },
    {
      question: (
        <div>
          <p>What will this JavaScript code do?</p>
          <CodeBlock
            language="javascript"
            code={`const heading = document.querySelector("h1");
  heading.style.color = "blue";`}
          />
        </div>
      ),
      options: [
        "Deletes the h1 element",
        "Changes the text of the h1 element",
        "Changes the color of the h1 text to blue",
        "Creates a new h1 element",
      ],
      answer: "Changes the color of the h1 text to blue",
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
      <h3 className="mcq-title">Introduction to Dynamic Application - MCQs</h3>

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
export default InputEle_MathFunctions_MCQ;
