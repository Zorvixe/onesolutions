import React, { useState, useEffect, useRef } from "react";


const Approachto_Develop_Layout_MCQ_2 = ({ onComplete }) => {
  const originalQuestions = [
    {
      question: "Which HTML element is used to define an image?",
      options: ["<p>", "<h1>", "<img>", "<div>"],
      answer: "<img>",
    },
    {
      question: "Which attribute in the HTML img tag specifies the image path?",
      options: ["src", "href", "alt", "link"],
      answer: "src",
    },
    {
      question: "When should you use a CSS background image instead of an HTML image?",
      options: [
        "When the image is part of the content",
        "When the image has text or HTML content over it",
        "When you want to change image size dynamically",
        "When the image tag is missing",
      ],
      answer: "When the image has text or HTML content over it",
    },
    {
      question: "The HTML image element is used to add images that are part of the content.",
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: "What is the purpose of CSS margin?",
      options: [
        "To add space inside the border",
        "To add space outside the border between elements",
        "To change text color",
        "To define border thickness",
      ],
      answer: "To add space outside the border between elements",
    },
    {
      question: "The CSS padding property adds space between ________.",
      options: [
        "content and border",
        "border and next element",
        "margin and content",
        "none of the above",
      ],
      answer: "content and border",
    },
    {
      question: "Which section in the Diwali Page should have a background image?",
      options: [
        "Top Section",
        "Bottom Section",
        "Footer Section",
        "Header Navigation",
      ],
      answer: "Top Section",
    },
    {
      question: "Which Bootstrap class is used to align two cards side by side in the Diwali Page layout?",
      options: [
        "justify-content-center",
        "d-flex",
        "align-items-start",
        "card-group",
      ],
      answer: "d-flex",
    },
    {
      question: "Which color code represents a light blue background used in the Diwali Page?",
      options: ["#616e7c", "#323f4b", "#e6f6ff", "#ffffff"],
      answer: "#e6f6ff",
    },
    {
      question: "Which CSS property is used to align text inside an element?",
      options: ["text-align", "font-weight", "justify-content", "align-items"],
      answer: "text-align",
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
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
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
      }
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

  const getNextButtonLabel = () => {
    if (showingSkipped && currentIndex + 1 === skippedQuestions.length) return "Finish";
    if (!showingSkipped && currentIndex + 1 === questions.length && skippedQuestions.length === 0) return "Finish";
    return "Next";
  };

  return (
    <div className="mcq-container full-width">
      <h3 className="mcq-title">Approach to Develop Layout - MCQs</h3>

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
              {feedback.correct ? `✅ Correct! +${feedback.points}` : `❌ Wrong! -${Math.abs(feedback.points)}`}
            </div>
          )}

          <div className="mcq-buttons">
            <button
              className="mcq-next"
              disabled={!selectedAnswer}
              onClick={feedback ? nextQuestion : handleNext}
            >
              {getNextButtonLabel()}
            </button>
            {!showingSkipped && (
              <button className="mcq-skip" onClick={handleSkip} disabled={feedback !== null}>
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

export default Approachto_Develop_Layout_MCQ_2;
