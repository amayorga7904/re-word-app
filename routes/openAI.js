const express = require('express')
const router = express.Router()
const openAICtrl = require('../controllers/openai-test')
const ensureLoggedIn = require('../config/ensureLoggedIn')

// POST /api/openAi
router.post('/', ensureLoggedIn, openAICtrl.main)

// GET /api/openAi/history/:id
router.get('/history/:id', ensureLoggedIn, openAICtrl.history)

// PUT /api/openAi/history/:userId/:promptId
router.put('/history/:userId/:promptId', ensureLoggedIn, openAICtrl.updatePromptTitle)

// DELETE /api/openAi/history/:userId/:promptId
router.delete('/history/:userId/:promptId', ensureLoggedIn, openAICtrl.delete)

module.exports = router



