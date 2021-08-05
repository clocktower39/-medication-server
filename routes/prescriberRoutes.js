const express = require('express');
const prescriberController = require('../controllers/prescriberController');

const router = express.Router();

router.get('/prescriberProfile/:_id', prescriberController.get_prescriber_info);
router.post('/prescriberEnroll', prescriberController.enroll_prescriber);
router.post('/searchPrescribers', prescriberController.search_prescribers);
router.post('/updatePrescriber', prescriberController.update_patient_account);

module.exports = router;