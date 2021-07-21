const Prescriber = require('../models/prescriber');

const enroll_prescriber = (req, res) => {
    let prescriber = new Prescriber(req.body);
    let savePrescriber = () => {
        prescriber.save((err) => {
            if (err) {
                console.log(err);
                res.send({ error: { err } });
            }
            else {
                res.send({
                    status: 'success',
                    prescriber
                })
            }
        });
    }
    savePrescriber();
}

const search_prescribers = (req, res) => {
    Prescriber.find(req.body, function(err, data) {
        if (err) throw err;
        res.send(data)
    });
}

module.exports = {
    enroll_prescriber,
    search_prescribers,
}