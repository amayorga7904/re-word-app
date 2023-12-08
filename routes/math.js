const express = require('express')
const router = express.Router()
const mathCtrl = require('../controllers/math')
const ensureLoggedIn = require('../config/ensureLoggedIn')

// POST /api/codes
router.post('/', ensureLoggedIn, mathCtrl.explainMath)

// GET /api/codes/history/:id
router.get('/history/:id', ensureLoggedIn, mathCtrl.mathHistory)

// PUT /api/codes/history/:userId/:mathId
router.put('/history/:userId/:mathId', ensureLoggedIn, mathCtrl.updateMathTitle)

// DELETE /api/codes/history/:userId/:mathId
router.delete('/history/:userId/:mathId', ensureLoggedIn, mathCtrl.delete)

module.exports = router
