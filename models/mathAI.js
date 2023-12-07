const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mathOpenAISchema = new Schema({
    title: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    math: String,
    output: String,
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('MathOpenAIModel', mathOpenAISchema)