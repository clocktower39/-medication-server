const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/patientProfile/:_id', patientController.get_patient_info);
router.post('/patientEnroll', patientController.enroll_patient);
router.post('/searchPatients', patientController.search_patients);
router.post('/updatePatient', patientController.update_patient_account);

module.exports = router;