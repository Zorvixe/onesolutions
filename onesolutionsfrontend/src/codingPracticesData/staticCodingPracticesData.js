export const staticCodingPracticesData = {
  static: [
    //Coding Practice - 1
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
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764316062/Coding_Practice_-1-todolist-002_pchk7n.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764316062/Coding_Practice_-1-todolist-002_pchk7n.png</a></p>
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
    //Coding Practice - 2
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
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764766568/chatpage_bg_lbbdwy.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764766568/chatpage_bg_lbbdwy.png</a></p>
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
    //Coding Practice - 3
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
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764868270/codingbg_bagxgp.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764868270/codingbg_bagxgp.png</a></p>
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
    //Coding Practice - 4
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
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764872483/food_order_bg_r6sbnv.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764872483/food_order_bg_r6sbnv.jpg</a></p>
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
    //Coding Practice - 5
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
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
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
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765012372/advanced-technologies-bg_bkytk0.avif" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765012372/advanced-technologies-bg_bkytk0.avif</a></p>
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
    //Coding Practice - 6
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
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
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
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765019917/grand-hotel-bg_vonuc4.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765019917/grand-hotel-bg_vonuc4.jpg</a></p>
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
    //Coding Practice - 7
    {
      id: "static-coding-practice-7",
      title: "Static Coding Practice 7",
      description:
        "In this assignment, let's build an Podcast Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "92bcc4c6-0535-40bd-815f-a37b81618325",
          title: "Podcast Page",
          description:
            "In this assignment, let's build an Podcast Page by applying the concepts we learned till now. You can use the Bootstrap concepts as well.",
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
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');
           `,
            javascript: ``,
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below image.</p>
              <p class="desc-que-blue">Podcast Home Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765224269/podcast-home_fbvh1g.png" class="desc-que-img" />
              <p class="desc-que-blue">Podcast Puri Jagannadh Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765224269/puri-detail_jrrheu.png" class="desc-que-img" />
             <p class="desc-que-blue">Podcast Tedx Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765224268/tedx-detail_pmcqcr.png" class="desc-que-img" />
              <p class="desc-que-blue">Podcast Sadhguru Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765224269/sadguru-detail_g6wvmb.png" class="desc-que-img" />
              
              <div class="Note-container">
          <div class="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>
                When clicked on the Podcast category on the Podcast Home Page, it must display the respective person podcasts page and when the back button is clicked Podcast Home Page must be displayed.
              </li>
              <li>
                Try to achieve the design as close as possible.
              </li>
            </ul>
          </p>
        </div>
        <p class="desc-que-blue">Resources</p>
          <p class="desc-que-blue">Use the Image URLs given below.</p>
           <p class="desc-que-blue">Background Image:</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222781/podcast_1_ohrxvp.avif" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222781/podcast_1_ohrxvp.avif</a></p> 
              <p class="desc-que-blue">Images:</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222913/puri-jagannadh-img_hwgfjx.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222913/puri-jagannadh-img_hwgfjx.png</a></p>            
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222952/tedx-img_ei8nkj.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222952/tedx-img_ei8nkj.png</a></p>            
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222952/sadhguru-img_r64r58.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222952/sadhguru-img_r64r58.png</a></p>            
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222951/on-purpose-img_aarguh.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765222951/on-purpose-img_aarguh.png</a></p>            
               <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code values:</p>
              <ul>
                <li><span>#151765</span></li>
              </ul>
               <p class="">Text color Hex Code values:</p>
              <ul>
                <li><span>#151765</span></li>
                <li><span>#ffffff</span></li>
                <li><span>#5a7184</span></li>
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
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-row",
              type: "html-validation",
              input: "check-flex-row", // ✔ Updated
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
              description: `Page should consist of an HTML image element in an HTML container element`,
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //Coding Practice - 8
    {
      id: "static-coding-practice-8",
      title: "Static Coding Practice 8",
      description:
        "In this assignment, let's build an My Projects Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "92bcc4c6-0536-40bd-815f-a37b81618326",
          title: "My Projects Page",
          description:
            "In this assignment, let's build an My Projects Page by applying the concepts we learned till now. You can use the Bootstrap concepts as well.",
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
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');
            `,
            javascript: ``,
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below image.</p>
              <p class="desc-que-blue">Home Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765309762/projects-page-home_peawki.png" class="desc-que-img" />
              <p class="desc-que-blue">Advanced Technologies Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765012643/advanced-tech-1_h2lvqv.png" class="desc-que-img" />
             <p class="desc-que-blue">Diwali Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765308723/diwali-project-home_r1zfne.png" class="desc-que-img" />
              <p class="desc-que-blue">Happy Meals Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764872997/food_order_lndzbu.png" class="desc-que-img" />
               <p class="desc-que-blue">NewsPaper Article Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765310273/news_paper_img_kh3oqz.png" class="desc-que-img" />
             
              <div class="Note-container">
          <div class="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>
                When clicked on the Project category on the Project Home Page, it must display the respective Project page and when the back button is clicked Project Home Page must be displayed.
              </li>
              <li>
                Try to achieve the design as close as possible.
              </li>
            </ul>
          </p>
        </div>
        <p class="desc-que-blue">Resources</p>
          <p class="desc-que-blue">Use the Image URLs given below.</p>
                <p class="desc-que-blue">Images:</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765309397/software_developer_u3go2d.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765309397/software_developer_u3go2d.png</a></p>            
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765137502/diwali_bg.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765137502/diwali_bg.png</a></p>            
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765012372/advanced-technologies-bg_bkytk0.avif" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765012372/advanced-technologies-bg_bkytk0.avif</a></p>            
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765138467/food-order-img.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765138467/food-order-img.jpg</a></p>            
               <p class="desc-que-blue">CSS Colors used:</p>
            
               <p class="">Text color Hex Code values:</p>
              <ul>
                <li><span>#183b56</span></li>
                <li><span>#616e7c</span></li>
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
                "Page should consist of an HTML main heading element in an HTML container element",
              type: "html-validation",
              input: "check-heading-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-row",
              type: "html-validation",
              input: "check-flex-row", // ✔ Updated
              output: "true",
              visible: true,
            },

            {
              id: 5,
              description: `Page should consist of an HTML image element in an HTML container element`,
              type: "html-validation",
              input: "check-image-container",
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
                "Page should consist of an HTML container element with the CSS property text-align and the value center",
              type: "css-validation",
              input: "check-text-align-center",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //Coding Assignment - 1
    {
      id: "Static-Coding-Assignment-1",
      title: "Static Coding Assignment 1",
      description:
        "In this assignment, let's build a Favorite Stores Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0534-40bd-814f-a37b81618420",
          title: "Favorite Stores Page",
          description:
            "In this assignment, let's build a Favorite Stores Page by applying the concepts we learned till now. You can use the Bootstrap concepts as well.",
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
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765344090/Shop_in_your_favourite_Stores_ok4rue.png" class="desc-que-img" />
              <p class="desc-que-blue">Note:</p>
              <p class="">Try to achieve the design as close as possible.</p>
              <p class="desc-que-blue">Resources</p>
              <p class="">Use the image URLs given below.</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343136/stores-img_mzxoq6.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343136/stores-img_mzxoq6.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343373/amazon-logo-img_udanxz.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343373/amazon-logo-img_udanxz.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343373/ikea-logo-img_xvmnzu.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343373/ikea-logo-img_xvmnzu.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343373/bewakoof-logo-img_mnmxsj.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343373/bewakoof-logo-img_mnmxsj.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343372/flipkart-logo-img_aiqbs1.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765343372/flipkart-logo-img_aiqbs1.png</a></p>
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code values:</p>
                <div  class="desc-colors c894bca">#894bca</div>
                <div  class="desc-colors cffffff">#ffffff</div>
              <p class="">Text color Hex Code values:</p>
             <div  class="desc-colors cf780c3">#f780c3</div>
                <div  class="desc-colors cffffff">#ffffff</div>
                <div  class="desc-colors c323f4b">#323f4b</div>
                <div  class="desc-colors c7b8794">#7b8794</div>
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
                "Page should consist of an HTML main heading element in an HTML container element",
              type: "html-validation",
              input: "check-heading-container",
              output: "true",
              visible: true,
            },

            {
              id: 2,
              description: `Page should consist of an HTML image element in an HTML container element`,
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML paragraph element in an HTML container element",
              type: "html-validation",
              input: "check-paragraph-container",
              output: "true",
              visible: true,
            },

            {
              id: 4,
              description:
                "Page should consist of at least an HTML paragraph element with the property border-top-left-radius",
              type: "css-validation",
              input: "check-border-top-left-radius",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of at least an HTML paragraph element with the property border-top-right-radius",
              type: "css-validation",
              input: "check-border-top-right-radius",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-row",
              type: "html-validation",
              input: "check-flex-row", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 8,
              description:
                "Page should consist of at least an HTML element with the CSS property background-color",
              type: "css-validation",
              input: "check-background-color",
              output: "true",
              visible: true,
            },

            {
              id: 9,
              description:
                "Page should consist of at least an HTML element with the CSS property color",
              type: "css-validation",
              input: "check-color",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //Coding Assignment - 2
    {
      id: "Static-Coding-Assignment-2",
      title: "Static Coding Assignment 2",
      description:
        "In this assignment, let's build a Yoga Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0535-40bd-814f-a37b81618425",
          title: "Yoga Page",
          description:
            "In this assignment, let's build a Yoga Page by applying the concepts we learned till now. You can use the Bootstrap concepts as well.",
          difficulty: "Medium",
          score: 150,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
            javascript: ``,
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765351835/yoga-output-v1_qa1blc.gif" class="desc-que-img" />
              <p class="desc-que-blue">Yoga Home Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765352647/yoga_home_page_cyepni.png" class="desc-que-img" />
              <p class="desc-que-blue">Types of Yoga Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765351834/yoga-output-v2_ekhhh9.png" class="desc-que-img" />
                <div class="Note-container">
          <div class="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>
               When clicked on the Get Started button on the Yoga Home Page, it must display the Types of Yoga Page.
              </li>
              <li>
                Try to achieve the design as close as possible.
              </li>
            </ul>
          </p>
        </div>
              <p class="desc-que-blue">Resources</p>
               <p class="">Home Page Background Image</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765352861/yoga-bg_m2povf.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765352861/yoga-bg_m2povf.png</a></p>
              
               <p class="">Home Page Girl Image</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765352931/yoga-girl-with-headphones-img_qp0qsg.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765352931/yoga-girl-with-headphones-img_qp0qsg.png</a></p>
              
              <p class="">Types of Yoga Page Images</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353011/yoga-girl-without-headphones-img_iyjnac.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353011/yoga-girl-without-headphones-img_iyjnac.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353060/yoga-card1-img_myhvgv.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353060/yoga-card1-img_myhvgv.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353107/yoga-card2-img_ynode5.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353107/yoga-card2-img_ynode5.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353151/yoga-card3-img_osjuh1.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353151/yoga-card3-img_osjuh1.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353231/yoga-card4-img_bwhfuq.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765353231/yoga-card4-img_bwhfuq.png</a></p>
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code values:</p>
                <div  class="desc-colors cffedcb">#ffedcb</div>
                <div  class="desc-colors c132d84">#132d84</div>
                <div  class="desc-colors cffe2ab">#ffe2ab</div>
              <p class="">Text color Hex Code values:</p>
             <div  class="desc-colors c323f4b">#323f4b</div>
                <div  class="desc-colors cfad693">#fad693</div>
                <div  class="desc-colors c132d84">#132d84</div>
                <div  class="desc-colors c253263">#253263</div>
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
              description: `Page should consist of an HTML image element in an HTML container element`,
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },

            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container",
              output: "true",
              visible: true,
            },

            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-row",
              type: "html-validation",
              input: "check-flex-row",
              output: "true",
              visible: true,
            },

            {
              id: 4,
              description:
                "Page should consist of an HTML button element in an HTML container element",
              type: "html-validation",
              input: "check-button-container",
              output: "true",
              visible: true,
            },

            {
              id: 5,
              description: `Page should consist of an HTML container element with CSS property background-size and value cover`,
              type: "css-validation",
              input: "check-background-size",
              output: "true",
              visible: true,
            },

            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },

            {
              id: 7,
              description:
                "Page should consist of at least two HTML container sections that have HTML id attribute value with prefix section",
              type: "html-validation",
              input: "check-section-prefix",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //Coding Assignment - 3
    {
      id: "Static-Coding-Assignment-3",
      title: "Static Coding Assignment 3",
      description:
        "In this assignment, let's build a Flats Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0536-40bd-814f-a37b81618430",
          title: "Flats Page",
          description:
            "In this assignment, let's build the Sunrise Avenue page by applying the concepts we learned till now. You can use the Bootstrap concepts",
          difficulty: "Medium",
          score: 150,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');
            `,
            javascript: ``,
          },
          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386317/flats-output-1_kdukej.gif" class="desc-que-img" />
              <p class="desc-que-blue">Sunrise Avenue Home Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386317/sunrise_avenue_home_page_1_ctkkmz.png" class="desc-que-img" />
              <p class="desc-que-blue">Flats List Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386317/flats_list_page_uiicuc.png" class="desc-que-img" />
              <p class="desc-que-blue">3BHK Flat Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386317/flat_details_page_1_e3tu0v.png" class="desc-que-img" />
              <p class="desc-que-blue">2BHK Flat Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386317/flat_details_page_2_qas0s2.png" class="desc-que-img" />
              <p class="desc-que-blue">4BHK Flat Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386319/flat_details_page_3_qvqegm.png" class="desc-que-img" />
                <div class="Note-container">
          <div class="icon-note">
            <h6>
              <i class="bi bi-journal-text"></i>Note
            </h6>
          </div>
          <p>
            <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
              <li>
               When clicked on the Book Flat button on the Sunrise Avenue Home Page, it must display the Flats List Page.
              </li>
              <li>
                  When clicked on each flat in Flats List Page, it must display the respective Flat Details Page.  
                </li>
              <li>
                  When clicked on Confirm button in Flat Details Page, it must display Sunrise Avenue Home Page            
                  </li>
              <li>
                  When clicked on Back button in Flat Details Page, it must display Flats List Page          
                </li>
              <li>
                Try to achieve the design as close as possible.
              </li>
            </ul>
          </p>
        </div>
              <p class="desc-que-blue">Resources</p>
               <p class="">Home Page Background Image</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386915/assignment-3-home-bg_mwh5bz.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386915/assignment-3-home-bg_mwh5bz.png</a></p>
              
               <p class="">Flats List Card Images</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386979/flats-list-card1-img_taurll.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765386979/flats-list-card1-img_taurll.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387037/flats-list-card2-img_m4yzts.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387037/flats-list-card2-img_m4yzts.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387116/flats-list-card3-img_p92wsj.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387116/flats-list-card3-img_p92wsj.png</a></p>
              
               <p class="">Location Icon</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387233/flats-list-location-icon-img_f42pqc.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387233/flats-list-location-icon-img_f42pqc.png</a></p>
              
              <p class="">Flats Description Images</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387440/flats-list-d1-img_modtwu.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387440/flats-list-d1-img_modtwu.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387496/flats-list-d2-img_ljejkn.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387496/flats-list-d2-img_ljejkn.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387542/flats-list-d3-img_sbm5or.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765387542/flats-list-d3-img_sbm5or.png</a></p>
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code values:</p>
                <div  class="desc-colors cf19116">#f19116</div>
                <div  class="desc-colors cffffff">#ffffff</div>
                <div  class="desc-colors c222222">#222222</div>
              <p class="">Text color Hex Code values:</p>
                <div  class="desc-colors cf19116">#f19116</div>
                <div  class="desc-colors c7b8794">#7b8794</div>
                <div  class="desc-colors cffffff">#ffffff</div>
                <div  class="desc-colors c0f0e46">#0f0e46</div>
                <div  class="desc-colors c6c6b70">#6c6b70</div>
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
              description: `Page should consist of an HTML image element in an HTML container element`,
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },

            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container",
              output: "true",
              visible: true,
            },

            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-row",
              type: "html-validation",
              input: "check-flex-row",
              output: "true",
              visible: true,
            },

            {
              id: 4,
              description:
                "Page should consist of an HTML button element in an HTML container element",
              type: "html-validation",
              input: "check-button-container",
              output: "true",
              visible: true,
            },

            {
              id: 5,
              description: `Page should consist of an HTML container element with CSS property background-size and value cover`,
              type: "css-validation",
              input: "check-background-size",
              output: "true",
              visible: true,
            },

            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },

            {
              id: 7,
              description:
                "Page should consist of at least two HTML container sections that have HTML id attribute value with prefix section",
              type: "html-validation",
              input: "check-section-prefix",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
  ],
};
