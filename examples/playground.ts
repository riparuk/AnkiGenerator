import {generate_from_text, generate_by_prompt} from "../src/index";

async function main() {
  //start time of the program
  const start = new Date().getTime();
  console.log("Start time: ", start);


  // await hello("TypeScript"); // Hello, TypeScript!
  // const full_text = "When a computer is performing the actions described by the instructions in a computer program, we say it is running or executing the program. A computer will not begin execution of a program until told to do so. That typically requires the user to launch (or run or execute) the program, although programs may also be launched by other programs. A computer program is a collection of instructions that tell a computer how to perform a specific task. Programs can be written in different programming languages, such as C++, Java, or Python, and are typically stored on a computer's hard drive or in memory. When a computer program is executed, the computer reads and interprets the instructions in the program, carrying out the specified operations. This may involve performing calculations, displaying information on the screen, or interacting with the user.";

  // generate_from_text(full_text);

  const prompt = "Computer Networking";

  await generate_by_prompt(prompt);

  //end time of the program
  const end = new Date().getTime();
  console.log("End time: ", end);
  // in milliseconds
  console.log("Time taken: ", end - start);
}

main();

