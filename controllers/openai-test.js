const OpenAI = require('openai')
const OpenAIModel = require('../models/openAI')
const User = require('../models/user')



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const main = async(req, res) => {
    const { prompt } = req.body
    try {
        const completion = await openai.chat.completions.create({
            messages: [{
                role: 'system',
                content: 'The objective is to provide a more formal and sophisticated tone to the given text.',
            }, {
                role: 'user',
                content: prompt,
            }],
            model: 'gpt-3.5-turbo',
        })
        if (completion && completion.choices && completion.choices.length > 0) {
            const responseContent = completion.choices[0].message.content
            const openAIRecord = new OpenAIModel({ user: req.user._id, prompt, response: responseContent })
            await openAIRecord.save()
            res.json(completion.choices[0])
        } else {
            console.error('Error: Unexpected response structure')
            res.status(500).json({ error: 'Internal Server Error' })
        }
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


const history = async(req, res) => {
    try {
        const userId = req.user._id 
        const prompts = await OpenAIModel.find({ user: userId }).sort({ timestamp: -1 })
        res.status(200).json(prompts)
    } catch (error) {
        console.error('Error getting prompts:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


const updatePromptTitle = async(req, res) => {
    try {
        const userId = req.params.userId
        const promptId = req.params.promptId
        const newPromptTitle = req.body.promptTitle
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
          }
        const prompt = await OpenAIModel.findById(promptId)
        prompt.title = newPromptTitle
        await prompt.save()
        res.status(200).json({ message: 'Title updated successfully' })
    } catch (error) {
        console.error('Error updating code title:', error)
    }
}


module.exports = {
    main, 
    history,
    updatePromptTitle
}



