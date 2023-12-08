const CodeOpenAIModel = require('../models/codeAI')
const OpenAI = require('openai')



const codeOpenai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const explainCode = async(req, res) => {
    const { code } = req.body
    const codeData = [{
        role: 'system',
        content: 'You will be provided with a piece of code, and your task is to explain it in a concise way.'
    }, {
        role: 'user',
        content: code,
    }]
    try {
        const codeCompletion = await codeOpenai.chat.completions.create({
            messages: codeData,
            model: 'gpt-3.5-turbo',
        })
        if (codeCompletion && codeCompletion.choices && codeCompletion.choices.length > 0) {
            const explanationContent = codeCompletion.choices[0].message.content
            const openAIRecord = new CodeOpenAIModel({ user: req.user._id, code, reply: explanationContent })
            await openAIRecord.save()
            res.json(codeCompletion.choices[0])
        } 
    } catch (error) {
        console.error(error)
    }
}


const codeHistory = async(req, res) => {
    try {
        const codeUserId = req.user._id
        const codes = await CodeOpenAIModel.find({ user: codeUserId }).sort({ timestamp: -1 })
        res.status(200).json(codes)
    } catch (error) {
        console.error(error)
    }
}


const updateTitle = async(req, res) => {
    try {
        const codeId = req.params.codeId
        const newTitle = req.body.title 
        const code = await CodeOpenAIModel.findById(codeId)
        code.title = newTitle
        await code.save()
        res.status(200).json({ message: 'Title updated successfully' })
      } catch (error) {
        console.error(error)
      }
    }


    const deleteCode = async (req, res) => {
        const codeId = req.params.codeId
        try {
            const code = await CodeOpenAIModel.findById(codeId)
            await code.remove()
            res.status(200).json({ message: 'Code deleted successfully' })
        } catch (error) {
            console.error(error)
        }
    }
    

    module.exports = {
        explainCode, 
        codeHistory,
        updateTitle,
        delete: deleteCode
    }