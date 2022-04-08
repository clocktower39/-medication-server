const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/services/:accountId', serviceController.get_services);
router.post('/submitService', serviceController.submit_service);
router.post('/agentServices', serviceController.agent_services);

module.exports = router;