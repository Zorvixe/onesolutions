export const codingPracticesData = {
  python: [
    {
      id: "practice-python-1",
      title: "Coding Practice - 1",
      description: "Introduction to Python basic concepts",
      questions: [
        {
          id: "q-python-1-001",
          title: "Hello World",
          difficulty: "Easy",
          description: "Write a program that prints Hello World as output.",
          sampleInput: "Hello World",
          sampleOutput: "Hello World",
          testCases: [
            { input: "Hello World", output: "Hello World", visible: true },
          ],
          defaultCode: ``,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1-002",
          title: "Three Hashes",
          difficulty: "Easy",
          description:
            "Write a program that prints three hashes (#) in separate lines.",
          sampleInput: "###",
          sampleOutput: "###",
          testCases: [{ input: "###", output: "###", visible: true }],
          defaultCode: ``,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1-003",
          title: "Simple Addition",
          difficulty: "Easy",
          description:
            "Write a program that takes two numbers as input and prints their sum.",
          sampleInput: "5\n3",
          sampleOutput: "8",
          testCases: [
            { input: "5\n3", output: "8", visible: true },
            { input: "10\n20", output: "30", visible: true },
            { input: "-5\n8", output: "3", visible: false },
            { input: "0\n0", output: "0", visible: false },
            { input: "100\n200", output: "300", visible: false },
          ],
          defaultCode: ``,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "practice-python-2",
      title: "Coding Practice - 2",
      description: "Variables and Data Types",
      questions: [
        {
          id: "q-python-2-001",
          title: "Sum of 2495 and 789358",
          difficulty: "Easy",
          description:
            "Write a program that prints two numbers, 2495 and 789358",
          sampleInput: "",
          sampleOutput: "791853",
          testCases: [
            {
              input: "",
              output: "",
              visible: true,
            },
          ],
          defaultCode: ``,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2-002",
          title: "Type Conversion",
          difficulty: "Easy",
          description: "Subtract 596 from 193856",
          sampleInput: "",
          sampleOutput: "193260",
          testCases: [{ input: "", output: "", visible: true }],
          defaultCode: ``,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "practice-python-3",
      title: "Coding Practice - 3",
      description: "Sequence of Instructions",
      questions: [
        {
          id: "q-python-3-001",
          title: "Product of 37, 61 and 391",
          difficulty: "Medium",
          description:
            "Write a program that prints the product of three numbers, 37, 61, and 391",
          sampleInput: "",
          sampleOutput: "882487",
          testCases: [{ input: "", output: "882487", visible: true }],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-1A",
      title: "Coding Practice - 1A",
      description: "Input or output Basics",
      questions: [
        {
          id: "q-python-1A-001",
          title: "Print the Input",
          difficulty: "Easy",
          description:
            "Write a program that reads a single line of input and print the given input.",
          sampleInput: "Bat",
          sampleOutput: "Bat",
          testCases: [
            { input: "5", output: "5", visible: true },
            { input: "Ball", output: "Ball", visible: true },
            { input: "10", output: "10", visible: false },
            { input: "Number", output: "Number", visible: false },
            { input: "20", output: "20", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1A-002",
          title: "Print the Input - 2",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints the word and `###` on two lines.\n Input: The input will be a single line containing a string.\n Output: The first line of output should be a string containing the given word.\n The second line of output should be string containing `###` ",
          sampleInput: "Algebra",
          sampleOutput: `Algebra\n###`,
          testCases: [
            { input: "5", output: "5\n###", visible: true },
            { input: "Ball", output: "Ball\n###", visible: true },
            { input: "10", output: "10\n###", visible: false },
            { input: "Number", output: "Number\n###", visible: false },
            { input: "20", output: "20\n###", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1A-003",
          title: "Print the Input - 3",
          difficulty: "Easy",
          description:
            "Write a program that reads the two words and prints the two words on two lines. ",
          sampleInput: "Apple\nBanana",
          sampleOutput: "Apple\nBanana",
          testCases: [
            { input: "Hi\nhello", output: "Hi\nhello", visible: true },
            { input: "Dog\nCat", output: "Dog\nCat", visible: true },
            { input: "Fruits\nveg", output: "Fruits\nveg", visible: false },
            { input: "Number\ndigit", output: "Number\ndigit", visible: false },
            {
              input: "Banglore\nHyderbad",
              output: "Banglore\nHyderbad",
              visible: false,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1A-004",
          title: "Second Line",
          difficulty: "Easy",
          description:
            "For this problem,you need to write code to read two lines of input and print the second line of input.",
          sampleInput: "Fundamentals\nPython",
          sampleOutput: "Python",
          testCases: [
            { input: "Hi\nhello", output: "hello", visible: true },
            { input: "50\n100", output: "100", visible: true },
            { input: "Fruits\nveg", output: "veg", visible: false },
            { input: "Number\ndigit", output: "digit", visible: false },
            { input: "Banglore\nHyderbad", output: "Hyderbad", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1A-005",
          title: "Print in Reverse Order",
          difficulty: "Easy",
          description:
            "Write a program that reads two lines of input and prints those lines in reverse order.\n(Print the message given in the second line of input before the first line of input).",
          sampleInput: "Book\nPen",
          sampleOutput: "Pen\nBook",
          testCases: [
            { input: "300\n400", output: "400\n300", visible: true },
            { input: "Java\npython", output: "python\nJava", visible: true },
            { input: "Fruits\nveg", output: "veg\nFruits", visible: false },
            { input: "Number\ndigit", output: "digit\nNumber", visible: false },
            {
              input: "Banglore\nHyderbad",
              output: "Hyderbad\nBanglore",
              visible: false,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1A-006",
          title: "Hello World",
          difficulty: "Medium",
          description:
            "Write a program that takes a word W as input and Prints `Hello` followed by the given word W.\nand There should be space after Hello.",
          sampleInput: "World",
          sampleOutput: "Hello World",
          testCases: [
            { input: "Ganesh", output: "Hello Ganesh", visible: true },
            { input: "Python", output: "Hello Python", visible: true },
            { input: "10", output: " Hello 10", visible: false },
            { input: "Number", output: " Hello Number", visible: false },
            { input: "20", output: "Hello 20", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1A-007",
          title: "Print the input - 4",
          difficulty: "Easy",
          description:
            "For this problem,you need to write code to read a single line of input and print the line after the message `Given input:`.",
          sampleInput: "World",
          sampleOutput: "Given input: World",
          testCases: [
            {
              input: "happy new year",
              output: "Given input: happy new year",
              visible: true,
            },
            { input: "Python", output: "Given input: Python", visible: true },
            { input: "10", output: "Given input: 10", visible: false },
            { input: "Number", output: "Given input: Number", visible: false },
            { input: "20", output: "Given input: 20", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1A-008",
          title: "Join Words",
          difficulty: "Easy",
          description:
            "Write a program that reads two words and prints the resultant word by joining the two words.",
          sampleInput: "Milk\nshake",
          sampleOutput: "Milkshake",
          testCases: [
            { input: "Hand\nshake", output: "Handshake", visible: true },
            {
              input: "Python\nProgram",
              output: "PythonProgram",
              visible: true,
            },
            {
              input: "Java\nFundamentals",
              output: "JavaFundamentals",
              visible: false,
            },
            { input: "Number\none", output: " Numberone", visible: false },
            { input: "20\n40", output: "2040", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1A-009",
          title: "Full Name",
          difficulty: "Easy",
          description:
            "A Job applicant is filling out an application form.He entered his first name and last name.\nYour task is to print his full name by joining his first name and last name with a space.",
          sampleInput: "Harry\nPotter",
          sampleOutput: "Harry Potter",
          testCases: [
            { input: "Hand\nshake", output: "Hand shake", visible: true },
            {
              input: "Python\nProgram",
              output: "Python Program",
              visible: true,
            },
            {
              input: "Java\nFundamentals",
              output: "Java Fundamentals",
              visible: false,
            },
            { input: "Number\none", output: " Number one", visible: false },
            { input: "20\n40", output: "20 40", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1A-0010",
          title: "Print Name and Age",
          difficulty: "Medium",
          description:
            "Write a program that reads the name and age of a person and prints them in the given format.\nInput:The first line of input contains a string.Second line of input contains an intiger.\nOutput:The output should be a single line containing a string in the format shown in the output sample.",
          sampleInput: "John\n24",
          sampleOutput: "John is 24 years old",
          testCases: [
            {
              input: "Oliver\n25",
              output: "Oliver is 25 years old",
              visible: true,
            },
            {
              input: "Arthur\n23",
              output: "Arthur is 23 years old",
              visible: true,
            },
            {
              input: "Henry\n22",
              output: "Henry is 22 years old",
              visible: false,
            },
            {
              input: "Emma\n28",
              output: "Emma is 28 years old",
              visible: false,
            },
            {
              input: "Eleanor\n30",
              output: "Eleanor is 30 years old",
              visible: false,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-1B",
      title: "Coding Practice - 1B",
      description: "Input or output Basics",
      questions: [
        {
          id: "q-python-1B-001",
          title: "String Repetition",
          difficulty: "Easy",
          description:
            "Write a program to print the given input word three times in a single line separed by spaces",
          sampleInput: "orange",
          sampleOutput: "orange orange orange",
          testCases: [
            { input: "Apple", output: "Apple Apple Apple", visible: true },
            { input: "100", output: "100 100 100", visible: true },
            { input: "bat", output: "bat bat bat", visible: false },
            { input: "car", output: "car car car", visible: false },
            { input: "van", output: "van van van", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1B-002",
          title: "Simple Square",
          difficulty: "Easy",
          description:
            "Write a program that prints a simple square using star(*).",
          sampleInput: "",
          sampleOutput: "**\n**",
          testCases: [{ input: "", output: "**\n**", visible: true }],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1B-003",
          title: "Simple Square - 2",
          difficulty: "Easy",
          description:
            "Write a program that prints a simple square using star(*).\nNote:There is a space after every star.",
          sampleInput: "",
          sampleOutput: "* *\n* *",
          testCases: [{ input: "", output: "* * \n* * ", visible: true }],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1B-004",
          title: "Simple Triangle",
          difficulty: "Easy",
          description: "Write a program that prints a simple Triangle using",
          sampleInput: "",
          sampleOutput: "* *\n* *",
          testCases: [{ input: "", output: "* * \n* * ", visible: true }],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
  ],

  javascript: [
    {
      id: "practice-js-1",
      title: "Coding Practice - 1",
      description: "Introduction to JavaScript basics",
      questions: [
        {
          id: "q-js-1-001",
          title: "Hello JavaScript",
          difficulty: "Easy",
          description: "Write a function that returns 'Hello JavaScript'.",
          sampleInput: "",
          sampleOutput: "Hello JavaScript",
          testCases: [{ input: "", output: "Hello JavaScript", visible: true }],
          defaultCode: ``,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-js-1-002",
          title: "Sum of Two Numbers",
          difficulty: "Easy",
          description:
            "Write a function that takes two numbers and returns their sum.",
          sampleInput: "5\n3",
          sampleOutput: "8",
          testCases: [
            { input: "5\n3", output: "8", visible: true },
            { input: "10\n20", output: "30", visible: true },
            { input: "-5\n8", output: "3", visible: false },
          ],
          defaultCode: ``,
          score: 5,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
  ],

  static: [
    {
      id: "static-coding-practice-1",
      title: "Todolist",
      description:
        "Build a Todolist by applying the concepts we learned till now.",
      questions: [
        {
          id: "todolist-html-css",
          title: "Build Todolist UI",
          description:
            "Create a responsive Todolist interface matching the design specifications",
          difficulty: "Easy",
          score: 100,
          type: "web", // This indicates it's an HTML/CSS/JS practice
          defaultCode: {
            html: ``,
            css: "",
            javascript: "",
          },
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
      id: "static-responsive-layout",
      title: "Responsive Layout",
      description:
        "Build a responsive website layout using CSS Grid and Flexbox",
      type: "web",
      category: "static",
      questions: [
        {
          id: "responsive-grid",
          title: "CSS Grid Layout",
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
          testCases: [],
        },
      ],
    },
  ],

  // Dynamic Web Practices (JavaScript functionality)
  dynamic: [
    {
      id: "dynamic-calculator",
      title: "JavaScript Calculator",
      description: "Build a functional calculator with JavaScript",
      type: "web",
      category: "dynamic",
      questions: [
        {
          id: "calculator-js",
          title: "Build Calculator",
          description:
            "Create a calculator that can perform basic arithmetic operations",
          difficulty: "Medium",
          score: 200,
          type: "web",
          defaultCode: {
            html: "",
            css: "",
            javascript: "",
          },
          testCases: [],
        },
      ],
    },
    {
      id: "dynamic-weather-app",
      title: "Weather App",
      description: "Build a weather application with API integration",
      type: "web",
      category: "dynamic",
      questions: [
        {
          id: "weather-app-js",
          title: "Weather Application",
          description: "Create a weather app that fetches data from an API",
          difficulty: "Hard",
          score: 300,
          type: "web",
          defaultCode: {
            html: "",
            css: "",
            javascript: "",
          },
          testCases: [],
        },
      ],
    },
  ],

  // Responsive Web Practices
  responsive: [
    {
      id: "responsive-portfolio",
      title: "Portfolio Website",
      description: "Build a responsive portfolio website",
      type: "web",
      category: "responsive",
      questions: [
        {
          id: "portfolio-responsive",
          title: "Responsive Portfolio",
          description: "Create a portfolio that works on all device sizes",
          difficulty: "Medium",
          score: 250,
          type: "web",
          defaultCode: {
            html: "",
            css: "",
            javascript: "",
          },
          testCases: [],
        },
      ],
    },
  ],
};

// Helper function to find practice by ID across all categories
export const findPracticeById = (practiceId) => {
  for (const category in codingPracticesData) {
    const practice = codingPracticesData[category].find(
      (p) => p.id === practiceId
    );
    if (practice) return practice;
  }
  return null;
};

// Helper function to find question by practice ID and question ID
export const findQuestionById = (practiceId, questionId) => {
  const practice = findPracticeById(practiceId);
  if (!practice) return null;

  return (
    practice.questions.find((q) => q.id === questionId) || practice.questions[0]
  );
};
