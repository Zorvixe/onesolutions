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
                  <ul><li>Open Sans</li></ul><hr>

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
  ],
};
