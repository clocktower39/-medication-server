const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  bloodDrawDate: { type: String, required: true },
  anc: { type: Number, required: true },
  createdBy: { 
    username: { type: String, required: true },
    accountId: { type: String, required: true }
   },
})

const Lab = mongoose.model('Lab', labSchema);
module.exports = Lab;