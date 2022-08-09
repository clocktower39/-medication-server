const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  account: {
    account: { type: mongoose.Schema.Types.ObjectId, refPath: "type", required: true },
    type: { type: String, required: true },
  },
  timestamp: { type: Date, required: true },
  summary: { type: String, required: true },
  type: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
