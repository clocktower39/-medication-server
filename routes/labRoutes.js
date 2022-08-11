const express = require('express');
const labController = require('../controllers/labController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/labs/:id', auth, labController.get_labs);
router.post('/submitLab', auth, labController.submit_lab);

module.exports = router;