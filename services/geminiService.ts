
import { GoogleGenAI, Type } from "@google/genai";

import { TestResult, Question } from '../types';

// Fix: Replaced mock implementation with a real Gemini API call.
export const getPerformanceAnalysis = async (results: TestResult[]): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `Analyze these student test results and provide insights: ${JSON.stringify(results)}. Provide a bulleted list of key observations and actionable recommendations.`,
    });
    return response.text;
};

// Fix: Replaced mock implementation with a real Gemini API call.
export const getStudyTips = async (topic: string, score: number): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `A student scored ${score}% on a ${topic} test. Provide 3 concise, actionable study tips. Format them as a numbered list.`,
    });
    return response.text;
};

export const generateQuestionPaper = async (
    topic: string,
    numQuestions: number,
    difficulty: string,
    questionTypes: string[]
): Promise<{ questions: Question[] }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `Generate a question paper with ${numQuestions} questions on the topic "${topic}" with ${difficulty} difficulty. 
    Include the following question types: ${questionTypes.join(', ')}. 
    For multiple choice questions, provide 4 options.
    Provide the correct answer for each question.
    Format the output as a JSON object that matches the provided schema.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    questions: {
                        type: Type.ARRAY,
                        description: "A list of questions for the test paper.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: {
                                    type: Type.STRING,
                                    description: "The question text.",
                                },
                                type: {
                                    type: Type.STRING,
                                    description: "The type of question (e.g., 'Multiple Choice', 'Short Answer').",
                                },
                                options: {
                                    type: Type.ARRAY,
                                    description: "A list of options for multiple choice questions.",
                                    items: { type: Type.STRING },
                                },
                                answer: {
                                    type: Type.STRING,
                                    description: "The correct answer to the question.",
                                }
                            },
                            required: ["question", "type", "answer"]
                        }
                    }
                },
                required: ["questions"]
            },
        },
    });
    
    // The response.text is already a JSON string because of responseMimeType
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as { questions: Question[] };
};
