import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DigitalCheatsheet = ({
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
  const [isCompleted, setIsCompleted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
            setIsCompleted(
              completedContent.includes(contentData.id) ||
                completedContent.includes(contentId) ||
                contentData.is_completed
            );
          } else {
            setError("Cheatsheet not found");
          }
        } else if (contentId) {
          // If we have contentId but no UUID, we need to fetch by ID
          // This would require an additional API endpoint
          setContent({
            id: contentId,
            cheatsheet_title: "Loading...",
            cheatsheet_content: "<p>Loading content...</p>",
          });
        }
      } catch (err) {
        console.error("Error loading digital cheatsheet:", err);
        setError("Failed to load cheatsheet");
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

  const handleMarkComplete = async () => {
    if (!content || isCompleted) return;

    try {
      const result = await markSubtopicComplete(
        content.id,
        propGoalId || content.goal_id,
        propModuleId || content.module_id,
        propSubtopicId || content.subtopic_id
      );

      if (result.success) {
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    } catch (error) {
      console.error("Error marking cheatsheet complete:", error);
      alert("Failed to mark as completed. Please try again.");
    }
  };

  const handleCopyToClipboard = () => {
    const cheatsheetText = document.querySelector(
      ".cheatsheet-content"
    )?.innerText;
    if (cheatsheetText) {
      navigator.clipboard.writeText(cheatsheetText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
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
        <p>You don't have access to Digital Marketing cheatsheets.</p>
        <button className="upgrade-button" onClick={() => navigate("/profile")}>
          Upgrade Now
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="digital-cheatsheet-loading">
        <div className="spinner"></div>
        <p>Loading digital marketing cheatsheet...</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="digital-cheatsheet-error">
        <img src="/assets/img/not_found.png" alt="Not Found" />
        <h2>Cheatsheet Not Found</h2>
        <p>{error || "The requested cheatsheet could not be found."}</p>
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
    <div className="digital-cheatsheet-container">
      <div className="cheatsheet-header">
        <div className="cheatsheet-breadcrumb">
          <span onClick={() => navigate("/digital-courses")}>
            Digital Marketing
          </span>
          <span className="separator">→</span>
          <span>
            {content.cheatsheet_title || "Digital Marketing Cheatsheet"}
          </span>
        </div>

        <div className="cheatsheet-title-section">
          <h1>{content.cheatsheet_title || "Digital Marketing Cheatsheet"}</h1>
          <span className="cheatsheet-type-badge">📘 QUICK REFERENCE</span>
        </div>

        <div className="cheatsheet-actions">
          <button className="action-btn" onClick={handleCopyToClipboard}>
            <i className="fas fa-copy"></i>
            {copySuccess ? "Copied!" : "Copy"}
          </button>
          <button className="action-btn" onClick={handleDownloadPDF}>
            <i className="fas fa-download"></i>
            Download PDF
          </button>
        </div>
      </div>

      <div className="cheatsheet-main">
        {content.table_of_contents && content.table_of_contents.length > 0 && (
          <div className="cheatsheet-toc">
            <h3>Quick Navigation</h3>
            <ul>
              {content.table_of_contents.map((item, index) => (
                <li key={index}>
                  <a href={`#section-${index}`}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="cheatsheet-content-wrapper">
          <div className="cheatsheet-content">
            {content.cheatsheet_content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: content.cheatsheet_content,
                }}
              />
            ) : (
              <p className="no-content-message">
                No content available for this cheatsheet.
              </p>
            )}
          </div>

          <div className="cheatsheet-sidebar">
            {content.key_takeaways && content.key_takeaways.length > 0 && (
              <div className="key-takeaways">
                <h4>💡 Key Takeaways</h4>
                <ul>
                  {content.key_takeaways.map((takeaway, index) => (
                    <li key={index}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.file_url && (
              <div className="download-original">
                <h4>📥 Download Resources</h4>
                <a href={content.file_url} download className="download-link">
                  <i className="fas fa-file-pdf"></i>
                  Complete Cheatsheet PDF
                </a>
              </div>
            )}

            <div className="complete-section">
              <button
                className={`mark-complete-btn ${isCompleted ? "completed" : ""}`}
                onClick={handleMarkComplete}
                disabled={isCompleted}
              >
                {isCompleted ? "✓ Completed" : "Mark as Completed"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalCheatsheet;
