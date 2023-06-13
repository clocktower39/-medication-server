const express = require('express');
const relationshipController = require('../controllers/relationshipController');
const auth = require("../middleware/auth");
const { validate, Joi } = require('express-validation');

const relationshipValidate = {
    body: Joi.object({
        prescriber: Joi.string()
            .required(),
        patient: Joi.string()
            .required(),
        action: Joi.string()
            .required(),
    }),
}


const router = express.Router();

router.get('/relationships/:type/:_id', auth, relationshipController.get_relationships);
router.post('/manageRelationship', validate(relationshipValidate, {}, {}), auth, relationshipController.manage_relationship);

module.exports = router;