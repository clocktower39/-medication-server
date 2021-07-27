const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
  prescriberId: { type: String, required: true },
  patientId: { type: String, required: true },
  action: { type: String, required: true },
  date: { type: Date, required: true },
})

const Relationship = mongoose.model('Relationship', relationshipSchema);
module.exports = Relationship;