const express = require('express');
const relationshipController = require('../controllers/relationshipController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/relationships/:type/:_id', auth, relationshipController.get_relationships);
router.post('/manageRelationship', auth, relationshipController.manage_relationship);

module.exports = router;