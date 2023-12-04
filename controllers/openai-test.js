const OpenAI = require("openai")


//creates OpenAI client to make make requests to OpenAI GPT-3 service
//API key provided for authenticating and authorizing requests to OpenAI API
const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

async function main(req, res) {
    //destructures prompt to extract data sent in the body of the POST request
    //similar to *req.body.prompt*
    const { prompt } = req.body
    try {
        //sends a request to the OpenAI API to generate completions based on a chat conversation
        const completion = await openAI.chat.completions.create({
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
        //sends first JSON response to client from OpenAI
        res.json(completion.choices[0])
        //error handling
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    main
}


