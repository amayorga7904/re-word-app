const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const openAISchema = new Schema({
    prompt: String,
    response: String,
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('OpenAIModel', openAISchema);