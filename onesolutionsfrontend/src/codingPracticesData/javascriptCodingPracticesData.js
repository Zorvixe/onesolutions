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
    //coding practice - 5
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
    //coding practice - 6
    {
      id: "javascript-coding-practice-6",
      title: "Javascript Coding Practice 6",
      description: "",
      questions: [
        {
          id: "ed915af8-2fvjfssbnkfbvj446d9-0d115kkf8eb19",
          title: "User Profile",
          description:
            "In this assignment, let's build a User Profile Page by applying the concepts we learned till now.",
          difficulty: "Easy",
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
                <div class="profile-container" id="profileContainer">
                    <div id="imgContainer"></div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .profile-container {
                color: white;
                background-color: #b990ff;
                height: 100vh;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768802333/user-profile-v1_bzbtjs.png" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                    <li>
                      <span>
                        Use the values of the <code>profileDetails</code> object mentioned in the JS
                        prefilled code to fill the text/image content of the given design
                      </span>
                    </li>
                    <li>
                      <span>
                        Dynamically create the HTML elements as children to the HTML container
                        element with the id <code>profileContainer</code>
                      </span>
                    </li>
                    <li>
                      <span>
                        The text content of the HTML main heading element should be the value of the
                        <code>name</code> key given in the <code>profileDetails</code>
                      </span>
                    </li>
                    <li>
                      <span>
                        The HTML <code>src</code> attribute of the HTML <code>img</code> element
                        should have the value of the <code>imgSrc</code> key given in the
                        <code>profileDetails</code>
                      </span>
                    </li>
                    <li>
                      <span>
                        The text content of the HTML paragraph element should be the value of the
                        <code>age</code> key given in the <code>profileDetails</code>
                      </span>
                    </li>
                  </ol>
                
                    <div class="Note-container">
                    <div class="icon-note">
                      <h6>
                        <i class="bi bi-journal-text"></i>Note
                      </h6>
                    </div>
                    <p>
                      <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                        <li>
                        Write the code without deleting the prefilled code.
                        </li>
                        <li>
                        Try to achieve the design as close as possible.
                        </li>
                      </ul>
                    </p>
                  </div>
                  <hr>
                  <p class="desc-que-blue">Resources</p>
                  <p class="desc-que-blue">CSS Font families used:</p>
                  <ul>
                  <li>Roboto</li>
                  </ul>
                 
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
                "Page should consist of an HTML container element with the id profileContainer",
              type: "js-validation",
              input: "check-profileContainer",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description: "Page should consist of an HTML image element",
              type: "js-validation",
              input: "check-image",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML main heading element with the value of the name key given in the profileDetails object",
              type: "js-validation",
              input: "check-name",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML paragraph element with the value of the age key given in the profileDetails object",
              type: "js-validation",
              input: "check-age",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "ed916af8-2fvjlssbnkfbvj466d9-0d115kkf8eb19",
          title: "Todos Application",
          description:
            "In this assignment, let's build a Todos Application by applying the concepts we learned till now.",
          difficulty: "Easy",
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
                <script src="https://kit.fontawesome.com/5f59ca6ad3.js" crossorigin="anonymous"></script>
            </head>
            
            <body>
                <div class="todos-bg-container">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <h1 class="todos-heading">Todos</h1>
                                <h1 class="create-task-heading">
                                    Create <span class="create-task-heading-subpart">Task</span>
                                </h1>
                                <input type="text" id="todoUserInput" class="todo-user-input" placeholder="What needs to be done?" />
                                <button class="add-todo-button" id="addTodoButton">Add</button>
                                <h1 class="todo-items-heading">
                                    My <span class="todo-items-heading-subpart">Tasks</span>
                                </h1>
                                <ul class="todo-items-container" id="todoItemsContainer"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .todos-bg-container {
                background-color: #f9fbfe;
                height: 100vh;
            }
            
            .todos-heading {
                text-align: center;
                font-family: "Roboto";
                font-size: 46px;
                font-weight: 500;
                margin-top: 20px;
                margin-bottom: 20px;
            }
            
            .create-task-heading {
                font-family: "Roboto";
                font-size: 32px;
                font-weight: 700;
            }
            
            .create-task-heading-subpart {
                font-family: "Roboto";
                font-size: 32px;
                font-weight: 500;
            }
            
            .todo-items-heading {
                font-family: "Roboto";
                font-size: 32px;
                font-weight: 700;
            }
            
            .todo-items-heading-subpart {
                font-family: "Roboto";
                font-size: 32px;
                font-weight: 500;
            }
            
            .todo-items-container {
                margin: 0;
                padding: 0;
            }
            
            .todo-item-container {
                margin-top: 15px;
            }
            
            .todo-user-input {
                background-color: white;
                width: 100%;
                border-style: solid;
                border-width: 1px;
                border-color: #e4e7eb;
                border-radius: 10px;
                margin-top: 10px;
                padding: 15px;
            }
            
            .add-todo-button {
                color: white;
                background-color: #4c63b6;
                font-family: "Roboto";
                font-size: 18px;
                border-width: 0;
                border-radius: 4px;
                margin-top: 20px;
                margin-bottom: 50px;
                padding-top: 5px;
                padding-bottom: 5px;
                padding-right: 20px;
                padding-left: 20px;
            }
            
            .label-container {
                background-color: #e6f6ff;
                width: 100%;
                border-style: solid;
                border-width: 5px;
                border-color: #096f92;
                border-right: none;
                border-top: none;
                border-bottom: none;
                border-radius: 4px;
            }
            
            .checkbox-input {
                width: 20px;
                height: 20px;
                margin-top: 12px;
                margin-right: 12px;
            }
            
            .checkbox-label {
                font-family: "Roboto";
                font-size: 16px;
                font-weight: 400;
                width: 82%;
                margin: 0;
                padding-top: 10px;
                padding-bottom: 10px;
                padding-left: 20px;
                padding-right: 20px;
                border-radius: 5px;
            }
            
            .delete-icon-container {
                text-align: right;
                width: 18%;
            }
            
            .delete-icon {
                padding: 15px;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768809014/todo-application-part-1-v1_dpt7y6.png" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                    <li>
                      <span>
                        The Todos Application is built and given in the prefilled code. Add the todo
                        items to it using JavaScript.
                      </span>
                    </li>
                    <li>
                      <span>Practice adding a single todo item using JavaScript</span>
                    </li>
                    <li>
                      <span>Practice adding a checkbox with the label using JavaScript</span>
                    </li>
                    <li>
                      <span>Practice adding a delete icon using JavaScript</span>
                    </li>
                    <li>
                      <span>
                        Practice adding multiple todo items using JavaScript with the array of todo
                        objects given in the prefilled code using <code>for...of</code> loop
                      </span>
                    </li>
                  </ol>

                  <div className="Warning-container">
                  <div>
                    <h5>
                      <i class="bi bi-exclamation-triangle"></i>Warning
                    </h5>
                  </div>
                  <ul style={{ marginLeft: "1.5rem" }}>
                    <li>
                    Do not delete the prefilled code.
                    </li>
                  </ul>
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
              description: "Page should consist of an HTML input element",
              type: "js-validation",
              input: "check-input-element",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML unordered list element",
              type: "js-validation",
              input: "check-ul-element",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of at least an HTML list item element",
              type: "js-validation",
              input: "check-li-element",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML checkbox input element",
              type: "js-validation",
              input: "check-checkbox-element",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description: "Page should consist of an HTML label element",
              type: "js-validation",
              input: "check-label-element",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 7
    {
      id: "javascript-coding-practice-7",
      title: "Javascript Coding Practice 7",
      description: "",
      questions: [
        {
          id: "ed918af8-2fvjfssbnkfbvj486d9-0d1095kkf8eb19",
          title: "Add to Cart Page",
          description:
            "In this assignment, let's build an Add To Cart Page by applying the concepts we learned till now.",
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
                <div class="container pt-4">
                    <div class="row">
                        <h1 class="col-12 heading">Add To Cart</h1>
                        <div class="col-12 d-flex flex-row justify-content-center mt-4 mb-4">
                            <input type="text" class="w-50" id="cartItemTextInput" />
                            <button class="btn btn-primary ml-3" id="addBtn" onclick="onAddCartItem()">Add</button>
                        </div>
                        <h1 class="col-12 heading cart-items-heading">My Cart items</h1>
                        <ul class="col-12 d-flex flex-column mt-4 cart-items-container" id="cartItemsContainer"></ul>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .heading {
                font-family: "Roboto";
                text-align: center;
            }
            
            .cart-items-heading {
                text-align: center;
                font-size: 20px;
            
            }
            
            .cart-items-container {
                text-align: center;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768970164/shopping-cart-v1_gwqsmk.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                    <li>
                    <span>
                      Achieve the design with HTML and CSS and apply the functionality using JavaScript.
                    </span>
                  </li>
                  <li>
                    <span>
                      Add the HTML elements in the HTML container element with the class name <code>row</code>.
                    </span>
                  </li>
                  <li>
                    <span>
                      The HTML input element should have the id <code>cartItemTextInput</code>.
                    </span>
                  </li>
                  <li>
                    <span>
                      The HTML button element should have the id <code>addBtn</code>.
                    </span>
                  </li>
                  <li>
                    <span>
                      Cart items should be added as HTML <code>li</code> elements.
                    </span>
                  </li>
                  </ol>
                <hr>
                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                  <li>
                       <strong>When <code>addBtn</code> is clicked</strong>
                    <ul>
                      <li>
                      Create an HTML li element with the value entered in the HTML input element with the id cartItemTextInput.
                      </li>
                    </ul>
                  </li>
                </ul>

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
                <p class="desc-que-blue">Concepts Review</p>
                <p class="">Want to quickly review some of the concepts you've been learning?</p>
                <p class="">Take a look at the Cheat Sheets.</p>
                        
                  </div>
                `,
          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with the class name row",
              type: "js-validation",
              input: "check-row-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML input element with the id cartItemTextInput",
              type: "js-validation",
              input: "check-cart-input",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML button element with the id addBtn",
              type: "js-validation",
              input: "check-add-button1",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the HTML button element with the id addBtn is clicked, the value of cartItemTextInput should be added as the list item",
              type: "js-validation",
              input: "check-add-item",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "The HTML container element with the class name row should have atleast an HTML child element",
              type: "js-validation",
              input: "check-row-child",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 8
    {
      id: "javascript-coding-practice-8",
      title: "Javascript Coding Practice 8",
      description: "",
      questions: [
        {
          id: "ed919af8-2fvjfggbnkkbvj486d9-0d10325kkf8eb19",
          title: "Toggle the Strike Through",
          description:
            "In this assignment, let's build a Toggle the Strike Through by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 35,
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
                <div class="p-5" id="checkBoxWithLabelContainer"></div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .strike {
                text-decoration: line-through;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768974207/toggle-strike-through-v1_vqvb7t.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                    <li>
                    <span>
                    Dynamically add the HTML checkbox input and the label elements in the HTML container element with the id checkBoxWithLabelContainer using JavaScript without writing the HTML Code.
                    </span>
                  </li>
                  <li>
                    <span>
                    The HTML checkbox input element should have the id checkbox.
                    </span>
                  </li>
                  <li>
                    <span>
                    The HTML label element should have the id checkboxLabel.
                    </span>
                  </li>
                  <li>
                    <span>
                    The id of the HTML checkbox input element and the value of the HTML label element's for attribute should be the same.
                    </span>
                  </li>
                  </ol>
                <hr>
                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                  <li>
                       <strong>When the <code>checkbox</code> or <code>checkboxLabel</code> is clicked</strong>
                    <ul>
                      <li>
                      The status of the HTML checkbox input element with the id checkbox should change.
                      </li>
                      <li>
                      The text in the HTML label element with the id checkboxLabel is strike through if the checkbox is checked as shown in the image.
                      </li>
                    </ul>
                  </li>
                </ul>

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
                <p class="desc-que-blue">Concepts Review</p>
                <p class="">Want to quickly review some of the concepts you've been learning?</p>
                <p class="">Take a look at the Cheat Sheets.</p>
                        
                  </div>
                `,
          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with the id checkBoxWithLabelContainer",
              type: "js-validation",
              input: "check-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML checkbox input element with the id checkbox",
              type: "js-validation",
              input: "check-checkbox",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML label element with the id checkboxLabel",
              type: "js-validation",
              input: "check-label",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the HTML checkbox input element with the id checkbox is clicked, the text in the HTML label element is strike through if the checkbox is checked",
              type: "js-validation",
              input: "check-checkbox-strike",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "When the HTML label element with the id checkboxLabel is clicked, the text in the HTML label element is strike through if the checkbox is checked",
              type: "js-validation",
              input: "check-label-strike",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "ed922af8-2fvjfgbnkkbvj486d9-0d12325kkf8eb19",
          title: "Your Ordered Items",
          description:
            "In this assignment, let's build Your Ordered Items Page by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 50,
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
                <div id="orderedItemsContainer">
                    <h1 class="heading">Your Order Items</h1>
                    <ul id="itemsListContainer"></ul>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .heading {
                font-family: "Roboto";
                font-size: 25px;
                font-weight: 500;
                text-align: center;
                padding-top: 50px;
            }
            
            .items-list-container {
                margin: 0;
                padding: 4;
                list-style-type: none;
            }
            
            .ordered-item {
                font-family: "Roboto";
                font-size: 15px;
                padding: 10px;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768975768/your-ordered-items-v1_jcszek.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                    <li>
                      <span>
                        Add the HTML main heading and the unordered list elements in the HTML
                        container element with the id <code>orderedItemsContainer</code> using HTML.
                      </span>
                    </li>
                    <li>
                      <span>
                        Dynamically add the ordered items as HTML <code>li</code> elements in the
                        HTML <code>ul</code> element.
                      </span>
                    </li>
                    <li>
                      <span>
                        Each ordered item and the button should have a unique id.
                      </span>
                    </li>
                    <li>
                      <span>
                        The id for the ordered item should be in the format
                        <code>item</code> + <code>uniqueNo</code> (Example: item1, item2, item3, etc.).
                      </span>
                    </li>
                    <li>
                      <span>
                        The id for the button should be in the format
                        <code>button</code> + <code>uniqueNo</code> (Example: button1, button2, button3, etc.).
                      </span>
                    </li>
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
                       When the Cancel button is clicked, remove the respective ordered item as shown in the image.
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
                    Use the <code>removeChild()</code> method to delete the ordered items.
                    </li>
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
                "Page should consist of an HTML container element with the id orderedItemsContainer",
              type: "js-validation",
              input: "check-ordered-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML main heading element",
              type: "js-validation",
              input: "check-heading",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML unordered list element",
              type: "js-validation",
              input: "check-ul",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML list item element with the id item2",
              type: "js-validation",
              input: "check-item2",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML button element with the id button3",
              type: "js-validation",
              input: "check-button3",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 9
    {
      id: "javascript-coding-practice-9",
      title: "Javascript Coding Practice 9",
      description: "",
      questions: [
        {
          id: "ed913af8-2fkfssbnkfbvj486d9-0d1795kkf8eb19",
          title: "Movie Reviews",
          description:
            "In this assignment, let's build a Movie Reviews page by applying the concepts we learned till now.",
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
                <div class="container pt-4" id="movieReviewsContainer">
                    <div class="row">
                        <h1 class="col-12 text-center reviews-heading">Movie Reviews</h1>
                        <div class="col-12 mb-4">
                            <label for="titleInput" class="input-label">MOVIE TITLE</label>
                            <input type="text" class="w-100 title-input" id="titleInput" placeholder="Enter a movie title" />
                            <label for="reviewTextarea" class="input-label">YOUR REVIEW</label>
                            <textarea class="w-100 p-2 review-textarea" id="reviewTextarea" rows="5" placeholder="Enter your review"></textarea>
                            <div class="d-flex flex-row justify-content-end mt-3">
                                <button class="btn btn-primary" id="addBtn" onclick="onAddReview()">Add</button>
                            </div>
                        </div>
                        <div class="col-12 mt-4" id="reviewsContainer"></div>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .reviews-heading {
                color: #2d3a35;
                font-family: "Roboto";
                font-size: 36px;
                font-weight: 700;
            }
            
            .input-label {
                color: #7b8794;
                font-family: "Roboto";
                font-size: 12px;
                font-weight: bold;
                margin-top: 16px;
                margin-bottom: 6px;
            }
            
            .title-input {
                font-family: "Roboto";
                height: 40px;
                border-style: solid;
                border-width: 1px;
                border-color: #cbd2d9;
                border-radius: 4px;
                padding-left: 12px;
            }
            
            .review-textarea {
                color: #2d3a35;
                font-family: "Roboto";
                border-style: solid;
                border-width: 1px;
                border-color: #cbd2d9;
                border-radius: 4px;
            }
            
            .movie-title {
                font-weight: bold;
                font-size: 18px;
                margin-bottom: 16px;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768984192/movie-reviews-v1_go6tcu.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                    <li>
                    <span>
                    Add the HTML elements in the HTML container element with id movieReviewsContainer using HTML
                    </span>
                  </li>
                  <li>
                    <span>
                    The HTML input element should have the id titleInput
                    </span>
                  </li>
                  <li>
                    <span>
                    The HTML textarea element should have the id reviewTextarea
                    </span>
                  </li>
                  <li>
                    <span>
                    The HTML button element should have the id addBtn
                    </span>
                  </li>
                  <li>
                    <span>
                    Dynamically add the movie reviews in the HTML div container element with the id reviewsContainer
                    </span>
                  </li>
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
                       <strong>When <code>addBtn</code> is clicked</strong>
                    <ul>
                      <li>
                      If the value of the HTML input element with the id titleInput is empty, show an alert to enter the movie title.
                      </li>
                      <li>
                      If the value of the HTML input element with the id titleInput is not empty
                      <ul>
                      <li>
                      Add the text entered in titleInput and reviewTextarea to the reviewsContainer.
                      </li>
                      <li>Make the values of titleInput and reviewTextarea empty.</li>
                      </ul>
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
                      Try to achieve the design as close as possible.
                    </li>
                    <li>
                    Achieve the design with HTML, CSS, and functionality with JS.
                    </li>
                  </ul>
                </p>
              </div>

              <p class="desc-que-blue">Resources</p>

              <p class="desc-que-blue">CSS Colors used:</p>
              <div  class="desc-colors c2d3a35">#2d3a35</div>
              <div  class="desc-colors c7b8794">#7b8794</div>
              <div  class="desc-colors ccbd2d9">#cbd2d9</div>
              
              <p class="desc-que-blue">CSS Font families used:</p>
              <ul><li>Roboto</li></ul>
                     
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
                "Page should consist of an HTML container element with the id movieReviewsContainer",
              type: "js-validation",
              input: "check-movie-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML input element with the id titleInput",
              type: "js-validation",
              input: "check-title-input",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML textarea element with the id reviewTextarea",
              type: "js-validation",
              input: "check-review-textarea",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML button element with the id addBtn",
              type: "js-validation",
              input: "check-add-button",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML div container element with the id reviewsContainer",
              type: "js-validation",
              input: "check-reviews-container",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "When the HTML button element with the id addBtn is clicked, the text entered in the titleInput and reviewTextarea elements should be added to the reviewsContainer",
              type: "js-validation",
              input: "check-add-review",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 10
    {
      id: "javascript-coding-practice-10",
      title: "Javascript Coding Practice 10",
      description: "",
      questions: [
        {
          id: "ed955af8-2fkfsccnkfbvj486d9-0d19795kkf8eb19",
          title: "Greeting Card",
          description:
            "In this assignment, let's build a Greeting Card by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 35,
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
                <div class="greeting-card-container">
                    <div class="text-right">
                        <p class="greet" id="greetFrom"></p>
                        <p class="greet" id="greetTo"></p>
                    </div>
                    <div class="greet-text-container d-flex flex-column justify-content-center">
                        <h1 class="heading">Happy <br /><span class="new-year">New Year</span></h1>
                        <p class="greet-text mt-4" id="greetText"></p>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .greeting-card-container {
                background-image: url("https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768992371/greet_gp2app.jpg");
                background-size: cover;
                height: 100vh;
                padding: 20px;
            }
            
            .greet {
                color: #1f2933;
                font-family: "DM Sans";
                font-weight: bold;
            }
            
            .heading {
                color: #1f2933;
                font-family: "Playfair Display";
                font-size: 50px;
                font-weight: 500;
            }
            
            .new-year {
                font-size: 75px;
            }
            
            .greet-text-container {
                text-align: center;
                height: 80vh;
            }
            
            .greet-text {
                color: #323f4b;
                font-family: "Roboto";
                font-size: 24px;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768986026/greeting-card-v1_z3ntte.png" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                    <li>
                    <span>
                    Parse the JSON string greeting given in the JS prefilled code
                    </span>
                  </li>
                  <li>
                    <span>
                    Fill the text content of the HTML paragraph elements with the class name greet with the values of the from and to keys given in the greeting string respectively using JavaScript
                    </span>
                  </li>
                  <li>
                    <span>
                    Fill the text content of the HTML paragraph element with the class name greet-text with the value of the greetText key given in the greeting string using JavaScript
                    </span>
                  </li>
                  </ol>
              
                <hr>

                <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                   
                    <li>
                    Write the code without deleting the prefilled code.
                    </li>
                    <li>
                    Use the JSON method JSON.parse to parse the JSON string.
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
                "Page should consist of an HTML container element with the class name greeting-card-container",
              type: "js-validation",
              input: "check-greeting-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "The HTML container element with the class name greeting-card-container should have the value of the 'greetText' key of greeting object",
              type: "js-validation",
              input: "check-greet-text",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "The HTML container element with the class name greeting-card-container should have the value of the 'from' key of greeting object",
              type: "js-validation",
              input: "check-from-text",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "The HTML container element with the class name greeting-card-container should have the value of the 'to' key of greeting object",
              type: "js-validation",
              input: "check-to-text",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practices - 11
    {
      id: "javascript-coding-practice-11",
      title: "Javascript Coding Practice 11",
      description: "",
      questions: [
        {
          id: "ed988af8-2fkfsgbnkfbvj486d9-0d19685kkf8eb19",
          title: "Splice Playground",
          description:
            "In this assignment, let's build a Splice Playground by applying the concepts we learned till now.",
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
                <div class="container pt-5">
                    <div class="row">
                        <h1 class="playground-heading col-12 text-center">Splice Playground</h1>
                        <div class="col-4 mt-4 mb-4">
                            <label class="input-label">START INDEX</label>
                            <input type="text" class="user-input" placeholder="1" id="startIndexInput" />
                        </div>
                        <div class="col-4 mt-4 mb-4">
                            <label class="input-label">DELETE COUNT</label>
                            <input type="text" class="user-input" placeholder="0" id="deleteCountInput" />
                        </div>
                        <div class="col-4 mt-4 mb-4">
                            <label class="input-label">ITEM TO ADD</label>
                            <input type="text" class="user-input" placeholder="2" id="itemToAddInput" />
                        </div>
                        <div class="col-12 text-center mb-4">
                            <button class="btn btn-primary" id="spliceBtn">Splice</button>
                        </div>
                        <h1 class="col-12 updated-array-heading">Updated Array</h1>
                        <div class="col-12 updated-array-container">
                            <span class="updated-array" id="updatedArray"></span>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .playground-heading {
                color: #2d3a35;
                font-family: "Roboto";
                font-size: 36px;
                font-weight: 700;
            }
            
            .input-label {
                text-align: center;
                color: #7b8794;
                font-family: "Roboto";
                font-size: 12px;
                font-weight: bold;
            }
            
            .user-input {
                text-align: center;
                height: 40px;
                width: 100%;
                border-style: solid;
                border-width: 1px;
                border-color: #cbd2d9;
                border-radius: 4px;
            }
            
            .updated-array-heading {
                font-family: "Roboto";
                font-weight: 600;
                font-size: 18px;
            }
            
            .updated-array-container {
                background-color: #f3f3f3;
                padding: 20px;
            }
            
            .updated-array {
                font-family: "Bree Serif";
                font-size: 16px;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768993108/splice-playground-v1_kagp69.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                    <li>
                    <span>
                    Add the ids <code>startIndexInput,</code> <code>deleteCountInput,</code> and <code>itemToAddInput</code> to the HTML input elements correspondingly
                    </span>
                  </li>
                  <li>
                    <span>
                    Add an id <code>spliceBtn</code> to the HTML button element
                    </span>
                  </li>
                  <li>
                    <span>
                    Add an id <code>updatedArray</code> to the HTML span element with the class name updatedArray
                    </span>
                  </li>
                  </ol>
                  <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                      <li>Stringify the array given in the JS prefilled code using the <code>JSON.stringify</code> method</li>
                      <li>Fill the text content of the HTML span element with the id updatedArray with the stringified array</li>
                      <li><strong>When spliceBtn is clicked,</strong>
                      <ul>
                      <li>If the value of the startIndexInput is empty, show an alert message to enter the start index</li>
                      <li>If the value of the startIndexInput is not empty, update the array using splice() method by passing the startIndexInput, deleteCountInput and itemToAddInput values</li>
                      <li>Stringify the updated array and update the text content of the HTML span element with the id updatedArray</li>

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
                    Write the code without deleting the prefilled code.
                    </li>
                    <li>
                    You can use the JSON <code>JSON.stringify</code> method to convert the array into a string.
                    </li>
                    <li>If the value of the <code>deleteCountInput</code> is empty, assign the delete count to 0.
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
                "Page should consist of an HTML input element with the id startIndexInput",
              type: "js-validation",
              input: "check-start-index-input",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML input element with the id deleteCountInput",
              type: "js-validation",
              input: "check-delete-count-input",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML input element with the id itemToAddInput",
              type: "js-validation",
              input: "check-item-to-add-input",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML button element with the id spliceBtn",
              type: "js-validation",
              input: "check-splice-button",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML span element with the id updatedArray",
              type: "js-validation",
              input: "check-updated-array",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "When the HTML button element with the id spliceBtn is clicked, the updated array should be displayed if the startIndexInput is not empty",
              type: "js-validation",
              input: "check-splice-functionality",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "ed944af8-2fkfsgbnUUbvj486d9-0d19685kkf8eb19",
          title: "Find the Index of the Numbers",
          description:
            "In this assignment, let's find the index of the numbers by applying the concepts we learned till now.",
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
                <div class="container pt-5">
                    <div class="row">
                        <h1 class="playground-heading col-12 text-center">Find the Index of the Numbers</h1>
                        <div class="col-12 mt-4 mb-4">
                            <p class="default-array text-center">[ 17, 31, 77, 20, 63 ]</p>
                        </div>
                        <div class="col-12 d-flex flex-row justify-content-center mb-5">
                            <input type="text" class="user-input w-50 pl-2" placeholder="Enter a number" id="userInput" />
                            <button class="btn btn-primary ml-3" onclick="findIndexOfNumber()" id="findBtn">Find</button>
                        </div>
                        <h1 class="index-of-number-heading">Index of number:</h1>
                        <div class="col-12 index-of-number-container text-center">
                            <span class="index-of-number" id="indexOfNumber"></span>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .playground-heading {
                color: #2d3a35;
                font-family: "Roboto";
                font-size: 36px;
                font-weight: 700;
            }
            
            .default-array {
                color: #2d3a35;
                font-family: "Bree Serif";
                font-size: 24px;
            }
            
            .user-input {
                height: 40px;
                width: 100%;
                border-style: solid;
                border-width: 1px;
                border-color: #cbd2d9;
                border-radius: 4px;
            }
            
            .index-of-number-heading {
                font-family: "Roboto";
                font-size: 22px;
                font-weight: 600;
            }
            
            .index-of-number-container {
                color: #795e26;
                background-color: #f3f3f3;
                padding: 20px;
                margin-top: 10px;
            }
            
            .index-of-number {
                color: #795e26;
                font-family: "Bree Serif";
                font-size: 36px;
                font-weight: 800;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1768995612/find-index-of-number-v1_tjr59l.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                    <li>
                    <span>
                    Add an id userInput to the HTML input element
                    </span>
                  </li>
                  <li>
                    <span>
                    Add an id findBtn to the HTML button element
                    </span>
                  </li>
                  <li>
                    <span>
                    Add an id indexOfNumber to the HTML span element with the class name index-of-number
                    </span>
                  </li>
                  </ol>
                  <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                      <li><strong>When spliceBtn is clicked,</strong>
                      <ul>
                      <li>Find the index of the value entered in the HTML input element with the id <code>userInput</code> using <code>findIndex</code> method</li>
                      <li>Fill the text content of the HTML span element with the id <code>indexOfNumber</code> with the index found using <code>findIndex</code> method</li>
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
                   <ul>
                    <li>
                    Write the code without deleting the prefilled code.
                    </li>
                    <li>
                    Use the findIndex method to find the index of the numbers in an array
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
                "Page should consist of an HTML input element with the id userInput",
              type: "js-validation",
              input: "check-user-input",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML button element with the id findBtn",
              type: "js-validation",
              input: "check-find-button",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML span element with the id indexOfNumber",
              type: "js-validation",
              input: "check-index-span",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the HTML button element with the id findBtn is clicked, the index of the userInput value should be displayed in indexOfNumber element if it is present in the array",
              type: "js-validation",
              input: "check-index-present",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "When the HTML button element with the id findBtn is clicked, -1 should be displayed in the indexOfNumber element if the userInput value is not present in the array",
              type: "js-validation",
              input: "check-index-not-present",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 12
    {
      id: "javascript-coding-practice-12",
      title: "Javascript Coding Practice 12",
      description: "",
      questions: [
        {
          id: "ed951af8-2fzzsccnkfbvj486d9-0d19795kkeb19",
          title: "Remove Item in Local Storage Practice",
          description:
            "In this assignment, let's practice Remove Item in Local Storage by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 30,
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
                <div class="p-5">
                    <div class="mt-3 mb-3 text-center">
                        <input type="text" id="input" />
                        <button class="btn btn-primary" id="saveBtn">Save</button>
                        <button class="btn btn-primary" id="clearBtn">Clear</button>
                    </div>
                    <h1 class="heading text-center">Click on clear to remove the text in the HTML input element.</h1>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .heading {
                font-family: "Roboto";
                font-size: 24px;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769059132/clear-the-input-v1_nblldl.gif" class="desc-que-img" />

                    <p class="">Achieve the given functionality to the given prefilled code.</p>
                    <ul>
                        <li>When the HTML button element with the id clearBtn is clicked
                        <ul>
                        <li>Make the value of the HTML input element empty.</li>
                        <li>Remove the key userInput in the local storage using the removeItem method.</li>
                        </ul>
                        </li>
                    </ul>

                    <div className="Warning-container">
                    <div>
                      <h5>
                        <i class="bi bi-exclamation-triangle"></i>Warning
                      </h5>
                    </div>
                    <ul style={{ marginLeft: "1.5rem" }}>
                      <li>
                      Do not delete the prefilled code.
                      </li>
                    </ul>
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
                "Page should consist of an HTML button element with the id clearBtn",
              type: "js-validation",
              input: "check-clear-button",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML input element with the HTML id attribute value as input and HTML type attribute value as text",
              type: "js-validation",
              input: "check-input-text",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "When the HTML button element with the id clearBtn is clicked, the HTML input element should be empty",
              type: "js-validation",
              input: "check-clear-input",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the HTML button element with the id clearBtn is clicked, the key 'userInput' in the local storage should be removed",
              type: "js-validation",
              input: "check-clear-localstorage",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 13
    {
      id: "javascript-coding-practice-13",
      title: "Javascript Coding Practice 13",
      description: "",
      questions: [
        {
          id: "ed951af8-2fxxsccnkfbvj486d9-0dm9795kkeb19",
          title: "Chatbot",
          description:
            "In this assignment, let's build a Chatbot by applying the concepts we learned till now.",
          difficulty: "Medium",
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
                <script src="https://kit.fontawesome.com/5f59ca6ad3.js" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
            </head>
            
            <body>
                <div class="p-2">
                    <h1 class="text-center chatbot-heading">Meet our Chatbot</h1>
                    <img class="image" src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769065282/bot1_zc5sr6.png" />
                    <div class="chat-container" id="chatContainer"></div>
                    <div class="d-flex flex-row justify-content-end">
                        <img class="image" src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769065411/bot2_sikly9.png" />
                    </div>
                    <div class="d-flex flex-row justify-content-center fixed-bottom">
                        <input class="user-input" id="userInput" />
                        <button class="send-msg-btn" id="sendMsgBtn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .chatbot-heading {
                color: #323f4b;
                font-family: "Roboto";
                font-size: 30px;
            }
            
            .image {
                width: 150px;
            }
            
            .chat-container {
                padding: 10px;
            }
            
            .msg-to-chatbot-container {
                text-align: right;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            
            .msg-to-chatbot {
                background-color: #cbd2d9;
                font-family: "Roboto";
                font-weight: 900;
                border-radius: 16px;
                padding: 10px;
            }
            
            .msg-from-chatbot-container {
                margin-top: 10px;
                margin-bottom: 10px;
            }
            
            .msg-from-chatbot {
                color: white;
                background-color: #e57742;
                font-family: "Roboto";
                font-weight: 900;
                border-radius: 16px;
                padding: 10px;
            }
            
            .user-input {
                background-color: #cbd2d9;
                font-family: "Roboto";
                font-weight: 900;
                height: 52px;
                border-width: 0;
                border-radius: 5px;
                margin: 8px;
                padding: 15px;
            }
            
            .send-msg-btn {
                background-color: #cbd2d9;
                font-family: "Roboto";
                height: 52px;
                border-width: 0;
                border-radius: 10px;
                margin: 8px;
                padding-left: 25px;
                padding-right: 25px;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769061589/chatbot-v1_mycazl.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                       <li><span>The HTML container element with the class name chat-container should have the id chatContainer</span></li>
                       <li><span>The HTML input element with the class name user-input should have the id userInput</span></li>
                     </ol>

                    <div className="Warning-container">
                    <div>
                      <h5>
                        <i class="bi bi-exclamation-triangle"></i>Warning
                      </h5>
                    </div>
                    <ul style={{ marginLeft: "1.5rem" }}>
                      <li>
                      Do not delete the prefilled code.
                      </li>
                    </ul>
                  </div>
                  <hr>

                    <p class="">By following the above instructions, achieve the given functionality.</p>
                    <ul>
                        <li>When the HTML <code>button</code> element with the id sendMsgBtn is clicked,
                        <ul>
                        <li>The text entered in the userInput should display in the chatContainer.</li>
                        <li>The userInput should be empty.</li>
                        <li>Reply from the chatbot also should display in the chatContainer.</li>
                        </ul>
                        </li>
                        <li>You can use the below class names that are listed in the CSS to create a message dynamically.
                        <ul>
                        <li>msg-to-chatbot-container</li>
                        <li>msg-to-chatbot</li>
                        <li>msg-from-chatbot-container</li>
                        <li>msg-from-chatbot</li>
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
                <p class="desc-que-blue">Concepts Review</p>
                <p class="">Want to quickly review some of the concepts you've been learning?</p>
                <p class="">Take a look at the Cheat Sheets.</p>
                        
                  </div>
                `,
          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML Container Element with the id chatContainer",
              type: "js-validation",
              input: "check-chat-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML input element with the id userInput",
              type: "js-validation",
              input: "check-user-input1",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "When the sendMsgBtn is clicked, the text entered in the userInput should display in the chatContainer",
              type: "js-validation",
              input: "check-user-message-display",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the sendMsgBtn is clicked, the text entered in the userInput should display in the chatContainer and the userInput should be empty",
              type: "js-validation",
              input: "check-user-input-clear",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "When the sendMsgBtn is clicked, the chatbot should reply to the text entered in the userInput",
              type: "js-validation",
              input: "check-bot-reply",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 14
    {
      id: "javascript-coding-practice-14",
      title: "Javascript Coding Practice 14",
      description: "",
      questions: [
        {
          id: "ed951af8-2fxxsgnnkfbvj486d9-0dm56795kkeb19",
          title: "Clear the Counter Timer",
          description:
            "In this assignment, let's Clear the Counter Timer by applying the concepts we learned till now.",
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
                <div class="text-center pt-5">
                    <h1 class="heading text-center">Clear the counter timer</h1>
                    <p class="counter-value" id="counterValue"></p>
                    <button class="btn btn-danger" id="clearBtn">Clear</button>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .heading {
                font-family: "Roboto";
                font-size: 24px;
            }
            
            .counter-value {
                font-size: 36px;
                font-weight: bold;
            }`,
            javascript: `let clearBtnEl = document.getElementById("clearBtn");
            let counterValue = document.getElementById("counterValue");
            
            let counter = 0;
            
            let counterTimer = function() {
                counter = counter + 1;
                counterValue.textContent = counter;
            };
            
            let intervalId = setInterval(counterTimer, 1000);
            
            // Write your code here`,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769070659/clear-the-counter-timer-v1_rinixv.gif" class="desc-que-img" />
                      
                    <p class="">Achieve the given functionality to the given prefilled code.</p>
                    <ul>
                        <li>When the HTML button element with the id clearBtn is clicked,
                        <ul>
                        <li>Clear the counter timer using the clearInterval method.</li>
                        </ul>
                        </li>
                    </ul>
                 
                    <div className="Warning-container">
                    <div>
                      <h5>
                        <i class="bi bi-exclamation-triangle"></i>Warning
                      </h5>
                    </div>
                    <ul style={{ marginLeft: "1.5rem" }}>
                      <li>
                      Do not delete the prefilled code.
                      </li>
                    </ul>
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
                "Page should consist of an HTML container element with the bootstrap class name text-center",
              type: "js-validation",
              input: "check-text-center-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML paragraph element with the id counterValue",
              type: "js-validation",
              input: "check-counter-value",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML button element with the id clearBtn",
              type: "js-validation",
              input: "check-clear-button1",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "ed911af8-2fxxskknkfbvj486d9-0dm5643kkeb19",
          title: "Custom Range Counter",
          description:
            "In this assignment, let's build a Custom Range Counter by applying the concepts we learned till now.",
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
                <div class="container pt-3">
                    <div class="row">
                        <h1 class="col-12 heading text-center">Custom Range Counter</h1>
                        <div class="col-12 text-center">
                            <input type="text" placeholder="Enter From Value" class="w-50 mt-3 pl-2" id="fromUserInput" />
                            <input type="text" placeholder="Enter To Value" class="w-50 mt-3 pl-2" id="toUserInput" />
                            <br />
                            <button class="btn btn-primary mt-4" id="startBtn" onclick="onClickStart()">
                                Start
                            </button>
                            <p class="counter mt-4" id="counterText"></p>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .heading {
                color: #3e4c59;
                font-family: "Bree Serif";
                font-size: 24px;
            }
            
            .counter {
                font-size: 32px;
            }`,
            javascript: ``,
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769080238/run-counter-within-intervals-v1_boiyhq.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                    <ol class="ordered-unordered-lists">
                       <li><span>Add the ids <code>fromUserInput</code> and <code>toUserInput </code>to the HTML input elements correspondingly</span></li>
                       <li><span>Add an id <code>counterText</code> to the HTML paragraph element with the class name <code>counter</code></span></li>
                     </ol>
                      <hr>
                    <p class="">By following the above instructions, achieve the given functionality.</p>
                    <ul>
                        <li>When the HTML <code>button</code> element with the id <code>startBtn</code> is clicked,
                        <ul>
                        <li>If the values of fromUserInput or toUserInput are not empty, display the numbers from fromUserInput to toUserInput for each second in the HTML element with the id counterText.</li>
                        <li>If the value of fromUserInput or toUserInput is empty, show a corresponding alert message to enter the input value.</li>
                        </ul>
                        </li>
                    </ul>
                 
                    <div className="Warning-container">
                    <div>
                      <h5>
                        <i class="bi bi-exclamation-triangle"></i>Warning
                      </h5>
                    </div>
                    <ul style={{ marginLeft: "1.5rem" }}>
                      <li>
                      Do not delete the prefilled code.
                      </li>
                    </ul>
                  </div>

                  <div class="Note-container">
                  <div class="icon-note">
                    <h6>
                      <i class="bi bi-journal-text"></i>Note
                    </h6>
                  </div>
                  <p>
                    <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>               
                      <li>
                      The fromUserInput and toUserInput values should be the numbers.
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
                "Page should consist of an HTML main heading element",
              type: "js-validation",
              input: "check-heading1",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML input element with the id fromUserInput",
              type: "js-validation",
              input: "check-from-input",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML input element with the id toUserInput",
              type: "js-validation",
              input: "check-to-input",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML button element with the id startBtn",
              type: "js-validation",
              input: "check-start-button",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML paragraph element with the id counterText",
              type: "js-validation",
              input: "check-counter-text",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "When the HTML button element with the id startBtn is clicked, if the 'fromUserInput' value is less than the 'toUserInput' value, the first value displayed in the HTML paragraph element with the id counterText should be the number entered in the 'fromUserInput'",
              type: "js-validation",
              input: "check-counter-start-value",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 15
    {
      id: "javascript-coding-practice-15",
      title: "Javascript Coding Practice 15",
      description: "",
      questions: [
        {
          id: "e195zx22-ab24faqqc88-050b9ddb",
          title: "Theme Switcher",
          description:
            "In this assignment, let's build a Theme Switcher by applying the concepts we learned till now.",
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
                <div class="bg-container d-flex flex-column justify-content-center text-center" id="bgContainer">
                    <h1 class="heading" id="heading">Dark or Light</h1>
                    <div class="mt-3">
                        <input type="text" class="user-input pl-2" id="themeUserInput" />
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .bg-container {
                background-image: url("https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769084537/change-theme-light-bg_j5lcz8.png");
                height: 100vh;
                background-size: cover;
            }
            
            .heading {
                color: #014d40;
                font-size: 48px;
                font-family: "Lobster";
            }
            
            .user-input {
                width: 150px;
            }`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769083732/change-theme-v1_qt6xo5.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>Add an id bgContainer to the HTML container element with the class name bg-container</span></li>
                        <li><span>Add an id heading to the HTML main heading element with the class name heading</span></li>
                        <li><span>Add an id themeUserInput to the HTML input element with the class name user-input</span></li>
                    </ol>


                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Do not delete the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                      <li>When the HTML button element with the season id is clicked, the season images in both the small and medium devices should change respectively.
                      <ul>
                      <li>Change the background image of the HTML container element with the id bgContainer correspondingly</li>
                      <li>Change the text color of the HTML main heading element with the id heading correspondingly</li>
                      </ul>
                      </li>
                      <li>When the value other than the Light or Dark is entered in the HTML input element and Enter key is pressed,</li>
                      <ul>
                      <li>Show an alert message to enter the valid theme</li>
                      </ul>
                </ul>

                <hr>

                  <p class="desc-que-blue">Resources</p>

              <p class="">Use the image URLs given below.</p>
              <p>URL: <a href="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769084537/change-theme-light-bg_j5lcz8.png" target="_blank">https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769084537/change-theme-light-bg_j5lcz8.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769084763/change-theme-dark-bg_ckjnhk.png" target="_blank">https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769084763/change-theme-dark-bg_ckjnhk.png</a></p>
                 
              <p class="desc-que-blue">Resources</p>

              <p class="desc-que-blue">CSS Colors used:</p>
              <div  class="desc-colors c014d40">#014d40
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
                "Page should consist of an HTML container element with the id bgContainer",
              type: "js-validation",
              input: "check-bg-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML main heading element with the id heading",
              type: "js-validation",
              input: "check-heading2",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML input element with the id themeUserInput",
              type: "js-validation",
              input: "check-theme-input",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 16
    {
      id: "javascript-coding-practice-16",
      title: "Javascript Coding Practice 16",
      description: "",
      questions: [
        {
          id: "e195ll22-ab24fiiqc88-051b9ddb",
          title: "HTTP Get Method Practice Page",
          description:
            "In this assignment, let's build an HTTP Get Method Practice Page by applying the concepts we learned till now.",
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
                <div class="p-3 bg-container">
                    <h1 class="heading mb-4">Get method practice</h1>
                    <p class="request-url-text">REQUEST URL: <span class="request-url">https://gorest.co.in/public-api/users</span></p>
                    <button class="mt-3 p-2 button" id="sendGetRequestBtn">Send Get Request</button>
                    <hr />
                    <div class="p-2 mt-4">
                        <p>Request Status</p>
                        <p class="request-status" id="requestStatus"></p>
                        <p class="d-none" id="loading">Loading....</p>
                    </div>
                    <hr />
                    <div class="p-2 mt-4">
                        <p>Response Body</p>
                        <p class="http-response" id="httpResponse"></p>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .bg-container {
                background-image: linear-gradient(to right, #4188da, #2be3c6);
            }
            
            .heading {
                color: #ffffff;
                font-weight: bold;
                font-size: 32px;
            }
            
            .request-url-text {
                color: #ffffff;
                font-weight: bold;
            }
            
            .request-url {
                font-weight: 300;
            }
            
            .button {
                color: #ffffff;
                background-color: #0967d2;
                font-size: 14px;
                border-width: 0;
                border-radius: 4px;
            }
            
            .request-status {
                color: #ffffff;
                font-family: "Roboto";
                font-size: 24px;
            }
            
            .http-response {
                color: #ffffff;
                font-family: "Roboto";
                font-size: 14px;
            }`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1769490001/http-get-method-v1_eyf1ub.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>Add the id sendGetRequestBtn to the HTML button element</span></li>
                        <li><span>Add the id requestStatus to the HTML paragraph element with the class name request-status</span></li>
                        <li><span>Add the id httpResponse to the HTML paragraph element with the class name http-response</span></li>
                    </ol>


                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Do not delete the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">Achieve the given functionality to the given prefilled code.</p>
                  <ul>
                      <li>When the HTML <code>button </code> element with the id <code>sendGetRequestBtn</code> is clicked,
                      <ul>
                      <li>Make HTTP Request (GET method) using Fetch with URL <code>https://gorest.co.in/public-api/users</code>
                    
                          <ul>
                          <li>Show loading while making HTTP request as shown in the image.</li>
                          <li>Set status code in the HTML paragraph element with the id requestStatus as shown in the image.</li>
                          <li>Set HTTP response in the HTML paragraph element with the id <code>httpResponse</code> as shown in the image.</li>
                          </ul>
                        </li>
                  </ul>

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
                "Page should consist of an HTML button element with the id sendGetRequestBtn",
              type: "js-validation",
              input: "check-send-btn",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML paragraph element with the id requestStatus",
              type: "js-validation",
              input: "check-request-status",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML paragraph element with the id httpResponse",
              type: "js-validation",
              input: "check-http-response",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the HTML button element with the id sendGetRequestBtn is clicked, the status code and HTTP Response should be in the HTML paragraph elements with the ids requestStatus and httpResponse respectively",
              type: "js-validation",
              input: "check-get-response",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "e190022-ac24fjjqc88-051s9ddb",
          title: "HTTP Post Method Practice Page",
          description:
            "In this assignment, let's build an HTTP Post Method Practice Page by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 50,
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
                <div class="p-3 bg-container">
                    <h1 class="heading mb-4">Post method practice</h1>
                    <p class="request-url-text">REQUEST URL: <span class="request-url">https://gorest.co.in/public-api/users</span></p>
                    <textarea placeholder="Enter Request Body" rows="5" class="w-100 p-2 request-body" id="requestBody"></textarea>
                    <button class="mt-3 p-2 button" id="sendPostRequestBtn">Send Post Request</button>
                    <hr />
                    <div class="p-2 mt-4">
                        <p>Request Status</p>
                        <p class="request-status" id="requestStatus"></p>
                        <p class="d-none" id="loading">Loading....</p>
                    </div>
                    <hr />
                    <div class="p-2 mt-4">
                        <p>Response Body</p>
                        <p class="http-response" id="httpResponse"></p>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .bg-container {
                background-image: linear-gradient(to right, #1cc8ef, #4fa5b2);
            }
            
            .heading {
                color: #ffffff;
                font-weight: bold;
                font-size: 32px;
            }
            
            .request-url-text {
                color: #ffffff;
                font-weight: bold;
            }
            
            .request-url {
                font-weight: 300;
            }
            
            .request-body {
                background-color: #ffffff;
                border-radius: 4px;
            }
            
            .button {
                color: #ffffff;
                background-color: #0552b5;
                font-size: 14px;
                border-width: 0;
                border-radius: 4px;
            }
            
            .request-status {
                color: #ffffff;
                font-family: "Roboto";
                font-size: 24px;
            }
            
            .http-response {
                color: #ffffff;
                font-family: "Roboto";
                font-size: 14px;
            }`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770701369/http-post-method-v1_njkccn.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>Add the id requestBody to the HTML textarea element</span></li>
                        <li><span>Add the id sendPostRequestBtn to the HTML button element</span></li>
                        <li><span>Add the id requestStatus to the HTML paragraph element with the class name request-status</span></li>
                        <li><span>Add the id httpResponse to the HTML paragraph element with the class name http-response</span></li>
                    </ol>


                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Do not delete the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">Achieve the given functionality to the given prefilled code.</p>
                  <ul>
                      <li>When the HTML <code>button </code> element with the id <code>sendGetRequestBtn</code> is clicked,
                      <ul>
                      <li>Make HTTP Request (POST method) using Fetch with URL <code>https://gorest.co.in/public-api/users</code>
                          <ul>
                          <li>Show loading while making HTTP request as shown in the image.</li>
                          <li>Set status code in the HTML <code>paragraph</code> element with the id <code>requestStatus</code> as shown in the image.</li>
                          <li>Set HTTP response in the HTML <code>paragraph</code> element with the id <code>httpResponse</code> as shown in the image.</li>
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
                      Ensure you should give the request body object with the keys name, gender, email, status as shown in the image.
                      </li>
                      <li>
                      While giving the value to the HTML textarea element with the id requestBody, make sure you keep the double quotes to the object keys as shown in the image.
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
                "Page should consist of an HTML textarea element with the id requestBody",
              type: "js-validation",
              input: "check-request-body",
              output: "true",
              visible: true,
            },

            {
              id: 2,
              description:
                "Page should consist of an HTML paragraph element with the id requestStatus",
              type: "js-validation",
              input: "check-request-status2",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML paragraph element with the id httpResponse",
              type: "js-validation",
              input: "check-http-response2",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the HTML button element with the id sendPostRequestBtn is clicked, the status code and HTTP Response should be in the HTML paragraph elements with the ids requestStatus and httpResponse respectively",
              type: "js-validation",
              input: "click-sendPostRequestBtn",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //coding practice - 17
    {
      id: "javascript-coding-practice-17",
      title: "Javascript Coding Practice 17",
      description: "",
      questions: [
        {
          id: "e19asl22-axa4fiiqc88-07r49ddb",
          title: "Wikipedia Search Application",
          description:
            "In this assignment, let's build a Wikipedia Search Application by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 25,
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
                <div class="main-container">
                    <div class="wiki-search-header text-center">
                        <img class="wiki-logo" src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/wiki-logo-img.png" />
                        <br />
                        <input placeholder="Type a keyword and press Enter to search" type="search" class="search-input w-100" id="searchInput" />
                    </div>
                    <div class="d-none" id="spinner">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                            </div>
                        </div>
                    </div>
                    <div class="search-results" id="searchResults"></div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .main-container {
                font-family: "Roboto";
            }
            
            .wiki-search-header {
                border-style: solid;
                border-width: 1px;
                border-color: #d5cdcd;
                padding-top: 30px;
                padding-right: 20px;
                padding-bottom: 30px;
                padding-left: 20px;
                margin-bottom: 40px;
            }
            
            .wiki-logo {
                width: 150px;
                margin-bottom: 30px;
            }
            
            .search-input {
                font-size: 18px;
                border-style: solid;
                border-width: 1px;
                border-color: #d5cdcd;
                border-radius: 3px;
                padding: 10px;
            }
            
            .search-results {
                width: 100%;
                padding-left: 20px;
            }
            
            .result-item {
                margin-bottom: 20px;
            }
            
            .result-title {
                font-size: 22px;
            }
            
            .link-description {
                color: #444444;
                font-size: 15px;
            }
            
            .result-url {
                color: #006621;
                text-decoration: none;
            }`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770729770/wikipedia-search-application-v1_yiid3n.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>Add the id <code>searchInput</code> to the HTML <code>input element.</code></span></li>
                        <li><span>Add the id <code>searchResults</code> to the HTML container element with the class name <code>search-results</code></span></li>
                    </ol>


                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Do not delete the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                      <li>Practice adding type search to the HTML input element.</li>
                      <li>Practice adding loading status with Bootstrap component spinner while making an HTTP request.</li>   
                      <li>When we enter text in HTML input element with the id searchInput and press Enter,
                         <ul>
                          <li>Get link, title, description (HTTP response with key search_results) by making HTTP request using <code>fetch</code> with URL <code>https://apis.ccbp.in/wiki-search?search=</code></li>
                          <li>Set title, link in the HTML a element and set description in the HTML paragraph element.</li>
                          </ul>
                        </li>
                      
                  </ul>

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
                "Page should consist of an HTML input element with the id searchInput",
              type: "js-validation",
              input: "check-search-input",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the id searchResults",
              type: "js-validation",
              input: "check-search-results",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "When enter text in HTML input element with the id searchInput and press Enter, A GET request has to be sent to the given URL and set HTTP response title, link in the HTML anchor element, and set description in HTML paragraph element",
              type: "js-validation",
              input: "check-search-functionality",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice -18
    {
      id: "javascript-coding-practice-18",
      title: "Javascript Coding Practice 18",
      description: "",
      questions: [
        {
          id: "e19asc22-axa1ziiqc88-07g49ddb",
          title: "Countries Search Page",
          description:
            "In this assignment, let's build a Countries Search Page by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 25,
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
                <div class="container pt-5">
                    <div class="row">
                        <h1 class="col-12 heading text-center">Find the Countries Population</h1>
                        <div class="col-12 text-center mt-3">
                            <input type="search" placeholder="Search for a Country" class="form-control search-input" id="searchInput" />
                        </div>
                        <div class="col-12 d-none mt-5" id="spinner">
                            <div class="d-flex flex-row justify-content-center">
                                <div class="spinner-border" role="status"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row result-countries" id="resultCountries"></div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .heading {
                color: #3e4c59;
                font-size: 28px;
                font-weight: bold;
            }
            
            .search-input {
                height: 50px;
            }
            
            .result-countries {
                margin-top: 18px;
            }
            
            .country-card {
                background-color: #ebf2fc;
                border-radius: 24px;
                margin-top: 15px;
                margin-bottom: 15px;
                padding: 15px;
            }
            
            .country-flag {
                width: 70px;
                height: 70px;
            }
            
            .country-name {
                color: #183b56;
                font-family: "Roboto";
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 8px;
            }
            
            .country-population {
                font-family: "Roboto";
                font-size: 14px;
                font-weight: 300;
            }`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770874597/countries-search-page-output-v2_kfykdz.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>Add the id searchInput to the HTML input element</span></li>
                        <li><span>Add the id resultCountries to the HTML container element with the class name result-countries</span></li>
                    </ol>


                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Do not delete the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">Achieve the given functionality to the given prefilled code.</p>
                  <ul>
                      <li>when the page is opened,
                         <ul>
                          <li>Make an HTTP GET Request using Fetch with URL https://apis.ccbp.in/countries-data</li>
                          <li>Loader should be displayed using the Bootstrap component spinner while making an HTTP request</li>
                          <li>Create HTML elements dynamically and append the created elements to the HTML container element with the id resultCountries</li>
                          </ul>
                        </li>
                       <li>When the value is provided in the HTML input element with id searchInput,
                       <ul>
                       <li>Filter the HTTP response (Array of objects with keys flag, name, population) based on the value of the HTML input element</li>
                       <li>Create HTML elements dynamically with the filtered data and append the created elements to the HTML container element with the id resultCountries</li>
                       </ul>
                       </li>    
                  </ul>

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
                "Page should consist of an HTML input element with the id searchInput",
              type: "js-validation",
              input: "check-search-input2",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the id resultCountries",
              type: "js-validation",
              input: "check-search-results2",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "When the page is opened, an HTTP GET request should be made to the given URL",
              type: "js-validation",
              input: "check-page-load-request",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 19
    {
      id: "javascript-coding-practice-19",
      title: "Javascript Coding Practice 19",
      description: "",
      questions: [
        {
          id: "e19adj22-axa1zrtiqc88-0qg49ddb",
          title: "Add User",
          description:
            "In this assignment, let's build an Add User form by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 45,
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
                    <h1 class="heading">Add User</h1>
                </div>
                <form id="addUserForm" class="formContainer">
                    <label for="name">Name</label>
                    <input class="form-control" id="name" />
                    <p id="nameErrMsg" class="text"></p>
                    <label for="email">Email</label>
                    <input class="form-control" id="email" />
                    <p class="text" id="emailErrMsg"></p>
                    <button class="btn btn-primary" type="submit">Submit</button>
                </form>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Monoton&family=Open+Sans:wght@400;700&family=Playfair+Display+SC:wght@400;700&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;700&family=Source+Sans+Pro:wght@400;700&family=Work+Sans:wght@400;700&display=swap");

            p {
                color: red;
            }`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770883013/add-user-v1_dasb2u.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>Add the HTML form, input, p and button elements to the HTML code</span></li>
                        <li><span>Add an id <strong>addUserForm</strong> to the HTML form element</span></li>
                        <li><span>Add the ids name and email to the HTML input elements respectively</span></li>
                        <li><span>Add the ids <strong>nameErrMsg</strong> and <strong>emailErrMsg</strong> to the HTML paragraph elements respectively</span></li>
                    </ol>


                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Do not delete the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                      <li>When the HTML <code>input</code> element with id <code>name</code> lost the focus,
                         <ul>
                          <li>Practice adding the error message to the HTML paragraph element with the id <code>nameErrMsg</code> based on the value of the HTML <code>input</code> element with the id <code>name.</code></li>
                          </ul>
                        </li>
                       <li>When the HTML <code>input</code> element with id <code>email</code> lost the focus,
                       <ul>
                       <li>Practice adding the error message to the HTML paragraph element with the id <code>emailErrMsg</code> based on the value of the HTML input element with the id <code>email</code></li>
                       </ul>
                       </li>    
                  </ul>
                  <hr>

                  <p class="desc-que-blue">Resources</p>
                  <p class="desc-que-blue">CSS Font families used:</p>
                  <ul>
                  <li>Roboto</li>
                  </ul>

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
                "Page should consist of an HTML form element with the id addUserForm",
              type: "js-validation",
              input: "check-form",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML input element with the id name",
              type: "js-validation",
              input: "check-name-input",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML paragraph element with the id nameErrMsg",
              type: "js-validation",
              input: "check-name-error",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML input element with the id email",
              type: "js-validation",
              input: "check-email-input",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML paragraph element with the id emailErrMsg",
              type: "js-validation",
              input: "check-email-error",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "When the HTML element with the id name lost the focus, if the name input element's value is empty, then the HTML element with the id nameErrMsg should have the error message. Otherwise, it should have an empty string",
              type: "js-validation",
              input: "check-name-blur",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "When the HTML element with the id email lost the focus, if the name input element's value is empty, then the HTML element with the id emailErrMsg should have the error message. Otherwise, it should have an empty string",
              type: "js-validation",
              input: "check-email-blur",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding practice - 20
    {
      id: "javascript-coding-practice-20",
      title: "Javascript Coding Practice 20",
      description: "",
      questions: [
        {
          id: "e19skj22-axa77rtiqc88-0qgrvddb",
          title: "Select your Pet",
          description:
            "In this assignment, let's build a Select your Pet page by applying the concepts we learned till now.",
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
                <div class="bg-container p-4">
                    <h1 class="heading">Select your Pet</h1>
                    <select id="petSelect" class="form-control">
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="parrot">Parrot</option>
                        <option value="spider">Spider</option>
                        <option value="rabbit">Rabbit</option>
                    </select>
                    <div class="mt-4">
                        <img id="petImg" class="w-100" src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/select-your-pet-dog-img.png" />
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Monoton&family=Open+Sans:wght@400;700&family=Playfair+Display+SC:wght@400;700&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;700&family=Source+Sans+Pro:wght@400;700&family=Work+Sans:wght@400;700&display=swap");`,
            javascript: `let petsImageUrls = {
              dog: "https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770893265/01-domestic-dog-gallery_m6o5lf.avif",
              cat: "https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770893448/Domestic-cat-34_ojtg92.jpg",
              parrot: "https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770893705/OIP_njaxkt.jpg",
              spider: "https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770893818/White_tailed_spider_kp3yps.jpg",
              rabbit: "https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770893944/rabbit_PNG3780_w9whoe.png"
          };`,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770889827/select-your-pet-v1_tulyoe.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>Add the HTML h1, select, and img elements to the HTML code</span></li>
                        <li><span>Add the HTML option elements with the values dog, cat, parrot, spider and rabbit to the HTML select element</span></li>
                        <li><span>Add an id petSelect to the HTML select element</span></li>
                        <li><span>Add an id petImg to the HTML img element</span></li>
                    </ol>


                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Do not delete the prefilled code.
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                      <li>When the value of the HTML <code>select</code> element with the id <code>petSelect</code> is changed,
                         <ul>
                          <li>Change the <code>src</code> value of the HTML img element with the id <code>petImg</code> according to the selected pet</li>
                          </ul>
                       </li>    
                  </ul>
                  <hr>

                  <div class="Note-container">
                  <div class="icon-note">
                    <h6>
                      <i class="bi bi-journal-text"></i>Note
                    </h6>
                  </div>
                  <p>
                    <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>               
                      <li>
                      Use the image URLs given in the prefilled JS code for the pet images.
                      </li>
                      <li>
                      Try to achieve the design as close as possible.
                      </li>
                    </ul>
                  </p>
                </div>
                 

                  <p class="desc-que-blue">Resources</p>
                  <p class="desc-que-blue">CSS Font families used:</p>
                  <ul>
                  <li>Roboto</li>
                  </ul>

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
                "Page should consist of an HTML select element with the id petSelect",
              type: "js-validation",
              input: "check-pet-select",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML img element with the id petImg",
              type: "js-validation",
              input: "check-pet-img",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "JS code should contain addEventListener for the change event",
              type: "js-validation",
              input: "check-change-event",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "When the value of the HTML select element with the id petSelect  changed, the src value of the HTML img element with the id petImg should change accordingly",
              type: "js-validation",
              input: "check-image-change",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "e19sdv22-axa04rtiqc88-0sfrvddb",
          title: "Answer the Question",
          description:
            "In this assignment, let's build an Answer the Question page by applying the concepts we learned till now.",
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
                Your code goes here
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Monoton&family=Open+Sans:wght@400;700&family=Playfair+Display+SC:wght@400;700&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;700&family=Source+Sans+Pro:wght@400;700&family=Work+Sans:wght@400;700&display=swap");`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770894417/answer-the-question-v1_a7ax3v.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>Add the HTML form, h1, input, button, and p elements to the HTML code</span></li>
                        <li><span>Add an id <strong>questionsForm</strong> to the HTML form element</span></li>
                        <li><span>Add the ids cityHyderabad, cityChennai, cityDelhi and cityMumbai to the HTML input radio elements</span></li>
                        <li><span>Add an id <strong>submitBtn</strong> to the HTML button element</span></li>
                        <li><span>Add an id <strong>resultMsg</strong> to the HTML paragraph element</span></li>
                    </ol>

                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                      <li>When the HTML button element with the id submitBtn is clicked or the HTML form element with the id questionsForm is submitted,
                         <ul>
                          <li>If no option is selected, then the HTML paragraph element with the id <code>resultMsg</code> should have Please select the answer.</li>
                          <li>If the selected option is a wrong answer, then the HTML paragraph element with the id <code>resultMsg</code> should have Wrong answer else it should have Correct answer.</li>
                          </ul>
                       </li>    
                  </ul>
                  
                  <hr>

                  <p class="desc-que-blue">Resources</p>
                  <p class="desc-que-blue">CSS Font families used:</p>
                  <ul>
                  <li>Roboto</li>
                  <li>Bree Serif</li>
                  </ul>

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
                "Page should consist of an HTML form element with the id questionsForm",
              type: "js-validation",
              input: "check-form2",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "The HTML form element with the id questionsForm should consist of the radio buttons with the ids cityHyderabad, cityChennai, cityDelhi and cityMumbai ",
              type: "js-validation",
              input: "check-radio-buttons",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "The HTML form element with the id questionsForm should consist of an HTML button element with the id submitBtn",
              type: "js-validation",
              input: "check-submit-btn",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML paragraph element with the id resultMsg",
              type: "js-validation",
              input: "check-result-msg",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "JS code should contain addEventListener for the change event",
              type: "js-validation",
              input: "check-change-event2",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "When the HTML button element with the id submitBtn clicked or the HTML form element with the id questionsForm submitted, then the HTML paragraph element with the id resultMsg should have Wrong answer as result if the selected radio button is a wrong answer. Otherwise, it should have Correct answer",
              type: "js-validation",
              input: "check-submit-functionality",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //coding_Assignment 2
    {
      id: "javascript-JS_Coding_Assignment_2",
      title: "javascript Coding Assignment 2",
      description: "",
      questions: [
        {
          id: "e19agx2-axa1zrtiq638-0qme149ddb",
          title: "BookMark Maker",
          description:
            "In this assignment, let's build a Bookmark Maker by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 130,
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
                <div class="container">
                    <div class="row">
                        <div class="col-12 mt-3">
                            <h1 class="container-heading">Hello</h1>
                            <h1 class="container-description"> Jane Doe</h1>
                            <div class="p-3 formContainer">
                                <h1 class="cardHeading">Bookmark your Favourite Sites</h1>
                                <form class="boxContainer" id="bookmarkForm">
                                    <label for="siteNameInput">SITE NAME</label>
                                    <input class="form-control" placeholder="Enter the name" type="text" id="siteNameInput" />
                                    <p id="siteNameErrMsg"></p>
                                    <label for="siteUrlInput">SITE URL</label>
                                    <input class="form-control" placeholder="Enter Site Url" type="text" id="siteUrlInput" />
                                    <p id="siteUrlErrMsg"></p>
                                    <div class="text-right">
                                        <button class="button" id="submitBtn" type="submit">Submit</button>
                                    </div>
                                </form>
                                <div class="mt-3 boxContainer">
                                    <ul class="d-none goggle-box" id="bookmarksList">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .container {
                background-color: #2d3a8c;
                font-family: "Roboto";
                padding: 0px;
                margin: 0px;
                height: 30px;
            }
            
            .container-heading {
                color: #f5f7fa;
                font-size: 16px;
                font-family: "Roboto";
            }
            
            .container-description {
                color: #ffffff;
                font-size: 24px;
                font-family: "Roboto";
            }
            
            .bookmark-container {
                background-color: #ffffff;
                background-size: cover;
                margin: 0px;
                border-radius: 18px;
            }
            
            .bookmark-container-heading {
                color: #323f4b;
                font-family: "Roboto";
                font-size: 22px;
                font-weight: 500;
                padding: 20px;
            }
            
            .boxContainer {
                background-color: #f5f7fa;
                border-radius: 15px;
                padding: 20px;
                border-style: solid;
                border-color: #cbd2d9;
                border-width: 1px;
            }
            
            .goggle-box {
                color: #323f4b;
            }
            
            ul {
                list-style: none;
            }
            
            label {
                color: #7b8794;
                font-size: 14px;
                font-weight: 500;
            }
            
            .button {
                background-color: #2d3a8c;
                color: #ffffff;
                border-radius: 20px;
                padding: 10px;
            }
            
            p {
                color: #dc3545;
            }
            
            .formContainer {
                background-color: #ffffff;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                height: 60vh;
            }
            
            .cargHeding {
                color: #21396c;
                font-size: 20px;
            }`,
            javascript: ``,
          },
          descriptionDetails: `
                  <div class="desc-question-details">

                    <p class="desc-que-blue">Refer to the below image.</p>
                    
                    <img src="https://res.cloudinary.com/dlwlkg2h7/image/upload/v1770960723/bookmark-maker-output-v1_xc8jdt.gif" class="desc-que-img" />

                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>The page should have HTML form element with id bookmarkForm</span></li>
                        <li><span>The HTML form element with id bookmarkForm should have HTML input elements with ids siteNameInput and siteUrlInput</span></li>
                        <li><span>The HTML form element with id bookmarkForm should have HTML button element with id submitBtn</span></li>
                        <li><span>Add HTML label elements for HTML input elements with ids siteNameInput and siteUrlInput</span></li>
                        <li><span>The HTML form element with id bookmarkForm should have HTML p elements with ids siteNameErrMsg and siteUrlErrMsg</span></li>
                        <li><span>The page should have HTML unordered list element with id bookmarksList</span></li>
                        <li><span>Each bookmark item should contain an HTML anchor element to navigate to the bookmarked site</span></li>
                    </ol>


                      <div className="Warning-container">
                      <div>
                        <h5>
                          <i class="bi bi-exclamation-triangle"></i>Warning
                        </h5>
                      </div>
                      <ul style={{ marginLeft: "1.5rem" }}>
                        <li>
                        Please provide valid URL's to the siteUrlInput element
                        </li>
                      </ul>
                    </div>
                      <hr>

                  <p class="">By following the above instructions, achieve the given functionality.</p>
                  <ul>
                  <li>
                    When the HTML <code>button</code> element with the id <code>submitBtn</code> is clicked,
                    <ul>
                      <li>
                        If the values are provided in the HTML input elements with ids
                        <code>siteNameInput</code> and <code>siteUrlInput</code>
                        <ul>
                          <li>
                            A new bookmark should be added to the
                            <code>bookmarksList</code> as list item.
                          </li>
                        </ul>
                      </li>
                
                      <li>
                        If the <code>siteNameInput</code> value is empty,
                        <ul>
                          <li>
                            The HTML <code>p</code> element with id
                            <code>siteNameErrMsg</code> should have error message
                          </li>
                        </ul>
                      </li>
                
                      <li>
                        If the <code>siteUrlInput</code> value is empty,
                        <ul>
                          <li>
                            The HTML <code>p</code> element with id
                            <code>siteUrlErrMsg</code> should have error message
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                
                  <li>
                    When the HTML <code>a</code> element consisting of the bookmarked site URL is clicked,
                    the site should open in a <strong>new tab</strong>.
                  </li>
                
                  <li>
                    When the HTML <code>input</code> element with id
                    <code>siteNameInput</code> is empty after changing the value inside the input
                    <ul>
                      <li>
                        The HTML <code>p</code> element with id
                        <code>siteNameErrMsg</code> should have error message
                      </li>
                    </ul>
                  </li>
                
                  <li>
                    When the HTML <code>input</code> element with id
                    <code>siteUrlInput</code> is empty after changing the value inside the input
                    <ul>
                      <li>
                        The HTML <code>p</code> element with id
                        <code>siteUrlErrMsg</code> should have error message
                      </li>
                    </ul>
                  </li>
                </ul>
                
                  <hr>
                  <p class="desc-que-blue">Resources</p>
                  <p class="desc-que-blue">Background colors Hex code values used:</p>
                  <div  class="desc-colors c2d3a8c">#2d3a8c</div>
                  <div  class="desc-colors cffffff">#ffffff</div>
                  <div  class="desc-colors cf5f7fa">#f5f7fa</div>
                  <div  class="desc-colors c21396c">#21396c</div>

                  <p class="desc-que-blue">Text colors Hex code values used:</p>
                  <div  class="desc-colors c323f4b">#323f4b</div>
                  <div  class="desc-colors cffffff">#ffffff</div>
                  <div  class="desc-colors c7b8794">#7b8794</div>
                  <div  class="desc-colors cdc3545">#dc3545</div>

                  <p class="desc-que-blue">Border Colors Hex code values used:</p>
                  <div  class="desc-colors c7b8794">#cbd2d9</div>
                  <div  class="desc-colors ce4e7eb">#e4e7eb</div>

               
                  <p class="desc-que-blue">CSS Font families used::</p>
                  <ul>
                  <li>Roboto</li>
                  </ul>

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
                "Page should consist of an HTML main heading element",
              type: "js-validation",
              input: "check-heading5",
              output: "true",
              visible: true,
            },

            {
              id: 2,
              description: "Page should consist of an HTML paragraph element",
              type: "js-validation",
              input: "check-paragraph",
              output: "true",
              visible: true,
            },

            {
              id: 3,
              description:
                "Page should consist of HTML form element with id bookmarkForm",
              type: "js-validation",
              input: "check-form4",
              output: "true",
              visible: true,
            },

            {
              id: 4,
              description:
                "Page should consist of HTML input element with id siteNameInput inside HTML form element with id bookmarkForm",
              type: "js-validation",
              input: "check-site-name-input",
              output: "true",
              visible: true,
            },

            {
              id: 5,
              description:
                "Page should consist of HTML label element for HTML input element with id siteNameInput",
              type: "js-validation",
              input: "check-site-name-label",
              output: "true",
              visible: true,
            },

            {
              id: 6,
              description:
                "Page should consist of HTML paragraph element with id siteNameErrMsg inside HTML form element with id bookmarkForm",
              type: "js-validation",
              input: "check-site-name-error",
              output: "true",
              visible: true,
            },

            {
              id: 7,
              description:
                "Page should consist of HTML input element with id siteUrlInput inside HTML form element with id bookmarkForm",
              type: "js-validation",
              input: "check-site-url-input",
              output: "true",
              visible: true,
            },

            {
              id: 8,
              description:
                "Page should consist of HTML label element for HTML input element with id siteUrlInput",
              type: "js-validation",
              input: "check-site-url-label",
              output: "true",
              visible: true,
            },

            {
              id: 9,
              description:
                "Page should consist of HTML paragraph element with id siteUrlErrMsg inside HTML form element with id bookmarkForm",
              type: "js-validation",
              input: "check-site-url-error",
              output: "true",
              visible: true,
            },

            {
              id: 10,
              description:
                "Page should consist of HTML unordered list element with id bookmarksList",
              type: "js-validation",
              input: "check-bookmarks-list",
              output: "true",
              visible: true,
            },

            {
              id: 11,
              description:
                "JS code implementation should use addEventListener to attach change event for the HTML input elements",
              type: "js-validation",
              input: "check-change-event4",
              output: "true",
              visible: true,
            },

            {
              id: 12,
              description:
                "JS code implementation should use addEventListener to attach submit event for the HTML form element",
              type: "js-validation",
              input: "check-submit-event",
              output: "true",
              visible: true,
            },

            {
              id: 13,
              description:
                "JS code implementation should use event.preventDefault to prevent the default behavior of submit event",
              type: "js-validation",
              input: "check-prevent-default",
              output: "true",
              visible: true,
            },

            {
              id: 14,
              description:
                "When HTML input elements with ids siteNameInput and siteUrlInput are filled with valid values, the HTML button element with id submitBtn is clicked a new bookmark should be added to HTML unordered list element with id bookmarksList",
              type: "js-validation",
              input: "check-add-bookmark",
              output: "true",
              visible: true,
            },

            {
              id: 15,
              description:
                "When a new bookmark is added to the HTML unordered list element with id bookmarksList, the HTML anchor element in the bookmark item should have href attribute value as the bookmarked site",
              type: "js-validation",
              input: "check-bookmark-href",
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
          sampleOutput: "[5, 50, 'center', 75, 100]",
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
              output: "[5, 50, 'center', 75, 100]",
              visible: true,
            },
            {
              input: "1\n200",
              output: "[25, 200, 'center', 75, 100]",
              visible: true,
            },
            {
              input: "2\n99",
              output: "[25, 50, 99, 75, 100]",
              visible: false,
            },
            {
              input: "3\n0",
              output: "[25, 50, 'center', 0, 100]",
              visible: false,
            },
            {
              input: "4\n-10",
              output: "[25, 50, 'center', 75, -10]",
              visible: false,
            },
          ],

          defaultCode: `// Prefilled array
          let myArray = [25, 50, 'center', 75, 100];
          
          // Read inputs
          let index = parseInt(prompt());
          let val = parseInt(prompt());
          
            /*
             * Write your code here and log the output.
             */ 
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
          // Read array input as string
          let myArray = eval(prompt());

            /*
            *Write your code here and log the output.
            */
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
          sampleOutput: "[1, 2, 4, 2]",
          testCases: [
            {
              input: "['Orange', 25, 100, true, 33.58]\n10",
              output: "['Orange', 25, 100, true, 33.58, 10]",
              visible: true,
            },
            {
              input: "[1, 2, 3]\n4",
              output: "[1, 2, 3, 4]",
              visible: true,
            },
            {
              input: "[]\n99",
              output: "[99]",
              visible: false,
            },
            {
              input: "['A', 'B']\n5",
              output: "['A', 'B', 5]",
              visible: false,
            },
            {
              input: "[10, 20, 30]\n-15",
              output: "[10, 20, 30, -15]",
              visible: false,
            },
          ],
          defaultCode: `
          // Read array input
            let myArray = eval(prompt());

            // Read value to be added
            let val = parseInt(prompt());
            /*
            * Write your code here and log the output.
            */
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
          sampleOutput: "9\n[17, 2, 4]",
          testCases: [
            {
              input: "[17, 2, 4, 9]",
              output: "9\n[17, 2, 4]",
              visible: true,
            },
            {
              input: "['Orange', 25, 100, true, 33.58]",
              output: "33.58\n['Orange', 25, 100, true]",
              visible: true,
            },
            {
              input: "[1, 2, 3, 4]",
              output: "4\n[1, 2, 3]",
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
          // Read array input
          let myArray = eval(prompt());

            /*
            * Write your code here and log the output.
            */            
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
          sampleOutput: "Hello! Have a nice day",
          testCases: [
            {
              input: "",
              output: `Hello! Have a nice day`,
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

          defaultCode: `
          function getSumOfTwoIntegers(firstInteger, secondInteger) {
            /*
            * return the output.
            */
          }

            // Read inputs
              let firstInteger = parseInt(prompt());
              let secondInteger = parseInt(prompt());

              // Call function and print result
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

          defaultCode: `

          function getNationalBird() {
            bird = "Peacock";
            /*
              * Write your code here and return the output.
            */
            }
          
            // Call function and print result

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

          defaultCode: `
          // personName
          let personName = prompt();
              // function greetWithName
              function greetWithName(personName) {
                let greetings  = "Hi " + personName;
                return greetings;
              }
            
              // Call function and print result
              `,
          score: 8,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "d813742e-f8f5-41d992d3-1178dc1659ea",
          title: "Creating a Function with Parameters",
          description:
            "Write a function to return the average of two integers and log the result. \n The formula to calculate the average of two integers is, average = (a+b) /2.",
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
                <p class=""></p>The Output should be a single line containing the average of the given two integers.</p>
              </div>
          </div>
           `,
          sampleInput: "4\n2",
          sampleOutput: "3",

          defaultCode: `
          function getAverage(a, b) {
            /*
             * return your function here
             */
          }
          
          // Read inputs
          let firstInteger = parseInt(prompt());
          let secondInteger = parseInt(prompt());
          
          // Call function and print result

          `,
          testCases: [
            {
              input: "4\n2",
              output: "3",
              visible: true,
            },
            {
              input: "10\n20",
              output: "15",
              visible: true,
            },
            {
              input: "0\n0",
              output: "0",
              visible: false,
            },
            {
              input: "5\n7",
              output: "6",
              visible: false,
            },
            {
              input: "-4\n4",
              output: "0",
              visible: false,
            },
          ],
          score: 19,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "d813742e-f8fnjuv4992d3-1178dc1659ea",
          title: "Creating a Function Expression",
          description:
            "Write a function expression 'convertMinutesToSeconds' to convert the given minutes (minutes) to seconds. \n The formula to convert minutes to seconds is, seconds = minutes * 60.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain a positive integer (minutes).</p>
              </div>
              <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The Output should be a single line containing the positive integer (seconds) returned by the function.</p>
              </div>
          </div>
           `,
          sampleInput: "1",
          sampleOutput: "60",

          defaultCode: `
          let minutes = parseInt(prompt());
          // Write your code here and return the output
          `,
          testCases: [
            {
              input: "1",
              output: "60",
              visible: true,
            },
            {
              input: "5",
              output: "300",
              visible: true,
            },
            {
              input: "0",
              output: "0",
              visible: false,
            },
            {
              input: "10",
              output: "600",
              visible: false,
            },
            {
              input: "2",
              output: "120",
              visible: false,
            },
          ],
          score: 19,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    //JS coding practice - 3
    {
      id: "js-coding-practice-3",
      title: "JS Coding Practice 3",
      description: "",
      questions: [
        {
          id: "30d963eb-44104de099d6-8fe9b46b37cc",
          title: "Create & Log an Object",
          description:
            "Write a JS program to log a vehicle object with the given properties (key-value pairs).\n name - Mercedes Benz \n model - C-Class \n manufacturer - Daimler AG company \n length - 4686mm \n cargo capacity - 12.6 cubic feet",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing a vehicle object with the above properties.</p>
              </div>
            </div>
          `,

          sampleInput: "",

          sampleOutput: `{
  name: 'Mercedes Benz',
  model: 'C-Class',
  manufacturer: 'Daimler AG company',
  length: '4686mm',
  'cargo capacity': '12.6 cubic feet'
  }`,

          testCases: [
            {
              input: "",
              output: `{
  name: 'Mercedes Benz',
  model: 'C-Class',
  manufacturer: 'Daimler AG company',
  length: '4686mm',
  'cargo capacity': '12.6 cubic feet'
}`,
              visible: true,
            },
          ],

          defaultCode: `
          function carObject(){

            //create and return your output

          }

          // Call function and print result
   
    `,

          score: 5,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "1c11ae1d-4212485a99b6-5dc415ff027c",
          title: "Create & Log an Object - 2",
          description:
            "Write a JS program to log a movie object with the given properties (key-value pairs).\n title - Baahubali \n director - Rajamouli \n producers - Sobhu, Raghavendra, Prasad \n lead actors with their roles - an object with the key-value pairs: prabhas - Baahubali, anushka - Devasena, rana - Bhallaladeva, tamannah - Avanthika",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing a movie object with the above properties.</p>
              </div>
            </div>
          `,

          sampleInput: "",

          sampleOutput: `{
  title: 'Baahubali',
  director: 'Rajamouli',
  producers: ['Sobhu', 'Raghavendra', 'Prasad'],
  'lead actors with their roles': {
  prabhas: 'Baahubali',
  anushka: 'Devasena',
  rana: 'Bhallaladeva',
  tamannah: 'Avanthika'
  }
}`,

          testCases: [
            {
              input: "",
              output: `{
  title: 'Baahubali',
  director: 'Rajamouli',
  producers: ['Sobhu', 'Raghavendra', 'Prasad'],
  'lead actors with their roles': {
  prabhas: 'Baahubali',
  anushka: 'Devasena',
  rana: 'Bhallaladeva',
  tamannah: 'Avanthika'
  }
}`,
              visible: true,
            },
          ],

          defaultCode: `
          function movieObject(){

            //return the object

          }
          
          // Call function and print result

          `,

          score: 5,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "b7c721a6-2b114fa78534-ba1de99e546b",
          title: "Access the values of an object",
          description:
            "Given an object (person) in he prefilled code.\n Access the value of an object with the given key (objectKey) and log it.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The first line of input should contain a string (objectKey).</p>
              </div>
              <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The Output should be a single line containing a value of an object with the given key (objectKey).</p>
              </div>
              <div>
                <p class="desc-que-blue">Constraints</p>
                <p class=""></p>The 'objectKey' should be wrapped with the quotes.</p>
              </div>
          </div>
           `,
          sampleInput: "name",
          sampleOutput: "Sam",
          testCases: [
            {
              input: "name",
              output: "Sam",
              visible: true,
            },
            {
              input: "age",
              output: "20",
              visible: true,
            },
            {
              input: "city",
              output: "Delhi",
              visible: false,
            },
            {
              input: "isStudent",
              output: "true",
              visible: false,
            },
            {
              input: "score",
              output: "85",
              visible: false,
            },
          ],

          defaultCode: `
          // Prefilled object
const person = {
  name: "Sam",
  age: 20,
  city: "Delhi",
  isStudent: true,
  score: 85
};


// Read the object key
let objectKey = prompt();

// Access and print the value using bracket notation

          `,
          score: 32,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "7c5c1c8d-6a3d4a7fbd68-d7e0f6172c26",
          title: "Update the values of an object",
          description:
            "Given an object (cat) in he prefilled code.\n Update the value of an object with the given key (objectKey) and value (val) and log the updated object.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The first line of input will contain a string (objectKey).</p>
                <p class=""></p>The second line of input will contain the value (val). The value might be a string, array or an object.</p>
              </div>
              <div>
                <p class="desc-que-blue">output</p>
                <p class=""></p>The Output should be a single line containing the updated object.</p>
              </div>
              <div>
                <p class="desc-que-blue">Constraints</p>
                <p class=""></p>The 'objectKey' should be wrapped with the quotes.</p>
              </div>
          </div>
           `,
          sampleInput: "name\n'sassy'",
          sampleOutput: `{"name":"sassy","age":18,"fur color":"grey","likes":["catnip","milk"],"birthday":{"month":7,"day":17,"year":1994}}`,
          testCases: [
            {
              input: "name\n'sassy'",
              output: `{"name":"sassy","age":18,"fur color":"grey","likes":["catnip","milk"],"birthday":{"month":7,"day":17,"year":1994}}`,
              visible: true,
            },
            {
              input: "age\n20",
              output: `{"name":"lizzie","age":20,"fur color":"grey","likes":["catnip","milk"],"birthday":{"month":7,"day":17,"year":1994}}`,
              visible: false,
            },
            {
              input: "fur color\n'white'",
              output: `{"name":"lizzie","age":18,"fur color":"white","likes":["catnip","milk"],"birthday":{"month":7,"day":17,"year":1994}}`,
              visible: false,
            },
            {
              input: "likes\n['fish','sleep']",
              output: `{"name":"lizzie","age":18,"fur color":"grey","likes":["fish","sleep"],"birthday":{"month":7,"day":17,"year":1994}}`,
              visible: false,
            },
          ],

          defaultCode: `
          // Prefilled object
let cat = {
  name: 'lizzie',
  age: 18,
  'fur color': 'grey',
  likes: ['catnip', 'milk'],
  birthday: { month: 7, day: 17, year: 1994 }
};

// Read inputs
let objectKey = prompt();
let val = eval(prompt()); // value can be string, array, or object

/*
* Write your code here and log the output.
*/

// Update object value


// Print updated object


          `,
          score: 22,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "ccf99d4e-8a2346e9b7e0-9fec95863684",
          title: "Add a property to an object",
          description:
            "Given an object (meals) in the prefilled code.\n Add a new property to the object with the given key (objectKey) and value (val) and log the updated object.",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain a string (objectKey).</p>
                 <p>The second line of input will contain a value (val). The value might be a string, array or an object.</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing a updated object.</p>
              </div>
              <div>
                <p class="desc-que-blue">Constraints</p>
                <p>The 'objectKey' should be wrapped with the quotes.</p>
              </div>
            </div>
          `,

          sampleInput: "snack\n'Noodles'",

          sampleOutput: `{
  breakfast: 'Oatmeal',
  lunch: 'Burrito',
  dinner: 'Chapathi',
  snack: 'Noodles'
}`,

          testCases: [
            {
              input: "snack\n'Noodles'",
              output: `{"breakfast":"Oatmeal","lunch":"Burrito","dinner":"Chapathi","snack":"Noodles"}`,
              visible: true,
            },
            {
              input: "dessert\n'IceCream'",
              output: `{"breakfast":"Oatmeal","lunch":"Burrito","dinner":"Chapathi","dessert":"IceCream"}`,
              visible: true,
            },
            {
              input: "drink\n'Coffee'",
              output: `{"breakfast":"Oatmeal","lunch":"Burrito","dinner":"Chapathi","drink":"Coffee"}`,
              visible: true,
            },
            {
              input: "midnightSnack\n'Pizza'",
              output: `{"breakfast":"Oatmeal","lunch":"Burrito","dinner":"Chapathi","midnightSnack":"Pizza"}`,
              visible: true,
            },
          ],

          defaultCode: `
          // Prefilled object
let meals = {
  breakfast: "Oatmeal",
  lunch: "Burrito",
  dinner: "Chapathi"
};

// Read inputs
let objectKey = prompt();
let val = eval(prompt());

/*
 * Write your code here and log the output.
 */


`,

          score: 14,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    //Js Coding pratice - 4
    {
      id: "js-coding-practice-4",
      title: "JS Coding Practice 4",
      description: "",
      questions: [
        {
          id: "4930a0fa-4c47421bbd4f-9404b803cb54",
          title: "Make a Person Object",
          description:
            "Given a id, name and email.\n Write a function 'makePersonObject' to return an object containing an id, name, and email of a person passed as arguments to it.",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
             <div>
                <p class="desc-que-blue">Input</p>
                <p>The input consists of 3 lines. \n The first line will contain a positive number (id). \n The second line will contain a string (name). \n The third line will contain a string (email) of a person.</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing an object with the properties id, name and email.</p>
              </div>
            </div>
          `,

          sampleInput: "1\nShiva\nshiva@gmail.com",

          sampleOutput: `{ id: 1, name: 'Shiva', email: 'shiva@gmail.com' }`,

          testCases: [
            {
              input: "1\nShiva\nshiva@gmail.com",
              output: "{ id: 1, name: 'Shiva', email: 'shiva@gmail.com' }",
              visible: true,
            },
            {
              input: "2\nRavi\nravi@gmail.com",
              output: "{ id: 2, name: 'Ravi', email: 'ravi@gmail.com' }",
              visible: true,
            },
            {
              input: "3\nAnjali\nanjali@yahoo.com",
              output: "{ id: 3, name: 'Anjali', email: 'anjali@yahoo.com' }",
              visible: false,
            },
            {
              input: "4\nKiran\nkiran@outlook.com",
              output: "{ id: 4, name: 'Kiran', email: 'kiran@outlook.com' }",
              visible: false,
            },
          ],

          defaultCode: `
          // Read inputs
let id = parseInt(prompt());
let name = prompt();
let email = prompt();

function makePersonObject(id, name, email) {
  /*
 * Write your code here and log the output.
 */
}

// Call function and log the output exactly as expected
let person = makePersonObject(id, name, email);

console.log(
  "{ id: " +
    person.id +
    ", name: '" +
    person.name +
    "', email: '" +
    person.email +
    "' }"
);
    `,

          score: 12,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "8104ba46-60b2-4e1a-967b-6b6713caff28",
          title: "Calculate the Total Score of a Cricketer",
          description:
            "The score made by a cricketer in the last 3 matches is given as an array (arrayOfScores).\n Write a function 'calculateTotalScore' to return the total runs scored by the cricketer in the last 3 matches.",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
             <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an array of whole numbers (arrayOfScores).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing the total runs scored by the cricketer in the last 3 matches.</p>
              </div>
               <div>
                <p class="desc-que-blue">Constraints</p>
                <p>The array (arrayOfScores) should consists of only 3 values.</p>
              </div>
            </div>
          `,

          sampleInput: "[25, 55, 30]",

          sampleOutput: "110",

          testCases: [
            {
              input: "[25, 55, 30]",
              output: "110",
              visible: true,
            },
            {
              input: "[10, 20, 30]",
              output: "60",
              visible: true,
            },
            {
              input: "[50, 40, 35]",
              output: "125",
              visible: false,
            },
            {
              input: "[0, 15, 25]",
              output: "40",
              visible: false,
            },
          ],

          defaultCode: `
// Read input
let arrayOfScores = eval(prompt());
function calculateTotalScore(scores) {
  /*
  * Write your code here and log the output.
  */
}

console.log(calculateTotalScore(arrayOfScores));

`,

          score: 12,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "883b7ef2-60cd4b2ca2bb-ffe195444ccd",
          title: "Make an Array",
          description:
            "Given three numbers (num1, num2, num3).\n Write a function that takes the num1, num2, num3 as arguments and return an array with them as values.",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
             <div>
                <p class="desc-que-blue">Input</p>
                <p>The input consists of 3 lines. \n The first, second and third line will contain the numbers num1, num2 and num3 respectively.</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing an array created by the num1, num2 and num3.</p>
              </div>
               <div>
                <p class="desc-que-blue">Constraints</p>
                <p>All the inputs should be the numbers.</p>
              </div>
            </div>
          `,

          sampleInput: "1\n2\n3",

          sampleOutput: "[ 1, 2, 3 ]",

          testCases: [
            {
              input: "1\n2\n3",
              output: "[1, 2, 3]",
              visible: true,
            },
            {
              input: "10\n20\n30",
              output: "[10, 20, 30]",
              visible: true,
            },
            {
              input: "5\n15\n25",
              output: "[5, 15, 25]",
              visible: false,
            },
            {
              input: "0\n0\n0",
              output: "[0, 0, 0]",
              visible: false,
            },
          ],

          defaultCode: `
          // Read inputs
let num1 = Number(prompt());
let num2 = Number(prompt());
let num3 = Number(prompt());

/*
 * Write your code here and log the output.
 */
function makeArray(a, b, c) {
  // Student will write code here
}

console.log(makeArray(num1, num2, num3));

   
    `,

          score: 12,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "1dd93f45-6b8c4fecb697-832fca4cb321",
          title: "Eligibility to play the next level of a game",
          description:
            "Given an object (person) with the properties 'name' and 'score'.\n The person is eligible to play the next level of a game when his score is greater than five.\nWrite a function that takes the person as an argument and returns the boolean value 'true' when the person is eligible else returns 'false'.",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
             <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an object (person).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a boolean value containing either true or false.</p>
              </div>
               <div>
                <p class="desc-que-blue">Constraints</p>
                <p>The keys of an object should be in quotes while giving the input.</p>
              </div>
            </div>
          `,

          sampleInput: "{'name':'preethi', 'score': 10}",

          sampleOutput: "true",

          testCases: [
            {
              input: '{"name":"preethi", "score": 10}',
              output: "true",
              visible: true,
            },
            {
              input: '{"name":"raj", "score": 3}',
              output: "false",
              visible: false,
            },
            {
              input: '{"name":"sita", "score": 5}',
              output: "false",
              visible: false,
            },
          ],

          defaultCode: `
          
          // Read input as a string and convert to object
          let person = JSON.parse(prompt()); 
          
          function isEligible(person) {
            /*
           * Write your code here and log the output.
           */
          }
          
          console.log(isEligible(person));
          
          
    `,

          score: 7,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "0c7a2439-d9554c0f863f-4c1f5d7aa851",
          title: "Game Mode",
          description:
            "Given an array of friends (arrayOfFriends) to play the game.\nIf the number of friends is zero, the game mode is 'Solo'.\nIf the number of friends is one, the game mode is 'Dual'.\nIf the number of friends is other than zero and one, the game mode is 'Squad'.\nWrite a function 'getPreferredGameMode' that returns the preferred game mode based on the number of friends (length of arrayOfFriends).",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
             <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an array of strings (arrayOfFriends).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing the preferred game mode.</p>
              </div>
               <div>
                <p class="desc-que-blue">Constraints</p>
                <p>The keys of an object should be in quotes while giving the input.</p>
              </div>
            </div>
          `,

          sampleInput: "['Anand']",

          sampleOutput: "Dual",

          testCases: [
            {
              input: "[]",
              output: "Solo",
              visible: true,
            },
            {
              input: '["Anand"]',
              output: "Dual",
              visible: false,
            },
            {
              input: '["Anand", "Sita"]',
              output: "Squad",
              visible: false,
            },
          ],

          defaultCode: `
          // Read input
let arrayOfFriends = JSON.parse(prompt()); 

/*
 * Write your code here and log the output.
 */
function getPreferredGameMode(friends) {
  // Student will write code here
}

console.log(getPreferredGameMode(arrayOfFriends));

   
    `,

          score: 8,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    //Js Coding practice - 5
    {
      id: "js-coding-practice-5",
      title: "JS Coding Practice 5",
      description: "",
      questions: [
        {
          id: "4db4c9df-6d21-41cc-a381-25c9551210ee",
          title: "Sum of the values of an Array",
          description:
            "Given an array (myArray).\n Write a JS program to log the sum of the values of an array.",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
             <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an array of numbers.</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing the sum of the values of an array.</p>
              </div>
              <div>
                <p class="desc-que-blue">Constrains</p>
                <p>The values of an array should be the numbers.</p>
              </div>
            </div>
          `,

          sampleInput: "[12, 1, 2, 4, 1]",

          sampleOutput: `20`,

          testCases: [
            {
              input: "[12, 1, 2, 4, 1]",
              output: "20",
              visible: true,
            },
            {
              input: "[5, 10, 15]",
              output: "30",
              visible: true,
            },
            {
              input: "[100, 200, 300]",
              output: "600",
              visible: false,
            },
            {
              input: "[1, 1, 1, 1, 1]",
              output: "5",
              visible: false,
            },
          ],

          defaultCode: `
          // Read input
let myArray = eval(prompt());

/*
 * Write your code here and log the output.
 */


          `,
          score: 12,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "2483cd0c-12dd4981b83c-b9a6be60ac4c",
          title: "Log the values from each Object",
          description:
            "Given an array of objects (arrayOfInventions) in the prefilled code.\n Write a JS program to log the values of the given key (objectKey) from each object.",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
             <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain a string (objectKey).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The value of the given key (objectKey) from each object should be in a new line.</p>
              </div>
            </div>
          `,

          sampleInput: "name",

          sampleOutput: `Printing Press\nLight Buld\nTelephone\nAeroplane\nComputer`,

          testCases: [
            {
              input: "name",
              output:
                "Printing Press\nLight Buld\nTelephone\nAeroplane\nComputer",
              visible: true,
            },
            {
              input: "inventor",
              output:
                "Johannes Gutenberg\nThomas Edison\nAlexander Graham Bell\nWright Brothers\nCharles Babbage",
              visible: true,
            },
            {
              input: "year",
              output: "1440\n1879\n1876\n1903\n1822",
              visible: false,
            },
            {
              input: "country",
              output: "Germany\nUSA\nScotland\nUSA\nEngland",
              visible: false,
            },
          ],

          defaultCode: `
          // Prefilled array of objects
          let arrayOfInventions = [
            {
  name: "Printing Press",
  inventor: "Johannes Gutenberg",
  year: 1440,
  country: "Germany"
},
{
  name: "Light Buld",
  inventor: "Thomas Edison",
  year: 1879,
  country: "USA"
},
{
  name: "Telephone",
  inventor: "Alexander Graham Bell",
  year: 1876,
  country: "Scotland"
},
{
  name: "Aeroplane",
  inventor: "Wright Brothers",
  year: 1903,
  country: "USA"
},
{
  name: "Computer",
  inventor: "Charles Babbage",
  year: 1822,
  country: "England"
}
];

// Read input
let objectKey = prompt();

/*
* Write your code here and log the output.
*/

`,

          score: 12,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "1839d6c4-fa5f48d0be88-9f8606f58b76",
          title: "Eligibility to Vote",
          description:
            "Given an array of objects (arrayOfPersons) with the properties 'name' and 'age'.\n Write a JS program to log the names of the persons who are eligible to vote (age >= 18).",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
             <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an array of objects (arrayOfPersons).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>Each person's name should be in a new line.</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The keys of the object should be in quotes.</p>
              </div>
            </div>
          `,

          sampleInput:
            "[{'name': 'Rahul', 'age': 19 },{'name': 'Vinod', 'age': 10}, {'name':'Pavan', 'age': 11},{'name': 'Geetha', 'age': 17 }]",

          sampleOutput: `Rahul`,

          testCases: [
            {
              input:
                '[{"name":"Rahul","age":19},{"name":"Vinod","age":10},{"name":"Pavan","age":11},{"name":"Geetha","age":17}]',
              output: "Rahul",
              visible: true,
            },
            {
              input: '[{"name":"Anand","age":18},{"name":"Sita","age":25}]',
              output: "Anand\nSita",
              visible: true,
            },
            {
              input: '[{"name":"Raj","age":44},{"name":"Kiran","age":17}]',
              output: "Raj",
              visible: false,
            },
            {
              input:
                '[{"name":"Kiran","age":30},{"name":"Divya","age":18},{"name":"Nikhil","age":15}]',
              output: "Kiran\nDivya",
              visible: false,
            },
          ],

          defaultCode: `

          // Read input
let arrayOfPersons = JSON.parse(prompt());

/*
 * Write your code here and log the output.
 */
function logEligibleVoters(persons) {
  // Student will write code here
}

logEligibleVoters(arrayOfPersons);

          

            `,

          score: 12,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "47d6bda7-14e94f2c90ff-b201f9340c8a",
          title: "Indian Car Brand Names",
          description:
            "Given an array of objects (arrayOfCarBrands) with the properties 'name' and 'country'.\n Write a JS program to log an array of the Indian car brand names.\nThe Indian car brands have the country-'India' as a key-value pair",
          difficulty: "Easy",

          descriptionDetails: `
            <div class="desc-question-details">
             <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an array of objects (arrayOfCarBrands).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing the array of Indian car brand names.</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The keys of the object should be in quotes.</p>
              </div>
            </div>
          `,

          sampleInput:
            "[{'name': 'Chevrolet', 'country': 'America' },{'name': 'Maruthi Suzuki', 'country': 'India' },{'name':'Audi', 'country': 'Germany' },{'name': 'Tata', 'country': 'India' },{'name': 'Honda', 'country': 'Japan' }]",

          sampleOutput: `[ 'Maruti Suzuki', 'Tata' ]`,

          testCases: [
            {
              input:
                '[{"name":"Chevrolet","country":"America"},{"name":"Maruti Suzuki","country":"India"},{"name":"Audi","country":"Germany"},{"name":"Tata","country":"India"},{"name":"Honda","country":"Japan"}]',
              output: "['Maruti Suzuki', 'Tata']",
              visible: true,
            },
            {
              input:
                '[{"name":"Mahindra","country":"India"},{"name":"Hyundai","country":"South Korea"}]',
              output: "['Mahindra']",
              visible: true,
            },
            {
              input:
                '[{"name":"BMW","country":"Germany"},{"name":"Ford","country":"America"}]',
              output: "[]",
              visible: false,
            },
            {
              input:
                '[{"name":"Tata","country":"India"},{"name":"Maruti Suzuki","country":"India"}]',
              output: "['Tata', 'Maruti Suzuki']",
              visible: false,
            },
          ],
          defaultCode: `
          // Read input
          let arrayOfCarBrands = JSON.parse(prompt());
          
          /*
           * Write your code here and log the output.
           */
          function getIndianCarBrands(brands) {
            // Student will write code here
          }
          
          getIndianCarBrands(arrayOfCarBrands);
          
          
  `,

          score: 14,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    //Js Coding practice - 6
    {
      id: "js-coding-practice-6",
      title: "JS Coding Practice 6",
      description: "",
      questions: [
        {
          id: "fc77ba9c-c6d2454898d7-fe870b4459ed",
          title: "Array Includes Practice",
          description:
            "Given an array (myArray) and the value (val).\n Write a JS program to find whether an array (myArray) includes the given value (val) or not using the array method 'includes'.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain an array (myArray).\n The second line of input will contain any value.</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p class=""></p>The Output should be a single line containing the boolean value.</p>
              </div>
               <div>
                <p class="desc-que-blue">Constraints</p>
                <p class=""></p>Strings should be given in quotes.</p>
              </div>
          </div>
           `,
          sampleInput: "[3, 4, 5]\n4",
          sampleOutput: "true",
          testCases: [
            {
              input: "[3, 4, 5]\n4",
              output: "true",
              visible: true,
            },
            {
              input: "[10, 20, 30]\n25",
              output: "false",
              visible: true,
            },
            {
              input: "['apple', 'banana', 'mango']\n'banana'",
              output: "true",
              visible: true,
            },
            {
              input: "['red', 'blue', 'green']\n'yellow'",
              output: "false",
              visible: false,
            },
            {
              input: "[1, 2, 3, 4]\n5",
              output: "false",
              visible: false,
            },
          ],

          defaultCode: `
          // Read input
let myArray = eval(prompt());
let val = eval(prompt());


function checkIncludes(arr, value) {
  /*
 * Write your code here and log the output
 */
}

checkIncludes(myArray, val);

          `,
          score: 19,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "91931168-f088-430bb298-b94430d317e3",
          title: "Find the Index of First Occurrence of Value",
          description:
            "Given an array (myArray) and the value (val).\n Write a JS program to find the index of first occurrence of a value (val) in the given array (myArray) using the array method 'indexOf'./n  NOTE: If the values is not present in the array, indexOf returns '-1'.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain an array (myArray).\n The second line of input will contain any value.</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p class=""></p>The Output should be a single line containing the index or -1.</p>
              </div>
               <div>
                <p class="desc-que-blue">Constraints</p>
                <p class=""></p>Strings should be given in quotes.</p>
              </div>
          </div>
           `,
          sampleInput: "['a', 'b', 'c', 'b', 'a']\n'a'",
          sampleOutput: "0",
          testCases: [
            {
              input: "['a', 'b', 'c', 'b', 'a']\n'a'",
              output: "0",
              visible: true,
            },
            {
              input: "[10, 20, 30, 40]\n30",
              output: "2",
              visible: true,
            },
            {
              input: "['apple', 'banana', 'cherry']\n'banana'",
              output: "1",
              visible: true,
            },
            {
              input: "[1, 2, 3, 4, 5]\n6",
              output: "-1",
              visible: false,
            },
            {
              input: "['x', 'y', 'z']\n'a'",
              output: "-1",
              visible: false,
            },
            {
              input: "[true, false, true]\ntrue",
              output: "0",
              visible: false,
            },
          ],
          defaultCode: `
// Read input
let myArray = eval(prompt());
let val = eval(prompt());


function findIndex(myArray, val) {
  /*
  * Write your code here and log the output
  */
}

findIndex(myArray, val);


          `,
          score: 28,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "7be08e7b-b4f1-4bf187ad-ef5ef9614f18",
          title: "Find the First Occurrence of String",
          description:
            "Given an array (myArray).\n Write a JS program to find the first string in the given array (myArray) using the array method 'find'. \n NOTE: If the value is not present in the array, find returns 'undefined'.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain an array (myArray).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p class=""></p>The Output should be a single line containing the value or undefined.</p>
              </div>
              
          </div>
           `,
          sampleInput: "[23, 4.5, 'Asia', 7, 'Europe']",
          sampleOutput: "Asia",
          testCases: [
            {
              input: "[23, 4.5, 'Asia', 7, 'Europe']",
              output: "Asia",
              visible: true,
            },
            {
              input: "['Apple', 10, true, 'Banana']",
              output: "Apple",
              visible: true,
            },
            {
              input: "[100, 200, 300]",
              output: "undefined",
              visible: true,
            },
            {
              input: "[false, 'India', 'USA']",
              output: "India",
              visible: false,
            },
            {
              input: "['One', 'Two', 'Three']",
              output: "One",
              visible: false,
            },
            {
              input: "[1, 2, 3, 'Last']",
              output: "Last",
              visible: false,
            },
          ],

          defaultCode: `
// Read input
let myArray = eval(prompt());

function findFirstString(myArray) {
  /*
 * Write your code here and log the output.
 */
}

findFirstString(myArray);


          `,
          score: 28,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "8613fcc9-29eb-4c03b977-89b6de62e605",
          title: "Add a Value to the Begining od an Array",
          description:
            "Given an array (myArray) and the value (val).\n Write a JS program to add the given value (val) at the beginning of the array (myArray) using the array method 'unshift'.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain an array (myArray).\n The second line of input will contain any value.</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p class=""></p>The Output should be a single line containing the updated aray.</p>
              </div>
               <div>
                <p class="desc-que-blue">Constraints</p>
                <p class=""></p>Strings should be given in quotes.</p>
              </div>
              
          </div>
           `,
          sampleInput: "[2, 3, 4, 5]\n1",
          sampleOutput: "[ 1, 2, 3, 4, 5 ]",
          testCases: [
            {
              input: "[2, 3, 4, 5]\n1",
              output: "[1, 2, 3, 4, 5]",
              visible: true,
            },
            {
              input: "['b', 'c', 'd']\n'a'",
              output: "['a', 'b', 'c', 'd']",
              visible: true,
            },
            {
              input: "[10, 20]\n5",
              output: "[5, 10, 20]",
              visible: false,
            },
            {
              input: "[]\n100",
              output: "[100]",
              visible: false,
            },
            {
              input: "[true, false]\nfalse",
              output: "[false, true, false]",
              visible: false,
            },
            {
              input: "['JavaScript']\n'Learn'",
              output: "['Learn', 'JavaScript']",
              visible: false,
            },
          ],

          defaultCode: `
// Read input
let myArray = eval(prompt());
let val = eval(prompt());

function addAtBeginning(myArray, val) {
  /*
  * Write your code here and log the output.
  */
}

addAtBeginning(myArray, val);



          `,
          score: 28,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "c0ace370-fcfa-4ed0a94e-3d982bf1978d",
          title: "Concatenate Arrays",
          description:
            "Given two arrays (i.e. firstArray and secondArray).\n Write a JS program to concatenate two arrays using the array mehod 'concat'.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
          <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain an array (firstArray).\n The second line of input will contain an array (secondArray).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p class=""></p>The Output should be a single line containing the concatenated array (i.e. Items from the firstArray and secondArray respectively).</p>
              </div>
              
          </div>
           `,
          sampleInput: "[1, 2]\n['Cricket', 'Football']",
          sampleOutput: "[ 1, 2, 'Cricket', 'Football' ]",
          testCases: [
            {
              input: "[1, 2]\n['Cricket', 'Football']",
              output: "[1, 2, 'Cricket', 'Football']",
              visible: true,
            },
            {
              input: "['a', 'b']\n['c', 'd']",
              output: "['a', 'b', 'c', 'd']",
              visible: true,
            },
            {
              input: "[10, 20]\n[30, 40]",
              output: "[10, 20, 30, 40]",
              visible: true,
            },
            {
              input: "[]\n[1, 2, 3]",
              output: "[1, 2, 3]",
              visible: false,
            },
            {
              input: "['JS']\n[]",
              output: "['JS']",
              visible: false,
            },
          ],

          defaultCode: `
// Read input
let firstArray = eval(prompt());
let secondArray = eval(prompt());


function concatenateArrays(firstArray, secondArray) {
  /*
  * Write your code here and log the output.
  */
}

concatenateArrays(firstArray, secondArray);



          `,
          score: 19,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    //JS coding practice - 7
    {
      id: "js-coding-practice-7",
      title: "JS Coding Practice 7",
      description: "",
      questions: [
        {
          id: "655560e5-6294-457cb253-d7e8d1d6b93f",
          title: "Remove First Value",
          description:
            "Given an array (myArray), write a JS program to remove value at the first index of the array using 'shift()' method.\n Log the extracted value ad updated array in the console.",
          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain an array (myArray).</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The first line of output should contain the value extracted from the array.</p>
              <p class=""></p>The second line of output should contain the updated array.</p>
            </div>
          </div>
           `,
          sampleInput: "[ 'A', 1, 2, 3 ]",
          sampleOutput: "A\n[ 1, 2, 3 ]",
          testCases: [
            {
              input: "['A', 1, 2, 3]",
              output: "A\n[1, 2, 3]",
              visible: true,
            },
            {
              input: "[10, 20, 30]",
              output: "10\n[20, 30]",
              visible: true,
            },
            {
              input: "['X', 'Y', 'Z']",
              output: "X\n['Y', 'Z']",
              visible: false,
            },
            {
              input: "[true, false, true]",
              output: "true\n[false, true]",
              visible: false,
            },
            {
              input: "[100]",
              output: "100\n[]",
              visible: false,
            },
          ],

          defaultCode: `
          // Read input
let myArray = eval(prompt());

function removeFirstValue(arr) {
  
/*
* Write your code here and log the output.
*/
}

removeFirstValue(myArray);

          `,
          score: 19,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "249f9dcb-d541-40f7b396-295c0a524f5b",
          title: "Find the Index of the Last Occurrence of Value",
          description:
            "Given an array (myArray) and the value (val), write a JS program to find the index of the last occurrence of value in the given array using 'lastIndexOf()' method.\n NOTE: If the value is not present in the array, lastIndexOf() returns '-1'.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain an array (myArray).<br/> The Second line of input will contain any value (val).</p>
                
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be a single line containing the index or -1.</p>
            </div>
          </div>
           `,
          sampleInput: "[ 7.2, 4.5, 8.6, 4.5 ]",
          sampleOutput: "4.5",
          testCases: [
            {
              input: "[7.2, 4.5, 8.6, 4.5]\n4.5",
              output: "3",
              visible: true,
            },
            {
              input: "[1, 2, 3, 2, 1]\n2",
              output: "3",
              visible: true,
            },
            {
              input: "['a', 'b', 'c', 'b']\n'b'",
              output: "3",
              visible: false,
            },
            {
              input: "[10, 20, 30]\n40",
              output: "-1",
              visible: false,
            },
            {
              input: "[true, false, true]\ntrue",
              output: "2",
              visible: false,
            },
            {
              input: "['x']\n'x'",
              output: "0",
              visible: false,
            },
          ],
          defaultCode: `
// Read input
let myArray = eval(prompt());
let val = eval(prompt());


function findLastIndex(arr, value) {
  /*
  * Write your code here and log the output.
  */
}

findLastIndex(myArray, val);


          `,
          score: 28,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "d63c5768-87904030b20d-f87b1734c5f9",
          title: "Sorting Array Values",
          description:
            "Given an array (myArray), write a JS program to sort the array values in the ascending order using 'sort()' method.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input will contain an array (myArray).</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be a single line containing the sorted array.</p>
            </div>
          </div>
           `,
          sampleInput: "[ 2, 3, 1 ]",
          sampleOutput: "[ 1, 2, 3]",
          testCases: [
            {
              input: "[2, 3, 1]",
              output: "[1, 2, 3]",
              visible: true,
            },
            {
              input: "[5, 1, 4, 2]",
              output: "[1, 2, 4, 5]",
              visible: true,
            },
            {
              input: "[10, 3, 20, 1]",
              output: "[1, 3, 10, 20]",
              visible: false,
            },
            {
              input: "[7]",
              output: "[7]",
              visible: false,
            },
            {
              input: "[9, 8, 7, 6]",
              output: "[6, 7, 8, 9]",
              visible: false,
            },
            {
              input: "[100, 2, 50]",
              output: "[2, 50, 100]",
              visible: false,
            },
          ],
          defaultCode: `
// Read input
let myArray = eval(prompt());


function sortArray(arr) {
  /*
  * Write your code here and log the output.
  */
}

sortArray(myArray);

          `,
          score: 28,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "1bd1b072-4530-43df-b373-ec9ad99fbc94",
          title: "Joining Array Values",
          description:
            "Given an array (myArray) and the string (separator), write a JS Program to join the array values using the separator and 'join()' method.",
          difficulty: "Easy",
          descriptionDetails: `
            <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an array (myArray)
                The second line of input will contain a string (separator).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line string of combined array values.</p>
              </div>
            </div>
          `,
          sampleInput: "[ 1, 2, 3, 4, 5 ]",
          sampleOutput: "+",
          testCases: [
            {
              input: "[1, 2, 3]\n+",
              output: "1+2+3",
              visible: true,
            },
            {
              input: "['a', 'b', 'c']\n-",
              output: "a-b-c",
              visible: false,
            },
            {
              input: "[10, 20, 30]\n:",
              output: "10:20:30",
              visible: false,
            },
            {
              input: "['JS', 'HTML', 'CSS']\n, ",
              output: "JS, HTML, CSS",
              visible: true,
            },
            {
              input: "[5]\n+",
              output: "5",
              visible: false,
            },
          ],
          defaultCode: `
        // Read input
        let myArray = eval(prompt()); // handles single quotes
        let separator = prompt();
        
        function joinArray(arr, sep) {
          // Join array using separator
          let result = arr.join(sep);
          console.log(result);
        }
        
        joinArray(myArray, separator);
          `,
          score: 19,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "68fb2ebf-3b964514a9c0-093a153655d9",
          title: "Array Slicing",
          description:
            "Given an array (myArray) and the two integers (startIndex and endIndex), Write a JS Program to slice the myArray from the start index to end index using 'slice()' method.",
          difficulty: "Easy",
          descriptionDetails: `
            <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an array (myArray)
                The second and third lines of input will contain whole numbers (startIndex and endIndex respectively).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing the sliced array.</p>
              </div>
              <div>
                <p class="desc-que-blue">Constraints</p>
                <p>0 <= startIndex, endIndex < myArray.length</p>
              </div>
            </div>
          `,
          sampleInput: "[ 2, 4, 6, 8 ]\n1\n3",
          sampleOutput: "[4, 6]",
          testCases: [
            {
              input: "[2, 4, 6, 8]\n1\n3",
              output: "[4, 6]",
              visible: true,
            },
            {
              input: "['a', 'b', 'c', 'd']\n0\n2",
              output: "['a', 'b']",
              visible: true,
            },
            {
              input: "[10, 20, 30, 40, 50]\n2\n5",
              output: "[30, 40, 50]",
              visible: false,
            },
            {
              input: "[1, 2, 3, 4, 5]\n4\n5",
              output: "[5]",
              visible: false,
            },
            {
              input: "[100, 200, 300]\n0\n1",
              output: "[100]",
              visible: false,
            },
          ],

          defaultCode: `
// Read input
let myArray = eval(prompt());
let startIndex = parseInt(prompt());
let endIndex = parseInt(prompt());


function sliceArray(arr, start, end) {
  /*
  * Write your code here
  */
}

sliceArray(myArray, startIndex, endIndex);
          
          `,
          score: 19,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "1dbf1b1d-8f6a-a2f7df974716",
          title: "Find the Index of First Boolean Value",
          description:
            "Given an array (myArray), Write a JS program to find the index of the first boolean value in myArray using 'findIndex()' method.\n NOTE: If the value is not present in the array, findIndex() returns '-1'.",
          difficulty: "Easy",
          descriptionDetails: `
            <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an array (myArray).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing the index or -1.</p>
              </div>
            </div>
          `,
          sampleInput: "[ 'a', true, 'v', 5 ]",
          sampleOutput: "1",
          testCases: [
            {
              input: "[ 'a', true, 'v', 5 ]",
              output: "1",
              visible: true,
            },
            {
              input: "[ 1, 2, 3, true ]",
              output: "3",
              visible: true,
            },
            {
              input: "[ 'hello', 25, 'world' ]",
              output: "-1",
              visible: false,
            },
            {
              input: "[ false, true, false ]",
              output: "0",
              visible: false,
            },
          ],
          defaultCode: `
// Read input
let myArray = eval(prompt());  // converts array with single quotes

function findFirstBooleanIndex(arr) {
  /*
* Write your code here
*/
}

findFirstBooleanIndex(myArray);



`,
          score: 19,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "26dd0180-d6bb-222f07fe13b2",
          title: "Replacing the Array Values",
          description:
            "Given an array (myArray), start index (startIndex), delete count (deleteCount), and two values (firstVal and secondVal)\n Write a JS program to replace the array's existing values from the start index, with the new values using the 'splice()' method.",
          difficulty: "Easy",
          descriptionDetails: `
            <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p>The first line of input will contain an array (myArray).\n The second and third lines of input will contain the whole numbers (startIndex and deleteCount respectively).\n The fourth and fifth lines of input will contain any values (firstVal and secondVal respectively).</p>
              </div>
              <div>
                <p class="desc-que-blue">Output</p>
                <p>The output should be a single line containing the updated array.</p>
              </div>
              <div>
                <p class="desc-que-blue">Constraints</p>
                <p>Strings should be given in quotes.\n 0 <= startIndex < myArray.length/n 0 <= deleteCount <= myArray.length - startIndex</p>
              </div>
            </div>
          `,
          sampleInput: "[1, 2, 3, 4]\n0\n2\n'a'\n'b'",
          sampleOutput: "['a', 'b', 3, 4]",
          testCases: [
            {
              input: "[1, 2, 3, 4]\n0\n2\n'a'\n'b'",
              output: "['a', 'b', 3, 4]",
              visible: true,
            },
            {
              input: "[10, 20, 30, 40]\n1\n2\n100\n200",
              output: "[10, 100, 200, 40]",
              visible: true,
            },
            {
              input: "['x', 'y', 'z']\n0\n1\n'a'\n'b'",
              output: "['a', 'b', 'y', 'z']",
              visible: false,
            },
            {
              input: "[1, 2, 3, 4, 5]\n2\n0\n8\n9",
              output: "[1, 2, 8, 9, 3, 4, 5]",
              visible: false,
            },
          ],

          defaultCode: `
// Read input
let myArray = eval(prompt());
let startIndex = parseInt(prompt());
let deleteCount = parseInt(prompt());
let firstVal = eval(prompt());
let secondVal = eval(prompt());

function replaceValues(arr, start, delCount, val1, val2) {
  /*
  * Write your code here
  */
}

replaceValues(myArray, startIndex, deleteCount, firstVal, secondVal);

          `,
          score: 22,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    //JS Coding Test - 1
    {
      id: "javascript-coding-test-1",
      title: "JS Coding Test 1",
      description: "",
      questions: [
        {
          id: "7232feb4-ccd9-44ed-b479-4e0a9c5f-9e379ee36bbd",
          title: "Min & Max Values in an Array",
          description:
            "Given an array myArray of integers, write a JS program to find the minimum and maximum values in the array. Minimum and maximum values will be the same in case the array consists of only one value.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The input will be a single line containing an array myArray.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should contain an object with keys as min, max and its corresponding minimum and maximum values.</p>
            </div>
          </div>
           `,
          sampleInput: "[1, 4, 2, 7, 9, 3, 5]",
          sampleOutput: "{ min: 1, max: 9 }",
          testCases: [
            {
              input: "[1, 4, 2, 7, 9, 3, 5]",
              output: "{ min: 1, max: 9 }",
              visible: true,
            },
            {
              input: "[10]",
              output: "{ min: 10, max: 10 }",
              visible: true,
            },
            {
              input: "[-5, -1, -9, -3]",
              output: "{ min: -9, max: -1 }",
              visible: false,
            },
            {
              input: "[100, 50, 200, 150]",
              output: "{ min: 50, max: 200 }",
              visible: false,
            },
          ],

          defaultCode: `
// Read input
let myArray = eval(prompt());

function findMinMax(arr) {
  /*
  * Write your code here
  */
}

findMinMax(myArray);


          `,
          score: 18,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "7232feb4-ccd9-4afb-b5ed-065b4850f407",
          title: "Data Type Report",
          description:
            "Given an array myArray, write a JS program to find the count of number, object, string, boolean data type values in the array.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The input will be a single line containing an array myArray.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should contain an object with data types as keys and corresponding count as value as shown in the sample outputs.</p>
            </div>
             <div>
              <p class="desc-que-blue">Constraints</p>
              <p class=""></p>The keys of an object should be in quotes while giving the input.</p>
            </div>
          </div>
           `,
          sampleInput: "[1, '2', true, {'a': 'b'}, false]",
          sampleOutput: "{ number: 1, object: 1, string: 1, boolean: 2 }",
          testCases: [
            {
              input: "[1, '2', true, {'a': 'b'}, false]",
              output: "{ number: 1, object: 1, string: 1, boolean: 2 }",
              visible: true,
            },
            {
              input: "[10, 20, 30]",
              output: "{ number: 3, object: 0, string: 0, boolean: 0 }",
              visible: true,
            },
            {
              input: "['a', 'b', 'c']",
              output: "{ number: 0, object: 0, string: 3, boolean: 0 }",
              visible: false,
            },
            {
              input: "[true, false, true]",
              output: "{ number: 0, object: 0, string: 0, boolean: 3 }",
              visible: false,
            },
            {
              input: "[{'x':1}, {'y':2}]",
              output: "{ number: 0, object: 2, string: 0, boolean: 0 }",
              visible: false,
            },
            {
              input: "[1, 'hello', false, 5, {'a':10}]",
              output: "{ number: 2, object: 1, string: 1, boolean: 1 }",
              visible: false,
            },
            {
              input: "[]",
              output: "{ number: 0, object: 0, string: 0, boolean: 0 }",
              visible: false,
            },
          ],
          defaultCode: `
// Read input
let myArray = eval(prompt());

function dataTypeReport(arr) {
  /*
  * Write your code here
  */
}

dataTypeReport(myArray);


          `,
          score: 45,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "7232feb4-ccd9-44ed-4afb-b5ed-065b4850f407",
          title: "Find the Duplicate in an Array",
          description:
            "Given an array myArray, write a JS program to find the duplicate item in the array.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The input will be a single line containing an array myArray.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be a single line containing the duplicate item or false if no duplicate item is present in the myArray.</p>
            </div>
             <div>
              <p class="desc-que-blue">Constraints</p>
              <p class=""></p>The keys of an object should be in quotes while giving the input.</p>
            </div>
          </div>
           `,
          sampleInput: "[1, 2, 3, 4, 5, 6, 7, 7, 8]",
          sampleOutput: "7",
          testCases: [
            {
              input: "[1, 2, 3, 4, 5, 6, 7, 7, 8]",
              output: "7",
              visible: true,
            },
            {
              input: "['a', 'b', 'b', 'c']",
              output: "b",
              visible: true,
            },
            {
              input: "[10, 20, 30, 40]",
              output: "false",
              visible: false,
            },
            {
              input: "[true, false, true]",
              output: "true",
              visible: false,
            },
            {
              input: "[5, 1, 2, 3, 2, 4]",
              output: "2",
              visible: false,
            },
          ],
          defaultCode: `
// Read input
let myArray = eval(prompt());

function findDuplicate(arr) {
  /*
  * Write your code here
  */
}

findDuplicate(myArray);


          `,
          score: 25,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "7232feb4-ccd9-b5ed-065b4850f407",
          title: "Sports Data",
          description:
            "There is a sports competition in a school and each student is allowed to participate in only one sport.\n Given an array sportsData of arrays,the first item of each array consists of the name of the student and the second item consists of the sport in which the student has registered.\nWrite a JS program to consolidate the sata so that each student should participate in only one sport. If duplicate entries are found, consider the last entry.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The input will be a single line containing an array sportsData.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be an object with student names as keys and the latest game they registered as its corresponding value</p>
            </div>
          </div>
           `,
          sampleInput:
            "[ ['Arjun', 'Cricket'], ['Ronaldo', 'Football'], ['Pardeep', 'Volley ball'] ]",
          sampleOutput:
            "{ Arjun: 'Cricket', Ronaldo: 'Football', Pardeep: 'Volley ball' }",
          testCases: [
            {
              input:
                "[ ['Arjun', 'Cricket'], ['Ronaldo', 'Football'], ['Pardeep', 'Volley ball'] ]",
              output:
                "{ Arjun: 'Cricket', Ronaldo: 'Football', Pardeep: 'Volley ball' }",
              visible: true,
            },
            {
              input: "[ ['Arjun', 'Cricket'], ['Arjun', 'Football'] ]",
              output: "{ Arjun: 'Football' }",
              visible: true,
            },
            {
              input: "[ ['A', 'Chess'], ['B', 'Tennis'], ['A', 'Cricket'] ]",
              output: "{ A: 'Cricket', B: 'Tennis' }",
              visible: false,
            },
            {
              input: "[ ['Ravi', 'Kabaddi'] ]",
              output: "{ Ravi: 'Kabaddi' }",
              visible: false,
            },
            {
              input:
                "[ ['John', 'Baseball'], ['Mike', 'Hockey'], ['John', 'Basketball'], ['Mike', 'Football'] ]",
              output: "{ John: 'Basketball', Mike: 'Football' }",
              visible: false,
            },
          ],
          defaultCode: `



          `,
          score: 25,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "7232feb4-ccd9-44ed-b5ed-065b4850f407",
          title: "Cumulative Sum",
          description:
            "Given an array integers, Write a JS program to get the cumulative sum of items in the array.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The input will be a single line containing an array integers.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be a single line containing an array with cumulative sum values.</p>
            </div>
          </div>
           `,
          sampleInput: "[1, 10, 100, 1000]",
          sampleOutput: "[ 1, 11, 111, 111 ]",
          testCases: [
            {
              input: "[1, 10, 100, 1000]",
              output: "[1, 11, 111, 1111]",
              visible: true,
            },
            {
              input: "[5, 5, 5, 5]",
              output: "[5, 10, 15, 20]",
              visible: true,
            },
            {
              input: "[2, 4, 6, 8]",
              output: "[2, 6, 12, 20]",
              visible: false,
            },
            {
              input: "[0, 1, 2, 3]",
              output: "[0, 1, 3, 6]",
              visible: false,
            },
            {
              input: "[10, -5, 5, 10]",
              output: "[10, 5, 10, 20]",
              visible: false,
            },
          ],

          defaultCode: `


          `,
          score: 25,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "7232feb4-ccd9-065b4850f407",
          title: "Common Items in Three Arrays",
          description:
            "Given three arrays arr1, arr2, and arr3, Write a JS program to find the common items among the threee arrays.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input contains an array arr1.<br/> The second line of input contains an array arr2.<br/>The third line of input contains an array arr3.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be a single line containing an array of common items among the three arrays.</p>
            </div>
          </div>
           `,
          sampleInput:
            "[1, 2, 3, 'cat']\n[1, 'cat', 7, 10]\n[1, 'cat', 16, 64]",
          sampleOutput: "[ 1, 'cat' ]",
          testCases: [
            {
              input: "[1, 2, 3, 'cat']\n[1, 'cat', 7, 10]\n[1, 'cat', 16, 64]",
              output: "[1, 'cat']",
              visible: true,
            },
            {
              input: "[10, 20, 30]\n[5, 10, 15, 20]\n[10, 40, 50]",
              output: "[10]",
              visible: true,
            },
            {
              input: "['a', 'b', 'c']\n['b', 'c', 'd']\n['c', 'b']",
              output: "['b', 'c']",
              visible: true,
            },
            {
              input: "[1, 2, 3]\n[4, 5, 6]\n[7, 8, 9]",
              output: "[]",
              visible: true,
            },
          ],

          defaultCode: `

// Read input
let arr1 = eval(prompt());
let arr2 = eval(prompt());
let arr3 = eval(prompt());

function findCommonItems(a1, a2, a3) {
  /*
  * Write your code here
  */
}

findCommonItems(arr1, arr2, arr3);
          
          `,
          score: 18,
          status: "unsolved",
          attempts: [],
        },
      ],
    },

    //JS Coding Test - 2
    {
      id: "javascript-coding-test-2",
      title: "JS Coding Test 2",
      description: "",
      questions: [
        {
          id: "e8f49aad-62e3-a233-b71b6d1ab82d",
          title: "Concatenate and Remove Duplicates",
          description:
            "Given two arrays arr1 and arr2 of positive integers.\n Write a JS program to concatenate two arrays and remove the duplicate items from the concatenated array.\n Log the array with unique items in ascending order.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input contains an array arr1.<br/> The second line of input contains an array arr2.</br> The third line of input contains an array arr3.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be an array containing the unique items ascending order.</p>
            </div>
          </div>
           `,
          sampleInput: "[1, 4, 7, 3, 7, 3, 3]\n[2, 4, 5, 5, 3, 2, 1]",
          sampleOutput: "[1, 2, 3, 4, 5, 7]",
          testCases: [
            {
              input: "[1, 4, 7, 3, 7, 3, 3]\n[2, 4, 5, 5, 3, 2, 1]",
              output: "[1, 2, 3, 4, 5, 7]",
              visible: true,
            },
            {
              input: "[10, 20, 30]\n[5, 10, 15]",
              output: "[5, 10, 15, 20, 30]",
              visible: true,
            },
            {
              input: "[8, 8, 8]\n[8, 8, 8]",
              output: "[8]",
              visible: false,
            },
            {
              input: "[9, 1, 6]\n[4, 2, 6]",
              output: "[1, 2, 4, 6, 9]",
              visible: false,
            },
          ],

          defaultCode: `
          // Read input
          let arr1 = eval(prompt());
          let arr2 = eval(prompt());
          
          function concatenateAndRemoveDuplicates(a1, a2) {
            /*
            * Write your code here
            */
          }
          
          concatenateAndRemoveDuplicates(arr1, arr2);
          

          `,
          score: 18,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "e8f49aad-62e3-41dd-a233-b71b6d1ab82d",
          title: "Replacing Array Item",
          description:
            "Given  an array myArray, targetItem, and a replaceItem, Write a JS program to replace the targetItem with the given replaceItem in myArray.\n If myArray consists of more than one targetItem replace the first occurrence.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input contains an array myArray.<br/> The second line of input contains a targetItem.<br/> The third line of input contains a replaceItem.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be an array containing the replaced item.</p>
            </div>
          </div>
           `,
          sampleInput: "[1, 2, 3, 'four', 5, 6]\n'four'\n4",
          sampleOutput: "[1, 2, 3, 4, 5, 6]",
          testCases: [
            {
              input: "[1, 2, 3, 'four', 5, 6]\n'four'\n4",
              output: "[1, 2, 3, 4, 5, 6]",
              visible: true,
            },
            {
              input: "['a', 'b', 'c', 'b']\n'b'\n'x'",
              output: "['a', 'x', 'c', 'b']",
              visible: true,
            },
            {
              input: "[10, 20, 30, 20]\n20\n99",
              output: "[10, 99, 30, 20]",
              visible: false,
            },
            {
              input: "[5, 6, 7]\n8\n100",
              output: "[5, 6, 7]",
              visible: false,
            },
          ],

          defaultCode: `
// Read input
let myArray = eval(prompt());
let targetItem = eval(prompt());
let replaceItem = eval(prompt());

function replaceArrayItem(arr, target, replace) {
  /*
  * Write your code here
  */
}

replaceArrayItem(myArray, targetItem, replaceItem);


          `,
          score: 18,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "e8f49aad-a233-b71b6d1ab82d",
          title: "Find the First Value",
          description:
            "Given an array myArray of positive integers, write a JS program to find the first smallest integer divisible by 2 and 3.\n Log the number or undefined in case no integer is found divisible by 2 and 3.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The input will be a single line containing an array myArray.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be a single line containing a number divisible by 2 and 3 or undefined.</p>
            </div>
          </div>
           `,
          sampleInput: "[51, 18, 15, 12]",
          sampleOutput: "12",
          testCases: [
            {
              input: "[51, 18, 15, 12]",
              output: "12",
              visible: true,
            },
            {
              input: "[5, 7, 11, 13]",
              output: "undefined",
              visible: true,
            },
            {
              input: "[6, 12, 18]",
              output: "6",
              visible: false,
            },
            {
              input: "[25, 30, 60]",
              output: "30",
              visible: false,
            },
            {
              input: "[1, 2, 3, 4, 5, 6]",
              output: "6",
              visible: false,
            },
          ],

          defaultCode: `
// Read input
let myArray = eval(prompt());

function findFirstValue(arr) {
  /*
  * Write your code here
  */
}

findFirstValue(myArray);


          `,
          score: 25,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "e8f49aad-62e3-41dd-acf3-42bb-a233-b71bab82d",
          title: "Squares of Array Items",
          description:
            "Given an array myArray, write a JS program to get the squares of each item in the given myArray.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The input will be a single line containing an array myArray, myArray consists of numbers and arrays.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be an array containing the square of each item.</p>
            </div>
          </div>
           `,
          sampleInput: "[ [1,2], [3, 4], [5, 6] ]",
          sampleOutput: "[ [ 1, 4 ], [ 9, 16 ], [ 25, 36 ] ]",
          testCases: [],
          defaultCode: `


          `,
          score: 18,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "e8f49aad-62e3-41dd-a233-b71b6d1ab82d",
          title: "Product of Array Items",
          description:
            "Given an array integers, write a JS program to get the product of the integers in the given array.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The input will be a single line containing an array integers.</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be a single line string containing the product as shown in sample outputs.</p>
            </div>
          </div>
           `,
          sampleInput: "[1, 2, 3]",
          sampleOutput: "1 * 2 * 3 = 6",
          testCases: [],
          defaultCode: `


          `,
          score: 13,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "e8f49aad-62e3-235c-42bb-a233-b71b6d1ab82d",
          title: "Magical Indices",
          description:
            "Given an array of integers and a number x. An index is valid if /n item y at an index is increased by x and /n x+y would be greater than the sum of all other items in the array. /n Write a JS program to determine the number of valid indices.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The first line of input contains an array./n The second line of input contains a number</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The output should be a number indicating the number of valid positions.</p>
            </div>
             <div>
              <p class="desc-que-blue">Explanation</p>
              <p class=""></p>For example, an array A = [10,20,30] and a value x = 25./nWe have values 10, 20, 30 at indices 0,1,2 respectively.</p>
              <p class=""></p>Here index 0 is invalid because /n 10 + 25 = 35 is less than 20 + 30 = 50.</p>
              <p class=""></p>Here index 1 is valid because /n 20 + 25 = 45 is greater than 10 + 30 = 40.</p>
              <p class=""></p>Here index 2 is valid because /n 30 + 25 = 55 is greater than 10 + 20 = 30.</p>
              <p class=""></p>So there are 2 valid indices.</p>
            </div>
          </div>
           `,
          sampleInput: "[1, 2, 3, 5, 7]",
          sampleOutput: 13,
          testCases: [],
          defaultCode: `


          `,
          score: 25,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "e8f49aad-62e3-235c-42bb-a233-b71b6d1ab82d",
          title: "Person Details",
          description:
            "Given an object person containing a person's details, Write a JS program to log the name, address, and nicknames count.",

          difficulty: "Easy",
          descriptionDetails: `
          <div class="desc-question-details">
              <div>
                <p class="desc-que-blue">Input</p>
                <p class=""></p>The input will be a single line containing an object person</p>
              </div>
              <div>
              <p class="desc-que-blue">Output</p>
              <p class=""></p>The first line of output should contain the name and address of the person as shown in the sample output.</p>
              <p class=""></p>The second line of output should contain the nicknames count as shown in the sample output.</p>
            </div>
           <div>
                <p class="desc-que-blue">Constraints</p>
                <p class=""></p>The keys of an object should be in quotes while giving the input</p>
              </div>
          </div>
           `,
          sampleInput:
            "{ 'name': 'Pranay', 'address': { 'city': 'Mumbai', 'state': 'Maharashtra' }, 'nickNames': ['Nani', 'Chanti'] }",
          sampleOutput:
            "Pranay is from Mumbai, Maharashtra/n Pranay has 2 nicknames",
          testCases: [],
          defaultCode: `


          `,
          score: 11,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
  ],
};
