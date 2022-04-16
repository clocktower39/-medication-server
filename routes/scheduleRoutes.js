const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/schedule', auth, scheduleController.get_user_schedule);
router.post('/dateSchedule', auth, scheduleController.get_date_schedule);

module.exports = router;