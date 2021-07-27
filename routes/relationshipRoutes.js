const express = require('express');
const relationshipController = require('../controllers/relationshipController');

const router = express.Router();

router.get('/relationships/:type/:_id', relationshipController.get_relationships);
router.post('/manageRelationship', relationshipController.manage_relationship);

module.exports = router;