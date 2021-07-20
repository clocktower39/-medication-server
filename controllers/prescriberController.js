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

module.exports = {
    enroll_prescriber,
}