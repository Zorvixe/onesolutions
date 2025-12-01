"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { codingPracticesData } from "../../codingPracticesData/codingPracticesData";
import CodingPracticeService from "../../services/codingPracticeService";
import { useAuth } from "../../context/AuthContext";
import CodePlayground from "../../CodePlayground/CodePlayground";

import "./WebPractice.css";
import "../../codingPracticesData/codingpracticesweb.css";

const WebPractice = () => {
  const { practiceId, questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { loadProgressSummary } = useAuth();

  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [userProgress, setUserProgress] = useState({});
  const [currentCode, setCurrentCode] = useState({
    html: "",
    css: "",
    javascript: "",
  });
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const iframeRef = useRef(null);

  const subtopicId = location.state?.subtopicId;
  const goalName = location.state?.goalName;
  const courseName = location.state?.courseName;

  // Load practice and question data
  useEffect(() => {
    const practice = codingPracticesData.static.find(
      (p) => p.id === practiceId
    );
    if (practice) {
      setSelectedPractice(practice);

      const question =
        practice.questions.find((q) => q.id === questionId) ||
        practice.questions[0];
      if (question) {
        setSelectedQuestion(question);
        // Set initial code from question defaults
        setCurrentCode({
          html: question.defaultCode?.html || "",
          css: question.defaultCode?.css || "",
          javascript: question.defaultCode?.javascript || "",
        });
      }
    }
  }, [practiceId, questionId]);

  // Load user progress
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await CodingPracticeService.getAllProgress();
        if (response.success) {
          const progressMap = {};
          response.data.progress.forEach((prog) => {
            progressMap[prog.question_id] = prog;
          });
          setUserProgress(progressMap);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      }
    };
    loadProgress();
  }, []);

  useEffect(() => {
    if (testResults.length > 0) {
      const passed = testResults.every((test) => test.passed);
      setAllTestsPassed(passed);

      if (passed) {
        setOutput(
          `✅ All tests passed! ${testResults.length}/${testResults.length} tests completed successfully. You can now submit your solution.`
        );
      }
    }
  }, [testResults]);

  // Handle code changes from CodePlayground
  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
    setAllTestsPassed(false);
    setSubmitMessage("");
  };

  // Update preview using the iframe from CodePlayground
  const updatePreview = (iframeRef) => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${currentCode.css}</style>
      </head>
      <body>
        ${currentCode.html}
        <script>${currentCode.javascript}</script>
      </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(fullHtml);
    iframeDoc.close();
  };

  // ============================ TEST RUNNER HANDLERS ============================

  // Get validation type - handles both old and new test case formats
  const getValidationType = (testCase) => {
    // First check if validationType exists (new format)
    if (testCase.validationType) {
      return testCase.validationType;
    }
    // Fall back to input field (old format)
    return testCase.input;
  };

  // HTML Validation Test Handlers
  const htmlTestHandlers = {
    // Element existence and structure tests
    "element-exists": (testCase, iframeDoc) => {
      const element = iframeDoc.querySelector(testCase.selector);
      return {
        passed: !!element === testCase.expected,
        actual: !!element,
      };
    },

    "element-count": (testCase, iframeDoc) => {
      const elements = iframeDoc.querySelectorAll(testCase.selector);
      return {
        passed: elements.length === testCase.expected,
        actual: elements.length,
      };
    },

    "element-has-children": (testCase, iframeDoc) => {
      const element = iframeDoc.querySelector(testCase.selector);
      const hasChildren = element && element.children.length > 0;
      return {
        passed: hasChildren === testCase.expected,
        actual: hasChildren,
      };
    },

    "element-has-attribute": (testCase, iframeDoc) => {
      const element = iframeDoc.querySelector(testCase.selector);
      const hasAttribute = element && element.hasAttribute(testCase.attribute);
      return {
        passed: hasAttribute === testCase.expected,
        actual: hasAttribute,
      };
    },

    "element-attribute-value": (testCase, iframeDoc) => {
      const element = iframeDoc.querySelector(testCase.selector);
      const attributeValue = element
        ? element.getAttribute(testCase.attribute)
        : null;
      return {
        passed: attributeValue === testCase.expected,
        actual: attributeValue,
      };
    },

    "element-text-content": (testCase, iframeDoc) => {
      const element = iframeDoc.querySelector(testCase.selector);
      const textContent = element ? element.textContent.trim() : "";
      return {
        passed: textContent === testCase.expected,
        actual: textContent,
      };
    },

    "element-inner-html": (testCase, iframeDoc) => {
      const element = iframeDoc.querySelector(testCase.selector);
      const innerHTML = element ? element.innerHTML.trim() : "";
      return {
        passed: innerHTML.includes(testCase.expected),
        actual: innerHTML,
      };
    },

    "element-class": (testCase, iframeDoc) => {
      const element = iframeDoc.querySelector(testCase.selector);
      const hasClass = element
        ? element.classList.contains(testCase.className)
        : false;
      return {
        passed: hasClass === testCase.expected,
        actual: hasClass,
      };
    },

    "element-tag-name": (testCase, iframeDoc) => {
      const element = iframeDoc.querySelector(testCase.selector);
      const tagName = element ? element.tagName.toLowerCase() : "";
      return {
        passed: tagName === testCase.expected,
        actual: tagName,
      };
    },

    // Container relationship tests
    "check-heading-container": (testCase, iframeDoc) => {
      const containers = iframeDoc.querySelectorAll(
        "div, section, main, article, header, footer, nav, span, p, li, ul, ol, form"
      );
      let hasHeadingInContainer = false;

      containers.forEach((container) => {
        const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
        if (headings.length > 0) {
          hasHeadingInContainer = true;
        }
      });

      return {
        passed: hasHeadingInContainer,
        actual: hasHeadingInContainer,
      };
    },

    "check-paragraph-container": (testCase, iframeDoc) => {
      const containers = iframeDoc.querySelectorAll(
        "div, section, main, article, header, footer, nav, span, li, ul, ol, form"
      );
      let hasParagraphInContainer = false;

      containers.forEach((container) => {
        const paragraphs = container.querySelectorAll("p");
        if (paragraphs.length > 0) {
          hasParagraphInContainer = true;
        }
      });

      return {
        passed: hasParagraphInContainer,
        actual: hasParagraphInContainer,
      };
    },

    "check-button-container": (testCase, iframeDoc) => {
      const containers = iframeDoc.querySelectorAll(
        "div, section, main, article, header, footer, nav, span, li, ul, ol, form"
      );
      let hasButtonInContainer = false;

      containers.forEach((container) => {
        const buttons = container.querySelectorAll("button");
        if (buttons.length > 0) {
          hasButtonInContainer = true;
        }
      });

      return {
        passed: hasButtonInContainer,
        actual: hasButtonInContainer,
      };
    },

    // Form element tests
    "form-has-input": (testCase, iframeDoc) => {
      const form = iframeDoc.querySelector(testCase.selector);
      const hasInput = form
        ? form.querySelector("input, textarea, select")
        : false;
      return {
        passed: hasInput === testCase.expected,
        actual: hasInput,
      };
    },

    "input-has-type": (testCase, iframeDoc) => {
      const input = iframeDoc.querySelector(testCase.selector);
      const inputType = input ? input.type : "";
      return {
        passed: inputType === testCase.expected,
        actual: inputType,
      };
    },

    "input-has-placeholder": (testCase, iframeDoc) => {
      const input = iframeDoc.querySelector(testCase.selector);
      const hasPlaceholder = input && input.placeholder;
      return {
        passed: hasPlaceholder === testCase.expected,
        actual: hasPlaceholder,
      };
    },
  };

  // CSS Validation Test Handlers
  const cssTestHandlers = {
    "style-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const actual = computedStyle[testCase.property];
      return {
        passed: actual === testCase.expected,
        actual,
      };
    },

    "background-image-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const actual = computedStyle.backgroundImage;
      return {
        passed: actual !== "none" && actual !== "",
        actual,
      };
    },

    "check-background-image": (testCase, iframeDoc, iframe) => {
      const elements = iframeDoc.querySelectorAll("*");
      let hasBackgroundImage = false;

      elements.forEach((el) => {
        const style = iframe.contentWindow.getComputedStyle(el);
        if (style.backgroundImage && style.backgroundImage !== "none") {
          hasBackgroundImage = true;
        }
      });

      return {
        passed: hasBackgroundImage,
        actual: hasBackgroundImage,
      };
    },

    "color-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const actual = computedStyle.color;
      return {
        passed: actual === testCase.expected,
        actual,
      };
    },

    "font-family-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const actual = computedStyle.fontFamily;
      return {
        passed: actual.includes(testCase.expected),
        actual,
      };
    },

    "font-size-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const actual = computedStyle.fontSize;
      return {
        passed: actual === testCase.expected,
        actual,
      };
    },

    "text-align-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const actual = computedStyle.textAlign;
      return {
        passed: actual === testCase.expected,
        actual,
      };
    },

    "check-text-align-center": (testCase, iframeDoc, iframe) => {
      const elements = iframeDoc.querySelectorAll("*");
      let hasTextAlignCenter = false;

      elements.forEach((el) => {
        const style = iframe.contentWindow.getComputedStyle(el);
        if (style.textAlign === "center") {
          hasTextAlignCenter = true;
        }
      });

      return {
        passed: hasTextAlignCenter,
        actual: hasTextAlignCenter,
      };
    },

    "check-text-align-right": (testCase, iframeDoc, iframe) => {
      const elements = iframeDoc.querySelectorAll("*");
      let hasTextAlignRight = false;

      elements.forEach((el) => {
        const style = iframe.contentWindow.getComputedStyle(el);
        if (style.textAlign === "right") {
          hasTextAlignRight = true;
        }
      });

      return {
        passed: hasTextAlignRight,
        actual: hasTextAlignRight,
      };
    },

    "check-text-align-left": (testCase, iframeDoc, iframe) => {
      const elements = iframeDoc.querySelectorAll("*");
      let hasTextAlignLeft = false;

      elements.forEach((el) => {
        const style = iframe.contentWindow.getComputedStyle(el);
        if (style.textAlign === "left") {
          hasTextAlignLeft = true;
        }
      });

      return {
        passed: hasTextAlignLeft,
        actual: hasTextAlignLeft,
      };
    },

    "border-radius-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const actual = computedStyle.borderRadius;
      return {
        passed: actual !== "0px" && actual !== "",
        actual,
      };
    },

    "check-border-top-left-radius": (testCase, iframeDoc, iframe) => {
      const elements = iframeDoc.querySelectorAll("*");
      let hasBorderRadius = false;

      elements.forEach((el) => {
        const style = iframe.contentWindow.getComputedStyle(el);
        if (style.borderTopLeftRadius && style.borderTopLeftRadius !== "0px") {
          hasBorderRadius = true;
        }
      });

      return {
        passed: hasBorderRadius,
        actual: hasBorderRadius,
      };
    },

    "check-border-top-right-radius": (testCase, iframeDoc, iframe) => {
      const elements = iframeDoc.querySelectorAll("*");
      let hasBorderRadius = false;

      elements.forEach((el) => {
        const style = iframe.contentWindow.getComputedStyle(el);
        if (
          style.borderTopRightRadius &&
          style.borderTopRightRadius !== "0px"
        ) {
          hasBorderRadius = true;
        }
      });

      return {
        passed: hasBorderRadius,
        actual: hasBorderRadius,
      };
    },

    "padding-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const padding = Number.parseFloat(computedStyle.padding);
      return {
        passed: padding > 0,
        actual: `${padding}px`,
      };
    },

    "check-padding": (testCase, iframeDoc, iframe) => {
      const elements = iframeDoc.querySelectorAll("*");
      let hasPadding = false;

      elements.forEach((el) => {
        const style = iframe.contentWindow.getComputedStyle(el);
        const padding = Number.parseFloat(style.padding);
        if (padding > 0) {
          hasPadding = true;
        }
      });

      return {
        passed: hasPadding,
        actual: hasPadding,
      };
    },

    "margin-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const margin = Number.parseFloat(computedStyle.margin);
      return {
        passed: margin === testCase.expected,
        actual: `${margin}px`,
      };
    },

    "width-height-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const width = computedStyle.width;
      const height = computedStyle.height;

      let passed = false;
      if (testCase.dimension === "width") {
        passed = width === testCase.expected;
      } else if (testCase.dimension === "height") {
        passed = height === testCase.expected;
      }

      return {
        passed,
        actual: testCase.dimension === "width" ? width : height,
      };
    },

    "display-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const actual = computedStyle.display;
      return {
        passed: actual === testCase.expected,
        actual,
      };
    },

    "position-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const actual = computedStyle.position;
      return {
        passed: actual === testCase.expected,
        actual,
      };
    },

    "flexbox-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const isFlex = computedStyle.display === "flex";
      return {
        passed: isFlex === testCase.expected,
        actual: isFlex,
      };
    },

    "grid-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const computedStyle = iframe.contentWindow.getComputedStyle(element);
      const isGrid = computedStyle.display === "grid";
      return {
        passed: isGrid === testCase.expected,
        actual: isGrid,
      };
    },
  };

  // JavaScript Validation Test Handlers
  const jsTestHandlers = {
    "function-exists": (testCase, iframeDoc, iframe) => {
      const functionExists =
        typeof iframe.contentWindow[testCase.functionName] === "function";
      return {
        passed: functionExists === testCase.expected,
        actual: functionExists,
      };
    },

    "variable-exists": (testCase, iframeDoc, iframe) => {
      const variableExists =
        typeof iframe.contentWindow[testCase.variableName] !== "undefined";
      return {
        passed: variableExists === testCase.expected,
        actual: variableExists,
      };
    },

    "event-listener-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const hasClickHandler = element.onclick !== null;
      return {
        passed: hasClickHandler === testCase.expected,
        actual: hasClickHandler,
      };
    },

    "console-output-check": (testCase, iframeDoc, iframe) => {
      return {
        passed: false,
        actual: "Console output check not implemented",
      };
    },

    "dom-manipulation-check": (testCase, iframeDoc, iframe) => {
      const element = iframeDoc.querySelector(testCase.selector);
      if (!element) return { passed: false, actual: "Element not found" };

      const hasChildElements = element.children.length > 0;
      return {
        passed: hasChildElements === testCase.expected,
        actual: hasChildElements,
      };
    },
  };

  // Layout and Responsive Test Handlers
  const layoutTestHandlers = {
    "viewport-meta-check": (testCase, iframeDoc) => {
      const viewportMeta = iframeDoc.querySelector('meta[name="viewport"]');
      return {
        passed: !!viewportMeta === testCase.expected,
        actual: !!viewportMeta,
      };
    },

    "media-query-check": (testCase, iframeDoc, iframe) => {
      const styleSheets = iframeDoc.styleSheets;
      let hasMediaQueries = false;

      try {
        for (const sheet of styleSheets) {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSMediaRule) {
              hasMediaQueries = true;
              break;
            }
          }
          if (hasMediaQueries) break;
        }
      } catch (e) {
        console.log("Could not check all stylesheets:", e);
      }

      return {
        passed: hasMediaQueries === testCase.expected,
        actual: hasMediaQueries,
      };
    },

    "responsive-image-check": (testCase, iframeDoc) => {
      const images = iframeDoc.querySelectorAll("img");
      let hasResponsiveImages = false;

      images.forEach((img) => {
        if (
          img.style.maxWidth === "100%" ||
          img.classList.contains("responsive")
        ) {
          hasResponsiveImages = true;
        }
      });

      return {
        passed: hasResponsiveImages === testCase.expected,
        actual: hasResponsiveImages,
      };
    },
  };

  // Accessibility Test Handlers
  const accessibilityTestHandlers = {
    "alt-text-check": (testCase, iframeDoc) => {
      const images = iframeDoc.querySelectorAll("img");
      let allHaveAlt = true;

      images.forEach((img) => {
        if (!img.alt) {
          allHaveAlt = false;
        }
      });

      return {
        passed: allHaveAlt === testCase.expected,
        actual: allHaveAlt,
      };
    },

    "semantic-html-check": (testCase, iframeDoc) => {
      const semanticElements = iframeDoc.querySelectorAll(
        "header, footer, nav, main, section, article, aside"
      );
      return {
        passed: semanticElements.length > 0 === testCase.expected,
        actual: semanticElements.length > 0,
      };
    },

    "aria-attributes-check": (testCase, iframeDoc) => {
      const elementsWithAria = iframeDoc.querySelectorAll(
        "[aria-label], [aria-labelledby], [aria-describedby]"
      );
      return {
        passed: elementsWithAria.length > 0 === testCase.expected,
        actual: elementsWithAria.length > 0,
      };
    },
  };

  // Main test runner function
  const runTests = async (iframeRef) => {
    if (!selectedQuestion || !iframeRef.current) return;

    setIsRunning(true);
    setOutput("Running tests...");
    setSubmitMessage("");

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const results = [];
    let passedCount = 0;

    try {
      for (const testCase of selectedQuestion.testCases) {
        let passed = false;
        let actual = "";
        const error = null;

        try {
          let testResult = { passed: false, actual: "Test not implemented" };

          // Get the validation type (handles both old and new formats)
          const validationType = getValidationType(testCase);

          // Route test case to appropriate handler
          if (testCase.type === "html-validation") {
            if (htmlTestHandlers[validationType]) {
              testResult = htmlTestHandlers[validationType](
                testCase,
                iframeDoc
              );
            } else {
              testResult = {
                passed: false,
                actual: `Unknown HTML validation type: ${validationType}`,
              };
            }
          } else if (testCase.type === "css-validation") {
            if (cssTestHandlers[validationType]) {
              testResult = cssTestHandlers[validationType](
                testCase,
                iframeDoc,
                iframe
              );
            } else {
              testResult = {
                passed: false,
                actual: `Unknown CSS validation type: ${validationType}`,
              };
            }
          } else if (testCase.type === "javascript-validation") {
            if (jsTestHandlers[validationType]) {
              testResult = jsTestHandlers[validationType](
                testCase,
                iframeDoc,
                iframe
              );
            } else {
              testResult = {
                passed: false,
                actual: `Unknown JavaScript validation type: ${validationType}`,
              };
            }
          } else if (testCase.type === "layout-validation") {
            if (layoutTestHandlers[validationType]) {
              testResult = layoutTestHandlers[validationType](
                testCase,
                iframeDoc,
                iframe
              );
            } else {
              testResult = {
                passed: false,
                actual: `Unknown layout validation type: ${validationType}`,
              };
            }
          } else if (testCase.type === "accessibility-validation") {
            if (accessibilityTestHandlers[validationType]) {
              testResult = accessibilityTestHandlers[validationType](
                testCase,
                iframeDoc
              );
            } else {
              testResult = {
                passed: false,
                actual: `Unknown accessibility validation type: ${validationType}`,
              };
            }
          } else {
            // Fallback for unknown test types
            testResult = {
              passed: false,
              actual: `Unknown test type: ${testCase.type}`,
            };
          }

          passed = testResult.passed;
          actual = testResult.actual;
        } catch (error) {
          console.error(`Test ${testCase.id} failed:`, error);
          passed = false;
          actual = `Error: ${error.message}`;
        }

        if (passed) passedCount++;

        results.push({
          ...testCase,
          passed,
          actual: actual?.toString() || "",
          expected:
            testCase.expected?.toString() ||
            testCase.output?.toString() ||
            "true",
          validationType: getValidationType(testCase), // Add validationType for display
        });
      }

      setTestResults(results);

      const allPassed = passedCount === selectedQuestion.testCases.length;
      setAllTestsPassed(allPassed);

      if (allPassed) {
        setOutput(
          `✅ All tests passed! ${passedCount}/${selectedQuestion.testCases.length} tests completed successfully. You can now submit your solution.`
        );
      } else {
        setOutput(
          `Tests completed: ${passedCount}/${selectedQuestion.testCases.length} passed. Fix the issues and run tests again.`
        );
      }
    } catch (error) {
      setOutput(`Error running tests: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const updateQuestionStatus = async (questionId, passed, score) => {
    try {
      const codeContent = JSON.stringify(currentCode);

      const attemptData = {
        passed,
        score: passed ? score : 0,
        timestamp: new Date().toISOString(),
      };

      // Save progress to the backend
      const response = await CodingPracticeService.saveProgress(
        practiceId,
        questionId,
        "web",
        codeContent,
        passed ? "solved" : "attempted",
        passed ? score : 0,
        attemptData
      );

      if (response.success) {
        // Update local userProgress state immediately
        setUserProgress((prev) => ({
          ...prev,
          [questionId]: {
            question_id: questionId,
            status: passed ? "solved" : "attempted",
            score: passed ? score : 0,
            ...prev[questionId],
          },
        }));

        await loadProgressSummary();
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error("Failed to update question status:", error);
      return { success: false, error: error.message };
    }
  };

  const handleSubmit = async () => {
    // Check if all tests are passed by examining testResults directly
    const allTestsCurrentlyPassed =
      testResults.length > 0 && testResults.every((test) => test.passed);

    if (!allTestsCurrentlyPassed) {
      setSubmitMessage(
        "❌ Please pass all tests before submitting. Run tests first and ensure all tests pass."
      );
      return;
    }

    const currentStatus = getQuestionStatus(selectedQuestion.id);
    if (currentStatus === "solved") {
      setSubmitMessage("✅ This question has already been solved!");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("Submitting your solution...");

    try {
      // Call the updateQuestionStatus function
      const result = await updateQuestionStatus(
        selectedQuestion.id,
        true,
        selectedQuestion.score
      );

      if (result.success) {
        setSubmitMessage(
          "✅ Congratulations! Your solution has been submitted successfully and marked as completed."
        );

        // Force a refresh of the progress data
        await loadProgressSummary();

        // Also update the practice completion status
        if (selectedPractice) {
          try {
            await CodingPracticeService.completePractice(
              selectedPractice.id,
              goalName,
              courseName
            );
            console.log("Practice marked as complete");
          } catch (practiceError) {
            console.log(
              "Practice completion update optional:",
              practiceError.message
            );
          }
        }
      } else {
        setSubmitMessage(
          `❌ Failed to submit solution: ${result.error || "Unknown error"}`
        );
      }
    } catch (error) {
      setSubmitMessage(`❌ Error submitting solution: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToPractice = () => {
    navigate(`/static-practice/${practiceId}`, {
      state: { subtopicId, goalName, courseName },
    });
  };

  const getQuestionStatus = (questionId) => {
    return userProgress[questionId]?.status || "unsolved";
  };

  // Custom handler for running tests from CodePlayground
  const handleRunTests = (iframeRef) => {
    updatePreview(iframeRef);
    setTimeout(() => {
      runTests(iframeRef);
    }, 100);
  };

  // Render description details
  const renderDescriptionDetails = () => {
    if (!selectedQuestion?.descriptionDetails) return null;

    // If descriptionDetails is a string containing HTML
    if (typeof selectedQuestion.descriptionDetails === "string") {
      return (
        <div
          className="desc-question-details"
          dangerouslySetInnerHTML={{
            __html: selectedQuestion.descriptionDetails,
          }}
        />
      );
    }

    // If descriptionDetails is an object with structured data
    if (typeof selectedQuestion.descriptionDetails === "object") {
      return (
        <div className="desc-question-details">
          {/* Render structured content here */}
          <p>{selectedQuestion.descriptionDetails.instructions}</p>
          {/* Add more rendering logic as needed */}
        </div>
      );
    }

    return null;
  };

  if (!selectedPractice || !selectedQuestion) {
    return <div>Loading...</div>;
  }

  const currentStatus = getQuestionStatus(selectedQuestion.id);
  const isAlreadySolved = currentStatus === "solved";

  return (
    <div className="web-practice-container">
      {/* Header */}
      <div className="web-practice-header">
        <button className="back-button" onClick={handleBackToPractice}>
          ← {selectedPractice.title}
        </button>
        <div className="question-info">
          <div className="question-meta">
            <span className={`status ${currentStatus}`}>
              {currentStatus === "solved"
                ? "✓ Solved"
                : currentStatus === "attempted"
                ? "● Attempted"
                : "○ Unsolved"}
            </span>
            <span
              className={`difficulty ${selectedQuestion.difficulty.toLowerCase()}`}
            >
              {selectedQuestion.difficulty}
            </span>
            <span className="score-head">{selectedQuestion.score} points</span>
          </div>
        </div>
      </div>

      <div className="web-practice-content">
        {/* Left Side - Question & Tests */}
        <div className="left-panel">
          {/* Question Description with fixed header */}
          <div className="question-description">
            <div className="question-description-header">
              <h3>Description</h3>
              <h2>{selectedQuestion.title}</h2>
              <p>{selectedQuestion.description}</p>
            </div>
            <div className="question-description-content">
              {/* This is where the detailed description will appear */}
              <div className="desc-question-full-view">
                {renderDescriptionDetails()}
              </div>
            </div>
          </div>

          {/* Test Cases with fixed header */}
          <div className="test-cases">
            <div className="test-cases-header">
              <h3>Test Cases</h3>
              <span className="tests-count">
                {testResults.filter((t) => t.passed).length}/
                {testResults.length} Passed
              </span>
            </div>
            <div className="test-cases-content">
              <div className="test-results">
                {testResults.map((test, index) => (
                  <div
                    key={index}
                    className={`test-case ${test.passed ? "passed" : "failed"}`}
                  >
                    <div className="test-header">
                      <span className="test-status">
                        {test.passed ? "✓" : "✗"} Test {index + 1}
                        <span className="test-type-badge">
                          {test.type} - {test.validationType || test.input}
                        </span>
                      </span>
                      <span className="test-visibility">
                        {test.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    <p className="test-description">{test.description}</p>
                    {!test.passed && (
                      <div className="test-details">
                        <span>Expected: {test.expected}</span>
                        <span>Actual: {test.actual}</span>
                      </div>
                    )}
                  </div>
                ))}
                {testResults.length === 0 && (
                  <div className="no-tests">
                    Run the tests to see results here
                  </div>
                )}
              </div>
              <div className="test-actions">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !allTestsPassed || isAlreadySolved}
                  className="submit-btn"
                >
                  {isSubmitting ? "Submitting..." : "Submit Solution"}
                </button>

                {/* Show message if already solved */}
                {isAlreadySolved && (
                  <div className="already-solved-message">
                    ✅ This question has already been solved!
                  </div>
                )}
              </div>

              {/* Submission Message */}
              {submitMessage && (
                <div
                  className={`submit-message ${
                    submitMessage.includes("✅") ? "success" : "error"
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - CodePlayground */}
        <div className="right-panel">
          <CodePlayground
            initialLanguage="web"
            initialCode={currentCode}
            autoRun={false}
            onCodeChange={handleCodeChange}
            iframeRef={iframeRef}
            customRunHandler={() => handleRunTests(iframeRef)}
            runButtonText="Run Tests"
          />
          <div className="output-section">
            <h3>Test Output</h3>
            <div className="output-container">
              <pre>{output || "Test results will appear here..."}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebPractice;
