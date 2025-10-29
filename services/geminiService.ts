import { GoogleGenAI, Type } from "@google/genai";
import type { GenerationParams, GenerationResult } from '../types';

if (!process.env.API_KEY) {
    // This is a placeholder check. In a real environment, the API key is expected to be set.
    console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const wordCountMapping: { [key: string]: string } = {
    short: 'around 150 words',
    medium: 'between 150 and 400 words',
    long: 'more than 400 words'
};

export async function generateCreativeContent(params: GenerationParams): Promise<GenerationResult> {
    const { type, genre, tone, length, customTitle, customPrompt } = params;

    const startTime = Date.now();

    const prompt = `
        Generate a creative piece based on the following parameters:
        - Type: ${type}
        - Genre: ${genre}
        - Tone: ${tone}
        - Desired Length: ${length} (${wordCountMapping[length]})
        ${customTitle ? `- Provided Title: ${customTitle} (Use this title or be heavily inspired by it)` : ''}
        ${customPrompt ? `- Additional Instructions: ${customPrompt}` : ''}

        Your task is to generate a ${genre} ${type}.
        Your output MUST be a valid JSON object. Do not include any text before or after the JSON object.
        The JSON object must conform to the provided schema, containing a 'title', 'content', and 'summary'.
        The 'content' field should be a single string with appropriate formatting (like '\\n' for new lines).
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: "The title of the generated piece." },
                        content: { type: Type.STRING, description: "The full story, poem, or speech. Use \\n for line breaks." },
                        summary: { type: Type.STRING, description: "A 2-3 line summary of the main theme or idea." },
                    },
                    required: ["title", "content", "summary"],
                },
                temperature: 0.8,
                topP: 0.9,
            },
        });

        const endTime = Date.now();
        const generationTime = parseFloat(((endTime - startTime) / 1000).toFixed(2));
        
        // The response.text should be a valid JSON string due to responseSchema
        const parsedResult = JSON.parse(response.text);

        // Placeholder for token usage, as the client-side SDK doesn't directly expose this yet.
        const tokenUsage = 'N/A';

        return {
            id: `gen-${Date.now()}`,
            title: parsedResult.title,
            content: parsedResult.content,
            summary: parsedResult.summary,
            metadata: {
                params: params, // Embed original params
                type: type,
                genre: genre,
                tone: tone,
                wordCount: length,
                tokenUsage: tokenUsage,
                generationTime: generationTime,
            },
        };
    } catch (error) {
        console.error("Gemini API Error:", error);
        if (error instanceof Error && error.message.includes("quota")) {
            throw new Error("API quota exceeded. Please try again later.");
        }
        throw new Error("Failed to generate content. Please check your inputs and try again.");
    }
}