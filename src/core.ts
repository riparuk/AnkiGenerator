import { question_answer_list, information_list, outline_list } from "./object";
import { z } from 'zod';
import {generate_from_list, generate_from_string} from "./template";
import { textSplitter } from "./config";

// interfaces
export type QuestionAnswerList = z.infer<typeof question_answer_list>;
export type InformationList = z.infer<typeof information_list>;
export type OutlineList = z.infer<typeof outline_list>;


export async function generate_question_answer(informations: string[]): Promise<QuestionAnswerList> {
  console.log("Generate QA from list of information");
  const result = await generate_from_list<QuestionAnswerList>(
	informations,
	"Create simple short question & answer from this extracted information for flashcards\n\n Information : {context}",
	question_answer_list, // schema zod yang sudah ada
	{ question_answer_list: [] }  // initial value kosong
  );

  console.log("Total QA generated: ", result.question_answer_list.length);
  return result;
}

export async function generate_information(chunks: string[]): Promise<InformationList> {
  console.log("Generate information from list of chunks");
  const result = await generate_from_list<InformationList>(
	chunks,
	"Extract information such as main topic, terminology, key facts, causal relationship if exist from this chunk of document\n\n chunk : {context}",
	information_list,
	{ information_list: [] }
  );

  console.log("Total information generated: ", result.information_list.length);
  return result;
}

export async function split_text(text: string): Promise<string[]> {
  const texts = await textSplitter.splitText(text);
  console.log("Total text splitted: ", texts.length);

  return texts;
}

export async function generate_outline(prompt: string): Promise<OutlineList> {
  const result = await generate_from_string<OutlineList>(
	prompt,
	"Create max 4 outline from this prompt\n\n Prompt : {context}",
	outline_list
  );

  return result;

}
