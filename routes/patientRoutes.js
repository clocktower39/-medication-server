const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.post('/patientEnroll', patientController.enroll_patient);

module.exports = router;