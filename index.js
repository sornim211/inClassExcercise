const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require('readline-sync');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const promptUser = async () => {
  const userInput = readlineSync.question('You: ');

  if (userInput.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: userInput,
      max_tokens: 150,
    });

    console.log(`AI: ${completion.data.choices[0].text.trim()}`);
  } catch (error) {
    console.error("Error:", error);
  }

  promptUser();
};

promptUser();
