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
            {
              id: 8,
              description:
                "Page should consist of at least two HTML container sections that have HTML id attribute value with prefix section",
              type: "html-validation",
              input: "check-section-prefix",
              output: "true",
              visible: true,
            },
            {
              id: 9,
              description:
                "Page should consist of HTML button elements with onclick attribute value calling the display function with section id",
              type: "html-validation",
              input: "check-display-function-usage",
              output: "true",
              visible: true,
            },
            {
              id: 10,
              description:
                "Page should consist of HTML container elements with data-section attribute and one element with data-default attribute",
              type: "html-validation",
              input: "check-data-section-and-default",
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
          id: "91bcc4c6-0540-40bd-814f-a37b81618500",
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
            {
              id: 8,
              description:
                "Page should consist of at least two HTML container sections that have HTML id attribute value with prefix section",
              type: "html-validation",
              input: "check-section-prefix",
              output: "true",
              visible: true,
            },
            {
              id: 9,
              description:
                "Page should consist of HTML button elements with onclick attribute value calling the display function with section id",
              type: "html-validation",
              input: "check-display-function-usage",
              output: "true",
              visible: true,
            },
            {
              id: 10,
              description:
                "Page should consist of HTML container elements with data-section attribute and one element with data-default attribute",
              type: "html-validation",
              input: "check-data-section-and-default",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },

    //Static Website Project

    {
      id: "Build-Your-Own-Static-Website-Project",
      title: "Build Your Own Static Website Project",
      description:
        "In this assignment, let's build a Static Website Project by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0550-40bd-814f-a37b81618600",
          title: "Static Website Project",
          description:
            "In this assignment, let's build the Static Website Project by applying the concepts we learned till now. You can use the Bootstrap concepts",
          difficulty: "Hard",
          score: 200,
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
              <p class="desc-que-blue">Home Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765534869/static-project-section-1_knkrfk.png" class="desc-que-img" />
              <p class="desc-que-blue">List Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765534869/static-project-section-2_ntdvdf.png" class="desc-que-img" />
              <p class="desc-que-blue">Full Detailed View Bali, Indonesia</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765534869/static-project-section-3_sgi7ib.png" class="desc-que-img" />
              <p class="desc-que-blue">Full Detailed View Swiss, Alps</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537036/static-project-section-5_ntmwpa.png" class="desc-que-img" />
              <p class="desc-que-blue">Full Detailed View Paris, France</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537037/static-project-section-4_lrclnp.png" class="desc-que-img" />
               
              <p class="desc-que-blue">Full Detailed New York, USA</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537036/static-project-section-6_zxq2qp.png" class="desc-que-img" />
               
              <p class="desc-que-blue">Full Detailed Tokyo, Japan</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537036/static-project-section-7_wdt0xy.png" class="desc-que-img" />

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                    <li>
                    When clicked on the Book Explore Places button on the Home Page, it must display the Places List Page.
                    </li>
                    <li>
                    When clicked on each place in List Page, it must display the respective Place Details Page.  
                    </li>
                    <li>
                    When clicked on Back button in Place List Page, it must display Home Page            
                    </li>
                    <li>
                    When clicked on Back button in Place Details Page, it must display Place List Page          
                    </li>
                    <li>
                      Try to achieve the design as close as possible.
                    </li>
                  </ul>
                </p>
              </div>

               
              <p class="desc-que-blue">Resources</p>
               <p class="">Home Page Background Image</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764610174/home-bg_oflcds.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764610174/home-bg_oflcds.jpg</a></p>
              
               <p class="">Place List Card Images</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537952/bali-indonesia_umsvtu.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537952/bali-indonesia_umsvtu.jpg</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538016/Paris-france_sibpd1.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538016/Paris-france_sibpd1.jpg</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538088/tokyo-japan_mwg0lk.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538088/tokyo-japan_mwg0lk.jpg</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538222/swiss-alps_wuvvvj.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538222/swiss-alps_wuvvvj.jpg</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538313/Newyork-usa_xg9plr.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538313/Newyork-usa_xg9plr.jpg</a></p>
              
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code values card:</p>
                <div  class="desc-colors cffffff">#ffffff</div>
              <p class="">Background color Hex Code values Button Home Page:</p>
                <div  class="desc-colors c1a472a">#1a472a</div>
              <p class="">Background color Hex Code values Button Detail Page:</p>
                <div  class="desc-colors cd4a574">#d4a574</div>
              <p class="">Text color Hex Code values Button Detail Page:</p>
                <div  class="desc-colors cffffff">#ffffff</div>
              <p class="">Text color Hex Code vales:</p>
                <div  class="desc-colors c333333">#333333</div>
                <div  class="desc-colors c666">#666</div>
                <p class="">Text color Hex Code vales Detail Rating:</p>
                <div  class="desc-colors cffa500">#ffa500</div>
              <p class="desc-que-blue">CSS Font families used:</p>
              <ul>
                <li><span>'Segoe UI', Tahoma, Geneva, Verdana, sans-serif</span></li>
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
                "Page should consist of an HTML container element with the bootstrap class name flex-column",
              type: "html-validation",
              input: "check-flex-column",
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
            {
              id: 8,
              description:
                "Page should consist of HTML button elements with onclick attribute value calling the display function with section id",
              type: "html-validation",
              input: "check-display-function-usage",
              output: "true",
              visible: true,
            },
            {
              id: 9,
              description:
                "Page should consist of HTML container elements with data-section attribute and one element with data-default attribute",
              type: "html-validation",
              input: "check-data-section-and-default",
              output: "true",
              visible: true,
            },
            {
              id: 10,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end",
              output: "true",
              visible: true,
            },
            {
              id: 11,
              description:
                "Page should consist of at least two section container elements with data-section attribute, one default section, and all section containers should correctly use the data-section attribute",
              type: "html-validation",
              input: "check-complete-section-validation",
              output: "true",
              visible: true,
            },
            {
              id: 12,
              description:
                "Page should consist of a Bootstrap carousel container with class names carousel and slide",
              type: "html-validation",
              input: "check-carousel-container-indicators",
              output: "true",
              visible: true,
            },
            {
              id: 13,
              description:
                "Page should consist of a carousel-inner element with at least one carousel-item having active class",
              type: "html-validation",
              input: "check-carousel-items",
              output: "true",
              visible: true,
            },
            {
              id: 14,
              description:
                "Page should consist of at least an HTML Container element with the property border-top-left-radius",
              type: "css-validation",
              input: "check-border-top-left-radius",
              output: "true",
              visible: true,
            },
            {
              id: 15,
              description:
                "Page should consist of at least an HTML Container element with the property border-top-right-radius",
              type: "css-validation",
              input: "check-border-top-right-radius",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //Coding Test - 1
    {
      id: "Static-Coding-Test-1",
      title: "Static Coding Test 1",
      description: "",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0600-40bd-814f-a37b816187000",
          title: "Introduction to HTML and CSS",
          description:
            "The goal of this coding exam is to quickly get you off the basic HTML and CSS concepts.",
          difficulty: "Easy",
          score: 85,
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
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765544986/coding-test-1-1_dfm2uj.png" class="desc-que-img" />
              
            
              <p class="desc-que-blue">Resources</p>
                 
              <p class="desc-que-blue">CSS Colors used:</p>
             
              <p class="">Text color Hex Code vales:</p>
                <div  class="desc-colors lightblue">lightblue</div>
                
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
                "Page should consist of an HTML paragraph element with the CSS property text-align and value right",
              type: "css-validation",
              input: "check-text-align-right",
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
              description:
                "Page should consist of at least one HTML element with the CSS property text-decoration and value underline",
              type: "css-validation",
              input: "check-text-decoration",
              output: "true",
              visible: true,
            },

            {
              id: 6,
              description:
                "Page should consist of at least an HTML element with the CSS property background-color",
              type: "css-validation",
              input: "check-background-color",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "91bcc4c6-0800-40bd-814f-a37b8161865dh00",
          title: "CSS Backgrounds and Box Model Properties",
          description:
            "The goal of this coding exam is to quickly get you off the ground with CSS Background Images, Width, and Height properties.",
          difficulty: "Easy",
          score: 75,
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
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765545828/coding-test-1-2_abm49e.png" class="desc-que-img" />
              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                    <li>
                      The three HTML image elements should have the width and height of 200px, 250px, and 300px respectively.
                      </li>                
                    <li>
                      Try to achieve the design as close as possible.
                    </li>
                  </ul>
                </p>
              </div>

              <p class="desc-que-blue">Resources</p>
                 
              <p class="">Use the image URLs given below.</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765546078/beach-1-img_rvam3o.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765546078/beach-1-img_rvam3o.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765546134/beach-2-img_gnredr.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765546134/beach-2-img_gnredr.png</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765546186/beach-3-img_xlpejj.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765546186/beach-3-img_xlpejj.png</a></p>
             
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
              description: `Page should consist of an HTML container element with CSS property background-size and value cover`,
              type: "css-validation",
              input: "check-background-size",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of three HTML image elements with widths 200px, 250px, and 300px",
              type: "css-validation",
              input: "check-width",
              output: "true",
              visible: true,
            },

            {
              id: 5,
              description:
                "Page should consist of three HTML image elements with heights 200px, 250px, and 300px",
              type: "css-validation",
              input: "check-height",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "91bcc4c6-0df-8A-fgh0-40bd-814f-a37b815-8fg-6dah00",
          title: "CSS Background Images and Units",
          description:
            "The goal of this coding exam is to quickly get you off the ground with CSS Background Images, Height, and vh unit.",
          difficulty: "Easy",
          score: 50,
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
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765547404/coding-test-1-3_leulio.png" class="desc-que-img" />

              <p class="desc-que-blue">Resources</p>
                 
              <p class="">Use the image URLs given below.</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765547592/scuba-diving-bg_pqbwcn.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765547592/scuba-diving-bg_pqbwcn.png</a></p>
            
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
              description: `Page should consist of an HTML container element with CSS property background-size and value cover`,
              type: "css-validation",
              input: "check-background-size",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML paragraph element in an HTML container element",
              type: "html-validation",
              input: "check-paragraph-container",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "91b89c6-0dfAdfgs58-f040b-d814a3da3000",
          title: "Viewport Width",
          description:
            "The goal of this coding exam is to quickly get you off the ground with Viewport Width",
          difficulty: "Easy",
          score: 55,
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
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765550141/coding-test-1-4_x7bz5h.png" class="desc-que-img" />

              <p class="desc-que-blue">Resources</p>
                 
              <p class="">Use the image URLs given below.</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765547592/scuba-diving-bg_pqbwcn.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765547592/scuba-diving-bg_pqbwcn.png</a></p>
             <p class="">Background color Hex Code values:</p>
                <div  class="desc-colors c5cb85c">#5cb85c</div>
                <div  class="desc-colors c5bc0de">#5bc0de</div>
                <div  class="desc-colors cf0ad4e">#f0ad4e</div>
                <div  class="desc-colors cd9534f">#d9534f</div>
              <p class="">Text color Hex Code values:</p>
                <div  class="desc-colors cffffff">#ffffff</div>
                <p class="desc-que-blue">CSS Font families used:</p>
              <ul>
                <li><span>Roboto</span></li>
              </ul>
             
            </div>
          `,

          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML paragraph element in an HTML container element",
              type: "html-validation",
              input: "check-paragraph-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of three HTML image elements with widths.",
              type: "css-validation",
              input: "check-width",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "91basdc6-0dfAdsadgs58-f0sav5sdw8f240b-d814a3da3000",
          title: "Viewport Height",
          description:
            "The goal of this coding exam is to quickly get you off the ground with Viewport Height.",
          difficulty: "Easy",
          score: 60,
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
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765551764/coding-test-1-5_bqijaa.png" class="desc-que-img" />

              <p class="desc-que-blue">Resources</p>
               <p class="">Background color Hex Code values:</p>
                <div  class="desc-colors c5cb85c">#5cb85c</div>
                <div  class="desc-colors c5bc0de">#5bc0de</div>
                <div  class="desc-colors cf0ad4e">#f0ad4e</div>
                <div  class="desc-colors cd9534f">#d9534f</div>
              <p class="">Text color Hex Code values:</p>
                <div  class="desc-colors cffffff">#ffffff</div>
                <p class="desc-que-blue">CSS Font families used:</p>
              <ul>
                <li><span>Roboto</span></li>
              </ul>
             
            </div>
          `,

          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML paragraph element in an HTML container element",
              type: "html-validation",
              input: "check-paragraph-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of three HTML image elements with height.",
              type: "css-validation",
              input: "check-height",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "91badc6-0dfAd58-f0sdw8f240b-d81a3000",
          title: "CSS Box Model Properties",
          description:
            "The goal of this coding exam is to quickly get you off the ground with the CSS Box Model Properties.",
          difficulty: "Easy",
          score: 85,
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
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765552306/coding-test-1-6_zpoqno.png" class="desc-que-img" />
                 <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                    <li>
                    The HTML <strong>button</strong> element in the leaf shape should consist of the class name <strong> leaf-button </strong>
                    </li>                
                    <li>
                      Try to achieve the design as close as possible.
                    </li>
                  </ul>
                </p>
              </div>
              <p class="desc-que-blue">Resources</p>
               <p class="">CSS color Hex Code values:</p>
                <div  class="desc-colors c007854">#007854</div>
                <div  class="desc-colors cffd0b5">#ffd0b5</div>
                <div  class="desc-colors c841003">#841003</div>
                <div  class="desc-colors cfab8d9">#fab8d9</div>
                <div  class="desc-colors c5c0b33">#5c0b33</div>
                <div  class="desc-colors c0c6b58">#0c6b58</div>
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
                "Page should consist of an HTML button element in an HTML container element",
              type: "html-validation",
              input: "check-button-container",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of at least an HTML paragraph element with the property border-top-left-radius",
              type: "css-validation",
              input: "check-border-top-left-radius",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of at least an HTML paragraph element with the property border-top-right-radius",
              type: "css-validation",
              input: "check-border-top-right-radius",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of at least an HTML element with the CSS property background-color",
              type: "css-validation",
              input: "check-background-color",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    //Coding Test - 2
    {
      id: "Static-Coding-Test-2",
      title: "Static Coding Test 2",
      description: "",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0800040bd-814f-a37b8162007000",
          title: "Flexbox Properties-1",
          description:
            "The goal of this coding exam is to quickly get you off the ground with Flexbox Properties.",
          difficulty: "Easy",
          score: 75,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
            javascript: ``,
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765559303/coding-test-2-1_sgisfa.png" class="desc-que-img" />
              
              <p class="desc-que-blue">Resources</p>
                  
              <p class="desc-que-blue">CSS Colors used:</p>
            
              <p class="">CSS color Hex Code values:</p>
              <div class="desc-colors cfdba74">#fdba74</div>
              <div class="desc-colors cea580c">#ea580c</div>
              <div class="desc-colors ca5b4fc">#a5b4fc</div>
             
              <div class="desc-colors c4f46e5">#4f46e5</div>
              <div class="desc-colors c5eead4">#5eead4</div>
              <div class="desc-colors c0d9488">#0d9488</div>
             
            </div>
          `,

          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-row",
              type: "html-validation",
              input: "check-flex-row",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-center",
              type: "html-validation",
              input: "check-justify-content-center",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description: "Page should consist of elements with heights.",
              type: "css-validation",
              input: "check-height",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of at least an HTML element with the CSS property background-color",
              type: "css-validation",
              input: "check-background-color",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "91bcc4c6-0ssfv4b6sfb46-814f-00ass54df5sd200",
          title: "Flexbox Properties-2",
          description:
            "The goal of this coding exam is to quickly get you off the ground with Flexbox properties.",
          difficulty: "Easy",
          score: 60,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
            javascript: ``,
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765560835/coding-test-2-2_eyfcrx.png" class="desc-que-img" />
        
              <p class="desc-que-blue">Instructions</p>
              <p class="">Move the flex-items in the flexbox container to the bottom left of the Viewport.</p>
        
              <p class="desc-que-blue">Resources</p>
        
              <p class="desc-que-blue">CSS Colors used:</p>
        
              <p class="">CSS color Hex Code values:</p>
              <div class="desc-colors cdff0d8">#dff0d8</div>
              <div class="desc-colors ca78bfa">#a78bfa</div>
              <div class="desc-colors c7b4ae1">#7b4ae1</div>
            </div>
          `,

          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container",
              output: "true",
              visible: true,
            },

            {
              id: 2,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description: "Page should consist of elements with heights.",
              type: "css-validation",
              input: "check-height",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of at least an HTML element with the CSS property background-color",
              type: "css-validation",
              input: "check-background-color",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-column",
              type: "html-validation",
              input: "check-flex-column", // ✔ Updated
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "eth464s64dbcc4c6-0s6sfb46-814f-0043d5fb4e00",
          title: "HTML Images",
          description:
            "The goal of this coding exam is to quickly get you off the ground with HTML Images.",
          difficulty: "Easy",
          score: 55,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
            javascript: ``,
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765561856/coding-test-2-3_rwiulb.png" class="desc-que-img" />
        
              <p class="desc-que-blue">Instructions</p>
              <p class="">Images width and height should be 200px.</p>
        
              <p class="desc-que-blue">Resources</p>
        
              <p class="desc-que-blue">Use the image URLs given below:</p>
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765562152/lotus-temple-img_o1t2dz.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765562152/lotus-temple-img_o1t2dz.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765562209/kerala-img_xrhspv.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765562209/kerala-img_xrhspv.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765562266/coimbatore-img_un1xdm.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765562266/coimbatore-img_un1xdm.png</a></p> 
                      <p class="desc-que-blue">CSS Font families used:</p>
                      <ul>
                        <li><span>Roboto</span></li>
                      </ul>
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
              description: "Page should consist of elements with widths.",
              type: "css-validation",
              input: "check-width",
              output: "true",
              visible: true,
            },

            {
              id: 4,
              description: "Page should consist of elements with heights.",
              type: "css-validation",
              input: "check-height",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "edsds554dbcc4c6-0fds412fsegf6-dsv55fb4e00",
          title: "CSS Box Property - Margin",
          description:
            "The goal of this coding exam is to quickly get you off the ground with CSS Box Property - Margin.",
          difficulty: "Easy",
          score: 60,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
            javascript: ``,
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765562874/coding-test-2-4_qwckqt.png" class="desc-que-img" />
        
              <p class="desc-que-blue">Resources</p>
        
              <p class="desc-que-blue">CSS Colors used:</p>
                      <p class="">Background color Hex Code values:</p>
                        <div  class="desc-colors c6c757d">#6c757d</div>
                        <div  class="desc-colors c343a40">#343a40</div>
                      <p class="">Text color Hex Code values:</p>
                        <div  class="desc-colors cffffff">#ffffff</div>
                      <p class="">Border color Hex Code values:</p>
                        <div  class="desc-colors c000000">#000000</div>
                      <p class="desc-que-blue">CSS Font families used:</p>
                      <ul>
                        <li><span>Roboto</span></li>
                      </ul>
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
              description: "Page should consist of widths.",
              type: "css-validation",
              input: "check-width",
              output: "true",
              visible: true,
            },

            {
              id: 3,
              description: "Page should consist of heights.",
              type: "css-validation",
              input: "check-height",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description: `Page should consist of "margin-left"`,
              type: "css-validation",
              input: "check-margin-left",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description: `Page should consist of "margin-right"`,
              type: "css-validation",
              input: "check-margin-right",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description: `Page should consist of "margin"`,
              type: "css-validation",
              input: "check-margin",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "s5dsvsvn8dfebcc4c6-0fds412fsegf6-dsv55fb4e00",
          title: "Bootstrap Carousels",
          description:
            "The goal of this coding exam is to quickly get you off the ground with Bootstrap Carousels.",
          difficulty: "Easy",
          score: 35,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
            javascript: ``,
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765565777/coding-test-2-5_hwyb48.gif" class="desc-que-img" />
        
              <p class="desc-que-blue">Instructions</p>
              <p class="">The carousel HTML container should have the id <strong>carouselExampleIndicators</strong> and class names <strong>carousel</strong>, <strong>slide</strong></p>
               <div class="Note-container">
                        <div class="icon-note">
                          <h6>
                            <i class="bi bi-journal-text"></i>Note
                          </h6>
                        </div>
                        <p>
                          <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                            <li>
                            Bootstrap documentation can be used to get Bootstrap Carousel code.
                            </li>
                           
                          </ul>
                        </p>
                      </div>
                         <p class="desc-que-blue">Resources</p>
                         <p class="desc-que-blue">Use the Image URLs given below.</p>
                        <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765566194/bootstrap-carousels-football-img_plnukq.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765566194/bootstrap-carousels-football-img_plnukq.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765566373/bootstrap-carousels-cricket-img_volaij.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765566373/bootstrap-carousels-cricket-img_volaij.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765566417/bootstrap-carousels-tennis-img_fqgall.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765566417/bootstrap-carousels-tennis-img_fqgall.png</a></p>            
                   
                      <p class="desc-que-blue">CSS Font families used:</p>
                      <ul>
                        <li><span>Roboto</span></li>
                      </ul>
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
                "Page should consist of an HTML container element with id carouselExampleIndicators and classes carousel and slide",
              type: "html-validation",
              input: "check-carousel-container-indicators",
              output: "true",
              visible: true,
            },

            {
              id: 3,
              description:
                "Carousel should consist of at least three carousel-item elements",
              type: "html-validation",
              input: "check-carousel-items",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description: "One carousel-item should have the active class",
              type: "html-validation",
              input: "check-active-carousel-item",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description: "Carousel images should have width set to 100%",
              type: "css-validation",
              input: "check-carousel-image-width",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "693d76ba-d828-8332-bf16-2edcbd579868dvvwev596",
          title: "Bootstrap Embed",
          description:
            "The goal of this coding exam is to quickly get you off the ground with the Bootstrap Component Embed.",
          difficulty: "Easy",
          score: 30,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
            javascript: ``,
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765640565/ce-4-3-2-embed-v1_jz24oi.gif" class="desc-que-img" />
        
              <p class="">Insert a video using the Bootstrap Component Embed.</p>
                         <p class="desc-que-blue">Resources</p>
                         <p class="desc-que-blue">Use the video URL given below.</p>
                        <p>URL: <a href="https://www.youtube.com/watch?v=5TR-blT4Ao4" target="_blank">https://www.youtube.com/watch?v=5TR-blT4Ao4</a></p>            
            </div>
          `,
          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with class embed-responsive",
              type: "html-validation",
              input: "check-embed-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an iframe element inside the embed container",
              type: "html-validation",
              input: "check-embed-iframe",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "7c56b6c2-7fda-4c07-93e9-04184d15a9bf",
          title: "Website Integration",
          description:
            "The goal of this coding exam is to quickly get you off the ground with the Website Integration using ZORVIXE UI Kit.",
          difficulty: "Easy",
          score: 80,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
            javascript: ``,
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641096/ce-5-1-website-integration-v1_tm7hz2.gif" class="desc-que-img" />
        
           <p class="desc-que-blue">Animals Home Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641313/coding-test-2-7-1_kekxpm.png" class="desc-que-img" />
              <p class="desc-que-blue">Turtles Details Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641446/coding-test-2-7-2_e2dflw.png" class="desc-que-img" />
              <p class="desc-que-blue">Raccoon Details Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641448/coding-test-2-7-3_wseeyq.png" class="desc-que-img" />
              <p class="desc-que-blue">Kangaroos Details Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641448/coding-test-2-7-4_uss5qn.png" class="desc-que-img" />
              <p class="desc-que-blue">Lions Details Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641446/coding-test-2-7-5_yvsitl.png" class="desc-que-img" />
                <p class="desc-que-blue">Instructions</p>
                 <p class="">Read these instructions carefully.</p>
                        <ul>
                            <li><span>When clicked on the <strong>View Details</strong> button on the animals home page, it must display the respective animal details page.</span></li>
                            <li><span>When clicked on the <strong>Back</strong> button on any of the animal details pages, it must display the animals home page.</span></li>
                         </ul>
                         
                          <p class="desc-que-blue">Resources</p>
                         <p class="desc-que-blue">Use the Image URLs given below.</p>
                        <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641815/animals-turtle-img_vjwogq.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641815/animals-turtle-img_vjwogq.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641890/animals-turtle-bg_diisuz.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641890/animals-turtle-bg_diisuz.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641936/animals-raccoon-img_demkjp.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765641936/animals-raccoon-img_demkjp.png</a></p>            
                    <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642133/animals-raccoon-bg_lhfcfq.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642133/animals-raccoon-bg_lhfcfq.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642192/animals-kangaroo-img_pbtzmo.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642192/animals-kangaroo-img_pbtzmo.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642236/animals-kangaroo-bg_cxhtsn.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642236/animals-kangaroo-bg_cxhtsn.png</a></p>            
                   <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642301/animals-lion-img_gra45p.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642301/animals-lion-img_gra45p.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642350/animals-lion-bg_pinpqg.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765642350/animals-lion-bg_pinpqg.png</a></p>            
                   
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
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-row",
              type: "html-validation",
              input: "check-flex-row", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-column",
              type: "html-validation",
              input: "check-flex-column",
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
            {
              id: 8,
              description:
                "Page should consist of HTML button elements with onclick attribute value calling the display function with section id",
              type: "html-validation",
              input: "check-display-function-usage",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "8eaec575-050f-47b7-bb97-1ed0eecfa3f8",
          title: "HTML Hyperlinks",
          description:
            "The goal of this coding exam is to quickly get you off the ground with the HTML Hyperlinks.",
          difficulty: "Easy",
          score: 50,
          type: "web",
          defaultCode: {
            html: "",
            css: `@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap');`,
            javascript: ``,
          },

          descriptionDetails: `
            <div class="desc-question-details">
              <p class="desc-que-blue">Refer to the below images.</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765643218/coding-test-8-1_dv5gms.gif" class="desc-que-img" />
        
                 <p class="desc-que-blue">Instructions</p>
                 <p class="">Read these instructions carefully.</p>
                        <ul>
                            <li><span>When clicked on the hyperlink Google, the <strong>Google</strong> Home Page should open in a new tab of the browser.</span></li>
                            <li><span>When clicked on the bio image, the page should navigate to the bio section.</span></li>
                         </ul>
                         
                          <p class="desc-que-blue">Resources</p>
                         <p class="desc-que-blue">Use the Image URLs given below.</p>
                        <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765643708/coding-test-8-1_nxs46n.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765643708/coding-test-8-1_nxs46n.png</a></p>            
                      <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765643796/coding-test-8-2-bio-img_bwppeq.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765643796/coding-test-8-2-bio-img_bwppeq.png</a></p>            
                      
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
              input: "check-flex-column",
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

    //Static Course Exam

    {
      id: "Static-Course-Exam",
      title: "Static Course Exam",
      description:
        "In this assignment, let's build a Static Course Exam by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-814f-a37b81618600",
          title: "Static Course Exam",
          description:
            "In this assignment, let's build the Static Course Exam by applying the concepts we learned till now. You can use the Bootstrap concepts",
          difficulty: "Hard",
          score: 200,
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
              <p class="desc-que-blue">Home Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765534869/static-project-section-1_knkrfk.png" class="desc-que-img" />
              <p class="desc-que-blue">List Page:</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765534869/static-project-section-2_ntdvdf.png" class="desc-que-img" />
              <p class="desc-que-blue">Full Detailed View Bali, Indonesia</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765534869/static-project-section-3_sgi7ib.png" class="desc-que-img" />
              <p class="desc-que-blue">Full Detailed View Swiss, Alps</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537036/static-project-section-5_ntmwpa.png" class="desc-que-img" />
              <p class="desc-que-blue">Full Detailed View Paris, France</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537037/static-project-section-4_lrclnp.png" class="desc-que-img" />
               
              <p class="desc-que-blue">Full Detailed New York, USA</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537036/static-project-section-6_zxq2qp.png" class="desc-que-img" />
               
              <p class="desc-que-blue">Full Detailed Tokyo, Japan</p>
              <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537036/static-project-section-7_wdt0xy.png" class="desc-que-img" />

              <div class="Note-container">
                <div class="icon-note">
                  <h6>
                    <i class="bi bi-journal-text"></i>Note
                  </h6>
                </div>
                <p>
                  <ul style={{ margin: "1rem 0 1rem 1.5rem", lineHeight: "1.6" }}>
                    <li>
                    When clicked on the Book Explore Places button on the Home Page, it must display the Places List Page.
                    </li>
                    <li>
                    When clicked on each place in List Page, it must display the respective Place Details Page.  
                    </li>
                    <li>
                    When clicked on Back button in Place List Page, it must display Home Page            
                    </li>
                    <li>
                    When clicked on Back button in Place Details Page, it must display Place List Page          
                    </li>
                    <li>
                      Try to achieve the design as close as possible.
                    </li>
                  </ul>
                </p>
              </div>

               
              <p class="desc-que-blue">Resources</p>
               <p class="">Home Page Background Image</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1764610174/home-bg_oflcds.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1764610174/home-bg_oflcds.jpg</a></p>
              
               <p class="">Place List Card Images</p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537952/bali-indonesia_umsvtu.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765537952/bali-indonesia_umsvtu.jpg</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538016/Paris-france_sibpd1.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538016/Paris-france_sibpd1.jpg</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538088/tokyo-japan_mwg0lk.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538088/tokyo-japan_mwg0lk.jpg</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538222/swiss-alps_wuvvvj.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538222/swiss-alps_wuvvvj.jpg</a></p>
              <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538313/Newyork-usa_xg9plr.jpg" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1765538313/Newyork-usa_xg9plr.jpg</a></p>
              
              <p class="desc-que-blue">CSS Colors used:</p>
              <p class="">Background color Hex Code values card:</p>
                <div  class="desc-colors cffffff">#ffffff</div>
              <p class="">Background color Hex Code values Button Home Page:</p>
                <div  class="desc-colors c1a472a">#1a472a</div>
              <p class="">Background color Hex Code values Button Detail Page:</p>
                <div  class="desc-colors cd4a574">#d4a574</div>
              <p class="">Text color Hex Code values Button Detail Page:</p>
                <div  class="desc-colors cffffff">#ffffff</div>
              <p class="">Text color Hex Code vales:</p>
                <div  class="desc-colors c333333">#333333</div>
                <div  class="desc-colors c666">#666</div>
                <p class="">Text color Hex Code vales Detail Rating:</p>
                <div  class="desc-colors cffa500">#ffa500</div>
              <p class="desc-que-blue">CSS Font families used:</p>
              <ul>
                <li><span>'Segoe UI', Tahoma, Geneva, Verdana, sans-serif</span></li>
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
                "Page should consist of an HTML container element with the bootstrap class name flex-column",
              type: "html-validation",
              input: "check-flex-column",
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
            {
              id: 8,
              description:
                "Page should consist of HTML button elements with onclick attribute value calling the display function with section id",
              type: "html-validation",
              input: "check-display-function-usage",
              output: "true",
              visible: true,
            },
            {
              id: 9,
              description:
                "Page should consist of HTML container elements with data-section attribute and one element with data-default attribute",
              type: "html-validation",
              input: "check-data-section-and-default",
              output: "true",
              visible: true,
            },
            {
              id: 10,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end",
              output: "true",
              visible: true,
            },
            {
              id: 11,
              description:
                "Page should consist of at least two section container elements with data-section attribute, one default section, and all section containers should correctly use the data-section attribute",
              type: "html-validation",
              input: "check-complete-section-validation",
              output: "true",
              visible: true,
            },
            {
              id: 12,
              description:
                "Page should consist of a Bootstrap carousel container with class names carousel and slide",
              type: "html-validation",
              input: "check-carousel-container",
              output: "true",
              visible: true,
            },
            {
              id: 13,
              description:
                "Page should consist of a carousel-inner element with at least one carousel-item having active class",
              type: "html-validation",
              input: "check-carousel-items",
              output: "true",
              visible: true,
            },
            {
              id: 14,
              description:
                "Page should consist of at least an HTML Container element with the property border-top-left-radius",
              type: "css-validation",
              input: "check-border-top-left-radius",
              output: "true",
              visible: true,
            },
            {
              id: 15,
              description:
                "Page should consist of at least an HTML Container element with the property border-top-right-radius",
              type: "css-validation",
              input: "check-border-top-right-radius",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
  ],
};
