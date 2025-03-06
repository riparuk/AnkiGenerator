import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


export function getOpenAIKey(providedKey?: string): string {
    return providedKey || process.env.OPENAI_API_KEY || '';
}

export const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 400,
  chunkOverlap: 0,
});
