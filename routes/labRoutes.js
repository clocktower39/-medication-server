const express = require('express');
const labController = require('../controllers/labController');

const router = express.Router();

router.get('/labs/:accountId', labController.get_labs);
router.post('/submitLab', labController.submit_lab);

module.exports = router;