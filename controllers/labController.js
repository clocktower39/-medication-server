const Lab = require('../models/lab');

const submit_lab = (req, res) => {
    let lab = new Lab(req.body);
    lab.timestamp = new Date();
    let saveLab = () => {
        lab.save((err) => {
            if (err) {
                console.log(err);
                res.send({ error: {err} });
            }
            else {
                res.send({
                    status: 'success',
                    lab
                })
            }
        })
    }
    saveLab();
}

const get_labs = (req, res) => {
    Lab.find({ accountId: req.params.accountId } , function (err, data) {
        if (err) throw err;
        res.send(data)
    });
}

module.exports = {
    submit_lab,
    get_labs,
}