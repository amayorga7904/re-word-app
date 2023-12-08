const express = require('express')
const router = express.Router()
const codesCtrl = require('../controllers/codes')
const ensureLoggedIn = require('../config/ensureLoggedIn')

// POST /api/codes
router.post('/', ensureLoggedIn, codesCtrl.explainCode)

// GET /api/codes/history/:id
router.get('/history/:id', ensureLoggedIn, codesCtrl.codeHistory)

// PUT /api/codes/history/:userId/:codeId
router.put('/history/:userId/:codeId', ensureLoggedIn, codesCtrl.updateTitle)

// DELETE /api/codes/history/:userId/:codeId
router.delete('/history/:userId/:codeId', ensureLoggedIn, codesCtrl.delete)

module.exports = router
