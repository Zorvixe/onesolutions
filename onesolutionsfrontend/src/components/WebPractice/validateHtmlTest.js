const validateHtmlTest = (testCase, iframeDoc, iframe) => {
    try {
      const validationType = testCase.input;

      switch (validationType) {
        case "check-heading-container": {
          const containers = iframeDoc.querySelectorAll(
            "div, section, main, article, header, footer, nav, form"
          );
          let hasHeadingInContainer = false;
          containers.forEach((container) => {
            const headings = container.querySelectorAll(
              "h1, h2, h3, h4, h5, h6"
            );
            if (headings.length > 0) {
              hasHeadingInContainer = true;
            }
          });
          return {
            passed: hasHeadingInContainer,
            actual: hasHeadingInContainer
              ? "Found heading in container"
              : "No heading found in container",
          };
        }

        case "check-paragraph-container": {
          const containers = iframeDoc.querySelectorAll(
            "div, section, main, article, header, footer, nav, form"
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
            actual: hasParagraphInContainer
              ? "Found paragraph in container"
              : "No paragraph found in container",
          };
        }

        case "check-button-container": {
          const containers = iframeDoc.querySelectorAll(
            "div, section, main, article, header, footer, nav, form"
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
            actual: hasButtonInContainer
              ? "Found button in container"
              : "No button found in container",
          };
        }

        case "check-d-flex-container": {
          const dFlexElements = iframeDoc.querySelectorAll(".d-flex");
          const hasDFlexClass = dFlexElements.length > 0;
          return {
            passed: hasDFlexClass,
            actual: hasDFlexClass
              ? `Found ${dFlexElements.length} element(s) with class d-flex`
              : "No element with class d-flex found",
          };
        }

        case "check-flex-column": {
          const flexColumnElements = iframeDoc.querySelectorAll(".flex-column");
          const hasFlexColumnClass = flexColumnElements.length > 0;
          return {
            passed: hasFlexColumnClass,
            actual: hasFlexColumnClass
              ? `Found ${flexColumnElements.length} element(s) with class flex-column`
              : "No element with class flex-column found",
          };
        }

        case "check-justify-content-center": {
          const justifyCenterElements = iframeDoc.querySelectorAll(
            ".justify-content-center"
          );
          const hasJustifyCenterClass = justifyCenterElements.length > 0;
          return {
            passed: hasJustifyCenterClass,
            actual: hasJustifyCenterClass
              ? `Found ${justifyCenterElements.length} element(s) with class justify-content-center`
              : "No element with class justify-content-center found",
          };
        }
        case "check-justify-content-end": {
          const justifyEndElements = iframeDoc.querySelectorAll(
            ".justify-content-end"
          );
          const hasJustifyEndClass = justifyEndElements.length > 0;
          return {
            passed: hasJustifyEndClass,
            actual: hasJustifyEndClass
              ? `Found ${justifyEndElements.length} element(s) with class justify-content-End`
              : "No element with class justify-content-End found",
          };
        }

        default:
          return { passed: false, actual: "Unknown HTML test type" };
      }
    } catch (error) {
      console.error("[v0] HTML validation error:", error);
      return {
        passed: false,
        actual: `Error: ${error.message}`,
      };
    }
  };

  export default validateHtmlTest;