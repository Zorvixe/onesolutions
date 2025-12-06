export const staticCodingPracticesData = {
  static: [
    {
      id: "static-coding-practice-1",
      title: "Static Coding Practice 1",
      description:
        "Build a Todolist by applying the concepts we learned till now.",
      questions: [
        {
          id: "91bcc4c6-0533-40bd-814f-a37b81618319",
          title: "Build Todolist",
          description:
            "Create a responsive Todolist interface matching the design specifications",
          difficulty: "Easy",
          score: 100,
          type: "web",
          defaultCode: {
            html: ``,
            css: "",
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
              <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below image.</p>
                <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764316021/Coding_Practice_-1-todolist-001_hy94wb.png" class="desc-que-img" />
                <p class="desc-que-blue">Note:</p>
                <p class="">Try to achieve the design as close as possible.</p>
                <p class="desc-que-blue">Resources</p>
                <p class="">Use this background image,</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764316062/Coding_Practice_-1-todolist-002_pchk7n.png">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764316062/Coding_Practice_-1-todolist-002_pchk7n.png</a></p>
                <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764316062/Coding_Practice_-1-todolist-002_pchk7n.png" class="desc-que-img" />
                <p class="desc-que-blue">CSS Colors used:</p>
                <p class="">Background color for button:</p>
                <ul>
                  <li><span>Orange</span></li>
                </ul>
                <p class="">Text color:</p>
                <ul>
                  <li><span>white</span></li>
                </ul>
                <p class="desc-que-blue">CSS Font families used:</p>
                <ul>
                  <li><span>Roboto</span></li>
                </ul>
                <p class="desc-que-blue">Concepts Review</p>
                <p class="">Want to quickly review some of the concepts you've been learning?</p>
                <p class="">Take a look at the Cheat Sheets.</p>
              </div>
            `,
          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML main heading element in an HTML container element",
              type: "html-validation",
              input: "check-heading-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML paragraph element in an HTML container element",
              type: "html-validation",
              input: "check-paragraph-container",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML button element in an HTML container element",
              type: "html-validation",
              input: "check-button-container",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the CSS property text-align and the value center",
              type: "css-validation",
              input: "check-text-align-center",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },
          ],
          sampleInput: "No specific input required",
          sampleOutput: "A Todolist UI matching the design specifications",
        },
      ],
    },
    {
      id: "static-coding-practice-2",
      title: "Static Coding Practice 2",
      description:
        "In this assignment, let's build a Chat Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0533-40bd-814f-a37b81618320",
          title: "Chat Page",
          description:
            "Create a responsive grid layout that works on mobile and desktop",
          difficulty: "Medium",
          score: 150,
          type: "web",
          defaultCode: {
            html: "",
            css: "",
            javascript: "",
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below image.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764766519/static_website_chat_page_pmxf3c.png" class="desc-que-img" />
              <p class="desc-que-blue">Note:</p>
              <p class="">Try to achieve the design as close as possible.</p>
              <p class="desc-que-blue">Resources</p>
              <p class="">Use this background image,</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764766568/chatpage_bg_lbbdwy.png">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764766568/chatpage_bg_lbbdwy.png</a></p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764766568/chatpage_bg_lbbdwy.png" class="desc-que-img" />
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color for button:</p>
              <ul>
                <li><span>Orange</span></li>
              </ul>
              <p class="">Text color:</p>
              <ul>
                <li><span>white</span></li>
              </ul>
              <p class="desc-que-blue">CSS Font families used:</p>
              <ul>
                <li><span>Roboto</span></li>
              </ul>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML main heading element in an HTML container element",
              type: "html-validation",
              input: "check-heading-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of at least three HTML paragraph elements in an HTML container element",
              type: "html-validation",
              input: "check-paragraph-container",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML paragraph element with the CSS property text-align and value right",
              type: "css-validation",
              input: "check-text-align-right",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the CSS property text-align and the value center",
              type: "css-validation",
              input: "check-text-align-center",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of at least an HTML paragraph element with the property border-top-left-radius",
              type: "css-validation",
              input: "check-border-top-left-radius",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "Page should consist of at least an HTML paragraph element with the property border-top-right-radius",
              type: "css-validation",
              input: "check-border-top-right-radius",
              output: "true",
              visible: true,
            },
            {
              id: 8,
              description:
                "Page should consist of an HTML element with the CSS property `padding` and its value should be greater than `0`px.",
              type: "css-validation",
              input: "check-padding",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "static-coding-practice-3",
      title: "Static Coding Practice 3",
      description:
        "In this assignment, let's build a Coding Cover Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0533-40bd-814f-a37b81618321",
          title: "Coding Cover Page",
          description:
            "In this assignment, let's build a Coding Cover Page by applying the Bootstrap concepts we learned till now.",
          difficulty: "Easy",
          score: 150,
          type: "web",
          defaultCode: {
            html: "",
            css: "",
            javascript: "",
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below image.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764868270/coding-v1_zcnbtk.png" class="desc-que-img" />
              <p class="desc-que-blue">Note:</p>
              <p class="">Try to achieve the design as close as possible.</p>
              <p class="desc-que-blue">Resources</p>
              <p class="">Use this background image,</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764868270/codingbg_bagxgp.png">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764868270/codingbg_bagxgp.png</a></p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764868270/codingbg_bagxgp.png" class="desc-que-img" />
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code value for card:</p>
              <ul>
                <li><span>#00000080</span></li>
              </ul>
              <p class="">Border color Hex Code value for card:</p>
              <ul>
                <li><span>#48ee59</span></li>
              </ul>
              <p class="desc-que-blue">CSS Font families used:</p>
              <ul>
                <li><span>Bree Serif</span></li>
              </ul>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-column",
              type: "html-validation",
              input: "check-flex-column", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-center",
              type: "html-validation",
              input: "check-justify-content-center", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of at least an HTML container element with the CSS property border-style",
              type: "css-validation",
              input: "check-border-style", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the CSS property `border-width` and its value should be greater than `0` px.",
              type: "css-validation",
              input: "check-border-width", // ✔ Updated
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "static-coding-practice-4",
      title: "Static Coding Practice 4",
      description:
        "In this assignment, let's build a Food Order Page by applying the Bootstrap concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0534-40bd-815f-a37b81618322",
          title: "Food Order Page",
          description:
            "In this assignment, let's build a Food Order Page by applying the Bootstrap concepts we learned till now.",
          difficulty: "Easy",
          score: 150,
          type: "web",
          defaultCode: {
            html: "",
            css: "",
            javascript: "",
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below image.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764872997/food_order_lndzbu.png" class="desc-que-img" />
              <p class="desc-que-blue">Note:</p>
              <p class="">Try to achieve the design as close as possible.</p>
              <p class="desc-que-blue">Resources</p>
              <p class="">Use this background image,</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764872483/food_order_bg_r6sbnv.jpg">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764872483/food_order_bg_r6sbnv.jpg</a></p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764872483/food_order_bg_r6sbnv.jpg" class="desc-que-img" />
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code value for card:</p>
              <ul>
                <li><span>#f6c56e</span></li>
              </ul>
               <p class="">Background color Hex Code value for Button:</p>
              <ul>
                <li><span>#ffffff</span></li>
              </ul>
              <p class="">Text color Hex code value::</p>
              <ul>
                <li><span>#323f4b</span></li>
              </ul>
              <p class="desc-que-blue">CSS Font families used:</p>
              <p class="">Main Heading:</p>
              <ul>
                <li><span>Bree Serif</span></li>
              </ul>
               <p class="">Paragraph and Button:</p>
              <ul>
                <li><span>Roboto</span></li>
              </ul>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-column",
              type: "html-validation",
              input: "check-flex-column", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML main heading element in an HTML container element",
              type: "html-validation",
              input: "check-heading-container",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML paragraph element in an HTML container element",
              type: "html-validation",
              input: "check-paragraph-container",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "Page should consist of an HTML button element in an HTML container element",
              type: "html-validation",
              input: "check-button-container",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "static-coding-practice-5",
      title: "Static Coding Practice 5",
      description:
        "In this assignment, let's build an Advanced Technologies Cover Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0534-40bd-815f-a37b81618323",
          title: "Advanced Technologies Cover Page",
          description:
            "In this assignment, let's build an Advanced Technologies Cover Page by applying the concepts we learned till now. You can use the Bootstrap concepts as well.",
          difficulty: "Easy",
          score: 150,
          type: "web",
          defaultCode: {
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
            </head>
            <body>
            </body>
            </html>`,
            css: "",
            javascript: "",
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below image.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765012643/advanced-tech-1_h2lvqv.png" class="desc-que-img" />
              <p class="desc-que-blue">Note:</p>
              <p class="">Try to achieve the design as close as possible.</p>
              <p class="desc-que-blue">Resources</p>
              <p class="">Use this background image,</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765012372/advanced-technologies-bg_bkytk0.avif">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765012372/advanced-technologies-bg_bkytk0.avif</a></p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765012372/advanced-technologies-bg_bkytk0.avif" class="desc-que-img" />
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code value for card:</p>
              <ul>
                <li><span>#ffffff</span></li>
              </ul>
               <p class="">Background color Hex Code value for Buttons:</p>
              <ul>
                <li><span>#5752ab</span></li>
                <li><span>#ffffff</span></li>
              </ul>
              <p class="">Border color Hex Code value for button:</p>
              <ul>
                <li><span>#d7dfe9</span></li>
              </ul>
              <p class="desc-que-blue">Text color Hex Code values:</p>
              <p class="">Main Heading:</p>
              <ul>
                <li><span>#5752ab</span></li>
              </ul>
               <p class="">Paragraph:</p>
              <ul>
                <li><span>#323f4b</span></li>
              </ul>
              <p class="desc-que-blue">CSS Font families used:</p>
              <ul>
                <li><span>Bree Serif</span></li>
                <li><span>Roboto</span></li>
              </ul>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-column",
              type: "html-validation",
              input: "check-flex-column", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML main heading element.",
              type: "html-validation",
              input: "check-heading-container",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description: `Page should consist of an HTML button element with CSS property "border-radius" and its value should be greater than "0" px.`,
              type: "css-validation",
              input: "check-border-radius",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description: `Page should consist of an HTML button element with the CSS property "margin-right" and its value should be greater than "0" px.`,
              type: "css-validation",
              input: "check-margin-right",
              output: "true",
              visible: true,
            },
            {
              id: 8,
              description: `Page should consist of an HTML button element with the CSS property "margin-left" and its value should be greater than "0" px.`,
              type: "css-validation",
              input: "check-margin-left",
              output: "true",
              visible: true,
            },
            {
              id: 9,
              description: `Page should consist of an HTML container element with CSS property background-size and value cover`,
              type: "css-validation",
              input: "check-background-size",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "static-coding-practice-6",
      title: "Static Coding Practice 6",
      description:
        "In this assignment, let's build an Hotel Booking Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "92bcc4c6-0534-40bd-815f-a37b81618324",
          title: "Hotel Booking Page",
          description:
            "In this assignment, let's build an Hotel Booking Page by applying the concepts we learned till now. You can use the Bootstrap concepts as well.",
          difficulty: "Easy",
          score: 150,
          type: "web",
          defaultCode: {
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
            </head>
            <body>
            </body>
            </html>`,
            css: "",
            javascript: "",
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below image.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765020140/grand-hotel-1_to6al6.png" class="desc-que-img" />
              <p class="desc-que-blue">Note:</p>
              <p class="">Try to achieve the design as close as possible.</p>
              <p class="desc-que-blue">Resources</p>
              <p class="">Use this background image,</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765019917/grand-hotel-bg_vonuc4.jpg">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765019917/grand-hotel-bg_vonuc4.jpg</a></p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765019917/grand-hotel-bg_vonuc4.jpg" class="desc-que-img" />
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code value for card:</p>
              <ul>
                <li><span>#000000e6</span></li>
              </ul>
               <p class="">Background color Hex Code value for Button:</p>
              <ul>
                <li><span>#ffffff</span></li>
              </ul>
              <p class="">Text color Hex Code value:</p>
              <ul>
              <li><span>#ffffff</span></li>
              </ul>
              
              <p class="desc-que-blue">CSS Font families used:</p>
              <ul>
                <li><span>Bree Serif</span></li>
                <li><span>Roboto</span></li>
              </ul>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-column",
              type: "html-validation",
              input: "check-flex-column", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description: `Page should consist of an HTML container element with CSS property "padding" and its value should be greater than "0" px.`,
              type: "css-validation",
              input: "check-padding",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description: `Page should consist of an HTML container element with CSS property "margin" and its value should be greater than "0" px`,
              type: "css-validation",
              input: "check-margin",
              output: "true",
              visible: true,
            },

            {
              id: 7,
              description: `Page should consist of an HTML container element with CSS property background-size and value cover`,
              type: "css-validation",
              input: "check-background-size",
              output: "true",
              visible: true,
            },
            {
              id: 8,
              description: `Page should consist of an HTML button element with CSS property "border-radius" and its value should be greater than "0" px.`,
              type: "css-validation",
              input: "check-border-radius",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
  ],
};
