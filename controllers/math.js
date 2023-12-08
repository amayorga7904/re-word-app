const MathOpenAIModel = require('../models/mathAI')
const OpenAI = require('openai')

const mathOpenai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Handles the POST request to the '/explain-math' endpoint.
 * Takes a mathematical equation from the request body, constructs a message array,
 * and sends it to the OpenAI GPT-3.5 Turbo model for completion.
 * Saves the generated output and the original mathematical equation in the database.
 * Responds with the generated output.
 */
const explainMath = async (req, res) => {
    const { math } = req.body
    const mathData = [{
        role: 'system',
        content: 'You will be provided with a mathematical equation, and your task is to explain it in a detailed way, and give steps on how to solve it.'
    }, {
        role: 'user',
        content: math,
    }]

    try {
        const mathCompletion = await mathOpenai.chat.completions.create({
            messages: mathData,
            model: 'gpt-3.5-turbo',
        })

        if (mathCompletion && mathCompletion.choices && mathCompletion.choices.length > 0) {
            const outputContent = mathCompletion.choices[0].message.content
            const openAIRecord = new MathOpenAIModel({ user: req.user._id, math, output: outputContent })
            await openAIRecord.save()
            res.json(mathCompletion.choices[0])
        }
    } catch (error) {
        console.error(error)
    }
}

/**
 * Handles the GET request to the '/math/history' endpoint.
 * Retrieves and returns the mathematical equation history for the authenticated user from the database,
 * sorted by timestamp in descending order.
 */
const mathHistory = async (req, res) => {
    try {
        const mathUserId = req.user._id
        const maths = await MathOpenAIModel.find({ user: mathUserId }).sort({ timestamp: -1 })
        res.status(200).json(maths)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Handles the PUT request to the '/math/:mathId/update-title' endpoint.
 * Updates the title of a specific mathematical equation entry identified by the mathId parameter.
 * Responds with a success message upon a successful title update.
 */
const updateMathTitle = async (req, res) => {
    try {
        const mathId = req.params.mathId
        const newMathTitle = req.body.mathTitle
        const math = await MathOpenAIModel.findById(mathId)
        math.title = newMathTitle
        await math.save()
        res.status(200).json({ message: 'Title updated successfully' })
    } catch (error) {
        console.error(error)
    }
}

/**
 * Handles the DELETE request to the '/math/:mathId/delete' endpoint.
 * Deletes a specific mathematical equation entry identified by the mathId parameter from the database.
 * Responds with a success message upon a successful deletion.
 */
const deleteMath = async (req, res) => {
    const mathId = req.params.mathId
    try {
        const math = await MathOpenAIModel.findById(mathId)
        await math.remove()
        res.status(200).json({ message: 'Math deleted successfully' })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    explainMath,
    mathHistory,
    updateMathTitle,
    delete: deleteMath
}
