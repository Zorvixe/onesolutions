import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";
const Scope_Namespaces_MCQ = ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>What is an object in Python?</p>
        <CodeBlock language="python" code={`x = 10\nname = "Python"\ndef func(): pass`} />
      </div>
    ),
    options: [
      "Only a string",
      "Only an integer",
      "Anything assignable to a variable",
      "Only a function"
    ],
    answer: "Anything assignable to a variable",
  },
  {
    question: (
      <div>
        <p>What is a namespace?</p>
        <CodeBlock language="python" code={`# Namespace example\nglobal_var = 10\ndef func():\n    local_var = 5`} />
      </div>
    ),
    options: [
      "A type of variable",
      "A collection of names and objects they reference",
      "A Python module",
      "A built-in function"
    ],
    answer: "A collection of names and objects they reference",
  },
  {
    question: (
      <div>
        <p>Which namespace lasts until the program ends?</p>
        <CodeBlock language="python" code={`global_var = 10  `} />
      </div>
    ),
    options: ["Local", "Global", "Built-in", "Temporary"],
    answer: "Global",
  },
  {
    question: (
      <div>
        <p>What is the scope of a name?</p>
        <CodeBlock language="python" code={`# Scope example\ndef func():\n    x = 5  `} />
      </div>
    ),
    options: [
      "The location of the variable in memory",
      "The region of program where the name has meaning",
      "A Python module",
      "A built-in function"
    ],
    answer: "The region of program where the name has meaning",
  },
  {
    question: (
      <div>
        <p>Which namespace is created when a function is called?</p>
        <CodeBlock language="python" code={`def func():\n    x = 10  `} />
      </div>
    ),
    options: ["Local", "Global", "Built-in", "Module"],
    answer: "Local",
  },
  {
    question: (
      <div>
        <p>How do you modify a global variable inside a function?</p>
        <CodeBlock language="python" code={`x = 10\ndef func():\n    global x\n    x = 20`} />
      </div>
    ),
    options: ["use 'local'", "use 'global'", "use 'self'", "Cannot modify"],
    answer: "use 'global'",
  },
  {
    question: (
      <div>
        <p>What does Python search first when resolving a name?</p>
  
      </div>
    ),
    options: [
      "Global → Local → Built-in",
      "Built-in → Global → Local",
      "Local → Global → Built-in",
      "Local → Built-in → Global"
    ],
    answer: "Local → Global → Built-in",
  },
  {
    question: (
      <div>
        <p>Which of the following is part of the Built-in Namespace?</p>
        <CodeBlock language="python" code={`id(10)  `} />
      </div>
    ),
    options: ["id()", "x defined in function", "y defined in module", "variable z inside loop"],
    answer: "id()",
  },
  {
    question: (
      <div>
        <p>A variable defined outside all functions is called?</p>
        <CodeBlock language="python" code={`x = 10  `} />
      </div>
    ),
    options: ["Local variable", "Global variable", "Temporary variable", "Constant"],
    answer: "Global variable",
  },
  {
    question: (
      <div>
        <p>A variable defined inside a function is called?</p>
        <CodeBlock language="python" code={`def func():\n    x = 5  `} />
      </div>
    ),
    options: ["Local variable", "Global variable", "Module variable", "Class variable"],
    answer: "Local variable",
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
 
   // Timer logic
   useEffect(() => {
     if (completed) return;
     setTimeLeft(10);
     timerRef.current = setInterval(() => {
       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
     }, 1000);
     return () => clearInterval(timerRef.current);
   }, [currentIndex, completed]);
 
   const nextQuestion = () => {
     clearInterval(timerRef.current);
     setSelectedAnswer(null);
     setFeedback(null);
 
     if (!showingSkipped) {
       if (currentIndex + 1 < questions.length) setCurrentIndex((prev) => prev + 1);
       else if (skippedQuestions.length > 0) {
         setShowingSkipped(true);
         setCurrentIndex(0);
       } else {
         setCompleted(true);
         if (onComplete) onComplete();
       }
     } else {
       if (currentIndex + 1 < skippedQuestions.length) setCurrentIndex((prev) => prev + 1);
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
 
     setScore((prev) => prev + points);
     setFeedback({ correct: isCorrect, points });
   };
 
   const handleSkip = () => {
     if (!showingSkipped) setSkippedQuestions((prev) => [...prev, currentIndex]);
     nextQuestion();
   };
 
   const currentQuestion = showingSkipped
     ? questions[skippedQuestions[currentIndex]]
     : questions[currentIndex];
 
   const questionNumber = showingSkipped
     ? questions.length - skippedQuestions.length + currentIndex + 1
     : currentIndex + 1;
 
   const percentage = (score / (questions.length * 10)) * 100;
 
   return (
     <div className="mcq-container full-width">
       <h3 className="mcq-title">Scope Namespaces - MCQs</h3>
 
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
             <div className={`mcq-feedback ${feedback.correct ? "correct" : "wrong"}`}>
               <i
                 className={`bi ${feedback.correct ? "bi-check-circle" : "bi-x-circle"}`}
                 style={{ marginRight: "10px", fontSize: "20px" }}
               ></i>
               {feedback.correct
                 ? `+${feedback.points}`
                 : `-${Math.abs(feedback.points)}`}
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
         <div className="mcq-completed shadow">
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

export default Scope_Namespaces_MCQ;
