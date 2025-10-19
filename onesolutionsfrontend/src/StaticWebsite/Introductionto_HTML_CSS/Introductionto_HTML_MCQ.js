import React, { useState, useEffect, useRef } from "react";

const HTMLBasicStructure_MCQ = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: "What is the correct basic structure of an HTML document?",
      options: [
        "<html><head><body></body></head></html>",
        "<!DOCTYPE html><html><head></head><body></body></html>",
        "<html><body><head></head></body></html>",
        "<!DOCTYPE html><body><html></html></body>"
      ],
      answer: "<!DOCTYPE html><html><head></head><body></body></html>"
    },
    {
      question: "The HTML h1 element is known as the ______ element.",
      options: ["paragraph", "button", "main heading", "subheading"],
      answer: "main heading"
    },
    {
      question: "Which of the following is the start tag of an HTML paragraph element?",
      options: ["<paragraph>", "<p>", "<para>", "<pg>"],
      answer: "<p>"
    },
    {
      question: "Which of the following is the start tag of an HTML button element?",
      options: ["<btn>", "<button>", "<input type='button'>", "<click>"],
      answer: "<button>"
    },
    {
      question: "Which tag is used to define the title of an HTML document?",
      options: ["<meta>", "<head>", "<title>", "<header>"],
      answer: "<title>"
    },
    {
      question: "Which attribute is used to specify the URL of a link in HTML?",
      options: ["href", "src", "link", "url"],
      answer: "href"
    },
    {
      question: "Which tag is used to insert an image in HTML?",
      options: ["<img>", "<image>", "<picture>", "<src>"],
      answer: "<img>"
    },
    {
      question: "Which tag defines an unordered list?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: "<ul>"
    },
    {
      question: "Which tag is used to create a line break in HTML?",
      options: ["<br>", "<break>", "<lb>", "<newline>"],
      answer: "<br>"
    },
    {
      question: "Which HTML element is used to group paragraph and heading elements together as a section?",
      options: ["<div>", "<span>", "<section>", "<body>"],
      answer: "<section>"
    }
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
        <h3 className="mcq-title">Introduction to HTML - MCQs</h3>
  
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

export default HTMLBasicStructure_MCQ;
