import React, { useState, useEffect, useRef } from "react";

const FavouritePlaces_Section_MCQ_1 = ({ onComplete }) => {
  const  originalQuestions = [
    {
      question: "Which Bootstrap component is used to create a slideshow for cycling through images or text?",
      options: ["Carousel", "Modal", "Accordion", "Dropdown"],
      answer: "Carousel",
    },
    {
      question: "Which HTML attribute of the img element specifies the image URL in the Bootstrap Carousel?",
      options: ["href", "alt", "src", "link"],
      answer: "src",
    },
    {
      question: "In a Bootstrap Carousel, what are the small dots at the bottom of slides called?",
      options: ["Indicators", "Navigators", "Dots", "Controllers"],
      answer: "Indicators",
    },
    {
      question: "Which Bootstrap utility is used to embed responsive videos or iframes?",
      options: ["Embed", "VideoBox", "Container", "Flex"],
      answer: "Embed",
    },
    {
      question: "In a YouTube embed URL, where should you paste the video ID?",
      options: [
        "After 'https://www.youtube.com/watch?v='",
        "After 'https://www.youtube.com/embed/' and before '?rel=0'",
        "After 'https://www.google.com/'",
        "Anywhere in the link",
      ],
      answer: "After 'https://www.youtube.com/embed/' and before '?rel=0'",
    },
    {
      question: "Which of the following is the correct syntax for embedding a YouTube video in HTML?",
      options: [
        '<iframe src="https://www.youtube.com/embed/VIDEO_ID?rel=0"></iframe>',
        '<video src="https://www.youtube.com/embed/VIDEO_ID"></video>',
        '<embed href="https://www.youtube.com/embed/VIDEO_ID"/>',
        '<img src="https://www.youtube.com/embed/VIDEO_ID"/>',
      ],
      answer: '<iframe src="https://www.youtube.com/embed/VIDEO_ID?rel=0"></iframe>',
    },
    {
      question: "What is the purpose of the '?rel=0' in a YouTube embed URL?",
      options: [
        "To remove related videos at the end",
        "To loop the video",
        "To autoplay the video",
        "To increase video quality",
      ],
      answer: "To remove related videos at the end",
    },
    {
      question: "Which Bootstrap Carousel feature allows the slides to change automatically?",
      options: [
        "data-ride='carousel'",
        "data-slide='auto'",
        "auto-run='true'",
        "autoplay='yes'",
      ],
      answer: "data-ride='carousel'",
    },
    {
      question: "Where do you usually place the Bootstrap Carousel code in an HTML document?",
      options: [
        "Inside the body element",
        "Inside the head element",
        "In a CSS file",
        "In a script tag",
      ],
      answer: "Inside the body element",
    },
    {
      question: "Which Bootstrap utility helps make embedded videos responsive across devices?",
      options: [
        "Ratio",
        "Container-fluid",
        "Flex",
        "Grid",
      ],
      answer: "Ratio",
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
      <h3 className="mcq-title">Favoutite Places Section - MCQs</h3>

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
export default FavouritePlaces_Section_MCQ_1;
