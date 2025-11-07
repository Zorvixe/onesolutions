import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; 

const Inp_Oup_Basics_MCQ = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock
            language="python"
            code={`greeting = 'Hello'\nname = 'Alice'\nresult = greeting + ' ' + name\nprint(result)`}
          />
        </div>
      ),
      options: ["HelloAlice", "Hello Alice", "Hello + Alice", "Error"],
      answer: "Hello Alice",
    },
    {
      question: (
        <div>
          <p>What happens if you try to concatenate a string with an integer directly in Python?</p>
          <CodeBlock
            language="python"
            code={`greeting = 'Hello'\nage = 10\nprint(greeting + age)`}
          />
        </div>
      ),
      options: ["Hello10", "Hello 10", "TypeError", "Hello + 10"],
      answer: "TypeError",
    },
    {
      question: "Which operator is used to repeat a string multiple times in Python?",
      options: ["+", "*", "%", "&"],
      answer: "*",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock
            language="python"
            code={`text = 'Python'\nprint(text * 2)`}
          />
        </div>
      ),
      options: ["Python2", "Python Python", "PythonPython", "Error"],
      answer: "PythonPython",
    },
    {
      question: "What does the len() function return when applied to a string?",
      options: ["Number of words", "Number of spaces", "Number of characters", "Number of sentences"],
      answer: "Number of characters",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock language="python" code={`text = 'Hello'\nprint(len(text))`} />
        </div>
      ),
      options: ["4", "5", "6", "Error"],
      answer: "5",
    },
    {
      question: "What is the data type of the value returned by input() function in Python?",
      options: ["int", "str", "float", "Depends on input"],
      answer: "str",
    },
    {
      question: "Which of the following statements is correct about input()?",
      options: [
        "It always returns an integer",
        "It always returns a string",
        "It returns the exact datatype entered by the user",
        "It cannot be used for numbers"
      ],
      answer: "It always returns a string",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock language="python" code={`text = 'Hello'\nprint(text[0])\nprint(text[4])`} />
        </div>
      ),
      options: ["H and o", "H and e", "0 and 4", "Error"],
      answer: "H and o",
    },
    {
      question: (
        <div>
          <p>What error will the following code produce?</p>
          <CodeBlock language="python" code={`text = 'Hello'\nprint(text[5])`} />
        </div>
      ),
      options: ["ValueError", "IndexError", "KeyError", "TypeError"],
      answer: "IndexError",
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
      } else setCompleted(true);
    } else {
      if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex(prev => prev + 1);
      else setCompleted(true);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentQuestion = showingSkipped
      ? questions[skippedQuestions[currentIndex]]
      : questions[currentIndex];

    const isCorrect = selectedAnswer === currentQuestion.answer;

    // Time-based scoring
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
      <h3 className="mcq-title">Input Output Basics - MCQs</h3>

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

export default Inp_Oup_Basics_MCQ;
