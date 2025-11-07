import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const List_MCQ = ({ onComplete }) => {
 const questionsData = [ 
  {
    question: (
      <div>
        <p>How do you create a list in Python?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3]\nprint(my_list)`}
        />
      </div>
    ),
    options: ["{}", "[]", "()", "<>"],
    answer: "[]",
  },
  {
    question: (
      <div>
        <p>Which method adds an item at the end of the list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2]\nmy_list.append(3)\nprint(my_list)`}
        />
      </div>
    ),
    options: ["add()", "append()", "insert()", "extend()"],
    answer: "append()",
  },
  {
    question: (
      <div>
        <p>What is the output of len([1,2,3])?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3]\nprint(len(my_list))`}
        />
      </div>
    ),
    options: ["2", "3", "1", "Error"],
    answer: "3",
  },
  {
    question: (
      <div>
        <p>Which of the following is a nested list?</p>
        <CodeBlock
          language="python"
          code={`list1 = [1,2,3]\nlist2 = [[1,2],[3,4]]\nlist3 = [1,[2,3]]`}
        />
      </div>
    ),
    options: ["[1, 2, 3]", "[[1,2],[3,4]]", "[1,[2,3]]", "Both 2 & 3"],
    answer: "Both 2 & 3",
  },
  {
    question: (
      <div>
        <p>How do you access the first element in a list <code>my_list</code>?</p>
        <CodeBlock
          language="python"
          code={`my_list = [10, 20, 30]\nprint(my_list[0])`}
        />
      </div>
    ),
    options: ["my_list[0]", "my_list[1]", "my_list.first()", "my_list[-1]"],
    answer: "my_list[0]",
  },
  {
    question: (
      <div>
        <p>Which operation concatenates two lists?</p>
        <CodeBlock
          language="python"
          code={`list1 = [1,2]\nlist2 = [3,4]\nprint(list1 + list2)`}
        />
      </div>
    ),
    options: ["+", "-", "*", "&"],
    answer: "+",
  },
  {
    question: (
      <div>
        <p>How do you repeat a list 3 times?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3]\nprint(my_list * 3)`}
        />
      </div>
    ),
    options: ["list * 3", "list.repeat(3)", "list ^ 3", "list.append(3)"],
    answer: "list * 3",
  },
  {
    question: (
      <div>
        <p>Which statement is true about lists?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, "two", 3.0]\nmy_list[0] = 10\nprint(my_list)`}
        />
      </div>
    ),
    options: ["Mutable", "Immutable", "Fixed size", "Cannot store mixed types"],
    answer: "Mutable",
  },
  {
    question: (
      <div>
        <p>Which method removes and returns the last element of a list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [10, 20, 30]\nprint(my_list.pop())`}
        />
      </div>
    ),
    options: ["remove()", "delete()", "pop()", "discard()"],
    answer: "pop()",
  },
  {
    question: (
      <div>
        <p>What is the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2, 3, 4, 5]\nprint(my_list[1:4])`}
        />
      </div>
    ),
    options: ["[1, 2, 3]", "[2, 3, 4]", "[1, 2, 3, 4]", "[2, 3, 4, 5]"],
    answer: "[2, 3, 4]",
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
        <h3 className="mcq-title">Lists - MCQs</h3>
  
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

export default List_MCQ;
