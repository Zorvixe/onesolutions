const validateHtmlTest = (testCase, iframeDoc, iframe) => {
  const hasExactGrid = (iframeDoc, classList) => {
    // Find elements that could be bootstrap columns
    const candidates = iframeDoc.querySelectorAll("[class*='col-']");

    return Array.from(candidates).some((el) =>
      classList.every((cls) => el.classList.contains(cls))
    );
  };

  try {
    const validationType = testCase.input;

    switch (validationType) {
      // ========== ELEMENT CONTAINER VALIDATIONS ==========
      case "check-heading-container": {
        const containers = iframeDoc.querySelectorAll(
          "div, section, main, article, header, footer, nav, form"
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
          actual: hasHeadingInContainer
            ? "Found heading in container"
            : "No heading found in container",
        };
      }

      case "check-image-container": {
        const containers = iframeDoc.querySelectorAll(
          "div, section, main, article, header, footer, nav, form"
        );
        let hasImageInContainer = false;
        containers.forEach((container) => {
          const images = container.querySelectorAll("img");
          if (images.length > 0) {
            hasImageInContainer = true;
          }
        });
        return {
          passed: hasImageInContainer,
          actual: hasImageInContainer
            ? "Found image in container"
            : "No image found in container",
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

      // ========== BOOTSTRAP FLEX CLASS VALIDATIONS ==========
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

      case "check-flex-row": {
        const flexRowElements = iframeDoc.querySelectorAll(".flex-row");
        const hasFlexRowClass = flexRowElements.length > 0;
        return {
          passed: hasFlexRowClass,
          actual: hasFlexRowClass
            ? `Found ${flexRowElements.length} element(s) with class flex-row`
            : "No element with class flex-row found",
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
            ? `Found ${justifyEndElements.length} element(s) with class justify-content-end`
            : "No element with class justify-content-end found",
        };
      }

      // ========== BOOTSTRAP ALIGNMENT VALIDATIONS ==========
      case "check-align-items-center": {
        const alignCenterElements = iframeDoc.querySelectorAll(
          ".align-items-center"
        );
        const hasAlignCenterClass = alignCenterElements.length > 0;
        return {
          passed: hasAlignCenterClass,
          actual: hasAlignCenterClass
            ? `Found ${alignCenterElements.length} element(s) with class align-items-center`
            : "No element with class align-items-center found",
        };
      }

      case "check-align-items-start": {
        const alignStartElements =
          iframeDoc.querySelectorAll(".align-items-start");
        const hasAlignStartClass = alignStartElements.length > 0;
        return {
          passed: hasAlignStartClass,
          actual: hasAlignStartClass
            ? `Found ${alignStartElements.length} element(s) with class align-items-start`
            : "No element with class align-items-start found",
        };
      }

      case "check-align-items-end": {
        const alignEndElements = iframeDoc.querySelectorAll(".align-items-end");
        const hasAlignEndClass = alignEndElements.length > 0;
        return {
          passed: hasAlignEndClass,
          actual: hasAlignEndClass
            ? `Found ${alignEndElements.length} element(s) with class align-items-end`
            : "No element with class align-items-end found",
        };
      }

      // ========== BOOTSTRAP SPACING VALIDATIONS ==========
      case "check-margin-classes": {
        const marginElements = iframeDoc.querySelectorAll(
          "[class*='m-'], [class*='mt-'], [class*='mb-'], [class*='ms-'], [class*='me-'], [class*='mx-'], [class*='my-']"
        );
        const hasMarginClass = marginElements.length > 0;
        return {
          passed: hasMarginClass,
          actual: hasMarginClass
            ? `Found ${marginElements.length} element(s) with margin classes`
            : "No elements with margin classes found",
        };
      }

      case "check-padding-classes": {
        const paddingElements = iframeDoc.querySelectorAll(
          "[class*='p-'], [class*='pt-'], [class*='pb-'], [class*='ps-'], [class*='pe-'], [class*='px-'], [class*='py-']"
        );
        const hasPaddingClass = paddingElements.length > 0;
        return {
          passed: hasPaddingClass,
          actual: hasPaddingClass
            ? `Found ${paddingElements.length} element(s) with padding classes`
            : "No elements with padding classes found",
        };
      }

      // ========== BOOTSTRAP GRID VALIDATIONS ==========

      case "check-col-12-sm-8-md-6-lg-7-xl-3": {
        const passed = hasExactGrid(iframeDoc, [
          "col-12",
          "col-sm-8",
          "col-md-6",
          "col-lg-7",
          "col-xl-3",
        ]);

        return {
          passed,
          actual: passed
            ? "Found grid: col-12 col-sm-8 col-md-6 col-lg-7 col-xl-3"
            : "Missing grid: col-12 col-sm-8 col-md-6 col-lg-7 col-xl-3",
        };
      }
      case "check-col-12-sm-4-md-6-lg-2-xl-5": {
        const passed = hasExactGrid(iframeDoc, [
          "col-12",
          "col-sm-4",
          "col-md-6",
          "col-lg-2",
          "col-xl-5",
        ]);

        return {
          passed,
          actual: passed
            ? "Found grid: col-12 col-sm-4 col-md-6 col-lg-2 col-xl-5"
            : "Missing grid: col-12 col-sm-4 col-md-6 col-lg-2 col-xl-5",
        };
      }
      case "check-col-12-sm-4-md-2-lg-3-xl-2": {
        const passed = hasExactGrid(iframeDoc, [
          "col-12",
          "col-sm-4",
          "col-md-2",
          "col-lg-3",
          "col-xl-2",
        ]);

        return {
          passed,
          actual: passed
            ? "Found grid: col-12 col-sm-4 col-md-2 col-lg-3 col-xl-2"
            : "Missing grid: col-12 col-sm-4 col-md-2 col-lg-3 col-xl-2",
        };
      }
      case "check-col-12-sm-6-md-2-lg-2-xl-7": {
        const passed = hasExactGrid(iframeDoc, [
          "col-12",
          "col-sm-6",
          "col-md-2",
          "col-lg-2",
          "col-xl-7",
        ]);

        return {
          passed,
          actual: passed
            ? "Found grid: col-12 col-sm-6 col-md-2 col-lg-2 col-xl-7"
            : "Missing grid: col-12 col-sm-6 col-md-2 col-lg-2 col-xl-7",
        };
      }

      case "check-container-class": {
        const containerElements = iframeDoc.querySelectorAll(
          ".container, .container-fluid"
        );
        const hasContainerClass = containerElements.length > 0;
        return {
          passed: hasContainerClass,
          actual: hasContainerClass
            ? `Found ${containerElements.length} container element(s)`
            : "No container element found",
        };
      }

      case "check-row-class": {
        const rowElements = iframeDoc.querySelectorAll(".row");
        const hasRowClass = rowElements.length > 0;
        return {
          passed: hasRowClass,
          actual: hasRowClass
            ? `Found ${rowElements.length} row element(s)`
            : "No row element found",
        };
      }

      case "check-single-row-class": {
        const rowElements = iframeDoc.querySelectorAll(".row");
        const passed = rowElements.length === 1;

        return {
          passed,
          actual: passed
            ? "Exactly one row element found"
            : `Expected exactly 1 row, found ${rowElements.length}`,
        };
      }

      case "check-col-classes": {
        const colElements = iframeDoc.querySelectorAll("[class*='col-']");
        const hasColClass = colElements.length > 0;
        return {
          passed: hasColClass,
          actual: hasColClass
            ? `Found ${colElements.length} column element(s)`
            : "No column elements found",
        };
      }

      // ========== HTML STRUCTURE VALIDATIONS ==========
      case "check-html-structure": {
        const html = iframeDoc.querySelector("html");
        const head = iframeDoc.querySelector("head");
        const body = iframeDoc.querySelector("body");
        const title = iframeDoc.querySelector("title");
        const metaViewport = iframeDoc.querySelector("meta[name='viewport']");

        const hasValidStructure = html && head && body;
        const details = [];

        if (!html) details.push("Missing <html> tag");
        if (!head) details.push("Missing <head> tag");
        if (!body) details.push("Missing <body> tag");
        if (!title) details.push("Missing <title> tag");
        if (!metaViewport) details.push("Missing viewport meta tag");

        return {
          passed: hasValidStructure,
          actual: hasValidStructure
            ? "Valid HTML structure with all required tags"
            : `Structure issues: ${details.join(", ")}`,
        };
      }

      case "check-semantic-elements": {
        const semanticElements = iframeDoc.querySelectorAll(
          "header, footer, nav, main, article, section, aside, figure, figcaption, time, mark, summary, details"
        );
        const hasSemanticElements = semanticElements.length > 0;
        return {
          passed: hasSemanticElements,
          actual: hasSemanticElements
            ? `Found ${semanticElements.length} semantic HTML element(s)`
            : "No semantic HTML elements found",
        };
      }

      // ========== FORM VALIDATIONS ==========
      case "check-form-elements": {
        const formElements = iframeDoc.querySelectorAll("form");
        const inputElements = iframeDoc.querySelectorAll(
          "input, textarea, select"
        );
        const hasForms = formElements.length > 0;
        const hasInputs = inputElements.length > 0;

        return {
          passed: hasForms || hasInputs,
          actual: hasForms
            ? `Found ${formElements.length} form(s) with ${inputElements.length} input element(s)`
            : hasInputs
            ? `Found ${inputElements.length} input element(s) without form`
            : "No form or input elements found",
        };
      }

      case "check-button-types": {
        const buttons = iframeDoc.querySelectorAll(
          "button, input[type='submit'], input[type='button'], input[type='reset']"
        );
        const submitButtons = iframeDoc.querySelectorAll(
          "button[type='submit'], input[type='submit']"
        );

        return {
          passed: buttons.length > 0,
          actual:
            buttons.length > 0
              ? `Found ${buttons.length} button(s) (${submitButtons.length} submit buttons)`
              : "No buttons found",
        };
      }

      // ========== LINK AND NAVIGATION VALIDATIONS ==========
      case "check-links": {
        const links = iframeDoc.querySelectorAll("a[href]");
        const internalLinks = iframeDoc.querySelectorAll(
          "a[href^='#'], a[href^='/'], a[href^='./'], a[href^='../']"
        );
        const externalLinks = iframeDoc.querySelectorAll(
          "a[href^='http://'], a[href^='https://']"
        );

        const hasLinks = links.length > 0;

        return {
          passed: hasLinks,
          actual: hasLinks
            ? `Found ${links.length} link(s) (${internalLinks.length} internal, ${externalLinks.length} external)`
            : "No links found",
        };
      }

      case "check-navigation": {
        const navElements = iframeDoc.querySelectorAll("nav");
        const navLinks = iframeDoc.querySelectorAll("nav a");
        const hasNavigation = navElements.length > 0 && navLinks.length > 0;

        return {
          passed: hasNavigation,
          actual: hasNavigation
            ? `Found ${navElements.length} nav element(s) with ${navLinks.length} links`
            : navElements.length > 0
            ? "Found nav element but no links inside"
            : "No navigation elements found",
        };
      }

      // ========== MEDIA VALIDATIONS ==========
      case "check-media-elements": {
        const images = iframeDoc.querySelectorAll("img");
        const videos = iframeDoc.querySelectorAll("video");
        const audios = iframeDoc.querySelectorAll("audio");
        const iframes = iframeDoc.querySelectorAll("iframe");

        const totalMedia =
          images.length + videos.length + audios.length + iframes.length;

        return {
          passed: totalMedia > 0,
          actual:
            totalMedia > 0
              ? `Found media elements: ${images.length} image(s), ${videos.length} video(s), ${audios.length} audio(s), ${iframes.length} iframe(s)`
              : "No media elements found",
        };
      }

      case "check-image-alt": {
        const images = iframeDoc.querySelectorAll("img");
        const imagesWithAlt = iframeDoc.querySelectorAll("img[alt]");
        const imagesWithoutAlt = images.length - imagesWithAlt.length;

        const allImagesHaveAlt =
          images.length > 0 && images.length === imagesWithAlt.length;

        return {
          passed: allImagesHaveAlt,
          actual:
            images.length > 0
              ? `${imagesWithAlt.length}/${images.length} images have alt text (${imagesWithoutAlt} missing alt)`
              : "No images found",
        };
      }

      // ========== ACCESSIBILITY VALIDATIONS ==========
      case "check-accessibility": {
        const elementsWithAria = iframeDoc.querySelectorAll(
          "[aria-label], [aria-labelledby], [aria-describedby], [role]"
        );
        const hasAriaAttributes = elementsWithAria.length > 0;

        return {
          passed: hasAriaAttributes,
          actual: hasAriaAttributes
            ? `Found ${elementsWithAria.length} element(s) with ARIA attributes`
            : "No ARIA attributes found",
        };
      }

      case "check-landmarks": {
        const landmarks = iframeDoc.querySelectorAll(
          "[role='banner'], [role='main'], [role='complementary'], [role='contentinfo'], " +
            "[role='navigation'], [role='search'], [role='form'], header, footer, main, aside, nav"
        );
        const hasLandmarks = landmarks.length > 0;

        return {
          passed: hasLandmarks,
          actual: hasLandmarks
            ? `Found ${landmarks.length} landmark element(s)`
            : "No landmark elements found",
        };
      }

      // ========== RESPONSIVE DESIGN VALIDATIONS ==========
      case "check-responsive": {
        const responsiveElements = iframeDoc.querySelectorAll(
          ".container, .container-fluid, [class*='col-'], .img-fluid, .img-responsive"
        );
        const hasResponsiveElements = responsiveElements.length > 0;

        return {
          passed: hasResponsiveElements,
          actual: hasResponsiveElements
            ? `Found ${responsiveElements.length} responsive element(s)`
            : "No responsive design elements found",
        };
      }

      // ========== SPECIFIC ELEMENT COUNT VALIDATIONS ==========
      case "check-element-count": {
        const elementType = testCase.elementType || "div";
        const minCount = testCase.minCount || 1;
        const elements = iframeDoc.querySelectorAll(elementType);
        const hasEnoughElements = elements.length >= minCount;

        return {
          passed: hasEnoughElements,
          actual: hasEnoughElements
            ? `Found ${elements.length} ${elementType} element(s) (minimum required: ${minCount})`
            : `Found only ${elements.length} ${elementType} element(s) (minimum required: ${minCount})`,
        };
      }

      case "check-class-presence": {
        const className = testCase.className || "";
        if (!className) {
          return {
            passed: false,
            actual: "No class name provided for validation",
          };
        }

        const elements = iframeDoc.querySelectorAll(`.${className}`);
        const hasClass = elements.length > 0;

        return {
          passed: hasClass,
          actual: hasClass
            ? `Found ${elements.length} element(s) with class "${className}"`
            : `No elements with class "${className}" found`,
        };
      }

      case "check-id-presence": {
        const elementId = testCase.elementId || "";
        if (!elementId) {
          return {
            passed: false,
            actual: "No element ID provided for validation",
          };
        }

        const element = iframeDoc.getElementById(elementId);
        const hasElement = element !== null;

        return {
          passed: hasElement,
          actual: hasElement
            ? `Found element with ID "${elementId}"`
            : `No element with ID "${elementId}" found`,
        };
      }

      // ========== CUSTOM VALIDATION ==========
      case "custom-validation": {
        const selector = testCase.selector || "";
        const attribute = testCase.attribute || "";
        const expectedValue = testCase.expectedValue || "";

        if (!selector) {
          return {
            passed: false,
            actual: "No selector provided for custom validation",
          };
        }

        const elements = iframeDoc.querySelectorAll(selector);

        if (elements.length === 0) {
          return {
            passed: false,
            actual: `No elements found with selector "${selector}"`,
          };
        }

        if (attribute && expectedValue) {
          const matchingElements = Array.from(elements).filter(
            (el) => el.getAttribute(attribute) === expectedValue
          );
          const hasMatch = matchingElements.length > 0;

          return {
            passed: hasMatch,
            actual: hasMatch
              ? `Found ${matchingElements.length} element(s) with ${attribute}="${expectedValue}"`
              : `No elements with ${attribute}="${expectedValue}" found`,
          };
        }

        return {
          passed: true,
          actual: `Found ${elements.length} element(s) with selector "${selector}"`,
        };
      }

      case "check-section-prefix": {
        // Select ANY element whose id starts with 'section'
        const allSectionIdElements =
          iframeDoc.querySelectorAll("[id^='section']");

        if (allSectionIdElements.length < 2) {
          return {
            passed: false,
            actual: `Found only ${allSectionIdElements.length} element(s) with id starting with 'section'. Need at least 2.`,
          };
        }

        return {
          passed: true,
          actual: `Found ${allSectionIdElements.length} element(s) with id prefix 'section'.`,
        };
      }

      case "check-carousel-container": {
        const carousel = iframeDoc.getElementById("carouselExampleSlidesOnly");

        const passed =
          carousel &&
          carousel.classList.contains("carousel") &&
          carousel.classList.contains("slide");

        return {
          passed,
          actual: passed
            ? "Found carousel container with id carouselExampleSlidesOnly and required classes"
            : "Carousel container with id carouselExampleSlidesOnly and classes carousel slide not found",
        };
      }
      case "check-carousel-container-indicators": {
        const carousel = iframeDoc.getElementById("carouselExampleIndicators");

        const passed =
          carousel &&
          carousel.classList.contains("carousel") &&
          carousel.classList.contains("slide");

        return {
          passed,
          actual: passed
            ? "Found carousel container with id carouselExampleIndicators and required classes"
            : "Carousel container with id carouselExampleIndicators and classes carousel slide not found",
        };
      }
      case "check-carousel-indicators": {
        const carousel = iframeDoc.getElementById("carouselExampleIndicators");
        if (!carousel) {
          return {
            passed: false,
            actual: "Carousel container not found",
          };
        }

        const indicators = carousel.querySelector(".carousel-indicators");
        const buttons = indicators ? indicators.querySelectorAll("button") : [];

        const passed = buttons.length >= 3;

        return {
          passed,
          actual: passed
            ? `Found ${buttons.length} carousel indicator buttons`
            : "Carousel indicators with minimum 3 buttons not found",
        };
      }

      case "check-carousel-items": {
        const carousel = iframeDoc.getElementById("carouselExampleIndicators");
        if (!carousel) {
          return {
            passed: false,
            actual: "Carousel container not found",
          };
        }

        const items = carousel.querySelectorAll(".carousel-item");
        const passed = items.length >= 3;

        return {
          passed,
          actual: passed
            ? `Found ${items.length} carousel-item elements`
            : "Minimum 3 carousel-item elements not found",
        };
      }

      case "check-active-carousel-item": {
        const activeItems = iframeDoc.querySelectorAll(
          "#carouselExampleIndicators .carousel-item.active"
        );

        const passed = activeItems.length === 1;

        return {
          passed,
          actual: passed
            ? "Exactly one active carousel-item found"
            : `Expected 1 active carousel-item, found ${activeItems.length}`,
        };
      }

      case "check-carousel-images": {
        const images = iframeDoc.querySelectorAll(
          "#carouselExampleIndicators .carousel-item img"
        );

        const passed = images.length >= 3;

        return {
          passed,
          actual: passed
            ? `Found ${images.length} images inside carousel items`
            : "Carousel items with images not found",
        };
      }

      case "check-embed-container": {
        const embedContainer = iframeDoc.querySelector(
          ".embed-responsive, .ratio"
        );

        const passed = !!embedContainer;

        return {
          passed,
          actual: passed
            ? "Embed container found with Bootstrap embed class"
            : "Bootstrap embed container not found",
        };
      }
      case "check-embed-iframe": {
        const iframe = iframeDoc.querySelector(
          ".embed-responsive iframe, .ratio iframe"
        );

        const passed = !!iframe;

        return {
          passed,
          actual: passed
            ? "Iframe element found inside embed container"
            : "Iframe element not found inside embed container",
        };
      }

      case "check-display-function-usage": {
        const buttons = iframeDoc.querySelectorAll("button[onclick]");
        let isDisplayUsed = false;

        buttons.forEach((button) => {
          const onclickValue = button.getAttribute("onclick");
          if (
            onclickValue &&
            onclickValue.includes("display(") &&
            onclickValue.includes("section-")
          ) {
            isDisplayUsed = true;
          }
        });

        return {
          passed: isDisplayUsed,
          actual: isDisplayUsed
            ? "display() function is used with section id in onclick attribute"
            : "display() function with section id not used in onclick attribute",
        };
      }

      case "check-data-section-and-default": {
        const sectionElements = iframeDoc.querySelectorAll("[data-section]");
        const defaultSection = iframeDoc.querySelector(
          "[data-section][data-default]"
        );

        const hasDataSection = sectionElements.length >= 2;
        const hasDataDefault = !!defaultSection;

        const passed = hasDataSection && hasDataDefault;

        return {
          passed,
          actual: passed
            ? `Found ${sectionElements.length} data-section elements and one default section`
            : !hasDataSection
            ? "No sufficient elements found with data-section attribute"
            : "No element found with both data-section and data-default attributes",
        };
      }
      case "check-complete-section-validation": {
        // Get all elements with data-section
        const sectionElements = iframeDoc.querySelectorAll("[data-section]");

        // Get element with data-default
        const defaultSection = iframeDoc.querySelector(
          "[data-section][data-default]"
        );

        // Get all elements that should be sections (by ID pattern)
        const allExpectedSections = iframeDoc.querySelectorAll(
          '[id^="section"], [id$="-page"], [id$="-details"], .page-section'
        );

        const results = {
          totalDataSections: sectionElements.length,
          hasDefaultSection: !!defaultSection,
          sectionsWithDataSection: [],
          sectionsWithoutDataSection: [],
          defaultSectionId: defaultSection ? defaultSection.id : "none",
        };

        // Check which expected sections have data-section
        allExpectedSections.forEach((section) => {
          if (section.hasAttribute("data-section")) {
            results.sectionsWithDataSection.push(section.id || "unnamed");
          } else {
            results.sectionsWithoutDataSection.push(section.id || "unnamed");
          }
        });

        // Determine if passed
        const passed =
          sectionElements.length >= 2 &&
          results.hasDefaultSection &&
          results.sectionsWithoutDataSection.length === 0;

        return {
          passed,
          actual: passed
            ? `✓ Found ${results.totalDataSections} data-section elements
             ✓ Default section: ${results.defaultSectionId}
             ✓ All ${results.sectionsWithDataSection.length} sections have data-section`
            : `✗ Issues found:
             - Total data-section elements: ${
               results.totalDataSections
             } (need at least 2)
             - Has default section: ${results.hasDefaultSection ? "Yes" : "No"}
             - Sections missing data-section: ${
               results.sectionsWithoutDataSection.length > 0
                 ? results.sectionsWithoutDataSection.join(", ")
                 : "None"
             }
             - Default section ID: ${results.defaultSectionId}`,
        };
      }

      // ========== RESPONSIVE ZORFOOD NAVBAR VALIDATIONS ==========

      case "check-navbar-dark": {
        const navElements = iframeDoc.querySelectorAll("nav.navbar-dark");
        const passed = navElements.length > 0;

        return {
          passed,
          actual: passed
            ? "Found nav element with class navbar-dark"
            : "Missing nav element with class navbar-dark",
        };
      }

      case "check-navbar-bg-dark": {
        const navElements = iframeDoc.querySelectorAll("nav.bg-dark");
        const passed = navElements.length > 0;

        return {
          passed,
          actual: passed
            ? "Found nav element with class bg-dark"
            : "Missing nav element with class bg-dark",
        };
      }

      case "check-ml-auto-or-margin-left-auto": {
        const elements = iframeDoc.querySelectorAll("*");
        let passed = false;

        elements.forEach((el) => {
          if (el.classList.contains("ml-auto")) {
            passed = true;
          }

          const style = iframeDoc.defaultView.getComputedStyle(el);
          if (style.marginLeft === "auto") {
            passed = true;
          }
        });

        return {
          passed,
          actual: passed
            ? "Found ml-auto class or margin-left: auto"
            : "Missing ml-auto class or margin-left: auto",
        };
      }

      case "check-zorfood-logo-src": {
        const logoUrl =
          "https://res.cloudinary.com/djhuqjvrl/image/upload/v1766383242/zorfood_logo_dgixy7.png";

        const imgElements = iframeDoc.querySelectorAll("img");
        let passed = false;

        imgElements.forEach((img) => {
          if (img.getAttribute("src") === logoUrl) {
            passed = true;
          }
        });

        return {
          passed,
          actual: passed
            ? "Found image with ZORFOOD logo URL"
            : "Missing image with ZORFOOD logo URL",
        };
      }

      // ========== SPECIFICITY PRACTICE VALIDATIONS ==========

      case "check-designation-details-container": {
        const elements = iframeDoc.querySelectorAll(
          ".designation-details-container"
        );
        const passed = elements.length > 0;

        return {
          passed,
          actual: passed
            ? "Found element with class designation-details-container"
            : "Missing element with class designation-details-container",
        };
      }

      case "check-designation-details-paragraph": {
        const elements = iframeDoc.querySelectorAll("p.designation-details");
        const passed = elements.length > 0;

        return {
          passed,
          actual: passed
            ? "Found paragraph with class designation-details"
            : "Missing paragraph with class designation-details",
        };
      }

      case "check-contact-info-paragraph": {
        const elements = iframeDoc.querySelectorAll("p.contact-info");
        const passed = elements.length > 0;

        return {
          passed,
          actual: passed
            ? "Found paragraph with class contact-info"
            : "Missing paragraph with class contact-info",
        };
      }

      // ========== SPECIFICITY PRACTICE-2 VALIDATIONS ==========

      case "check-unordered-list": {
        const ulElements = iframeDoc.querySelectorAll("ul");
        const passed = ulElements.length > 0;

        return {
          passed,
          actual: passed
            ? "Found unordered list element"
            : "Missing unordered list element",
        };
      }

      case "check-today-heading-id": {
        const heading = iframeDoc.querySelector("#todayHeading");
        const passed =
          heading !== null && heading.tagName.toLowerCase() === "h1";

        return {
          passed,
          actual: passed
            ? "Found single h1 element with id todayHeading"
            : "Missing h1 element with id todayHeading",
        };
      }

      case "check-completed-list-items": {
        const completedItems = iframeDoc.querySelectorAll("li.completed");
        const passed = completedItems.length === 2;

        return {
          passed,
          actual: passed
            ? "Found exactly two list items with class completed"
            : `Expected 2 list items with class completed, found ${completedItems.length}`,
        };
      }

      // ========== CUSTOM NAVBAR VALIDATIONS ==========

      case "check-navbar-bg-info": {
        const nav = iframeDoc.querySelector("nav.bg-info");
        const passed = !!nav;

        return {
          passed,
          actual: passed
            ? "Found nav element with class bg-info"
            : "Missing nav element with class bg-info",
        };
      }

      case "check-m-auto-or-margin-auto": {
        const elements = iframeDoc.querySelectorAll("*");
        let passed = false;

        elements.forEach((el) => {
          if (el.classList.contains("m-auto")) {
            passed = true;
          }

          const style = iframeDoc.defaultView.getComputedStyle(el);
          if (style.margin === "auto" || style.marginLeft === "auto") {
            passed = true;
          }
        });

        return {
          passed,
          actual: passed
            ? "Found m-auto class or margin: auto"
            : "Missing m-auto class or margin: auto",
        };
      }

      case "check-anchor-border-style": {
        const anchors = iframeDoc.querySelectorAll("a");
        let passed = false;

        anchors.forEach((a) => {
          const style = iframeDoc.defaultView.getComputedStyle(a);
          if (style.borderStyle && style.borderStyle !== "none") {
            passed = true;
          }
        });

        return {
          passed,
          actual: passed
            ? "Found anchor element with border-style applied"
            : "Missing anchor element with border-style",
        };
      }

      // ========== SPECIFICITY PRACTICE-3 VALIDATIONS ==========

      case "check-two-blue-bg-paragraphs": {
        const paragraphs = iframeDoc.querySelectorAll("p.blue-bg");
        const passed = paragraphs.length === 2;

        return {
          passed,
          actual: passed
            ? "Found exactly two paragraphs with class blue-bg"
            : `Expected 2 paragraphs with class blue-bg, found ${paragraphs.length}`,
        };
      }

      case "check-dodgerblue-bg": {
        const paragraphs = iframeDoc.querySelectorAll("p.blue-bg");
        let passed = false;

        paragraphs.forEach((p) => {
          const style = iframeDoc.defaultView.getComputedStyle(p);
          if (style.backgroundColor === "rgb(30, 144, 255)") {
            passed = true;
          }
        });

        return {
          passed,
          actual: passed
            ? "Found paragraph with background-color dodgerblue"
            : "Missing paragraph with background-color dodgerblue",
        };
      }

      case "check-orange-bg-class": {
        const paragraph = iframeDoc.querySelector("p.orange-bg");
        const passed = !!paragraph;

        return {
          passed,
          actual: passed
            ? "Found paragraph with class orange-bg"
            : "Missing paragraph with class orange-bg",
        };
      }

      case "check-orange-bg-color": {
        const paragraph = iframeDoc.querySelector("p.orange-bg");
        let passed = false;

        if (paragraph) {
          const style = iframeDoc.defaultView.getComputedStyle(paragraph);
          if (style.backgroundColor === "rgb(255, 165, 0)") {
            passed = true;
          }
        }

        return {
          passed,
          actual: passed
            ? "Found paragraph with background-color orange"
            : "Missing paragraph with background-color orange",
        };
      }

      case "check-col-md-class": {
        const allElements = iframeDoc.querySelectorAll("*");

        const colMdElements = Array.from(allElements).filter((el) =>
          Array.from(el.classList).some((className) =>
            className.startsWith("col-md-")
          )
        );

        const hasColMdClass = colMdElements.length > 0;

        return {
          passed: hasColMdClass,
          actual: hasColMdClass
            ? `Found ${colMdElements.length} element(s) with col-md-* class`
            : "No element found with col-md-* class",
        };
      }

      case "check-d-md-class": {
        const allElements = iframeDoc.querySelectorAll("*");

        const dMdElements = Array.from(allElements).filter((el) =>
          Array.from(el.classList).some((cls) => cls.startsWith("d-md-"))
        );

        const hasDMdClass = dMdElements.length > 0;

        return {
          passed: hasDMdClass,
          actual: hasDMdClass
            ? `Found ${dMdElements.length} element(s) with d-md-* class`
            : "No element found with d-md-* class",
        };
      }
      case "check-d-none-class": {
        const dNoneElements = iframeDoc.querySelectorAll(".d-none");
        const hasDNoneClass = dNoneElements.length > 0;

        return {
          passed: hasDNoneClass,
          actual: hasDNoneClass
            ? `Found ${dNoneElements.length} element(s) with d-none class`
            : "No element found with d-none class",
        };
      }

      case "check-anchor-element": {
        const anchors = iframeDoc.querySelectorAll("a");
        const hasAnchor = anchors.length > 0;

        return {
          passed: hasAnchor,
          actual: hasAnchor
            ? `Found ${anchors.length} anchor element(s)`
            : "No anchor element found",
        };
      }
      case "check-shadow-class": {
        const shadowElements = iframeDoc.querySelectorAll(
          ".shadow, .shadow-sm, .shadow-lg"
        );
        const hasShadow = shadowElements.length > 0;

        return {
          passed: hasShadow,
          actual: hasShadow
            ? `Found ${shadowElements.length} element(s) with shadow class`
            : "No element found with shadow class",
        };
      }

      case "check-hr-element": {
        const hrElements = iframeDoc.querySelectorAll("hr");
        const hasHr = hrElements.length > 0;

        return {
          passed: hasHr,
          actual: hasHr
            ? `Found ${hrElements.length} hr element(s)`
            : "No hr element found",
        };
      }

      case "check-span-element": {
        const spanElements = iframeDoc.querySelectorAll("span");
        const hasSpan = spanElements.length > 0;

        return {
          passed: hasSpan,
          actual: hasSpan
            ? `Found ${spanElements.length} span element(s)`
            : "No span element found",
        };
      }

      case "check-order-md-class": {
        const allElements = iframeDoc.querySelectorAll("*");

        const hasOrderMdClass = Array.from(allElements).some((el) =>
          Array.from(el.classList).some((cls) => cls.startsWith("order-md-"))
        );

        return {
          passed: hasOrderMdClass,
          actual: hasOrderMdClass
            ? "Found bootstrap order-md-* class"
            : "No bootstrap order-md-* class found",
        };
      }
      case "check-bootstrap-arrow-icon": {
        const iconElements = iframeDoc.querySelectorAll("i");

        const hasArrowIcon = Array.from(iconElements).some((icon) =>
          Array.from(icon.classList).some(
            (cls) => cls.startsWith("bi-arrow") || cls.includes("arrow")
          )
        );

        return {
          passed: hasArrowIcon,
          actual: hasArrowIcon
            ? "Found bootstrap arrow icon"
            : "No bootstrap arrow icon found",
        };
      }

      case "check-ml-auto-in-navbar": {
        const elements = iframeDoc.querySelectorAll("nav *");
        let passed = false;

        elements.forEach((el) => {
          if (el.classList.contains("ml-auto")) {
            passed = true;
          }
          const style = iframeDoc.defaultView.getComputedStyle(el);
          if (style.marginLeft === "auto") {
            passed = true;
          }
        });

        return {
          passed,
          actual: passed
            ? "Found ml-auto or margin-left: auto inside navbar"
            : "Missing ml-auto or margin-left: auto inside navbar",
        };
      }

      case "check-navbar-collapse": {
        const collapse = iframeDoc.querySelector("nav .navbar-collapse");
        const passed = !!collapse;

        return {
          passed,
          actual: passed
            ? "Found navbar-collapse inside navbar"
            : "Missing navbar-collapse inside navbar",
        };
      }

      case "check-navbar-class": {
        const nav = iframeDoc.querySelector("nav.navbar");
        const passed = !!nav;

        return {
          passed,
          actual: passed
            ? "Found nav element with class navbar"
            : "Missing nav element with class navbar",
        };
      }
      case "check-two-buttons": {
        const buttons = iframeDoc.querySelectorAll("button");
        const passed = buttons.length === 2;

        return {
          passed,
          actual: passed
            ? "Found exactly two buttons"
            : `Expected 2 buttons, found ${buttons.length}`,
        };
      }

      case "check-span-inside-heading": {
        const span = iframeDoc.querySelector("h1 span");
        const passed = !!span;

        return {
          passed,
          actual: passed
            ? "Found span inside heading"
            : "Missing span inside heading",
        };
      }

      case "check-logo-image-src": {
        const logoUrl =
          "https://res.cloudinary.com/djhuqjvrl/image/upload/v1766818254/landing-section-design-logo-img_kz2kyz.png";
        const images = iframeDoc.querySelectorAll("img");
        const passed = Array.from(images).some(
          (img) => img.getAttribute("src") === logoUrl
        );

        return {
          passed,
          actual: passed
            ? "Found image with correct logo src"
            : "Missing image with correct logo src",
        };
      }

      // 1️⃣ EXACTLY ONE container
      case "check-container-class": {
        const containers = iframeDoc.querySelectorAll(".container");
        return {
          passed: containers.length === 1,
          actual: `Found ${containers.length} container element(s)`,
        };
      }

      // 2️⃣ EXACTLY ONE row inside container
      case "check-row-inside-container": {
        const rows = iframeDoc.querySelectorAll(".container .row");
        return {
          passed: rows.length === 1,
          actual: `Found ${rows.length} row(s) inside container`,
        };
      }

      // 3️⃣ EXACTLY FOUR col-12 OR col-sm-12
      case "check-min-four-mobile-columns": {
        const columns = iframeDoc.querySelectorAll(".col-12, .col-sm-12");
        return {
          passed: columns.length === 4,
          actual: `Found ${columns.length} mobile columns`,
        };
      }

      // 4️⃣ EXACTLY FOUR col-md-6 inside row
      case "check-min-four-col-md-6": {
        const columns = iframeDoc.querySelectorAll(".row .col-md-6");
        return {
          passed: columns.length === 4,
          actual: `Found ${columns.length} col-md-6 elements`,
        };
      }

      // 5️⃣ EXACTLY TWO order-* utility classes
      case "check-order-classes": {
        const elements = Array.from(iframeDoc.querySelectorAll("*")).filter(
          (el) =>
            Array.from(el.classList).some(
              (cls) => cls.startsWith("order-") && !cls.startsWith("order-md-")
            )
        );

        return {
          passed: elements.length === 2,
          actual: `Found ${elements.length} order utility elements`,
        };
      }

      // 6️⃣ EXACTLY TWO images with src
      case "check-image-src": {
        const images = iframeDoc.querySelectorAll("img[src]");
        return {
          passed: images.length === 2,
          actual: `Found ${images.length} image elements`,
        };
      }

      // 7️⃣ EXACTLY TWO images with w-100
      case "check-image-w-100": {
        const images = iframeDoc.querySelectorAll("img.w-100");
        return {
          passed: images.length === 2,
          actual: `Found ${images.length} images with w-100`,
        };
      }

      // 8️⃣ EXACTLY TWO headings inside row
      case "check-heading-elements": {
        const headings = iframeDoc.querySelectorAll(
          ".row h1, .row h2, .row h3, .row h4, .row h5, .row h6"
        );
        return {
          passed: headings.length === 2,
          actual: `Found ${headings.length} heading elements`,
        };
      }

      // 9️⃣ EXACTLY TWO paragraphs inside row
      case "check-paragraph-elements": {
        const paragraphs = iframeDoc.querySelectorAll(".row p");
        return {
          passed: paragraphs.length === 2,
          actual: `Found ${paragraphs.length} paragraph elements`,
        };
      }

      // 🔟 EXACTLY TWO order-md-* utility classes
      case "check-order-md-classes": {
        const elements = Array.from(iframeDoc.querySelectorAll("*")).filter(
          (el) =>
            Array.from(el.classList).some((cls) => cls.startsWith("order-md-"))
        );

        return {
          passed: elements.length === 2,
          actual: `Found ${elements.length} order-md utility elements`,
        };
      }

      // 1️⃣ container
      case "check-container-class": {
        const containers = iframeDoc.querySelectorAll(".container");
        return {
          passed: containers.length >= 1,
          actual: `Found ${containers.length} container(s)`,
        };
      }

      // 2️⃣ row inside container
      case "check-row-inside-container": {
        const rows = iframeDoc.querySelectorAll(".container .row");
        return {
          passed: rows.length >= 1,
          actual: `Found ${rows.length} row(s) inside container`,
        };
      }

      // 3️⃣ h1 inside row
      case "check-h1-inside-row": {
        const headings = iframeDoc.querySelectorAll(".row h1");
        return {
          passed: headings.length >= 1,
          actual: `Found ${headings.length} h1 element(s) inside row`,
        };
      }

      // 4️⃣ at least 7 paragraphs inside row
      case "check-min-seven-paragraphs": {
        const paragraphs = iframeDoc.querySelectorAll(".row p");
        return {
          passed: paragraphs.length >= 7,
          actual: `Found ${paragraphs.length} paragraph(s)`,
        };
      }

      // 5️⃣ at least 6 col-md-6 inside row
      case "check-min-six-col-md-6": {
        const columns = iframeDoc.querySelectorAll(".row .col-md-6");
        return {
          passed: columns.length >= 6,
          actual: `Found ${columns.length} col-md-6 element(s)`,
        };
      }

      // 6️⃣ at least 6 d-flex inside row
      case "check-min-six-d-flex": {
        const elements = iframeDoc.querySelectorAll(".row .d-flex");
        return {
          passed: elements.length >= 6,
          actual: `Found ${elements.length} d-flex element(s)`,
        };
      }

      // 7️⃣ at least 6 flex-row inside row
      case "check-min-six-flex-row": {
        const elements = iframeDoc.querySelectorAll(".row .flex-row");
        return {
          passed: elements.length >= 6,
          actual: `Found ${elements.length} flex-row element(s)`,
        };
      }

      // 8️⃣ at least 6 images inside row
      case "check-min-six-images": {
        const images = iframeDoc.querySelectorAll(".row img");
        return {
          passed: images.length >= 6,
          actual: `Found ${images.length} image(s)`,
        };
      }

      default:
        return {
          passed: false,
          actual: `Unknown HTML test type: ${validationType}`,
        };
    }
  } catch (error) {
    console.error("[HTML Validation Error]:", error);
    return {
      passed: false,
      actual: `Validation Error: ${error.message}`,
    };
  }
};

export default validateHtmlTest;
