const express = require('express');
const serviceController = require('../controllers/serviceController');
const auth = require("../middleware/auth");
const { validate, Joi } = require('express-validation');

const newServiceValidate = {
    body: Joi.object({
        summary: Joi.string()
            .required(),
        type: Joi.string()
            .required(),
    }),
}

const router = express.Router();

router.get('/services/:id', auth, serviceController.get_services);
router.get('/agentServices/:id', auth, serviceController.get_agent_services);
router.post('/submitService', validate(newServiceValidate, {}, {}), auth, serviceController.submit_service);

module.exports = router;