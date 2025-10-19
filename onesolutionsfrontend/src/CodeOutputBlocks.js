import React from "react";
import AceEditor from "react-ace";

// Import Ace modes & themes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";


import "./CodeOutputBlocks.css";


// Reusable CodeBlock component
export const CodeBlock = ({ code, language }) => {
  const codeLineCount = code.split("\n").length;
  const minLines = codeLineCount + 1;

  return (
    <div className="code_terminal_full_stack">
      <div className="terminal_header_full_stack">
        <div className="terminal_controls_full_stack">
          <span className="control_dot_full_stack red_full_stack"></span>
          <span className="control_dot_full_stack yellow_full_stack"></span>
          <span className="control_dot_full_stack green_full_stack"></span>
        </div>
        <span className="terminal_title_full_stack">
  {{
    python: "Python",
    java: "Java",
    javascript: "JavaScript",
    html: "HTML",
    css: "CSS",
  }[language] || "Unknown"}
</span>

      </div>

      <AceEditor
        width="100%"
        mode={language}
        theme="monokai"
        name={`editor_${language}`}
        fontSize={15 }
        lineHeight={26}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        minLines={minLines}
        maxLines={Infinity}
        setOptions={{
          readOnly: true,
          highlightActiveLine: false,
          highlightGutterLine: false,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false,
          showFoldWidgets: true,
          behavioursEnabled: false,
        }}
      />
    </div>
  );
};

// Reusable OutputBlock component
export const OutputBlock = ({ output }) => {
  return (
    <div className="output-block">
      {Array.isArray(output)
        ? output.map((line, index) => <div key={index}>{line}</div>)
        : output}
    </div>
  );
};
