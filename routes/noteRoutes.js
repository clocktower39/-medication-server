const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

router.post('/submitNote', noteController.submit_note);

module.exports = router;