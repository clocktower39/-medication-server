const express = require('express');
const prescriberController = require('../controllers/prescriberController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/prescriberProfile/:_id', auth, prescriberController.get_prescriber_info);
router.post('/enrollPrescriber', auth, prescriberController.enroll_prescriber);
router.post('/prescriberSearch', auth, prescriberController.prescriberSearch);
router.post('/updatePrescriber', auth, prescriberController.update_prescriber_account);

module.exports = router;