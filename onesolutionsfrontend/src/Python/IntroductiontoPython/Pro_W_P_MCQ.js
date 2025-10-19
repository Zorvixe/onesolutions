import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; 
import "./Pro_W_P_MCQ.css";
 

const Pro_W_P_MCQ = ({ onComplete }) => {
 const questionsData = [
  {
    question: "Python is which type of language?",
    options: ["Compiled", "Interpreted", "Assembly", "Machine"],
    answer: "Interpreted",
  },
  {
    question: "Who developed Python?",
    options: ["Dennis Ritchie", "James Gosling", "Guido van Rossum", "Bjarne Stroustrup"],
    answer: "Guido van Rossum",
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["func", "define", "def", "function"],
    answer: "def",
  },
  {
    // ✅ Question with CodeBlock
    question: (
      <div>
        <p>What will be the output of the following code?</p>
        <CodeBlock
          language="python"
          code={`x = 3 ** 2\nprint(x)`}
        />
      </div>
    ),
    options: ["6", "9", "8", "5"],
    answer: "9",
  },
  {
    question: (
      <div>
        <p>What is the correct file extension for Python files?</p>
      </div>
    ),
    options: [".pyth", ".pt", ".py", ".pyt"],
    answer: ".py",
  },
  {
    question: "Which data type is immutable in Python?",
    options: ["List", "Dictionary", "Tuple", "Set"],
    answer: "Tuple",
  },
  {
    question: "Which operator is used for floor division?",
    options: ["/", "//", "%", "**"],
    answer: "//",
  },
  {
    question: (
      <div>
        <p>Which method adds an item to the end of a list?</p>
        <CodeBlock
          language="python"
          code={`my_list = [1, 2]\nmy_list.append(3)\nprint(my_list)`}
        />
      </div>
    ),
    options: ["append()", "insert()", "extend()", "add()"],
    answer: "append()",
  },
  {
    question: (
      <div>
        <p>What does this code print?</p>
        <CodeBlock
          language="python"
          code={`a = 10\nb = 3\nprint(a // b)`}
        />
      </div>
    ),
    options: ["3.3", "3", "4", "Error"],
    answer: "3",
  },
  {
    question: "What is the correct way to start a Python class?",
    options: ["class MyClass:", "MyClass class:", "def class MyClass:", "class: MyClass"],
    answer: "class MyClass:",
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
       <h3 className="mcq-title">Programming With Python - MCQs</h3>
 
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
 
 export default Pro_W_P_MCQ;
 