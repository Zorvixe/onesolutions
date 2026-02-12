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

      //user profile
      case "check-profileContainer": {
        const element = iframeDoc.getElementById("profileContainer");
        return { passed: element !== null };
      }

      case "check-image": {
        const element = iframeDoc.querySelector("img");
        return { passed: element !== null };
      }

      case "check-name": {
        const headingEl = iframeDoc.querySelector("h1");
        const passed =
          headingEl !== null &&
          headingEl.textContent.trim() === "RAHUL ATTULURI";
        return {
          passed,
          actual: headingEl ? headingEl.textContent.trim() : null,
        };
      }

      case "check-age": {
        const paraEl = iframeDoc.querySelector("p");
        const passed =
          paraEl !== null && paraEl.textContent.trim() === "Age: 25";
        return { passed, actual: paraEl ? paraEl.textContent.trim() : null };
      }
      //Todos application
      case "check-input-element": {
        const element = iframeDoc.querySelector("input[type='text']");
        return { passed: element !== null };
      }

      case "check-ul-element": {
        const element = iframeDoc.querySelector("ul");
        return { passed: element !== null };
      }

      case "check-li-element": {
        const element = iframeDoc.querySelector("li");
        return { passed: element !== null };
      }

      case "check-checkbox-element": {
        const element = iframeDoc.querySelector("input[type='checkbox']");
        return { passed: element !== null };
      }

      case "check-label-element": {
        const element = iframeDoc.querySelector("label");
        return { passed: element !== null };
      }

      //Add to Cart
      case "check-row-container": {
        const element = iframeDoc.querySelector(".row");
        return { passed: element !== null };
      }

      case "check-cart-input": {
        const element = iframeDoc.getElementById("cartItemTextInput");
        return { passed: element !== null };
      }

      case "check-add-button1": {
        const element = iframeDoc.getElementById("addBtn");
        return { passed: element !== null };
      }

      case "check-add-item": {
        const inputEl = iframeDoc.getElementById("cartItemTextInput");
        const buttonEl = iframeDoc.getElementById("addBtn");
        const listContainer = iframeDoc.getElementById("cartItemsContainer");

        inputEl.value = "Apple";
        buttonEl.click();

        const lastItem = listContainer.lastElementChild;
        const passed = lastItem !== null && lastItem.textContent === "Apple";

        return { passed, actual: lastItem ? lastItem.textContent : null };
      }

      case "check-row-child": {
        const rowEl = iframeDoc.querySelector(".row");
        const passed = rowEl !== null && rowEl.children.length > 0;
        return { passed };
      }

      //add strike
      case "check-container": {
        const element = iframeDoc.getElementById("checkBoxWithLabelContainer");
        return { passed: element !== null };
      }

      case "check-checkbox": {
        const element = iframeDoc.getElementById("checkbox");
        return { passed: element !== null && element.type === "checkbox" };
      }

      case "check-label": {
        const element = iframeDoc.getElementById("checkboxLabel");
        return { passed: element !== null };
      }

      case "check-checkbox-strike": {
        const checkbox = iframeDoc.getElementById("checkbox");
        const label = iframeDoc.getElementById("checkboxLabel");

        checkbox.checked = false;
        label.classList.remove("strike");

        checkbox.click(); // triggers onTodoStatusChange()

        const passed = label.classList.contains("strike");
        return { passed };
      }

      case "check-label-strike": {
        const checkbox = iframeDoc.getElementById("checkbox");
        const label = iframeDoc.getElementById("checkboxLabel");

        checkbox.checked = false;
        label.classList.remove("strike");

        label.click();

        const passed = label.classList.contains("strike");
        return { passed };
      }

      //your order
      case "check-ordered-container": {
        const element = iframeDoc.getElementById("orderedItemsContainer");
        return { passed: element !== null };
      }

      case "check-heading": {
        const element = iframeDoc.querySelector("h1");
        return { passed: element !== null };
      }

      case "check-ul": {
        const element = iframeDoc.getElementById("itemsListContainer");
        return { passed: element !== null && element.tagName === "UL" };
      }

      case "check-item2": {
        const element = iframeDoc.getElementById("item2");
        return { passed: element !== null && element.tagName === "LI" };
      }

      case "check-button3": {
        const element = iframeDoc.getElementById("button3");
        return { passed: element !== null && element.tagName === "BUTTON" };
      }

      //movie reviews
      case "check-movie-container": {
        const element = iframeDoc.getElementById("movieReviewsContainer");
        return { passed: element !== null };
      }

      case "check-title-input": {
        const element = iframeDoc.getElementById("titleInput");
        return { passed: element !== null && element.tagName === "INPUT" };
      }

      case "check-review-textarea": {
        const element = iframeDoc.getElementById("reviewTextarea");
        return { passed: element !== null && element.tagName === "TEXTAREA" };
      }

      case "check-add-button": {
        const element = iframeDoc.getElementById("addBtn");
        return { passed: element !== null && element.tagName === "BUTTON" };
      }

      case "check-reviews-container": {
        const element = iframeDoc.getElementById("reviewsContainer");
        return { passed: element !== null };
      }

      case "check-add-review": {
        const titleInput = iframeDoc.getElementById("titleInput");
        const reviewInput = iframeDoc.getElementById("reviewTextarea");
        const addBtn = iframeDoc.getElementById("addBtn");
        const reviewsContainer = iframeDoc.getElementById("reviewsContainer");

        titleInput.value = "Inception";
        reviewInput.value = "Great movie!";
        addBtn.click();

        const text = reviewsContainer.textContent;
        const passed =
          text.includes("Movie Title: Inception") &&
          text.includes("Review: Great movie!");

        return { passed, actual: text };
      }

      //Greeting
      case "check-greeting-container": {
        const element = iframeDoc.querySelector(".greeting-card-container");
        return { passed: element !== null };
      }

      case "check-greet-text": {
        const container = iframeDoc.querySelector(".greeting-card-container");
        const greetTextEl = iframeDoc.getElementById("greetText");
        const passed =
          container !== null &&
          greetTextEl !== null &&
          greetTextEl.textContent.trim() ===
            "Wishing that the new year will bring joy, love, peace, and happiness to you.";
        return {
          passed,
          actual: greetTextEl ? greetTextEl.textContent.trim() : null,
        };
      }

      case "check-from-text": {
        const container = iframeDoc.querySelector(".greeting-card-container");
        const fromEl = iframeDoc.getElementById("greetFrom");
        const passed =
          container !== null &&
          fromEl !== null &&
          fromEl.textContent.trim() === "From: Rahul";
        return { passed, actual: fromEl ? fromEl.textContent.trim() : null };
      }

      case "check-to-text": {
        const container = iframeDoc.querySelector(".greeting-card-container");
        const toEl = iframeDoc.getElementById("greetTo");
        const passed =
          container !== null &&
          toEl !== null &&
          toEl.textContent.trim() === "To: Varakumar";
        return { passed, actual: toEl ? toEl.textContent.trim() : null };
      }
      //splice playground
      case "check-start-index-input": {
        const element = iframeDoc.getElementById("startIndexInput");
        return { passed: element !== null };
      }

      case "check-delete-count-input": {
        const element = iframeDoc.getElementById("deleteCountInput");
        return { passed: element !== null };
      }

      case "check-item-to-add-input": {
        const element = iframeDoc.getElementById("itemToAddInput");
        return { passed: element !== null };
      }

      case "check-splice-button": {
        const element = iframeDoc.getElementById("spliceBtn");
        return { passed: element !== null };
      }

      case "check-updated-array": {
        const element = iframeDoc.getElementById("updatedArray");
        return { passed: element !== null };
      }

      case "check-splice-functionality": {
        const startInput = iframeDoc.getElementById("startIndexInput");
        const deleteInput = iframeDoc.getElementById("deleteCountInput");
        const addInput = iframeDoc.getElementById("itemToAddInput");
        const spliceBtn = iframeDoc.getElementById("spliceBtn");
        const updatedArray = iframeDoc.getElementById("updatedArray");

        startInput.value = "1";
        deleteInput.value = "1";
        addInput.value = "99";

        spliceBtn.click();

        const resultText = updatedArray.textContent;
        const passed = resultText.includes("99");

        return { passed, actual: resultText };
      }

      //Find the index of the numbers
      case "check-user-input": {
        const element = iframeDoc.getElementById("userInput");
        return { passed: element !== null };
      }

      case "check-find-button": {
        const element = iframeDoc.getElementById("findBtn");
        return { passed: element !== null };
      }

      case "check-index-span": {
        const element = iframeDoc.getElementById("indexOfNumber");
        return { passed: element !== null };
      }

      case "check-index-present": {
        const inputEl = iframeDoc.getElementById("userInput");
        const buttonEl = iframeDoc.getElementById("findBtn");
        const resultEl = iframeDoc.getElementById("indexOfNumber");

        inputEl.value = "77"; // present in array [17,31,77,20,63]
        buttonEl.click();

        const passed = resultEl.textContent.trim() === "2";
        return { passed, actual: resultEl.textContent.trim() };
      }

      case "check-index-not-present": {
        const inputEl = iframeDoc.getElementById("userInput");
        const buttonEl = iframeDoc.getElementById("findBtn");
        const resultEl = iframeDoc.getElementById("indexOfNumber");

        inputEl.value = "100"; // not in array
        buttonEl.click();

        const passed = resultEl.textContent.trim() === "-1";
        return { passed, actual: resultEl.textContent.trim() };
      }
      //Remove Item in local storage
      case "check-clear-button": {
        const element = iframeDoc.getElementById("clearBtn");
        return { passed: element !== null };
      }

      case "check-input-text": {
        const element = iframeDoc.getElementById("input");
        const passed = element !== null && element.type === "text";
        return { passed };
      }

      case "check-clear-input": {
        const inputEl = iframeDoc.getElementById("input");
        const clearBtn = iframeDoc.getElementById("clearBtn");

        inputEl.value = "Test Value";
        clearBtn.click();

        const passed = inputEl.value === "";
        return { passed, actual: inputEl.value };
      }

      case "check-clear-localstorage": {
        const inputEl = iframeDoc.getElementById("input");
        const clearBtn = iframeDoc.getElementById("clearBtn");

        localStorage.setItem("userInput", "Hello");
        clearBtn.click();

        const passed = localStorage.getItem("userInput") === null;
        return { passed, actual: localStorage.getItem("userInput") };
      }
      //chat bot
      case "check-chat-container": {
        const element = iframeDoc.getElementById("chatContainer");
        return { passed: element !== null };
      }

      case "check-user-input1": {
        const element = iframeDoc.getElementById("userInput");
        return { passed: element !== null };
      }

      case "check-user-message-display": {
        const inputEl = iframeDoc.getElementById("userInput");
        const sendBtn = iframeDoc.getElementById("sendMsgBtn");
        const chatContainer = iframeDoc.getElementById("chatContainer");

        inputEl.value = "Hi";
        sendBtn.click();

        const passed = chatContainer.textContent.includes("Hi");
        return { passed, actual: chatContainer.textContent };
      }

      case "check-user-input-clear": {
        const inputEl = iframeDoc.getElementById("userInput");
        const sendBtn = iframeDoc.getElementById("sendMsgBtn");

        inputEl.value = "Hello";
        sendBtn.click();

        const passed = inputEl.value === "";
        return { passed, actual: inputEl.value };
      }

      case "check-bot-reply": {
        const inputEl = iframeDoc.getElementById("userInput");
        const sendBtn = iframeDoc.getElementById("sendMsgBtn");
        const chatContainer = iframeDoc.getElementById("chatContainer");

        inputEl.value = "hi";
        sendBtn.click();

        const passed = chatContainer.textContent.includes("Hey");
        return { passed, actual: chatContainer.textContent };
      }

      //clear the counter timer
      case "check-text-center-container": {
        const element = iframeDoc.querySelector(".text-center");
        return { passed: element !== null };
      }

      case "check-counter-value": {
        const element = iframeDoc.getElementById("counterValue");
        return { passed: element !== null && element.tagName === "P" };
      }

      case "check-clear-button1": {
        const element = iframeDoc.getElementById("clearBtn");
        return { passed: element !== null && element.tagName === "BUTTON" };
      }

      //custom Range

      case "check-heading1": {
        const element = iframeDoc.querySelector("h1");
        return { passed: element !== null };
      }

      case "check-from-input": {
        const element = iframeDoc.getElementById("fromUserInput");
        return { passed: element !== null };
      }

      case "check-to-input": {
        const element = iframeDoc.getElementById("toUserInput");
        return { passed: element !== null };
      }

      case "check-start-button": {
        const element = iframeDoc.getElementById("startBtn");
        return { passed: element !== null };
      }

      case "check-counter-text": {
        const element = iframeDoc.getElementById("counterText");
        return { passed: element !== null };
      }

      case "check-counter-start-value": {
        const fromInput = iframeDoc.getElementById("fromUserInput");
        const toInput = iframeDoc.getElementById("toUserInput");
        const startBtn = iframeDoc.getElementById("startBtn");
        const counterText = iframeDoc.getElementById("counterText");

        fromInput.value = "3";
        toInput.value = "6";
        startBtn.click();

        const passed = counterText.textContent.trim() === "3";
        return { passed, actual: counterText.textContent.trim() };
      }

      //Theme switcher
      case "check-bg-container": {
        const element = iframeDoc.getElementById("bgContainer");
        return { passed: element !== null };
      }

      case "check-heading2": {
        const element = iframeDoc.getElementById("heading");
        return { passed: element !== null };
      }

      case "check-theme-input": {
        const element = iframeDoc.getElementById("themeUserInput");
        return { passed: element !== null && element.tagName === "INPUT" };
      }

      //HTTP GEt--------------------------------------
      case "check-send-btn": {
        const element = iframeDoc.getElementById("sendGetRequestBtn");
        return { passed: element !== null };
      }

      case "check-request-status": {
        const element = iframeDoc.getElementById("requestStatus");
        return { passed: element !== null && element.tagName === "P" };
      }

      case "check-http-response": {
        const element = iframeDoc.getElementById("httpResponse");
        return { passed: element !== null && element.tagName === "P" };
      }

      case "check-get-response": {
        const statusEl = iframeDoc.getElementById("requestStatus");
        const responseEl = iframeDoc.getElementById("httpResponse");
        const btn = iframeDoc.getElementById("sendGetRequestBtn");

        // Force-fill like fetch success would do
        const fakeResponse = { code: 200, data: [] };

        iframeDoc.defaultView.fetch = function () {
          return {
            then: function (cb) {
              return cb({
                json: function () {
                  return {
                    then: function (cb2) {
                      cb2(fakeResponse);
                    },
                  };
                },
              });
            },
          };
        };

        btn.click();

        const passed =
          statusEl.textContent.trim() === "200" &&
          responseEl.textContent.includes("code");

        return {
          passed,
          actual: statusEl.textContent + " | " + responseEl.textContent,
        };
      }

      //http post--------
      case "check-request-body": {
        const element = iframeDoc.getElementById("requestBody");
        return {
          passed: element !== null && element.tagName === "TEXTAREA",
        };
      }

      case "check-request-status": {
        const element = iframeDoc.getElementById("requestStatus");
        return {
          passed: element !== null && element.tagName === "P",
        };
      }

      case "check-http-response": {
        const element = iframeDoc.getElementById("httpResponse");
        return {
          passed: element !== null && element.tagName === "P",
        };
      }

      case "click-sendPostRequestBtn": {
        const statusEl = iframeDoc.getElementById("requestStatus");
        const responseEl = iframeDoc.getElementById("httpResponse");
        const btn = iframeDoc.getElementById("sendPostRequestBtn");

        // mock fetch (POST success)
        iframeDoc.defaultView.fetch = function () {
          return Promise.resolve({
            json: function () {
              return Promise.resolve({
                code: 201,
                data: {},
              });
            },
          });
        };

        btn.click();

        const passed =
          statusEl.textContent.trim() === "201" &&
          responseEl.textContent.includes("code");

        return {
          passed,
          actual: statusEl.textContent.trim() + " | " + responseEl.textContent,
        };
      }
      //wikipedia search===========================================================
      case "check-search-input": {
        const element = iframeDoc.getElementById("searchInput");
        return {
          passed: element !== null && element.tagName === "INPUT",
        };
      }

      case "check-search-results": {
        const element = iframeDoc.getElementById("searchResults");
        return {
          passed: element !== null,
        };
      }

      case "check-search-functionality": {
        const inputEl = iframeDoc.getElementById("searchInput");
        const resultsEl = iframeDoc.getElementById("searchResults");

        iframeDoc.defaultView.fetch = function () {
          return Promise.resolve({
            json: function () {
              return Promise.resolve({
                search_results: [
                  {
                    title: "India",
                    link: "https://example.com",
                    description: "Country in South Asia",
                  },
                ],
              });
            },
          });
        };

        inputEl.value = "India";

        const event = new iframeDoc.defaultView.KeyboardEvent("keydown", {
          keyCode: 13,
          which: 13,
        });

        inputEl.dispatchEvent(event);

        const anchorEl = resultsEl.querySelector(".result-title");
        const descriptionEl = resultsEl.querySelector(".link-description");

        const passed =
          anchorEl !== null &&
          descriptionEl !== null &&
          anchorEl.textContent === "India" &&
          descriptionEl.textContent === "Country in South Asia";

        return {
          passed,
          actual: resultsEl.innerHTML,
        };
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
