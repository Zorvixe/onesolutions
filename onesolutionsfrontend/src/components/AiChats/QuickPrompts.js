import React from 'react';
import './QuickPrompts.css';

const PROMPTS = [
  "Explain React Hooks",
  "How to connect Node to PG?",
  "Career path for Full Stack?",
  "Best way to learn SQL?",
  "Refactor my code",
  "Mock interview prep"
];

const QuickPrompts = ({ onSelect }) => {
  return (
    <div className="quick-prompts-container">
      {PROMPTS.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="quick-prompt-button"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default QuickPrompts;