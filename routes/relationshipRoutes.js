const express = require('express');
const relationshipController = require('../controllers/relationshipController');

const router = express.Router();

router.post('/manageRelationship', relationshipController.manage_relationship);

module.exports = router;