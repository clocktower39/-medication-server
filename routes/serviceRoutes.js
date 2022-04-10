const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/services/:accountId', serviceController.get_services);
router.get('/agentServices/:accountId', serviceController.get_agent_services);
router.post('/submitService', serviceController.submit_service);

module.exports = router;