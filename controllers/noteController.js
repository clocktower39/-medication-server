const Note = require('../models/note');

const submit_note = (req, res) => {
    let note = new Note(req.body);
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

module.exports = {
    submit_note,
}