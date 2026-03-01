import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FeedbackModal from "../../FeedbackModal/FeedbackModal";
import "../../Class_CSS/Class_Css.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const JavaClasses = ({
  contentId,
  contentUuid: propContentUuid,
  goalId,
  moduleId,
  topicId,
  subtopicId,
  onComplete,
  preLoadedContent,
  moduleName = "Java Module",
  topicName = "Java Topic",
}) => {
  const { contentUuid: paramContentUuid } = useParams();
  const navigate = useNavigate();
  const {
    getJavaContentByUuid,
    markJavaContentComplete,
    completedContent,
  } = useAuth();
  const finalContentUuid = propContentUuid || paramContentUuid;

  const [content, setContent] = useState(preLoadedContent || null);
  const [loading, setLoading] = useState(!preLoadedContent);
  const [isCompleted, setIsCompleted] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [isCheckingFeedback, setIsCheckingFeedback] = useState(true);

  useEffect(() => {
    if (preLoadedContent) {
      setContent(preLoadedContent);
      setLoading(false);
      setVideoLoading(false);
      setIsCompleted(completedContent.includes(preLoadedContent.id) || preLoadedContent.is_completed);
    }
  }, [preLoadedContent, completedContent]);

  useEffect(() => {
    if (!content && finalContentUuid) {
      const load = async () => {
        try {
          setLoading(true);
          setVideoLoading(true);
          const res = await getJavaContentByUuid(finalContentUuid);
          if (res?.success) {
            setContent(res.data);
            setIsCompleted(completedContent.includes(res.data.id) || res.data.is_completed);
          }
        } catch (e) {
          setVideoError("Failed to load content");
        } finally {
          setLoading(false);
          setVideoLoading(false);
        }
      };
      load();
    }
  }, [content, finalContentUuid, completedContent, getJavaContentByUuid]);

  useEffect(() => {
    if (content) {
      checkFeedbackStatus();
    }
  }, [content]);

  const checkFeedbackStatus = async () => {
    try {
      setIsCheckingFeedback(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/feedback/subtopic/${content.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setHasSubmittedFeedback(!!data.data.feedback);
      }
    } catch (error) {
      console.error("Error checking feedback status:", error);
    } finally {
      setIsCheckingFeedback(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!content || isCompleted) return;
    try {
      await markJavaContentComplete(content.id, goalId || content.goal_id);
      setIsCompleted(true);
      if (onComplete) onComplete();
    } catch (e) {
      alert("Failed to mark complete");
    }
  };

  const handleSubmitFeedback = async (feedbackData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/feedback/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          subtopicId: content.id,
          moduleName,
          topicName,
          ...feedbackData,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setHasSubmittedFeedback(true);
          setShowFeedbackModal(false);
          alert("Feedback submitted!");
        }
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const VideoPlayer = () => {
    if (videoLoading) return <div className="video-loading-clss"><div className="loading-spinner"></div><p>Loading video...</p></div>;
    if (!content || !content.video_url) {
      return (
        <div className="video-error-clss">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
          <h3>Coming Soon</h3>
        </div>
      );
    }
    let videoUrl = content.video_url;
    if (videoUrl.startsWith("/uploads")) videoUrl = `${API_BASE_URL}${videoUrl}`;
    const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
    const isVimeo = videoUrl.includes("vimeo.com");
    if (isYouTube) {
      const embedUrl = videoUrl.replace("watch?v=", "embed/").split("&")[0];
      return (
        <div className="secure-video-player-clss">
          <iframe width="100%" height="400" src={embedUrl} frameBorder="0" allowFullScreen></iframe>
        </div>
      );
    }
    if (isVimeo) {
      const embedUrl = videoUrl.replace("vimeo.com", "player.vimeo.com/video");
      return (
        <div className="secure-video-player-clss">
          <iframe width="100%" height="400" src={embedUrl} frameBorder="0" allowFullScreen></iframe>
        </div>
      );
    }
    return (
      <div className="secure-video-player-clss">
        <video controls width="100%" height="400" poster={content.thumbnail_url} controlsList="nodownload">
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
    );
  };

  if (loading) return <div className="spinner"></div>;
  if (!content) return <div>Class not found</div>;

  return (
    <div className="subtopic-container-clss">
      <div className="subtopic-header-clss">
        <div className="breadcrumb-clss">
          <span className="module-name-clss">{moduleName}</span>
          <span className="separator-clss"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></span>
          <span className="topic-name-clss">{content.video_title || topicName}</span>
        </div>
      </div>
      <div className="content-tab-clss">
        <div className="video-section-clss"><VideoPlayer /></div>
        <div className="completion-section-clss">
          <button className={`feedback-button-clss ${hasSubmittedFeedback ? "submitted-clss" : ""}`}
            onClick={() => setShowFeedbackModal(true)} disabled={hasSubmittedFeedback || isCheckingFeedback}>
            {isCheckingFeedback ? "Checking..." : hasSubmittedFeedback ? "✓ Feedback Submitted" : "Submit Feedback"}
          </button>
          <button className={`complete-button-clss ${isCompleted ? "completed-clss" : ""}`}
            onClick={handleMarkComplete} disabled={isCompleted}>
            {isCompleted ? "✓ Completed" : "Mark as Complete"}
          </button>
        </div>
      </div>
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)}
        subtopicId={content.id} moduleName={moduleName} topicName={topicName}
        onSubmitFeedback={handleSubmitFeedback} />
    </div>
  );
};

export default JavaClasses;