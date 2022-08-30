const Prescriber = require('../models/prescriber');

const enroll_prescriber = (req, res, next) => {
    // check first and last name for accounts that already exist, NPI and DEA are unique and will auto reject enrollment
    Prescriber.find({ firstName: req.body.firstName, lastName: req.body.lastName }, function (err, data) {
        if (err) return next(err);
        if (data.length > 0) {
            res.send({ error: 'Possible Duplicate Account' })
        }
        else {
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
    });

}

const get_prescriber_info = (req, res, next) => {
    if(!req.params._id){
        res.send([]);
    }
    Prescriber.find(req.params, function (err, data) {
        if (err) return next(err);
        res.send(data)
    });
}

const prescriberSearch = (req, res, next) => {

    const regexBody = req.body;
    for (const key in regexBody) {
        if (isNaN(Number(regexBody[key]))) {
            regexBody[key] = new RegExp(regexBody[key], 'i');
        }
    }

    Prescriber.find(regexBody, function (err, data) {
        if (err) return next(err);
        res.send(data)
    });
}

const update_prescriber_account = (req, res, next) => {
    const filter = req.body.filter;
    const update = req.body.update;
    Prescriber.findOneAndUpdate(filter, update, {
        new: true
    }, (err, doc) => {
        if (err) return next(err);
        res.send(doc);
    });
}

module.exports = {
    enroll_prescriber,
    prescriberSearch,
    get_prescriber_info,
    update_prescriber_account,
}