export const responsiveCodingPracticesData = {
  responsive: [
    //Coding Practice - 1
    {
      id: "responsive-coding-practice-1",
      title: "Responsive Coding Practice 1",
      description:
        "In this assignment, let's build a Responsive Color Palette by applying the concepts we learned till now.",
      questions: [
        {
          id: "59296ce0-86e5-4c49-8fa6-360c29d1d5",
          title: "Responsive Color Palette",
          description:
            "In this assignment, let's build a Responsive Color Palette by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 50,
          type: "web",
          defaultCode: {
            html: ``,
            css: "",
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                  <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="desc-que-blue">Extra Small (Size < 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766168240/color-palette-xs-v1_dvn0p4.png" class="desc-que-img" />
                  <p class="desc-que-blue">Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766168477/color-palette-sm-v1_yhmeem.png" class="desc-que-img" />
                  <p class="desc-que-blue">Medium (Size >= 768px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766168513/color-palette-md-v1_eaaynb.png" class="desc-que-img" />
                  <p class="desc-que-blue">Large (Size >= 992px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766168548/color-palette-lg-v1_rcyapc.png" class="desc-que-img" />
                  <p class="desc-que-blue">Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766168586/color-palette-xl-v1_gu5oaj.png" class="desc-que-img" />
                 
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
                    </ul>
                  </p>
                </div>
                 
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of only one HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-single-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of bootstrap grid column that occupies 12 grid columns in extra small, 8 in small, 6 in medium, 7 in large and 3 in extra large devices",
              type: "html-validation",
              input: "check-col-12-sm-8-md-6-lg-7-xl-3",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of bootstrap grid column that occupies 12 grid columns in extra small, 4 in small, 6 in medium, 2 in large and 5 in extra large devices",
              type: "html-validation",
              input: "check-col-12-sm-4-md-6-lg-2-xl-5",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of bootstrap grid column that occupies 12 grid columns in extra small, 4 in small, 2 in medium, 3 in large and 2 in extra large devices",
              type: "html-validation",
              input: "check-col-12-sm-4-md-2-lg-3-xl-2",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of bootstrap grid column that occupies 12 grid columns in extra small, 6 in small, 2 in medium, 2 in large and 7 in extra large devices",
              type: "html-validation",
              input: "check-col-12-sm-6-md-2-lg-2-xl-7",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-2",
      title: "Responsive Coding Practice 2",
      description:
        "In this assignment, let's build a Responsive ZORFOOD Navbar by applying the concepts we learned till now.",
      questions: [
        {
          id: "f35eea99-d83b-89a7-1bb7f5c90323",
          title: "ZORFOOD Navbar",
          description:
            "In this assignment, let's build a Responsive ZORFOOD Navbar by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 25,
          type: "web",
          defaultCode: {
            html: ``,
            css: "",
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                  <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="desc-que-blue">Extra Small (Size < 576px), Small (Size >= 576px) and Medium (Size >= 768px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766383242/dark-navbar-sm-v1_xob2in.png" class="desc-que-img" />
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766383242/dark-navbar-expand-sm-v1_q2qdp3.png" class="desc-que-img" />
                  <p class="desc-que-blue">Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766383242/dark-navbar-lg_ojhrtq.png" class="desc-que-img" />
                 
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
                        Replace the navbar-light with the navbar-dark to display the Hamburger menu as shown in the image.
                      </li>
                      <li>
                        Use the Bootstrap background color utilities for the background color of the Navbar.
                      </li>
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                 
              <p class="">Use the image given below.</p>
              <p>Food Munch Logo URL:  <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766383242/zorfood_logo_dgixy7.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766383242/zorfood_logo_dgixy7.png</a></p>

              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description:
                "Page should consist of an HTML nav element with the bootstrap class name navbar-dark",
              type: "html-validation",
              input: "check-navbar-dark",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML nav element with the bootstrap class name bg-dark",
              type: "html-validation",
              input: "check-navbar-bg-dark",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name ml-auto or the CSS property margin-left with the value auto",
              type: "html-validation",
              input: "check-ml-auto-or-margin-left-auto",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML image element with the HTML attribute name as src and it's value as ZORFOOD Logo URL given in the reference",
              type: "html-validation",
              input: "check-zorfood-logo-src",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-3",
      title: "Responsive Coding Practice 3",
      description: "",
      questions: [
        {
          id: "ea73b7a4-68f9a0a5-7ede59e2d150",
          title: "Specificity Practice-1",
          description: "",
          difficulty: "Easy",
          score: 15,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .profile-container {
                background-color: #f5f9fd;
                padding: 10px;
            }

            h1 {
                color: #03449e;
                font-family: "Roboto";
                font-size: 32px;
            }

            p {
                color: #0967d2;
                font-family: "Bree Serif";
                font-size: 24px;
            }

            .designation-details-container {
                background-color: #d0efff;
                margin-bottom: 10px;
                padding: 15px;
            }

            .designation-details {
                color: #47a3f3;
                font-family: "Roboto";
                font-size: 18px;
            }

            .contact-info-container {
                background-color: #03254c;
                padding: 10px;
            }

            .contact-info {
                color: #9aa5b1;
                font-family: "Roboto";
                font-size: 14px;
                font-style: italic;
            }`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                  <p class="">In this assignment, you will be applying the CSS Specificity concepts we learned till now.</p>
                  <p class="">To get started, you are provided with a CSS code snippet, which includes the necessary styles to achieve the desired outcome.</p>
                  <p class="">Your objective is to update the HTML code snippet by making use of the styles defined in the CSS code snippet so that the web page looks like the image given below.</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766395687/specificity-profile-v1_aczpvu.png" class="desc-que-img" />
                 
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
                        Do not edit the CSS Code Snippet. Write the HTML Code by making use of the CSS styles already written.
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
                "Page should consists of an HTML container element with the class name designation-details-container",
              type: "html-validation",
              input: "check-designation-details-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consists of an HTML paragraph element with the class name designation-details",
              type: "html-validation",
              input: "check-designation-details-paragraph",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consists of an HTML paragraph element with the class name contact-info",
              type: "html-validation",
              input: "check-contact-info-paragraph",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "f4f69819-8b97994a-bf7ef106c6dc",
          title: "Specificity Practice-2",
          description: "",
          difficulty: "Easy",
          score: 25,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");

            .todo-list-container {
                background-color: #f6f5f1;
                padding: 10px;
            }

            h1 {
                font-family: "Roboto";
                font-size: 30px;
            }

            #todayHeading {
                color: blue;
            }

            li {
                font-family: "Roboto";
                font-weight: 500;
                padding: 10px;
            }

            .completed {
                color: grey;
                text-decoration: line-through;
                font-style: italic;
            }`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                  <p class="">In this assignment, you will be applying the CSS Specificity concepts we learned till now.</p>
                  <p class="">To get started, you are provided with a CSS code snippet, which includes the necessary styles to achieve the desired outcome.</p>
                  <p class="">Your objective is to update the HTML code snippet by making use of the styles defined in the CSS code snippet so that the web page looks like the image given below.</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766397655/specificity-todo-v1_smqny3.png" class="desc-que-img" />
                 
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
                        Do not edit the CSS Code Snippet. Write the HTML Code by making use of the CSS styles already written.
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
                "Page should consist of an HTML unordered list element",
              type: "html-validation",
              input: "check-unordered-list",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of a single HTML main heading element with the HTML attribute name id and its value todayHeading",
              type: "html-validation",
              input: "check-today-heading-id",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of two HTML list item elements with the class name completed",
              type: "html-validation",
              input: "check-completed-list-items",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-4",
      title: "Responsive Coding Practice 4",
      description: "",
      questions: [
        {
          id: "edfbc62e-4f00-ac7e-fea557943096",
          title: "Custom Navbar",
          description:
            "In this assignment, let's build a Custom Navbar by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 25,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px) and Medium (Size >= 768px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766399008/navbar-sm-v1_xtkacn.png" class="desc-que-img" />
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766399008/navbar-expand-sm-v1_vadia1.png" class="desc-que-img" />
                   <p class="">Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766399008/navbar-lg-v1_runk4m.png" class="desc-que-img" />
                
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
                        The logo in the Custom Navbar is the text. You can customise it by adding your favourite or initial letters.
                      </li>
                      <li>
                        Use the CSS properties <strong>padding-left</strong> and <strong>padding-right</strong> to give space around the content on the left side and right side of an HTML element.
                      </li>
                      <li>
                       Use the Bootstrap background color utilities for the background color of the Navbar.
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
                "Page should consist of an HTML nav element with the bootstrap class name navbar-dark",
              type: "html-validation",
              input: "check-navbar-dark",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML nav element with the bootstrap class name bg-info",
              type: "html-validation",
              input: "check-navbar-bg-info",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name m-auto or the CSS property margin with the value auto",
              type: "html-validation",
              input: "check-m-auto-or-margin-auto",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML anchor element with the CSS property border-style",
              type: "html-validation",
              input: "check-anchor-border-style",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "98b221db-10654e8ab4e9-1cc53c490177",
          title: "Specificity Practice-3",
          description:
            "In this assignment, you will be applying the CSS Specificity concepts we learned till now.",
          difficulty: "Easy",
          score: 30,
          type: "web",
          defaultCode: {
            html: `<!DOCTYPE html>
      <html>

      <head></head>

      <body>
          <p>A paragraph with the type selector</p>
          <p class="blue-bg">A paragraph with the class name blue-bg</p>
          <p class="blue-bg orange-bg">A paragraph with the !important applied wins!</p>
      </body>

      </html>`,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                    <p class="desc-que-blue">Instructions</p>
                     <ol class="ordered-unordered-lists">
                        <li><span>Change the background color of the last two HTML paragraph elements to <strong>dodgerblue</strong> using the CSS class selector. The class name should be <strong>blue-bg</strong>.</span></li>
                        <li><span>Change the background color of the last HTML paragraph element to <strong>orange</strong> using the CSS class selector with an <strong>!important</strong> declaration. The class name should be <strong>orange-bg</strong> .</span></li>
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
                        Write the CSS Rulesets one after the other in the CSS following the instructions.
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
                "Page should consists of two HTML paragraph elements with the class name blue-bg",
              type: "html-validation",
              input: "check-two-blue-bg-paragraphs",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consists of a single HTML paragraph element with the CSS property background-color and its value dodgerblue",
              type: "html-validation",
              input: "check-dodgerblue-bg",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consists of an HTML paragraph element with the class name orange-bg",
              type: "html-validation",
              input: "check-orange-bg-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consists of a single HTML paragraph element with the CSS property background-color and its value orange",
              type: "html-validation",
              input: "check-orange-bg-color",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-5",
      title: "Responsive Coding Practice 5",
      description:
        "In this assignment, let's build a VR Website Navbar & Banner Section Section by applying the concepts we learned till now.",
      questions: [
        {
          id: "024bacec-6a4740f29b9f-4b7eb20119e2",
          title: "VR Website Navbar & Banner Section Section",
          description:
            "In this assignment, let's build a VR Website Navbar & Banner Section Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 35,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px) and Medium (Size >= 768px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766554435/vr-nav-and-banner-xs-v1_jmjxv1.png" class="desc-que-img" />
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766554435/vr-nav-expand-and-banner-xs-v1_gl2i1y.png" class="desc-que-img" />
                   <p class="">Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766554435/vr-nav-and-banner-lg-v1_hefunb.png" class="desc-que-img" />
                
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
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>VR Logo <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766554636/vr-logo-img_q3kglt.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766554636/vr-logo-img_q3kglt.png</a></p>
                <p>Background Image:  <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766554640/vr-banner-bg_t7mx5h.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766554640/vr-banner-bg_t7mx5h.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c323f4b">#323f4b</div>
                <div  class="desc-colors c1a2137">#1a2137</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name ml-auto or the CSS property margin-left with the value auto",
              type: "html-validation",
              input: "check-ml-auto-or-margin-left-auto",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the CSS property background image",
              type: "css-validation",
              input: "check-background-image",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap class name text-center or the CSS property text-align with the value center",
              type: "css-validation",
              input: "check-text-align-center",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML button element in an HTML container element",
              type: "html-validation",
              input: "check-button-container",
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
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-6",
      title: "Responsive Coding Practice 6",
      description:
        "In this assignment, let's build a VR Website Kit Section by applying the concepts we learned till now.",
      questions: [
        {
          id: "24504c31-86da44fb892a-59e9573b0ff8",
          title: "VR Website Kit Section",
          description:
            "In this assignment, let's build a VR Website Kit Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 100,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766552661/vr-kit-section-xs-v1_bgqd7j.png" class="desc-que-img" />
                   <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766552739/vr-kit-section-md-v1_thra5f.png" class="desc-que-img" />
                
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
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766552930/vr-kit-1-img_jwsvd5.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766552930/vr-kit-1-img_jwsvd5.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766552930/vr-kit-3-img_nnc5uz.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766552930/vr-kit-3-img_nnc5uz.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766552929/vr-kit-2-img_d7ga80.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766552929/vr-kit-2-img_d7ga80.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors cf9fbfe">#f9fbfe</div>
                <div  class="desc-colors c1f2933">#1f2933</div>
                <div  class="desc-colors c323f4b">#323f4b</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap class name text-center or the CSS property text-align with the value center",
              type: "css-validation",
              input: "check-text-align-center",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-7",
      title: "Responsive Coding Practice 7",
      description:
        "In this assignment, let's build a VR Website Contact Us Section by applying the concepts we learned till now.",
      questions: [
        {
          id: "4749aeb1-951c429b2-c2fdfdfa1",
          title: "VR Website Contact Us Section",
          description:
            "In this assignment, let's build a VR Website Contact Us Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 35,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766555801/vr-contact-us-section-xs-v1_eyezvi.png" class="desc-que-img" />
                   <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766555801/vr-contact-us-section-md-v1_nbasjg.png" class="desc-que-img" />
                
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
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766555924/vr-set-img_jv14o3.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766555924/vr-set-img_jv14o3.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c222b36">#222b36</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap class name text-center or the CSS property text-align with the value center",
              type: "css-validation",
              input: "check-text-align-center",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the bootstrap display class name that starts with d-md-",
              type: "html-validation",
              input: "check-d-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "Page should consist of an HTML container element with the bootstrap display class name d-none",
              type: "html-validation",
              input: "check-d-none-class",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-8",
      title: "Responsive Coding Practice 8",
      description:
        "In this assignment, let's build a VR Website Trending Blogs Section by applying the concepts we learned till now.",
      questions: [
        {
          id: "e40c012d-8e4aa336-f02bb359f984",
          title: "VR Website Trending Blogs Section",
          description:
            "In this assignment, let's build a VR Website Trending Blogs Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 35,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766557085/vr-trending-blogs-section-xs-v1_pdbcxy.png" class="desc-que-img" />
                   <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766557084/vr-trending-blogs-section-md-v1_tarqtc.png" class="desc-que-img" />
                
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
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766557180/vr-trending-blogs-2-img_muy0wr.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766557180/vr-trending-blogs-2-img_muy0wr.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766557178/vr-trending-blogs-1-img_ifnnfr.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766557178/vr-trending-blogs-1-img_ifnnfr.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c1f2933">#1f2933</div>
                <div  class="desc-colors c323f4b">#323f4b</div>
                <div  class="desc-colors c959ead">#959ead</div>
                <div  class="desc-colors c1754a1">#1754a1</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description: "Page should consist of an HTML anchor element",
              type: "html-validation",
              input: "check-anchor-element",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the bootstrap class name shadow",
              type: "html-validation",
              input: "check-shadow-class",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-9",
      title: "Responsive Coding Practice 9",
      description:
        "In this assignment, let's build a VR Website Products Section by applying the concepts we learned till now.",
      questions: [
        {
          id: "42f6ad0c-85a637cfc0-edbd7b882f2d",
          title: "VR Website Products Section",
          description:
            "In this assignment, let's build a VR Website Products Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 45,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766559186/vr-products-section-xs-v1_uiewge.png" class="desc-que-img" />
                   <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766559185/vr-products-section-md-v1_ctcpoj.png" class="desc-que-img" />
                
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
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766559266/vr-products-headset-img_csc50u.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766559266/vr-products-headset-img_csc50u.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766559265/vr-products-headset-with-controllers-img_bhy36s.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766559265/vr-products-headset-with-controllers-img_bhy36s.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c1754a1">#1754a1</div>
                <div  class="desc-colors c1f2933">#1f2933</div>
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
                "Page should consist of an HTML button element in an HTML container element",
              type: "html-validation",
              input: "check-button-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
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
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end",
              output: "true",
              visible: true,
            },
            {
              id: 8,
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
      id: "responsive-coding-practice-10",
      title: "Responsive Coding Practice 10",
      description: "",
      questions: [
        {
          id: "0fbaa001-03d5693f72-91249df802f9",
          title: "VR Website Footer Section",
          description:
            "In this assignment, let's build a VR Website Footer Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 45,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766758343/vr-footer-section-xs-v1_srx2r8.png" class="desc-que-img" />
                   <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766758343/vr-footer-section-xs-v1_srx2r8.png" class="desc-que-img" />
                
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
                      <li>Use the Bootstrap class name text-md-left to align the text from the Medium devices (Size >= 768px).Try to achieve the design as close as possible.
                      </li>
                      <li>Use the Bootstrap class name justify-content-md-start to align the flex items at the start of the Flexbox Container from the Medium devices (Size >= 768px).
                      </li>
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766554636/vr-logo-img_q3kglt.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766554636/vr-logo-img_q3kglt.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c5a7184">#5a7184</div>
                <div  class="desc-colors c959ead">#959ead</div>
                <div  class="desc-colors c19232d">#19232d</div>
                <div  class="desc-colors c202b36">#202b36</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-center",
              type: "html-validation",
              input: "check-justify-content-center",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML horizontal rule (hr) element",
              type: "html-validation",
              input: "check-hr-element",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "cd33ae6a-a3b9bb8ce-d677b1e0895d",
          title: "Portfolio Website Navbar & Banner Section",
          description:
            "In this assignment, let's build a Portfolio Website Navbar & Banner Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 55,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766759172/porfolio-nav-and-banner-xs-v1_bs8ldv.png" class="desc-que-img" />
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766759171/porfolio-nav-and-banner-expand-xs-v1_ekgska.png" class="desc-que-img" />
                   <p class="">Medium (Size >= 768px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766759173/porfolio-nav-and-banner-md-v1_z6vpwb.png" class="desc-que-img" />
                
                   <p class="">Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766759172/porfolio-nav-and-banner-lg-v1_duqyib.png" class="desc-que-img" />
                
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
                      <li>The logo in the Navbar is the text. You can customise it by adding your favourite or initial letters.
                      </li>
                      <li>You can use your own image in the Banner Section.
                      </li>
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766759351/portfolio-banner-img_vyrxyf.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766759351/portfolio-banner-img_vyrxyf.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c4b6cc1">#4b6cc1</div>
                <div  class="desc-colors c191a1d">#191a1d</div>
                <div  class="desc-colors c9aa5b1">#9aa5b1</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
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
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the bootstrap class name ml-auto or the CSS property margin-left with the value auto",
              type: "html-validation",
              input: "check-ml-auto-or-margin-left-auto",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description: "Page should consist of an HTML span element",
              type: "html-validation",
              input: "check-span-element",
              output: "true",
              visible: true,
            },
            {
              id: 8,
              description:
                "Page should consist of an HTML container element with the bootstrap order class name in medium devices that starts with order-md-",
              type: "html-validation",
              input: "check-order-md-class",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-11",
      title: "Responsive Coding Practice 11",
      description: "",
      questions: [
        {
          id: "a44c926d-8022e1c5b3-d3628b8d30e3",
          title: "Portfolio Website About Me & Skills Sections",
          description:
            "In this assignment, let's build a Portfolio Website About Me & Skills Sections by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 40,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760025/porfolio-about-me-and-skills-xs-v1_qrlks6.png" class="desc-que-img" />
                   <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760025/porfolio-about-me-and-skills-md-v1_uin9vx.png" class="desc-que-img" />
                
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
                     
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760238/portfolio-about-me-img_udisjj.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760238/portfolio-about-me-img_udisjj.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760236/portfolio-skills-html-img_nbdtjf.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760236/portfolio-skills-html-img_nbdtjf.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760236/portfolio-skills-css-img_axhvn7.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760236/portfolio-skills-css-img_axhvn7.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760236/portfolio-skills-bootstrap-img_jgspab.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760236/portfolio-skills-bootstrap-img_jgspab.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760236/portfolio-skills-js-img_my5a6u.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760236/portfolio-skills-js-img_my5a6u.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors ccced00">#cced00</div>
                <div  class="desc-colors c1f2933">#1f2933</div>
                <div  class="desc-colors c9aa5b1">#9aa5b1</div>
                <div  class="desc-colors c323f4b">#323f4b</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap order class name in medium devices that starts with order-md-",
              type: "html-validation",
              input: "check-order-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the bootstrap display class name d-none",
              type: "html-validation",
              input: "check-d-none-class",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "Page should consist of an HTML container element with the bootstrap class name shadow",
              type: "html-validation",
              input: "check-shadow-class",
              output: "true",
              visible: true,
            },
            {
              id: 8,
              description:
                "Page should consist of an HTML container element with the bootstrap display class name that starts with d-md-",
              type: "html-validation",
              input: "check-d-md-class",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "206d694d-6403cbd88a-8b858685ff4c",
          title: "Portfolio Website Projects Section",
          description:
            "In this assignment, let's build a Portfolio Website Projects Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 30,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760818/portfolio-projects-section-xs-v1_ngstwo.png" class="desc-que-img" />
                   <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760818/portfolio-projects-section-md-v1_fofnk7.png" class="desc-que-img" />
                
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
                      <li>The Icons used in this section are the Bootstrap Icons.
                      </li>
                      
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760932/portfolio-project-1-img_y0mv68.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760932/portfolio-project-1-img_y0mv68.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760932/portfolio-project-2-img_ok4og9.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760932/portfolio-project-2-img_ok4og9.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors ccced00">#cced00</div>
                <div  class="desc-colors c3e4c59">#3e4c59</div>
                <div  class="desc-colors c9aa5b1">#9aa5b1</div>
                <div  class="desc-colors c323f4b">#323f4b</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description: "Page should consist of an HTML anchor element",
              type: "html-validation",
              input: "check-anchor-element",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description: "Page should consist of an arrow bootstrap icon",
              type: "html-validation",
              input: "check-bootstrap-arrow-icon",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-12",
      title: "Responsive Coding Practice 12",
      description: "",
      questions: [
        {
          id: "d634c6ac-c692ca0c-8abeb351cfe1",
          title: "Portfolio Website Services Section",
          description:
            "In this assignment, let's build a Portfolio Website Services Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 25,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px), Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766761883/portfolio-services-section-xs-v1_giqnbm.png" class="desc-que-img" />
                   <p class="">Medium (Size >= 768px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766761884/portfolio-services-section-md-v1_an2pow.png" class="desc-que-img" />
                
                   <p class="">Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766761883/portfolio-services-section-lg-v1_ggwwto.png" class="desc-que-img" />
                
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
                     
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766762081/portfolio-web-design-img_gdaxgx.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766762081/portfolio-web-design-img_gdaxgx.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766762080/portfolio-customize-img_oagdp8.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766762080/portfolio-customize-img_oagdp8.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766762080/portfolio-web-development-img_yukkeh.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766762080/portfolio-web-development-img_yukkeh.png</a></p>
               <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors ccced00">#cced00</div>
                <div  class="desc-colors c52606d">#52606d</div>
                <div  class="desc-colors c9aa5b1">#9aa5b1</div>
                <div  class="desc-colors c323f4b">#323f4b</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },

            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap class name shadow",
              type: "html-validation",
              input: "check-shadow-class",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "5eb03919-ae848522b63b1f3e43283",
          title: "Portfolio Website Work Done Section",
          description:
            "In this assignment, let's build a Portfolio Website Work Done Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 40,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766762340/portfolio-work-done-section-v1_kf3mju.png" class="desc-que-img" />
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
                      <li>The Icons used in this section are the Bootstrap Icons.
                      </li>
                      
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766762411/portfolio-work-done-bg_y30skr.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766762411/portfolio-work-done-bg_y30skr.png</a></p>
              
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an arrow bootstrap icon",
              type: "html-validation",
              input: "check-bootstrap-arrow-icon",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML horizontal rule (hr) element",
              type: "html-validation",
              input: "check-hr-element",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
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
                "Page should consist of an HTML container element with the bootstrap class name text-center or the CSS property text-align with the value center",
              type: "css-validation",
              input: "check-text-align-center",
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
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name that starts with col-",
              type: "html-validation",
              input: "check-col-classes",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-13",
      title: "Responsive Coding Practice 13",
      description: "",
      questions: [
        {
          id: "4f3e7a16-4f1ec7daf9-5847d34430ce",
          title: "Portfolio Website Testimonials Section",
          description:
            "In this assignment, let's build a Portfolio Website Testimonials Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 25,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766293/portfolio-testimnonials-section-v1_hv6tro.gif" class="desc-que-img" />
                <p class="desc-que-blue">Design Files.</p>
                  <p class="">Portfolio Website Testimonials Sections</p>

                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766292/Testimonials_2_uki5xp_q0cvz1.png" class="desc-que-img" />
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766292/Testimonials_3_uk7kdq_s3ruf4.png" class="desc-que-img" />
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766291/Testimonials_1_qznbwn_gtogis.png" class="desc-que-img" />
                
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
                     
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <ul>
                    <li>
                         <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766480/portfolio-testimonials-1-img_pq6sjd.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766480/portfolio-testimonials-1-img_pq6sjd.png</a></p>
                      </li>
                      <li>
                             <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766483/portfolio-testimonials-2-img_qgfpyb.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766483/portfolio-testimonials-2-img_qgfpyb.png</a></p>
                      </li>
                      <li>
                            <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766479/portfolio-testimonials-3-img_qyfzur.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766766479/portfolio-testimonials-3-img_qyfzur.png</a></p>
                      </li>
                </ul>
                <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors ccced00">#cced00</div>
                <div  class="desc-colors c1f2933">#1f2933</div>
                <div  class="desc-colors c9aa5b1">#9aa5b1</div>
                <div  class="desc-colors c323f4b">#323f4b</div>
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
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },

            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name that starts with col-",
              type: "html-validation",
              input: "check-col-classes",
              output: "true",
              visible: true,
            },

            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name carousel",
              type: "html-validation",
              input: "check-carousel-container",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap class name text-center or the CSS property text-align with the value center",
              type: "css-validation",
              input: "check-text-align-center",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "5eb03919-ae848522b63b1-f3e43283",
          title: "Portfolio Website Footer Section",
          description:
            "In this assignment, let's build a Portfolio Website Footer Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 30,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px) and Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766767058/portfolio-footer-section-xs-v1_kp7xhp.png" class="desc-que-img" />
                  <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766767057/portfolio-footer-section-md-v1_eytruv.png" class="desc-que-img" />
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
                      <li>The Icons used in this section are Font Awesome Icons.
                      </li>
                      
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760238/portfolio-about-me-img_udisjj.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766760238/portfolio-about-me-img_udisjj.png</a></p>
              <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c001c32">#001c32</div>
                <div  class="desc-colors ccced00">#cced00</div>
                <div  class="desc-colors c0d2436">#0d2436</div>
                <div  class="desc-colors c9aa5b1">#9aa5b1</div>
                <div  class="desc-colors c5a7184">#5a7184</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container",
              output: "true",
              visible: true,
            },
            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-row",
              type: "html-validation",
              input: "check-flex-row", // ✔ Updated
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-14",
      title: "Responsive Coding Practice 14",
      description: "",
      questions: [
        {
          id: "f5eabaab-41995df7b8-fb450aaaea57",
          title: "Ecommerce Website Navbar & Banner Section",
          description:
            "In this assignment, let's build a Ecommerce Website Navbar & Banner Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 20,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px) and Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768060/ecommerce-nav-and-banner-xs-v1_v6efns.gif" class="desc-que-img" />
               
                  <p class="">Medium (Size >= 768px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768279/ecommerce-nav-and-banner-lg-v1_tlhe6e.gif" class="desc-que-img" />
               
                  <p class="">Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768279/ecommerce-nav-and-banner-lg-v1_tlhe6e.gif" class="desc-que-img" />
               
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
                        Fix the height of the Bootstrap Carousel to 100vh to occupy the Bootstrap Carousel only to the Viewport height.
                      </li>
                     
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p class="">Ecommerce Logo:</p>
                <ul>
                    <li>
                         <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768682/ecommerce-website-logo-img_efzxzl.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768682/ecommerce-website-logo-img_efzxzl.png</a></p>
                      </li>
                     
                </ul>
                <p class="">For Extra Small and Small devices:</p>
                <ul>
                    <li>
                         <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768837/ecommerce-carousel-1-sm-img_osanvl.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768837/ecommerce-carousel-1-sm-img_osanvl.png</a></p>
                      </li>
                      <li>
                             <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768883/ecommerce-carousel-2-sm-img_sgfpht.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768883/ecommerce-carousel-2-sm-img_sgfpht.png</a></p>
                      </li>
                      <li>
                            <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768916/ecommerce-carousel-3-sm-img_toqiqr.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766768916/ecommerce-carousel-3-sm-img_toqiqr.png</a></p>
                      </li>
                </ul>
                <p class="">For Medium, Large, and Extra Large devices:</p>
                <ul>
                    <li>
                         <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769088/ecommerce-carousel-1-img_us6kui.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769088/ecommerce-carousel-1-img_us6kui.png</a></p>
                      </li>
                      <li>
                             <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769146/ecommerce-carousel-2-img_l60dqi.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769146/ecommerce-carousel-2-img_l60dqi.png</a></p>
                      </li>
                      <li>
                            <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769199/ecommerce-carousel-1-img_xokifs.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769199/ecommerce-carousel-1-img_xokifs.png</a></p>
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
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name ml-auto or the CSS property margin-left with the value auto",
              type: "html-validation",
              input: "check-ml-auto-or-margin-left-auto",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name carousel",
              type: "html-validation",
              input: "check-carousel-container",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap display class name that starts with d-md-",
              type: "html-validation",
              input: "check-d-md-class",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "859f0ec2-489f1da6885-e6ee7ae24",
          title: "Ecommerce Website Services Section",
          description:
            "In this assignment, let's build a Ecommerce Website Services Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 25,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px) and Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769664/ecommerce-services-section-xs-v1_maotvl.png" class="desc-que-img" />
                  <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769664/ecommerce-services-section-md-v1_dus0ac.png" class="desc-que-img" />
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
                      
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769784/ecommerce-services-delivery-img_ezdamz.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769784/ecommerce-services-delivery-img_ezdamz.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769786/ecommerce-services-money-back-img_uei70s.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769786/ecommerce-services-money-back-img_uei70s.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769783/ecommerce-services-24-by-7-support-img_ixmj4o.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766769783/ecommerce-services-24-by-7-support-img_ixmj4o.png</a></p>
              <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c183b56">#183b56</div>
                <div  class="desc-colors c616c7c">#616c7c</div>
                <div  class="desc-colors c1f2933">#1f2933</div>
                <div  class="desc-colors c7b8794">#7b8794</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
            {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },

            {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap class name shadow",
              type: "html-validation",
              input: "check-shadow-class",
              output: "true",
              visible: true,
            },
          ],
        },
      ],
    },
    {
      id: "responsive-coding-practice-15",
      title: "Responsive Coding Practice 15",
      description:
        "",
      questions: [
        {
          id: "f5eabaab-419957b8-fb450aaaea57",
          title: "Ecommerce Website Products Section",
          description:
            "In this assignment, let's build a Ecommerce Website Products Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 60,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px) and Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771226/ecommerce-products-section-xs-v1_fxdj4u.gif" />
               
                  <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771227/ecommerce-products-section-md-v1_nakibp.gif" class="desc-que-img" />
               
                  <p class="">Design Files</p>
                    <p class="">Extra Small (Size < 576px) and Small (Size >= 576px)</p>
                   <ul>
                        <li>
                         <p><a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771485/Website_Production_Section_1_gv0gvx_n3ii3j.png" target="_blank">Extra Small (Size < 576px) and Small (Size >= 576px) - Products Section</a></p>
                      </li>
                        <li>
                         <p><a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771483/Website_Production_Section_2_wsvmpi_u9tdhj.png" target="_blank">Extra Small (Size < 576px) and Small (Size >= 576px) - Smart Headphones</a></p>
                      </li>
                        <li>
                         <p><a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771481/Website_Production_Section_3_o9f8jp_xmm8ro.png" target="_blank">Extra Small (Size < 576px) and Small (Size >= 576px) - Laptops</a></p>
                      </li>
                       
                   </ul>
                    <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px)</p>
                   <ul>
                        <li>
                         <p><a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771657/Website_Production_Section_4_advxf5_smhlrd.png" target="_blank">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Products Section</a></p>
                      </li>
                        <li>
                         <p><a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771661/Website_Production_Section_5_djvlfa_tmlreu.png" target="_blank">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Smart Headphones</a></p>
                      </li>
                        <li>
                         <p><a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771655/Website_Production_Section_6_tvashk_gpcfvq.png" target="_blank">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Laptops</a></p>
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
                        When clicked on the <strong>View Details</strong> button, the respective modal should appear.
                      </li>
                     
                    </ul>
                  </p>
                </div>
                
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
               
                <ul>
                    <li>
                         <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771965/ecommerce-products-headphones-bg_irh0gd.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771965/ecommerce-products-headphones-bg_irh0gd.png</a></p>
                      </li>
                      <li>
                             <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771961/ecommerce-products-laptops-bg_kl5byb.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766771961/ecommerce-products-laptops-bg_kl5byb.png</a></p>
                      </li>
                </ul>
                <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c183b56">#183b56</div>
                <div  class="desc-colors cff9f00">#ff9f00</div>
                <div  class="desc-colors c323f4b">#323f4b</div>

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
                "Page should consist of an HTML button element in an HTML container element",
              type: "html-validation",
              input: "check-button-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
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
              description: `Page should consist of an HTML container element with CSS property background-size and value cover`,
              type: "css-validation",
              input: "check-background-size",
              output: "true",
              visible: true,
            },
            {
              id: 7,
              description:
                "Page should consist of an HTML container element with the bootstrap class name d-flex",
              type: "html-validation",
              input: "check-d-flex-container",
              output: "true",
              visible: true,
            },
            {
              id: 8,
              description:
                "Page should consist of an HTML container element with the bootstrap class name flex-column",
              type: "html-validation",
              input: "check-flex-column", // ✔ Updated
              output: "true",
              visible: true,
            },
            {
              id: 9,
              description:
                "Page should consist of an HTML container element with bootstrap class name justify-content-end",
              type: "html-validation",
              input: "check-justify-content-end",
              output: "true",
              visible: true,
            },
            {
              id: 10,
              description:
                "Page should consist of an HTML container element with the bootstrap class name modal",
              type: "html-validation",
              input: "check-justify-content-end",
              output: "true",
              visible: true,
            },
          ],
        },
        {
          id: "6fc126c9-7b742260e5-b560b318f5bf",
          title: "Ecommerce Website Trending Blogs Section",
          description:
            "In this assignment, let's build a Ecommerce Website Trending Blogs Section by applying the concepts we learned till now.",
          difficulty: "Easy",
          score: 25,
          type: "web",
          defaultCode: {
            html: ``,
            css: `@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@400;700&family=Lobster&family=Monoton&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display+SC:ital,wght@0,400;0,700;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,700&display=swap");`,
            javascript: "",
          },
          // FIX: Use proper string formatting for descriptionDetails
          descriptionDetails: `
                <div class="desc-question-details">
                <p class="desc-que-blue">Refer to the below images.</p>
                  <p class="">The following images illustrate all device sizes, from extra small to extra large.</p>
                  <p class="">Extra Small (Size < 576px) and Small (Size >= 576px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766773144/ecommerce-trending-blogs-section-xs-v1_ukbzkm.png" class="desc-que-img" />
                  <p class="">Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px):</p>
                  <img src="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766773148/ecommerce-trending-blogs-section-md-v1_gsh5us.png" class="desc-que-img" />
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
                      
                    </ul>
                  </p>
                </div>
                 <hr>
                  <p class="desc-que-blue">Resources</p>
                <p class="">Use the image URLs given below.</p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766773373/ecommerce-trending-blogs-1-img_smh4x2.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766773373/ecommerce-trending-blogs-1-img_smh4x2.png</a></p>
                <p>URL: <a href="https://res.cloudinary.com/djhuqjvrl/image/upload/v1766773374/ecommerce-trending-blogs-2-img_mgsjvk.png" target="_blank">https://res.cloudinary.com/djhuqjvrl/image/upload/v1766773374/ecommerce-trending-blogs-2-img_mgsjvk.png</a></p>
              <p class="desc-que-blue">CSS Colors used:</p>
                <div  class="desc-colors c183b56">#183b56</div>
                <div  class="desc-colors cff9f00">#ff9f00</div>
                <div  class="desc-colors c959ead">#959ead</div>
                <hr>
              <p class="desc-que-blue">Concepts Review</p>
              <p class="">Want to quickly review some of the concepts you've been learning?</p>
              <p class="">Take a look at the Cheat Sheets.</p>
                 
                </div>
              `,
          testCases: [
          {
              id: 1,
              description: "Page should consist of an HTML image element",
              type: "html-validation",
              input: "check-image-container",
              output: "true",
              visible: true,
            },
            {
              id: 2,
              description: "Page should consist of an HTML anchor element",
              type: "html-validation",
              input: "check-anchor-element",
              output: "true",
              visible: true,
            },
            {
              id: 3,
              description:
                "Page should consist of an HTML container element with the bootstrap class name container",
              type: "html-validation",
              input: "check-container-class",
              output: "true",
              visible: true,
            },
            {
              id: 4,
              description:
                "Page should consist of an HTML container element with the bootstrap class name row",
              type: "html-validation",
              input: "check-row-class",
              output: "true",
              visible: true,
            },
             {
              id: 5,
              description:
                "Page should consist of an HTML container element with the bootstrap grid column class name in medium devices that starts with col-md-",
              type: "html-validation",
              input: "check-col-md-class",
              output: "true",
              visible: true,
            },
             
            {
              id: 6,
              description:
                "Page should consist of an HTML container element with the bootstrap class name shadow",
              type: "html-validation",
              input: "check-shadow-class",
              output: "true",
              visible: true,
            },

          ],
        },
      ],
    },
  ],
};
