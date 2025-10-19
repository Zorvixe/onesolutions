import React, { useState, useEffect, useRef } from "react";
const Website_Integration_MCQ_2 = ({ onComplete }) => {
  const originalQuestions = [
    {
      question:
        "Why are unique IDs required for Carousels in the Detailed View Sections?",
      options: [
        "To apply styles to the carousel",
        "To ensure each carousel works independently",
        "To change the background image",
        "To make the HTML valid",
      ],
      answer: "To ensure each carousel works independently",
    },
    {
      question:
        "Which step is needed to display the Golden Temple Detailed View Section when clicking its card?",
      options: [
        "Add unique section container and onclick to Golden Temple Card",
        "Add new CSS for background color",
        "Add onclick attribute to the Home Section",
        "Add multiple images in one section",
      ],
      answer: "Add unique section container and onclick to Golden Temple Card",
    },
    {
      question:
        "What must be added to navigate back to the Favourite Places Section from a Detailed View Section?",
      options: [
        "A div element with id",
        "An HTML button element with onclick attribute",
        "A link tag inside head",
        "A CSS hover effect",
      ],
      answer: "An HTML button element with onclick attribute",
    },
    {
      question:
        "If two carousels have the same id in one HTML page, what will happen?",
      options: [
        "Only the first carousel will work properly",
        "Both carousels will work together",
        "The browser will ignore both carousels",
        "The background image will disappear",
      ],
      answer: "Only the first carousel will work properly",
    },
    {
      question:
        "Which HTML tag is used to start an unordered list in HTML?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: "<ul>",
    },
    {
      question:
        "Which HTML tag is used to define each list item within a list?",
      options: ["<li>", "<ul>", "<ol>", "<item>"],
      answer: "<li>",
    },
    {
      question:
        "By default, list items in an unordered list are marked with:",
      options: ["Numbers", "Bullets", "Letters", "None"],
      answer: "Bullets",
    },
    {
      question:
        "Which CSS property is used to style the type of list marker?",
      options: ["list-style-type", "marker-style", "bullet-type", "display"],
      answer: "list-style-type",
    },
    {
      question:
        "Which HTML tag is used to start an ordered list in HTML?",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
      answer: "<ol>",
    },
    {
      question:
        "Which of the following is a valid value of CSS list-style-type property for an ordered list?",
      options: [
        "square",
        "upper-roman",
        "circle",
        "disc",
      ],
      answer: "upper-roman",
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
            <h3 className="mcq-title">WebSite Integration Part 1 - MCQs</h3>
    
       
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
export default Website_Integration_MCQ_2;
