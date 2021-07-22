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

const get_prescriber_info = (req, res) => {
    Prescriber.find(req.params, function (err, data) {
        if (err) throw err;
        res.send(data)
    });
}

const search_prescribers = (req, res) => {

    const regexBody = req.body;
    for(const key in regexBody){
        if(isNaN(Number(regexBody[key]))){
            regexBody[key] = new RegExp(regexBody[key],'i');
        }
    }

    Prescriber.find(regexBody, function(err, data) {
        if (err) throw err;
        res.send(data)
    });
}

module.exports = {
    enroll_prescriber,
    search_prescribers,
    get_prescriber_info,
}