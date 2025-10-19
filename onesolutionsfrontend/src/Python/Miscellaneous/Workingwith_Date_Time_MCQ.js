import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../../CodeOutputBlocks";

const Workingwith_Date_Time_MCQ =  ({ onComplete }) => {
  const originalQuestions = [
  {
    question: (
      <div>
        <p>Which module in Python is used to work with dates and times?</p>
        <CodeBlock language="python" code={`import datetime`} />
      </div>
    ),
    options: ["time", "calendar", "datetime", "dateutil"],
    answer: "datetime",
  },
  {
    question: (
      <div>
        <p>How do you get today’s date as a date object?</p>
        <CodeBlock language="python" code={`from datetime import date\ntoday = date.today()`} />
      </div>
    ),
    options: ["date.today()", "date.now()", "datetime.today()", "datetime.now()"],
    answer: "date.today()",
  },
  {
    question: (
      <div>
        <p>Which class represents only time in the datetime module?</p>
        <CodeBlock language="python" code={`from datetime import time\nt = time(10, 30, 45)`} />
      </div>
    ),
    options: ["date", "time", "datetime", "timedelta"],
    answer: "time",
  },
  {
    question: (
      <div>
        <p>Which class combines date and time in a single object?</p>
        <CodeBlock language="python" code={`from datetime import datetime\ndt = datetime.now()`} />
      </div>
    ),
    options: ["date", "time", "datetime", "timedelta"],
    answer: "datetime",
  },
  {
    question: (
      <div>
        <p>Which method formats a datetime object into a string?</p>
        <CodeBlock language="python" code={`dt.strftime("%d-%m-%Y")`} />
      </div>
    ),
    options: ["strptime()", "strftime()", "format()", "to_string()"],
    answer: "strftime()",
  },
  {
    question: (
      <div>
        <p>Which method parses a datetime object from a string?</p>
        <CodeBlock language="python" code={`datetime.strptime("14-10-2025", "%d-%m-%Y")`} />
      </div>
    ),
    options: ["strptime()", "strftime()", "parse()", "from_string()"],
    answer: "strptime()",
  },
  {
    question: (
      <div>
        <p>Which class represents a duration or difference between two dates/times?</p>
        <CodeBlock language="python" code={`from datetime import timedelta\nd = timedelta(days=5)`} />
      </div>
    ),
    options: ["date", "time", "datetime", "timedelta"],
    answer: "timedelta",
  },
  {
    question: (
      <div>
        <p>How do you calculate a date 10 days from today?</p>
        <CodeBlock language="python" code={`from datetime import date, timedelta\nfuture_date = date.today() + timedelta(days=10)`} />
      </div>
    ),
    options: [
      "date.today() + 10",
      "date.today() + timedelta(days=10)",
      "datetime.now() + 10",
      "datetime.now() + timedelta(10)"
    ],
    answer: "date.today() + timedelta(days=10)",
  },
  {
    question: (
      <div>
        <p>Which attribute gives the month of a date object?</p>
        <CodeBlock language="python" code={`today = date.today()\nmonth = today.month`} />
      </div>
    ),
    options: ["today.year", "today.day", "today.month", "today.hour"],
    answer: "today.month",
  },
  {
    question: (
      <div>
        <p>Which format specifier gives the full weekday name in strftime()?</p>
        <CodeBlock language="python" code={`dt.strftime("%A")`} />
      </div>
    ),
    options: ["%a", "%A", "%w", "%W"],
    answer: "%A",
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

export default Workingwith_Date_Time_MCQ
