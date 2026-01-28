import React from 'react';
import { Role } from '../../types';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const isModel = message.role === Role.MODEL;

  // Simple markdown-ish code block highlighter
  const renderContent = (content) => {
    if (!content) return null;
    const parts = content.split(/(\`\`\`[\s\S]*?\`\`\`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/\`\`\`(\w+)?\n?([\s\S]*?)\`\`\`/);
        const lang = match?.[1] || '';
        const code = match?.[2] || '';
        return (
          <div key={index} className="chat-code-block">
            <div className="chat-code-header">
              <span className="chat-code-lang">{lang.toUpperCase() || 'CODE'}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(code)}
                className="chat-copy-button"
              >
                Copy
              </button>
            </div>
            <div className="chat-code-content">
              <pre className="chat-code-pre">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        );
      }
      return <p key={index} className="chat-message-text">{part}</p>;
    });
  };

  return (
    <div className={`chat-message-container ${isModel ? 'chat-message-start' : 'chat-message-end'}`}>
      <div className={`chat-message-content ${isModel ? 'chat-message-row' : 'chat-message-row-reverse'}`}>
        <div className={`chat-avatar ${isModel ? 'chat-avatar-model' : 'chat-avatar-user'}`}>
          {isModel ? (
            <svg className="chat-avatar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="chat-avatar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>
        
        <div className={`chat-message-bubble ${isModel ? 'chat-message-model' : 'chat-message-user'}`}>
          <div className="chat-message-header">
            {isModel ? 'OneSolutions AI Tutor' : 'You'} • {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div>
            {renderContent(message.content)}
            {message.isStreaming && (
              <span className="chat-streaming-indicator" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;