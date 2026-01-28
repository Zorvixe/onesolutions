import React, { useState, useRef, useEffect } from "react";
import { Role } from "../../types";
import { GeminiService } from "../../services/geminiService";
import { InstituteService } from "../../services/instituteService";
import ChatMessage from "../AiChats/ChatMessage";
import QuickPrompts from "../AiChats/QuickPrompts";
import "./AiApp.css";

const AiApp = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [view, setView] = useState("dashboard");
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isProgressLoading, setIsProgressLoading] = useState(true);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const currentSession = sessions.find((s) => s.id === currentSessionId);

  // Initial Load
  useEffect(() => {
    const loadAppData = async () => {
      setIsHistoryLoading(true);
      setIsProfileLoading(true);
      setIsProgressLoading(true);

      try {
        const history = await InstituteService.getChatSessions();
        setSessions(history);
      } catch (e) {
        console.warn("Could not load history from backend.");
      } finally {
        setIsHistoryLoading(false);
      }

      try {
        const [prof, prog] = await Promise.all([
          InstituteService.getProfile(),
          InstituteService.getProgress(),
        ]);
        setProfile(prof);
        setProgress(prog);
      } catch (err) {
        console.error("Failed to load profile or progress:", err);
        // Remove static fallback - rely on backend data only
      } finally {
        setIsProfileLoading(false);
        setIsProgressLoading(false);
      }
    };

    loadAppData();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (e) =>
        setInput(
          (prev) => (prev ? prev + " " : "") + e.results[0][0].transcript
        );
      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, currentSessionId]);

  const createNewChat = () => {
    setCurrentSessionId(null);
    setView("tutor");
  };

  const deleteSession = async (e, id) => {
    e.stopPropagation();
    const originalSessions = [...sessions];
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (currentSessionId === id) setCurrentSessionId(null);

    try {
      await InstituteService.deleteChatSession(id);
    } catch (error) {
      console.error("Delete failed:", error);
      setSessions(originalSessions);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current)
      return alert("Speech recognition unsupported.");
    isListening
      ? recognitionRef.current.stop()
      : recognitionRef.current.start();
  };

  const handleSendMessage = async (text) => {
    const messageContent = text || input;
    if (!messageContent.trim() || isTyping) return;

    if (isListening) recognitionRef.current.stop();

    let tempSessionId = currentSessionId;
    const isNewSession = !tempSessionId;

    if (isNewSession) {
      tempSessionId = `temp-${Date.now()}`;
      setSessions((prev) => [
        {
          id: tempSessionId,
          title: "Summarizing...",
          messages: [],
          updatedAt: Date.now(),
        },
        ...prev,
      ]);
      setCurrentSessionId(tempSessionId);
    }

    const userMsg = {
      id: `u-${Date.now()}`,
      role: Role.USER,
      content: messageContent,
      timestamp: Date.now(),
    };

    const botPlaceholder = {
      id: `b-${Date.now()}`,
      role: Role.MODEL,
      content: "",
      timestamp: Date.now() + 1,
      isStreaming: true,
    };

    setSessions((prev) =>
      prev.map((s) =>
        s.id === tempSessionId
          ? {
              ...s,
              messages: [...s.messages, userMsg, botPlaceholder],
              updatedAt: Date.now(),
            }
          : s
      )
    );

    setInput("");
    setIsTyping(true);

    try {
      // ✅ NON-STREAMING CALL
      const fullResponse = await GeminiService.sendMessage(
        messageContent,
        profile
      );

      setSessions((prev) =>
        prev.map((s) =>
          s.id === tempSessionId
            ? {
                ...s,
                messages: s.messages.map((m) =>
                  m.id === botPlaceholder.id
                    ? { ...m, content: fullResponse, isStreaming: false }
                    : m
                ),
              }
            : s
        )
      );

      let finalTitle = "New Discussion";
      if (isNewSession) {
        finalTitle = await GeminiService.getQuickSummary(messageContent);
      }

      const savedSession = await InstituteService.saveChatSession({
        id: isNewSession ? undefined : tempSessionId,
        title: finalTitle,
        messages: [
          ...(currentSession?.messages || []),
          userMsg,
          { ...botPlaceholder, content: fullResponse, isStreaming: false },
        ],
      });

      setSessions((prev) =>
        prev.map((s) =>
          s.id === tempSessionId
            ? { ...s, id: savedSession.id, title: finalTitle }
            : s
        )
      );

      setCurrentSessionId(savedSession.id);
    } catch (error) {
      console.error("Chat sync error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-app-container">
      <aside
        className={`ai-app-sidebar ${isSidebarOpen ? "ai-app-sidebar-open" : "ai-app-sidebar-closed"}`}
      >
        <div className="ai-sidebar-header">
          <div
            className={`ai-sidebar-header-content ${!isSidebarOpen && "ai-sidebar-header-hidden"}`}
          >
            <div className="ai-os-logo">OS</div>
            <span className="font-bold tracking-tight">OneSolutions</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="ai-sidebar-toggle-btn"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <nav className="ai-sidebar-nav custom-scrollbar">
          <div className="ai-history-section">
            <div
              className={`ai-history-header ${!isSidebarOpen && "ai-sidebar-header-hidden"}`}
            >
              <h3 className="ai-history-title">History</h3>
              <button onClick={createNewChat} className="ai-new-chat-btn-small">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New
              </button>
            </div>

            <button
              onClick={createNewChat}
              className={`ai-new-chat-btn-large ${!isSidebarOpen && "ai-new-chat-btn-compact"}`}
              title="New Chat"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {isSidebarOpen && (
                <span className="font-bold text-sm">New Chat</span>
              )}
            </button>

            {isHistoryLoading ? (
              <div className="ai-history-loading">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="ai-skeleton-item"></div>
                ))}
              </div>
            ) : (
              <div className="ai-sessions-list">
                {sessions.map((s) => (
                  <div key={s.id} className="ai-session-item-group">
                    <button
                      onClick={() => {
                        setView("tutor");
                        setCurrentSessionId(s.id);
                      }}
                      className={`ai-session-item-btn ${currentSessionId === s.id && view === "tutor" ? "ai-session-item-active" : ""}`}
                    >
                      <svg
                        className="ai-session-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      {isSidebarOpen ? s.title : ""}
                    </button>
                    {isSidebarOpen && (
                      <button
                        onClick={(e) => deleteSession(e, s.id)}
                        className="ai-session-delete-btn"
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="ai-profile-section">
          {isProfileLoading ? (
            <div className="ai-profile-loading">
              <div className="ai-profile-avatar-skeleton"></div>
              {isSidebarOpen && (
                <div className="ai-profile-text-skeleton">
                  <div className="ai-profile-name-skeleton"></div>
                  <div className="ai-profile-batch-skeleton"></div>
                </div>
              )}
            </div>
          ) : profile ? (
            <div className="ai-profile-content">
              <div className="ai-profile-avatar">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="ai-profile-avatar-img"
                  />
                ) : (
                  <div className="ai-profile-avatar-initial">
                    {profile.firstName ? profile.firstName[0] : "U"}
                  </div>
                )}
              </div>
              {isSidebarOpen && (
                <div className="ai-profile-info">
                  <p className="ai-profile-name">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="ai-profile-batch">
                    {profile.batchMonth || "Batch"} {profile.batchYear || ""}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="ai-profile-fallback">
              <div className="ai-profile-fallback-avatar">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              {isSidebarOpen && (
                <div className="ai-profile-info">
                  <p className="ai-profile-name">No Profile</p>
                  <p className="ai-profile-batch">Connect to backend</p>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      <main className="ai-app-main">
        <div className="ai-content-area custom-scrollbar">
          {view === "dashboard" && (
            <div className="ai-welcome-dashboard">
              <div className="ai-welcome-icon-large">🤖</div>
              <h1 className="ai-welcome-title-large">
                Welcome to BroOne AI Assistant
              </h1>
              <p className="ai-welcome-subtitle">
                Thank you for being a valuable part of OneSolutions
              </p>

              <div className="ai-welcome-message-container">
                <p className="ai-welcome-message">
                  Your personalized AI mentor is here to guide you through your
                  learning journey, provide technical assistance, and help you
                  achieve your career goals.
                </p>

                <div className="ai-welcome-features">
                  <div className="ai-welcome-feature">
                    <div className="ai-feature-icon">💬</div>
                    <div className="ai-feature-content">
                      <h3>24/7 Learning Support</h3>
                      <p>
                        Get instant help with coding problems, debugging, and
                        technical concepts anytime.
                      </p>
                    </div>
                  </div>

                  <div className="ai-welcome-feature">
                    <div className="ai-feature-icon">🎯</div>
                    <div className="ai-feature-content">
                      <h3>Personalized Guidance</h3>
                      <p>
                        Tailored assistance based on your skill level, progress,
                        and learning goals.
                      </p>
                    </div>
                  </div>

                  <div className="ai-welcome-feature">
                    <div className="ai-feature-icon">🚀</div>
                    <div className="ai-feature-content">
                      <h3>Career Growth</h3>
                      <p>
                        Interview preparation, project guidance, and career path
                        recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setView("tutor")}
                className="ai-start-chat-button"
              >
                Start Chatting with BroOne
              </button>

              <p className="ai-welcome-footer">
                Your success is our mission. Let's build something amazing
                together!
              </p>
            </div>
          )}

          {view === "tutor" && (
            <div className="ai-tutor-container">
              <div className="ai-chat-messages custom-scrollbar">
                {!currentSession || currentSession.messages.length === 0 ? (
                  <div className="ai-welcome-screen">
                    <h2 className="ai-welcome-title">One Solutions AI Tutor</h2>
                    <p className="ai-welcome-description">
                      Senior instruction, debugging assistance, and career
                      guidance tailored to your current level.
                    </p>
                    <QuickPrompts onSelect={handleSendMessage} />
                  </div>
                ) : (
                  <div>
                    {currentSession.messages.map((m) => (
                      <ChatMessage key={m.id} message={m} />
                    ))}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="ai-input-area">
                <div className="ai-input-container">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      (e.preventDefault(), handleSendMessage())
                    }
                    placeholder="Ask a technical question or paste code..."
                    className="ai-textarea"
                    rows={1}
                  />
                  <div className="ai-input-buttons">
                    <button
                      onClick={toggleListening}
                      className={`ai-voice-button ${isListening ? "ai-voice-button-listening" : "ai-voice-button-idle"}`}
                      title="Voice input"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={isTyping || !input.trim()}
                      className="ai-send-button"
                    >
                      {isTyping ? (
                        <div className="ai-spinner" />
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AiApp;
