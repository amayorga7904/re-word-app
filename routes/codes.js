const express = require('express')
const router = express.Router()
const codesCtrl = require('../controllers/codes')
const ensureLoggedIn = require('../config/ensureLoggedIn')
//localhost:3000/api/codes
router.post('/', ensureLoggedIn, codesCtrl.explainCode)
//localhost:3000/api/codes/history
router.get('/history/:id', ensureLoggedIn, codesCtrl.codeHistory)

module.exports = router