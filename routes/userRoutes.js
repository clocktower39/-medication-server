const express = require('express');
const userController = require('../controllers/userController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/checkAuthToken', auth, userController.checkAuthLoginToken);
router.post('/login', userController.login_user);
router.post('/enroll', userController.enroll_user);
router.post('/agentInfo', userController.agent_info);

module.exports = router;