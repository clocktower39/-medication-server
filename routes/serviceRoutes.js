const express = require('express');
const serviceController = require('../controllers/serviceController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/services/:id', auth, serviceController.get_services);
router.get('/agentServices/:id', auth, serviceController.get_agent_services);
router.post('/submitService', auth, serviceController.submit_service);

module.exports = router;