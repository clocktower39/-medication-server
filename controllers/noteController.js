const Note = require('../models/note');

const submit_note = (req, res) => {
    let note = new Note(req.body);
    note.date = new Date();
    let saveNote = () => {
        note.save((err) => {
            if (err) {
                console.log(err);
                res.send({ error: {err} });
            }
            else {
                res.send({
                    status: 'success',
                    note
                })
            }
        })
    }
    saveNote();
}

const get_notes = (req, res) => {
    Note.find(req.params.accountId, function (err, data) {
        if (err) throw err;
        res.send(data)
    });
}

module.exports = {
    submit_note,
    get_notes,
}