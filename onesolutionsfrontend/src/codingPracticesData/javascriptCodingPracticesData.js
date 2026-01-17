export const javascriptCodingPracticesData = {
  javascript: [
    //coding practice - 1
    {
      id: "javascript-coding-practice-1",
      title: "Javascript Coding Practice 1",
      description: "",
      questions: [
        {
          id: "ed912af8-2fvjfrkbnjfbvj46d9-0d95ddf8eb19",
          title: "Color Picker",
          description:
            "In this assignment, let's build a Color Picker by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 80,
          type: "web",
          defaultCode: {
            html: `<!DOCTYPE html>
            <html>
            
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
            </head>
            
            <body>
                <div id="colorPickerContainer" class="color_container">
                    <h1>Color Picker</h1>
                    <div>
                        <button class="button" id="button1" onclick="changeBgToGreyAndUpdateText()">#e0e0e0</button>
                        <button class="button" id="button2" onclick="changeBgToGreenAndUpdateText()">#6fcf97</button>
                        <button class="button" id="button3" onclick="changeBgToBlueAndUpdateText()">#56ccf2</button>
                        <button class="button" id="button4" onclick="changeBgToPurpleAndUpdateText()">#bb6bd9</button>
                    </div>
                    <p class="black_bg">Background Color : <span id=selectedColorHexCode>#fffff</span></p>
                    <p>Try clicking on one of the colors above to change the background color of this page!</p>
                </div>
            </body>
            
            </html>`,
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');

            .button {
                width: 80px;
                height: 80px;
                border-radius: 15px;
            }
            
            .color_container {
                padding-top: 130px;
                text-align: center;
                height: 100vh;
            }
            
            #button1 {
                background-color: #e0e0e0;
                font-family: Open Sans;
            }
            
            #button2 {
                background-color: #6fcf97;
                font-family: Open Sans;
            }
            
            #button3 {
                background-color: #56ccf2;
                font-family: Open Sans;
            }
            
            #button4 {
                background-color: #bb6bd9;
                font-family: Open Sans;
            }
            
            .black_bg {
                background-color: black;
                color: white;
                font-weight: bold;
                padding: 12px;
                font-size: 20px;
                margin-top: 20px;
                border-radius: 10px;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767795580/color-switcher-v1_whojln.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>The HTML container element that is wrapping all the HTML elements should have the id <strong>colorPickerContainer</strong>.</span></li>
                        <li><span>The HTML span element should have the id selectedColorHexCode .</span></li>
                        <li><span>The HTML button element with text as #e0e0e0 should have the id button1</span></li>
                        <li><span>The HTML button element with text as #6fcf97 should have the id button2</span></li>
                        <li><span>The HTML button element with text as #56ccf2 should have the id button3</span></li>
                        <li><span>The HTML button element with text as #bb6bd9 should have the id button4</span></li>
                      </ol>
                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Do not edit or remove the ids of the HTML button elements in the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                      <li>The background color of the page and the Hex Code value in the HTML span element should change when the HTML button element is clicked.</li>
                      <li>The background color of the page and the background color of the clicked HTML button element should be the same.</li>
                      <li>The text in the clicked HTML button element and the text in the HTML span element should be the same.</li>
                  </ul>

                    <div class="Note-container">
                    <div class="icon-note">
                      <h6>
                        <i class="bi bi-journal-text"></i>Note
                      </h6>
                    </div>
                    <p>
                      <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                       
                        <li>
                          Try to achieve the design as close as possible.
                        </li>
                        <li>
                        Apply the styles and functionality to the given HTML prefilled code.
                        </li>
                      </ul>
                    </p>
                  </div>

                  <hr>

                  <p class="desc-que-blue">Resources</p>

                  <p class="desc-que-blue">CSS Colors used:</p>
                  <div  class="desc-colors ce0e0e0">#e0e0e0</div>
                  <div  class="desc-colors c6fcf97">#6fcf97</div>
                  <div  class="desc-colors c56ccf2">#56ccf2</div>
                  <div  class="desc-colors cbb6bd9">#bb6bd9</div>
                  <div  class="desc-colors c222222">#222222</div>
                  <div  class="desc-colors c49a6e9">#49a6e9</div>

                  <p class="desc-que-blue">CSS Font families used:</p>
                  <ul><li>Open Sans</li></ul>
                  <hr>
                <p class="desc-que-blue">Concepts Review</p>
                <p class="">Want to quickly review some of the concepts you've been learning?</p>
                <p class="">Take a look at the Cheat Sheets.</p>
                   
                   
                  </div>
                `,
          testCases: [
            {
              id: 1,
              description:
                "When button1 is clicked, background color should change to #e0e0e0",
              type: "js-validation",
              input: "check-button1-bg",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "When button1 is clicked, selectedColorHexCode text should be #e0e0e0",
              type: "js-validation",
              input: "check-button1-text",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "When button2 is clicked, background color should change to #6fcf97",
              type: "js-validation",
              input: "check-button2-bg",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When button2 is clicked, selectedColorHexCode text should be #6fcf97",
              type: "js-validation",
              input: "check-button2-text",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "When button3 is clicked, background color should change to #56ccf2",
              type: "js-validation",
              input: "check-button3-bg",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "When button3 is clicked, selectedColorHexCode text should be #56ccf2",
              type: "js-validation",
              input: "check-button3-text",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "When button4 is clicked, background color should change to #bb6bd9",
              type: "js-validation",
              input: "check-button4-bg",
              output: "true",
              visible: true,
            },
            {
              id: 8,
              description:
                "When button4 is clicked, selectedColorHexCode text should be #bb6bd9",
              type: "js-validation",
              input: "check-button4-text",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //coding practice - 2
    {
      id: "javascript-coding-practice-2",
      title: "Javascript Coding Practice 2",
      description: "",
      questions: [
        {
          id: "e195b822-ab24fafec88-050b8ddb",
          title: "Seasons Switcher",
          description:
            "In this assignment, let's build a Seasons Switcher by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 40,
          type: "web",
          defaultCode: {
            html: `<!DOCTYPE html>
                <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
                </head>
                
                <body>
                    <div>
                        <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767971064/seasons-switcher-four-seasons-xs-img_kybnsr.png" id="seasonSmallImage" class="season-image d-inline d-md-none" />
                        <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767971063/seasons-switcher-four-seasons-md-img_exvdpn.png" id="seasonMediumImage" class="season-image d-none d-md-inline" />
                        <div class="d-flex flex-row justify-content-center mt-4">
                            <button class="button spring-button" id="springBtn" onclick="spring()">Spring</button>
                            <button class="button summer-button" id="summerBtn" onclick="summer()">Summer</button>
                            <button class="button autumn-button" id="autumnBtn" onclick="autumn()">Autumn</button>
                            <button class="button winter-button" id="winterBtn" onclick="winter()">Winter</button>
                        </div>
                    </div>
                </body>
                
                </html>`,
            css: `
                   @import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

                .season-image {
                    width: 100%;
                    height: 85vh;
                }
                
                .button {
                    color: white;
                    background-color: #cbd2d9;
                    font-family: "Roboto";
                    font-size: 14px;
                    width: 80px;
                    height: 32px;
                    border-width: 0;
                    border-radius: 8px;
                    margin-left: 10px;
                    margin-right: 10px;
                }
                
                .spring-button {
                    background-color: #3a7333;
                }
                
                .summer-button {
                    background-color: #e0bb00;
                }
                
                .autumn-button {
                    background-color: #b04400;
                }
                
                .winter-button {
                    background-color: #0f7cb6;
                }`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767967387/seasons-switcher-v1_vzxtml.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>The HTML <strong>img</strong> elements should have the ids seasonSmallImage, seasonMediumImage</span></li>
                    </ol>
                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Do not edit or remove the ids of the HTML button elements in the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                      <li>When the HTML button element with the season id is clicked, the season images in both the small and medium devices should change respectively.</li>
                </ul>

                    <div class="Note-container">
                    <div class="icon-note">
                      <h6>
                        <i class="bi bi-journal-text"></i>Note
                      </h6>
                    </div>
                    <p>
                      <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                       
                        <li>
                          Try to achieve the design as close as possible.
                        </li>
                        <li>
                        Apply the functionality to the given prefilled code.
                        </li>
                      </ul>
                    </p>
                  </div>

                  <hr>

                  <p class="desc-que-blue">Resources</p>

              <p class="">Use the image URLs given below.</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767967704/seasons-switcher-spring-xs-img_ymubbx.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1767967704/seasons-switcher-spring-xs-img_ymubbx.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767967773/seasons-switcher-spring-md-img_phcjh8.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1767967773/seasons-switcher-spring-md-img_phcjh8.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767967826/seasons-switcher-summer-xs-img_ljcy4k.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1767967826/seasons-switcher-summer-xs-img_ljcy4k.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767967900/seasons-switcher-summer-md-img_m37nkm.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1767967900/seasons-switcher-summer-md-img_m37nkm.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767970366/seasons-switcher-autumn-xs-img_npgz12.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1767970366/seasons-switcher-autumn-xs-img_npgz12.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767970435/seasons-switcher-autumn-md-img_jhfrpm.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1767970435/seasons-switcher-autumn-md-img_jhfrpm.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767970502/seasons-switcher-winter-xs-img_fzooxl.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1767970502/seasons-switcher-winter-xs-img_fzooxl.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1767970564/seasons-switcher-winter-md-img_q1ta4r.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1767970564/seasons-switcher-winter-md-img_q1ta4r.png</a></p>
                
              <hr>
                <p class="desc-que-blue">Concepts Review</p>
                <p class="">Want to quickly review some of the concepts you've been learning?</p>
                <p class="">Take a look at the Cheat Sheets.</p>
                   
              </div>
                `,
          testCases: [
            {
              id: 1,
              description:
                "When the HTML button element with the id springBtn is clicked, the small and medium season images should update to Spring images",
              type: "js-validation",
              input: "check-spring-images",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "When the HTML button element with the id summerBtn is clicked, the small and medium season images should update to Summer images",
              type: "js-validation",
              input: "check-summer-images",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "When the HTML button element with the id autumnBtn is clicked, the small and medium season images should update to Autumn images",
              type: "js-validation",
              input: "check-autumn-images",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the HTML button element with the id winterBtn is clicked, the small and medium season images should update to Winter images",
              type: "js-validation",
              input: "check-winter-images",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //coding practice - 3
    {
      id: "javascript-coding-practice-3",
      title: "Javascript Coding Practice 3",
      description: "",
      questions: [
        {
          id: "e195b823-ab24fafddc88-050bccdb",
          title: "Tip Calculator",
          description:
            "In this assignment, let's build a Tip Calculator by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 75,
          type: "web",
          defaultCode: {
            html: `<!DOCTYPE html>
            <html>
            
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
            </head>
            
            <body>
                <div class="tip-calculator-container pb-5">
                    <img class="tip-calculator-image" src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768539237/calci_qvastf.png" />
                    <h1 class="tip-calculator-heading text-center mt-4 mb-4">Tip Calculator</h1>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-6 mb-4">
                                <p class="input-label mb-2">BILL AMOUNT</p>
                                <input type="text" class="user-input" id="billAmount" />
                            </div>
                            <div class="col-12 col-md-6 mb-4">
                                <p class="input-label mb-2">PERCENTAGE TIP</p>
                                <input type="text" class="user-input" id="percentageTip" />
                            </div>
                            <div class="col-12 col-md-6 mb-4">
                                <p class="input-label mb-2">TIP AMOUNT</p>
                                <input type="text" class="user-input" id="tipAmount" />
                            </div>
                            <div class="col-12 col-md-6 mb-4">
                                <p class="input-label mb-2">TOTAL</p>
                                <input type="text" class="user-input" id="totalAmount" />
                            </div>
                            <div class="col-12 text-center mt-4">
                                <button class="btn btn-info calculate-tip-button" id="calculateButton" onclick="calculateTip()">CALCULATE</button>
                                <p class="error-message text-center" id="errorMessage"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `
            @import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .tip-calculator-container {
                background-color: #f9fbfe;
            }
            
            .tip-calculator-image {
                width: 100%;
            }
            
            .tip-calculator-heading {
                color: #264fa2;
                font-family: "Roboto";
                font-size: 48px;
                font-weight: 500;
            }
            
            .input-label {
                color: #7b8794;
                font-family: "Roboto";
                font-size: 12px;
                font-weight: bold;
            }
            
            .user-input {
                height: 40px;
                width: 100%;
                border-style: solid;
                border-width: 1px;
                border-color: #cbd2d9;
                border-radius: 4px;
                padding-left: 12px;
            }
            
            .calculate-tip-button {
                background-color: #264fa2;
                color: white;
                font-family: "Roboto";
                font-size: 18px;
                border-radius: 4px;
            }
            
            .error-message {
                color: #cf1124;
                font-family: "Roboto";
                font-size: 14px;
                font-weight: 500;
                margin-top: 10px;
            }`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">
                    <p class="desc-que-blue">Refer to the below image.</p>                  
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768213017/tip-calculator-v1_uy8kn1.gif" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>The HTML input elements should have the ids <strong>billAmount,</Strong> <strong>percentageTip,</strong>  <strong>tipAmount</strong> and totalAmount</span></li>
                        <li><span>The HTML p element with the class name <strong>error-message </strong>should have the id <strong>errorMessage.</strong></span></li>
                    </ol>
                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Write the code without deleting the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                  <li>
                    <strong>When calculateButton is clicked:</strong>
                    <ul>
                      <li>
                        The calculated tip should be displayed in the <strong>tipAmount</strong> input element.
                      </li>
                      <li>
                        The calculated total should be displayed in the <strong>totalAmount</strong> input element.
                      </li>
                    </ul>
                  </li>
                
                  <li>
                    <strong>Formulas:</strong>
                    <ul>
                      <li>
                        <strong>calculatedTip</strong> = (percentageTip / 100) × billAmount
                      </li>
                      <li>
                        <strong>totalAmount</strong> = billAmount + calculatedTip
                      </li>
                    </ul>
                  </li>
                
                  <li>
                    <strong>Error Message Conditions:</strong>
                    <ul>
                      <li>
                        Show error message if the HTML input element with id <strong>billAmount</strong> is empty.
                      </li>
                      <li>
                        Show error message if the HTML input element with id <strong>percentageTip</strong> is empty.
                      </li>
                      <li>
                        Show error message if <strong>both</strong> the HTML input elements with ids 
                        <strong>billAmount</strong> and <strong>percentageTip</strong> are empty.
                      </li>
                    </ul>
                  </li>
                </ul>                

                    <div class="Note-container">
                    <div class="icon-note">
                      <h6>
                        <i class="bi bi-journal-text"></i>Note
                      </h6>
                    </div>
                    <p>
                      <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                       
                        <li>
                        Apply the functionality to the given prefilled code.
                        </li>
                        <li>
                        Assume billAmount and percentageTip will always be given as integer inputs.
                        </li>
                      </ul>
                    </p>
                  </div>

                  <hr>

                <p class="desc-que-blue">Concepts Review</p>
                <p class="">Want to quickly review some of the concepts you’ve been learning?</p>
                <p class="">Take a look at the Cheat Sheets.</p>
                   
              </div>
                `,
          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML input element with the id billAmount",
              type: "js-validation",
              input: "check-billAmount",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML input element with the id percentageTip",
              type: "js-validation",
              input: "check-percentageTip",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML input element with the id tipAmount",
              type: "js-validation",
              input: "check-tipAmount",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML input element with the id totalAmount",
              type: "js-validation",
              input: "check-totalAmount",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML paragraph element with the id errorMessage",
              type: "js-validation",
              input: "check-errorMessage",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "When the HTML button element with the id calculateButton is clicked, the calculated tip should be displayed in the HTML input element with the id tipAmount",
              type: "js-validation",
              input: "check-tip-calculation",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "When the HTML button element with the id calculateButton is clicked, the calculated total should be displayed in the HTML input element with the id totalAmount",
              type: "js-validation",
              input: "check-total-calculation",
              output: "true",
              visible: true,
            },
            {
              id: 8,
              description:
                "When both the HTML input elements with the id billAmount and percentageTip are empty, the HTML element with the id errorMessage should have the error message text",
              type: "js-validation",
              input: "check-both-empty",
              output: "true",
              visible: true,
            },
            {
              id: 9,
              description:
                "When the HTML input element with the id billAmount is empty, the HTML element with the id errorMessage should have the error message text",
              type: "js-validation",
              input: "check-billAmount-empty",
              output: "true",
              visible: true,
            },
            {
              id: 10,
              description:
                "When the HTML input element with the id percentageTip is empty, the HTML element with the id errorMessage should have the error message text",
              type: "js-validation",
              input: "check-percentageTip-empty",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //coding practice - 4
    {
      id: "javascript-coding-practice-4",
      title: "Javascript Coding Practice 4",
      description: "",
      questions: [
        {
          id: "ed913af8-2fvjfssbnjfbvj46d9-0d95kkf8eb19",
          title: "Addition Game",
          description:
            "In this assignment, let's build an Addition Game by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 70,
          type: "web",
          defaultCode: {
            html: `<!DOCTYPE html>
            <html>
            
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
            </head>
            
            <body>
                <div class="text-center">
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768539398/addition_vgn3im.png" class="image" />
                    <div class="bg-container pt-5 pb-5">
                        <span class="number m-2" id="firstNumber"></span>
                        <span class="operator m-1">+</span>
                        <span class="number m-2" id="secondNumber"></span>
                        <span class="operator m-1">=</span>
                        <input class="user-input" type="text" id="userInput" />
                        <div class="mt-4 mb-4">
                            <button id="checkButton" class="btn btn-primary mr-3" onclick="checkButtonFunction()">
                                Check
                            </button>
                            <button id="restartButton" class="btn btn-primary" onclick="restartButtonFunction()">
                                Restart
                            </button>
                        </div>
                        <p class="game-result" id="gameResult"></p>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .image {
                width: 360px;
                height: 280px;
            }
            
            .bg-container {
                background-color: #f5f7fa;
            }
            
            .number {
                color: #323f4b;
                background-color: #cbd2d9;
                font-family: "Roboto";
                font-size: 30px;
                font-weight: bold;
                border-style: solid;
                border-width: 8px;
                border-color: #e4e7eb;
                border-radius: 12px;
                padding-left: 8px;
                padding-right: 8px;
            }
            
            .operator {
                color: #c4c4c4;
                font-family: "Roboto";
                font-size: 40px;
            }
            
            .user-input {
                text-align: center;
                color: #323f4b;
                background-color: #cbd2d9;
                font-family: "Roboto";
                font-size: 30px;
                font-weight: bold;
                width: 142px;
                height: 60px;
                border-style: solid;
                border-width: 8px;
                border-color: #e4e7eb;
                border-radius: 12px;
                margin: 20px;
            }
            
            .game-result {
                color: #ffffff;
                background-color: #f5f7fa;
                font-family: "Roboto";
                font-size: 24px;
                font-weight: 500;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768280507/addition-game-v1_gdukc8.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>The HTML <strong>span</strong> elements with the class name number should have the ids <strong>firstNumber</strong> and <strong>secondNumber</strong></span></li>
                        <li><span>The HTML input element should have the id <strong>userInput</strong></span></li>
                        <li><span>The HTML p element with the class name <strong>game-result</strong> should have the id <strong>gameResult</strong></span></li>
                      </ol>

                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                       Write the code without deleting the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                  <li>
                    <strong>When the HTML button element with the id <code>checkButton</code> is clicked:</strong>
                    <ul>
                      <li>
                        If the given user input is correct, the HTML <code>p</code> element with the id 
                        <strong><code>gameResult</code></strong> should display the <strong>success message</strong>.
                      </li>
                      <li>
                        If the given user input is wrong, the HTML <code>p</code> element with the id 
                        <strong><code>gameResult</code></strong> should display the <strong>failure message</strong>.
                      </li>
                    </ul>
                  </li>
                
                  <li>
                    <strong>When the HTML button element with the id <code>restartButton</code> is clicked:</strong>
                    <ul>
                      <li>
                        New random numbers should be assigned to <strong><code>firstNumber</code></strong> and 
                        <strong><code>secondNumber</code></strong>.
                      </li>
                      <li>
                        The <strong><code>gameResult</code></strong> should be <strong>empty</strong>.
                      </li>
                    </ul>
                  </li>
                </ul>
                
                    <div class="Note-container">
                    <div class="icon-note">
                      <h6>
                        <i class="bi bi-journal-text"></i>Note
                      </h6>
                    </div>
                    <p>
                      <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                        <li>
                        Apply the functionality to the given prefilled code.
                        </li>
                      </ul>
                    </p>
                  </div>

                  <hr>

                  <p class="desc-que-blue">Resources</p>
                  <p class="desc-que-blue">CSS Colors used:</p>

                  <div  class="desc-colors c028a0f">#028a0f</div>
                  <div  class="desc-colors c1e217c">#1e217c</div>
                 
                  <hr>
                <p class="desc-que-blue">Concepts Review</p>
                <p class="">Want to quickly review some of the concepts you've been learning?</p>
                <p class="">Take a look at the Cheat Sheets.</p>
                        
                  </div>
                `,
          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML span element with the id firstNumber",
              type: "js-validation",
              input: "check-firstNumber",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML span element with the id secondNumber",
              type: "js-validation",
              input: "check-secondNumber",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML input element with the id userInput",
              type: "js-validation",
              input: "check-userInput",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML paragraph element with the id gameResult",
              type: "js-validation",
              input: "check-gameResult",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "When the HTML button element with the id checkButton is clicked, if the user enters the right answer, the HTML paragraph element with the id gameResult should have the text",
              type: "js-validation",
              input: "check-correct-answer",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "When the HTML button element with the id checkButton is clicked, if the user enters the wrong answer, the HTML paragraph element with the id gameResult should have the text",
              type: "js-validation",
              input: "check-wrong-answer",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "When the HTML button element with the id restartButton is clicked, the HTML paragraph element with the id gameResult should be empty",
              type: "js-validation",
              input: "check-restart",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //coding_practice - 5
    {
      id: "javascript-coding-practice-5",
      title: "Javascript Coding Practice 5",
      description: "",
      questions: [
        {
          id: "ed914af8-2fvjfssbnjfbvj446d9-0d105kkf8eb19",
          title: "Button Maker",
          description:
            "In this assignment, let's build a Button Maker by applying the concepts we learned till now.",
          difficulty: "Medium",
          score: 60,
          type: "web",
          defaultCode: {
            html: `<!DOCTYPE html>
            <html>
            
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
            </head>
            
            <body>
                <div class="button-maker-bg-container p-4">
                    <h1 class="button-maker-heading text-center mb-4">Button Maker</h1>
                    <div class="button-maker-container bg-light pt-4 pb-4">
                        <div class="container">
                            <div class="row">
                                <div class="col-12 col-md-7">
                                    <p class="input-label">BACKGROUND COLOR</p>
                                    <input class="user-input" type="text" id="bgColorInput" />
                                    <p class="input-label">FONT COLOR</p>
                                    <input class="user-input" type="text" id="fontColorInput" />
                                    <p class="input-label">FONT SIZE (in px)</p>
                                    <input class="user-input" type="text" id="fontSizeInput" />
                                    <p class="input-label">FONT WEIGHT</p>
                                    <input class="user-input" type="text" id="fontWeightInput" />
                                    <p class="input-label">PADDING (in px)</p>
                                    <input class="user-input" type="text" id="paddingInput" />
                                    <p class="input-label">BORDER RADIUS (in px)</p>
                                    <input class="user-input" type="text" id="borderRadiusInput" />
                                    <div class="text-right mt-4">
                                        <button id="applyButton" class="btn btn-primary" onclick="applyClick()">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                                <div class="col-12 col-md-5 mt-4 text-center">
                                    <button class="custom-button" id="customButton">Custom Button</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .button-maker-bg-container {
                background-image: linear-gradient(to right, #09203f, #537895);
            }
            
            .button-maker-heading {
                color: #ffffff;
                font-family: "Roboto";
                font-size: 32px;
                font-weight: 500;
            }
            
            .button-maker-container {
                border-radius: 10px;
            }
            
            .input-label {
                color: #7b8794;
                font-family: "Roboto";
                font-size: 12px;
                font-weight: bold;
                margin-top: 12px;
                margin-bottom: 6px;
            }
            
            .user-input {
                width: 100%;
                height: 40px;
                border-style: solid;
                border-width: 1px;
                border-color: #cbd2d9;
                border-radius: 4px;
                padding-left: 12px;
            }
            
            .custom-button {
                font-family: "Roboto";
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768542690/button-maker-v1_ti5bb0.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>The HTML input elements should have the ids <code>bgColorInput,</code> <code>fontColorInput,</code> <code>fontSizeInput,</code> <code>fontWeightInput,</code> <code>paddingInput</code> and <code>borderRadiusInput</code> correspondingly</span></li>
                        <li><span>The HTML <code>button</code> element that has the class name <code>custom-button</code> should have the id <code>customButton</code></span></li>
                      </ol>

                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                       Write the code without deleting the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                  <li>
                       <strong>When <code>applyButton</code> is clicked:</strong>
                    <ul>
                      <li>
                      The CSS property values of bgColorInput, fontColorInput, fontSizeInput, fontWeightInput, paddingInput and borderRadiusInput should apply to the HTML button element with the id customButton.
                      </li>
                    </ul>
                  </li>
                </ul>
                
                    <div class="Note-container">
                    <div class="icon-note">
                      <h6>
                        <i class="bi bi-journal-text"></i>Note
                      </h6>
                    </div>
                    <p>
                      <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                        <li>
                        Apply the functionality to the given prefilled code.
                        </li>
                        <li>
                        Please use the valid CSS property values.
                        </li>
                      </ul>
                    </p>
                  </div>
                 
                  <hr>
                <p class="desc-que-blue">Concepts Review</p>
                <p class="">Want to quickly review some of the concepts you've been learning?</p>
                <p class="">Take a look at the Cheat Sheets.</p>
                        
                  </div>
                `,
          testCases: [
            {
              id: 1,
              description:
                "When the applyButton is clicked, the value of the background color input element with the id bgColorInput should apply to the HTML button element with the id customButton",
              type: "js-validation",
              input: "check-bgColorInput",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "When the applyButton is clicked, the value of the font color input element with the id fontColorInput should apply to the HTML button element with the id customButton",
              type: "js-validation",
              input: "check-fontColorInput",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "When the applyButton is clicked, the value of the font size input element with the id fontSizeInput should apply to the HTML button element with the id customButton",
              type: "js-validation",
              input: "check-fontSizeInput",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the applyButton is clicked, the value of the font weight input element with the id fontWeightInput should apply to the HTML button element with the id customButton",
              type: "js-validation",
              input: "check-fontWeightInput",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "When the applyButton is clicked, the value of the padding input element with the id paddingInput should apply to the HTML button element with the id customButton",
              type: "js-validation",
              input: "check-paddingInput",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "When the applyButton is clicked, the value of the border radius input element with the id borderRadiusInput should apply to the HTML button element with the id customButton",
              type: "js-validation",
              input: "check-borderRadiusInput",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //JS coding practice - 1
    {
      id: "js-coding-practice-1",
      title: "JS Coding Practice 1",
      description: "",
      questions: [
        {
          id: "27dd4411-447dd048-96d2e4dfd38f",
          title: "Create & Log and Array",
          description:
            "Write a JS program to log an array with the given values.\n 'Orange', 25, 100, true, 33.58.",
          difficulty: "Easy",
          sampleInput: "",
          sampleOutput: "[ 'Orange', 25, 100, true, 33.58 ]",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The Output should be a single line containing an array with the above values in the same order.</p>
              </div>
          </div>
           `,
          testCases: [
            {
              input: "",
              output: "['Orange', 25, 100, true, 33.58]",
              visible: true,
            },
          ],
          defaultCode: `/*
            * Write your code here and log the output.
            */`,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "ba5f7b86-fc8078e65-a3395dc7cc36",
          title: "Update the values of an array",
          description:
            "Given an array (myArray) in the prefilled code.\n Write a JS program to update the value located at the given index (index) of an array with the given value (val) and log the updated array.",
          difficulty: "Easy",

          sampleInput: "0\n5",
          sampleOutput: "[ 5, 50, 'center', 75, 100 ]",
          descriptionDetails: `
          <div class="desc-question-details">

             <div>
                <p class="desc-que-blue">Input</p>
                <p class="">The first line of input will contain a whole number (index). \n The Second line of input will contain an integer (val).</p>
              </div>
             <hr>
            <div>
                <p class="desc-que-blue">output</p>
                <p class="">The ouput should be a single line containing the updated array.</p>
            </div>
             <hr>
            <div>
                <p class="desc-que-blue">Constraints</p>
                <p class="">0 <= index < length of the given array. \n The value should be an integer.</p>
            </div>

          </div>
         `,
          testCases: [
            {
              input: "0\n5",
              output: "[ 5, 50, 'center', 75, 100 ]",
              visible: true,
            },
            {
              input: "1\n200",
              output: "[ 25, 200, 'center', 75, 100 ]",
              visible: true,
            },
            {
              input: "2\n99",
              output: "[ 25, 50, 99, 75, 100 ]",
              visible: false,
            },
            {
              input: "3\n0",
              output: "[ 25, 50, 'center', 0, 100 ]",
              visible: false,
            },
            {
              input: "4\n-10",
              output: "[ 25, 50, 'center', 75, -10 ]",
              visible: false,
            },
          ],

          defaultCode: `"use strict";

          const fs = require("fs");
          const input = fs.readFileSync(0, "utf-8").trim().split("\n");
          
          const index = parseInt(input[0]);
          const val = parseInt(input[1]);
          
          const myArray = [25, 50, "center", 75, 100];
          
            /*
             * Write your code here and log the output.
             */
                      
          }
          `,
          score: 22,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "93b1de13-80759428-b8466cb75e9a",
          title: "Find the length of the array",
          description:
            "Given an array (myArray).\n Write a JS program to find the length of the array and log the length.",
          difficulty: "Easy",

          sampleInput: "[12, 1, 2, 4, 1]",
          sampleOutput: "5",
          descriptionDetails: `
          <div class="desc-question-details">
             <p class="desc-que-blue">Input</p>
             <p class="">The first line of input will contain an array (myArray).</p>
             <hr>
             <p class="desc-que-blue">output</p>
             <p class="">The ouput should be a single line containing the length of the array.</p>
          </div>
          `,
          testCases: [
            {
              input: "['Orange', 25, 100, true, 33.58]",
              output: "5",
              visible: true,
            },
            {
              input: "[1, 2, 3]",
              output: "3",
              visible: true,
            },
            {
              input: "[]",
              output: "0",
              visible: false,
            },
            {
              input: "['A', 'B', 'C', 'D']",
              output: "4",
              visible: false,
            },
            {
              input: "[true, false, true, false, true]",
              output: "5",
              visible: false,
            },
          ],
          defaultCode: `
          "use strict";

          process.stdin.resume();
          process.stdin.setEncoding("utf-8");

          let inputString = "";
          let currentLine = 0;

          process.stdin.on("data", (inputStdin) => {
            inputString += inputStdin;
          });

          process.stdin.on("end", (_) => {
            inputString = inputString
              .trim()
              .split("\n")
              .map((str) => str.trim());

            main();
          });

          function readLine() {
            return inputString[currentLine++];
          }

          function main() {
            let input = readLine().replace(/'/g, '"');
            // myArray
            let myArray = JSON.parse(input);

            /*
            *Write your code here and log the output.
            */
            
          }
          `,
          score: 22,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "893940c6-7486682a6-15c67a3f4491",
          title: "Add a value to the end of the array",
          description:
            "Given an array (myArray) and the value (val).\n Write a JS program to add a value to the end of the array using the array method push and log the updated array.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                  <p class="desc-que-blue">Input</p>
                  <p class="">The first line of input will contain an array (myArray) and the second line of input will contain an integer (val).</p>
              </div>
             <hr>
             <div>
                  <p class="desc-que-blue">output</p>
                  <p class="">The ouput should be a single line containing the updaed array.</p>
             </div>
          </div>
         `,
          sampleInput: "[1, 2, 4] \n 2",
          sampleOutput: "[ 1, 2, 4, 2 ]",
          testCases: [
            {
              input: "['Orange', 25, 100, true, 33.58]\n10",
              output: "[ 'Orange', 25, 100, true, 33.58, 10 ]",
              visible: true,
            },
            {
              input: "[1, 2, 3]\n4",
              output: "[ 1, 2, 3, 4 ]",
              visible: true,
            },
            {
              input: "[]\n99",
              output: "[ 99 ]",
              visible: false,
            },
            {
              input: "['A', 'B']\n5",
              output: "[ 'A', 'B', 5 ]",
              visible: false,
            },
            {
              input: "[10, 20, 30]\n-15",
              output: "[ 10, 20, 30, -15 ]",
              visible: false,
            },
          ],
          defaultCode: `
          "use strict";

          process.stdin.resume();
          process.stdin.setEncoding("utf-8");

          let inputString = "";
          let currentLine = 0;

          process.stdin.on("data", (inputStdin) => {
            inputString += inputStdin;
          });

          process.stdin.on("end", (_) => {
            inputString = inputString
              .trim()
              .split("\n")
              .map((str) => str.trim());

            main();
          });

          function readLine() {
            return inputString[currentLine++];
          }

          function main() {
            let input = readLine().replace(/'/g, '"');
            // myArray
            let myArray = JSON.parse(input);
            // val
            let val = parseInt(readLine());

            /*
            * Write your code here and log the output.
            */
          }
          `,
          score: 22,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "59db7b86-3de18900-389d2c2115c2",
          title: "Delete the last value of the array",
          description:
            "Given an array (myArray).\n Write a JS program to delete the last value of the array using the array method pop and log the deleted value and updated array.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
            <div>
                <p class="desc-que-blue">Input</p>
                <p class="">The first line of input will contain an array (myArray). </p>
            </div>
             <hr>
            <div>
                <p class="desc-que-blue">output</p>
                <p class="">The first line of output should contain the deleted value. \n The second line of output should contain the updated array.</p>
            </div>

          </div>
          `,
          sampleInput: "[17, 2, 4, 9]",
          sampleOutput: "9\n[ 17, 2, 4 ]",
          testCases: [
            {
              input: "[17, 2, 4, 9]",
              output: "9\n[ 17, 2, 4 ]",
              visible: true,
            },
            {
              input: "['Orange', 25, 100, true, 33.58]",
              output: "33.58\n[ 'Orange', 25, 100, true ]",
              visible: true,
            },
            {
              input: "[1, 2, 3, 4]",
              output: "4\n[ 1, 2, 3 ]",
              visible: false,
            },
            {
              input: "['A']",
              output: "A\n[]",
              visible: false,
            },
            {
              input: "[]",
              output: "undefined\n[]",
              visible: false,
            },
          ],
          defaultCode: `
          "use strict";

          process.stdin.resume();
          process.stdin.setEncoding("utf-8");

          let inputString = "";
          let currentLine = 0;

          process.stdin.on("data", (inputStdin) => {
            inputString += inputStdin;
          });

          process.stdin.on("end", (_) => {
            inputString = inputString
              .trim()
              .split("\n")
              .map((str) => str.trim());

            main();
          });

          function readLine() {
            return inputString[currentLine++];
          }

          function main() {
            let input = readLine().replace(/'/g, '"');
            // myArray
            let myArray = JSON.parse(input);

            /*
            * Write your code here and log the output.
            */
            
          }
          `,
          score: 22,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    //JS coding practice - 2
    {
      id: "js-coding-practice-2",
      title: "JS Coding Practice 2",
      description: "",
      questions: [
        {
          id: "f9866fae-1271-4933b37f-b8d3319b8a5a",
          title: "Call a Function",
          description:
            "Given a function (greet) in the prefilled code.\n Write a JS code to call the given function and log it.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The Output should be a single line containing the given greetings message.</p>
              </div>
          </div>
           `,
          sampleInput: "",
          sampleOutput: " Hello! Have a nice day ",
          testCases: [
            {
              input: "",
              output: "Hello! Have a nice day",
              visible: true,
            },
          ],
          defaultCode: `// function greet
          function greet() {
            return "Hello! Have a nice day";
          }
          
          /*
           * Write your code here and log the output.
           */
          
          `,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "95c3f2f4-6d0e-4a888d5d-5ca5ee15b99c",
          title: "Return a value in the function",
          description:
            "Given a function (getSumOfTwoIntegers) in the prefilled code.\n Return the sum of two integers passed as arguments to the function.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain an integer (firstInteger).</p>
                <p class=""></p>The second line of input will contain an integer (secondInteger).</p>
              </div>
              <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The Output should be a single line containing the returned value of the function (sum of two integers).</p>
              </div>
          </div>
           `,
          sampleInput: "2\n3",
          sampleOutput: "5",

          testCases: [
            {
              input: "2\n3",
              output: "5",
              visible: true,
            },
            {
              input: "10\n20",
              output: "30",
              visible: true,
            },
            {
              input: "0\n0",
              output: "0",
              visible: false,
            },
            {
              input: "-5\n15",
              output: "10",
              visible: false,
            },
          ],

          defaultCode: `"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_) => {
  inputString = inputString
    .trim()
    .split("\n")
    .map((str) => str.trim());

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function main() {
  // firstInteger
  let firstInteger = parseInt(readLine());
  // secondInteger
  let secondInteger = parseInt(readLine());

  // function getSumOfTwoIntegers
  function getSumOfTwoIntegers(integer1, integer2) {
    /*
     * Write your code here and return the output.
     */
     let sum = firstInteger + secondInteger;
     return sum;
     
  }


  let sumOfTwoIntegers = getSumOfTwoIntegers(firstInteger, secondInteger);
  console.log(sumOfTwoIntegers);
}
 `,
          score: 12,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "5d28a093cbb3-4402b16d-29409791a240",
          title: "Create a Function",
          description:
            "Write a function 'getNationalBird' to return the national bird of India. \n The national bird of India is the 'Peacock'.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
         
              <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The Output should be a single line containing the national bird of the India.</p>
              </div>
          </div>
           `,
          sampleInput: "",
          sampleOutput: " Peacock ",

          testCases: [
            {
              input: "",
              output: "Peacock",
              visible: true,
            },
          ],

          defaultCode: `/*
 * Write your code here and return the output.
 */
/*
 * Write your code here and return the output.
 */



let nationalBird = getNationalBird();
console.log(nationalBird);

 `,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "8c4bad15-52fa4bf5943f-d25df3018003",
          title: "Passing an Argument to the Function",
          description:
            "Given a function (greetWithName) in the prefilled code. \n Log the value returned by the function (greetWithName) by passing the given name (personName) as an argument to it.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain a string (personName).</p>
              </div>
              <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The Output should be a single line containing the greeting message with name (personName).</p>
              </div>
          </div>
           `,
          sampleInput: "Bharath",
          sampleOutput: " Hi Bharath ",

        testCases: [
  {
    input: "Bharath",
    output: "Hi Bharath",
    visible: true,
  },
],

          defaultCode: `"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_) => {
  inputString = inputString
    .trim()
    .split("\n")
    .map((str) => str.trim());

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function main() {
  // personName
  let personName = readLine();

  // function greetWithName
  function greetWithName(personName) {
    let greetings  = "Hi " + personName;
    return greetings;
  }

  /*
   * Write your code here and log the output.
   */
  
}

 `,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
  ],
};
