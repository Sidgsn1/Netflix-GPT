import { GoogleGenAI } from "@google/genai";

const geminiAi = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default geminiAi;