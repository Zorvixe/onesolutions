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
  ],
};
