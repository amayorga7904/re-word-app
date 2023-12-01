const OpenAI = require("openai");
require('dotenv').config();



const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "The objective is to provide a more formal and sophisticated tone to the given text." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();