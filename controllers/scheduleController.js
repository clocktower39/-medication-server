const Schedule = require('../models/schedule');

const get_user_schedule = (req, res) => {
    Schedule.find({ accountId: req.params.accountId } , function (err, data) {
        if (err) throw err;
        res.send(data)
    });
}

const get_date_schedule = (req, res) => {
    Schedule.find({ accountId: req.params.accountId } , function (err, data) {
        if (err) throw err;
        const daySchedule = data.history.filter(day => day.date === req.body.date);
        res.send(daySchedule)
    });
}

module.exports = {
    get_user_schedule,
    get_date_schedule,
}