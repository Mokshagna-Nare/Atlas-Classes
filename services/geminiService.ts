
import { GoogleGenAI } from "@google/genai";

import { TestResult } from '../types';

// Fix: Replaced mock implementation with a real Gemini API call.
export const getPerformanceAnalysis = async (results: TestResult[]): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `Analyze these student test results and provide insights: ${JSON.stringify(results)}`,
    });
    return response.text;
};

// Fix: Replaced mock implementation with a real Gemini API call.
export const getStudyTips = async (topic: string, score: number): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `A student scored ${score}% on a ${topic} test. Provide 3 concise, actionable study tips.`,
    });
    return response.text;
};
