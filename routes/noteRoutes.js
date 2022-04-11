const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

router.get('/notes/:id', noteController.get_notes);
router.post('/agentNotes', noteController.agent_notes);
router.post('/submitNote', noteController.submit_note);

module.exports = router;