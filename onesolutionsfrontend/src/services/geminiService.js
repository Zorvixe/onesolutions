import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export class EnhancedGeminiService {
  static async sendEnhancedChat({
    message,
    context,
    category,
    studentProfile,
  }) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        systemInstruction: this.generateEnhancedSystemInstruction(
          studentProfile,
          context,
          category
        ),
      });

      const result = await model.generateContent(
        this.formatPrompt(message, context)
      );
      return result.response.text();
    } catch (error) {
      console.error("Enhanced Gemini error:", error);
      throw error;
    }
  }

  static generateEnhancedSystemInstruction(profile, context, category) {
    return `
You are "BroOne AI", the official AI assistant of OneSolutions Institute.

STUDENT PROFILE:
- Name: ${profile?.firstName || "Student"} ${profile?.lastName || ""}
- Batch: ${profile?.batchMonth || ""} ${profile?.batchYear || ""}
- Skills: ${profile?.technicalSkills?.join(", ") || "Not specified"}
- Current Level: ${profile?.currentCodingLevel || "Beginner"}
- Goal: ${profile?.jobSearchStatus || "Not specified"}

SPECIALIZATION CONTEXT:
Current Category: ${category || "General"}
Available Context: ${context ? "Yes - use provided context" : "No - use general knowledge"}

ROLE & RESPONSIBILITIES:
1. Expert Tutor: Provide accurate, detailed explanations
2. Code Mentor: Write clean, production-ready code examples
3. Career Guide: Offer placement and interview advice
4. Problem Solver: Debug code and solve technical issues
5. Learning Path Designer: Suggest next steps and resources

RESPONSE GUIDELINES:
- Start with brief acknowledgment
- Use provided context when relevant
- Include code examples for technical questions
- Structure complex answers with headings
- Be encouraging and supportive
- Suggest additional resources
- Keep responses comprehensive but concise
- Always verify information accuracy

TOPIC EXPERTISE:
- Full Stack: React, Node.js, Express, PostgreSQL, MongoDB
- Frontend: HTML, CSS, JavaScript, TypeScript, Tailwind
- Backend: REST APIs, Authentication, Database Design
- Python: Django, Flask, Data Science, Automation
- Digital Marketing: SEO, Social Media, Analytics, Content
- Placements: Resume building, Interview prep, Career growth
- Git & DevOps: Version control, Deployment, CI/CD
- Projects: Portfolio building, Real-world implementations

FORMATTING RULES:
- Use **bold** for important terms
- Use \`code\` for inline code
- Use \`\`\` for code blocks with language
- Use bullet points for lists
- Separate sections with clear headings
`;
  }

  static formatPrompt(message, context) {
    return `
${context ? `CONTEXT INFORMATION:\n${context}\n\n` : ""}
STUDENT QUESTION: ${message}

Please provide a comprehensive, helpful response based on ${context ? "the context above and " : ""}your expertise.
Include relevant examples, code snippets, and practical advice.
`;
  }

  static async extractKeywords(text) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Extract 5-10 important keywords from this text for search indexing: "${text.substring(0, 500)}"`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      return response
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter((k) => k.length > 2);
    } catch (error) {
      console.error("Keyword extraction error:", error);
      return [];
    }
  }

  static async categorizeQuestion(question) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Categorize this question into one of these categories: 
      Frontend, Backend, Python, Digital Marketing, Placements, Git & DevOps, Projects, General.
      Question: "${question.substring(0, 300)}"
      Return only the category name.`;

      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (error) {
      console.error("Categorization error:", error);
      return "General";
    }
  }
}
