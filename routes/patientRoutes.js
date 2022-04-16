const express = require('express');
const patientController = require('../controllers/patientController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/patientProfile/:_id', auth, patientController.get_patient_info);
router.post('/patientEnroll', auth, patientController.enroll_patient);
router.post('/patientSearch', auth, patientController.patient_search);
router.post('/updatePatient', auth, patientController.update_patient_account);

module.exports = router;