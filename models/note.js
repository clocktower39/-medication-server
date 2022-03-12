const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  date: { type: Date, required: true },
  note: { type: String, required: true },
  noteType: { type: String, required: true },
  createdBy: { username: { type: String, required: true }, accountId: { type: String, required: true } },
})

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;