const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  history: [
    {
      date: { type: String, required: true },
      projects: { type: Array, required: true },
      breakdown: { type: Array, required: true },
    },
  ],
});

const Schedule = mongoose.model("Lab", scheduleSchema);
module.exports = Schedule;
