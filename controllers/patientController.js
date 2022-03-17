const Patient = require('../models/patient');

const enroll_patient = (req, res) => {
    let patient = new Patient(req.body);

    let savePatient = () => {
        patient.save((err) => {
            if (err) {
                console.log(err);
                res.send({ error: { err } });
            }
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

const get_patient_info = (req, res) => {
    Patient.find(req.params, function (err, data) {
        if (err) throw err;
        res.send(data)
    });
}

const patient_search = (req, res) => {

    const regexBody = req.body;
    for (const key in regexBody) {
        if (isNaN(Number(regexBody[key]))) {
            regexBody[key] = new RegExp(regexBody[key], 'i');
        }
    }

    Patient.find(regexBody, function (err, data) {
        if (err) throw err;
        res.send(data)
    });
}

const update_patient_account = (req, res) => {
    const filter = req.body.filter;
    const update = req.body.update;
    Patient.findOneAndUpdate(filter, update, {
        new: true
    }, (err, doc) => {
        if(err){
            console.log(err);
        }
        res.send(doc);
    });
}

module.exports = {
    enroll_patient,
    patient_search,
    get_patient_info,
    update_patient_account,
}