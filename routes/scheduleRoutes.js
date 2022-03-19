const express = require('express');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

router.get('/schedule', scheduleController.get_user_schedule);
router.post('/dateSchedule', scheduleController.get_date_schedule);

module.exports = router;