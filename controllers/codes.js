const OpenAI = require("openai")
const CodeOpenAIModel = require('../models/codeAI')
const User = require('../models/user')

//creates OpenAI client to make make requests to OpenAI GPT-3 service
//API key provided for authenticating and authorizing requests to OpenAI API
const codeOpenai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const explainCode = async(req, res) => {
    //destructures prompt to extract data sent in the body of the POST request
    //similar to *req.body.prompt*
    const { code } = req.body
    try {
        //sends a request to the OpenAI API to generate completions based on a chat conversation
        const codeCompletion = await codeOpenai.chat.completions.create({
            messages: [{
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
        } 
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const codeHistory = async(req, res) => {
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

const updateTitle = async(req, res) => {
    try {
        const userId = req.params.userId;
        const codeId = req.params.codeId;
        const newTitle = req.body.title; // Make sure the request body contains the 'title' field
    
        // Check if the user and code exist, and update the title
        // Your actual implementation may vary based on your database structure and ORM
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const code = await CodeOpenAIModel.findById(codeId);
        if (!code) {
          return res.status(404).json({ error: 'Code not found' });
        }
        // Update the code title
        code.title = newTitle;
        await code.save();
    
        // Respond with success
        res.status(200).json({ message: 'Title updated successfully' });
      } catch (error) {
        console.error('Error updating code title:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

module.exports = {
    explainCode, 
    codeHistory,
    updateTitle
}