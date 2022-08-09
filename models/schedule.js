const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
