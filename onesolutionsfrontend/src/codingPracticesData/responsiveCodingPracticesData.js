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
              id: 7,
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
  ],
};
