import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./DigitalCheatsheet.css"; // reuse the same CSS

const JavaCheatSheet = ({
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
  const [isCompleted, setIsCompleted] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
    if (preLoadedContent) {
      setContent(preLoadedContent);
      setLoading(false);
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

  if (loading) return <div className="cheatsheet-loading"><div className="loading-spinner"></div></div>;
  if (!content) return null;

  const fontSizeClass = fontSize === "small" ? "font-small" : fontSize === "large" ? "font-large" : "font-medium";

  return (
    <div className="cheatsheet-container">
      <div className="cheatsheet-header">
        <div className="action-group-cheatsheets">
          <h2>{content.cheatsheet_title || "Java Cheatsheet"}</h2>
          <button className={`action-btn-cheatsheet ${isCompleted ? "completed-btn" : "complete-btn"}`}
            onClick={handleMarkComplete} disabled={isCompleted}>
            {isCompleted ? "✓ Completed" : "Mark Complete"}
          </button>
        </div>
        <div className="cheatsheet-toolbar">
          <div className="font-size-controls">
            <button className={`size-btn ${fontSize === "small" ? "active" : ""}`} onClick={() => setFontSize("small")}>A</button>
            <button className={`size-btn ${fontSize === "medium" ? "active" : ""}`} onClick={() => setFontSize("medium")}>A+</button>
            <button className={`size-btn ${fontSize === "large" ? "active" : ""}`} onClick={() => setFontSize("large")}>A++</button>
          </div>
        </div>
      </div>
      <div className="cheatsheet-main">
        <div className={`cheatsheet-content-area ${fontSizeClass}`}>
          <div className="cheatsheet-content-body">
            {content.cheatsheet_content ? (
              <div className="cheatsheet-html-content" dangerouslySetInnerHTML={{ __html: content.cheatsheet_content }} />
            ) : (
              <p>No content available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaCheatSheet;