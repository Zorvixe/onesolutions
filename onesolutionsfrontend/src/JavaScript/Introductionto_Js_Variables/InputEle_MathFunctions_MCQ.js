import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const InputEle_MathFunctions_MCQ = () => {
  const originalQuestions = [
    // 1️⃣ CodeBlock Question
    {
      question: (
        <div>
          <p>What will the following code output?</p>
          <CodeBlock
            language="javascript"
            code={`console.log(Math.random());`}
          />
        </div>
      ),
      options: [
        "A random float value between 0 and 1",
        "A random integer between 0 and 100",
        "Always 0",
        "Always 1",
      ],
      answer: "A random float value between 0 and 1",
    },
    // 2️⃣ CodeBlock Question
    {
      question: (
        <div>
          <p>What will be printed in the console?</p>
          <CodeBlock
            language="javascript"
            code={`console.log(Math.ceil(4.2));`}
          />
        </div>
      ),
      options: ["4", "5", "3", "Error"],
      answer: "5",
    },
    // 3️⃣ CodeBlock Question
    {
      question: (
        <div>
          <p>Predict the output:</p>
          <CodeBlock
            language="javascript"
            code={`console.log(Math.floor(9.9));`}
          />
        </div>
      ),
      options: ["9", "10", "Error", "undefined"],
      answer: "9",
    },
    // 4️⃣ CodeBlock Question
    {
      question: (
        <div>
          <p>What will be logged to the console?</p>
          <CodeBlock
            language="javascript"
            code={`console.log(Math.round(4.6));`}
          />
        </div>
      ),
      options: ["4", "5", "6", "Error"],
      answer: "5",
    },
    // 5️⃣ CodeBlock Question
    {
      question: (
        <div>
          <p>What will this input and JS code display?</p>
          <CodeBlock
            language="html"
            code={`<input id="name" type="text" value="Prathibha">\n<script>\n  console.log(document.getElementById("name").value);\n</script>`}
          />
        </div>
      ),
      options: ["name", "undefined", "Prathibha", "null"],
      answer: "Prathibha",
    },
    // 6️⃣ CodeBlock Question
    {
      question: (
        <div>
          <p>What happens when the button is clicked?</p>
          <CodeBlock
            language="html"
            code={`<button onclick="alert('Hello!')">Click Me</button>`}
          />
        </div>
      ),
      options: [
        "Displays an alert box saying Hello!",
        "Prints Hello! on the page",
        "Throws an error",
        "Does nothing",
      ],
      answer: "Displays an alert box saying Hello!",
    },
    // 7️⃣ CodeBlock Question
    {
      question: (
        <div>
          <p>What will the following display in the console?</p>
          <CodeBlock
            language="javascript"
            code={`let x = Math.max(10, 20, 5);\nconsole.log(x);`}
          />
        </div>
      ),
      options: ["5", "10", "20", "undefined"],
      answer: "20",
    },
    // 8️⃣ Normal Question
    {
      question:
        "Which Math method returns the smallest integer greater than or equal to a number?",
      options: ["Math.floor()", "Math.ceil()", "Math.round()", "Math.abs()"],
      answer: "Math.ceil()",
    },
    // 9️⃣ Normal Question
    {
      question:
        "Which attribute is used to define an input field’s type in HTML?",
      options: ["id", "class", "type", "value"],
      answer: "type",
    },
    // 🔟 Normal Question
    {
      question:
        "Which JavaScript property is used to access the current value of an input element?",
      options: ["innerHTML", "value", "textContent", "data"],
      answer: "value",
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

export default InputEle_MathFunctions_MCQ;
