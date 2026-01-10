const validateJsTest = (testCase, iframeDoc) => {
  const normalizeColor = (color) => color.replace(/\s/g, "").toLowerCase();
  // Helper function to get image filenames from URLs
  const getImageFileName = (url) => {
    if (!url) return '';
    // Extract the last part of the URL after the last slash
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

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

    

    case "check-spring-images": {
      // Click the spring button
      iframeDoc.getElementById("springBtn").click();
      
      // Get the current image sources
      const smallImg = iframeDoc.getElementById("seasonSmallImage").src;
      const mediumImg = iframeDoc.getElementById("seasonMediumImage").src;
      
      // Get filenames for more accurate checking
      const smallImgFile = getImageFileName(smallImg);
      const mediumImgFile = getImageFileName(mediumImg);
      
      // Expected filenames for spring
      const expectedSmallSpring = "seasons-switcher-spring-xs-img_ymubbx.png";
      const expectedMediumSpring = "seasons-switcher-spring-md-img_phcjh8.png";
      
      // Check if images match
      const passed = (
        smallImgFile === expectedSmallSpring || 
        smallImg.includes("spring-xs-img")
      ) && (
        mediumImgFile === expectedMediumSpring || 
        mediumImg.includes("spring-md-img")
      );
      
      return {
        passed: passed,
        actual: {
          smallImg: smallImgFile,
          mediumImg: mediumImgFile
        },
      };
    }

    case "check-summer-images": {
      // First reset to default (optional, but good for isolated testing)
      // Then click summer button
      iframeDoc.getElementById("summerBtn").click();
      
      const smallImg = iframeDoc.getElementById("seasonSmallImage").src;
      const mediumImg = iframeDoc.getElementById("seasonMediumImage").src;
      
      const smallImgFile = getImageFileName(smallImg);
      const mediumImgFile = getImageFileName(mediumImg);
      
      // Expected filenames for summer
      const expectedSmallSummer = "seasons-switcher-summer-xs-img_ljcy4k.png";
      const expectedMediumSummer = "seasons-switcher-summer-md-img_m37nkm.png";
      
      const passed = (
        smallImgFile === expectedSmallSummer || 
        smallImg.includes("summer-xs-img")
      ) && (
        mediumImgFile === expectedMediumSummer || 
        mediumImg.includes("summer-md-img")
      );
      
      return {
        passed: passed,
        actual: {
          smallImg: smallImgFile,
          mediumImg: mediumImgFile
        },
      };
    }

    case "check-autumn-images": {
      iframeDoc.getElementById("autumnBtn").click();
      
      const smallImg = iframeDoc.getElementById("seasonSmallImage").src;
      const mediumImg = iframeDoc.getElementById("seasonMediumImage").src;
      
      const smallImgFile = getImageFileName(smallImg);
      const mediumImgFile = getImageFileName(mediumImg);
      
      // Expected filenames for autumn
      const expectedSmallAutumn = "seasons-switcher-autumn-xs-img_npgz12.png";
      const expectedMediumAutumn = "seasons-switcher-autumn-md-img_jhfrpm.png";
      
      const passed = (
        smallImgFile === expectedSmallAutumn || 
        smallImg.includes("autumn-xs-img")
      ) && (
        mediumImgFile === expectedMediumAutumn || 
        mediumImg.includes("autumn-md-img")
      );
      
      return {
        passed: passed,
        actual: {
          smallImg: smallImgFile,
          mediumImg: mediumImgFile
        },
      };
    }

    case "check-winter-images": {
      iframeDoc.getElementById("winterBtn").click();
      
      const smallImg = iframeDoc.getElementById("seasonSmallImage").src;
      const mediumImg = iframeDoc.getElementById("seasonMediumImage").src;
      
      const smallImgFile = getImageFileName(smallImg);
      const mediumImgFile = getImageFileName(mediumImg);
      
      // Expected filenames for winter
      const expectedSmallWinter = "seasons-switcher-winter-xs-img_fzooxl.png";
      const expectedMediumWinter = "seasons-switcher-winter-md-img_q1ta4r.png";
      
      const passed = (
        smallImgFile === expectedSmallWinter || 
        smallImg.includes("winter-xs-img")
      ) && (
        mediumImgFile === expectedMediumWinter || 
        mediumImg.includes("winter-md-img")
      );
      
      return {
        passed: passed,
        actual: {
          smallImg: smallImgFile,
          mediumImg: mediumImgFile
        },
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
