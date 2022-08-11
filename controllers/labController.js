const Lab = require('../models/lab');

const submit_lab = (req, res, next) => {
    let lab = new Lab(req.body);
    lab.timestamp = new Date();
    let saveLab = () => {
        lab.save((err) => {
            if (err) return next(err);
            res.send({
                status: 'success',
                lab
            })
        })
    }
    saveLab();
}

const get_labs = (req, res, next) => {
    Lab.find({ patient: req.params.id })
    .populate("createdBy", 'username firstName lastName')
    .exec(function (err, data) {
        if (err) return next(err);
        res.send(data)
    });
}

module.exports = {
    submit_lab,
    get_labs,
}