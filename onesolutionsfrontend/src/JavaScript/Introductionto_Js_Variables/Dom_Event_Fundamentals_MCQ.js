import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Dom_Event_Fundamentals_MCQ = () => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>Which keyword is used to declare a variable in JavaScript?</p>
          <CodeBlock language="javascript" code={`let message;`} />
        </div>
      ),
      options: ["var", "let", "const", "int"],
      answer: "let",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock
            language="javascript"
            code={`let message;\nconsole.log(message);`}
          />
        </div>
      ),
      options: ["null", "undefined", "error", "0"],
      answer: "undefined",
    },
    {
      question: (
        <div>
          <p>Which method is used to select an element with a specific ID?</p>
          <CodeBlock
            language="javascript"
            code={`const heading = document.getElementById("headingElement");`}
          />
        </div>
      ),
      options: [
        "document.querySelectorAll()",
        "document.getElementsByClassName()",
        "document.getElementById()",
        "document.selectById()",
      ],
      answer: "document.getElementById()",
    },
    {
      question: (
        <div>
          <p>
            Which property is used to modify the text content of an element?
          </p>
          <CodeBlock
            language="javascript"
            code={`document.getElementById("headingElement").textContent = "New Heading";`}
          />
        </div>
      ),
      options: ["innerValue", "textValue", "textContent", "contentText"],
      answer: "textContent",
    },
    {
      question: (
        <div>
          <p>
            Which style property will change the background color of an element?
          </p>
          <CodeBlock
            language="javascript"
            code={`document.getElementById("headingElement").style.backgroundColor = "blue";`}
          />
        </div>
      ),
      options: [
        "backgroundcolor",
        "background_color",
        "backgroundColor",
        "bgColor",
      ],
      answer: "backgroundColor",
    },
    {
      question: (
        <div>
          <p>Which event occurs when the user clicks on an HTML element?</p>
          <CodeBlock
            language="html"
            code={`<button onclick="changeHeading()">Click Me</button>`}
          />
        </div>
      ),
      options: ["onmouseover", "onclick", "onpress", "onhover"],
      answer: "onclick",
    },
    {
      question: (
        <div>
          <p>
            Which of the following code correctly changes the heading color when
            the button is clicked?
          </p>
          <CodeBlock
            language="html"
            code={`<h1 id="headingElement">Web Tech</h1>\n<button onclick="changeHeading()">Change</button>`}
          />
          <CodeBlock
            language="javascript"
            code={`function changeHeading() {\n  document.getElementById("headingElement").style.color = "red";\n}`}
          />
        </div>
      ),
      options: [
        "Uses document.querySelectorAll()",
        "Uses document.getElementById() correctly",
        "Missing style property",
        "Invalid function syntax",
      ],
      answer: "Uses document.getElementById() correctly",
    },
    {
      question: (
        <div>
          <p>What does the DOM represent in a browser?</p>
        </div>
      ),
      options: [
        "A static text version of the HTML",
        "A tree structure representing HTML elements as objects",
        "A server-side database",
        "A CSS style manager",
      ],
      answer: "A tree structure representing HTML elements as objects",
    },
    {
      question: (
        <div>
          <p>
            Which of the following is the correct way to access the document
            object?
          </p>
        </div>
      ),
      options: ["window.html", "browser.document", "document", "HTML.document"],
      answer: "document",
    },
    {
      question: (
        <div>
          <p>What is true about JavaScript Events?</p>
        </div>
      ),
      options: [
        "They are used to style HTML elements only",
        "They occur when users or the browser interact with elements",
        "They are used to define variables in JavaScript",
        "They cannot trigger functions",
      ],
      answer: "They occur when users or the browser interact with elements",
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

export default Dom_Event_Fundamentals_MCQ;
