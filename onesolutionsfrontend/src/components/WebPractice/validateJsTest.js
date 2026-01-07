const validateJsTest = (testCase, iframeDoc) => {
  const normalizeColor = (color) => color.replace(/\s/g, "").toLowerCase();

  switch (testCase.input) {
    case "check-button1-bg": {
      iframeDoc.getElementById("button1").click();

      const bgColor = getComputedStyle(
        iframeDoc.getElementById("colorPickerContainer")
      ).backgroundColor;

      return {
        passed: normalizeColor(bgColor) === "rgb(224,224,224)",
        actual: bgColor,
      };
    }

    case "check-button1-text": {
      iframeDoc.getElementById("button1").click();

      const text = iframeDoc.getElementById("selectedColorHexCode").textContent;

      return {
        passed: text.trim() === "#e0e0e0",
        actual: text,
      };
    }

    case "check-button2-bg": {
      iframeDoc.getElementById("button2").click();

      const bgColor = getComputedStyle(
        iframeDoc.getElementById("colorPickerContainer")
      ).backgroundColor;

      return {
        passed: normalizeColor(bgColor) === "rgb(111,207,151)",
        actual: bgColor,
      };
    }

    case "check-button2-text": {
      iframeDoc.getElementById("button2").click();

      const text = iframeDoc.getElementById("selectedColorHexCode").textContent;

      return {
        passed: text.trim() === "#6fcf97",
        actual: text,
      };
    }

    case "check-button3-bg": {
      iframeDoc.getElementById("button3").click();

      const bgColor = getComputedStyle(
        iframeDoc.getElementById("colorPickerContainer")
      ).backgroundColor;

      return {
        passed: normalizeColor(bgColor) === "rgb(86,204,242)",
        actual: bgColor,
      };
    }

    case "check-button3-text": {
      iframeDoc.getElementById("button3").click();

      const text = iframeDoc.getElementById("selectedColorHexCode").textContent;

      return {
        passed: text.trim() === "#56ccf2",
        actual: text,
      };
    }

    case "check-button4-bg": {
      iframeDoc.getElementById("button4").click();

      const bgColor = getComputedStyle(
        iframeDoc.getElementById("colorPickerContainer")
      ).backgroundColor;

      return {
        passed: normalizeColor(bgColor) === "rgb(187,107,217)",
        actual: bgColor,
      };
    }

    case "check-button4-text": {
      iframeDoc.getElementById("button4").click();

      const text = iframeDoc.getElementById("selectedColorHexCode").textContent;

      return {
        passed: text.trim() === "#bb6bd9",
        actual: text,
      };
    }

    default:
      return {
        passed: false,
        actual: "Invalid test case input",
      };
  }
};

export default validateJsTest;
