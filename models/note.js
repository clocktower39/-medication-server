const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  account: {
    account: { type: mongoose.Schema.Types.ObjectId, refPath: "type", required: true },
    type: { type: String, required: true },
  },
  timestamp: { type: Date, required: true },
  summary: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;