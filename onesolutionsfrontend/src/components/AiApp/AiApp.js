import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "../AiChats/ChatMessage";
import QuickPrompts from "../AiChats/QuickPrompts";
import { InstituteService } from "../../services/instituteService";
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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [learningContent, setLearningContent] = useState([]);
  const [showContentSidebar, setShowContentSidebar] = useState(false);
  const [view, setView] = useState("dashboard");
  const [error, setError] = useState(null);

  const chatEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const currentSession = sessions.find((s) => s.id === currentSessionId);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages, isTyping]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadInitialData = async () => {
    setIsHistoryLoading(true);
    setError(null);

    try {
      // Load profile first
      try {
        const prof = await InstituteService.getProfile();
        setProfile(prof);
      } catch (profileError) {
        console.error("Error loading profile:", profileError);
        // Continue without profile
      }

      // Load sessions
      try {
        const history = await InstituteService.getChatSessions();
        setSessions(history || []);
      } catch (sessionError) {
        console.error("Error loading sessions:", sessionError);
        setSessions([]);
      }

      // Load categories
      try {
        const cats = await InstituteService.getAICategories();
        setCategories(cats || []);
      } catch (categoryError) {
        console.error("Error loading categories:", categoryError);
        setCategories([]);
      }

    } catch (error) {
      console.error("Error loading initial data:", error);
      setError("Failed to load data. Please refresh the page.");
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    try {
      const content = await InstituteService.getLearningContent(category);
      setLearningContent(content || []);
    } catch (error) {
      console.error("Error loading content:", error);
      setLearningContent([]);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setView("tutor");
    setInput("");
    setError(null);
  };

  const handleSendMessage = async (text) => {
    const messageContent = text || input;
    if (!messageContent.trim() || isTyping) return;

    const tempSessionId = currentSessionId || `temp-${Date.now()}`;

    if (!currentSessionId) {
      const newSession = {
        id: tempSessionId,
        title: messageContent.substring(0, 30) + "...",
        messages: [],
        updatedAt: Date.now(),
        category: selectedCategory,
      };
      setSessions([newSession, ...sessions]);
      setCurrentSessionId(tempSessionId);
    }

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: Date.now(),
      category: selectedCategory,
    };

    // Update session with user message
    setSessions((prev) =>
      prev.map((s) =>
        s.id === tempSessionId
          ? {
              ...s,
              messages: [...(s.messages || []), userMsg],
              updatedAt: Date.now(),
            }
          : s
      )
    );

    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      // Use enhanced chat with content integration
      const response = await InstituteService.sendEnhancedChat({
        message: messageContent,
        sessionId: tempSessionId,
        category: selectedCategory,
      });

      const botMsg = {
        id: `b-${Date.now()}`,
        role: "model",
        content: response.response,
        timestamp: Date.now() + 1,
        contextFound: response.contextFound,
        relevantContent: response.relevantContent,
        similarQuestions: response.similarQuestions,
      };

      // Update session with bot message
      setSessions((prev) =>
        prev.map((s) =>
          s.id === tempSessionId
            ? {
                ...s,
                messages: [...(s.messages || []), botMsg],
                title: messageContent.substring(0, 30) + "...",
              }
            : s
        )
      );

      // Save session to backend if it's a new session
      if (!currentSessionId) {
        try {
          const savedSession = await InstituteService.saveChatSession({
            title: messageContent.substring(0, 30) + "...",
            messages: [userMsg, botMsg],
            category: selectedCategory,
          });

          if (savedSession && savedSession.id) {
            setSessions((prev) =>
              prev.map((s) =>
                s.id === tempSessionId ? { ...s, id: savedSession.id } : s
              )
            );
            setCurrentSessionId(savedSession.id);
          }
        } catch (saveError) {
          console.error("Failed to save session:", saveError);
          // Keep using temp session ID
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setError("Failed to get response. Please try again.");
      
      // Add error message
      const errorMsg = {
        id: `b-${Date.now()}`,
        role: "model",
        content: "I apologize, but I encountered an error. Please try again or contact support.",
        timestamp: Date.now() + 1,
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === tempSessionId
            ? { ...s, messages: [...(s.messages || []), errorMsg] }
            : s
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (typeof window === 'undefined') return;
    
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setError("Speech recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setError("Voice recognition failed. Please try typing instead.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearInput = () => {
    setInput("");
  };

  const handleQuickPromptSelect = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleSelectSession = (session) => {
    setCurrentSessionId(session.id);
    setView("tutor");
    setSelectedCategory(session.category || "all");
  };

  return (
    <div className="ai-app-container">
      {/* Left Sidebar */}
      <aside className={`ai-app-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="ai-sidebar-header">
          <div className="ai-logo-section">
            <div className="ai-os-logo">
              <span className="ai-logo-text">One Solutions</span>
            </div>
            {isSidebarOpen && <div className="ai-brand-section"></div>}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="ai-sidebar-toggle"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <span className="ai-toggle-icon">{isSidebarOpen ? "◀" : "▶"}</span>
          </button>
        </div>

        <div className="ai-sidebar-content">
          {/* Chat History Section */}
          <div className="ai-history-section">
            <div className="ai-section-header">
              {isSidebarOpen && (
                <h3 className="ai-section-title">Recent Chats</h3>
              )}
              {isSidebarOpen && (
                <button
                  onClick={handleNewChat}
                  className="ai-new-chat-btn"
                  title="New Chat"
                  aria-label="Start new chat"
                >
                  <span className="ai-new-chat-icon">+</span>
                  New Chat
                </button>
              )}
            </div>

            <div className="ai-sessions-list">
              {isHistoryLoading ? (
                <div className="ai-sessions-loading">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="ai-session-skeleton"></div>
                  ))}
                </div>
              ) : sessions.length === 0 ? (
                <div className="ai-no-sessions">
                  <p>No chat history yet</p>
                </div>
              ) : (
                sessions
                  .filter(
                    (s) =>
                      selectedCategory === "all" ||
                      s.category === selectedCategory
                  )
                  .slice(0, 8)
                  .map((session) => (
                    <div
                      key={session.id}
                      className={`ai-session-item ${
                        currentSessionId === session.id ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => handleSelectSession(session)}
                        className="ai-session-content"
                        title={session.title}
                      >
                        {!isSidebarOpen ? (
                          <div className="ai-session-icon-compact">💬</div>
                        ) : (
                          <>
                            <div className="ai-session-header">
                              <span className="ai-session-title">
                                {session.title || "Untitled Chat"}
                              </span>
                              {session.category && session.category !== "all" && (
                                <span className="ai-session-category">
                                  {session.category}
                                </span>
                              )}
                            </div>
                            {session.messages && session.messages.length > 0 && (
                              <div className="ai-session-preview">
                                {session.messages[session.messages.length - 1]?.content?.substring(0, 50) || "..."}
                              </div>
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Category Filter */}
          {isSidebarOpen && categories.length > 0 && (
            <div className="ai-category-filter">
              <h4 className="ai-filter-title">Filter by Category</h4>
              <div className="ai-category-buttons">
                <button
                  className={`ai-category-btn ${selectedCategory === "all" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("all")}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.category_name}
                    className={`ai-category-btn ${selectedCategory === cat.category_name ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat.category_name)}
                  >
                    {cat.category_name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ai-app-main">
        {error && (
          <div className="ai-error-banner">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="ai-error-close">
              ×
            </button>
          </div>
        )}

        {view === "dashboard" && (
          <div className="ai-dashboard-view">
            <div className="ai-dashboard-content">
              {/* Welcome Header */}
              <div className="ai-welcome-header">
                <h1>Welcome{profile?.firstName ? `, ${profile.firstName}` : ''}!</h1>
                <p>I'm BroOne, your AI learning assistant. How can I help you today?</p>
                <button onClick={handleNewChat} className="ai-start-chat-btn">
                  Start New Chat
                </button>
              </div>

              {/* Categories Grid */}
              <div className="ai-categories-section">
                <h2>Learning Categories</h2>
                <div className="ai-categories-grid">
                  {categories.map((cat) => (
                    <div key={cat.category_name} className="ai-category-card">
                      <div className="ai-category-icon">
                        <span className="ai-category-emoji">
                          {cat.icon_url?.includes('frontend') ? '🎨' : 
                           cat.icon_url?.includes('backend') ? '⚙️' : 
                           cat.icon_url?.includes('python') ? '🐍' : 
                           cat.icon_url?.includes('marketing') ? '📈' : 
                           cat.icon_url?.includes('placement') ? '💼' : 
                           cat.icon_url?.includes('git') ? '🔧' : 
                           cat.icon_url?.includes('project') ? '📁' : 
                           cat.icon_url?.includes('faq') ? '❓' : '📚'}
                        </span>
                      </div>
                      <div className="ai-category-content">
                        <h3>{cat.category_name}</h3>
                        <p>{cat.description || "Explore this topic"}</p>
                        <button
                          onClick={() => {
                            setSelectedCategory(cat.category_name);
                            setView("tutor");
                            handleNewChat();
                          }}
                          className="ai-category-action"
                        >
                          Start Learning →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div className="ai-stats-section">
                <div className="ai-stat-card">
                  <h3>📊 Your Learning Stats</h3>
                  <div className="ai-stats-grid">
                    <div className="ai-stat-item">
                      <div className="ai-stat-icon">💬</div>
                      <div className="ai-stat-content">
                        <span className="ai-stat-number">
                          {sessions.length}
                        </span>
                        <span className="ai-stat-label">Chat Sessions</span>
                      </div>
                    </div>
                    <div className="ai-stat-item">
                      <div className="ai-stat-icon">📨</div>
                      <div className="ai-stat-content">
                        <span className="ai-stat-number">
                          {sessions.reduce(
                            (total, session) =>
                              total + (session.messages?.length || 0),
                            0
                          )}
                        </span>
                        <span className="ai-stat-label">Total Messages</span>
                      </div>
                    </div>
                    <div className="ai-stat-item">
                      <div className="ai-stat-icon">📚</div>
                      <div className="ai-stat-content">
                        <span className="ai-stat-number">
                          {categories.length}
                        </span>
                        <span className="ai-stat-label">Categories</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="ai-quick-tips">
                  <h3>💡 Quick Tips</h3>
                  <ul className="ai-tips-list">
                    <li>Be specific with your questions for better answers</li>
                    <li>Use the quick prompts to get started quickly</li>
                    <li>Ask follow-up questions for deeper understanding</li>
                    <li>Try voice input for hands-free interaction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "tutor" && (
          <div className="ai-tutor-view">
            <div className="ai-tutor-container">
              {/* Top Bar */}
              <div className="ai-top-bar">
                <div className="ai-session-info">
                  {currentSession ? (
                    <h3>{currentSession.title || "Chat Session"}</h3>
                  ) : (
                    <h3>New Chat</h3>
                  )}
                  {selectedCategory && selectedCategory !== "all" && (
                    <span className="ai-current-category">{selectedCategory}</span>
                  )}
                </div>
                <div className="ai-top-actions">
                  <button
                    onClick={() => setView("dashboard")}
                    className="ai-back-btn"
                  >
                    ← Back to Dashboard
                  </button>
                  <button
                    onClick={handleNewChat}
                    className="ai-new-in-chat-btn"
                  >
                    + New Chat
                  </button>
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="ai-chat-main">
                {/* Messages Container */}
                <div className="ai-messages-wrapper">
                  <div
                    className="ai-messages-container"
                    ref={messagesContainerRef}
                  >
                    {!currentSession || !currentSession.messages || currentSession.messages.length === 0 ? (
                      <div className="ai-welcome-screen">
                        <div className="ai-welcome-content">
                          <h3 className="ai-welcome-title">
                            Hello, {profile?.firstName || "there"}!
                          </h3>
                          <p className="ai-welcome-subtitle">
                            I'm BroOne, your AI learning assistant. How can I help you today?
                          </p>

                          {/* Quick Prompts */}
                          <div className="ai-quick-prompts-section">
                            <h4 className="ai-quick-prompts-title">
                              💡 Quick Prompts
                            </h4>
                            <QuickPrompts
                              onSelect={handleQuickPromptSelect}
                              category={selectedCategory}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="ai-messages">
                        {currentSession.messages.map((msg) => (
                          <ChatMessage
                            key={msg.id}
                            message={msg}
                            showContext={msg.relevantContent?.length > 0}
                          />
                        ))}
                        {isTyping && (
                          <div className="ai-typing-indicator">
                            <div className="ai-typing-content">
                              <div className="ai-typing-dots">
                                <div className="ai-typing-dot"></div>
                                <div className="ai-typing-dot"></div>
                                <div className="ai-typing-dot"></div>
                              </div>
                              <span className="ai-typing-text">
                                BroOne is typing...
                              </span>
                            </div>
                          </div>
                        )}
                        <div ref={chatEndRef} className="ai-chat-anchor" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Fixed Input Area at Bottom */}
                <div className="ai-input-area-fixed">
                  <div className="ai-input-container">
                    {error && (
                      <div className="ai-input-error">
                        <p>{error}</p>
                      </div>
                    )}
                    <div className="ai-input-wrapper">
                      <div className="ai-input-field">
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={`Ask me anything about ${
                            selectedCategory === "all"
                              ? "any topic"
                              : selectedCategory
                          }...`}
                          className="ai-textarea"
                          rows={1}
                          disabled={isTyping}
                          autoFocus
                        />
                        {input && (
                          <button
                            onClick={handleClearInput}
                            className="ai-clear-input"
                            aria-label="Clear input"
                            type="button"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <div className="ai-input-actions">
                        <button
                          onClick={handleVoiceInput}
                          className={`ai-voice-button ${
                            isListening ? "listening" : ""
                          }`}
                          type="button"
                          disabled={isTyping}
                          aria-label={
                            isListening ? "Listening..." : "Start voice input"
                          }
                        >
                          <span className="ai-voice-icon">
                            {isListening ? "⏸️" : "🎤"}
                          </span>
                        </button>
                        <button
                          onClick={() => handleSendMessage()}
                          disabled={isTyping || !input.trim()}
                          className="ai-send-button"
                          type="button"
                          aria-label="Send message"
                        >
                          {isTyping ? (
                            <span className="ai-send-spinner"></span>
                          ) : (
                            <span className="ai-send-icon">↑</span>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="ai-input-hint">
                      Press Enter to send • Shift+Enter for new line
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AiApp;