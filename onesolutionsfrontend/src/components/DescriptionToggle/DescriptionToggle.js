import React, { useState } from "react";

const DescriptionToggle = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  // Get only the first line
  const firstLine = text.split("\n")[0];

  return (
    <p
      style={{
        lineHeight: "1.4",
        whiteSpace: "pre-line",
      }}
    >
      {expanded ? text : firstLine}

      {/* Show toggle only if text has more content */}
      {text.split("\n").length > 1 && (
        <span
          onClick={() => setExpanded(!expanded)}
          style={{
            color: "blue",
            cursor: "pointer",
            marginLeft: "6px",
            fontWeight: 500,
          }}
        >
          {expanded ? "...less" : "...more"}
        </span>
      )}
    </p>
  );
};

export default DescriptionToggle;
