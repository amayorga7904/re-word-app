const OpenAIModel = require('../models/openAI')
const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Handles the POST request to the '/main' endpoint.
 * Takes a prompt from the request body, constructs a message array,
 * and sends it to the OpenAI GPT-3.5 Turbo model for completion.
 * Saves the generated response and the original prompt in the database.
 * Responds with the generated response.
 */
const main = async (req, res) => {
    const { prompt } = req.body
    const promptData = [{
        role: 'system',
        content: 'The objective is to provide a more formal and sophisticated tone to the given text.',
    }, {
        role: 'user',
        content: prompt,
    }]

    try {
        const completion = await openai.chat.completions.create({
            messages: promptData,
            model: 'gpt-3.5-turbo',
        })

        if (completion && completion.choices && completion.choices.length > 0) {
            const responseContent = completion.choices[0].message.content
            const openAIRecord = new OpenAIModel({ user: req.user._id, prompt, response: responseContent })
            await openAIRecord.save()
            res.json(completion.choices[0])
        }
    } catch (error) {
        console.error(error)
    }
}

/**
 * Handles the GET request to the '/history' endpoint.
 * Retrieves and returns the prompt history for the authenticated user from the database,
 * sorted by timestamp in descending order.
 */
const history = async (req, res) => {
    try {
        const userId = req.user._id
        const prompts = await OpenAIModel.find({ user: userId }).sort({ timestamp: -1 })
        res.status(200).json(prompts)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Handles the PUT request to the '/update-prompt-title/:promptId' endpoint.
 * Updates the title of a specific prompt entry identified by the promptId parameter.
 * Responds with a success message upon a successful title update.
 */
const updatePromptTitle = async (req, res) => {
    try {
        const promptId = req.params.promptId
        const newPromptTitle = req.body.promptTitle
        const prompt = await OpenAIModel.findById(promptId)
        prompt.title = newPromptTitle
        await prompt.save()
        res.status(200).json({ message: 'Title updated successfully' })
    } catch (error) {
        console.error(error)
    }
}

/**
 * Handles the DELETE request to the '/delete/:promptId' endpoint.
 * Deletes a specific prompt entry identified by the promptId parameter from the database.
 * Responds with a success message upon a successful deletion.
 */
const deletePrompt = async (req, res) => {
    const promptId = req.params.promptId
    try {
        const prompt = await OpenAIModel.findById(promptId)
        await prompt.remove()
        res.status(200).json({ message: 'Prompt deleted successfully' })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    main,
    history,
    updatePromptTitle,
    delete: deletePrompt
}




