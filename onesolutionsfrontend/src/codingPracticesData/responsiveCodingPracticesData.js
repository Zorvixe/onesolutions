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
              ]
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
          title: "Responsive ZORFOOD Navbar",
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
                  input: "check-container-class",
                  output: "true",
                  visible: true,
                },
                {
                  id: 2,
                  description:
                    "Page should consist of an HTML nav element with the bootstrap class name bg-dark",
                  type: "html-validation",
                  input: "check-single-row-class",
                  output: "true",
                  visible: true,
                },
                {
                  id: 3,
                  description:
                    "Page should consist of an HTML container element with the bootstrap class name ml-auto or the CSS property margin-left with the value auto",
                  type: "html-validation",
                  input: "check-col-12-sm-8-md-6-lg-7-xl-3",
                  output: "true",
                  visible: true,
                },
                {
                  id: 4,
                  description:
                    "Page should consist of an HTML image element with the HTML attribute name as src and it's value as ZORFOOD Logo URL given in the reference",
                  type: "html-validation",
                  input: "check-col-12-sm-4-md-6-lg-2-xl-5",
                  output: "true",
                  visible: true,
                },
                
              ]
         },
      ],
    },
  ],
};
