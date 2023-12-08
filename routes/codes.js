const express = require('express')
const router = express.Router()
const codesCtrl = require('../controllers/codes')
const ensureLoggedIn = require('../config/ensureLoggedIn')
// /api/codes
router.post('/', ensureLoggedIn, codesCtrl.explainCode)
// /api/codes/history
router.get('/history/:id', ensureLoggedIn, codesCtrl.codeHistory)

router.put('/history/:userId/:codeId', ensureLoggedIn, codesCtrl.updateTitle)

router.delete('/history/:userId/:codeId', ensureLoggedIn, codesCtrl.delete)

module.exports = router