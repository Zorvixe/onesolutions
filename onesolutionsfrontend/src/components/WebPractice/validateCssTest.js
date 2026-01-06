const validateCssTest = (testCase, iframeDoc, iframe) => {
  try {
    const validationType = testCase.input;
    const win = iframe.contentWindow;

    switch (validationType) {
      // ========== BACKGROUND PROPERTIES ==========
      case "check-background-image": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBackgroundImage = false;
        let elementWithBackground = null;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (style.backgroundImage && style.backgroundImage !== "none") {
            hasBackgroundImage = true;
            elementWithBackground = el.tagName;
          }
        });

        return {
          passed: hasBackgroundImage,
          actual: hasBackgroundImage
            ? `Found background image (on ${
                elementWithBackground || "element"
              })`
            : "No background image found",
        };
      }

      case "check-background-color": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBackgroundColor = false;
        let elementWithColor = null;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (
            style.backgroundColor &&
            style.backgroundColor !== "rgba(0, 0, 0, 0)" &&
            style.backgroundColor !== "transparent"
          ) {
            hasBackgroundColor = true;
            elementWithColor = el.tagName;
          }
        });

        return {
          passed: hasBackgroundColor,
          actual: hasBackgroundColor
            ? `Found background color (on ${elementWithColor || "element"})`
            : "No background color found (other than transparent/default)",
        };
      }

      case "check-background-size": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBackgroundSizeCover = false;
        let hasBackgroundSizeContain = false;
        let hasBackgroundSizeCustom = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const bgSize = style.backgroundSize;

          if (bgSize === "cover") {
            hasBackgroundSizeCover = true;
          } else if (bgSize === "contain") {
            hasBackgroundSizeContain = true;
          } else if (
            bgSize &&
            bgSize !== "auto" &&
            bgSize !== "initial" &&
            bgSize !== "inherit"
          ) {
            hasBackgroundSizeCustom = true;
          }
        });

        const hasAnyBackgroundSize =
          hasBackgroundSizeCover ||
          hasBackgroundSizeContain ||
          hasBackgroundSizeCustom;

        return {
          passed: hasAnyBackgroundSize,
          actual: hasAnyBackgroundSize
            ? `Found background-size: ${
                hasBackgroundSizeCover
                  ? "cover"
                  : hasBackgroundSizeContain
                  ? "contain"
                  : "custom value"
              }`
            : "No custom background-size found",
        };
      }

      case "check-background-position": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasCustomBackgroundPosition = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const bgPosition = style.backgroundPosition;

          if (
            bgPosition &&
            !bgPosition.includes("0%") &&
            bgPosition !== "initial" &&
            bgPosition !== "inherit"
          ) {
            hasCustomBackgroundPosition = true;
          }
        });

        return {
          passed: hasCustomBackgroundPosition,
          actual: hasCustomBackgroundPosition
            ? "Found custom background-position"
            : "No custom background-position found",
        };
      }

      // ========== TEXT PROPERTIES ==========
      case "check-text-align-center": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasTextAlignCenter = false;
        let centerElements = [];

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (style.textAlign === "center") {
            hasTextAlignCenter = true;
            centerElements.push(el.tagName.toLowerCase());
          }
        });

        return {
          passed: hasTextAlignCenter,
          actual: hasTextAlignCenter
            ? `Found text-align: center (${centerElements
                .slice(0, 3)
                .join(", ")}${centerElements.length > 3 ? "..." : ""})`
            : "No text-align: center found",
        };
      }

      case "check-text-align-right": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasTextAlignRight = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
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

      case "check-text-align-left": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasTextAlignLeft = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (style.textAlign === "left") {
            hasTextAlignLeft = true;
          }
        });

        return {
          passed: hasTextAlignLeft,
          actual: hasTextAlignLeft
            ? "Found text-align: left"
            : "No text-align: left found (default may be left)",
        };
      }

      case "check-text-decoration": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasTextDecoration = false;
        let decorTypes = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const decoration = style.textDecoration;

          if (
            decoration &&
            decoration !== "none" &&
            decoration !== "initial" &&
            decoration !== "inherit"
          ) {
            hasTextDecoration = true;
            if (decoration.includes("underline")) decorTypes.add("underline");
            if (decoration.includes("overline")) decorTypes.add("overline");
            if (decoration.includes("line-through"))
              decorTypes.add("line-through");
          }
        });

        return {
          passed: hasTextDecoration,
          actual: hasTextDecoration
            ? `Found text-decoration: ${Array.from(decorTypes).join(", ")}`
            : "No text-decoration found (other than none)",
        };
      }

      case "check-font-weight": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBoldText = false;
        let hasCustomWeight = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const weight = style.fontWeight;

          if (weight === "bold" || weight === "700" || weight === "bolder") {
            hasBoldText = true;
          }

          if (
            weight &&
            weight !== "normal" &&
            weight !== "400" &&
            weight !== "initial" &&
            weight !== "inherit"
          ) {
            hasCustomWeight = true;
          }
        });

        return {
          passed: hasBoldText || hasCustomWeight,
          actual: hasBoldText
            ? "Found bold text (font-weight: bold or 700+)"
            : hasCustomWeight
            ? "Found custom font-weight"
            : "No bold or custom font-weight found",
        };
      }

      case "check-font-size": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasCustomFontSize = false;
        let fontSizeValues = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const fontSize = style.fontSize;

          // Check if it's not the default browser size (usually 16px for body)
          if (
            fontSize &&
            fontSize !== "16px" &&
            fontSize !== "medium" &&
            !fontSize.includes("inherit")
          ) {
            hasCustomFontSize = true;
            fontSizeValues.add(fontSize);
          }
        });

        return {
          passed: hasCustomFontSize,
          actual: hasCustomFontSize
            ? `Found custom font sizes: ${Array.from(fontSizeValues)
                .slice(0, 5)
                .join(", ")}${fontSizeValues.size > 5 ? "..." : ""}`
            : "No custom font sizes found (using defaults)",
        };
      }

      case "check-color": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasCustomColor = false;
        let colorValues = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const color = style.color;

          // Common default colors
          const defaultColors = [
            "rgb(0, 0, 0)",
            "rgba(0, 0, 0, 1)",
            "#000000",
            "#000",
            "rgb(255, 255, 255)",
            "rgba(255, 255, 255, 1)",
            "#ffffff",
            "#fff",
            "initial",
            "inherit",
          ];

          if (color && !defaultColors.includes(color.toLowerCase())) {
            hasCustomColor = true;
            colorValues.add(color);
          }
        });

        return {
          passed: hasCustomColor,
          actual: hasCustomColor
            ? `Found custom text colors: ${Array.from(colorValues)
                .slice(0, 3)
                .join(", ")}${colorValues.size > 3 ? "..." : ""}`
            : "No custom text colors found (using defaults)",
        };
      }

      // ========== BORDER PROPERTIES ==========
      case "check-border-radius": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBorderRadius = false;
        let borderRadiusValues = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const radius = style.borderRadius;

          if (
            radius &&
            radius !== "0px" &&
            !radius.includes("0%") &&
            radius !== "initial" &&
            radius !== "inherit"
          ) {
            hasBorderRadius = true;
            borderRadiusValues.add(radius);
          }
        });

        return {
          passed: hasBorderRadius,
          actual: hasBorderRadius
            ? `Found border-radius: ${Array.from(borderRadiusValues).join(
                ", "
              )}`
            : "No border-radius found",
        };
      }

      case "check-border-top-left-radius": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBorderRadius = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (
            style.borderTopLeftRadius &&
            style.borderTopLeftRadius !== "0px" &&
            !style.borderTopLeftRadius.includes("0%")
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
          const style = win.getComputedStyle(el);
          if (
            style.borderTopRightRadius &&
            style.borderTopRightRadius !== "0px" &&
            !style.borderTopRightRadius.includes("0%")
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

      case "check-border-style": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBorderStyle = false;
        let borderStyles = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (
            style.borderStyle &&
            style.borderStyle !== "none" &&
            style.borderStyle !== "hidden" &&
            style.borderStyle !== "initial" &&
            style.borderStyle !== "inherit"
          ) {
            hasBorderStyle = true;
            borderStyles.add(style.borderStyle);
          }
        });

        return {
          passed: hasBorderStyle,
          actual: hasBorderStyle
            ? `Found border styles: ${Array.from(borderStyles).join(", ")}`
            : "No border styles found (other than none/hidden)",
        };
      }

      case "check-border-width": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBorderWidth = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const borderTop = parseFloat(style.borderTopWidth);
          const borderRight = parseFloat(style.borderRightWidth);
          const borderBottom = parseFloat(style.borderBottomWidth);
          const borderLeft = parseFloat(style.borderLeftWidth);
          const borderWidth = parseFloat(style.borderWidth);

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

      case "check-border-color": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBorderColor = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const borderColor = style.borderTopColor;

          // Check if border color is not default/transparent
          if (
            borderColor &&
            borderColor !== "rgba(0, 0, 0, 0)" &&
            borderColor !== "transparent" &&
            borderColor !== "initial" &&
            borderColor !== "inherit"
          ) {
            hasBorderColor = true;
          }
        });

        return {
          passed: hasBorderColor,
          actual: hasBorderColor
            ? "Found custom border color"
            : "No custom border color found",
        };
      }

      // ========== BOX MODEL PROPERTIES ==========
      case "check-padding": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasPadding = false;
        let elementsWithPadding = [];

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const paddingTop = parseFloat(style.paddingTop);
          const paddingRight = parseFloat(style.paddingRight);
          const paddingBottom = parseFloat(style.paddingBottom);
          const paddingLeft = parseFloat(style.paddingLeft);

          if (
            paddingTop > 0 ||
            paddingRight > 0 ||
            paddingBottom > 0 ||
            paddingLeft > 0
          ) {
            hasPadding = true;
            elementsWithPadding.push(el.tagName.toLowerCase());
          }
        });

        return {
          passed: hasPadding,
          actual: hasPadding
            ? `Found padding > 0 (${elementsWithPadding
                .slice(0, 3)
                .join(", ")}${elementsWithPadding.length > 3 ? "..." : ""})`
            : "No padding found",
        };
      }

      case "check-margin": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasMargin = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const marginTop = parseFloat(style.marginTop);
          const marginRight = parseFloat(style.marginRight);
          const marginBottom = parseFloat(style.marginBottom);
          const marginLeft = parseFloat(style.marginLeft);

          if (
            marginTop > 0 ||
            marginRight > 0 ||
            marginBottom > 0 ||
            marginLeft > 0
          ) {
            hasMargin = true;
          }
        });

        return {
          passed: hasMargin,
          actual: hasMargin ? "Found margin > 0" : "No margin found",
        };
      }

      case "check-margin-right": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasMarginRight = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const marginRight = parseFloat(style.marginRight);
          if (marginRight > 0) {
            hasMarginRight = true;
          }
        });

        return {
          passed: hasMarginRight,
          actual: hasMarginRight
            ? "Found margin-right > 0"
            : "No margin-right > 0 found",
        };
      }

      case "check-margin-left": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasMarginLeft = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const marginLeft = parseFloat(style.marginLeft);
          if (marginLeft > 0) {
            hasMarginLeft = true;
          }
        });

        return {
          passed: hasMarginLeft,
          actual: hasMarginLeft
            ? "Found margin-left > 0"
            : "No margin-left > 0 found",
        };
      }

      case "check-margin-top": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasMarginTop = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const marginTop = parseFloat(style.marginTop);
          if (marginTop > 0) {
            hasMarginTop = true;
          }
        });

        return {
          passed: hasMarginTop,
          actual: hasMarginTop
            ? "Found margin-top > 0"
            : "No margin-top > 0 found",
        };
      }

      case "check-margin-bottom": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasMarginBottom = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const marginBottom = parseFloat(style.marginBottom);
          if (marginBottom > 0) {
            hasMarginBottom = true;
          }
        });

        return {
          passed: hasMarginBottom,
          actual: hasMarginBottom
            ? "Found margin-bottom > 0"
            : "No margin-bottom > 0 found",
        };
      }

      // ========== LAYOUT & DISPLAY PROPERTIES ==========
      case "check-display-flex": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasDisplayFlex = false;
        let flexElements = [];

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (style.display === "flex") {
            hasDisplayFlex = true;
            flexElements.push(el.tagName.toLowerCase());
          }
        });

        return {
          passed: hasDisplayFlex,
          actual: hasDisplayFlex
            ? `Found display: flex (${flexElements.slice(0, 3).join(", ")}${
                flexElements.length > 3 ? "..." : ""
              })`
            : "No display: flex found",
        };
      }

      case "check-display-grid": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasDisplayGrid = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (style.display === "grid") {
            hasDisplayGrid = true;
          }
        });

        return {
          passed: hasDisplayGrid,
          actual: hasDisplayGrid
            ? "Found display: grid"
            : "No display: grid found",
        };
      }

      case "check-display-block": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasDisplayBlock = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (style.display === "block") {
            hasDisplayBlock = true;
          }
        });

        return {
          passed: hasDisplayBlock,
          actual: hasDisplayBlock
            ? "Found display: block"
            : "No display: block found (or using default block elements)",
        };
      }

      case "check-display-inline-block": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasDisplayInlineBlock = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (style.display === "inline-block") {
            hasDisplayInlineBlock = true;
          }
        });

        return {
          passed: hasDisplayInlineBlock,
          actual: hasDisplayInlineBlock
            ? "Found display: inline-block"
            : "No display: inline-block found",
        };
      }

      case "check-position": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasPosition = false;
        let positionTypes = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const position = style.position;

          if (
            position &&
            position !== "static" &&
            position !== "initial" &&
            position !== "inherit"
          ) {
            hasPosition = true;
            positionTypes.add(position);
          }
        });

        return {
          passed: hasPosition,
          actual: hasPosition
            ? `Found position: ${Array.from(positionTypes).join(", ")}`
            : "No non-static positioning found",
        };
      }

      // ========== DIMENSIONS ==========
      case "check-width": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasCustomWidth = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const width = style.width;

          if (
            width &&
            width !== "auto" &&
            !width.includes("inherit") &&
            !width.includes("initial")
          ) {
            hasCustomWidth = true;
          }
        });

        return {
          passed: hasCustomWidth,
          actual: hasCustomWidth
            ? "Found custom width values"
            : "No custom width values found (using auto/default)",
        };
      }

      case "check-height": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasCustomHeight = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const height = style.height;

          if (
            height &&
            height !== "auto" &&
            !height.includes("inherit") &&
            !height.includes("initial")
          ) {
            hasCustomHeight = true;
          }
        });

        return {
          passed: hasCustomHeight,
          actual: hasCustomHeight
            ? "Found custom height values"
            : "No custom height values found (using auto/default)",
        };
      }

      case "check-max-width": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasMaxWidth = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (
            style.maxWidth &&
            style.maxWidth !== "none" &&
            !style.maxWidth.includes("inherit") &&
            !style.maxWidth.includes("initial")
          ) {
            hasMaxWidth = true;
          }
        });

        return {
          passed: hasMaxWidth,
          actual: hasMaxWidth
            ? "Found max-width property"
            : "No max-width property found",
        };
      }

      case "check-min-height": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasMinHeight = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (
            style.minHeight &&
            style.minHeight !== "0px" &&
            !style.minHeight.includes("inherit") &&
            !style.minHeight.includes("initial")
          ) {
            hasMinHeight = true;
          }
        });

        return {
          passed: hasMinHeight,
          actual: hasMinHeight
            ? "Found min-height property"
            : "No min-height property found",
        };
      }

      // ========== FLEXBOX PROPERTIES ==========
      case "check-flex-direction": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasFlexDirection = false;
        let flexDirections = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const flexDir = style.flexDirection;

          if (
            flexDir &&
            flexDir !== "row" && // row is default
            flexDir !== "initial" &&
            flexDir !== "inherit"
          ) {
            hasFlexDirection = true;
            flexDirections.add(flexDir);
          }
        });

        return {
          passed: hasFlexDirection,
          actual: hasFlexDirection
            ? `Found custom flex-direction: ${Array.from(flexDirections).join(
                ", "
              )}`
            : "No custom flex-direction found (using default: row)",
        };
      }

      case "check-justify-content": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasJustifyContent = false;
        let justifyValues = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const justify = style.justifyContent;

          if (
            justify &&
            justify !== "normal" &&
            justify !== "initial" &&
            justify !== "inherit"
          ) {
            hasJustifyContent = true;
            justifyValues.add(justify);
          }
        });

        return {
          passed: hasJustifyContent,
          actual: hasJustifyContent
            ? `Found justify-content: ${Array.from(justifyValues).join(", ")}`
            : "No justify-content found (using default)",
        };
      }

      case "check-align-items": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasAlignItems = false;
        let alignValues = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const align = style.alignItems;

          if (
            align &&
            align !== "normal" &&
            align !== "stretch" && // stretch is default
            align !== "initial" &&
            align !== "inherit"
          ) {
            hasAlignItems = true;
            alignValues.add(align);
          }
        });

        return {
          passed: hasAlignItems,
          actual: hasAlignItems
            ? `Found align-items: ${Array.from(alignValues).join(", ")}`
            : "No custom align-items found (using default: stretch)",
        };
      }

      // ========== VISUAL EFFECTS ==========
      case "check-box-shadow": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasBoxShadow = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (
            style.boxShadow &&
            style.boxShadow !== "none" &&
            style.boxShadow !== "initial" &&
            style.boxShadow !== "inherit"
          ) {
            hasBoxShadow = true;
          }
        });

        return {
          passed: hasBoxShadow,
          actual: hasBoxShadow ? "Found box-shadow" : "No box-shadow found",
        };
      }

      case "check-opacity": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasCustomOpacity = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const opacity = parseFloat(style.opacity);

          if (opacity < 1 && opacity >= 0) {
            hasCustomOpacity = true;
          }
        });

        return {
          passed: hasCustomOpacity,
          actual: hasCustomOpacity
            ? "Found custom opacity (< 1)"
            : "No custom opacity found (all elements at 1 opacity)",
        };
      }

      case "check-transition": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasTransition = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (
            style.transition &&
            style.transition !== "none" &&
            style.transition !== "all 0s ease 0s" &&
            style.transition !== "initial" &&
            style.transition !== "inherit"
          ) {
            hasTransition = true;
          }
        });

        return {
          passed: hasTransition,
          actual: hasTransition
            ? "Found CSS transitions"
            : "No CSS transitions found",
        };
      }

      case "check-transform": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasTransform = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (
            style.transform &&
            style.transform !== "none" &&
            style.transform !== "initial" &&
            style.transform !== "inherit"
          ) {
            hasTransform = true;
          }
        });

        return {
          passed: hasTransform,
          actual: hasTransform
            ? "Found CSS transforms"
            : "No CSS transforms found",
        };
      }

      case "check-filter": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasFilter = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (
            style.filter &&
            style.filter !== "none" &&
            style.filter !== "initial" &&
            style.filter !== "inherit"
          ) {
            hasFilter = true;
          }
        });

        return {
          passed: hasFilter,
          actual: hasFilter ? "Found CSS filters" : "No CSS filters found",
        };
      }

      // ========== CUSTOM VALIDATIONS ==========
      case "check-custom-property": {
        const selector = testCase.selector || "*";
        const property = testCase.property;
        const expectedValue = testCase.expectedValue;

        if (!property) {
          return {
            passed: false,
            actual: "No CSS property specified for validation",
          };
        }

        const elements = iframeDoc.querySelectorAll(selector);
        let hasProperty = false;
        let matchingElements = [];

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const value = style[property];

          if (value && value !== "initial" && value !== "inherit") {
            if (expectedValue) {
              if (
                value === expectedValue ||
                (typeof expectedValue === "string" &&
                  value.includes(expectedValue))
              ) {
                hasProperty = true;
                matchingElements.push(el.tagName.toLowerCase());
              }
            } else {
              hasProperty = true;
              matchingElements.push(el.tagName.toLowerCase());
            }
          }
        });

        return {
          passed: hasProperty,
          actual: hasProperty
            ? expectedValue
              ? `Found ${property}: ${expectedValue} (${matchingElements
                  .slice(0, 3)
                  .join(", ")}${matchingElements.length > 3 ? "..." : ""})`
              : `Found ${property} property (${matchingElements
                  .slice(0, 3)
                  .join(", ")}${matchingElements.length > 3 ? "..." : ""})`
            : expectedValue
            ? `No ${property}: ${expectedValue} found`
            : `No ${property} property found`,
        };
      }

      case "check-z-index": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasZIndex = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const zIndex = style.zIndex;

          if (
            zIndex &&
            zIndex !== "auto" &&
            zIndex !== "initial" &&
            zIndex !== "inherit"
          ) {
            hasZIndex = true;
          }
        });

        return {
          passed: hasZIndex,
          actual: hasZIndex
            ? "Found z-index property"
            : "No z-index property found (using auto/default)",
        };
      }

      case "check-overflow": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasOverflow = false;
        let overflowTypes = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const overflow = style.overflow;

          if (
            overflow &&
            overflow !== "visible" && // visible is default
            overflow !== "initial" &&
            overflow !== "inherit"
          ) {
            hasOverflow = true;
            overflowTypes.add(overflow);
          }
        });

        return {
          passed: hasOverflow,
          actual: hasOverflow
            ? `Found overflow: ${Array.from(overflowTypes).join(", ")}`
            : "No custom overflow found (using default: visible)",
        };
      }

      case "check-cursor": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasCustomCursor = false;
        let cursorTypes = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const cursor = style.cursor;

          if (
            cursor &&
            cursor !== "auto" && // auto is default
            cursor !== "initial" &&
            cursor !== "inherit"
          ) {
            hasCustomCursor = true;
            cursorTypes.add(cursor);
          }
        });

        return {
          passed: hasCustomCursor,
          actual: hasCustomCursor
            ? `Found custom cursor: ${Array.from(cursorTypes).join(", ")}`
            : "No custom cursor found (using default: auto)",
        };
      }

      case "check-line-height": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasCustomLineHeight = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const lineHeight = style.lineHeight;

          // Check if it's not the default (usually "normal" or around 1.2)
          if (
            lineHeight &&
            lineHeight !== "normal" &&
            !lineHeight.includes("initial") &&
            !lineHeight.includes("inherit")
          ) {
            // Try to parse as number to check if it's different from default
            const parsed = parseFloat(lineHeight);
            if (parsed && parsed !== 1.2) {
              // 1.2 is typical default
              hasCustomLineHeight = true;
            }
          }
        });

        return {
          passed: hasCustomLineHeight,
          actual: hasCustomLineHeight
            ? "Found custom line-height"
            : "No custom line-height found (using defaults)",
        };
      }

      case "check-font-family": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasCustomFontFamily = false;
        let fontFamilies = new Set();

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          const fontFamily = style.fontFamily;

          // Common default/system fonts to ignore
          const defaultFonts = [
            "serif",
            "sans-serif",
            "monospace",
            "cursive",
            "fantasy",
            "initial",
            "inherit",
            "Arial",
            "Helvetica",
            "Times New Roman",
            "Georgia",
            "Courier New",
            "Verdana",
          ];

          if (fontFamily) {
            // Check if it contains any non-default font
            const hasCustom = !defaultFonts.some((defaultFont) =>
              fontFamily.toLowerCase().includes(defaultFont.toLowerCase())
            );

            if (
              hasCustom &&
              fontFamily.trim() &&
              !fontFamily.includes("initial") &&
              !fontFamily.includes("inherit")
            ) {
              hasCustomFontFamily = true;
              fontFamilies.add(fontFamily.split(",")[0].trim()); // Take first font
            }
          }
        });

        return {
          passed: hasCustomFontFamily,
          actual: hasCustomFontFamily
            ? `Found custom font families: ${Array.from(fontFamilies)
                .slice(0, 3)
                .join(", ")}${fontFamilies.size > 3 ? "..." : ""}`
            : "No custom font families found (using system defaults)",
        };
      }

      case "check-carousel-image-width": {
        const images = iframeDoc.querySelectorAll(
          "#carouselExampleIndicators .carousel-item img"
        );

        let hasFullWidthImage = false;

        images.forEach((img) => {
          const style = win.getComputedStyle(img);
          if (style.width === "100%" || style.maxWidth === "100%") {
            hasFullWidthImage = true;
          }
        });

        return {
          passed: hasFullWidthImage,
          actual: hasFullWidthImage
            ? "Carousel images have width set to 100%"
            : "Carousel images do not have width 100%",
        };
      }
      case "check-carousel-height": {
        const carousel = iframeDoc.getElementById("carouselExampleIndicators");
        if (!carousel) {
          return {
            passed: false,
            actual: "Carousel container not found",
          };
        }

        const style = win.getComputedStyle(carousel);
        const height = style.height;

        const passed =
          height && height !== "auto" && !height.includes("initial");

        return {
          passed,
          actual: passed
            ? `Carousel has custom height: ${height}`
            : "Carousel height not set",
        };
      }

      case "check-roboto-font": {
        const elements = iframeDoc.querySelectorAll("*");
        let hasRoboto = false;

        elements.forEach((el) => {
          const style = win.getComputedStyle(el);
          if (style.fontFamily.toLowerCase().includes("roboto")) {
            hasRoboto = true;
          }
        });

        return {
          passed: hasRoboto,
          actual: hasRoboto
            ? "Roboto font-family applied"
            : "Roboto font-family not applied",
        };
      }

      case "check-embed-responsive-width": {
        const iframe = iframeDoc.querySelector(
          ".embed-responsive iframe, .ratio iframe"
        );

        if (!iframe) {
          return {
            passed: false,
            actual: "Iframe not found",
          };
        }

        const style = win.getComputedStyle(iframe);
        const passed = style.width === "100%" || style.maxWidth === "100%";

        return {
          passed,
          actual: passed
            ? "Iframe has responsive width"
            : "Iframe width is not responsive",
        };
      }

      case "check-text-center": {
        const elements = iframeDoc.querySelectorAll("*");
        let passed = false;

        elements.forEach((el) => {
          if (el.classList.contains("text-center")) {
            passed = true;
          }
          const style = iframeDoc.defaultView.getComputedStyle(el);
          if (style.textAlign === "center") {
            passed = true;
          }
        });

        return {
          passed,
          actual: passed
            ? "Found text-center or text-align: center"
            : "Missing text-center or text-align: center",
        };
      }

      case "check-navbar-bg-color": {
        const nav = iframeDoc.querySelector("nav");
        let passed = false;

        if (nav) {
          const style = iframeDoc.defaultView.getComputedStyle(nav);
          passed = style.backgroundColor === "rgb(12, 5, 33)";
        }

        return {
          passed,
          actual: passed
            ? "Navbar has background-color #0c0521"
            : "Navbar background-color is missing or incorrect",
        };
      }

      case "check-bootstrap-columns": {
        const columns = Array.from(
          iframeDoc.querySelectorAll("[class*='col-']")
        ).filter((el) =>
          el.className.split(" ").some((cls) => cls.startsWith("col-"))
        );

        return {
          passed: columns.length >= 6,
          actual: `Found ${columns.length} bootstrap column element(s)`,
        };
      }

      case "check-inline-styles": {
        const inlineStyled = Array.from(iframeDoc.querySelectorAll("h1")).some(
          (el) => el.hasAttribute("style")
        );

        return {
          passed: inlineStyled,
          actual: inlineStyled
            ? "Inline styles found on h1 element"
            : "No inline styles found",
        };
      }

      case "check-bootstrap-background-utilities": {
        const bgElements = iframeDoc.querySelectorAll("[class*='bg-']");
        return {
          passed: bgElements.length >= 2,
          actual: `Found ${bgElements.length} element(s) with bg-* classes`,
        };
      }

      case "check-margin-utilities": {
        const marginEls = iframeDoc.querySelectorAll(
          "[class*='m-'], [class*='mt-'], [class*='mb-'], [class*='ml-'], [class*='mr-']"
        );
        return {
          passed: marginEls.length >= 3,
          actual: `Found ${marginEls.length} element(s) with margin utilities`,
        };
      }

      case "check-padding-utilities": {
        const paddingEls = iframeDoc.querySelectorAll(
          "[class*='p-'], [class*='pt-'], [class*='pb-'], [class*='pl-'], [class*='pr-']"
        );
        return {
          passed: paddingEls.length >= 3,
          actual: `Found ${paddingEls.length} element(s) with padding utilities`,
        };
      }

      case "check-background-utilities": {
        const bgEls = iframeDoc.querySelectorAll("[class*='bg-']");
        return {
          passed: bgEls.length >= 5,
          actual: `Found ${bgEls.length} element(s) with bg-* classes`,
        };
      }
      case "check-text-utilities": {
        const textEls = iframeDoc.querySelectorAll(".text-white, .text-right");
        return {
          passed: textEls.length >= 2,
          actual: `Found ${textEls.length} element(s) with text utilities`,
        };
      }

      case "check-span-text-colors": {
        const validClasses = [
          "text-info",
          "text-success",
          "text-warning",
          "text-dark",
        ];

        const spans = Array.from(iframeDoc.querySelectorAll("span"));
        const matched = spans.filter((span) =>
          validClasses.some((cls) => span.classList.contains(cls))
        );

        return {
          passed: matched.length === 4,
          actual: `Found ${matched.length} span(s) with text color utilities`,
        };
      }

      case "check-linear-gradient": {
        const containers = iframeDoc.querySelectorAll("body > div");

        const passed = [...containers].every((div) => {
          const bgImage = getComputedStyle(div).backgroundImage;
          return bgImage && bgImage.includes("linear-gradient");
        });

        return {
          passed,
          actual: passed
            ? "Linear gradient applied to all containers"
            : "Missing linear gradient in one or more containers",
        };
      }

      case "check-gradient-directions": {
        const containers = [...iframeDoc.querySelectorAll("body > div")];
      
        const directions = containers.map(div =>
          getComputedStyle(div).backgroundImage
        );
      
        const uniqueDirections = new Set(
          directions.filter(bg => bg && bg !== "none")
        );
      
        return {
          passed: uniqueDirections.size > 1,
          actual: `Found ${uniqueDirections.size} unique gradient styles`
        };
      }
      

      case "check-radial-gradient": {
        const containers = [...iframeDoc.querySelectorAll("body > div")];
      
        const passed = containers.every(div => {
          const bgImage = getComputedStyle(div).backgroundImage;
          return bgImage && bgImage.includes("radial-gradient");
        });
      
        return {
          passed,
          actual: passed
            ? "Radial gradient applied to all containers"
            : "Missing radial gradient in one or more containers"
        };
      }
      

      case "check-fixed-bottom": {
        const secondBox = iframeDoc.querySelector(".box-2");

        const passed =
          secondBox && secondBox.classList.contains("fixed-bottom");

        return {
          passed,
          actual: passed
            ? "fixed-bottom class found on second container"
            : "fixed-bottom class missing on second container",
        };
      }

      default:
        return {
          passed: false,
          actual: `Unknown CSS test type: ${validationType}`,
        };
    }
  } catch (error) {
    console.error("[CSS Validation Error]:", error);
    return {
      passed: false,
      actual: `Validation Error: ${error.message}`,
    };
  }
};

export default validateCssTest;
