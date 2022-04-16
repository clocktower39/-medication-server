const express = require('express');
const noteController = require('../controllers/noteController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/notes/:id', auth, noteController.get_notes);
router.post('/agentNotes', auth, noteController.agent_notes);
router.post('/submitNote', auth, noteController.submit_note);

module.exports = router;