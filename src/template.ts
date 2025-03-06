
import { z } from 'zod';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { llm } from "./config";


export async function generate_from_list<T extends Record<string, any>>(
  list: string[],
  system_prompt: string,
  outputSchema: z.ZodType<T>,
  initialValue: T
): Promise<T> {

  const promptTemplate = ChatPromptTemplate.fromMessages([
	["system", system_prompt],
  ]);

  let combinedResult = initialValue;

  for (const [index, context] of list.entries()) {
	const promptValue = await promptTemplate.invoke({
	  context: context,
	});

	const runLLM = llm.withStructuredOutput(outputSchema);

	const response = await runLLM.invoke(promptValue);

	const parsedResponse = outputSchema.parse(response);
	console.log(`Generated from list[${index}]`);

    if (Array.isArray(combinedResult) && Array.isArray(parsedResponse)) {
      combinedResult.push(...parsedResponse);
    } else if (typeof combinedResult === "object" && typeof parsedResponse === "object") {
      for (const key of Object.keys(parsedResponse)) {
        if (Array.isArray((combinedResult as any)[key])) {
          (combinedResult as any)[key].push(...(parsedResponse as any)[key]);
        } else {
          (combinedResult as any)[key] = (parsedResponse as any)[key];
        }
      }
    } else {
      throw new Error("Unsupported type for combinedResult");
    }
  }

  return combinedResult;
}
