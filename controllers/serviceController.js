const Service = require('../models/service');

const submit_service = (req, res) => {
    let service = new Service(req.body);
    service.date = new Date();
    let saveService = () => {
        service.save((err) => {
            if (err) {
                console.log(err);
                res.send({ error: {err} });
            }
            else {
                res.send({
                    status: 'success',
                    service
                })
            }
        })
    }
    saveService();
}

const get_services = (req, res) => {
    Service.find({ "account.id": req.params.accountId } , function (err, data) {
        if (err) throw err;
        res.send(data)
    });
}

const agent_services = (req, res) => {
    Service.find({ "createdBy.accountId": req.body.accountId } , function (err, data) {
        if (err) throw err;
        res.send(data)
    });
}

module.exports = {
    submit_service,
    get_services,
    agent_services,
}