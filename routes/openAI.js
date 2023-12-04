const express = require('express')
const router = express.Router()
const openAICtrl = require('../controllers/openai-test')

router.post('/', openAICtrl.main)



module.exports = router

