const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

router.get('/notes/:accountId', noteController.get_notes);
router.post('/submitNote', noteController.submit_note);

module.exports = router;