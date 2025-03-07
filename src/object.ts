import { z } from 'zod';

const information = z.object({
  information: z.string().describe("Information extracted from the chunk"),
});

const question_answer = z.object({
  question: z.string().describe("Question extracted from the chunk"),
  answer: z.string().describe("Answer extracted from the chunk"),
});

const outline = z.object({
  outline: z.string(),
});

// list of question_answer in objects
export const question_answer_list = z.object({
  question_answer_list: z.array(question_answer),
});

// list of information
export const information_list = z.object({
  information_list: z.array(information),
});

export const outline_list = z.object({
	outline_list: z.array(outline),
});
