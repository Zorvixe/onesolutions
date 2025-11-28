import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import FeedbackModal from "../../FeedbackModal/FeedbackModal";

import "../../Class_CSS/Class_Css.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProblemSol_Debugging_Class_1 = ({
  subtopicId,
  goalName,
  courseName,
  subtopic,
  moduleName = "Nested Conditions",
  topicName = "Problem Solving and Debugging Part 1",
  videoUrl = "https://www.youtube.com/embed/",
  slidesUrl = "https://docs.google.com/presentation/d/1vsfL0SokpBgxuGSZzea4TXecvBE57MPWDb8flQ1qP04/embed",
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent, user } =
    useAuth();

  const [isSubtopicCompleted, setIsSubtopicCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("discussions");
  const [threads, setThreads] = useState([]);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({ title: "", content: "" });

  // Feedback states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [isCheckingFeedback, setIsCheckingFeedback] = useState(true);

  const editorRef = useRef(null);

  useEffect(() => {
    if (completedContent.includes(subtopicId)) {
      setIsSubtopicCompleted(true);
    }
    loadThreads();
    checkFeedbackStatus();
  }, [completedContent, subtopicId]);

  const checkFeedbackStatus = async () => {
    try {
      setIsCheckingFeedback(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/feedback/subtopic/${subtopicId}`,
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
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/discussions/threads/${subtopicId}`,
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

  const handleContinue = async () => {
    if (isLoading || isSubtopicCompleted) return;

    try {
      setIsLoading(true);
      const result = await markSubtopicComplete(
        subtopicId,
        goalName,
        courseName
      );

      if (result.success) {
        await loadProgressSummary();
        setIsSubtopicCompleted(true);
        console.log("✅ Content marked as completed");
      } else {
        console.error("❌ Failed to mark content complete:", result.message);
        alert("Failed to mark as complete. Please try again.");
      }
    } catch (error) {
      console.error("❌ Failed to mark content complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitFeedback = async (feedbackData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/feedback/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subtopicId,
          moduleName,
          topicName,
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

  // Rich Text Editor Functions
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
    // Reset the input
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

    try {
      const token = localStorage.getItem("token");
      const formData = {
        title: newThread.title,
        content: newThread.content,
        subtopicId: subtopicId,
        moduleName: moduleName,
        topicName: topicName,
      };

      const response = await fetch("${API_BASE_URL}/api/discussions/threads", {
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
    window.open(`/thread/${threadId}`, "_blank");
  };

  return (
    <div className="subtopic-container-clss">
      {/* Header Section */}
      <div className="subtopic-header-clss">
        <div className="breadcrumb-clss">
          <span className="module-name-clss">{moduleName}</span>
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
          <span className="topic-name-clss">{topicName}</span>
        </div>
      </div>

      <div className="content-tab-clss">
        {/* Video Section */}
        <div className="video-section-clss">
          <div className="video-container-clss">
            <iframe
              width="100%"
              height="400"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Completion Section */}
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
              isSubtopicCompleted ? "completed-clss" : ""
            }`}
            onClick={handleContinue}
            disabled={isLoading || isSubtopicCompleted}
          >
            {isLoading
              ? "Marking..."
              : isSubtopicCompleted
              ? "✓ Completed"
              : "Mark as Complete"}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
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
      </div>

      {/* Discussions Tab */}
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

          {/* New Thread Form */}
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

                {/* Rich Text Editor */}
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

          {/* Threads List */}
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
                  onClick={() => openThreadDetail(thread.id)}
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
                      <img
                        src={thread.profile_image || "/default-avatar.png"}
                        alt="Author"
                        className="author-avatar-clss"
                      />
                      <span>
                        {thread.first_name} {thread.last_name}
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

      {/* Slides Tab */}
      {activeTab === "slides" && (
        <div className="slides-tab-clss">
          <h2>Presentation Slides</h2>
          <div className="slides-container-clss">
            <iframe
              src={slidesUrl}
              width="100%"
              height="500"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        subtopicId={subtopicId}
        moduleName={moduleName}
        topicName={topicName}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </div>
  );
};
export default ProblemSol_Debugging_Class_1;
