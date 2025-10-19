
import React, { useState, useEffect, useRef } from "react";
const HTML_HyperLinks_MCQ = ({ onComplete }) => {
  const originalQuestions  = [
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<hyperlink>"],
      answer: "<a>",
    },
    {
      question: "Which attribute specifies the destination URL in a hyperlink?",
      options: ["src", "href", "link", "url"],
      answer: "href",
    },
    {
      question: "How do you make a link open in a new tab?",
      options: [
        'target="_self"',
        'target="_new"',
        'target="_blank"',
        'target="tab"',
      ],
      answer: 'target="_blank"',
    },
    {
      question: "What is the correct HTML for creating an email link?",
      options: [
        '<a href="email:info@example.com">Email Us</a>',
        '<a href="mailto:info@example.com">Email Us</a>',
        '<mail href="info@example.com">Email Us</mail>',
        '<a mail="info@example.com">Email Us</a>',
      ],
      answer: '<a href="mailto:info@example.com">Email Us</a>',
    },
    {
      question: "Which attribute is used to provide a tooltip for a link?",
      options: ["tip", "title", "alt", "hover"],
      answer: "title",
    },
    {
      question: "Which tag can be used inside an anchor tag?",
      options: ["<img>", "<p>", "<h1>", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "What is the default value of the target attribute in a hyperlink?",
      options: ["_self", "_blank", "_parent", "_top"],
      answer: "_self",
    },
    {
      question: "Which attribute can link to a specific section on the same page?",
      options: ["id", "name", "anchor", "href with #id"],
      answer: "href with #id",
    },
    {
      question: "What is the purpose of the download attribute in the anchor tag?",
      options: [
        "To download the webpage",
        "To prompt file download",
        "To open link in a new window",
        "To reload the page",
      ],
      answer: "To prompt file download",
    },
    {
      question: "Which protocol is used in the href attribute for telephone links?",
      options: ["sms:", "tel:", "phone:", "callto:"],
      answer: "tel:",
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
        <h3 className="mcq-title">HTML Hyperlinks - MCQs</h3>

   
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

export default HTML_HyperLinks_MCQ;
