import React from "react";
import AceEditor from "react-ace";

// Import Ace modes & themes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

import "./CodeOutputBlocks.css";

// Helper function to detect language and get display name
const getLanguageInfo = (code, language) => {
  // If language is explicitly provided, use it
  if (language) {
    const displayNames = {
      python: "Python",
      java: "Java",
      javascript: "JavaScript",
      jsx: "React JSX",
      javascript_standalone: "JavaScript",
      html: "HTML",
      css: "CSS",
      react: "React JSX",
      js: "JavaScript",
    };
    return {
      mode: language === "jsx" || language === "react" ? "jsx" : language,
      displayName: displayNames[language] || "Note",
    };
  }

  // Auto-detect language from code content
  if (
    code.includes("import React") ||
    code.includes("export default") ||
    code.includes("function Component") ||
    code.includes("const Component") ||
    code.includes("className=") ||
    (code.includes("</") && code.includes("/>")) ||
    code.includes("React.") ||
    (code.match(/return\s*\([\s\S]*?\)/) && code.includes("</"))
  ) {
    return { mode: "jsx", displayName: "React JSX" };
  }

  if (
    code.includes("<!DOCTYPE html>") ||
    code.includes("<html>") ||
    code.includes("<div>")
  ) {
    return { mode: "html", displayName: "HTML" };
  }

  if (
    code.includes("function") &&
    code.includes("{") &&
    code.includes("}") &&
    !code.includes("class")
  ) {
    return { mode: "javascript", displayName: "JavaScript" };
  }

  if (code.includes("public class") || code.includes("System.out.println")) {
    return { mode: "java", displayName: "Java" };
  }

  if (
    code.includes("def ") ||
    (code.includes("print(") && !code.includes("console.log"))
  ) {
    return { mode: "python", displayName: "Python" };
  }

  if (code.includes("{") && code.includes("}") && code.includes(":")) {
    return { mode: "css", displayName: "CSS" };
  }

  return { mode: "javascript", displayName: "JavaScript" };
};

// Reusable CodeBlock component
export const CodeBlock = ({
  code,
  language,
  theme = "monokai",
  fontSize = 15,
}) => {
  const { mode, displayName } = getLanguageInfo(code, language);
  const codeLineCount = code.split("\n").length;
  const minLines = codeLineCount + 1;

  return (
    <div className="code_terminal_cheat">
      <div className="terminal_header_cheat">
        <div className="terminal_controls_cheat">
          <span className="control_dot_cheat red_cheat"></span>
          <span className="control_dot_cheat yellow_cheat"></span>
          <span className="control_dot_cheat green_cheat"></span>
        </div>
        <div>
          <span className="terminal_title_cheat">{displayName}</span>
        </div>
      </div>

      <AceEditor
        width="100%"
        mode={mode}
        theme={theme}
        name={`editor_${mode}`}
        fontSize={fontSize}
        lineHeight={1.4}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={false}
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
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          fontFamily:
            "'Fira Code', 'Cascadia Code', 'Monaco', 'Consolas', monospace",
          scrollPastEnd: 0.5,
          highlightSelectedWord: false,
          displayIndentGuides: true,
          showInvisibles: false,
          fixedWidthGutter: true,
          wrap: false,
          indentedSoftWrap: false,
        }}
        editorProps={{
          $blockScrolling: true,
        }}
        style={{
          lineHeight: "1.4",
        }}
      />
    </div>
  );
};

// Reusable OutputBlock component
export const OutputBlock = ({ output }) => {
  return (
    <div className="output-block-cheat output-container-cheat">
      <pre className="code-output-cheat">
        {Array.isArray(output)
          ? output.map((line, index) => <div key={index}>{line}</div>)
          : output}
      </pre>
    </div>
  );
};

// Combined CodeOutputBlock component for displaying both code and output
export const CodeOutputBlock = ({
  code,
  output,
  language,
  theme = "monokai",
  fontSize = 15,
}) => {
  const { mode, displayName } = getLanguageInfo(code, language);

  return (
    <div className="code-output-combined-cheat">
      <CodeBlock
        code={code}
        language={language}
        theme={theme}
        fontSize={fontSize}
      />
      {output && (
        <div className="output-section-cheat">
          <div className="section-header-cheat">
            <h3>OUTPUT</h3>
          </div>
          <OutputBlock output={output} />
        </div>
      )}
    </div>
  );
};

export default CodeOutputBlock;