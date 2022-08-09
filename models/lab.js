const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  timestamp: { type: Date, required: true },
  bloodDrawDate: { type: String, required: true },
  anc: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const Lab = mongoose.model('Lab', labSchema);
module.exports = Lab;