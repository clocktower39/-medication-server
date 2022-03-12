const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

router.get('/notes/:accountId', noteController.get_notes);
router.post('/submitNote', noteController.submit_note);
router.post('/agentNotes', noteController.agent_notes);

module.exports = router;