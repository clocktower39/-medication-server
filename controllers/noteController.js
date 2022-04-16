const Note = require('../models/note');

const submit_note = (req, res, next) => {
    let note = new Note(req.body);
    note.timestamp = new Date();
    let saveNote = () => {
        note.save((err) => {
            if (err) return next(err);
            res.send({
                status: 'success',
                note
            })
        })
    }
    saveNote();
}

const get_notes = (req, res, next) => {
    Note.find({ "account.id": req.params.id } , function (err, data) {
        if (err) return next(err);
        res.send(data)
    });
}

const agent_notes = (req, res, next) => {
    Note.find({ "createdBy.id": req.body.id } , function (err, data) {
        if (err) return next(err);
        res.send(data)
    });
}

module.exports = {
    submit_note,
    get_notes,
    agent_notes,
}