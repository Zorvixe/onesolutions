const validateJsTest = (testCase, iframeDoc, iframe) => {
  console.log(`JS Test: ${testCase.input}`);
  console.log("Iframe document:", iframeDoc);
  console.log("Document readyState:", iframeDoc.readyState);
  console.log("Body exists:", !!iframeDoc.body);

  // List all elements with IDs for debugging
  const allElements = iframeDoc.querySelectorAll("[id]");
  console.log(
    "Elements with IDs:",
    Array.from(allElements).map((el) => el.id)
  );

  try {
    const validationType = testCase.input;
    const win = iframe.contentWindow;
    const doc = iframeDoc;

    switch (validationType) {
      // ========== COLOR PICKER VALIDATIONS ==========
      case "check-button1-bg": {
        const button = doc.getElementById("button1");
        if (!button) return { passed: false, actual: "Button1 not found" };

        button.click();

        const container = doc.getElementById("colorPickerContainer");
        if (!container) return { passed: false, actual: "Container not found" };

        const bgColor = win.getComputedStyle(container).backgroundColor;
        const passed = bgColor === "rgb(224, 224, 224)";

        return {
          passed,
          actual: passed
            ? "Background color changed to #e0e0e0"
            : "Background color not changed",
        };
      }

      case "check-button1-text": {
        const button = doc.getElementById("button1");
        if (!button) return { passed: false, actual: "Button1 not found" };

        button.click();

        const hexCodeElement = doc.getElementById("selectedColorHexCode");
        if (!hexCodeElement)
          return { passed: false, actual: "Hex code element not found" };

        const text = hexCodeElement.textContent.trim();
        const passed = text === "#e0e0e0";

        return {
          passed,
          actual: passed
            ? "Hex code updated to #e0e0e0"
            : "Hex code not updated",
        };
      }

      case "check-button2-bg": {
        const button = doc.getElementById("button2");
        if (!button) return { passed: false, actual: "Button2 not found" };

        button.click();

        const container = doc.getElementById("colorPickerContainer");
        if (!container) return { passed: false, actual: "Container not found" };

        const bgColor = win.getComputedStyle(container).backgroundColor;
        const passed = bgColor === "rgb(111, 207, 151)";

        return {
          passed,
          actual: passed
            ? "Background color changed to #6fcf97"
            : "Background color not changed",
        };
      }

      case "check-button2-text": {
        const button = doc.getElementById("button2");
        if (!button) return { passed: false, actual: "Button2 not found" };

        button.click();

        const hexCodeElement = doc.getElementById("selectedColorHexCode");
        if (!hexCodeElement)
          return { passed: false, actual: "Hex code element not found" };

        const text = hexCodeElement.textContent.trim();
        const passed = text === "#6fcf97";

        return {
          passed,
          actual: passed
            ? "Hex code updated to #6fcf97"
            : "Hex code not updated",
        };
      }

      case "check-button3-bg": {
        const button = doc.getElementById("button3");
        if (!button) return { passed: false, actual: "Button3 not found" };

        button.click();

        const container = doc.getElementById("colorPickerContainer");
        if (!container) return { passed: false, actual: "Container not found" };

        const bgColor = win.getComputedStyle(container).backgroundColor;
        const passed = bgColor === "rgb(86, 204, 242)";

        return {
          passed,
          actual: passed
            ? "Background color changed to #56ccf2"
            : "Background color not changed",
        };
      }

      case "check-button3-text": {
        const button = doc.getElementById("button3");
        if (!button) return { passed: false, actual: "Button3 not found" };

        button.click();

        const hexCodeElement = doc.getElementById("selectedColorHexCode");
        if (!hexCodeElement)
          return { passed: false, actual: "Hex code element not found" };

        const text = hexCodeElement.textContent.trim();
        const passed = text === "#56ccf2";

        return {
          passed,
          actual: passed
            ? "Hex code updated to #56ccf2"
            : "Hex code not updated",
        };
      }

      case "check-button4-bg": {
        const button = doc.getElementById("button4");
        if (!button) return { passed: false, actual: "Button4 not found" };

        button.click();

        const container = doc.getElementById("colorPickerContainer");
        if (!container) return { passed: false, actual: "Container not found" };

        const bgColor = win.getComputedStyle(container).backgroundColor;
        const passed = bgColor === "rgb(187, 107, 217)";

        return {
          passed,
          actual: passed
            ? "Background color changed to #bb6bd9"
            : "Background color not changed",
        };
      }

      case "check-button4-text": {
        const button = doc.getElementById("button4");
        if (!button) return { passed: false, actual: "Button4 not found" };

        button.click();

        const hexCodeElement = doc.getElementById("selectedColorHexCode");
        if (!hexCodeElement)
          return { passed: false, actual: "Hex code element not found" };

        const text = hexCodeElement.textContent.trim();
        const passed = text === "#bb6bd9";

        return {
          passed,
          actual: passed
            ? "Hex code updated to #bb6bd9"
            : "Hex code not updated",
        };
      }

      // ========== SEASON SWITCHER VALIDATIONS ==========
      case "check-spring-images": {
        const button = doc.getElementById("springBtn");
        if (!button)
          return { passed: false, actual: "Spring button not found" };

        button.click();

        const smallImg = doc.getElementById("seasonSmallImage");
        const mediumImg = doc.getElementById("seasonMediumImage");

        if (!smallImg || !mediumImg)
          return { passed: false, actual: "Season images not found" };

        const smallSrc = smallImg.src;
        const mediumSrc = mediumImg.src;

        const smallHasSpring = smallSrc.includes("spring");
        const mediumHasSpring = mediumSrc.includes("spring");
        const passed = smallHasSpring && mediumHasSpring;

        return {
          passed,
          actual: passed
            ? "Images updated to Spring"
            : "Images not updated to Spring",
        };
      }

      case "check-summer-images": {
        const button = doc.getElementById("summerBtn");
        if (!button)
          return { passed: false, actual: "Summer button not found" };

        button.click();

        const smallImg = doc.getElementById("seasonSmallImage");
        const mediumImg = doc.getElementById("seasonMediumImage");

        if (!smallImg || !mediumImg)
          return { passed: false, actual: "Season images not found" };

        const smallSrc = smallImg.src;
        const mediumSrc = mediumImg.src;

        const smallHasSummer = smallSrc.includes("summer");
        const mediumHasSummer = mediumSrc.includes("summer");
        const passed = smallHasSummer && mediumHasSummer;

        return {
          passed,
          actual: passed
            ? "Images updated to Summer"
            : "Images not updated to Summer",
        };
      }

      case "check-autumn-images": {
        const button = doc.getElementById("autumnBtn");
        if (!button)
          return { passed: false, actual: "Autumn button not found" };

        button.click();

        const smallImg = doc.getElementById("seasonSmallImage");
        const mediumImg = doc.getElementById("seasonMediumImage");

        if (!smallImg || !mediumImg)
          return { passed: false, actual: "Season images not found" };

        const smallSrc = smallImg.src;
        const mediumSrc = mediumImg.src;

        const smallHasAutumn = smallSrc.includes("autumn");
        const mediumHasAutumn = mediumSrc.includes("autumn");
        const passed = smallHasAutumn && mediumHasAutumn;

        return {
          passed,
          actual: passed
            ? "Images updated to Autumn"
            : "Images not updated to Autumn",
        };
      }

      case "check-winter-images": {
        const button = doc.getElementById("winterBtn");
        if (!button)
          return { passed: false, actual: "Winter button not found" };

        button.click();

        const smallImg = doc.getElementById("seasonSmallImage");
        const mediumImg = doc.getElementById("seasonMediumImage");

        if (!smallImg || !mediumImg)
          return { passed: false, actual: "Season images not found" };

        const smallSrc = smallImg.src;
        const mediumSrc = mediumImg.src;

        const smallHasWinter = smallSrc.includes("winter");
        const mediumHasWinter = mediumSrc.includes("winter");
        const passed = smallHasWinter && mediumHasWinter;

        return {
          passed,
          actual: passed
            ? "Images updated to Winter"
            : "Images not updated to Winter",
        };
      }

      //Tip calculator validation
      case "check-billAmount": {
        const element = doc.getElementById("billAmount");
        const passed = element !== null;

        return {
          passed,
          actual: passed
            ? "Found billAmount element"
            : "billAmount element not found",
        };
      }

      case "check-percentageTip": {
        const element = doc.getElementById("percentageTip");
        const passed = element !== null;

        return {
          passed,
          actual: passed
            ? "Found percentageTip element"
            : "percentageTip element not found",
        };
      }

      case "check-tipAmount": {
        const element = doc.getElementById("tipAmount");
        const passed = element !== null;

        return {
          passed,
          actual: passed
            ? "Found tipAmount element"
            : "tipAmount element not found",
        };
      }

      case "check-totalAmount": {
        const element = doc.getElementById("totalAmount");
        const passed = element !== null;

        return {
          passed,
          actual: passed
            ? "Found totalAmount element"
            : "totalAmount element not found",
        };
      }

      case "check-errorMessage": {
        const element = doc.getElementById("errorMessage");
        const passed = element !== null;

        return {
          passed,
          actual: passed
            ? "Found errorMessage element"
            : "errorMessage element not found",
        };
      }

      case "check-tip-calculation": {
        const billAmount = doc.getElementById("billAmount");
        const percentageTip = doc.getElementById("percentageTip");
        const calculateButton = doc.getElementById("calculateButton");

        if (!billAmount || !percentageTip || !calculateButton) {
          return { passed: false, actual: "Required elements not found" };
        }

        billAmount.value = "100";
        percentageTip.value = "10";
        calculateButton.click();

        const tipElement = doc.getElementById("tipAmount");
        if (!tipElement)
          return { passed: false, actual: "Tip amount element not found" };

        const tip = parseFloat(tipElement.value);
        const passed = tip === 10;

        return {
          passed,
          actual: passed
            ? "Tip calculated correctly"
            : "Tip not calculated correctly",
        };
      }

      case "check-total-calculation": {
        const billAmount = doc.getElementById("billAmount");
        const percentageTip = doc.getElementById("percentageTip");
        const calculateButton = doc.getElementById("calculateButton");

        if (!billAmount || !percentageTip || !calculateButton) {
          return { passed: false, actual: "Required elements not found" };
        }

        billAmount.value = "100";
        percentageTip.value = "10";
        calculateButton.click();

        const totalElement = doc.getElementById("totalAmount");
        if (!totalElement)
          return { passed: false, actual: "Total amount element not found" };

        const total = parseFloat(totalElement.value);
        const passed = total === 110;

        return {
          passed,
          actual: passed
            ? "Total calculated correctly"
            : "Total not calculated correctly",
        };
      }

      case "check-both-empty": {
        const billAmount = doc.getElementById("billAmount");
        const percentageTip = doc.getElementById("percentageTip");
        const calculateButton = doc.getElementById("calculateButton");

        if (!billAmount || !percentageTip || !calculateButton) {
          return { passed: false, actual: "Required elements not found" };
        }

        billAmount.value = "";
        percentageTip.value = "";
        calculateButton.click();

        const errorElement = doc.getElementById("errorMessage");
        if (!errorElement)
          return { passed: false, actual: "Error message element not found" };

        const errorText = errorElement.textContent.trim();
        const passed = errorText.length > 0;

        return {
          passed,
          actual: passed
            ? "Error message shown for empty fields"
            : "No error message shown",
        };
      }

      case "check-billAmount-empty": {
        const billAmount = doc.getElementById("billAmount");
        const percentageTip = doc.getElementById("percentageTip");
        const calculateButton = doc.getElementById("calculateButton");

        if (!billAmount || !percentageTip || !calculateButton) {
          return { passed: false, actual: "Required elements not found" };
        }

        billAmount.value = "";
        percentageTip.value = "10";
        calculateButton.click();

        const errorElement = doc.getElementById("errorMessage");
        if (!errorElement)
          return { passed: false, actual: "Error message element not found" };

        const errorText = errorElement.textContent.trim();
        const passed = errorText.length > 0;

        return {
          passed,
          actual: passed
            ? "Error message shown for empty bill amount"
            : "No error message shown",
        };
      }

      case "check-percentageTip-empty": {
        const billAmount = doc.getElementById("billAmount");
        const percentageTip = doc.getElementById("percentageTip");
        const calculateButton = doc.getElementById("calculateButton");

        if (!billAmount || !percentageTip || !calculateButton) {
          return { passed: false, actual: "Required elements not found" };
        }

        billAmount.value = "100";
        percentageTip.value = "";
        calculateButton.click();

        const errorElement = doc.getElementById("errorMessage");
        if (!errorElement)
          return { passed: false, actual: "Error message element not found" };

        const errorText = errorElement.textContent.trim();
        const passed = errorText.length > 0;

        return {
          passed,
          actual: passed
            ? "Error message shown for empty percentage tip"
            : "No error message shown",
        };
      }

      //=========Addition Game ======
      case "check-firstNumber": {
        const element = iframeDoc.getElementById("firstNumber");
        return { passed: element !== null };
      }

      case "check-secondNumber": {
        const element = iframeDoc.getElementById("secondNumber");
        return { passed: element !== null };
      }

      case "check-userInput": {
        const element = iframeDoc.getElementById("userInput");
        return { passed: element !== null };
      }

      case "check-gameResult": {
        const element = iframeDoc.getElementById("gameResult");
        return { passed: element !== null };
      }

      case "check-correct-answer": {
        const a = parseInt(iframeDoc.getElementById("firstNumber").textContent);
        const b = parseInt(
          iframeDoc.getElementById("secondNumber").textContent
        );

        iframeDoc.getElementById("userInput").value = a + b;
        iframeDoc.getElementById("checkButton").click();

        const resultText = iframeDoc
          .getElementById("gameResult")
          .textContent.trim();
        const passed = resultText === "Congratulations! You got it right.";

        return { passed, actual: resultText };
      }

      case "check-wrong-answer": {
        iframeDoc.getElementById("userInput").value = 0;
        iframeDoc.getElementById("checkButton").click();

        const resultText = iframeDoc
          .getElementById("gameResult")
          .textContent.trim();
        const passed = resultText === "Please Try Again!";

        return { passed, actual: resultText };
      }

      case "check-restart": {
        iframeDoc.getElementById("restartButton").click();

        const resultText = iframeDoc.getElementById("gameResult").textContent;
        const passed = resultText === "";

        return { passed, actual: resultText };
      }

      //Button Maker
      case "check-bgColorInput": {
        const button = iframeDoc.getElementById("customButton");
        iframeDoc.getElementById("bgColorInput").value = "red";
        iframeDoc.getElementById("applyButton").click();

        const actual = button.style.backgroundColor;
        const passed = actual === "red";
        return { passed, actual };
      }

      case "check-fontColorInput": {
        const button = iframeDoc.getElementById("customButton");
        iframeDoc.getElementById("fontColorInput").value = "white";
        iframeDoc.getElementById("applyButton").click();

        const actual = button.style.color;
        const passed = actual === "white";
        return { passed, actual };
      }

      case "check-fontSizeInput": {
        const button = iframeDoc.getElementById("customButton");
        iframeDoc.getElementById("fontSizeInput").value = "20px";
        iframeDoc.getElementById("applyButton").click();

        const actual = button.style.fontSize;
        const passed = actual === "20px";
        return { passed, actual };
      }

      case "check-fontWeightInput": {
        const button = iframeDoc.getElementById("customButton");
        iframeDoc.getElementById("fontWeightInput").value = "700";
        iframeDoc.getElementById("applyButton").click();

        const actual = button.style.fontWeight;
        const passed = actual === "700";
        return { passed, actual };
      }

      case "check-paddingInput": {
        const button = iframeDoc.getElementById("customButton");
        iframeDoc.getElementById("paddingInput").value = "15px";
        iframeDoc.getElementById("applyButton").click();

        const actual = button.style.padding;
        const passed = actual === "15px";
        return { passed, actual };
      }

      case "check-borderRadiusInput": {
        const button = iframeDoc.getElementById("customButton");
        iframeDoc.getElementById("borderRadiusInput").value = "10px";
        iframeDoc.getElementById("applyButton").click();

        const actual = button.style.borderRadius;
        const passed = actual === "10px";
        return { passed, actual };
      }

      default:
        return {
          passed: false,
          actual: `Unknown JS test type: ${validationType}`,
        };
    }
  } catch (error) {
    console.error("[JS Validation Error]:", error);
    return {
      passed: false,
      actual: `Validation Error: ${error.message}`,
    };
  }
};

export default validateJsTest;
