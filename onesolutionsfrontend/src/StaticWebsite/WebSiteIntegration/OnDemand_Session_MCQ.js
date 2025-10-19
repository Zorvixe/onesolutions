
import React, { useState, useEffect, useRef } from "react";

const OnDemand_Session_MCQ = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: "Which website allows you to upload images and get their URLs easily?",
      options: ["Imgur", "Cloudinary", "Flickr", "Dropbox"],
      answer: "Cloudinary",
    },
    {
      question: "What is the correct URL to visit Cloudinary’s website?",
      options: [
        "https://cloudinary.net/",
        "https://www.cloudinary.org/",
        "https://cloudinary.com/",
        "https://mycloudinary.io/",
      ],
      answer: "https://cloudinary.com/",
    },
    {
      question: "Which HTML element is used to link HTML and CSS files?",
      options: ["<style>", "<script>", "<link>", "<css>"],
      answer: "<link>",
    },
    {
      question: "Where should the HTML link element be placed in a webpage?",
      options: [
        "Inside the body element",
        "Inside the footer element",
        "Inside the head element",
        "Anywhere in the document",
      ],
      answer: "Inside the head element",
    },
    {
      question: "Is the HTML link element a void element?",
      options: ["Yes", "No"],
      answer: "Yes",
    },
    {
      question: "What is the purpose of the HTML link element?",
      options: [
        "To link JavaScript files",
        "To link CSS stylesheets or external resources",
        "To create a hyperlink",
        "To display an image",
      ],
      answer: "To link CSS stylesheets or external resources",
    },
    {
      question: "Which software is used to write and edit HTML, CSS, and JavaScript code?",
      options: ["Google Docs", "VS Code", "Microsoft Excel", "Adobe Photoshop"],
      answer: "VS Code",
    },
    {
      question: "Visual Studio Code is developed by which company?",
      options: ["Apple", "Google", "Microsoft", "IBM"],
      answer: "Microsoft",
    },
    {
      question: "What type of element is the HTML link tag?",
      options: ["Container element", "Void element", "Block element", "Inline element"],
      answer: "Void element",
    },
    {
      question: "In HTML, which attribute of the link element specifies the stylesheet file path?",
      options: ["rel", "href", "src", "path"],
      answer: "href",
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
          <h3 className="mcq-title">OnDemand Session - MCQs</h3>
  
     
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
  
export default OnDemand_Session_MCQ;
