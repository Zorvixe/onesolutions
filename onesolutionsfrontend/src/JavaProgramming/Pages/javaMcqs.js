import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const JavaMcqs = ({
  contentId,
  contentUuid: propContentUuid,
  goalId,
  moduleId,
  topicId,
  subtopicId,
  onComplete,
  preLoadedContent,
}) => {
  const { contentUuid: paramContentUuid } = useParams();
  const navigate = useNavigate();
  const { getJavaContentByUuid, markJavaContentComplete, completedContent } = useAuth();
  const finalContentUuid = propContentUuid || paramContentUuid;

  const [content, setContent] = useState(preLoadedContent || null);
  const [loading, setLoading] = useState(!preLoadedContent);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (preLoadedContent) {
      setContent(preLoadedContent);
      setLoading(false);
      setQuestions(preLoadedContent.questions || []);
      setIsCompleted(completedContent.includes(preLoadedContent.id) || preLoadedContent.is_completed);
    }
  }, [preLoadedContent, completedContent]);

  useEffect(() => {
    if (!content && finalContentUuid) {
      const load = async () => {
        try {
          setLoading(true);
          const res = await getJavaContentByUuid(finalContentUuid);
          if (res?.success) {
            setContent(res.data);
            setQuestions(res.data.questions || []);
            setIsCompleted(completedContent.includes(res.data.id) || res.data.is_completed);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [content, finalContentUuid, getJavaContentByUuid, completedContent]);

  const handleAnswer = (idx) => {
    const q = questions[currentIndex];
    const correct = q.correctAnswer !== undefined ? q.correctAnswer : q.answer;
    const isCorrect = selectedAnswer === correct;
    let points = 0;
    if (isCorrect) points = 10; // simplified
    else points = -1;
    setFeedback({ correct: isCorrect, points });
    setScore(prev => prev + points);
  };

  const next = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setCompleted(true);
    }
  };

  const handleMarkComplete = async () => {
    if (!content || isCompleted) return;
    const finalScore = Math.max(0, Math.min(100, (score / (questions.length * 10)) * 100));
    if (finalScore >= 80) {
      await markJavaContentComplete(content.id, goalId || content.goal_id, finalScore);
      setIsCompleted(true);
      if (onComplete) onComplete();
      setTimeout(() => navigate(-1), 2000);
    } else {
      alert("You need at least 80% to proceed");
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (!content) return <div>No content</div>;
  if (questions.length === 0) return <div>No questions</div>;

  if (completed) {
    return (
      <div className="mcq-results-screen">
        <h2>Quiz Results</h2>
        <p>Score: {((score / (questions.length * 10)) * 100).toFixed(1)}%</p>
        <button onClick={handleMarkComplete} disabled={isCompleted}>
          {isCompleted ? "Completed" : "Mark Complete"}
        </button>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const q = questions[currentIndex];
  return (
    <div className="mcq-container">
      <div className="mcq-header">
        <h3>{content.mcq_title || "Quiz"}</h3>
        <span>Question {currentIndex+1}/{questions.length}</span>
      </div>
      <div className="question-body">
        <p>{q.question}</p>
        <div className="options">
          {q.options?.map((opt, idx) => (
            <div key={idx} className={`option ${selectedAnswer === idx ? "selected" : ""}`}
                 onClick={() => !feedback && setSelectedAnswer(idx)}>
              {opt}
            </div>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.correct ? "correct" : "wrong"}`}>
            {feedback.correct ? "Correct!" : "Incorrect"} – {feedback.points} pts
          </div>
        )}
      </div>
      <div className="question-footer">
        {!feedback ? (
          <button onClick={handleAnswer} disabled={selectedAnswer === null}>Submit</button>
        ) : (
          <button onClick={next}>Next</button>
        )}
      </div>
    </div>
  );
};

export default JavaMcqs;