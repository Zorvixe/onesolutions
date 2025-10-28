import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Todos_Application_MCQ_2 = () => {
    const todosPart2Questions = [
        {
          question: (
            <div>
              <p>What does the <code>placeholder</code> attribute do in an HTML input element?</p>
              <CodeBlock
                language="html"
                code={`<input type="text" placeholder="Enter your task" />`}
              />
            </div>
          ),
          options: [
            "Displays hint text when the input is empty",
            "Adds a tooltip on hover",
            "Sets a default value for the input",
            "Makes the input field read-only",
          ],
          answer: "Displays hint text when the input is empty",
        },
        {
          question: (
            <div>
              <p>What does the <code>alert()</code> function do in JavaScript?</p>
              <CodeBlock
                language="javascript"
                code={`alert("Todo added successfully!");`}
              />
            </div>
          ),
          options: [
            "Shows a popup message with an OK button",
            "Logs a message in the console",
            "Sends a message to the server",
            "Displays text inside an input element",
          ],
          answer: "Shows a popup message with an OK button",
        },
        {
          question: (
            <div>
              <p>What value does the <code>checked</code> property return when a checkbox is selected?</p>
              <CodeBlock
                language="javascript"
                code={`let isChecked = document.getElementById("taskCheck").checked;\nconsole.log(isChecked);`}
              />
            </div>
          ),
          options: ["'checked'", "true", "'true'", "1"],
          answer: "true",
        },
        {
          question: (
            <div>
              <p>Which method is used to remove a child element from the DOM?</p>
              <CodeBlock
                language="javascript"
                code={`let list = document.getElementById("todoList");\nlet item = document.getElementById("todoItem");\nlist.removeChild(item);`}
              />
            </div>
          ),
          options: ["removeElement()", "deleteNode()", "removeChild()", "deleteChild()"],
          answer: "removeChild()",
        },
        {
          question: (
            <div>
              <p>What does the <code>classList.toggle()</code> method do?</p>
              <CodeBlock
                language="javascript"
                code={`document.getElementById("taskText").classList.toggle("completed");`}
              />
            </div>
          ),
          options: [
            "Adds a class permanently",
            "Removes all classes from the element",
            "Toggles between adding and removing a class",
            "Creates a new class in CSS",
          ],
          answer: "Toggles between adding and removing a class",
        },
        {
          question: (
            <div>
              <p>Which of the following replaces both <code>classList.add()</code> and <code>classList.remove()</code>?</p>
              <CodeBlock
                language="javascript"
                code={`// Instead of\nel.classList.add("done");\nel.classList.remove("done");\n\n// Use\nel.classList.toggle("done");`}
              />
            </div>
          ),
          options: ["classList.switch()", "classList.toggle()", "classList.change()", "classList.replace()"],
          answer: "classList.toggle()",
        },
        {
          question: (
            <div>
              <p>Write the HTML code that shows an alert message when the button is clicked.</p>
              <CodeBlock
                language="html"
                code={`<button onclick="alert('Task deleted!')">Delete Task</button>`}
              />
            </div>
          ),
          options: [
            "<button alert()>Delete Task</button>",
            "<button onclick='alert(`Task deleted!`)' >Delete Task</button>",
            "<button onalert='Task deleted!'>Delete</button>",
            "<button message='Task deleted!'></button>",
          ],
          answer: "<button onclick='alert(`Task deleted!`)' >Delete Task</button>",
        },
        {
          question:
            "What does the alert() function return after the user clicks OK?",
          options: [
            "true",
            "false",
            "undefined",
            "The message string itself",
          ],
          answer: "undefined",
        },
        {
          question:
            "Which property would you use to check if a checkbox is ticked or not?",
          options: ["checked", "selected", "value", "status"],
          answer: "checked",
        },
        {
          question:
            "Which DOM method removes an element from its parent node?",
          options: ["removeChild()", "deleteElement()", "clearNode()", "removeElement()"],
          answer: "removeChild()",
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

export default Todos_Application_MCQ_2;
