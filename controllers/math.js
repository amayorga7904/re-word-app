const OpenAI = require("openai")
const MathOpenAIModel = require('../models/mathAI')
const User = require('../models/user')

//creates OpenAI client to make make requests to OpenAI GPT-3 service
//API key provided for authenticating and authorizing requests to OpenAI API
const mathOpenai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const explainMath = async(req, res) => {
    //destructures prompt to extract data sent in the body of the POST request
    //similar to *req.body.prompt*
    const { math } = req.body
    try {
        //sends a request to the OpenAI API to generate completions based on a chat conversation
        const mathCompletion = await mathOpenai.chat.completions.create({
            messages: [{
                role: "system",
                content: "You will be provided with a mathematical equation, and your task is to explain it in a detailed way, and give steps on how to solve it."
            }, {
                //inputs the user message that is extracted from 
                //req.body.math
                role: "user",
                content: math,
            }],
            model: "gpt-3.5-turbo",
        })
        console.log('Math Completion:', mathCompletion);
        //sends first JSON response to client from OpenAI
        if (mathCompletion && mathCompletion.choices && mathCompletion.choices.length > 0) {
            const outputContent = mathCompletion.choices[0].message.content;

            // Save to MongoDB
            const openAIRecord = new MathOpenAIModel({ user: req.user._id, math, output: outputContent });
            await openAIRecord.save();
            // sends first JSON response to the client from OpenAI
            res.json(mathCompletion.choices[0]);
        } 
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const mathHistory = async(req, res) => {
    try {
        const mathUserId = req.user._id;
        const maths = await MathOpenAIModel.find({ user: mathUserId }).sort({ timestamp: -1 });
        console.log('evan is the awesomest', maths)
        res.status(200).json(maths);
    } catch (error) {
        console.error('Error getting maths:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateMathTitle = async(req, res) => {
    try {
        const userId = req.params.userId;
        const mathId = req.params.mathId;
        const newMathTitle = req.body.mathTitle; // Make sure the request body contains the 'title' field
    
        // Check if the user and math exist, and update the title
        // Your actual implementation may vary based on your database structure and ORM
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const math = await MathOpenAIModel.findById(mathId);
        if (!math) {
          return res.status(404).json({ error: 'Code not found' });
        }
        // Update the math title
        math.title = newMathTitle;
        await math.save();
    
        // Respond with success
        res.status(200).json({ message: 'Title updated successfully' });
      } catch (error) {
        console.error('Error updating math title:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

module.exports = {
    explainMath, 
    mathHistory,
    updateMathTitle
}