import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DigitalClasses = ({
  contentId,
  contentUuid: propContentUuid,
  goalId: propGoalId,
  moduleId: propModuleId,
  topicId: propTopicId,
  subtopicId: propSubtopicId,
  onComplete,
}) => {
  const { contentUuid: paramContentUuid } = useParams();
  const navigate = useNavigate();
  const { getContentByUuid, markSubtopicComplete, completedContent, user } =
    useAuth();

  const finalContentUuid = propContentUuid || paramContentUuid;

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const courseSelection = user?.courseSelection || "web_development";
  const hasDigitalAccess =
    courseSelection === "web_development" ||
    courseSelection === "digital_marketing" ||
    courseSelection === "all";

  useEffect(() => {
    if (!hasDigitalAccess) {
      setError("You don't have access to Digital Marketing content.");
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        if (finalContentUuid) {
          const response = await getContentByUuid(finalContentUuid);
          if (response?.success) {
            const contentData = response.data;
            setContent(contentData);
            setIsVideoCompleted(
              completedContent.includes(contentData.id) ||
                completedContent.includes(contentId) ||
                contentData.is_completed
            );
          } else {
            setError("Class not found");
          }
        } else if (contentId) {
          setContent({
            id: contentId,
            video_title: "Loading...",
            video_description: "Loading content...",
          });
        }
      } catch (err) {
        console.error("Error loading digital class:", err);
        setError("Failed to load class content");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [
    finalContentUuid,
    contentId,
    hasDigitalAccess,
    getContentByUuid,
    completedContent,
  ]);

  useEffect(() => {
    const savedNotes = localStorage.getItem(
      `digital_notes_${finalContentUuid || contentId}`
    );
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [finalContentUuid, contentId]);

  const handleVideoTimeUpdate = (e) => {
    if (!e.target) return;
    setCurrentTimestamp(e.target.currentTime);
    if (e.target.duration) {
      const progress = (e.target.currentTime / e.target.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const handleVideoLoaded = (e) => {
    if (e.target.duration) {
      setVideoDuration(e.target.duration);
    }
  };

  const handleMarkComplete = async () => {
    if (!content || isVideoCompleted) return;

    try {
      const result = await markSubtopicComplete(
        content.id,
        propGoalId || content.goal_id,
        propModuleId || content.module_id,
        propSubtopicId || content.subtopic_id
      );

      if (result.success) {
        setIsVideoCompleted(true);
        if (onComplete) onComplete();
      }
    } catch (error) {
      console.error("Error marking class complete:", error);
      alert("Failed to mark as completed. Please try again.");
    }
  };

  const saveNotes = () => {
    localStorage.setItem(
      `digital_notes_${finalContentUuid || contentId}`,
      notes
    );
    alert("Notes saved successfully!");
  };

  if (!hasDigitalAccess) {
    return (
      <div className="digital-access-denied">
        <img
          src="/assets/img/locked_image.png"
          alt="Access Denied"
          className="locked_image"
        />
        <h2>Digital Marketing Access Required</h2>
        <p>You don't have access to Digital Marketing classes.</p>
        <p>Please upgrade your subscription to access these courses.</p>
        <button className="upgrade-button" onClick={() => navigate("/profile")}>
          Upgrade Now
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="digital-classes-loading">
        <div className="spinner"></div>
        <p>Loading digital marketing class...</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="digital-classes-error">
        <img src="/assets/img/not_found.png" alt="Not Found" />
        <h2>Class Not Found</h2>
        <p>{error || "The requested class could not be found."}</p>
        <button
          className="back-button"
          onClick={() => navigate("/digital-courses")}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="digital-classes-container">
      <div className="digital-classes-content">
        <div className="video-section">
          <div className="video-wrapper">
            {content.video_url ? (
              <video
                controls
                className="digital-video-player"
                src={content.video_url}
                onTimeUpdate={handleVideoTimeUpdate}
                onLoadedMetadata={handleVideoLoaded}
                poster={content.thumbnail_url}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="video-placeholder">
                <div className="video-placeholder-icon">🎬</div>
                <p>Video content is being prepared</p>
              </div>
            )}

            {content.video_url && (
              <div className="video-progress-bar">
                <div
                  className="video-progress-fill"
                  style={{ width: `${videoProgress}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="video-actions">
            <button
              className={`mark-complete-btn ${isVideoCompleted ? "completed" : ""}`}
              onClick={handleMarkComplete}
              disabled={isVideoCompleted}
            >
              {isVideoCompleted ? "✓ Completed" : "Mark as Completed"}
            </button>
          </div>
        </div>

        <div className="class-info-section">
          <div className="class-description-card">
            <h3>{content.video_title || "About this Class"}</h3>
            <p>{content.video_description || "No description available."}</p>

            {content.learning_objectives &&
              content.learning_objectives.length > 0 && (
                <>
                  <h4>What you'll learn:</h4>
                  <ul className="learning-objectives">
                    {content.learning_objectives.map((objective, index) => (
                      <li key={index}>
                        <i className="fas fa-check-circle"></i> {objective}
                      </li>
                    ))}
                  </ul>
                </>
              )}
          </div>

          <button
            className="notes-toggle-btn"
            onClick={() => setShowNotes(!showNotes)}
          >
            <i className="fas fa-sticky-note"></i>
            {showNotes ? "Hide Notes" : "Show Notes"}
          </button>

          {showNotes && (
            <div className="class-notes-card">
              <h3>Your Notes</h3>
              <textarea
                className="notes-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes while watching the video..."
                rows="8"
              ></textarea>
              <div className="notes-actions">
                <button className="save-notes-btn" onClick={saveNotes}>
                  <i className="fas fa-save"></i> Save Notes
                </button>
                {content.video_url && (
                  <span className="timestamp">
                    Timestamp: {Math.floor(currentTimestamp / 60)}:
                    {Math.floor(currentTimestamp % 60)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                )}
              </div>
            </div>
          )}

          {content.resources && content.resources.length > 0 && (
            <div className="class-resources-card">
              <h3>Resources</h3>
              <ul className="resources-list">
                {content.resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource.url} download className="resource-link">
                      <i className="fas fa-download"></i>
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalClasses;
