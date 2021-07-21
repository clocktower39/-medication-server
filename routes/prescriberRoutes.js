const express = require('express');
const prescriberController = require('../controllers/prescriberController');

const router = express.Router();

router.post('/prescriberEnroll', prescriberController.enroll_prescriber);
router.post('/searchPrescribers', prescriberController.search_prescribers);

module.exports = router;