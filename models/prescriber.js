const mongoose = require('mongoose');

const prescriberSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    faxNumber: { type: Number },
    npiNumber: { type: Number, required: true, index: { unique: true } },
    deaNumber: { type: String, required: true, index: { unique: true } },
    practiceName: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    country: { type: String, required: true} ,
    patients: { 
      active: { type: Array, required: true },
      noLongerTreating: { type: Array, required: true }
    }
})

const Prescriber = mongoose.model('Prescriber', prescriberSchema);
module.exports = Prescriber;