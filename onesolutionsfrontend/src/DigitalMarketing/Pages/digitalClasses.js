import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FeedbackModal from "../../FeedbackModal/FeedbackModal";

import "../../Class_CSS/Class_Css.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DigitalClasses = ({
  contentId,
  contentUuid: propContentUuid,
  goalId,
  moduleId,
  topicId,
  subtopicId,
  onComplete,
  preLoadedContent,
  moduleName = "Digital Module",
  topicName = "Digital Topic",
}) => {
  const { contentUuid: paramContentUuid } = useParams();
  const navigate = useNavigate();
  const {
    getContentByUuid,
    markSubtopicComplete,
    loadProgressSummary,
    completedContent,
    user,
  } = useAuth();
  const finalContentUuid = propContentUuid || paramContentUuid;

  const [content, setContent] = useState(preLoadedContent || null);
  const [loading, setLoading] = useState(!preLoadedContent);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("discussions");
  const [threads, setThreads] = useState([]);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({ title: "", content: "" });
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [isCheckingFeedback, setIsCheckingFeedback] = useState(true);

  const editorRef = useRef(null);
  const videoRef = useRef(null);

  const getSlidesEmbedUrl = (slidesId) => {
    if (!slidesId) return null;
    return `https://docs.google.com/presentation/d/${slidesId}/embed`;
  };

  useEffect(() => {
    if (preLoadedContent) {
      setContent(preLoadedContent);
      setLoading(false);
      setVideoLoading(false);
      setIsVideoCompleted(
        completedContent.includes(preLoadedContent.id) ||
          preLoadedContent.is_completed
      );
    }
  }, [preLoadedContent, completedContent]);

  useEffect(() => {
    if (!content && finalContentUuid) {
      const load = async () => {
        try {
          setLoading(true);
          setVideoLoading(true);
          const res = await getContentByUuid(finalContentUuid);
          if (res?.success) {
            setContent(res.data);
            setIsVideoCompleted(
              completedContent.includes(res.data.id) || res.data.is_completed
            );
          }
        } catch (e) {
          console.error(e);
          setVideoError("Failed to load content");
        } finally {
          setLoading(false);
          setVideoLoading(false);
        }
      };
      load();
    }
  }, [content, finalContentUuid, completedContent, getContentByUuid]);

  useEffect(() => {
    if (content) {
      loadThreads();
      checkFeedbackStatus();
    }
  }, [content]);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e) => {
      // Disable common download shortcuts
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "s" || e.key === "S") // Ctrl+S or Cmd+S
      ) {
        e.preventDefault();
        alert("Downloading is not allowed for this video");
        return false;
      }
      // Disable F12, Ctrl+Shift+I (DevTools)
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c"))
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    const handleDrop = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("drop", handleDrop);
    };
  }, []);

  const checkFeedbackStatus = async () => {
    if (!content) return;

    try {
      setIsCheckingFeedback(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/feedback/subtopic/${content.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setHasSubmittedFeedback(!!data.data.feedback);
      }
    } catch (error) {
      console.error("Error checking feedback status:", error);
    } finally {
      setIsCheckingFeedback(false);
    }
  };

  const loadThreads = async () => {
    if (!content) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/discussions/threads/${content.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setThreads(data.data.threads);
        }
      }
    } catch (error) {
      console.error("Error loading threads:", error);
    }
  };

  const handleMarkComplete = async () => {
    if (!content || isVideoCompleted || isLoading) return;

    try {
      setIsLoading(true);
      const res = await markSubtopicComplete(
        content.id,
        goalId || content.goal_id,
        moduleId || content.module_id,
        subtopicId || content.subtopic_id
      );
      if (res.success) {
        await loadProgressSummary();
        setIsVideoCompleted(true);
        if (onComplete) onComplete();
      }
    } catch (e) {
      console.error(e);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitFeedback = async (feedbackData) => {
    if (!content) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/feedback/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subtopicId: content.id,
          moduleName: moduleName,
          topicName: topicName,
          ...feedbackData,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setHasSubmittedFeedback(true);
          setShowFeedbackModal(false);
          alert("Thank you for your feedback! It helps us improve.");
          return data;
        }
      }
      throw new Error("Failed to submit feedback");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
      throw error;
    }
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateContent();
  };

  const insertImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.borderRadius = "4px";
      img.style.margin = "10px 0";
      document.execCommand("insertHTML", false, img.outerHTML);
      updateContent();
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      insertImage(files[0]);
    }
    e.target.value = "";
  };

  const updateContent = () => {
    if (editorRef.current) {
      setNewThread((prev) => ({
        ...prev,
        content: editorRef.current.innerHTML,
      }));
    }
  };

  const handleEditorInput = () => {
    updateContent();
  };

  const handleCreateThread = async () => {
    if (!newThread.title.trim() || !newThread.content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    if (!content) return;

    try {
      const token = localStorage.getItem("token");
      const formData = {
        title: newThread.title,
        content: newThread.content,
        subtopicId: content.id,
        moduleName: moduleName,
        topicName: topicName,
      };
      const response = await fetch(`${API_BASE_URL}/api/discussions/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNewThread({ title: "", content: "" });
          if (editorRef.current) {
            editorRef.current.innerHTML = "";
          }
          setShowNewThread(false);
          loadThreads();
          alert("Thread created successfully!");
        }
      } else {
        alert("Failed to create thread");
      }
    } catch (error) {
      console.error("Error creating thread:", error);
      alert("Error creating thread");
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const openThreadDetail = (threadId) => {
    navigate(`/thread/${threadId}`);
  };

  const VideoPlayer = () => {
    if (videoLoading) {
      return (
        <div className="video-loading-clss">
          <div className="loading-spinner-clss"></div>
          <p>Loading video...</p>
        </div>
      );
    }

    // Handle case when content exists but has no video
    if (!content) {
      return (
        <div className="video-error-clss">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <h3>Coming Soon</h3>
        </div>
      );
    }

    // Handle video content from digital marketing API
    if (content.type === "video" || content.content_type === "video") {
      // Check if it's a YouTube or Vimeo video
      // Build full video URL
      let videoUrl = content.video_url || "";

      if (videoUrl && videoUrl.startsWith("/uploads")) {
        videoUrl = `${API_BASE_URL}${videoUrl}`;
      }

      const isYouTube =
        videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
      const isVimeo = videoUrl.includes("vimeo.com");

      // Extract YouTube video ID for proper embedding
      const getYouTubeEmbedUrl = (url) => {
        const regExp =
          /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11
          ? `https://www.youtube.com/embed/${match[2]}`
          : url;
      };

      // Extract Vimeo video ID
      const getVimeoEmbedUrl = (url) => {
        const regExp = /vimeo\.com\/(?:video\/)?(\d+)/;
        const match = url.match(regExp);
        return match ? `https://player.vimeo.com/video/${match[1]}` : url;
      };

      if (isYouTube) {
        const embedUrl = getYouTubeEmbedUrl(videoUrl);
        return (
          <div className="secure-video-player-clss">
            <iframe
              ref={videoRef}
              width="100%"
              height="400"
              src={embedUrl}
              title={content.video_title || "Video"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="secure-iframe-clss"
              onContextMenu={(e) => {
                e.preventDefault();
                return false;
              }}
            ></iframe>
          </div>
        );
      } else if (isVimeo) {
        const embedUrl = getVimeoEmbedUrl(videoUrl);
        return (
          <div className="secure-video-player-clss">
            <iframe
              ref={videoRef}
              width="100%"
              height="400"
              src={embedUrl}
              title={content.video_title || "Video"}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="secure-iframe-clss"
              onContextMenu={(e) => {
                e.preventDefault();
                return false;
              }}
            ></iframe>
          </div>
        );
      } else if (videoUrl) {
        // Fix relative backend URL
        if (videoUrl.startsWith("/uploads")) {
          videoUrl = `${API_BASE_URL}${videoUrl}`;
        }

        return (
          <div className="secure-video-player-clss">
            <video
              ref={videoRef}
              controls
              width="100%"
              height="400"
              poster={content.thumbnail_url}
              className="secure-video-clss"
              controlsList="nodownload"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }
    }

    // Fallback for when no video is available
    return (
      <div className="video-error-clss">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <h3>Coming Soon</h3>
        <p>This content is being prepared and will be available shortly.</p>
      </div>
    );
  };

  if (loading) return <div className="spinner"></div>;
  if (!content) return <div>Class not found</div>;

  return (
    <div className="subtopic-container-clss">
      <div className="subtopic-header-clss">
        <div className="breadcrumb-clss">
          <span className="module-name-clss">
            {content.type === "video" ? content.video_title : moduleName}
          </span>
          <span className="separator-clss">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right right-icon-clss"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </span>
          <span className="topic-name-clss">
            {content.video_title || topicName}
          </span>
        </div>
      </div>

      <div className="content-tab-clss">
        <div className="video-section-clss">
          <VideoPlayer />
        </div>

        <div className="completion-section-clss">
          <button
            className={`feedback-button-clss ${
              hasSubmittedFeedback ? "submitted-clss" : ""
            }`}
            onClick={() => setShowFeedbackModal(true)}
            disabled={hasSubmittedFeedback || isCheckingFeedback}
          >
            {isCheckingFeedback
              ? "Checking..."
              : hasSubmittedFeedback
                ? "✓ Feedback Submitted"
                : "Submit Feedback"}
          </button>
          <button
            className={`complete-button-clss ${
              isVideoCompleted ? "completed-clss" : ""
            }`}
            onClick={handleMarkComplete}
            disabled={isLoading || isVideoCompleted}
          >
            {isLoading
              ? "Marking..."
              : isVideoCompleted
                ? "✓ Completed"
                : "Mark as Complete"}
          </button>
        </div>
      </div>

      <div className="subtopic-tabs-clss">
        <button
          className={`tab-button-clss ${
            activeTab === "discussions" ? "active-clss" : ""
          }`}
          onClick={() => setActiveTab("discussions")}
        >
          Discussions
        </button>
        <button
          className={`tab-button-clss ${
            activeTab === "slides" ? "active-clss" : ""
          }`}
          onClick={() => setActiveTab("slides")}
        >
          Slides
        </button>
        {(content.type === "mcq" || content.content_type === "mcq") && (
          <button
            className={`tab-button-clss ${
              activeTab === "assessment" ? "active-clss" : ""
            }`}
            onClick={() => setActiveTab("assessment")}
          >
            Assessment
          </button>
        )}
      </div>

      {activeTab === "discussions" && (
        <div className="discussions-tab-clss">
          <div className="discussions-header-clss">
            <h2>Discussions</h2>
            <div>
              <button
                className="new-thread-btn-clss"
                onClick={() => setShowNewThread(true)}
              >
                + New Thread
              </button>
            </div>
          </div>

          {showNewThread && (
            <div className="new-thread-modal-clss">
              <div className="new-thread-form-clss">
                <h3>Create New Thread</h3>
                <input
                  type="text"
                  placeholder="Thread Title"
                  value={newThread.title}
                  onChange={(e) =>
                    setNewThread((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="thread-title-input-clss"
                />

                <div className="rich-text-editor-clss">
                  <div className="editor-toolbar-clss">
                    <button
                      type="button"
                      className="toolbar-btn-clss"
                      onClick={() => formatText("bold")}
                      title="Bold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-type-bold"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn-clss"
                      onClick={() => formatText("italic")}
                      title="Italic"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn-clss"
                      onClick={() => formatText("underline")}
                      title="Underline"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn-clss"
                      onClick={() => formatText("insertUnorderedList")}
                      title="Bullet List"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn-clss"
                      onClick={() => formatText("insertOrderedList")}
                      title="Numbered List"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn-clss"
                      onClick={() => formatText("formatBlock", "<blockquote>")}
                      title="Quote"
                    >
                      "
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn-clss"
                      onClick={() => formatText("formatBlock", "<h2>")}
                      title="Heading"
                    >
                      H
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn-clss"
                      onClick={() => formatText("formatBlock", "<pre>")}
                      title="Code"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                      </svg>
                    </button>
                    <div className="toolbar-btn-clss image-upload-btn-clss">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-image"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                  <div
                    ref={editorRef}
                    className="editor-content-clss"
                    contentEditable
                    onInput={handleEditorInput}
                    dir="ltr"
                    style={{ textAlign: "left" }}
                  />
                </div>

                <div className="thread-actions-clss">
                  <button
                    onClick={handleCreateThread}
                    className="submit-btn-clss"
                  >
                    Create Thread
                  </button>
                  <button
                    onClick={() => setShowNewThread(false)}
                    className="cancel-btn-clss"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="threads-list-clss">
            {threads.length === 0 ? (
              <div className="no-threads-clss">
                <p>No discussions yet. Start the first thread!</p>
              </div>
            ) : (
              threads.map((thread) => (
                <div
                  key={thread.id}
                  className={`thread-item-clss ${
                    thread.is_important ? "important-clss" : ""
                  }`}
                  onClick={() => openThreadDetail(thread.thread_slug)}
                >
                  <div className="thread-header-clss">
                    <h3 className="thread-title-clss">{thread.title}</h3>
                    <span className="reply-count-clss">
                      {thread.reply_count} replies
                    </span>
                    {thread.has_admin_reply && (
                      <span className="admin-replied-badge-clss">
                        Admin Replied
                      </span>
                    )}
                  </div>
                  <div
                    className="thread-content-preview-clss"
                    dangerouslySetInnerHTML={{
                      __html:
                        thread.content.length > 150
                          ? stripHtml(thread.content).substring(0, 150) + "..."
                          : stripHtml(thread.content),
                    }}
                  />
                  <div className="thread-footer-clss">
                    <div className="thread-author-clss">
                      <span className="profile_image_avatar">
                        {thread.first_name
                          ? thread.first_name.slice(0, 1)
                          : "U"}
                        {thread.last_name ? thread.last_name.slice(0, 1) : ""}
                      </span>

                      <span>
                        {thread.first_name || "User"} {thread.last_name || ""}
                      </span>
                    </div>
                    <span className="thread-date-clss">
                      {new Date(thread.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}


        {activeTab === "slides" && (
          <div className="slides-tab-clss">
            <h2>Presentation Slides</h2>
            <div className="slides-container-clss">
              {content.slides_id ? (
                <iframe
                  src={getSlidesEmbedUrl(content.slides_id)}
                  width="100%"
                  height="500"
                  frameBorder="0"
                  allowFullScreen
                  title="Presentation Slides"
                />
              ) : (
                <div className="slides-placeholder">
                  <p>No slides available for this lesson</p>
                </div>
              )}
            </div>
          </div>
        )}

      {activeTab === "assessment" &&
        (content.type === "mcq" || content.content_type === "mcq") && (
          <div className="assessment-tab-clss">
            <h2>{content.mcq_title || "Assessment"}</h2>
            <div className="assessment-container-clss">
              <p>Assessment component will be implemented here.</p>
              <p>Number of questions: {content.questions?.length || 0}</p>
            </div>
          </div>
        )}

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        subtopicId={content.id}
        moduleName={moduleName}
        topicName={topicName}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </div>
  );
};

export default DigitalClasses;
