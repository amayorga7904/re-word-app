const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codeOpenAISchema = new Schema({
    code: String,
    reply: String,
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('CodeOpenAIModel', codeOpenAISchema);