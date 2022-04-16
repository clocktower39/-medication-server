const Patient = require('../models/patient');

const enroll_patient = (req, res, next) => {
    let patient = new Patient(req.body);

    let savePatient = () => {
        patient.save((err) => {
            if (err) return next(err);
            else {
                res.send({
                    status: 'success',
                    patient
                })
            }
        });
    }
    savePatient();
}

const get_patient_info = (req, res, next) => {
    Patient.find(req.params, function (err, data) {
        if (err) return next(err);
        res.send(data)
    });
}

const patient_search = (req, res, next) => {

    const regexBody = req.body;
    for (const key in regexBody) {
        if (isNaN(Number(regexBody[key]))) {
            regexBody[key] = new RegExp(regexBody[key], 'i');
        }
    }

    Patient.find(regexBody, function (err, data) {
        if (err) return next(err);
        res.send(data)
    });
}

const update_patient_account = (req, res, next) => {
    const filter = req.body.filter;
    const update = req.body.update;
    Patient.findOneAndUpdate(filter, update, {
        new: true
    }, (err, doc) => {
        if (err) return next(err);
        res.send(doc);
    });
}

module.exports = {
    enroll_patient,
    patient_search,
    get_patient_info,
    update_patient_account,
}