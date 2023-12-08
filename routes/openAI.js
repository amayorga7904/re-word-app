const express = require('express')
const router = express.Router()
const openAICtrl = require('../controllers/openai-test')
const ensureLoggedIn = require('../config/ensureLoggedIn')
//localhost:3000/api/openAi
router.post('/', ensureLoggedIn, openAICtrl.main)
//localhost:3000/api/openAi/history
router.get('/history/:id', ensureLoggedIn, openAICtrl.history);

router.put('/history/:userId/:promptId', ensureLoggedIn, openAICtrl.updatePromptTitle)

router.delete('/history/:userId/:promptId', ensureLoggedIn, openAICtrl.delete)

module.exports = router


