import React, { useState, useEffect, useRef } from "react";


const Website_Integration_MCQ_1 = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: "Where should the CCBP UI Kit Script Code be placed?",
      options: [
        "Inside the head tag",
        "Just before the closing body tag",
        "Inside a div container",
        "At the top of the HTML document",
      ],
      answer: "Just before the closing body tag",
    },
    {
      question:
        "Which display utility helps show or hide section containers based on user actions?",
      options: [
        "Toggle Utility",
        "Display Utility",
        "Visibility Utility",
        "Action Utility",
      ],
      answer: "Display Utility",
    },
    {
      question:
        "To occupy the background image to the entire content, what should you remove from the element?",
      options: [
        "Padding",
        "Border",
        "Height",
        "Margin",
      ],
      answer: "Height",
    },
    {
      question:
        "Which HTML attribute is used to uniquely identify elements within an HTML document?",
      options: ["id", "src", "class", "all of the above"],
      answer: "id",
    },
    {
      question:
        "What prefix should section container IDs have to work with CCBP UI Kit?",
      options: ["container", "section", "page", "ui"],
      answer: "section",
    },
    {
      question:
        "Which HTML attribute triggers an event when an element is clicked?",
      options: ["onhover", "onclick", "onsubmit", "onpress"],
      answer: "onclick",
    },
    {
      question:
        "When integrating sections, where should you add the onclick attribute for navigation between sections?",
      options: [
        "On the section container",
        "On the HTML button element",
        "On the HTML head element",
        "On the link element",
      ],
      answer: "On the HTML button element",
    },
    {
      question:
        "Which step is required to display Favourite Places Section when in Home Section?",
      options: [
        "Change ids of Section Containers with section prefix",
        "Add onclick attribute to CSS file",
        "Remove display utility",
        "Change script file location",
      ],
      answer: "Change ids of Section Containers with section prefix",
    },
    {
      question:
        "To display Detailed View Section when clicking on Taj Mahal Card, which step is correct?",
      options: [
        "Add onclick to Home Section",
        "Add onclick to Taj Mahal Card",
        "Change background color",
        "Add image inside header",
      ],
      answer: "Add onclick to Taj Mahal Card",
    },
    {
      question:
        "What happens if section container IDs do not start with 'section' while using CCBP UI Kit?",
      options: [
        "They still work as expected",
        "CCBP UI Kit will not function properly",
        "The style will change automatically",
        "Only one section will display",
      ],
      answer: "CCBP UI Kit will not function properly",
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
export default Website_Integration_MCQ_1;
