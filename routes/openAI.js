const express = require('express')
const router = express.Router()
const openAICtrl = require('../controllers/openai-test')

//localhost:3000/api/openAi
router.post('/', openAICtrl.main)
//localhost:3000/api/openAi/history
router.get('/history', openAICtrl.history)

module.exports = router

