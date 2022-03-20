const express = require('express');
const prescriberController = require('../controllers/prescriberController');

const router = express.Router();

router.get('/prescriberProfile/:_id', prescriberController.get_prescriber_info);
router.post('/enrollPrescriber', prescriberController.enroll_prescriber);
router.post('/prescriberSearch', prescriberController.prescriberSearch);
router.post('/updatePrescriber', prescriberController.update_prescriber_account);

module.exports = router;