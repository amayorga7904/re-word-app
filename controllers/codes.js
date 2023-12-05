const OpenAI = require("openai")
const CodeOpenAIModel = require('../models/codeAI')


//creates OpenAI client to make make requests to OpenAI GPT-3 service
//API key provided for authenticating and authorizing requests to OpenAI API
const codeOpenai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function explainCode(req, res) {
    //destructures prompt to extract data sent in the body of the POST request
    //similar to *req.body.prompt*
    const { code } = req.body
    try {
        //sends a request to the OpenAI API to generate completions based on a chat conversation
        const codeCompletion = await codeOpenai.chat.completions.create({
            messages: [{
                //sets the role of the OpenAI
                role: "system",
                content: "You will be provided with a piece of code, and your task is to explain it in a concise way."
            }, {
                //inputs the user message that is extracted from 
                //req.body.code
                role: "user",
                content: code,
            }],
            model: "gpt-3.5-turbo",
        })
        console.log('Code Completion:', codeCompletion);
        //sends first JSON response to client from OpenAI
        if (codeCompletion && codeCompletion.choices && codeCompletion.choices.length > 0) {
            const explanationContent = codeCompletion.choices[0].message.content;

            // Save to MongoDB
            const openAIRecord = new CodeOpenAIModel({ user: req.user._id, code, reply: explanationContent });
            await openAIRecord.save();
            // sends first JSON response to the client from OpenAI
            res.json(codeCompletion.choices[0]);
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

async function codeHistory(req, res) {
    try {
        const codeUserId = req.user._id;
        const codes = await CodeOpenAIModel.find({ user: codeUserId }).sort({ timestamp: -1 });
        console.log('evan is the awesomest', codes)
        res.status(200).json(codes);
    } catch (error) {
        console.error('Error getting codes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    explainCode, 
    codeHistory
}