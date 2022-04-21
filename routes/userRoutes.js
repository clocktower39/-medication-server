const express = require('express');
const userController = require('../controllers/userController');
const auth = require("../middleware/auth");
const { validate, Joi } = require('express-validation');

const loginValidate = {
    body: Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .required(),
    }),
}

const enrollValidate = {
    body: Joi.object({
        username: Joi.string()
            .required(),
        firstName: Joi.string()
            .required(),
        lastName: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
    }),
}

const changePasswordValidate = {
    body: Joi.object({
        currentPassword: Joi.string()
            .required(),
        newPassword: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
    }),
}

const updateUserValidate = {
    body: Joi.object({
        firstName: Joi.string()
            .required(),
        lastName: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
    }),
}

const router = express.Router();

router.get('/checkAuthToken', auth, userController.checkAuthLoginToken);
router.post('/login', validate(loginValidate, {}, {}), userController.login_user);
router.post('/enroll', validate(enrollValidate, {}, {}), userController.enroll_user);
router.post('/agentInfo', auth, userController.agent_info);
router.post('/agentSearch', auth, userController.agent_search);
router.post('/changePassword', validate(changePasswordValidate, {}, {}), auth, userController.change_password);
router.post('/updateContactInfo',  validate(updateUserValidate, {}, {}), auth, userController.update_contact_info);

module.exports = router;