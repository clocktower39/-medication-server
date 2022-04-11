const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  account: {
    id: { type: String, required: true },
    type: { type: String, required: true },
  },
  timestamp: { type: Date, required: true },
  summary: { type: String, required: true },
  type: { type: String, required: true },
  createdBy: {
    username: { type: String, required: true },
    id: { type: String, required: true },
  },
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
