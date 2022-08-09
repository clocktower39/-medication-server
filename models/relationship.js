const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
  prescriber: { type: mongoose.Schema.Types.ObjectId, ref: "Prescriber", required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  action: { type: String, required: true },
  date: { type: Date, required: true },
})

const Relationship = mongoose.model('Relationship', relationshipSchema);
module.exports = Relationship;