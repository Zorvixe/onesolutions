import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const NestedList_StringFormating_MCQ = ({ onComplete }) => {
 const originalQuestions = [
  {
    question: (
      <div>
        <p>How do you access the element 3 from <code>nested_list = [1, [2, 3], 4]</code>?</p>
        <CodeBlock language="python" code={`nested_list = [1, [2, 3], 4]`} />
      </div>
    ),
    options: ["nested_list[2]", "nested_list[1][1]", "nested_list[1][0]", "nested_list[0][1]"],
    answer: "nested_list[1][1]"
  },
  {
    question: (
      <div>
        <p>Which of the following is correct string formatting in Python?</p>
        <CodeBlock language="python" code={`name = "Alice"\n"My name is {name}".format(name=name)\nf"My name is {name}"\n"My name is {0}".format("Alice")`} />
      </div>
    ),
    options: [
      '"My name is {name}".format(name="Alice")',
      '"My name is {0}".format("Alice")',
      'f"My name is {name}"',
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question: (
      <div>
        <p>What is the output of <code>print(f"{0} {1}".format("Hello", "World"))</code>?</p>
        <CodeBlock language="python" code={`print(f"{0} {1}".format("Hello", "World"))`} />
      </div>
    ),
    options: ["0 1", "Hello World", "World Hello", "Error"],
    answer: "Hello World"
  },
  {
    question: (
      <div>
        <p>How do you access 2 from <code>nested_list = [1, [2, 3], 4]</code>?</p>
        <CodeBlock language="python" code={`nested_list = [1, [2, 3], 4]`} />
      </div>
    ),
    options: ["nested_list[1][0]", "nested_list[2][0]", "nested_list[1][1]", "nested_list[0][1]"],
    answer: "nested_list[1][0]"
  },
  {
    question: (
      <div>
        <p>What is the output of <code>print(f"{"name"} is {"age"}".format(name="Bob", age=30))</code>?</p>
        <CodeBlock language="python" code={`print(f"{name} is {age}".format(name="Bob", age=30))`} />
      </div>
    ),
    options: ["Bob is 30", "name is age", "Error", "Bob age"],
    answer: "Bob is 30"
  },
  {
    question: (
      <div>
        <p>Which of the following is true about nested lists?</p>
        <CodeBlock language="python" code={`nested_list = [1, [2, 3], 4]`} />
      </div>
    ),
    options: [
      "Nested lists cannot contain other lists",
      "Nested lists are lists inside lists",
      "Nested lists are immutable",
      "Nested lists can only contain integers"
    ],
    answer: "Nested lists are lists inside lists"
  },
  // ---------- New Questions ----------
  {
    question: (
      <div>
        <p>How can you access the last element of <code>nested_list = [1, [2, 3], 4]</code>?</p>
        <CodeBlock language="python" code={`nested_list = [1, [2, 3], 4]`} />
      </div>
    ),
    options: ["nested_list[-1]", "nested_list[2]", "nested_list[1][-1]", "nested_list[3]"],
    answer: "nested_list[-1]"
  },
  {
    question: (
      <div>
        <p>Which of the following is correct to get "Alice" from <code>nested_list = ["Bob", ["Charlie", "Alice"], "Eve"]</code>?</p>
        <CodeBlock language="python" code={`nested_list = ["Bob", ["Charlie", "Alice"], "Eve"]`} />
      </div>
    ),
    options: ["nested_list[1][1]", "nested_list[2][1]", "nested_list[1][0]", "nested_list[0][1]"],
    answer: "nested_list[1][1]"
  },
  {
    question: (
      <div>
        <p>What is the output of <code>len([1, [2, 3], 4])</code>?</p>
        <CodeBlock language="python" code={`len([1, [2, 3], 4])`} />
      </div>
    ),
    options: ["3", "4", "2", "Error"],
    answer: "3"
  },
  {
    question: (
      <div>
        <p>Which of the following is a valid way to create a nested list?</p>
        <CodeBlock language="python" code={`# Options shown below`} />
      </div>
    ),
    options: [
      "[1, [2, 3], 4]",
      "[1, 2, 3, 4]",
      "[[1, 2], [3, 4]]",
      "Both A and C"
    ],
    answer: "Both A and C"
  }
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
        <h3 className="mcq-title">NestedList StringFormating - MCQs</h3>
  
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

export default NestedList_StringFormating_MCQ;
