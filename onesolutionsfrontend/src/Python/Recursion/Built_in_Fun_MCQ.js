import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Built_in_Fun_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>What happens when a mutable object like a list is passed to a function?</p>
      </div>
    ),
    options: [
      "Changes inside the function affect the original list",
      "Original list remains unchanged",
      "Python throws an error",
      "List is copied automatically"
    ],
    answer: "Changes inside the function affect the original list",
  },
  {
    question: (
      <div>
        <p>Default arguments in Python are evaluated when?</p>
      </div>
    ),
    options: [
      "When the function is defined",
      "Every time the function is called",
      "Never evaluated",
      "Only when explicitly initialized"
    ],
    answer: "When the function is defined",
  },
  {
    question: "Which of these is NOT a Python built-in function?",
    options: ["print()", "len()", "sum()", "add()"],
    answer: "add()",
  },
  {
    question: (
      <div>
        <p>What will the following return?</p>
        <CodeBlock
          language="python"
          code={`min(5, 2, 8, 1)`}
        />
      </div>
    ),
    options: ["1", "2", "5", "8"],
    answer: "1",
  },
  {
    question: (
      <div>
        <p>What does the following return?</p>
        <CodeBlock
          language="python"
          code={`min('Python', 'Java')`}
        />
      </div>
    ),
    options: ["Java", "Python", "Error", "Depends on length"],
    answer: "Java",
  },
  {
    question: (
      <div>
        <p>What does this return?</p>
        <CodeBlock
          language="python"
          code={`max([10, 5, 8, 3])`}
        />
      </div>
    ),
    options: ["10", "5", "8", "3"],
    answer: "10",
  },
  {
    question: (
      <div>
        <p>What does this return?</p>
        <CodeBlock
          language="python"
          code={`sum([1, 2, 3, 4])`}
        />
      </div>
    ),
    options: ["10", "24", "1234", "None"],
    answer: "10",
  },
  {
    question: (
      <div>
        <p>What does the following return?</p>
        <CodeBlock
          language="python"
          code={`sorted([3, 1, 4, 2])`}
        />
      </div>
    ),
    options: ["[1, 2, 3, 4]", "[3, 1, 4, 2]", "[4, 3, 2, 1]", "Error"],
    answer: "[1, 2, 3, 4]",
  },
  {
    question: (
      <div>
        <p>What is the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`print(round(3.756, 2))`}
        />
      </div>
    ),
    options: ["3.75", "3.76", "3.7", "4"],
    answer: "3.76",
  },
  {
    question: (
      <div>
        <p>Which function returns the largest item in an iterable?</p>
      </div>
    ),
    options: ["sum()", "min()", "max()", "sorted()"],
    answer: "max()",
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
       <h3 className="mcq-title">Built in Functions - MCQs</h3>
 
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

export default Built_in_Fun_MCQ;
