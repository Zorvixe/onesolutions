import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import MCQLogic from "../../SubtopicsPage/MCQLogic";

const questionsData = [
  // ==================== 10 CONCEPTUAL QUESTIONS ====================

  {
    question: "What does 'software softness' really mean?",
    options: [
      "The software runs very quietly",
      "How easily we can change and update the software",
      "The code uses soft colors in the editor",
      "The software uses less memory",
    ],
    answer: "How easily we can change and update the software",
  },

  {
    question:
      "Why is code maintainability so important in real-world software?",
    options: [
      "Because we write code once and never touch it again",
      "Because software keeps evolving — new features are added and bugs are fixed over time",
      "Because only beginners need to read code",
      "To make the program run faster",
    ],
    answer:
      "Because software keeps evolving — new features are added and bugs are fixed over time",
  },

  {
    question: "What is the main goal of Object-Oriented Programming (OOP)?",
    options: [
      "To make code run faster",
      "To model software after real-world objects and their interactions",
      "To avoid using functions",
      "To write everything in one single file",
    ],
    answer: "To model software after real-world objects and their interactions",
  },

  {
    question: "Which of the following best describes 'good software'?",
    options: [
      "Hard to understand but runs fast",
      "Easy to understand, modify, and extend",
      "Uses very few lines of code",
      "Never needs updates",
    ],
    answer: "Easy to understand, modify, and extend",
  },

  {
    question: "In OOP, why do we model things like real-life objects?",
    options: [
      "Because computers are physical objects",
      "It helps organize code in a natural, logical, and maintainable way",
      "To make the program slower",
      "Because we must use images in code",
    ],
    answer:
      "It helps organize code in a natural, logical, and maintainable way",
  },

  {
    question: "What is a 'bad' way to describe an object in programming?",
    options: [
      "Grouping what it has and what it can do",
      "Listing all properties and actions randomly without structure",
      "Giving the object a clear name",
      "Separating data and behavior",
    ],
    answer: "Listing all properties and actions randomly without structure",
  },

  {
    question: "What makes a description of an object 'organized' and 'good'?",
    options: [
      "Mixing everything together randomly",
      "Clearly grouping: what the object HAS (attributes) and what it CAN DO (behaviors)",
      "Writing everything in one long line",
      "Using only numbers",
    ],
    answer:
      "Clearly grouping: what the object HAS (attributes) and what it CAN DO (behaviors)",
  },

  {
    question:
      "Why is readability considered crucial in professional software development?",
    options: [
      "Only teachers care about readable code",
      "Because many developers work on the same code over years",
      "Readable code runs slower",
      "Only for coding interviews",
    ],
    answer: "Because many developers work on the same code over years",
  },

  {
    question: "Which of the following is NOT a benefit of using OOP properly?",
    options: [
      "Well-organized code",
      "Easier to add new features",
      "Easier to fix bugs",
      "Guaranteed no bugs ever",
    ],
    answer: "Guaranteed no bugs ever",
  },

  {
    question:
      "In real software projects, how long do developers usually work on the same codebase?",
    options: [
      "Just once, then never again",
      "For months or even years, adding features and fixing issues",
      "Only during exams",
      "Only 5 minutes",
    ],
    answer: "For months or even years, adding features and fixing issues",
  },

  // ==================== 5 CODE / ANALOGY QUESTIONS ====================

  {
    question: "Think of a Car as a real-life object. What does it HAVE?",
    options: [
      "Color, speed, model, fuel level",
      "Only the ability to move",
      "A programmer",
      "Only a name",
    ],
    answer: "Color, speed, model, fuel level",
  },

  {
    question: "Think of a Car. What can it DO?",
    options: [
      "Start engine, accelerate, brake, turn",
      "Only store fuel",
      "Only have a color",
      "Only exist",
    ],
    answer: "Start engine, accelerate, brake, turn",
  },

  {
    question: "A good OOP design is like:",
    options: [
      "A messy room with things scattered everywhere",
      "A well-organized toolbox where everything has its place",
      "A single giant function",
      "A list of random numbers",
    ],
    answer: "A well-organized toolbox where everything has its place",
  },

  {
    question: "In OOP, an object should ideally represent:",
    options: [
      "A random collection of variables",
      "A real-world entity with clear properties and behaviors",
      "Only data, no actions",
      "Only actions, no data",
    ],
    answer: "A real-world entity with clear properties and behaviors",
  },

  {
    question: "The main reason to use OOP in large projects is:",
    options: [
      "To make code look complicated",
      "To make code easy to understand, maintain, and extend over time",
      "To use more memory",
      "To impress others",
    ],
    answer: "To make code easy to understand, maintain, and extend over time",
  },
];

const Introductionto_OOP1_MCQ = ({
  subtopicId,
  goalName,
  courseName,
  onComplete,
}) => {
  const { markSubtopicComplete, loadProgressSummary, completedContent } =
    useAuth();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomQuestions = [...questionsData].sort(() => Math.random() - 0.5);

  // Check if subtopic is already completed
  useEffect(() => {
    if (subtopicId && completedContent.includes(subtopicId)) {
      setIsCompleted(true);
    }
  }, [completedContent, subtopicId]);

  const handleCompletion = async () => {
    if (isLoading || isCompleted) return;

    try {
      setIsLoading(true);

      // Validate that we have the required parameters
      if (!subtopicId) {
        console.error("❌ Subtopic ID is required");
        alert("Error: Subtopic ID is missing");
        return;
      }

      console.log("🎯 Marking subtopic complete:", {
        subtopicId,
        goalName,
        courseName,
      });

      const result = await markSubtopicComplete(
        subtopicId,
        goalName || "Goal 1",
        courseName || "Static Website: HTML CSS & Bootstrap"
      );

      if (result.success) {
        await loadProgressSummary();
        setIsCompleted(true);
        console.log("✅ MCQ successfully marked as completed");

        // Call the parent completion handler if provided
        if (onComplete) {
          onComplete();
        }
      } else {
        console.error("❌ Failed to mark MCQ complete:", result.message);
        alert(`Failed to mark as complete: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Failed to mark MCQ complete:", error);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MCQLogic
      title="Introduction to OOPs | MCQs"
      questions={randomQuestions}
      isCompleted={isCompleted}
      isLoading={isLoading}
      onComplete={handleCompletion}
      subtopicId={subtopicId}
      goalName={goalName}
      courseName={courseName}
    />
  );
};

export default Introductionto_OOP1_MCQ;
