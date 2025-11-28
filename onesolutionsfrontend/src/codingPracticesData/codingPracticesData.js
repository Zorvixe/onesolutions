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
          description:
            "Write a program that prints a simple Triangle using star(*).\nPrint a star on the first line and two stars on the second line.",
          sampleInput: "",
          sampleOutput: "*\n**",
          testCases: [{ input: "", output: "*\n**", visible: true }],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1B-005",
          title: "Simple Triangle - 2",
          difficulty: "Easy",
          description:
            "Write a program that prints a simple Triangle using star(*).\nPrint a star on the first line and two stars on the second line.\nNote:There is a space after every star.",
          sampleInput: "",
          sampleOutput: "*\n* * ",
          testCases: [{ input: "", output: "*\n* * ", visible: true }],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1B-006",
          title: "Stars",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints the word in `* * * Word * * *` format.\nInput:The input will be a single line cpntaining a string.\nOutput:Output should be a single line containing a string in the format shown in the sample output.",
          sampleInput: "Welcome",
          sampleOutput: "* * * Welcome * * *",
          testCases: [
            {
              input: "OneSolution",
              output: "* * * OneSolution * * *",
              visible: true,
            },
            {
              input: "Hyderbad",
              output: "* * * Hyderbad * * *",
              visible: true,
            },
            { input: "Ganesh", output: "* * * Ganesh * * *", visible: false },
            { input: "apple", output: "* * * apple * * *", visible: false },
            { input: "Mysore", output: "* * * Mysore * * *", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1B-007",
          title: "First Character",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints the first Character of the word",
          sampleInput: "Python",
          sampleOutput: "P",
          testCases: [
            { input: "Apple", output: "A", visible: true },
            { input: "Mango", output: "M", visible: true },
            { input: "bat", output: "b", visible: false },
            { input: "car", output: "c", visible: false },
            { input: "van", output: "v", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1B-008",
          title: "Third Character",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints the Third Character of the word",
          sampleInput: "java",
          sampleOutput: "v",
          testCases: [
            { input: "Microbio", output: "c", visible: true },
            { input: "Ramesh", output: "m", visible: true },
            { input: "bat", output: "t", visible: false },
            { input: "Driver", output: "i", visible: false },
            { input: "heart", output: "a", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1B-009",
          title: "First and Last digits",
          difficulty: "Easy",
          description:
            "Given a four-digit Number `N` as input.Write a program to print first and last digit of the number.\nOutput:Print the first digit in the first line and the last digit in the second line.",
          sampleInput: "1246",
          sampleOutput: "1\n6",
          testCases: [
            { input: "6578", output: "6\n8", visible: true },
            { input: "2479", output: "2\n9", visible: true },
            { input: "3458", output: "3\n8", visible: false },
            { input: "9876", output: "9\n6", visible: false },
            { input: "3271", output: "3\n1", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1B-0010",
          title: "Reverse the digits",
          difficulty: "Medium",
          description:
            "Write a program to reverse the digits of a given two-digit number.",
          sampleInput: "56",
          sampleOutput: "65",
          testCases: [
            { input: "95", output: "59", visible: true },
            { input: "24", output: "42", visible: true },
            { input: "34", output: "43", visible: false },
            { input: "98", output: "89", visible: false },
            { input: "38", output: "83", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-1C",
      title: "Coding Practice - 1C",
      description: "Input or output Basics",
      questions: [
        {
          id: "q-python-1C-001",
          title: "Length of the String",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints the Length of the word.\nInput:The input will be a single line containing a string.\nOutput:Prints the number of Characters in the word.",
          sampleInput: "Software",
          sampleOutput: "8",
          testCases: [
            { input: "python", output: "6", visible: true },
            { input: "Bhumi", output: "5", visible: true },
            { input: "Ravi", output: "4", visible: false },
            { input: "kushi", output: "5", visible: false },
            { input: "dev", output: "3", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1C-002",
          title: "Star Repetition",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints Stars(*) equal to the Length of the word.",
          sampleInput: "Simple",
          sampleOutput: "******",
          testCases: [
            { input: "python", output: "******", visible: true },
            { input: "Bhumi", output: "*****", visible: true },
            { input: "Ravi", output: "****", visible: false },
            { input: "kushi", output: "*****", visible: false },
            { input: "dev", output: "***", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1C-003",
          title: "Substract 1 from String Length",
          difficulty: "Medium",
          description:
            "Write a program that reads a word and prints L-1 ,where `L` is the Length of the word.\nInput:Input will be a single line containing a string.\nOutput:The output should be a single line containing an integer obtained after subtracting 1 from the Length of the word.",
          sampleInput: "Ice",
          sampleOutput: "2",
          testCases: [
            { input: "cake", output: "3", visible: true },
            { input: "man", output: "2", visible: true },
            { input: "Ravi", output: "3", visible: false },
            { input: "kushi", output: "4", visible: false },
            { input: "dev", output: "2", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1C-004",
          title: "Index of last Character",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints the index of last Character of the word.",
          sampleInput: "orange",
          sampleOutput: "5",
          testCases: [
            { input: "lion", output: "3", visible: true },
            { input: "rabbit", output: "5", visible: true },
            { input: "Ravi", output: "3", visible: false },
            { input: "kushi", output: "4", visible: false },
            { input: "dev", output: "2", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1C-005",
          title: "Last Character",
          difficulty: "Easy",
          description:
            "Write a program which prints the last character of a given word.",
          sampleInput: "january",
          sampleOutput: "y",
          testCases: [
            { input: "boat", output: "t", visible: true },
            { input: "tiger", output: "r", visible: true },
            { input: "Ravi", output: "i", visible: false },
            { input: "kushi", output: "i", visible: false },
            { input: "dev", output: "v", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1C-006",
          title: "Length excluding Characters",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints the Length of the word excluding the first and last character.",
          sampleInput: "April",
          sampleOutput: "3",
          testCases: [
            { input: "boating", output: "5", visible: true },
            { input: "donkey", output: "4", visible: true },
            { input: "Ravi", output: "2", visible: false },
            { input: "kushi", output: "3", visible: false },
            { input: "dev", output: "1", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1C-007",
          title: "Star Repetition - 2",
          difficulty: "Medium",
          description:
            "Write a program that reads a word  and prints the first letter of the given word and stars (*) instead of other letters.",
          sampleInput: "November",
          sampleOutput: "N*******",
          testCases: [
            { input: "December", output: "D*******", visible: true },
            { input: "June", output: "J***", visible: true },
            { input: "Ravi", output: "R***", visible: false },
            { input: "kushi", output: "k****", visible: false },
            { input: "dev", output: "d**", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1C-008",
          title: "Half length of string",
          difficulty: "Easy",
          description:
            "Write a program that reads a word  and prints half the length of the word.",
          sampleInput: "zebra",
          sampleOutput: "2.5",
          testCases: [
            { input: "mysore", output: "3.0", visible: true },
            { input: "June", output: "2.0", visible: true },
            { input: "Ravi", output: "2.0", visible: false },
            { input: "kushi", output: "2.5", visible: false },
            { input: "dev", output: "1.5", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-Assignment-1A",
      title: "Assignment-1A",
      description: "Input or output Basics",
      questions: [
        {
          id: "q-python-Assignment-1A-001",
          title: "Simple Rectangle",
          difficulty: "Easy",
          description:
            "Write a program that prints a simple Rectangle using stars(*).\nNote:There is a space after every star.",
          sampleInput: "",
          sampleOutput: "* * \n* * \n* * \n* * \n* * ",
          testCases: [
            {
              input: "",
              output: "* * \n* * \n* * \n* * \n* * ",
              visible: true,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1A-002",
          title: "Simple Square -3",
          difficulty: "Easy",
          description:
            "Write a program that prints a simple square using stars(*).\nNote:Print three stars on the first line,Three stars on the second line , Three stars on the third line and There is a space after every star.",
          sampleInput: "",
          sampleOutput: "* * * \n* * * \n* * * \n* * * \n* * * ",
          testCases: [
            {
              input: "",
              output: "* * * \n* * * \n* * * \n* * * \n* * * ",
              visible: true,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1A-003",
          title: "Simple Triangle -3",
          difficulty: "Easy",
          description:
            "Write a program that prints a simple Triangle using stars(*).\nNote:There is a space after every star.",
          sampleInput: "",
          sampleOutput: "* \n* * \n* * * ",
          testCases: [
            {
              input: "",
              output: "* \n* * \n* * * ",
              visible: true,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1A-004",
          title: "Star - 2",
          difficulty: "Medium",
          description:
            "Write a program that reads a word and prints the word in the given format.\nNote:Number of stars before and after the word is equal to the length of the word.\nExplanation:If the given word is `code`.\nThe length of the word `code`is 4.\nAdd 4 stars and a space before the word `code`.\nAdd a space and 4 stars aafter the word `code`.",
          sampleInput: "Code",
          sampleOutput: "**** Code ****",
          testCases: [
            { input: "dog", output: "*** dog ***", visible: true },
            { input: "number", output: "****** number ******", visible: true },
            { input: "cat", output: "*** cat ***", visible: false },
            { input: "animal", output: "****** animal ******", visible: false },
            { input: "xerox", output: "***** xerox *****", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1A-005",
          title: "Second word in first word",
          difficulty: "Medium",
          description:
            "Write a program that reads two words w1 and w2. w2 is the at the beginning of w1.\nInput:The first line of input contains a string representing w1.The second line of input contains a string representing w2.\nOutput:The output should be a single line containing an integer that is the index at which the word `W2` ends in the word `w1`.",
          sampleInput: "midterm\nmid",
          sampleOutput: "2",
          testCases: [
            { input: "unkind\nun", output: "1", visible: true },
            { input: "number\nnum", output: "2", visible: true },
            { input: "catdog\ncat", output: "2", visible: false },
            { input: "number\nnum", output: "2", visible: false },
            { input: "number\nnum", output: "2", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1A-006",
          title: "Print in reverse order - 2",
          difficulty: "Easy",
          description:
            "Write a program that reads two words `A` and `B`,and prints the given words in reverse order separated by `###`.",
          sampleInput: "cat\nrat",
          sampleOutput: "rat\n###\ncat",
          testCases: [
            { input: "man\ngirl", output: "girl\n###\nman", visible: true },
            { input: "dog\nsnake", output: "snake\n###\ndog", visible: true },
            { input: "bus\ncar", output: "car\n###\nbus", visible: false },
            { input: "num\nbun", output: "bun\n###\nnum", visible: false },
            { input: "buss\ncars", output: "cars\n###\nbuss", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1A-007",
          title: "Print in reverse order - 2",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints the first and last characters of the w",
          sampleInput: "cat\nrat",
          sampleOutput: "rat\n###\ncat",
          testCases: [
            { input: "man\ngirl", output: "girl\n###\nman", visible: true },
            { input: "dog\nsnake", output: "snake\n###\ndog", visible: true },
            { input: "bus\ncar", output: "car\n###\nbus", visible: false },
            { input: "num\nbun", output: "bun\n###\nnum", visible: false },
            { input: "buss\ncars", output: "cars\n###\nbuss", visible: false },
          ],
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
