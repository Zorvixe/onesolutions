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
            "Write a program that prints three hashes (#) as output.",
          sampleInput: "",
          sampleOutput: "###",
          testCases: [{ input: "", output: "###", visible: true }],
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
              output: "791853",
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
          title: "Substraction",
          difficulty: "Easy",
          description: "Subtract 596 from 193856",
          sampleInput: "",
          sampleOutput: "193260",
          testCases: [{ input: "", output: "193260", visible: true }],
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
        {
          id: "q-python-3-002",
          title: "Division",
          difficulty: "Easy",
          description: "Divide 33968 by 176",
          sampleInput: "",
          sampleOutput: "193.0",
          testCases: [{ input: "", output: "193.0", visible: true }],
          defaultCode: ``,
          score: 5,
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
          title: "First and last Characters",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and prints the first and last characters of the word on two lines",
          sampleInput: "lemon",
          sampleOutput: "l\nn",
          testCases: [
            { input: "manage", output: "m\ne", visible: true },
            { input: "snake", output: "s\ne", visible: true },
            { input: "carrot", output: "c\nt", visible: false },
            { input: "num", output: "n\nm", visible: false },
            { input: "buss", output: "b\ns", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1A-008",
          title: "First letters",
          difficulty: "Easy",
          description:
            "You are given three strings as input.Write a program to print the first character of each string.\nNote:print output in a single line.",
          sampleInput: "lemon\nbag\nball",
          sampleOutput: "lbb",
          testCases: [
            { input: "manage\ndoll\nbig", output: "mdb", visible: true },
            { input: "snake\nrat\neagle", output: "sre", visible: true },
            { input: "csnake\nrat\neagle", output: "cre", visible: false },
            { input: "num\nlove\nhate", output: "nlh", visible: false },
            { input: "apple\ngrapes\nmango", output: "agm", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1A-009",
          title: "Star Repetition - 3",
          difficulty: "Easy",
          description:
            "Write a program that reads a string and prints first and last characters of the given string and prints the stars(*)instead of the remaining characters.",
          sampleInput: "Apple",
          sampleOutput: "A***e",
          testCases: [
            { input: "Manage", output: "M****e", visible: true },
            { input: "banana", output: "b****a", visible: true },
            { input: "Experiment", output: "E********t", visible: false },
            { input: "Bingo", output: "B***o", visible: false },
            { input: "Fox", output: "F*x", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-1D",
      title: "Coding Practice - 1D",
      description: "Type Conversions",
      questions: [
        {
          id: "q-python-1D-001",
          title: "Sum of two numbers",
          difficulty: "Easy",
          description:
            "Write a program to print the sum od two integer inputs A and B.",
          sampleInput: "20\n40",
          sampleOutput: "60",
          testCases: [
            { input: "2\n5", output: "7", visible: true },
            { input: "8\n4", output: "12", visible: true },
            { input: "30\n5", output: "35", visible: false },
            { input: "10\n5", output: "15", visible: false },
            { input: "6\n5", output: "11", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1D-002",
          title: "Division of two numbers",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers A and B and prints the Division of two numbers (A/B).",
          sampleInput: "15\n5",
          sampleOutput: "3.0",
          testCases: [
            { input: "25\n5", output: "5.0", visible: true },
            { input: "8\n4", output: "2.0", visible: true },
            { input: "30\n5", output: "6.0", visible: false },
            { input: "10\n5", output: "2.0", visible: false },
            { input: "45\n5", output: "9.0", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1D-003",
          title: "Area of reactnagle",
          difficulty: "Easy",
          description:
            "Write a program to calculate the area of Rectangle.\nInput:The first line of input contains the length of rectangle,which is an integer.The second line of  input contains the breadth of rectangle,which is an integer.\nOutput:Print the area of rectangle.\nNote:Area of rectangle= Length * breadth",
          sampleInput: "5\n3",
          sampleOutput: "15",
          testCases: [
            { input: "5\n5", output: "25", visible: true },
            { input: "8\n4", output: "32", visible: true },
            { input: "30\n5", output: "150", visible: false },
            { input: "10\n5", output: "50", visible: false },
            { input: "4\n5", output: "20", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1D-004",
          title: "Perimeter of reactnagle",
          difficulty: "Easy",
          description:
            "Write a program to calculate the perimeter of Rectangle.\nInput:The first line of input contains the length of the rectangle,which is an integer.The second line of input contains the breadth of the rectangle,which is an integer.\nOutput:Print the perimeter of rectangle.\nNote:Perimeter of rectangle=2(length+Breadth).",
          sampleInput: "3\n5",
          sampleOutput: "16",
          testCases: [
            { input: "5\n5", output: "20", visible: true },
            { input: "8\n4", output: "24", visible: true },
            { input: "3\n5", output: "16", visible: false },
            { input: "10\n5", output: "30", visible: false },
            { input: "4\n5", output: "18", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1D-005",
          title: "Division of two numbers - 2",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers A and B and prints the division of two numbers(A/B)as an integer.\nInput:First line of input contains an integer.Second line of input contains an integer.\nOutput:The output should be a single line containing an integer that is integer value of the result obtained from the division of two numbers.",
          sampleInput: "10\n4",
          sampleOutput: "2",
          testCases: [
            { input: "10\n5", output: "2", visible: true },
            { input: "15\n4", output: "3", visible: true },
            { input: "10\n5", output: "2", visible: false },
            { input: "25\n5", output: "5", visible: false },
            { input: "50\n5", output: "10", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1D-006",
          title: "Substraction of two numbers",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers A and B and prints the Substraction of two numbers(A-B).\nInput:First line of input contains an float.Second line of input contains an float.\nOutput:The output should be a single line containing an float obtained by the Substraction of two numbers.",
          sampleInput: "5.5\n2.3",
          sampleOutput: "3.2",
          testCases: [
            { input: "6.5\n3.2", output: "3.3", visible: true },
            { input: "8.4\n5.3", output: "3.1", visible: true },
            { input: "8.4\n5.3", output: "3.1", visible: false },
            { input: "2.5\n1.1", output: "1.4", visible: false },
            { input: "5.6\n5.6", output: "0.0", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1D-007",
          title: "Percentage of boys",
          difficulty: "Easy",
          description:
            "Write a program that reads the Percentage of girls in a class and prints the Percentage of boys in the class.\nInput:The Input will be a single line containing an integer.\nOutput:The output should be a single line containing an integer that is the percentage of boys in the class.\nNote:Total percentage of boys and girls in a class is 100.",
          sampleInput: "30",
          sampleOutput: "70",
          testCases: [
            { input: "40", output: "60", visible: true },
            { input: "20", output: "80", visible: true },
            { input: "50", output: "50", visible: false },
            { input: "30", output: "70", visible: false },
            { input: "25", output: "75", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1D-008",
          title: "Sum of two numbers - 2",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers and prints the sum of two numbers in the given format.\nInput:The first line of input contains a float,The second line of input contains a float.\nOutput:The output should be a single line containing a string in the format shown in the sample output.",
          sampleInput: "30.0\n40.0",
          sampleOutput: "sum: 70.0",
          testCases: [
            { input: "40.3\n20.0", output: "sum: 60.3", visible: true },
            { input: "20.0\n10.0", output: "sum: 30.0", visible: true },
            { input: "50.4\n10.3", output: "sum: 60.7", visible: false },
            { input: "20.0\n10.0", output: "sum: 30.0", visible: false },
            { input: "50.4\n10.3", output: "sum: 60.7", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1D-009",
          title: "Kilometers to meter",
          difficulty: "Medium",
          description:
            "Write a program to take the number of Kilometers as an input and convert into meters and prints the number of meter.\nInput:The first line of input contains the number of Kilometers.The input will have decimal part.\nOutput:The first lie of output contains the number of meters.The output should be an integer.",
          sampleInput: "1.2",
          sampleOutput: "1200",
          testCases: [
            { input: "4.3", output: "4300", visible: true },
            { input: "2.5", output: "2500", visible: true },
            { input: "50.2", output: "50200", visible: false },
            { input: "2.1", output: "2100", visible: false },
            { input: "1.1", output: "1100", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1D-0010",
          title: "Percentage",
          difficulty: "Medium",
          description:
            "Write a program that reads a percentage `P` and prints the percentage `p` of the number 200.\nInput:The input will be a single line containing an integer.\nOutput:The output should be a single line containing a float that is the P percentage of 200.\nNote:Percentage(p)=(n/100)*number",
          sampleInput: "50",
          sampleOutput: "100.0",
          testCases: [
            { input: "40", output: "80.0", visible: true },
            { input: "30", output: "60.0", visible: true },
            { input: "40", output: "80.0", visible: false },
            { input: "30", output: "60.0", visible: false },
            { input: "50", output: "100.0", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-1E",
      title: "Coding Practice - 1E",
      description: "Type Conversions",
      questions: [
        {
          id: "q-python-1E-001",
          title: "Sum of the digits",
          difficulty: "Easy",
          description:
            "Write a program that prints the sum of the digits of given three-digit number.\nInput:The input will be a single line containing a three-digit number.\nOutput:The output should be a single line containing the sum of the three digits of the given number.",
          sampleInput: "564",
          sampleOutput: "15",
          testCases: [
            { input: "234", output: "9", visible: true },
            { input: "713", output: "11", visible: true },
            { input: "234", output: "9", visible: false },
            { input: "564", output: "15", visible: false },
            { input: "412", output: "7", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1E-002",
          title: "Indexing",
          difficulty: "Easy",
          description:
            "Given a word `W` and an integer N,Write a program to print the character present at the index N in the word `W`.",
          sampleInput: "dog\n1",
          sampleOutput: "o",
          testCases: [
            { input: "animal\n3", output: "m", visible: true },
            { input: "fox\n0", output: "f", visible: true },
            { input: "dear\n2", output: "a", visible: false },
            { input: "horse\n1", output: "o", visible: false },
            { input: "cat\n2", output: "t", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1E-003",
          title: "String Repetition - 2",
          difficulty: "Easy",
          description:
            "Given a word and number N,write a program to print the given word,N number of times in a single line.",
          sampleInput: "maths\n2",
          sampleOutput: "mathsmaths",
          testCases: [
            { input: "animal\n3", output: "animalanimalanimal", visible: true },
            { input: "fox\n2", output: "foxfox", visible: true },
            { input: "dear\n2", output: "deardear", visible: false },
            { input: "horse\n1", output: "horse", visible: false },
            { input: "cat\n2", output: "catcat", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1E-004",
          title: "First three characters",
          difficulty: "Easy",
          description:
            "Write a program to read a single line of input and print first three characters in it.",
          sampleInput: "maths",
          sampleOutput: "mat",
          testCases: [
            { input: "bhumika", output: "bhu", visible: true },
            { input: "ganesh", output: "gan", visible: true },
            { input: "bhumika", output: "bhu", visible: false },
            { input: "horse", output: "hor", visible: false },
            { input: "billing", output: "bil", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1E-005",
          title: "part of a string",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and an index and prints a part of the word from the given index to the end of the word.",
          sampleInput: "goodnight\n4",
          sampleOutput: "night",
          testCases: [
            { input: "helloo\n2", output: "lloo", visible: true },
            { input: "unhappy\n2", output: "happy", visible: true },
            { input: "bhumika\n4", output: "ika", visible: false },
            { input: "horse\n1", output: "orse", visible: false },
            { input: "billing\n2", output: "lling", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1E-006",
          title: "part of a string - 2",
          difficulty: "medium",
          description:
            "Write a program that reads a word and two indices(x,y) and prints a part of the word from the index X to the index Y.",
          sampleInput: "goodnight\n4\n8",
          sampleOutput: "night",
          testCases: [
            { input: "helloo\n2\n4", output: "llo", visible: true },
            { input: "unhappy\n2\n6", output: "happy", visible: true },
            { input: "bhumika\n4\n6", output: "ika", visible: false },
            { input: "horse\n1\n4", output: "orse", visible: false },
            { input: "billing\n2\n6", output: "lling", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1E-007",
          title: "First N characters",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and number N and prints the first N characters of the word.\nInput:The first line of input contains a string.second line of input contains an integer.\nOutput:The output should be a single line containing a string that is the part of the word",
          sampleInput: "superman\n5",
          sampleOutput: "super",
          testCases: [
            { input: "manage\n3", output: "man", visible: true },
            { input: "unhappy\n2", output: "un", visible: true },
            { input: "bhumika\n5", output: "bhumi", visible: false },
            { input: "horse\n3", output: "hor", visible: false },
            { input: "billing\n4", output: "bill", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1E-008",
          title: "Last N characters",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and number N and prints the Last N characters of the word.\nInput:The first line of input contains a string.second line of input contains an integer.\nOutput:The output should be a single line containing a string that is the part of the word",
          sampleInput: "barber\n3",
          sampleOutput: "ber",
          testCases: [
            { input: "manago\n3", output: "ago", visible: true },
            { input: "unhappy\n2", output: "py", visible: true },
            { input: "bhumika\n5", output: "umika", visible: false },
            { input: "horse\n3", output: "rse", visible: false },
            { input: "billing\n4", output: "ling", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1E-009",
          title: "Second part of a string",
          difficulty: "Easy",
          description:
            "Write a program that reads a string and prints the second part of the string that has digits.\nNote:Given string contains two part-The first part contains only two characters.The second part contains only digits.",
          sampleInput: "of21",
          sampleOutput: "21",
          testCases: [
            { input: "ma55", output: "55", visible: true },
            { input: "un33", output: "33", visible: true },
            { input: "bh21", output: "21", visible: false },
            { input: "ho20", output: "20", visible: false },
            { input: "bi17", output: "17", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1E-0010",
          title: "First part of a string",
          difficulty: "Easy",
          description:
            "Write a program that reads a string and prints the First part of the string that has numbers.\nNote:Given string contains two part-The first part contains only digits .The second part contains only one character.",
          sampleInput: "15y",
          sampleOutput: "15",
          testCases: [
            { input: "21B", output: "21", visible: true },
            { input: "20G", output: "20", visible: true },
            { input: "12D", output: "12", visible: false },
            { input: "11M", output: "11", visible: false },
            { input: "32C", output: "32", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-1F",
      title: "Coding Practice - 1F",
      description: "Type Conversions",
      questions: [
        {
          id: "q-python-1F-001",
          title: "Half String",
          difficulty: "Easy",
          description:
            "Write a program that reads a string and prints the first half part of the string.",
          sampleInput: "amazon",
          sampleOutput: "ama",
          testCases: [
            { input: "bottle", output: "bot", visible: true },
            { input: "ganesh", output: "gan", visible: true },
            { input: "bhumik", output: "bhu", visible: false },
            { input: "applee", output: "app", visible: false },
            { input: "mangoo", output: "man", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1F-002",
          title: "String Repetition - 3",
          difficulty: "Easy",
          description:
            "Given a word and a number (N), write a program to print the last three characters of the word N times in a single line.\nInput:The first line of input contains a word.The second line of input contains the integer N which denotes the number of times the last three characters of word has to be repeated.\nOutput:The first line of output contains the last three characters of the given word repeated N times.\nNote:Note: There should not be any spaces between the repetitions.",
          sampleInput: "amazon\n2",
          sampleOutput: "zonzon",
          testCases: [
            { input: "bottle\n3", output: "tletletle", visible: true },
            { input: "ganesh\n2", output: "eshesh", visible: true },
            { input: "bhumika\n2", output: "ikaika", visible: false },
            { input: "applee\n3", output: "leeleelee", visible: false },
            { input: "mangoo\n2", output: "googoo", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1F-003",
          title: "String Repetition - 4",
          difficulty: "Medium",
          description:
            "You are given a string.Repeat the same string N times separate by space.",
          sampleInput: "message\n2",
          sampleOutput: "messaage message",
          testCases: [
            {
              input: "bottle\n3",
              output: "bottle bottle bottle",
              visible: true,
            },
            { input: "ganesh\n2", output: "ganesh ganesh", visible: true },
            { input: "bhumi\n2", output: "bhumi bhumi", visible: false },
            { input: "applee\n1", output: "applee", visible: false },
            { input: "mangoo\n2", output: "mangoo mangoo", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1F-004",
          title: "Star Repetition - 4",
          difficulty: "Medium",
          description:
            "Write a program that reads a word and prints the first two and last two letters of the word and prints the stars(*)instead of the remaining letters.",
          sampleInput: "manage",
          sampleOutput: "ma**ge",
          testCases: [
            {
              input: "bottle",
              output: "bo**le",
              visible: true,
            },
            { input: "ganesh", output: "ga**sh", visible: true },
            { input: "bhumi", output: "bh*mi", visible: false },
            { input: "apple", output: "ap*le", visible: false },
            { input: "mangoo", output: "ma**oo", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1F-005",
          title: "Skip the fourth character",
          difficulty: "Medium",
          description:
            "Write a program that reads a word and prints the word excluding the fourth letter of the word.",
          sampleInput: "manage",
          sampleOutput: "mange",
          testCases: [
            {
              input: "bottle",
              output: "botle",
              visible: true,
            },
            { input: "ganesh", output: "gansh", visible: true },
            { input: "bhumii", output: "bhuii", visible: false },
            { input: "apple", output: "appe", visible: false },
            { input: "mangoo", output: "manoo", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1F-006",
          title: "Simple square - 4",
          difficulty: "Easy",
          description:
            "Write a program that prints a simple square using the (#).",
          sampleInput: "",
          sampleOutput: "###\n###\n###",
          testCases: [
            {
              input: "",
              output: "###\n###\n###",
              visible: true,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1F-007",
          title: "Simple Triangle - 4",
          difficulty: "Easy",
          description:
            "Write a program that prints a simple Triangle using the (+).",
          sampleInput: "",
          sampleOutput: "+\n++\n+++",
          testCases: [
            {
              input: "",
              output: "+\n++\n+++",
              visible: true,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-1F-008",
          title: "Stars - 3",
          difficulty: "Easy",
          description:
            "Write a program that reads a number N and prints three lines with each line containing  N stars (*).\nNote:There is a space after every stars.",
          sampleInput: "2",
          sampleOutput: "* * \n* * \n* * ",
          testCases: [
            { input: "3", output: "* * * \n* * * \n* * * ", visible: true },
            { input: "2", output: "* * \n* * \n* * ", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-Assignment-1B",
      title: "Assignment-1B",
      description: "Type Conversions",
      questions: [
        {
          id: "q-python-Assignment-1B-001",
          title: "Shape",
          difficulty: "Easy",
          description:
            "Write a program that reads a number N and prints three lines with each line containing N pluses(+).\nNote:There is a space after every + symbol.",
          sampleInput: "2",
          sampleOutput: "+ + \n+ + \n+ + ",
          testCases: [
            { input: "3", output: "+ + + \n+ + + \n+ + + ", visible: true },
            { input: "2", output: "+ + \n+ + \n+ + ", visible: true },
            { input: "2", output: "+ + \n+ + \n+ + ", visible: false },
            { input: "2", output: "+ + \n+ + \n+ + ", visible: false },
            { input: "3", output: "+ + + \n+ + + \n+ + + ", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1B-002",
          title: "Percentage - 2",
          difficulty: "Easy",
          description:
            "Write a program that reads a number N. N is divided into two parts X and Y.\nX is 30 percent of N.\n Y is the remaining percentage of N.print Y.\nNote:value=(percentage/100)*number",
          sampleInput: "50",
          sampleOutput: "35.o",
          testCases: [
            { input: "40", output: "28.0", visible: true },
            { input: "60", output: "42.0", visible: true },
            { input: "40", output: "28.0", visible: false },
            { input: "60", output: "42.0", visible: false },
            { input: "30", output: "21.0", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1B-003",
          title: "Basic arithmetic",
          difficulty: "Easy",
          description:
            "Write a program to take two integer inputs (say A and B) and print the result of the following operations\n1.Addition\n2.Substraction\n3.Multiplication.",
          sampleInput: "4\n3",
          sampleOutput: "7\n1\n12",
          testCases: [
            { input: "4\n2", output: "6\n2\n8", visible: true },
            { input: "12\n4", output: "16\n8\n48", visible: true },
            { input: "12\n4", output: "16\n8\n48", visible: false },
            { input: "12\n4", output: "16\n8\n48", visible: false },
            { input: "12\n4", output: "16\n8\n48", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1B-004",
          title: "Area and Perimeter of square",
          difficulty: "Easy",
          description:
            "You are given a side of square as input.Write a program to find the perimeter and area of the square.\nNote:Area of square = side * side \nPerimeter of square=4* side.",
          sampleInput: "3",
          sampleOutput: "area of square is:9\nperimeter of square is:12",
          testCases: [
            {
              input: "4",
              output: "area of square is:16\nperimeter of square is:16",
              visible: true,
            },
            {
              input: "5",
              output: "area of square is:25\nperimeter of square is:20",
              visible: true,
            },
            {
              input: "3",
              output: "area of square is:9\nperimeter of square is:12",
              visible: false,
            },
            {
              input: "3",
              output: "area of square is:9\nperimeter of square is:12",
              visible: false,
            },
            {
              input: "6",
              output: "area of square is:36\nperimeter of square is:24",
              visible: false,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1B-005",
          title: "Part of a string - 3",
          difficulty: "Easy",
          description:
            "Write a program that reads a string A and prints the string A by excluding the first two and last two Characters of the string.",
          sampleInput: "#@gani#@",
          sampleOutput: "gani",
          testCases: [
            {
              input: "**uday**",
              output: "uday",
              visible: true,
            },
            {
              input: "@@pratibha**",
              output: "pratibha",
              visible: true,
            },
            {
              input: "##ekam##",
              output: "ekam",
              visible: false,
            },
            {
              input: "**dude**",
              output: "dude",
              visible: false,
            },
            {
              input: "&&ball&&",
              output: "ball",
              visible: false,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1B-006",
          title: "Replace a letter",
          difficulty: "Medium",
          description:
            "Write a program that reads a word W,an Index I,and a letter C.Print the word W by replacing the letter at the index I with the given letter C.\nInputThe first line of input contains a string.The second line of input contains an intiger.The third line of input contains a string.\nOutput:The output should be a single line containing a string obtained by replacing the letter at the index `I` of the word `W` with the letter `C`",
          sampleInput: "prime\n3\nz",
          sampleOutput: "prize",
          testCases: [
            {
              input: "cell\n2\ni",
              output: "ceil",
              visible: true,
            },
            {
              input: "manage\n3\ne",
              output: "manege",
              visible: true,
            },
            {
              input: "manage\n3\ne",
              output: "manege",
              visible: false,
            },
            {
              input: "manage\n3\ne",
              output: "manege",
              visible: false,
            },
            {
              input: "manage\n3\ne",
              output: "manege",
              visible: false,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-1B-007",
          title: "Half string - 2",
          difficulty: "Easy",
          description:
            "Write a program that reads a string and prints the second half part of the string",
          sampleInput: "football",
          sampleOutput: "ball",
          testCases: [
            {
              input: "heaven",
              output: "ven",
              visible: true,
            },
            {
              input: "call",
              output: "ll",
              visible: true,
            },
            {
              input: "ball",
              output: "ll",
              visible: false,
            },
            {
              input: "shalvi",
              output: "lvi",
              visible: false,
            },
            {
              input: "door",
              output: "or",
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
      id: "Codingpractice-python-2A",
      title: "Coding Practice - 2A",
      description: "Operators and Conditional Statements",
      questions: [
        {
          id: "q-python-2A-001",
          title: "Greater than 70",
          difficulty: "Easy",
          description:
            "Write a program that reads a number and checks if the given number is greater than 70.\nInput:The input will be a single line containing  an integer.\nOutput:The output should be a single line containing a boolean.",
          sampleInput: "86",
          sampleOutput: "True",
          testCases: [
            { input: "40", output: "False", visible: true },
            { input: "87", output: "True", visible: true },
            { input: "60", output: "False", visible: false },
            { input: "30", output: "False", visible: false },
            { input: "90", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2A-002",
          title: "Greatest among two numbers",
          difficulty: "Easy",
          description:
            "Write a program that reads a number and checks if the first number is greater than the second number.",
          sampleInput: "86\n100",
          sampleOutput: "False",
          testCases: [
            { input: "40\n29", output: "True", visible: true },
            { input: "87\n90", output: "False", visible: true },
            { input: "60\n20", output: "True", visible: false },
            { input: "30\n10", output: "True", visible: false },
            { input: "90\n2", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2A-003",
          title: "Negative number",
          difficulty: "Easy",
          description:
            "Write a program that reads a number and checks if the Given number is a Negative number.",
          sampleInput: "-21",
          sampleOutput: "True",
          testCases: [
            { input: "-2", output: "True", visible: true },
            { input: "4", output: "False", visible: true },
            { input: "-12", output: "True", visible: false },
            { input: "-3", output: "True", visible: false },
            { input: "-11", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2A-004",
          title: "equal to",
          difficulty: "Easy",
          description:
            "Write a program that reads two words and checks if the given two words are the same.\nInput:first and second line of input contains a string.\nOutput:The output should be a single line containing a boolean.",
          sampleInput: "jam\njam",
          sampleOutput: "True",
          testCases: [
            { input: "gan\ngan", output: "True", visible: true },
            { input: "ban\ngan", output: "False", visible: true },
            { input: "abc\nabc", output: "True", visible: false },
            { input: "abd\nabd", output: "True", visible: false },
            { input: "ab\nab", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2A-005",
          title: "Sunday",
          difficulty: "Easy",
          description:
            "Write a program that reads a day number and checks if the given day is a sunday.\nNote:If the given number is 7 than is True.(7=Sunday)",
          sampleInput: "7",
          sampleOutput: "True",
          testCases: [
            { input: "6", output: "False", visible: true },
            { input: "7", output: "True", visible: true },
            { input: "7", output: "True", visible: false },
            { input: "7", output: "True", visible: false },
            { input: "7", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2A-006",
          title: "Not Equal to",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers(integer) and checks if the given two numbers are not the same.",
          sampleInput: "7\n3",
          sampleOutput: "True",
          testCases: [
            { input: "6\n6", output: "False", visible: true },
            { input: "7\n3", output: "True", visible: true },
            { input: "7\n4", output: "True", visible: false },
            { input: "7\n5", output: "True", visible: false },
            { input: "7\n2", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2A-007",
          title: "Greater than or equal to",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers A and B and checks if `A` is greater than or equal to `B`.Print the result as shown in the sample output.\nInput:first and second line of input contains a `float`.",
          sampleInput: "4.5\n2.3",
          sampleOutput: "A>=B is True",
          testCases: [
            { input: "6.9\n3.6", output: "A>=B is True", visible: true },
            { input: "7.2\n9.5", output: "A>=B is False", visible: true },
            { input: "7.2\n4.3", output: "A>=B is True", visible: false },
            { input: "7.9\n5.3", output: "A>=B is True", visible: false },
            { input: "7.3\n2.2", output: "A>=B is True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2A-008",
          title: "Less than or equal to",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers A and B and checks if `A` is Less than or equal to `B`.Print the result as shown in the sample output.\nInput:First  line of input contains an integer and second line of input contains a `float`.",
          sampleInput: "3\n4.2",
          sampleOutput: "True",
          testCases: [
            { input: "2\n3.6", output: "True", visible: true },
            { input: "7\n3.3", output: "False", visible: true },
            { input: "7\n3.3", output: "False", visible: false },
            { input: "7\n3.3", output: "False", visible: false },
            { input: "8\n2.2", output: "False", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-2B",
      title: "Coding Practice - 2B",
      description: "Operators and Conditional Statements",
      questions: [
        {
          id: "q-python-2B-001",
          title: "Greater than - 2",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers(integer) A and B and checks if the A is greater than B.Prints the result as shown in the sample output.",
          sampleInput: "8\n7",
          sampleOutput: "A > B is True",
          testCases: [
            { input: "40\n39", output: "A > B is True", visible: true },
            { input: "87\n100", output: "A > B is False", visible: true },
            { input: "60\n29", output: "A > B is True", visible: false },
            { input: "30\n20", output: "A > B is True", visible: false },
            { input: "90\n10", output: "A > B is True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2B-002",
          title: "Check one greater",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers(integer) A and B,and checks if B is greater than A by `one`.",
          sampleInput: "5\n6",
          sampleOutput: "True",
          testCases: [
            { input: "40\n39", output: "False", visible: true },
            { input: "81\n82", output: "True", visible: true },
            { input: "60\n91", output: "False", visible: false },
            { input: "30\n40", output: "False", visible: false },
            { input: "90\n91", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2B-003",
          title: "Compare first and last letters",
          difficulty: "Easy",
          description:
            "Write a program that reads a word and checks if the first letter and last letter of the word are not the same.\nInput:The input will be a single line containing a string.\nOutput:Output should be a single line containing a boolean.True should be printed if the first letter and last letter of the word are not same,otherwise False should be printed.",
          sampleInput: "python",
          sampleOutput: "True",
          testCases: [
            { input: "label", output: "False", visible: true },
            { input: "gagan", output: "True", visible: true },
            { input: "label", output: "False", visible: false },
            { input: "label", output: "False", visible: false },
            { input: "label", output: "False", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2B-004",
          title: "Compare sum of the digits",
          difficulty: "Easy",
          description:
            "Write a program that reads a two digit number N. The N consist of only 2 digits.Check if the sum of the digits of N is greater than 7.",
          sampleInput: "45",
          sampleOutput: "True",
          testCases: [
            { input: "35", output: "True", visible: true },
            { input: "21", output: "False", visible: true },
            { input: "78", output: "True", visible: false },
            { input: "36", output: "True", visible: false },
            { input: "67", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2B-005",
          title: "Validate Password",
          difficulty: "Easy",
          description:
            "Write a program to check if the given string is a valid Password or not.A string is considered as a valid Password if the number of characters present is greater than 7",
          sampleInput: "12345",
          sampleOutput: "False",
          testCases: [
            { input: "ganesh23", output: "True", visible: true },
            { input: "21dhd", output: "False", visible: true },
            { input: "78hjdh", output: "False", visible: false },
            { input: "36hsh", output: "False", visible: false },
            { input: "67jdk", output: "False", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2B-006",
          title: "Check Last Part of a String",
          difficulty: "Easy",
          description:
            "Write a program that reads two words A and B and checks if the second word B is the last part of the first word A.",
          sampleInput: "blackhole\nhole",
          sampleOutput: "True",
          testCases: [
            { input: "holesale\nsale", output: "True", visible: true },
            { input: "volleyball\nval", output: "False", visible: true },
            { input: "carll\ncar", output: "False", visible: false },
            { input: "axell\nax", output: "False", visible: false },
            { input: "abchdh\nav", output: "False", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2B-007",
          title: "Check Part of a String",
          difficulty: "Easy",
          description:
            "Write a program that reads two words `A`,`B`,and an Index `I`.Check if `B` starts at index `I` in `A`",
          sampleInput: "black\nack\n2",
          sampleOutput: "True",
          testCases: [
            { input: "black\nack\n2", output: "True", visible: true },
            { input: "volleyball\nval\n3", output: "False", visible: true },
            { input: "black\nack\n2", output: "True", visible: false },
            { input: "black\nack\n2", output: "True", visible: false },
            { input: "black\nack\n2", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-2B-008",
          title: "Compare first three characters",
          difficulty: "Easy",
          description:
            "Write a program to check if the first three characters in the two given strings are the same.",
          sampleInput: "apple\napps",
          sampleOutput: "True",
          testCases: [
            { input: "rabbit\nrabbis", output: "True", visible: true },
            { input: "catt\ncammel", output: "False", visible: true },
            { input: "book\nblood", output: "False", visible: false },
            { input: "calcium\nbed", output: "False", visible: false },
            { input: "mango\nmanage", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
      ],
    },
    {
      id: "Codingpractice-python-Assignment-2A",
      title: "Assignment-2A",
      description: "Operators and Conditional Statements",
      questions: [
        {
          id: "q-python-Assignment-2A-001",
          title: "Compare digits",
          difficulty: "Easy",
          description:
            "Write a program that reads a two-digit number N and checks,if the number N is greater than 25.if the first digit of N is greater than the second digit of N.",
          sampleInput: "85",
          sampleOutput: "True\nTrue",
          testCases: [
            { input: "68", output: "True\nFalse", visible: true },
            { input: "14", output: "False\nFalse", visible: true },
            { input: "68", output: "True\nFalse", visible: false },
            { input: "68", output: "True\nFalse", visible: false },
            { input: "68", output: "True\nFalse", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-2A-002",
          title: "Compare first digit and last digit",
          difficulty: "Medium",
          description:
            "Write a program that reads two three-digit numbers A and B and checks if the first digit of A is less than the last digit of B.",
          sampleInput: "254\n353",
          sampleOutput: "True",
          testCases: [
            { input: "68\n23", output: "False", visible: true },
            { input: "14\n55", output: "True", visible: true },
            { input: "682\n234", output: "False", visible: false },
            { input: "68\n21", output: "False", visible: false },
            { input: "68\n29", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-2A-003",
          title: "Compare Last three characters",
          difficulty: "Medium",
          description:
            "Write a program to check if the last three characters in the two given strings are the same.",
          sampleInput: "apple\npimple",
          sampleOutput: "True",
          testCases: [
            { input: "sample\ndimple", output: "True", visible: true },
            { input: "cat\nbat", output: "False", visible: true },
            { input: "bangle\nsingle", output: "True", visible: false },
            { input: "bangle\nsingle", output: "True", visible: false },
            { input: "bangle\nsingle", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-2A-004",
          title: "Percentage - 3",
          difficulty: "Easy",
          description:
            "Write a program that reads a percentage P and a number N and checks if the P percentage of 500 is equal to the number N.\nNote:Percentage(p)of 500 can be calculated as\nValue=(percentage/100)*500.\nInput:first line of input contains an integer representing P.The second line of input contains an integer representing N.\nOutput:The output should be a single line containing a boolean.True should be printed if the `P` percentage of 500 is equal to the number N,otherwise False should be printed.",
          sampleInput: "50\n250",
          sampleOutput: "True",
          testCases: [
            { input: "100\n500", output: "True", visible: true },
            { input: "60\n400", output: "False", visible: true },
            { input: "100\n500", output: "True", visible: false },
            { input: "100\n500", output: "True", visible: false },
            { input: "100\n500", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-2A-005",
          title: "Compare area and perimeter",
          difficulty: "Easy",
          description:
            "Write a program that reads the length and breadth of the reactangle and checks if the area of the reactangle is less than or equal to the perimeter of the rectangle.\nNote:Area of rectangle=length * breadth \nPerimeter of Rectangle=2*(length+ breadth)",
          sampleInput: "3\n4",
          sampleOutput: "True",
          testCases: [
            { input: "4\n4", output: "True", visible: true },
            { input: "6\n4", output: "False", visible: true },
            { input: "4\n4", output: "True", visible: false },
            { input: "4\n4", output: "True", visible: false },
            { input: "4\n4", output: "True", visible: false },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-2A-006",
          title: "Less than or equal to - 2",
          difficulty: "Easy",
          description:
            "Write a program that reads two numbers A and B and checks, If A is less than or equal to B,If B is less than or equal to A.",
          sampleInput: "3\n4",
          sampleOutput: "A<=B is True\nB<=A is False",
          testCases: [
            {
              input: "8\n4",
              output: "A<=B is False\nB<=A is True",
              visible: true,
            },
            {
              input: "6\n4",
              output: "A<=B is False\nB<=A is True",
              visible: true,
            },
            {
              input: "3\n4",
              output: "A<=B is True\nB<=A is False",
              visible: false,
            },
            {
              input: "2\n4",
              output: "A<=B is True\nB<=A is False",
              visible: false,
            },
            {
              input: "1\n4",
              output: "A<=B is True\nB<=A is False",
              visible: false,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-2A-007",
          title: "Profit",
          difficulty: "Easy",
          description:
            "Write a program that reads the selling price S and buying  price B of a product and checks if s is greater than B.\nInput: The first line of input contains an integer representing the selling price S.The second line of input contains  an integer representing the buying price B.\nOutput:output should be a single line containing a boolean ,True should be printed if S is greater than B,otherwise False should be printed",
          sampleInput: "300\n200",
          sampleOutput: "True",
          testCases: [
            {
              input: "800\n500",
              output: "True",
              visible: true,
            },
            {
              input: "600\n900",
              output: "False",
              visible: true,
            },
            {
              input: "800\n500",
              output: "True",
              visible: false,
            },
            {
              input: "800\n500",
              output: "True",
              visible: false,
            },
            {
              input: "800\n500",
              output: "True",
              visible: false,
            },
          ],
          defaultCode: ``,
          score: 10,
          status: "unsolved",
          attempts: [],
        },
        {
          id: "q-python-Assignment-2A-008",
          title: "Check first part of a string",
          difficulty: "Easy",
          description:
            "Write a program that reads two strings S1 and S2,and checks if S2 is the first part of S1\nNote:No of characters in the first part of S1 is equal to the number of characters in S2",
          sampleInput: "rainbow|nrain",
          sampleOutput: "True",
          testCases: [
            {
              input: "heaven\nhea",
              output: "True",
              visible: true,
            },
            {
              input: "snake\nshall",
              output: "False",
              visible: true,
            },
            {
              input: "heaven\nhea",
              output: "True",
              visible: false,
            },
            {
              input: "rainbow|nrain",
              output: "True",
              visible: false,
            },
            {
              input: "rainbow|nrain",
              output: "True",
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
      id: "Codingpractice-python-2C",
      title: "Coding Practice - 2C",
      description: "Operators and Conditional Statements",
      questions: [
        {
          id: "q-python-2C-001",
          title: "Compare digits",
          difficulty: "Easy",
          description:
            "Write a program that reads a two-digit number N and checks,if the number N is greater than 25.if the first digit of N is greater than the second digit of N.",
          sampleInput: "85",
          sampleOutput: "True\nTrue",
          testCases: [
            { input: "68", output: "True\nFalse", visible: true },
            { input: "14", output: "False\nFalse", visible: true },
            { input: "68", output: "True\nFalse", visible: false },
            { input: "68", output: "True\nFalse", visible: false },
            { input: "68", output: "True\nFalse", visible: false },
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
        "In this assignment, let's build a Chat Page by applying the concepts we learned till now.",
      type: "web",
      category: "static",
      questions: [
        {
          id: "91bcc4c6-0533-40bd-814f-a37b81618321",
          title: "Chat2 Page",
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
