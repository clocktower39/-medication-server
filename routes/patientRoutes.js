const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/patientProfile/:_id', patientController.get_patient_info);
router.post('/patientEnroll', patientController.enroll_patient);
router.post('/patientSearch', patientController.patient_search);
router.post('/updatePatient', patientController.update_patient_account);

module.exports = router;