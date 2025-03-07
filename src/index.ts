import dotenv from 'dotenv';
import { generate_question_answer, generate_information, split_text, QuestionAnswerList, generate_outline, OutlineList } from "./core";

dotenv.config();

export async function generate_from_text(text: string): Promise<QuestionAnswerList> {
  const split = await split_text(text);
  const informationList = await generate_information(split);
  const qaList = await generate_question_answer(informationList.information_list.map((info) => info.information));
  console.log(qaList);
  return qaList;
}

export async function generate_by_prompt(prompt: string): Promise<QuestionAnswerList> {
  const outline = await generate_outline(prompt);
  const informationList = await generate_information(outline.outline_list.map((info) => info.outline));
  const qaList = await generate_question_answer(informationList.information_list.map((info) => info.information));
  console.log(qaList);
  return qaList;
}
