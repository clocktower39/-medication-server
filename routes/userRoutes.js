const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login_user);
router.post('/enroll', userController.enroll_user);

module.exports = router;