const express = require('express');
const prescriberController = require('../controllers/prescriberController');
const auth = require("../middleware/auth");
const router = express.Router();
const { validate, Joi } = require('express-validation');

const enrollValidate = {
    body: Joi.object({
        firstName: Joi.string()
            .required(),
        lastName: Joi.string()
            .required(),
        phoneNumber: Joi.string()
            .required(),
        faxNumber: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        npiNumber: Joi.string()
            .required(),
        deaNumber: Joi.string()
            .required(),
        practiceName: Joi.string()
            .required(),
        address1: Joi.string()
            .required(),
        address2: Joi.string()
            .required(),
        city: Joi.string()
            .required(),
        state: Joi.string()
            .required(),
        zip: Joi.string()
            .required(),
        country: Joi.string()
            .required(),
    }),
}

router.get('/prescriberProfile/:_id', auth, prescriberController.get_prescriber_info);
router.post('/enrollPrescriber', validate(enrollValidate, {}, {}), auth, prescriberController.enroll_prescriber);
router.post('/prescriberSearch', auth, prescriberController.prescriberSearch);
router.post('/updatePrescriber', auth, prescriberController.update_prescriber_account);

module.exports = router;