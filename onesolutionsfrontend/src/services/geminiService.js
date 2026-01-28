import { GoogleGenerativeAI } from "@google/generative-ai";
import { Role } from "../types.js";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export class GeminiService {
  static model = null;
  static chat = null;

  static generateSystemInstruction(profile) {
    const context = profile
      ? `
STUDENT CONTEXT:
- Name: ${profile.firstName} ${profile.lastName}
- Batch: ${profile.batchMonth} ${profile.batchYear}
- Current Level: ${profile.currentCodingLevel}
- Skills: ${profile.technicalSkills?.join(", ") || "None listed"}
- Goal: ${profile.jobSearchStatus}
`
      : "";

    return `
You are the "OneSolutions AI Tutor", a senior lead instructor at OneSolutions Institute.

Your mission:
- Teach Full Stack Web Development step-by-step
- Explain concepts using real-world analogies
- Encourage the student when stuck
- Use modern ES6+ code examples

Specialties:
- Frontend: React, Tailwind, JavaScript, TypeScript
- Backend: Node.js, Express, PostgreSQL
- Interview prep & career guidance

${context}

Rules:
- Be clear, structured, and supportive
- If asked about institute admin topics, redirect to OneSolutions Portal
`;
  }

  static async startChat(profile) {
    this.model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: this.generateSystemInstruction(profile),
    });

    this.chat = this.model.startChat({
      generationConfig: {
        temperature: 0.8,
      },
    });
  }

  static async* sendMessageStream(message, profile) {
    if (!this.chat) {
      await this.startChat(profile);
    }

    const result = await this.chat.sendMessageStream(message);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  }

  static async getQuickSummary(content) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Generate a short 2–3 word title for this conversation: ${content}`
    );

    return result.response.text().replace(/"/g, "") || "New Topic";
  }
}
