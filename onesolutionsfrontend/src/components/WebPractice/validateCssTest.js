const validateCssTest = (testCase, iframeDoc, iframe) => {
  try {
    const validationType = testCase.input;

    switch (validationType) {
      case "check-background-image": {
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
          actual: hasBackgroundImage
            ? "Found background image"
            : "No background image found",
        };
      }

      case "check-text-align-center": {
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
          actual: hasTextAlignCenter
            ? "Found text-align: center"
            : "No text-align: center found",
        };
      }

      case "check-text-align-right": {
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
          actual: hasTextAlignRight
            ? "Found text-align: right"
            : "No text-align: right found",
        };
      }

      case "check-border-top-left-radius": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBorderRadius = false;
        elements.forEach((el) => {
          const style = iframe.contentWindow.getComputedStyle(el);
          if (
            style.borderTopLeftRadius &&
            style.borderTopLeftRadius !== "0px"
          ) {
            hasBorderRadius = true;
          }
        });
        return {
          passed: hasBorderRadius,
          actual: hasBorderRadius
            ? "Found border-top-left-radius"
            : "No border-top-left-radius found",
        };
      }

      case "check-border-top-right-radius": {
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
          actual: hasBorderRadius
            ? "Found border-top-right-radius"
            : "No border-top-right-radius found",
        };
      }

      case "check-padding": {
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
          actual: hasPadding ? "Found padding > 0" : "No padding found",
        };
      }

      case "check-margin": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasMargin = false;
        elements.forEach((el) => {
          const style = iframe.contentWindow.getComputedStyle(el);
          const margin = Number.parseFloat(style.margin);
          if (margin > 0) {
            hasMargin = true;
          }
        });
        return {
          passed: hasMargin,
          actual: hasMargin ? "Found margin > 0" : "No margin found",
        };
      }

      case "check-border-style": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBorderStyle = false;
        elements.forEach((el) => {
          const style = iframe.contentWindow.getComputedStyle(el);
          if (
            style.borderStyle &&
            style.borderStyle !== "none" &&
            style.borderStyle !== "hidden"
          ) {
            hasBorderStyle = true;
          }
        });
        return {
          passed: hasBorderStyle,
          actual: hasBorderStyle
            ? "Found element with border-style"
            : "No element with border-style found",
        };
      }

      case "check-border-width": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBorderWidth = false;
        elements.forEach((el) => {
          const style = iframe.contentWindow.getComputedStyle(el);
          const borderTop = Number.parseFloat(style.borderTopWidth);
          const borderRight = Number.parseFloat(style.borderRightWidth);
          const borderBottom = Number.parseFloat(style.borderBottomWidth);
          const borderLeft = Number.parseFloat(style.borderLeftWidth);
          const borderWidth = Number.parseFloat(style.borderWidth);

          if (
            borderTop > 0 ||
            borderRight > 0 ||
            borderBottom > 0 ||
            borderLeft > 0 ||
            borderWidth > 0
          ) {
            hasBorderWidth = true;
          }
        });
        return {
          passed: hasBorderWidth,
          actual: hasBorderWidth
            ? "Found element with border-width > 0"
            : "No element with border-width > 0 found",
        };
      }

      case "check-border-radius": {
        const buttons = iframeDoc.querySelectorAll("button");
        let hasBorderRadius = false;

        buttons.forEach((btn) => {
          const style = iframe.contentWindow.getComputedStyle(btn);
          const radius = parseFloat(style.borderRadius);
          if (radius > 0) {
            hasBorderRadius = true;
          }
        });

        return {
          passed: hasBorderRadius,
          actual: hasBorderRadius
            ? "Button has border-radius > 0"
            : "No button has border-radius > 0",
        };
      }
      case "check-margin-right": {
        const buttons = iframeDoc.querySelectorAll("button");
        let hasMarginRight = false;

        buttons.forEach((btn) => {
          const style = iframe.contentWindow.getComputedStyle(btn);
          const marginRight = parseFloat(style.marginRight);
          if (marginRight > 0) {
            hasMarginRight = true;
          }
        });

        return {
          passed: hasMarginRight,
          actual: hasMarginRight
            ? "Button has margin-right > 0"
            : "No button has margin-right > 0",
        };
      }
      case "check-margin-left": {
        const buttons = iframeDoc.querySelectorAll("button");
        let hasMarginLeft = false;

        buttons.forEach((btn) => {
          const style = iframe.contentWindow.getComputedStyle(btn);
          const marginLeft = parseFloat(style.marginLeft);
          if (marginLeft > 0) {
            hasMarginLeft = true;
          }
        });

        return {
          passed: hasMarginLeft,
          actual: hasMarginLeft
            ? "Button has margin-left > 0"
            : "No button has margin-left > 0",
        };
      }
      case "check-background-size": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBackgroundSizeCover = false;

        elements.forEach((el) => {
          const style = iframe.contentWindow.getComputedStyle(el);
          if (style.backgroundSize === "cover") {
            hasBackgroundSizeCover = true;
          }
        });

        return {
          passed: hasBackgroundSizeCover,
          actual: hasBackgroundSizeCover
            ? "Found background-size: cover"
            : "No background-size: cover found",
        };
      }

      default:
        return { passed: false, actual: "Unknown CSS test type" };
    }
  } catch (error) {
    console.error("[v0] CSS validation error:", error);
    return {
      passed: false,
      actual: `Error: ${error.message}`,
    };
  }
};

export default validateCssTest;
