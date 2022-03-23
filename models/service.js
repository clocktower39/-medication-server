const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  type: { type: String, required: true },
  summary: { type: String, required: true },
  account: {
    id: { type: String, required: true },
    type: { type: String, required: true },
  },
  createdBy: {
    username: { type: String, required: true },
    accountId: { type: String, required: true },
  },
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
