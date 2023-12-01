const express = require('express');
const router = express.Router();
const openAICtrl = require('../controllers/openai-test');

router.get('/', async (req, res) => {
  const response = await openAICtrl.main();
  res.json(response);
});

module.exports = router;
