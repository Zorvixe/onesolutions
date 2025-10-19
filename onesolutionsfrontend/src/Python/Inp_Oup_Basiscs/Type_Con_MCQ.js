import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; 
const Type_Con_MCQ = ({ onComplete }) => {
   const originalQuestions = [
    {
      question: "Which function is used to check the data type of a variable in Python?",
      options: ["datatype()", "typeof()", "type()", "checkType()"],
      answer: "type()",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock language="python" code={`x = 10\nprint(type(x))`} />
        </div>
      ),
      options: ["int", "<class 'int'>", "number", "datatype"],
      answer: "<class 'int'>",
    },
    {
      question: "Which function is used to convert a value into an integer in Python?",
      options: ["toInt()", "integer()", "int()", "convertInt()"],
      answer: "int()",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock language="python" code={`num = int('123')\nprint(num)`} />
        </div>
      ),
      options: ["'123'", "123", "Error", "12.3"],
      answer: "123",
    },
    {
      question: (
        <div>
          <p>What happens when you try to execute the following code?</p>
          <CodeBlock language="python" code={`num = int('12.3')`} />
        </div>
      ),
      options: [
        "Converts successfully to 12",
        "Converts successfully to 12.3",
        "ValueError",
        "TypeError",
      ],
      answer: "ValueError",
    },
    {
      question: "Which function converts any data type to a string in Python?",
      options: ["string()", "str()", "toString()", "convertString()"],
      answer: "str()",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock language="python" code={`num = 123\ntext = str(num)\nprint(text + ' is a number')`} />
        </div>
      ),
      options: [
        "123 is a number",
        "'123 is a number'",
        "Error",
        "num is a number",
      ],
      answer: "123 is a number",
    },
    {
      question: "Which of the following is NOT a valid type conversion function in Python?",
      options: ["int()", "float()", "str()", "stringify()"],
      answer: "stringify()",
    },
    {
      question: (
        <div>
          <p>What will be the output of the following code?</p>
          <CodeBlock language="python" code={`print(bool(0))`} />
        </div>
      ),
      options: ["True", "False", "0", "Error"],
      answer: "False",
    },
    {
      question: "Which of the following conversions is invalid?",
      options: [
        "int('123')",
        "float('12.5')",
        "str(123)",
        "int('abc')",
      ],
      answer: "int('abc')",
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
        <h3 className="mcq-title">Type Converstion - MCQs</h3>
  
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

export default Type_Con_MCQ;
