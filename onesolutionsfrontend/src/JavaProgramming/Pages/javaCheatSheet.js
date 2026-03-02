import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
  const { getJavaContentByUuid, markJavaContentComplete, completedContent, user } =
    useAuth();

  const finalContentUuid = propContentUuid || paramContentUuid;

  const [content, setContent] = useState(preLoadedContent || null);
  const [loading, setLoading] = useState(!preLoadedContent);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [fontSize, setFontSize] = useState("medium"); // small, medium, large
  const [showToc, setShowToc] = useState(true);

  const courseSelection = user?.courseSelection || "web_development";
  const hasJavaAccess =
    courseSelection === "java_programming" ||
    courseSelection === "all";

  // Update content if preLoadedContent changes
  useEffect(() => {
    if (preLoadedContent) {
      setContent(preLoadedContent);
      setLoading(false);
      setIsCompleted(
        completedContent.includes(preLoadedContent.id) ||
        preLoadedContent.is_completed
      );
    }
  }, [preLoadedContent, completedContent]);

  useEffect(() => {
    if (!hasJavaAccess) {
      setError("Access Denied: You don't have permission to view this content");
      setLoading(false);
      return;
    }

    if (!content && finalContentUuid) {
      const loadContent = async () => {
        try {
          setLoading(true);
          const response = await getJavaContentByUuid(finalContentUuid);
          if (response?.success) {
            const contentData = response.data;
            setContent(contentData);
            setIsCompleted(
              completedContent.includes(contentData.id) ||
              contentData.is_completed
            );
          } else {
            setError("Cheatsheet not found");
          }
        } catch (err) {
          console.error("Error loading cheatsheet:", err);
          setError("Failed to load cheatsheet");
        } finally {
          setLoading(false);
        }
      };
      loadContent();
    }
  }, [
    finalContentUuid,
    content,
    hasJavaAccess,
    getJavaContentByUuid,
    completedContent,
  ]);

  const handleMarkComplete = async () => {
    if (!content || isCompleted) return;
    try {
      const result = await markJavaContentComplete(
        content.id,
        goalId || content.goal_id,
        moduleId || content.module_id,
        subtopicId || content.subtopic_id
      );
      if (result.success) {
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    } catch (error) {
      console.error("Error marking complete:", error);
    }
  };

  const handleCopyToClipboard = () => {
    const cheatsheetText = document.querySelector(
      ".cheatsheet-content-body"
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "font-small";
      case "large":
        return "font-large";
      default:
        return "font-medium";
    }
  };

  const filterContent = (content) => {
    if (!searchTerm) return content;
    // This is a placeholder - actual filtering would need to parse the HTML content
    return content;
  };

  if (loading) {
    return (
      <div className="cheatsheet-loading">
        <div className="loading-spinner"></div>
        <p>Loading cheatsheet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cheatsheet-error">
        <div className="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button
          className="error-retry-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="cheatsheet-container">
      {/* Header Section */}
      <div className="cheatsheet-header">
        <div className="action-group-cheatsheets">
          <h2>{content.cheatsheet_title || "Java Quick Reference Guide"}</h2>
          <button
            className={`action-btn-cheatsheet ${!isCompleted ? "complete-btn" : "completed-btn"}`}
            onClick={handleMarkComplete}
            disabled={isCompleted}
          >
            {isCompleted ? (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>Completed</span>
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>Mark Complete</span>
              </>
            )}
          </button>
        </div>

        {/* Toolbar */}
        <div className="cheatsheet-toolbar">
          <div className="toolbar-left">
            <div className="font-size-controls">
              <button
                className={`size-btn ${fontSize === "small" ? "active" : ""}`}
                onClick={() => setFontSize("small")}
                title="Small text"
              >
                A
              </button>
              <button
                className={`size-btn ${fontSize === "medium" ? "active" : ""}`}
                onClick={() => setFontSize("medium")}
                title="Medium text"
              >
                A+
              </button>
              <button
                className={`size-btn ${fontSize === "large" ? "active" : ""}`}
                onClick={() => setFontSize("large")}
                title="Large text"
              >
                A++
              </button>
            </div>
            <button
              className="toolbar-btn"
              onClick={handleCopyToClipboard}
              title="Copy to clipboard"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
              {copySuccess && <span className="copy-tooltip">Copied!</span>}
            </button>
            <button
              className="toolbar-btn"
              onClick={handleDownloadPDF}
              title="Download as PDF"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
              </svg>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => setShowToc(!showToc)}
              title={showToc ? "Hide table of contents" : "Show table of contents"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
              </svg>
            </button>
          </div>

          <div className="toolbar-right">
            <div className="search-box">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <input
                type="text"
                placeholder="Search in cheatsheet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="cheatsheet-main">

        {/* Content Area */}
        <div className={`cheatsheet-content-area ${getFontSizeClass()}`}>
          <div className="cheatsheet-content-wrapper">
            <div className="cheatsheet-content-body">
              {content.cheatsheet_content ? (
                <div
                  className="cheatsheet-html-content"
                  dangerouslySetInnerHTML={{
                    __html: filterContent(content.cheatsheet_content),
                  }}
                />
              ) : (
                <div className="empty-content">
                  <p>No content available for this cheatsheet.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaCheatSheet;