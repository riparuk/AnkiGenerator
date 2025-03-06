import dotenv from 'dotenv';
import { question_answer, question_answer_list } from "./objects"
import { generate_question_answer, generate_information, split_text, QuestionAnswerList } from "./core";

dotenv.config();

export async function generate_from_text(text: string): Promise<QuestionAnswerList> {
  const split = await split_text(text);
  const informationList = await generate_information(split);
  const qaList = await generate_question_answer(informationList.information_list.map((info) => info.information));
  console.log(qaList);
  return qaList;
}
