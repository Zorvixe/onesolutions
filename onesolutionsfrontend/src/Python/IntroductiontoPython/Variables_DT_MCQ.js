import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks"; 
import "./Pro_W_P_MCQ.css"; // Reuse same styles

const Variables_DT_MCQ = ({ onComplete }) => {
  const questionsData = [
    {
      question: "What is a variable?",
      options: [
        "A container to store values",
        "A Python keyword",
        "A type of data",
        "An operator"
      ],
      answer: "A container to store values",
    },
    {
      question: "Which of the following is a valid Python variable name?",
      options: ["1name", "name_1", "name-1", "class"],
      answer: "name_1",
    },
    {
      question: (
        <div>
          <p>What will this code print?</p>
          <CodeBlock language="python" code={`age = 10\nprint(age)`} />
        </div>
      ),
      options: ["10", '"age"', "Error", "None"],
      answer: "10",
    },
    {
      question: (
        <div>
          <p>Which data type does the following value belong to?</p>
          <CodeBlock language="python" code={`"Hello World!"`} />
        </div>
      ),
      options: ["Integer", "Float", "String", "Boolean"],
      answer: "String",
    },
    {
      question: (
        <div>
          <p>What is the output of this code?</p>
          <CodeBlock language="python" code={`count = 5\ncount += 1\nprint(count)`} />
        </div>
      ),
      options: ["5", "6", "Error", "None"],
      answer: "6",
    },
    {
      question: (
        <div>
          <p>Which of the following is a Boolean value in Python?</p>
          <CodeBlock language="python" code={`True`} />
        </div>
      ),
      options: ["true", "True", "TRUE", "tRue"],
      answer: "True",
    },
    {
      question: (
        <div>
          <p>Which operator is used to assign a value to a variable?</p>
          <CodeBlock language="python" code={`age = 10`} />
        </div>
      ),
      options: ["==", "=", "+=", "-="],
      answer: "=",
    },
    {
      question: (
        <div>
          <p>What type of value is 24.5?</p>
          <CodeBlock language="python" code={`x = 24.5`} />
        </div>
      ),
      options: ["Integer", "Float", "String", "Boolean"],
      answer: "Float",
    },
    {
      question: (
        <div>
          <p>Which of the following can be used as a string?</p>
          <CodeBlock language="python" code={`'Hello'`} />
        </div>
      ),
      options: ["Hello", "'Hello'", "Both", "None"],
      answer: "Both",
    },
    {
      question: (
        <div>
          <p> What will this code output?</p>
          <CodeBlock language="python" code={`is_valid = True\nprint(is_valid)`} />
        </div>
      ),
      options: ["True", "true", "1", "0"],
      answer: "True",
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
         <h3 className="mcq-title">Variables & Data Types - MCQs</h3>
   
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
export default Variables_DT_MCQ;

