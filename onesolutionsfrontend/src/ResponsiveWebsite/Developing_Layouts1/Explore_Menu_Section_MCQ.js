import React from "react";
import MCQLogic from "../../SubtopicsPage/MCQLogic";
import { CodeBlock } from "../../CodeOutputBlocks";

const questionsData = [
  {
    question: (
      <div>
        <p>Where should you go to get Bootstrap Icons?</p>
      </div>
    ),
    options: [
      "https://getbootstrap.com",
      "https://icons.getbootstrap.com",
      "https://fontawesome.com",
      "https://bootstrapicons.io",
    ],
    answer: "https://icons.getbootstrap.com",
  },
  {
    question: (
      <div>
        <p>How do you add a Bootstrap Icon to your HTML?</p>
      </div>
    ),
    options: [
      "Download and link a CSS file",
      "Copy and paste the &lt;svg&gt; code directly",
      "Use &lt;i class=&quot;bi-arrow&quot;&gt;&lt;/i&gt;",
      "Add a CDN link in &lt;head&gt;",
    ],
    answer: "Copy and paste the &lt;svg&gt; code directly",
  },
  {
    question: (
      <div>
        <p>Which HTML element is used in Bootstrap Icons?</p>
      </div>
    ),
    options: ["&lt;icon&gt;", "&lt;i&gt;", "&lt;img&gt;", "&lt;svg&gt;"],
    answer: "&lt;svg&gt;",
  },
  {
    question: (
      <div>
        <p>How do you change the size of a Bootstrap Icon?</p>
        <CodeBlock
          language="html"
          code={`<svg width="32" height="32" fill="currentColor" ...>
  <!-- icon path -->
</svg>`}
        />
      </div>
    ),
    options: [
      "Use font-size CSS",
      "Change width and height attributes",
      "Add class=&quot;icon-large&quot;",
      "Use style=&quot;zoom: 2&quot;",
    ],
    answer: "Change width and height attributes",
  },
  {
    question: (
      <div>
        <p>
          What does the <code>fill=&quot;currentColor&quot;</code> do?
        </p>
        <CodeBlock
          language="html"
          code={`<svg fill="currentColor" class="text-primary">
  <!-- path -->
</svg>`}
        />
      </div>
    ),
    options: [
      "Makes icon invisible",
      "Allows icon to inherit text color",
      "Fills with black only",
      "Disables coloring",
    ],
    answer: "Allows icon to inherit text color",
  },
  {
    question: (
      <div>
        <p>Which icon code should you search for a right arrow?</p>
        <CodeBlock
          language="html"
          code={`<!-- Example from Bootstrap Icons site -->
<svg ...>
  <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8-8-8z"/>
</svg>`}
        />
      </div>
    ),
    options: [
      "arrow-right",
      "chevron-right",
      "arrow-right-short",
      "caret-right",
    ],
    answer: "arrow-right-short",
  },
  {
    question: (
      <div>
        <p>Correct way to make an icon blue and 40px?</p>
        <CodeBlock
          language="html"
          code={`<svg width="40" height="40" fill="currentColor" class="text-primary">
  <!-- icon path -->
</svg>`}
        />
      </div>
    ),
    options: [
      "Use fill=&quot;blue&quot;",
      "Use class=&quot;text-primary&quot; + width/height",
      "Add style=&quot;color: blue; font-size: 40px;&quot;",
      "Both 2 and 3 work",
    ],
    answer: "Both 2 and 3 work",
  },
  {
    question: (
      <div>
        <p>Can you reuse the same Bootstrap Icon SVG multiple times?</p>
        <CodeBlock
          language="html"
          code={`<!-- Copy-paste this SVG anywhere -->
<svg width="24" height="24" ...> ... </svg>
<svg width="24" height="24" ...> ... </svg>`}
        />
      </div>
    ),
    options: [
      "No, only once per page",
      "Yes, copy and paste as many times as needed",
      "Only if you use &lt;use&gt; tag",
      "Only with JavaScript",
    ],
    answer: "Yes, copy and paste as many times as needed",
  },
  {
    question: (
      <div>
        <p>Best practice for icon inside a button?</p>
        <CodeBlock
          language="html"
          code={`<button class="btn btn-primary">
  Learn More
  <svg width="20" height="20" fill="currentColor" class="ms-2">
    <path d="...arrow-right-short..."/>
  </svg>
</button>`}
        />
      </div>
    ),
    options: [
      "Use &lt;i&gt; tag",
      "Paste SVG directly with spacing class",
      "Link external icon file",
      "Use background-image",
    ],
    answer: "Paste SVG directly with spacing class",
  },
  {
    question: (
      <div>
        <p>Where do you find the exact SVG code to copy?</p>
        <CodeBlock
          language="html"
          code={`<!-- After clicking an icon on https://icons.getbootstrap.com -->
<!-- You see this ready-to-copy code: -->
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M..."/>
</svg>`}
        />
      </div>
    ),
    options: [
      "In the CSS file",
      "On the icon's detail page (copy button)",
      "In Bootstrap CDN",
      "In documentation only",
    ],
    answer: "On the icon's detail page (copy button)",
  },
];

const Explore_Menu_Section_MCQ = () => {
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  return (
    <MCQLogic
      title="Explore Menu Section - Bootstrap Icons MCQs"
      questions={randomQuestions}
    />
  );
};

export default Explore_Menu_Section_MCQ;
