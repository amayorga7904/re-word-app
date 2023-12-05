const express = require('express')
const router = express.Router()
const codesCtrl = require('../controllers/codes')

//localhost:3000/api/codes
router.post('/', codesCtrl.explainCode)
//localhost:3000/api/codes/history
router.get('/history', codesCtrl.codeHistory)

module.exports = router