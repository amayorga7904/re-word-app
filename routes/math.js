const express = require('express')
const router = express.Router()
const mathCtrl = require('../controllers/math')
const ensureLoggedIn = require('../config/ensureLoggedIn')
//localhost:3000/api/codes
router.post('/', ensureLoggedIn, mathCtrl.explainMath)
//localhost:3000/api/codes/history
router.get('/history/:id', ensureLoggedIn, mathCtrl.mathHistory)

router.put('/history/:userId/:mathId', ensureLoggedIn, mathCtrl.updateMathTitle)

module.exports = router