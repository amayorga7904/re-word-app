const OpenAI = require("openai")
const OpenAIModel = require('../models/openAI')
const User = require('../models/user')


//creates OpenAI client to make make requests to OpenAI GPT-3 service
//API key provided for authenticating and authorizing requests to OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const main = async(req, res) => {
    //destructures prompt to extract data sent in the body of the POST request
    //similar to *req.body.prompt*
    const { prompt } = req.body
    try {
        //sends a request to the OpenAI API to generate completions based on a chat conversation
        const completion = await openai.chat.completions.create({
            messages: [{
                //sets the role of the OpenAI
                role: "system",
                content: "The objective is to provide a more formal and sophisticated tone to the given text.",
            }, {
                //inputs the user message that is extracted from 
                //req.body.prompt
                role: "user",
                content: prompt,
            }],
            model: "gpt-3.5-turbo",
        })
        console.log('Completion:', completion);
        //sends first JSON response to client from OpenAI
        if (completion && completion.choices && completion.choices.length > 0) {
            const responseContent = completion.choices[0].message.content;

            // Save to MongoDB
            const openAIRecord = new OpenAIModel({ user: req.user._id, prompt, response: responseContent });
            await openAIRecord.save();
            // sends first JSON response to the client from OpenAI
            res.json(completion.choices[0]);
        } else {
            console.error('Error: Unexpected response structure');
            res.status(500).json({ error: 'Internal Server Error' });
        }
        //error handling
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const history = async(req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in req.user._id
        console.log('User ID:', userId);
        const prompts = await OpenAIModel.find({ user: userId }).sort({ timestamp: -1 });
        console.log('Prompts:', prompts);
        res.status(200).json(prompts);
    } catch (error) {
        console.error('Error getting prompts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updatePromptTitle = async(req, res) => {
    try {
        const userId = req.params.userId
        const promptId = req.params.promptId
        const newPromptTitle = req.body.promptTitle
        console.log('check this out', promptId)

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
        const prompt = await OpenAIModel.findById(promptId)

        prompt.title = newPromptTitle

        await prompt.save()
        res.status(200).json({ message: 'Title updated successfully' });
    } catch (error) {
        console.error('Error updating code title:', error)
    }
}

module.exports = {
    main, 
    history,
    updatePromptTitle
}




