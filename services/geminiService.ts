import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface KindnessTask {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
}

export const generateKindnessTask = async (): Promise<KindnessTask> => {
  try {
    if (!ai) {
      throw new Error("API key not configured");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a unique, serious, and impactful act of kindness for a stranger or friend. It should be actionable today.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
            estimatedTime: { type: Type.STRING }
          },
          required: ["title", "description", "difficulty", "estimatedTime"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as KindnessTask;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback task if API fails (e.g. missing key)
    return {
      title: "The Unseen Compliment",
      description: "Identify someone doing thankless work (janitor, bus driver) and give them a genuine, specific compliment about their efficiency.",
      difficulty: "Easy",
      estimatedTime: "2 mins"
    };
  }
};