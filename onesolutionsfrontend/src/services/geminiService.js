import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export class GeminiService {
  static model = null;

  // ✅ ADD THIS METHOD TO CHECK AVAILABLE MODELS
  static async listModels() {
    try {
      console.log("🔍 Listing available models...");
      const models = await genAI.listModels();
      console.log("📋 Available models:", models);
      return models;
    } catch (error) {
      console.error("❌ Error listing models:", error);
      throw error;
    }
  }

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
- Explain concepts using simple real-world analogies
- Encourage students if they feel stuck
- Use clean ES6+ code examples

Specialties:
- Frontend: React, Tailwind, JavaScript, TypeScript
- Backend: Node.js, Express, PostgreSQL
- Interview prep & career growth

${context}

Rules:
- Be structured and supportive
- Avoid unnecessary complexity
- Redirect institute admin questions to OneSolutions Portal
`;
  }

  // ✅ UPDATE THIS TO TRY MULTIPLE MODELS
  static getModel(profile) {
    if (!this.model) {
      // Try different model names in order
      const modelNames = [
        "gemini-1.5-flash", // Try original
        "gemini-1.5-flash-001", // Try with version
        "gemini-1.5-pro", // Try pro version
        "gemini-pro", // Try older pro
        "models/gemini-1.5-flash", // Try with models/ prefix
        "models/gemini-pro", // Try with models/ prefix
      ];

      let successfulModel = null;

      for (const modelName of modelNames) {
        try {
          console.log(`🔄 Trying model: ${modelName}`);
          this.model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: this.generateSystemInstruction(profile),
          });
          successfulModel = modelName;
          break;
        } catch (err) {
          console.log(`❌ Model ${modelName} failed: ${err.message}`);
          continue;
        }
      }

      if (!this.model) {
        throw new Error(
          "No valid Gemini model found. Check API key and model availability."
        );
      }

      console.log(`✅ Using model: ${successfulModel}`);
    }
    return this.model;
  }

  // ✅ ENHANCE WITH BETTER ERROR HANDLING
  static async sendMessage(message, profile) {
    try {
      console.log("🤖 Sending message to Gemini...");
      console.log("📝 Message:", message.substring(0, 100) + "...");

      const model = this.getModel(profile);

      // Test with simple content first
      const testContent = "Hello, how are you?";
      console.log(`🔧 Testing with: "${testContent}"`);

      const result = await model.generateContent(testContent);
      const response = result.response.text();

      console.log(
        "✅ Test successful! Response:",
        response.substring(0, 100) + "..."
      );

      // Now send the actual message
      const actualResult = await model.generateContent(message);
      const actualResponse = actualResult.response.text();

      console.log(
        "✅ Response received:",
        actualResponse.substring(0, 100) + "..."
      );
      return actualResponse;
    } catch (error) {
      console.error("❌ Gemini API Error Details:");
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      console.error("Error status:", error.status);

      // List available models for debugging
      try {
        await this.listModels();
      } catch (listError) {
        console.error("Could not list models:", listError);
      }

      throw new Error(
        `Gemini API Error: ${error.message}. Please check your API key and model availability.`
      );
    }
  }

  static async getQuickSummary(content) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash", // Use the simplest one
      });

      const result = await model.generateContent(
        `Generate a concise 2–3 word title for this conversation: ${content}`
      );

      return (
        result.response.text().replace(/"/g, "").trim() || "New Discussion"
      );
    } catch (error) {
      console.error("❌ Gemini title generation error:", error);
      return content.substring(0, 30) + "...";
    }
  }

  static reset() {
    this.model = null;
  }
}
