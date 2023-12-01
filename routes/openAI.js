const express = require('express')
const router = express.Router()
const openAICtrl = require('../controllers/openai-test')

router.get('/', openAICtrl.main)

module.exports = router



router.get('/', openAICtrl.main);
  
module.exports = router;