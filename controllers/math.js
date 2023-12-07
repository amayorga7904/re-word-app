const OpenAI = require('openai')
const MathOpenAIModel = require('../models/mathAI')
const User = require('../models/user')


module.exports = {
    explainMath, 
    mathHistory,
    updateMathTitle
}

const mathOpenai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const explainMath = async(req, res) => {
    const { math } = req.body
    try {
        const mathCompletion = await mathOpenai.chat.completions.create({
            messages: [{
                role: 'system',
                content: 'You will be provided with a mathematical equation, and your task is to explain it in a detailed way, and give steps on how to solve it.'
            }, {
                role: 'user',
                content: math,
            }],
            model: 'gpt-3.5-turbo',
        })
        if (mathCompletion && mathCompletion.choices && mathCompletion.choices.length > 0) {
            const outputContent = mathCompletion.choices[0].message.content
            const openAIRecord = new MathOpenAIModel({ user: req.user._id, math, output: outputContent })
            await openAIRecord.save()
            res.json(mathCompletion.choices[0])
        } 
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


const mathHistory = async(req, res) => {
    try {
        const mathUserId = req.user._id
        const maths = await MathOpenAIModel.find({ user: mathUserId }).sort({ timestamp: -1 })
        console.log('evan is the awesomest', maths)
        res.status(200).json(maths)
    } catch (error) {
        console.error('Error getting maths:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


const updateMathTitle = async(req, res) => {
    try {
        const userId = req.params.userId
        const mathId = req.params.mathId
        const newMathTitle = req.body.mathTitle 
        const user = await User.findById(userId)
        if (!user) {
          return res.status(404).json({ error: 'User not found' })
        }
        const math = await MathOpenAIModel.findById(mathId)
        if (!math) {
          return res.status(404).json({ error: 'Code not found' })
        }
        math.title = newMathTitle
        await math.save()
        res.status(200).json({ message: 'Title updated successfully' })
    } catch (error) {
        console.error('Error updating math title:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

