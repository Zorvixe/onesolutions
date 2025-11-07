import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Workingwith_Lists_MCQ = ({ onComplete }) => {
const questionsData = [
  {
    question: (
      <div>
        <p>What is an object in Python?</p>
      </div>
    ),
    options: [
      "Only numbers and strings",
      "Anything that can be assigned to a variable",
      "Only lists and tuples",
      "Only functions"
    ],
    answer: "Anything that can be assigned to a variable",
  },
  {
    question: (
      <div>
        <p>Which function is used to find the unique identifier of an object?</p>
        <CodeBlock
          language="python"
          code={`a = [1, 2, 3]\nprint(id(a))`}
        />
      </div>
    ),
    options: ["identity()", "unique()", "id()", "object_id()"],
    answer: "id()",
  },
  {
    question: (
      <div>
        <p>When a list is assigned to another variable, both variables refer to the ______.</p>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3]\nlist_b = list_a\nprint(id(list_a) == id(list_b))`}
        />
      </div>
    ),
    options: ["different lists", "same object", "copy of the list", "temporary object"],
    answer: "same object",
  },
  {
    question: (
      <div>
        <p>What happens if you modify a list through one reference variable?</p>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3]\nlist_b = list_a\nlist_b.append(4)\nprint(list_a)`}
        />
      </div>
    ),
    options: [
      "Only list_b changes",
      "Only list_a changes",
      "Both list_a and list_b change",
      "Program throws an error"
    ],
    answer: "Both list_a and list_b change",
  },
  {
    question: (
      <div>
        <p>What happens when you assign a new list to a variable?</p>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2, 3]\nlist_b = list_a\nlist_b = [4, 5, 6]\nprint(list_a)`}
        />
      </div>
    ),
    options: [
      "list_a also changes",
      "list_a remains the same",
      "Both lists are cleared",
      "Error due to reassignment"
    ],
    answer: "list_a remains the same",
  },
  {
    question: (
      <div>
        <p>Which type of assignment creates a new object?</p>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2]\nlist_a = [3, 4]`}
        />
      </div>
    ),
    options: ["Simple assignment", "Compound assignment", "In-place modification", "Reference copy"],
    answer: "Simple assignment",
  },
  {
    question: (
      <div>
        <p>Which operation updates the existing list instead of creating a new one?</p>
        <CodeBlock
          language="python"
          code={`list_a = [1, 2]\nlist_a += [3, 4]\nprint(list_a)`}
        />
      </div>
    ),
    options: [
      "Simple assignment (=)",
      "Compound assignment (+=)",
      "New object creation",
      "append() method"
    ],
    answer: "Compound assignment (+=)",
  },
  {
    question: (
      <div>
        <p>When you modify a mutable object inside a list, what happens?</p>
        <CodeBlock
          language="python"
          code={`x = [[1, 2], [3, 4]]\ny = x\nx[0].append(5)\nprint(y)`}
        />
      </div>
    ),
    options: [
      "Only x changes",
      "Only y changes",
      "Both x and y change",
      "Throws an error"
    ],
    answer: "Both x and y change",
  },
  {
    question: (
      <div>
        <p>When you modify an immutable object in a list, what happens?</p>
        <CodeBlock
          language="python"
          code={`x = [1, 2, 3]\ny = x\nx[0] = 10\nprint(y)`}
        />
      </div>
    ),
    options: [
      "Both x and y change",
      "Only x changes (new object assigned)",
      "Reference error occurs",
      "Changes reflect in both"
    ],
    answer: "Only x changes (new object assigned)",
  },
  {
    question: (
      <div>
        <p>Which statement about Python object identity is correct?</p>
      </div>
    ),
    options: [
      "Two variables can never share the same id",
      "Mutable objects can have changing ids",
      "The id of an object relates to its memory location",
      "Strings always have the same id across runs"
    ],
    answer: "The id of an object relates to its memory location",
  },
];



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
        } else {
          setCompleted(true);
          if (onComplete) onComplete();
        }
      } else {
        if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex(prev => prev + 1);
        else {
          setCompleted(true);
          if (onComplete) onComplete();
        }
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
        <h3 className="mcq-title">Working With Lists - MCQs</h3>
  
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

export default Workingwith_Lists_MCQ;
