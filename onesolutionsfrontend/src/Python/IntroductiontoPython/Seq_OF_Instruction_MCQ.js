import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; 
import "./Pro_W_P_MCQ.css";

const Seq_OF_Instruction_MCQ = ({ onComplete }) => {
  const questionsData = [
    {
      question: "What is a program?",
      options: [
        "A sequence of instructions given to a computer",
        "A software installation",
        "A hardware device",
        "A file extension",
      ],
      answer: "A sequence of instructions given to a computer",
    },
    {
      question: "When is a variable created in Python?",
      options: [
        "When declared explicitly",
        "When assigned a value for the first time",
        "When printed",
        "When deleted",
      ],
      answer: "When assigned a value for the first time",
    },
    {
      question: (
        <div>
          <p>What will this code output?</p>
          <CodeBlock language="python" code={`age = 10\nprint(age)`} />
        </div>
      ),
      options: ["10", '"age"', "Error", "None"],
      answer: "10",
    },
    {
      question: (
        <div>
          <p>What happens if you print a variable name in quotes?</p>
          <CodeBlock language="python" code={`age = 10\nprint("age")`} />
        </div>
      ),
      options: [
        "Prints the value of the variable",
        "Prints the variable name as text",
        "Throws SyntaxError",
        "Prints None",
      ],
      answer: "Prints the variable name as text",
    },
    {
      question: "How does Python execute code?",
      options: [
        "Randomly",
        "Line-by-line",
        "Print statements first",
        "Variables first",
      ],
      answer: "Line-by-line",
    },
    {
      question: (
        <div>
          <p>Which error occurs if indentation is incorrect?</p>
          <CodeBlock language="python" code={`  print(age)`} />
        </div>
      ),
      options: ["NameError", "SyntaxError", "IndentationError", "TypeError"],
      answer: "IndentationError",
    },
    {
      question: "What is an expression in Python?",
      options: [
        "A combination of values, variables, and operators",
        "A function call",
        "A comment",
        "A print statement",
      ],
      answer: "A combination of values, variables, and operators",
    },
    {
      question: (
        <div>
          <p>What will be the output?</p>
          <CodeBlock language="python" code={`print(5 * 2 + 3 * 4)`} />
        </div>
      ),
      options: ["22", "17", "20", "Error"],
      answer: "22",
    },
    {
      question: (
        <div>
          <p>What will be the output?</p>
          <CodeBlock language="python" code={`count = 5\ncount += 1\nprint(count)`} />
        </div>
      ),
      options: ["5", "6", "Error", "None"],
      answer: "6",
    },
    {
      question: (
        <div>
          <p>Which code will throw an error?</p>
          <CodeBlock language="python" code={`print(age)\nage = 10`} />
        </div>
      ),
      options: [
        "print(age)\nage = 10",
        "age = 10\nprint(age)",
        'print("age")',
        "count = 5\ncount += 1\nprint(count)",
      ],
      answer: "print(age)\nage = 10",
    },
  ];

  // Shuffle questions
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
      } else setCompleted(true);
    } else {
      if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex(prev => prev + 1);
      else setCompleted(true);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentQuestionObj = showingSkipped
      ? questions[skippedQuestions[currentIndex]]
      : questions[currentIndex];

    const isCorrect = selectedAnswer === currentQuestionObj.answer;

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

  const currentQuestionObj = showingSkipped
    ? questions[skippedQuestions[currentIndex]]
    : questions[currentIndex];

  const questionNumber = showingSkipped
    ? questions.length - skippedQuestions.length + currentIndex + 1
    : currentIndex + 1;

  const percentage = (score / (questions.length * 10)) * 100;

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">Sequence of Instructions - MCQs</h3>

      {!completed ? (
        <div className="mcq-question-block">
          <p className="mcq-question">
            Q{questionNumber}. {currentQuestionObj.question}
          </p>

          <ul className="mcq-options">
            {currentQuestionObj.options.map(option => (
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

export default Seq_OF_Instruction_MCQ;
